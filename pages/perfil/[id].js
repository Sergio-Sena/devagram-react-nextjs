import { useEffect, useState } from 'react';
import Feed from '../../componentes/feed';
import { useRouter } from 'next/router';
import comAutorizacao from '../../componentes/hoc/comAutorizacao';
import CabecalhoPerfil from '../../componentes/cabecalhoPerfil';
import UsuarioService from '@/services/UsuarioService';


const usuarioService = new UsuarioService();


function Perfil({ usuarioLogado }) {
    const [usuario, setUsuario] = useState({});
    const router = useRouter();

    const obterPerfil = async (idUsuario) => {
        try {
            if (!usuarioLogado || !usuarioLogado.id) {
                throw new Error('Usuário não logado ou sem ID');
            }
    
            const { data } = await usuarioService.obterPerfil(
                estaNoPerfilPessoal()
                    ? usuarioLogado.id
                    : idUsuario
            );
            return data;
        } catch (error) {
            console.error('Erro ao obter o perfil do usuário:', error);
            // Tratar erros aqui, se necessário
        }
    };
    
    

    const estaNoPerfilPessoal = () => {
        return router.query.id === 'eu';
    }

    useEffect(() => {
        const fetchData = async () => {
            if (!router.query.id) {
                return;
            }
    
            try {
                const dadosPerfil = await obterPerfil(router.query.id);
                setUsuario(dadosPerfil);
            } catch (error) {
                <p>Tratar erros aqui, se necessário</p>
            }
        };
    
        fetchData();
    }, [router.query.id]);
    

    return (
        <div className='paginaPerfil'>
            <CabecalhoPerfil
                usuario={usuarioLogado}
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