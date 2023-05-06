import { Inter } from 'next/font/google'
import Botao from '@/componentes/botao'
import Avatar from '../componentes/avatar'
import UploadImagem from '@/componentes/uploadImagem'
import { useRef, useState } from 'react'

function Home() {
  const [imagem, setImagem] = useState(null);
  const referenciaInput = useRef(null);


  return (
    <>
      <h1>Olá Mundo!</h1>
      <button onClick={()=> referenciaInput.current.click()}>Abrir arquivos</button>

      <UploadImagem
        setImagem={setImagem}
        imagemPreview={imagem?.preview}
        aoSertarReferencia={(ref) => referenciaInput.current = ref}
      />

      <div style={{ width: 200 }}>
        <Avatar />
        <Botao texto={'Login'} cor='primaria' manipilarClick={() => console.log("botao clicado")} />
      </div>
    </>

  )
}

export default (Home)