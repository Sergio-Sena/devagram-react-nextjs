import InputPublico from '../inputPublico';
import Image from 'next/image';
import Botao from '../botao';
import { useState } from 'react';
import Link from 'next/link';



import imagemEnvelope from '../../public/imagens/envelope.svg';
import imagemChave from '../../public/imagens/chave.svg';
import imagemlogo from '../../public/imagens/logo.svg';

export default function login() {
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("")

    return (
        <section className={`paginaLogin paginaPublica `}>
            <div className="logoContainer">
                <Image
                    src={imagemlogo}
                    alt="logotipo"
                    layout="fill"
                />
            </div>
            <div className="conteudoPaginaPublica">
                <form>
                    <InputPublico
                        imagem={imagemEnvelope}
                        texto="E-mail"
                        tipo="email"
                        aoAlterarValor={e => setEmail(e.target.value)}
                        valor={email}
                    />

                    <InputPublico
                        imagem={imagemChave}
                        texto="senha"
                        tipo="password"
                        aoAlterarValor={e => setSenha(e.target.value)}
                        valor={senha}
                    />

                    <Botao
                        texto="Login"
                        tipo="submit"
                        desabilitado={false}
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