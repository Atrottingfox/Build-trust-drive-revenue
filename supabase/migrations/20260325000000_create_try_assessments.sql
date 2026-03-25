-- Try page diagnostic assessments
create table if not exists try_assessments (
  id uuid primary key default gen_random_uuid(),
  archetype text not null,
  archetype_scores jsonb not null default '{}',
  archetype_method text not null default 'quiz_8',
  quiz_responses jsonb default '{}',
  industry text,
  problem_area text,
  platforms text[] default '{}',
  posting_frequency text,
  phone text,
  team_size text,
  content_role text,
  generated_cadence jsonb,
  calendly_booked boolean not null default false,
  sms_sent boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Auto-update updated_at
create or replace function update_try_assessments_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger try_assessments_updated_at
  before update on try_assessments
  for each row
  execute function update_try_assessments_updated_at();

-- Index on phone for lookups
create index idx_try_assessments_phone on try_assessments(phone);
create index idx_try_assessments_created_at on try_assessments(created_at desc);
