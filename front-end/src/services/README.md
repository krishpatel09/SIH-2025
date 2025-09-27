# Services Directory

This directory contains all the API service files for the frontend application. Each service is responsible for handling API calls to specific backend endpoints.

## Structure

- `apiPath.ts` - Contains all API endpoint paths and configuration
- `authService.ts` - Handles authentication-related API calls
- `destinationService.ts` - Handles destination-related API calls
- `featureService.ts` - Handles feature-related API calls
- `culturalService.ts` - Handles cultural element-related API calls
- `analyticsService.ts` - Handles analytics-related API calls
- `mapService.ts` - Handles map-related API calls
- `index.ts` - Exports all services and types

## Usage

### Import Services

```typescript
import { 
  authService, 
  destinationService, 
  featureService,
  culturalService,
  analyticsService,
  mapService 
} from '../services';
```

### Import Types

```typescript
import type { 
  Destination, 
  UserProfile, 
  AnalyticsOverview 
} from '../services';
```

### Import API Paths

```typescript
import { API_PATHS, API_BASE_URL } from '../services';
```

## Service Methods

### Auth Service
- `login(loginData)` - User login
- `register(registerData)` - User registration
- `getProfile()` - Get user profile
- `updateProfile(userData)` - Update user profile
- `changePassword(currentPassword, newPassword)` - Change password
- `verifyToken()` - Verify authentication token
- `getAllUsers()` - Get all users (admin only)
- `logout()` - Logout user
- `isAuthenticated()` - Check if user is authenticated

### Destination Service
- `getAllDestinations()` - Get all destinations
- `getDestinationById(id)` - Get destination by ID
- `getDestinationsByCategory(category)` - Get destinations by category
- `createDestination(destinationData)` - Create new destination (admin)
- `updateDestination(id, destinationData)` - Update destination (admin)
- `deleteDestination(id)` - Delete destination (admin)

### Feature Service
- `getAllFeatures()` - Get all features
- `getFeatureById(id)` - Get feature by ID
- `createFeature(featureData)` - Create new feature (admin)
- `updateFeature(id, featureData)` - Update feature (admin)
- `deleteFeature(id)` - Delete feature (admin)

### Cultural Service
- `getAllCulturalElements()` - Get all cultural elements
- `getCulturalElementById(id)` - Get cultural element by ID
- `createCulturalElement(culturalData)` - Create new cultural element (admin)
- `updateCulturalElement(id, culturalData)` - Update cultural element (admin)
- `deleteCulturalElement(id)` - Delete cultural element (admin)

### Analytics Service
- `getAnalyticsOverview()` - Get analytics overview
- `getAnalyticsData()` - Get analytics data
- `getTopDestinations()` - Get top destinations
- `getMonthlyVisitors()` - Get monthly visitors
- `getDemographics()` - Get demographics data
- `updateAnalyticsData(analyticsData)` - Update analytics data (admin)

### Map Service
- `getAllMapData()` - Get all map data
- `getMapDataByCategory(category)` - Get map data by category
- `getMapCategories()` - Get map categories

## Error Handling

All services return a standardized `ApiResponse` object:

```typescript
interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
  details?: any[];
}
```

## Authentication

Services automatically handle authentication tokens stored in localStorage. Tokens are automatically included in requests and removed if they become invalid.

## Environment Configuration

The API base URL can be configured using the `NEXT_PUBLIC_API_URL` environment variable. If not set, it defaults to `http://localhost:5000/api`.
