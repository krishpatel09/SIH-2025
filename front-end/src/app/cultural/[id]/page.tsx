"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { culturalService, CulturalElement } from "@/services/culturalService";
import { ArrowLeft, MapPin, Share2, Heart, Eye, Camera, X, ChevronLeft, ChevronRight, ExternalLink } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import Header from "@/components/Header";
import InteractiveTourismMap from "@/components/maps/InteractiveTourismMap";

export default function CulturalDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [element, setElement] = useState<CulturalElement | null>(null);
  const [relatedElements, setRelatedElements] = useState<CulturalElement[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const [showGallery, setShowGallery] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showLocationModal, setShowLocationModal] = useState(false);
  const [showMapModal, setShowMapModal] = useState(false);

  // Generate sample gallery images for demonstration
  const generateGalleryImages = (element: CulturalElement) => {
    const baseImages = [
      element.image,
      "https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    ];
    return baseImages.filter(Boolean);
  };

  // Get location coordinates for Jharkhand cultural sites
  const getLocationData = (element: CulturalElement) => {
    const locations = {
      "Tribal Communities": { lat: 23.3441, lng: 85.3096, name: "Ranchi, Jharkhand" },
      "Traditional Arts": { lat: 22.8015, lng: 86.2029, name: "Jamshedpur, Jharkhand" },
      "Folk Music & Dance": { lat: 24.0000, lng: 85.3500, name: "Hazaribagh, Jharkhand" },
      "Homestays": { lat: 23.4833, lng: 84.7167, name: "Netarhat, Jharkhand" },
      "Festivals": { lat: 24.4833, lng: 86.7000, name: "Deoghar, Jharkhand" },
      "Local Marketplace": { lat: 23.8000, lng: 86.4500, name: "Dhanbad, Jharkhand" }
    };
    return locations[element.title as keyof typeof locations] || { lat: 23.3441, lng: 85.3096, name: "Jharkhand, India" };
  };

  // Get map location ID for the interactive map
  const getMapLocationId = (element: CulturalElement) => {
    const mapIds = {
      "Tribal Communities": "tribal-communities-ranchi",
      "Traditional Arts": "traditional-arts-jamshedpur", 
      "Folk Music & Dance": "folk-music-dance-hazaribagh",
      "Homestays": "homestays-netarhat",
      "Festivals": "festivals-deoghar",
      "Local Marketplace": "marketplace-dhanbad"
    };
    return mapIds[element.title as keyof typeof mapIds];
  };

  useEffect(() => {
    const fetchCulturalElement = async () => {
      if (!params.id || typeof params.id !== 'string') {
        setError('Invalid cultural element ID');
        setLoading(false);
        return;
      }

      console.log('Fetching cultural element with ID:', params.id);

      try {
        setLoading(true);
        
        // First try to get basic element data
        const basicResponse = await culturalService.getCulturalElementById(params.id);
        console.log('Basic response:', basicResponse);
        
        if (basicResponse.success && basicResponse.data) {
          setElement(basicResponse.data);
          
          // Try to get detailed data
          const detailResponse = await culturalService.getCulturalElementDetails(params.id);
          console.log('Detail response:', detailResponse);
          
          if (detailResponse.success && detailResponse.data) {
            setElement(detailResponse.data);
          }
          
          // Fetch related elements from the same category
          if (basicResponse.data.category) {
            const relatedResponse = await culturalService.getCulturalElementsByCategory(basicResponse.data.category);
            if (relatedResponse.success && relatedResponse.data) {
              // Filter out the current element and limit to 3 related items
              const related = relatedResponse.data
                .filter(el => el.id !== params.id)
                .slice(0, 3);
              setRelatedElements(related);
            }
          }
        } else {
          setError(basicResponse.error || 'Cultural element not found');
        }
      } catch (error) {
        console.error('Error fetching cultural element:', error);
        setError(`Failed to fetch cultural element: ${error instanceof Error ? error.message : 'Unknown error'}`);
      } finally {
        setLoading(false);
      }
    };
    
    fetchCulturalElement();
  }, [params.id]);

  const handleShare = async () => {
    if (navigator.share && element) {
      try {
        await navigator.share({
          title: element.title,
          text: element.description,
          url: window.location.href,
        });
      } catch (error) {
        console.log('Error sharing:', error);
      }
    } else {
      // Fallback to copying URL to clipboard
      navigator.clipboard.writeText(window.location.href);
      alert('URL copied to clipboard!');
    }
  };

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
    // Here you would typically save to localStorage or backend
  };

  const openGallery = () => {
    setShowGallery(true);
    setCurrentImageIndex(0);
  };

  const closeGallery = () => {
    setShowGallery(false);
  };

  const nextImage = () => {
    if (element) {
      const images = generateGalleryImages(element);
      setCurrentImageIndex((prev) => (prev + 1) % images.length);
    }
  };

  const prevImage = () => {
    if (element) {
      const images = generateGalleryImages(element);
      setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
    }
  };

  const openLocationModal = () => {
    setShowLocationModal(true);
  };

  const closeLocationModal = () => {
    setShowLocationModal(false);
  };

  const openMapModal = () => {
    setShowMapModal(true);
  };

  const closeMapModal = () => {
    setShowMapModal(false);
  };

  const openInGoogleMaps = () => {
    if (element) {
      const location = getLocationData(element);
      const url = `https://www.google.com/maps?q=${location.lat},${location.lng}`;
      window.open(url, '_blank');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50">
        <Header />
        <div className="container mx-auto px-4 py-20 pt-32">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading cultural element...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error || !element) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50">
        <Header />
        <div className="container mx-auto px-4 py-20 pt-32">
          <div className="text-center">
            <p className="text-red-600 text-lg mb-4">Error: {error}</p>
            <div className="space-x-4">
              <button 
                onClick={() => router.back()} 
                className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
              >
                Go Back
              </button>
              <button 
                onClick={() => window.location.reload()} 
                className="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600"
              >
                Retry
              </button>
            </div>
            <div className="mt-8 p-4 bg-gray-100 rounded-lg text-left max-w-md mx-auto">
              <h3 className="font-semibold mb-2">Debug Info:</h3>
              <p className="text-sm text-gray-600">ID: {params.id}</p>
              <p className="text-sm text-gray-600">Type: {typeof params.id}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const galleryImages = generateGalleryImages(element);
  const locationData = getLocationData(element);
  const mapLocationId = getMapLocationId(element);

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50">
      <Header />
      
      {/* Page Header */}
      <div className="bg-white shadow-sm pt-20">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => router.back()}
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Back</span>
            </button>
            
            <div className="flex items-center space-x-3">
              <button
                onClick={toggleFavorite}
                className={`p-2 rounded-full transition-colors ${
                  isFavorite ? 'bg-red-100 text-red-500' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                }`}
              >
                <Heart className={`w-5 h-5 ${isFavorite ? 'fill-current' : ''}`} />
              </button>
              <button
                onClick={handleShare}
                className="p-2 rounded-full bg-gray-100 text-gray-500 hover:bg-gray-200 transition-colors"
              >
                <Share2 className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden mb-8">
          <div className="relative h-96">
            <Image
              src={element.image || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_polnl5Mc1r9wBeeOXdnBO6JdIxJe5yShcw&s"}
              alt={element.title}
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
            
            {/* Category Badge */}
            {element.category && (
              <div className="absolute top-6 left-6">
                <span className="bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                  {element.category}
                </span>
              </div>
            )}
            
            {/* Title and Location */}
            <div className="absolute bottom-6 left-6 text-white">
              <h1 className="text-4xl font-bold mb-2">{element.title}</h1>
              {element.location && (
                <div className="flex items-center space-x-2">
                  <MapPin className="w-5 h-5" />
                  <span className="text-lg">{element.location}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Description */}
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">About</h2>
              <p className="text-gray-600 leading-relaxed text-lg">
                {element.description}
              </p>
            </div>

            {/* Cultural Significance */}
            {element.significance && (
              <div className="bg-white rounded-2xl p-8 shadow-lg">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Cultural Significance</h2>
                <p className="text-gray-600 leading-relaxed">
                  {element.significance}
                </p>
              </div>
            )}

            {/* Traditions */}
            {element.traditions && element.traditions.length > 0 && (
              <div className="bg-white rounded-2xl p-8 shadow-lg">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Traditions & Practices</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {element.traditions.map((tradition, index) => (
                    <div key={index} className="flex items-start space-x-3 p-4 bg-orange-50 rounded-xl">
                      <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0" />
                      <span className="text-gray-700">{tradition}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Key Features */}
            {element.items && element.items.length > 0 && (
              <div className="bg-white rounded-2xl p-8 shadow-lg">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Key Features</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {element.items.map((item, index) => (
                    <div key={index} className="flex items-start space-x-3 p-4 bg-gray-50 rounded-xl">
                      <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0" />
                      <span className="text-gray-700">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Info */}
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Quick Info</h3>
              <div className="space-y-3">
                {element.category && (
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Category</span>
                    <span className="font-medium text-gray-800">{element.category}</span>
                  </div>
                )}
                {element.location && (
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Location</span>
                    <span className="font-medium text-gray-800">{element.location}</span>
                  </div>
                )}
                {element.createdAt && (
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Added</span>
                    <span className="font-medium text-gray-800">
                      {new Date(element.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Explore</h3>
              <div className="space-y-3">
                <button 
                  onClick={openGallery}
                  className="w-full bg-orange-500 text-white py-3 rounded-lg font-semibold hover:bg-orange-600 transition-colors flex items-center justify-center space-x-2"
                >
                  <Camera className="w-5 h-5" />
                  <span>View Gallery ({galleryImages.length})</span>
                </button>
                <button 
                  onClick={openLocationModal}
                  className="w-full border border-orange-500 text-orange-500 py-3 rounded-lg font-semibold hover:bg-orange-50 transition-colors flex items-center justify-center space-x-2"
                >
                  <MapPin className="w-5 h-5" />
                  <span>Find Location</span>
                </button>
                <button 
                  onClick={openMapModal}
                  className="w-full border border-blue-500 text-blue-500 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors flex items-center justify-center space-x-2"
                >
                  <MapPin className="w-5 h-5" />
                  <span>Interactive Map</span>
                </button>
                <Link href="/cultural">
                  <button className="w-full border border-gray-300 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors flex items-center justify-center space-x-2">
                    <Eye className="w-5 h-5" />
                    <span>Browse All</span>
                  </button>
                </Link>
              </div>
            </div>

            {/* Related Elements */}
            {relatedElements.length > 0 && (
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <h3 className="text-xl font-bold text-gray-800 mb-4">Related Elements</h3>
                <div className="space-y-4">
                  {relatedElements.map((related) => (
                    <Link key={related.id} href={`/cultural/${related.id}`}>
                      <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
                        <div className="relative w-12 h-12">
                          <Image
                            src={related.image || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_polnl5Mc1r9wBeeOXdnBO6JdIxJe5yShcw&s"}
                            alt={related.title}
                            fill
                            className="object-cover rounded-lg"
                          />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-800 text-sm">{related.title}</h4>
                          <p className="text-gray-600 text-xs truncate">{related.description}</p>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Gallery Modal */}
      {showGallery && (
        <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center">
          <div className="relative max-w-4xl max-h-[90vh] w-full mx-4">
            {/* Close Button */}
            <button
              onClick={closeGallery}
              className="absolute top-4 right-4 z-10 bg-white bg-opacity-20 hover:bg-opacity-30 text-white p-2 rounded-full transition-colors"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Image */}
            <div className="relative">
              <Image
                src={galleryImages[currentImageIndex]}
                alt={`${element.title} - Image ${currentImageIndex + 1}`}
                width={800}
                height={600}
                className="w-full h-auto max-h-[80vh] object-contain rounded-lg"
              />
              
              {/* Navigation Buttons */}
              {galleryImages.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-20 hover:bg-opacity-30 text-white p-2 rounded-full transition-colors"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-20 hover:bg-opacity-30 text-white p-2 rounded-full transition-colors"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>
                </>
              )}
            </div>

            {/* Image Counter */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-white bg-opacity-20 text-white px-3 py-1 rounded-full text-sm">
              {currentImageIndex + 1} / {galleryImages.length}
            </div>

            {/* Thumbnail Strip */}
            <div className="flex space-x-2 mt-4 justify-center overflow-x-auto">
              {galleryImages.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden ${
                    index === currentImageIndex ? 'ring-2 ring-orange-500' : ''
                  }`}
                >
                  <Image
                    src={image}
                    alt={`Thumbnail ${index + 1}`}
                    width={64}
                    height={64}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Location Modal */}
      {showLocationModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full mx-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-gray-800">Location Information</h3>
              <button
                onClick={closeLocationModal}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <MapPin className="w-5 h-5 text-orange-500" />
                <div>
                  <p className="font-medium text-gray-800">{locationData.name}</p>
                  <p className="text-sm text-gray-600">Coordinates: {locationData.lat}, {locationData.lng}</p>
                </div>
              </div>
              
              <div className="bg-gray-100 rounded-lg p-4">
                <h4 className="font-medium text-gray-800 mb-2">About this location:</h4>
                <p className="text-sm text-gray-600">
                  This cultural element is associated with {locationData.name}. 
                  Click &quot;Open in Google Maps&quot; to get directions and explore the area.
                </p>
              </div>
              
              <div className="flex space-x-3">
                <button
                  onClick={openInGoogleMaps}
                  className="flex-1 bg-orange-500 text-white py-2 rounded-lg font-semibold hover:bg-orange-600 transition-colors flex items-center justify-center space-x-2"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>Open in Google Maps</span>
                </button>
                <button
                  onClick={closeLocationModal}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Interactive Map Modal */}
      {showMapModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-6xl w-full max-h-[90vh] overflow-hidden">
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <h3 className="text-xl font-bold text-gray-800">Interactive Tourism Map</h3>
              <button
                onClick={closeMapModal}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="p-4 overflow-y-auto max-h-[calc(90vh-80px)]">
              <InteractiveTourismMap 
                selectedLocation={mapLocationId}
                onLocationSelect={(location) => {
                  console.log('Selected location:', location);
                }}
                showInfoWindow={true}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
