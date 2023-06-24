import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Avatar from "../avatar";

//Import de imagens

import imgCurtir from "../../public/imagens/curtir.svg"
import imgCurtido from "../../public/imagens/curtido.svg"
import imgComentarioAtivo from "../../public/imagens/comentarioAtivo.svg"
import imgComentarioCinza from "../../public/imagens/comentarioCinza.svg"
import { FazerComentario } from "./FazerCometario";

const tamanhoLimetiDescricao = 86;

export default function Postagem({
    usuario,
    fotoDoPost,
    descricao,
    comentarios,
    usuarioLogado

}) {
    const [deveExibirSecaoComentar, setDeveExibirSecaoComentar] = useState(false);

    const [tamanhoAtualDescricao, setTamanhoAtualDescricao] = useState(
        tamanhoLimetiDescricao
    );

    const descricaoCompleta = () => {
        setTamanhoAtualDescricao(Number.MAX_SAFE_INTEGER)
    }

    const descricaoMaiorQueLimite = () => {
        return (descricao.length > tamanhoAtualDescricao)
    }


    const obterDescricao = () => {
        let mensagem = descricao.substring(0, tamanhoAtualDescricao);
        if (descricaoMaiorQueLimite()) {
            mensagem += '...'
        }
        return mensagem;
    }
    return (
        <div className="postagem">
            <Link href={`/perfil/${usuario.id}`}>
                <section className="headerPostagem">
                    <Avatar src={usuario.avatar} />
                    <strong>{usuario.nome}</strong>
                </section>
            </Link>
            <div className="fotoDaPostagem">
                <img src={fotoDoPost} alt="Foto da postagem" />
            </div>
            <div className="rodapeDaPostagem">
                <div className="acoesDaPostagem">
                    <Image
                        src={imgCurtir}
                        alt='icone Curtir'
                        width={20}
                        height={20}
                        onClick={() => console.log('curtir')}
                    />
                    <Image
                        src={imgComentarioCinza}
                        alt='icone comentar'
                        width={20}
                        height={20}
                        onClick={() => setDeveExibirSecaoComentar(!deveExibirSecaoComentar)}
                    />
                    <span className="quantidadedeCurtidas">
                        Curtido por <strong>32 pessoas</strong>
                    </span>
                    <div className="descricaoDaPostagem">
                        <strong className="nomeUsuario">{usuario.nome}</strong>
                        <p className="descricao">
                            {obterDescricao()}
                            {descricaoMaiorQueLimite() && (
                                <span
                                    onClick={descricaoCompleta}
                                    className="descricaoCompleta">
                                    mais
                                </span>
                            )}
                        </p>
                    </div>
                </div>
                <div className="comentariosDaPublicacao">
                    {comentarios.map((comentario, i) => (
                        <div className="comentario" key={i}>
                            <strong className="nomeUsuario">{comentario.nome}</strong>
                            <p className="descricao">{comentario.mensagem}</p>
                        </div>
                    ))}
                </div>
            </div>
            {deveExibirSecaoComentar &&
                <FazerComentario usuarioLogado={usuarioLogado} />
            }
        </div>
    )
}