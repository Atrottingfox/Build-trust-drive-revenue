/*
  # Create content assessments table

  1. New Tables
    - `content_assessments`
      - `id` (uuid, primary key)
      - `name` (text, required)
      - `email` (text, required)
      - `answers` (jsonb, required)
      - `trait_scores` (jsonb, required)
      - `archetype_scores` (jsonb, required)
      - `dominant_archetype` (text, required)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on content_assessments table
    - Add policies for anonymous users to insert and read assessments

  3. Indexes
    - Email index for fast lookups
    - Dominant archetype index for analytics
    - Created_at index for sorting
*/

CREATE TABLE IF NOT EXISTS content_assessments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  answers jsonb NOT NULL,
  trait_scores jsonb NOT NULL,
  archetype_scores jsonb NOT NULL,
  dominant_archetype text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS content_assessments_email_idx ON content_assessments(email);
CREATE INDEX IF NOT EXISTS content_assessments_archetype_idx ON content_assessments(dominant_archetype);
CREATE INDEX IF NOT EXISTS content_assessments_created_at_idx ON content_assessments(created_at);

-- Enable Row Level Security
ALTER TABLE content_assessments ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
CREATE POLICY "Anyone can insert content assessments"
  ON content_assessments
  FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Content assessments are viewable by anyone"
  ON content_assessments
  FOR SELECT
  TO anon
  USING (true);