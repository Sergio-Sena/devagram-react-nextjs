import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'



const inter = Inter({ subsets: ['latin'] })

function Home() {
  return (
    <h1>Olá Mundo!</h1>
  )
}

export default (Home)