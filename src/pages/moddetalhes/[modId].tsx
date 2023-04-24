import React, { useState, useEffect } from "react";
import {api} from "../../services/api";
import Link from "next/link";
import Menubar from "../../components/Menubar";
import moment from 'moment';
import Router, { useRouter } from "next/router";
import { setCookie, parseCookies, destroyCookie } from 'nookies';

interface eventosProps {
    eveId: number;
    eveDescricao: string;
}

const ModDetalhes = () => {
    const [eventos, setEventos] = useState<Array<eventosProps>>([]);
    const router = useRouter();
    const [idMod, setIdModal] = useState(router.query.modId);
    const [modalidade, setModalidade] = useState([]);
    const [desModalidade, setDesModalidade] = useState('');

    const {query: { modId }, } = router
    
    const [saving, setSaving] = useState(0);
    const [atualiza, setAtualiza] = useState(0);
   
    const { 'nextauth.token': token } = parseCookies();
    const { 'nextauth.refreshToken': refreshToken } = parseCookies();
    const { 'nextauth.usrId': idUsr } = parseCookies();
    const { 'nextauth.usrNome': nomUsr } = parseCookies();
    const { 'nextauth.usrNivAcesso': nivAcesso } = parseCookies();

    useEffect(() => {    
    
        setIdModal(modId);
  
        api({
          method: 'get',    
          url: `eveModal/${idMod}`,
          headers: {
              "x-access-token" : token    
          },      
        }).then(function(response) {
          setEventos(response.data);
        }).catch(function(error) {  
          handleRefreshToken()                 
        })   

        api({
          method: 'get',    
          url: `dadModalidade/${modId}`,
          headers: {
              "x-access-token" : token    
          },      
        }).then(function(resp) {
          setModalidade(resp.data);        
          setDesModalidade(resp.data[0].modDescricao);
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
          setAtualiza(atualiza + 1)
      }).catch(function(error) {
          alert(`Falha no token de acesso aos eventos`);
          Router.push({
              pathname: '/',        
          })      
      })
    }

    return (
      <div className="w-screen h-screen bg-white">
        <Menubar />
        <div className="ml-2 mr-2 md:ml-36 md:mr-36">
          <div className="flex flex-row justify-between items-center border-b-2 border-gray-300">
            <span className="text-md md:text-2xl font-bold text-green-600 mt-6 h-10" >
              Eventos da Modalidade: {desModalidade}
            </span>            
          </div>  
            <div className='flex flex-col w-full h-full text-black mt-5'>
              <div className="grid grid-cols-1 gap-1 md:grid-cols-3 md:gap-4 mb-5 ml-1 px-0 py-0 ">            
                {eventos.map((item:any, idx) => {
                  return <Link key={idx} href={`/equipes/${item.eveId}`}>
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
                          <div className="text-[12px] mb-0">{moment(item.eveDatInicial).format('DD-MM-YYYY')}</div>
                        </div>
                        <div className="flex flex-col items-start px-2 py-1">
                          <span className='text-[12px] font-bold'>Dt. Final</span>
                          <div className="text-[12px] mb-0">{moment(item.eveDatFinal).format('DD-MM-YYYY')}</div>
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
      </div>  
    );
}

export default ModDetalhes;