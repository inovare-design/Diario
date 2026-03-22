'use client'

import { useState, useEffect } from 'react'
import { Palette, Layout, Sparkles, Save, ArrowLeft, Type, Image as ImageIcon } from 'lucide-react'
import Link from 'next/link'

export default function CustomizePage() {
  const [activeTab, setActiveTab] = useState('desk')
  const [selectedMood, setSelectedMood] = useState('Zen')
  const [selectedDiary, setSelectedDiary] = useState('Clássico')
  const [diaryColor, setDiaryColor] = useState('#ef4444')

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
          <p>Personalize cada detalhe do seu mundo literário.</p>
        </header>

        <div className="customize-tabs">
          <button 
            className={`tab-btn ${activeTab === 'desk' ? 'active' : ''}`}
            onClick={() => setActiveTab('desk')}
          >
            <Sparkles className="w-5 h-5" /> Temas de Humor
          </button>
          <button 
            className={`tab-btn ${activeTab === 'diary' ? 'active' : ''}`}
            onClick={() => setActiveTab('diary')}
          >
            <Palette className="w-5 h-5" /> Design do Diário
          </button>
        </div>

        <div className="customize-panels">
          {activeTab === 'desk' && (
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
            <Save className="w-5 h-5" /> Salvar Personalização
          </button>
        </footer>

      </div>

      <style jsx>{`
        .customize-lab {
          background-color: #f1f5f9;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 100px 40px;
        }

        .customize-content {
          width: 100%;
          max-width: 1000px;
          min-height: 80vh;
          padding: 60px;
          display: flex;
          flex-direction: column;
          gap: 40px;
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
        }

        .customize-tabs {
          display: flex;
          gap: 20px;
          border-bottom: 2px solid rgba(0,0,0,0.05);
          padding-bottom: 10px;
        }

        .tab-btn {
          display: flex;
          align-items: center;
          gap: 10px;
          background: none;
          border: none;
          font-family: inherit;
          font-size: 1.25rem;
          color: #94a3b8;
          cursor: pointer;
          padding: 10px 20px;
          position: relative;
        }

        .tab-btn.active {
          color: #ef4444;
        }

        .tab-btn.active::after {
          content: '';
          position: absolute;
          bottom: -12px;
          left: 0;
          right: 0;
          height: 4px;
          background: #ef4444;
          border-radius: 9999px;
        }

        .grid-panel {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 20px;
        }

        .theme-card {
          padding: 24px;
          background: white;
          border: 2px solid transparent;
          border-radius: 20px;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 16px;
          transition: all 0.2s;
          box-shadow: 0 4px 6px rgba(0,0,0,0.02);
        }

        .theme-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 15px rgba(0,0,0,0.05);
        }

        .theme-card.selected {
          border-color: #ef4444;
          background: #fef2f2;
        }

        .theme-emoji {
          font-size: 2.5rem;
        }

        .theme-info h3 {
          font-size: 1.25rem;
          font-weight: 700;
        }

        .theme-info p {
          font-size: 0.875rem;
          color: #64748b;
        }

        .color-section {
          padding: 20px;
          background: rgba(255,255,255,0.5);
          border-radius: 20px;
        }

        .color-picker-grid {
          display: flex;
          gap: 15px;
          margin-top: 15px;
        }

        .color-swatch {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          cursor: pointer;
          border: 3px solid white;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
          transition: transform 0.2s;
        }

        .color-swatch.active {
          transform: scale(1.2);
          box-shadow: 0 0 0 3px #ef444455;
        }

        .design-preview {
          width: 60px;
          height: 80px;
          border-radius: 4px;
          box-shadow: 2px 2px 5px rgba(0,0,0,0.1);
        }

        .btn-save-lab {
          width: 100%;
          padding: 20px;
          background: #ef4444;
          color: white;
          border: none;
          border-radius: 20px;
          font-size: 1.25rem;
          font-weight: 700;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
          box-shadow: 0 10px 20px rgba(239, 68, 68, 0.2);
          transition: transform 0.2s;
        }

        .btn-save-lab:hover {
          transform: scale(1.02);
        }
      `}</style>
    </main>
  )
}
