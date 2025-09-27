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

