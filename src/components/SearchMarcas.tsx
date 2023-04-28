import React, { useState, useEffect } from "react";
import { api } from "../services/api";
import Link from "next/link";
import Router, { useRouter } from "next/router";
import { setCookie, parseCookies, destroyCookie } from 'nookies'

interface modalProps {
    marId: number;
    marDescricao: string;
}

const SearchMarcas = () => {
    const [marcas, setMarcas] = useState<Array<modalProps>>([]);
    const [nivLiberado, setNivLiberado] = useState('9');
    const [atualiza, setAtualiza] = useState(0);
    const router = useRouter();

    const {query: { id }, } = router;
    const {query: { nivAce }, } = router;
    
    const { 'nextauth.token': token } = parseCookies();
    const { 'nextauth.refreshToken': refreshToken } = parseCookies();
    const { 'nextauth.usrId': idUsr } = parseCookies();
    const { 'nextauth.usrNome': nomUsr } = parseCookies();
    const { 'nextauth.usrNivAcesso': nivAcesso } = parseCookies();

    useEffect(() => {
        api({
            method: 'get',    
            url: `marcas`,
            headers: {
                "x-access-token" : token    
            },      
        }).then(function(response) {
            setMarcas(response.data);
        }).catch(function(error) {  
            handleRefreshToken()                 
        })                              
    }, [])

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
            alert(`Falha no token de acesso das marcas`);
            Router.push({
                pathname: '/',        
            })      
        })

    }

    useEffect(() => {
        if (atualiza > 0) {
            const { 'nextauth.token': token } = parseCookies();
            const { 'nextauth.refreshToken': refreshToken } = parseCookies();
            const { 'nextauth.usrId': idUsr } = parseCookies();
            const { 'nextauth.usrNivAcesso': nivAcesso } = parseCookies();

            api({
                method: 'get',    
                url: `modalJWT`,
                headers: {
                    "x-access-token" : token    
                },      
            }).then(function(response) {
                setMarcas(response.data);
            }).catch(function(error) {                
                alert(`Falha no token de acesso das marcas`);
            })                       
        }                                  
    }, [atualiza])

    return (
        <div className="mb-32 h-auto">
            <div className="flex flex-row justify-between items-center ">
                <span className="flex flex-row justify-center items-center text-3xl font-bold text-green-600 mt-6 mb-6" >
                    Marcas
                </span>
                <div className={ nivAcesso == nivLiberado ? "text-green-500" : "hidden" }>
                    <Link href={`/NewMarcas`} > 
                        <a className="flex flex-row items-center justify-center text-green-600 hover:text-white hover:bg-green-600 text-[10px] md:text-[14px] border bottom-1 border-green-600 rounded-full w-24 h-10 md:w-40 md:h-10">
                            + Marca
                        </a>  
                    </Link>
                </div>
            </div>
            <div className="p-2 grid grid-cols-1 gap-1 md:grid-cols-4 md:gap-2 md:mt-3">  
                {marcas?.map((row) => ( 
                    <div key={row.marId} className="items-center justify-center h-20 rounded overflow-hidden shadow-2xl mb-5 w-full " > 
                        <div className="flex flex-row items-center justify-center text-gray-700 text-2xl font-bold" >{row.marDescricao}</div>
                        <div className="flex flex-row justify-center mt-4">
                            <Link href={`/AltMarca/${row.marId}`} passHref > 
                                <div className=" text-green-600 hover:text-white hover:bg-green-600 hover:cursor-pointer text-[10px] md:text-[14px] w-14 h-6 md:w-full md:h-6 rounded-full flex items-center justify-center">
                                    Editar
                                </div>
                            </Link>                    
                        </div>                         
                    </div>                                     
                ))}
            </div>
        </div>   
    );
}

export default SearchMarcas;