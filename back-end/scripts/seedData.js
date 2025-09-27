require('dotenv').config();
const supabase = require('../config/supabase');

const featuresData = [
  {
    title: "AI-Powered Itinerary Planning",
    description: "Personalized travel plans based on your preferences, budget, and duration using advanced machine learning algorithms.",
    icon: "Brain",
    color: "from-blue-500 to-purple-600"
  },
  {
    title: "Blockchain Security",
    description: "Secure transactions, verified guides, and digital certifications for local service providers with tamper-proof records.",
    icon: "Shield",
    color: "from-green-500 to-teal-600"
  },
  {
    title: "AR/VR Previews",
    description: "Immersive virtual tours of destinations, cultural sites, and accommodations before you visit.",
    icon: "Eye",
    color: "from-purple-500 to-pink-600"
  },
  {
    title: "Real-time Navigation",
    description: "GPS-enabled location services with live transport updates and offline map capabilities.",
    icon: "Navigation",
    color: "from-orange-500 to-red-600"
  },
  {
    title: "Local Marketplace",
    description: "Integrated platform for tribal handicrafts, homestays, local events, and authentic experiences.",
    icon: "ShoppingBag",
    color: "from-yellow-500 to-orange-600"
  },
  {
    title: "Multilingual AI Chatbot",
    description: "24/7 assistance in Hindi, English, and local tribal languages for seamless communication.",
    icon: "MessageSquare",
    color: "from-indigo-500 to-blue-600"
  },
  {
    title: "Analytics Dashboard",
    description: "Comprehensive insights for tourism officials to monitor trends, visitor patterns, and economic impact.",
    icon: "BarChart3",
    color: "from-cyan-500 to-blue-600"
  },
  {
    title: "Cultural Integration",
    description: "Deep integration with tribal communities, showcasing authentic culture, traditions, and sustainable tourism.",
    icon: "Globe",
    color: "from-emerald-500 to-green-600"
  }
];

  const destinationsData = [
    {
      name: "Netarhat",
      title: "Queen of Chotanagpur",
      image: "https://s7ap1.scene7.com/is/image/incredibleindia/netarhat-dam-ranchi-jharkhand-1-musthead-hero?qlt=82&ts=1727010909184",
      rating: 4.8,
      category: "Hill Station",
      temperature: "15-25°C",
      best_time: "Oct-Mar",
      description: "Famous for its breathtaking sunrise and sunset views, Netarhat is a charming hill station offering cool climate and scenic beauty.",
      highlights: ["Sunrise Point", "Sunset Point", "Netarhat Dam", "Magnolia Point"],
      coordinates: { x: 23.4676, y: 84.2619 },
      distance: "156 km from Ranchi"
    },
    {
      name: "Betla National Park",
      title: "Wildlife Paradise",
      image: "https://www.photobank.in/img/preview/1651567478AIG00052.jpg",
      rating: 4.6,
      category: "Wildlife",
      temperature: "20-35°C",
      best_time: "Nov-Apr",
      description: "Home to tigers, elephants, and diverse flora and fauna. A paradise for wildlife enthusiasts and nature photographers.",
      highlights: ["Tiger Safari", "Elephant Rides", "Palamau Fort", "Kechki Waterfall"],
      coordinates: { x: 23.9167, y: 84.1833 },
      distance: "170 km from Ranchi"
    },
    {
      name: "Hundru Falls",
      title: "Majestic Waterfall",
      image: "https://upload.wikimedia.org/wikipedia/commons/b/be/Hundru_Falls%2C_Jharkhand%2C_India_4.jpg",
      rating: 4.7,
      category: "Waterfall",
      temperature: "18-30°C",
      best_time: "Jul-Feb",
      description: "A spectacular 320-foot waterfall cascading through rocky terrain, creating a mesmerizing natural spectacle.",
      highlights: ["Main Falls", "Rock Climbing", "Photography", "Nature Trails"],
      coordinates: { x: 23.2833, y: 85.6167 },
      distance: "45 km from Ranchi"
    },
    {
      name: "Patratu Valley",
      title: "Kashmir of Jharkhand",
      image: "https://pbs.twimg.com/media/EMNwkhjVAAAbnEI.jpg:large",
      rating: 4.5,
      category: "Valley",
      temperature: "16-28°C",
      best_time: "Oct-Mar",
      description: "Often called the Kashmir of Jharkhand, this valley offers stunning landscapes and peaceful surroundings.",
      highlights: ["Valley Views", "Boating", "Patratu Dam", "Scenic Drives"],
      coordinates: { x: 23.6833, y: 85.1667 },
      distance: "40 km from Ranchi"
    },
    {
      name: "Deoghar",
      title: "Spiritual Haven",
      image: "http://visittotravel.com/wp-content/uploads/2023/09/Naulakha_Temple-jpg.webp",
      rating: 4.9,
      category: "Religious",
      temperature: "20-32°C",
      best_time: "Oct-Mar",
      description: "One of the most sacred pilgrimage sites, home to the famous Baidyanath Jyotirlinga temple.",
      highlights: ["Baidyanath Temple", "Nandan Pahar", "Tapovan", "Satsang Ashram"],
      coordinates: { x: 24.4833, y: 86.7000 },
      distance: "250 km from Ranchi"
    },
    {
      name: "Ranchi",
      title: "City of Waterfalls",
      image: "https://s7ap1.scene7.com/is/image/incredibleindia/sita-fall-ranchi-jharkhand-1-attr-hero?qlt=82&ts=1727010866950",
      rating: 4.4,
      category: "City",
      temperature: "18-32°C",
      best_time: "Oct-Mar",
      description: "The capital city known for its waterfalls, lakes, and modern attractions combined with natural beauty.",
      highlights: ["Rock Garden", "Kanke Dam", "Jagannath Temple", "Birsa Munda Park"],
      coordinates: { x: 23.3441, y: 85.3096 },
      distance: "0 km from Ranchi"
    }
  ];

