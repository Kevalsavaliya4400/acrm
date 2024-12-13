-- Create auth schema if it doesn't exist
create schema if not exists auth;

-- Drop existing tables to recreate with proper schema
drop table if exists leads cascade;
drop table if exists conversations cascade;
drop table if exists lead_sources cascade;
drop table if exists notifications cascade;

-- Create leads table with user_id
create table leads (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id) not null,
  name text not null,
  email text not null,
  phone text not null,
  status text not null check (status in ('new', 'contacted', 'qualified', 'proposal', 'negotiation', 'closed', 'deleted')),
  source text not null,
  notes text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  last_contact timestamp with time zone default timezone('utc'::text, now()) not null,
  next_followup timestamp with time zone default timezone('utc'::text, now()) not null,
  property_interest text,
  budget numeric,
  location text,
  deleted_at timestamp with time zone
);

-- Create conversations table with user_id
create table conversations (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id) not null,
  lead_id uuid references leads(id) on delete cascade not null,
  date timestamp with time zone default timezone('utc'::text, now()) not null,
  type text not null check (type in ('call', 'email', 'meeting')),
  notes text not null,
  outcome text not null
);

-- Create lead_sources table with user_id
create table lead_sources (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id) not null,
  name text not null,
  icon text not null,
  color text not null,
  is_active boolean default true,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create notifications table with user_id
create table notifications (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id) not null,
  type text not null check (type in ('lead_due', 'lead_overdue', 'analytics', 'system')),
  title text not null,
  message text not null,
  timestamp timestamp with time zone default timezone('utc'::text, now()) not null,
  is_read boolean default false,
  data jsonb
);

-- Create indexes
create index leads_user_id_idx on leads(user_id);
create index leads_status_idx on leads(status);
create index leads_created_at_idx on leads(created_at);
create index leads_deleted_at_idx on leads(deleted_at);

create index conversations_user_id_idx on conversations(user_id);
create index conversations_lead_id_idx on conversations(lead_id);
create index conversations_date_idx on conversations(date);

create index lead_sources_user_id_idx on lead_sources(user_id);
create index lead_sources_name_idx on lead_sources(name);

create index notifications_user_id_idx on notifications(user_id);
create index notifications_timestamp_idx on notifications(timestamp);
create index notifications_is_read_idx on notifications(is_read);

-- Enable Row Level Security
alter table leads enable row level security;
alter table conversations enable row level security;
alter table lead_sources enable row level security;
alter table notifications enable row level security;

-- Create RLS policies
create policy "Users can view their own leads"
  on leads for select
  using (auth.uid() = user_id);

create policy "Users can insert their own leads"
  on leads for insert
  with check (auth.uid() = user_id);

create policy "Users can update their own leads"
  on leads for update
  using (auth.uid() = user_id);

create policy "Users can delete their own leads"
  on leads for delete
  using (auth.uid() = user_id);

create policy "Users can view their own conversations"
  on conversations for select
  using (auth.uid() = user_id);

create policy "Users can insert their own conversations"
  on conversations for insert
  with check (auth.uid() = user_id);

create policy "Users can update their own conversations"
  on conversations for update
  using (auth.uid() = user_id);

create policy "Users can delete their own conversations"
  on conversations for delete
  using (auth.uid() = user_id);

create policy "Users can view their own lead sources"
  on lead_sources for select
  using (auth.uid() = user_id);

create policy "Users can insert their own lead sources"
  on lead_sources for insert
  with check (auth.uid() = user_id);

create policy "Users can update their own lead sources"
  on lead_sources for update
  using (auth.uid() = user_id);

create policy "Users can delete their own lead sources"
  on lead_sources for delete
  using (auth.uid() = user_id);

create policy "Users can view their own notifications"
  on notifications for select
  using (auth.uid() = user_id);

create policy "Users can update their own notifications"
  on notifications for update
  using (auth.uid() = user_id);