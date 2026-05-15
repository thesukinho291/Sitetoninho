import { Instagram, Mail, MapPin, Phone } from 'lucide-react';
import { Section } from '../components/Section';
import { useData } from '../contexts/DataContext';

export function ContactPage() {
  const { settings } = useData();
  return (
    <Section className="bg-white" eyebrow="Contato" title="Canais oficiais" subtitle="Use os canais oficiais para acompanhar o mandato, enviar mensagens e conferir as atualizações da equipe.">
      <div className="grid gap-5 md:grid-cols-2">
        <ContactCard icon={<Instagram />} label="Instagram oficial" value="@toninho_corredor" href={settings.instagram_url} />
        {settings.email && <ContactCard icon={<Mail />} label="E-mail" value={settings.email} href={`mailto:${settings.email}`} />}
        {settings.phone && <ContactCard icon={<Phone />} label="Telefone" value={settings.phone} href={`tel:${settings.phone}`} />}
        {settings.office_location && <ContactCard icon={<MapPin />} label="Endereço/localização" value={settings.office_location} />}
      </div>
      <div className="mt-8 rounded-lg bg-civic-ink p-6 text-white shadow-soft">
        <h2 className="text-2xl font-black">Precisa de atendimento do gabinete?</h2>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-200">Para solicitações com data, horário e assunto definidos, use a página de agendamento. Assim a equipe recebe as informações de forma organizada.</p>
      </div>
    </Section>
  );
}

function ContactCard({ icon, label, value, href }: { icon: React.ReactNode; label: string; value: string; href?: string }) {
  const content = (
    <div className="flex items-center gap-4 rounded-lg border border-slate-200 bg-slate-50 p-6 transition hover:border-civic-blue/40 hover:bg-white hover:shadow-sm">
      <span className="grid h-12 w-12 shrink-0 place-items-center rounded-lg bg-civic-blue text-white">{icon}</span>
      <div className="min-w-0">
        <p className="text-sm font-bold uppercase tracking-wide text-slate-500">{label}</p>
        <p className="mt-1 break-words font-black text-civic-ink">{value}</p>
      </div>
    </div>
  );
  return href ? <a href={href} target={href.startsWith('http') ? '_blank' : undefined} rel="noreferrer">{content}</a> : content;
}
