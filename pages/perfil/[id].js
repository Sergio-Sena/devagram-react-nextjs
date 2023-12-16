import { useEffect, useState } from 'react';
import Feed from '../../componentes/feed';
import { useRouter } from 'next/router';
import comAutorizacao from '../../componentes/hoc/comAutorizacao';
import CabecalhoPerfil from '../../componentes/cabecalhoPerfil';
import UsuarioService from '@/services/UsuarioService';



const usuarioService = new UsuarioService();

export function Perfil({ usuarioLogado }) {
  const [usuario, setUsuario] = useState({});
  const router = useRouter();


  const obterPerfil = async (idUsuario) => {
    try {
      const { data } = await usuarioService.obterPerfil(
        estaNoPerfilPessoal()
          ? usuarioLogado.id
          : idUsuario
      );
      return data;
    } catch (error) {
      alert(`Erro ao obter perfil do usuario.`);
    }
  }

  const estaNoPerfilPessoal = () => {
    return router.query.id === 'eu';
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    const carregarPerfil = async () => {
      if (!router.query.id) {
        return;
      }

      const dadosPerfil = await obterPerfil(router.query.id);
      setUsuario(dadosPerfil);
    };

    carregarPerfil();
  }, [router.query.id]);




  return (
    <div className="paginaPerfil">
      <CabecalhoPerfil
        usuarioLogado={usuarioLogado}
        usuario={usuario}
        estaNoPerfilPessoal={estaNoPerfilPessoal()}
      />
      
      <Feed
        usuarioLogado={usuarioLogado}
        usuarioPerfil={usuario}
      />
    </div>
  );
}

export default comAutorizacao(Perfil);