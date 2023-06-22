import { useEffect, useState } from "react";

export default function Feed({ usuarioLogado }) {
    const [listaDePostagem, setlistaDePostagem] = useState([]);

    useEffect(() => {
        console.log('carregar o feed');
        setlistaDePostagem([
            {
                id: '1'
            }
        ])
    }, [usuarioLogado]);

    return (
        <div>
            {listaDePostagem && listaDePostagem.map(postagem => (
                <div key={postagem.id}>{/* Renderizar os detalhes da postagem aqui */}</div>
            ))}
        </div>
    );
}