import React, {useState, useEffect} from 'react';
import Router from 'next/router';
import { useRouter } from "next/router";

import api from '../api/api';

interface atletaProps {
    atlId: number;
    atlNome: string;
    atlNascimento: string;
    atlCpf: string;
    atlIdentidade: string;
    atlOrgEmissor: string;
    atlNatural: string;
    atlEstCivil: string;
    atlNomPai: string;
    atlNomMae: string;
    atlEndereco: string;
    atlIdEquipe: number;
}

const AltAdmin = () => {
    const router = useRouter();

    const [usuario, setUsuario] = useState([]);
    const [usrNome, setNome] = useState(''); 
    const [usrEmail, setEmail] = useState('');
    const [usrPassword, setPassword] = useState('');
    const [usrCelular, setCelular] = useState('');
    const [usrCpf, setCpf] = useState('');
    const [usrNascimento, setNascimento] = useState('');
    const [nasc, setNasc] = useState('');
    const [usrNivAcesso, setNivAcesso] = useState('');
    const [idUsr, setIdUsuario] = useState(router.query.usrId);
    
    const {query: { usrId }, } = router;

    useEffect(() => {    
    
        setIdUsuario(usrId);
  
        api.get(`/dadUsuario/${idUsr}`).then(response => {
          setUsuario(response.data);
          setNome(response.data[0].usrNome); 
          setNascimento(response.data[0].usrNascimento); 
          setNasc(response.data[0].usrNascimento); 
          setCpf(response.data[0].usrCpf); 
          setNivAcesso(response.data[0].usrNivAcesso); 
          setCelular(response.data[0].usrCelular);
          setEmail(response.data[0].usrEmail);  
        })            
    }, [])

    async function handleAlteracao(e:any){      
        e.preventDefault();
        setIdUsuario(usrId);
        try {
            api.put(`updUsuario/${idUsr}`, {
                usrNome, 
                usrNascimento, 
                usrCpf, 
                usrCelular,
                usrEmail,
                usrNivAcesso
            }).then(() => {
                alert('Usuário alterado com sucesso!')
            }).catch(() => {
                alert('Erro na alteração!');
            })  
            Router.back();
        }catch (err) {
            alert('Falha na alteração do usuário!');
        }  
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
                        Formulário Alteração de Usuário
                      </h4>
                    </div>
                    <form>                       
                      <div className='mb-4'>                        
                        <input
                          type='text'
                          className='form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none'
                          placeholder='Informe nome do técnico'
                          name='nome'
                          value={usrNome} 
                          onChange={(e) => {setNome(e.target.value)}} 
                        />
                      </div>
                      <div className='grid grid-cols-2 gap-2'>   
                        <div className='mb-4'>
                          <input
                            type='email'
                            className='form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none'
                            placeholder='Informe email'
                            name='email'
                            value={usrEmail} 
                            onChange={(e) => {setEmail(e.target.value)}} 
                          />
                        </div>
                        <div className='mb-4'>
                          <input
                            type='text'
                            className='form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none'
                            placeholder='Informe celular'
                            name='celular'
                            value={usrCelular} 
                            onChange={(e) => {setCelular(e.target.value)}} 
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
                            value={usrCpf} 
                            onChange={(e) => {setCpf(e.target.value)}} 
                          />
                        </div>
                        <div className='mb-4'>
                          <input
                            type='date'
                            className='form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none'
                            placeholder='Informe Nascimento'
                            name='nascimento'
                            value={usrNascimento} 
                            onChange={(e) => {setNascimento(e.target.value)}} 
                          />
                        </div>                        
                        <div className='mb-4'>
                          <input
                            type='number'
                            className='form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none'
                            placeholder='Informe Nivel Acesso'
                            name='nivAcesso'
                            value={usrNivAcesso} 
                            onChange={(e) => {setNivAcesso(e.target.value)}} 
                          />
                        </div>
                      </div>                            
                      <div className='text-center pt-1 mb-12 pb-1'>
                        <button
                          className='bg-green inline-block px-6 py-2.5 text-black hover:text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out w-full mb-3'
                          type='button'
                          onClick={handleAlteracao}
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
export default AltAdmin;