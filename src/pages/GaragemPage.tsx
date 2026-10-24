import React, { useState } from 'react';
import {
  Smartphone,
  Car,
  Fuel,
  Wrench,
  Sparkles,
  Eye,
  EyeOff,
  Gauge,
  Coins,
  Wifi,
  BatteryCharging,
  Signal,
  X,
  ChevronLeft,
  ChevronRight,
  TrendingUp,
  Bot,
  Send
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

interface Veiculo {
  nome: string;
  sub: string;
  placa: string;
  consumo: number;
  autonomia: number;
  custoKm: number;
  saldo: number;
}

export const GaragemPage: React.FC = () => {
  // Estado da Apresentação de Telas
  const [slideAtual, setSlideAtual] = useState<number>(0);

  // Estados do Simulador
  const [veiculoIndex, setVeiculoIndex] = useState<number>(0);
  const [ocultarSaldo, setOcultarSaldo] = useState<boolean>(false);
  const [modalTipo, setModalTipo] = useState<string | null>(null);

  const [litros, setLitros] = useState<string>('40.0');
  const [precoLitro, setPrecoLitro] = useState<string>('5.79');
  const [manutDesc, setManutDesc] = useState<string>('Alinhamento e Balanceamento');
  const [manutValor, setManutValor] = useState<string>('140.00');

  const [historico, setHistorico] = useState([
    { tipo: 'abastecer', titulo: 'Gasolina Aditivada', desc: '41.2 L • Posto Shell', valor: 'R$ 245,60', cor: '#f59e0b' },
    { tipo: 'manutencao', titulo: 'Troca Óleo Sintético 5W40', desc: 'Oficina Bosch Service', valor: 'R$ 330,00', cor: '#D32F2F' }
  ]);

  const veiculos: Veiculo[] = [
    { nome: 'Volkswagen Golf TSI', sub: 'Carro • 48.250 km', placa: 'BRA2E19', consumo: 13.8, autonomia: 620, custoKm: 0.42, saldo: 575.60 },
    { nome: 'Honda Civic Touring', sub: 'Carro • 32.180 km', placa: 'JOH7D26', consumo: 11.4, autonomia: 540, custoKm: 0.49, saldo: 420.00 },
    { nome: 'Yamaha MT-07 ABS', sub: 'Moto • 12.400 km', placa: 'DEV9X44', consumo: 21.5, autonomia: 310, custoKm: 0.28, saldo: 180.50 }
  ];

  const veiculo = veiculos[veiculoIndex];

  // ============================================================
  // MOCKS VISUAIS FIÉIS AO JETPACK COMPOSE (Tema Vermelho #D32F2F)
  // ============================================================
  const molduraSmartphoneSimulado = (conteudo: React.ReactNode) => (
    <div style={{
      width: '100%',
      maxWidth: '280px',
      height: '460px',
      background: '#000000',
      borderRadius: '34px',
      border: '7px solid #202738',
      position: 'relative',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
      boxShadow: '0 12px 35px rgba(0,0,0,0.8), 0 0 25px rgba(211,47,47,0.2)',
      margin: '0 auto'
    }}>
      {/* Notch */}
      <div style={{
        position: 'absolute',
        top: '6px',
        left: '50%',
        transform: 'translateX(-50%)',
        width: '70px',
        height: '16px',
        background: '#000',
        borderRadius: '10px',
        zIndex: 100,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <div style={{ width: '6px', height: '6px', background: '#1e293b', borderRadius: '50%' }}></div>
      </div>
      {/* Conteúdo da Tela */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        {conteudo}
      </div>
    </div>
  );

  const slides: ScreenShotSlide[] = [
    {
      id: 'dashboard',
      titulo: 'DashboardGaragem.kt (Home)',
      subtitulo: 'Card Hero com Placa Mercosul + Carrossel de Veículos + 3 Indicadores.',
      icone: Car,
      tag: 'TELA PRINCIPAL',
      descricaoCurta: 'Painel mestre com gradiente escuro de vinho (#2B0B0B), carrossel horizontal de seleção rápida, exibição de placa Mercosul com tarja azul, saldo protegido e mostradores de consumo.',
      destaques: [
        'TopBar com gradiente vinho (#2B0B0B -> #161616)',
        'Placa Mercosul autêntica (tarja BRASIL + fonte monoespaçada)',
        'Botão de alternar visibilidade dos gastos do mês',
        'Gauge circular vivo de consumo médio (km/l)'
      ],
      renderVisual: () => molduraSmartphoneSimulado(
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: '#000', color: '#fff' }}>
          {/* Topo Gradiente */}
          <div style={{ background: 'linear-gradient(180deg, #2B0B0B 0%, #161616 70%, #000 100%)', padding: '24px 12px 10px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.6rem', color: '#ccc', marginBottom: '8px' }}>
              <span>19:40</span>
              <div style={{ display: 'flex', gap: '4px' }}><Wifi size={10} /><BatteryCharging size={10} /></div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <img src="/assets/john-persona.jfif" alt="Avatar" style={{ width: '32px', height: '32px', borderRadius: '50%', border: '1.5px solid #D32F2F', objectFit: 'cover' }} />
              <div>
                <div style={{ fontSize: '0.55rem', color: 'rgba(255,255,255,0.6)' }}>Minha Garagem</div>
                <div style={{ fontSize: '0.8rem', fontWeight: 800 }}>Olá, Jonathan</div>
              </div>
            </div>
            {/* Pílulas de Carro */}
            <div style={{ display: 'flex', gap: '4px', marginTop: '8px' }}>
              <span style={{ background: '#D32F2F', padding: '3px 8px', borderRadius: '12px', fontSize: '0.6rem', fontWeight: 700 }}>Golf TSI</span>
              <span style={{ background: '#222', padding: '3px 8px', borderRadius: '12px', fontSize: '0.6rem' }}>Civic</span>
              <span style={{ background: '#222', padding: '3px 8px', borderRadius: '12px', fontSize: '0.6rem' }}>MT-07</span>
            </div>
          </div>

          {/* Corpo com Hero Card */}
          <div style={{ padding: '8px 10px', display: 'flex', flexDirection: 'column', gap: '8px', flex: 1 }}>
            <div style={{ background: '#181818', borderRadius: '14px', border: '1px solid rgba(255,255,255,0.08)', padding: '10px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <div style={{ fontSize: '0.85rem', fontWeight: 900 }}>Volkswagen Golf TSI</div>
                  <div style={{ fontSize: '0.6rem', color: '#999' }}>Flex • 48.250 km</div>
                  <div style={{ marginTop: '6px', background: '#fff', borderRadius: '4px', overflow: 'hidden', display: 'inline-block' }}>
                    <div style={{ background: '#003399', color: '#fff', fontSize: '0.35rem', fontWeight: 900, padding: '1px 6px' }}>BRASIL</div>
                    <div style={{ color: '#000', fontSize: '0.75rem', fontWeight: 900, padding: '1px 6px', fontFamily: 'Courier New' }}>BRA2E19</div>
                  </div>
                </div>
                <Car size={24} color="#ff5252" />
              </div>
              <div style={{ background: 'rgba(0,0,0,0.5)', borderRadius: '10px', padding: '8px 10px', marginTop: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ fontSize: '0.55rem', color: '#aaa' }}>Gastos do Mês</div>
                  <div style={{ color: '#D32F2F', fontSize: '0.95rem', fontWeight: 900 }}>R$ 575,60</div>
                </div>
                <span style={{ fontSize: '0.55rem', background: 'rgba(255,255,255,0.1)', padding: '3px 8px', borderRadius: '6px' }}>Histórico</span>
              </div>
            </div>

            {/* 3 Indicadores */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '4px' }}>
              <div style={{ background: '#1E1E1E', borderRadius: '10px', padding: '6px 2px', textAlign: 'center' }}>
                <div style={{ fontSize: '0.8rem', fontWeight: 900, color: '#4CAF50' }}>13.8</div>
                <div style={{ fontSize: '0.5rem', color: '#888' }}>Último km/l</div>
              </div>
              <div style={{ background: '#1E1E1E', borderRadius: '10px', padding: '6px 2px', textAlign: 'center' }}>
                <div style={{ fontSize: '0.8rem', fontWeight: 800, color: '#42A5F5' }}>620 km</div>
                <div style={{ fontSize: '0.5rem', color: '#888' }}>Autonomia</div>
              </div>
              <div style={{ background: '#1E1E1E', borderRadius: '10px', padding: '6px 2px', textAlign: 'center' }}>
                <div style={{ fontSize: '0.8rem', fontWeight: 800, color: '#FFD54F' }}>R$ 0,42</div>
                <div style={{ fontSize: '0.5rem', color: '#888' }}>Custo / km</div>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'abastecimento',
      titulo: 'TelaAdicionarAbastecimento.kt',
      subtitulo: 'Hero Display para Posto + Cálculo Bidirecional de Preço e Litros.',
      icone: Fuel,
      tag: 'REGISTRO DE COMBUSTÍVEL',
      descricaoCurta: 'Projetada para rápida operação no posto. Ao digitar o valor total em reais, o app calcula os litros automaticamente e detecta tanque cheio para aferir a média de consumo.',
      destaques: [
        'Display gigante com valor em destaque para conferência na bomba',
        'Seletor rápido de combustível (Gasolina, Etanol, Diesel, GNV)',
        'Cálculo bidirecional instantâneo (Litros x Preço por Litro)',
        'Captura automática de localização via FusedLocation'
      ],
      renderVisual: () => molduraSmartphoneSimulado(
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: '#000', color: '#fff', padding: '24px 14px 12px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '8px' }}>
            <Fuel size={18} color="#f59e0b" />
            <span style={{ fontSize: '0.85rem', fontWeight: 800 }}>Novo Abastecimento</span>
          </div>

          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '10px' }}>
            {/* Hero Display de Valor */}
            <div style={{ background: '#181818', borderRadius: '14px', border: '1px solid rgba(245,158,11,0.3)', padding: '14px', textAlign: 'center' }}>
              <div style={{ fontSize: '0.65rem', color: '#aaa' }}>VALOR TOTAL DO ABASTECIMENTO</div>
              <div style={{ fontSize: '1.6rem', fontWeight: 900, color: '#f59e0b', margin: '4px 0' }}>R$ 246,50</div>
              <div style={{ fontSize: '0.65rem', color: '#4ade80' }}>42.5 Litros • R$ 5,80/L</div>
            </div>

            {/* Tipos de Combustível */}
            <div style={{ display: 'flex', gap: '6px' }}>
              <span style={{ flex: 1, textAlign: 'center', background: '#f59e0b', color: '#000', fontWeight: 800, padding: '5px 0', borderRadius: '8px', fontSize: '0.65rem' }}>Gasolina</span>
              <span style={{ flex: 1, textAlign: 'center', background: '#1E1E1E', color: '#fff', padding: '5px 0', borderRadius: '8px', fontSize: '0.65rem' }}>Etanol</span>
              <span style={{ flex: 1, textAlign: 'center', background: '#1E1E1E', color: '#fff', padding: '5px 0', borderRadius: '8px', fontSize: '0.65rem' }}>Diesel</span>
            </div>

            <div style={{ background: '#141414', borderRadius: '10px', padding: '8px 10px', fontSize: '0.65rem', color: '#aaa', display: 'flex', justifyContent: 'space-between' }}>
              <span>Tanque Cheio:</span>
              <strong style={{ color: '#4ade80' }}>SIM (Calcular Média)</strong>
            </div>

            <button style={{ background: 'linear-gradient(90deg, #f59e0b, #d97706)', color: '#000', border: 'none', borderRadius: '12px', padding: '10px', fontWeight: 900, fontSize: '0.75rem', marginTop: '6px' }}>
              Confirmar Abastecimento
            </button>
          </div>
        </div>
      )
    },
    {
      id: 'manutencao',
      titulo: 'TelaAdicionarManutencao.kt',
      subtitulo: 'Split de Custos (Peças vs Mão de Obra) + Alertas de Revisão.',
      icone: Wrench,
      tag: 'OFICINA & PEÇAS',
      descricaoCurta: 'Módulo de histórico e prevenção que permite discriminar o valor investido em autopeças versus o custo da mão de obra, definindo lembretes por km ou data.',
      destaques: [
        'Divisão de custos: Peças vs Mão de Obra da Oficina',
        'Gatilhos de lembrete preditivo (próxima troca por km)',
        'Barra de ação fixada na base (Bottom Sticky Action)',
        'Armazenamento seguro offline no Room Database'
      ],
      renderVisual: () => molduraSmartphoneSimulado(
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: '#000', color: '#fff', padding: '24px 14px 12px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '8px' }}>
            <Wrench size={18} color="#D32F2F" />
            <span style={{ fontSize: '0.85rem', fontWeight: 800 }}>Registrar Manutenção</span>
          </div>

          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '10px' }}>
            <div style={{ background: '#181818', borderRadius: '14px', border: '1px solid rgba(211,47,47,0.3)', padding: '12px' }}>
              <div style={{ fontSize: '0.8rem', fontWeight: 800, color: '#fff' }}>Troca de Pastilhas + Fluido de Freio</div>
              <div style={{ fontSize: '0.62rem', color: '#aaa', marginTop: '2px' }}>Oficina: Bosch Car Service</div>
              <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', marginTop: '8px', paddingTop: '6px', display: 'flex', justifyContent: 'space-between', fontSize: '0.65rem' }}>
                <span>Peças: <strong style={{ color: '#fff' }}>R$ 180,00</strong></span>
                <span>Mão de Obra: <strong style={{ color: '#fff' }}>R$ 140,00</strong></span>
              </div>
            </div>

            <div style={{ background: '#141414', borderRadius: '10px', padding: '10px', borderLeft: '3px solid #D32F2F' }}>
              <div style={{ fontSize: '0.62rem', color: '#aaa' }}>PRÓXIMA REVISÃO PREVENTIVA</div>
              <div style={{ fontSize: '0.85rem', fontWeight: 900, color: '#fff' }}>Aos 58.000 km (ou em 6 meses)</div>
            </div>

            <button style={{ background: '#D32F2F', color: '#fff', border: 'none', borderRadius: '12px', padding: '10px', fontWeight: 900, fontSize: '0.75rem' }}>
              Salvar Registro de Serviço
            </button>
          </div>
        </div>
      )
    },
    {
      id: 'gemini',
      titulo: 'TelaGeminiChat.kt (Mecânico IA)',
      subtitulo: 'Chat Interativo com IA para Diagnóstico de Sintomas e Barulhos.',
      icone: Bot,
      tag: 'INTELIGÊNCIA ARTIFICIAL',
      descricaoCurta: 'Mecânico virtual com Google Gemini integrado. O motorista pode descrever luzes do painel ou barulhos na suspensão e receber orientações técnicas em linguagem acessível.',
      destaques: [
        'Streaming de respostas direto do Google Generative AI SDK',
        'BottomSheet com perguntas rápidas (ex: "Barulho ao frear")',
        'Diagnóstico preliminar para evitar gastos desnecessários',
        'Conselhos de segurança antes de pegar a estrada'
      ],
      renderVisual: () => molduraSmartphoneSimulado(
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: '#000', color: '#fff', padding: '24px 10px 10px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '6px' }}>
            <Sparkles size={16} color="#38e0ff" />
            <span style={{ fontSize: '0.8rem', fontWeight: 800 }}>Mecânico Gemini IA</span>
          </div>

          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '8px', padding: '10px 0', overflowY: 'hidden' }}>
            {/* Mensagem do usuário */}
            <div style={{ alignSelf: 'flex-end', background: '#D32F2F', padding: '6px 10px', borderRadius: '12px 12px 2px 12px', fontSize: '0.65rem', maxWidth: '85%' }}>
              O carro está fazendo um chiado fino ao pisar no freio...
            </div>
            {/* Resposta do Gemini */}
            <div style={{ alignSelf: 'flex-start', background: '#1c1e30', border: '1px solid rgba(56,224,255,0.3)', padding: '8px 10px', borderRadius: '12px 12px 12px 2px', fontSize: '0.62rem', lineHeight: 1.4, maxWidth: '90%', color: '#e2e8f0' }}>
              <strong style={{ color: '#38e0ff' }}>Diagnóstico Preliminar:</strong><br />
              Provável desgaste nas pastilhas dianteiras atingindo o sensor acústico. Recomendo inspeção em até 500 km para não riscar o disco!
            </div>
          </div>

          {/* Campo de Envio */}
          <div style={{ background: '#141414', borderRadius: '10px', padding: '6px 10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '0.62rem', color: '#777' }}>Descreva o sintoma...</span>
            <Send size={14} color="#38e0ff" />
          </div>
        </div>
      )
    },
    {
      id: 'financas',
      titulo: 'TelaFinancas.kt & Relatórios',
      subtitulo: 'Gráficos Vico Charts de Despesas por Categoria e Custo/km.',
      icone: TrendingUp,
      tag: 'INTELIGÊNCIA FINANCEIRA',
      descricaoCurta: 'Cruza os gastos com abastecimento e revisões, renderizando relatórios mensais comparativos com custo real de rodagem por quilômetro.',
      destaques: [
        'Gráficos nativos com a biblioteca Vico Charts',
        'Cálculo do Custo Efetivo por Quilômetro Rodado (R$/km)',
        'Filtros por veículo específico ou frota da garagem',
        'Exportação de relatórios para controle financeiro'
      ],
      renderVisual: () => molduraSmartphoneSimulado(
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: '#000', color: '#fff', padding: '24px 12px 10px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '8px' }}>
            <TrendingUp size={16} color="#10b981" />
            <span style={{ fontSize: '0.85rem', fontWeight: 800 }}>Finanças & Gastos</span>
          </div>

          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '10px 0' }}>
            <div style={{ background: '#181818', borderRadius: '12px', padding: '10px' }}>
              <div style={{ fontSize: '0.6rem', color: '#aaa' }}>TOTAL GASTO ESTE MÊS</div>
              <div style={{ fontSize: '1.2rem', fontWeight: 900, color: '#10b981' }}>R$ 575,60</div>
              <div style={{ fontSize: '0.6rem', color: '#888', marginTop: '2px' }}>Combustível: 65% | Manutenção: 35%</div>
            </div>

            {/* Gráfico Vico Simulado */}
            <div style={{ background: '#141414', borderRadius: '12px', padding: '10px' }}>
              <div style={{ fontSize: '0.62rem', color: '#aaa', marginBottom: '8px' }}>Comparativo dos Últimos 4 Meses</div>
              <div style={{ display: 'flex', alignItems: 'flex-end', gap: '10px', height: '65px', padding: '4px 0' }}>
                {[
                  { mes: 'Jul', alt: 45, cor: '#f59e0b' },
                  { mes: 'Ago', alt: 75, cor: '#D32F2F' },
                  { mes: 'Set', alt: 50, cor: '#f59e0b' },
                  { mes: 'Out', alt: 60, cor: '#10b981' }
                ].map((b, i) => (
                  <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
                    <div style={{ width: '100%', background: b.cor, height: `${b.alt}%`, borderRadius: '4px' }}></div>
                    <span style={{ fontSize: '0.55rem', color: '#999' }}>{b.mes}</span>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ background: '#181818', borderRadius: '8px', padding: '6px 10px', fontSize: '0.65rem', display: 'flex', justifyContent: 'space-between' }}>
              <span>Custo Efetivo:</span>
              <strong style={{ color: '#FFD54F' }}>R$ 0,42 / km rodado</strong>
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

  const handleSalvarAbastecer = () => {
    if (!litros || !precoLitro) return;
    const total = (parseFloat(litros) * parseFloat(precoLitro)).toFixed(2).replace('.', ',');
    setHistorico([
      { tipo: 'abastecer', titulo: 'Gasolina Comum', desc: `${litros} L • R$ ${precoLitro}/L`, valor: `R$ ${total}`, cor: '#f59e0b' },
      ...historico
    ]);
    setModalTipo(null);
  };

  const handleSalvarManutencao = () => {
    if (!manutDesc || !manutValor) return;
    setHistorico([
      { tipo: 'manutencao', titulo: manutDesc, desc: 'Revisão Preventiva', valor: `R$ ${parseFloat(manutValor).toFixed(2).replace('.', ',')}`, cor: '#D32F2F' },
      ...historico
    ]);
    setModalTipo(null);
  };

  return (
    <>
      <header className="pagina-cabecalho">
        <div className="badge-categoria" style={{ background: 'rgba(211, 47, 47, 0.15)', color: '#ff5252', borderColor: 'rgba(211, 47, 47, 0.35)' }}>
          <Smartphone size={16} /> Aplicativo Mobile Nativo • Kotlin & Jetpack Compose
        </div>
        <h1>Garagem App</h1>
        <p>Gestão veicular completa, telemetria de consumo, controle de manutenções e mecânico inteligente alimentado pelo Google Gemini.</p>
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
            <h2 style={{ fontSize: '1.8rem', marginBottom: '14px' }}>Arquitetura & Engenharia Mobile</h2>
            <p style={{ color: 'var(--texto-suave)', marginBottom: '16px', fontSize: '1.05rem' }}>
              Construído sob a arquitetura <strong>MVVM reativa</strong> (Model-View-ViewModel) com Kotlin Coroutines, StateFlow e <strong>Room Database</strong> (v14 com migrações estruturadas), o Garagem App foi projetado para funcionar de forma 100% autônoma offline com sincronização bidirecional no <strong>Cloud Firestore</strong>.
            </p>
            <p style={{ color: 'var(--texto-suave)', fontSize: '1.05rem' }}>
              A interface visual adota o <strong>Jetpack Compose com Material 3</strong>, trazendo uma identidade marcante em Vermelho Garagem (<code>#D32F2F</code>), cards com Placa Mercosul autêntica e Floating Navigation Bar flutuante.
            </p>
          </div>

          <div style={{ background: 'var(--card)', border: '1px solid var(--card-border)', borderRadius: 'var(--radius)', padding: '26px' }}>
            <h4 style={{ color: '#ff5252', marginBottom: '12px', fontSize: '1.1rem' }}>Pilares do Código Fonte:</h4>
            <ul className="recursos-lista" style={{ marginBottom: 0 }}>
              <li><strong>Mecânico IA (Google Gemini 1.5):</strong> Diagnóstico de falhas em tempo real</li>
              <li><strong>Room Database v14:</strong> Persistência local robusta com StateFlow</li>
              <li><strong>Firebase Auth & Firestore:</strong> Login com biometria e nuvem</li>
              <li><strong>ML Kit OCR:</strong> Leitura de notas fiscais de combustível e odômetro</li>
              <li><strong>Vico Charts:</strong> Gráficos nativos de gastos por categoria e mês</li>
            </ul>
          </div>
        </section>

        {/* ============================================================
            APRESENTAÇÃO DAS TELAS DO GARAGEM APP (CARROSSEL COM MOCK FIEL)
            ============================================================ */}
        <section style={{ marginBottom: '60px' }}>
          <div className="secao-titulo" style={{ textAlign: 'left', marginBottom: '24px' }}>
            <span className="sub-rotulo" style={{ color: '#ff5252' }}>APRESENTAÇÃO DAS TELAS</span>
            <h2 style={{ fontSize: '1.8rem' }}>Conheça cada tela do aplicativo</h2>
            <p style={{ color: 'var(--texto-suave)' }}>
              Navegue pelos slides abaixo para visualizar a reprodução fiel das telas em Jetpack Compose (Vermelho Garagem #D32F2F) acompanhadas de sua explicação técnica:
            </p>
          </div>

          {/* Pílulas de Navegação Rápida */}
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
                    background: ativo ? 'linear-gradient(90deg, #D32F2F, #B71C1C)' : 'var(--card)',
                    color: ativo ? '#ffffff' : 'var(--texto-suave)',
                    border: ativo ? 'none' : '1px solid var(--card-border)',
                    boxShadow: ativo ? '0 0 20px rgba(211, 47, 47, 0.45)' : 'none',
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

          {/* Card da Apresentação */}
          <div style={{
            background: 'linear-gradient(160deg, var(--card), var(--bg-2))',
            border: '1px solid var(--card-border)',
            borderRadius: 'var(--radius)',
            padding: '30px',
            boxShadow: 'var(--sombra-neon)'
          }}>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '30px',
              alignItems: 'center'
            }}>
              {/* Lado Esquerdo: "Foto" Simulada no Smartphone Android */}
              <div>
                {atual.renderVisual()}

                {/* Controles de Navegação */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '16px', maxWidth: '280px', margin: '16px auto 0' }}>
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
                    style={{ padding: '8px 16px', fontSize: '0.85rem', background: 'linear-gradient(90deg, #D32F2F, #B71C1C)' }}
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
                  background: 'rgba(211, 47, 47, 0.15)',
                  color: '#ff8a80',
                  fontSize: '0.75rem',
                  fontWeight: 800,
                  padding: '4px 12px',
                  borderRadius: '999px',
                  marginBottom: '12px',
                  letterSpacing: '1px',
                  border: '1px solid rgba(211, 47, 47, 0.3)'
                }}>
                  <IconeAtual size={14} /> {atual.tag}
                </div>

                <h3 style={{ fontSize: '1.7rem', color: '#fff', marginBottom: '8px' }}>
                  {atual.titulo}
                </h3>

                <p style={{ color: '#ff8a80', fontSize: '0.95rem', fontWeight: 600, marginBottom: '14px' }}>
                  {atual.subtitulo}
                </p>

                <p style={{ color: 'var(--texto-suave)', fontSize: '1rem', lineHeight: 1.7, marginBottom: '20px' }}>
                  {atual.descricaoCurta}
                </p>

                <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '16px' }}>
                  <span style={{ fontSize: '0.8rem', fontWeight: 800, color: '#fff', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                    Destaques da Arquitetura:
                  </span>
                  <ul style={{ listStyle: 'none', marginTop: '10px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {atual.destaques.map((d, i) => (
                      <li key={i} style={{ fontSize: '0.9rem', color: 'var(--texto-suave)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#D32F2F' }}></span>
                        {d}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* DEMO INTERATIVA COM SMARTPHONE COMPLETO */}
        <section>
          <div className="secao-titulo" style={{ textAlign: 'left', marginBottom: '20px' }}>
            <span className="sub-rotulo" style={{ color: '#ff5252' }}>EXPERIMENTE AO VIVO NO SMARTPHONE</span>
            <h2 style={{ fontSize: '1.8rem' }}>Demo Interativa do Garagem App</h2>
            <p style={{ color: 'var(--texto-suave)' }}>
              Interaja com o smartphone abaixo: troque de carro pelo carrossel, oculte o saldo, adicione combustível ou consulte o mecânico Gemini!
            </p>
          </div>

          <div style={{ display: 'flex', justifyContent: 'center', padding: '10px 0', width: '100%' }}>
            <div style={{
              width: '100%',
              maxWidth: '360px',
              height: '740px',
              background: '#000000',
              borderRadius: '42px',
              border: '8px solid #1f2533',
              boxShadow: '0 20px 60px rgba(0, 0, 0, 0.8), 0 0 35px rgba(211, 47, 47, 0.25)',
              position: 'relative',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column'
            }}>
              {/* Notch */}
              <div style={{
                position: 'absolute',
                top: '10px',
                left: '50%',
                transform: 'translateX(-50%)',
                width: '95px',
                height: '22px',
                background: '#000',
                borderRadius: '12px',
                zIndex: 100,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <div style={{ width: '8px', height: '8px', background: '#1e293b', borderRadius: '50%' }}></div>
              </div>

              {/* Topbar Gradiente Compose */}
              <div style={{
                background: 'linear-gradient(180deg, #2B0B0B 0%, #161616 70%, #000000 100%)',
                padding: '34px 18px 14px',
                borderBottom: '1px solid rgba(255, 255, 255, 0.05)'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem', color: 'rgba(255, 255, 255, 0.8)', marginBottom: '12px' }}>
                  <span>19:45</span>
                  <div style={{ display: 'flex', gap: '6px' }}>
                    <Wifi size={12} />
                    <Signal size={12} />
                    <BatteryCharging size={12} />
                  </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <img src="/assets/john-persona.jfif" alt="Avatar" style={{ width: '48px', height: '48px', borderRadius: '50%', border: '2px solid #D32F2F', objectFit: 'cover' }} />
                    <div>
                      <div style={{ fontSize: '0.72rem', color: 'rgba(255, 255, 255, 0.6)', textTransform: 'uppercase' }}>Minha Garagem</div>
                      <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#fff' }}>Olá, Jonathan</div>
                    </div>
                  </div>
                </div>

                {/* Carrossel LazyRow */}
                <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', padding: '12px 0 4px' }}>
                  {veiculos.map((v, i) => (
                    <button
                      key={v.nome}
                      onClick={() => setVeiculoIndex(i)}
                      style={{
                        padding: '6px 14px',
                        borderRadius: '20px',
                        fontSize: '0.78rem',
                        fontWeight: 600,
                        cursor: 'pointer',
                        whiteSpace: 'nowrap',
                        background: veiculoIndex === i ? '#D32F2F' : '#222',
                        color: '#fff',
                        border: '1px solid rgba(255, 255, 255, 0.05)',
                        boxShadow: veiculoIndex === i ? '0 0 12px rgba(211, 47, 47, 0.5)' : 'none'
                      }}
                    >
                      {v.nome}
                    </button>
                  ))}
                </div>
              </div>

              {/* Corpo App */}
              <div style={{ flex: 1, overflowY: 'auto', padding: '14px 16px 85px', background: '#000', display: 'flex', flexDirection: 'column', gap: '14px' }}>
                {/* Hero Card */}
                <div style={{
                  background: 'linear-gradient(145deg, #1f1f1f, #141414)',
                  borderRadius: '22px',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  padding: '18px'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '14px' }}>
                    <div>
                      <div style={{ fontSize: '1.25rem', fontWeight: 900, color: '#fff' }}>{veiculo.nome}</div>
                      <div style={{ fontSize: '0.8rem', color: 'rgba(255, 255, 255, 0.6)' }}>{veiculo.sub}</div>
                      {/* Placa Mercosul */}
                      <div style={{ marginTop: '10px', background: '#fff', borderRadius: '6px', overflow: 'hidden', display: 'inline-block', textAlign: 'center' }}>
                        <div style={{ background: '#003399', color: '#fff', fontSize: '0.5rem', fontWeight: 900, padding: '1px 8px', letterSpacing: '1.5px' }}>BRASIL</div>
                        <div style={{ color: '#000', fontSize: '1.05rem', fontWeight: 900, padding: '1px 8px', letterSpacing: '2.5px', fontFamily: 'Courier New' }}>{veiculo.placa}</div>
                      </div>
                    </div>
                    <div style={{ width: '64px', height: '64px', borderRadius: '16px', background: '#262626', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ff5252' }}>
                      <Car size={32} />
                    </div>
                  </div>

                  <div style={{
                    background: 'rgba(0, 0, 0, 0.45)',
                    borderRadius: '16px',
                    padding: '12px 14px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}>
                    <div>
                      <div style={{ fontSize: '0.75rem', color: 'rgba(255, 255, 255, 0.7)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <span>Gastos do Mês</span>
                        <span onClick={() => setOcultarSaldo(!ocultarSaldo)} style={{ cursor: 'pointer' }}>
                          {ocultarSaldo ? <EyeOff size={14} /> : <Eye size={14} />}
                        </span>
                      </div>
                      <div style={{ color: '#D32F2F', fontSize: '1.35rem', fontWeight: 800 }}>
                        {ocultarSaldo ? 'R$ •••••' : `R$ ${veiculo.saldo.toFixed(2).replace('.', ',')}`}
                      </div>
                    </div>
                  </div>
                </div>

                {/* 3 Indicadores */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '8px' }}>
                  <div style={{ background: '#1E1E1E', borderRadius: '16px', padding: '12px 6px', textAlign: 'center' }}>
                    <div style={{ fontSize: '1.1rem', fontWeight: 900, color: '#4CAF50' }}>{veiculo.consumo.toFixed(1)}</div>
                    <div style={{ fontSize: '0.65rem', color: 'rgba(255, 255, 255, 0.65)' }}>Último Consumo<br />km/l</div>
                  </div>
                  <div style={{ background: '#1E1E1E', borderRadius: '16px', padding: '12px 6px', textAlign: 'center' }}>
                    <Gauge size={20} color="#42A5F5" style={{ margin: '0 auto' }} />
                    <div style={{ fontSize: '0.9rem', fontWeight: 800, color: '#fff', marginTop: '4px' }}>{veiculo.autonomia} km</div>
                    <div style={{ fontSize: '0.65rem', color: 'rgba(255, 255, 255, 0.65)' }}>Autonomia</div>
                  </div>
                  <div style={{ background: '#1E1E1E', borderRadius: '16px', padding: '12px 6px', textAlign: 'center' }}>
                    <Coins size={20} color="#FFD54F" style={{ margin: '0 auto' }} />
                    <div style={{ fontSize: '0.9rem', fontWeight: 800, color: '#fff', marginTop: '4px' }}>R$ {veiculo.custoKm.toFixed(2)}</div>
                    <div style={{ fontSize: '0.65rem', color: 'rgba(255, 255, 255, 0.65)' }}>Custo / km</div>
                  </div>
                </div>

                {/* Botões Ação */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                  <button
                    onClick={() => setModalTipo('abastecer')}
                    style={{ background: '#1A1A1A', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: '16px', padding: '12px', color: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}
                  >
                    <Fuel size={20} color="#f59e0b" />
                    <span style={{ fontSize: '0.85rem', fontWeight: 700 }}>Abastecer</span>
                  </button>
                  <button
                    onClick={() => setModalTipo('manutencao')}
                    style={{ background: '#1A1A1A', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: '16px', padding: '12px', color: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}
                  >
                    <Wrench size={20} color="#D32F2F" />
                    <span style={{ fontSize: '0.85rem', fontWeight: 700 }}>Manutenção</span>
                  </button>
                </div>

                {/* Histórico */}
                <div style={{ fontSize: '0.8rem', fontWeight: 800, color: 'rgba(255, 255, 255, 0.6)', textTransform: 'uppercase' }}>Histórico Recente</div>
                {historico.map((h, i) => (
                  <div key={i} style={{ background: '#181818', borderRadius: '14px', padding: '12px 14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <div style={{ fontSize: '0.82rem', fontWeight: 700, color: '#fff' }}>{h.titulo}</div>
                      <div style={{ fontSize: '0.7rem', color: 'rgba(255, 255, 255, 0.5)' }}>{h.desc}</div>
                    </div>
                    <span style={{ fontSize: '0.85rem', fontWeight: 800, color: h.cor }}>{h.valor}</span>
                  </div>
                ))}
              </div>

              {/* BottomSheet Modal */}
              {modalTipo && (
                <div style={{
                  position: 'absolute',
                  left: 0,
                  right: 0,
                  bottom: 0,
                  background: '#181818',
                  borderTopLeftRadius: '26px',
                  borderTopRightRadius: '26px',
                  borderTop: '2px solid #D32F2F',
                  padding: '20px 18px 30px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '12px',
                  zIndex: 90
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h4 style={{ color: '#fff', fontSize: '1rem', margin: 0 }}>
                      {modalTipo === 'abastecer' ? '⛽ Novo Abastecimento' : '🔧 Registrar Manutenção'}
                    </h4>
                    <X size={18} color="#999" style={{ cursor: 'pointer' }} onClick={() => setModalTipo(null)} />
                  </div>

                  {modalTipo === 'abastecer' ? (
                    <>
                      <input
                        type="number"
                        value={litros}
                        onChange={(e) => setLitros(e.target.value)}
                        placeholder="Litros (ex: 40.0)"
                        style={{ background: '#101010', border: '1px solid rgba(255, 255, 255, 0.12)', borderRadius: '12px', padding: '10px 14px', color: '#fff' }}
                      />
                      <input
                        type="number"
                        value={precoLitro}
                        onChange={(e) => setPrecoLitro(e.target.value)}
                        placeholder="Preço/Litro R$"
                        style={{ background: '#101010', border: '1px solid rgba(255, 255, 255, 0.12)', borderRadius: '12px', padding: '10px 14px', color: '#fff' }}
                      />
                      <button
                        onClick={handleSalvarAbastecer}
                        style={{ background: '#f59e0b', color: '#000', border: 'none', borderRadius: '12px', padding: '12px', fontWeight: 800, cursor: 'pointer' }}
                      >
                        Confirmar e Calcular Média
                      </button>
                    </>
                  ) : (
                    <>
                      <input
                        type="text"
                        value={manutDesc}
                        onChange={(e) => setManutDesc(e.target.value)}
                        placeholder="Serviço ou Peça"
                        style={{ background: '#101010', border: '1px solid rgba(255, 255, 255, 0.12)', borderRadius: '12px', padding: '10px 14px', color: '#fff' }}
                      />
                      <input
                        type="number"
                        value={manutValor}
                        onChange={(e) => setManutValor(e.target.value)}
                        placeholder="Valor Total R$"
                        style={{ background: '#101010', border: '1px solid rgba(255, 255, 255, 0.12)', borderRadius: '12px', padding: '10px 14px', color: '#fff' }}
                      />
                      <button
                        onClick={handleSalvarManutencao}
                        style={{ background: '#D32F2F', color: '#fff', border: 'none', borderRadius: '12px', padding: '12px', fontWeight: 800, cursor: 'pointer' }}
                      >
                        Salvar no Histórico
                      </button>
                    </>
                  )}
                </div>
              )}

              {/* Floating Bar */}
              <nav style={{
                position: 'absolute',
                bottom: '12px',
                left: '20px',
                right: '20px',
                background: 'rgba(24, 24, 24, 0.95)',
                backdropFilter: 'blur(12px)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '32px',
                height: '58px',
                display: 'flex',
                justifyContent: 'space-around',
                alignItems: 'center',
                boxShadow: '0 8px 30px rgba(0,0,0,0.7)',
                zIndex: 80
              }}>
                <button style={{ background: 'none', border: 'none', color: '#D32F2F', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '3px', fontSize: '0.68rem', fontWeight: 700 }}>
                  <Car size={18} /> Garagem
                </button>
                <button onClick={() => setModalTipo('abastecer')} style={{ background: 'none', border: 'none', color: 'rgba(255, 255, 255, 0.5)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '3px', fontSize: '0.68rem' }}>
                  <Fuel size={18} /> Abastecer
                </button>
                <button onClick={() => setModalTipo('manutencao')} style={{ background: 'none', border: 'none', color: 'rgba(255, 255, 255, 0.5)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '3px', fontSize: '0.68rem' }}>
                  <Wrench size={18} /> Oficina
                </button>
                <button onClick={() => alert('Mecânico Gemini: Diagnóstico 100% ativo via API do Backend!')} style={{ background: 'none', border: 'none', color: 'rgba(255, 255, 255, 0.5)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '3px', fontSize: '0.68rem' }}>
                  <Sparkles size={18} /> Gemini IA
                </button>
              </nav>
            </div>
          </div>
        </section>

        {/* Caixa de Feedback Híbrida */}
        <FeedbackSection appId="garagem" appName="Garagem App" corTema="#ff5252" />
      </main>
    </>
  );
};
