import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Avatar from "../avatar";
import Feed from "../feed";
import FazerComentario from "../feed/FazerCometario";
import FeedService from "@/services/FeedService";

// Import das Imagens
import imgCurtir from "../../public/imagens/curtir.svg";
import imgCurtido from "../../public/imagens/curtido.svg";
import imgComentarioAtivo from "../../public/imagens/comentarioAtivo.svg";
import imgComentarioCinza from "../../public/imagens/comentarioCinza.svg";

const tamanhoLimiteDescricao = 86;
const feedService = new FeedService();

export default function Postagem({
  id,
  usuario,
  fotoDoPost,
  descricao,
  comentarios,
  usuarioLogado
}) {
  const [comentariosPostagem,setcomentariosPostagem] =useState(comentarios);
  const [deveExibirSecaoComentar, setDeveExibirSecaoComentar] = useState(false);
  const [tamanhoAtualDescricao, setTamanhoAtualDescricao] = useState(tamanhoLimiteDescricao);

  const descricaoCompleta = () => {
    setTamanhoAtualDescricao(Number.MAX_SAFE_INTEGER);
  };

  const descricaoMaiorQueLimite = () => {
    return descricao.length > tamanhoAtualDescricao;
  };

  const obterDescricao = () => {
    let mensagem = descricao.substring(0, tamanhoAtualDescricao);
    if (descricaoMaiorQueLimite()) {
      mensagem += "...";
    }
    return mensagem;
  };

  const obterImagemComentario = () => {
    return deveExibirSecaoComentar ? imgComentarioAtivo : imgComentarioCinza;
  };

  const comentar = async (comentario) => {
    try {
      await feedService.adicionarComentario(id, comentario);
      setDeveExibirSecaoComentar(false);
      setcomentariosPostagem([...comentarios, { 
        nome: usuarioLogado.nome,
         mensagem: comentario }]);
    } catch (e) {
      alert(`Erro ao fazer comentário! ` + (e?.response?.data?.erro || ''));
      
    }
  };
  

  return (
    <div className="postagem">
      {usuario && usuario.id && (
        <Link href={`/perfil/${usuario.id}`}>
          <section className="headerPostagem">
            <Avatar src={usuario.avatar} />
            <strong>{usuario.nome}</strong>
          </section>
        </Link>
      )}
      <div className="fotoDaPostagem">
        <img src={fotoDoPost} alt="Foto da postagem" />
      </div>
      <div className="rodapeDaPostagem">
        <div className="acoesDaPostagem">
          <Image
            src={imgCurtir}
            alt="icone Curtir"
            width={20}
            height={20}
            onClick={() => console.log("curtir")}
          />
          <Image
            src={obterImagemComentario()}
            alt="icone comentar"
            width={20}
            height={20}
            onClick={() =>
              setDeveExibirSecaoComentar(!deveExibirSecaoComentar)
            }
          />
          <span className="quantidadedeCurtidas">
            Curtido por <strong>50 pessoas</strong>
          </span>
          <div className="descricaoDaPostagem">
            {usuario && usuario.nome && (
              <strong className="nomeUsuario">{usuario.nome}</strong>
            )}
            <p className="descricao">
              {obterDescricao()}
              {descricaoMaiorQueLimite() && (
                <span onClick={descricaoCompleta} className="descricaoCompleta">
                  mais
                </span>
              )}
            </p>
          </div>
        </div>
        <div className="comentariosDaPublicacao">
          {comentariosPostagem.map((comentario, i) => (
            <div className="comentario" key={i}>
              {comentario.nome && (
                <strong className="nomeUsuario">{comentario.nome}</strong>
              )}
              <p className="descricao">{comentario.mensagem}</p>
            </div>
          ))}
        </div>
      </div>
      {deveExibirSecaoComentar && (
        <div>
          <FazerComentario comentar={comentar} usuarioLogado={usuarioLogado} />
          <Feed usuarioLogado={usuarioLogado} />
        </div>
      )}
    </div>
  );
}
