import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

//Imagens
import imgHomeAtivo from '../../public/imagens/homeAtivo.svg'
import imgHomecinza from '../../public/imagens/homecinza.svg'
import imgPublicacaoAtivo from '../../public/imagens/publicacaoAtivo.svg'
import imgPublicacaoCinza from '../../public/imagens/publicacaoCinza.svg'
import imgUsuarioAtivo from '../../public/imagens/usuarioAtivo.svg'
import imgUsuarioCinza from '../../public/imagens/usuarioCinza.svg'

const mapaDeRotas = {
    home: {
        imagemAtivo: imgHomeAtivo,
        rotasAtivacao: ['/'],
        imagemPadrao: imgHomecinza
    },
    publicacao: {
        imagemAtivo: imgPublicacaoAtivo,
        rotasAtivacao: ['/publicacao'],
        imagemPadrao: imgPublicacaoCinza
    },
    perfil: {
        imagemAtivo: imgUsuarioAtivo,
        rotasAtivacao: ['/perfil/eu', 'perfil/eu/editar'],
        imagemPadrao: imgUsuarioCinza
    }
}

export default function Navegacao({ className }) {
    const [rotaAtiva, setRotaAtiva] = useState('home');
    const router = useRouter();

    useEffect(() => {
        definirRotaAtiva();
    }, [router.asPath]);

    //DEFINE QUAL ROTA ESTA ATIVA
    //  VERIFICA EM QUAL ROTA ESTA ATUALMENTE
    const definirRotaAtiva = () => {
        const chavesDoMapaDeRotas = Object.keys(mapaDeRotas); // busca as chaves do objeto
        const indiceAtivo = chavesDoMapaDeRotas.findIndex(chave => { //busca o indice dentro do array
            return mapaDeRotas[chave].rotasAtivacao.includes(   // verifica se dentro do arry existe o valor passado no parametro
                window.location.pathname // retorna a informaçao que esta dps da porta 
            );
        });
        if (indiceAtivo === -1) {
            setRotaAtiva('home')
        } else {
            setRotaAtiva(chavesDoMapaDeRotas[indiceAtivo]);
        }
    }

    const obterImagem = (nomeRota) => {
        const rotaAtivada = mapaDeRotas[nomeRota];

        if (rotaAtiva === nomeRota) {
            return rotaAtivada.imagemAtivo;
        }

        return rotaAtivada.imagemPadrao;
    }

    const aoClicarNoIcone = (nomeRota) => {
        setRotaAtiva(nomeRota);
        router.push(mapaDeRotas[nomeRota].rotasAtivacao[0]);
    }

    return (
        <nav className={`barraNavegacao ${className}`}>
            <ul>
                <li onClick={() => aoClicarNoIcone('home')}>
                    <Image
                        src={obterImagem('home')}
                        alt="icone Home "
                        width={20}
                        height={20}
                    />
                </li>
                <li onClick={() => aoClicarNoIcone('publicacao')}>
                    <Image
                        src={obterImagem('publicacao')}
                        alt="icone Publicacao "
                        width={20}
                        height={20}
                    />
                </li>
                <li onClick={() => aoClicarNoIcone('perfil')}>
                    <Image
                        src={obterImagem('perfil')}
                        alt="icone Usuario "
                        width={20}
                        height={20}
                    />
                </li>
            </ul>
        </nav>
    );
}