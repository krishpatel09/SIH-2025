-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users table for authentication
CREATE TABLE IF NOT EXISTS users (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  name VARCHAR(255) NOT NULL,
  role VARCHAR(50) DEFAULT 'user' CHECK (role IN ('user', 'admin', 'moderator')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Features table
CREATE TABLE IF NOT EXISTS features (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  icon VARCHAR(100) NOT NULL,
  color VARCHAR(100) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Destinations table
CREATE TABLE IF NOT EXISTS destinations (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  title VARCHAR(255) NOT NULL,
  image TEXT NOT NULL,
  rating DECIMAL(2,1) NOT NULL CHECK (rating >= 0 AND rating <= 5),
  category VARCHAR(100) NOT NULL,
  temperature VARCHAR(50) NOT NULL,
  best_time VARCHAR(50) NOT NULL,
  description TEXT NOT NULL,
  highlights TEXT[] NOT NULL,
  coordinates POINT,
  distance VARCHAR(100),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enhanced cultural elements table with detailed tribal information
CREATE TABLE IF NOT EXISTS cultural_elements (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  icon VARCHAR(100) NOT NULL,
  image TEXT NOT NULL,
  items TEXT[] NOT NULL,
  category VARCHAR(100) DEFAULT 'General',
  detailed_description TEXT,
  traditions TEXT[],
  festivals TEXT[],
  crafts TEXT[],
  music_dance TEXT[],
  cuisine TEXT[],
  language VARCHAR(100),
  population VARCHAR(100),
  location TEXT,
  significance TEXT,
  history TEXT,
  customs TEXT[],
  clothing TEXT[],
  housing TEXT,
  occupation TEXT[],
  social_structure TEXT,
  religious_beliefs TEXT[],
  art_forms TEXT[],
  handicrafts TEXT[],
  tourism_attractions TEXT[],
  homestay_available BOOLEAN DEFAULT false,
  cultural_experience_available BOOLEAN DEFAULT false,
  workshop_available BOOLEAN DEFAULT false,
  contact_info JSONB,
  gallery_images TEXT[],
  video_urls TEXT[],
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tribal communities detailed table
CREATE TABLE IF NOT EXISTS tribal_communities (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  alternative_names TEXT[],
  description TEXT NOT NULL,
  image TEXT NOT NULL,
  population VARCHAR(100),
  language VARCHAR(100),
  script VARCHAR(100),
  location TEXT[],
  districts TEXT[],
  villages TEXT[],
  history TEXT,
  origin_story TEXT,
  social_structure TEXT,
  governance TEXT,
  festivals TEXT[],
  rituals TEXT[],
  ceremonies TEXT[],
  music_instruments TEXT[],
  dance_forms TEXT[],
  art_forms TEXT[],
  crafts TEXT[],
  clothing TEXT[],
  jewelry TEXT[],
  cuisine TEXT[],
  housing TEXT,
  occupation TEXT[],
  agriculture TEXT[],
  forest_dependency TEXT[],
  religious_beliefs TEXT[],
  deities TEXT[],
  sacred_places TEXT[],
  cultural_practices TEXT[],
  traditional_medicine TEXT[],
  education_system TEXT,
  marriage_customs TEXT,
  family_structure TEXT,
  gender_roles TEXT,
  youth_engagement TEXT,
  challenges TEXT[],
  conservation_efforts TEXT[],
  tourism_potential TEXT[],
  homestay_available BOOLEAN DEFAULT false,
  cultural_tours BOOLEAN DEFAULT false,
  workshops BOOLEAN DEFAULT false,
  contact_info JSONB,
  gallery_images TEXT[],
  video_urls TEXT[],
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Analytics data table
CREATE TABLE IF NOT EXISTS analytics_data (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  page_views INTEGER DEFAULT 0,
  unique_visitors INTEGER DEFAULT 0,
  bounce_rate DECIMAL(5,2) DEFAULT 0,
  avg_session_duration DECIMAL(10,2) DEFAULT 0,
  popular_destinations TEXT[],
  popular_features TEXT[],
  user_engagement JSONB,
  date DATE DEFAULT CURRENT_DATE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);


-- Trips table for trip planning
CREATE TABLE IF NOT EXISTS trips (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  duration INTEGER NOT NULL CHECK (duration > 0),
  budget DECIMAL(10,2) NOT NULL CHECK (budget > 0),
  travelers INTEGER DEFAULT 1 CHECK (travelers > 0),
  trip_type VARCHAR(50) DEFAULT 'adventure' CHECK (trip_type IN ('adventure', 'cultural', 'nature', 'religious', 'family', 'romantic')),
  transport_mode VARCHAR(50) DEFAULT 'car' CHECK (transport_mode IN ('car', 'bus', 'train', 'flight')),
  accommodation_type VARCHAR(50) DEFAULT 'hotel' CHECK (accommodation_type IN ('hotel', 'resort', 'homestay', 'camping')),
  status VARCHAR(50) DEFAULT 'draft' CHECK (status IN ('draft', 'planned', 'booked', 'completed', 'cancelled')),
  itinerary JSONB,
  budget_breakdown JSONB,
  weather_preferences JSONB,
  packing_list TEXT[],
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  start_date DATE,
  end_date DATE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Trip destinations junction table
CREATE TABLE IF NOT EXISTS trip_destinations (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  trip_id UUID NOT NULL REFERENCES trips(id) ON DELETE CASCADE,
  destination_id UUID NOT NULL REFERENCES destinations(id) ON DELETE CASCADE,
  day_number INTEGER,
  arrival_time TIME,
  departure_time TIME,
  activities TEXT[],
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(trip_id, destination_id)
);

-- Trip expenses table
CREATE TABLE IF NOT EXISTS trip_expenses (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  trip_id UUID NOT NULL REFERENCES trips(id) ON DELETE CASCADE,
  category VARCHAR(50) NOT NULL CHECK (category IN ('accommodation', 'transport', 'food', 'activities', 'shopping', 'other')),
  description TEXT NOT NULL,
  amount DECIMAL(10,2) NOT NULL CHECK (amount >= 0),
  date DATE DEFAULT CURRENT_DATE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Trip reviews table
CREATE TABLE IF NOT EXISTS trip_reviews (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  trip_id UUID NOT NULL REFERENCES trips(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  review_text TEXT,
  photos TEXT[],
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(trip_id, user_id)
);
-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_cultural_elements_category ON cultural_elements(category);
CREATE INDEX IF NOT EXISTS idx_cultural_elements_title ON cultural_elements(title);
CREATE INDEX IF NOT EXISTS idx_tribal_communities_name ON tribal_communities(name);
CREATE INDEX IF NOT EXISTS idx_tribal_communities_location ON tribal_communities USING GIN(location);
CREATE INDEX IF NOT EXISTS idx_analytics_data_date ON analytics_data(date);
