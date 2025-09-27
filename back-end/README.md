# Jharkhand Tourism Backend API - MVC Architecture

A comprehensive Node.js backend API for the Jharkhand Tourism Platform, built with Express.js, Supabase, and following the **MVC (Model-View-Controller)** architectural pattern.

## 🏗️ Architecture Overview

This backend follows the **MVC Pattern** for better organization, maintainability, and scalability:

- **Models**: Handle data logic and database operations
- **Views**: JSON responses (API endpoints)
- **Controllers**: Handle business logic and coordinate between models and views
- **Routes**: Define API endpoints and middleware
- **Middleware**: Handle cross-cutting concerns like validation and error handling

## 📁 Project Structure

```
back-end/
├── config/
│   └── supabase.js              # Supabase client configuration
├── controllers/                 # Business logic layer
│   ├── DestinationController.js # Destination operations
│   ├── FeatureController.js     # Feature operations
│   ├── CulturalController.js    # Cultural element operations
│   ├── AnalyticsController.js   # Analytics operations
│   └── MapController.js         # Map data operations
├── models/                      # Data access layer
│   ├── BaseModel.js            # Base model with common CRUD operations
│   ├── Destination.js          # Destination model with specialized methods
│   ├── Feature.js              # Feature model
│   ├── CulturalElement.js      # Cultural element model
│   └── Analytics.js             # Analytics model with complex queries
├── routes/                     # API routing layer
│   ├── destinations.js         # Destination routes
│   ├── features.js             # Feature routes
│   ├── cultural.js             # Cultural element routes
│   ├── analytics.js            # Analytics routes
│   └── maps.js                 # Map data routes
├── middleware/                 # Cross-cutting concerns
│   ├── errorHandler.js         # Global error handling
│   └── validation.js           # Request validation
├── scripts/
│   ├── schema.sql              # Database schema
│   └── seedData.js             # Database seeding
├── server.js                   # Application entry point
├── package.json                # Dependencies and scripts
├── .env.example                # Environment variables template
├── .gitignore                  # Git ignore rules
└── README.md                   # This file
```

## 🎯 MVC Components

### Models (Data Layer)
Models handle all database operations and data logic:

- **BaseModel**: Common CRUD operations for all entities
- **Destination**: Specialized methods for destination data
- **Feature**: Feature management operations
- **CulturalElement**: Cultural data operations
- **Analytics**: Complex analytics queries and aggregations

### Controllers (Business Logic Layer)
Controllers handle business logic and coordinate between models and views:

- **DestinationController**: Destination business logic
- **FeatureController**: Feature business logic
- **CulturalController**: Cultural element business logic
- **AnalyticsController**: Analytics business logic
- **MapController**: Map data business logic

### Routes (API Layer)
Routes define API endpoints and apply middleware:

- Clean separation of concerns
- Middleware for validation
- Error handling
- Route-specific logic

### Middleware (Cross-cutting Concerns)
- **Error Handling**: Global error management
- **Validation**: Request data validation
- **Security**: CORS, rate limiting, helmet
- **Logging**: Request logging

## �� Features

- 🏛️ **Destinations Management** - CRUD operations with category filtering
- 🎯 **Features Management** - Platform capabilities management
- 🎭 **Cultural Elements** - Tribal communities, arts, festivals, and traditions
- 📊 **Analytics Dashboard** - Visitor statistics, demographics, and trends
- 🗺️ **Interactive Maps** - Location-based data for mapping services
- 🔒 **Security** - Helmet, CORS, rate limiting, and input validation
- 📝 **Logging** - Morgan HTTP request logging
- 🚀 **Performance** - Optimized queries and database indexing
- ✅ **Validation** - Request data validation middleware
- 🛡️ **Error Handling** - Comprehensive error management

## 🛠️ Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: Supabase (PostgreSQL)
- **Architecture**: MVC Pattern
- **Security**: Helmet, CORS, Rate Limiting
- **Logging**: Morgan
- **Environment**: dotenv

## 📋 Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Supabase account and project

## 🚀 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd back-end
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   ```bash
   cp .env.example .env
   ```
   
   Update `.env` with your Supabase credentials:
   ```env
   SUPABASE_URL=your_supabase_project_url
   SUPABASE_ANON_KEY=your_supabase_anon_key
   SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
   PORT=5000
   NODE_ENV=development
   FRONTEND_URL=http://localhost:3000
   ```

4. **Database Setup**
   
   Run the SQL schema in your Supabase SQL editor:
   ```bash
   cat scripts/schema.sql
   ```
   
   Copy and execute the SQL in your Supabase dashboard.

5. **Seed Database**
   ```bash
   npm run seed
   ```

## 🏃‍♂️ Running the Application

