import Image from 'next/image';
import Link from 'next/link';
import Botao from '../../componentes/botao';
import InputPublico from '@/componentes/inputPublico';
import UploadImagem from '@/componentes/uploadImagem';
import { useState } from 'react';
import { validarEmail, validarSenha, validarNome, validarConfirmacaoSenha } from '../../utils/validadores'
import UsuarioService from '@/services/UsuarioService';

import imagemAvatar from '../../public/imagens/avatar.svg';
import imagemLogo from '../../public/imagens/logo.svg';
import imagemUsuarioAtivo from '../../public/imagens/usuarioAtivo.svg';
import imagemEnvelope from '../../public/imagens/envelope.svg';
import imagemchave from '../../public/imagens/chave.svg';


const usuarioService = new UsuarioService();

export default function Cadastro() {
    const [imagem, setimagem] = useState(null);
    const [nome, setNome] = useState("");
    const [email, setemail] = useState("");
    const [senha, setsenha] = useState("");
    const [confirmacaosenha, setconfirmacaosenha] = useState("");
    const [estaSubmentendo, setEstaSubmentendo] = useState(false);

    const validarFormulario = () => {
        return (
            validarNome(nome)
            && validarEmail(email)
            && validarSenha(senha)
            && validarConfirmacaoSenha(senha, confirmacaosenha)
        );
    }

    const  aoSubmeter = async (e) => {
        e.preventDefault();
        if (!validarFormulario()) {
            return;
        }
        setEstaSubmentendo(true);

        try {
            const corpReqCadastro = new FormData();
            corpReqCadastro.append("nome",nome);
            corpReqCadastro.append("email",email);
            corpReqCadastro.append("senha",senha);
            
            if(imagem?.arquivo){
                corpReqCadastro.append("file",imagem.arquivo);
            }
            await usuarioService.cadastro(corpReqCadastro)
            alert('Sucesso');
        } catch (error) {
            alert(
                'Erro ao cadastrar usuário' + (error?.response?.data?.erro || '')

                );
        }
        setEstaSubmentendo(false);
    }



    return (
        <section className={`paginaCadastro paginaPublica `}>
            <div className="logoContainer desktop">
                <Image
                    src={imagemLogo}
                    alt="logotipo"
                    layout="fill"
                    className='logo'
                />
            </div>
            <div className="conteudoPaginaPublica">
                <form onSubmit={aoSubmeter}>
                    <UploadImagem
                        imagemPreviewClassName="avatar avatarPreview"
                        imagemPreview={imagem?.preview || imagemAvatar.src}
                        setImagem={setimagem}
                    />
                    <InputPublico
                        imagem={imagemUsuarioAtivo}
                        texto="Nome Completo"
                        tipo="text"
                        aoAlterarValor={e => setNome(e.target.value)}
                        valor={nome}
                        mensagemValidacao='É preciso pelo menos 2 caracters no nome.'
                        exibirMensagemValidacao={nome && !validarNome(nome)}
                    />
                    <InputPublico
                        imagem={imagemEnvelope}
                        texto="E-mail"
                        tipo="email"
                        aoAlterarValor={e => setemail(e.target.value)}
                        valor={email}
                        mensagemValidacao='Informe um endereço de e-mail válido'
                        exibirMensagemValidacao={email && !validarEmail(email)}
                    />
                    <InputPublico
                        imagem={imagemchave}
                        texto="Senha"
                        tipo="password"
                        aoAlterarValor={e => setsenha(e.target.value)}
                        valor={senha}
                        mensagemValidacao='É preciso pelo menos 4 caracters na senha.'
                        exibirMensagemValidacao={senha && !validarSenha(senha)}
                    />
                    <InputPublico
                        imagem={imagemchave}
                        texto="Confirmar Senha"
                        tipo="password"
                        aoAlterarValor={e => setconfirmacaosenha(e.target.value)}
                        valor={confirmacaosenha}
                        mensagemValidacao='É preciso que as senhas sejam idêniticas.'
                        exibirMensagemValidacao={confirmacaosenha && !validarConfirmacaoSenha(senha, confirmacaosenha)}
                    />
                    <Botao
                        texto="Cadastrar"
                        tipo="submit"
                        desabilitado={!validarFormulario() || estaSubmentendo}
                    />
                </form>
                <div className="rodapePaginaPublica">
                    <p>Já posssui uma conta?</p>
                    <Link href='/' >Faça seu login agora!</Link>
                </div>
            </div>
        </section>
    );
}