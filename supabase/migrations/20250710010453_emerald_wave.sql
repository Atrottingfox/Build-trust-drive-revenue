/*
  # Add outcome tracking to content assessments

  1. Schema Updates
    - Add outcome_data column to content_assessments table to store strategic outcomes
    - Add persona_profile column to store the determined persona information
    - Add confidence_score column to track assessment confidence

  2. Security
    - Maintain existing RLS policies
*/

-- Add new columns to content_assessments table
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'content_assessments' AND column_name = 'outcome_data'
  ) THEN
    ALTER TABLE content_assessments ADD COLUMN outcome_data jsonb;
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'content_assessments' AND column_name = 'persona_profile'
  ) THEN
    ALTER TABLE content_assessments ADD COLUMN persona_profile jsonb;
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'content_assessments' AND column_name = 'confidence_score'
  ) THEN
    ALTER TABLE content_assessments ADD COLUMN confidence_score integer;
  END IF;
END $$;