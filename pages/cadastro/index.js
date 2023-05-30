import Image from 'next/legacy/image';
import Link from 'next/link';
import Botao from '../../componentes/botao';
import InputPublico from '@/componentes/inputPublico';
import UploadImagem from '@/componentes/uploadImagem';
import { useState } from 'react';

import imagemAvatar from '../../public/imagens/avatar.svg';
import imagemLogo from '../../public/imagens/logo.svg';
import imagemUsuarioAtivo from '../../public/imagens/usuarioAtivo.svg';
import imagemEnvelope from '../../public/imagens/envelope.svg';
import imagemchave from '../../public/imagens/chave.svg';


export default function Cadastro() {
    const [imagem, setimagem] = useState(null);
    const [nome, setNome] = useState("");
    const [email, setemail] = useState("");
    const [senha, setsenha] = useState("");
    const [confirmacaosenha, setconfirmacaosenha] = useState("");


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
                <form>
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
                    />
                    <InputPublico
                        imagem={imagemEnvelope}
                        texto="E-mail"
                        tipo="email"
                        aoAlterarValor={e => setemail(e.target.value)}
                        valor={email}
                    />
                    <InputPublico
                        imagem={imagemchave}
                        texto="Senha"
                        tipo="password"
                        aoAlterarValor={e => setsenha(e.target.value)}
                        valor={senha}
                    /><InputPublico
                        imagem={imagemchave}
                        texto="Confirmar Senha"
                        tipo="password"
                        aoAlterarValor={e => setconfirmacaosenha(e.target.value)}
                        valor={confirmacaosenha}
                    />
                    <Botao
                        texto="Cadastrar"
                        tipo="submit"
                        desabilitado={false}
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