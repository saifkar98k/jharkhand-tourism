-- Consolidated schema restoration for Jharkhand Tourism
-- Run this in Supabase SQL editor (or psql) to recreate the tables, policies and sample data.

-- Extensions
CREATE EXTENSION IF NOT EXISTS "pgcrypto";
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Destinations table
CREATE TABLE IF NOT EXISTS public.destinations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  image_url TEXT NOT NULL,
  category TEXT NOT NULL,
  location TEXT NOT NULL,
  map_link TEXT,
  featured BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
ALTER TABLE public.destinations ENABLE ROW LEVEL SECURITY;
CREATE POLICY "destinations_public_select" ON public.destinations FOR SELECT USING (true);

-- Cultural sites table
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
ALTER TABLE public.cultural_sites ENABLE ROW LEVEL SECURITY;
CREATE POLICY "cultural_sites_public_select" ON public.cultural_sites FOR SELECT USING (true);

-- Eco tips table
CREATE TABLE IF NOT EXISTS public.eco_tips (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  icon TEXT NOT NULL,
  category TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
ALTER TABLE public.eco_tips ENABLE ROW LEVEL SECURITY;
CREATE POLICY "eco_tips_public_select" ON public.eco_tips FOR SELECT USING (true);

-- Trip plans table
CREATE TABLE IF NOT EXISTS public.trip_plans (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_query TEXT NOT NULL,
  ai_response TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
ALTER TABLE public.trip_plans ENABLE ROW LEVEL SECURITY;
CREATE POLICY "trip_plans_public_select" ON public.trip_plans FOR SELECT USING (true);
CREATE POLICY "trip_plans_public_insert" ON public.trip_plans FOR INSERT WITH CHECK (true);

-- Optional sample data (same as individual scripts)
INSERT INTO public.destinations (name, description, image_url, category, location, map_link, featured) VALUES
('Hundru Falls', 'A spectacular waterfall cascading from a height of 98 meters, surrounded by lush green forests. One of the most popular tourist destinations in Jharkhand.', '/placeholder.svg?height=600&width=800', 'waterfall', 'Ranchi District', 'https://maps.google.com/?q=Hundru+Falls+Jharkhand', true),
('Jonha Falls', 'Also known as Gautamdhara, this 43-meter high waterfall is a sacred site with a temple dedicated to Lord Shiva at its base.', '/placeholder.svg?height=600&width=800', 'waterfall', 'Ranchi District', 'https://maps.google.com/?q=Jonha+Falls+Jharkhand', true),
('Betla National Park', 'A pristine wildlife sanctuary home to tigers, elephants, leopards, and diverse flora. Perfect for wildlife enthusiasts and nature lovers.', '/placeholder.svg?height=600&width=800', 'wildlife', 'Latehar District', 'https://maps.google.com/?q=Betla+National+Park+Jharkhand', true),
('Baidyanath Temple', 'One of the twelve Jyotirlingas, this ancient temple is a major pilgrimage site attracting millions of devotees annually.', '/placeholder.svg?height=600&width=800', 'temple', 'Deoghar', 'https://maps.google.com/?q=Baidyanath+Temple+Deoghar', true),
('Netarhat', 'Known as the "Queen of Chotanagpur", this hill station offers breathtaking sunrise and sunset views from an altitude of 1,128 meters.', '/placeholder.svg?height=600&width=800', 'hill-station', 'Latehar District', 'https://maps.google.com/?q=Netarhat+Jharkhand', true),
('Dassam Falls', 'A majestic waterfall plunging from 44 meters, creating a mesmerizing spectacle especially during monsoon season.', '/placeholder.svg?height=600&width=800', 'waterfall', 'Ranchi District', 'https://maps.google.com/?q=Dassam+Falls+Jharkhand', false),
('Parasnath Hills', 'The highest mountain peak in Jharkhand and an important Jain pilgrimage site with 24 temples on the summit.', '/placeholder.svg?height=600&width=800', 'temple', 'Giridih District', 'https://maps.google.com/?q=Parasnath+Hills+Jharkhand', false),
('Tagore Hill', 'A scenic hilltop where Rabindranath Tagore spent time, now featuring a museum and offering panoramic views of Ranchi.', '/placeholder.svg?height=600&width=800', 'hill-station', 'Ranchi', 'https://maps.google.com/?q=Tagore+Hill+Ranchi', false)
ON CONFLICT DO NOTHING;

INSERT INTO public.cultural_sites (name, description, image_url, history, significance, location) VALUES
('Tribal Heritage Museum', 'A comprehensive museum showcasing the rich cultural heritage of Jharkhand''s indigenous tribes including Santhal, Munda, Oraon, and Ho communities.', '/placeholder.svg?height=600&width=800', 'Established to preserve and promote the unique traditions, art forms, and lifestyle of Jharkhand''s tribal communities who have inhabited this region for millennia.', 'Houses rare artifacts, traditional costumes, musical instruments, and exhibits on tribal festivals, rituals, and daily life.', 'Ranchi'),
('Jagannath Temple', 'An architectural marvel built in 1691, this temple is a replica of the famous Puri Jagannath Temple and showcases exquisite Kalinga architecture.', '/placeholder.svg?height=600&width=800', 'Constructed during the reign of King Animesh Singh, the temple has been a center of devotion for over 300 years.', 'Annual Rath Yatra festival attracts thousands of devotees, celebrating the journey of Lord Jagannath.', 'Ranchi'),
('Palamu Fort', 'Ancient fortifications dating back to the 16th century, featuring impressive stone architecture and historical significance.', '/placeholder.svg?height=600&width=800', 'Built by the Chero dynasty rulers, the fort complex includes two forts - the old fort (Purana Qila) and new fort (Naya Qila).', 'Represents the architectural prowess and strategic military planning of medieval Jharkhand rulers.', 'Palamu District'),
('Santhali Folk Art Center', 'A vibrant center dedicated to preserving and promoting Santhali art, music, dance, and traditional crafts.', '/placeholder.svg?height=600&width=800', 'Established by local artists and cultural activists to keep alive the rich oral traditions and artistic heritage of the Santhal tribe.', 'Hosts regular performances of traditional dances like Dong, Dansae, and workshops on Santhal painting and craft-making.', 'Dumka')
ON CONFLICT DO NOTHING;

INSERT INTO public.eco_tips (title, description, icon, category) VALUES
('Respect Wildlife', 'Maintain a safe distance from animals. Never feed wildlife or disturb their natural habitat. Use binoculars for viewing.', 'Binoculars', 'wildlife'),
('Zero Waste Travel', 'Carry reusable water bottles, bags, and containers. Avoid single-use plastics and dispose of waste properly in designated bins.', 'Recycle', 'waste'),
('Support Local Communities', 'Purchase handicrafts and products directly from local artisans. Stay in community-run homestays to support local economy.', 'Users', 'community'),
('Conserve Water', 'Use water sparingly, especially in water-scarce areas. Take shorter showers and reuse towels in accommodations.', 'Droplets', 'conservation'),
('Stay on Marked Trails', 'Stick to designated paths to prevent soil erosion and protect native vegetation. Avoid creating new trails.', 'Route', 'conservation'),
('Reduce Carbon Footprint', 'Use public transportation, carpool, or cycle when possible. Choose eco-friendly accommodations with green certifications.', 'Leaf', 'conservation'),
('Respect Sacred Sites', 'Follow dress codes and behavioral guidelines at temples and cultural sites. Seek permission before photographing.', 'Church', 'community'),
('Minimize Noise Pollution', 'Keep noise levels low in natural areas and wildlife zones. Avoid playing loud music that disturbs wildlife and other visitors.', 'Volume2', 'wildlife')
ON CONFLICT DO NOTHING;

-- trip_plans has no sample inserts by default

-- End of consolidated migration
