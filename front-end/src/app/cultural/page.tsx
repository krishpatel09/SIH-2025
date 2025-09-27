"use client";

import { useEffect, useState } from "react";
import { culturalService, CulturalElement } from "@/services/culturalService";
import { Search, Filter, MapPin, Calendar, Eye, Heart, Share2 } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import Header from "@/components/Header";

export default function CulturalPage() {
  const [culturalElements, setCulturalElements] = useState<CulturalElement[]>([]);
  const [filteredElements, setFilteredElements] = useState<CulturalElement[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [categories, setCategories] = useState<string[]>([]);
  const [, setHoveredElement] = useState<string | null>(null);
  const [favorites, setFavorites] = useState<Set<string>>(new Set());

  useEffect(() => {
    const fetchCulturalElements = async () => {
      try {
        setLoading(true);
        const response = await culturalService.getAllCulturalElements();
        
        if (response.success && response.data) {
          setCulturalElements(response.data);
          setFilteredElements(response.data);
          
          // Extract unique categories
          const uniqueCategories = Array.from(new Set(response.data.map(el => el.category).filter(Boolean)));
          setCategories(["All", ...uniqueCategories]);
        } else {
          setError(response.error || 'Failed to fetch cultural elements');
        }
      } catch (error) {
        console.error('Error fetching cultural elements:', error);
        setError('Failed to fetch cultural elements');
      } finally {
        setLoading(false);
      }
    };
    
    fetchCulturalElements();
  }, []);

  useEffect(() => {
    let filtered = culturalElements;
    
    // Filter by category
    if (selectedCategory !== "All") {
      filtered = filtered.filter(el => el.category === selectedCategory);
    }
    
    // Filter by search query
    if (searchQuery.trim()) {
      filtered = filtered.filter(el => 
        el.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        el.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (el.category && el.category.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }
    
    setFilteredElements(filtered);
  }, [culturalElements, selectedCategory, searchQuery]);

  const handleSearch = async (query: string) => {
    if (!query.trim()) {
      setSearchQuery("");
      return;
    }

    try {
      const response = await culturalService.searchCulturalElements(query);
      
      if (response.success && response.data) {
        setFilteredElements(response.data);
        setSearchQuery(query);
      }
    } catch (error) {
      console.error('Search error:', error);
    }
  };

  const toggleFavorite = (elementId: string, event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    setFavorites(prev => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(elementId)) {
        newFavorites.delete(elementId);
      } else {
        newFavorites.add(elementId);
      }
      return newFavorites;
    });
  };

  const shareElement = async (element: CulturalElement, event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    
    const shareData = {
      title: element.title,
      text: element.description,
      url: `${window.location.origin}/cultural/${element.id}`,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (error) {
        console.log('Error sharing:', error);
      }
    } else {
      // Fallback to copying URL
      navigator.clipboard.writeText(shareData.url);
      alert('Link copied to clipboard!');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50">
        <Header />
        <div className="container mx-auto px-4 py-20 pt-32">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading cultural elements...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50">
        <Header />
        <div className="container mx-auto px-4 py-20 pt-32">
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
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50">
      <Header />
      
      <div className="container mx-auto px-4 py-20 pt-32">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Cultural Heritage
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Explore the rich cultural tapestry of Jharkhand&apos;s tribal communities and traditions
          </p>
        </div>

        {/* Search and Filter */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            {/* Search Bar */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search cultural elements..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSearch(searchQuery)}
                className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
              />
            </div>
            
            {/* Category Filter */}
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="pl-10 pr-8 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none bg-white"
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
          </div>
          
          {/* Results Count */}
          <p className="text-gray-600">
            Showing {filteredElements.length} of {culturalElements.length} cultural elements
            {selectedCategory !== "All" && ` in "${selectedCategory}"`}
          </p>
        </div>

        {/* Cultural Elements Grid */}
        {filteredElements.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">No cultural elements found.</p>
            <p className="text-gray-500 mt-2">Try adjusting your search or filter criteria.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredElements.map((element) => (
              <div 
                key={element.id} 
                className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group"
                onMouseEnter={() => setHoveredElement(element.id)}
                onMouseLeave={() => setHoveredElement(null)}
              >
                <div className="relative h-48">
                  <Image
                    src={element.image || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_polnl5Mc1r9wBeeOXdnBO6JdIxJe5yShcw&s"}
                    alt={element.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  
                  {/* Action Buttons */}
                  <div className="absolute top-3 right-3 flex space-x-2">
                    <button
                      onClick={(e) => toggleFavorite(element.id, e)}
                      className={`p-2 rounded-full transition-colors ${
                        favorites.has(element.id) 
                          ? 'bg-red-500 text-white' 
                          : 'bg-white bg-opacity-80 hover:bg-opacity-100 text-gray-700'
                      }`}
                    >
                      <Heart className={`w-4 h-4 ${favorites.has(element.id) ? 'fill-current' : ''}`} />
                    </button>
                    <button
                      onClick={(e) => shareElement(element, e)}
                      className="p-2 rounded-full bg-white bg-opacity-80 hover:bg-opacity-100 text-gray-700 transition-colors"
                    >
                      <Share2 className="w-4 h-4" />
                    </button>
                  </div>
                  
                  <div className="absolute top-3 left-3">
                    {element.category && (
                      <span className="bg-orange-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
                        {element.category}
                      </span>
                    )}
                  </div>
                  <div className="absolute bottom-3 left-3 text-white">
                    <h3 className="font-bold text-lg mb-1">{element.title}</h3>
                    {element.location && (
                      <div className="flex items-center space-x-1">
                        <MapPin className="w-3 h-3" />
                        <span className="text-xs">{element.location}</span>
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="p-6">
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                    {element.description}
                  </p>
                  
                  {element.traditions && element.traditions.length > 0 && (
                    <div className="mb-4">
                      <div className="flex flex-wrap gap-1">
                        {element.traditions.slice(0, 3).map((tradition, index) => (
                          <span key={index} className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs">
                            {tradition}
                          </span>
                        ))}
                        {element.traditions.length > 3 && (
                          <span className="text-gray-500 text-xs">
                            +{element.traditions.length - 3} more
                          </span>
                        )}
                      </div>
                    </div>
                  )}
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      {element.createdAt && (
                        <div className="flex items-center space-x-1">
                          <Calendar className="w-4 h-4" />
                          <span>{new Date(element.createdAt).toLocaleDateString()}</span>
                        </div>
                      )}
                    </div>
                    
                    <Link href={`/cultural/${element.id}`}>
                      <button className="bg-orange-500 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-orange-600 transition-colors flex items-center space-x-1 group-hover:scale-105 transform duration-200">
                        <Eye className="w-4 h-4" />
                        <span>View Details</span>
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
