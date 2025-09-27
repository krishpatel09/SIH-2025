# 🔐 Complete Authentication System

This document describes the comprehensive authentication system implemented for the Jharkhand Tourism Platform, covering both backend and frontend components.

## 🏗️ Architecture Overview

The authentication system follows industry best practices with:

- **JWT (JSON Web Tokens)** for stateless authentication
- **bcrypt** for password hashing
- **Role-based access control** (RBAC)
- **Secure session management**
- **React Context** for state management
- **Protected routes** and components

## 🔧 Backend Authentication

### 📁 File Structure
```
back-end/
├── models/
│   └── User.js                 # User model with auth methods
├── controllers/
│   └── AuthController.js       # Authentication business logic
├── middleware/
│   ├── auth.js                 # JWT authentication middleware
│   └── authValidation.js       # Request validation
├── routes/
│   └── auth.js                 # Authentication routes
└── scripts/
    └── schema.sql              # Database schema with users table
```

### 🔑 Key Features

#### 1. **User Model (`models/User.js`)**
- Password hashing with bcrypt
- JWT token generation and verification
- User profile management
- Password change functionality
- Role-based operations

#### 2. **Authentication Controller (`controllers/AuthController.js`)**
- User registration with validation
- Secure login with password verification
- Profile management (view/update)
- Password change functionality
- Token verification
- Admin user management

#### 3. **Authentication Middleware (`middleware/auth.js`)**
- **`protect`**: Requires valid JWT token
- **`authorize`**: Role-based access control
- **`optionalAuth`**: Optional authentication for public endpoints

#### 4. **Validation Middleware (`middleware/authValidation.js`)**
- Email format validation
- Password strength requirements
- Profile update validation
- Password change validation

### 🛡️ Security Features

- **Password Requirements**: Minimum 6 characters with uppercase, lowercase, and number
- **JWT Expiration**: Configurable token expiration (default: 7 days)
- **bcrypt Rounds**: Configurable hashing rounds (default: 12)
- **Input Validation**: Comprehensive request validation
- **Error Handling**: Secure error messages
- **Rate Limiting**: Protection against brute force attacks

### 📊 Database Schema

```sql
-- Users table
CREATE TABLE users (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  name VARCHAR(255) NOT NULL,
  role VARCHAR(50) DEFAULT 'user' CHECK (role IN ('user', 'admin', 'moderator')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Additional tables for user interactions
CREATE TABLE user_reviews (...);
CREATE TABLE user_favorites (...);
```

## 🎨 Frontend Authentication

### 📁 File Structure
```
front-end/src/
├── contexts/
│   └── AuthContext.tsx        # Authentication context provider
├── components/auth/
│   ├── LoginForm.tsx          # Login form component
│   ├── RegisterForm.tsx       # Registration form component
│   ├── AuthModal.tsx          # Modal wrapper for auth forms
│   ├── UserProfile.tsx        # User profile management
│   ├── AuthButton.tsx         # Authentication button for header
│   └── ProtectedRoute.tsx     # Route protection component
├── lib/
│   └── api.ts                 # API client with auth integration
└── app/
    ├── layout.tsx             # Root layout with AuthProvider
    └── dashboard/
        └── page.tsx           # Protected dashboard page
```

### 🔑 Key Features

#### 1. **Authentication Context (`contexts/AuthContext.tsx`)**
- Global authentication state management
- User data and token management
- Authentication methods (login, register, logout)
- Profile management
- Automatic token verification

#### 2. **API Client (`lib/api.ts`)**
- Automatic token attachment to requests
- Token storage in localStorage
- Request/response interceptors
- Error handling for authentication failures

#### 3. **Authentication Components**
- **LoginForm**: Secure login with validation
- **RegisterForm**: User registration with password confirmation
- **AuthModal**: Modal wrapper for auth forms
- **UserProfile**: Complete profile management interface
- **AuthButton**: Header authentication button with dropdown
- **ProtectedRoute**: Route protection with role-based access

#### 4. **Protected Routes**
- Authentication requirement checking
- Role-based access control
- Loading states and error handling
- Automatic redirect to login

## 🚀 API Endpoints

### Authentication Routes (`/api/auth`)

| Method | Endpoint | Description | Auth Required | Roles |
|--------|----------|-------------|---------------|-------|
| POST | `/register` | Register new user | No | - |
| POST | `/login` | User login | No | - |
| GET | `/profile` | Get user profile | Yes | All |
| PUT | `/profile` | Update user profile | Yes | All |
| PUT | `/change-password` | Change password | Yes | All |
| GET | `/verify` | Verify token | Yes | All |
| GET | `/users` | Get all users | Yes | Admin |

### Request/Response Examples

#### Registration
```javascript
POST /api/auth/register
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "SecurePass123",
  "role": "user" // optional
}

Response:
{
  "success": true,
  "data": {
    "user": { "id": "...", "name": "John Doe", "email": "john@example.com", "role": "user" },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  },
  "message": "User registered successfully"
}
```

#### Login
```javascript
POST /api/auth/login
{
  "email": "john@example.com",
  "password": "SecurePass123"
}

Response:
{
  "success": true,
  "data": {
    "user": { "id": "...", "name": "John Doe", "email": "john@example.com", "role": "user" },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  },
  "message": "Login successful"
}
```

