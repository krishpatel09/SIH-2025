"use client";

import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import Image from "next/image";
import { MapPin, Navigation, Users, Music, Palette, Home, Calendar, ShoppingCart } from "lucide-react";

// Fix default Leaflet marker icons
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

// Real Jharkhand cultural locations
const JHARKHAND_CULTURAL_LOCATIONS = [
  {
    id: "tribal-communities-ranchi",
    title: "Tribal Communities",
    description: "Experience the rich heritage of Santhal, Munda, Oraon, and other tribal communities",
    category: "Tribal Communities",
    coordinates: { lat: 23.3441, lng: 85.3096 },
    location: "Ranchi, Jharkhand",
    image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    icon: Users,
    details: {
      population: "Over 30 tribal communities",
      languages: ["Santhali", "Munda", "Oraon", "Ho"],
      festivals: ["Sohrai", "Karam", "Baha", "Tusu"],
      significance: "Home to India&apos;s largest concentration of tribal communities"
    }
  },
  {
    id: "traditional-arts-jamshedpur",
    title: "Traditional Arts",
    description: "Discover authentic handicrafts, paintings, and traditional art forms",
    category: "Traditional Arts",
    coordinates: { lat: 22.8015, lng: 86.2029 },
    location: "Jamshedpur, Jharkhand",
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    icon: Palette,
    details: {
      crafts: ["Dokra Craft", "Sohrai Paintings", "Bamboo Crafts", "Tribal Jewelry"],
      artisans: "500+ local artisans",
      markets: "Weekly craft markets",
      significance: "Preserving ancient tribal art forms"
    }
  },
  {
    id: "folk-music-dance-hazaribagh",
    title: "Folk Music & Dance",
    description: "Immerse in vibrant folk dances and traditional music performances",
    category: "Folk Music & Dance",
    coordinates: { lat: 24.0000, lng: 85.3500 },
    location: "Hazaribagh, Jharkhand",
    image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    icon: Music,
    details: {
      dances: ["Chhau Dance", "Jhumar Dance", "Paika Dance"],
      instruments: ["Dhol", "Madal", "Bansuri", "Sarangi"],
      performances: "Daily cultural shows",
      significance: "UNESCO recognized Chhau dance"
    }
  },
  {
    id: "homestays-netarhat",
    title: "Homestays",
    description: "Stay with local families and experience authentic tribal lifestyle",
    category: "Homestays",
    coordinates: { lat: 23.4833, lng: 84.7167 },
    location: "Netarhat, Jharkhand",
    image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    icon: Home,
    details: {
      capacity: "50+ homestays available",
      activities: ["Village walks", "Cooking classes", "Cultural immersion"],
      duration: "1-7 days packages",
      significance: "Authentic tribal living experience"
    }
  },
  {
    id: "festivals-deoghar",
    title: "Festivals",
    description: "Participate in colorful tribal festivals and celebrations",
    category: "Festivals",
    coordinates: { lat: 24.4833, lng: 86.7000 },
    location: "Deoghar, Jharkhand",
    image: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    icon: Calendar,
    details: {
      majorFestivals: ["Sohrai Festival", "Karam Festival", "Baha Festival", "Tusu Festival"],
      timing: "Year-round celebrations",
      participation: "Open to tourists",
      significance: "Ancient tribal traditions preserved"
    }
  },
  {
    id: "marketplace-dhanbad",
    title: "Local Marketplace",
    description: "Shop authentic tribal handicrafts directly from local artisans",
    category: "Local Marketplace",
    coordinates: { lat: 23.8000, lng: 86.4500 },
    location: "Dhanbad, Jharkhand",
    image: "https://images.unsplash.com/photo-1472851294608-062f824d29cc?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    icon: ShoppingCart,
    details: {
      products: ["Handwoven Textiles", "Pottery", "Wood Carvings", "Organic Products"],
      vendors: "200+ local vendors",
      timing: "Daily 6 AM - 8 PM",
      significance: "Supporting local artisans"
    }
  }
];

interface MapLocation {
  id: string;
  title: string;
  description: string;
  category: string;
  coordinates: { lat: number; lng: number };
  location: string;
  image: string;
  icon: string;
  details: {
    description: string;
    activities: string[];
    bestTime: string;
    entryFee: number;
  };
}

interface InteractiveTourismMapProps {
  selectedLocation?: string;
  onLocationSelect?: (location: MapLocation) => void;
  showInfoWindow?: boolean;
}

// Component to pan map when a location is selected
const MapPanTo = ({ coords }: { coords: { lat: number; lng: number } }) => {
  const map = useMap();
  useEffect(() => {
    if (coords) {
      map.setView([coords.lat, coords.lng], 12);
    }
  }, [coords, map]);
  return null;
};

