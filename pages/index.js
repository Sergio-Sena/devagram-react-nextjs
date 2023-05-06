import { Inter } from 'next/font/google'
import Botao from '@/componentes/botao'
import Avatar from '../componentes/avatar'
import UploadImagem from '@/componentes/uploadImagem'
import { useState } from 'react'

function Home() {
  const [imagem, setImagem] = useState(null);

  console.log(imagem)

  return (
    <>
      <h1>Olá Mundo!</h1>
      <UploadImagem setImagem={setImagem} imagemPreview={imagem?.preview} />
      <div style={{ width: 200 }}>
        <Avatar />
        <Botao texto={'Login'} cor='primaria' manipilarClick={() => console.log("botao clicado")} />
      </div>
    </>

  )
}

export default (Home)