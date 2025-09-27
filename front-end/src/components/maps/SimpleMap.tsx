"use client";

import { MapPin, Navigation, ExternalLink } from "lucide-react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import Image from "next/image";

const JHARKHAND_CULTURAL_LOCATIONS = [
  {
    id: "tribal-communities-ranchi",
    title: "Tribal Communities",
    description:
      "Experience the rich heritage of Santhal, Munda, Oraon, and other tribal communities",
    category: "Tribal Communities",
    coordinates: { lat: 23.3441, lng: 85.3096 },
    location: "Ranchi, Jharkhand",
    image:
      "https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    details: {
      population: "Over 30 tribal communities",
      languages: ["Santhali", "Munda", "Oraon", "Ho"],
      festivals: ["Sohrai", "Karam", "Baha", "Tusu"],
      significance:
        "Home to India's largest concentration of tribal communities",
    },
  },
  {
    id: "traditional-arts-jamshedpur",
    title: "Traditional Arts",
    description:
      "Discover authentic handicrafts, paintings, and traditional art forms",
    category: "Traditional Arts",
    coordinates: { lat: 22.8015, lng: 86.2029 },
    location: "Jamshedpur, Jharkhand",
    image:
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    details: {
      crafts: [
        "Dokra Craft",
        "Sohrai Paintings",
        "Bamboo Crafts",
        "Tribal Jewelry",
      ],
      artisans: "500+ local artisans",
      markets: "Weekly craft markets",
      significance: "Preserving ancient tribal art forms",
    },
  },
  {
    id: "folk-music-dance-hazaribagh",
    title: "Folk Music & Dance",
    description:
      "Immerse in vibrant folk dances and traditional music performances",
    category: "Folk Music & Dance",
    coordinates: { lat: 24.0, lng: 85.35 },
    location: "Hazaribagh, Jharkhand",
    image:
      "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    details: {
      dances: ["Chhau Dance", "Jhumar Dance", "Paika Dance"],
      instruments: ["Dhol", "Madal", "Bansuri", "Sarangi"],
      performances: "Daily cultural shows",
      significance: "UNESCO recognized Chhau dance",
    },
  },
  {
    id: "homestays-netarhat",
    title: "Homestays",
    description:
      "Stay with local families and experience authentic tribal lifestyle",
    category: "Homestays",
    coordinates: { lat: 23.4833, lng: 84.7167 },
    location: "Netarhat, Jharkhand",
    image:
      "https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    details: {
      capacity: "50+ homestays available",
      activities: ["Village walks", "Cooking classes", "Cultural immersion"],
      duration: "1-7 days packages",
      significance: "Authentic tribal living experience",
    },
  },
  {
    id: "festivals-deoghar",
    title: "Festivals",
    description: "Participate in colorful tribal festivals and celebrations",
    category: "Festivals",
    coordinates: { lat: 24.4833, lng: 86.7 },
    location: "Deoghar, Jharkhand",
    image:
      "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    details: {
      majorFestivals: [
        "Sohrai Festival",
        "Karam Festival",
        "Baha Festival",
        "Tusu Festival",
      ],
      timing: "Year-round celebrations",
      participation: "Open to tourists",
      significance: "Ancient tribal traditions preserved",
    },
  },
  {
    id: "marketplace-dhanbad",
    title: "Local Marketplace",
    description:
      "Shop authentic tribal handicrafts directly from local artisans",
    category: "Local Marketplace",
    coordinates: { lat: 23.8, lng: 86.45 },
    location: "Dhanbad, Jharkhand",
    image:
      "https://images.unsplash.com/photo-1472851294608-062f824d29cc?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    details: {
      products: [
        "Handwoven Textiles",
        "Pottery",
        "Wood Carvings",
        "Organic Products",
      ],
      vendors: "200+ local vendors",
      timing: "Daily 6 AM - 8 PM",
      significance: "Supporting local artisans",
    },
  },
];

// Fix Leaflet default marker icons in React
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

interface SimpleMapProps {
  selectedLocation?: string;
  onLocationSelect?: (location: { id: string; coordinates: { lat: number; lng: number } }) => void;
}

// const MapView = ({ center }: { center: [number, number] }) => {
//   const map = useMap();
//   useEffect(() => {
//     map.setView(center, 7);
//   }, [center, map]);
//   return null;
// };

