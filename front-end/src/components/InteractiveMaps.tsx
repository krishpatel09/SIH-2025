"use client";

import { useState } from "react";
import { MapPin, Navigation, Camera, Clock, Star, Route } from "lucide-react";
import Image from "next/image";

// Mock map data - In a real app, this would come from a mapping service
const destinations = [
  {
    id: 1,
    name: "Netarhat",
    coordinates: [23.4676, 84.2619],
    category: "Hill Station",
    rating: 4.8,
    image: "https://s7ap1.scene7.com/is/image/incredibleindia/netarhat-dam-ranchi-jharkhand-1-musthead-hero?qlt=82&ts=1727010909184",
    description: "Queen of Chotanagpur with stunning sunrise views",
    distance: "156 km from Ranchi"
  },
  {
    id: 2,
    name: "Betla National Park",
    coordinates: [23.9167, 84.1833],
    category: "Wildlife",
    rating: 4.6,
    image: "https://www.photobank.in/img/preview/1651567478AIG00052.jpg",
    description: "Wildlife sanctuary with tigers and elephants",
    distance: "170 km from Ranchi"
  },
  {
    id: 3,
    name: "Hundru Falls",
    coordinates: [23.2833, 85.6167],
    category: "Waterfall",
    rating: 4.7,
    image: "https://upload.wikimedia.org/wikipedia/commons/b/be/Hundru_Falls%2C_Jharkhand%2C_India_4.jpg",
    description: "320-foot majestic waterfall",
    distance: "45 km from Ranchi"
  },
  {
    id: 4,
    name: "Deoghar",
    coordinates: [24.4833, 86.7000],
    category: "Religious",
    rating: 4.9,
    image: "https://pbs.twimg.com/media/EMNwkhjVAAAbnEI.jpg:large",
    description: "Sacred Baidyanath Jyotirlinga temple",
    distance: "250 km from Ranchi"
  },
  {
    id: 5,
    name: "Patratu Valley",
    coordinates: [23.6833, 85.1667],
    category: "Valley",
    rating: 4.5,
    image: "http://visittotravel.com/wp-content/uploads/2023/09/Naulakha_Temple-jpg.webp",
    description: "Kashmir of Jharkhand",
    distance: "40 km from Ranchi"
  }
];

const categories = [
  { name: "All", color: "bg-blue-500", count: 5 },
  { name: "Hill Station", color: "bg-green-500", count: 2 },
  { name: "Wildlife", color: "bg-orange-500", count: 1 },
  { name: "Waterfall", color: "bg-cyan-500", count: 1 },
  { name: "Religious", color: "bg-purple-500", count: 1 }
];

