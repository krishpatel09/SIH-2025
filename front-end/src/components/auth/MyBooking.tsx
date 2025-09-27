'use client';

import React from "react";
import { ShoppingCart, Calendar, Users, MapPin, Eye, MoreVertical, CheckCircle, Clock, XCircle } from "lucide-react";
import { Breadcrumb } from '@/components/Breadcrumb';

type Booking = {
  id: number;
  hotelName: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  status: "Confirmed" | "Cancelled" | "Pending";
};

// Sample bookings data
const bookings: Booking[] = [
  {
    id: 1,
    hotelName: "The Grand Palace",
    checkIn: "2024-07-10",
    checkOut: "2024-07-15",
    guests: 2,
    status: "Confirmed",
  },
  {
    id: 2,
    hotelName: "Seaside Resort",
    checkIn: "2024-08-01",
    checkOut: "2024-08-05",
    guests: 4,
    status: "Pending",
  },
  {
    id: 3,
    hotelName: "Mountain View Inn",
    checkIn: "2024-09-12",
    checkOut: "2024-09-14",
    guests: 1,
    status: "Cancelled",
  },
];

const statusStyles: Record<string, string> = {
  Confirmed: "bg-green-100 text-green-800",
  Pending: "bg-yellow-100 text-yellow-800",
  Cancelled: "bg-red-100 text-red-800",
};

const MyBooking: React.FC = () => {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Confirmed':
        return <CheckCircle className="w-4 h-4" />;
      case 'Pending':
        return <Clock className="w-4 h-4" />;
      case 'Cancelled':
        return <XCircle className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  return (
    <div className="w-full">
      {/* Breadcrumb */}
      <Breadcrumb items={[
        { label: 'Profile', href: '/profile?tab=profile' },
        { label: 'My Bookings' }
      ]} />

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Stats Cards */}
      

        {/* Bookings Content */}
        <div className="lg:col-span-3">
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-emerald-500 to-teal-600 p-8 text-white">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-white bg-opacity-20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                  <ShoppingCart className="w-8 h-8" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold">My Bookings</h1>
                  <p className="text-emerald-100 text-lg">Manage your hotel reservations</p>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="p-8">
              {bookings.length === 0 ? (
                <div className="text-center py-16">
                  <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <ShoppingCart className="w-12 h-12 text-gray-400" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">No bookings yet</h3>
                  <p className="text-gray-500 text-lg mb-8">Start planning your next trip!</p>
                  <button className="bg-emerald-500 text-white px-6 py-3 rounded-xl hover:bg-emerald-600 transition-colors font-semibold">
                    Book Now
                  </button>
                </div>
              ) : (
                <div className="space-y-6">
                  {bookings.map((booking) => (
                    <div
                      key={booking.id}
                      className="group border border-gray-200 rounded-2xl p-6 hover:shadow-lg transition-all duration-300 hover:border-emerald-200"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-4 mb-4">
                            <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center">
                              <MapPin className="w-6 h-6 text-emerald-600" />
                            </div>
                            <div className="flex-1">
                              <h3 className="text-xl font-bold text-gray-900 mb-1">
                                {booking.hotelName}
                              </h3>
                              <div className="flex items-center space-x-4">
                                <span
                                  className={`px-3 py-1 rounded-full text-sm font-semibold flex items-center space-x-2 ${statusStyles[booking.status]}`}
                                >
                                  {getStatusIcon(booking.status)}
                                  <span>{booking.status}</span>
                                </span>
                                <span className="text-sm text-gray-500">
                                  Booking #{booking.id}
                                </span>
                              </div>
                            </div>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                            <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-xl">
                              <Calendar className="w-5 h-5 text-gray-500" />
                              <div>
                                <p className="text-sm text-gray-500">Check-In</p>
                                <p className="font-semibold text-gray-800">{booking.checkIn}</p>
                              </div>
                            </div>
                            <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-xl">
                              <Calendar className="w-5 h-5 text-gray-500" />
                              <div>
                                <p className="text-sm text-gray-500">Check-Out</p>
                                <p className="font-semibold text-gray-800">{booking.checkOut}</p>
                              </div>
                            </div>
                            <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-xl">
                              <Users className="w-5 h-5 text-gray-500" />
                              <div>
                                <p className="text-sm text-gray-500">Guests</p>
                                <p className="font-semibold text-gray-800">
                                  {booking.guests} {booking.guests > 1 ? 'guests' : 'guest'}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center space-x-2 ml-6">
                          <button className="flex items-center space-x-2 px-4 py-2 text-emerald-600 hover:bg-emerald-50 rounded-xl transition-colors font-semibold">
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

export default MyBooking;
