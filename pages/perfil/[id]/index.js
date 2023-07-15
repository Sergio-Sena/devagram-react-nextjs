import CabecalhoComAcoes from "@/componentes/cabecalhoComAcoes";
import Feed from "@/componentes/feed";
import comAutorizacao from "@/componentes/hoc/comAutorizacao";

function Perfil() {
    return (
        <div className="paginaPerfil">
            <CabecalhoComAcoes />
            <Feed />
        </div>
    );
}

export default comAutorizacao(Perfil);