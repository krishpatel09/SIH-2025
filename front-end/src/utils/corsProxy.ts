// Temporary CORS fix - Add this to your frontend as a workaround
// This is a temporary solution while waiting for backend deployment

// Create a proxy configuration for development/production
const createProxyConfig = () => {
  // Check if we're in production
  const isProduction = process.env.NODE_ENV === 'production';
  
  if (isProduction) {
    // For production, we'll use a CORS proxy temporarily
    return {
      baseURL: 'https://cors-anywhere.herokuapp.com/https://smart-india-hackthon-2025.onrender.com/api',
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
        'Origin': 'https://sih-2025-steel.vercel.app'
      }
    };
  } else {
    // For development, use local backend
    return {
      baseURL: 'http://localhost:5000/api',
      headers: {
        'Origin': 'http://localhost:3000'
      }
    };
  }
};

// Alternative: Use a different CORS proxy service
const getCORSProxyURL = (targetURL) => {
  // You can use any of these CORS proxy services temporarily:
  const proxies = [
    'https://cors-anywhere.herokuapp.com/',
    'https://api.allorigins.win/raw?url=',
    'https://thingproxy.freeboard.io/fetch/'
  ];
  
  return `${proxies[0]}${encodeURIComponent(targetURL)}`;
};

// Usage example for your API calls:
const fetchWithCORSProxy = async (endpoint) => {
  const proxyConfig = createProxyConfig();
  const url = proxyConfig.baseURL + endpoint;
  
  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: proxyConfig.headers
    });
    
    if (response.ok) {
      return await response.json();
    } else {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
  } catch (error) {
    console.error('CORS Proxy fetch failed:', error);
    throw error;
  }
};

// Export for use in your components
export { createProxyConfig, getCORSProxyURL, fetchWithCORSProxy };
