import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Shapes, UserCheck, Check, ArrowRight, Smartphone, Monitor } from 'lucide-react';

export const HomePage: React.FC = () => {
  return (
    <main>
      <section className="hero">
        <div className="logo-wrapper">
          <img className="logo" src="/assets/john-persona.jfif" alt="John Dev's Avatar" />
        </div>
        <div className="tag-badge">
          <Sparkles size={16} /> Desenvolvimento com Inteligência Artificial
        </div>
        <h1>
          Construindo Soluções Modernas para <span>Mobile & Desktop</span>
        </h1>
        <p className="subtitulo">
          Bem-vindo ao laboratório de projetos do <strong>John Dev's</strong>. Explore meus aplicativos, conheça a arquitetura por trás de cada tela e experimente as demonstrações interativas direto no seu navegador.
        </p>
        <div className="hero-actions">
          <a href="#projetos" className="btn btn-primario">
            <Shapes size={18} /> Ver Aplicativos
          </a>
          <Link to="/sobre" className="btn btn-secundario">
            <UserCheck size={18} /> Conheça Minha Trajetória
          </Link>
        </div>
      </section>

      <section id="projetos" className="secao-projetos">
        <div className="secao-titulo">
          <span className="sub-rotulo">PROJETOS EM DESTAQUE</span>
          <h2>O que estamos desenvolvendo</h2>
        </div>

        <div className="cards-grid">
          {/* Card Garagem App */}
          <article className="card-projeto">
            <div className="card-icone android">
              <Smartphone size={32} />
            </div>
            <div className="card-tag">Android / Kotlin & Jetpack Compose</div>
            <h3>Garagem App</h3>
            <p>
              Um assistente completo para veículos. Monitoramento detalhado de manutenções preventivas, controle de abastecimentos, consumo médio e alertas de revisões.
            </p>
            <ul className="recursos-lista">
              <li><Check size={16} /> Gestão de múltiplos veículos</li>
              <li><Check size={16} /> Histórico e alertas de manutenção</li>
              <li><Check size={16} /> Calculadora e métricas de abastecimento</li>
            </ul>
            <div className="card-footer">
              <Link to="/garagem" className="btn-link">
                Conhecer o App & Testar Demo <ArrowRight size={16} />
              </Link>
            </div>
          </article>

          {/* Card CorePulse */}
          <article className="card-projeto">
            <div className="card-icone windows">
              <Monitor size={32} />
            </div>
            <div className="card-tag">Windows / Python & React</div>
            <h3>CorePulse</h3>
            <p>
              Central de comando e monitoramento avançado para PC. Monitora sensores de hardware em tempo real, gerencia drives e jogos, oferece benchmarks e overlay para gameplay.
            </p>
            <ul className="recursos-lista">
              <li><Check size={16} /> Telemetria de CPU/GPU/RAM em tempo real</li>
              <li><Check size={16} /> Gerenciador de armazenamento e drives</li>
              <li><Check size={16} /> Overlay para jogos e testes de benchmark</li>
            </ul>
            <div className="card-footer">
              <Link to="/corepulse" className="btn-link">
                Conhecer o App & Testar Demo <ArrowRight size={16} />
              </Link>
            </div>
          </article>
        </div>
      </section>
    </main>
  );
};
