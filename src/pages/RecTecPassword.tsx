import React, {useState} from 'react';
import Router from 'next/router';

import api from './api/api';

const RecTecPassword = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
        
    async function sendLogin(e:any){
      e.preventDefault();
      try {
        const response = await api.put(`solTecPassword/${email}`);
        let idUsuario = response.data.tecId;
        let nomUsuario = response.data.tecNome;
        Router.push({
          pathname: '/AltTecPassword',
            query: { id: `${idUsuario}`, name: `${nomUsuario}`}
          })
      } catch (err) {
        alert(`Email não localizado na base dados! Tente novamente. ${email}`);
      } 
    }
    
    return (
    <section className='h-full gradient-form bg-gray-200 md:h-screen'>
      <div className='container py-12 px-6 h-full'>
        <div className=' flex justify-center items-center flex-wrap h-full g-6 text-gray-800'>
          <div className=''>
            <div className='block bg-white shadow-lg rounded-lg'>
              <div className='lg:flex lg:flex-wrap g-0'>
                <div className='px-4 md:px-0'>
                  <div className='md:p-12 md:mx-6'>
                    <div className='text-center'>
                      <h4 className='text-xl font-semibold mt-1 mb-12 pb-1'>
                        Formulário de Recuperação de Senha Técnico
                      </h4>
                    </div>
                    <form>
                      <p className='mb-4'>
                        Por favor, informe seu email para recuperação de senha
                      </p>
                      <div className='mb-4'>
                        <input
                          type='email'
                          className='form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none'
                          placeholder='Informe seu email'
                          name='userEmail'
                          value={email} 
                          onChange={(e) => {setEmail(e.target.value)}} 
                        />
                      </div>                      
                      <div className='text-center pt-1 mb-12 pb-1'>
                        <button
                          className='bg-green inline-block px-6 py-2.5 text-black hover:text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out w-full mb-3'
                          type='button'
                          onClick={sendLogin}
                        >
                          Solicitar
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
export default RecTecPassword;