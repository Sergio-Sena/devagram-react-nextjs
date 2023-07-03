import { useEffect, useState } from "react"
import FeedService from "../../services/FeedService";
import Postagem from "./Postagem";

const feedService = new FeedService();

export default function Feed({ usuarioLogado }) {
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
            nome: postagem?.usuario?.nome,
            avatar: postagem?.usuario?.avatar?.avatar,
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
    <div className="feedContainer larguraDesktop">
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