import React from 'react';
import Header from '../components/Header';
import Menubar from '../components/Menubar';
import SearchTecnicos from '../components/SearchTecnicos';

const AdmTecnicos = () => {
    return (
    <div className='bg-white w-screen h-auto md:h-full'>
      <div className='flex flex-col w-screen '>
        <Menubar />
        <Header />
        <div className='ml-2 mr-2 md:ml-32 md:mr-32'>
            <SearchTecnicos />
        </div>            
      </div>      
    </div>
    );
};
export default AdmTecnicos;