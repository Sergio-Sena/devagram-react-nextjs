import { useEffect, useState } from "react";
import Postagem from "./Postagem";

export default function Feed({ usuarioLogado }) {
    const [listaDePostagem, setlistaDePostagem] = useState([]);

    useEffect(() => {
        console.log('carregar o feed');
        setlistaDePostagem([
            {
                id: '1',
                usuario: {
                    id: '1',
                    nome: 'Sergio',
                    avatar: null,
                },
                fotoDoPost: 'https://cdn3.image.seaart.ai/2023-05-27/28009593356357/5b1a92b7a6333eab79481984b7fe736df2df8225.png',
                descricao: '((obra-prima))), (((melhor qualidade))), ((ultra-detalhado)), (hiper-realista), (ilustração CG altamente detalhada), luz cinematográfica, fotorrealista, moça extremamente bonita, maquiagem leve, eaba detalhado intrincado, capa branca intrincada, pose dinâmica, lança',
                curtidas: [],
                comentarios: [
                    {
                        nome: 'Fulano',
                        mensagem: 'Muito Legal'
                    },
                    {
                        nome: 'Zé',
                        mensagem: 'Bem Loko'
                    },
                    {
                        nome: 'Rick',
                        mensagem: 'Bem da hora'
                    }
                ]
            },
            {
                id: '2',
                usuario: {
                    id: '2',
                    nome: 'Douglas',
                    avatar: null,
                },
                fotoDoPost: 'https://cdn6.image.seaart.ai/2023-05-18/24764635967557/719f580a13b498e7022a274bb0a2b6591941a2ab.png',
                descricao: 'Close up de uma menina com cabelo verde usando uma coroa de flores, arte estilo guweiz, retrato bonito da fantasia, retrato bonito do anime, retrato bonito da arte da fantasia, guweiz, guweiz na artstation pixiv, retrato elfo muito bonito, pintura digital lindo, retrato de rosto de anime impressionante, rosto bonito em tons de água, pintura digital bonita, realista: 1:2, etéreo, brilhante, detalhe fino, foto, capa, cabelo longo verde, dinâmico, flare, efeito de luzes, grinalda',
                curtidas: [],
                comentarios: [
                    {
                        nome: 'beltrano',
                        mensagem: 'Bem Legal'
                    }
                    
                ]
            },

        ])
    }, [usuarioLogado]);

    return (
        <div className="feedContainer largura30pctDesktop">
            {listaDePostagem && listaDePostagem.map(postagem => (
                <div>
                    <Postagem
                     key={postagem.id} 
                     {...postagem} 
                    usuarioLogado={usuarioLogado}
                     />
                </div>
            ))}
        </div>
    );
}