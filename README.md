# PlotTwist - Pakistan's Property Marketplace

A modern, full-stack real estate platform built with React and Node.js. Browse verified listings across Pakistan, filter by city and budget, and connect directly with property owners.

---

## 📋 Table of Contents

- [Project Overview](#project-overview)
- [Tech Stack](#tech-stack)
- [Features](#features)
- [Project Structure](#project-structure)
- [API Routes](#api-routes)
- [Frontend Routes](#frontend-routes)
- [Installation & Setup](#installation--setup)
- [Running the Application](#running-the-application)
- [Authentication](#authentication)
- [Database Models](#database-models)

---

## 🎯 Project Overview

PlotTwist is a peer-to-peer real estate marketplace designed specifically for Pakistan. It eliminates intermediaries by connecting property owners directly with buyers/renters. Users can:

- **Browse** properties with advanced filtering (city, price, type)
- **List** properties in minutes without approval delays
- **Manage** their listings from a personal profile
- **Contact** property owners directly
- **Verify** all listings through user accounts

---

## 🛠️ Tech Stack

### Backend

- **Node.js** - JavaScript runtime
- **Express** - Web framework for APIs
- **MongoDB** - NoSQL database
- **Mongoose** - ODM for MongoDB
- **JWT (jsonwebtoken)** - Authentication tokens
- **Bcrypt** - Password hashing
- **Cookie-Parser** - Cookie middleware
- **CORS** - Cross-origin resource sharing
- **Dotenv** - Environment configuration
- **Express-Async-Handler** - Async error handling

### Frontend

- **React** - UI library
- **React Router** - Client-side routing
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **Axios** - HTTP client
- **Lucide React** - Icon library
- **PostCSS** - CSS transformation
- **ESLint** - Code linting

---

## ✨ Features

### User Features

- ✅ User registration and login with email/password
- ✅ HTTP-only JWT cookie-based authentication
- ✅ Browse all properties with real-time filters
- ✅ Filter by city, property type (rent/sale), and price range
- ✅ View detailed property information
- ✅ Contact property owner via email
- ✅ Create and manage property listings
- ✅ Delete own listings
- ✅ View personal profile with all listings
- ✅ Responsive design (mobile, tablet, desktop)

### Admin Features

- User role system (user/admin)
- Database validation and error handling
- Unique email enforcement

---

## 📁 Project Structure

```
Real Estate Project/
├── Backend/
│   ├── config/
│   │   └── db.js                 # MongoDB connection
│   ├── Controller/
│   │   ├── authController.js     # Auth logic
│   │   └── PropertyController.js # Property logic
│   ├── Middleware/
│   │   ├── Protect.js            # Auth middleware
│   │   └── ErrorHandler.js       # Error handling
│   ├── Model/
│   │   ├── User.js               # User schema
│   │   └── Property.js           # Property schema
│   ├── Routes/
│   │   ├── auth.js               # Auth routes
│   │   └── properties.js         # Property routes
│   ├── server.js                 # Express app setup
│   └── package.json              # Dependencies
│
├── Frontend/
│   ├── public/
│   │   └── images/               # Local images
│   ├── src/
│   │   ├── api/
│   │   │   └── axiosInstance.js  # HTTP client config
│   │   ├── components/
│   │   │   ├── Navbar.jsx        # Navigation
│   │   │   ├── PropertyCard.jsx  # Property card
│   │   │   ├── FilterBar.jsx     # Search filters
│   │   │   ├── PrivateRoute.jsx  # Protected routes
│   │   │   ├── Footer.jsx        # Footer
│   │   │   └── Spinner.jsx       # Loading spinner
│   │   ├── context/
│   │   │   └── AuthContext.jsx   # Auth state
│   │   ├── hooks/
│   │   │   └── useAuth.js        # Auth hook
│   │   ├── pages/
│   │   │   ├── Home.jsx          # Landing page
│   │   │   ├── Browse.jsx        # Browse properties
│   │   │   ├── PropertyDetail.jsx# Property details
│   │   │   ├── Login.jsx         # Login page
│   │   │   ├── Register.jsx      # Register page
│   │   │   ├── AddProperty.jsx   # Create listing
│   │   │   ├── Profile.jsx       # User profile
│   │   │   └── NotFound.jsx      # 404 page
│   │   ├── App.jsx               # Main app component
│   │   └── main.jsx              # React entry point
│   └── package.json              # Dependencies
│
└── README.md
```

---

## 🔌 API Routes

### Authentication Routes (`/api/auth`)

| Method | Endpoint | Auth Required | Description |
|--------|----------|:-------------:|-------------|
| POST | `/register` | No | Register new user |
| POST | `/login` | No | Login user |
| POST | `/logout` | No | Logout user |
| GET | `/me` | ✅ Yes | Get current user |



### Property Routes (`/api/properties`)

| Method | Endpoint | Auth Required | Description |
|--------|----------|:-------------:|-------------|
| GET | `/` | No | Get all properties (with filters) |
| GET | `/:id` | No | Get single property |
| GET | `/user/my-listings` | ✅ Yes | Get current user's listings |
| POST | `/` | ✅ Yes | Create new property |
| DELETE | `/:id` | ✅ Yes | Delete property (owner only) |



## 🎨 Frontend Routes

| Path | Component | Auth Required | Description |
|------|-----------|:-------------:|-------------|
| `/` | Login | No | Default landing page |
| `/login` | Login | No | User login |
| `/register` | Register | No | User registration |
| `/home` | Home | No | Main landing page |
| `/browse` | Browse | No | Search/browse properties |
| `/property/:id` | PropertyDetail | No | View property details |
| `/add-property` | AddProperty | ✅ Yes | Create new listing |
| `/profile` | Profile | ✅ Yes | User profile & listings |
| `*` | NotFound | No | 404 page |

---


## 🚀 Installation & Setup

### Prerequisites

- Node.js and npm/pnpm
- MongoDB (local or cloud URI)
- Git

### Backend Setup

1. **Navigate to Backend folder:**
   ```bash
   cd Backend
   ```

2. **Install dependencies:**
   ```bash
   pnpm install
   ```

3. **Create `.env` file:**
   ```
   MONGO_URI=mongodb://localhost:27017/plottwist
   JWT_SECRET=your_jwt_secret_key_here
   NODE_ENV=development
   PORT=5000
   CLIENT_URL=http://localhost:5173
   ```

4. **Start the server:**
   ```bash
   pnpm start
   or
   npm start
   ```

### Frontend Setup

1. **Navigate to Frontend folder:**
   ```bash
   cd Frontend
   ```

2. **Install dependencies:**
   ```bash
   pnpm install
   ```

3. **Start the development server:**
   ```bash
   pnpm dev
   or
   npm run dev
   ```

---

## 🎬 Running the Application

### Development Mode

**Terminal 1 - Backend:**
```bash
cd Backend
pnpm dev
```

**Terminal 2 - Frontend:**
```bash
cd Frontend
pnpm dev
```

The frontend will be available at `http://localhost:5173`
The backend API runs on `http://localhost:5000`

### Production Build

**Backend:**
```bash
cd Backend
pnpm start
```

**Frontend:**
```bash
cd Frontend
pnpm run build
pnpm run preview
```

---

## 🔐 Authentication

- **Method**: JWT-based cookie authentication
- **Flow**:
  1. User registers/logs in with email and password
  2. Backend generates JWT token
  3. Token stored as HTTP-only cookie (secure, httpOnly, sameSite='strict')
  4. Token automatically sent with every request via credentials
  5. Protected routes verify token validity

- **Protected Routes**:
  - `POST /api/properties` - Create listings
  - `DELETE /api/properties/:id` - Delete listings
  - `GET /api/properties/user/my-listings` - View own listings
  - `/add-property` - Add property page
  - `/profile` - User profile page

---

## 🛡️ Security Features

- ✅ Password hashing with bcrypt
- ✅ HTTP-only JWT cookies (prevents XSS)
- ✅ CORS protection
- ✅ Protected routes with authentication middleware
- ✅ Ownership verification for property deletion
- ✅ Environment variable configuration
- ✅ Email uniqueness validation
- ✅ Custom error handling

---



## 📝 Environment Variables

### Backend (.env)

```
MONGO_URI=mongodb+srv://user:pass@cluster.mongodb.net/dbname
JWT_SECRET=your_secret_key
NODE_ENV=development|production
PORT=5000
CLIENT_URL=http://localhost:5173
