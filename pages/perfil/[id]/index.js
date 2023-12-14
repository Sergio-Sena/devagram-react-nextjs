import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import CabecalhoPerfil from "@/componentes/cabeçalhoPerfil";
import Feed from "@/componentes/feed";
import comAutorizacao from "@/componentes/hoc/comAutorizacao";
import CabecalhoComAcoes from "@/componentes/cabecalhoComAcoes";
import imgSetaEsquerda from '../../../public/imagens/setaEsquerda.svg';

function Perfil({ usuariologado }) {
    const [usuario, setUsuario] = useState({});
    const router = useRouter();
    useEffect(async () => {

    }, []);
    return (
        <div className="paginaPerfil">
            <CabecalhoComAcoes
                iconeSetaEsquerda={imgSetaEsquerda}
                titulo={'' }
            />
            <Feed usuariologado={usuariologado} />
        </div>
    )
}

export default comAutorizacao(Perfil);
