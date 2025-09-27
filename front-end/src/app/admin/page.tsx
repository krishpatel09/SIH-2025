'use client';

import { ProtectedRoute } from '../../components/auth/ProtectedRoute';
import { useAuth } from '../../contexts/AuthContext';
import { useState } from 'react';
import { 
  BarChart3, 
  Users, 
  MapPin, 
  TrendingUp, 
  Eye, 
  DollarSign, 
  Star,
  Plus,
  Edit,
  Trash2,
  Settings,
  Database,
  Shield
} from 'lucide-react';
import Header from '../../components/Header';
import AddDestinationModal from '../../components/admin/AddDestinationModal';
import AddClusterModal from '../../components/admin/AddClusterModal';

const mockData = {
  totalVisitors: 125430,
  monthlyGrowth: 23.5,
  topDestinations: [
    { id: 1, name: "Netarhat", visitors: 28500, growth: 15.2, status: "active" },
    { id: 2, name: "Betla National Park", visitors: 22100, growth: 8.7, status: "active" },
    { id: 3, name: "Hundru Falls", visitors: 19800, growth: 22.1, status: "active" },
    { id: 4, name: "Deoghar", visitors: 18200, growth: 12.3, status: "active" },
    { id: 5, name: "Patratu Valley", visitors: 15600, growth: 18.9, status: "active" }
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
  },
  clusters: [
    { id: 1, name: "Nature Tourism Cluster", destinations: 12, visitors: 45000, status: "active" },
    { id: 2, name: "Cultural Heritage Cluster", destinations: 8, visitors: 32000, status: "active" },
    { id: 3, name: "Adventure Tourism Cluster", destinations: 6, visitors: 28000, status: "active" },
    { id: 4, name: "Religious Tourism Cluster", destinations: 10, visitors: 38000, status: "active" }
  ]
};

