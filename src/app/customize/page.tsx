'use client'

import { useState, useEffect } from 'react'
import { Palette, Layout, Sparkles, Save, ArrowLeft, Type, Image as ImageIcon, PenLine } from 'lucide-react'
import Link from 'next/link'

export default function CustomizePage() {
  const [activeTab, setActiveTab] = useState('desk')
  const [selectedMood, setSelectedMood] = useState('Zen')
  const [selectedDiary, setSelectedDiary] = useState('Clássico')
  const [diaryColor, setDiaryColor] = useState('#ef4444')
  const [selectedDesk, setSelectedDesk] = useState('Wood')
  const [selectedPen, setSelectedPen] = useState('Quill')

  useEffect(() => {
    const savedMood = localStorage.getItem('diario_mood')
    const savedDesign = localStorage.getItem('diario_design')
    const savedColor = localStorage.getItem('diario_color')
    const savedDesk = localStorage.getItem('diario_desk')
    const savedPen = localStorage.getItem('diario_pen')
    
    if (savedMood) setSelectedMood(savedMood)
    if (savedDesign) setSelectedDiary(savedDesign)
    if (savedColor) setDiaryColor(savedColor)
    if (savedDesk) setSelectedDesk(savedDesk)
    if (savedPen) setSelectedPen(savedPen)
  }, [])

  const moodThemes = [
    { name: 'Zen', icon: '🌿', bg: '#d1fae5', desc: 'Foco e tranquilidade' },
    { name: 'Energético', icon: '⚡', bg: '#fef3c7', desc: 'Puro entusiasmo' },
    { name: 'Misterioso', icon: '🔮', bg: '#ede9fe', desc: 'Profundidade e segredo' },
    { name: 'Melancólico', icon: '☁️', bg: '#f1f5f9', desc: 'Espaço para reflexão' },
    { name: 'Inspirado', icon: '✨', bg: '#dbeafe', desc: 'Criatividade sem limites' },
    { name: 'Vintage', icon: '📜', bg: '#fef2f2', desc: 'O charme do passado' },
    { name: 'Gótico', icon: '🦇', bg: '#0f172a', desc: 'Sombrio e elegante' },
    { name: 'Industrial', icon: '🏗️', bg: '#334155', desc: 'Bruto e funcional' },
    { name: 'Minimalista', icon: '⚪', bg: '#ffffff', desc: 'Menos é mais' },
    { name: 'Kawaii', icon: '🌸', bg: '#fdf2f8', desc: 'Fofura máxima' },
  ]

  const deskTextures = [
    { name: 'Wood', icon: '🪵', desc: 'Madeira Clássica' },
    { name: 'Marble', icon: '🏛️', desc: 'Mármore Nobre' },
    { name: 'Metal', icon: '🔩', desc: 'Metal Escovado' },
    { name: 'Leather', icon: '💼', desc: 'Couro Premium' },
    { name: 'Paper', icon: '📄', desc: 'Papel Craft' },
  ]

  const penStyles = [
    { name: 'Quill', icon: '🪶', desc: 'Pena de Ganso' },
    { name: 'Pen', icon: '🖊️', desc: 'Caneta Moderna' },
  ]

  const diaryDesigns = [
    { name: 'Clássico', desc: 'Capa dura tradicional' },
    { name: 'Espiral', desc: 'Caderno de anotações' },
    { name: 'Moleskine', desc: 'O favorito dos artistas' },
    { name: 'Livro Antigo', desc: 'Páginas amareladas' },
    { name: 'Moderno', desc: 'Capa digital e limpa' },
    { name: 'Mármore', desc: 'Textura de luxo' },
    { name: 'Composição', desc: 'Estilo escolar americano' },
    { name: 'Floral', desc: 'Delicadeza botânica' },
    { name: 'Unicórnio', desc: 'Brilho e magia' },
    { name: 'Couro', desc: 'Resistência e sofisticação' },
  ]

  const handleSave = () => {
    localStorage.setItem('diario_mood', selectedMood)
    localStorage.setItem('diario_design', selectedDiary)
    localStorage.setItem('diario_color', diaryColor)
    localStorage.setItem('diario_desk', selectedDesk)
    localStorage.setItem('diario_pen', selectedPen)
    alert('Configurações salvas com sucesso!')
  }

  return (
    <main className="sketch-container customize-lab font-sketch">
      <div className="customize-content glass">
        
        <header className="customize-header">
          <Link href="/dashboard" className="btn-back">
            <ArrowLeft className="w-5 h-5" /> Voltar à Escrivaninha
          </Link>
          <h1 className="text-4xl">Laboratório de Estilo</h1>
          <p>Personalize cada objeto do seu cenário individualmente.</p>
        </header>

        <div className="customize-tabs">
          <button className={`tab-btn ${activeTab === 'desk' ? 'active' : ''}`} onClick={() => setActiveTab('desk')}>
            <Layout className="w-5 h-5" /> Mesa
          </button>
          <button className={`tab-btn ${activeTab === 'diary' ? 'active' : ''}`} onClick={() => setActiveTab('diary')}>
            <Palette className="w-5 h-5" /> Diário
          </button>
          <button className={`tab-btn ${activeTab === 'pen' ? 'active' : ''}`} onClick={() => setActiveTab('pen')}>
            <PenLine className="w-5 h-5" /> Pena
          </button>
          <button className={`tab-btn ${activeTab === 'mood' ? 'active' : ''}`} onClick={() => setActiveTab('mood')}>
            <Sparkles className="w-5 h-5" /> Humor
          </button>
        </div>

        <div className="customize-panels">
          {activeTab === 'desk' && (
            <div className="grid-panel animate-fade-in">
              {deskTextures.map((t) => (
                <div 
                  key={t.name} 
                  className={`theme-card ${selectedDesk === t.name ? 'selected' : ''}`}
                  onClick={() => setSelectedDesk(t.name)}
                >
                  <span className="theme-emoji">{t.icon}</span>
                  <div className="theme-info">
                    <h3>{t.name}</h3>
                    <p>{t.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'pen' && (
            <div className="grid-panel animate-fade-in">
              {penStyles.map((p) => (
                <div 
                  key={p.name} 
                  className={`theme-card ${selectedPen === p.name ? 'selected' : ''}`}
                  onClick={() => setSelectedPen(p.name)}
                >
                  <span className="theme-emoji">{p.icon}</span>
                  <div className="theme-info">
                    <h3>{p.name}</h3>
                    <p>{p.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'mood' && (
            <div className="grid-panel animate-fade-in">
              {moodThemes.map((mood) => (
                <div 
                  key={mood.name} 
                  className={`theme-card ${selectedMood === mood.name ? 'selected' : ''}`}
                  onClick={() => setSelectedMood(mood.name)}
                >
                  <span className="theme-emoji">{mood.icon}</span>
                  <div className="theme-info">
                    <h3>{mood.name}</h3>
                    <p>{mood.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'diary' && (
            <div className="diary-customize-panel animate-fade-in">
              <div className="color-section">
                <h3>Cor da Capa</h3>
                <div className="color-picker-grid">
                  {['#ef4444', '#3b82f6', '#10b981', '#f59e0b', '#8b5cf6', '#ec4899', '#000000'].map(c => (
                    <div 
                      key={c}
                      className={`color-swatch ${diaryColor === c ? 'active' : ''}`}
                      style={{ backgroundColor: c }}
                      onClick={() => setDiaryColor(c)}
                    />
                  ))}
                </div>
              </div>

              <div className="grid-panel mt-8">
                {diaryDesigns.map((design) => (
                  <div 
                    key={design.name} 
                    className={`theme-card ${selectedDiary === design.name ? 'selected' : ''}`}
                    onClick={() => setSelectedDiary(design.name)}
                  >
                    <div className="design-preview" style={{ backgroundColor: diaryColor }} />
                    <div className="theme-info">
                      <h3>{design.name}</h3>
                      <p>{design.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <footer className="customize-footer">
          <button className="btn-save-lab" onClick={handleSave}>
            <Save className="w-5 h-5" /> Salvar Cenário
          </button>
        </footer>

      </div>

      <style jsx>{`
        .customize-lab {
          background-color: #f1f5f9;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 60px 20px;
          min-height: 100vh;
        }

        .customize-content {
          width: 100%;
          max-width: 1000px;
          min-height: 80vh;
          padding: 40px;
          display: flex;
          flex-direction: column;
          gap: 30px;
          background: rgba(255, 255, 255, 0.8);
          border-radius: 32px;
          box-shadow: 0 20px 60px rgba(0,0,0,0.05);
        }

        .customize-header {
          text-align: center;
        }

        .btn-back {
          display: flex;
          align-items: center;
          gap: 8px;
          color: #64748b;
          text-decoration: none;
          margin-bottom: 20px;
          width: fit-content;
          font-weight: bold;
        }

        .customize-tabs {
          display: flex;
          flex-wrap: wrap;
          gap: 15px;
          border-bottom: 2px solid rgba(0,0,0,0.05);
          padding-bottom: 10px;
          justify-content: center;
        }

        .tab-btn {
          display: flex;
          align-items: center;
          gap: 10px;
          background: none;
          border: none;
          font-family: inherit;
          font-size: 1.1rem;
          color: #94a3b8;
          cursor: pointer;
          padding: 12px 24px;
          position: relative;
          transition: all 0.3s;
          border-radius: 12px;
        }

        .tab-btn:hover {
           background: rgba(0,0,0,0.02);
           color: #64748b;
        }

        .tab-btn.active {
          color: #ef4444;
          background: #fef2f2;
        }

        .grid-panel {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
          gap: 20px;
        }

        .theme-card {
          padding: 20px;
          background: white;
          border: 2px solid transparent;
          border-radius: 20px;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 16px;
          transition: all 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          box-shadow: 0 4px 6px rgba(0,0,0,0.02);
        }

        .theme-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 15px 30px rgba(0,0,0,0.08);
        }

        .theme-card.selected {
          border-color: #ef4444;
          background: #fef2f2;
          box-shadow: 0 10px 20px rgba(239, 68, 68, 0.1);
        }

        .theme-emoji {
          font-size: 2rem;
        }

        .theme-info h3 {
          font-size: 1.1rem;
          font-weight: 700;
        }

        .theme-info p {
          font-size: 0.8rem;
          color: #64748b;
        }

        .color-section {
          padding: 24px;
          background: white;
          border-radius: 24px;
          box-shadow: 0 4px 6px rgba(0,0,0,0.02);
        }

        .color-picker-grid {
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
          margin-top: 15px;
        }

        .color-swatch {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          cursor: pointer;
          border: 3px solid white;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
          transition: transform 0.2s;
        }

        .color-swatch.active {
          transform: scale(1.3);
          box-shadow: 0 0 0 3px #ef444455;
        }

        .design-preview {
          width: 50px;
          height: 70px;
          border-radius: 4px;
          box-shadow: 2px 2px 10px rgba(0,0,0,0.1);
          flex-shrink: 0;
        }

        .btn-save-lab {
          width: 100%;
          padding: 18px;
          background: #ef4444;
          color: white;
          border: none;
          border-radius: 16px;
          font-size: 1.2rem;
          font-weight: 700;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
          box-shadow: 0 10px 30px rgba(239, 68, 68, 0.3);
          transition: all 0.3s;
        }

        .btn-save-lab:hover {
          transform: translateY(-3px) scale(1.01);
          box-shadow: 0 15px 40px rgba(239, 68, 68, 0.4);
        }

        .btn-save-lab:active {
           transform: translateY(0) scale(0.98);
        }
      `}</style>
    </main>
  )
}
