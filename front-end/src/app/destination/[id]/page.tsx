'use client';

import { useState, useEffect, useCallback } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { 
  ArrowLeft, 
  Star, 
  Thermometer, 
  Calendar,
  Navigation,
  Heart,
  Share2,
  Phone,
  Globe
} from 'lucide-react';
import Image from 'next/image';
// import ImageUpload from '@/components/ImageUpload';
import axiosInstance from '@/services/axiosInstance';
import API_PATHS from '@/services/apiPath';
// const images = []

export default function DestinationDetailPage() {
  const params = useParams();
  const {id} = params;
  console.log('id',id);
  const router = useRouter();
  const [destination, setDestination] = useState<{
    id: string;
    name: string;
    description: string;
    location: string;
    category: string;
    rating: number;
    images: string[];
    attractions: { name: string; description: string; image: string }[];
    activities: string[];
    bestTimeToVisit: string;
    entryFee: number;
    coordinates: { lat: number; lng: number };
  } | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [, setError] = useState<string | null>(null);

  const fetchDestination = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await axiosInstance.get(API_PATHS.DESTINATIONS.GET_BY_ID(id as string));
    console.log('response',response);
    if (response.data.success && response.data.data) {
      setDestination(response.data.data);
    } else {
      setError(response.data.error || 'Failed to fetch destination');
    }
    } catch (error) {
      console.log('error',error);
      
    }
    finally{
      setIsLoading(false);
    }
  }, [id]);
  useEffect(() => {
    fetchDestination();
    }, [fetchDestination]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-green-500"></div>
      </div>
    );
  }

  if (!destination) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Destination Not Found</h1>
          <button 
            onClick={() => router.back()}
            className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <button 
              onClick={() => router.back()}
              className="flex items-center space-x-2 text-gray-600 hover:text-green-600 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Back</span>
            </button>
            <div className="flex items-center space-x-4">
              <button className="p-2 text-gray-600 hover:text-red-500 transition-colors">
                <Heart className="w-5 h-5" />
              </button>
              <button className="p-2 text-gray-600 hover:text-green-600 transition-colors">
                <Share2 className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="relative h-96 overflow-hidden">
        <Image
          src={destination.image}
          alt={destination.name}
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-6 left-6 text-white">
          <div className="flex items-center space-x-2 mb-2">
            <span className="bg-green-600 px-3 py-1 rounded-full text-sm font-semibold">
              {destination.category}
            </span>
            <div className="flex items-center space-x-1 bg-white/20 backdrop-blur-sm px-2 py-1 rounded-full">
              <Star className="w-4 h-4 text-yellow-400 fill-current" />
              <span className="text-sm font-semibold">{destination.rating}</span>
            </div>
          </div>
          <h1 className="text-4xl font-bold mb-2">{destination.name}</h1>
          <p className="text-xl text-gray-200">{destination.title}</p>
        </div>
      </div>

      {/* Main Content */}

     
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Main Info */}
          <div className="lg:col-span-2 space-y-8">
            {/* Description */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">About {destination.name}</h2>
              <p className="text-gray-600 leading-relaxed mb-4">{destination.description}</p>
              <p className="text-gray-600 leading-relaxed">{destination.detailedDescription}</p>
            </div>

            {/* Attractions */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Key Attractions</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {destination?.attractions?.map((attraction: { name: string; description: string; image: string }, index: number) => (
                  <div key={index} className="group">
                    <div className="relative h-48 rounded-lg overflow-hidden mb-3">
                      <Image
                        src={attraction.image}
                        alt={attraction.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <h3 className="font-semibold text-gray-800 mb-2">{attraction.name}</h3>
                    <p className="text-gray-600 text-sm">{attraction.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Activities */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Activities</h2>
              <div className="flex flex-wrap gap-3">
                {destination?.activities?.map((activity: string, index: number) => (
                  <span
                    key={index}
                    className="bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-medium"
                  >
                    {activity}
                  </span>
                ))}
              </div>
            </div>

            {/* Image Gallery */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Gallery</h2>
              <div className="grid grid-cols-2 gap-4">
                {destination?.images?.map((image: string, index: number) => (
                  <div key={index} className="group relative overflow-hidden rounded-lg">
                    <Image
                      src={image}
                      alt={`${destination.name} gallery image ${index + 1}`}
                      width={400}
                      height={192}
                      className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300" />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-6">
            {/* Quick Info */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Quick Info</h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Thermometer className="w-5 h-5 text-green-600" />
                  <div>
                    <p className="text-sm text-gray-500">Temperature</p>
                    <p className="font-semibold text-gray-800">{destination.temperature}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Calendar className="w-5 h-5 text-green-600" />
                  <div>
                    <p className="text-sm text-gray-500">Best Time</p>
                    <p className="font-semibold text-gray-800">{destination.bestTimeToVisit}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Star className="w-5 h-5 text-green-600" />
                  <div>
                    <p className="text-sm text-gray-500">Rating</p>
                    <p className="font-semibold text-gray-800">{destination.rating}/5.0</p>
                  </div>
                </div>
              </div>
            </div>

            {/* How to Reach */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h3 className="text-xl font-bold text-gray-800 mb-4">How to Reach</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{destination?.howToReach}</p>
            </div>

            {/* Accommodation */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Accommodation</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{destination?.accommodation}</p>
            </div>

            {/* Contact Info */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Contact Information</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Phone className="w-4 h-4 text-green-600" />
                  <span className="text-sm text-gray-600">{destination?.contactInfo?.phone}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Globe className="w-4 h-4 text-green-600" />
                  <span className="text-sm text-gray-600">{destination?.contactInfo?.website}</span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <button className="w-full bg-green-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-green-700 transition-colors flex items-center justify-center space-x-2">
                <Navigation className="w-5 h-5" />
                <span>Get Directions</span>
              </button>
              <button className="w-full border border-green-600 text-green-600 py-3 px-6 rounded-lg font-semibold hover:bg-green-50 transition-colors flex items-center justify-center space-x-2">
                <Calendar className="w-5 h-5" />
                <span>Plan Visit</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
