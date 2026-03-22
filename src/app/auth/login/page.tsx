'use client'

import { Lock, Mail, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function LoginPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    // Simulate login delay
    setTimeout(() => {
      router.push('/dashboard')
    }, 1000)
  }

  return (
    <main className="auth-container">
      <div className="glass auth-card animate-fade-in">
        <div className="auth-header">
          <h1 className="auth-title font-serif">Bem-vindo de volta</h1>
          <p className="auth-subtitle">Entre para continuar sua história na escrivaninha.</p>
        </div>

        <form className="auth-form" onSubmit={handleLogin}>
          <div className="form-group">
            <label className="form-label">Email</label>
            <div className="input-wrapper">
              <Mail className="input-icon" />
              <input 
                type="email" 
                className="form-input"
                placeholder="seu@email.com"
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Senha</label>
            <div className="input-wrapper">
              <Lock className="input-icon" />
              <input 
                type="password" 
                className="form-input"
                placeholder="••••••••"
                required
              />
            </div>
          </div>

          <button type="submit" className="btn-primary auth-submit" disabled={loading}>
            {loading ? 'Entrando...' : 'Entrar no Diario'}
            {!loading && <ArrowRight className="w-5 h-5 ml-2" />}
          </button>
        </form>

        <div className="auth-footer">
          <p>
            Não tem uma conta?{' '}
            <Link href="/auth/signup" className="auth-link">
              Começar um novo diário
            </Link>
          </p>
        </div>
      </div>
    </main>
  )
}
