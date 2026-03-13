/*
  # Create user feedback table

  1. New Tables
    - `user_feedback`
      - `id` (uuid, primary key)
      - `assessment_id` (uuid, foreign key to content_assessments)
      - `is_accurate` (boolean, required)
      - `comments` (text, optional)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on user_feedback table
    - Add policies for anonymous users to insert feedback

  3. Indexes
    - Assessment_id index for fast lookups
    - Created_at index for sorting
*/

CREATE TABLE IF NOT EXISTS user_feedback (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  assessment_id uuid REFERENCES content_assessments(id) ON DELETE CASCADE,
  is_accurate boolean NOT NULL,
  comments text,
  created_at timestamptz DEFAULT now()
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS user_feedback_assessment_id_idx ON user_feedback(assessment_id);
CREATE INDEX IF NOT EXISTS user_feedback_created_at_idx ON user_feedback(created_at);

-- Enable Row Level Security
ALTER TABLE user_feedback ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
CREATE POLICY "Anyone can insert user feedback"
  ON user_feedback
  FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "User feedback is viewable by anyone"
  ON user_feedback
  FOR SELECT
  TO anon
  USING (true);