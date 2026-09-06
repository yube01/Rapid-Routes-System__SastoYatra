# Rapid Routes System — Sasto Yatra (सस्तो यात्रा) 🚍

> **Smart Public Transit Routing, Transparent Fare Engine & Destination Navigator for Kathmandu Valley**

[![React](https://img.shields.io/badge/React-19.0-61DAFB?style=flat-square&logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-6.2-646CFF?style=flat-square&logo=vite&logoColor=white)](https://vitejs.dev/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-v4.0-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Express](https://img.shields.io/badge/Express-4.21-000000?style=flat-square&logo=express&logoColor=white)](https://expressjs.com/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-8.13-4169E1?style=flat-square&logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![Drizzle ORM](https://img.shields.io/badge/Drizzle_ORM-0.36-C5F74F?style=flat-square&logo=drizzle&logoColor=black)](https://orm.drizzle.team/)
[![License](https://img.shields.io/badge/License-ISC-green?style=flat-square)](LICENSE)

---

## 🌟 Overview

**Rapid Routes (Sasto Yatra)** is an open-source public transit navigation and fare transparency platform built specifically for the Kathmandu Valley (Kathmandu, Lalitpur, and Bhaktapur). 

Public bus commuting across Kathmandu is notorious for missing route maps, confusing transfer points between Ring Road and inner-city feeder lines, and frequent commuter overcharging by bus conductors. **Rapid Routes** solves these challenges by combining mathematical graph pathfinding (**Dijkstra's Algorithm**) with government-standard distance-tiered bus fare calculations and real-time destination popularity tracking.

---

## ✨ Key Features

- **⚡ Dijkstra's Shortest Pathfinding**:
  - Traverses a bidirectional graph network of over 50+ verified Kathmandu transit nodes.
  - Computes optimal physical distance (km) and estimated travel duration (minutes) in sub-milliseconds.
- **💰 Government Distance-Tiered Fare Engine**:
  - Automatically calculates official Kathmandu valley bus fares (Rs. 20 base fare, graduated steps up to 20 km, and per-km formulas beyond) so commuters never overpay.
- **🔄 Smart Bus Line Transfer Detection**:
  - Identifies intermediate interchange nodes (e.g., Chabahil, Ratna Park, Koteshwar, Gongabu) where passengers must switch buses between Route 1, Route 2, and Route 3.
- **📈 Exponential Decay Destination Popularity**:
  - Highlights top cultural, educational, and leisure destinations across the valley using an algorithmic time-decay formula ($S = \text{searchCount} \times e^{-\lambda \Delta t}$) to favor recent commuter interest over stale historical spikes.
- **🎨 Modern Dark Glassmorphism Landing Page**:
  - Features an embedded **Interactive Live Route & Fare Estimator** in the hero section, Kathmandu landmark spotlights, government fare matrix breakdown, and responsive FAQ accordion.
- **📂 Personal Commuter History**:
  - Authenticated commuters can save frequent journeys (home, college, workplace) for one-click access.
- **🛡️ Admin Management Dashboard**:
  - Admin interface for managing destinations, categories, imagery, and monitoring search analytics.

---

## 🏗️ System Architecture

```mermaid
graph TD
    User([Commuter / Visitor]) -->|Browses Landing Page / Route Finder| Client[Vite + React 19 Frontend]
    Client -->|Dijkstra Graph Engine| Graph[(Routes Dataset 50+ Stops)]
    Client -->|API Requests: Auth / History / Locations| Server[Express + TypeScript Server]
    Server -->|ORM Queries| Drizzle[Drizzle ORM]
    Drizzle -->|Persistent Storage| Postgres[(PostgreSQL Database: sasto_yatra)]
```

### Technology Stack

| Layer | Technologies |
| :--- | :--- |
| **Frontend (Client)** | React 19, TypeScript, Vite 6, TailwindCSS v4, Framer Motion, Radix UI Primitives, Lucide Icons, Sonner |
| **Backend (Server)** | Node.js, Express 4, TypeScript, ts-node, nodemon, bcrypt, jsonwebtoken, CORS |
| **Database & ORM** | PostgreSQL, Drizzle ORM, Drizzle Kit |
| **Algorithms** | Dijkstra's Graph Pathfinding, Exponential Decay Scoring, Distance-Tier Fare Formula |

---

## 📁 Repository Structure

```
Rapid-Routes-System__SastoYatra/
├── client/                     # Frontend Single Page Application
│   ├── public/                 # Kathmandu landmark images (Boudha, Swayambhu, etc.)
│   ├── src/
│   │   ├── algorithm/          # Exponential decay popularity ranking algorithm
│   │   ├── components/         # UI Primitives (Button, Dialog, Card, Sheet, etc.)
│   │   ├── constants/          # All stops array and route mapping constants
│   │   ├── page/
│   │   │   ├── auth/           # Login & Register views
│   │   │   ├── components/     # Fixed Navbar & Rich Footer components
│   │   │   └── home/
│   │   │       ├── admin.tsx   # Admin destination management panel
│   │   │       ├── history.tsx # User saved route history
│   │   │       ├── home.tsx    # Core BusRouteFinder application
│   │   │       ├── landing.tsx # High-converting responsive landing page
│   │   │       └── popular.tsx # Trending destinations showcase
│   │   ├── algorithm.ts        # Dijkstra's bidirectional shortest path algorithm
│   │   ├── routes-dataset.ts   # Kathmandu Valley bus lines & segment distances/times
│   │   ├── App.tsx             # React Router v7 route declarations
│   │   └── main.tsx            # React application bootstrap
│   └── package.json
│
├── server/                     # Backend REST API Server
│   ├── migration/              # SQL migrations generated by Drizzle Kit
│   ├── src/
│   │   ├── controller/         # Destination, Auth, and History business logic
│   │   ├── routes/             # Express API route declarations
│   │   ├── schema/             # Drizzle PostgreSQL schema definitions
│   │   ├── db.ts               # Database connection pool
│   │   └── index.ts            # Server entry point
│   ├── drizzle.config.ts       # Drizzle configuration
│   └── package.json
│
└── README.md                   # Repository documentation
```

---

## 📐 Algorithmic Details

### 1. Dijkstra's Shortest Path Algorithm
Located at [`client/src/algorithm.ts`](file:///c:/Users/Yubraj/Desktop/code/Rapid-Routes-System__SastoYatra/client/src/algorithm.ts):
- Converts the Kathmandu transit graph into a bidirectional representation so all streets and routes can be navigated in both directions.
- Initializes a priority queue containing all stops with infinity distances except the origin stop ($d = 0$).
- Recursively relaxes neighboring edges, minimizing cumulative travel distance (in kilometers) and travel time (in minutes).
- Backtracks through predecessor nodes (`prev`) to build the complete hop-by-hop transit sequence.

### 2. Official Valley Fare Formula
Located at [`client/src/page/home/home.tsx`](file:///c:/Users/Yubraj/Desktop/code/Rapid-Routes-System__SastoYatra/client/src/page/home/home.tsx) and [`client/src/page/home/landing.tsx`](file:///c:/Users/Yubraj/Desktop/code/Rapid-Routes-System__SastoYatra/client/src/page/home/landing.tsx):

| Segment Distance ($D$) | Standard Fare (NPR) | Description |
| :--- | :--- | :--- |
| **0.0 – 5.0 km** | **Rs. 20** | Base local short-hop fare |
| **5.1 – 10.0 km** | **Rs. 25** | Intermediate valley corridor |
| **10.1 – 15.0 km** | **Rs. 30** | Cross-town transit (e.g. Kalanki to Koteshwar) |
| **15.1 – 20.0 km** | **Rs. 35** | Half Ring Road traverse |
| **> 20.0 km** | **Rs. 33 + $\lceil D - 20 \rceil \times 2$** | Long-distance cross-valley route |

### 3. Exponential Decay Destination Ranking
Located at [`client/src/algorithm/exponentialDecayScore.ts`](file:///c:/Users/Yubraj/Desktop/code/Rapid-Routes-System__SastoYatra/client/src/algorithm/exponentialDecayScore.ts):
$$\text{Score} = \text{searchCount} \times e^{-\lambda \cdot \Delta t}$$
Where $\lambda$ represents the decay constant and $\Delta t$ is the elapsed time since the destination was last queried. This prevents older popular locations from indefinitely dominating current trending searches.

---

## 🚀 Getting Started

### Prerequisites
- **Node.js**: v18.0.0 or higher
- **npm**: v9.0.0 or higher
- **PostgreSQL**: v14.0 or higher running locally or in Docker

---

### Step 1: Database Setup

1. Open your PostgreSQL console (`psql`) or database GUI:
   ```sql
   CREATE DATABASE sasto_yatra;
   ```
2. Create a user and grant the necessary schema permissions:
   ```sql
   -- Create user (or use existing postgres user)
   CREATE USER yubraj WITH PASSWORD 'yube';
   GRANT ALL PRIVILEGES ON DATABASE sasto_yatra TO yubraj;

   \c sasto_yatra;
   GRANT ALL ON SCHEMA public TO yubraj;
   ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL PRIVILEGES ON TABLES TO yubraj;
   ```

---

### Step 2: Backend Configuration (`server/`)

1. Open a terminal and enter the server directory:
   ```bash
   cd server
   npm install
   ```
2. Create or check `server/.env`:
   ```env
   PORT=5005
   DB_URL="postgres://yubraj:yube@localhost:5432/sasto_yatra"
   API="http://localhost:5173"
   JWT_SECRET="your_secure_jwt_secret_here"
   ```
3. Run database migrations to set up the tables (`user_data`, `popular_destination_data`, `history`):
   ```bash
   npx drizzle-kit push
   ```
4. Start the backend development server:
   ```bash
   npm run dev
   ```
   *The server will start listening at `http://localhost:5005`.*

---

### Step 3: Frontend Configuration (`client/`)

1. Open a second terminal and enter the client directory:
   ```bash
   cd client
   npm install
   ```
2. Start the Vite development server:
   ```bash
   npm run dev
   ```
   *The client web application will run at `http://localhost:5173`.*

---

## 🌐 Application Routes

| Path | Component | Description |
| :--- | :--- | :--- |
| `/` | `LandingPage` | High-impact landing page with interactive route & fare simulator |
| `/routes` | `BusRouteFinder` | Main routing application with stop selection and turn-by-turn list |
| `/find-route` | `BusRouteFinder` | Convenience alias for `/routes` |
| `/popular` | `PopularDestinations` | Trending Kathmandu destinations filtered by category with direct routing |
| `/history` | `HistoryPage` | Commuter's saved trips and recent route history |
| `/login` | `Login` | User authentication |
| `/register` | `Register` | User account creation |
| `/admin` | `AdminPanel` | Destination CRUD and transit management dashboard |

---

## 🔌 API Endpoints Reference

### Authentication (`/auth`)
- `POST /auth/register`: Create a new commuter account (`fullName`, `email`, `password`).
- `POST /auth/login`: Authenticate commuter or admin credentials; returns session identifier.

### Destinations (`/location`)
- `GET /location/getLocation`: Fetch all registered destinations and their search frequencies.
- `POST /location/addLocation`: Add a new destination hub with category and image asset path (Admin).
- `PUT /location/updateLocation/:did`: Increment search count and update `lastTimeSearched` timestamp.
- `PUT /location/updateLocationInfo/:did`: Modify destination metadata (Admin).
- `DELETE /location/deleteLocation/:did`: Remove a destination from the registry (Admin).

### Commute History (`/history`)
- `POST /history/createHistory`: Save a route journey (`id`, `source`, `destination`).
- `GET /history/getHistory/:id`: Retrieve saved journeys for a specific user.

---

## 🛠️ Build & Verification

To verify the client bundle for production:
```bash
cd client
npm run build
```

To run linting:
```bash
cd client
npm run lint
```

---

## 👥 Authors & Acknowledgments

- **Developer**: Yubraj ([@yube01](https://github.com/yube01))
- **Inspiration**: Public transport riders across Kathmandu Valley seeking transparency, fairness, and accessible navigation.

---

## 📄 License

This project is licensed under the [ISC License](LICENSE).



popular bus name and their route and change the bus
