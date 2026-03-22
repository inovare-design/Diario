'use client'

import { useSearchParams, useRouter } from 'next/navigation'
import { ArrowLeft, Save, Music, Clock } from 'lucide-react'
import { useState, Suspense } from 'react'

function EntryContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const inkColor = searchParams.get('color') || '#000000'
  const [content, setContent] = useState('')

  return (
    <main className="sketch-container paper-page font-sketch">
      <div className="sheet-of-paper animate-fade-in">
        
        {/* Paper Header */}
        <header className="paper-header">
          <button onClick={() => router.back()} className="btn-back">
            <ArrowLeft className="w-5 h-5" /> Escrivaninha
          </button>
          <div className="date-badge">
            <Clock className="w-4 h-4" /> 21 de Março, 2026
          </div>
        </header>

        <div className="divider-line" />

        {/* Writing Area */}
        <div className="writing-area">
          <h1 className="page-title" style={{ color: inkColor }}>
            Querido Diário...
          </h1>
          
          <textarea 
            className="entry-textarea"
            placeholder="Conte sua história aqui..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            style={{ color: inkColor }}
          />
        </div>

        {/* Paper Footer / Controls */}
        <footer className="paper-footer">
          <div className="theme-display">
            <Music className="w-4 h-4" /> Humorphonic - Rainy Day
          </div>
          <button className="btn-save" style={{ backgroundColor: inkColor }}>
            <Save className="w-5 h-5" /> Salvar Página
          </button>
        </footer>

        {/* Aesthetic Paper Details */}
        <div className="paper-holes" />
      </div>

      <style jsx>{`
        .paper-page {
          background-color: #e5e7eb;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 40px;
        }

        .sheet-of-paper {
          background: #fefce8;
          width: 100%;
          max-width: 800px;
          min-height: 90vh;
          padding: 60px;
          box-shadow: 0 10px 50px rgba(0,0,0,0.1);
          position: relative;
          display: flex;
          flex-direction: column;
          border: 1px solid #e5e7eb;
        }

        .paper-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 30px;
        }

        .btn-back {
          background: none;
          border: none;
          color: #64748b;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 1rem;
        }

        .date-badge {
          padding: 8px 16px;
          background: rgba(0,0,0,0.05);
          border-radius: 9999px;
          font-size: 0.875rem;
          color: #475569;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .divider-line {
          height: 2px;
          background: rgba(0,0,0,0.05);
          margin-bottom: 40px;
        }

        .writing-area {
          flex-grow: 1;
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .page-title {
          font-size: 2.5rem;
          font-weight: 700;
        }

        .entry-textarea {
          width: 100%;
          flex-grow: 1;
          background: transparent;
          border: none;
          outline: none;
          font-size: 1.5rem;
          line-height: 1.8;
          resize: none;
          font-family: inherit;
        }

        .paper-footer {
          margin-top: 40px;
          padding-top: 20px;
          border-top: 2px dashed rgba(0,0,0,0.05);
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .theme-display {
          color: #94a3b8;
          font-size: 0.875rem;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .btn-save {
          padding: 12px 24px;
          color: white;
          border: none;
          border-radius: 12px;
          font-weight: bold;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 10px;
          box-shadow: 0 4px 14px rgba(0,0,0,0.2);
          transition: transform 0.2s;
        }

        .btn-save:hover {
          transform: translateY(-2px);
        }

        .paper-holes {
          position: absolute;
          left: 20px;
          top: 0;
          bottom: 0;
          display: flex;
          flex-direction: column;
          justify-content: space-around;
          padding: 40px 0;
        }

        .paper-holes::before {
          content: '';
          width: 15px;
          height: 15px;
          background: #e5e7eb;
          border-radius: 50%;
          box-shadow: 0 40px 0 #e5e7eb, 0 80px 0 #e5e7eb, 0 120px 0 #e5e7eb, 0 160px 0 #e5e7eb, 0 200px 0 #e5e7eb, 0 240px 0 #e5e7eb, 0 280px 0 #e5e7eb, 0 320px 0 #e5e7eb, 0 360px 0 #e5e7eb, 0 400px 0 #e5e7eb;
        }
      `}</style>
    </main>
  )
}

export default function EntryPage() {
  return (
    <Suspense fallback={<div className="sketch-container items-center justify-center font-sketch text-2xl">Carregando Diário...</div>}>
      <EntryContent />
    </Suspense>
  )
}
