import React, {useState, useEffect, useContext} from 'react';
import Link from 'next/link';
import Menubar from '../components/Menubar';
import Router, { useRouter } from "next/router";
import { AuthContext } from '../contexts/AuthContext';

interface localProps {
  token: string;
}

const Dashboard = () => {
    const router = useRouter();
    const { user } = useContext(AuthContext)
    const [idUsr, setIdUsuario] = useState(router.query.id);
    const [nivLiberado, setNivLiberado] = useState('');    
    const [nivAcesso, setNivAcesso] = useState(router.query.nivAce);
    const {query: { id }, } = router;
    const {query: { nivAce }, } = router;


    useEffect(() => {        
      setNivLiberado('9');      
    }, [])
    
    function handleMarcas(){
      Router.push({
        pathname: '/AdmMarcas',
        query: { id: `${idUsr}`, nivAce: `${nivAcesso}`}        
      })        
    }

    function handleModelos(){
      Router.push({
        pathname: '/AdmModelos', 
        query: { id: `${idUsr}`, nivAce: `${nivAcesso}`}        
      })        
    }

    function handleVeiculos(){
      Router.push({
        pathname: '/Veículos',        
      })        
    }

    function handleUsuarios(){
      Router.push({
        pathname: '/Usuários',
        query: { id: `${idUsr}`, nivAce: `${nivAcesso}`}        
      })        
    }

    function handleClientes(){
      Router.push({
        pathname: '/Clientes',        
      })        
    }

    return (
    <div className='bg-white w-screen h-auto md:h-full'>
      <div className='flex flex-col w-screen '>
        <Menubar />
      </div>
      <div className="md:ml-32 md:mr-32 text-green-500 p-2 grid grid-cols-1 gap-1 md:grid-cols-3 md:gap-2 mt-6" >  
        <button onClick={handleMarcas} className="">
          <div className="flex items-center justify-center h-24 rounded overflow-hidden shadow-2xl mb-5 " > 
            <p className="text-gray-700 text-2xl font-bold">
              Marcas
            </p>
          </div>
        </button> 
        <button onClick={handleModelos} className="" >
          <div className="flex items-center justify-center h-24 rounded overflow-hidden shadow-2xl mb-5 " > 
            <p className="text-gray-700 text-2xl font-bold">
              Modelos
            </p>
          </div>
        </button>
        <button onClick={handleVeiculos} className="" >            
            <div className="flex items-center justify-center h-24 rounded overflow-hidden shadow-2xl mb-5 " > 
              <p className="text-gray-700 text-2xl font-bold">
                Veículos
              </p>
            </div>
        </button> 
        <button onClick={handleUsuarios} className={ nivAcesso == nivLiberado ? "text-green-500" : "hidden" }>           
            <div className="flex items-center justify-center h-24 rounded overflow-hidden shadow-2xl mb-5 " > 
              <p className="text-gray-700 text-2xl font-bold">
                Usuários
              </p>
            </div>
        </button> 
        <button onClick={handleClientes} className="" >       
            <div className="flex items-center justify-center h-24 rounded overflow-hidden shadow-2xl mb-5 " > 
              <p className="text-gray-700 text-2xl font-bold">
                Clientes
              </p>
            </div>
        </button>                               
      </div>
    </div>
    );
};
export default Dashboard;