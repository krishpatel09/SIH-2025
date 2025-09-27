"use client";

import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Star, Users, MapPin, User } from "lucide-react";
import Image from "next/image";
import { useAuth } from "@/contexts/AuthContext";
import Link from "next/link";

const heroImages = [
  {
    url: "/betla-national-park.jpg",
    title: "Netarhat - Queen of Chotanagpur",
    subtitle: "Experience breathtaking sunrises and hill station beauty"
  },
  {
    url: "/betla-national-park.jpg",
    title: "Betla National Park",
    subtitle: "Wildlife sanctuary with tigers, elephants, and diverse flora"
  },
  {
    url: "/Hundru_Falls,_Jharkhand,_India_4.jpg",
    title: "Hundru Falls",
    subtitle: "Majestic 320-foot waterfall cascading through rocky terrain"
  }
];

export default function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroImages.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroImages.length) % heroImages.length);
  };

  return (
    <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image Slider */}
      <div className="absolute inset-0">
        {heroImages.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? "opacity-100" : "opacity-0"
            }`}
          >
            <Image
              src={image.url}
              alt={image.title}
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-black/40"></div>
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white p-3 rounded-full transition-all z-10"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white p-3 rounded-full transition-all z-10"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Content */}
      <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 text-shadow">
            Discover Jharkhand
          </h1>
          <p className="text-xl md:text-2xl mb-2 text-shadow">
            {heroImages[currentSlide].title}
          </p>
          <p className="text-lg md:text-xl opacity-90 text-shadow">
            {heroImages[currentSlide].subtitle}
          </p>
        </div>

        {/* Stats */}
        <div className="flex justify-center space-x-8 mb-8">
          <div className="text-center">
            <div className="flex items-center justify-center mb-1">
              <MapPin className="w-5 h-5 mr-1" />
              <span className="text-2xl font-bold">50+</span>
            </div>
            <p className="text-sm opacity-80">Destinations</p>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center mb-1">
              <Users className="w-5 h-5 mr-1" />
              <span className="text-2xl font-bold">10K+</span>
            </div>
            <p className="text-sm opacity-80">Happy Tourists</p>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center mb-1">
              <Star className="w-5 h-5 mr-1" />
              <span className="text-2xl font-bold">4.8</span>
            </div>
            <p className="text-sm opacity-80">Rating</p>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-full text-lg font-semibold transition-all transform hover:scale-105 shadow-lg">
            Start Your Journey
          </button>
          
          {isAuthenticated ? (
            <Link 
              href="/dashboard"
              className="flex items-center space-x-2 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white px-6 py-4 rounded-full text-lg font-semibold transition-all"
            >
              <User className="w-5 h-5" />
              <span>My Dashboard</span>
            </Link>
          ) : (
            <Link 
              href="/login"
              className="flex items-center space-x-2 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white px-6 py-4 rounded-full text-lg font-semibold transition-all"
            >
              <User className="w-5 h-5" />
              <span>Sign In</span>
            </Link>
          )}
        </div>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {heroImages.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all ${
              index === currentSlide ? "bg-white" : "bg-white/50"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
