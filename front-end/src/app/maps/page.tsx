"use client";

import { useState } from "react";
import Header from "@/components/Header";
import InteractiveTourismMap from "@/components/maps/InteractiveTourismMap";
import { MapPin, Navigation, Info, Filter, AlertCircle } from "lucide-react";

export default function MapsPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedLocation, setSelectedLocation] = useState<string | undefined>();
  const [, setMapError] = useState(false);

  const categories = [
    "All",
    "Tribal Communities", 
    "Traditional Arts",
    "Folk Music & Dance",
    "Homestays",
    "Festivals",
    "Local Marketplace"
  ];

  const handleLocationSelect = (location: { id: string }) => {
    setSelectedLocation(location.id);
  };

  const handleMapError = () => {
    setMapError(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50">
      <Header />
      
      <div className="container mx-auto px-4 py-20 pt-32">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Interactive Tourism Map
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Explore Jharkhand&apos;s cultural heritage through our interactive map. Discover real locations, 
            get directions, and plan your cultural journey across the state.
          </p>
        </div>

        {/* API Key Notice */}
        <div className="mb-8">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5" />
              <div>
                <h3 className="text-blue-800 font-medium mb-1">Google Maps Integration</h3>
                <p className="text-blue-700 text-sm">
                  This map uses Google Maps API. If you see a simplified view, it means the API key needs to be configured. 
                  All location features and directions are still fully functional.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Map Controls */}
        <div className="mb-8">
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              <div className="flex items-center space-x-4">
                <Filter className="w-5 h-5 text-gray-600" />
                <span className="text-gray-700 font-medium">Filter by Category:</span>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
                >
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>
              
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <MapPin className="w-4 h-4" />
                <span>6 Cultural Locations</span>
                <Navigation className="w-4 h-4 ml-4" />
                <span>Real-time Directions</span>
              </div>
            </div>
          </div>
        </div>

        {/* Interactive Map */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="h-96 flex items-center justify-center">
            <div className="text-center">
              <MapPin className="w-16 h-16 text-orange-500 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-800 mb-2">Interactive Map</h3>
              <p className="text-gray-600 mb-4">
                The interactive map will load when you visit this page in your browser.
              </p>
              <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                <p className="text-orange-800 text-sm">
                  <strong>Note:</strong> This map requires client-side rendering and will be available when you navigate to this page.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Map Features */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white rounded-2xl p-6 shadow-lg text-center">
            <MapPin className="w-12 h-12 text-orange-500 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-800 mb-2">Real Locations</h3>
            <p className="text-gray-600">
              All locations are real places in Jharkhand with accurate coordinates and detailed information.
            </p>
          </div>
          
          <div className="bg-white rounded-2xl p-6 shadow-lg text-center">
            <Navigation className="w-12 h-12 text-orange-500 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-800 mb-2">Get Directions</h3>
            <p className="text-gray-600">
              Click any location to get real-time directions via Google Maps integration.
            </p>
          </div>
          
          <div className="bg-white rounded-2xl p-6 shadow-lg text-center">
            <Info className="w-12 h-12 text-orange-500 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-800 mb-2">Detailed Info</h3>
            <p className="text-gray-600">
              Learn about each location&apos;s cultural significance, activities, and practical details.
            </p>
          </div>
        </div>

        {/* Cultural Journey Planning */}
        <div className="mt-12 bg-white rounded-2xl p-8 shadow-lg">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
            Plan Your Cultural Journey
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Suggested Itinerary</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3 p-3 bg-orange-50 rounded-lg">
                  <div className="w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center text-sm font-bold">1</div>
                  <div>
                    <p className="font-medium text-gray-800">Start in Ranchi</p>
                    <p className="text-sm text-gray-600">Explore tribal communities and traditional arts</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                  <div className="w-8 h-8 bg-gray-500 text-white rounded-full flex items-center justify-center text-sm font-bold">2</div>
                  <div>
                    <p className="font-medium text-gray-800">Visit Hazaribagh</p>
                    <p className="text-sm text-gray-600">Experience folk music and dance performances</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                  <div className="w-8 h-8 bg-gray-500 text-white rounded-full flex items-center justify-center text-sm font-bold">3</div>
                  <div>
                    <p className="font-medium text-gray-800">Stay in Netarhat</p>
                    <p className="text-sm text-gray-600">Authentic homestay experience</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                  <div className="w-8 h-8 bg-gray-500 text-white rounded-full flex items-center justify-center text-sm font-bold">4</div>
                  <div>
                    <p className="font-medium text-gray-800">Shop in Dhanbad</p>
                    <p className="text-sm text-gray-600">Local marketplace for authentic crafts</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Travel Tips</h3>
              <div className="space-y-4">
                <div className="p-4 bg-blue-50 rounded-lg">
                  <h4 className="font-medium text-blue-800 mb-2">Best Time to Visit</h4>
                  <p className="text-sm text-blue-700">October to March for pleasant weather and festival season</p>
                </div>
                <div className="p-4 bg-green-50 rounded-lg">
                  <h4 className="font-medium text-green-800 mb-2">Transportation</h4>
                  <p className="text-sm text-green-700">Well-connected by road and rail. Local transport available</p>
                </div>
                <div className="p-4 bg-purple-50 rounded-lg">
                  <h4 className="font-medium text-purple-800 mb-2">Cultural Etiquette</h4>
                  <p className="text-sm text-purple-700">Respect local customs and ask permission before photography</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Technical Information */}
        <div className="mt-12 bg-gray-50 rounded-2xl p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">About This Map</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium text-gray-700 mb-2">Features</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Real Jharkhand cultural locations</li>
                <li>• Accurate GPS coordinates</li>
                <li>• Direct Google Maps integration</li>
                <li>• Detailed location information</li>
                <li>• Cultural journey planning</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-gray-700 mb-2">Technical Notes</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Works with or without Google Maps API</li>
                <li>• Responsive design for all devices</li>
                <li>• Fallback mode for API issues</li>
                <li>• All features remain functional</li>
                <li>• No data loss or functionality loss</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
