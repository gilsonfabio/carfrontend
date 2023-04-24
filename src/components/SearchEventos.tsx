import React, { useState, useEffect } from "react";
import {api} from "../services/api";
import Link from "next/link";
import Router, { useRouter } from "next/router";
import { setCookie, parseCookies, destroyCookie } from 'nookies'

interface eventosProps {
    eveId: number;
    eveDescricao: string;
}

const SearchEventos = ({usrId, nivel}: any) => {
    const [atualiza, setAtualiza] = useState(0);
    const [eventos, setEventos] = useState<Array<eventosProps>>([]);
    const [nivLiberado, setNivLiberado] = useState('9');
    
    const { 'nextauth.token': token } = parseCookies();
    const { 'nextauth.refreshToken': refreshToken } = parseCookies();
    const { 'nextauth.usrId': idUsr } = parseCookies();
    const { 'nextauth.usrNome': nomUsr } = parseCookies();
    const { 'nextauth.usrNivAcesso': nivAcesso } = parseCookies();
    
    const router = useRouter();

    useEffect(() => {  
        api({
            method: 'get',    
            url: `eventos`,
            headers: {
                "x-access-token" : token    
            },      
        }).then(function(response) {
            setEventos(response.data);
        }).catch(function(error) {  
            handleRefreshToken()                 
        })    
    }, [atualiza])

    async function handleRefreshToken(){
        await api({
            method: 'post',    
            url: `refreshToken`,
            data: {
                idUsr,                            
            },
            headers: {
                "x-access-token" : refreshToken    
            },      
        }).then(function(response) {
            destroyCookie({}, 'nextauth.token');
            destroyCookie({}, 'nextauth.usrId');
            destroyCookie({}, 'nextauth.usrNome');
            destroyCookie({}, 'nextauth.usrNivAcesso');
            destroyCookie({}, 'nextauth.refreshToken'); 
            
            setCookie(undefined, 'nextauth.token', response.data.token, {maxAge: 60 * 60 * 1, })
            setCookie(undefined, 'nextauth.refreshToken', response.data.refreshToken, {maxAge: 60 * 60 * 1, })
            setCookie(undefined, 'nextauth.usrId', response.data.user.usrId, {maxAge: 60 * 60 * 1, })
            setCookie(undefined, 'nextauth.usrNome', response.data.user.usrNome, {maxAge: 60 * 60 * 1, })
            setCookie(undefined, 'nextauth.usrNivAcesso', response.data.user.usrNivAcesso, {maxAge: 60 * 60 * 1, })                
            setAtualiza(atualiza + 1 )
        }).catch(function(error) {
            alert(`Falha no token de acesso dos eventos`);
            Router.push({
                pathname: '/',        
            })      
        })

    }



    return (
        <div className="mb-32 h-auto">
            <div className="flex flex-row justify-between items-center ">
                <span className="flex flex-row justify-center items-center text-3xl font-bold text-green-600 mt-6 mb-6" >
                    Eventos
                </span>
                <div className={ nivAcesso == nivLiberado ? "text-green-500" : "hidden" }>
                    <Link href={`/NewEvento`} > 
                        <a className="flex flex-row items-center justify-center text-green-600 hover:text-white hover:bg-green-600 text-[10px] md:text-[14px] border bottom-1 border-green-600 rounded-full w-24 h-10 md:w-40 md:h-10">
                            + Eventos
                        </a>  
                    </Link>
                </div>
            </div>
            <div className="text-black ">
                <div className="grid grid-cols-1 gap-1 md:grid-cols-3 md:gap-4 mb-5 ml-1 px-0 py-0 ">            
                    {eventos?.map((item:any, idx) => {
                        return <Link key={idx} href={`/AltEvento/${item.eveId}`}>
                            <a className="bg-[#d7dddc]/20 rounded overflow-hidden shadow-lg mb-1 hover:bg-[#b5b9b9]/40" > 
                                <div className="flex flex-row items-start justify-between px-2 ">
                                    <div className="flex flex-col items-start px-2 py-2">
                                        <span className='text-[12px] font-bold'>Descrição</span>
                                        <div className="text-[16px] text-green-500 font-bold mb-0">{item.eveDescricao}</div>
                                    </div>                
                                </div>
                                <div className="flex flex-row items-start justify-between px-2 py-0 ">
                                    <div className="flex flex-col items-start px-2 py-1">
                                        <span className='text-[12px] font-bold'>Dt. Inicial</span>
                                        <div className="text-[12px] mb-0">{Intl.DateTimeFormat('pt-BR', {timeZone: 'UTC'}).format(Date.parse(item.eveDatInicial))}</div>
                                    </div>
                                    <div className="flex flex-col items-start px-2 py-1">
                                        <span className='text-[12px] font-bold'>Dt. Final</span>
                                        <div className="text-[12px] mb-0">{Intl.DateTimeFormat('pt-BR', {timeZone: 'UTC'}).format(Date.parse(item.eveDatFinal))}</div>
                                    </div>
                                </div>                                
                                <div className="flex flex-row items-start justify-between px-2">
                                    <div className="flex flex-col items-start px-2 ">
                                        <span className='text-[12px] font-bold'>Situação</span>
                                        <div className="text-[12px] mb-0">{item.eveStatus}</div>
                                    </div>
                                    <div className="flex flex-col items-start px-2 ">
                                        <span className='text-[12px] font-bold'>Gênero</span>
                                        <div className="text-[12px] mb-0">{item.eveGenero}</div>
                                    </div>
                                </div>
                                <div className="flex flex-row items-start justify-between px-2">
                                    <div className="flex flex-col items-start px-2 py-1 ">
                                        <span className='text-[12px] font-bold'>Modalidade</span>
                                        <div className="text-[15px] text-green-500 font-bold mb-0">{item.modDescricao}</div>
                                    </div>
                                </div>
                            </a>                            
                        </Link>                  
                    })}
                </div>
            </div>         
        </div>   
    );
}

export default SearchEventos;