export default function InteractiveTourismMap({
  selectedLocation,
  onLocationSelect,
  showInfoWindow = true,
}: InteractiveTourismMapProps) {
  const [selectedMarker, setSelectedMarker] = useState<MapLocation | null>(null);

  // Handle external selectedLocation prop
  useEffect(() => {
    if (selectedLocation) {
      const location = JHARKHAND_CULTURAL_LOCATIONS.find(loc => loc.id === selectedLocation);
      if (location) setSelectedMarker(location);
    }
  }, [selectedLocation]);

  const getDirections = (location: MapLocation) => {
    const url = `https://www.openstreetmap.org/directions?to=${location.coordinates.lat},${location.coordinates.lng}`;
    window.open(url, "_blank");
  };

  return (
    <div className="space-y-6">
      {/* Leaflet Map */}
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
        <div className="p-4 border-b border-gray-200">
          <h3 className="text-xl font-bold text-gray-800">Interactive Tourism Map</h3>
          <p className="text-gray-600 text-sm">Explore Jharkhand&apos;s cultural heritage locations</p>
        </div>
        <MapContainer
          center={[23.3441, 85.3096]}
          zoom={7}
          scrollWheelZoom={true}
          className="w-full h-96 md:h-[500px]"
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />

          {selectedMarker && <MapPanTo coords={selectedMarker.coordinates} />}

          {JHARKHAND_CULTURAL_LOCATIONS.map(location => (
            <Marker
              key={location.id}
              position={[location.coordinates.lat, location.coordinates.lng]}
              eventHandlers={{
                click: () => {
                  setSelectedMarker(location);
                  if (onLocationSelect) onLocationSelect(location);
                },
              }}
            >
              <Popup>
                <strong>{location.title}</strong>
                <br />
                {location.location}
                <br />
                <button
                  onClick={() => getDirections(location)}
                  className="mt-2 bg-orange-500 text-white px-2 py-1 rounded text-xs"
                >
                  Get Directions
                </button>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>

      {/* Location List */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-4">Cultural Locations</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {JHARKHAND_CULTURAL_LOCATIONS.map(location => {
            const IconComponent = location.icon;
            return (
              <div
                key={location.id}
                className={`p-4 rounded-lg border-2 transition-all cursor-pointer ${
                  selectedMarker?.id === location.id
                    ? "border-orange-500 bg-orange-50"
                    : "border-gray-200 hover:border-orange-300 hover:bg-gray-50"
                }`}
                onClick={() => setSelectedMarker(location)}
              >
                <div className="flex items-start space-x-3">
                  <div className="p-2 bg-orange-100 rounded-lg">
                    <IconComponent className="w-5 h-5 text-orange-600" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-800 mb-1">{location.title}</h4>
                    <p className="text-sm text-gray-600 mb-2">{location.location}</p>
                    <p className="text-xs text-gray-500 line-clamp-2">{location.description}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Selected Location Info */}
      {selectedMarker && showInfoWindow && (
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-orange-100 rounded-lg">
                <selectedMarker.icon className="w-6 h-6 text-orange-600" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-800">{selectedMarker.title}</h3>
                <p className="text-gray-600">{selectedMarker.location}</p>
              </div>
            </div>
            <button
              onClick={() => setSelectedMarker(null)}
              className="text-gray-400 hover:text-gray-600"
            >
              ×
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Image
                src={selectedMarker.image}
                alt={selectedMarker.title}
                width={400}
                height={192}
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <p className="text-gray-600 mb-4">{selectedMarker.description}</p>
            </div>

            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-gray-800 mb-2">Key Details</h4>
                <div className="space-y-2">
                  {Object.entries(selectedMarker.details).map(([key, value]) => (
                    <div key={key} className="flex justify-between">
                      <span className="text-gray-600 capitalize">{key.replace(/([A-Z])/g, " $1")}:</span>
                      <span className="font-medium text-gray-800">
                        {Array.isArray(value) ? value.join(", ") : String(value)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex space-x-3">
                <button
                  onClick={() => getDirections(selectedMarker)}
                  className="flex-1 bg-orange-500 text-white py-2 px-4 rounded-lg font-semibold hover:bg-orange-600 transition-colors flex items-center justify-center space-x-2"
                >
                  <Navigation className="w-4 h-4" />
                  <span>Get Directions</span>
                </button>
                <button
                  onClick={() =>
                    window.open(
                      `https://www.openstreetmap.org/?mlat=${selectedMarker.coordinates.lat}&mlon=${selectedMarker.coordinates.lng}#map=12/${selectedMarker.coordinates.lat}/${selectedMarker.coordinates.lng}`,
                      "_blank"
                    )
                  }
                  className="px-4 py-2 border border-orange-500 text-orange-500 rounded-lg font-semibold hover:bg-orange-50 transition-colors flex items-center space-x-2"
                >
                  <MapPin className="w-4 h-4" />
                  <span>View on Maps</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
