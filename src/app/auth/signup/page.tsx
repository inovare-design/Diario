'use client'

import { Lock, Mail, User, ArrowRight, AlertCircle } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'

export default function SignupPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [username, setUsername] = useState('')
  const [error, setError] = useState<string | null>(null)

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const { data, error: authError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            username: username || email.split('@')[0],
          }
        }
      })

      if (authError) throw authError

      if (data.user) {
        // Success! Redirect to login or dashboard
        router.push('/dashboard')
      }
    } catch (err: any) {
      setError(err.message || 'Erro ao criar conta. Tente novamente.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="auth-container">
      <div className="glass auth-card animate-fade-in">
        <div className="auth-header">
          <h1 className="auth-title font-serif">Começar sua Jornada</h1>
          <p className="auth-subtitle">Crie sua conta e comece a escrever hoje.</p>
        </div>

        {error && (
          <div className="bg-red-50 text-red-600 p-4 rounded-xl mb-6 flex items-start gap-3 animate-shake font-sketch">
            <AlertCircle className="w-5 h-5 mt-0.5" />
            <p className="text-sm">{error}</p>
          </div>
        )}

        <form className="auth-form" onSubmit={handleSignup}>
          <div className="form-group">
            <label className="form-label">Nome de Usuário</label>
            <div className="input-wrapper">
              <User className="input-icon" />
              <input 
                type="text" 
                className="form-input"
                placeholder="ex: jose_escritor"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
          </div>

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
                placeholder="Escolha uma senha forte"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>

          <button type="submit" className="btn-primary auth-submit" disabled={loading}>
            {loading ? 'Criando conta...' : 'Criar meu Diário'}
            {!loading && <ArrowRight className="w-5 h-5 ml-2" />}
          </button>
        </form>

        <div className="auth-footer">
          <p>
            Já tem uma conta?{' '}
            <Link href="/auth/login" className="auth-link">
              Entrar agora
            </Link>
          </p>
        </div>
      </div>
    </main>
  )
}
