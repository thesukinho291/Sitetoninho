export type AppointmentStatus =
  | 'aguardando contato'
  | 'em contato'
  | 'confirmado'
  | 'compareceu'
  | 'não compareceu'
  | 'cancelado';

export type Category =
  | 'esporte'
  | 'cidadania'
  | 'ações sociais'
  | 'bairros'
  | 'saúde'
  | 'juventude'
  | 'eventos';

export type Appointment = {
  id: string;
  full_name: string;
  phone: string;
  neighborhood: string;
  subject: string;
  description: string;
  appointment_date: string;
  appointment_time: string;
  status: AppointmentStatus;
  consent: boolean;
  created_at: string;
};

export type NewspaperEdition = {
  id: string;
  title: string;
  description: string;
  edition_date: string;
  cover_url: string;
  pdf_url: string;
  categories: Category[];
  status: 'publicado' | 'rascunho';
  created_at: string;
};

export type SocialAction = {
  id: string;
  title: string;
  description: string;
  action_date: string;
  location: string;
  category: Category;
  image_urls: string[];
  status: 'publicado' | 'rascunho';
  created_at: string;
};

export type SiteSettings = {
  instagram_url: string;
  email: string;
  phone: string;
  office_location: string;
  home_title: string;
  home_subtitle: string;
  home_image_url: string;
  appointment_success_message: string;
};

export type DashboardStats = {
  totalAppointments: number;
  todayAppointments: number;
  weekAppointments: number;
  pendingAppointments: number;
  confirmedAppointments: number;
  newspaperCount: number;
  socialActionsCount: number;
};
