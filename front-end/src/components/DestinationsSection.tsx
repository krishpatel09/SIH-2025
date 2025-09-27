"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { MapPin, Star, Camera, Clock, Thermometer } from "lucide-react";
import Image from "next/image";
import axiosInstance from "@/services/axiosInstance";
import API_PATHS from "@/services/apiPath";
// import { destinationService, Destination } from "../services";

const categories = ["All", "Hill Station", "Wildlife", "Waterfall", "Valley", "Religious", "City"];

export default function DestinationsSection() {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [destinations, setDestinations] = useState<{
    id: string;
    name: string;
    description: string;
    image: string;
    category: string;
    rating: number;
    location: string;
  }[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        const response = await axiosInstance.get(API_PATHS.DESTINATIONS.GET_ALL);
        if (response.data.success && response.data.data) {
          setDestinations(response.data.data);
        } else {
          setError(response.data.error || 'Failed to fetch destinations');
        }
      } catch (error) {
        console.error('Error fetching destinations:', error);
        setError('Failed to fetch destinations');
      } finally {
        setLoading(false);
      }
    };

    fetchDestinations();
  }, []);

  const filteredDestinations = selectedCategory === "All" 
    ? destinations 
    : destinations.filter((dest) => dest.category === selectedCategory);

  // Navigation handler for Explore button
  const handleExploreClick = (destinationId: string) => {
    router.push(`/destination/${destinationId}`);
    
  };

  // Navigation handler for View All button
  const handleViewAllClick = () => {
    router.push('/destinations'); // You can create this page later for listing all destinations
  };

  // Loading state
  if (loading) {
    return (
      <section id="destinations" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500"></div>
          </div>
        </div>
      </section>
    );
  }

  // Error state
  if (error) {
    return (
      <section id="destinations" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center text-red-500">
            <p>Error loading destinations: {error}</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="destinations" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Explore Destinations
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Discover the hidden gems and popular attractions across Jharkhand
          </p>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-3 rounded-full font-semibold transition-all ${
                  selectedCategory === category
                    ? "bg-green-600 text-white shadow-lg"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Destinations Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredDestinations.map((destination) => (
            <div
              key={destination.id}
              className="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
            >
              {/* Image */}
              <div className="relative h-64 overflow-hidden">
                <Image
                  src={destination.image}
                  alt={destination.name}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-green-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    {destination.category}
                  </span>
                </div>
                <div className="absolute top-4 right-4">
                  <div className="flex items-center space-x-1 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full">
                    <Star className="w-4 h-4 text-yellow-500 fill-current" />
                    <span className="text-sm font-semibold">{destination.rating}</span>
                  </div>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <button 
                  onClick={() => handleExploreClick(destination.id)}
                  className="absolute bottom-4 right-4 bg-white/20 backdrop-blur-sm p-2 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white/30"
                >
                  <Camera className="w-5 h-5 text-white" />
                </button>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="text-xl font-bold text-gray-800 group-hover:text-green-600 transition-colors">
                      {destination.name}
                    </h3>
                    <p className="text-green-600 font-medium">{destination.title}</p>
                  </div>
                </div>

                <p className="text-gray-600 mb-4 line-clamp-2">
                  {destination.description}
                </p>

                {/* Info */}
                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <div className="flex items-center space-x-1">
                    <Thermometer className="w-4 h-4" />
                    <span>{destination.temperature}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Clock className="w-4 h-4" />
                    <span>{destination.bestTime}</span>
                  </div>
                </div>

                {/* Highlights */}
                <div className="mb-4">
                  <div className="flex flex-wrap gap-2">
                    {destination.highlights?.slice(0, 2).map((highlight: string, index: number) => (
                      <span
                        key={index}
                        className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
                      >
                        {highlight}
                      </span>
                    ))}
                    {destination.highlights.length > 2 && (
                      <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
                        +{destination.highlights.length - 2} more
                      </span>
                    )}
                  </div>
                </div>

                {/* CTA */}
                <div className="flex space-x-3">
                  <button 
                    onClick={() => handleExploreClick(destination.id)}
                    className="flex-1 bg-green-600 text-white py-2 px-4 rounded-lg font-semibold hover:bg-green-700 transition-colors"
                  >
                    Explore
                  </button>
                  <button 
                    onClick={() => handleExploreClick(destination.id)}
                    className="flex items-center justify-center p-2 border border-gray-300 rounded-lg hover:border-green-600 hover:text-green-600 transition-colors"
                  >
                    <MapPin className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <button 
            onClick={handleViewAllClick}
            className="bg-gray-800 text-white px-8 py-4 rounded-full font-semibold hover:bg-gray-900 transition-colors"
          >
            View All Destinations
          </button>
        </div>
      </div>
    </section>
  );
}
