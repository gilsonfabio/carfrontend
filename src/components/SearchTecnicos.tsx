import React, { useState, useEffect } from "react";
import {api} from "../services/api";
import Link from "next/link";
import Router, { useRouter } from "next/router";
import { setCookie, parseCookies, destroyCookie } from 'nookies'

interface tecnicosProps {
    tecNome: string; 
    tecEmail: string; 
    tecPassword: string;
    tecCelular: string; 
    tecCpf: string; 
    tecNascimento: string; 
    tecStatus: string;
}

const SearchTecnicos = () => {
    const [tecnicos, setTecnicos] = useState<Array<tecnicosProps>>([]);
    
    const [atualiza, setAtualiza] = useState(0);
    const router = useRouter();
    
    const { 'nextauth.token': token } = parseCookies();
    const { 'nextauth.refreshToken': refreshToken } = parseCookies();
    const { 'nextauth.usrId': idUsr } = parseCookies();
    const { 'nextauth.usrNome': nomUsr } = parseCookies();
    const { 'nextauth.usrNivAcesso': nivAcesso } = parseCookies();

    useEffect(() => {  
        api({
            method: 'get',    
            url: `tecnicos`,
            headers: {
                "x-access-token" : token    
            },      
        }).then(function(response) {
            setTecnicos(response.data);
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
            alert(`Falha no token de acesso dos técnicos!`);
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
                <Link href={`/CadTecnico`} > 
                    <a className="flex flex-row items-center justify-center text-green-600 hover:text-white hover:bg-green-600 text-[10px] md:text-[14px] border bottom-1 border-green-600 rounded-full w-24 h-10 md:w-40 md:h-10">
                        + Técnicos
                    </a>  
                </Link>
            </div>
            <div className="text-black ">
                <div className="grid grid-cols-1 gap-1 md:grid-cols-3 md:gap-4 mb-5 ml-1 px-0 py-0 ">            
                    {tecnicos.map((item:any, idx) => {
                        return <Link key={idx} href={`/AltTecnico/${item.tecId}`}>
                            <a className="bg-[#d7dddc]/20 rounded overflow-hidden shadow-lg mb-1 hover:bg-[#b5b9b9]/40" > 
                                <div className="flex flex-row items-start justify-between px-2 ">
                                    <div className="flex flex-col items-start px-2 py-2">
                                        <span className='text-[12px] font-bold'>Nome</span>
                                        <div className="text-[16px] text-green-500 font-bold mb-0">{item.tecNome}</div>
                                    </div>                
                                </div>
                                <div className="flex flex-row items-start justify-between px-2 py-0 ">
                                    <div className="flex flex-col items-start px-2 py-1">
                                        <span className='text-[12px] font-bold'>email</span>
                                        <div className="text-[12px] mb-0">{item.tecEmail}</div>
                                    </div>
                                    <div className="flex flex-col items-start px-2 py-1">
                                        <span className='text-[12px] font-bold'>Nascimento</span>
                                        <div className="text-[12px] mb-0">{item.tecNascimento}</div>
                                    </div>
                                </div>                                
                                <div className="flex flex-row items-start justify-between px-2">
                                    <div className="flex flex-col items-start px-2 ">
                                        <span className='text-[12px] font-bold'>Celular</span>
                                        <div className="text-[12px] mb-0">{item.tecCelular}</div>
                                    </div>
                                    <div className="flex flex-col items-start px-2 ">
                                        <span className='text-[12px] font-bold'>CPF</span>
                                        <div className="text-[12px] mb-0">{item.tecCpf}</div>
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

export default SearchTecnicos;