"use client";

import { useEffect, useState } from "react";
import {
  Users,
  Music,
  Palette,
  Home,
  Calendar,
  ShoppingCart,
  Search,
  MapPin,
  Eye,
} from "lucide-react";
import Image from "next/image";
import axiosInstance from "@/services/axiosInstance";
import API_PATHS from "@/services/apiPath";

const iconMap = {
  Users,
  Music,
  Palette,
  Home,
  Calendar,
  ShoppingCart,
  Search,
  MapPin,
  Eye,
};

const featuredProducts = [
  {
    name: "Dokra Brass Figurine",
    price: "₹1,200",
    image:
      "/the-art-of-dhokra-handmadeinindia-housenama.jpg",
    artisan: "Raman Mahato",
  },
  {
    name: "Sohrai Wall Painting",
    price: "₹3,500",
    image:
      "/images.jpeg",
    artisan: "Putli Gope",
  },
  {
    name: "Bamboo Craft Basket",
    price: "₹800",
    image:
      "/take8-scaled.jpg",
    artisan: "Suresh Munda",
  },
  {
    name: "Tribal Jewelry Set",
    price: "₹2,200",
    image:
      "/VMJAI44263_5.webp",
    artisan: "Kamla Devi",
  },
];

export default function CulturalSection() {
  const [selectedElement, setSelectedElement] = useState(0);
  const [culturalElements, setCulturalElements] = useState<{
    id: string;
    title: string;
    description: string;
    image: string;
    category: string;
    icon: string;
    items: string[];
    location?: string;
    significance?: string;
    traditions?: string[];
    detailed_description?: string;
    festivals?: string[];
    crafts?: string[];
    music_dance?: string[];
    cuisine?: string[];
    language?: string;
    population?: string;
    history?: string;
    customs?: string[];
    clothing?: string[];
    housing?: string;
    occupation?: string[];
    social_structure?: string;
    religious_beliefs?: string[];
    art_forms?: string[];
    handicrafts?: string[];
    tourism_attractions?: string[];
    homestay_available?: boolean;
    cultural_experience_available?: boolean;
    workshop_available?: boolean;
    contact_info?: any;
    gallery_images?: string[];
    video_urls?: string[];
    created_at?: string;
    updated_at?: string;
  }[]>([]);
  const [tribalCommunities, setTribalCommunities] = useState<{
    id: string;
    name: string;
    title?: string;
    description: string;
    image: string;
    population?: string;
    alternative_names?: string[];
    language?: string;
    script?: string;
    location?: string[];
    districts?: string[];
    villages?: string[];
    history?: string;
    origin_story?: string;
    social_structure?: string;
    governance?: string;
    festivals?: string[];
    rituals?: string[];
    ceremonies?: string[];
    music_instruments?: string[];
    dance_forms?: string[];
    art_forms?: string[];
    crafts?: string[];
    clothing?: string[];
    jewelry?: string[];
    cuisine?: string[];
    housing?: string;
    occupation?: string[];
    agriculture?: string[];
    forest_dependency?: string[];
    religious_beliefs?: string[];
    deities?: string[];
    sacred_places?: string[];
    cultural_practices?: string[];
    traditional_medicine?: string[];
    education_system?: string;
    marriage_customs?: string;
    family_structure?: string;
    gender_roles?: string;
    youth_engagement?: string;
    challenges?: string[];
    conservation_efforts?: string[];
    tourism_potential?: string[];
    homestay_available?: boolean;
    cultural_tours?: boolean;
    workshops?: boolean;
    contact_info?: any;
    gallery_images?: string[];
    video_urls?: string[];
    created_at?: string;
    updated_at?: string;
  }[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<{
    id: string;
    title: string;
    description: string;
    image: string;
    category: string;
    icon?: string;
    items?: string[];
    location?: string;
    significance?: string;
    traditions?: string[];
    detailed_description?: string;
    festivals?: string[];
    crafts?: string[];
    music_dance?: string[];
    cuisine?: string[];
    language?: string;
    population?: string;
    history?: string;
    customs?: string[];
    clothing?: string[];
    housing?: string;
    occupation?: string[];
    social_structure?: string;
    religious_beliefs?: string[];
    art_forms?: string[];
    handicrafts?: string[];
    tourism_attractions?: string[];
    homestay_available?: boolean;
    cultural_experience_available?: boolean;
    workshop_available?: boolean;
    contact_info?: any;
    gallery_images?: string[];
    video_urls?: string[];
    created_at?: string;
    updated_at?: string;
  }[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const culturalResponse = await axiosInstance.get(
          API_PATHS.CULTURAL.GET_ALL
        );

        if (culturalResponse.data.success && culturalResponse.data.data) {
          setCulturalElements(culturalResponse.data.data);
        } else {
          throw new Error("Failed to fetch cultural elements");
        }

        // Fetch tribal communities
        const tribalResponse = await axiosInstance.get(
          API_PATHS.CULTURAL.GET_TRIBAL_COMMUNITIES
        );

        if (tribalResponse.data.success && tribalResponse.data.data) {
          setTribalCommunities(tribalResponse.data.data);
        }
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Failed to fetch cultural data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleSearch = async (query: string) => {
    console.log("Search query:", query);
    setSearchQuery(query);
    if (!query.trim()) {
      setSearchResults([]);
      setIsSearching(false);
      return;
    }

    try {
      setIsSearching(true);
      console.log("Searching for:", query);
      const response = await axiosInstance.get(API_PATHS.CULTURAL.SEARCH, {
        params: { q: query },
      });

      if (response.data.success && response.data.data) {
        console.log("Search results:", response.data);
        setSearchResults(response.data.data);
      } else {
        setSearchResults([]);
        console.error("Search error:", response.data.error);
      }
    } catch (error) {
      console.error("Search error:", error);
      setSearchResults([]);
    } finally {
      setIsSearching(false);
    }
  };

  const handleCategoryClick = async (category: string) => {
    try {
      console.log("Fetching category:", category);
      const response = await axiosInstance.get(
        API_PATHS.CULTURAL.GET_BY_CATEGORY(category)
      );

      if (response.data.success && response.data.data) {
        console.log(`Category ${category} results:`, response.data.data);
      }
    } catch (error) {
      console.error("Category fetch error:", error);
    }
  };

  // Loading state
  if (loading) {
    return (
      <section
        id="culture"
        className="py-20 bg-gradient-to-br from-orange-50 to-red-50"
      >
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading cultural elements...</p>
          </div>
        </div>
      </section>
    );
  }

  // Error state
  if (error) {
    return (
      <section
        id="culture"
        className="py-20 bg-gradient-to-br from-orange-50 to-red-50"
      >
        <div className="container mx-auto px-4">
          <div className="text-center">
            <p className="text-red-600">Error: {error}</p>
            <button
              onClick={() => window.location.reload()}
              className="mt-4 px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600"
            >
              Retry
            </button>
          </div>
        </div>
      </section>
    );
  }

  // Guard against empty data
  if (culturalElements.length === 0) {
    return (
      <section
        id="culture"
        className="py-20 bg-gradient-to-br from-orange-50 to-red-50"
      >
        <div className="container mx-auto px-4">
          <div className="text-center">
            <p className="text-gray-600">No cultural elements found.</p>
            <p className="text-sm text-gray-500 mt-2">
              Make sure the backend server is running and has cultural data.
            </p>
          </div>
        </div>
      </section>
    );
  }

  const currentElement = culturalElements[selectedElement];

  return (
    <section
      id="culture"
      className="py-20 bg-gradient-to-br from-orange-50 to-red-50"
    >
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Rich Cultural Heritage
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Immerse yourself in the vibrant tribal culture, traditional arts,
            and authentic experiences of Jharkhand
          </p>

          {/* Search Bar */}
          <div className="max-w-md mx-auto mb-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search cultural elements..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  handleSearch(e.target.value);
                }}
                className="w-full pl-10 pr-4 py-3 rounded-full border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
              />
              {isSearching && (
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-orange-500"></div>
                </div>
              )}
            </div>

            {/* Search Results */}
            {searchResults.length > 0 && (
              <div className="absolute z-10 w-full mt-2 bg-white rounded-lg shadow-lg max-h-60 overflow-y-auto">
                {searchResults.map((result) => (
                  <div
                    key={result.id}
                    className="p-3 hover:bg-gray-50 cursor-pointer border-b last:border-b-0"
                    onClick={() => {
                      const index = culturalElements.findIndex(
                        (el) => el.id === result.id
                      );
                      if (index !== -1) {
                        setSelectedElement(index);
                        setSearchQuery("");
                        setSearchResults([]);
                      }
                    }}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                        <Eye className="w-5 h-5 text-orange-600" />
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">
                          {result.title}
                        </h4>
                        <p className="text-sm text-gray-600 truncate">
                          {result.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Cultural Elements */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
          {/* Left: Navigation */}
          <div className="space-y-4">
            {culturalElements.map((element, index) => {
              // Get the icon component from the mapping
              const IconComponent =
                iconMap[element.icon as keyof typeof iconMap] || Users;

              return (
                <button
                  key={element.id}
                  onClick={() => setSelectedElement(index)}
                  className={`w-full text-left p-6 rounded-2xl transition-all duration-300 ${
                    selectedElement === index
                      ? "bg-white shadow-xl border-l-4 border-orange-500"
                      : "bg-white/70 hover:bg-white hover:shadow-lg"
                  }`}
                >
                  <div className="flex items-start space-x-4">
                    <div
                      className={`p-3 rounded-xl ${
                        selectedElement === index
                          ? "bg-orange-500 text-white"
                          : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      <IconComponent className="w-6 h-6" />
                    </div>
                    <div className="flex-1">
                      <h3
                        className={`text-lg font-bold mb-2 ${
                          selectedElement === index
                            ? "text-orange-600"
                            : "text-gray-800"
                        }`}
                      >
                        {element.title}
                      </h3>
                      <p className="text-gray-600 text-sm">
                        {element.description}
                      </p>
                      {element.category && (
                        <span className="inline-block mt-2 px-2 py-1 bg-orange-100 text-orange-600 text-xs rounded-full">
                          {element.category}
                        </span>
                      )}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right: Content */}
          <div className="relative">
            <div className="sticky top-8">
              <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                <div className="relative h-64">
                  <Image
                    src={
                      currentElement?.image
                    }
                    alt={currentElement?.title || "Cultural Element"}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <div className="absolute bottom-4 left-4 text-white">
                    <h3 className="text-2xl font-bold mb-2">
                      {currentElement?.title || "Cultural Element"}
                    </h3>
                    {currentElement?.location && (
                      <div className="flex items-center space-x-1">
                        <MapPin className="w-4 h-4" />
                        <span className="text-sm">
                          {currentElement.location}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-gray-600 mb-6">
                    {currentElement?.description ||
                      "Cultural description not available"}
                  </p>

                  {currentElement?.significance && (
                    <div className="mb-6">
                      <h4 className="font-semibold text-gray-800 mb-2">
                        Cultural Significance
                      </h4>
                      <p className="text-gray-600 text-sm">
                        {currentElement.significance}
                      </p>
                    </div>
                  )}

                  {currentElement?.traditions &&
                    currentElement.traditions.length > 0 && (
                      <div className="mb-6">
                        <h4 className="font-semibold text-gray-800 mb-3">
                          Traditions
                        </h4>
                        <div className="grid grid-cols-1 gap-2">
                          {currentElement.traditions.map(
                            (tradition: string, index: number) => (
                              <div
                                key={index}
                                className="flex items-center space-x-2"
                              >
                                <div className="w-2 h-2 bg-orange-500 rounded-full" />
                                <span className="text-sm text-gray-700">
                                  {tradition}
                                </span>
                              </div>
                            )
                          )}
                        </div>
                      </div>
                    )}

                  {currentElement?.items && currentElement.items.length > 0 && (
                    <div className="mb-6">
                      <h4 className="font-semibold text-gray-800 mb-3">
                        Key Features
                      </h4>
                      <div className="grid grid-cols-2 gap-3">
                        {currentElement.items.map(
                          (item: string, index: number) => (
                            <div
                              key={index}
                              className="flex items-center space-x-2"
                            >
                              <div className="w-2 h-2 bg-orange-500 rounded-full" />
                              <span className="text-sm text-gray-700">
                                {item}
                              </span>
                            </div>
                          )
                        )}
                      </div>
                    </div>
                  )}

                  <div className="flex space-x-3">
                    <button
                      className="flex-1 bg-orange-500 text-white py-3 rounded-lg font-semibold hover:bg-orange-600 transition-colors"
                      onClick={() =>
                        handleCategoryClick(currentElement?.category || "")
                      }
                    >
                      Explore {currentElement?.title || "This Element"}
                    </button>
                    {currentElement?.category && (
                      <button
                        className="px-4 py-3 border border-orange-500 text-orange-500 rounded-lg font-semibold hover:bg-orange-50 transition-colors"
                        onClick={() =>
                          handleCategoryClick(currentElement?.category)
                        }
                      >
                        View Category
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tribal Communities Section */}
        {tribalCommunities.length > 0 && (
          <div className="mb-20">
            <div className="text-center mb-8">
              <h3 className="text-3xl font-bold text-gray-800 mb-4">
                Tribal Communities
              </h3>
              <p className="text-gray-600">
                Learn about the indigenous communities and their rich heritage
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {tribalCommunities.slice(0, 6).map((community) => (
                <div
                  key={community.id}
                  className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
                >
                  <div className="relative h-48">
                    <Image
                      src={
                        community.image ||
                        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_polnl5Mc1r9wBeeOXdnBO6JdIxJe5yShcw&s"
                      }
                      alt={community.name}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                    <div className="absolute bottom-3 left-3 text-white">
                      <h4 className="font-bold">{community.name}</h4>
                    </div>
                  </div>
                  <div className="p-4">
                    <p className="text-gray-600 text-sm mb-3 line-clamp-3">
                      {community.description}
                    </p>
                    <button className="w-full bg-orange-500 text-white py-2 rounded-lg text-sm font-semibold hover:bg-orange-600 transition-colors">
                      Learn More
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Featured Marketplace */}
        <div className="bg-white rounded-3xl p-8 shadow-xl">
          <div className="text-center mb-8">
            <h3 className="text-3xl font-bold text-gray-800 mb-4">
              Featured Handicrafts
            </h3>
            <p className="text-gray-600">
              Support local artisans by purchasing authentic handcrafted items
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product, index) => (
              <div
                key={index}
                className="group bg-gray-50 rounded-2xl overflow-hidden hover:shadow-lg transition-all duration-300"
              >
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute top-3 right-3">
                    <button className="bg-white/80 backdrop-blur-sm p-2 rounded-full hover:bg-white transition-colors">
                      <ShoppingCart className="w-4 h-4 text-gray-700" />
                    </button>
                  </div>
                </div>
                <div className="p-4">
                  <h4 className="font-bold text-gray-800 mb-1">
                    {product.name}
                  </h4>
                  <p className="text-sm text-gray-600 mb-2">
                    by {product.artisan}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold text-orange-600">
                      {product.price}
                    </span>
                    <button className="bg-orange-500 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-orange-600 transition-colors">
                      Buy Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <button className="bg-gray-800 text-white px-8 py-3 rounded-full font-semibold hover:bg-gray-900 transition-colors">
              Visit Full Marketplace
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
