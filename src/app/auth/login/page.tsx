'use client'

import { Lock, Mail, ArrowRight, AlertCircle } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { supabase } from '@/lib/supabase'

export default function LoginPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    
    try {
      const { error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (authError) throw authError

      router.push('/dashboard')
    } catch (err: any) {
      setError(err.message || 'Erro ao entrar. Verifique suas credenciais.')
    } finally {
      setLoading(true)
    }
  }

  return (
    <main className="auth-container">
      <div className="glass auth-card animate-fade-in">
        <div className="auth-header">
          <h1 className="auth-title font-serif">Bem-vindo de volta</h1>
          <p className="auth-subtitle">Entre para continuar sua história na escrivaninha.</p>
        </div>

        {error && (
          <div className="bg-red-50 text-red-600 p-4 rounded-xl mb-6 flex items-start gap-3 animate-shake font-sketch">
            <AlertCircle className="w-5 h-5 mt-0.5" />
            <p className="text-sm">{error}</p>
          </div>
        )}

        <form className="auth-form" onSubmit={handleLogin}>
          <div className="form-group">
            <label className="form-label">Email</label>
            <div className="input-wrapper">
              <Mail className="input-icon" />
              <input 
                type="email" 
                className="form-input"
                placeholder="seu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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