### Development
```bash
npm run dev
```

### Production
```bash
npm start
```

The server will start on `http://localhost:5000` (or your configured PORT).

## 📚 API Endpoints

### Health Check
- `GET /health` - Server health status with architecture info

### Destinations
- `GET /api/destinations` - Get all destinations
- `GET /api/destinations/:id` - Get destination by ID
- `GET /api/destinations/category/:category` - Get destinations by category
- `POST /api/destinations` - Create new destination (validated)
- `PUT /api/destinations/:id` - Update destination (validated)
- `DELETE /api/destinations/:id` - Delete destination

### Features
- `GET /api/features` - Get all features
- `GET /api/features/:id` - Get feature by ID
- `POST /api/features` - Create new feature (validated)
- `PUT /api/features/:id` - Update feature (validated)
- `DELETE /api/features/:id` - Delete feature

### Cultural Elements
- `GET /api/cultural` - Get all cultural elements
- `GET /api/cultural/:id` - Get cultural element by ID
- `POST /api/cultural` - Create new cultural element (validated)
- `PUT /api/cultural/:id` - Update cultural element (validated)
- `DELETE /api/cultural/:id` - Delete cultural element

### Analytics
- `GET /api/analytics/overview` - Get complete analytics overview
- `GET /api/analytics/data` - Get analytics data only
- `GET /api/analytics/top-destinations` - Get top destinations
- `GET /api/analytics/monthly-visitors` - Get monthly visitor data
- `GET /api/analytics/demographics` - Get demographic data
- `POST /api/analytics/data` - Update analytics data (validated)

### Maps
- `GET /api/maps` - Get all map data with coordinates
- `GET /api/maps/category/:category` - Get map data by category
- `GET /api/maps/categories` - Get available categories with counts

## 🗄️ Database Schema

The database includes the following tables:

- **features** - Platform features and capabilities
- **destinations** - Tourist destinations with coordinates
- **cultural_elements** - Cultural information and traditions
- **analytics_data** - Main analytics metrics
- **top_destinations** - Top performing destinations
- **monthly_visitors** - Monthly visitor statistics
- **demographics** - Visitor demographic data
- **maps_data** - Map-specific data (linked to destinations)

## �� Response Format

All API responses follow this format:

```json
{
  "success": true,
  "data": { ... },
  "count": 10,
  "message": "Optional message"
}
```

Error responses:

```json
{
  "success": false,
  "error": "Error description",
  "message": "Detailed error message"
}
```

## 🔒 Security Features

- **Helmet**: Security headers
- **CORS**: Cross-origin resource sharing configuration
- **Rate Limiting**: 100 requests per 15 minutes per IP
- **Input Validation**: Request body validation middleware
- **Error Handling**: Secure error messages in production
- **Request Size Limits**: 10MB limit on request bodies

## 🧪 Validation

The API includes comprehensive validation middleware:

- **Destination Validation**: Required fields, rating range, highlights array
- **Feature Validation**: Required fields validation
- **Cultural Element Validation**: Required fields, items array validation
- **Analytics Validation**: Required fields, rating range, sentiment validation

## 🏗️ MVC Benefits

### Separation of Concerns
- **Models**: Focus on data operations
- **Controllers**: Handle business logic
- **Routes**: Define API structure
- **Middleware**: Handle cross-cutting concerns

### Maintainability
- Clear code organization
- Easy to locate and modify functionality
- Consistent error handling
- Reusable components

### Scalability
- Easy to add new features
- Modular architecture
- Clear dependencies
- Testable components

### Code Reusability
- BaseModel for common operations
- Reusable validation middleware
- Consistent error handling
- Shared utilities

## 🧪 Development

### Adding New Features

1. **Create Model**: Extend BaseModel or create specialized model
2. **Create Controller**: Implement business logic
3. **Create Routes**: Define API endpoints
4. **Add Validation**: Create validation middleware
5. **Update Documentation**: Update this README

### Database Changes

1. Update `scripts/schema.sql`
2. Run migration in Supabase
3. Update models if needed
4. Update seed data if required
5. Test endpoints

### Error Handling

The application uses a centralized error handling approach:
- Controllers throw errors
- Global error handler catches and formats responses
- Consistent error response format
- Development vs production error details

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Follow MVC pattern
4. Add appropriate tests
5. Update documentation
6. Submit a pull request

## 📄 License

MIT License - see LICENSE file for details.

## 🎉 Architecture Benefits

- **Clean Code**: Well-organized, readable codebase
- **Maintainable**: Easy to modify and extend
- **Scalable**: Can handle growth and new features
- **Testable**: Clear separation makes testing easier
- **Professional**: Industry-standard architecture pattern
