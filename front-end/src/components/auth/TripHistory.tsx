'use client';

import React, { useEffect, useState } from 'react';
import { History, MapPin, Calendar, Clock, Users, Eye, MoreVertical } from 'lucide-react';
import axiosInstance from '@/services/axiosInstance';
import API_PATHS from '@/services/apiPath';
import { Breadcrumb } from '@/components/Breadcrumb';

export const TripHistory = ({ userId }: { userId: string }) => {
  const [trips, setTrips] = useState<{
    id: string;
    destination: string;
    startDate: string;
    endDate: string;
    status: string;
    totalCost: number;
  }[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getTrips = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axiosInstance.get(API_PATHS.TRIPS.GET_USER_TRIPS(userId));
        console.log("Trips data:", response.data.data);
        setTrips(response.data.data || []);  // ✅ fix: use .data.data
      } catch (err: unknown) {
        console.error("Error fetching trips:", err);
        setError((err as Error).message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      getTrips();
    }
  }, [userId]);

  return (
    <div className="w-full">
      {/* Breadcrumb */}
      <Breadcrumb items={[
        { label: 'Profile', href: '/profile?tab=profile' },
        { label: 'Trip History' }
      ]} />

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Stats Cards */}
        

        {/* Trip History Content */}
        <div className="lg:col-span-3">
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-8 text-white">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-white bg-opacity-20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                  <History className="w-8 h-8" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold">Trip History</h1>
                  <p className="text-blue-100 text-lg">View and manage your travel experiences</p>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="p-8">
              {loading ? (
                <div className="text-center py-12">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
                  <p className="text-gray-500">Loading trips...</p>
                </div>
              ) : error ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <History className="w-8 h-8 text-red-500" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Error Loading Trips</h3>
                  <p className="text-red-500">{error}</p>
                </div>
              ) : trips.length === 0 ? (
                <div className="text-center py-16">
                  <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <History className="w-12 h-12 text-gray-400" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">No trips yet</h3>
                  <p className="text-gray-500 text-lg mb-8">Start planning your first adventure!</p>
                  <button className="bg-blue-500 text-white px-6 py-3 rounded-xl hover:bg-blue-600 transition-colors font-semibold">
                    Plan Your First Trip
                  </button>
                </div>
              ) : (
                <div className="space-y-6">
                  {trips.map((trip, index) => (
                    <div
                      key={trip.id}
                      className="group border border-gray-200 rounded-2xl p-6 hover:shadow-lg transition-all duration-300 hover:border-blue-200"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-4 mb-4">
                            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                              <MapPin className="w-6 h-6 text-blue-600" />
                            </div>
                            <div className="flex-1">
                              <h3 className="text-xl font-bold text-gray-900 mb-1">
                                {trip.name}
                              </h3>
                              <div className="flex items-center space-x-4">
                                <span
                                  className={`px-3 py-1 rounded-full text-sm font-semibold ${
                                    trip.status === 'completed'
                                      ? 'bg-emerald-100 text-emerald-800'
                                      : trip.status === 'upcoming'
                                      ? 'bg-blue-100 text-blue-800'
                                      : 'bg-yellow-100 text-yellow-800'
                                  }`}
                                >
                                  {trip.status}
                                </span>
                                <span className="text-sm text-gray-500">
                                  Trip #{index + 1}
                                </span>
                              </div>
                            </div>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                            <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-xl">
                              <Calendar className="w-5 h-5 text-gray-500" />
                              <div>
                                <p className="text-sm text-gray-500">Duration</p>
                                <p className="font-semibold text-gray-800">
                                  {new Date(trip.start_date).toLocaleDateString()} →{' '}
                                  {new Date(trip.end_date).toLocaleDateString()}
                                </p>
                              </div>
                            </div>
                            <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-xl">
                              <Clock className="w-5 h-5 text-gray-500" />
                              <div>
                                <p className="text-sm text-gray-500">Duration</p>
                                <p className="font-semibold text-gray-800">{trip.duration} days</p>
                              </div>
                            </div>
                            <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-xl">
                              <Users className="w-5 h-5 text-gray-500" />
                              <div>
                                <p className="text-sm text-gray-500">Travelers</p>
                                <p className="font-semibold text-gray-800">
                                  {trip.travelers} traveler{trip.travelers > 1 ? 's' : ''}
                                </p>
                              </div>
                            </div>
                          </div>

                          {trip.description && (
                            <p className="text-gray-600 mb-4">{trip.description}</p>
                          )}
                        </div>

                        <div className="flex items-center space-x-2 ml-6">
                          <button className="flex items-center space-x-2 px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-xl transition-colors font-semibold">
                            <Eye className="w-4 h-4" />
                            <span>View Details</span>
                          </button>
                          <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-xl transition-colors">
                            <MoreVertical className="w-5 h-5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
