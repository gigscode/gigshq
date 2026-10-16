create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  role text,
  portfolio_url text,
  skills text[] not null default '{}'::text[],
  created_at timestamptz not null default now()
);

alter table public.profiles
  add column if not exists full_name text,
  add column if not exists role text,
  add column if not exists portfolio_url text,
  add column if not exists skills text[] not null default '{}'::text[],
  add column if not exists created_at timestamptz not null default now();

alter table public.profiles enable row level security;

revoke all on public.profiles from anon;
grant select on public.profiles to authenticated;

drop policy if exists "Users can view own profile" on public.profiles;
create policy "Users can view own profile"
  on public.profiles
  for select
  to authenticated
  using ((select auth.uid()) = id);

create or replace function public.handle_new_auth_user_profile()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  insert into public.profiles (id, full_name)
  values (new.id, nullif(new.raw_user_meta_data ->> 'full_name', ''))
  on conflict (id) do nothing;

  return new;
end;
$$;

drop trigger if exists on_auth_user_created_create_profile on auth.users;
create trigger on_auth_user_created_create_profile
  after insert on auth.users
  for each row
  execute function public.handle_new_auth_user_profile();

insert into public.profiles (id, full_name)
select
  users.id,
  nullif(users.raw_user_meta_data ->> 'full_name', '')
from auth.users as users
on conflict (id) do nothing;