const culturalElementsData = [
  {
    title: "Tribal Communities",
    description: "Experience the rich heritage of Santhal, Munda, Oraon, and other tribal communities",
    icon: "Users",
    image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    items: ["Santhal Community", "Munda Tribe", "Oraon Culture", "Ho Traditions"]
  },
  {
    title: "Traditional Arts",
    description: "Discover authentic handicrafts, paintings, and traditional art forms",
    icon: "Palette",
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    items: ["Dokra Craft", "Sohrai Paintings", "Bamboo Crafts", "Tribal Jewelry"]
  },
  {
    title: "Folk Music & Dance",
    description: "Immerse in vibrant folk dances and traditional music performances",
    icon: "Music",
    image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    items: ["Chhau Dance", "Jhumar Dance", "Paika Dance", "Tribal Songs"]
  },
  {
    title: "Homestays",
    description: "Stay with local families and experience authentic tribal lifestyle",
    icon: "Home",
    image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    items: ["Village Homestays", "Cultural Immersion", "Local Cuisine", "Traditional Living"]
  },
  {
    title: "Festivals",
    description: "Participate in colorful tribal festivals and celebrations",
    icon: "Calendar",
    image: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    items: ["Sohrai Festival", "Karam Festival", "Baha Festival", "Tusu Festival"]
  },
  {
    title: "Local Marketplace",
    description: "Shop authentic tribal handicrafts directly from local artisans",
    icon: "ShoppingCart",
    image: "https://images.unsplash.com/photo-1472851294608-062f824d29cc?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    items: ["Handwoven Textiles", "Pottery", "Wood Carvings", "Organic Products"]
  }
];

const analyticsData = {
  total_visitors: 125430,
  monthly_growth: 23.5,
  average_rating: 4.6,
  total_reviews: 8420,
  positive_sentiment: 78,
  neutral_sentiment: 18,
  negative_sentiment: 4
};

const topDestinationsData = [
  { destination_name: "Netarhat", visitors: 28500, growth: 15.2 },
  { destination_name: "Betla National Park", visitors: 22100, growth: 8.7 },
  { destination_name: "Hundru Falls", visitors: 19800, growth: 22.1 },
  { destination_name: "Deoghar", visitors: 18200, growth: 12.3 },
  { destination_name: "Patratu Valley", visitors: 15600, growth: 18.9 }
];