## 🔧 Configuration

### Backend Environment Variables
```env
# JWT Configuration
JWT_SECRET=your_super_secret_jwt_key_here_make_it_long_and_random
JWT_EXPIRE=7d

# Password Configuration
BCRYPT_ROUNDS=12

# Supabase Configuration
SUPABASE_URL=your_supabase_project_url
SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
```

### Frontend Environment Variables
```env
# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

## 🛠️ Setup Instructions

### Backend Setup
1. **Install Dependencies**
   ```bash
   cd back-end
   npm install
   ```

2. **Environment Configuration**
   ```bash
   cp .env.example .env
   # Update .env with your credentials
   ```

3. **Database Setup**
   ```bash
   # Run schema.sql in Supabase SQL editor
   cat scripts/schema.sql
   ```

4. **Start Server**
   ```bash
   npm run dev
   ```

### Frontend Setup
1. **Install Dependencies**
   ```bash
   cd front-end
   npm install
   ```

2. **Environment Configuration**
   ```bash
   cp .env.local.example .env.local
   # Update .env.local with API URL
   ```

3. **Start Development Server**
   ```bash
   npm run dev
   ```

## 🎯 Usage Examples

### Protecting Routes
```tsx
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';

// Require authentication
<ProtectedRoute>
  <DashboardContent />
</ProtectedRoute>

// Require specific role
<ProtectedRoute allowedRoles={['admin', 'moderator']}>
  <AdminPanel />
</ProtectedRoute>
```

### Using Authentication Context
```tsx
import { useAuth } from '@/contexts/AuthContext';

function MyComponent() {
  const { user, isAuthenticated, login, logout } = useAuth();

  if (!isAuthenticated) {
    return <LoginPrompt />;
  }

  return <div>Welcome, {user.name}!</div>;
}
```

### API Calls with Authentication
```tsx
import { apiClient } from '@/lib/api';

// Automatic token attachment
const response = await apiClient.getDestinations();

// Manual authentication
const loginResponse = await apiClient.login(email, password);
```

## 🔒 Security Best Practices

### Backend Security
- ✅ Password hashing with bcrypt
- ✅ JWT token expiration
- ✅ Input validation and sanitization
- ✅ Rate limiting
- ✅ Secure error messages
- ✅ CORS configuration
- ✅ Helmet security headers

### Frontend Security
- ✅ Token storage in localStorage
- ✅ Automatic token refresh
- ✅ Protected route components
- ✅ Input validation
- ✅ Secure API communication
- ✅ Error boundary handling

## 🧪 Testing Authentication

### Backend Testing
```bash
# Test registration
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@example.com","password":"TestPass123"}'

# Test login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"TestPass123"}'

# Test protected route
curl -X GET http://localhost:5000/api/auth/profile \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

### Frontend Testing
1. **Registration Flow**
   - Click "Sign Up" button
   - Fill registration form
   - Verify successful registration and auto-login

2. **Login Flow**
   - Click "Sign In" button
   - Enter credentials
   - Verify successful login and token storage

3. **Protected Routes**
   - Try accessing `/dashboard` without authentication
   - Verify redirect to login
   - Login and verify access granted

## 🚀 Deployment Considerations

### Backend Deployment
- Set strong JWT secrets
- Configure proper CORS origins
- Use HTTPS in production
- Set up proper database backups
- Configure rate limiting for production

### Frontend Deployment
- Set production API URLs
- Configure proper environment variables
- Enable HTTPS
- Set up proper error monitoring
- Configure CDN for static assets

## 📈 Future Enhancements

### Planned Features
- [ ] Two-factor authentication (2FA)
- [ ] Social login (Google, Facebook)
- [ ] Password reset functionality
- [ ] Email verification
- [ ] Account lockout after failed attempts
- [ ] Session management
- [ ] Audit logging
- [ ] Multi-tenant support

### Advanced Features
- [ ] OAuth 2.0 integration
- [ ] Single Sign-On (SSO)
- [ ] Role hierarchy management
- [ ] Permission-based access control
- [ ] API key management
- [ ] Webhook authentication

## 🐛 Troubleshooting

### Common Issues

1. **Token Expired**
   - Solution: Implement token refresh mechanism
   - Check JWT_EXPIRE configuration

2. **CORS Errors**
   - Solution: Configure CORS origins properly
   - Check FRONTEND_URL in backend .env

3. **Password Validation Fails**
   - Solution: Check password requirements
   - Ensure client-side validation matches backend

4. **Database Connection Issues**
   - Solution: Verify Supabase credentials
   - Check network connectivity

## 📚 Additional Resources

- [JWT.io](https://jwt.io/) - JWT token debugging
- [bcrypt.js](https://github.com/dcodeIO/bcrypt.js) - Password hashing
- [Next.js Authentication](https://nextjs.org/docs/authentication) - Next.js auth patterns
- [React Context](https://react.dev/reference/react/useContext) - React context documentation

---

## 🎉 Conclusion

This authentication system provides a robust, secure, and scalable foundation for the Jharkhand Tourism Platform. It follows industry best practices and provides a seamless user experience while maintaining high security standards.

The system is designed to be easily extensible and can accommodate future requirements such as social login, 2FA, and advanced role management.
