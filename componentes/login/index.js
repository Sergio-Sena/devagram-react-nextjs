import InputPublico from '../inputPublico';
import Image from 'next/legacy/image';
import Botao from '../botao';
import Link from 'next/link';
import { useState } from 'react';
import { validarEmail, validarSenha } from '../../utils/validadores'
import UsuarioService from '@/services/UsuarioService'



import imagemEnvelope from '../../public/imagens/envelope.svg';
import imagemChave from '../../public/imagens/chave.svg';
import imagemLogo from '../../public/imagens/logo.svg';

const usuarioService = new UsuarioService();

export default function login() {
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [estaSubmentendo, setEstaSubmentendo] = useState(false);
    const validarFormulario = () => {
        return (
            validarEmail(email)
            && validarSenha(senha)
        );
    }
    const aoSubmeter = async (e) => {
        e.preventDefault();
        if (!validarFormulario()) {
            return;
        }
        setEstaSubmentendo(true);
        try {
            await usuarioService.login({
                login: email,
                senha
            });
            //Todo redirecinar usuario para home
        } catch (error) {
            alert('Nao foi possível efetuar o Login. ') + (error?.response?.data?.erro || '')
        }

        setEstaSubmentendo(false);

    };


    return (
        <section className={`paginaLogin paginaPublica `}>
            <div className="logoContainer">
                <Image
                    src={imagemLogo}
                    alt="logotipo"
                    layout="fill"
                    className='logo'
                />
            </div>
            <div className="conteudoPaginaPublica">
                <form onSubmit={aoSubmeter}>
                    <InputPublico
                        imagem={imagemEnvelope}
                        texto="E-mail"
                        tipo="email"
                        aoAlterarValor={e => setEmail(e.target.value)}
                        valor={email}
                        mensagemValidacao='O endereço informado é inválido'
                        exibirMensagemValidacao={email && !validarEmail(email)}
                    />

                    <InputPublico
                        imagem={imagemChave}
                        texto="Senha"
                        tipo="password"
                        aoAlterarValor={e => setSenha(e.target.value)}
                        valor={senha}
                        mensagemValidacao='A senha possui no minimo 4 caracteres '
                        exibirMensagemValidacao={senha && !validarSenha(senha)}
                    />

                    <Botao
                        texto="Login"
                        tipo="submit"
                        desabilitado={!validarFormulario() || estaSubmentendo}

                    />
                </form>

                <div className="rodapePaginaPublica">
                    <p>Não posssui uma conta?</p>
                    <Link href='/cadastro' >Faça seu cadastro agora</Link>
                </div>
            </div>
        </section>
    );
}