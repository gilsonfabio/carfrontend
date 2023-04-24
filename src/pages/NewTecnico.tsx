import React, {useState, useEffect} from 'react';
import Router, { useRouter } from "next/router";
import {api} from "../services/api";
import  ReCAPTCHA from "react-google-recaptcha";

const NewTecnico = () => {
    const [nome, setTecNome] = useState(''); 
    const [email, setTecEmail] = useState('');
    const [password, setTecPassword] = useState('');
    const [celular, setTecCelular] = useState('');
    const [cpf, setTecCpf] = useState('');
    const [nascimento, setTecNascimento] = useState('');

    const [emailExiste, setEmailExiste] = useState('');

    const [saving, setSaving] = useState(0);
    const [atualiza, setAtualiza] = useState(0);
    const router = useRouter();

    const [captchaIsDone, setCaptchaIsDone] = useState(false);

    const {query: { id }, } = router;

    async function handleCadastra(e:any){    
        e.preventDefault();
        
        let dadError = 0;

        if (nome === '') {
          alert('Nome não pode ser nulo!')
          dadError = 1
        }else {
          if (email === '') {
            alert('Email não pode ser nulo!')
            dadError = 1
          }else { 
            if (cpf === '') {
              alert('CPF não pode ser nulo!')
              dadError = 1
            }else {
              await api({
                method: 'get',    
                url: `searchTec/${cpf}`,
              }).then(function(resp) {
                dadError = 1
                setEmailExiste(resp.data.tecEmail)
                alert(`Já existe Técnico cadastro com esse CPF! ${emailExiste}`)                
              }).catch(function(error) {  
                //dadError = 0;              
              })
            }
          }    
        }
           
        if (dadError === 0) {
          api({
            method: 'post',    
            url: `cadtecnico`,
            data: {
              nome, 
              cpf, 
              nascimento, 
              email, 
              celular, 
              password                          
            },
          }).then(function(response) {
            alert('Técnico cadastrado com sucesso!')
            Router.back()
          }).catch(function(error) {
            alert('Erro no cadastro do técnico!')
          })
        }     
    }

    function onChange(value: any){
      console.log('Captcha value', value)
      setCaptchaIsDone(true)
    }

    return (
    <section className='flex justify-center items-center h-screen gradient-form bg-gray-200 md:h-screen'>
      <div className='container py-12 px-6 h-full'>
        <div className=' flex justify-center items-center flex-wrap h-full g-6 text-gray-800'>
          <div className=''>
            <div className='block bg-white shadow-lg rounded-lg'>
              <div className='lg:flex lg:flex-wrap g-0'>
                <div className='px-4 md:px-0'>
                  <div className='md:p-12 md:mx-6'>
                    <div className='text-center'>
                      <h4 className='text-xl font-semibold mt-1 mb-12 pb-1'>
                        Formulário de Cadastro de Técnicos
                      </h4>
                    </div>
                    <form>                       
                      <div className='mb-4'>                        
                        <input
                          required
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
                            required
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
                            required
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
                            required
                            type='text'
                            className='w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none'
                            placeholder='Informe Senha'
                            name='password'
                            value={password} 
                            onChange={(e) => {setTecPassword(e.target.value)}} 
                          />
                        </div>                        
                      </div>  
                      <div className='mb-4'>
                          <ReCAPTCHA 
                            sitekey={process.env.NEXT_PUBLIC_SITEKEY}
                            onChange={onChange}
                          />
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
export default NewTecnico;