import React, { useState } from 'react';
import {
  Smartphone,
  Car,
  Fuel,
  Wrench,
  Sparkles,
  Eye,
  EyeOff,
  Wifi,
  BatteryCharging,
  Signal,
  X,
  ChevronLeft,
  ChevronRight,
  TrendingUp,
  Bot,
  Send,
  Plus,
  Settings,
  History,
  Layers,
  ArrowRight,
  CheckCircle2
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
  tipo: string;
  ano: string;
  placa: string;
  consumo: number;
  autonomia: number;
  custoKm: number;
  saldo: number;
}

export const GaragemPage: React.FC = () => {
  // Estado da Apresentação de Telas
  const [slideAtual, setSlideAtual] = useState<number>(0);

  // Estados do Simulador Mobile v2.0
  const [veiculoIndex, setVeiculoIndex] = useState<number>(0);
  const [ocultarSaldo, setOcultarSaldo] = useState<boolean>(false);
  const [mostrarHistorico, setMostrarHistorico] = useState<boolean>(false);
  const [abaHistorico, setAbaHistorico] = useState<'abastecer' | 'manutencao'>('abastecer');
  const [modalTipo, setModalTipo] = useState<'sheetAcoes' | 'abastecer' | 'manutencao' | 'gemini' | null>(null);

  // Inputs para inserção rápida
  const [litros, setLitros] = useState<string>('42.0');
  const [precoLitro, setPrecoLitro] = useState<string>('5.89');
  const [tipoCombustivel, setTipoCombustivel] = useState<string>('Gasolina');
  const [manutDesc, setManutDesc] = useState<string>('Troca Óleo Sintético 5W40 + Filtros');
  const [manutValor, setManutValor] = useState<string>('340.00');

  // Chat Gemini Mock
  const [chatInput, setChatInput] = useState<string>('');
  const [chatMsgs, setChatMsgs] = useState<Array<{ remetente: 'user' | 'ia'; texto: string }>>([
    { remetente: 'ia', texto: 'Olá! Sou o Mecânico Virtual Garagem IA. Descreva barulhos, sintomas no painel ou dúvidas de manutenção para um diagnóstico preliminar.' }
  ]);

  const [historicoAbast, setHistoricoAbast] = useState([
    { id: 1, data: '22/10/2026', litros: '41.2 L', desc: 'Posto Shell • R$ 5,79/L', valor: 'R$ 238,55', consumo: '13.9 km/L' },
    { id: 2, data: '08/10/2026', litros: '43.0 L', desc: 'Posto Ipiranga • R$ 5,85/L', valor: 'R$ 251,55', consumo: '13.4 km/L' }
  ]);

  const [historicoManut, setHistoricoManut] = useState([
    { id: 1, data: '15/10/2026', desc: 'Alinhamento & Balanceamento 3D', tags: ['Preventiva'], valor: 'R$ 140,00' },
    { id: 2, data: '02/09/2026', desc: 'Troca de Pastilhas Dianteiras Bosch', tags: ['Peças', 'Freios'], valor: 'R$ 280,00' }
  ]);

  const veiculos: Veiculo[] = [
    { nome: 'Golf TSI 1.4', sub: '48.250 km', tipo: 'CARRO', ano: '2021', placa: 'BRA·2E19', consumo: 13.8, autonomia: 690, custoKm: 0.42, saldo: 630.10 },
    { nome: 'Civic Touring', sub: '32.180 km', tipo: 'CARRO', ano: '2022', placa: 'JOH·7D26', consumo: 11.4, autonomia: 535, custoKm: 0.51, saldo: 420.00 },
    { nome: 'Yamaha MT-07', sub: '12.400 km', tipo: 'MOTO', ano: '2023', placa: 'DEV·9X44', consumo: 21.5, autonomia: 300, custoKm: 0.27, saldo: 180.50 }
  ];

  const veiculo = veiculos[veiculoIndex];

  const handleEnviarChat = () => {
    if (!chatInput.trim()) return;
    const msg = chatInput.trim();
    setChatMsgs((prev) => [...prev, { remetente: 'user', texto: msg }]);
    setChatInput('');
    setTimeout(() => {
      setChatMsgs((prev) => [
        ...prev,
        {
          remetente: 'ia',
          texto: `Diagnóstico inteligente: Verifiquei o sintoma relatado ("${msg}"). Para o ${veiculo.nome}, o comportamento indica desgaste normal de componentes de atrito ou calibração. Sugiro conferir a quilometragem recomendada no manual ou registrar uma inspeção preventiva!`
        }
      ]);
    }, 600);
  };

  const handleSalvarAbastecer = () => {
    if (!litros || !precoLitro) return;
    const total = (parseFloat(litros) * parseFloat(precoLitro)).toFixed(2).replace('.', ',');
    setHistoricoAbast([
      {
        id: Date.now(),
        data: 'Hoje',
        litros: `${litros} L`,
        desc: `${tipoCombustivel} • R$ ${precoLitro}/L`,
        valor: `R$ ${total}`,
        consumo: `${veiculo.consumo.toFixed(1)} km/L`
      },
      ...historicoAbast
    ]);
    setModalTipo(null);
  };

  const handleSalvarManutencao = () => {
    if (!manutDesc || !manutValor) return;
    setHistoricoManut([
      {
        id: Date.now(),
        data: 'Hoje',
        desc: manutDesc,
        tags: ['Preventiva'],
        valor: `R$ ${parseFloat(manutValor).toFixed(2).replace('.', ',')}`
      },
      ...historicoManut
    ]);
    setModalTipo(null);
  };

  // ============================================================
  // MOLDURA DO SMARTPHONE ANDROID SIMULADO (ESTILO V2.0)
  // ============================================================
  const molduraSmartphoneSimulado = (conteudo: React.ReactNode) => (
    <div style={{
      width: '100%',
      maxWidth: '290px',
      height: '475px',
      background: '#09090B',
      borderRadius: '34px',
      border: '7px solid #1F1F23',
      position: 'relative',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
      boxShadow: '0 16px 40px rgba(0,0,0,0.85), 0 0 25px rgba(225,29,72,0.22)',
      margin: '0 auto'
    }}>
      {/* Notch */}
      <div style={{
        position: 'absolute',
        top: '6px',
        left: '50%',
        transform: 'translateX(-50%)',
        width: '74px',
        height: '16px',
        background: '#000',
        borderRadius: '10px',
        zIndex: 100,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <div style={{ width: '6px', height: '6px', background: '#27272A', borderRadius: '50%' }}></div>
      </div>
      {/* Conteúdo da Tela */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        {conteudo}
      </div>
    </div>
  );

  // ============================================================
  // SLIDES DA APRESENTAÇÃO ATUALIZADOS PARA O DESIGN SYSTEM V2.0
  // ============================================================
  const slides: ScreenShotSlide[] = [
    {
      id: 'cockpit',
      titulo: 'DashboardGaragem.kt (Cockpit Bento v2.0)',
      subtitulo: 'Hero Card Bento Grid + Paleta Zinc/Crimson + Medidor Circular Vivo.',
      icone: Car,
      tag: 'NOVA UX V2.0',
      descricaoCurta: 'Completamente reformulado com inspiração em React, Tailwind e shadcn/ui. Traz a elegante paleta Zinc (950/900/800) com acento Crimson/Rose (#E11D48), Bento Grid e cards dinâmicos com cantos arredondados.',
      destaques: [
        'TopBar Cockpit com badge de versão v2.0 e status online',
        'Pills de seleção de frota com detecção de Carro e Moto',
        'Bento Hero com Placa Mercosul formatada e despesas protegidas',
        '3 Indicadores em Grid: Gauge circular de consumo, autonomia e custo/km'
      ],
      renderVisual: () => molduraSmartphoneSimulado(
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: '#09090B', color: '#FAFAFA' }}>
          {/* Header Cockpit */}
          <div style={{ background: 'linear-gradient(180deg, #1C0A10 0%, #09090B 100%)', padding: '22px 12px 8px', borderBottom: '1px solid #18181B' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.6rem', color: '#A1A1AA', marginBottom: '8px' }}>
              <span>19:40</span>
              <div style={{ display: 'flex', gap: '4px' }}><Wifi size={10} /><BatteryCharging size={10} /></div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{ position: 'relative' }}>
                  <img src="/assets/john-persona.jfif" alt="Avatar" style={{ width: '32px', height: '32px', borderRadius: '10px', border: '1.5px solid #E11D48', objectFit: 'cover' }} />
                  <span style={{ position: 'absolute', bottom: -1, right: -1, width: '7px', height: '7px', borderRadius: '50%', background: '#10B981', border: '1px solid #09090B' }}></span>
                </div>
                <div>
                  <div style={{ fontSize: '0.52rem', color: '#A1A1AA', letterSpacing: '0.8px', fontWeight: 700 }}>GARAGEM COCKPIT</div>
                  <div style={{ fontSize: '0.85rem', fontWeight: 800 }}>Olá, Jonathan</div>
                </div>
              </div>
              <span style={{ background: 'rgba(225,29,72,0.18)', color: '#F43F5E', fontSize: '0.55rem', fontWeight: 800, padding: '2px 6px', borderRadius: '999px', border: '1px solid rgba(225,29,72,0.35)' }}>v2.0</span>
            </div>

            {/* Pills de Frota */}
            <div style={{ display: 'flex', gap: '5px', marginTop: '10px' }}>
              <span style={{ background: 'rgba(225,29,72,0.2)', border: '1px solid #E11D48', color: '#FAFAFA', padding: '3px 8px', borderRadius: '8px', fontSize: '0.6rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '4px' }}>
                <Car size={10} color="#E11D48" /> Golf TSI
              </span>
              <span style={{ background: '#18181B', border: '1px solid #27272A', color: '#A1A1AA', padding: '3px 8px', borderRadius: '8px', fontSize: '0.6rem' }}>Civic</span>
              <span style={{ background: '#18181B', border: '1px solid #27272A', color: '#A1A1AA', padding: '3px 8px', borderRadius: '8px', fontSize: '0.6rem' }}>MT-07</span>
            </div>
          </div>

          {/* Bento Grid */}
          <div style={{ padding: '8px 10px', display: 'flex', flexDirection: 'column', gap: '8px', flex: 1, overflowY: 'hidden' }}>
            {/* Bento Hero Card */}
            <div style={{ background: 'linear-gradient(145deg, #1A1215 0%, #121215 100%)', borderRadius: '14px', border: '1px solid #27272A', padding: '10px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <div style={{ display: 'flex', gap: '4px', marginBottom: '2px' }}>
                    <span style={{ background: 'rgba(14,165,233,0.15)', color: '#38BDF8', fontSize: '0.5rem', fontWeight: 800, padding: '1px 5px', borderRadius: '999px' }}>CARRO</span>
                    <span style={{ background: '#27272A', color: '#A1A1AA', fontSize: '0.5rem', fontWeight: 600, padding: '1px 5px', borderRadius: '999px' }}>2021</span>
                  </div>
                  <div style={{ fontSize: '0.85rem', fontWeight: 900 }}>Golf TSI 1.4</div>
                  <div style={{ fontSize: '0.6rem', color: '#71717A' }}>48.250 km rodados</div>
                  {/* Placa Mercosul formatada */}
                  <div style={{ marginTop: '5px', background: '#fff', borderRadius: '4px', overflow: 'hidden', display: 'inline-block' }}>
                    <div style={{ background: '#003399', color: '#fff', fontSize: '0.35rem', fontWeight: 900, padding: '1px 6px', textAlign: 'center' }}>BRASIL</div>
                    <div style={{ color: '#09090B', fontSize: '0.72rem', fontWeight: 900, padding: '0 6px', fontFamily: 'Courier New' }}>BRA·2E19</div>
                  </div>
                </div>
                <div style={{ width: '38px', height: '38px', borderRadius: '10px', background: '#1F1F23', border: '1px solid #27272A', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Car size={18} color="#F43F5E" />
                </div>
              </div>

              {/* Box interno de gastos */}
              <div style={{ background: 'rgba(9,9,11,0.7)', borderRadius: '10px', padding: '6px 8px', marginTop: '8px', border: '1px solid #1F1F23', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ fontSize: '0.5rem', color: '#71717A', fontWeight: 700 }}>DESPESAS DO MÊS</div>
                  <div style={{ color: '#FAFAFA', fontSize: '0.95rem', fontWeight: 900 }}>R$ 630,10</div>
                </div>
                <span style={{ fontSize: '0.55rem', background: '#E11D48', color: '#fff', padding: '3px 7px', borderRadius: '6px', fontWeight: 700 }}>Timeline</span>
              </div>
            </div>

            {/* 3 Bento Indicadores */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '6px' }}>
              <div style={{ background: '#18181B', borderRadius: '10px', border: '1px solid #27272A', padding: '6px 4px', textAlign: 'center' }}>
                <span style={{ fontSize: '0.5rem', color: '#34D399', background: 'rgba(16,185,129,0.12)', padding: '1px 5px', borderRadius: '4px', fontWeight: 700 }}>Ótimo</span>
                <div style={{ fontSize: '0.82rem', fontWeight: 900, color: '#FAFAFA', marginTop: '2px' }}>13.8</div>
                <div style={{ fontSize: '0.48rem', color: '#71717A' }}>km/L</div>
              </div>
              <div style={{ background: '#18181B', borderRadius: '10px', border: '1px solid #27272A', padding: '6px 4px', textAlign: 'center' }}>
                <span style={{ fontSize: '0.5rem', color: '#38BDF8', background: 'rgba(14,165,233,0.12)', padding: '1px 5px', borderRadius: '4px', fontWeight: 700 }}>Tanque</span>
                <div style={{ fontSize: '0.82rem', fontWeight: 900, color: '#FAFAFA', marginTop: '2px' }}>690 km</div>
                <div style={{ fontSize: '0.48rem', color: '#71717A' }}>Autonomia</div>
              </div>
              <div style={{ background: '#18181B', borderRadius: '10px', border: '1px solid #27272A', padding: '6px 4px', textAlign: 'center' }}>
                <span style={{ fontSize: '0.5rem', color: '#FBBF24', background: 'rgba(245,158,11,0.12)', padding: '1px 5px', borderRadius: '4px', fontWeight: 700 }}>Média</span>
                <div style={{ fontSize: '0.82rem', fontWeight: 900, color: '#FAFAFA', marginTop: '2px' }}>R$ 0,42</div>
                <div style={{ fontSize: '0.48rem', color: '#71717A' }}>Custo/km</div>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'dock',
      titulo: 'Quick Action Dock & Command Sheet',
      subtitulo: 'Acesso instantâneo a Abastecimento, Manutenção e Finanças.',
      icone: Layers,
      tag: 'INTERAÇÃO RÁPIDA',
      descricaoCurta: 'O Quick Action Dock na home screen permite registrar entradas com um toque. O Command Sheet flutuante organiza opções com contadores em tempo real e atalhos otimizados para uso com uma mão.',
      destaques: [
        'Quick Action Tiles com ícones temáticos e contadores de registros',
        'ModalBottomSheet com visual shadcn e curvatura de 24dp',
        'Transição ágil entre telas sem bloqueio de thread',
        'Feedback tátil em cada ação de cadastro'
      ],
      renderVisual: () => molduraSmartphoneSimulado(
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: '#09090B', color: '#FAFAFA', padding: '22px 12px 10px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #1F1F23', paddingBottom: '8px' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 800 }}>Quick Action Dock</span>
            <span style={{ fontSize: '0.55rem', color: '#E11D48', background: 'rgba(225,29,72,0.12)', padding: '2px 6px', borderRadius: '6px', fontWeight: 700 }}>ATALHOS</span>
          </div>

          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '8px' }}>
            <div style={{ background: '#18181B', border: '1px solid #27272A', borderRadius: '12px', padding: '10px', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: 'rgba(245,158,11,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Fuel size={16} color="#FBBF24" />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: '0.75rem', fontWeight: 800 }}>Novo Abastecimento</div>
                <div style={{ fontSize: '0.58rem', color: '#71717A' }}>Litros, preço bomba e cálculo km/L</div>
              </div>
              <span style={{ fontSize: '0.55rem', color: '#FBBF24', fontWeight: 700 }}>+Add</span>
            </div>

            <div style={{ background: '#18181B', border: '1px solid #27272A', borderRadius: '12px', padding: '10px', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: 'rgba(14,165,233,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Wrench size={16} color="#38BDF8" />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: '0.75rem', fontWeight: 800 }}>Registrar Manutenção</div>
                <div style={{ fontSize: '0.58rem', color: '#71717A' }}>Óleo, pastilhas, pneus e notas fiscais</div>
              </div>
              <span style={{ fontSize: '0.55rem', color: '#38BDF8', fontWeight: 700 }}>+Add</span>
            </div>

            <div style={{ background: '#18181B', border: '1px solid #27272A', borderRadius: '12px', padding: '10px', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: 'rgba(16,185,129,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <TrendingUp size={16} color="#34D399" />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: '0.75rem', fontWeight: 800 }}>Painel de Finanças</div>
                <div style={{ fontSize: '0.58rem', color: '#71717A' }}>Gráficos Vico e custos por quilômetro</div>
              </div>
              <ArrowRight size={14} color="#71717A" />
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'abastecimento',
      titulo: 'TelaAdicionarAbastecimento.kt',
      subtitulo: 'Hero Display Cockpit + Leitura ML Kit de Bomba + Check-in GPS.',
      icone: Fuel,
      tag: 'ABASTECIMENTO INTELIGENTE',
      descricaoCurta: 'Projetada para rapidez na bomba do posto de gasolina. O usuário pode capturar os dados via OCR do ML Kit tirando foto da bomba, acionar check-in automático de endereço e conferir o total calculado instantaneamente.',
      destaques: [
        'Display Hero estilo velocímetro esportivo destacando o valor total pago',
        'Seletor em pílulas: Gasolina, Etanol, Diesel e GNV',
        'Cálculo bidirecional automático (Litros x Preço por Litro)',
        'Botão "Ler Bomba" via ML Kit Text Recognition'
      ],
      renderVisual: () => molduraSmartphoneSimulado(
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: '#09090B', color: '#FAFAFA', padding: '22px 12px 10px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #1F1F23', paddingBottom: '8px' }}>
            <span style={{ fontSize: '0.8rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Fuel size={14} color="#FBBF24" /> Abastecimento
            </span>
            <span style={{ fontSize: '0.55rem', border: '1px solid #27272A', padding: '2px 6px', borderRadius: '6px', color: '#E4E4E7' }}>Ler Bomba (OCR)</span>
          </div>

          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '8px' }}>
            {/* Display Hero do Valor */}
            <div style={{ background: 'linear-gradient(135deg, #221317 0%, #121215 100%)', borderRadius: '12px', border: '1px solid rgba(225,29,72,0.35)', padding: '12px', textAlign: 'center' }}>
              <div style={{ fontSize: '0.55rem', color: '#A1A1AA', fontWeight: 700 }}>VALOR TOTAL</div>
              <div style={{ fontSize: '1.45rem', fontWeight: 900, color: '#FAFAFA', margin: '2px 0' }}>R$ 247,38</div>
              <div style={{ fontSize: '0.6rem', color: '#34D399' }}>42.0 L • R$ 5,89/L</div>
            </div>

            {/* Tipos de combustível */}
            <div style={{ display: 'flex', gap: '4px' }}>
              <span style={{ flex: 1, textAlign: 'center', background: '#E11D48', color: '#fff', fontWeight: 800, padding: '4px 0', borderRadius: '6px', fontSize: '0.6rem' }}>Gasolina</span>
              <span style={{ flex: 1, textAlign: 'center', background: '#18181B', color: '#A1A1AA', padding: '4px 0', borderRadius: '6px', fontSize: '0.6rem' }}>Etanol</span>
              <span style={{ flex: 1, textAlign: 'center', background: '#18181B', color: '#A1A1AA', padding: '4px 0', borderRadius: '6px', fontSize: '0.6rem' }}>Diesel</span>
            </div>

            <div style={{ background: '#18181B', borderRadius: '8px', border: '1px solid #27272A', padding: '6px 8px', fontSize: '0.58rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ color: '#A1A1AA' }}>Tanque Cheio:</span>
              <strong style={{ color: '#34D399' }}>SIM (Gera Média de Consumo)</strong>
            </div>

            <button style={{ background: '#E11D48', color: '#fff', border: 'none', borderRadius: '10px', padding: '8px', fontWeight: 800, fontSize: '0.7rem' }}>
              Confirmar Abastecimento
            </button>
          </div>
        </div>
      )
    },
    {
      id: 'gemini',
      titulo: 'TelaGeminiChat.kt (Mecânico IA Virtual)',
      subtitulo: 'Assistente Generativo para Diagnóstico Automotivo e Barulhos.',
      icone: Bot,
      tag: 'INTELIGÊNCIA ARTIFICIAL',
      descricaoCurta: 'Comunicação direta com o Google Generative AI SDK (Gemini). O motorista pode anexar fotos do painel de instrumentos ou cupom fiscal e receber diagnósticos técnicos com linguagem clara e preventiva.',
      destaques: [
        'Streaming de respostas em tempo real com indicador de status',
        'Chips de perguntas frequentes ("Luz de injeção", "Barulho no freio")',
        'Inspeção multimodal: envio de foto da peça ou CRLV',
        'Orientações técnicas para evitar manutenções desnecessárias'
      ],
      renderVisual: () => molduraSmartphoneSimulado(
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: '#09090B', color: '#FAFAFA', padding: '22px 10px 8px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #1F1F23', paddingBottom: '6px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <div style={{ width: '22px', height: '22px', borderRadius: '6px', background: 'rgba(225,29,72,0.2)', border: '1px solid #E11D48', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Sparkles size={12} color="#F43F5E" />
              </div>
              <span style={{ fontSize: '0.75rem', fontWeight: 800 }}>Mecânico Virtual IA</span>
            </div>
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#10B981' }}></span>
          </div>

          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '6px', padding: '8px 0', overflowY: 'hidden' }}>
            <div style={{ alignSelf: 'flex-end', background: '#E11D48', padding: '5px 8px', borderRadius: '10px 10px 2px 10px', fontSize: '0.6rem', maxWidth: '85%' }}>
              Luz de pastilha acendeu no painel hoje...
            </div>
            <div style={{ alignSelf: 'flex-start', background: '#18181B', border: '1px solid #27272A', padding: '6px 8px', borderRadius: '10px 10px 10px 2px', fontSize: '0.58rem', lineHeight: 1.35, maxWidth: '92%', color: '#E4E4E7' }}>
              <strong style={{ color: '#F43F5E' }}>Diagnóstico Garagem:</strong><br />
              O sensor eletrônico de desgaste atingiu o limite de segurança das pastilhas. Troque em até 500 km para preservar os discos de freio!
            </div>
          </div>

          <div style={{ background: '#18181B', borderRadius: '8px', border: '1px solid #27272A', padding: '5px 8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '0.58rem', color: '#71717A' }}>Descreva o sintoma ou anexe foto...</span>
            <Send size={12} color="#E11D48" />
          </div>
        </div>
      )
    },
    {
      id: 'financas',
      titulo: 'TelaFinancas.kt & Analytics',
      subtitulo: 'Cockpit Financeiro com Split de Gastos e Módulos Reativos.',
      icone: TrendingUp,
      tag: 'ANALYTICS & RELATÓRIOS',
      descricaoCurta: 'Visão consolidada da saúde financeira do veículo. Cruza gastos acumulados, divisão entre combustível e peças de oficina, com cálculo do custo real de rodagem por quilômetro (R$/km).',
      destaques: [
        'Cockpit Analytics com total acumulado e split em 3 pilares',
        'Módulos de inteligência financeira: Visão Geral, Mensal e Consumo',
        'Filtros por veículo específico ou visualização consolidada global',
        'Gráficos nativos com a biblioteca Vico Charts'
      ],
      renderVisual: () => molduraSmartphoneSimulado(
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: '#09090B', color: '#FAFAFA', padding: '22px 10px 8px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #1F1F23', paddingBottom: '6px' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '6px' }}>
              <TrendingUp size={14} color="#34D399" /> Painel Financeiro
            </span>
            <span style={{ fontSize: '0.52rem', color: '#34D399', background: 'rgba(16,185,129,0.15)', padding: '1px 5px', borderRadius: '4px', fontWeight: 700 }}>Global</span>
          </div>

          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '8px 0' }}>
            {/* Hero Financeiro */}
            <div style={{ background: 'linear-gradient(145deg, #1A1215 0%, #121215 100%)', borderRadius: '10px', border: '1px solid #27272A', padding: '8px' }}>
              <div style={{ fontSize: '0.5rem', color: '#71717A', fontWeight: 700 }}>TOTAL ACUMULADO</div>
              <div style={{ fontSize: '1.25rem', fontWeight: 900, color: '#FAFAFA' }}>R$ 1.250,10</div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '4px', fontSize: '0.55rem', borderTop: '1px solid #27272A', paddingTop: '4px' }}>
                <span style={{ color: '#FBBF24' }}>Combustível: R$ 830</span>
                <span style={{ color: '#F43F5E' }}>Oficina: R$ 420</span>
              </div>
            </div>

            {/* Módulos do Hub */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <div style={{ background: '#18181B', borderRadius: '6px', border: '1px solid #27272A', padding: '6px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ fontSize: '0.6rem', fontWeight: 700 }}>Visão Geral (Pizza)</span>
                <ArrowRight size={10} color="#71717A" />
              </div>
              <div style={{ background: '#18181B', borderRadius: '6px', border: '1px solid #27272A', padding: '6px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ fontSize: '0.6rem', fontWeight: 700 }}>Gastos Mensais (Evolução)</span>
                <ArrowRight size={10} color="#71717A" />
              </div>
              <div style={{ background: '#18181B', borderRadius: '6px', border: '1px solid #27272A', padding: '6px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ fontSize: '0.6rem', fontWeight: 700 }}>Análise de Consumo (km/L)</span>
                <ArrowRight size={10} color="#71717A" />
              </div>
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
        <div className="badge-categoria" style={{ background: 'rgba(225, 29, 72, 0.15)', color: '#F43F5E', borderColor: 'rgba(225, 29, 72, 0.35)' }}>
          <Smartphone size={16} /> GaragemApp v2.0 • Jetpack Compose & Material 3
        </div>
        <h1>Garagem App</h1>
        <p>Acelerando a gestão automotiva com a nova identidade visual Zinc/Crimson, arquitetura reativa MVVM, banco Room v14 e inteligência artificial via Google Gemini.</p>
      </header>

      <main className="conteudo-container">
        {/* Destaque da Reformulação */}
        <section style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '30px',
          marginBottom: '50px',
          alignItems: 'center'
        }}>
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'rgba(225,29,72,0.12)', border: '1px solid rgba(225,29,72,0.3)', padding: '4px 10px', borderRadius: '999px', fontSize: '0.78rem', color: '#F43F5E', fontWeight: 700, marginBottom: '10px' }}>
              <CheckCircle2 size={14} /> NOVO DESIGN SYSTEM v2.0
            </div>
            <h2 style={{ fontSize: '1.8rem', marginBottom: '14px' }}>UX Reformulada: Do Visual ao Desempenho</h2>
            <p style={{ color: 'var(--texto-suave)', marginBottom: '14px', fontSize: '1.02rem' }}>
              O GaragemApp recebeu uma reformulação completa de experiência do usuário inspirada no ecossistema moderno <strong>React, Tailwind CSS e shadcn/ui</strong>. A interface migrou para uma paleta profunda e esportiva de <strong>Zinc 950/900/800</strong> com realces <strong>Crimson / Rose (<code>#E11D48</code>)</strong>.
            </p>
            <p style={{ color: 'var(--texto-suave)', fontSize: '1.02rem' }}>
              O painel principal agora opera no formato <strong>Bento Grid</strong>, integrando cards inteligentes com Placa Mercosul formatada, Quick Action Dock para cadastros em um toque e a nova <strong>Floating Navigation Bar</strong> com botão central de comando para o Mecânico IA.
            </p>
          </div>

          <div style={{ background: '#09090B', border: '1px solid #27272A', borderRadius: 'var(--radius)', padding: '26px' }}>
            <h4 style={{ color: '#F43F5E', marginBottom: '12px', fontSize: '1.1rem' }}>Evoluções da Versão 2.0:</h4>
            <ul className="recursos-lista" style={{ marginBottom: 0 }}>
              <li><strong>Design Bento Grid:</strong> Informações hierarquizadas com alta legibilidade</li>
              <li><strong>Quick Action Dock:</strong> Adição instantânea de combustível e manutenções</li>
              <li><strong>Floating Navigation Bar:</strong> 5 pontos de acesso rápido com backdrop blur</li>
              <li><strong>Mecânico IA (Gemini):</strong> Diagnóstico por áudio, texto e fotos do painel/peça</li>
              <li><strong>Timeline com Segmented Control:</strong> Alternância suave entre abastecimentos e revisões</li>
            </ul>
          </div>
        </section>

        {/* ============================================================
            APRESENTAÇÃO DAS TELAS DO GARAGEM APP (CARROSSEL COM MOCK FIEL)
            ============================================================ */}
        <section style={{ marginBottom: '60px' }}>
          <div className="secao-titulo" style={{ textAlign: 'left', marginBottom: '24px' }}>
            <span className="sub-rotulo" style={{ color: '#F43F5E' }}>APRESENTAÇÃO TÉCNICA DAS TELAS</span>
            <h2 style={{ fontSize: '1.8rem' }}>Nova Identidade Visual em Ação</h2>
            <p style={{ color: 'var(--texto-suave)' }}>
              Navegue pelos slides abaixo para conferir a reprodução exata das telas nativas do GaragemApp em Jetpack Compose com a paleta Zinc & Crimson:
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
                    background: ativo ? 'linear-gradient(90deg, #E11D48, #BE123C)' : '#18181B',
                    color: ativo ? '#ffffff' : '#A1A1AA',
                    border: ativo ? 'none' : '1px solid #27272A',
                    boxShadow: ativo ? '0 0 20px rgba(225, 29, 72, 0.4)' : 'none',
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
            background: 'linear-gradient(160deg, #101014, #09090B)',
            border: '1px solid #27272A',
            borderRadius: 'var(--radius)',
            padding: '30px',
            boxShadow: '0 10px 30px rgba(0,0,0,0.5)'
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
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '16px', maxWidth: '290px', margin: '16px auto 0' }}>
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
                    style={{ padding: '8px 16px', fontSize: '0.85rem', background: 'linear-gradient(90deg, #E11D48, #BE123C)', color: '#fff' }}
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
                  background: 'rgba(225, 29, 72, 0.15)',
                  color: '#F43F5E',
                  fontSize: '0.75rem',
                  fontWeight: 800,
                  padding: '4px 12px',
                  borderRadius: '999px',
                  marginBottom: '12px',
                  letterSpacing: '1px',
                  border: '1px solid rgba(225, 29, 72, 0.3)'
                }}>
                  <IconeAtual size={14} /> {atual.tag}
                </div>

                <h3 style={{ fontSize: '1.7rem', color: '#fff', marginBottom: '8px' }}>
                  {atual.titulo}
                </h3>

                <p style={{ color: '#F43F5E', fontSize: '0.95rem', fontWeight: 600, marginBottom: '14px' }}>
                  {atual.subtitulo}
                </p>

                <p style={{ color: 'var(--texto-suave)', fontSize: '1rem', lineHeight: 1.7, marginBottom: '20px' }}>
                  {atual.descricaoCurta}
                </p>

                <div style={{ borderTop: '1px solid #27272A', paddingTop: '16px' }}>
                  <span style={{ fontSize: '0.8rem', fontWeight: 800, color: '#fff', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                    Destaques da Implementação:
                  </span>
                  <ul style={{ listStyle: 'none', marginTop: '10px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {atual.destaques.map((d, i) => (
                      <li key={i} style={{ fontSize: '0.9rem', color: 'var(--texto-suave)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#E11D48' }}></span>
                        {d}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================
            DEMO INTERATIVA COMPLETA: SIMULADOR DO GARAGEM APP V2.0
            ============================================================ */}
        <section>
          <div className="secao-titulo" style={{ textAlign: 'left', marginBottom: '20px' }}>
            <span className="sub-rotulo" style={{ color: '#F43F5E' }}>EXPERIMENTE AO VIVO NO SMARTPHONE</span>
            <h2 style={{ fontSize: '1.8rem' }}>Simulador Interativo da Nova Interface</h2>
            <p style={{ color: 'var(--texto-suave)' }}>
              Interaja com o aparelho abaixo: troque de veículo, alterne o saldo, abra o chat com o mecânico IA, acione o Quick Action Dock ou adicione combustível!
            </p>
          </div>

          <div style={{ display: 'flex', justifyContent: 'center', padding: '10px 0', width: '100%' }}>
            <div style={{
              width: '100%',
              maxWidth: '360px',
              height: '750px',
              background: '#09090B',
              borderRadius: '42px',
              border: '8px solid #1F1F23',
              boxShadow: '0 24px 70px rgba(0, 0, 0, 0.9), 0 0 35px rgba(225, 29, 72, 0.25)',
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
                <div style={{ width: '8px', height: '8px', background: '#27272A', borderRadius: '50%' }}></div>
              </div>

              {/* Topbar Cockpit v2.0 */}
              <div style={{
                background: 'linear-gradient(180deg, #1C0A10 0%, #09090B 100%)',
                padding: '34px 16px 12px',
                borderBottom: '1px solid #18181B'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem', color: '#A1A1AA', marginBottom: '10px' }}>
                  <span>19:45</span>
                  <div style={{ display: 'flex', gap: '6px' }}>
                    <Wifi size={12} />
                    <Signal size={12} />
                    <BatteryCharging size={12} />
                  </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{ position: 'relative' }}>
                      <img src="/assets/john-persona.jfif" alt="Avatar" style={{ width: '42px', height: '42px', borderRadius: '13px', border: '1.5px solid #E11D48', objectFit: 'cover' }} />
                      <span style={{ position: 'absolute', bottom: -1, right: -1, width: '9px', height: '9px', borderRadius: '50%', background: '#10B981', border: '2px solid #09090B' }}></span>
                    </div>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                        <span style={{ fontSize: '0.62rem', color: '#A1A1AA', letterSpacing: '1px', fontWeight: 800 }}>GARAGEM COCKPIT</span>
                        <span style={{ background: 'rgba(225,29,72,0.18)', color: '#F43F5E', fontSize: '0.52rem', fontWeight: 800, padding: '1px 5px', borderRadius: '999px' }}>v2.0</span>
                      </div>
                      <div style={{ fontSize: '1.05rem', fontWeight: 800, color: '#FAFAFA' }}>Olá, Jonathan</div>
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '6px' }}>
                    <button
                      onClick={() => setModalTipo('sheetAcoes')}
                      style={{ width: '34px', height: '34px', borderRadius: '10px', background: '#18181B', border: '1px solid #27272A', color: '#F43F5E', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
                    >
                      <Plus size={18} />
                    </button>
                    <button
                      onClick={() => alert('Configurações: Preferências de sistema, biometria e sincronização em nuvem')}
                      style={{ width: '34px', height: '34px', borderRadius: '10px', background: '#18181B', border: '1px solid #27272A', color: '#A1A1AA', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
                    >
                      <Settings size={16} />
                    </button>
                  </div>
                </div>

                {/* Seletor de Veículos (Pill Tabs) */}
                <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', padding: '12px 0 2px' }}>
                  {veiculos.map((v, i) => (
                    <button
                      key={v.nome}
                      onClick={() => setVeiculoIndex(i)}
                      style={{
                        padding: '6px 12px',
                        borderRadius: '12px',
                        fontSize: '0.74rem',
                        fontWeight: veiculoIndex === i ? 700 : 500,
                        cursor: 'pointer',
                        whiteSpace: 'nowrap',
                        background: veiculoIndex === i ? 'rgba(225,29,72,0.18)' : '#18181B',
                        color: veiculoIndex === i ? '#FAFAFA' : '#A1A1AA',
                        border: veiculoIndex === i ? '1px solid #E11D48' : '1px solid #27272A',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '5px'
                      }}
                    >
                      <Car size={13} color={veiculoIndex === i ? '#E11D48' : '#71717A'} />
                      {v.nome}
                    </button>
                  ))}
                </div>
              </div>

              {/* Corpo do App no Smartphone */}
              <div style={{ flex: 1, overflowY: 'auto', padding: '12px 14px 85px', background: '#09090B', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {/* 1. Bento Hero Card */}
                <div style={{
                  background: 'linear-gradient(145deg, #221317 0%, #18181B 50%, #121215 100%)',
                  borderRadius: '20px',
                  border: '1px solid #27272A',
                  padding: '16px'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                    <div>
                      <div style={{ display: 'flex', gap: '5px', marginBottom: '4px' }}>
                        <span style={{ background: 'rgba(14,165,233,0.18)', color: '#38BDF8', fontSize: '0.55rem', fontWeight: 800, padding: '2px 6px', borderRadius: '999px' }}>{veiculo.tipo}</span>
                        <span style={{ background: '#27272A', color: '#D4D4D8', fontSize: '0.55rem', fontWeight: 600, padding: '2px 6px', borderRadius: '999px' }}>{veiculo.ano}</span>
                      </div>
                      <div style={{ fontSize: '1.25rem', fontWeight: 900, color: '#FAFAFA' }}>{veiculo.nome}</div>
                      <div style={{ fontSize: '0.75rem', color: '#A1A1AA' }}>{veiculo.sub} rodados</div>

                      {/* Placa Mercosul Autêntica */}
                      <div style={{ marginTop: '8px', background: '#fff', borderRadius: '5px', overflow: 'hidden', display: 'inline-block', textAlign: 'center' }}>
                        <div style={{ background: '#003399', color: '#fff', fontSize: '0.42rem', fontWeight: 900, padding: '1px 8px', letterSpacing: '1px' }}>BRASIL</div>
                        <div style={{ color: '#09090B', fontSize: '0.92rem', fontWeight: 900, padding: '0 8px', letterSpacing: '1.5px', fontFamily: 'Courier New' }}>{veiculo.placa}</div>
                      </div>
                    </div>

                    <div style={{ width: '56px', height: '56px', borderRadius: '14px', background: '#18181B', border: '1px solid #27272A', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Car size={26} color="#F43F5E" />
                    </div>
                  </div>

                  {/* Box interno de gastos do mês */}
                  <div style={{
                    background: 'rgba(9, 9, 11, 0.75)',
                    borderRadius: '14px',
                    border: '1px solid #27272A',
                    padding: '10px 12px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}>
                    <div>
                      <div style={{ fontSize: '0.62rem', color: '#A1A1AA', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '5px' }}>
                        <span>DESPESAS DO MÊS</span>
                        <span onClick={() => setOcultarSaldo(!ocultarSaldo)} style={{ cursor: 'pointer' }}>
                          {ocultarSaldo ? <EyeOff size={12} /> : <Eye size={12} />}
                        </span>
                      </div>
                      <div style={{ color: '#FAFAFA', fontSize: '1.2rem', fontWeight: 900 }}>
                        {ocultarSaldo ? 'R$ •••••' : `R$ ${veiculo.saldo.toFixed(2).replace('.', ',')}`}
                      </div>
                    </div>

                    <button
                      onClick={() => setMostrarHistorico(!mostrarHistorico)}
                      style={{
                        background: mostrarHistorico ? '#E11D48' : '#27272A',
                        color: '#FAFAFA',
                        border: 'none',
                        borderRadius: '9px',
                        padding: '6px 10px',
                        fontSize: '0.68rem',
                        fontWeight: 700,
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px'
                      }}
                    >
                      <History size={12} /> {mostrarHistorico ? 'Ocultar' : 'Histórico'}
                    </button>
                  </div>
                </div>

                {/* 2. Bento Grid de Indicadores Vivos */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '8px' }}>
                  <div style={{ background: '#18181B', border: '1px solid #27272A', borderRadius: '14px', padding: '10px 4px', textAlign: 'center' }}>
                    <span style={{ fontSize: '0.55rem', color: '#34D399', background: 'rgba(16,185,129,0.12)', padding: '2px 6px', borderRadius: '4px', fontWeight: 700 }}>Ótimo</span>
                    <div style={{ fontSize: '1.05rem', fontWeight: 900, color: '#FAFAFA', marginTop: '4px' }}>{veiculo.consumo.toFixed(1)}</div>
                    <div style={{ fontSize: '0.58rem', color: '#71717A' }}>km/L médio</div>
                  </div>

                  <div style={{ background: '#18181B', border: '1px solid #27272A', borderRadius: '14px', padding: '10px 4px', textAlign: 'center' }}>
                    <span style={{ fontSize: '0.55rem', color: '#38BDF8', background: 'rgba(14,165,233,0.12)', padding: '2px 6px', borderRadius: '4px', fontWeight: 700 }}>Tanque</span>
                    <div style={{ fontSize: '1.05rem', fontWeight: 900, color: '#FAFAFA', marginTop: '4px' }}>{veiculo.autonomia} km</div>
                    <div style={{ fontSize: '0.58rem', color: '#71717A' }}>Autonomia</div>
                  </div>

                  <div style={{ background: '#18181B', border: '1px solid #27272A', borderRadius: '14px', padding: '10px 4px', textAlign: 'center' }}>
                    <span style={{ fontSize: '0.55rem', color: '#FBBF24', background: 'rgba(245,158,11,0.12)', padding: '2px 6px', borderRadius: '4px', fontWeight: 700 }}>Média</span>
                    <div style={{ fontSize: '1.05rem', fontWeight: 900, color: '#FAFAFA', marginTop: '4px' }}>R$ {veiculo.custoKm.toFixed(2)}</div>
                    <div style={{ fontSize: '0.58rem', color: '#71717A' }}>Custo/km</div>
                  </div>
                </div>

                {/* 3. React Quick Action Dock */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '8px' }}>
                  <button
                    onClick={() => setModalTipo('abastecer')}
                    style={{
                      background: '#18181B',
                      border: '1px solid #27272A',
                      borderRadius: '14px',
                      padding: '10px 6px',
                      cursor: 'pointer',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'flex-start',
                      gap: '4px'
                    }}
                  >
                    <div style={{ width: '26px', height: '26px', borderRadius: '8px', background: 'rgba(245,158,11,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Fuel size={14} color="#FBBF24" />
                    </div>
                    <span style={{ fontSize: '0.74rem', fontWeight: 800, color: '#FAFAFA' }}>Abastecer</span>
                    <span style={{ fontSize: '0.55rem', color: '#71717A' }}>{historicoAbast.length} registros</span>
                  </button>

                  <button
                    onClick={() => setModalTipo('manutencao')}
                    style={{
                      background: '#18181B',
                      border: '1px solid #27272A',
                      borderRadius: '14px',
                      padding: '10px 6px',
                      cursor: 'pointer',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'flex-start',
                      gap: '4px'
                    }}
                  >
                    <div style={{ width: '26px', height: '26px', borderRadius: '8px', background: 'rgba(14,165,233,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Wrench size={14} color="#38BDF8" />
                    </div>
                    <span style={{ fontSize: '0.74rem', fontWeight: 800, color: '#FAFAFA' }}>Oficina</span>
                    <span style={{ fontSize: '0.55rem', color: '#71717A' }}>{historicoManut.length} serviços</span>
                  </button>

                  <button
                    onClick={() => setModalTipo('gemini')}
                    style={{
                      background: '#18181B',
                      border: '1px solid #27272A',
                      borderRadius: '14px',
                      padding: '10px 6px',
                      cursor: 'pointer',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'flex-start',
                      gap: '4px'
                    }}
                  >
                    <div style={{ width: '26px', height: '26px', borderRadius: '8px', background: 'rgba(225,29,72,0.18)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Sparkles size={14} color="#F43F5E" />
                    </div>
                    <span style={{ fontSize: '0.74rem', fontWeight: 800, color: '#FAFAFA' }}>Gemini IA</span>
                    <span style={{ fontSize: '0.55rem', color: '#71717A' }}>Mecânico</span>
                  </button>
                </div>

                {/* 4. Timeline Expansível com Segmented Control */}
                {mostrarHistorico && (
                  <div style={{ background: '#121215', borderRadius: '16px', border: '1px solid #27272A', padding: '12px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                      <span style={{ fontSize: '0.68rem', fontWeight: 800, color: '#A1A1AA', letterSpacing: '0.5px' }}>LINHA DO TEMPO</span>
                      <span style={{ fontSize: '0.6rem', color: '#71717A' }}>Toque para ver</span>
                    </div>

                    {/* Segmented Control */}
                    <div style={{ display: 'flex', background: '#09090B', padding: '3px', borderRadius: '10px', border: '1px solid #27272A', marginBottom: '10px' }}>
                      <button
                        onClick={() => setAbaHistorico('abastecer')}
                        style={{
                          flex: 1,
                          padding: '6px',
                          borderRadius: '8px',
                          fontSize: '0.68rem',
                          fontWeight: abaHistorico === 'abastecer' ? 700 : 500,
                          background: abaHistorico === 'abastecer' ? '#27272A' : 'transparent',
                          color: abaHistorico === 'abastecer' ? '#FAFAFA' : '#71717A',
                          border: 'none',
                          cursor: 'pointer'
                        }}
                      >
                        Abastecimentos ({historicoAbast.length})
                      </button>
                      <button
                        onClick={() => setAbaHistorico('manutencao')}
                        style={{
                          flex: 1,
                          padding: '6px',
                          borderRadius: '8px',
                          fontSize: '0.68rem',
                          fontWeight: abaHistorico === 'manutencao' ? 700 : 500,
                          background: abaHistorico === 'manutencao' ? '#27272A' : 'transparent',
                          color: abaHistorico === 'manutencao' ? '#FAFAFA' : '#71717A',
                          border: 'none',
                          cursor: 'pointer'
                        }}
                      >
                        Manutenções ({historicoManut.length})
                      </button>
                    </div>

                    {/* Lista do Histórico */}
                    {abaHistorico === 'abastecer' ? (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                        {historicoAbast.map((item) => (
                          <div key={item.id} style={{ background: '#18181B', borderRadius: '10px', border: '1px solid #27272A', padding: '8px 10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div>
                              <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#FAFAFA' }}>{item.litros} • {item.desc}</div>
                              <div style={{ fontSize: '0.6rem', color: '#71717A' }}>{item.data} • {item.consumo}</div>
                            </div>
                            <span style={{ fontSize: '0.8rem', fontWeight: 800, color: '#FBBF24' }}>{item.valor}</span>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                        {historicoManut.map((item) => (
                          <div key={item.id} style={{ background: '#18181B', borderRadius: '10px', border: '1px solid #27272A', padding: '8px 10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div>
                              <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#FAFAFA' }}>{item.desc}</div>
                              <div style={{ fontSize: '0.6rem', color: '#71717A' }}>{item.data} • {item.tags.join(', ')}</div>
                            </div>
                            <span style={{ fontSize: '0.8rem', fontWeight: 800, color: '#F43F5E' }}>{item.valor}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* MODAL BOTTOMSHEET: NOVO ABASTECIMENTO */}
              {modalTipo === 'abastecer' && (
                <div style={{
                  position: 'absolute',
                  left: 0,
                  right: 0,
                  bottom: 0,
                  background: '#18181B',
                  borderTopLeftRadius: '24px',
                  borderTopRightRadius: '24px',
                  borderTop: '2px solid #E11D48',
                  padding: '18px 16px 26px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '10px',
                  zIndex: 90,
                  boxShadow: '0 -10px 40px rgba(0,0,0,0.8)'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h4 style={{ color: '#FAFAFA', fontSize: '0.95rem', margin: 0, display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <Fuel size={16} color="#FBBF24" /> Novo Abastecimento
                    </h4>
                    <X size={18} color="#71717A" style={{ cursor: 'pointer' }} onClick={() => setModalTipo(null)} />
                  </div>

                  <div style={{ display: 'flex', gap: '6px' }}>
                    {['Gasolina', 'Etanol', 'Diesel'].map((t) => (
                      <button
                        key={t}
                        onClick={() => setTipoCombustivel(t)}
                        style={{
                          flex: 1,
                          padding: '6px 0',
                          borderRadius: '8px',
                          border: tipoCombustivel === t ? '1px solid #E11D48' : '1px solid #27272A',
                          background: tipoCombustivel === t ? '#E11D48' : '#09090B',
                          color: '#FAFAFA',
                          fontSize: '0.68rem',
                          fontWeight: 700,
                          cursor: 'pointer'
                        }}
                      >
                        {t}
                      </button>
                    ))}
                  </div>

                  <input
                    type="number"
                    value={litros}
                    onChange={(e) => setLitros(e.target.value)}
                    placeholder="Litros (ex: 42.0)"
                    style={{ background: '#09090B', border: '1px solid #27272A', borderRadius: '10px', padding: '10px', color: '#fff', fontSize: '0.8rem' }}
                  />

                  <input
                    type="number"
                    value={precoLitro}
                    onChange={(e) => setPrecoLitro(e.target.value)}
                    placeholder="Preço/Litro R$"
                    style={{ background: '#09090B', border: '1px solid #27272A', borderRadius: '10px', padding: '10px', color: '#fff', fontSize: '0.8rem' }}
                  />

                  <button
                    onClick={handleSalvarAbastecer}
                    style={{ background: '#E11D48', color: '#fff', border: 'none', borderRadius: '10px', padding: '11px', fontWeight: 800, cursor: 'pointer', fontSize: '0.8rem' }}
                  >
                    Confirmar Abastecimento
                  </button>
                </div>
              )}

              {/* MODAL BOTTOMSHEET: NOVA MANUTENÇÃO */}
              {modalTipo === 'manutencao' && (
                <div style={{
                  position: 'absolute',
                  left: 0,
                  right: 0,
                  bottom: 0,
                  background: '#18181B',
                  borderTopLeftRadius: '24px',
                  borderTopRightRadius: '24px',
                  borderTop: '2px solid #38BDF8',
                  padding: '18px 16px 26px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '10px',
                  zIndex: 90,
                  boxShadow: '0 -10px 40px rgba(0,0,0,0.8)'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h4 style={{ color: '#FAFAFA', fontSize: '0.95rem', margin: 0, display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <Wrench size={16} color="#38BDF8" /> Registrar Manutenção
                    </h4>
                    <X size={18} color="#71717A" style={{ cursor: 'pointer' }} onClick={() => setModalTipo(null)} />
                  </div>

                  <input
                    type="text"
                    value={manutDesc}
                    onChange={(e) => setManutDesc(e.target.value)}
                    placeholder="Serviço ou Peça"
                    style={{ background: '#09090B', border: '1px solid #27272A', borderRadius: '10px', padding: '10px', color: '#fff', fontSize: '0.8rem' }}
                  />

                  <input
                    type="number"
                    value={manutValor}
                    onChange={(e) => setManutValor(e.target.value)}
                    placeholder="Valor Total R$"
                    style={{ background: '#09090B', border: '1px solid #27272A', borderRadius: '10px', padding: '10px', color: '#fff', fontSize: '0.8rem' }}
                  />

                  <button
                    onClick={handleSalvarManutencao}
                    style={{ background: '#38BDF8', color: '#09090B', border: 'none', borderRadius: '10px', padding: '11px', fontWeight: 800, cursor: 'pointer', fontSize: '0.8rem' }}
                  >
                    Salvar na Garagem
                  </button>
                </div>
              )}

              {/* MODAL CHAT GEMINI IA */}
              {modalTipo === 'gemini' && (
                <div style={{
                  position: 'absolute',
                  left: 0,
                  right: 0,
                  bottom: 0,
                  top: '120px',
                  background: '#09090B',
                  borderTopLeftRadius: '24px',
                  borderTopRightRadius: '24px',
                  borderTop: '2px solid #E11D48',
                  padding: '16px',
                  display: 'flex',
                  flexDirection: 'column',
                  zIndex: 95,
                  boxShadow: '0 -10px 40px rgba(0,0,0,0.85)'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #1F1F23', paddingBottom: '8px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <div style={{ width: '28px', height: '28px', borderRadius: '8px', background: 'rgba(225,29,72,0.2)', border: '1px solid #E11D48', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Sparkles size={14} color="#F43F5E" />
                      </div>
                      <div>
                        <div style={{ fontSize: '0.8rem', fontWeight: 800, color: '#FAFAFA' }}>Mecânico Virtual IA</div>
                        <div style={{ fontSize: '0.55rem', color: '#10B981' }}>● Online via Gemini SDK</div>
                      </div>
                    </div>
                    <X size={18} color="#71717A" style={{ cursor: 'pointer' }} onClick={() => setModalTipo(null)} />
                  </div>

                  <div style={{ flex: 1, overflowY: 'auto', padding: '10px 0', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {chatMsgs.map((m, idx) => (
                      <div
                        key={idx}
                        style={{
                          alignSelf: m.remetente === 'user' ? 'flex-end' : 'flex-start',
                          background: m.remetente === 'user' ? '#E11D48' : '#18181B',
                          color: '#FAFAFA',
                          border: m.remetente === 'user' ? 'none' : '1px solid #27272A',
                          padding: '8px 10px',
                          borderRadius: m.remetente === 'user' ? '12px 12px 2px 12px' : '12px 12px 12px 2px',
                          fontSize: '0.68rem',
                          lineHeight: 1.4,
                          maxWidth: '88%'
                        }}
                      >
                        {m.texto}
                      </div>
                    ))}
                  </div>

                  <div style={{ display: 'flex', gap: '6px', paddingTop: '8px', borderTop: '1px solid #1F1F23' }}>
                    <input
                      type="text"
                      value={chatInput}
                      onChange={(e) => setChatInput(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleEnviarChat()}
                      placeholder="Descreva o barulho ou dúvida..."
                      style={{ flex: 1, background: '#18181B', border: '1px solid #27272A', borderRadius: '10px', padding: '8px 10px', color: '#fff', fontSize: '0.72rem' }}
                    />
                    <button
                      onClick={handleEnviarChat}
                      style={{ background: '#E11D48', color: '#fff', border: 'none', borderRadius: '10px', padding: '8px 12px', cursor: 'pointer' }}
                    >
                      <Send size={14} />
                    </button>
                  </div>
                </div>
              )}

              {/* MODAL SHEET DE AÇÕES RÁPIDAS (COMMAND SHEET) */}
              {modalTipo === 'sheetAcoes' && (
                <div style={{
                  position: 'absolute',
                  left: 0,
                  right: 0,
                  bottom: 0,
                  background: '#18181B',
                  borderTopLeftRadius: '24px',
                  borderTopRightRadius: '24px',
                  borderTop: '2px solid #E11D48',
                  padding: '18px 16px 26px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '10px',
                  zIndex: 90
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h4 style={{ color: '#FAFAFA', fontSize: '0.95rem', margin: 0 }}>Ações Rápidas</h4>
                    <X size={18} color="#71717A" style={{ cursor: 'pointer' }} onClick={() => setModalTipo(null)} />
                  </div>

                  <div
                    onClick={() => setModalTipo('abastecer')}
                    style={{ background: '#09090B', border: '1px solid #27272A', borderRadius: '12px', padding: '10px', display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}
                  >
                    <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: 'rgba(245,158,11,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Fuel size={16} color="#FBBF24" />
                    </div>
                    <div>
                      <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#FAFAFA' }}>Novo Abastecimento</div>
                      <div style={{ fontSize: '0.58rem', color: '#71717A' }}>Litros, leitura da bomba e média km/L</div>
                    </div>
                  </div>

                  <div
                    onClick={() => setModalTipo('manutencao')}
                    style={{ background: '#09090B', border: '1px solid #27272A', borderRadius: '12px', padding: '10px', display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}
                  >
                    <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: 'rgba(14,165,233,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Wrench size={16} color="#38BDF8" />
                    </div>
                    <div>
                      <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#FAFAFA' }}>Nova Manutenção</div>
                      <div style={{ fontSize: '0.58rem', color: '#71717A' }}>Óleo, pneus, pastilhas e cupons fiscais</div>
                    </div>
                  </div>

                  <div
                    onClick={() => setModalTipo('gemini')}
                    style={{ background: '#09090B', border: '1px solid #27272A', borderRadius: '12px', padding: '10px', display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}
                  >
                    <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: 'rgba(225,29,72,0.18)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Sparkles size={16} color="#F43F5E" />
                    </div>
                    <div>
                      <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#FAFAFA' }}>Consultar Mecânico IA</div>
                      <div style={{ fontSize: '0.58rem', color: '#71717A' }}>Diagnóstico inteligente com Google Gemini</div>
                    </div>
                  </div>
                </div>
              )}

              {/* 5. Floating Navigation Bar (Estilo v2.0 - 5 Ações com Botão Central) */}
              <nav style={{
                position: 'absolute',
                bottom: '10px',
                left: '16px',
                right: '16px',
                background: 'rgba(24, 24, 27, 0.95)',
                backdropFilter: 'blur(16px)',
                border: '1px solid #27272A',
                borderRadius: '24px',
                height: '56px',
                display: 'flex',
                justifyContent: 'space-around',
                alignItems: 'center',
                boxShadow: '0 10px 30px rgba(0,0,0,0.85)',
                zIndex: 80
              }}>
                <button
                  style={{ background: 'none', border: 'none', color: '#E11D48', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2px', fontSize: '0.62rem', fontWeight: 700, cursor: 'pointer' }}
                >
                  <Car size={18} /> Garagem
                </button>

                <button
                  onClick={() => alert('Finanças: Gráficos de despesas por mês e cálculo de custo por km rodado')}
                  style={{ background: 'none', border: 'none', color: '#A1A1AA', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2px', fontSize: '0.62rem', cursor: 'pointer' }}
                >
                  <TrendingUp size={18} /> Finanças
                </button>

                {/* Botão Central Command Mecânico IA */}
                <button
                  onClick={() => setModalTipo('gemini')}
                  style={{
                    width: '42px',
                    height: '42px',
                    borderRadius: '13px',
                    background: 'linear-gradient(135deg, #E11D48, #F43F5E)',
                    border: '1px solid rgba(255,255,255,0.25)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#fff',
                    cursor: 'pointer',
                    boxShadow: '0 4px 14px rgba(225,29,72,0.45)',
                    transform: 'translateY(-2px)'
                  }}
                >
                  <Sparkles size={20} />
                </button>

                <button
                  onClick={() => setModalTipo('sheetAcoes')}
                  style={{ background: 'none', border: 'none', color: '#A1A1AA', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2px', fontSize: '0.62rem', cursor: 'pointer' }}
                >
                  <Plus size={18} /> Ações
                </button>

                <button
                  onClick={() => alert('Configurações: Preferências de sistema, biometria e sincronização em nuvem')}
                  style={{ background: 'none', border: 'none', color: '#A1A1AA', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2px', fontSize: '0.62rem', cursor: 'pointer' }}
                >
                  <Settings size={18} /> Ajustes
                </button>
              </nav>
            </div>
          </div>
        </section>

        {/* Caixa de Feedback Híbrida */}
        <FeedbackSection appId="garagem" appName="Garagem App" corTema="#E11D48" />
      </main>
    </>
  );
};
