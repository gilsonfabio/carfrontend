import React, {useState, useEffect, useContext} from 'react';
import Link from 'next/link';
import Header from '../components/Header';
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
    
    function handleModalidades(){
      Router.push({
        pathname: '/AdmModalidades',
        query: { id: `${idUsr}`, nivAce: `${nivAcesso}`}        
      })        
    }

    function handleEventos(){
      Router.push({
        pathname: '/AdmEventos', 
        query: { id: `${idUsr}`, nivAce: `${nivAcesso}`}        
      })        
    }

    function handleEquipes(){
      Router.push({
        pathname: '/AdmEquipes',        
      })        
    }

    function handleAdmin(){
      Router.push({
        pathname: '/AdmAdmin',
        query: { id: `${idUsr}`, nivAce: `${nivAcesso}`}        
      })        
    }

    function handleTecnicos(){
      Router.push({
        pathname: '/AdmTecnicos',        
      })        
    }

    return (
    <div className='bg-white w-screen h-auto md:h-full'>
      <div className='flex flex-col w-screen '>
        <Menubar />
        <Header />        
      </div>
      <div className="md:ml-32 md:mr-32 text-green-500 p-2 grid grid-cols-1 gap-1 md:grid-cols-3 md:gap-2 mt-6" >  
        <button onClick={handleModalidades} className="">
          <div className="flex items-center justify-center h-24 rounded overflow-hidden shadow-2xl mb-5 " > 
            <p className="text-gray-700 text-2xl font-bold">
              Modalidades
            </p>
          </div>
        </button> 
        <button onClick={handleEventos} className="" >
          <div className="flex items-center justify-center h-24 rounded overflow-hidden shadow-2xl mb-5 " > 
            <p className="text-gray-700 text-2xl font-bold">
              Eventos
            </p>
          </div>
        </button>
        <button onClick={handleEquipes} className="" >            
            <div className="flex items-center justify-center h-24 rounded overflow-hidden shadow-2xl mb-5 " > 
              <p className="text-gray-700 text-2xl font-bold">
                Equipes
              </p>
            </div>
        </button> 
        <button onClick={handleAdmin} className={ nivAcesso == nivLiberado ? "text-green-500" : "hidden" }>           
            <div className="flex items-center justify-center h-24 rounded overflow-hidden shadow-2xl mb-5 " > 
              <p className="text-gray-700 text-2xl font-bold">
                Administradores
              </p>
            </div>
        </button> 
        <button onClick={handleTecnicos} className="" >       
            <div className="flex items-center justify-center h-24 rounded overflow-hidden shadow-2xl mb-5 " > 
              <p className="text-gray-700 text-2xl font-bold">
                Técnicos
              </p>
            </div>
        </button>                               
      </div>
    </div>
    );
};
export default Dashboard;