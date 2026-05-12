insert into public.newspaper_editions
  (title, description, edition_date, cover_url, pdf_url, categories, status)
values
  (
    'Jornal Atleta Cidadão - Esporte e Cidadania',
    'Edição especial com ações do mandato, esporte nos bairros e iniciativas sociais ligadas ao Instituto Atleta Cidadão.',
    '2026-04-20',
    '/images/jornal/jornal-capa.jpg',
    '#',
    array['esporte', 'cidadania', 'bairros'],
    'publicado'
  ),
  (
    'Atleta Cidadão nos bairros',
    'Histórias de jovens, famílias atendidas e projetos que aproximam esporte e comunidade.',
    '2026-03-18',
    '/images/acoes/atleta-cidadao.jpg',
    '#',
    array['ações sociais', 'juventude', 'eventos'],
    'publicado'
  );

with action_one as (
  insert into public.social_actions
    (title, description, action_date, location, category, status)
  values
    (
      'Corrida Solidária Atleta Cidadão',
      'Evento esportivo com famílias, atletas e moradores, fortalecendo a inclusão social por meio da corrida.',
      '2026-04-12',
      'Zona Norte de Sorocaba',
      'esporte',
      'publicado'
    )
  returning id
),
action_two as (
  insert into public.social_actions
    (title, description, action_date, location, category, status)
  values
    (
      'Atendimento próximo dos bairros',
      'Escuta da população, levantamento de demandas e encaminhamento de pedidos ligados a saúde, esporte e zeladoria.',
      '2026-03-28',
      'Habiteto',
      'bairros',
      'publicado'
    )
  returning id
)
insert into public.gallery_images (social_action_id, image_url, sort_order)
select id, '/images/acoes/atleta-cidadao.jpg', 1 from action_one
union all
select id, '/images/acoes/acao-social.jpg', 2 from action_one
union all
select id, '/images/acoes/bairro.jpg', 1 from action_two;
