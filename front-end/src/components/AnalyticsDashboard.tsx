"use client";

import { useState } from "react";
import { BarChart3, Users, MapPin, TrendingUp, DollarSign, Star } from "lucide-react";

const mockData = {
  totalVisitors: 125430,
  monthlyGrowth: 23.5,
  topDestinations: [
    { name: "Netarhat", visitors: 28500, growth: 15.2 },
    { name: "Betla National Park", visitors: 22100, growth: 8.7 },
    { name: "Hundru Falls", visitors: 19800, growth: 22.1 },
    { name: "Deoghar", visitors: 18200, growth: 12.3 },
    { name: "Patratu Valley", visitors: 15600, growth: 18.9 }
  ],
  monthlyVisitors: [
    { month: "Jan", visitors: 8500, revenue: 12.5 },
    { month: "Feb", visitors: 9200, revenue: 14.2 },
    { month: "Mar", visitors: 11800, revenue: 18.7 },
    { month: "Apr", visitors: 13200, revenue: 21.3 },
    { month: "May", visitors: 10800, revenue: 16.9 },
    { month: "Jun", visitors: 8900, revenue: 13.8 }
  ],
  demographics: [
    { age: "18-25", percentage: 32, color: "bg-blue-500" },
    { age: "26-35", percentage: 28, color: "bg-green-500" },
    { age: "36-45", percentage: 22, color: "bg-yellow-500" },
    { age: "46-55", percentage: 12, color: "bg-purple-500" },
    { age: "55+", percentage: 6, color: "bg-red-500" }
  ],
  feedback: {
    averageRating: 4.6,
    totalReviews: 8420,
    sentiment: { positive: 78, neutral: 18, negative: 4 }
  }
};

