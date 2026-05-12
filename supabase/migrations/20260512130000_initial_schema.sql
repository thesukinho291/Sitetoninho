create extension if not exists "pgcrypto";
create schema if not exists private;

create type appointment_status as enum (
  'aguardando contato',
  'em contato',
  'confirmado',
  'compareceu',
  'não compareceu',
  'cancelado'
);

create type publication_status as enum ('publicado', 'rascunho');

create table public.admin_profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  created_at timestamptz not null default now()
);

create table public.appointments (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  phone text not null,
  neighborhood text not null,
  subject text not null,
  description text not null,
  appointment_date date not null,
  appointment_time text not null check (appointment_time in ('10:30', '13:30', '15:30')),
  status appointment_status not null default 'aguardando contato',
  consent boolean not null default false,
  created_at timestamptz not null default now(),
  constraint appointments_consent_required check (consent = true),
  constraint appointments_unique_slot unique (appointment_date, appointment_time)
);

create table public.appointment_slots (
  appointment_date date not null,
  appointment_time text not null check (appointment_time in ('10:30', '13:30', '15:30')),
  primary key (appointment_date, appointment_time)
);

create table public.newspaper_editions (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text not null,
  edition_date date not null,
  cover_url text not null,
  pdf_url text not null,
  categories text[] not null default '{}',
  status publication_status not null default 'rascunho',
  created_at timestamptz not null default now()
);

create table public.social_actions (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text not null,
  action_date date not null,
  location text not null,
  category text not null,
  status publication_status not null default 'rascunho',
  created_at timestamptz not null default now()
);

create table public.gallery_images (
  id uuid primary key default gen_random_uuid(),
  social_action_id uuid not null references public.social_actions(id) on delete cascade,
  image_url text not null,
  sort_order integer not null default 0,
  created_at timestamptz not null default now()
);

create table public.settings (
  id integer primary key default 1 check (id = 1),
  instagram_url text not null default 'https://www.instagram.com/toninho_corredor/',
  email text not null default '',
  phone text not null default '',
  office_location text not null default '',
  home_title text not null default 'Toninho Corredor',
  home_subtitle text not null default 'Esporte, cidadania e compromisso com Sorocaba',
  home_image_url text not null default '/images/acoes/atleta-cidadao.jpg',
  appointment_success_message text not null default 'agendamento enviado com sucesso. nossa equipe entrará em contato para confirmar o atendimento e passar a localização do gabinete.',
  updated_at timestamptz not null default now()
);

insert into public.settings (id) values (1) on conflict (id) do nothing;

create index appointments_date_idx on public.appointments (appointment_date);
create index appointments_status_idx on public.appointments (status);
create index appointments_subject_idx on public.appointments (subject);
create index newspaper_status_date_idx on public.newspaper_editions (status, edition_date desc);
create index social_actions_status_date_idx on public.social_actions (status, action_date desc);

alter table public.admin_profiles enable row level security;
alter table public.appointments enable row level security;
alter table public.appointment_slots enable row level security;
alter table public.newspaper_editions enable row level security;
alter table public.social_actions enable row level security;
alter table public.gallery_images enable row level security;
alter table public.settings enable row level security;

create or replace function private.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public, private
as $$
  select exists (
    select 1 from public.admin_profiles
    where id = auth.uid()
  );
$$;

revoke all on function private.is_admin() from public;
grant usage on schema private to authenticated;
grant execute on function private.is_admin() to authenticated;

create or replace function private.sync_appointment_slot()
returns trigger
language plpgsql
security definer
set search_path = public, private
as $$
begin
  if tg_op in ('UPDATE', 'DELETE') then
    delete from public.appointment_slots
    where appointment_date = old.appointment_date
      and appointment_time = old.appointment_time;
  end if;

  if tg_op in ('INSERT', 'UPDATE') and new.status <> 'cancelado' then
    insert into public.appointment_slots (appointment_date, appointment_time)
    values (new.appointment_date, new.appointment_time)
    on conflict do nothing;
  end if;

  if tg_op = 'DELETE' then
    return old;
  end if;
  return new;
end;
$$;

create trigger appointments_sync_slot
after insert or update or delete on public.appointments
for each row execute function private.sync_appointment_slot();

create policy "admins can read admin profiles"
on public.admin_profiles for select
to authenticated
using (private.is_admin());

create policy "admins can manage admin profiles"
on public.admin_profiles for all
to authenticated
using (private.is_admin())
with check (private.is_admin());

create policy "public can create appointment requests"
on public.appointments for insert
to anon, authenticated
with check (
  consent = true
  and status = 'aguardando contato'
  and appointment_time in ('10:30', '13:30', '15:30')
  and appointment_date >= current_date
);

create policy "public can read occupied slots"
on public.appointment_slots for select
to anon, authenticated
using (appointment_date >= current_date);

create policy "admins can read appointments"
on public.appointments for select
to authenticated
using (private.is_admin());

create policy "admins can update appointments"
on public.appointments for update
to authenticated
using (private.is_admin())
with check (private.is_admin());

create policy "admins can delete appointments"
on public.appointments for delete
to authenticated
using (private.is_admin());

create policy "public can read published newspapers"
on public.newspaper_editions for select
to anon, authenticated
using (status = 'publicado');

create policy "admins can manage newspapers"
on public.newspaper_editions for all
to authenticated
using (private.is_admin())
with check (private.is_admin());

create policy "public can read published actions"
on public.social_actions for select
to anon, authenticated
using (status = 'publicado');

create policy "admins can manage actions"
on public.social_actions for all
to authenticated
using (private.is_admin())
with check (private.is_admin());

create policy "public can read gallery of published actions"
on public.gallery_images for select
to anon, authenticated
using (
  exists (
    select 1 from public.social_actions
    where social_actions.id = gallery_images.social_action_id
    and social_actions.status = 'publicado'
  )
);

create policy "admins can manage gallery"
on public.gallery_images for all
to authenticated
using (private.is_admin())
with check (private.is_admin());

create policy "public can read settings"
on public.settings for select
to anon, authenticated
using (true);

create policy "admins can update settings"
on public.settings for all
to authenticated
using (private.is_admin())
with check (private.is_admin());

insert into storage.buckets (id, name, public)
values
  ('newspaper-covers', 'newspaper-covers', true),
  ('newspaper-pdfs', 'newspaper-pdfs', true),
  ('social-action-images', 'social-action-images', true),
  ('site-assets', 'site-assets', true)
on conflict (id) do nothing;

create policy "public can read public buckets"
on storage.objects for select
to anon, authenticated
using (bucket_id in ('newspaper-covers', 'newspaper-pdfs', 'social-action-images', 'site-assets'));

create policy "admins can upload public assets"
on storage.objects for insert
to authenticated
with check (private.is_admin() and bucket_id in ('newspaper-covers', 'newspaper-pdfs', 'social-action-images', 'site-assets'));

create policy "admins can update public assets"
on storage.objects for update
to authenticated
using (private.is_admin() and bucket_id in ('newspaper-covers', 'newspaper-pdfs', 'social-action-images', 'site-assets'))
with check (private.is_admin() and bucket_id in ('newspaper-covers', 'newspaper-pdfs', 'social-action-images', 'site-assets'));

create policy "admins can delete public assets"
on storage.objects for delete
to authenticated
using (private.is_admin() and bucket_id in ('newspaper-covers', 'newspaper-pdfs', 'social-action-images', 'site-assets'));
