/*
  # CRM Database Structure

  1. New Tables
    - `contacts`
      - Primary user information and status
      - Linked to quiz responses
    - `interactions`
      - Track all interactions with contacts
    - `follow_ups`
      - Schedule and track follow-up tasks
    - `notes`
      - Store additional information about contacts

  2. Security
    - Enable RLS on all tables
    - Add policies for secure access
*/

-- Contacts table
CREATE TABLE IF NOT EXISTS contacts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL UNIQUE,
  phone text,
  company text,
  status text NOT NULL DEFAULT 'new',
  lead_source text DEFAULT 'quiz',
  lead_score integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Interactions table
CREATE TABLE IF NOT EXISTS interactions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  contact_id uuid REFERENCES contacts(id),
  type text NOT NULL,
  description text,
  created_at timestamptz DEFAULT now()
);

-- Follow-ups table
CREATE TABLE IF NOT EXISTS follow_ups (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  contact_id uuid REFERENCES contacts(id),
  due_date timestamptz NOT NULL,
  status text DEFAULT 'pending',
  priority text DEFAULT 'medium',
  description text,
  created_at timestamptz DEFAULT now(),
  completed_at timestamptz
);

-- Notes table
CREATE TABLE IF NOT EXISTS notes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  contact_id uuid REFERENCES contacts(id),
  content text NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Add relationship to existing quiz_responses
ALTER TABLE quiz_responses
ADD COLUMN IF NOT EXISTS contact_id uuid REFERENCES contacts(id);

-- Enable RLS on all tables
ALTER TABLE contacts ENABLE ROW LEVEL SECURITY;
ALTER TABLE interactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE follow_ups ENABLE ROW LEVEL SECURITY;
ALTER TABLE notes ENABLE ROW LEVEL SECURITY;

-- Policies for contacts
CREATE POLICY "Anyone can insert contacts"
  ON contacts
  FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Contacts are viewable by anyone"
  ON contacts
  FOR SELECT
  TO anon
  USING (true);

-- Policies for interactions
CREATE POLICY "Anyone can insert interactions"
  ON interactions
  FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Interactions are viewable by anyone"
  ON interactions
  FOR SELECT
  TO anon
  USING (true);

-- Policies for follow-ups
CREATE POLICY "Anyone can insert follow-ups"
  ON follow_ups
  FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Follow-ups are viewable by anyone"
  ON follow_ups
  FOR SELECT
  TO anon
  USING (true);

-- Policies for notes
CREATE POLICY "Anyone can insert notes"
  ON notes
  FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Notes are viewable by anyone"
  ON notes
  FOR SELECT
  TO anon
  USING (true);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS contacts_email_idx ON contacts(email);
CREATE INDEX IF NOT EXISTS contacts_status_idx ON contacts(status);
CREATE INDEX IF NOT EXISTS interactions_contact_id_idx ON interactions(contact_id);
CREATE INDEX IF NOT EXISTS follow_ups_contact_id_idx ON follow_ups(contact_id);
CREATE INDEX IF NOT EXISTS follow_ups_due_date_idx ON follow_ups(due_date);
CREATE INDEX IF NOT EXISTS notes_contact_id_idx ON notes(contact_id);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_contacts_updated_at
  BEFORE UPDATE ON contacts
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_notes_updated_at
  BEFORE UPDATE ON notes
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();