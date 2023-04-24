import React from 'react'
import Image from 'next/image'
import Router, { useRouter } from "next/router";

//import logoBarra from '../assets/images/logo-barra.png'
import Link from 'next/link';

function handleHome() {
    localStorage.clear();
    Router.push({
        pathname: '/',        
      })      
}

const Menubar = () => {   
    const router = useRouter();

    return (
        <nav className="bg-black p-2">
            <div className="flex justify-between items-center mx-auto">
                <div className="flex flex-row items-center ml-2 md:ml-36" >
                    <div className="flex items-center ">
                        <button onClick={handleHome} >
                            <Image src={'/images/logo-barra.png'} alt="Logo Prefeitura" width={120} height={30} />
                        </button>                        
                    </div>                    
                </div> 
                                       
            </div>
        </nav> 
    )
}

export default Menubar

