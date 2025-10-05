-- Create cultural sites table for heritage locations
CREATE TABLE IF NOT EXISTS public.cultural_sites (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  image_url TEXT NOT NULL,
  history TEXT NOT NULL,
  significance TEXT NOT NULL,
  location TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.cultural_sites ENABLE ROW LEVEL SECURITY;

-- Allow public read access
CREATE POLICY "cultural_sites_public_select"
  ON public.cultural_sites FOR SELECT
  USING (true);

-- Insert sample cultural sites
INSERT INTO public.cultural_sites (name, description, image_url, history, significance, location) VALUES
('Tribal Heritage Museum', 'A comprehensive museum showcasing the rich cultural heritage of Jharkhand''s indigenous tribes including Santhal, Munda, Oraon, and Ho communities.', '/placeholder.svg?height=600&width=800', 'Established to preserve and promote the unique traditions, art forms, and lifestyle of Jharkhand''s tribal communities who have inhabited this region for millennia.', 'Houses rare artifacts, traditional costumes, musical instruments, and exhibits on tribal festivals, rituals, and daily life.', 'Ranchi'),
('Jagannath Temple', 'An architectural marvel built in 1691, this temple is a replica of the famous Puri Jagannath Temple and showcases exquisite Kalinga architecture.', '/placeholder.svg?height=600&width=800', 'Constructed during the reign of King Animesh Singh, the temple has been a center of devotion for over 300 years.', 'Annual Rath Yatra festival attracts thousands of devotees, celebrating the journey of Lord Jagannath.', 'Ranchi'),
('Palamu Fort', 'Ancient fortifications dating back to the 16th century, featuring impressive stone architecture and historical significance.', '/placeholder.svg?height=600&width=800', 'Built by the Chero dynasty rulers, the fort complex includes two forts - the old fort (Purana Qila) and new fort (Naya Qila).', 'Represents the architectural prowess and strategic military planning of medieval Jharkhand rulers.', 'Palamu District'),
('Santhali Folk Art Center', 'A vibrant center dedicated to preserving and promoting Santhali art, music, dance, and traditional crafts.', '/placeholder.svg?height=600&width=800', 'Established by local artists and cultural activists to keep alive the rich oral traditions and artistic heritage of the Santhal tribe.', 'Hosts regular performances of traditional dances like Dong, Dansae, and workshops on Santhal painting and craft-making.', 'Dumka');
