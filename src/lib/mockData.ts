import { Appointment, NewspaperEdition, SiteSettings, SocialAction } from '../types';
import { SUCCESS_MESSAGE } from './constants';

export const imageBank = {
  toninhoTribuna: '/images/toninho/toninho-microfone.webp',
  heroComunidade: '/images/acoes/hero-comunidade.webp',
  corrida: '/images/acoes/atleta-cidadao.webp',
  instituto: '/images/acoes/atleta-cidadao.webp',
  acao: '/images/acoes/acao-social.webp',
  jornal: '/images/jornal/jornal-capa.webp',
  bairro: '/images/acoes/bairro.webp',
};

export const defaultSettings: SiteSettings = {
  instagram_url: 'https://www.instagram.com/toninho_corredor/',
  email: '',
  phone: '',
  office_location: '',
  home_title: 'Toninho Corredor',
  home_subtitle: 'Esporte, cidadania e compromisso com Sorocaba',
  home_image_url: imageBank.heroComunidade,
  appointment_success_message: SUCCESS_MESSAGE,
};

export const mockNewspapers: NewspaperEdition[] = [
  {
    id: 'jornal-1',
    title: 'Jornal Atleta Cidadão - Esporte e Cidadania',
    description:
      'Edição especial com ações do mandato, esporte nos bairros e iniciativas sociais ligadas ao Instituto Atleta Cidadão.',
    edition_date: '2026-04-20',
    cover_url: imageBank.jornal,
    pdf_url: '#',
    categories: ['esporte', 'cidadania', 'bairros'],
    status: 'publicado',
    created_at: new Date().toISOString(),
  },
  {
    id: 'jornal-2',
    title: 'Atleta Cidadão nos bairros',
    description:
      'Histórias de jovens, famílias atendidas e projetos que aproximam esporte e comunidade.',
    edition_date: '2026-03-18',
    cover_url: imageBank.corrida,
    pdf_url: '#',
    categories: ['ações sociais', 'juventude', 'eventos'],
    status: 'publicado',
    created_at: new Date().toISOString(),
  },
];

export const mockActions: SocialAction[] = [
  {
    id: 'acao-1',
    title: 'Corrida Solidária Atleta Cidadão',
    description:
      'Evento esportivo com famílias, atletas e moradores, fortalecendo a inclusão social por meio da corrida.',
    action_date: '2026-04-12',
    location: 'Zona Norte de Sorocaba',
    category: 'esporte',
    image_urls: [imageBank.corrida, imageBank.instituto, imageBank.acao],
    status: 'publicado',
    created_at: new Date().toISOString(),
  },
  {
    id: 'acao-2',
    title: 'Atendimento próximo dos bairros',
    description:
      'Escuta da população, levantamento de demandas e encaminhamento de pedidos ligados a saúde, esporte e zeladoria.',
    action_date: '2026-03-28',
    location: 'Habiteto',
    category: 'bairros',
    image_urls: [imageBank.acao, imageBank.bairro],
    status: 'publicado',
    created_at: new Date().toISOString(),
  },
  {
    id: 'acao-3',
    title: 'Projeto social com crianças e jovens',
    description:
      'Treinos, cidadania e convivência para abrir caminhos a crianças e adolescentes por meio do esporte.',
    action_date: '2026-02-18',
    location: 'Instituto Atleta Cidadão',
    category: 'juventude',
    image_urls: [imageBank.instituto, imageBank.corrida],
    status: 'publicado',
    created_at: new Date().toISOString(),
  },
  {
    id: 'acao-4',
    title: 'Saúde e qualidade de vida',
    description:
      'Conteúdo e ações que valorizam movimento, bem-estar e convivência comunitária, com linguagem simples para a população.',
    action_date: '2026-01-30',
    location: 'Sorocaba',
    category: 'saúde',
    image_urls: [imageBank.bairro, imageBank.instituto],
    status: 'publicado',
    created_at: new Date().toISOString(),
  },
];

export const mockAppointments: Appointment[] = [
  {
    id: 'ag-1',
    full_name: 'Maria Aparecida Santos',
    phone: '(15) 99999-0001',
    neighborhood: 'Habiteto',
    subject: 'Esporte no bairro',
    description: 'Pedido de apoio para melhorias em espaço esportivo.',
    appointment_date: new Date().toISOString().slice(0, 10),
    appointment_time: '10:30',
    status: 'aguardando contato',
    consent: true,
    created_at: new Date().toISOString(),
  },
  {
    id: 'ag-2',
    full_name: 'João Pereira',
    phone: '(15) 99999-0002',
    neighborhood: 'Vila Helena',
    subject: 'Ação social',
    description: 'Deseja apresentar demanda de famílias da região.',
    appointment_date: new Date(Date.now() + 86400000).toISOString().slice(0, 10),
    appointment_time: '13:30',
    status: 'confirmado',
    consent: true,
    created_at: new Date().toISOString(),
  },
];
