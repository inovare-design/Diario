'use client'

import { useSearchParams, useRouter } from 'next/navigation'
import { ArrowLeft, Save, Music, Clock, Loader2 } from 'lucide-react'
import { useState, Suspense } from 'react'
import { supabase } from '@/lib/supabase'

function EntryContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const inkColor = searchParams.get('color') || '#000000'
  const [content, setContent] = useState('')
  const [saving, setSaving] = useState(false)

  const handleSave = async () => {
    if (!content.trim()) return

    setSaving(true)
    try {
      const { data: { user } } = await supabase.auth.getUser()
      
      if (!user) {
        alert('Você precisa estar logado para salvar seu diário!')
        router.push('/auth/login')
        return
      }

      const { error } = await supabase
        .from('entries')
        .insert({
          user_id: user.id,
          content,
          ink_color: inkColor
        })

      if (error) throw error

      alert('Sua história foi guardada no livro de memórias! ✨')
      router.push('/dashboard')
    } catch (err: any) {
      alert('Erro ao salvar: ' + err.message)
    } finally {
      setSaving(false)
    }
  }

  return (
    <main className="sketch-container paper-page font-sketch">
      {/* Background Decorative Doodles */}
      <div className="bg-doodle doodle-1 animate-float-slow">
         <div className="w-16 h-1 bg-black/10 rotate-45 mb-4" />
         <div className="w-12 h-1 bg-black/10 -rotate-12" />
      </div>
      <div className="bg-doodle doodle-2 animate-float-delayed">
         <div className="w-10 h-10 border-2 border-black/5 rounded-full" />
      </div>

      <div className="sheet-of-paper animate-paper-slide-in">
        {/* Binder Rings */}
        <div className="binder-rings">
          {[...Array(12)].map((_, i) => (
            <div key={i} className="binder-ring" />
          ))}
        </div>
        
        {/* Paper Header */}
        <header className="paper-header">
          <button onClick={() => router.back()} className="btn-back group">
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" /> 
            <span>Escrivaninha</span>
          </button>
          <div className="date-badge">
            <Clock className="w-4 h-4" /> 
            <span className="ml-1 uppercase tracking-tighter">22 de Março, 2026</span>
          </div>
        </header>

        <div className="divider-line" />

        {/* Writing Area */}
        <div className="writing-area">
          <div className="flex justify-between items-baseline">
            <h1 className="page-title" style={{ color: inkColor }}>
              Querido Diário...
            </h1>
            <div className="doodle-corner opacity-20">
               <div className="w-8 h-8 rounded-full border-2 border-black" />
               <div className="w-4 h-1 bg-black mt-2" />
            </div>
          </div>
          
          <textarea 
            className="entry-textarea"
            placeholder="Conte algo engraçado ou terrível que aconteceu hoje..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            style={{ color: inkColor }}
          />
        </div>

        {/* Marginal Doodles (Wimpy Kid Style) */}
        <div className="marginal-doodle doodle-stick-man">
           <div className="head" />
           <div className="body-line" />
           <div className="arms" />
           <div className="legs" />
           <div className="speech-bubble font-sketch">Ugh!</div>
        </div>

        {/* Paper Footer / Controls */}
        <footer className="paper-footer">
          <div className="theme-display">
            <Music className="w-4 h-4" /> 
            <span>Tocando: Humorphonic - Rainy Day</span>
          </div>
          <button 
            className="btn-save shadow-sketch" 
            style={{ backgroundColor: inkColor }} 
            onClick={handleSave}
            disabled={saving}
          >
            <div className={saving ? 'animate-spin' : ''}>
              {saving ? <Loader2 className="w-5 h-5" /> : <Save className="w-5 h-5" />}
            </div>
            <span>{saving ? 'Guardando...' : 'Salvar no Livro'}</span>
          </button>
        </footer>

        {/* Aesthetic Paper Details */}
        <div className="paper-texture-overlay" />
        <div className="torn-edge-bottom" />
      </div>

      <style jsx>{`
        .paper-page {
          background-color: #cbd5e1;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 60px 20px;
          min-height: 100vh;
          position: relative;
        }

        .sheet-of-paper {
          background: #fff;
          width: 100%;
          max-width: 850px;
          min-height: 95vh;
          padding: 80px 80px 80px 100px;
          box-shadow: 20px 20px 0 rgba(0,0,0,0.05);
          position: relative;
          display: flex;
          flex-direction: column;
          border: 1px solid #e2e8f0;
          overflow: hidden;
        }

        .paper-texture-overlay {
           position: absolute;
           inset: 0;
           pointer-events: none;
           background-image: url('https://www.transparenttextures.com/patterns/natural-paper.png');
           opacity: 0.4;
           z-index: 10;
        }

        .binder-rings {
          position: absolute;
          left: 30px;
          top: 0;
          bottom: 0;
          display: flex;
          flex-direction: column;
          justify-content: space-around;
          padding: 40px 0;
          z-index: 5;
        }

        .binder-ring {
          width: 20px;
          height: 20px;
          background: #e2e8f0;
          border-radius: 50%;
          border: 2px solid #cbd5e1;
          box-shadow: inset 2px 2px 4px rgba(0,0,0,0.05);
        }

        .torn-edge-bottom {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 15px;
          background: #cbd5e1;
          clip-path: polygon(0% 100%, 5% 85%, 10% 100%, 15% 80%, 20% 100%, 25% 90%, 30% 100%, 35% 85%, 40% 100%, 45% 80%, 50% 100%, 55% 90%, 60% 100%, 65% 85%, 70% 100%, 75% 80%, 80% 100%, 85% 90%, 90% 100%, 95% 85%, 100% 100%);
        }

        .paper-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 30px;
          opacity: 0.6;
        }

        .btn-back {
          background: none;
          border: none;
          color: #475569;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 1.1rem;
          padding: 5px;
        }

        .date-badge {
          display: flex;
          align-items: center;
          font-size: 0.8rem;
          color: #64748b;
          border-bottom: 1px dashed #cbd5e1;
        }

        .divider-line {
          height: 1px;
          background: linear-gradient(to right, #3b82f644, transparent);
          margin-bottom: 50px;
        }

        .writing-area {
          flex-grow: 1;
          display: flex;
          flex-direction: column;
          gap: 24px;
          z-index: 20;
        }

        .page-title {
          font-size: 3.5rem;
          font-weight: 700;
          line-height: 1;
        }

        .entry-textarea {
          width: 100%;
          flex-grow: 1;
          background: transparent;
          border: none;
          outline: none;
          font-size: 1.75rem;
          line-height: 2;
          resize: none;
          font-family: inherit;
          background-image: linear-gradient(transparent, transparent 1.95rem, #e2e8f0 1.95rem);
          background-size: 100% 2.0rem;
          background-attachment: local;
        }

        .paper-footer {
          margin-top: 50px;
          padding-top: 30px;
          border-top: 2px solid #f1f5f9;
          display: flex;
          justify-content: space-between;
          align-items: center;
          z-index: 20;
        }

        .theme-display {
          color: #94a3b8;
          font-size: 0.9rem;
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .btn-save {
          padding: 14px 28px;
          color: white;
          border: none;
          border-radius: 4px;
          font-weight: bold;
          font-size: 1.1rem;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 12px;
          transition: all 0.2s;
        }

        .shadow-sketch {
           box-shadow: 4px 4px 0 rgba(0,0,0,0.2);
        }

        .btn-save:hover {
          transform: translate(-2px, -2px);
          box-shadow: 6px 6px 0 rgba(0,0,0,0.2);
        }

        .marginal-doodle {
           position: absolute;
           right: 40px;
           top: 25%;
           opacity: 0.4;
           pointer-events: none;
        }

        .doodle-stick-man {
           width: 40px;
           height: 80px;
           display: flex;
           flex-direction: column;
           align-items: center;
        }

        .doodle-stick-man .head {
           width: 20px;
           height: 20px;
           border: 2px solid black;
           border-radius: 50%;
        }

        .doodle-stick-man .body-line {
           width: 2px;
           height: 30px;
           background: black;
        }

        .doodle-stick-man .arms {
           width: 30px;
           height: 2px;
           background: black;
           margin-top: -20px;
           transform: rotate(5deg);
        }

        .doodle-stick-man .legs {
           display: flex;
           gap: 15px;
           margin-top: 0;
        }

        .doodle-stick-man .legs::before, .doodle-stick-man .legs::after {
           content: '';
           width: 2px;
           height: 20px;
           background: black;
           transform: rotate(15deg);
        }

        .doodle-stick-man .legs::after {
           transform: rotate(-15deg);
        }

        .speech-bubble {
           position: absolute;
           top: -30px;
           right: -40px;
           background: white;
           border: 1px solid black;
           padding: 4px 8px;
           font-size: 0.8rem;
           border-radius: 10px;
        }

        .bg-doodle {
           position: absolute;
           pointer-events: none;
           z-index: 0;
        }

        .doodle-1 { top: 10%; left: 5%; }
        .doodle-2 { bottom: 10%; right: 5%; }

        @keyframes paperSlideIn {
          from { opacity: 0; transform: translateY(30px) rotate(2deg); }
          to { opacity: 1; transform: translateY(0) rotate(0); }
        }

        .animate-paper-slide-in {
          animation: paperSlideIn 0.8s cubic-bezier(0.165, 0.84, 0.44, 1) forwards;
        }

        .animate-float-slow { animation: float 8s ease-in-out infinite; }
        .animate-float-delayed { animation: float 7s ease-in-out infinite 1.5s; }

        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }
      `}</style>
    </main>
  )
}

export default function EntryPage() {
  return (
    <Suspense fallback={<div className="sketch-container items-center justify-center font-sketch text-2xl bg-[#cbd5e1]">Carregando seu Diário...</div>}>
      <EntryContent />
    </Suspense>
  )
}
