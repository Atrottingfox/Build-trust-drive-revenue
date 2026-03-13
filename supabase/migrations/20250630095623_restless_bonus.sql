/*
  # Create belief map builder tables

  1. New Tables
    - `belief_map_entries`
      - Core belief map data and user information
    - `belief_map_concepts`
      - Individual concepts within each belief map
    - `belief_map_messages`
      - Key messages for each concept
    - `belief_map_content_ideas`
      - Content ideas for each concept

  2. Security
    - Enable RLS on all tables
    - Add policies for secure access
*/

CREATE TABLE IF NOT EXISTS belief_map_entries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  category_of_ownership text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS belief_map_concepts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  belief_map_id uuid REFERENCES belief_map_entries(id) ON DELETE CASCADE,
  title text NOT NULL,
  description text,
  target_audience text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS belief_map_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  concept_id uuid REFERENCES belief_map_concepts(id) ON DELETE CASCADE,
  message text NOT NULL,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS belief_map_content_ideas (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  concept_id uuid REFERENCES belief_map_concepts(id) ON DELETE CASCADE,
  idea text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE belief_map_entries ENABLE ROW LEVEL SECURITY;
ALTER TABLE belief_map_concepts ENABLE ROW LEVEL SECURITY;
ALTER TABLE belief_map_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE belief_map_content_ideas ENABLE ROW LEVEL SECURITY;

-- Policies for belief_map_entries
CREATE POLICY "Anyone can insert belief map entries"
  ON belief_map_entries
  FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Belief map entries are viewable by anyone"
  ON belief_map_entries
  FOR SELECT
  TO anon
  USING (true);

CREATE POLICY "Anyone can update belief map entries"
  ON belief_map_entries
  FOR UPDATE
  TO anon
  USING (true);

-- Policies for belief_map_concepts
CREATE POLICY "Anyone can insert belief map concepts"
  ON belief_map_concepts
  FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Belief map concepts are viewable by anyone"
  ON belief_map_concepts
  FOR SELECT
  TO anon
  USING (true);

CREATE POLICY "Anyone can update belief map concepts"
  ON belief_map_concepts
  FOR UPDATE
  TO anon
  USING (true);

CREATE POLICY "Anyone can delete belief map concepts"
  ON belief_map_concepts
  FOR DELETE
  TO anon
  USING (true);

-- Policies for belief_map_messages
CREATE POLICY "Anyone can insert belief map messages"
  ON belief_map_messages
  FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Belief map messages are viewable by anyone"
  ON belief_map_messages
  FOR SELECT
  TO anon
  USING (true);

CREATE POLICY "Anyone can update belief map messages"
  ON belief_map_messages
  FOR UPDATE
  TO anon
  USING (true);

CREATE POLICY "Anyone can delete belief map messages"
  ON belief_map_messages
  FOR DELETE
  TO anon
  USING (true);

-- Policies for belief_map_content_ideas
CREATE POLICY "Anyone can insert belief map content ideas"
  ON belief_map_content_ideas
  FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Belief map content ideas are viewable by anyone"
  ON belief_map_content_ideas
  FOR SELECT
  TO anon
  USING (true);

CREATE POLICY "Anyone can update belief map content ideas"
  ON belief_map_content_ideas
  FOR UPDATE
  TO anon
  USING (true);

CREATE POLICY "Anyone can delete belief map content ideas"
  ON belief_map_content_ideas
  FOR DELETE
  TO anon
  USING (true);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS belief_map_entries_email_idx ON belief_map_entries(email);
CREATE INDEX IF NOT EXISTS belief_map_entries_created_at_idx ON belief_map_entries(created_at);
CREATE INDEX IF NOT EXISTS belief_map_concepts_belief_map_id_idx ON belief_map_concepts(belief_map_id);
CREATE INDEX IF NOT EXISTS belief_map_messages_concept_id_idx ON belief_map_messages(concept_id);
CREATE INDEX IF NOT EXISTS belief_map_content_ideas_concept_id_idx ON belief_map_content_ideas(concept_id);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_belief_map_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_belief_map_entries_updated_at
  BEFORE UPDATE ON belief_map_entries
  FOR EACH ROW
  EXECUTE FUNCTION update_belief_map_updated_at_column();

CREATE TRIGGER update_belief_map_concepts_updated_at
  BEFORE UPDATE ON belief_map_concepts
  FOR EACH ROW
  EXECUTE FUNCTION update_belief_map_updated_at_column();