export default function InteractiveMaps() {
  const [selectedDestination, setSelectedDestination] = useState(destinations[0]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [mapView, setMapView] = useState("satellite"); // satellite, terrain, roadmap

  const filteredDestinations = selectedCategory === "All" 
    ? destinations 
    : destinations.filter(dest => dest.category === selectedCategory);

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Interactive Tourism Map
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Explore Jharkhand with real-time navigation, AR previews, and location-based services
          </p>
        </div>

        {/* Map Interface */}
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-3 min-h-[600px]">
            {/* Map Area */}
            <div className="lg:col-span-2 relative bg-gradient-to-br from-green-100 to-blue-100">
              {/* Map Controls */}
              <div className="absolute top-4 left-4 z-10 space-y-2">
                <div className="bg-white rounded-lg shadow-lg p-2 flex space-x-1">
                  {["satellite", "terrain", "roadmap"].map((view) => (
                    <button
                      key={view}
                      onClick={() => setMapView(view)}
                      className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                        mapView === view
                          ? "bg-blue-500 text-white"
                          : "text-gray-600 hover:bg-gray-100"
                      }`}
                    >
                      {view.charAt(0).toUpperCase() + view.slice(1)}
                    </button>
                  ))}
                </div>
                <button className="bg-white rounded-lg shadow-lg p-3 hover:bg-gray-50 transition-colors">
                  <Navigation className="w-5 h-5 text-blue-500" />
                </button>
              </div>

              {/* Category Filter */}
              <div className="absolute top-4 right-4 z-10">
                <div className="bg-white rounded-lg shadow-lg p-3 space-y-2">
                  {categories.map((category) => (
                    <button
                      key={category.name}
                      onClick={() => setSelectedCategory(category.name)}
                      className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-all w-full ${
                        selectedCategory === category.name
                          ? "bg-blue-50 border border-blue-200"
                          : "hover:bg-gray-50"
                      }`}
                    >
                      <div className={`w-3 h-3 rounded-full ${category.color}`} />
                      <span>{category.name}</span>
                      <span className="text-gray-500">({category.count})</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Mock Map with Destination Markers */}
              <div className="w-full h-full flex items-center justify-center relative">
                <div className="text-center text-gray-500 mb-8">
                  <MapPin className="w-16 h-16 mx-auto mb-4 text-blue-500" />
                  <p className="text-lg font-medium">Interactive Map View</p>
                  <p className="text-sm">Real-time GPS navigation & AR integration</p>
                </div>

                {/* Destination Markers */}
                {filteredDestinations.map((destination, index) => (
                  <button
                    key={destination.id}
                    onClick={() => setSelectedDestination(destination)}
                    className={`absolute transform -translate-x-1/2 -translate-y-1/2 transition-all hover:scale-110 ${
                      selectedDestination.id === destination.id ? "scale-125" : ""
                    }`}
                    style={{
                      left: `${20 + (index * 15)}%`,
                      top: `${30 + (index * 10)}%`
                    }}
                  >
                    <div className={`w-6 h-6 rounded-full ${
                      categories.find(cat => cat.name === destination.category)?.color || "bg-blue-500"
                    } border-2 border-white shadow-lg animate-pulse`} />
                    <div className="absolute top-8 left-1/2 transform -translate-x-1/2 bg-white px-2 py-1 rounded shadow-lg text-xs font-medium whitespace-nowrap">
                      {destination.name}
                    </div>
                  </button>
                ))}
              </div>

              {/* AR/VR Preview Button */}
              <div className="absolute bottom-4 left-4 z-10">
                <button className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2 rounded-lg shadow-lg hover:shadow-xl transition-all flex items-center space-x-2">
                  <Camera className="w-5 h-5" />
                  <span className="font-medium">AR Preview</span>
                </button>
              </div>

              {/* Route Planning */}
              <div className="absolute bottom-4 right-4 z-10">
                <button className="bg-green-600 text-white px-4 py-2 rounded-lg shadow-lg hover:shadow-xl transition-all flex items-center space-x-2">
                  <Route className="w-5 h-5" />
                  <span className="font-medium">Plan Route</span>
                </button>
              </div>
            </div>

            {/* Destination Details Sidebar */}
            <div className="bg-gray-50 p-6 overflow-y-auto">
              <div className="space-y-6">
                {/* Selected Destination */}
                <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                  <Image
                    src={selectedDestination.image}
                    alt={selectedDestination.name}
                    width={400}
                    height={192}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="text-xl font-bold text-gray-800">{selectedDestination.name}</h3>
                      <div className="flex items-center space-x-1 bg-yellow-100 px-2 py-1 rounded-full">
                        <Star className="w-4 h-4 text-yellow-500 fill-current" />
                        <span className="text-sm font-medium">{selectedDestination.rating}</span>
                      </div>
                    </div>
                    <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium text-white mb-3 ${
                      categories.find(cat => cat.name === selectedDestination.category)?.color || "bg-blue-500"
                    }`}>
                      {selectedDestination.category}
                    </span>
                    <p className="text-gray-600 mb-4">{selectedDestination.description}</p>
                    
                    <div className="flex items-center space-x-2 text-sm text-gray-500 mb-4">
                      <Navigation className="w-4 h-4" />
                      <span>{selectedDestination.distance}</span>
                    </div>

                    <div className="space-y-2">
                      <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors">
                        Get Directions
                      </button>
                      <button className="w-full bg-green-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-green-700 transition-colors">
                        Book Experience
                      </button>
                    </div>
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="bg-white rounded-2xl p-4 shadow-lg">
                  <h4 className="font-bold text-gray-800 mb-4">Quick Actions</h4>
                  <div className="space-y-3">
                    <button className="w-full flex items-center space-x-3 p-3 text-left hover:bg-gray-50 rounded-lg transition-colors">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                        <Camera className="w-4 h-4 text-blue-600" />
                      </div>
                      <span className="font-medium">AR/VR Preview</span>
                    </button>
                    <button className="w-full flex items-center space-x-3 p-3 text-left hover:bg-gray-50 rounded-lg transition-colors">
                      <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                        <Navigation className="w-4 h-4 text-green-600" />
                      </div>
                      <span className="font-medium">Live Navigation</span>
                    </button>
                    <button className="w-full flex items-center space-x-3 p-3 text-left hover:bg-gray-50 rounded-lg transition-colors">
                      <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                        <Clock className="w-4 h-4 text-purple-600" />
                      </div>
                      <span className="font-medium">Real-time Updates</span>
                    </button>
                  </div>
                </div>

                {/* Nearby Destinations */}
                <div className="bg-white rounded-2xl p-4 shadow-lg">
                  <h4 className="font-bold text-gray-800 mb-4">Nearby Destinations</h4>
                  <div className="space-y-3">
                    {destinations
                      .filter(dest => dest.id !== selectedDestination.id)
                      .slice(0, 3)
                      .map((dest) => (
                        <button
                          key={dest.id}
                          onClick={() => setSelectedDestination(dest)}
                          className="w-full flex items-center space-x-3 p-2 text-left hover:bg-gray-50 rounded-lg transition-colors"
                        >
                          <div className="relative w-10 h-10">
                            <Image
                              src={dest.image}
                              alt={dest.name}
                              fill
                              className="rounded-lg object-cover"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-medium text-sm truncate">{dest.name}</p>
                            <p className="text-xs text-gray-500">{dest.distance}</p>
                          </div>
                          <div className="flex items-center">
                            <Star className="w-3 h-3 text-yellow-500 fill-current" />
                            <span className="text-xs ml-1">{dest.rating}</span>
                          </div>
                        </button>
                      ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Features Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          <div className="text-center p-6 bg-white rounded-2xl shadow-lg">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Navigation className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="text-lg font-bold text-gray-800 mb-2">Real-time GPS</h3>
            <p className="text-gray-600 text-sm">Accurate navigation with offline map support and live traffic updates</p>
          </div>
          
          <div className="text-center p-6 bg-white rounded-2xl shadow-lg">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Camera className="w-8 h-8 text-purple-600" />
            </div>
            <h3 className="text-lg font-bold text-gray-800 mb-2">AR/VR Integration</h3>
            <p className="text-gray-600 text-sm">Virtual previews and augmented reality experiences of destinations</p>
          </div>
          
          <div className="text-center p-6 bg-white rounded-2xl shadow-lg">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <MapPin className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-lg font-bold text-gray-800 mb-2">Location Services</h3>
            <p className="text-gray-600 text-sm">Geo-location based recommendations and proximity alerts</p>
          </div>
        </div>
      </div>
    </section>
  );
}
