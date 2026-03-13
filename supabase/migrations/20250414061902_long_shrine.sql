/*
  # Create authority assessment tables

  1. New Tables
    - `authority_assessments`
      - Core assessment data and results
    - `assessment_responses`
      - Individual question responses
    - `assessment_flags`
      - Special flags for segmentation

  2. Security
    - Enable RLS on all tables
    - Add policies for secure access
*/

CREATE TABLE IF NOT EXISTS authority_assessments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  contact_id uuid REFERENCES contacts(id),
  name text NOT NULL,
  email text NOT NULL,
  archetype text NOT NULL,
  platform_preference text,
  monetization_goal text,
  content_struggle text,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS assessment_responses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  assessment_id uuid REFERENCES authority_assessments(id),
  question_id text NOT NULL,
  answer text NOT NULL,
  score jsonb,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS assessment_flags (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  assessment_id uuid REFERENCES authority_assessments(id),
  flag_type text NOT NULL,
  flag_value text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE authority_assessments ENABLE ROW LEVEL SECURITY;
ALTER TABLE assessment_responses ENABLE ROW LEVEL SECURITY;
ALTER TABLE assessment_flags ENABLE ROW LEVEL SECURITY;

-- Policies for authority_assessments
CREATE POLICY "Anyone can insert authority assessments"
  ON authority_assessments
  FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Authority assessments are viewable by anyone"
  ON authority_assessments
  FOR SELECT
  TO anon
  USING (true);

-- Policies for assessment_responses
CREATE POLICY "Anyone can insert assessment responses"
  ON assessment_responses
  FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Assessment responses are viewable by anyone"
  ON assessment_responses
  FOR SELECT
  TO anon
  USING (true);

-- Policies for assessment_flags
CREATE POLICY "Anyone can insert assessment flags"
  ON assessment_flags
  FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Assessment flags are viewable by anyone"
  ON assessment_flags
  FOR SELECT
  TO anon
  USING (true);

-- Create indexes
CREATE INDEX IF NOT EXISTS authority_assessments_email_idx ON authority_assessments(email);
CREATE INDEX IF NOT EXISTS authority_assessments_archetype_idx ON authority_assessments(archetype);
CREATE INDEX IF NOT EXISTS assessment_responses_assessment_id_idx ON assessment_responses(assessment_id);
CREATE INDEX IF NOT EXISTS assessment_flags_assessment_id_idx ON assessment_flags(assessment_id);