const monthlyVisitorsData = [
  { month: "Jan", visitors: 8500, revenue: 12.5 },
  { month: "Feb", visitors: 9200, revenue: 14.2 },
  { month: "Mar", visitors: 11800, revenue: 18.7 },
  { month: "Apr", visitors: 13200, revenue: 21.3 },
  { month: "May", visitors: 10800, revenue: 16.9 },
  { month: "Jun", visitors: 8900, revenue: 13.8 }
];

const demographicsData = [
  { age_group: "18-25", percentage: 32, color: "bg-blue-500" },
  { age_group: "26-35", percentage: 28, color: "bg-green-500" },
  { age_group: "36-45", percentage: 22, color: "bg-yellow-500" },
  { age_group: "46-55", percentage: 12, color: "bg-purple-500" },
  { age_group: "55+", percentage: 6, color: "bg-red-500" }
];

async function seedDatabase() {
  try {
    console.log('🌱 Starting database seeding...');

    // Clear existing data
    console.log('🧹 Clearing existing data...');
    await supabase.from('demographics').delete().neq('id', '00000000-0000-0000-0000-000000000000');
    await supabase.from('monthly_visitors').delete().neq('id', '00000000-0000-0000-0000-000000000000');
    await supabase.from('top_destinations').delete().neq('id', '00000000-0000-0000-0000-000000000000');
    await supabase.from('analytics_data').delete().neq('id', '00000000-0000-0000-0000-000000000000');
    await supabase.from('cultural_elements').delete().neq('id', '00000000-0000-0000-0000-000000000000');
    await supabase.from('destinations').delete().neq('id', '00000000-0000-0000-0000-000000000000');
    await supabase.from('features').delete().neq('id', '00000000-0000-0000-0000-000000000000');

    // Insert features
    console.log('📋 Inserting features...');
    const { error: featuresError } = await supabase
      .from('features')
      .insert(featuresData);
    if (featuresError) throw featuresError;

    // Insert destinations
    console.log('🗺️ Inserting destinations...');
    const { error: destinationsError } = await supabase
      .from('destinations')
      .insert(destinationsData);
    if (destinationsError) throw destinationsError;

    // Insert cultural elements
    console.log('🎭 Inserting cultural elements...');
    const { error: culturalError } = await supabase
      .from('cultural_elements')
      .insert(culturalElementsData);
    if (culturalError) throw culturalError;

    // Insert analytics data
    console.log('📊 Inserting analytics data...');
    const { error: analyticsError } = await supabase
      .from('analytics_data')
      .insert([analyticsData]);
    if (analyticsError) throw analyticsError;

    // Insert top destinations
    console.log('🏆 Inserting top destinations...');
    const { error: topDestError } = await supabase
      .from('top_destinations')
      .insert(topDestinationsData);
    if (topDestError) throw topDestError;

    // Insert monthly visitors
    console.log('📅 Inserting monthly visitors...');
    const { error: monthlyError } = await supabase
      .from('monthly_visitors')
      .insert(monthlyVisitorsData);
    if (monthlyError) throw monthlyError;

    // Insert demographics
    console.log('👥 Inserting demographics...');
    const { error: demographicsError } = await supabase
      .from('demographics')
      .insert(demographicsData);
    if (demographicsError) throw demographicsError;

    console.log('✅ Database seeding completed successfully!');
    console.log('📈 Data inserted:');
    console.log(`   - ${featuresData.length} features`);
    console.log(`   - ${destinationsData.length} destinations`);
    console.log(`   - ${culturalElementsData.length} cultural elements`);
    console.log(`   - 1 analytics record`);
    console.log(`   - ${topDestinationsData.length} top destinations`);
    console.log(`   - ${monthlyVisitorsData.length} monthly visitor records`);
    console.log(`   - ${demographicsData.length} demographic records`);

  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
}

// Run seeding if this file is executed directly
if (require.main === module) {
  seedDatabase();
}

module.exports = { seedDatabase };
