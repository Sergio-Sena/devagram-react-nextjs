import imgSetaEsquerda from '../../public/imagens/setaEsquerda.svg'
import CabecalhoComAcoes from "../../componentes/cabecalhoComAcoes";
import Avatar from '../avatar';
import Botao from '../botao';


export default function cabecalhoPerfil(
    usuario
) {
    return(
        <div className='cabecalhoPerfil largura30pctDesktop'>
                <CabecalhoComAcoes
                iconeEsquerda={imgSetaEsquerda}
                titulo = {usuario.nome}
            />

            <div className='statusPerfil'>
                <Avatar src={usuario.avatar}/>
                <div className='informacoesPerfil'>   
                    <div className='statusContainer'>
                        <div className='status'>
                            <strong>15</strong>
                            <span>Publicações</span>
                        </div>
                        <div className='status'>
                            <strong>120</strong>
                            <span>Seguidores</span>
                        </div>
                        <div className='status'>
                            <strong>135</strong>
                            <span>Seguindo</span>
                        </div>
                    </div>
                    
                    <Botao
                        texto={"Seguir"}
                        cor='primaria'
                    />
                </div>

            </div>
        </div>
    )
}