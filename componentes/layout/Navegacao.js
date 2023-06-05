import Image from "next/image";

import imgHomeAtivo from '../../public/imagens/homeAtivo.svg'
import imgHomecinza from '../../public/imagens/homecinza.svg'
import imgPublicacaoAtivo from '../../public/imagens/publicacaoAtivo.svg'
import imgPublicacaoCinza from '../../public/imagens/publicacaoCinza.svg'
import imgUsuarioAtivo from '../../public/imagens/usuarioAtivo.svg'
import imgUsuarioCinza from '../../public/imagens/usuarioCinza.svg'



export default function Navegacao({ className }) {
    return (
        <nav className={`barraNavegacao ${className}`}>
            <ul>
                <li>
                    <Image
                        src={imgHomeAtivo}
                        alt="icone Home "
                        width={20}
                        height={20}
                    />
                </li>
                <li>
                    <Image
                        src={imgPublicacaoCinza}
                        alt="icone Publicacao "
                        width={20}
                        height={20}
                    />
                </li>
                <li>
                    <Image
                        src={imgUsuarioCinza}
                        alt="icone Usuario "
                        width={20}
                        height={20}
                    />
                </li>
            </ul>
        </nav>
    );
}