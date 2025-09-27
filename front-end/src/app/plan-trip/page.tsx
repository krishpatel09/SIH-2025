'use client';

import { useState, useEffect, useCallback } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { 
  Calendar, 
  Users, 
  DollarSign, 
  Star, 
  Camera, 
  Heart,
  Plane,
  Car,  
  Train,
  Bus,
  Sun,
  Cloud,
  CloudRain,
  Thermometer,
  Wind,
  Eye,
  Plus,
  Minus,
  CheckCircle,
  Zap,
  Target,
  Mountain,
  TreePine,
  Building,
  Utensils,
  Bed
} from 'lucide-react';

export default function PlanTripPage() {
  const [activeTab, setActiveTab] = useState('builder');
  const [tripDuration, setTripDuration] = useState(3);
  const [budget, setBudget] = useState(10000);
  const [travelers, setTravelers] = useState(2);
  const [selectedDestinations, setSelectedDestinations] = useState<string[]>([]);
  const [tripType, setTripType] = useState('adventure');
  const [accommodationType, setAccommodationType] = useState('hotel');
  const [transportMode, setTransportMode] = useState('car');
  const [weatherData, setWeatherData] = useState<{
    temperature: number;
    condition: string;
    humidity: number;
    windSpeed: number;
  } | null>(null);
  const [itinerary, setItinerary] = useState<{
    day: number;
    activities: string[];
    destinations: string[];
    accommodation: string;
  }[]>([]);
  const [budgetBreakdown, setBudgetBreakdown] = useState<{
    accommodation: number;
    transport: number;
    food: number;
    activities: number;
    total: number;
  }>({
    accommodation: 0,
    transport: 0,
    food: 0,
    activities: 0,
    total: 0
  });

  // Sample destinations data
  const destinations = [
    { id: '1', name: 'Netarhat', type: 'Hill Station', rating: 4.8, cost: 2000, duration: '2 days' },
    { id: '2', name: 'Patratu Valley', type: 'Valley', rating: 4.5, cost: 1500, duration: '1 day' },
    { id: '3', name: 'Betla National Park', type: 'Wildlife', rating: 4.6, cost: 2500, duration: '2 days' },
    { id: '4', name: 'Hundru Falls', type: 'Waterfall', rating: 4.7, cost: 800, duration: '1 day' },
    { id: '5', name: 'Deoghar', type: 'Religious', rating: 4.9, cost: 1200, duration: '1 day' },
    { id: '6', name: 'Ranchi', type: 'City', rating: 4.4, cost: 1800, duration: '2 days' }
  ];

  // Trip types
  const tripTypes = [
    { id: 'adventure', name: 'Adventure', icon: Mountain, color: 'bg-red-500' },
    { id: 'cultural', name: 'Cultural', icon: Building, color: 'bg-purple-500' },
    { id: 'nature', name: 'Nature', icon: TreePine, color: 'bg-green-500' },
    { id: 'religious', name: 'Religious', icon: Star, color: 'bg-yellow-500' },
    { id: 'family', name: 'Family', icon: Users, color: 'bg-blue-500' },
    { id: 'romantic', name: 'Romantic', icon: Heart, color: 'bg-pink-500' }
  ];

  // Transport modes
  const transportModes = [
    { id: 'car', name: 'Car', icon: Car, cost: 15, time: 'flexible' },
    { id: 'bus', name: 'Bus', icon: Bus, cost: 5, time: 'fixed' },
    { id: 'train', name: 'Train', icon: Train, cost: 8, time: 'fixed' },
    { id: 'flight', name: 'Flight', icon: Plane, cost: 25, time: 'fast' }
  ];

  // Accommodation types
  const accommodationTypes = [
    { id: 'hotel', name: 'Hotel', icon: Building, cost: 2000, amenities: ['Wifi', 'AC', 'Restaurant'] },
    { id: 'resort', name: 'Resort', icon: Mountain, cost: 3500, amenities: ['Pool', 'Spa', 'Activities'] },
    { id: 'homestay', name: 'Homestay', icon: Building, cost: 800, amenities: ['Local Food', 'Cultural Experience'] },
    { id: 'camping', name: 'Camping', icon: TreePine, cost: 500, amenities: ['Nature', 'Adventure'] }
  ];

  // Weather data simulation
  useEffect(() => {
    const weather = {
      current: { temp: 28, condition: 'Sunny', humidity: 65, wind: 12 },
      forecast: [
        { day: 'Today', temp: 28, condition: 'Sunny', icon: Sun },
        { day: 'Tomorrow', temp: 26, condition: 'Cloudy', icon: Cloud },
        { day: 'Day 3', temp: 24, condition: 'Rain', icon: CloudRain },
        { day: 'Day 4', temp: 27, condition: 'Sunny', icon: Sun }
      ]
    };
    setWeatherData(weather);
  }, []);

  // Generate itinerary
  const generateItinerary = () => {
    const generatedItinerary = [
      { day: 1, destination: 'Ranchi', activities: ['Arrival', 'City Tour', 'Local Market'], meals: ['Lunch', 'Dinner'], accommodation: 'Hotel' },
      { day: 2, destination: 'Netarhat', activities: ['Hill Station Visit', 'Sunset Point', 'Nature Walk'], meals: ['Breakfast', 'Lunch', 'Dinner'], accommodation: 'Resort' },
      { day: 3, destination: 'Patratu Valley', activities: ['Valley Exploration', 'Photography', 'Local Culture'], meals: ['Breakfast', 'Lunch'], accommodation: 'Homestay' }
    ];
    setItinerary(generatedItinerary);
  };

  // Calculate budget breakdown
  const calculateBudget = useCallback(() => {
    const breakdown = {
      accommodation: budget * 0.4,
      transport: budget * 0.3,
      food: budget * 0.2,
      activities: budget * 0.1
    };
    setBudgetBreakdown(breakdown);
  }, [budget]);

  useEffect(() => {
    calculateBudget();
  }, [calculateBudget]);

  const tabs = [
    { id: 'builder', name: 'Trip Builder', icon: Target },
    { id: 'itinerary', name: 'Itinerary', icon: Calendar },
    { id: 'budget', name: 'Budget', icon: DollarSign },
    { id: 'weather', name: 'Weather', icon: Sun },
    { id: 'packing', name: 'Packing List', icon: CheckCircle }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Hero Section */}
      <div className="pt-20 bg-gradient-to-r from-green-600 to-green-400 text-white">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center">
            <h1 className="text-5xl font-bold mb-4">Plan Your Perfect Trip</h1>
            <p className="text-xl mb-8">Discover Jharkhand with our smart trip planning tools</p>
            <div className="flex justify-center space-x-4">
              <div className="bg-white/20 backdrop-blur-sm rounded-lg px-6 py-3">
                <Users className="w-6 h-6 mx-auto mb-2" />
                <span className="text-sm">Smart Planning</span>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-lg px-6 py-3">
                <DollarSign className="w-6 h-6 mx-auto mb-2" />
                <span className="text-sm">Budget Friendly</span>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-lg px-6 py-3">
                <Star className="w-6 h-6 mx-auto mb-2" />
                <span className="text-sm">Best Experiences</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white shadow-sm sticky top-16 z-40">
        <div className="container mx-auto px-4">
          <div className="flex space-x-1 overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-6 py-4 border-b-2 transition-colors whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'border-green-600 text-green-600'
                    : 'border-transparent text-gray-600 hover:text-green-600'
                }`}
              >
                <tab.icon className="w-5 h-5" />
                <span>{tab.name}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Trip Builder Tab */}
        {activeTab === 'builder' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Trip Configuration */}
            <div className="lg:col-span-2 space-y-6">
              {/* Basic Info */}
              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Trip Configuration</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Duration (Days)</label>
                    <div className="flex items-center space-x-2">
                      <button onClick={() => setTripDuration(Math.max(1, tripDuration - 1))} className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200">
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="px-4 py-2 bg-green-50 rounded-lg font-semibold">{tripDuration}</span>
                      <button onClick={() => setTripDuration(Math.min(14, tripDuration + 1))} className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200">
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Travelers</label>
                    <div className="flex items-center space-x-2">
                      <button onClick={() => setTravelers(Math.max(1, travelers - 1))} className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200">
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="px-4 py-2 bg-green-50 rounded-lg font-semibold">{travelers}</span>
                      <button onClick={() => setTravelers(Math.min(10, travelers + 1))} className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200">
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Budget (₹)</label>
                    <input
                      type="range"
                      min="5000"
                      max="50000"
                      step="1000"
                      value={budget}
                      onChange={(e) => setBudget(Number(e.target.value))}
                      className="w-full"
                    />
                    <div className="text-center mt-2">
                      <span className="text-lg font-semibold text-green-600">₹{budget.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Trip Type Selection */}
              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <h3 className="text-xl font-bold text-gray-800 mb-4">Choose Your Trip Type</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {tripTypes.map((type) => (
                    <button
                      key={type.id}
                      onClick={() => setTripType(type.id)}
                      className={`p-4 rounded-lg border-2 transition-all ${
                        tripType === type.id
                          ? 'border-green-500 bg-green-50'
                          : 'border-gray-200 hover:border-green-300'
                      }`}
                    >
                      <div className={`w-12 h-12 ${type.color} rounded-full flex items-center justify-center mx-auto mb-3`}>
                        <type.icon className="w-6 h-6 text-white" />
                      </div>
                      <span className="font-medium text-gray-800">{type.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Destination Selection */}
              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <h3 className="text-xl font-bold text-gray-800 mb-4">Select Destinations</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {destinations.map((dest) => (
                    <div
                      key={dest.id}
                      className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                        selectedDestinations.includes(dest.id)
                          ? 'border-green-500 bg-green-50'
                          : 'border-gray-200 hover:border-green-300'
                      }`}
                      onClick={() => {
                        if (selectedDestinations.includes(dest.id)) {
                          setSelectedDestinations(selectedDestinations.filter(id => id !== dest.id));
                        } else {
                          setSelectedDestinations([...selectedDestinations, dest.id]);
                        }
                      }}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-semibold text-gray-800">{dest.name}</h4>
                          <p className="text-sm text-gray-600">{dest.type}</p>
                          <div className="flex items-center space-x-2 mt-2">
                            <div className="flex items-center space-x-1">
                              <Star className="w-4 h-4 text-yellow-400 fill-current" />
                              <span className="text-sm">{dest.rating}</span>
                            </div>
                            <span className="text-sm text-gray-500">•</span>
                            <span className="text-sm text-green-600">₹{dest.cost}</span>
                            <span className="text-sm text-gray-500">•</span>
                            <span className="text-sm text-gray-500">{dest.duration}</span>
                          </div>
                        </div>
                        {selectedDestinations.includes(dest.id) && (
                          <CheckCircle className="w-6 h-6 text-green-500" />
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column - Quick Actions */}
            <div className="space-y-6">
              {/* Transport Mode */}
              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <h3 className="text-xl font-bold text-gray-800 mb-4">Transport</h3>
                <div className="space-y-3">
                  {transportModes.map((mode) => (
                    <button
                      key={mode.id}
                      onClick={() => setTransportMode(mode.id)}
                      className={`w-full p-3 rounded-lg border-2 transition-all ${
                        transportMode === mode.id
                          ? 'border-green-500 bg-green-50'
                          : 'border-gray-200 hover:border-green-300'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <mode.icon className="w-6 h-6 text-gray-600" />
                        <div className="flex-1 text-left">
                          <div className="font-medium text-gray-800">{mode.name}</div>
                          <div className="text-sm text-gray-500">₹{mode.cost}/km • {mode.time}</div>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Accommodation */}
              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <h3 className="text-xl font-bold text-gray-800 mb-4">Accommodation</h3>
                <div className="space-y-3">
                  {accommodationTypes.map((acc) => (
                    <button
                      key={acc.id}
                      onClick={() => setAccommodationType(acc.id)}
                      className={`w-full p-3 rounded-lg border-2 transition-all ${
                        accommodationType === acc.id
                          ? 'border-green-500 bg-green-50'
                          : 'border-gray-200 hover:border-green-300'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <acc.icon className="w-6 h-6 text-gray-600" />
                        <div className="flex-1 text-left">
                          <div className="font-medium text-gray-800">{acc.name}</div>
                          <div className="text-sm text-gray-500">₹{acc.cost}/night</div>
                          <div className="text-xs text-gray-400">{acc.amenities.join(', ')}</div>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Generate Trip Button */}
              <button
                onClick={generateItinerary}
                className="w-full bg-green-600 text-white py-4 px-6 rounded-lg font-semibold hover:bg-green-700 transition-colors flex items-center justify-center space-x-2"
              >
                <Zap className="w-5 h-5" />
                <span>Generate My Trip</span>
              </button>
            </div>
          </div>
        )}

        {/* Itinerary Tab */}
        {activeTab === 'itinerary' && (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Your Trip Itinerary</h2>
              {itinerary.length > 0 ? (
                <div className="space-y-6">
                  {itinerary.map((day, index) => (
                    <div key={index} className="border-l-4 border-green-500 pl-6">
                      <div className="flex items-center space-x-3 mb-4">
                        <div className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center font-bold">
                          {day.day}
                        </div>
                        <h3 className="text-xl font-semibold text-gray-800">{day.destination}</h3>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <h4 className="font-medium text-gray-700 mb-2">Activities</h4>
                          <ul className="space-y-1">
                            {day.activities.map((activity: string, i: number) => (
                              <li key={i} className="text-sm text-gray-600 flex items-center space-x-2">
                                <CheckCircle className="w-4 h-4 text-green-500" />
                                <span>{activity}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-700 mb-2">Meals</h4>
                          <ul className="space-y-1">
                            {day.meals.map((meal: string, i: number) => (
                              <li key={i} className="text-sm text-gray-600 flex items-center space-x-2">
                                <Utensils className="w-4 h-4 text-orange-500" />
                                <span>{meal}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-700 mb-2">Accommodation</h4>
                          <div className="text-sm text-gray-600 flex items-center space-x-2">
                            <Bed className="w-4 h-4 text-blue-500" />
                            <span>{day.accommodation}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-600 mb-2">No Itinerary Generated Yet</h3>
                  <p className="text-gray-500">Configure your trip and click &quot;Generate My Trip&quot; to create your itinerary.</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Budget Tab */}
        {activeTab === 'budget' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Budget Breakdown</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Building className="w-6 h-6 text-green-600" />
                    <span className="font-medium">Accommodation</span>
                  </div>
                  <span className="font-semibold text-green-600">₹{budgetBreakdown.accommodation?.toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Car className="w-6 h-6 text-blue-600" />
                    <span className="font-medium">Transport</span>
                  </div>
                  <span className="font-semibold text-blue-600">₹{budgetBreakdown.transport?.toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between p-4 bg-orange-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Utensils className="w-6 h-6 text-orange-600" />
                    <span className="font-medium">Food</span>
                  </div>
                  <span className="font-semibold text-orange-600">₹{budgetBreakdown.food?.toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between p-4 bg-purple-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Camera className="w-6 h-6 text-purple-600" />
                    <span className="font-medium">Activities</span>
                  </div>
                  <span className="font-semibold text-purple-600">₹{budgetBreakdown.activities?.toLocaleString()}</span>
                </div>
              </div>
              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="flex items-center justify-between">
                  <span className="text-xl font-bold text-gray-800">Total Budget</span>
                  <span className="text-2xl font-bold text-green-600">₹{budget.toLocaleString()}</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Money Saving Tips</h2>
              <div className="space-y-4">
                <div className="flex items-start space-x-3 p-4 bg-yellow-50 rounded-lg">
                  <DollarSign className="w-6 h-6 text-yellow-600 mt-1" />
                  <div>
                    <h4 className="font-medium text-gray-800">Book in Advance</h4>
                    <p className="text-sm text-gray-600">Save up to 30% on accommodation and transport</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3 p-4 bg-green-50 rounded-lg">
                  <Users className="w-6 h-6 text-green-600 mt-1" />
                  <div>
                    <h4 className="font-medium text-gray-800">Group Discounts</h4>
                    <p className="text-sm text-gray-600">Travel with friends to share costs</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3 p-4 bg-blue-50 rounded-lg">
                  <Calendar className="w-6 h-6 text-blue-600 mt-1" />
                  <div>
                    <h4 className="font-medium text-gray-800">Off-Season Travel</h4>
                    <p className="text-sm text-gray-600">Visit during monsoon for better rates</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3 p-4 bg-purple-50 rounded-lg">
                  <Utensils className="w-6 h-6 text-purple-600 mt-1" />
                  <div>
                    <h4 className="font-medium text-gray-800">Local Food</h4>
                    <p className="text-sm text-gray-600">Try local cuisine for authentic experience</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Weather Tab */}
        {activeTab === 'weather' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Current Weather</h2>
              {weatherData && (
                <div className="text-center">
                  <div className="text-6xl font-bold text-gray-800 mb-2">{weatherData.current.temp}°C</div>
                  <div className="text-xl text-gray-600 mb-4">{weatherData.current.condition}</div>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="text-center">
                      <Wind className="w-6 h-6 text-gray-600 mx-auto mb-2" />
                      <div className="text-sm text-gray-500">Wind</div>
                      <div className="font-semibold">{weatherData.current.wind} km/h</div>
                    </div>
                    <div className="text-center">
                      <Eye className="w-6 h-6 text-gray-600 mx-auto mb-2" />
                      <div className="text-sm text-gray-500">Humidity</div>
                      <div className="font-semibold">{weatherData.current.humidity}%</div>
                    </div>
                    <div className="text-center">
                      <Thermometer className="w-6 h-6 text-gray-600 mx-auto mb-2" />
                      <div className="text-sm text-gray-500">Feels Like</div>
                      <div className="font-semibold">{weatherData.current.temp + 2}°C</div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">4-Day Forecast</h2>
s              {weatherData && (
                <div className="space-y-4">
                  {weatherData.forecast.map(
                    (
                      day: {
                        day: string;
                        condition: string;
                        temp: number;
                        icon: React.ComponentType<{ className?: string }>;
                      },
                      index: number
                    ) => (
                      <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <day.icon className="w-8 h-8 text-gray-600" />
                          <div>
                          <div className="font-medium text-gray-800">{day.day}</div>
                          <div className="text-sm text-gray-600">{day.condition}</div>
                        </div>
                      </div>
                      <div className="text-xl font-semibold text-gray-800">{day.temp}°C</div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Packing List Tab */}
        {activeTab === 'packing' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Essential Items</h2>
              <div className="space-y-4">
                <div className="space-y-3">
                  <h3 className="font-semibold text-gray-700">Clothing</h3>
                  <div className="space-y-2">
                    {['Light cotton clothes', 'Comfortable walking shoes', 'Rain jacket', 'Warm jacket for evenings', 'Hat/Cap'].map((item, index) => (
                      <label key={index} className="flex items-center space-x-3 cursor-pointer">
                        <input type="checkbox" className="w-4 h-4 text-green-600 rounded" />
                        <span className="text-gray-700">{item}</span>
                      </label>
                    ))}
                  </div>
                </div>
                <div className="space-y-3">
                  <h3 className="font-semibold text-gray-700">Electronics</h3>
                  <div className="space-y-2">
                    {['Camera/Phone', 'Power bank', 'Chargers', 'Headphones', 'Portable speaker'].map((item, index) => (
                      <label key={index} className="flex items-center space-x-3 cursor-pointer">
                        <input type="checkbox" className="w-4 h-4 text-green-600 rounded" />
                        <span className="text-gray-700">{item}</span>
                      </label>
                    ))}
                  </div>
                </div>
                <div className="space-y-3">
                  <h3 className="font-semibold text-gray-700">Health & Safety</h3>
                  <div className="space-y-2">
                    {['First aid kit', 'Sunscreen', 'Insect repellent', 'Medicines', 'Water bottle'].map((item, index) => (
                      <label key={index} className="flex items-center space-x-3 cursor-pointer">
                        <input type="checkbox" className="w-4 h-4 text-green-600 rounded" />
                        <span className="text-gray-700">{item}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Trip-Specific Items</h2>
              <div className="space-y-4">
                <div className="space-y-3">
                  <h3 className="font-semibold text-gray-700">Adventure Activities</h3>
                  <div className="space-y-2">
                    {['Hiking boots', 'Backpack', 'Waterproof bag', 'Trekking poles', 'Headlamp'].map((item, index) => (
                      <label key={index} className="flex items-center space-x-3 cursor-pointer">
                        <input type="checkbox" className="w-4 h-4 text-green-600 rounded" />
                        <span className="text-gray-700">{item}</span>
                      </label>
                    ))}
                  </div>
                </div>
                <div className="space-y-3">
                  <h3 className="font-semibold text-gray-700">Cultural Sites</h3>
                  <div className="space-y-2">
                    {['Modest clothing', 'Comfortable sandals', 'Small bag for offerings', 'Cultural guidebook'].map((item, index) => (
                      <label key={index} className="flex items-center space-x-3 cursor-pointer">
                        <input type="checkbox" className="w-4 h-4 text-green-600 rounded" />
                        <span className="text-gray-700">{item}</span>
                      </label>
                    ))}
                  </div>
                </div>
                <div className="space-y-3">
                  <h3 className="font-semibold text-gray-700">Wildlife Safari</h3>
                  <div className="space-y-2">
                    {['Binoculars', 'Neutral colored clothes', 'Camera with zoom lens', 'Wildlife guidebook'].map((item, index) => (
                      <label key={index} className="flex items-center space-x-3 cursor-pointer">
                        <input type="checkbox" className="w-4 h-4 text-green-600 rounded" />
                        <span className="text-gray-700">{item}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
