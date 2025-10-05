-- Create destinations table for tourist attractions
CREATE TABLE IF NOT EXISTS public.destinations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  image_url TEXT NOT NULL,
  category TEXT NOT NULL, -- waterfall, temple, wildlife, hill-station, etc.
  location TEXT NOT NULL,
  map_link TEXT,
  featured BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.destinations ENABLE ROW LEVEL SECURITY;

-- Allow public read access
CREATE POLICY "destinations_public_select"
  ON public.destinations FOR SELECT
  USING (true);

-- Insert sample destinations
INSERT INTO public.destinations (name, description, image_url, category, location, map_link, featured) VALUES
('Hundru Falls', 'A spectacular waterfall cascading from a height of 98 meters, surrounded by lush green forests. One of the most popular tourist destinations in Jharkhand.', '/placeholder.svg?height=600&width=800', 'waterfall', 'Ranchi District', 'https://maps.google.com/?q=Hundru+Falls+Jharkhand', true),
('Jonha Falls', 'Also known as Gautamdhara, this 43-meter high waterfall is a sacred site with a temple dedicated to Lord Shiva at its base.', '/placeholder.svg?height=600&width=800', 'waterfall', 'Ranchi District', 'https://maps.google.com/?q=Jonha+Falls+Jharkhand', true),
('Betla National Park', 'A pristine wildlife sanctuary home to tigers, elephants, leopards, and diverse flora. Perfect for wildlife enthusiasts and nature lovers.', '/placeholder.svg?height=600&width=800', 'wildlife', 'Latehar District', 'https://maps.google.com/?q=Betla+National+Park+Jharkhand', true),
('Baidyanath Temple', 'One of the twelve Jyotirlingas, this ancient temple is a major pilgrimage site attracting millions of devotees annually.', '/placeholder.svg?height=600&width=800', 'temple', 'Deoghar', 'https://maps.google.com/?q=Baidyanath+Temple+Deoghar', true),
('Netarhat', 'Known as the "Queen of Chotanagpur", this hill station offers breathtaking sunrise and sunset views from an altitude of 1,128 meters.', '/placeholder.svg?height=600&width=800', 'hill-station', 'Latehar District', 'https://maps.google.com/?q=Netarhat+Jharkhand', true),
('Dassam Falls', 'A majestic waterfall plunging from 44 meters, creating a mesmerizing spectacle especially during monsoon season.', '/placeholder.svg?height=600&width=800', 'waterfall', 'Ranchi District', 'https://maps.google.com/?q=Dassam+Falls+Jharkhand', false),
('Parasnath Hills', 'The highest mountain peak in Jharkhand and an important Jain pilgrimage site with 24 temples on the summit.', '/placeholder.svg?height=600&width=800', 'temple', 'Giridih District', 'https://maps.google.com/?q=Parasnath+Hills+Jharkhand', false),
('Tagore Hill', 'A scenic hilltop where Rabindranath Tagore spent time, now featuring a museum and offering panoramic views of Ranchi.', '/placeholder.svg?height=600&width=800', 'hill-station', 'Ranchi', 'https://maps.google.com/?q=Tagore+Hill+Ranchi', false);
