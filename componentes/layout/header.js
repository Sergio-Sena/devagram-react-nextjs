import Image from "next/image";
import logoHorizontalImg from "../../public/imagens/logoHorizontal.svg";
import lupa from "../../public/imagens/lupa.svg";
import Footer from "./footer";

export default function Header() {
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
                        value={''}
                        onChange={() => console.log("Pesquisando")}
        
                    />
                </div>
                <Footer className="desktop" />
            </div>
        </header>

    )
}