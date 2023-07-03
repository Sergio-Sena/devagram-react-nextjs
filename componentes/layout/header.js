import Footer from "./Navegacao";
import { useState } from "react";
import ResultadoPesquisa from "./ResultadoPesquisa";
import UsuarioService from "@/services/UsuarioService";
import { useRouter } from "next/router";


import logoHorizontalImg from "../../public/imagens/logoHorizontal.svg";
import Image from "next/image";
import lupa from "../../public/imagens/lupa.svg";

const usuarioService = new UsuarioService();

export default function Header() {
    const [resultadoPesquisa, setResultadoPesquisa] = useState([]);
    const [termoPesquisado, setTermoPesquisado] = useState('');
    const router =useRouter();

    const aoPesquisar = async (e) => {
        setTermoPesquisado(e.target.value);
        setResultadoPesquisa([]);

        if (termoPesquisado.length < 3) {
            return;
        }
        try {
            const { data } = await usuarioService.pesquisar(termoPesquisado);
            setResultadoPesquisa(data);
        } catch (error) {
            alert('Erro ao pesquisar usuario. ' + error?.response?.data?.erro);
        }
    }

    const aoClicarResultadoPesquisa = (id) => {
        setResultadoPesquisa([]);
        setTermoPesquisado('');
        router.push(`/perfil/${id}`);
    };

    const redirecionarParaHome = () =>{
        router.push('/');
    }
    return (
        <header className="cabecalhoHeader">
            <div className="contudoCabecalhoPrincipal">
                <div className="logoCabecalhopricipal">
                    <Image
                        onClick={redirecionarParaHome}
                        src={logoHorizontalImg}
                        alt="Logo devagram"
                        layout="fill"
                    />
                </div>
                <div className="barraPesquisa">
                    <div className="containerImagemLupa" >
                        <Image
                            src={lupa}
                            alt="lupa de pesquisa"
                            layout="fill"
                        />
                    </div>
                    <input
                        type="text"
                        placeholder="Pesquisar"
                        value={termoPesquisado}
                        onChange={aoPesquisar}

                    />
                </div>
                <Footer className="desktop" />
            </div>
            {resultadoPesquisa.length > 0 && (
                <div className="resultadoPesquisaContainer">
                    {
                        resultadoPesquisa.map(r => (
                            <ResultadoPesquisa
                                avatar={r.avatar}
                                nome={r.nome}
                                email={r.email}
                                key={r._id}
                                id={r._id}
                                onClick={aoClicarResultadoPesquisa}
                            />
                        
                        )

                        )}
                </div>
            )}
        </header>

    )
};