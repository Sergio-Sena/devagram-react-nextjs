import { useState } from "react";
import Avatar from "../avatar"
import Feed from "../feed"


export default function FazerComentario({ usuarioLogado, comentar }) {
    const [linhas, setLinhas] = useState(1);
    const [comentario, setComentario] = useState('');

    const aoDigitarComentario = (e) => {
        const valorInput = e.target.value;
        setComentario(valorInput);
        setLinhas(valorInput.length > 0 ? 2 : 1)
    }

    const aoPresionarQualquerTecla = (e) => {
        if (e.key === 'Enter') {
            fazerComentario();

        }
    }

    const fazerComentario = () => {
        if (comentario.trim().length === 0 || !comentar) {
            return;
        }
        comentar(comentario);
    }

    return (
        <div className="containerFazerComentario">
            <Avatar src={usuarioLogado.avatar} />
            <textarea
                rows={linhas}
                onChange={aoDigitarComentario}
                onKeyDown={aoPresionarQualquerTecla}
                value={comentario}
                placeholder="Adicione um comentário...">
            </textarea>
            <button
                type="button"
                className="btnPublicacao desktop"
                onClick={fazerComentario}
            >
                Publicar
            </button>
            <Feed usuarioLogado={usuarioLogado} /> {/* Renderize o componente Feed */}
        </div>
    );
}
