import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import UsuarioService from "../../services/UsuarioService";
import CabecalhoComAcoes from "../cabecalhoComAcoes";
import Avatar from "../avatar";
import Botao from "../botao";
import Image from "next/image";

//Imagens Importadas
import iconeSetaEsquerda from "../../public/imagens/setaEsquerda.svg"
import iconeLogOut from "../../public/imagens/logout.svg"


const usuarioService = new UsuarioService;

export default function CabecalhoPerfil({
    usuario,
    estaNoPerfilPessoal
}) {

    const [estaSeguindoOUsuaio, setEstaSeguindoOUsuario] = useState(false);
    const [quantidadeSeguidores, setQuantidadeSeguidores] = useState(0);
    const router = useRouter();

    useEffect(() => {
        if (!usuario) {
            return;
        }

        setEstaSeguindoOUsuario(usuario.segueEsseUsuario);
        setQuantidadeSeguidores(usuario.seguidores);
    }, [usuario]);

    const obterTextoBotaoSeguir = () => {
        if (estaNoPerfilPessoal) {
            return 'Editar Perfil'
        }

        if (estaSeguindoOUsuaio) {
            return 'Deixar de Seguir';
        }

        return 'Seguir';
    }

    const obterCorBotaoSeguir = () => {
        if (estaSeguindoOUsuaio || estaNoPerfilPessoal) {
            return 'invertido';
        }
        return 'primaria'
    };

    const manipularCliqueBotaoPrincipal = async () => {
        if (estaNoPerfilPessoal) {
            return router.push('/perfil/editar');
        }

        try {
            await usuarioService.alternarSeguir(usuario._id);
            setQuantidadeSeguidores(
                estaSeguindoOUsuaio
                    ? (quantidadeSeguidores - 1)
                    : (quantidadeSeguidores + 1)
            );
            setEstaSeguindoOUsuario(!estaSeguindoOUsuaio);
        } catch (error) {
            alert(`Erro ao seguir/ deixar de seguir!`);
        }
    }

    const aoClicarSetaEsquerda = () => {
        router.back();
    }

    const logout = () => {
        usuarioService.logout();
        router.replace('/');
    }

    const obterElementoDireitaCabecalho = () => {
        if (estaNoPerfilPessoal) {
            return (
                <Image
                    src={iconeLogOut}
                    alt="Icone Logout"
                    onClick={logout}
                    width={25}
                    height={25}
                />
            )
        }

        return null;
    }

    return (
        <div className="cabecalhoPerfil larguraDesktop ">
            <CabecalhoComAcoes
                iconeSetaEsquerda={
                    estaNoPerfilPessoal
                        ? null
                        : iconeSetaEsquerda
                }
                aoClicarAcaoEsquerda={aoClicarSetaEsquerda}
                titulo={usuario.nome}
                elementoDireita={obterElementoDireitaCabecalho()}
            />

            <hr className="divisoria" />

            <div className="statusPerfil">
                <Avatar src={usuario.avatar} />
                <div className="informacoesPerfil">
                    <div className="statusContainer">
                        <div className="status">
                            <strong>{usuario.publicacoes}</strong>
                            <span>Publicações</span>
                        </div>

                        <div className="status">
                            <strong>{quantidadeSeguidores} </strong>
                            <span>Seguidores</span>
                        </div>

                        <div className="status">
                            <strong>{usuario.seguindo} </strong>
                            <span>Seguindo</span>
                        </div>
                    </div>

                    <Botao
                        texto={obterTextoBotaoSeguir()}
                        cor={obterCorBotaoSeguir()}
                        manipularClick={manipularCliqueBotaoPrincipal}
                    />
                </div>
            </div>
            <hr className="divisoria mobile" />
        </div>
    )
}