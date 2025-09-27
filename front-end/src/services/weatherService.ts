import axiosInstance from './axiosInstance';
import API_PATHS from './apiPath';

export interface WeatherData {
  temp: number;
  condition: string;
  humidity: number;
  wind: number;
  feels_like: number;
  pressure: number;
  visibility: number;
}

export interface ForecastData {
  day: string;
  temp: number;
  condition: string;
  humidity: number;
  wind: number;
}

export interface BestTimeData {
  season: string;
  temp: string;
  condition: string;
  recommendation: string;
}

export interface JharkhandWeather {
  [destination: string]: {
    current: WeatherData | null;
    forecast: ForecastData[] | null;
  };
}

class WeatherService {
  // Get current weather for coordinates
  async getCurrentWeather(lat: number, lon: number): Promise<{ success: boolean; data?: WeatherData; error?: string }> {
    try {
      const response = await axiosInstance.get(API_PATHS.WEATHER.GET_CURRENT(lat, lon));
      return {
        success: response.data.success,
        data: response.data.data,
        error: response.data.error
      };
    } catch (error: any) {
      return {
        success: false,
        error: error.response?.data?.error || 'Failed to fetch current weather'
      };
    }
  }

  // Get weather forecast for coordinates
  async getForecast(lat: number, lon: number): Promise<{ success: boolean; data?: ForecastData[]; error?: string }> {
    try {
      const response = await axiosInstance.get(API_PATHS.WEATHER.GET_FORECAST(lat, lon));
      return {
        success: response.data.success,
        data: response.data.data,
        error: response.data.error
      };
    } catch (error: any) {
      return {
        success: false,
        error: error.response?.data?.error || 'Failed to fetch forecast'
      };
    }
  }

  // Get weather for Jharkhand destinations
  async getJharkhandWeather(): Promise<{ success: boolean; data?: JharkhandWeather; error?: string }> {
    try {
      const response = await axiosInstance.get(API_PATHS.WEATHER.GET_JHARKHAND_WEATHER);
      return {
        success: response.data.success,
        data: response.data.data,
        error: response.data.error
      };
    } catch (error: any) {
      return {
        success: false,
        error: error.response?.data?.error || 'Failed to fetch Jharkhand weather'
      };
    }
  }

  // Get best time to visit based on month
  async getBestTimeToVisit(month: number): Promise<{ success: boolean; data?: BestTimeData; error?: string }> {
    try {
      const response = await axiosInstance.get(API_PATHS.WEATHER.GET_BEST_TIME(month));
      return {
        success: response.data.success,
        data: response.data.data,
        error: response.data.error
      };
    } catch (error: any) {
      return {
        success: false,
        error: error.response?.data?.error || 'Failed to fetch best time data'
      };
    }
  }

  // Get weather icon based on condition
  getWeatherIcon(condition: string): string {
    const iconMap: Record<string, string> = {
      'Clear': '☀️',
      'Sunny': '☀️',
      'Clouds': '☁️',
      'Cloudy': '☁️',
      'Rain': '🌧️',
      'Rainy': '🌧️',
      'Thunderstorm': '⛈️',
      'Snow': '❄️',
      'Mist': '🌫️',
      'Fog': '🌫️',
      'Haze': '🌫️'
    };
    return iconMap[condition] || '🌤️';
  }

  // Get weather color based on condition
  getWeatherColor(condition: string): string {
    const colorMap: Record<string, string> = {
      'Clear': 'text-yellow-500',
      'Sunny': 'text-yellow-500',
      'Clouds': 'text-gray-500',
      'Cloudy': 'text-gray-500',
      'Rain': 'text-blue-500',
      'Rainy': 'text-blue-500',
      'Thunderstorm': 'text-purple-500',
      'Snow': 'text-blue-200',
      'Mist': 'text-gray-400',
      'Fog': 'text-gray-400',
      'Haze': 'text-gray-400'
    };
    return colorMap[condition] || 'text-gray-500';
  }

  // Format temperature
  formatTemperature(temp: number): string {
    return `${Math.round(temp)}°C`;
  }

  // Format wind speed
  formatWindSpeed(wind: number): string {
    return `${Math.round(wind)} km/h`;
  }

  // Get weather recommendation based on condition
  getWeatherRecommendation(condition: string): string {
    const recommendations: Record<string, string> = {
      'Clear': 'Perfect weather for outdoor activities and sightseeing',
      'Sunny': 'Great weather for outdoor activities, remember to stay hydrated',
      'Clouds': 'Good weather for outdoor activities, comfortable temperature',
      'Cloudy': 'Pleasant weather for outdoor activities',
      'Rain': 'Indoor activities recommended, carry umbrella if going out',
      'Rainy': 'Indoor activities recommended, avoid outdoor activities',
      'Thunderstorm': 'Stay indoors, avoid outdoor activities',
      'Snow': 'Winter activities available, dress warmly',
      'Mist': 'Limited visibility, drive carefully',
      'Fog': 'Poor visibility, avoid driving',
      'Haze': 'Reduced visibility, limit outdoor activities'
    };
    return recommendations[condition] || 'Check weather conditions before planning activities';
  }

  // Get seasonal recommendations
  getSeasonalRecommendations(month: number): string[] {
    const recommendations: Record<number, string[]> = {
      1: ['Winter is perfect for hill stations', 'Carry warm clothes', 'Best time for wildlife safaris'],
      2: ['Pleasant weather continues', 'Good for outdoor activities', 'Festival season'],
      3: ['Spring begins', 'Perfect for nature walks', 'Flower blooming season'],
      4: ['Hot weather starts', 'Early morning activities recommended', 'Stay hydrated'],
      5: ['Peak summer', 'Indoor activities preferred', 'Early morning or evening outings'],
      6: ['Monsoon begins', 'Nature at its best', 'Waterfalls are spectacular'],
      7: ['Peak monsoon', 'Lush green landscapes', 'Water activities available'],
      8: ['Monsoon continues', 'Perfect for nature lovers', 'Photography opportunities'],
      9: ['Monsoon ends', 'Pleasant weather returns', 'Good for outdoor activities'],
      10: ['Autumn begins', 'Perfect weather', 'Best time for sightseeing'],
      11: ['Pleasant autumn', 'Ideal for outdoor activities', 'Festival season'],
      12: ['Winter begins', 'Perfect for hill stations', 'Best time for wildlife']
    };
    return recommendations[month] || ['Check weather conditions'];
  }
}

export default new WeatherService();
