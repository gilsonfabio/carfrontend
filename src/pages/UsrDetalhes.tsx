import React, { useState, useEffect } from "react";
import {api} from "../services/api";
import Link from "next/link";
import Router, { useRouter } from "next/router";
import { setCookie, parseCookies, destroyCookie } from 'nookies'

import Menubar from "../components/Menubar";

interface usuarioProps {
  usrId: number;
  usrNome: string; 
  usrNascimento: string; 
  usrCpf: string;
  usrEmail: string; 
  usrCelular: string; 
  usrNivAcesso: number; 
}

interface modalidadesProps {
  aceId: number;
  aceIdUsr: number; 
  aceIdMod: number; 
}

const UsrDetalhes = () => {
    const [usuario, setUsuario] = useState<Array<usuarioProps>>([]);
    const [modalidades, setModalidades] = useState<Array<modalidadesProps>>([]);
    const router = useRouter();
    const [nivLiberado, setNivLiberado] = useState('');

    const {query: { usrId } } = router;
    const {query: { nivAce } } = router;

    const [atualiza, setAtualiza] = useState(0);
    
    const { 'nextauth.token': token } = parseCookies();
    const { 'nextauth.refreshToken': refreshToken } = parseCookies();
    const { 'nextauth.usrId': idUsr } = parseCookies();
    const { 'nextauth.usrNome': nomUsr } = parseCookies();
    const { 'nextauth.usrNivAcesso': nivAcesso } = parseCookies();

    function CadastraModalidade(e:any){
      Router.push({
        pathname: '/CadModUsuario',
        query: { id: `${idUsr}` }
      })        
    }

    useEffect(() => {    
      api({
        method: 'get',    
        url: `dadUsuario/${idUsr}`,
        headers: {
            "x-access-token" : token    
        },      
      }).then(function(response) {
        setUsuario(response.data);
      }).catch(function(error) {  
        handleRefreshToken()                 
      })

      api({
        method: 'get',    
        url: `modUsuario/${idUsr}`,
        headers: {
            "x-access-token" : token    
        },      
      }).then(function(resp) {
        setModalidades(resp.data);
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
          alert(`Falha no token de acesso aos administradores`);
          Router.push({
              pathname: '/',        
          })      
      })
  }

  return (
        <div className="w-screen h-full bg-white">
          <Menubar />
          <div className="ml-2 mr-2 md:ml-36 md:mr-36">
            <div className="flex flex-row justify-between items-center border-b-2 border-gray-300">
              <span className="text-[14px] md:text-3xl font-bold text-green-600 mt-6 mb-6 " >
                Usuario: 
              </span>
              <Link href={`/AltAdmin/${usrId}`} passHref > 
                <a className="flex flex-row items-center justify-center text-green-600 hover:text-white hover:bg-green-600 text-xs md:text-sx border bottom-1 border-green-600 rounded-full w-28 h-8 md:w-40 md:h-10">
                  Alterar Usuário
                </a>  
              </Link>
            </div>  
            {usuario.map((row:any) => {
              return <div key={row.usrId} className="mt-5" > 
                <div className="grid grid-cols-2 gap-2 mb-3">
                  <div className="">
                    <span className='text-gray-500'>Nome</span>
                    <div className="text-black font-bold">{row.usrNome}</div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2 mb-3 ">
                  <div className="">
                    <span className='text-gray-500'>Nascimento</span>
                    <div className="text-black font-bold">{row.usrNascimento}</div>
                  </div>
                  <div className="">
                    <span className='text-gray-500'>CPF</span>
                    <div className="text-black font-bold">{row.usrCpf}</div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2 mb-3">
                  <div className="">
                    <span className='text-gray-500'>Email</span>
                    <div className="text-black font-bold">{row.usrEmail}</div>
                  </div>
                  <div className="">
                    <span className='text-gray-500'>Celular</span>
                    <div className="text-black font-bold">{row.usrCelular}</div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2 mb-3">
                  <div className="">
                    <span className='text-gray-500'>Nivel Acesso</span>
                    <div className="text-black font-bold">{row.usrNivAcesso}</div>
                  </div>
                </div>
              </div>              
            })}   
            <div className="flex flex-row justify-between items-center border-b-2 border-gray-300">
              <span className="text-[14px] md:text-3xl font-bold text-green-600 mt-6 mb-6 " >
                Modalidades
              </span>
              <div className={ nivAcesso == nivLiberado ? "text-green-500" : "hidden" }>
                <button onClick={CadastraModalidade} > 
                  <a className="flex flex-row items-center justify-center text-green-600 hover:text-white hover:bg-green-600 text-xs md:text-sx border bottom-1 border-green-600 rounded-full w-28 h-8 md:w-40 md:h-10">
                    Adicionar Modalidade
                  </a>  
                </button>
              </div>  
            </div> 
            <div className='flex flex-col w-full h-full bg-white text-black mt-5'>
              <div className="grid grid-cols-1 gap-1 md:grid-cols-5 md:gap-4 ml-1 px-0 py-0 ">            
                {modalidades.map((item:any, idx) => {
                  return <div key={idx} className="bg-[#d7dddc]/20 rounded overflow-hidden shadow-lg mb-1 hover:bg-[#b5b9b9]/40" > 
                      <div className="flex flex-row items-start justify-between px-2">
                        <div className="flex flex-col items-start px-2 py-1 ">
                          <div className="text-[15px] text-green-500 font-bold mb-0">{idx+1}</div>
                        </div>
                      </div>
                      <div className="flex flex-row items-start justify-between px-2 py-0 ">
                        <div className="flex flex-col items-start px-2 py-1">
                          <span className='text-[12px] font-bold'>Descrição</span>
                          <div className="text-[15px] text-green-500 font-bold mb-0">{item.modDescricao}</div>
                        </div>                        
                      </div>                      
                      <div className="flex flex-row items-start justify-between px-2">
                        <div className="flex flex-col items-start px-2 py-1 ">
                          <Link href={`/FicAtleta/${item.modId}`} passHref>
                            <div className="text-[15px] text-green-500 hover:text-black font-bold mb-0 hover:cursor-pointer">Excluir</div>
                          </Link>  
                        </div>                        
                      </div>                   
                  </div>                                                                
                })}
              </div>
            </div>
            </div>            
        </div>   
    );
}

export default UsrDetalhes;