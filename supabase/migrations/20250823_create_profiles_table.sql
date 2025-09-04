-- Create profiles table to store user metadata (linked to auth.users)
create table if not exists public.profiles (
  id uuid references auth.users (id) on delete cascade primary key,
  email text,
  name text,
  bio text,
  updated_at timestamptz default now()
);

create index if not exists idx_profiles_email on public.profiles (email);
