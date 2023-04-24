import React, { useState, useEffect } from 'react';
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import { TDocumentDefinitions } from "pdfmake/interfaces";
import moment from 'moment';
import Router, { useRouter } from 'next/router';
import { setCookie, parseCookies, destroyCookie } from 'nookies'

import Menubar from '../../components/Menubar';

import { api } from "../../services/api";

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
    atlIdEquipe: string;
    atlStatus: string;
}

const FicEquipe = () => {
    const router = useRouter();
    const [atletas, setAtletas] = useState<Array<atletaProps>>([]);
    
    const [equDescricao, setEquDescricao] = useState('');
    const [equIdEvento, setEquIdEvento] = useState('');
    const [equRegiao, setEquRegiao] = useState('');
    const [equResp, setEquResp] = useState('');
    const [equTecnico, setequTecnico] = useState('');
    const [equDirigente, setEquDirigente] = useState('');
    const [tecCelular, setTecCelular] = useState('');
    const [tecEmail, setTecEmail] = useState('');
    const [tecNome, setTecNome] = useState('');
    const [idEqu, setIdEquipe] = useState(router.query.equId);

    const [atualiza, setAtualiza] = useState(0);
    const [saving, setSaving] = useState(0);

    const { 'nextauth.token': token } = parseCookies();
    const { 'nextauth.refreshToken': refreshToken } = parseCookies();
    const { 'nextauth.usrId': idUsr } = parseCookies();
    const { 'nextauth.usrNome': nomUsr } = parseCookies();
    const { 'nextauth.usrNivAcesso': nivAcesso } = parseCookies();

    pdfMake.vfs = pdfFonts.pdfMake.vfs;
    
    const {query: { equId }, } = router

    const reportTitle: any = [
        {
            text: `Ficha inscrição da Equipe`,
            fontSize: 15,
            bold: true,
            margin: [15, 20, 0, 45],
        },       
    ];
   
    const dados = atletas.map((row) => {
        return [
            {text: row.atlNome, fontSize: 8, margin: [0, 2, 0, 2]},
            {text: moment(row.atlNascimento).format('DD-MM-YYYY'), fontSize: 8, margin: [0, 2, 0, 2]},
            {text: row.atlCpf, fontSize: 8, margin: [0, 2, 0, 2]},
            {text: row.atlIdentidade, fontSize: 8, margin: [0, 2, 0, 2]},
            {text: row.atlOrgEmissor, fontSize: 8, margin: [0, 2, 0, 2]},
            {text: row.atlNomPai, fontSize: 8, margin: [0, 2, 0, 2]},
            {text: row.atlNomMae, fontSize: 8, margin: [0, 2, 0, 2]},
        ]              
    });
    
    const details = [
        { 
            table: {
                widths: ['80%', '20%'],
                heights: [15,15],                    
                body: [
                    [
                        { 
                            text: `Equipe: ${equDescricao} `,
                            border:[true, true, true, true],
                            fontSize: 9,
                            bold: true,                                
                        },
                                                      
                        { 
                            text: `Região: ${equRegiao}`,  
                            border:[true, true, true, true],
                            fontSize: 9,
                            bold: true
                        }
                    ],
                ],
            }
        },
        { 
            table: {
                widths: ['40%', '30%','30%'],
                heights: [15,15,15],                    
                body: [
                    [
                        { 
                            text: `Técnico: ${tecNome} `,
                            border:[true, true, true, true],
                            fontSize: 9,
                            bold: true,                                
                        },                                                   
                        { 
                            text: `Telefone: ${tecCelular}`,  
                            border:[true, true, true, true],
                            fontSize: 9,
                            bold: true
                        },
                                                      
                        { 
                            text: `Email: ${tecEmail}`,  
                            border:[true, true, true, true],
                            fontSize: 9,
                            bold: true
                        }
                    ],
                ],
            }
        },
        { 
            table: {
                widths: ['40%', '30%','30%'],
                heights: [15,15,15],                    
                body: [
                    [                        
                        { 
                            text: `Responsável: ${equResp} `,
                            border:[true, true, true, true],
                            fontSize: 9,
                            bold: true,                                
                        },                                                         
                        { 
                            text: `Dirigente: ${equDirigente}`,  
                            border:[true, true, true, true],
                            fontSize: 9,
                            bold: true
                        },
                                                      
                        { 
                            text: `RG: `,  
                            border:[true, true, true, true],
                            fontSize: 9,
                            bold: true
                        }
                    ],
                ],
            }
        }, 
        { 
            table: {
                widths: ['100%'],
                heights: [15],                    
                body: [
                    [
                        { 
                            text: `RELAÇÃO DE ATLETAS`,
                            alignment: 'center',
                            border:[true, true, true, true],
                            fontSize: 9,
                            bold: true,                                
                        },                       
                    ],
                ],
            }
        },             
        {
            table: {
                headerRows: 1,
                border:[true, true, true, true],
                widths: [198, 70, 60, 80, 40, 150, 150],
                heights: [10],
                body: [
                    [
                        {text: 'NOME',  fontSize: 9, bold: true},
                        {text: 'NASCIMENTO', fontSize: 9, bold: true},
                        {text: 'CPF', fontSize: 9, bold: true},                        
                        {text: 'IDENTIDADE', fontSize: 9, bold: true},
                        {text: 'EMISSOR', fontSize: 9, bold: true},
                        {text: 'NOME PAI', fontSize: 9, bold: true},
                        {text: 'NOME MÃE', fontSize: 9, bold: true},
                    ],
                    ...dados
                ]
            },

        },
        {
            style: 'tableExample',
            table: {
                widths: ['100%'],
                heights: [10],
                body: [
                [
                    { 
                        text: `\nEu,__________________________________________________________, CPF:_______________________________, RG:_______________________________ representante da equipe acima citada, declaro verídicas todas as informações constantes`,                           
                        fontSize: 8,
                        bold: false,
                        alignment: 'justify',
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
                        text: `na Ficha de Inscrição, me responsabilizando pela mesma, em caso de ausência do representante legal, deverá ser feito uma procuração assinada em cartório por alguem de confiança da equipe. Menores de 16 anos devem trazer`,                           
                        fontSize: 8,
                        bold: false,
                        alignment: 'justify',
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
                        text: ` autorização do responsável legal, com reconhecimento da assinatura em cartório. A ficha deverá ser entregue digitada, deverá ser entregue digitada, nome do atleta completo e cópia do documento oficial do atleta. Os atletas`,                           
                        fontSize: 8,
                        bold: false,
                        alignment: 'justify',
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
                        text: `relacionados nesta ficha de inscrição ficam cientes que serão representados pelos declarantes acima, responsável por qualquer tipo de assunto na Secretária Municipal de Esporte, Lazer e Juventude, assim como recebimento`,                           
                        fontSize: 8,
                        bold: false,
                        alignment: 'justify',
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
                        text: `de premiações financeiras, caso a equipe conquiste, e automaticamente esta autorizando o uso de sua imagem durante a competição organizada pela administração municipal. `,                           
                        fontSize: 8,
                        bold: false,
                        alignment: 'justify',
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
                        text: `Obs.: A ficha deve ser entregue junto com a cópia dos documentos dos atletas, técnicos e dirigente inscritos.`,                           
                        fontSize: 8,
                        bold: false,
                        alignment: 'justify',
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
                        text: `\nData: ____________/______________/______________. Ass:_________________________________________________________________`,                           
                        fontSize: 8,
                        bold: false,
                        alignment: 'justify',
                    },                                                           
                ],
            ],
            },
            layout: 'noBorders'
        },
    ];
    
    function Rodape(){      
        return [  
            {
                columns: [
                    {text: 'Rodapé..............', alignment: 'left', fontSize: 10, margin: [10,0,0,0]},
                  
                ],
            },                    
        ]
    };
    
    const docDefinition: TDocumentDefinitions  = {
        pageSize: 'A4',
        pageOrientation: 'landscape',
        pageMargins: [15, 50, 15, 40],
    
        header: [reportTitle],
        content: [details],        
    };
   
    useEffect(() => {
        
        setIdEquipe(equId);

        api({
            method: 'get',    
            url: `dadEquipe/${idEqu}`,
            headers: {
                "x-access-token" : token    
            },      
        }).then(function(response) {
            setEquDescricao(response.data[0].equDescricao);
            setEquIdEvento(response.data[0].equIdEvento);
            setEquRegiao(response.data[0].equRegiao);
            setEquResp(response.data[0].equResp);
            setequTecnico(response.data[0].equTecnico);
            setEquDirigente(response.data[0].equDirigente); 
            setTecNome(response.data[0].tecNome);    
            setTecEmail(response.data[0].tecEmail); 
            setTecCelular(response.data[0].tecCelular);           
        }).catch(function(error) {           
            handleRefreshToken()                 
        })

        api({
            method: 'get',    
            url: `atlEquipe/${idEqu}`,
            headers: {
                "x-access-token" : token    
            },      
        }).then(function(resp) {
            setAtletas(resp.data);           
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
            alert(`Falha no token de acesso aos dados da equipe`);
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

export default FicEquipe;


