import Avatar from "../avatar"


export function FazerComentario({ usuarioLogado }) {

    return (
        <div className="containerFazerComentario">
            <Avatar src={usuarioLogado.avatar} />
            <textarea
                rows={1}
                placeholder="Adicione um comentário...">
            </textarea>
            <button
                type="button"
                className="btnPublicacao desktop"
            >
                Publicar
            </button>
        </div>
    )
}