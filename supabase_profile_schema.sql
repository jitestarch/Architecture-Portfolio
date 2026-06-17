-- ==========================================
-- Supabase SQL Schema for Portfolio Profile Settings
-- ==========================================
-- Open your Supabase Dashboard, go to the SQL Editor, 
-- create a "New query", paste this code, and click "Run".

-- 1. Create the profile table
create table if not exists profile (
  id bigint primary key default 1,
  name text not null,
  description text not null,
  experience jsonb not null default '[]'::jsonb,
  academic_projects jsonb not null default '[]'::jsonb,
  software_suite jsonb not null default '[]'::jsonb,
  competitions jsonb not null default '[]'::jsonb,
  languages jsonb not null default '[]'::jsonb,
  portfolio_pdf_url text,
  flipbook_url text,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
  constraint one_row check (id = 1) -- Ensure only one profile row exists
);

-- 2. Enable Row Level Security (RLS) so public users can't write to your DB
alter table profile enable row level security;

-- 3. Create RLS Policies
-- Allow anyone (public) to view your profile details
create policy "Allow public read access on profile" on profile
  for select using (true);

-- 4. Grant Table Privileges
-- This ensures the admin client using service_role has privileges to perform write operations,
-- and public users/authenticated users have read access.
grant all privileges on table profile to service_role;
grant all privileges on table profile to postgres;
grant select on table profile to anon, authenticated;

-- 5. Insert initial portfolio data to seed the database
insert into profile (id, name, description, experience, academic_projects, software_suite, competitions, languages, portfolio_pdf_url)
values (
  1,
  'Jitesh SA',
  'Student at SRM School of Environment Architecture and Design (SEAD), Ramapuram, Chennai. Exploring the intersection of form, environment, and human spatial interaction.',
  '[{"desc": "Hands-on practice in design development, working drawings, 3D visualization, and site supervision.", "title": "Starchitect", "category": "Externship", "location": "Kaladipet, Chennai"}]'::jsonb,
  '[{"desc": "Exploration of form, scale, and spatial fundamentals", "title": "Basic Design", "category": "Foundation"}, {"desc": "Bespoke housing design and layouts", "title": "Villa Design", "category": "Residential"}, {"desc": "Educational and child-centric spaces", "title": "Primary & Nursery School Design", "category": "Institutional"}, {"desc": "Contextual design and community housing", "title": "Rurals", "category": "Rural Studies"}, {"desc": "Healthcare and cultural interaction spaces", "title": "Eye Hospital & Cultural Centre", "category": "Commercial"}, {"desc": "High-density commercial planning", "title": "Mall Design", "category": "Retail"}, {"desc": "Large-span structures and public routing", "title": "Stadium Design", "category": "Recreation"}, {"desc": "Revitalization and community masterplanning", "title": "Porur Lake Urban Design", "category": "Urban Design"}]'::jsonb,
  '["AUTOCAD", "SKETCHUP", "REVIT", "RHINO", "ENSCAPE", "D5 RENDER", "PHOTOSHOP", "ILLUSTRATOR", "INDESIGN", "PROCREATE"]'::jsonb,
  '[{"title": "SRM Saram Project Expo 2026", "subtitle": "Exhibition entry"}, {"title": "68th GSEN", "subtitle": "NASA India association work"}, {"title": "Jaipur Rugs Design", "subtitle": "Product design category"}, {"title": "ETHOS - Stadium Design", "subtitle": "National level submission"}]'::jsonb,
  '[{"lang": "TELUGU", "level": "Native"}, {"lang": "HINDI", "level": "Fluent"}, {"lang": "ENGLISH", "level": "Professional"}, {"lang": "TAMIL", "level": "Basic"}]'::jsonb,
  ''
)
on conflict (id) do nothing;
