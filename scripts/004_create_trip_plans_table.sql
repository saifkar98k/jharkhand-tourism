-- Create trip plans table for storing AI chatbot conversations
CREATE TABLE IF NOT EXISTS public.trip_plans (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_query TEXT NOT NULL,
  ai_response TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.trip_plans ENABLE ROW LEVEL SECURITY;

-- Allow public read access (for analytics/improvement)
CREATE POLICY "trip_plans_public_select"
  ON public.trip_plans FOR SELECT
  USING (true);

-- Allow public insert (anyone can save their trip plans)
CREATE POLICY "trip_plans_public_insert"
  ON public.trip_plans FOR INSERT
  WITH CHECK (true);
