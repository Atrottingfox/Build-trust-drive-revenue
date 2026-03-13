/*
  # Create belief map system tables

  1. New Tables
    - `belief_map_entries`
      - `id` (uuid, primary key)
      - `name` (text, required)
      - `email` (text, unique, required)
      - `category_of_ownership` (text, optional)
      - `unique_offer` (text, optional)
      - `traits` (text, optional)
      - `interests` (text, optional)
      - `values` (text, optional)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
    
    - `belief_map_concepts`
      - `id` (uuid, primary key)
      - `belief_map_id` (uuid, foreign key to belief_map_entries)
      - `title` (text, required)
      - `description` (text, optional)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
    
    - `belief_map_messages`
      - `id` (uuid, primary key)
      - `concept_id` (uuid, foreign key to belief_map_concepts)
      - `message` (text, required)
      - `created_at` (timestamp)
    
    - `belief_map_content_ideas`
      - `id` (uuid, primary key)
      - `concept_id` (uuid, foreign key to belief_map_concepts)
      - `idea` (text, required)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on all tables
    - Add policies for anonymous users to read/write data
    - Add cascade delete for related records

  3. Indexes
    - Email index on belief_map_entries
    - Foreign key indexes for performance
    - Created_at indexes for sorting
*/

-- Create belief_map_entries table
CREATE TABLE IF NOT EXISTS belief_map_entries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text UNIQUE NOT NULL,
  category_of_ownership text,
  unique_offer text,
  traits text,
  interests text,
  values text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create belief_map_concepts table
CREATE TABLE IF NOT EXISTS belief_map_concepts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  belief_map_id uuid REFERENCES belief_map_entries(id) ON DELETE CASCADE,
  title text NOT NULL,
  description text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create belief_map_messages table
CREATE TABLE IF NOT EXISTS belief_map_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  concept_id uuid REFERENCES belief_map_concepts(id) ON DELETE CASCADE,
  message text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Create belief_map_content_ideas table
CREATE TABLE IF NOT EXISTS belief_map_content_ideas (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  concept_id uuid REFERENCES belief_map_concepts(id) ON DELETE CASCADE,
  idea text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS belief_map_entries_email_idx ON belief_map_entries(email);
CREATE INDEX IF NOT EXISTS belief_map_entries_created_at_idx ON belief_map_entries(created_at);
CREATE INDEX IF NOT EXISTS belief_map_concepts_belief_map_id_idx ON belief_map_concepts(belief_map_id);
CREATE INDEX IF NOT EXISTS belief_map_messages_concept_id_idx ON belief_map_messages(concept_id);
CREATE INDEX IF NOT EXISTS belief_map_content_ideas_concept_id_idx ON belief_map_content_ideas(concept_id);

-- Create or replace the update function for belief map tables
CREATE OR REPLACE FUNCTION update_belief_map_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at columns
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

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.triggers 
    WHERE trigger_name = 'update_belief_map_concepts_updated_at'
  ) THEN
    CREATE TRIGGER update_belief_map_concepts_updated_at
      BEFORE UPDATE ON belief_map_concepts
      FOR EACH ROW EXECUTE FUNCTION update_belief_map_updated_at_column();
  END IF;
END $$;

-- Enable Row Level Security
ALTER TABLE belief_map_entries ENABLE ROW LEVEL SECURITY;
ALTER TABLE belief_map_concepts ENABLE ROW LEVEL SECURITY;
ALTER TABLE belief_map_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE belief_map_content_ideas ENABLE ROW LEVEL SECURITY;

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

-- Create RLS policies for belief_map_concepts
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'belief_map_concepts' 
    AND policyname = 'Belief map concepts are viewable by anyone'
  ) THEN
    CREATE POLICY "Belief map concepts are viewable by anyone"
      ON belief_map_concepts
      FOR SELECT
      TO anon
      USING (true);
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'belief_map_concepts' 
    AND policyname = 'Anyone can insert belief map concepts'
  ) THEN
    CREATE POLICY "Anyone can insert belief map concepts"
      ON belief_map_concepts
      FOR INSERT
      TO anon
      WITH CHECK (true);
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'belief_map_concepts' 
    AND policyname = 'Anyone can update belief map concepts'
  ) THEN
    CREATE POLICY "Anyone can update belief map concepts"
      ON belief_map_concepts
      FOR UPDATE
      TO anon
      USING (true);
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'belief_map_concepts' 
    AND policyname = 'Anyone can delete belief map concepts'
  ) THEN
    CREATE POLICY "Anyone can delete belief map concepts"
      ON belief_map_concepts
      FOR DELETE
      TO anon
      USING (true);
  END IF;
END $$;

-- Create RLS policies for belief_map_messages
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'belief_map_messages' 
    AND policyname = 'Belief map messages are viewable by anyone'
  ) THEN
    CREATE POLICY "Belief map messages are viewable by anyone"
      ON belief_map_messages
      FOR SELECT
      TO anon
      USING (true);
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'belief_map_messages' 
    AND policyname = 'Anyone can insert belief map messages'
  ) THEN
    CREATE POLICY "Anyone can insert belief map messages"
      ON belief_map_messages
      FOR INSERT
      TO anon
      WITH CHECK (true);
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'belief_map_messages' 
    AND policyname = 'Anyone can update belief map messages'
  ) THEN
    CREATE POLICY "Anyone can update belief map messages"
      ON belief_map_messages
      FOR UPDATE
      TO anon
      USING (true);
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'belief_map_messages' 
    AND policyname = 'Anyone can delete belief map messages'
  ) THEN
    CREATE POLICY "Anyone can delete belief map messages"
      ON belief_map_messages
      FOR DELETE
      TO anon
      USING (true);
  END IF;
END $$;

-- Create RLS policies for belief_map_content_ideas
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'belief_map_content_ideas' 
    AND policyname = 'Belief map content ideas are viewable by anyone'
  ) THEN
    CREATE POLICY "Belief map content ideas are viewable by anyone"
      ON belief_map_content_ideas
      FOR SELECT
      TO anon
      USING (true);
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'belief_map_content_ideas' 
    AND policyname = 'Anyone can insert belief map content ideas'
  ) THEN
    CREATE POLICY "Anyone can insert belief map content ideas"
      ON belief_map_content_ideas
      FOR INSERT
      TO anon
      WITH CHECK (true);
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'belief_map_content_ideas' 
    AND policyname = 'Anyone can update belief map content ideas'
  ) THEN
    CREATE POLICY "Anyone can update belief map content ideas"
      ON belief_map_content_ideas
      FOR UPDATE
      TO anon
      USING (true);
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'belief_map_content_ideas' 
    AND policyname = 'Anyone can delete belief map content ideas'
  ) THEN
    CREATE POLICY "Anyone can delete belief map content ideas"
      ON belief_map_content_ideas
      FOR DELETE
      TO anon
      USING (true);
  END IF;
END $$;