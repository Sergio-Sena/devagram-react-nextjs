import Link from "next/link";
import Image from "next/image";
import Avatar from "../avatar";

//Import de imagens

import imgCurtir from "../../public/imagens/curtir.svg"
import imgCurtido from "../../public/imagens/curtido.svg"
import imgComentarioAtivo from "../../public/imagens/comentarioAtivo.svg"
import imgComentarioCinza from "../../public/imagens/comentarioCinza.svg"


export default function Postagem({
    usuario,
    fotoDoPost,
    descricao,
    comentarios

}) {
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
                        onClick={() => console.log('comentar')}
                    />
                    <span className="quantidadedeCurtidas">
                        Curtido por <strong>32 pessoas</strong>
                    </span>
                    <div className="descricaoDaPostagem">
                        <strong className="nomeUsuario">{usuario.nome}</strong>
                        <p className="descricao">
                            {descricao}
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
        </div>
    )
}