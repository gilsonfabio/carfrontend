import React, {useState, useEffect} from 'react';
import Router from 'next/router';
import { useRouter } from "next/router";

import {api} from "../services/api";

const CadAdmin = () => {
    const router = useRouter();

    const [nome, setTecNome] = useState(''); 
    const [email, setTecEmail] = useState('');
    const [password, setTecPassword] = useState('');
    const [celular, setTecCelular] = useState('');
    const [cpf, setTecCpf] = useState('');
    const [nascimento, setTecNascimento] = useState('');
    const [nivAcesso, setNivAcesso] = useState('');

     const {query: { id }, } = router;

    async function handleCadastra(e:any){      
        e.preventDefault();
        
        try {
            api.post('newuser', {
                nome, 
                cpf, 
                nascimento, 
                email, 
                celular, 
                password,
                nivAcesso
            }).then(() => {
                alert('Administrador(a) cadastrado com sucesso!')
            }).catch(() => {
                alert('Erro no cadastro!');
            })  
            Router.back();
        }catch (err) {
            alert('Falha no Cadastro de Administrador(a)!');
        }  
    }

    return (
    <section className='flex items-center justify-center h-screen gradient-form bg-gray-200 md:h-screen'>
      <div className='container py-12 px-6 h-full'>
        <div className=' flex justify-center items-center flex-wrap h-full g-6 text-gray-800'>
          <div className=''>
            <div className='block bg-white shadow-lg rounded-lg'>
              <div className='lg:flex lg:flex-wrap g-0'>
                <div className='px-4 md:px-0'>
                  <div className='md:p-12 md:mx-6'>
                    <div className='text-center'>
                      <h4 className='text-xl font-semibold mt-1 mb-12 pb-1'>
                        Formulário de Cadastro de Administrador(a)
                      </h4>
                    </div>
                    <form>                       
                      <div className='mb-4'>                        
                        <input
                          type='text'
                          className='form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none'
                          placeholder='Informe nome do técnico'
                          name='nome'
                          value={nome} 
                          onChange={(e) => {setTecNome(e.target.value)}} 
                        />
                      </div>
                      <div className='grid grid-cols-2 gap-2'>   
                        <div className='mb-4'>
                          <input
                            type='email'
                            className='form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none'
                            placeholder='Informe email'
                            name='email'
                            value={email} 
                            onChange={(e) => {setTecEmail(e.target.value)}} 
                          />
                        </div>
                        <div className='mb-4'>
                          <input
                            type='text'
                            className='form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none'
                            placeholder='Informe celular'
                            name='celular'
                            value={celular} 
                            onChange={(e) => {setTecCelular(e.target.value)}} 
                          />
                        </div>
                      </div>
                      <div className='grid grid-cols-2 gap-2'> 
                        <div className='mb-4'>
                          <input
                            type='text'
                            className='form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none'
                            placeholder='Informe Cpf'
                            name='cpf'
                            value={cpf} 
                            onChange={(e) => {setTecCpf(e.target.value)}} 
                          />
                        </div>
                        <div className='mb-4'>
                          <input
                            type='date'
                            className='form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none'
                            placeholder='Informe Nascimento'
                            name='nascimento'
                            value={nascimento} 
                            onChange={(e) => {setTecNascimento(e.target.value)}} 
                          />
                        </div>
                        <div className='mb-4'>
                          <input
                            type='password'
                            className='form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none'
                            placeholder='Informe Senha'
                            name='password'
                            value={password} 
                            onChange={(e) => {setTecPassword(e.target.value)}} 
                          />
                        </div>
                        <div className='mb-4'>
                          <input
                            type='number'
                            className='form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none'
                            placeholder='Informe Nivel Acesso'
                            name='nivAcesso'
                            value={nivAcesso} 
                            onChange={(e) => {setNivAcesso(e.target.value)}} 
                          />
                        </div>
                      </div>                                         
                      <div className='text-center pt-1 mb-12 pb-1'>
                        <button
                          className='bg-green inline-block px-6 py-2.5 text-black hover:text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out w-full mb-3'
                          type='button'
                          onClick={handleCadastra}
                        >
                          Cadastra
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
export default CadAdmin;