
import React, { useEffect, useState } from "react";
import Postagem from "./Postagem";
import FeedService from "../../services/FeedService";


const feedService = new FeedService();

export default function Feed({ usuarioLogado, usuarioPerfil }) {
    const [listaDePostagens, setListaDePostagens] = useState([]);

    useEffect(() => {
        setListaDePostagens([]);
        async function carregarPostagens() {
            const { data } = await feedService.carregarPostagens(usuarioPerfil?._id);

            const postagensFormatadas = data.map((postagem) => (
                {
                    id: postagem._id,
                    usuario: {
                        id: postagem.idUsuario,
                        nome: postagem?.usuario?.nome || usuarioPerfil?.nome,
                        avatar: postagem?.usuario?.avatar || usuarioPerfil?.avatar,
                    },
                    fotoDoPost: postagem.foto,
                    descricao: postagem.descricao,
                    curtidas: postagem.likes,
                    comentarios: postagem.comentarios.map((c) => ({
                        nome: c.nome,
                        mensagem: c.comentario,
                    }
                    )),
                }));
            setListaDePostagens(postagensFormatadas);
        }
        carregarPostagens();
    }, [usuarioLogado, usuarioPerfil]);

    if (!listaDePostagens.length) {
        return null;
    }

    return (
        <div className="feedContainer largura30pctDesktop">
            {listaDePostagens.map(dadosPostagem => (
                <Postagem
                    key={dadosPostagem.id}
                    {...dadosPostagem}
                    usuarioLogado={usuarioLogado}
                />
            ))
            }
        </div>
    )
}