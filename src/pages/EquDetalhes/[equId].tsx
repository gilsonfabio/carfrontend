import React, { useState, useEffect } from "react";
import {api} from "../../services/api";
import Link from "next/link";
import Router, { useRouter } from "next/router";
import Menubar from "../../components/Menubar";
import { setCookie, parseCookies, destroyCookie } from 'nookies';

interface atletasProps {
  atlId: number;
  atlNome: string; 
  atlNascimento: number; 
  atlCpf: string;
  atlIdentidade: string; 
  atlOrgEmissor: string; 
  atlNatural: string; 
  atlEstCivil: string; 
  atlNomPai: string; 
  atlNomMae: string; 
  atlIdEquipe: number;
  atlStatus: string;
}
interface equipesProps {
  equDescricao: string;
  equIdEvento: number; 
  equRegiao: string; 
  equResp: string; 
  equTecnico: number; 
  equDirigente: string; 
  equStatus: string;
}

const EquDetalhes = () => {
    const [atletas, setAtletas] = useState<Array<atletasProps>>([]);
    const [equipe, setEquipe] = useState<Array<equipesProps>>([]);
    const router = useRouter();
    const [idEqu, setIdEquipe] = useState(router.query.equId);
    const [nomEquipe, setNomEquipe] = useState('');
    const [qtdAtletas, setQtdAtletas] = useState('');
    const [limAtletas, setLimAtletas] = useState('');
    
    const {query: { equId }, } = router;

    const [saving, setSaving] = useState(0);
    const [atualiza, setAtualiza] = useState(0);
   
    const { 'nextauth.token': token } = parseCookies();
    const { 'nextauth.refreshToken': refreshToken } = parseCookies();
    const { 'nextauth.usrId': idUsr } = parseCookies();
    const { 'nextauth.usrNome': nomUsr } = parseCookies();
    const { 'nextauth.usrNivAcesso': nivAcesso } = parseCookies();

    useEffect(() => {    
    
        setIdEquipe(equId);
        api({
          method: 'get',    
          url: `dadEquipe/${idEqu}`,
          headers: {
              "x-access-token" : token    
          },      
        }).then(function(response) {
          setEquipe(response.data);
          setNomEquipe(response.data[0].equDescricao);
          setQtdAtletas(response.data[0].qtd);
          setLimAtletas(response.data[0].eveNroEquipes);
        }).catch(function(error) {  
          handleRefreshToken()                 
        }) 

        api({
          method: 'get',    
          url: `atlEquipe/${idEqu}`,
          headers: {
              "x-access-token" : token    
          },      
        }).then(function(resp) {
          setAtletas(resp.data);
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
          alert(`Falha no token de acesso das equipes!`);
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
                Equipe: {nomEquipe}
              </span>
              <Link href={`/AltEquipe/${equId}`} passHref > 
                <a className="flex flex-row items-center justify-center text-green-600 hover:text-white hover:bg-green-600 text-xs md:text-sx border bottom-1 border-green-600 rounded-full w-28 h-8 md:w-40 md:h-10">
                  Alterar Equipe
                </a>  
              </Link>
            </div>  
            {equipe.map((row:any) => {
              return <div key={row.equId} className="mt-5" > 
                <div className="grid grid-cols-2 gap-2 mb-3">
                  <div className="">
                    <span className='text-gray-500'>Equipe</span>
                    <div className="text-black font-bold">{row.equDescricao}</div>
                  </div>
                  <div className="">
                    <span className='text-gray-500'>Região</span>
                    <div className="text-black font-bold">{row.equRegiao}</div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2 mb-3 ">
                  <div className="">
                    <span className='text-gray-500'>Responsável</span>
                    <div className="text-black font-bold">{row.equResp}</div>
                  </div>
                  <div className="">
                    <span className='text-gray-500'>Dirigente</span>
                    <div className="text-black font-bold">{row.equDirigente}</div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2 mb-3">
                  <div className="">
                    <span className='text-gray-500'>Técnico</span>
                    <div className="text-black font-bold">{row.tecNome}</div>
                  </div>
                  <div className="">
                    <span className='text-gray-500'>Celular</span>
                    <div className="text-black font-bold">{row.tecCelular}</div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2 mb-3">
                  <div className="">
                    <span className='text-gray-500'>Email</span>
                    <div className="text-black font-bold">{row.tecEmail}</div>
                  </div>
                  <div className="">
                    <span className='text-gray-500'>Evento</span>
                    <div className="text-black font-bold">{row.eveDescricao}</div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2 mb-3">
                  <div className="">
                    <span className='text-gray-500'>Qtde Atletas:</span>
                    <div className="text-black font-bold">{row.qtd} / {row.eveNroEquipes}</div>
                  </div>                  
                </div>
                <div className="">
                  <Link href={`/FicEquipe/${row.equId}`} passHref>
                    <div className="text-[15px] text-green-500 font-bold mb-0 hover:cursor-pointer">emite ficha</div>
                  </Link> 
                </div> 
              </div>              
            })}   
            <div className="flex flex-row justify-between items-center border-b-2 border-gray-300">
              <span className="text-[14px] md:text-3xl font-bold text-green-600 mt-6 mb-6 " >
                Atletas
              </span>
              <div className={ qtdAtletas == limAtletas ? "hidden" : "text-green-500" }>
                <Link href={`/CadAtleta/${idEqu}`} passHref > 
                  <a className="flex flex-row items-center justify-center text-green-600 hover:text-white hover:bg-green-600 text-xs md:text-sx border bottom-1 border-green-600 rounded-full w-28 h-8 md:w-40 md:h-10">
                    Adicionar Atleta
                  </a>  
                </Link>
              </div>  
            </div> 
            <div className='flex flex-col w-full h-full bg-white text-black mt-5'>
              <div className="grid grid-cols-1 gap-1 md:grid-cols-3 md:gap-4 ml-1 px-0 py-0 ">            
                {atletas.map((item:any, idx) => {
                  return <div key={idx} className="bg-[#d7dddc]/20 rounded overflow-hidden shadow-lg mb-1 hover:bg-[#b5b9b9]/40" > 
                      <div className="flex flex-row items-start justify-between px-2">
                        <div className="flex flex-col items-start px-2 py-1 ">
                          <div className="text-[15px] text-green-500 font-bold mb-0">{idx+1}</div>
                        </div>
                      </div>
                      <div className="flex flex-row items-start justify-between px-2 py-0 ">
                        <div className="flex flex-col items-start px-2 py-1">
                          <span className='text-[12px] font-bold'>Nome</span>
                          <div className="text-[12px] mb-0">{item.atlNome}</div>
                        </div>
                        <div className="flex flex-col items-start px-2 py-1">
                          <span className='text-[12px] font-bold'>Nascimento</span>
                          <div className="text-[12px] mb-0">{item.atlNascimento}</div>
                        </div>
                      </div>                                
                      <div className="flex flex-row items-start justify-between px-2">
                        <div className="flex flex-col items-start px-2 ">
                          <span className='text-[12px] font-bold'>CPF</span>
                          <div className="text-[12px] mb-0">{item.atlCpf}</div>
                        </div>
                        <div className="flex flex-col items-start px-2 ">
                          <span className='text-[12px] font-bold'>Identidade</span>
                          <div className="text-[12px] mb-0">{item.atlIdentidade}- {item.atlOrgEmissor}</div>
                        </div>
                      </div>  
                      <div className="flex flex-row items-start justify-between px-2">
                        <div className="flex flex-col items-start px-2 py-1 ">
                          <Link href={`/FicAtleta/${item.atlId}`} passHref>
                            <div className="text-[15px] text-green-500 hover:text-black font-bold mb-0 hover:cursor-pointer">emite ficha</div>
                          </Link>  
                        </div>
                        <div className="flex flex-col items-start px-2 py-1 ">
                          <Link href={`/AltAtleta/${item.atlId}`} passHref >
                            <div className="text-[15px] text-green-500 hover:text-black font-bold mb-0 hover:cursor-pointer">altera dados</div>
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

export default EquDetalhes;