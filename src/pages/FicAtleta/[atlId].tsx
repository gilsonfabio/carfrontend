import React, { useState, useEffect } from 'react';
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import { TDocumentDefinitions } from "pdfmake/interfaces";
import { setCookie, parseCookies, destroyCookie } from 'nookies'

import Router, { useRouter } from 'next/router';

import { api } from "../../services/api";

import Menubar from '../../components/Menubar';

interface atletaProps {
    atlId: number;
    atlNome: string;
}

const FicAtleta = () => {
    const router = useRouter();
    const [atleta, setAtleta] = useState<Array<atletaProps>>([]);
    const [codAtleta, setCodAtleta] = useState(router.query.atlId);

    const [nomAtleta, setNomAtleta] = useState('');
    const [nasAtleta, setNasAtleta] = useState('');
    const [natAtleta, setNatAtleta] = useState('');
    const [cpfAtleta, setCpfAtleta] = useState('');
    const [paiAtleta, setPaiAtleta] = useState('');
    const [maeAtleta, setMaeAtleta] = useState('');
    const [civAtleta, setCivAtleta] = useState('');
    const [ideAtleta, setIdeAtleta] = useState('');
    const [orgAtleta, setOrgAtleta] = useState('');
    const [endAtleta, setEndAtleta] = useState('');

    pdfMake.vfs = pdfFonts.pdfMake.vfs;
    
    const [atualiza, setAtualiza] = useState(0);
    const [saving, setSaving] = useState(0);

    const { 'nextauth.token': token } = parseCookies();
    const { 'nextauth.refreshToken': refreshToken } = parseCookies();
    const { 'nextauth.usrId': idUsr } = parseCookies();
    const { 'nextauth.usrNome': nomUsr } = parseCookies();
    const { 'nextauth.usrNivAcesso': nivAcesso } = parseCookies();

    const {query: { atlId } } = router

    const reportTitle: any = [            
        [
            {text: `PREFEITURA DE APARECIDA DE GOIÂNIA`, fontSize: 12, bold: true, alignment: 'center', },
            {text: `SECRETARIA DE ESPORTE, LAZER E JUVENTUDE`, fontSize: 12, bold: true, alignment: 'center',},
            {text: `BOLETIM DE INSCRIÇÃO INICIAL DE ATLETA`, fontSize: 12, bold: true, alignment: 'center',},
        ],             
    ];
    const subtexto: any = [      
        [
            {text: `\n\n\nExmo Sr. Secretário Esporte, Lazer e Juventude. O abaixo assinado sócio-atleta do clube: _____________________________________\n\n`, fontSize: 10, bold: false, },     
            {text: `modalidade: _______________________________ vem solicitar de Vossa Excelência, que se digne, inscrição nesta entidade, para o \n\n`, fontSize: 10, bold: false, alignment: 'justify',},
            {text: `fornece as seguintes informações:\n\n`, fontSize: 10, bold: false, alignment: 'justify',},
        ],             
    ];
    
    const dados = atleta.map((row) => {
        return [
            {text: row.atlId, fontSize: 9, margin: [0, 2, 0, 2]},
            {text: row.atlNome, fontSize: 9, margin: [0, 2, 0, 2]},
        ]              
    });

    const details = [            
            {
                style: 'tableExample',
                table: {
                    widths: ['100%'],
                    heights: [20],
                    body: [
                    [
                        { 
                            text: `Nome Atleta: ${nomAtleta}`,
                            fontSize: 14,
                            bold: true,
                        },             
                    ],
                ],
                },
            },
            { 
                table: {
                    widths: ['50%', '50%'],
                    heights: [20,20],                    
                    body: [
                        [
                            { 
                                text: `Nascimento: ${nasAtleta}`,
                                border:[true, false, true, true],
                                fontSize: 9,
                                bold: true,                                
                            },
                                                          
                            { 
                                text: `Local de Nascimento: ${natAtleta} `, alignment: 'left', 
                                border:[true, false, true, true],
                                fontSize: 9,
                                bold: true
                            }
                        ],
                    ],
                }
            },
            { 
                table: {
                    widths: ['50%', '50%'],
                    heights: [20,20],                    
                    body: [
                        [
                            { 
                                text: `Endereço: ${endAtleta} `,
                                border:[true, false, true, true],
                                fontSize: 9,
                                bold: true,                                
                            },
                                                          
                            { 
                                text: `CPF: ${cpfAtleta} `, alignment: 'left', 
                                border:[true, false, true, true],
                                fontSize: 9,
                                bold: true
                            }
                        ],
                    ],
                }
            },
            { 
                table: {
                    widths: ['50%', '50%'],
                    heights: [20,20],                    
                    body: [
                        [
                            { 
                                text: `Pai: ${paiAtleta}`,
                                border:[true, false, true, true],
                                fontSize: 9,
                                bold: true,                                
                            },
                                                          
                            { 
                                text: `Mãe: ${maeAtleta} `, alignment: 'left', 
                                border:[true, false, true, true],
                                fontSize: 9,
                                bold: true
                            }
                        ],
                    ],
                }
            },
            { 
                table: {
                    widths: ['50%', '50%'],
                    heights: [20,20],                    
                    body: [
                        [
                            { 
                                text: `Estado Civil: ${civAtleta}`,
                                border:[true, false, true, true],
                                fontSize: 9,
                                bold: true,                                                              
                            },
                                                          
                            { 
                                text: `Identidade: ${ideAtleta} ${orgAtleta} `, alignment: 'left', 
                                border:[true, false, true, true],
                                fontSize: 9,
                                bold: true
                            }
                        ],
                    ],
                }
            },
            {
                style: 'tableExample',
                table: {
                    widths: ['100%'],
                    heights: [100],
                    body: [
                    [
                        { 
                            text: `Atesto que o requerente foi admitido ao quadro social do nosso clube, na categoria de sócio atleta e que são verdadeiras as informações acima, pelas quais o clube assume inteira responsabilidade.`,                           
                            fontSize: 10,
                            bold: false,
                        },                                                           
                    ],
                ],
                },
                layout: 'noBorders'
            },
            {
                style: 'tableExample',
                table: {
                    widths: ['100%'],
                    heights: [20],
                    body: [
                    [
                        { 
                            text: `Aparecida de Goiânia, _________ de _______________________________________ de ____________.`,                           
                            fontSize: 10,
                            bold: false,
                            alignment: 'right',
                        },                                                           
                    ],
                ],
                },
                layout: 'noBorders'
            },
            {
                style: 'tableExample',
                table: {
                    widths: ['100%'],
                    heights: [20],
                    body: [
                    [
                        { 
                            text: `Assinatura presidente do clube`,                           
                            fontSize: 10,
                            bold: false,
                            alignment: 'center',
                        },                                                           
                    ],
                ],
                },
                layout: 'noBorders'
            },
            {
                style: 'tableExample',
                table: {
                    widths: ['100%'],
                    heights: [20],
                    body: [
                    [
                        { 
                            text: `Autorização`,                           
                            fontSize: 14,
                            bold: true,
                            alignment: 'center',
                        },                                                           
                    ],
                ],
                },
                layout: 'noBorders'
            },
            {
                style: 'tableExample',
                table: {
                    widths: ['100%'],
                    heights: [20],
                    body: [
                    [
                        { 
                            text: `Autorizo ao menor assinar como atleta (modalidade)`,                           
                            fontSize: 10,
                            bold: false,
                            alignment: 'center',
                        },                                                           
                    ],
                ],
                },
                layout: 'noBorders'
            },
            {
                style: 'tableExample',
                table: {
                    widths: ['100%'],
                    heights: [20],
                    body: [
                    [
                        { 
                            text: `Pai (  ) Mãe (  )`,                           
                            fontSize: 10,
                            bold: false,
                            alignment: 'center',
                        },                                                           
                    ],
                ],
                },
                layout: 'noBorders'
            },
            {
                style: 'tableExample',
                table: {
                    widths: ['100%'],
                    heights: [20],
                    body: [
                    [
                        { 
                            text: `(se menor reconhecer firma)`,                           
                            fontSize: 10,
                            bold: true,
                            alignment: 'center',
                        },                                                           
                    ],
                ],
                },
                layout: 'noBorders'
            },
            {
                style: 'tableExample',
                table: {
                    widths: ['100%'],
                    heights: [10],
                    body: [
                    [
                        { 
                            text: `___________________________________________________                                           _________________________________________________`,                           
                            fontSize: 10,
                            bold: true,
                            alignment: 'center',
                        },                                                           
                    ],
                ],
                },
                layout: 'noBorders'
            },
            {
                style: 'tableExample',
                table: {
                    widths: ['100%'],
                    heights: [30],
                    body: [
                    [
                        { 
                            text: `Assinatura do responsável                                                                              Assinatura do Atleta`,                           
                            fontSize: 10,
                            bold: true,
                            alignment: 'center',
                        },                                                           
                    ],
                ],
                },
                layout: 'noBorders'
            },
            { 
                table: {
                    widths: ['80%', '20%'],
                    heights: [140,140],                    
                    body: [
                        [
                            { 
                                text: `Observações: `,
                                border:[true, true, true, true],
                                fontSize: 9,
                                bold: true,                                
                            },
                                                          
                            { 
                                text: `Foto 3x4: `, alignment: 'center', 
                                border:[true, true, true, true],
                                fontSize: 9,
                                bold: true
                            }
                        ],
                    ],
                }
            },                      
           
    ];

    const docDefinition: TDocumentDefinitions = {
        pageSize: 'A4',
        pageMargins: [15, 50, 15, 40],

        header: [reportTitle],
        content: [subtexto,details],
    };
   
    useEffect(() => {        
        let atlId = codAtleta;

        api({
            method: 'get',    
            url: `busAtleta/${atlId}`,
            headers: {
                "x-access-token" : token    
            },      
        }).then(function(resp) {
            setAtleta(resp.data);  
            setNomAtleta(resp.data[0].atlNome)
            setNasAtleta(resp.data[0].atlNascimento)
            setNatAtleta(resp.data[0].atlNatural)
            setCpfAtleta(resp.data[0].atlCpf)
            setPaiAtleta(resp.data[0].atlNomPai)
            setMaeAtleta(resp.data[0].atlNomMae)
            setEndAtleta(resp.data[0].atlEndereco)
            setIdeAtleta(resp.data[0].atlIdentidade)
            setOrgAtleta(resp.data[0].atlOrgEmissor)
            setCivAtleta(resp.data[0].atlEstCivil)
        }).catch(function(error) {           
            handleRefreshToken()                 
        })

    },[atualiza]);

    function emitePdf() {
        pdfMake.createPdf(docDefinition).open();       
        //pdfMake.createPdf(docDefinition).download();  
    };
    
    async function handleRefreshToken(){
        await api({
            method: 'post',    
            url: `refreshToken`,
            data: {
                idUsr,                            
            },
            headers: {
                "x-access-token" : refreshToken    
            },      
        }).then(function(response) {
            destroyCookie({}, 'nextauth.token');
            destroyCookie({}, 'nextauth.usrId');
            destroyCookie({}, 'nextauth.usrNome');
            destroyCookie({}, 'nextauth.usrNivAcesso');
            destroyCookie({}, 'nextauth.refreshToken'); 
            
            setCookie(undefined, 'nextauth.token', response.data.token, {maxAge: 60 * 60 * 1, })
            setCookie(undefined, 'nextauth.refreshToken', response.data.refreshToken, {maxAge: 60 * 60 * 1, })
            setCookie(undefined, 'nextauth.usrId', response.data.user.usrId, {maxAge: 60 * 60 * 1, })
            setCookie(undefined, 'nextauth.usrNome', response.data.user.usrNome, {maxAge: 60 * 60 * 1, })
            setCookie(undefined, 'nextauth.usrNivAcesso', response.data.user.usrNivAcesso, {maxAge: 60 * 60 * 1, })                
            setAtualiza(atualiza + 1)
        }).catch(function(error) {
            alert(`Falha no token de acesso aos técnicos`);
            Router.push({
                pathname: '/',        
            })      
        })
    }

    return (
        <div>
           <Menubar />
            <div className="login">
                <div className='flex flex-row justify-center items-center h-56'>
                    <a onClick={emitePdf} className='w-[20%] h-[20%] bg-gray-300 flex flex-row justify-center items-center rounded-lg text-[15px] text-black font-bold mb-0 hover:cursor-pointer hover:bg-gray-600 hover:text-white transition duration-150 ease-in-out'>
                        <div className=''>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6.72 13.829c-.24.03-.48.062-.72.096m.72-.096a42.415 42.415 0 0110.56 0m-10.56 0L6.34 18m10.94-4.171c.24.03.48.062.72.096m-.72-.096L17.66 18m0 0l.229 2.523a1.125 1.125 0 01-1.12 1.227H7.231c-.662 0-1.18-.568-1.12-1.227L6.34 18m11.318 0h1.091A2.25 2.25 0 0021 15.75V9.456c0-1.081-.768-2.015-1.837-2.175a48.055 48.055 0 00-1.913-.247M6.34 18H5.25A2.25 2.25 0 013 15.75V9.456c0-1.081.768-2.015 1.837-2.175a48.041 48.041 0 011.913-.247m10.5 0a48.536 48.536 0 00-10.5 0m10.5 0V3.375c0-.621-.504-1.125-1.125-1.125h-8.25c-.621 0-1.125.504-1.125 1.125v3.659M18 10.5h.008v.008H18V10.5zm-3 0h.008v.008H15V10.5z" />
                            </svg>
                        </div>
                        <div>
                            <span className='w-[50%] ml-3'>Emite PDF</span>
                        </div>
                    </a>    
                </div>                
            </div>
        </div>
    );
}

export default FicAtleta;