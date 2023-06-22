import comAutorizacao from "../hoc/comAutorizacao";

function Home({ usuarioLogado }) {
    return (
        <feed usuarioLogado={usuarioLogado} />
    );
}

export default comAutorizacao(Home);