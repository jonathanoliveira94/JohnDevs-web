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

// ============================================================
// DESIGN SYSTEM TOKENS (Fiel ao ReactDesignSystem.kt / Jetpack Compose)
// ============================================================
const Zinc950 = '#09090B';
const Zinc900 = '#18181B';
const Zinc850 = '#1F1F23';
const Zinc800 = '#27272A';
const Zinc700 = '#3F3F46';
const Zinc500 = '#71717A';
const Zinc400 = '#A1A1AA';
const Zinc300 = '#D4D4D8';
const Zinc200 = '#E4E4E7';
const Zinc50  = '#FAFAFA';

const Crimson600 = '#E11D48';
const Crimson500 = '#F43F5E';
const CrimsonGlow = '#4C0519';

const Emerald500 = '#10B981';
const Emerald400 = '#34D399';
const Amber400   = '#FBBF24';
const Sky400     = '#38BDF8';
const Violet500  = '#8B5CF6';

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
  id: number;
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
  // Slides da Apresentação
  const [slideAtual, setSlideAtual] = useState<number>(0);

  // Estados do Simulador do Celular
  const [veiculoIndex, setVeiculoIndex] = useState<number>(0);
  const [ocultarSaldo, setOcultarSaldo] = useState<boolean>(false);
  const [mostrarHistorico, setMostrarHistorico] = useState<boolean>(false);
  const [abaHistorico, setAbaHistorico] = useState<'abastecimentos' | 'manutencoes'>('abastecimentos');
  
  // Navegação no Simulador: 'garagem' | 'financas' | 'ajustes'
  const [rotaAtual, setRotaAtual] = useState<'garagem' | 'financas' | 'ajustes'>('garagem');

  // Modais / Sheets
  const [modalAberto, setModalAberto] = useState<'sheetAcoes' | 'novoAbast' | 'novaManut' | 'chatGemini' | null>(null);

  // Form Inputs para Novo Abastecimento
  const [litrosInput, setLitrosInput] = useState<string>('42.0');
  const [precoInput, setPrecoInput] = useState<string>('5.89');
  const [kmInput, setKmInput] = useState<string>('48.450');
  const [combustivelSel, setCombustivelSel] = useState<string>('Gasolina');
  const [tanqueCheio, setTanqueCheio] = useState<boolean>(true);

  // Form Inputs para Nova Manutenção
  const [manutDesc, setManutDesc] = useState<string>('Troca Óleo Sintético 5W40 + Filtros');
  const [manutPecas, setManutPecas] = useState<string>('240.00');
  const [manutMaoObra, setManutMaoObra] = useState<string>('100.00');
  const [manutTipo] = useState<string>('Preventiva');

  // Chat Gemini
  const [chatTexto, setChatTexto] = useState<string>('');
  const [chatMensagens, setChatMensagens] = useState<Array<{ remetente: 'user' | 'ia'; texto: string }>>([
    { remetente: 'ia', texto: 'Olá! Sou o Mecânico Virtual Garagem IA. Descreva barulhos, sintomas no painel ou dúvidas de manutenção para um diagnóstico preliminar.' }
  ]);

  // Lista de Veículos Fiel ao App
  const veiculos: Veiculo[] = [
    { id: 1, nome: 'Golf TSI 1.4', sub: '48.250 km', tipo: 'CARRO', ano: '2021', placa: 'BRA·2E19', consumo: 13.8, autonomia: 690, custoKm: 0.42, saldo: 630.10 },
    { id: 2, nome: 'Civic Touring', sub: '32.180 km', tipo: 'CARRO', ano: '2022', placa: 'JOH·7D26', consumo: 11.4, autonomia: 535, custoKm: 0.51, saldo: 420.00 },
    { id: 3, nome: 'Yamaha MT-07', sub: '12.400 km', tipo: 'MOTO', ano: '2023', placa: 'DEV·9X44', consumo: 21.5, autonomia: 300, custoKm: 0.27, saldo: 180.50 }
  ];

  const veiculo = veiculos[veiculoIndex];

  // Histórico de Abastecimentos
  const [abastecimentos, setAbastecimentos] = useState([
    { id: 1, data: '22/10/2026', km: '48.250', litros: '41.2 L', desc: 'Gasolina • R$ 5,79/L', valor: 'R$ 238,55', consumo: '13.9 km/L' },
    { id: 2, data: '08/10/2026', km: '47.680', litros: '43.0 L', desc: 'Gasolina • R$ 5,85/L', valor: 'R$ 251,55', consumo: '13.4 km/L' },
    { id: 3, data: '20/09/2026', km: '47.100', litros: '40.5 L', desc: 'Gasolina • R$ 5,90/L', valor: 'R$ 238,95', consumo: '14.1 km/L' }
  ]);

  // Histórico de Manutenções
  const [manutencoes, setManutencoes] = useState([
    { id: 1, data: '15/10/2026', km: '48.100', desc: 'Alinhamento & Balanceamento 3D', tags: ['Preventiva'], valor: 'R$ 140,00' },
    { id: 2, data: '02/09/2026', km: '46.800', desc: 'Troca de Pastilhas Dianteiras Bosch', tags: ['Peças', 'Freios'], valor: 'R$ 280,00' },
    { id: 3, data: '12/07/2026', km: '43.500', desc: 'Troca de Óleo 5W40 + Filtro de Ar e Óleo', tags: ['Troca de Óleo'], valor: 'R$ 310,00' }
  ]);

  const handleSalvarAbastecimento = () => {
    if (!litrosInput || !precoInput) return;
    const l = parseFloat(litrosInput);
    const p = parseFloat(precoInput);
    const tot = (l * p).toFixed(2).replace('.', ',');
    setAbastecimentos([
      {
        id: Date.now(),
        data: 'Hoje',
        km: kmInput || '48.450',
        litros: `${l.toFixed(1)} L`,
        desc: `${combustivelSel} • R$ ${p.toFixed(2).replace('.', ',')}/L`,
        valor: `R$ ${tot}`,
        consumo: `${veiculo.consumo.toFixed(1)} km/L`
      },
      ...abastecimentos
    ]);
    setModalAberto(null);
  };

  const handleSalvarManutencao = () => {
    if (!manutDesc) return;
    const pecas = parseFloat(manutPecas) || 0;
    const mo = parseFloat(manutMaoObra) || 0;
    const tot = (pecas + mo).toFixed(2).replace('.', ',');
    setManutencoes([
      {
        id: Date.now(),
        data: 'Hoje',
        km: kmInput || '48.450',
        desc: manutDesc,
        tags: [manutTipo],
        valor: `R$ ${tot}`
      },
      ...manutencoes
    ]);
    setModalAberto(null);
  };

  const handleEnviarMensagemChat = () => {
    if (!chatTexto.trim()) return;
    const texto = chatTexto.trim();
    setChatMensagens((prev) => [...prev, { remetente: 'user', texto }]);
    setChatTexto('');
    setTimeout(() => {
      setChatMensagens((prev) => [
        ...prev,
        {
          remetente: 'ia',
          texto: `Análise Garagem IA: Para o seu ${veiculo.nome}, o sintoma ("${texto}") sugere conferência do nível de fluido e desgaste mecânico. Recomendo registrar uma inspeção preventiva na oficina cadastrada!`
        }
      ]);
    }, 600);
  };

  // Componente Placa Mercosul Fiel
  const renderPlacaMercosul = (placa: string) => (
    <div style={{
      background: '#FFFFFF',
      borderRadius: '6px',
      border: `1.5px solid ${Zinc300}`,
      overflow: 'hidden',
      display: 'inline-flex',
      flexDirection: 'column',
      alignItems: 'center',
      boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
    }}>
      <div style={{
        background: '#003399',
        color: '#FFFFFF',
        fontSize: '0.45rem',
        fontWeight: 900,
        letterSpacing: '1.2px',
        padding: '1px 8px',
        width: '100%',
        textAlign: 'center'
      }}>
        BRASIL
      </div>
      <div style={{
        color: '#111827',
        fontSize: '0.9rem',
        fontWeight: 900,
        fontFamily: 'Courier New, monospace',
        letterSpacing: '1.8px',
        padding: '1px 8px'
      }}>
        {placa}
      </div>
    </div>
  );

  // Moldura Smartphone para a Vitrine
  const molduraSmartphoneSimulado = (conteudo: React.ReactNode) => (
    <div style={{
      width: '100%',
      maxWidth: '290px',
      height: '480px',
      background: Zinc950,
      borderRadius: '34px',
      border: `7px solid ${Zinc850}`,
      position: 'relative',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
      boxShadow: `0 16px 40px rgba(0,0,0,0.85), 0 0 25px rgba(225,29,72,0.25)`,
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
        <div style={{ width: '6px', height: '6px', background: Zinc800, borderRadius: '50%' }}></div>
      </div>
      {/* Conteúdo */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        {conteudo}
      </div>
    </div>
  );

  // Slides da Apresentação
  const slides: ScreenShotSlide[] = [
    {
      id: 'cockpit',
      titulo: 'DashboardGaragem.kt (Cockpit Bento v2.0)',
      subtitulo: 'Hero Card Bento Grid + Paleta Zinc/Crimson + Medidor Circular Vivo.',
      icone: Car,
      tag: 'NOVA UX NATIVA V2.0',
      descricaoCurta: 'Construído rigorosamente segundo o ReactDesignSystem.kt do apk Android. A interface traz a paleta profunda Zinc 950 com acento Crimson 600 (#E11D48), Bento Grid e cards com cantos de 22dp.',
      destaques: [
        'TopBar Cockpit com foto de perfil, dot de status verde (#10B981) e badge v2.0',
        'Pills horizontais para troca instantânea de veículos na frota',
        'Bento Hero com Placa Mercosul autêntica (BRASIL) e saldo protegido',
        '3 Indicadores em Grid: Gauge circular de consumo (km/L), autonomia e custo/km'
      ],
      renderVisual: () => molduraSmartphoneSimulado(
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: Zinc950, color: Zinc50 }}>
          {/* Header Cockpit */}
          <div style={{ background: `linear-gradient(180deg, ${CrimsonGlow} 0%, ${Zinc950} 100%)`, padding: '22px 14px 10px', borderBottom: `1px solid ${Zinc900}` }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.62rem', color: Zinc400, marginBottom: '8px' }}>
              <span>19:45</span>
              <div style={{ display: 'flex', gap: '4px' }}><Wifi size={10} /><BatteryCharging size={10} /></div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{ position: 'relative' }}>
                  <img src="/assets/john-persona.jfif" alt="Avatar" style={{ width: '34px', height: '34px', borderRadius: '10px', border: `1.5px solid ${Crimson500}`, objectFit: 'cover' }} />
                  <span style={{ position: 'absolute', bottom: -1, right: -1, width: '7px', height: '7px', borderRadius: '50%', background: Emerald500, border: `1px solid ${Zinc950}` }}></span>
                </div>
                <div>
                  <div style={{ fontSize: '0.52rem', color: Zinc400, letterSpacing: '1px', fontWeight: 800 }}>GARAGEM COCKPIT</div>
                  <div style={{ fontSize: '0.85rem', fontWeight: 800 }}>Olá, Jonathan</div>
                </div>
              </div>
              <span style={{ background: 'rgba(225,29,72,0.18)', color: Crimson500, fontSize: '0.55rem', fontWeight: 800, padding: '2px 6px', borderRadius: '999px', border: '1px solid rgba(225,29,72,0.35)' }}>v2.0</span>
            </div>

            {/* Pills de Frota */}
            <div style={{ display: 'flex', gap: '6px', marginTop: '10px' }}>
              <span style={{ background: 'rgba(225,29,72,0.2)', border: `1px solid ${Crimson500}`, color: Zinc50, padding: '3px 8px', borderRadius: '8px', fontSize: '0.6rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '4px' }}>
                <Car size={10} color={Crimson500} /> Golf TSI
              </span>
              <span style={{ background: Zinc900, border: `1px solid ${Zinc800}`, color: Zinc400, padding: '3px 8px', borderRadius: '8px', fontSize: '0.6rem' }}>Civic</span>
              <span style={{ background: Zinc900, border: `1px solid ${Zinc800}`, color: Zinc400, padding: '3px 8px', borderRadius: '8px', fontSize: '0.6rem' }}>MT-07</span>
            </div>
          </div>

          {/* Bento Grid */}
          <div style={{ padding: '8px 10px', display: 'flex', flexDirection: 'column', gap: '8px', flex: 1, overflowY: 'hidden' }}>
            {/* Bento Hero Card */}
            <div style={{ background: `linear-gradient(145deg, #221317 0%, ${Zinc900} 50%, #121215 100%)`, borderRadius: '14px', border: `1px solid ${Zinc800}`, padding: '10px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <div style={{ display: 'flex', gap: '4px', marginBottom: '2px' }}>
                    <span style={{ background: 'rgba(14,165,233,0.15)', color: Sky400, fontSize: '0.5rem', fontWeight: 800, padding: '1px 5px', borderRadius: '999px' }}>CARRO</span>
                    <span style={{ background: Zinc800, color: Zinc400, fontSize: '0.5rem', fontWeight: 600, padding: '1px 5px', borderRadius: '999px' }}>2021</span>
                  </div>
                  <div style={{ fontSize: '0.88rem', fontWeight: 900 }}>Golf TSI 1.4</div>
                  <div style={{ fontSize: '0.6rem', color: Zinc400 }}>48.250 km rodados</div>
                  <div style={{ marginTop: '5px' }}>
                    {renderPlacaMercosul('BRA·2E19')}
                  </div>
                </div>
                <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: Zinc850, border: `1px solid ${Zinc800}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Car size={20} color={Crimson500} />
                </div>
              </div>

              {/* Box interno de gastos */}
              <div style={{ background: 'rgba(9,9,11,0.7)', borderRadius: '10px', padding: '6px 8px', marginTop: '8px', border: `1px solid ${Zinc800}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ fontSize: '0.5rem', color: Zinc400, fontWeight: 700 }}>DESPESAS DO MÊS</div>
                  <div style={{ color: Zinc50, fontSize: '0.95rem', fontWeight: 900 }}>R$ 630,10</div>
                </div>
                <span style={{ fontSize: '0.55rem', background: Crimson600, color: '#fff', padding: '3px 7px', borderRadius: '6px', fontWeight: 700 }}>Histórico</span>
              </div>
            </div>

            {/* 3 Indicadores Bento */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '6px' }}>
              <div style={{ background: Zinc900, borderRadius: '10px', border: `1px solid ${Zinc800}`, padding: '6px 4px', textAlign: 'center' }}>
                <span style={{ fontSize: '0.5rem', color: Emerald400, background: 'rgba(16,185,129,0.12)', padding: '1px 5px', borderRadius: '4px', fontWeight: 700 }}>Ótimo</span>
                <div style={{ fontSize: '0.85rem', fontWeight: 900, color: Zinc50, marginTop: '2px' }}>13.8</div>
                <div style={{ fontSize: '0.48rem', color: Zinc400 }}>km/L</div>
              </div>
              <div style={{ background: Zinc900, borderRadius: '10px', border: `1px solid ${Zinc800}`, padding: '6px 4px', textAlign: 'center' }}>
                <span style={{ fontSize: '0.5rem', color: Sky400, background: 'rgba(14,165,233,0.12)', padding: '1px 5px', borderRadius: '4px', fontWeight: 700 }}>Tanque</span>
                <div style={{ fontSize: '0.85rem', fontWeight: 900, color: Zinc50, marginTop: '2px' }}>690 km</div>
                <div style={{ fontSize: '0.48rem', color: Zinc400 }}>Autonomia</div>
              </div>
              <div style={{ background: Zinc900, borderRadius: '10px', border: `1px solid ${Zinc800}`, padding: '6px 4px', textAlign: 'center' }}>
                <span style={{ fontSize: '0.5rem', color: Amber400, background: 'rgba(245,158,11,0.12)', padding: '1px 5px', borderRadius: '4px', fontWeight: 700 }}>Média</span>
                <div style={{ fontSize: '0.85rem', fontWeight: 900, color: Zinc50, marginTop: '2px' }}>R$ 0,42</div>
                <div style={{ fontSize: '0.48rem', color: Zinc400 }}>Custo/km</div>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'dock',
      titulo: 'Quick Action Dock & ModalBottomSheet',
      subtitulo: 'Atalhos em 1 toque na Home + Sheet de Ações Rápidas.',
      icone: Layers,
      tag: 'AGILIDADE OPERACIONAL',
      descricaoCurta: 'Substitui botões espalhados por um elegante Quick Action Dock na Home e um ModalBottomSheet inspirado no shadcn/ui com opções em cards Zinc 950 com bordas suaves de 16dp.',
      destaques: [
        'Cards de ação com ícones semânticos (Amarelo para Combustível, Azul para Oficina)',
        'Contadores de registros em tempo real (ex: "3 registros", "2 serviços")',
        'BottomSheet com cantos arredondados de 24dp e toque fora para fechar',
        'Navegação sem engasgos com resposta tátil'
      ],
      renderVisual: () => molduraSmartphoneSimulado(
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: Zinc950, color: Zinc50, padding: '22px 12px 10px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: `1px solid ${Zinc850}`, paddingBottom: '8px' }}>
            <span style={{ fontSize: '0.78rem', fontWeight: 800 }}>Ações Rápidas (Sheet)</span>
            <span style={{ fontSize: '0.55rem', color: Crimson500, background: 'rgba(225,29,72,0.12)', padding: '2px 6px', borderRadius: '6px', fontWeight: 700 }}>ATALHOS</span>
          </div>

          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '8px' }}>
            <div style={{ background: Zinc900, border: `1px solid ${Zinc800}`, borderRadius: '12px', padding: '10px', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{ width: '34px', height: '34px', borderRadius: '10px', background: 'rgba(245,158,11,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Fuel size={17} color={Amber400} />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: '0.78rem', fontWeight: 800 }}>Novo Abastecimento</div>
                <div style={{ fontSize: '0.6rem', color: Zinc400 }}>Litros, leitura da bomba e média km/L</div>
              </div>
              <ArrowRight size={13} color={Zinc500} />
            </div>

            <div style={{ background: Zinc900, border: `1px solid ${Zinc800}`, borderRadius: '12px', padding: '10px', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{ width: '34px', height: '34px', borderRadius: '10px', background: 'rgba(14,165,233,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Wrench size={17} color={Sky400} />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: '0.78rem', fontWeight: 800 }}>Nova Manutenção</div>
                <div style={{ fontSize: '0.6rem', color: Zinc400 }}>Óleo, pneus, pastilhas e cupons fiscais</div>
              </div>
              <ArrowRight size={13} color={Zinc500} />
            </div>

            <div style={{ background: `linear-gradient(90deg, rgba(225,29,72,0.15) 0%, ${Zinc900} 100%)`, border: `1px solid rgba(225,29,72,0.4)`, borderRadius: '12px', padding: '10px', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{ width: '34px', height: '34px', borderRadius: '10px', background: 'rgba(225,29,72,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Sparkles size={17} color={Crimson500} />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: '0.78rem', fontWeight: 800 }}>Consultar Mecânico IA</div>
                <div style={{ fontSize: '0.6rem', color: Zinc300 }}>Diagnóstico inteligente com Gemini</div>
              </div>
              <ArrowRight size={13} color={Crimson500} />
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
      descricaoCurta: 'Projetada para agilidade máxima no posto de combustível. Conta com hero display em destaque do total pago, botões rápidos para combustível e integração OCR para leitura da bomba.',
      destaques: [
        'Display gigante estilo velocímetro com o valor total em destaque',
        'Seletor em chips: Gasolina, Etanol, Diesel e GNV',
        'Cálculo bidirecional instantâneo (Litros x Preço por Litro)',
        'Check-in de posto via geolocalização e botão Ler Bomba com ML Kit'
      ],
      renderVisual: () => molduraSmartphoneSimulado(
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: Zinc950, color: Zinc50, padding: '22px 12px 10px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: `1px solid ${Zinc850}`, paddingBottom: '8px' }}>
            <span style={{ fontSize: '0.8rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Fuel size={14} color={Amber400} /> Abastecimento
            </span>
            <span style={{ fontSize: '0.55rem', border: `1px solid ${Zinc800}`, padding: '2px 6px', borderRadius: '6px', color: Zinc200 }}>Ler Bomba (OCR)</span>
          </div>

          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '8px' }}>
            <div style={{ background: `linear-gradient(135deg, ${CrimsonGlow} 0%, ${Zinc900} 100%)`, borderRadius: '12px', border: `1px solid rgba(225,29,72,0.35)`, padding: '12px', textAlign: 'center' }}>
              <div style={{ fontSize: '0.55rem', color: Zinc400, fontWeight: 700 }}>VALOR TOTAL</div>
              <div style={{ fontSize: '1.45rem', fontWeight: 900, color: Zinc50, margin: '2px 0' }}>R$ 247,38</div>
              <div style={{ fontSize: '0.6rem', color: Emerald400 }}>42.0 L • R$ 5,89/L</div>
            </div>

            <div style={{ display: 'flex', gap: '4px' }}>
              <span style={{ flex: 1, textAlign: 'center', background: Crimson600, color: '#fff', fontWeight: 800, padding: '4px 0', borderRadius: '6px', fontSize: '0.6rem' }}>Gasolina</span>
              <span style={{ flex: 1, textAlign: 'center', background: Zinc900, color: Zinc400, padding: '4px 0', borderRadius: '6px', fontSize: '0.6rem' }}>Etanol</span>
              <span style={{ flex: 1, textAlign: 'center', background: Zinc900, color: Zinc400, padding: '4px 0', borderRadius: '6px', fontSize: '0.6rem' }}>Diesel</span>
            </div>

            <div style={{ background: Zinc900, borderRadius: '8px', border: `1px solid ${Zinc800}`, padding: '6px 8px', fontSize: '0.58rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ color: Zinc400 }}>Tanque Cheio:</span>
              <strong style={{ color: Emerald400 }}>SIM (Calcula Média)</strong>
            </div>

            <button style={{ background: Crimson600, color: '#fff', border: 'none', borderRadius: '10px', padding: '8px', fontWeight: 800, fontSize: '0.7rem' }}>
              Confirmar Abastecimento
            </button>
          </div>
        </div>
      )
    },
    {
      id: 'gemini',
      titulo: 'TelaGeminiChat.kt (Mecânico IA)',
      subtitulo: 'Assistente Generativo para Diagnóstico Automotivo.',
      icone: Bot,
      tag: 'INTELIGÊNCIA ARTIFICIAL',
      descricaoCurta: 'Alimentado pelo Google Generative AI SDK (Gemini). Permite descrever sintomas, luzes no painel ou anexar foto de cupons fiscais e receber orientações preventivas imediatas.',
      destaques: [
        'Streaming de respostas com diagnóstico preliminar',
        'Chips rápidos de diagnóstico ("Luz da injeção", "Barulho ao frear")',
        'Interpretação de notas fiscais e leitura de peças',
        'Conselhos de segurança antes de viagens longas'
      ],
      renderVisual: () => molduraSmartphoneSimulado(
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: Zinc950, color: Zinc50, padding: '22px 10px 8px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: `1px solid ${Zinc850}`, paddingBottom: '6px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <div style={{ width: '22px', height: '22px', borderRadius: '6px', background: 'rgba(225,29,72,0.2)', border: `1px solid ${Crimson600}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Sparkles size={12} color={Crimson500} />
              </div>
              <span style={{ fontSize: '0.75rem', fontWeight: 800 }}>Mecânico Virtual IA</span>
            </div>
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: Emerald500 }}></span>
          </div>

          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '6px', padding: '8px 0', overflowY: 'hidden' }}>
            <div style={{ alignSelf: 'flex-end', background: Crimson600, padding: '5px 8px', borderRadius: '10px 10px 2px 10px', fontSize: '0.6rem', maxWidth: '85%' }}>
              Luz de pastilha acendeu no painel hoje...
            </div>
            <div style={{ alignSelf: 'flex-start', background: Zinc900, border: `1px solid ${Zinc800}`, padding: '6px 8px', borderRadius: '10px 10px 10px 2px', fontSize: '0.58rem', lineHeight: 1.35, maxWidth: '92%', color: Zinc200 }}>
              <strong style={{ color: Crimson500 }}>Diagnóstico Garagem:</strong><br />
              O sensor acústico de desgaste atingiu a margem de segurança. Troque as pastilhas em até 500 km para não riscar o disco!
            </div>
          </div>

          <div style={{ background: Zinc900, borderRadius: '8px', border: `1px solid ${Zinc800}`, padding: '5px 8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '0.58rem', color: Zinc500 }}>Descreva o sintoma ou anexe foto...</span>
            <Send size={12} color={Crimson600} />
          </div>
        </div>
      )
    },
    {
      id: 'financas',
      titulo: 'TelaFinancas.kt & Relatórios',
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
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: Zinc950, color: Zinc50, padding: '22px 10px 8px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: `1px solid ${Zinc850}`, paddingBottom: '6px' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '6px' }}>
              <TrendingUp size={14} color={Emerald400} /> Painel Financeiro
            </span>
            <span style={{ fontSize: '0.52rem', color: Emerald400, background: 'rgba(16,185,129,0.15)', padding: '1px 5px', borderRadius: '4px', fontWeight: 700 }}>Global</span>
          </div>

          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '8px 0' }}>
            <div style={{ background: `linear-gradient(145deg, #1A1215 0%, ${Zinc900} 100%)`, borderRadius: '10px', border: `1px solid ${Zinc800}`, padding: '8px' }}>
              <div style={{ fontSize: '0.5rem', color: Zinc400, fontWeight: 700 }}>TOTAL ACUMULADO</div>
              <div style={{ fontSize: '1.25rem', fontWeight: 900, color: Zinc50 }}>R$ 1.250,10</div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '4px', fontSize: '0.55rem', borderTop: `1px solid ${Zinc800}`, paddingTop: '4px' }}>
                <span style={{ color: Amber400 }}>Combustível: R$ 830</span>
                <span style={{ color: Crimson500 }}>Oficina: R$ 420</span>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <div style={{ background: Zinc900, borderRadius: '6px', border: `1px solid ${Zinc800}`, padding: '6px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ fontSize: '0.6rem', fontWeight: 700 }}>Visão Geral (Pizza)</span>
                <ArrowRight size={10} color={Zinc500} />
              </div>
              <div style={{ background: Zinc900, borderRadius: '6px', border: `1px solid ${Zinc800}`, padding: '6px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ fontSize: '0.6rem', fontWeight: 700 }}>Gastos Mensais (Evolução)</span>
                <ArrowRight size={10} color={Zinc500} />
              </div>
              <div style={{ background: Zinc900, borderRadius: '6px', border: `1px solid ${Zinc800}`, padding: '6px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ fontSize: '0.6rem', fontWeight: 700 }}>Análise de Consumo (km/L)</span>
                <ArrowRight size={10} color={Zinc500} />
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
        <div className="badge-categoria" style={{ background: 'rgba(225, 29, 72, 0.15)', color: Crimson500, borderColor: 'rgba(225, 29, 72, 0.35)' }}>
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
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'rgba(225,29,72,0.12)', border: '1px solid rgba(225,29,72,0.3)', padding: '4px 10px', borderRadius: '999px', fontSize: '0.78rem', color: Crimson500, fontWeight: 700, marginBottom: '10px' }}>
              <CheckCircle2 size={14} /> NOVO DESIGN SYSTEM V2.0 FIEL AO APK
            </div>
            <h2 style={{ fontSize: '1.8rem', marginBottom: '14px' }}>UX Reformulada: Do Visual ao Desempenho</h2>
            <p style={{ color: 'var(--texto-suave)', marginBottom: '14px', fontSize: '1.02rem' }}>
              O GaragemApp recebeu uma reformulação completa de experiência do usuário inspirada no ecossistema moderno <strong>React, Tailwind CSS e shadcn/ui</strong>. A interface migrou para uma paleta profunda e esportiva de <strong>Zinc 950/900/800</strong> com realces <strong>Crimson / Rose (<code>#E11D48</code>)</strong>.
            </p>
            <p style={{ color: 'var(--texto-suave)', fontSize: '1.02rem' }}>
              O painel principal agora opera no formato <strong>Bento Grid</strong>, integrando cards inteligentes com Placa Mercosul formatada, Quick Action Dock para cadastros em um toque e a nova <strong>Floating Navigation Bar</strong> com botão central de comando para o Mecânico IA.
            </p>
          </div>

          <div style={{ background: Zinc950, border: `1px solid ${Zinc800}`, borderRadius: 'var(--radius)', padding: '26px' }}>
            <h4 style={{ color: Crimson500, marginBottom: '12px', fontSize: '1.1rem' }}>Evoluções da Versão 2.0:</h4>
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
            <span className="sub-rotulo" style={{ color: Crimson500 }}>APRESENTAÇÃO TÉCNICA DAS TELAS</span>
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
                    background: ativo ? `linear-gradient(90deg, ${Crimson600}, #BE123C)` : Zinc900,
                    color: ativo ? '#ffffff' : Zinc400,
                    border: ativo ? 'none' : `1px solid ${Zinc800}`,
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
            background: `linear-gradient(160deg, #101014, ${Zinc950})`,
            border: `1px solid ${Zinc800}`,
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
                    style={{ padding: '8px 16px', fontSize: '0.85rem', background: `linear-gradient(90deg, ${Crimson600}, #BE123C)`, color: '#fff' }}
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
                  color: Crimson500,
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

                <p style={{ color: Crimson500, fontSize: '0.95rem', fontWeight: 600, marginBottom: '14px' }}>
                  {atual.subtitulo}
                </p>

                <p style={{ color: 'var(--texto-suave)', fontSize: '1rem', lineHeight: 1.7, marginBottom: '20px' }}>
                  {atual.descricaoCurta}
                </p>

                <div style={{ borderTop: `1px solid ${Zinc800}`, paddingTop: '16px' }}>
                  <span style={{ fontSize: '0.8rem', fontWeight: 800, color: '#fff', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                    Destaques da Implementação:
                  </span>
                  <ul style={{ listStyle: 'none', marginTop: '10px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {atual.destaques.map((d, i) => (
                      <li key={i} style={{ fontSize: '0.9rem', color: 'var(--texto-suave)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: Crimson600 }}></span>
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
            <span className="sub-rotulo" style={{ color: Crimson500 }}>EXPERIMENTE AO VIVO NO SMARTPHONE</span>
            <h2 style={{ fontSize: '1.8rem' }}>Simulador Interativo 100% Fiel ao APK</h2>
            <p style={{ color: 'var(--texto-suave)' }}>
              Interaja com o aparelho abaixo exatamente como no aplicativo nativo: alterne telas pela <strong>Floating Navigation Bar</strong>, abra o <strong>Mecânico Gemini IA</strong>, insira abastecimentos na bomba ou consulte os gráficos de despesas!
            </p>
          </div>

          <div style={{ display: 'flex', justifyContent: 'center', padding: '10px 0', width: '100%' }}>
            <div style={{
              width: '100%',
              maxWidth: '365px',
              height: '760px',
              background: Zinc950,
              borderRadius: '42px',
              border: `8px solid ${Zinc850}`,
              boxShadow: '0 25px 70px rgba(0, 0, 0, 0.9), 0 0 35px rgba(225, 29, 72, 0.28)',
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
                <div style={{ width: '8px', height: '8px', background: Zinc800, borderRadius: '50%' }}></div>
              </div>

              {/* Topbar Cockpit v2.0 */}
              <div style={{
                background: `linear-gradient(180deg, ${CrimsonGlow} 0%, ${Zinc950} 100%)`,
                padding: '34px 16px 12px',
                borderBottom: `1px solid ${Zinc900}`
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem', color: Zinc400, marginBottom: '10px' }}>
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
                      <img src="/assets/john-persona.jfif" alt="Avatar" style={{ width: '42px', height: '42px', borderRadius: '13px', border: `1.5px solid ${Crimson500}`, objectFit: 'cover' }} />
                      <span style={{ position: 'absolute', bottom: -1, right: -1, width: '9px', height: '9px', borderRadius: '50%', background: Emerald500, border: `2px solid ${Zinc950}` }}></span>
                    </div>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                        <span style={{ fontSize: '0.62rem', color: Zinc400, letterSpacing: '1px', fontWeight: 800 }}>GARAGEM COCKPIT</span>
                        <span style={{ background: 'rgba(225,29,72,0.18)', color: Crimson500, fontSize: '0.52rem', fontWeight: 800, padding: '1px 5px', borderRadius: '999px' }}>v2.0</span>
                      </div>
                      <div style={{ fontSize: '1.05rem', fontWeight: 800, color: Zinc50 }}>Olá, Jonathan</div>
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '6px' }}>
                    <button
                      onClick={() => setModalAberto('sheetAcoes')}
                      style={{ width: '36px', height: '36px', borderRadius: '11px', background: Zinc900, border: `1px solid ${Zinc800}`, color: Crimson500, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
                    >
                      <Plus size={18} />
                    </button>
                    <button
                      onClick={() => setRotaAtual('ajustes')}
                      style={{ width: '36px', height: '36px', borderRadius: '11px', background: Zinc900, border: `1px solid ${Zinc800}`, color: Zinc300, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
                    >
                      <Settings size={17} />
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
                        background: veiculoIndex === i ? 'rgba(225,29,72,0.18)' : Zinc900,
                        color: veiculoIndex === i ? Zinc50 : Zinc400,
                        border: veiculoIndex === i ? `1px solid ${Crimson500}` : `1px solid ${Zinc800}`,
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px'
                      }}
                    >
                      <Car size={13} color={veiculoIndex === i ? Crimson500 : Zinc500} />
                      {v.nome}
                    </button>
                  ))}
                </div>
              </div>

              {/* ============================================================
                  CORPO DINÂMICO CONFORME ROTA ATUAL
                  ============================================================ */}
              <div style={{ flex: 1, overflowY: 'auto', padding: '12px 14px 85px', background: Zinc950, display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {rotaAtual === 'garagem' && (
                  <>
                    {/* 1. Bento Hero Card */}
                    <div style={{
                      background: `linear-gradient(145deg, #221317 0%, ${Zinc900} 50%, #121215 100%)`,
                      borderRadius: '22px',
                      border: `1px solid ${Zinc800}`,
                      padding: '16px'
                    }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                        <div>
                          <div style={{ display: 'flex', gap: '5px', marginBottom: '4px' }}>
                            <span style={{ background: 'rgba(14,165,233,0.18)', color: Sky400, fontSize: '0.55rem', fontWeight: 800, padding: '2px 6px', borderRadius: '999px' }}>{veiculo.tipo}</span>
                            <span style={{ background: Zinc800, color: Zinc300, fontSize: '0.55rem', fontWeight: 600, padding: '2px 6px', borderRadius: '999px' }}>{veiculo.ano}</span>
                          </div>
                          <div style={{ fontSize: '1.25rem', fontWeight: 900, color: Zinc50 }}>{veiculo.nome}</div>
                          <div style={{ fontSize: '0.75rem', color: Zinc400, marginTop: '2px' }}>{veiculo.sub} rodados</div>
                          <div style={{ marginTop: '8px' }}>
                            {renderPlacaMercosul(veiculo.placa)}
                          </div>
                        </div>

                        <div style={{ width: '56px', height: '56px', borderRadius: '16px', background: Zinc900, border: `1px solid ${Zinc800}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <Car size={28} color={Crimson500} />
                        </div>
                      </div>

                      {/* Box interno de gastos do mês */}
                      <div style={{
                        background: 'rgba(9, 9, 11, 0.75)',
                        borderRadius: '14px',
                        border: `1px solid ${Zinc800}`,
                        padding: '10px 12px',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                      }}>
                        <div>
                          <div style={{ fontSize: '0.62rem', color: Zinc400, fontWeight: 700, display: 'flex', alignItems: 'center', gap: '5px' }}>
                            <span>DESPESAS DO MÊS</span>
                            <span onClick={() => setOcultarSaldo(!ocultarSaldo)} style={{ cursor: 'pointer' }}>
                              {ocultarSaldo ? <EyeOff size={12} /> : <Eye size={12} />}
                            </span>
                          </div>
                          <div style={{ color: Zinc50, fontSize: '1.25rem', fontWeight: 900 }}>
                            {ocultarSaldo ? 'R$ •••••' : `R$ ${veiculo.saldo.toFixed(2).replace('.', ',')}`}
                          </div>
                        </div>

                        <button
                          onClick={() => setMostrarHistorico(!mostrarHistorico)}
                          style={{
                            background: mostrarHistorico ? Crimson600 : Zinc800,
                            color: Zinc50,
                            border: `1px solid ${mostrarHistorico ? Crimson500 : Zinc700}`,
                            borderRadius: '10px',
                            padding: '6px 10px',
                            fontSize: '0.68rem',
                            fontWeight: 700,
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '4px'
                          }}
                        >
                          <History size={13} /> {mostrarHistorico ? 'Ocultar' : 'Histórico'}
                        </button>
                      </div>
                    </div>

                    {/* 2. Bento Grid de Indicadores Vivos */}
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '8px' }}>
                      <div style={{ background: Zinc900, border: `1px solid ${Zinc800}`, borderRadius: '16px', padding: '10px 4px', textAlign: 'center' }}>
                        <span style={{ fontSize: '0.55rem', color: Emerald400, background: 'rgba(16,185,129,0.12)', padding: '2px 6px', borderRadius: '4px', fontWeight: 700 }}>Ótimo</span>
                        <div style={{ fontSize: '1.05rem', fontWeight: 900, color: Zinc50, marginTop: '4px' }}>{veiculo.consumo.toFixed(1)}</div>
                        <div style={{ fontSize: '0.58rem', color: Zinc400 }}>km/L médio</div>
                      </div>

                      <div style={{ background: Zinc900, border: `1px solid ${Zinc800}`, borderRadius: '16px', padding: '10px 4px', textAlign: 'center' }}>
                        <span style={{ fontSize: '0.55rem', color: Sky400, background: 'rgba(14,165,233,0.12)', padding: '2px 6px', borderRadius: '4px', fontWeight: 700 }}>Tanque</span>
                        <div style={{ fontSize: '1.05rem', fontWeight: 900, color: Zinc50, marginTop: '4px' }}>{veiculo.autonomia} km</div>
                        <div style={{ fontSize: '0.58rem', color: Zinc400 }}>Autonomia</div>
                      </div>

                      <div style={{ background: Zinc900, border: `1px solid ${Zinc800}`, borderRadius: '16px', padding: '10px 4px', textAlign: 'center' }}>
                        <span style={{ fontSize: '0.55rem', color: Amber400, background: 'rgba(245,158,11,0.12)', padding: '2px 6px', borderRadius: '4px', fontWeight: 700 }}>Média</span>
                        <div style={{ fontSize: '1.05rem', fontWeight: 900, color: Zinc50, marginTop: '4px' }}>R$ {veiculo.custoKm.toFixed(2)}</div>
                        <div style={{ fontSize: '0.58rem', color: Zinc400 }}>Custo/km</div>
                      </div>
                    </div>

                    {/* 3. React Quick Action Dock */}
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '8px' }}>
                      <button
                        onClick={() => setModalAberto('novoAbast')}
                        style={{
                          background: Zinc900,
                          border: `1px solid ${Zinc800}`,
                          borderRadius: '16px',
                          padding: '10px 8px',
                          cursor: 'pointer',
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'flex-start',
                          gap: '4px'
                        }}
                      >
                        <div style={{ width: '28px', height: '28px', borderRadius: '8px', background: 'rgba(245,158,11,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <Fuel size={15} color={Amber400} />
                        </div>
                        <span style={{ fontSize: '0.74rem', fontWeight: 800, color: Zinc50 }}>Abastecer</span>
                        <span style={{ fontSize: '0.55rem', color: Zinc500 }}>{abastecimentos.length} registros</span>
                      </button>

                      <button
                        onClick={() => setModalAberto('novaManut')}
                        style={{
                          background: Zinc900,
                          border: `1px solid ${Zinc800}`,
                          borderRadius: '16px',
                          padding: '10px 8px',
                          cursor: 'pointer',
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'flex-start',
                          gap: '4px'
                        }}
                      >
                        <div style={{ width: '28px', height: '28px', borderRadius: '8px', background: 'rgba(14,165,233,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <Wrench size={15} color={Sky400} />
                        </div>
                        <span style={{ fontSize: '0.74rem', fontWeight: 800, color: Zinc50 }}>Oficina</span>
                        <span style={{ fontSize: '0.55rem', color: Zinc500 }}>{manutencoes.length} serviços</span>
                      </button>

                      <button
                        onClick={() => setModalAberto('chatGemini')}
                        style={{
                          background: Zinc900,
                          border: `1px solid ${Zinc800}`,
                          borderRadius: '16px',
                          padding: '10px 8px',
                          cursor: 'pointer',
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'flex-start',
                          gap: '4px'
                        }}
                      >
                        <div style={{ width: '28px', height: '28px', borderRadius: '8px', background: 'rgba(225,29,72,0.18)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <Sparkles size={15} color={Crimson500} />
                        </div>
                        <span style={{ fontSize: '0.74rem', fontWeight: 800, color: Zinc50 }}>Gemini IA</span>
                        <span style={{ fontSize: '0.55rem', color: Zinc500 }}>Mecânico</span>
                      </button>
                    </div>

                    {/* 4. Timeline Expansível com Segmented Control */}
                    {mostrarHistorico && (
                      <div style={{ background: Zinc900, borderRadius: '18px', border: `1px solid ${Zinc800}`, padding: '12px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                          <span style={{ fontSize: '0.68rem', fontWeight: 800, color: Zinc400, letterSpacing: '0.8px' }}>LINHA DO TEMPO DO VEÍCULO</span>
                          <span style={{ fontSize: '0.58rem', color: Zinc500 }}>Toque para editar</span>
                        </div>

                        {/* Segmented Control Fiel */}
                        <div style={{ display: 'flex', background: Zinc950, padding: '3px', borderRadius: '12px', border: `1px solid ${Zinc800}`, marginBottom: '10px' }}>
                          <button
                            onClick={() => setAbaHistorico('abastecimentos')}
                            style={{
                              flex: 1,
                              padding: '7px 4px',
                              borderRadius: '9px',
                              fontSize: '0.68rem',
                              fontWeight: abaHistorico === 'abastecimentos' ? 700 : 500,
                              background: abaHistorico === 'abastecimentos' ? Zinc800 : 'transparent',
                              color: abaHistorico === 'abastecimentos' ? Zinc50 : Zinc400,
                              border: 'none',
                              cursor: 'pointer'
                            }}
                          >
                            Abastecimentos ({abastecimentos.length})
                          </button>
                          <button
                            onClick={() => setAbaHistorico('manutencoes')}
                            style={{
                              flex: 1,
                              padding: '7px 4px',
                              borderRadius: '9px',
                              fontSize: '0.68rem',
                              fontWeight: abaHistorico === 'manutencoes' ? 700 : 500,
                              background: abaHistorico === 'manutencoes' ? Zinc800 : 'transparent',
                              color: abaHistorico === 'manutencoes' ? Zinc50 : Zinc400,
                              border: 'none',
                              cursor: 'pointer'
                            }}
                          >
                            Manutenções ({manutencoes.length})
                          </button>
                        </div>

                        {/* Lista de Registros */}
                        {abaHistorico === 'abastecimentos' ? (
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                            {abastecimentos.map((a) => (
                              <div key={a.id} style={{ background: Zinc950, borderRadius: '12px', border: `1px solid ${Zinc800}`, padding: '8px 10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <div>
                                  <div style={{ fontSize: '0.74rem', fontWeight: 800, color: Zinc50 }}>{a.litros} • {a.desc}</div>
                                  <div style={{ fontSize: '0.6rem', color: Zinc400 }}>{a.data} • {a.km} km • <strong style={{ color: Emerald400 }}>{a.consumo}</strong></div>
                                </div>
                                <span style={{ fontSize: '0.8rem', fontWeight: 800, color: Amber400 }}>{a.valor}</span>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                            {manutencoes.map((m) => (
                              <div key={m.id} style={{ background: Zinc950, borderRadius: '12px', border: `1px solid ${Zinc800}`, padding: '8px 10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <div>
                                  <div style={{ fontSize: '0.74rem', fontWeight: 800, color: Zinc50 }}>{m.desc}</div>
                                  <div style={{ fontSize: '0.6rem', color: Zinc400 }}>{m.data} • {m.km} km • <span style={{ color: Sky400 }}>{m.tags.join(', ')}</span></div>
                                </div>
                                <span style={{ fontSize: '0.8rem', fontWeight: 800, color: Crimson500 }}>{m.valor}</span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    )}
                  </>
                )}

                {/* TELA DE FINANÇAS SIMULADA */}
                {rotaAtual === 'financas' && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontSize: '0.82rem', fontWeight: 800, color: Zinc50 }}>Painel Financeiro</span>
                      <span style={{ fontSize: '0.55rem', background: 'rgba(16,185,129,0.15)', color: Emerald400, padding: '2px 6px', borderRadius: '4px', fontWeight: 700 }}>Global</span>
                    </div>

                    <div style={{ background: `linear-gradient(145deg, #1A1215 0%, ${Zinc900} 100%)`, borderRadius: '16px', border: `1px solid ${Zinc800}`, padding: '14px' }}>
                      <div style={{ fontSize: '0.55rem', color: Zinc400, fontWeight: 700 }}>TOTAL ACUMULADO</div>
                      <div style={{ fontSize: '1.5rem', fontWeight: 900, color: Zinc50 }}>R$ 1.369,05</div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '8px', borderTop: `1px solid ${Zinc800}`, paddingTop: '8px', fontSize: '0.65rem' }}>
                        <span style={{ color: Amber400 }}>⛽ Combustível: R$ 729</span>
                        <span style={{ color: Crimson500 }}>🔧 Oficina: R$ 640</span>
                      </div>
                    </div>

                    <div style={{ fontSize: '0.68rem', fontWeight: 800, color: Zinc400 }}>MÓDULOS DE ANÁLISE</div>
                    {[
                      { t: 'Visão Geral', d: 'Split entre peças, combustível e mão de obra', cor: Sky400 },
                      { t: 'Gastos Mensais', d: 'Evolução temporal e comparativo dos últimos 4 meses', cor: Violet500 },
                      { t: 'Análise de Consumo', d: 'Eficiência energética média km/L e custo por quilômetro', cor: Emerald400 }
                    ].map((m, idx) => (
                      <div key={idx} style={{ background: Zinc900, borderRadius: '12px', border: `1px solid ${Zinc800}`, padding: '10px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <div>
                          <div style={{ fontSize: '0.75rem', fontWeight: 800, color: Zinc50 }}>{m.t}</div>
                          <div style={{ fontSize: '0.58rem', color: Zinc400 }}>{m.d}</div>
                        </div>
                        <ArrowRight size={14} color={m.cor} />
                      </div>
                    ))}
                  </div>
                )}

                {/* TELA DE AJUSTES SIMULADA */}
                {rotaAtual === 'ajustes' && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <div style={{ fontSize: '0.82rem', fontWeight: 800, color: Zinc50 }}>Configurações do App</div>
                    
                    <div style={{ background: `linear-gradient(145deg, #281014 0%, ${Zinc900} 100%)`, borderRadius: '16px', border: `1px solid #2C1417`, padding: '12px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <img src="/assets/john-persona.jfif" alt="Avatar" style={{ width: '40px', height: '40px', borderRadius: '50%', border: `1.5px solid ${Crimson600}` }} />
                      <div>
                        <div style={{ fontSize: '0.82rem', fontWeight: 800, color: Zinc50 }}>Jonathan Oliveira</div>
                        <div style={{ fontSize: '0.6rem', color: Emerald400 }}>● Biometria e Nuvem Ativas</div>
                      </div>
                    </div>

                    <div style={{ fontSize: '0.68rem', fontWeight: 800, color: Zinc400 }}>PREFERÊNCIAS & SEGURANÇA</div>
                    <div style={{ background: Zinc900, borderRadius: '14px', border: `1px solid ${Zinc800}`, padding: '10px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.72rem' }}>
                        <span>Modo Escuro (Zinc 950)</span>
                        <strong style={{ color: Crimson500 }}>ATIVO</strong>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.72rem', borderTop: `1px solid ${Zinc800}`, paddingTop: '8px' }}>
                        <span>Login com Biometria</span>
                        <strong style={{ color: Emerald400 }}>ATIVO</strong>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.72rem', borderTop: `1px solid ${Zinc800}`, paddingTop: '8px' }}>
                        <span>Sincronização Firestore</span>
                        <strong style={{ color: Emerald400 }}>ONLINE</strong>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* ============================================================
                  MODAIS BOTTOMSHEET: INTERAÇÕES REAIS NO SIMULADOR
                  ============================================================ */}

              {/* MODAL 1: NOVO ABASTECIMENTO */}
              {modalAberto === 'novoAbast' && (
                <div style={{
                  position: 'absolute',
                  left: 0,
                  right: 0,
                  bottom: 0,
                  background: Zinc900,
                  borderTopLeftRadius: '24px',
                  borderTopRightRadius: '24px',
                  borderTop: `2px solid ${Amber400}`,
                  padding: '16px 16px 24px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '10px',
                  zIndex: 90,
                  boxShadow: '0 -10px 40px rgba(0,0,0,0.85)'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h4 style={{ color: Zinc50, fontSize: '0.95rem', margin: 0, display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <Fuel size={17} color={Amber400} /> Novo Abastecimento
                    </h4>
                    <X size={18} color={Zinc400} style={{ cursor: 'pointer' }} onClick={() => setModalAberto(null)} />
                  </div>

                  <div style={{ display: 'flex', gap: '6px' }}>
                    {['Gasolina', 'Etanol', 'Diesel'].map((t) => (
                      <button
                        key={t}
                        onClick={() => setCombustivelSel(t)}
                        style={{
                          flex: 1,
                          padding: '6px 0',
                          borderRadius: '8px',
                          border: combustivelSel === t ? `1px solid ${Crimson600}` : `1px solid ${Zinc800}`,
                          background: combustivelSel === t ? Crimson600 : Zinc950,
                          color: Zinc50,
                          fontSize: '0.68rem',
                          fontWeight: 700,
                          cursor: 'pointer'
                        }}
                      >
                        {t}
                      </button>
                    ))}
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                    <input
                      type="number"
                      value={litrosInput}
                      onChange={(e) => setLitrosInput(e.target.value)}
                      placeholder="Litros (ex: 42.0)"
                      style={{ background: Zinc950, border: `1px solid ${Zinc800}`, borderRadius: '10px', padding: '9px', color: '#fff', fontSize: '0.75rem' }}
                    />
                    <input
                      type="number"
                      value={precoInput}
                      onChange={(e) => setPrecoInput(e.target.value)}
                      placeholder="Preço/Litro R$"
                      style={{ background: Zinc950, border: `1px solid ${Zinc800}`, borderRadius: '10px', padding: '9px', color: '#fff', fontSize: '0.75rem' }}
                    />
                  </div>

                  <input
                    type="text"
                    value={kmInput}
                    onChange={(e) => setKmInput(e.target.value)}
                    placeholder="KM no Painel (ex: 48.450)"
                    style={{ background: Zinc950, border: `1px solid ${Zinc800}`, borderRadius: '10px', padding: '9px', color: '#fff', fontSize: '0.75rem' }}
                  />

                  <div
                    onClick={() => setTanqueCheio(!tanqueCheio)}
                    style={{ background: Zinc950, border: `1px solid ${Zinc800}`, borderRadius: '10px', padding: '8px 10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer' }}
                  >
                    <span style={{ fontSize: '0.68rem', color: Zinc300 }}>Tanque Cheio (Calcular Média):</span>
                    <strong style={{ fontSize: '0.68rem', color: tanqueCheio ? Emerald400 : Zinc500 }}>{tanqueCheio ? 'SIM' : 'NÃO'}</strong>
                  </div>

                  <button
                    onClick={handleSalvarAbastecimento}
                    style={{ background: Crimson600, color: '#fff', border: 'none', borderRadius: '12px', padding: '11px', fontWeight: 800, cursor: 'pointer', fontSize: '0.8rem' }}
                  >
                    Confirmar Abastecimento
                  </button>
                </div>
              )}

              {/* MODAL 2: NOVA MANUTENÇÃO */}
              {modalAberto === 'novaManut' && (
                <div style={{
                  position: 'absolute',
                  left: 0,
                  right: 0,
                  bottom: 0,
                  background: Zinc900,
                  borderTopLeftRadius: '24px',
                  borderTopRightRadius: '24px',
                  borderTop: `2px solid ${Sky400}`,
                  padding: '16px 16px 24px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '10px',
                  zIndex: 90,
                  boxShadow: '0 -10px 40px rgba(0,0,0,0.85)'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h4 style={{ color: Zinc50, fontSize: '0.95rem', margin: 0, display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <Wrench size={17} color={Sky400} /> Registrar Manutenção
                    </h4>
                    <X size={18} color={Zinc400} style={{ cursor: 'pointer' }} onClick={() => setModalAberto(null)} />
                  </div>

                  <input
                    type="text"
                    value={manutDesc}
                    onChange={(e) => setManutDesc(e.target.value)}
                    placeholder="Descrição do Serviço ou Peça"
                    style={{ background: Zinc950, border: `1px solid ${Zinc800}`, borderRadius: '10px', padding: '9px', color: '#fff', fontSize: '0.75rem' }}
                  />

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                    <input
                      type="number"
                      value={manutPecas}
                      onChange={(e) => setManutPecas(e.target.value)}
                      placeholder="Valor Peças R$"
                      style={{ background: Zinc950, border: `1px solid ${Zinc800}`, borderRadius: '10px', padding: '9px', color: '#fff', fontSize: '0.75rem' }}
                    />
                    <input
                      type="number"
                      value={manutMaoObra}
                      onChange={(e) => setManutMaoObra(e.target.value)}
                      placeholder="Mão de Obra R$"
                      style={{ background: Zinc950, border: `1px solid ${Zinc800}`, borderRadius: '10px', padding: '9px', color: '#fff', fontSize: '0.75rem' }}
                    />
                  </div>

                  <button
                    onClick={handleSalvarManutencao}
                    style={{ background: Sky400, color: Zinc950, border: 'none', borderRadius: '12px', padding: '11px', fontWeight: 800, cursor: 'pointer', fontSize: '0.8rem' }}
                  >
                    Salvar na Garagem
                  </button>
                </div>
              )}

              {/* MODAL 3: MECÂNICO IA GEMINI */}
              {modalAberto === 'chatGemini' && (
                <div style={{
                  position: 'absolute',
                  left: 0,
                  right: 0,
                  bottom: 0,
                  top: '115px',
                  background: Zinc950,
                  borderTopLeftRadius: '24px',
                  borderTopRightRadius: '24px',
                  borderTop: `2px solid ${Crimson600}`,
                  padding: '16px',
                  display: 'flex',
                  flexDirection: 'column',
                  zIndex: 95,
                  boxShadow: '0 -10px 40px rgba(0,0,0,0.9)'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: `1px solid ${Zinc850}`, paddingBottom: '8px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <div style={{ width: '28px', height: '28px', borderRadius: '8px', background: 'rgba(225,29,72,0.2)', border: `1px solid ${Crimson600}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Sparkles size={14} color={Crimson500} />
                      </div>
                      <div>
                        <div style={{ fontSize: '0.8rem', fontWeight: 800, color: Zinc50 }}>Mecânico Virtual IA</div>
                        <div style={{ fontSize: '0.55rem', color: Emerald500 }}>● Online via Gemini SDK</div>
                      </div>
                    </div>
                    <X size={18} color={Zinc400} style={{ cursor: 'pointer' }} onClick={() => setModalAberto(null)} />
                  </div>

                  <div style={{ flex: 1, overflowY: 'auto', padding: '10px 0', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {chatMensagens.map((m, idx) => (
                      <div
                        key={idx}
                        style={{
                          alignSelf: m.remetente === 'user' ? 'flex-end' : 'flex-start',
                          background: m.remetente === 'user' ? Crimson600 : Zinc900,
                          color: Zinc50,
                          border: m.remetente === 'user' ? 'none' : `1px solid ${Zinc800}`,
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

                  <div style={{ display: 'flex', gap: '6px', paddingTop: '8px', borderTop: `1px solid ${Zinc850}` }}>
                    <input
                      type="text"
                      value={chatTexto}
                      onChange={(e) => setChatTexto(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleEnviarMensagemChat()}
                      placeholder="Descreva o barulho ou dúvida..."
                      style={{ flex: 1, background: Zinc900, border: `1px solid ${Zinc800}`, borderRadius: '10px', padding: '8px 10px', color: '#fff', fontSize: '0.72rem' }}
                    />
                    <button
                      onClick={handleEnviarMensagemChat}
                      style={{ background: Crimson600, color: '#fff', border: 'none', borderRadius: '10px', padding: '8px 12px', cursor: 'pointer' }}
                    >
                      <Send size={14} />
                    </button>
                  </div>
                </div>
              )}

              {/* MODAL 4: ACTION SHEET GERAL */}
              {modalAberto === 'sheetAcoes' && (
                <div style={{
                  position: 'absolute',
                  left: 0,
                  right: 0,
                  bottom: 0,
                  background: Zinc900,
                  borderTopLeftRadius: '24px',
                  borderTopRightRadius: '24px',
                  borderTop: `2px solid ${Crimson600}`,
                  padding: '18px 16px 26px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '10px',
                  zIndex: 90
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h4 style={{ color: Zinc50, fontSize: '0.95rem', margin: 0 }}>Ações Rápidas</h4>
                    <X size={18} color={Zinc400} style={{ cursor: 'pointer' }} onClick={() => setModalAberto(null)} />
                  </div>

                  <div
                    onClick={() => setModalAberto('novoAbast')}
                    style={{ background: Zinc950, border: `1px solid ${Zinc800}`, borderRadius: '14px', padding: '10px', display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}
                  >
                    <div style={{ width: '34px', height: '34px', borderRadius: '10px', background: 'rgba(245,158,11,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Fuel size={17} color={Amber400} />
                    </div>
                    <div>
                      <div style={{ fontSize: '0.78rem', fontWeight: 800, color: Zinc50 }}>Novo Abastecimento</div>
                      <div style={{ fontSize: '0.6rem', color: Zinc400 }}>Litros, leitura da bomba e média km/L</div>
                    </div>
                  </div>

                  <div
                    onClick={() => setModalAberto('novaManut')}
                    style={{ background: Zinc950, border: `1px solid ${Zinc800}`, borderRadius: '14px', padding: '10px', display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}
                  >
                    <div style={{ width: '34px', height: '34px', borderRadius: '10px', background: 'rgba(14,165,233,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Wrench size={17} color={Sky400} />
                    </div>
                    <div>
                      <div style={{ fontSize: '0.78rem', fontWeight: 800, color: Zinc50 }}>Nova Manutenção</div>
                      <div style={{ fontSize: '0.6rem', color: Zinc400 }}>Óleo, pneus, pastilhas e cupons fiscais</div>
                    </div>
                  </div>

                  <div
                    onClick={() => setModalAberto('chatGemini')}
                    style={{ background: Zinc950, border: `1px solid ${Zinc800}`, borderRadius: '14px', padding: '10px', display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}
                  >
                    <div style={{ width: '34px', height: '34px', borderRadius: '10px', background: 'rgba(225,29,72,0.18)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Sparkles size={17} color={Crimson500} />
                    </div>
                    <div>
                      <div style={{ fontSize: '0.78rem', fontWeight: 800, color: Zinc50 }}>Consultar Mecânico IA</div>
                      <div style={{ fontSize: '0.6rem', color: Zinc400 }}>Diagnóstico inteligente com Google Gemini</div>
                    </div>
                  </div>
                </div>
              )}

              {/* 5. Floating Navigation Bar (Fiel ao MainActivity.kt - 5 Ações com Botão Central) */}
              <nav style={{
                position: 'absolute',
                bottom: '10px',
                left: '16px',
                right: '16px',
                background: 'rgba(24, 24, 27, 0.95)',
                backdropFilter: 'blur(16px)',
                border: `1px solid ${Zinc800}`,
                borderRadius: '24px',
                height: '56px',
                display: 'flex',
                justifyContent: 'space-around',
                alignItems: 'center',
                boxShadow: '0 10px 30px rgba(0,0,0,0.85)',
                zIndex: 80
              }}>
                <button
                  onClick={() => setRotaAtual('garagem')}
                  style={{ background: 'none', border: 'none', color: rotaAtual === 'garagem' ? Crimson600 : Zinc400, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2px', fontSize: '0.62rem', fontWeight: rotaAtual === 'garagem' ? 800 : 500, cursor: 'pointer' }}
                >
                  <Car size={18} /> Garagem
                </button>

                <button
                  onClick={() => setRotaAtual('financas')}
                  style={{ background: 'none', border: 'none', color: rotaAtual === 'financas' ? Crimson600 : Zinc400, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2px', fontSize: '0.62rem', fontWeight: rotaAtual === 'financas' ? 800 : 500, cursor: 'pointer' }}
                >
                  <TrendingUp size={18} /> Finanças
                </button>

                {/* Botão Central Command Mecânico IA */}
                <button
                  onClick={() => setModalAberto('chatGemini')}
                  style={{
                    width: '42px',
                    height: '42px',
                    borderRadius: '13px',
                    background: `linear-gradient(135deg, ${Crimson600}, ${Crimson500})`,
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
                  onClick={() => setModalAberto('sheetAcoes')}
                  style={{ background: 'none', border: 'none', color: Zinc400, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2px', fontSize: '0.62rem', cursor: 'pointer' }}
                >
                  <Plus size={18} /> Ações
                </button>

                <button
                  onClick={() => setRotaAtual('ajustes')}
                  style={{ background: 'none', border: 'none', color: rotaAtual === 'ajustes' ? Crimson600 : Zinc400, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2px', fontSize: '0.62rem', fontWeight: rotaAtual === 'ajustes' ? 800 : 500, cursor: 'pointer' }}
                >
                  <Settings size={18} /> Ajustes
                </button>
              </nav>
            </div>
          </div>
        </section>

        {/* Caixa de Feedback Híbrida */}
        <FeedbackSection appId="garagem" appName="Garagem App" corTema={Crimson600} />
      </main>
    </>
  );
};
