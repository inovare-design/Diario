'use client'

import { Book, PenTool, Paperclip, Share2, Heart, Music } from 'lucide-react'
import { useState } from 'react'

export default function ProfilePage() {
  const [selectedAsset, setSelectedAsset] = useState<string | null>(null)
  const [selectedInk, setSelectedInk] = useState('Preto')

  const inkColors = [
    { name: 'Preto', color: '#000000' },
    { name: 'Azul', color: '#2563eb' },
    { name: 'Vermelho', color: '#ef4444' },
    { name: 'Verde', color: '#16a34a' },
    { name: 'Roxo', color: '#9333ea' },
  ]

  const user = {
    name: "O Diário de José",
    status: "Um dia de banana, outro de herói.",
    themeSong: "Bad Day - Daniel Powter",
    entries: 42,
    friends: 128
  }

  return (
    <main className="sketch-container">
      {/* Floating Interactive Objects */}
      <div 
        className="asset-floating" 
        style={{ top: '20%', left: '10%' }}
        onClick={() => setSelectedAsset('book')}
      >
        <Book className="w-16 h-16 text-slate-700" />
        <span className="font-sketch text-xs block text-center mt-2">Meu Livro</span>
      </div>

      <div 
        className="asset-floating" 
        style={{ top: '60%', right: '15%' }}
        onClick={() => setSelectedAsset('ink')}
      >
        <PenTool className="w-14 h-14 text-slate-800" />
        <span className="font-sketch text-xs block text-center mt-2">Tinta e Caneta</span>
      </div>

      <div 
        className="asset-floating" 
        style={{ bottom: '15%', left: '20%' }}
        onClick={() => setSelectedAsset('clip')}
      >
        <Paperclip className="w-12 h-12 text-slate-500 rotate-45" />
        <span className="font-sketch text-xs block text-center mt-2">Clips</span>
      </div>

      {/* Main Book Cover */}
      <div className="book-cover group">
        <div className="duct-tape-corner tape-tl" />
        <div className="duct-tape-corner tape-tr" />
        <div className="duct-tape-corner tape-bl" />
        <div className="duct-tape-corner tape-br" />

        <h1 className="book-title">{user.name}</h1>
        
        <div className="torn-paper-area sketch-border">
          <div className="doodle-avatar flex flex-col items-center">
             {/* Simulating the Wimpy Kid doodle style */}
             <div className="w-20 h-20 border-2 border-black rounded-full relative">
                <div className="absolute top-1/3 left-1/4 w-2 h-2 bg-black rounded-full" />
                <div className="absolute top-1/3 right-1/4 w-2 h-2 bg-black rounded-full" />
                <div className="absolute bottom-1/4 left-1/4 w-10 h-1 border-b-2 border-black rounded-full" />
             </div>
             <div className="w-1 h-20 bg-black mt-[-2px]" />
             <div className="flex gap-10 mt-[-20px]">
                <div className="w-1 h-12 bg-black rotate-12" />
                <div className="w-1 h-12 bg-black -rotate-12" />
             </div>
          </div>
          <p className="book-subtitle font-sketch">"{user.status}"</p>
        </div>

        <div className="mt-8 flex gap-6">
          <div className="text-center">
            <div className="font-sketch text-2xl font-bold">{user.entries}</div>
            <div className="font-sketch text-xs uppercase opacity-60">Páginas</div>
          </div>
          <div className="text-center">
            <div className="font-sketch text-2xl font-bold">{user.friends}</div>
            <div className="font-sketch text-xs uppercase opacity-60">Amigos</div>
          </div>
        </div>

        <div className="mt-auto flex items-center gap-2 font-sketch text-sm opacity-70">
          <Music className="w-4 h-4" />
          {user.themeSong}
        </div>

        <button className="share-btn opacity-0 group-hover:opacity-100">
          <Share2 className="w-5 h-5 text-slate-400" />
        </button>
      </div>

      {/* Inkwells & Quill */}
      <div className="inkwell-container">
        {inkColors.map((ink) => (
          <div 
            key={ink.name}
            className={`inkwell ${selectedInk === ink.name ? 'active' : ''}`}
            onClick={() => setSelectedInk(ink.name)}
          >
            <div className="ink-label">{ink.name}</div>
            <div 
              className="ink-liquid" 
              style={{ 
                backgroundColor: ink.color, 
                height: selectedInk === ink.name ? '70%' : '50%' 
              }} 
            />
            <PenTool className="quill-pen text-slate-800" />
          </div>
        ))}
      </div>

      {/* Logic for when an asset is clicked can go here */}
      {selectedAsset && (
        <div className="fixed inset-0 bg-black/20 backdrop-blur-sm z-50 flex items-center justify-center" onClick={() => setSelectedAsset(null)}>
          <div className="glass p-8 text-center animate-fade-in" onClick={e => e.stopPropagation()}>
            <h2 className="font-sketch text-2xl mb-4">Abrindo {selectedAsset}...</h2>
            <p className="font-sketch">Esta ferramenta de personalização estará disponível em breve!</p>
            <button className="btn-primary mt-6" onClick={() => setSelectedAsset(null)}>Fechar</button>
          </div>
        </div>
      )}
    </main>
  )
}
