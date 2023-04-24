import React, {useState, useEffect} from 'react';
import Router, { useRouter } from "next/router";
import { setCookie, parseCookies, destroyCookie } from 'nookies'

import { api } from "../../services/api";

interface eventoProps {
    eveId: number;
    eveModalidade: number; 
    eveDescricao: string;
    eveAno: number;
    eveDatInicial: string;
    eveDatFinal: string;
    eveNroEquipes: number;
    eveGenero: string;    
}

interface modalidadesProps {
    modId: number;
    modDescricao: string;
}

const AltEvento = () => {
    const router = useRouter();
    const [evento, setEvento] = useState<Array<eventoProps>>([]);

    const { 'nextauth.token': token } = parseCookies();
    const { 'nextauth.refreshToken': refreshToken } = parseCookies();
    const { 'nextauth.usrId': idUsr } = parseCookies();
    const { 'nextauth.usrNome': nomUsr } = parseCookies();
    const { 'nextauth.usrNivAcesso': nivAcesso } = parseCookies();

    const [eveIdModalidade, setEveModalidade] = useState(''); 
    const [eveDescricao, setEveDescricao] = useState('');
    const [eveAno, setEveAno] = useState('');
    const [eveDatInicial, setEveDatInicial] = useState('');
    const [eveDatFinal, setEveDatFinal] = useState('');
    const [eveNroEquipes, setEveNroEquipes] = useState('');
    const [eveGenero, setEveGenero] = useState('');
    const [desModalidade, setDesModalidade] = useState('');

    const [atualiza, setAtualiza] = useState(0);
    const [saving, setSaving] = useState(0);
    
    const [idEve, setIdEvento] = useState(router.query.eveId);
    const [modalidade, setModalidades] = useState<Array<modalidadesProps>>([]);
    
    const {query: { eveId }, } = router;

    useEffect(() => {    
    
        setIdEvento(eveId);

        api({
          method: 'get',    
          url: `dadEvento/${idEve}`,
          headers: {
              "x-access-token" : token    
          },      
        }).then(function(response) {
          setEveModalidade(response.data[0].eveIdModalidade);
          setEveDescricao(response.data[0].eveDescricao);
          setEveAno(response.data[0].eveAno);
          setEveDatInicial(response.data[0].eveDatInicial);
          setEveDatFinal(response.data[0].eveDatFinal);
          setEveNroEquipes(response.data[0].eveNroEquipes);
          setEveGenero(response.data[0].eveGenero);
          setDesModalidade(response.data[0].modDescricao);
        }).catch(function(error) {  
          handleRefreshToken()                 
        }) 
        
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

    async function handleAlterar(e:any){      
        e.preventDefault();
        api({
          method: 'put',    
          url: `updEvento/${idEve}`,
          data: {
            eveIdModalidade, 
            eveDescricao,
            eveAno,
            eveDatInicial,
            eveDatFinal,
            eveNroEquipes,
            eveGenero,                               
          },
          headers: {
              "x-access-token" : token    
          },      
      }).then(function(response) {
          alert('Evento alterado com sucesso!')
          Router.back()
      }).catch(function(error) {
          setSaving(saving + 1)
          handleRefreshToken()          
      }) 
    }

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
          if (saving === 1){
            handleAlterar
          }else {
            setAtualiza(atualiza + 1)
          }
      }).catch(function(error) {
          alert(`Falha no token de acesso aos eventos`);
          Router.push({
              pathname: '/',        
          })      
      })
    }

    return (
    <section className='h-screen gradient-form bg-gray-200 md:h-screen'>
      <div className='container py-12 px-6 h-full'>
        <div className=' flex justify-center items-center flex-wrap h-full g-6 text-gray-800'>
          <div className=''>
            <div className='block bg-white shadow-lg rounded-lg'>
              <div className='lg:flex lg:flex-wrap g-0'>
                <div className='px-4 md:px-0'>
                  <div className='md:p-12 md:mx-6'>
                    <div className='text-center'>
                      <h4 className='text-xl font-semibold mt-1 mb-12 pb-1'>
                        Formulário Alteração de Evento
                      </h4>
                    </div>
                    <form>                       
                      <div className='mb-4'>                        
                        <input
                          type='text'
                          className='form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none'
                          placeholder='Descrição do Evento'
                          name='eveDescricao'
                          value={eveDescricao} 
                          onChange={(e) => {setEveDescricao(e.target.value)}} 
                        />
                      </div>
                      <div className='grid grid-cols-2 gap-2'>   
                        <div className='mb-4'>
                          <input
                            type='text'
                            className='form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none'
                            placeholder='Informe Ano'
                            name='eveAno'
                            value={eveAno} 
                            onChange={(e) => {setEveAno(e.target.value)}} 
                          />
                        </div>
                        <div className='mb-4'>
                          <input
                            type='text'
                            className='form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none'
                            placeholder='Informe Nro de Equipes'
                            name='nroEquipes'
                            value={eveNroEquipes} 
                            onChange={(e) => {setEveNroEquipes(e.target.value)}} 
                          />                                              
                        </div>
                      </div>
                      <div className='grid grid-cols-2 gap-2'> 
                        <div>
                          <span className='text-gray-500 font-semibold text-[10px] '>Dt. inicial atual:{eveDatInicial}</span>
                        </div>
                        <div>
                          <span className='text-gray-500 font-semibold text-[10px] '>Dt. final atual:{eveDatFinal}</span>
                        </div>
                      </div>
                      <div className='grid grid-cols-2 gap-2'> 
                        <div className='mb-4'>
                          <input
                            type='date'
                            className='form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none'
                            placeholder='Informe Data Inicial'
                            name='datInicial'
                            value={eveDatInicial} 
                            onChange={(e) => {setEveDatInicial(e.target.value)}} 
                          />
                        </div>                        
                        <div className='mb-4'>
                          <input
                            type='date'
                            className='form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none'
                            placeholder='Informe Data Final'
                            name='datFinal'
                            value={eveDatFinal} 
                            onChange={(e) => {setEveDatFinal(e.target.value)}} 
                          />                                              
                        </div>
                      </div>                     
                      <div className='mb-4'>
                        <input
                          type='text'
                          className='form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none'
                          placeholder='Informe Genero'
                          name='eveGenero'
                          value={eveGenero} 
                          onChange={(e) => {setEveGenero(e.target.value)}} 
                        />                                              
                      </div>
                      <div>
                        <span className='text-gray-500 font-semibold text-[10px] '>Modalidade Atual:{desModalidade}</span>
                      </div>  
                      <div className='mb-4'> 
                        <select className="form-select appearance-none block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" aria-label="Default select example" 
                          value={eveIdModalidade}
                          onChange={(e) => {setEveModalidade(e.target.value)}} 
                        >
                          <option selected>Selecione a Modalidade desejada</option>
                          {modalidade.map((row) => (
                            <option key={row.modId} value={row.modId}>{row.modDescricao}</option>
                          ))}                          
                        </select>             
                      </div>                           
                      <div className='text-center pt-1 mb-12 pb-1'>
                        <button
                          className='bg-green inline-block px-6 py-2.5 text-black hover:text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out w-full mb-3'
                          type='button'
                          onClick={handleAlterar}
                        >
                          Alterar
                        </button>
                      </div>                      
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    );
};
export default AltEvento;