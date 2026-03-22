import { Architects_Daughter, Inter, Outfit } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/Navbar'

const inter = Inter({ subsets: ['latin'] })
const outfit = Outfit({ subsets: ['latin'], variable: '--font-serif' })
const architectsDaughter = Architects_Daughter({ 
  weight: '400',
  subsets: ['latin'],
  variable: '--font-sketch' 
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body className={`${inter.className} ${outfit.variable} ${architectsDaughter.variable}`}>
        <Navbar />
        {children}
      </body>
    </html>
  )
}
