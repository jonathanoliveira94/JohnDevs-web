import React, { useState } from 'react';
import {
  Monitor,
  Layers,
  PieChart,
  Activity,
  Gamepad2,
  Timer,
  Disc,
  AppWindow,
  ChevronLeft,
  ChevronRight,
  Zap,
  Wind,
  ArrowUpRight,
  Flame,
  CheckCircle2,
  Play
} from 'lucide-react';
import { FeedbackSection } from '../components/FeedbackSection';

interface ScreenShotSlide {
  id: string;
  titulo: string;
  subtitulo: string;
  icone: any;
  tag: string;
  descricaoCurta: string;
  destaques: string[];
  renderVisual: () => React.ReactNode;
}

export const CorePulsePage: React.FC = () => {
  const [slideAtual, setSlideAtual] = useState<number>(0);

  // Layout fiel com a Sidebar roxa arredondada do CorePulse
  const renderSidebarSimulada = (activeTabId: string) => (
    <div style={{
      width: '46px',
      background: 'linear-gradient(180deg, #8b5cf6 0%, #7c3aed 50%, #6d28d9 100%)',
      borderRadius: '18px',
      margin: '6px 0 6px 6px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '12px 0',
      boxShadow: '0 8px 24px rgba(109,40,217,0.35)',
      flexShrink: 0
    }}>
      <div style={{ width: '28px', height: '28px', borderRadius: '10px', background: 'rgba(255,255,255,0.2)', border: '1px solid rgba(255,255,255,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.9rem' }}>
        ⚡
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {[
          { id: 'dashboard', icon: PieChart },
          { id: 'gamehub', icon: Gamepad2 },
          { id: 'sensors', icon: Activity },
          { id: 'benchmarks', icon: Timer },
          { id: 'drivers', icon: Disc },
          { id: 'overlay', icon: AppWindow }
        ].map((item) => {
          const Icon = item.icon;
          const isAtivo = activeTabId === item.id;
          return (
            <div
              key={item.id}
              style={{
                width: '28px',
                height: '28px',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: isAtivo ? '#ffffff' : 'transparent',
                color: isAtivo ? '#6d28d9' : 'rgba(255,255,255,0.7)',
                boxShadow: isAtivo ? '0 4px 12px rgba(0,0,0,0.15)' : 'none'
              }}
            >
              <Icon size={14} />
            </div>
          );
        })}
      </div>
      <div style={{ width: '18px', height: '18px', borderRadius: '50%', background: 'rgba(255,255,255,0.2)' }}></div>
    </div>
  );

  const slides: ScreenShotSlide[] = [
    {
      id: 'dashboard',
      titulo: 'Dashboard Geral (Telemetria)',
      subtitulo: 'Hero Banner Smart-Home + 4 Gauges Circulares concêntricos.',
      icone: PieChart,
      tag: 'TELA PRINCIPAL',
      descricaoCurta: 'Centro de comando instantâneo exibindo o banner gradiente azul/índigo com botão de otimização de RAM, acompanhado dos mostradores circulares de CPU, RAM, GPU e Disco.',
      destaques: [
        'Hero Banner com gradiente Smart Home (Blue 600 -> Purple 600)',
        'Botão interativo "Limpar Memória RAM" com status de liberação em MB',
        '4 CircularGauges com trilha escura e anel colorido de progresso',
        'Gráficos de carga individual por núcleo (Threads ativas)'
      ],
      renderVisual: () => (
        <div style={{ display: 'flex', height: '100%', background: '#0f111a', borderRadius: '10px', overflow: 'hidden' }}>
          {renderSidebarSimulada('dashboard')}
          <div style={{ flex: 1, padding: '12px', display: 'flex', flexDirection: 'column', gap: '10px', overflow: 'hidden' }}>
            {/* Hero Banner do CorePulse */}
            <div style={{
              background: 'linear-gradient(90deg, #2563eb 0%, #4f46e5 50%, #7c3aed 100%)',
              borderRadius: '16px',
              padding: '12px 16px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              boxShadow: '0 8px 24px rgba(37,99,235,0.35)'
            }}>
              <div>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', background: 'rgba(255,255,255,0.2)', padding: '2px 8px', borderRadius: '999px', fontSize: '0.62rem', fontWeight: 700, color: '#fff', marginBottom: '4px' }}>
                  <Zap size={10} color="#fde047" /> Status: Excelente (Game Ready)
                </div>
                <div style={{ fontSize: '0.95rem', fontWeight: 900, color: '#fff', lineHeight: 1.1 }}>
                  Seu PC está pronto para Alto Desempenho
                </div>
                <div style={{ fontSize: '0.65rem', color: 'rgba(255,255,255,0.85)', marginTop: '2px' }}>
                  Modo Game Ready ativo. Otimizações de GPU e baixa latência aplicadas.
                </div>
              </div>
              <div style={{ display: 'flex', gap: '6px' }}>
                <button style={{ background: '#fff', color: '#4338ca', border: 'none', borderRadius: '10px', padding: '6px 12px', fontSize: '0.7rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <Wind size={12} /> Limpar RAM
                </button>
                <button style={{ background: 'rgba(0,0,0,0.3)', color: '#fff', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '10px', padding: '6px 10px', fontSize: '0.7rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '4px' }}>
                  Jogos <ArrowUpRight size={12} />
                </button>
              </div>
            </div>

            {/* 4 Circular Gauges fiéis ao CircularGauge.tsx */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '8px' }}>
              {[
                { label: 'Processador', val: 28, cor: '#8b5cf6', sub: '16 threads' },
                { label: 'Memória RAM', val: 54, cor: '#3b82f6', sub: '8.6 / 16 GB' },
                { label: 'Placa de Vídeo', val: 42, cor: '#06b6d4', sub: 'RTX 4070' },
                { label: 'Armazenamento', val: 66, cor: '#eab308', sub: '170 GB Livres' }
              ].map((g, i) => (
                <div key={i} style={{ background: '#161824', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '14px', padding: '10px 4px', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
                  {/* Círculo SVG */}
                  <div style={{ position: 'relative', width: '56px', height: '56px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <svg viewBox="0 0 60 60" style={{ width: '100%', height: '100%', transform: 'rotate(-90deg)' }}>
                      <circle cx="30" cy="30" r="23" stroke="#23263b" strokeWidth="6" fill="transparent" />
                      <circle cx="30" cy="30" r="23" stroke={g.cor} strokeWidth="6" fill="transparent" strokeDasharray="144" strokeDashoffset={144 - (144 * g.val) / 100} strokeLinecap="round" />
                    </svg>
                    <span style={{ position: 'absolute', fontSize: '0.75rem', fontWeight: 900, color: '#fff' }}>{g.val}%</span>
                  </div>
                  <span style={{ fontSize: '0.68rem', fontWeight: 700, color: '#f1f5f9', marginTop: '4px' }}>{g.label}</span>
                  <span style={{ fontSize: '0.58rem', color: '#94a3b8' }}>{g.sub}</span>
                </div>
              ))}
            </div>

            {/* Painel Inferior: Processos Ativos */}
            <div style={{ background: '#161824', borderRadius: '14px', padding: '8px 12px', border: '1px solid rgba(255,255,255,0.06)', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.68rem', color: '#94a3b8' }}>
                <span>Top Processos com Alta Demanda</span>
                <span>4.20 GHz Clock Estável</span>
              </div>
              <div style={{ display: 'flex', gap: '8px' }}>
                <span style={{ background: '#1c1e30', padding: '3px 8px', borderRadius: '6px', fontSize: '0.62rem', color: '#f1f5f9' }}>🎮 Cyberpunk2077.exe (18.5% CPU)</span>
                <span style={{ background: '#1c1e30', padding: '3px 8px', borderRadius: '6px', fontSize: '0.62rem', color: '#f1f5f9' }}>🌐 chrome.exe (4.2% CPU)</span>
                <span style={{ background: '#1c1e30', padding: '3px 8px', borderRadius: '6px', fontSize: '0.62rem', color: '#f1f5f9' }}>💬 Discord.exe (1.8% CPU)</span>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'gamehub',
      titulo: 'Game Hub & Otimizador',
      subtitulo: 'Vitrine de Jogos com Otimizações (RAM, dGPU, No-Nagle) e Lançador.',
      icone: Gamepad2,
      tag: 'GAME BOOSTER',
      descricaoCurta: 'Interface visual com prateleira de jogos detectados, presets de performance rápida (Balanceado vs Competitivo) e disparo com injeção de prioridade de processo.',
      destaques: [
        'Shelf de jogos com cards estilizados e badges de FPS',
        'Alternadores de otimização: Limpeza de RAM, Enforce dGPU, No-Nagle',
        'Botão rápido "Launch Game" com aplicação de regras de SO',
        'Integração direta com o backend Python'
      ],
      renderVisual: () => (
        <div style={{ display: 'flex', height: '100%', background: '#0f111a', borderRadius: '10px', overflow: 'hidden' }}>
          {renderSidebarSimulada('gamehub')}
          <div style={{ flex: 1, padding: '12px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <span style={{ fontSize: '0.95rem', fontWeight: 900, color: '#fff' }}>Game Hub & Launcher</span>
                <span style={{ fontSize: '0.65rem', color: '#94a3b8', marginLeft: '8px' }}>3 Jogos Prontos</span>
              </div>
              <span style={{ background: '#7c3aed', color: '#fff', fontSize: '0.65rem', padding: '3px 10px', borderRadius: '8px', fontWeight: 700 }}>
                Modo Competitivo Ativo
              </span>
            </div>

            {/* Jogo em Destaque */}
            <div style={{ background: '#161824', borderRadius: '14px', border: '1px solid rgba(139,92,246,0.3)', padding: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Flame size={14} color="#f97316" />
                  <span style={{ fontWeight: 800, fontSize: '0.9rem', color: '#fff' }}>Cyberpunk 2077</span>
                </div>
                <div style={{ fontSize: '0.68rem', color: '#94a3b8', marginTop: '4px' }}>
                  Otimizações: <strong style={{ color: '#4ade80' }}>RAM Cleaner ✓</strong> | <strong style={{ color: '#60a5fa' }}>High Priority ✓</strong> | <strong style={{ color: '#c084fc' }}>dGPU ✓</strong>
                </div>
              </div>
              <button style={{ background: 'linear-gradient(90deg, #8b5cf6, #ec4899)', border: 'none', color: '#fff', borderRadius: '10px', padding: '8px 16px', fontWeight: 800, fontSize: '0.75rem', display: 'flex', alignItems: 'center', gap: '4px', cursor: 'pointer' }}>
                <Play size={12} fill="#fff" /> Iniciar
              </button>
            </div>

            {/* Outros Jogos */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
              <div style={{ background: '#161824', borderRadius: '12px', padding: '10px', border: '1px solid rgba(255,255,255,0.06)' }}>
                <div style={{ fontWeight: 700, fontSize: '0.8rem', color: '#fff' }}>Forza Horizon 5</div>
                <div style={{ fontSize: '0.65rem', color: '#4ade80' }}>120 FPS Estável • Ultra</div>
              </div>
              <div style={{ background: '#161824', borderRadius: '12px', padding: '10px', border: '1px solid rgba(255,255,255,0.06)' }}>
                <div style={{ fontWeight: 700, fontSize: '0.8rem', color: '#fff' }}>Counter-Strike 2</div>
                <div style={{ fontSize: '0.65rem', color: '#facc15' }}>No-Nagle Ativo • 240 FPS</div>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'sensors',
      titulo: 'Sensores de Temperatura & Tensão',
      subtitulo: 'Painel detalhado com leitura WMI núcleo a núcleo e cooler RPM.',
      icone: Activity,
      tag: 'MONITORAMENTO TÉRMICO',
      descricaoCurta: 'Mapeamento profundo de cada diodo térmico da placa-mãe, processador e GPU com barramento de tensão elétrica da fonte.',
      destaques: [
        'Temperatura núcleo a núcleo (Package, Hotspot e VRM)',
        'Rotação de coolers por minuto (RPM das ventoinhas)',
        'Barramento elétrico com medição de VCore e +12V',
        'Prevenção de Thermal Throttling em tempo real'
      ],
      renderVisual: () => (
        <div style={{ display: 'flex', height: '100%', background: '#0f111a', borderRadius: '10px', overflow: 'hidden' }}>
          {renderSidebarSimulada('sensors')}
          <div style={{ flex: 1, padding: '12px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <span style={{ fontSize: '0.95rem', fontWeight: 900, color: '#fff' }}>Leitura Aprofundada de Sensores</span>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
              <div style={{ background: '#161824', borderRadius: '12px', padding: '10px', borderLeft: '3px solid #4ade80' }}>
                <div style={{ fontSize: '0.68rem', color: '#94a3b8' }}>CPU Package</div>
                <div style={{ fontSize: '1.3rem', fontWeight: 900, color: '#4ade80' }}>54°C</div>
                <div style={{ fontSize: '0.62rem', color: '#94a3b8' }}>Cooler: 1.250 RPM</div>
              </div>
              <div style={{ background: '#161824', borderRadius: '12px', padding: '10px', borderLeft: '3px solid #eab308' }}>
                <div style={{ fontSize: '0.68rem', color: '#94a3b8' }}>GPU Hotspot</div>
                <div style={{ fontSize: '1.3rem', fontWeight: 900, color: '#eab308' }}>62°C</div>
                <div style={{ fontSize: '0.62rem', color: '#94a3b8' }}>Fan Speed: 45% (1.500 RPM)</div>
              </div>
            </div>
            <div style={{ background: '#161824', borderRadius: '12px', padding: '10px', display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem', color: '#cbd5e1' }}>
              <span>VCore: <strong style={{ color: '#fff' }}>1.24 V</strong></span>
              <span>Linha +12V: <strong style={{ color: '#4ade80' }}>12.06 V</strong></span>
              <span>Placa-mãe: <strong style={{ color: '#fff' }}>41°C</strong></span>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'benchmarks',
      titulo: 'Módulo de Benchmarks & Estresse',
      subtitulo: 'Testes sintéticos de estresse multithread com score numérico.',
      icone: Timer,
      tag: 'BENCHMARKING',
      descricaoCurta: 'Executa rotinas intensivas de renderização e cálculo numérico para certificar que o processador e as memórias suportam picos de esforço contínuos.',
      destaques: [
        'Score padronizado com percentil de ranking',
        'Detecção de throttling ou instabilidade térmica',
        'Histórico com comparativo entre testes',
        'Gráficos de estabilidade durante a execução'
      ],
      renderVisual: () => (
        <div style={{ display: 'flex', height: '100%', background: '#0f111a', borderRadius: '10px', overflow: 'hidden' }}>
          {renderSidebarSimulada('benchmarks')}
          <div style={{ flex: 1, padding: '12px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', gap: '8px' }}>
            <div style={{ width: '70px', height: '70px', borderRadius: '50%', background: 'linear-gradient(135deg, #8b5cf6, #3b82f6)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 8px 24px rgba(139,92,246,0.4)' }}>
              <span style={{ fontSize: '1.25rem', fontWeight: 900, color: '#fff' }}>9.420</span>
            </div>
            <div style={{ fontSize: '0.95rem', fontWeight: 900, color: '#fff' }}>CorePulse CPU Benchmark</div>
            <div style={{ fontSize: '0.65rem', color: '#94a3b8' }}>Classificação: Sistema de Alto Desempenho (Top 5%)</div>
            <div style={{ background: '#161824', borderRadius: '8px', padding: '4px 12px', fontSize: '0.65rem', color: '#4ade80', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
              <CheckCircle2 size={12} /> Teste Multithread concluído com sucesso
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'drivers',
      titulo: 'Drives & Saúde S.M.A.R.T',
      subtitulo: 'Diagnóstico de SSDs NVMe/SATA, TBW e versões de drivers de vídeo.',
      icone: Disc,
      tag: 'DIAGNÓSTICO S.M.A.R.T',
      descricaoCurta: 'Inspeciona unidades de armazenamento com verificação de integridade física de blocos NAND, tempo restante de vida útil e taxas de leitura instantânea.',
      destaques: [
        'Percentual de saúde S.M.A.R.T em tempo real',
        'Contador de Terabytes gravados (TBW)',
        'Monitor de velocidades de leitura e escrita (MB/s)',
        'Inventário de drivers e dispositivos conectados'
      ],
      renderVisual: () => (
        <div style={{ display: 'flex', height: '100%', background: '#0f111a', borderRadius: '10px', overflow: 'hidden' }}>
          {renderSidebarSimulada('drivers')}
          <div style={{ flex: 1, padding: '12px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <span style={{ fontSize: '0.95rem', fontWeight: 900, color: '#fff' }}>Saúde de Armazenamento S.M.A.R.T</span>
            <div style={{ background: '#161824', borderRadius: '12px', padding: '10px', borderLeft: '3px solid #4ade80' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontWeight: 800, fontSize: '0.82rem', color: '#fff' }}>Kingston NVMe SSD 1TB (C:)</span>
                <span style={{ color: '#4ade80', fontSize: '0.7rem', fontWeight: 800 }}>98% Saudável</span>
              </div>
              <div style={{ fontSize: '0.62rem', color: '#94a3b8', marginTop: '2px' }}>
                Leitura: 3.500 MB/s • Temperatura: 41°C • TBW: 24.5 TB
              </div>
            </div>
            <div style={{ background: '#161824', borderRadius: '12px', padding: '10px', borderLeft: '3px solid #38bdf8' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontWeight: 800, fontSize: '0.82rem', color: '#fff' }}>Seagate Barracuda 2TB (D:)</span>
                <span style={{ color: '#38bdf8', fontSize: '0.7rem', fontWeight: 800 }}>100% OK</span>
              </div>
              <div style={{ fontSize: '0.62rem', color: '#94a3b8', marginTop: '2px' }}>
                Leitura: 180 MB/s • Temperatura: 34°C • Horas de Uso: 8.420h
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'overlay',
      titulo: 'Overlay Customizável In-Game',
      subtitulo: 'HUD translúcido para jogos com estatísticas flutuantes.',
      icone: AppWindow,
      tag: 'HUD IN-GAME',
      descricaoCurta: 'Módulo de overlay leve desenhado sobre a renderização do jogo, exibindo métricas de FPS, uso de hardware e temperaturas sem impactar a taxa de quadros.',
      destaques: [
        'Ajuste fino de transparência e posição na tela',
        'Ativação/Desativação instantânea por atalho de teclado',
        'Contador de FPS e tempo de quadro (frametime)',
        'Cores neon customizáveis para máxima legibilidade'
      ],
      renderVisual: () => (
        <div style={{ display: 'flex', height: '100%', background: '#0f111a', borderRadius: '10px', overflow: 'hidden' }}>
          {renderSidebarSimulada('overlay')}
          <div style={{ flex: 1, padding: '12px', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ opacity: 0.2, fontSize: '0.8rem', color: '#fff', textAlign: 'center' }}>
              [ Janela do Jogo em Execução ]
            </div>
            {/* O HUD flutuante do CorePulse */}
            <div style={{
              position: 'absolute',
              top: '12px',
              left: '12px',
              background: 'rgba(15, 17, 26, 0.92)',
              border: '1px solid rgba(139, 92, 246, 0.4)',
              borderRadius: '10px',
              padding: '8px 12px',
              boxShadow: '0 8px 24px rgba(0,0,0,0.6)',
              fontFamily: 'monospace',
              fontSize: '0.72rem'
            }}>
              <div style={{ color: '#4ade80' }}>FPS: <strong>144.2</strong></div>
              <div style={{ color: '#8b5cf6' }}>RTX 4070: <strong>58°C (92%)</strong></div>
              <div style={{ color: '#facc15' }}>RYZEN 7: <strong>54°C (34%)</strong></div>
              <div style={{ color: '#38bdf8' }}>RAM: <strong>11.4 GB</strong></div>
            </div>
          </div>
        </div>
      )
    }
  ];

  const atual = slides[slideAtual];
  const IconeAtual = atual.icone;

  const proximoSlide = () => setSlideAtual((prev) => (prev + 1) % slides.length);
  const slideAnterior = () => setSlideAtual((prev) => (prev - 1 + slides.length) % slides.length);

  return (
    <>
      <header className="pagina-cabecalho">
        <div className="badge-categoria">
          <Monitor size={16} /> Software Desktop • Python & React
        </div>
        <h1>CorePulse</h1>
        <p>Central de monitoramento de hardware, otimização de jogos, telemetria de sensores e benchmarks para Windows.</p>
      </header>

      <main className="conteudo-container">
        {/* Destaque */}
        <section style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '30px',
          marginBottom: '50px',
          alignItems: 'center'
        }}>
          <div>
            <h2 style={{ fontSize: '1.8rem', marginBottom: '14px' }}>Controle absoluto do seu PC</h2>
            <p style={{ color: 'var(--texto-suave)', marginBottom: '16px', fontSize: '1.05rem' }}>
              O <strong>CorePulse</strong> foi planejado para entusiastas e usuários exigentes que necessitam de dados precisos sobre a saúde e desempenho de suas máquinas em tempo real.
            </p>
            <p style={{ color: 'var(--texto-suave)', fontSize: '1.05rem' }}>
              Desenvolvido com uma arquitetura moderna que une o poder de leitura de baixo nível do <strong>Python</strong> com a agilidade e fluidez visual do <strong>React & TypeScript</strong>.
            </p>
          </div>

          <div style={{
            background: 'var(--card)',
            border: '1px solid var(--card-border)',
            borderRadius: 'var(--radius)',
            padding: '26px'
          }}>
            <h4 style={{ color: 'var(--ciano)', marginBottom: '12px', fontSize: '1.1rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Layers size={20} /> Pilares Técnicos:
            </h4>
            <ul className="recursos-lista" style={{ marginBottom: 0 }}>
              <li><strong>Telemetria em Tempo Real:</strong> CPU, GPU, Memória, Disco e Rede</li>
              <li><strong>Módulo de Benchmarks:</strong> Testes de estresse com pontuação</li>
              <li><strong>Game Hub & Otimizador:</strong> Gestão de bibliotecas e perfis de jogo</li>
              <li><strong>Overlay In-Game:</strong> Estatísticas flutuantes durante o jogo</li>
              <li><strong>Drivers & Armazenamento:</strong> Saúde S.M.A.R.T e versões de drivers</li>
            </ul>
          </div>
        </section>

        {/* ============================================================
            APRESENTAÇÃO DAS TELAS (CARROSSEL COM VISUAL FIEL AO COREPULSE)
            ============================================================ */}
        <section style={{ marginBottom: '60px' }}>
          <div className="secao-titulo" style={{ textAlign: 'left', marginBottom: '24px' }}>
            <span className="sub-rotulo">APRESENTAÇÃO DAS TELAS</span>
            <h2 style={{ fontSize: '1.8rem' }}>Conheça cada tela do aplicativo</h2>
            <p style={{ color: 'var(--texto-suave)' }}>
              Abaixo você confere o visual idêntico ao CorePulse real (com a Sidebar roxa com raio ⚡, o Hero Banner gradiente e os Circular Gauges) acompanhado da explicação técnica:
            </p>
          </div>

          {/* Seletor Rápido em Pílulas */}
          <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '14px', marginBottom: '18px' }}>
            {slides.map((s, idx) => {
              const Icone = s.icone;
              const ativo = slideAtual === idx;
              return (
                <button
                  key={s.id}
                  onClick={() => setSlideAtual(idx)}
                  style={{
                    padding: '8px 16px',
                    borderRadius: '999px',
                    fontSize: '0.85rem',
                    fontWeight: ativo ? 700 : 500,
                    cursor: 'pointer',
                    whiteSpace: 'nowrap',
                    background: ativo ? 'linear-gradient(90deg, #8b5cf6, #3b82f6)' : 'var(--card)',
                    color: ativo ? '#ffffff' : 'var(--texto-suave)',
                    border: ativo ? 'none' : '1px solid var(--card-border)',
                    boxShadow: ativo ? '0 0 20px rgba(139,92,246,0.4)' : 'none',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    transition: 'all 0.2s'
                  }}
                >
                  <Icone size={14} /> {s.titulo.split(' ')[0]}
                </button>
              );
            })}
          </div>

          {/* Card Principal da Apresentação */}
          <div style={{
            background: 'linear-gradient(160deg, var(--card), var(--bg-2))',
            border: '1px solid var(--card-border)',
            borderRadius: 'var(--radius)',
            padding: '30px',
            boxShadow: 'var(--sombra-neon)'
          }}>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
              gap: '30px',
              alignItems: 'center'
            }}>
              {/* Lado Esquerdo: Screenshot Visual Fiel na Moldura do Windows */}
              <div>
                <div style={{
                  background: '#040711',
                  border: '1px solid rgba(139, 92, 246, 0.35)',
                  borderRadius: '16px',
                  overflow: 'hidden',
                  boxShadow: '0 12px 40px rgba(0,0,0,0.6)'
                }}>
                  {/* Barra de Janela do Windows */}
                  <div style={{
                    background: '#0a0d18',
                    padding: '8px 14px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    borderBottom: '1px solid rgba(255,255,255,0.06)'
                  }}>
                    <span style={{ fontSize: '0.72rem', color: '#94a3b8', display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 600 }}>
                      <Monitor size={12} color="#8b5cf6" /> CorePulse v3.0 — {atual.id}.view
                    </span>
                    <div style={{ display: 'flex', gap: '6px' }}>
                      <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#facc15' }}></span>
                      <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#4ade80' }}></span>
                      <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#f87171' }}></span>
                    </div>
                  </div>

                  {/* Render Visual do Slide */}
                  <div style={{ height: '330px', padding: '6px', background: '#0a0d18' }}>
                    {atual.renderVisual()}
                  </div>
                </div>

                {/* Controles de Navegação */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '14px' }}>
                  <button
                    onClick={slideAnterior}
                    className="btn btn-secundario"
                    style={{ padding: '8px 16px', fontSize: '0.85rem' }}
                  >
                    <ChevronLeft size={16} /> Anterior
                  </button>
                  <span style={{ fontSize: '0.85rem', color: 'var(--texto-suave)', fontWeight: 600 }}>
                    {slideAtual + 1} de {slides.length}
                  </span>
                  <button
                    onClick={proximoSlide}
                    className="btn btn-primario"
                    style={{ padding: '8px 16px', fontSize: '0.85rem' }}
                  >
                    Próxima <ChevronRight size={16} />
                  </button>
                </div>
              </div>

              {/* Lado Direito: Explicação Detalhada */}
              <div>
                <div style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  background: 'rgba(139, 92, 246, 0.15)',
                  color: '#c084fc',
                  fontSize: '0.75rem',
                  fontWeight: 800,
                  padding: '4px 12px',
                  borderRadius: '999px',
                  marginBottom: '12px',
                  letterSpacing: '1px',
                  border: '1px solid rgba(139, 92, 246, 0.3)'
                }}>
                  <IconeAtual size={14} /> {atual.tag}
                </div>

                <h3 style={{ fontSize: '1.7rem', color: '#fff', marginBottom: '8px' }}>
                  {atual.titulo}
                </h3>

                <p style={{ color: 'var(--ciano)', fontSize: '0.95rem', fontWeight: 600, marginBottom: '14px' }}>
                  {atual.subtitulo}
                </p>

                <p style={{ color: 'var(--texto-suave)', fontSize: '1rem', lineHeight: 1.7, marginBottom: '20px' }}>
                  {atual.descricaoCurta}
                </p>

                <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '16px' }}>
                  <span style={{ fontSize: '0.8rem', fontWeight: 800, color: '#fff', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                    Recursos Destaque:
                  </span>
                  <ul style={{ listStyle: 'none', marginTop: '10px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {atual.destaques.map((d, i) => (
                      <li key={i} style={{ fontSize: '0.9rem', color: 'var(--texto-suave)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#8b5cf6' }}></span>
                        {d}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Demo Interativa Original */}
        <section>
          <div className="secao-titulo" style={{ textAlign: 'left', marginBottom: '16px' }}>
            <span className="sub-rotulo">EXPERIMENTE AO VIVO</span>
            <h2 style={{ fontSize: '1.8rem' }}>Demo Interativa do CorePulse</h2>
            <p style={{ color: 'var(--texto-suave)' }}>
              Esta é a aplicação React original do CorePulse rodando ao vivo no navegador! Navegue pelo menu lateral e explore os recursos:
            </p>
          </div>

          <div style={{
            background: '#0f172a',
            border: '1px solid rgba(77, 163, 255, 0.3)',
            borderRadius: '12px',
            overflow: 'hidden',
            boxShadow: '0 10px 40px rgba(0, 0, 0, 0.6), var(--sombra-neon)'
          }}>
            <div style={{
              background: '#090e1a',
              padding: '10px 16px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              borderBottom: '1px solid rgba(255, 255, 255, 0.08)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.85rem', color: 'var(--texto-suave)', fontWeight: 600 }}>
                <Monitor size={16} color="var(--ciano)" />
                <span>CorePulse — Windows System Manager v3.0 (Demo Interativa)</span>
              </div>
              <div style={{ display: 'flex', gap: '8px' }}>
                <span style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#facc15' }}></span>
                <span style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#4ade80' }}></span>
                <span style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#f87171' }}></span>
              </div>
            </div>
            <div style={{ width: '100%', height: '520px', background: '#070d1e' }}>
              <iframe src="/demo-corepulse/index.html" title="CorePulse Live Demo" style={{ width: '100%', height: '100%', border: 'none' }} />
            </div>
          </div>
        </section>

        {/* Caixa de Feedback Híbrida */}
        <FeedbackSection appId="corepulse" appName="CorePulse" corTema="var(--ciano)" />
      </main>
    </>
  );
};
