import React, {useState} from 'react';
import Header from '../components/Header';
import Menubar from '../components/Menubar';
import SearchEventos from '../components/SearchEventos';
import Router, { useRouter } from "next/router";

const AdmEventos = () => {
  const router = useRouter();
  const [idUsr, setIdUsuario] = useState(router.query.id);
  const [nivAcesso, setNivAcesso] = useState(router.query.nivAce);
  const {query: { id, nivAce } } = router;

  return (
    <div className='bg-white w-screen h-auto md:h-full'>
      <div className='flex flex-col w-screen '>
        <Menubar />
        <Header />
        <div className='ml-2 mr-2 md:ml-32 md:mr-32'>
            <SearchEventos usrId={idUsr} nivel={nivAcesso} />
        </div>            
      </div>      
    </div>
  );
};
export default AdmEventos;