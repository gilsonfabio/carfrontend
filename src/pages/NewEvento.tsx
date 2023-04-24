import React, {useState, useEffect} from 'react';
import Router from 'next/router';
import { useRouter } from "next/router";
import { setCookie, parseCookies, destroyCookie } from 'nookies'

import { api } from "../services/api";

interface modalidadesProps {
  modId: number;
  modDescricao: string;
}

const CadEvento = () => {
    const router = useRouter();

    const [modalidades, setModalidades] = useState<Array<modalidadesProps>>([]);
    const [eveIdModalidade, setIdModalidade] = useState(''); 
    const [eveDescricao, setDescricao] = useState('');
    const [eveAno, setAno] = useState('');
    const [eveDatInicial, setDatInicial] = useState('');
    const [eveDatFinal, setDatFinal] = useState('');
    const [eveNroEquipes, setNroEquipes] = useState('');
    const [eveGenero, setGenero] = useState('');
    const [atualiza, setAtualiza] = useState(0);
    const [saving, setSaving] = useState(0);

    const { 'nextauth.token': token } = parseCookies();
    const { 'nextauth.refreshToken': refreshToken } = parseCookies();
    const { 'nextauth.usrId': idUsr } = parseCookies();

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

    async function handleCadastra(e:any){      
        e.preventDefault();

        api({
          method: 'post',    
          url: `newevento`,
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
          alert('Evento cadastrado com sucesso!')
          Router.back()
      }).catch(function(error) {
          setSaving(saving + 1 )
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
          
          if(saving === 1) {
            handleCadastra
          }else {
            setAtualiza(atualiza + 1 )
          }
      }).catch(function(error) {
          alert(`Falha no token de acesso das modalidades`);
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
                        Formulário Cadastro de Eventos
                      </h4>
                    </div>
                    <form>                       
                      <div className='mb-4'>
                        <input
                          type='text'
                          className='form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none'
                          placeholder='Informe Descrição Evento'
                          name='eveDescricao'
                          value={eveDescricao} 
                          onChange={(e) => {setDescricao(e.target.value)}} 
                        />
                      </div>
                      <div className='grid grid-cols-2 gap-2'>                         
                        <div className='mb-4'>
                          <input
                            type='text'
                            className='form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none'
                            placeholder='Informe Ano'
                            name='ano'
                            value={eveAno} 
                            onChange={(e) => {setAno(e.target.value)}} 
                          />
                        </div>
                        <div className='mb-4'>
                          <input
                            type='text'
                            className='form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none'
                            placeholder='Informe Nro Equipes'
                            name='nroEquipes'
                            value={eveNroEquipes} 
                            onChange={(e) => {setNroEquipes(e.target.value)}} 
                          />
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
                            onChange={(e) => {setDatInicial(e.target.value)}} 
                          />
                        </div>
                        <div className='mb-4'>
                          <input
                            type='date'
                            className='form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none'
                            placeholder='Informe Data Final'
                            name='datFinal'
                            value={eveDatFinal} 
                            onChange={(e) => {setDatFinal(e.target.value)}} 
                          />
                        </div>
                      </div>                      
                      <div className='mb-4'>
                        <select className="form-select appearance-none block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" aria-label="Default select example" 
                          value={eveGenero}
                          onChange={(e) => {setGenero(e.target.value)}} 
                        >
                          <option selected>Selecione o Genero do Evento</option>
                            <option value={'FEMININO'}>{'FEMININO'}</option>
                            <option value={'MASCULINO'}>{'MASCULINO'}</option>
                            <option value={'MISTO'}>{'MISTO'}</option>
                        </select> 
                      </div>
                      <div className='mb-4'> 
                        <select className="form-select appearance-none block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" aria-label="Default select example" 
                          value={eveIdModalidade}
                          onChange={(e) => {setIdModalidade(e.target.value)}} 
                        >
                          <option selected>Selecione a Modalidade desejada</option>
                          {modalidades.map((row:any) => (
                            <option key={row.modId} value={row.modId}>{row.modDescricao}</option>
                          ))}                          
                        </select>             
                      </div>
                      <div className='text-center pt-1 mb-12 pb-1'>
                        <button
                          className='bg-green inline-block px-6 py-2.5 text-black hover:text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out w-full mb-3'
                          type='button'
                          onClick={handleCadastra}
                        >
                          Cadastrar
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

/*export const getServerSideProps: GetServerSideProps = async () => {
  let urlModalidades = "https://backsports.herokuapp.com/modalidades";
  const resModalidades = await fetch(urlModalidades);
  const dataModalidades = await resModalidades.json()

  return {
     props: {
      modalidades: dataModalidades,
     } 
  }
}
*/

export default CadEvento;
