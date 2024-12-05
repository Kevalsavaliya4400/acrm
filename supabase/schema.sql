-- Create leads table
create table leads (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  email text not null,
  phone text not null,
  status text not null check (status in ('new', 'contacted', 'qualified', 'proposal', 'negotiation', 'closed')),
  source text not null,
  notes text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  last_contact timestamp with time zone default timezone('utc'::text, now()) not null,
  next_followup timestamp with time zone default timezone('utc'::text, now()) not null,
  property_interest text,
  budget numeric,
  location text
);

-- Create conversations table
create table conversations (
  id uuid default gen_random_uuid() primary key,
  lead_id uuid references leads(id) on delete cascade not null,
  date timestamp with time zone default timezone('utc'::text, now()) not null,
  type text not null check (type in ('call', 'email', 'meeting')),
  notes text not null,
  outcome text not null
);

-- Create indexes for better query performance
create index leads_status_idx on leads(status);
create index leads_created_at_idx on leads(created_at);
create index leads_location_idx on leads(location);
create index conversations_lead_id_idx on conversations(lead_id);
create index conversations_date_idx on conversations(date);

-- Enable Row Level Security (RLS)
alter table leads enable row level security;
alter table conversations enable row level security;

-- Create policies
create policy "Enable read access for all users" on leads
  for select using (true);

create policy "Enable insert access for all users" on leads
  for insert with check (true);

create policy "Enable update access for all users" on leads
  for update using (true);

create policy "Enable read access for all users" on conversations
  for select using (true);

create policy "Enable insert access for all users" on conversations
  for insert with check (true);

create policy "Enable update access for all users" on conversations
  for update using (true);

create policy "Enable delete access for all users" on conversations
  for delete using (true);