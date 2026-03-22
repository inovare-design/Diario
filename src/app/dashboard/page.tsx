'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Book, PenTool, Paperclip, Music, Heart, ArrowRight, Palette } from 'lucide-react'

export default function DashboardPage() {
  const router = useRouter()
  const [selectedInk, setSelectedInk] = useState({ name: 'Preto', color: '#000000' })
  const [isOpening, setIsOpening] = useState(false)
  const [mood, setMood] = useState('Zen')
  const [diaryDesign, setDiaryDesign] = useState('Clássico')
  const [diaryColor, setDiaryColor] = useState('#ef4444')

  useEffect(() => {
    // Load preferences from local storage
    const savedMood = localStorage.getItem('diario_mood')
    const savedDesign = localStorage.getItem('diario_design')
    const savedColor = localStorage.getItem('diario_color')
    
    if (savedMood) setMood(savedMood)
    if (savedDesign) setDiaryDesign(savedDesign)
    if (savedColor) setDiaryColor(savedColor)
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
      // Navigate to the today's entry page with the selected color as a param
      router.push(`/entry/today?color=${encodeURIComponent(selectedInk.color)}`)
    }, 800)
  }

  return (
    <main className={`sketch-container desk-surface theme-${mood.toLowerCase().replace('é', 'e').replace('ó', 'o')}`}>
      {/* Ambient Wood Texture Overlay */}
      <div className="desk-texture" />

      {/* Customization Lab Link */}
      <Link href="/customize" className="customize-lab-icon animate-float">
        <Palette className="w-8 h-8 text-slate-700" />
      </Link>

      {/* Floating Header */}
      <div className="desk-header animate-fade-in">
        <h1 className="font-sketch text-4xl text-slate-800">Minha Escrivaninha</h1>
        <p className="font-sketch text-slate-500">Tema Atual: {mood} | Design: {diaryDesign}</p>
      </div>

      {/* Interaction Zone */}
      <div className="desk-interaction-area">
        
        {/* The Quill Pen - Follows the selected inkwell */}
        <div 
          className="active-quill animate-float"
          style={{ 
            color: selectedInk.color,
            filter: `drop-shadow(0 0 10px ${selectedInk.color}44)`
          }}
        >
          <PenTool className="w-20 h-20 rotate-[-15deg]" />
        </div>

        {/* The Main Diary */}
        <div 
          className={`diary-object design-${diaryDesign.toLowerCase().replace(/\s+/g, '-')} ${isOpening ? 'opening' : ''}`}
          onClick={handleOpenDiary}
          style={{ '--selected-color': selectedInk.color, '--cover-color': diaryColor } as any}
        >
          <div className="diary-cover" style={{ backgroundColor: diaryColor }}>
            <div className="duct-tape-corner tape-tl" />
            <div className="duct-tape-corner tape-tr" />
            <div className="diary-label font-sketch">DIÁRIO</div>
            <div className="diary-accent" style={{ backgroundColor: selectedInk.color }} />
          </div>
          <div className="diary-pages" />
          <div className="diary-open-indicator font-sketch">
            Clique para Abrir <ArrowRight className="inline w-4 h-4" />
          </div>
        </div>

        {/* The 5 Tinteiros (Inkwells) */}
        <div className="inkwell-array">
          {inkColors.map((ink) => (
            <div 
              key={ink.name}
              className={`inkwell-desk ${selectedInk.name === ink.name ? 'selected' : ''}`}
              onClick={() => setSelectedInk(ink)}
            >
              <div className="ink-label-desk">{ink.name}</div>
              <div className="ink-bottle">
                <div 
                  className="ink-liquid-fill" 
                  style={{ backgroundColor: ink.color }} 
                />
              </div>
            </div>
          ))}
        </div>

        {/* Decorative Clipboard */}
        <div className="floating-asset clip-asset" style={{ top: '10%', right: '15%' }}>
          <Paperclip className="w-16 h-16 text-slate-400 rotate-12" />
        </div>

      </div>

      <style jsx>{`
        .desk-surface {
          /* Removed hardcoded background color to allow themes */
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          overflow: hidden;
        }

        .desk-texture {
          position: absolute;
          inset: 0;
          opacity: 0.1;
          background-image: url('https://www.transparenttextures.com/patterns/wood-pattern.png');
          pointer-events: none;
        }

        .desk-header {
          position: absolute;
          top: 100px;
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
        }

        .diary-object {
          width: 300px;
          height: 400px;
          position: relative;
          cursor: pointer;
          transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
          transform: perspective(1000px) rotateY(-5deg);
          z-index: 20;
        }

        .diary-object:hover {
          transform: perspective(1000px) rotateY(-15deg) translateY(-10px);
        }

        .diary-object.opening {
          transform: perspective(1000px) rotateY(-180deg) scale(2);
          opacity: 0;
        }

        .diary-cover {
          width: 100%;
          height: 100%;
          background: var(--cover-color, #ef4444);
          border-radius: 4px 12px 12px 4px;
          box-shadow: 15px 15px 30px rgba(0,0,0,0.2);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          border-left: 15px solid rgba(0,0,0,0.2);
        }

        .diary-label {
          font-size: 3rem;
          color: white;
          border: 2px solid white;
          padding: 10px 20px;
          transform: rotate(-2deg);
        }

        .diary-accent {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          margin-top: 40px;
          border: 3px solid white;
          transition: background-color 0.3s;
        }

        .diary-open-indicator {
          position: absolute;
          bottom: -40px;
          width: 100%;
          text-align: center;
          color: #78350f;
          font-weight: bold;
          opacity: 0.6;
        }

        .inkwell-array {
          position: absolute;
          bottom: 20px;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          gap: 30px;
          z-index: 30;
        }

        .inkwell-desk {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 10px;
          cursor: pointer;
          transition: transform 0.3s;
        }

        .inkwell-desk:hover {
          transform: translateY(-5px);
        }

        .inkwell-desk.selected {
          transform: translateY(-15px);
        }

        .ink-bottle {
          width: 45px;
          height: 60px;
          background: rgba(255,255,255,0.3);
          border: 2px solid #57534e;
          border-radius: 8px 8px 4px 4px;
          position: relative;
          overflow: hidden;
          backdrop-filter: blur(4px);
        }

        .ink-liquid-fill {
          position: absolute;
          bottom: 0;
          width: 100%;
          height: 60%;
          transition: height 0.3s;
        }

        .selected .ink-liquid-fill {
          height: 80%;
        }

        .ink-label-desk {
          font-family: var(--font-sketch);
          font-size: 0.8rem;
          color: #78350f;
        }

        .active-quill {
          position: absolute;
          top: 10%;
          left: 30%;
          transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
          z-index: 40;
        }

        .clip-asset {
          opacity: 0.4;
          filter: grayscale(1);
        }
      `}</style>
    </main>
  )
}
