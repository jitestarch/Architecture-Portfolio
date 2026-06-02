-- ==========================================
-- Supabase SQL Schema for Architecture Portfolio
-- ==========================================
-- Open your Supabase Dashboard, go to the SQL Editor, 
-- create a "New query", paste this code, and click "Run".

-- 1. Create the projects table
create table if not exists projects (
  id bigint generated always as identity primary key,
  slug text unique not null,
  title text not null,
  description text not null,
  "fullDescription" jsonb not null, -- Stores array of paragraphs
  category text not null,
  year text not null,
  location text not null,
  "heroImage" jsonb not null, -- { url, alt }
  gallery jsonb not null default '[]'::jsonb, -- Array of { url, alt }
  plans jsonb default '[]'::jsonb, -- Array of { url, alt, label }
  metrics jsonb default '{}'::jsonb, -- { area, status, client, team }
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 2. Enable Row Level Security (RLS) so public users can't write to your DB
alter table projects enable row level security;

-- 3. Create RLS Policies
-- Allow anyone (public) to view your projects
create policy "Allow public read access" on projects
  for select using (true);

-- 4. Grant Table Privileges
-- This ensures the admin client using service_role has privileges to perform write operations,
-- and public users/authenticated users have read access.
grant all privileges on table projects to service_role;
grant all privileges on table projects to postgres;
grant select on table projects to anon, authenticated;