export default function AnalyticsDashboard() {
  const [activeTab, setActiveTab] = useState("overview");

  const tabs = [
    { id: "overview", label: "Overview", icon: BarChart3 },
    { id: "destinations", label: "Destinations", icon: MapPin },
    { id: "demographics", label: "Demographics", icon: Users },
    { id: "feedback", label: "Feedback", icon: Star }
  ];

  return (
    <section className="py-20 bg-gray-900 text-white">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Tourism Analytics Dashboard
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Comprehensive insights for tourism officials to monitor trends, visitor patterns, and economic impact
          </p>
        </div>

        {/* Dashboard Container */}
        <div className="bg-gray-800 rounded-3xl p-8 shadow-2xl">
          {/* Tabs */}
          <div className="flex flex-wrap justify-center mb-8 bg-gray-700 rounded-2xl p-2">
            {tabs.map((tab) => {
              const IconComponent = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-semibold transition-all ${
                    activeTab === tab.id
                      ? "bg-blue-600 text-white shadow-lg"
                      : "text-gray-300 hover:text-white hover:bg-gray-600"
                  }`}
                >
                  <IconComponent className="w-5 h-5" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Overview Tab */}
          {activeTab === "overview" && (
            <div className="space-y-8">
              {/* Key Metrics */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl p-6">
                  <div className="flex items-center justify-between mb-4">
                    <Users className="w-8 h-8 text-blue-200" />
                    <span className="text-blue-200 text-sm">Total</span>
                  </div>
                  <div className="text-3xl font-bold mb-2">{mockData.totalVisitors.toLocaleString()}</div>
                  <div className="text-blue-200 text-sm">Annual Visitors</div>
                </div>

                <div className="bg-gradient-to-br from-green-600 to-green-700 rounded-2xl p-6">
                  <div className="flex items-center justify-between mb-4">
                    <TrendingUp className="w-8 h-8 text-green-200" />
                    <span className="text-green-200 text-sm">Growth</span>
                  </div>
                  <div className="text-3xl font-bold mb-2">+{mockData.monthlyGrowth}%</div>
                  <div className="text-green-200 text-sm">Monthly Growth</div>
                </div>

                <div className="bg-gradient-to-br from-purple-600 to-purple-700 rounded-2xl p-6">
                  <div className="flex items-center justify-between mb-4">
                    <DollarSign className="w-8 h-8 text-purple-200" />
                    <span className="text-purple-200 text-sm">Revenue</span>
                  </div>
                  <div className="text-3xl font-bold mb-2">₹24.8Cr</div>
                  <div className="text-purple-200 text-sm">Annual Revenue</div>
                </div>

                <div className="bg-gradient-to-br from-orange-600 to-orange-700 rounded-2xl p-6">
                  <div className="flex items-center justify-between mb-4">
                    <Star className="w-8 h-8 text-orange-200" />
                    <span className="text-orange-200 text-sm">Rating</span>
                  </div>
                  <div className="text-3xl font-bold mb-2">{mockData.feedback.averageRating}</div>
                  <div className="text-orange-200 text-sm">Avg Rating</div>
                </div>
              </div>

              {/* Monthly Visitors Chart */}
              <div className="bg-gray-700 rounded-2xl p-6">
                <h3 className="text-xl font-bold mb-6 flex items-center">
                  <BarChart3 className="w-6 h-6 mr-3 text-blue-400" />
                  Monthly Visitor Trends
                </h3>
                <div className="flex items-end justify-between h-64 space-x-4">
                  {mockData.monthlyVisitors.map((data, index) => (
                    <div key={index} className="flex flex-col items-center flex-1">
                      <div
                        className="bg-gradient-to-t from-blue-600 to-blue-400 rounded-t-lg w-full relative"
                        style={{ height: `${(data.visitors / 15000) * 200}px` }}
                      >
                        <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 text-xs font-semibold">
                          {data.visitors.toLocaleString()}
                        </div>
                      </div>
                      <div className="mt-2 text-sm font-medium">{data.month}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Destinations Tab */}
          {activeTab === "destinations" && (
            <div className="space-y-6">
              <h3 className="text-2xl font-bold mb-6 flex items-center">
                <MapPin className="w-7 h-7 mr-3 text-green-400" />
                Top Destinations Performance
              </h3>
              <div className="space-y-4">
                {mockData.topDestinations.map((destination, index) => (
                  <div key={index} className="bg-gray-700 rounded-xl p-6 flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center text-white font-bold">
                        #{index + 1}
                      </div>
                      <div>
                        <h4 className="text-lg font-bold">{destination.name}</h4>
                        <p className="text-gray-400">{destination.visitors.toLocaleString()} visitors</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="text-right">
                        <div className={`text-lg font-bold ${destination.growth > 15 ? 'text-green-400' : destination.growth > 10 ? 'text-yellow-400' : 'text-blue-400'}`}>
                          +{destination.growth}%
                        </div>
                        <div className="text-gray-400 text-sm">Growth</div>
                      </div>
                      <div className="w-24 bg-gray-600 rounded-full h-2">
                        <div
                          className="bg-gradient-to-r from-green-500 to-green-400 h-2 rounded-full"
                          style={{ width: `${Math.min(destination.growth * 3, 100)}%` }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Demographics Tab */}
          {activeTab === "demographics" && (
            <div className="space-y-8">
              <h3 className="text-2xl font-bold mb-6 flex items-center">
                <Users className="w-7 h-7 mr-3 text-purple-400" />
                Visitor Demographics
              </h3>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Age Distribution */}
                <div className="bg-gray-700 rounded-2xl p-6">
                  <h4 className="text-lg font-bold mb-6">Age Distribution</h4>
                  <div className="space-y-4">
                    {mockData.demographics.map((demo, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className={`w-4 h-4 rounded-full ${demo.color}`} />
                          <span className="font-medium">{demo.age}</span>
                        </div>
                        <div className="flex items-center space-x-3">
                          <div className="w-32 bg-gray-600 rounded-full h-2">
                            <div
                              className={`h-2 rounded-full ${demo.color}`}
                              style={{ width: `${demo.percentage * 3}%` }}
                            />
                          </div>
                          <span className="font-bold w-12 text-right">{demo.percentage}%</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Visitor Sources */}
                <div className="bg-gray-700 rounded-2xl p-6">
                  <h4 className="text-lg font-bold mb-6">Visitor Sources</h4>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span>Domestic</span>
                      <span className="font-bold">72%</span>
                    </div>
                    <div className="w-full bg-gray-600 rounded-full h-2">
                      <div className="bg-blue-500 h-2 rounded-full" style={{ width: '72%' }} />
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span>International</span>
                      <span className="font-bold">28%</span>
                    </div>
                    <div className="w-full bg-gray-600 rounded-full h-2">
                      <div className="bg-green-500 h-2 rounded-full" style={{ width: '28%' }} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Feedback Tab */}
          {activeTab === "feedback" && (
            <div className="space-y-8">
              <h3 className="text-2xl font-bold mb-6 flex items-center">
                <Star className="w-7 h-7 mr-3 text-yellow-400" />
                Visitor Feedback & Sentiment
              </h3>
              
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="bg-gradient-to-br from-yellow-600 to-yellow-700 rounded-2xl p-6 text-center">
                  <Star className="w-12 h-12 mx-auto mb-4 text-yellow-200" />
                  <div className="text-4xl font-bold mb-2">{mockData.feedback.averageRating}</div>
                  <div className="text-yellow-200">Average Rating</div>
                  <div className="text-yellow-200 text-sm mt-2">
                    Based on {mockData.feedback.totalReviews.toLocaleString()} reviews
                  </div>
                </div>

                <div className="bg-gray-700 rounded-2xl p-6">
                  <h4 className="text-lg font-bold mb-4">Sentiment Analysis</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-green-400">Positive</span>
                      <span className="font-bold">{mockData.feedback.sentiment.positive}%</span>
                    </div>
                    <div className="w-full bg-gray-600 rounded-full h-2">
                      <div className="bg-green-500 h-2 rounded-full" style={{ width: `${mockData.feedback.sentiment.positive}%` }} />
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-yellow-400">Neutral</span>
                      <span className="font-bold">{mockData.feedback.sentiment.neutral}%</span>
                    </div>
                    <div className="w-full bg-gray-600 rounded-full h-2">
                      <div className="bg-yellow-500 h-2 rounded-full" style={{ width: `${mockData.feedback.sentiment.neutral}%` }} />
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-red-400">Negative</span>
                      <span className="font-bold">{mockData.feedback.sentiment.negative}%</span>
                    </div>
                    <div className="w-full bg-gray-600 rounded-full h-2">
                      <div className="bg-red-500 h-2 rounded-full" style={{ width: `${mockData.feedback.sentiment.negative}%` }} />
                    </div>
                  </div>
                </div>

                <div className="bg-gray-700 rounded-2xl p-6">
                  <h4 className="text-lg font-bold mb-4">Recent Feedback</h4>
                  <div className="space-y-3 text-sm">
                    <div className="border-l-4 border-green-500 pl-3">
                      <p className="text-gray-300">&quot;Amazing experience at Netarhat!&quot;</p>
                      <p className="text-gray-500 text-xs">⭐⭐⭐⭐⭐ 2 hours ago</p>
                    </div>
                    <div className="border-l-4 border-green-500 pl-3">
                      <p className="text-gray-300">&quot;Great cultural immersion program&quot;</p>
                      <p className="text-gray-500 text-xs">⭐⭐⭐⭐⭐ 5 hours ago</p>
                    </div>
                    <div className="border-l-4 border-yellow-500 pl-3">
                      <p className="text-gray-300">&quot;Good but needs better transport&quot;</p>
                      <p className="text-gray-500 text-xs">⭐⭐⭐ 1 day ago</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Export/Action Buttons */}
          <div className="flex flex-wrap justify-center gap-4 mt-12 pt-8 border-t border-gray-700">
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors">
              Export Report
            </button>
            <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors">
              Schedule Email
            </button>
            <button className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors">
              Advanced Analytics
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
