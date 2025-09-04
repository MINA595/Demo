-- Remove bio column from profiles table
alter table public.profiles drop column if exists bio;
