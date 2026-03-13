/*
  # Create belief map entries table

  1. New Tables
    - `belief_map_entries`
      - `id` (uuid, primary key)
      - `name` (text, required)
      - `email` (text, unique, required)
      - `category_of_ownership` (text, optional)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on belief_map_entries table
    - Add policies for anonymous users to insert and read entries

  3. Indexes
    - Email index for fast lookups
    - Created_at index for sorting
*/

CREATE TABLE IF NOT EXISTS belief_map_entries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text UNIQUE NOT NULL,
  category_of_ownership text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS belief_map_entries_email_idx ON belief_map_entries(email);
CREATE INDEX IF NOT EXISTS belief_map_entries_created_at_idx ON belief_map_entries(created_at);

-- Create or replace the update function for belief map entries
CREATE OR REPLACE FUNCTION update_belief_map_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger for updated_at
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.triggers 
    WHERE trigger_name = 'update_belief_map_entries_updated_at'
  ) THEN
    CREATE TRIGGER update_belief_map_entries_updated_at
      BEFORE UPDATE ON belief_map_entries
      FOR EACH ROW EXECUTE FUNCTION update_belief_map_updated_at_column();
  END IF;
END $$;

-- Enable Row Level Security
ALTER TABLE belief_map_entries ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for belief_map_entries
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'belief_map_entries' 
    AND policyname = 'Belief map entries are viewable by anyone'
  ) THEN
    CREATE POLICY "Belief map entries are viewable by anyone"
      ON belief_map_entries
      FOR SELECT
      TO anon
      USING (true);
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'belief_map_entries' 
    AND policyname = 'Anyone can insert belief map entries'
  ) THEN
    CREATE POLICY "Anyone can insert belief map entries"
      ON belief_map_entries
      FOR INSERT
      TO anon
      WITH CHECK (true);
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'belief_map_entries' 
    AND policyname = 'Anyone can update belief map entries'
  ) THEN
    CREATE POLICY "Anyone can update belief map entries"
      ON belief_map_entries
      FOR UPDATE
      TO anon
      USING (true);
  END IF;
END $$;