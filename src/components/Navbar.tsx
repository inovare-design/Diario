import Link from 'next/link'
import { Book, User, Library, Settings } from 'lucide-react'

export default function Navbar() {
  return (
    <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-5xl">
      <div className="glass px-8 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <Book className="w-6 h-6 text-purple-400 group-hover:rotate-12 transition-transform" />
          <span className="text-xl font-serif font-bold tracking-tight">Diario</span>
        </Link>
        
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-400">
          <Link href="/library" className="hover:text-white transition-colors flex items-center gap-2">
            <Library className="w-4 h-4" /> Biblioteca
          </Link>
          <Link href="/book-lab" className="hover:text-white transition-colors flex items-center gap-2">
            Laboratório
          </Link>
          <Link href="/profile" className="hover:text-white transition-colors flex items-center gap-2">
            <User className="w-4 h-4" /> Perfil
          </Link>
        </div>

        <Link 
          href="/auth/login" 
          className="px-6 py-2 bg-white text-black text-sm font-bold rounded-full hover:shadow-[0_0_20px_rgba(255,255,255,0.3)] transition-all"
        >
          Entrar
        </Link>
      </div>
    </nav>
  )
}
