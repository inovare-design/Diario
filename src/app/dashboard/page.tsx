'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { 
  PenTool, Paperclip, Palette, ArrowRight, Music, Sparkles, 
  X, Layout, PenLine, Settings, Check, Clock, Anchor, Coffee
} from 'lucide-react'

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
  const [accessory, setAccessory] = useState('Paperclip')

  // Menu States
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [activeTab, setActiveTab] = useState('desk')

  useEffect(() => {
    // Load all personalized settings
    const savedMood = localStorage.getItem('diario_mood')
    const savedDesign = localStorage.getItem('diario_design')
    const savedColor = localStorage.getItem('diario_color')
    const savedDesk = localStorage.getItem('diario_desk')
    const savedPen = localStorage.getItem('diario_pen')
    const savedAcc = localStorage.getItem('diario_accessory')
    const savedInkName = localStorage.getItem('diario_ink_name')
    const savedInkColor = localStorage.getItem('diario_ink_color')
    
    if (savedMood) setMood(savedMood)
    if (savedDesign) setDiaryDesign(savedDesign)
    if (savedColor) setDiaryColor(savedColor)
    if (savedDesk) setDeskTexture(savedDesk)
    if (savedPen) setPenStyle(savedPen)
    if (savedAcc) setAccessory(savedAcc)
    if (savedInkName && savedInkColor) setSelectedInk({ name: savedInkName, color: savedInkColor })
  }, [])

  const inkColors = [
    { name: 'Preto', color: '#000000' },
    { name: 'Azul', color: '#2563eb' },
    { name: 'Vermelho', color: '#ef4444' },
    { name: 'Verde', color: '#16a34a' },
    { name: 'Roxo', color: '#9333ea' },
  ]

  const deskTextures = [
    { name: 'Wood', icon: '🪵', desc: 'Madeira' },
    { name: 'Marble', icon: '🏛️', desc: 'Mármore' },
    { name: 'Metal', icon: '🔩', desc: 'Metal' },
    { name: 'Leather', icon: '💼', desc: 'Couro' },
    { name: 'Paper', icon: '📄', desc: 'Papel' },
  ]

  const penStyles = [
    { name: 'Quill', icon: '🪶', desc: 'Pena' },
    { name: 'Pen', icon: '🖊️', desc: 'Caneta' },
  ]

  const moodThemes = [
    { name: 'Zen', icon: '🌿' },
    { name: 'Energético', icon: '⚡' },
    { name: 'Misterioso', icon: '🔮' },
    { name: 'Vintage', icon: '📜' },
    { name: 'Gótico', icon: '🦇' },
    { name: 'Kawaii', icon: '🌸' },
  ]

  const accessories = [
    { name: 'Paperclip', icon: <Paperclip className="w-6 h-6" />, desc: 'Clipes' },
    { name: 'Clock', icon: <Clock className="w-6 h-6" />, desc: 'Relógio' },
    { name: 'Anchor', icon: <Anchor className="w-6 h-6" />, desc: 'Âncora' },
    { name: 'Coffee', icon: <Coffee className="w-6 h-6" />, desc: 'Café' },
  ]

  const diaryDesigns = [
    { name: 'Clássico', desc: 'Capa Dura' },
    { name: 'Espiral', desc: 'Caderno' },
    { name: 'Livro Antigo', desc: 'Vintage' },
    { name: 'Moleskine', desc: 'Artesão' },
  ]

  const handleOpenDiary = () => {
    setIsOpening(true)
    setTimeout(() => {
      router.push(`/entry/today?color=${encodeURIComponent(selectedInk.color)}`)
    }, 1200)
  }

  const saveToLocal = (key: string, value: string) => {
    localStorage.setItem(key, value)
  }

  // Handle Updates
  const updateSetting = (key: string, value: string, setter: (v: string) => void) => {
    setter(value)
    saveToLocal(`diario_${key}`, value)
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

      {/* Drawer Toggle Button */}
      <button 
        onClick={() => setIsDrawerOpen(true)}
        className="customize-toggle-btn animate-float group"
      >
        <div className="item-label opacity-0 group-hover:opacity-100 transition-opacity">Menu de Estilo</div>
        <Settings className="w-8 h-8 text-slate-700 group-hover:text-white transition-colors" />
      </button>

      {/* Side Customization Drawer */}
      <div className={`customization-drawer ${isDrawerOpen ? 'open' : ''} glass`}>
        <div className="drawer-header">
           <div className="flex items-center gap-3">
             <Palette className="w-6 h-6 text-amber-600" />
             <h2 className="text-2xl font-sketch">Personalizar</h2>
           </div>
           <button onClick={() => setIsDrawerOpen(false)} className="close-btn">
             <X className="w-6 h-6" />
           </button>
        </div>

        <div className="drawer-tabs">
          <button className={`drawer-tab-btn ${activeTab === 'desk' ? 'active' : ''}`} onClick={() => setActiveTab('desk')} title="Mesa">
            <Layout className="w-5 h-5" />
          </button>
          <button className={`drawer-tab-btn ${activeTab === 'diary' ? 'active' : ''}`} onClick={() => setActiveTab('diary')} title="Diário">
            <Settings className="w-5 h-5" />
          </button>
          <button className={`drawer-tab-btn ${activeTab === 'pen' ? 'active' : ''}`} onClick={() => setActiveTab('pen')} title="Pena">
            <PenLine className="w-5 h-5" />
          </button>
          <button className={`drawer-tab-btn ${activeTab === 'acc' ? 'active' : ''}`} onClick={() => setActiveTab('acc')} title="Acessórios">
            <Anchor className="w-5 h-5" />
          </button>
          <button className={`drawer-tab-btn ${activeTab === 'mood' ? 'active' : ''}`} onClick={() => setActiveTab('mood')} title="Humor">
            <Sparkles className="w-5 h-5" />
          </button>
        </div>

        <div className="drawer-content scrollbar-hide">
          {activeTab === 'desk' && (
            <div className="tab-pane animate-fade-in">
              <h3 className="pane-title">Textura da Mesa</h3>
              <div className="pane-grid">
                {deskTextures.map(t => (
                  <div 
                    key={t.name} 
                    className={`pane-card ${deskTexture === t.name ? 'selected' : ''}`}
                    onClick={() => updateSetting('desk', t.name, setDeskTexture)}
                  >
                    <span className="text-2xl">{t.icon}</span>
                    <span className="text-xs uppercase">{t.desc}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'pen' && (
            <div className="tab-pane animate-fade-in">
              <h3 className="pane-title">Estilo da Escrita</h3>
              <div className="pane-grid">
                {penStyles.map(p => (
                  <div 
                    key={p.name} 
                    className={`pane-card ${penStyle === p.name ? 'selected' : ''}`}
                    onClick={() => updateSetting('pen', p.name, setPenStyle)}
                  >
                    <span className="text-2xl">{p.icon}</span>
                    <span className="text-xs uppercase">{p.desc}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'acc' && (
            <div className="tab-pane animate-fade-in">
              <h3 className="pane-title">Acessórios de Mesa</h3>
              <div className="pane-grid">
                {accessories.map(a => (
                  <div 
                    key={a.name} 
                    className={`pane-card ${accessory === a.name ? 'selected' : ''}`}
                    onClick={() => updateSetting('accessory', a.name, setAccessory)}
                  >
                    <div className="text-slate-600">{a.icon}</div>
                    <span className="text-xs uppercase font-bold">{a.desc}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'diary' && (
            <div className="tab-pane animate-fade-in">
              <h3 className="pane-title">Design do Diário</h3>
              <div className="color-wheel flex gap-2 mb-4">
                 {['#ef4444', '#3b82f6', '#10b981', '#f59e0b', '#8b5cf6', '#000000'].map(c => (
                   <button 
                     key={c}
                     className={`color-dot ${diaryColor === c ? 'active' : ''}`}
                     style={{ backgroundColor: c }}
                     onClick={() => updateSetting('color', c, setDiaryColor)}
                   />
                 ))}
              </div>
              <div className="pane-grid">
                {diaryDesigns.map(d => (
                  <div 
                    key={d.name} 
                    className={`pane-card ${diaryDesign === d.name ? 'selected' : ''}`}
                    onClick={() => updateSetting('design', d.name, setDiaryDesign)}
                  >
                    <div className="w-full h-8 rounded mb-1" style={{ backgroundColor: diaryColor }} />
                    <span className="text-xs uppercase leading-none">{d.desc}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'mood' && (
            <div className="tab-pane animate-fade-in">
              <h3 className="pane-title">Atmosfera de Humor</h3>
              <div className="pane-grid">
                {moodThemes.map(m => (
                  <div 
                    key={m.name} 
                    className={`pane-card ${mood === m.name ? 'selected' : ''}`}
                    onClick={() => updateSetting('mood', m.name, setMood)}
                  >
                    <span className="text-2xl">{m.icon}</span>
                    <span className="text-xs uppercase">{m.name}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        
        <div className="drawer-footer">
           <p className="text-[10px] text-slate-400 font-sketch italic italic">Suas escolhas são salvas no livro de memórias.</p>
        </div>
      </div>

      {/* Header */}
      <div className={`desk-header animate-fade-in pointer-events-none ${isDrawerOpen ? 'blur-sm' : ''}`}>
        <h1 className="font-sketch text-5xl text-slate-800 drop-shadow-sm">Minha Escrivaninha</h1>
        <p className="font-sketch text-slate-500 mt-2">Personalize seus detalhes ou comece a escrever.</p>
      </div>

      <div className={`desk-interaction-area ${isDrawerOpen ? 'ml-64 blur-sm opacity-50' : ''} transition-all duration-500`}>
        
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
                onClick={() => {
                   setSelectedInk(ink)
                   saveToLocal('diario_ink_name', ink.name)
                   saveToLocal('diario_ink_color', ink.color)
                }}
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

        {/* Decorative Object: Customizable Accessory */}
        <div className="floating-asset accessory-scenery animate-float-delayed group" style={{ top: '15%', right: '20%' }}>
          <div className="asset-label font-sketch opacity-0 group-hover:opacity-100 transition-opacity">Meu {accessory === 'Paperclip' ? 'Clipes' : accessory === 'Clock' ? 'Relógio' : accessory === 'Anchor' ? 'Âncora' : 'Café'}</div>
          <div className="transition-all group-hover:scale-125 group-hover:text-amber-600 text-slate-400">
             {accessory === 'Paperclip' && <Paperclip className="w-16 h-16 rotate-[35deg]" />}
             {accessory === 'Clock' && <Clock className="w-16 h-16 rotate-[-5deg]" />}
             {accessory === 'Anchor' && <Anchor className="w-16 h-16 rotate-[15deg]" />}
             {accessory === 'Coffee' && <Coffee className="w-16 h-16" />}
          </div>
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
          transition: all 0.5s ease;
          overflow: hidden;
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
          transition: all 0.5s;
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
          transition: all 0.5s cubic-bezier(0.165, 0.84, 0.44, 1);
        }

        .customization-drawer {
           position: absolute;
           left: -320px;
           top: 0;
           bottom: 0;
           width: 320px;
           z-index: 200;
           transition: left 0.4s cubic-bezier(0.4, 0, 0.2, 1);
           display: flex;
           flex-direction: column;
           border-right: 2px solid rgba(0,0,0,0.1);
        }

        .customization-drawer.open {
           left: 0;
        }

        .drawer-header {
           padding: 24px;
           display: flex;
           justify-content: space-between;
           align-items: center;
           border-bottom: 1px solid rgba(0,0,0,0.05);
        }

        .close-btn {
           background: #fee2e2;
           padding: 8px;
           border-radius: 50%;
           color: #ef4444;
           transition: all 0.2s;
        }

        .close-btn:hover {
           transform: rotate(90deg);
           background: #ef4444;
           color: white;
        }

        .drawer-tabs {
           display: flex;
           padding: 12px;
           gap: 8px;
           justify-content: center;
           background: rgba(0,0,0,0.02);
        }

        .drawer-tab-btn {
           padding: 10px;
           border-radius: 12px;
           color: #94a3b8;
           transition: all 0.2s;
        }

        .drawer-tab-btn.active {
           background: white;
           color: #ef4444;
           box-shadow: 0 4px 10px rgba(0,0,0,0.05);
        }

        .drawer-content {
           flex-grow: 1;
           padding: 24px;
           overflow-y: auto;
        }

        .pane-title {
           font-family: var(--font-sketch);
           font-size: 1.1rem;
           margin-bottom: 20px;
           color: #334155;
        }

        .pane-grid {
           display: grid;
           grid-template-columns: repeat(2, 1fr);
           gap: 12px;
        }

        .pane-card {
           padding: 12px;
           background: white;
           border-radius: 16px;
           display: flex;
           flex-direction: column;
           align-items: center;
           gap: 8px;
           cursor: pointer;
           border: 2px solid transparent;
           transition: all 0.2s;
           box-shadow: 0 4px 6px rgba(0,0,0,0.02);
        }

        .pane-card:hover {
           transform: translateY(-4px);
           box-shadow: 0 8px 12px rgba(0,0,0,0.05);
        }

        .pane-card.selected {
           border-color: #ef4444;
           background: #fef2f2;
        }

        .color-dot {
           width: 28px;
           height: 28px;
           border-radius: 50%;
           border: 2px solid white;
           box-shadow: 0 2px 4px rgba(0,0,0,0.1);
           transition: transform 0.2s;
        }

        .color-dot.active {
           transform: scale(1.2);
           box-shadow: 0 0 0 2px #ef4444;
        }

        .drawer-footer {
           padding: 20px;
           background: rgba(0,0,0,0.02);
           text-align: center;
        }

        .customize-toggle-btn {
          position: absolute;
          top: 30px;
          left: 30px;
          padding: 18px;
          background: white;
          border-radius: 50%;
          box-shadow: 0 10px 25px rgba(0,0,0,0.1);
          z-index: 50;
          transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }

        .customize-toggle-btn:hover {
          transform: rotate(180deg) scale(1.1);
          background: #ef4444;
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

        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </main>
  )
}
