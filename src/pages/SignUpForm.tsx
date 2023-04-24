import React, {useState} from 'react';
import Router from 'next/router';

import {api} from '../services/api';
import Link from 'next/link';

const SignUpForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [admEmail, setAdmEmail] = useState(process.env.NEXT_PUBLIC_ADMIN_USER);
    const [admPassword, setAdmPassword] = useState(process.env.NEXT_PUBLIC_ADMIN_PASSWORD);   

    async function sendLogin(e:any){
      e.preventDefault(); 
      try {  
        const response = await api.get(`signIn/${email}/${password}`);
        let idUsuario = response.data.usrId;
        let nomUsuario = response.data.usrNome;
        let nivAcesso = response.data.usrNivAcesso;
 
          Router.push({
            pathname: '/Dashboard',
              query: { 
                id: `${idUsuario}`, 
                name: `${nomUsuario}`, 
                nivAce: `${nivAcesso}`
              },
            })            
      }catch (err) {
        alert(`Falha no login Administrativo! Tente novamente. ${email}`);
      }             
    }

    return (
    <section className='flex items-center justify-center h-full gradient-form bg-gray-200 md:h-screen'>
      <div className='container py-12 px-6 h-full'>
        <div className=' flex justify-center items-center flex-wrap h-full g-6 text-gray-800'>
          <div className=''>
            <div className='block bg-white shadow-lg rounded-lg'>
              <div className='lg:flex lg:flex-wrap g-0'>
                <div className='px-4 md:px-0'>
                  <div className='md:p-12 md:mx-6'>
                    <div className='text-center'>
                      <h4 className='text-xl font-semibold mt-1 mb-12 pb-1'>
                        Faça sua Autenticação no Sports
                      </h4>
                    </div>
                    <form>
                      <p className='mb-4'>
                        Por favor, inscreva-se se você não tiver uma conta
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
                      <div className='mb-4'>
                        <input
                          type='password'
                          className='form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none'
                          placeholder='Senha'
                          name='pin'
                          value={password} 
                          onChange={(e) => {setPassword(e.target.value)}} 
                        />
                      </div>
                      <div className='text-center pt-1 mb-12 pb-1'>
                        <button
                          className='bg-green inline-block px-6 py-2.5 text-black hover:text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out w-full mb-3'
                          type='button'
                          onClick={sendLogin}
                        >
                          Entrar
                        </button>
                      </div>
                      <div className='flex items-center justify-between pb-6'>
                        <p className='mb-0 mr-2'>Esqueceu sua senha?</p>
                        <Link href={`/ForgotPassword`}> 
                          <a className='inline-block px-6 py-2 border-2 border-green-600 text-green-600 font-medium text-xs leading-tight uppercase rounded hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out'>
                            Alterar Senha
                          </a>  
                        </Link>
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

export default SignUpForm;