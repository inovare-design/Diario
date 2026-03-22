'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { PenTool, Paperclip, Palette, ArrowRight, Music, Sparkles } from 'lucide-react'

export default function DashboardPage() {
  const router = useRouter()
  
  // Customization States
  const [selectedInk, setSelectedInk] = useState({ name: 'Preto', color: '#000000' })
  const [isOpening, setIsOpening] = useState(false)
  const [mood, setMood] = useState('Zen')
  const [diaryDesign, setDiaryDesign] = useState('Clássico')
  const [diaryColor, setDiaryColor] = useState('#ef4444')
  const [deskTexture, setDeskTexture] = useState('Wood')
  const [penStyle, setPenStyle] = useState('Quill')

  useEffect(() => {
    // Load all personalized settings
    const savedMood = localStorage.getItem('diario_mood')
    const savedDesign = localStorage.getItem('diario_design')
    const savedColor = localStorage.getItem('diario_color')
    const savedDesk = localStorage.getItem('diario_desk')
    const savedPen = localStorage.getItem('diario_pen')
    
    if (savedMood) setMood(savedMood)
    if (savedDesign) setDiaryDesign(savedDesign)
    if (savedColor) setDiaryColor(savedColor)
    if (savedDesk) setDeskTexture(savedDesk)
    if (savedPen) setPenStyle(savedPen)
  }, [])

  const inkColors = [
    { name: 'Preto', color: '#000000' },
    { name: 'Azul', color: '#2563eb' },
    { name: 'Vermelho', color: '#ef4444' },
    { name: 'Verde', color: '#16a34a' },
    { name: 'Roxo', color: '#9333ea' },
  ]

  const handleOpenDiary = () => {
    setIsOpening(true)
    setTimeout(() => {
      router.push(`/entry/today?color=${encodeURIComponent(selectedInk.color)}`)
    }, 1200)
  }

  // Helper to determine desk background
  const getDeskTextureUrl = () => {
    const textures: Record<string, string> = {
      'Wood': 'https://www.transparenttextures.com/patterns/wood-pattern.png',
      'Marble': 'https://www.transparenttextures.com/patterns/white-diamond.png',
      'Metal': 'https://www.transparenttextures.com/patterns/brushed-alum.png',
      'Leather': 'https://www.transparenttextures.com/patterns/leather.png',
      'Paper': 'https://www.transparenttextures.com/patterns/natural-paper.png'
    }
    return textures[deskTexture] || textures['Wood']
  }

  return (
    <main className={`sketch-container desk-surface theme-${mood.toLowerCase().replace('é', 'e').replace('ó', 'o')} desk-${deskTexture.toLowerCase()}`}>
      <div className="desk-texture" style={{ backgroundImage: `url(${getDeskTextureUrl()})` }} />

      {/* Lab Link */}
      <Link href="/customize" className="customize-lab-icon animate-float group">
        <div className="item-label opacity-0 group-hover:opacity-100 transition-opacity">Laboratório</div>
        <Palette className="w-8 h-8 text-slate-700 hover:text-white transition-colors" />
      </Link>

      {/* Header */}
      <div className="desk-header animate-fade-in pointer-events-none">
        <h1 className="font-sketch text-5xl text-slate-800 drop-shadow-sm">Minha Escrivaninha</h1>
        <p className="font-sketch text-slate-500 mt-2">Personalize seus detalhes ou comece a escrever.</p>
      </div>

      <div className="desk-interaction-area">
        
        {/* Modular Object: Customizable Pen */}
        <div 
          className="active-quill-scenery animate-float-slow group"
          style={{ 
            color: selectedInk.color,
            filter: `drop-shadow(0 0 10px ${selectedInk.color}44)`
          }}
        >
          <div className="asset-label font-sketch text-center mb-2 opacity-0 group-hover:opacity-100 transition-opacity">Minha {penStyle === 'Quill' ? 'Pena' : 'Caneta'}</div>
          {penStyle === 'Quill' ? (
            <PenTool className="w-24 h-24 rotate-[-15deg] transition-all duration-500 group-hover:rotate-0 group-hover:scale-110" />
          ) : (
            <div className="w-6 h-32 bg-slate-800 rounded-full relative group-hover:scale-110 transition-transform">
               <div className="absolute top-2 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full" style={{ backgroundColor: selectedInk.color }} />
               <div className="absolute bottom-0 w-full h-8 bg-slate-600 rounded-b-full" />
            </div>
          )}
        </div>

        {/* Modular Object: Interactive Diary */}
        <div 
          className={`diary-scenery-item ${isOpening ? 'opening' : ''}`}
          onClick={handleOpenDiary}
        >
          <div className="diary-object group" style={{ '--selected-color': selectedInk.color, '--cover-color': diaryColor } as any}>
            <div className="item-label-floating font-sketch">Meu Diário ({diaryDesign})</div>
            <div className="diary-cover" style={{ backgroundColor: diaryColor }}>
              <div className="duct-tape-corner tape-tl" />
              <div className="duct-tape-corner tape-tr" />
              <div className="diary-label font-sketch">DIÁRIO</div>
              <div className="diary-accent" style={{ backgroundColor: selectedInk.color }} />
            </div>
            <div className="diary-pages">
               <div className="page-flip" />
            </div>
            <div className="diary-shadow" />
            <div className="click-hint font-sketch group-hover:animate-bounce">Clique para Abrir <ArrowRight className="inline w-4 h-4 ml-1" /></div>
          </div>
        </div>

        {/* Modular Object: Inkwells */}
        <div className="inkwell-set animate-float-delayed">
          <div className="font-sketch text-xs text-amber-900/40 w-full text-center mb-2 uppercase tracking-widest">Minhas Tintas</div>
          <div className="flex gap-4">
            {inkColors.map((ink) => (
              <div 
                key={ink.name}
                className={`inkwell-desk ${selectedInk.name === ink.name ? 'selected' : ''}`}
                onClick={() => setSelectedInk(ink)}
              >
                <div className="ink-label-desk">{ink.name}</div>
                <div className="ink-bottle shadow-sketch">
                   <div className="ink-bottle-cap" />
                  <div 
                    className="ink-liquid-fill" 
                    style={{ backgroundColor: ink.color }} 
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Decorative Object: Asset Scenery */}
        <div className="floating-asset clip-asset animate-float-delayed group" style={{ top: '15%', right: '20%' }}>
          <div className="asset-label font-sketch opacity-0 group-hover:opacity-100 transition-opacity">Clips de Papel</div>
          <Paperclip className="w-16 h-16 text-slate-400 rotate-[35deg] transition-all group-hover:text-amber-600 group-hover:scale-125" />
        </div>

      </div>

      <style jsx>{`
        .desk-surface {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          position: relative;
          background-color: #f3f4f6;
          transition: all 0.3s ease;
        }

        .desk-texture {
          position: absolute;
          inset: 0;
          opacity: 0.15;
          pointer-events: none;
          z-index: 0;
        }

        .desk-header {
          position: absolute;
          top: 80px;
          text-align: center;
          z-index: 10;
        }

        .desk-interaction-area {
          position: relative;
          width: 100%;
          max-width: 1200px;
          height: 600px;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 5;
        }

        .diary-scenery-item {
           perspective: 2000px;
           z-index: 20;
           cursor: pointer;
           transition: transform 0.8s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .diary-scenery-item.opening {
           transform: scale(3) rotateY(-180deg) translateZ(100px);
           z-index: 100;
           filter: blur(5px);
           opacity: 0;
        }

        .diary-object {
          width: 280px;
          height: 380px;
          position: relative;
          transition: transform 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          transform-style: preserve-3d;
        }

        .diary-scenery-item:hover .diary-object {
          transform: rotateY(-15deg) translateY(-20px) rotateX(5deg);
        }

        .diary-cover {
          width: 100%;
          height: 100%;
          border-radius: 4px 12px 12px 4px;
          box-shadow: 10px 10px 40px rgba(0,0,0,0.15);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          border-left: 12px solid rgba(0,0,0,0.15);
          position: relative;
          z-index: 2;
          backface-visibility: hidden;
        }

        .diary-pages {
          position: absolute;
          top: 10px;
          right: -10px;
          bottom: 15px;
          width: 20px;
          background: #fff;
          border: 1px solid #e5e7eb;
          box-shadow: 2px 2px 10px rgba(0,0,0,0.1);
          z-index: 1;
        }

        .opening .diary-pages {
          animation: flip-pages 1s forwards;
        }

        @keyframes flip-pages {
          0% { transform: scaleX(1); opacity: 1; }
          100% { transform: scaleX(50); opacity: 0; }
        }

        .diary-label {
          font-size: 2.5rem;
          color: white;
          border: 3px solid white;
          padding: 10px 20px;
          transform: rotate(-3deg);
          box-shadow: 0 4px 10px rgba(0,0,0,0.1);
        }

        .diary-accent {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          margin-top: 50px;
          border: 2px solid white;
          box-shadow: inset 0 2px 4px rgba(0,0,0,0.2);
        }

        .item-label-floating {
          position: absolute;
          top: -40px;
          left: 50%;
          transform: translateX(-50%);
          background: #78350f;
          color: white;
          padding: 4px 12px;
          font-size: 0.8rem;
          border-radius: 6px;
          white-space: nowrap;
          box-shadow: 0 4px 6px rgba(0,0,0,0.1);
          z-index: 10;
        }

        .asset-label {
           background: #475569;
           color: white;
           padding: 4px 12px;
           border-radius: 6px;
           font-size: 0.8rem;
           box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }

        .click-hint {
          position: absolute;
          bottom: -60px;
          width: 100%;
          text-align: center;
          color: #78350f;
          font-size: 1rem;
          opacity: 0.7;
          font-weight: bold;
        }

        .inkwell-set {
          position: absolute;
          bottom: 40px;
          left: 50%;
          transform: translateX(-50%);
          z-index: 30;
          background: rgba(255,255,255,0.6);
          padding: 20px 30px;
          border-radius: 24px;
          backdrop-filter: blur(12px);
          border: 1px solid rgba(255,255,255,0.3);
          box-shadow: 0 10px 40px rgba(0,0,0,0.08);
        }

        .inkwell-desk {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }

        .inkwell-desk:hover {
          transform: scale(1.15) translateY(-5px);
        }

        .inkwell-desk.selected {
          transform: translateY(-12px) scale(1.2);
        }

        .ink-bottle {
          width: 44px;
          height: 55px;
          background: rgba(255,255,255,0.25);
          border: 2px solid #57534e;
          border-radius: 8px 8px 6px 6px;
          position: relative;
          overflow: hidden;
        }

        .ink-bottle-cap {
           width: 100%;
           height: 10px;
           background: #444;
           border-bottom: 2px solid #222;
        }

        .ink-liquid-fill {
          position: absolute;
          bottom: 0;
          width: 100%;
          height: 50%;
          transition: height 0.6s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .selected .ink-liquid-fill {
          height: 80%;
        }

        .ink-label-desk {
          font-family: var(--font-sketch);
          font-size: 0.75rem;
          color: #78350f;
          font-weight: 900;
        }

        .active-quill-scenery {
          position: absolute;
          top: 15%;
          left: 15%;
          z-index: 40;
          cursor: pointer;
        }

        .customize-lab-icon {
          position: absolute;
          top: 30px;
          right: 30px;
          padding: 18px;
          background: white;
          border-radius: 50%;
          box-shadow: 0 10px 25px rgba(0,0,0,0.1);
          z-index: 50;
          transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }

        .customize-lab-icon:hover {
          transform: rotate(360deg) scale(1.1);
          background: #ef4444;
        }

        .animate-float-slow {
          animation: float 8s ease-in-out infinite;
        }

        .animate-float-delayed {
          animation: float 7s ease-in-out infinite 1s;
        }

        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(0); }
          50% { transform: translateY(-25px) rotate(4deg); }
        }

        .shadow-sketch {
           box-shadow: 4px 4px 0 rgba(0,0,0,0.15);
        }

        .item-label {
           position: absolute;
           bottom: -30px;
           left: 50%;
           transform: translateX(-50%);
           background: #0f172a;
           color: white;
           padding: 2px 10px;
           border-radius: 4px;
           font-size: 0.7rem;
           font-family: var(--font-sketch);
           pointer-events: none;
        }
      `}</style>
    </main>
  )
}
