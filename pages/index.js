import { Inter } from 'next/font/google'
import Botao from '@/componentes/botao'
import Avatar from '../componentes/avatar'
const inter = Inter({ subsets: ['latin'] })

function Home() {
  return (
    <>
      <h1>Olá Mundo!</h1>
      <Avatar />
      <Botao texto={'Login'} cor='primaria' manipilarClick={() => console.log("botao clicado")} />
    </>
  )
}

export default (Home)