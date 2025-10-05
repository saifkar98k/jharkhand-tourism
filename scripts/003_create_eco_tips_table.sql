-- Create eco tips table for sustainable tourism practices
CREATE TABLE IF NOT EXISTS public.eco_tips (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  icon TEXT NOT NULL, -- lucide icon name
  category TEXT NOT NULL, -- conservation, waste, wildlife, community
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.eco_tips ENABLE ROW LEVEL SECURITY;

-- Allow public read access
CREATE POLICY "eco_tips_public_select"
  ON public.eco_tips FOR SELECT
  USING (true);

-- Insert sample eco tips
INSERT INTO public.eco_tips (title, description, icon, category) VALUES
('Respect Wildlife', 'Maintain a safe distance from animals. Never feed wildlife or disturb their natural habitat. Use binoculars for viewing.', 'Binoculars', 'wildlife'),
('Zero Waste Travel', 'Carry reusable water bottles, bags, and containers. Avoid single-use plastics and dispose of waste properly in designated bins.', 'Recycle', 'waste'),
('Support Local Communities', 'Purchase handicrafts and products directly from local artisans. Stay in community-run homestays to support local economy.', 'Users', 'community'),
('Conserve Water', 'Use water sparingly, especially in water-scarce areas. Take shorter showers and reuse towels in accommodations.', 'Droplets', 'conservation'),
('Stay on Marked Trails', 'Stick to designated paths to prevent soil erosion and protect native vegetation. Avoid creating new trails.', 'Route', 'conservation'),
('Reduce Carbon Footprint', 'Use public transportation, carpool, or cycle when possible. Choose eco-friendly accommodations with green certifications.', 'Leaf', 'conservation'),
('Respect Sacred Sites', 'Follow dress codes and behavioral guidelines at temples and cultural sites. Seek permission before photographing.', 'Church', 'community'),
('Minimize Noise Pollution', 'Keep noise levels low in natural areas and wildlife zones. Avoid playing loud music that disturbs wildlife and other visitors.', 'Volume2', 'wildlife');
