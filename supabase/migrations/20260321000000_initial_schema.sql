-- Enable Extensions
create extension if not exists "uuid-ossp";

-- Custom Types
create type privacy_level as enum ('public', 'friends', 'friends_of_friends', 'private');
create type friendship_status as enum ('pending', 'accepted', 'rejected');
create type book_status as enum ('draft', 'published');

-- Profiles Table (Orkut Style)
create table profiles (
  id uuid references auth.users on delete cascade primary key,
  username text unique not null,
  full_name text,
  avatar_url text,
  status text default 'Escrevendo histórias...',
  theme_song text,
  privacy_level privacy_level default 'public',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Friendships Table
create table friendships (
  id uuid default uuid_generate_v4() primary key,
  requester_id uuid references profiles(id) on delete cascade not null,
  receiver_id uuid references profiles(id) on delete cascade not null,
  status friendship_status default 'pending',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  unique(requester_id, receiver_id)
);

-- Diary Entries Table
create table entries (
  id uuid default uuid_generate_v4() primary key,
  author_id uuid references profiles(id) on delete cascade not null,
  title text not null,
  content text, -- or jsonb for rich text
  mood text,
  theme_config jsonb, -- music, colors, fonts for the day
  visibility privacy_level default 'friends',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Books Table (Book Lab)
create table books (
  id uuid default uuid_generate_v4() primary key,
  author_id uuid references profiles(id) on delete cascade not null,
  title text not null,
  description text,
  content jsonb, -- compiled version or editor state
  status book_status default 'draft',
  theme_category text,
  rating decimal default 0,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  published_at timestamp with time zone
);

-- RLS (Row Level Security) - Simplified for start
alter table profiles enable row level security;
alter table friendships enable row level security;
alter table entries enable row level security;
alter table books enable row level security;

-- Basic Policies
create policy "Public profiles are viewable by everyone." on profiles
  for select using (true);

create policy "Users can update own profile." on profiles
  for update using (auth.uid() = id);

-- ... more complex privacy policies will be added later
