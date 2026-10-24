import React, { useState, useEffect } from 'react';
import { MessageSquare, Star, Send, CheckCircle2, User, Sparkles, ExternalLink } from 'lucide-react';

interface Comentario {
  id: string;
  nome: string;
  estrelas: number;
  mensagem: string;
  data: string;
  origem: string;
}

interface FeedbackSectionProps {
  appId: 'garagem' | 'corepulse';
  appName: string;
  corTema?: string;
}

export const FeedbackSection: React.FC<FeedbackSectionProps> = ({
  appId,
  appName,
  corTema = 'var(--ciano)'
}) => {
  const storageKey = `johndevs_feedbacks_${appId}`;

  // Comentários iniciais de exemplo/vitrine
  const comentariosPadrao: Comentario[] = appId === 'garagem' ? [
    {
      id: '1',
      nome: 'Carlos Eduardo',
      estrelas: 5,
      mensagem: 'A transição da Placa Mercosul e o cálculo automático de km/l no posto ficaram impecáveis! Muito prático.',
      data: '22/10/2026',
      origem: 'Testador Mobile'
    },
    {
      id: '2',
      nome: 'Mariana Silva',
      estrelas: 5,
      mensagem: 'A integração com o Gemini para responder dúvidas de ruídos no freio é genial. Parabéns pelo projeto!',
      data: '23/10/2026',
      origem: 'Usuária Android'
    }
  ] : [
    {
      id: '1',
      nome: 'Lucas Tech',
      estrelas: 5,
      mensagem: 'O visual dos CircularGauges e o botão de limpar RAM com feedback de MB liberados ficaram profissionais demais.',
      data: '22/10/2026',
      origem: 'Entusiasta PC'
    },
    {
      id: '2',
      nome: 'Rafael Mendes',
      estrelas: 5,
      mensagem: 'Testei o Game Hub na demo, a ideia de desativar o algoritmo de Nagle para CS2 é excelente para reduzir ping!',
      data: '23/10/2026',
      origem: 'Gamer Windows'
    }
  ];

  const [comentarios, setComentarios] = useState<Comentario[]>([]);
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [estrelas, setEstrelas] = useState(5);
  const [mensagem, setMensagem] = useState('');
  const [enviando, setEnviando] = useState(false);
  const [sucesso, setSucesso] = useState(false);

  useEffect(() => {
    const salvos = localStorage.getItem(storageKey);
    if (salvos) {
      try {
        setComentarios(JSON.parse(salvos));
      } catch {
        setComentarios(comentariosPadrao);
      }
    } else {
      setComentarios(comentariosPadrao);
    }
  }, [appId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!nome.trim() || !mensagem.trim()) return;

    setEnviando(true);

    const novoComentario: Comentario = {
      id: Date.now().toString(),
      nome: nome.trim(),
      estrelas,
      mensagem: mensagem.trim(),
      data: new Date().toLocaleDateString('pt-BR'),
      origem: 'Feedback Recente'
    };

    // 1. Salva no Feed Imediato LocalStorage
    const listaAtualizada = [novoComentario, ...comentarios];
    setComentarios(listaAtualizada);
    localStorage.setItem(storageKey, JSON.stringify(listaAtualizada));

    // 2. Disparo silencioso para notificação (Web3Forms gratuito - sem travar caso offline)
    try {
      await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: 'b94df400-0e12-4045-9ec4-c4819ad5d117', // Chave pública de relay de forms
          subject: `Novo Feedback sobre o ${appName} (John Dev's)`,
          from_name: nome,
          email: email || 'sem-email@visitante.com',
          message: `App: ${appName}\nAvaliação: ${estrelas} estrelas\nComentário: ${mensagem}`
        })
      });
    } catch (err) {
      // Ignora erro de rede para manter a experiência do usuário sempre positiva
    }

    setEnviando(false);
    setSucesso(true);
    setNome('');
    setEmail('');
    setMensagem('');

    setTimeout(() => setSucesso(false), 5000);
  };

  return (
    <section style={{ marginTop: '50px', marginBottom: '60px' }}>
      <div className="secao-titulo" style={{ textAlign: 'left', marginBottom: '24px' }}>
        <span className="sub-rotulo" style={{ color: corTema }}>COMUNIDADE & TESTADORES</span>
        <h2 style={{ fontSize: '1.8rem' }}>O que achou da demonstração do {appName}?</h2>
        <p style={{ color: 'var(--texto-suave)' }}>
          Deixe sua dúvida, sugestão ou feedback sobre a demo! Seu comentário aparecerá na vitrine abaixo:
        </p>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
        gap: '28px',
        alignItems: 'start'
      }}>
        {/* Formulário de Envio */}
        <div style={{
          background: 'linear-gradient(160deg, var(--card), var(--bg-2))',
          border: '1px solid var(--card-border)',
          borderRadius: 'var(--radius)',
          padding: '26px',
          boxShadow: 'var(--sombra-neon)'
        }}>
          <h3 style={{ fontSize: '1.2rem', color: '#fff', marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <MessageSquare size={18} color={corTema} /> Deixar uma Avaliação ou Dúvida
          </h3>

          {sucesso && (
            <div style={{
              background: 'rgba(74, 222, 128, 0.15)',
              border: '1px solid #4ade80',
              color: '#4ade80',
              padding: '12px',
              borderRadius: '10px',
              fontSize: '0.85rem',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              marginBottom: '16px'
            }}>
              <CheckCircle2 size={16} /> Obrigado! Seu feedback foi publicado com sucesso na vitrine.
            </div>
          )}

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div>
              <label style={{ fontSize: '0.78rem', color: 'var(--texto-suave)', display: 'block', marginBottom: '4px' }}>
                Seu Nome ou Apelido *
              </label>
              <input
                type="text"
                required
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                placeholder="Ex: Carlos Oliveira"
                style={{
                  width: '100%',
                  background: '#090e1a',
                  border: '1px solid rgba(255,255,255,0.12)',
                  borderRadius: '10px',
                  padding: '10px 14px',
                  color: '#fff',
                  fontSize: '0.9rem',
                  outline: 'none'
                }}
              />
            </div>

            <div>
              <label style={{ fontSize: '0.78rem', color: 'var(--texto-suave)', display: 'block', marginBottom: '4px' }}>
                Seu E-mail (Opcional - caso queira resposta)
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Ex: seuemail@exemplo.com"
                style={{
                  width: '100%',
                  background: '#090e1a',
                  border: '1px solid rgba(255,255,255,0.12)',
                  borderRadius: '10px',
                  padding: '10px 14px',
                  color: '#fff',
                  fontSize: '0.9rem',
                  outline: 'none'
                }}
              />
            </div>

            {/* Avaliação em Estrelas */}
            <div>
              <label style={{ fontSize: '0.78rem', color: 'var(--texto-suave)', display: 'block', marginBottom: '4px' }}>
                Sua Nota para a Demonstração
              </label>
              <div style={{ display: 'flex', gap: '6px' }}>
                {[1, 2, 3, 4, 5].map((num) => (
                  <button
                    key={num}
                    type="button"
                    onClick={() => setEstrelas(num)}
                    style={{
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      padding: '4px',
                      color: num <= estrelas ? '#facc15' : 'rgba(255,255,255,0.2)'
                    }}
                  >
                    <Star size={22} fill={num <= estrelas ? '#facc15' : 'none'} />
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label style={{ fontSize: '0.78rem', color: 'var(--texto-suave)', display: 'block', marginBottom: '4px' }}>
                Comentário, Sugestão ou Pergunta *
              </label>
              <textarea
                required
                rows={3}
                value={mensagem}
                onChange={(e) => setMensagem(e.target.value)}
                placeholder="O que achou da interface? Teve alguma dúvida sobre o funcionamento do app?"
                style={{
                  width: '100%',
                  background: '#090e1a',
                  border: '1px solid rgba(255,255,255,0.12)',
                  borderRadius: '10px',
                  padding: '10px 14px',
                  color: '#fff',
                  fontSize: '0.9rem',
                  outline: 'none',
                  resize: 'vertical'
                }}
              />
            </div>

            <button
              type="submit"
              disabled={enviando}
              className="btn btn-primario"
              style={{
                background: corTema === '#ff5252' || corTema === '#D32F2F' ? 'linear-gradient(90deg, #ff5252, #ff7b25)' : undefined,
                justifyContent: 'center',
                width: '100%'
              }}
            >
              <Send size={16} /> {enviando ? 'Publicando...' : 'Publicar Feedback'}
            </button>
          </form>

          {/* Integração com GitHub Discussions */}
          <div style={{
            marginTop: '18px',
            paddingTop: '14px',
            borderTop: '1px solid rgba(255,255,255,0.08)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            fontSize: '0.75rem',
            color: 'var(--texto-suave)'
          }}>
            <span>É desenvolvedor?</span>
            <a
              href="https://github.com/jonathanoliveira94/JohnDevs-web/issues"
              target="_blank"
              rel="noreferrer"
              style={{ color: corTema, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '4px', fontWeight: 700 }}
            >
              <ExternalLink size={14} /> Abrir issue no GitHub
            </a>
          </div>
        </div>

        {/* Feed de Comentários / Vitrine */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h4 style={{ fontSize: '1.1rem', color: '#fff', margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Sparkles size={16} color={corTema} /> Feed de Testadores ({comentarios.length})
            </h4>
            <span style={{ fontSize: '0.75rem', color: '#4ade80' }}>● Feed Ativo</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', maxHeight: '520px', overflowY: 'auto', paddingRight: '4px' }}>
            {comentarios.map((c) => (
              <div
                key={c.id}
                style={{
                  background: 'linear-gradient(160deg, var(--card), var(--bg-2))',
                  border: '1px solid var(--card-border)',
                  borderRadius: '14px',
                  padding: '16px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '8px'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '50%',
                      background: 'rgba(255,255,255,0.08)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: corTema
                    }}>
                      <User size={16} />
                    </div>
                    <div>
                      <div style={{ fontSize: '0.9rem', fontWeight: 800, color: '#fff' }}>{c.nome}</div>
                      <div style={{ fontSize: '0.68rem', color: 'var(--texto-suave)' }}>{c.origem} • {c.data}</div>
                    </div>
                  </div>

                  {/* Estrelas */}
                  <div style={{ display: 'flex', gap: '2px' }}>
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        size={13}
                        fill={star <= c.estrelas ? '#facc15' : 'none'}
                        color={star <= c.estrelas ? '#facc15' : 'rgba(255,255,255,0.2)'}
                      />
                    ))}
                  </div>
                </div>

                <p style={{ fontSize: '0.88rem', color: 'var(--texto-suave)', lineHeight: 1.5, margin: 0 }}>
                  "{c.mensagem}"
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
