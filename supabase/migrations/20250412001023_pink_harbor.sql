/*
  # Create quiz responses table

  1. New Tables
    - `quiz_responses`
      - `id` (uuid, primary key)
      - `name` (text)
      - `email` (text)
      - `answers` (jsonb)
      - `result` (text)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on `quiz_responses` table
    - Add policy for inserting responses
*/

CREATE TABLE IF NOT EXISTS quiz_responses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  answers jsonb NOT NULL,
  result text NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE quiz_responses ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can insert quiz responses"
  ON quiz_responses
  FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Quiz responses are viewable by anyone"
  ON quiz_responses
  FOR SELECT
  TO anon
  USING (true);