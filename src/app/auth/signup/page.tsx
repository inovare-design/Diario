import { Lock, Mail, User, ArrowRight } from 'lucide-react'
import Link from 'next/link'

export default function SignupPage() {
  return (
    <main className="auth-container">
      <div className="glass auth-card animate-fade-in">
        <div className="auth-header">
          <h1 className="auth-title font-serif">Começar sua Jornada</h1>
          <p className="auth-subtitle">Crie sua conta e comece a escrever hoje.</p>
        </div>

        <form className="auth-form">
          <div className="form-group">
            <label className="form-label">Nome de Usuário</label>
            <div className="input-wrapper">
              <User className="input-icon" />
              <input 
                type="text" 
                className="form-input"
                placeholder="ex: jose_escritor"
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
              />
            </div>
          </div>

          <button className="btn-primary auth-submit">
            Criar meu Diário
            <ArrowRight className="w-5 h-5 ml-2" />
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
