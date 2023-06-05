import Image from "next/image";
import logoHorizontalImg from "../../public/imagens/logoHorizontal.svg";
import lupa from "../../public/imagens/lupa.svg";
import Footer from "./Navegacao";
import { useState } from "react";
import ResultadoPesquisa from "./ResultadoPesquisa";

export default function Header() {
    const [resultadoPesquisa, setResultadoPesquisa] = useState([]);
    const [termoPesquisado, setTermoPesquisado] = useState([]);

    const aoPesquisar = (e) => {
        setTermoPesquisado(e.target.value);
        setResultadoPesquisa([]);
        
        if (termoPesquisado < 3) {
            return;
        }
        setResultadoPesquisa([
            {
                avatar: '',
                nome: 'Douglas',
                email: 'sergio@gmail.com',
                _id: 123456
            },
            {
                avatar: '',
                nome: 'Dani',
                email: 'Dani@gmail.com',
                _id: 78910
            },
            {
                avatar: '',
                nome: 'rapahel',
                email: 'rapahel@gmail.com',
                _id: 121314
            }
        ])
    }

    const aoClicarResultadoPesquisa = (id) => {
        console.log('aoClicarResultadoPesquisa', { id })


    }

    return (
        <header className="cabecalhoHeader">
            <div className="contudoCabecalhoPrincipal">
                <div className="logoCabecalhopricipal">
                    <Image
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
}