import UsuarioService from "@/services/UsuarioService"
import { useRouter } from "next/router";
import Header from "../layout/header";
import Rodape from "../layout/Rodape";

const usuarioService = new UsuarioService();

export default function comAutorizacao(Componente) {
    return (props) => {
        const router = useRouter();

        if (typeof window !== "undefined") {
            if (!usuarioService.estaAutenticado()) {
                router.replace('/');
                return null;
            }
            return (
                <>
                    <Header />
                    <Componente {...props} />
                    <Rodape />
                </>
            );
        }
        return null;
    }
}