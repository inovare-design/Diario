import { Book, Shield, Users, PenTool, Sparkles } from 'lucide-react'

export default function Home() {
  return (
    <main className="main-container">
      {/* Hero Section */}
      <div className="hero-section animate-fade-in">
        <h1 className="hero-title font-serif">
          Sua vida em <span className="gradient-text">Capítulos</span>
        </h1>
        <p className="hero-subtitle">
          O diário que se transforma em livro. Uma rede social privada para quem valoriza a profundidade das histórias diárias.
        </p>
        
        <div className="button-group">
          <button className="btn-primary">
            Começar meu Diário
          </button>
          <button className="btn-glass">
            Explorar a Biblioteca
          </button>
        </div>
      </div>

      {/* Features Preview */}
      <div className="features-grid">
        <FeatureCard 
          icon={<Shield className="feature-icon text-purple" />}
          title="Privacidade Granular"
          description="Controle total sobre quem vê cada página do seu diário. Público ou totalmente invisível."
        />
        <FeatureCard 
          icon={<Users className="feature-icon text-pink" />}
          title="Rede Social Literária"
          description="Conecte-se com amigos através de histórias autênticas e perfis personalizados."
        />
        <FeatureCard 
          icon={<PenTool className="feature-icon text-blue" />}
          title="Laboratório de Livros"
          description="Ferramentas profissionais para transformar seu diário em um livro pronto para a biblioteca."
        />
      </div>

      {/* Decorative Book Motif */}
      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 opacity-10 pointer-events-none">
        <Book className="w-[500px] h-[500px]" />
      </div>
    </main>
  )
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <div className="glass feature-card">
      <div className="feature-icon-wrapper">
        {icon}
      </div>
      <h3 className="feature-card-title font-serif">{title}</h3>
      <p className="feature-card-desc">
        {description}
      </p>
    </div>
  )
}
