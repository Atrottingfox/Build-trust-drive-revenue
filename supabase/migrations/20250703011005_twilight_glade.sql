/*
  # Update belief map schema for unique offer and stage 1 worksheet

  1. Schema Updates
    - Add unique_offer field to belief_map_entries
    - Add traits, interests, values fields for Stage 1 worksheet
    - Remove target_audience from belief_map_concepts

  2. Security
    - Maintain existing RLS policies
*/

-- Add new columns to belief_map_entries if they don't exist
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'belief_map_entries' AND column_name = 'unique_offer'
  ) THEN
    ALTER TABLE belief_map_entries ADD COLUMN unique_offer text;
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'belief_map_entries' AND column_name = 'traits'
  ) THEN
    ALTER TABLE belief_map_entries ADD COLUMN traits text;
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'belief_map_entries' AND column_name = 'interests'
  ) THEN
    ALTER TABLE belief_map_entries ADD COLUMN interests text;
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'belief_map_entries' AND column_name = 'values'
  ) THEN
    ALTER TABLE belief_map_entries ADD COLUMN values text;
  END IF;
END $$;

-- Remove target_audience column from belief_map_concepts if it exists
DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'belief_map_concepts' AND column_name = 'target_audience'
  ) THEN
    ALTER TABLE belief_map_concepts DROP COLUMN target_audience;
  END IF;
END $$;