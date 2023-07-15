import { useState } from "react";
import Avatar from "../avatar";

export function FazerComentario({ usuarioLogado, comentar }) {
    const [rows, setRows] = useState(1);
    const [comentario, setComentario] = useState('');

    const aoDigitarComentario = (e) => {
        const valorInput = e.target.value;
        setComentario(valorInput);
        setRows(valorInput.length > 0 ? 2 : 1);
    }

    const aoPressionarQualquerTecla = (e) => {
        if(e.key === 'Enter') {
            fazerComentario();
        }
    }

    const fazerComentario = () => {
        if(comentario.trim().length === 0 || !comentar) {
            return;
        }
        comentar(comentario);
        setComentario('')
    }


    return (
        <div className="containerFazerComentario">
            <Avatar src={usuarioLogado.avatar} />
            <textarea
                rows={rows}
                onChange={aoDigitarComentario}
                onKeyDown={aoPressionarQualquerTecla}
                value = {comentario}
                placeholder="Adicione um comentario..."
                autoFocus
            >
            </textarea>

            <button type="button" 
            className="btnPublicacao desktop" 
            onClick={fazerComentario}
            disabled={comentario.trim().length === 0} >
                Publicar
            </button>
        </div>
    )
}