export default function SimpleMap({
  selectedLocation,
  onLocationSelect,
}: SimpleMapProps) {
  // const selectedCoords = selectedLocation
  //   ? JHARKHAND_CULTURAL_LOCATIONS.find((loc) => loc.id === selectedLocation)
  //       ?.coordinates
  //   : { lat: 23.6102, lng: 85.2799 };

  const getDirections = (location: { coordinates: { lat: number; lng: number } }) => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${location.coordinates.lat},${location.coordinates.lng}`;
    window.open(url, "_blank");
  };

  const openInGoogleMaps = (location: { coordinates: { lat: number; lng: number } }) => {
    const url = `https://www.google.com/maps?q=${location.coordinates.lat},${location.coordinates.lng}`;
    window.open(url, "_blank");
  };

  return (
    <div className="space-y-6">
      {/* Leaflet Map */}
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
        <div className="p-4 border-b border-gray-200">
          <h3 className="text-xl font-bold text-gray-800">
            Cultural Locations Map
          </h3>
          <p className="text-gray-600 text-sm">
            Click on markers for directions
          </p>
        </div>
        <div className="p-0">
          <MapContainer
            center={[23.6102, 85.2799]} // Jharkhand center
            zoom={7}
            style={{ height: "500px", width: "100%" }}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />

            {JHARKHAND_CULTURAL_LOCATIONS.map((location) => (
              <Marker
                key={location.id}
                position={[location.coordinates.lat, location.coordinates.lng]}
              >
                <Popup>
                  <strong>{location.title}</strong> <br />
                  {location.location} <br />
                  <button
                    className="text-orange-500 underline"
                    onClick={() =>
                      window.open(
                        `https://www.openstreetmap.org/?mlat=${location.coordinates.lat}&mlon=${location.coordinates.lng}#map=12/${location.coordinates.lat}/${location.coordinates.lng}`,
                        "_blank"
                      )
                    }
                  >
                    Open in OSM
                  </button>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>
      </div>

      {/* Location List */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-4">
          Cultural Locations
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {JHARKHAND_CULTURAL_LOCATIONS.map((location) => (
            <div
              key={location.id}
              className={`p-4 rounded-lg border-2 transition-all cursor-pointer ${
                selectedLocation === location.id
                  ? "border-orange-500 bg-orange-50"
                  : "border-gray-200 hover:border-orange-300 hover:bg-gray-50"
              }`}
              onClick={() => onLocationSelect && onLocationSelect(location)}
            >
              <div className="flex items-start space-x-3">
                <div className="p-2 bg-orange-100 rounded-lg">
                  <MapPin className="w-5 h-5 text-orange-600" />
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-800 mb-1">
                    {location.title}
                  </h4>
                  <p className="text-sm text-gray-600 mb-2">
                    {location.location}
                  </p>
                  <p className="text-xs text-gray-500 line-clamp-2 mb-3">
                    {location.description}
                  </p>

                  <div className="flex space-x-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        getDirections(location);
                      }}
                      className="bg-orange-500 text-white px-3 py-1 rounded text-xs font-semibold hover:bg-orange-600 transition-colors flex items-center space-x-1"
                    >
                      <Navigation className="w-3 h-3" />
                      <span>Directions</span>
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        openInGoogleMaps(location);
                      }}
                      className="border border-orange-500 text-orange-500 px-3 py-1 rounded text-xs font-semibold hover:bg-orange-50 transition-colors flex items-center space-x-1"
                    >
                      <ExternalLink className="w-3 h-3" />
                      <span>View</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Location Details */}
      {selectedLocation && (
        <div className="bg-white rounded-2xl shadow-lg p-6">
          {(() => {
            const location = JHARKHAND_CULTURAL_LOCATIONS.find(
              (loc) => loc.id === selectedLocation
            );
            if (!location) return null;

            return (
              <div>
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-orange-100 rounded-lg">
                      <MapPin className="w-6 h-6 text-orange-600" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-800">
                        {location.title}
                      </h3>
                      <p className="text-gray-600">{location.location}</p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Image
                      src={location.image}
                      alt={location.title}
                      width={400}
                      height={192}
                      className="w-full h-48 object-cover rounded-lg mb-4"
                    />
                    <p className="text-gray-600 mb-4">{location.description}</p>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-2">
                        Key Details
                      </h4>
                      <div className="space-y-2">
                        {Object.entries(location.details).map(
                          ([key, value]) => (
                            <div key={key} className="flex justify-between">
                              <span className="text-gray-600 capitalize">
                                {key.replace(/([A-Z])/g, " $1")}:
                              </span>
                              <span className="font-medium text-gray-800">
                                {Array.isArray(value)
                                  ? value.join(", ")
                                  : value}
                              </span>
                            </div>
                          )
                        )}
                      </div>
                    </div>

                    <div className="flex space-x-3">
                      <button
                        onClick={() => getDirections(location)}
                        className="flex-1 bg-orange-500 text-white py-2 px-4 rounded-lg font-semibold hover:bg-orange-600 transition-colors flex items-center justify-center space-x-2"
                      >
                        <Navigation className="w-4 h-4" />
                        <span>Get Directions</span>
                      </button>
                      <button
                        onClick={() => openInGoogleMaps(location)}
                        className="px-4 py-2 border border-orange-500 text-orange-500 rounded-lg font-semibold hover:bg-orange-50 transition-colors flex items-center space-x-2"
                      >
                        <MapPin className="w-4 h-4" />
                        <span>View on Maps</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })()}
        </div>
      )}
    </div>
  );
}
