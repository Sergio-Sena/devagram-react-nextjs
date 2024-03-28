import Footer from "./Navegacao";
import { useState } from "react";
import UsuarioService from "../../services/UsuarioService";
import { useRouter } from "next/router";
import ResultadoPesquisa from "./ResultadoPesquisa";

import logoHorizontalImg from "../../public/imagens/logoHorizontal.svg";
import Image from "next/image";
import lupa from "../../public/imagens/lupa.svg";

const usuarioService = new UsuarioService();

export default function Header() {
  const [resultadoPesquisa, setResultadoPesquisa] = useState([]);
  const [termoPesquisado, setTermoPesquisado] = useState("");
  const router = useRouter();
  let cabecalhoclassName = "";
  if (router.pathname === "/") {
    cabecalhoclassName = "desktop";
  }

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
      alert("Erro ao pesquisar usuario. " + error?.response?.data?.erro);
    }
  };

  const aoClicarResultadoPesquisa = (id) => {
    setResultadoPesquisa([]);
    setTermoPesquisado("");
    router.push(`/perfil/${id}`);
  };

  const redirecionarParaHome = () => {
    router.push("/");
  };
  return (
    <header className="cabecalhoHeader desktop">
      <div className="contudoCabecalhoPrincipal">
        <div className="logoCabecalhopricipal" onClick={redirecionarParaHome}>
          <Image src={logoHorizontalImg} alt="Logo devagram" layout="fill" />
        </div>
        <div className="barraPesquisa">
          <div className="containerImagemLupa">
            <Image src={lupa} alt="lupa de pesquisa" layout="fill" />
          </div>
          <input
            type="text"
            placeholder="Pesquisar"
            value={termoPesquisado}
            onChange={aoPesquisar}
          />
        </div>
        <Footer />
      </div>
      {resultadoPesquisa.length > 0 && (
        <div className="resultadoPesquisaContainer">
          {/* Aqui você precisa renderizar os resultados da pesquisa */}
          {resultadoPesquisa.map((resultado) => (
            <ResultadoPesquisa
              key={resultado.id}
              resultado={resultado}
              aoClicar={aoClicarResultadoPesquisa} // Passando a função aoClicarResultadoPesquisa para o componente ResultadoPesquisa
            />
          ))}
        </div>
      )}
    </header>
  );
}
