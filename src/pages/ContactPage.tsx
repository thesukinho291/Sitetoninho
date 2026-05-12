import { Instagram, Mail, MapPin, Phone } from 'lucide-react';
import { Section } from '../components/Section';
import { useData } from '../contexts/DataContext';

export function ContactPage() {
  const { settings } = useData();
  return (
    <Section className="bg-white" eyebrow="Contato" title="Canais oficiais" subtitle="As informações de contato aparecem aqui apenas quando estiverem configuradas pela equipe.">
      <div className="grid gap-5 md:grid-cols-2">
        <ContactCard icon={<Instagram />} label="Instagram oficial" value="@toninho_corredor" href={settings.instagram_url} />
        {settings.email && <ContactCard icon={<Mail />} label="E-mail" value={settings.email} href={`mailto:${settings.email}`} />}
        {settings.phone && <ContactCard icon={<Phone />} label="Telefone" value={settings.phone} href={`tel:${settings.phone}`} />}
        {settings.office_location && <ContactCard icon={<MapPin />} label="Endereço/localização" value={settings.office_location} />}
      </div>
    </Section>
  );
}

function ContactCard({ icon, label, value, href }: { icon: React.ReactNode; label: string; value: string; href?: string }) {
  const content = (
    <div className="flex items-center gap-4 rounded-lg border border-slate-200 bg-slate-50 p-6">
      <span className="grid h-12 w-12 place-items-center rounded-lg bg-civic-blue text-white">{icon}</span>
      <div>
        <p className="text-sm font-bold uppercase tracking-wide text-slate-500">{label}</p>
        <p className="mt-1 font-black text-civic-ink">{value}</p>
      </div>
    </div>
  );
  return href ? <a href={href} target={href.startsWith('http') ? '_blank' : undefined} rel="noreferrer">{content}</a> : content;
}
