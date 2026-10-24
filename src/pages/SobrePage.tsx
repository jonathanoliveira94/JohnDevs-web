import React from 'react';
import { UserCheck } from 'lucide-react';

export const SobrePage: React.FC = () => {
  return (
    <>
      <header className="pagina-cabecalho">
        <div className="badge-categoria">
          <UserCheck size={16} /> Trajetória & Experiência
        </div>
        <h1>
          Sobre <span>Jonathan Oliveira</span>
        </h1>
        <p>Criador do estúdio John Dev's, construindo soluções e explorando novas fronteiras com IAs.</p>
      </header>

      <main className="conteudo-container">
        <article className="sobre-card" style={{
          background: 'linear-gradient(160deg, var(--card), var(--bg-2))',
          border: '1px solid var(--card-border)',
          borderRadius: 'var(--radius)',
          padding: '40px',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '40px',
          alignItems: 'start'
        }}>
          <div style={{ textAlign: 'center' }}>
            <img
              src="/assets/john-persona.jfif"
              alt="Jonathan Oliveira"
              style={{
                width: '100%',
                maxWidth: '280px',
                borderRadius: '20px',
                border: '3px solid var(--ciano)',
                boxShadow: 'var(--sombra-neon)'
              }}
            />
            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '8px',
              marginTop: '18px',
              justifyContent: 'center'
            }}>
              {['15 Anos em TI', 'Suporte VIP', 'Infraestrutura', 'Graduado em ADS', 'Dev com IAs'].map((tag) => (
                <span
                  key={tag}
                  style={{
                    background: 'rgba(77, 163, 255, 0.12)',
                    color: 'var(--azul)',
                    fontSize: '0.8rem',
                    padding: '4px 10px',
                    borderRadius: '6px',
                    border: '1px solid rgba(77, 163, 255, 0.2)'
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div>
            <h2 style={{ fontSize: '1.8rem', marginBottom: '16px', color: 'var(--ciano)' }}>
              Experiência Prática, Visão Sistêmica e Inovação
            </h2>

            <p style={{ color: 'var(--texto-suave)', fontSize: '1rem', lineHeight: 1.8, marginBottom: '16px' }}>
              Profissional de TI com <strong>15 anos de experiência prática</strong>, especializado em <strong>Suporte VIP e Atendimento Executivo</strong>. Ao longo da minha carreira, construí uma base técnica robusta atuando na linha de frente e na resolução de incidentes críticos.
            </p>

            <p style={{ color: 'var(--texto-suave)', fontSize: '1rem', lineHeight: 1.8, marginBottom: '16px' }}>
              Minha trajetória engloba a <strong>administração de infraestrutura, manutenção de máquinas, gestão de redes e Active Directory</strong>, além do suporte avançado e da <strong>implantação de sistemas corporativos</strong> (como ERPs e GEDs) em diversos setores.
            </p>

            <p style={{ color: 'var(--texto-suave)', fontSize: '1rem', lineHeight: 1.8, marginBottom: '16px' }}>
              Recentemente, concluí minha graduação em <strong>Análise e Desenvolvimento de Sistemas (ADS)</strong>, o que aprofundou minha capacidade de compreender as demandas do negócio e arquitetar soluções técnicas precisas. Embora o meu foco primário não tenha sido a programação pura, essa <strong>visão sistêmica</strong> me permite atuar de forma proativa na prevenção de problemas, integrar diferentes tecnologias e dialogar de forma eficiente com todas as áreas da empresa.
            </p>

            <p style={{ color: 'var(--texto-suave)', fontSize: '1rem', lineHeight: 1.8, marginBottom: '16px' }}>
              Compreendo que o suporte a executivos exige mais do que conhecimento técnico: requer empatia, discrição, senso de urgência e comunicação assertiva. Como a tecnologia se renova dia após dia, sou movido pelo <strong>aprendizado contínuo</strong> e busco me manter sempre atualizado — desenvolvendo projetos modernos para mobile e desktop potencializados por inteligência artificial.
            </p>

            <div style={{ display: 'flex', gap: '16px', marginTop: '28px', flexWrap: 'wrap' }}>
              <a href="https://github.com/jonathanoliveira94" target="_blank" rel="noreferrer" className="btn btn-primario">
                Ver Projetos no GitHub
              </a>
              <a href="https://www.linkedin.com/in/jonathan-de-oliveira94/" target="_blank" rel="noreferrer" className="btn btn-secundario">
                Conectar no LinkedIn
              </a>
            </div>
          </div>
        </article>
      </main>
    </>
  );
};
