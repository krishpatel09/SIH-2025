"use client";

import { Brain, Shield, Eye, Navigation, ShoppingBag, BarChart3, MessageSquare, Globe } from "lucide-react";

const features = [
  {
    icon: Brain,
    title: "AI-Powered Itinerary Planning",
    description: "Personalized travel plans based on your preferences, budget, and duration using advanced machine learning algorithms.",
    color: "from-blue-500 to-purple-600"
  },
  {
    icon: Shield,
    title: "Blockchain Security",
    description: "Secure transactions, verified guides, and digital certifications for local service providers with tamper-proof records.",
    color: "from-green-500 to-teal-600"
  },
  {
    icon: Eye,
    title: "AR/VR Previews",
    description: "Immersive virtual tours of destinations, cultural sites, and accommodations before you visit.",
    color: "from-purple-500 to-pink-600"
  },
  {
    icon: Navigation,
    title: "Real-time Navigation",
    description: "GPS-enabled location services with live transport updates and offline map capabilities.",
    color: "from-orange-500 to-red-600"
  },
  {
    icon: ShoppingBag,
    title: "Local Marketplace",
    description: "Integrated platform for tribal handicrafts, homestays, local events, and authentic experiences.",
    color: "from-yellow-500 to-orange-600"
  },
  {
    icon: MessageSquare,
    title: "Multilingual AI Chatbot",
    description: "24/7 assistance in Hindi, English, and local tribal languages for seamless communication.",
    color: "from-indigo-500 to-blue-600"
  },
  {
    icon: BarChart3,
    title: "Analytics Dashboard",
    description: "Comprehensive insights for tourism officials to monitor trends, visitor patterns, and economic impact.",
    color: "from-cyan-500 to-blue-600"
  },
  {
    icon: Globe,
    title: "Cultural Integration",
    description: "Deep integration with tribal communities, showcasing authentic culture, traditions, and sustainable tourism.",
    color: "from-emerald-500 to-green-600"
  }
];

export default function FeaturesSection() {
  return (
    <section id="features" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Cutting-Edge Features
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our smart digital platform leverages the latest technologies to revolutionize tourism in Jharkhand
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <div
                key={index}
                className="group bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
              >
                {/* Icon */}
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${feature.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <IconComponent className="w-8 h-8 text-white" />
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-green-600 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>

                {/* Hover Effect */}
                <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <button className="text-green-600 font-semibold hover:text-green-700 transition-colors">
                    Learn More →
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Technology Stack */}
        {/* <div className="mt-20 text-center">
          <h3 className="text-2xl font-bold text-gray-800 mb-8">Powered by Advanced Technology</h3>
          <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-600 rounded"></div>
              <span className="font-semibold">Next.js</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-green-600 rounded"></div>
              <span className="font-semibold">TensorFlow</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-purple-600 rounded"></div>
              <span className="font-semibold">Blockchain</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-red-600 rounded"></div>
              <span className="font-semibold">AR/VR</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-yellow-600 rounded"></div>
              <span className="font-semibold">OpenAI</span>
            </div>
          </div>
        </div> */}
      </div>
    </section>
  );
}
