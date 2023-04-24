import React, { useState, useEffect } from "react";
import { api } from "../services/api";
import Link from "next/link";
import Router, { useRouter } from "next/router";
import { setCookie, parseCookies, destroyCookie } from 'nookies'

interface modalProps {
    modId: number;
    modDescricao: string;
}

const Modalidades = () => {
    const router = useRouter();
    const [modalidades, setModalidades] = useState([]);
    const [atualiza, setAtualiza] = useState(0);

    const { 'nextauth.token': token } = parseCookies();
    const { 'nextauth.refreshToken': refreshToken } = parseCookies();
    const { 'nextauth.usrId': idUsr } = parseCookies();
    const { 'nextauth.usrNome': nomUsr } = parseCookies();
    const { 'nextauth.usrNivAcesso': nivAcesso } = parseCookies();

    useEffect(() => {   
        api({
            method: 'get',    
            url: `modalJWT`,
            headers: {
                "x-access-token" : token    
            },      
        }).then(function(response) {
            setModalidades(response.data);
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
            alert(`Falha no token de acesso das modalidades`);
            Router.push({
                pathname: '/',        
            })      
        })

    }

    return (
        <div className="mb-3">
            <div className="flex flex-row justify-center items-center ">
                <span className="flex flex-row justify-center items-center text-3xl font-bold text-green-600 mt-6 mb-6" >
                    Modalidades
                </span>
                
            </div>
            <div className="p-2 grid grid-cols-1 gap-1 md:grid-cols-3 md:gap-2 ">  
                {modalidades?.map((row:any) => (
                    <Link key={row.modId} href={`/moddetalhes/${row.modId}`}>
                        <a>            
                        <div className="flex items-center justify-center h-52 rounded overflow-hidden shadow-2xl mb-5 " > 
                            <p className="text-gray-700 text-2xl font-bold">
                                {row.modDescricao}
                            </p>
                        </div>
                        </a>
                    </Link>                               
                ))}
            </div>
        </div>   
    );
}

export default Modalidades;