export default function AdminDashboardPage() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("overview");
  const [showAddDestination, setShowAddDestination] = useState(false);
  const [showAddCluster, setShowAddCluster] = useState(false);
  const [editingDestination, setEditingDestination] = useState<{ id?: number; name: string; visitors: number; growth: number; status: string } | undefined>(undefined);
  const [editingCluster, setEditingCluster] = useState<{ id?: number; name: string; destinations: number; visitors: number; status: string } | undefined>(undefined);

  const tabs = [
    { id: "overview", label: "Overview", icon: BarChart3 },
    { id: "destinations", label: "Destinations", icon: MapPin },
    { id: "clusters", label: "Clusters", icon: Database },
    { id: "demographics", label: "Demographics", icon: Users },
    { id: "feedback", label: "Feedback", icon: Star },
    { id: "settings", label: "Settings", icon: Settings }
  ];

  const handleAddDestination = () => {
    setEditingDestination(undefined);
    setShowAddDestination(true);
  };

  const handleAddCluster = () => {
    setEditingCluster(undefined);
    setShowAddCluster(true);
  };

  const handleEditDestination = (destination: { id: number; name: string; visitors: number; growth: number; status: string }) => {
    setEditingDestination(destination);
    setShowAddDestination(true);
  };

  const handleEditCluster = (cluster: { id: number; name: string; destinations: number; visitors: number; status: string }) => {
    setEditingCluster(cluster);
    setShowAddCluster(true);
  };

  const handleSaveDestination = (destination: { id?: number; name: string; visitors?: number; growth?: number; status?: string }) => {
    console.log('Saving destination:', destination);
    // Here you would typically make an API call to save the destination
    setShowAddDestination(false);
    setEditingDestination(undefined);
  };

  const handleSaveCluster = (cluster: { id?: number; name: string; destinations?: number; visitors?: number; status?: string }) => {
    console.log('Saving cluster:', cluster);
    // Here you would typically make an API call to save the cluster
    setShowAddCluster(false);
    setEditingCluster(undefined);
  };

  const handleDeleteDestination = (id: number) => {
    if (confirm('Are you sure you want to delete this destination?')) {
      console.log('Delete destination:', id);
      // Here you would typically make an API call to delete the destination
    }
  };

  const handleDeleteCluster = (id: number) => {
    if (confirm('Are you sure you want to delete this cluster?')) {
      console.log('Delete cluster:', id);
      // Here you would typically make an API call to delete the cluster
    }
  };

  return (
    <ProtectedRoute allowedRoles={['admin']}>
      <div className="min-h-screen bg-gray-50">
        <Header />
        
        <div className="pt-20">
          <div className="container mx-auto px-4 py-8">
            {/* Header */}
            <div className="mb-8">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-3xl font-bold text-gray-800 mb-2">
                    Admin Dashboard
                  </h1>
                  <p className="text-gray-600">
                    Welcome back, {user?.name}. Manage your tourism platform.
                  </p>
                </div>
                <div className="flex items-center space-x-2 bg-green-100 text-green-800 px-4 py-2 rounded-full">
                  <Shield className="w-4 h-4" />
                  <span className="text-sm font-medium">Admin Access</span>
                </div>
              </div>
            </div>

            {/* Dashboard Container */}
            <div className="bg-white rounded-3xl shadow-xl">
              {/* Tabs */}
              <div className="border-b border-gray-200">
                <nav className="flex space-x-8 px-8">
                  {tabs.map((tab) => {
                    const IconComponent = tab.icon;
                    return (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`flex items-center space-x-2 py-4 px-2 border-b-2 font-medium transition-colors ${
                          activeTab === tab.id
                            ? 'border-green-500 text-green-600'
                            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                        }`}
                      >
                        <IconComponent className="w-5 h-5" />
                        <span>{tab.label}</span>
                      </button>
                    );
                  })}
                </nav>
              </div>

              {/* Tab Content */}
              <div className="p-8">
                {/* Overview Tab */}
                {activeTab === "overview" && (
                  <div className="space-y-8">
                    {/* Key Metrics */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                      <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl p-6 text-white">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-blue-100 text-sm font-medium">Total Visitors</p>
                            <p className="text-3xl font-bold">{mockData.totalVisitors.toLocaleString()}</p>
                            <p className="text-blue-100 text-sm">+{mockData.monthlyGrowth}% this month</p>
                          </div>
                          <Users className="w-12 h-12 text-blue-200" />
                        </div>
                      </div>

                      <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-2xl p-6 text-white">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-green-100 text-sm font-medium">Revenue</p>
                            <p className="text-3xl font-bold">₹{mockData.monthlyVisitors.reduce((sum, month) => sum + month.revenue, 0).toFixed(1)}M</p>
                            <p className="text-green-100 text-sm">+18.2% this month</p>
                          </div>
                          <DollarSign className="w-12 h-12 text-green-200" />
                        </div>
                      </div>

                      <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-2xl p-6 text-white">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-purple-100 text-sm font-medium">Destinations</p>
                            <p className="text-3xl font-bold">{mockData.topDestinations.length}</p>
                            <p className="text-purple-100 text-sm">Active locations</p>
                          </div>
                          <MapPin className="w-12 h-12 text-purple-200" />
                        </div>
                      </div>

                      <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-2xl p-6 text-white">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-orange-100 text-sm font-medium">Rating</p>
                            <p className="text-3xl font-bold">{mockData.feedback.averageRating}</p>
                            <p className="text-orange-100 text-sm">{mockData.feedback.totalReviews} reviews</p>
                          </div>
                          <Star className="w-12 h-12 text-orange-200" />
                        </div>
                      </div>
                    </div>

                    {/* Charts */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                      <div className="bg-gray-50 rounded-2xl p-6">
                        <h3 className="text-xl font-bold text-gray-800 mb-4">Monthly Visitors</h3>
                        <div className="space-y-4">
                          {mockData.monthlyVisitors.map((month) => (
                            <div key={month.month} className="flex items-center justify-between">
                              <span className="text-gray-600 font-medium">{month.month}</span>
                              <div className="flex items-center space-x-4">
                                <div className="w-32 bg-gray-200 rounded-full h-2">
                                  <div 
                                    className="bg-blue-500 h-2 rounded-full" 
                                    style={{ width: `${(month.visitors / 15000) * 100}%` }}
                                  ></div>
                                </div>
                                <span className="text-gray-800 font-semibold w-16 text-right">{month.visitors.toLocaleString()}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="bg-gray-50 rounded-2xl p-6">
                        <h3 className="text-xl font-bold text-gray-800 mb-4">Demographics</h3>
                        <div className="space-y-4">
                          {mockData.demographics.map((demo) => (
                            <div key={demo.age} className="flex items-center justify-between">
                              <span className="text-gray-600 font-medium">{demo.age}</span>
                              <div className="flex items-center space-x-4">
                                <div className="w-32 bg-gray-200 rounded-full h-2">
                                  <div 
                                    className={`${demo.color} h-2 rounded-full`}
                                    style={{ width: `${demo.percentage}%` }}
                                  ></div>
                                </div>
                                <span className="text-gray-800 font-semibold w-12 text-right">{demo.percentage}%</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Destinations Tab */}
                {activeTab === "destinations" && (
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <h2 className="text-2xl font-bold text-gray-800">Manage Destinations</h2>
                      <button
                        onClick={handleAddDestination}
                        className="bg-green-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-green-600 transition-colors flex items-center space-x-2"
                      >
                        <Plus className="w-4 h-4" />
                        <span>Add Destination</span>
                      </button>
                    </div>

                    <div className="bg-gray-50 rounded-2xl p-6">
                      <div className="overflow-x-auto">
                        <table className="w-full">
                          <thead>
                            <tr className="border-b border-gray-200">
                              <th className="text-left py-3 px-4 font-semibold text-gray-700">Name</th>
                              <th className="text-left py-3 px-4 font-semibold text-gray-700">Visitors</th>
                              <th className="text-left py-3 px-4 font-semibold text-gray-700">Growth</th>
                              <th className="text-left py-3 px-4 font-semibold text-gray-700">Status</th>
                              <th className="text-left py-3 px-4 font-semibold text-gray-700">Actions</th>
                            </tr>
                          </thead>
                          <tbody>
                            {mockData.topDestinations.map((destination) => (
                              <tr key={destination.id} className="border-b border-gray-100">
                                <td className="py-4 px-4">
                                  <div className="flex items-center space-x-3">
                                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                                      <MapPin className="w-5 h-5 text-green-600" />
                                    </div>
                                    <span className="font-medium text-gray-800">{destination.name}</span>
                                  </div>
                                </td>
                                <td className="py-4 px-4 text-gray-600">{destination.visitors.toLocaleString()}</td>
                                <td className="py-4 px-4">
                                  <span className="text-green-600 font-semibold">+{destination.growth}%</span>
                                </td>
                                <td className="py-4 px-4">
                                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                    destination.status === 'active' 
                                      ? 'bg-green-100 text-green-800' 
                                      : 'bg-red-100 text-red-800'
                                  }`}>
                                    {destination.status}
                                  </span>
                                </td>
                                <td className="py-4 px-4">
                                  <div className="flex items-center space-x-2">
                                    <button
                                      onClick={() => handleEditDestination(destination)}
                                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                    >
                                      <Edit className="w-4 h-4" />
                                    </button>
                                    <button
                                      onClick={() => handleDeleteDestination(destination.id)}
                                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                    >
                                      <Trash2 className="w-4 h-4" />
                                    </button>
                                  </div>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                )}

                {/* Clusters Tab */}
                {activeTab === "clusters" && (
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <h2 className="text-2xl font-bold text-gray-800">Manage Clusters</h2>
                      <button
                        onClick={handleAddCluster}
                        className="bg-green-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-green-600 transition-colors flex items-center space-x-2"
                      >
                        <Plus className="w-4 h-4" />
                        <span>Add Cluster</span>
                      </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {mockData.clusters.map((cluster) => (
                        <div key={cluster.id} className="bg-gray-50 rounded-2xl p-6">
                          <div className="flex items-start justify-between mb-4">
                            <div className="flex items-center space-x-3">
                              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                                <Database className="w-6 h-6 text-blue-600" />
                              </div>
                              <div>
                                <h3 className="text-lg font-bold text-gray-800">{cluster.name}</h3>
                                <p className="text-gray-600 text-sm">{cluster.destinations} destinations</p>
                              </div>
                            </div>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              cluster.status === 'active' 
                                ? 'bg-green-100 text-green-800' 
                                : 'bg-red-100 text-red-800'
                            }`}>
                              {cluster.status}
                            </span>
                          </div>
                          
                          <div className="mb-4">
                            <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
                              <span>Total Visitors</span>
                              <span className="font-semibold text-gray-800">{cluster.visitors.toLocaleString()}</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div 
                                className="bg-blue-500 h-2 rounded-full" 
                                style={{ width: `${(cluster.visitors / 50000) * 100}%` }}
                              ></div>
                            </div>
                          </div>

                          <div className="flex items-center space-x-2">
                            <button
                              onClick={() => handleEditCluster(cluster)}
                              className="flex-1 bg-blue-500 text-white py-2 px-4 rounded-lg font-semibold hover:bg-blue-600 transition-colors flex items-center justify-center space-x-2"
                            >
                              <Edit className="w-4 h-4" />
                              <span>Edit</span>
                            </button>
                            <button
                              onClick={() => handleDeleteCluster(cluster.id)}
                              className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Demographics Tab */}
                {activeTab === "demographics" && (
                  <div className="space-y-6">
                    <h2 className="text-2xl font-bold text-gray-800">Visitor Demographics</h2>
                    <div className="bg-gray-50 rounded-2xl p-6">
                      <div className="space-y-6">
                        {mockData.demographics.map((demo) => (
                          <div key={demo.age} className="flex items-center justify-between">
                            <span className="text-gray-700 font-medium">{demo.age} years</span>
                            <div className="flex items-center space-x-4">
                              <div className="w-64 bg-gray-200 rounded-full h-3">
                                <div 
                                  className={`${demo.color} h-3 rounded-full`}
                                  style={{ width: `${demo.percentage}%` }}
                                ></div>
                              </div>
                              <span className="text-gray-800 font-semibold w-12 text-right">{demo.percentage}%</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* Feedback Tab */}
                {activeTab === "feedback" && (
                  <div className="space-y-6">
                    <h2 className="text-2xl font-bold text-gray-800">Visitor Feedback</h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-2xl p-6 text-white">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-yellow-100 text-sm font-medium">Average Rating</p>
                            <p className="text-3xl font-bold">{mockData.feedback.averageRating}</p>
                            <p className="text-yellow-100 text-sm">out of 5.0</p>
                          </div>
                          <Star className="w-12 h-12 text-yellow-200" />
                        </div>
                      </div>

                      <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl p-6 text-white">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-blue-100 text-sm font-medium">Total Reviews</p>
                            <p className="text-3xl font-bold">{mockData.feedback.totalReviews.toLocaleString()}</p>
                            <p className="text-blue-100 text-sm">reviews collected</p>
                          </div>
                          <Eye className="w-12 h-12 text-blue-200" />
                        </div>
                      </div>

                      <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-2xl p-6 text-white">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-green-100 text-sm font-medium">Positive Sentiment</p>
                            <p className="text-3xl font-bold">{mockData.feedback.sentiment.positive}%</p>
                            <p className="text-green-100 text-sm">satisfied visitors</p>
                          </div>
                          <TrendingUp className="w-12 h-12 text-green-200" />
                        </div>
                      </div>
                    </div>

                    <div className="bg-gray-50 rounded-2xl p-6">
                      <h3 className="text-xl font-bold text-gray-800 mb-4">Sentiment Analysis</h3>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <span className="text-green-700 font-medium">Positive</span>
                          <div className="flex items-center space-x-4">
                            <div className="w-64 bg-gray-200 rounded-full h-3">
                              <div 
                                className="bg-green-500 h-3 rounded-full"
                                style={{ width: `${mockData.feedback.sentiment.positive}%` }}
                              ></div>
                            </div>
                            <span className="text-gray-800 font-semibold w-12 text-right">{mockData.feedback.sentiment.positive}%</span>
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-yellow-700 font-medium">Neutral</span>
                          <div className="flex items-center space-x-4">
                            <div className="w-64 bg-gray-200 rounded-full h-3">
                              <div 
                                className="bg-yellow-500 h-3 rounded-full"
                                style={{ width: `${mockData.feedback.sentiment.neutral}%` }}
                              ></div>
                            </div>
                            <span className="text-gray-800 font-semibold w-12 text-right">{mockData.feedback.sentiment.neutral}%</span>
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-red-700 font-medium">Negative</span>
                          <div className="flex items-center space-x-4">
                            <div className="w-64 bg-gray-200 rounded-full h-3">
                              <div 
                                className="bg-red-500 h-3 rounded-full"
                                style={{ width: `${mockData.feedback.sentiment.negative}%` }}
                              ></div>
                            </div>
                            <span className="text-gray-800 font-semibold w-12 text-right">{mockData.feedback.sentiment.negative}%</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Settings Tab */}
                {activeTab === "settings" && (
                  <div className="space-y-6">
                    <h2 className="text-2xl font-bold text-gray-800">System Settings</h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="bg-gray-50 rounded-2xl p-6">
                        <h3 className="text-lg font-bold text-gray-800 mb-4">General Settings</h3>
                        <div className="space-y-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Site Name</label>
                            <input 
                              type="text" 
                              defaultValue="Jharkhand Tourism" 
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Default Language</label>
                            <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500">
                              <option value="en">English</option>
                              <option value="hi">Hindi</option>
                              <option value="san">Santhali</option>
                            </select>
                          </div>
                        </div>
                      </div>

                      <div className="bg-gray-50 rounded-2xl p-6">
                        <h3 className="text-lg font-bold text-gray-800 mb-4">Analytics Settings</h3>
                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <span className="text-gray-700">Enable Analytics</span>
                            <input type="checkbox" defaultChecked className="w-4 h-4 text-green-500" />
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-gray-700">Track User Behavior</span>
                            <input type="checkbox" defaultChecked className="w-4 h-4 text-green-500" />
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-gray-700">Collect Feedback</span>
                            <input type="checkbox" defaultChecked className="w-4 h-4 text-green-500" />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-gray-50 rounded-2xl p-6">
                      <h3 className="text-lg font-bold text-gray-800 mb-4">Actions</h3>
                      <div className="flex space-x-4">
                        <button className="bg-green-500 text-white px-6 py-2 rounded-lg font-semibold hover:bg-green-600 transition-colors">
                          Save Settings
                        </button>
                        <button className="bg-blue-500 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-600 transition-colors">
                          Export Data
                        </button>
                        <button className="bg-red-500 text-white px-6 py-2 rounded-lg font-semibold hover:bg-red-600 transition-colors">
                          Reset to Default
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Modals */}
        <AddDestinationModal
          isOpen={showAddDestination}
          onClose={() => {
            setShowAddDestination(false);
            setEditingDestination(undefined);
          }}
          onSave={handleSaveDestination}
          editingDestination={editingDestination}
        />

        <AddClusterModal
          isOpen={showAddCluster}
          onClose={() => {
            setShowAddCluster(false);
            setEditingCluster(undefined);
          }}
          onSave={handleSaveCluster}
          editingCluster={editingCluster}
        />
      </div>
    </ProtectedRoute>
  );
}
