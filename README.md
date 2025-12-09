# Mini Employee Management Portal

A full-stack employee management application built with Node.js, Express, Prisma (SQLite), React, and Tailwind CSS.

## Features
- **Authentication**: Admin login with generic seeded credentials.
- **Dashboard**: Overview of employee statistics.
- **Employee Management**:
  - List employees with pagination.
  - Search/Filter employees.
  - Add new employees.
  - Edit existing employee details.
  - Delete employees.
- **Premium UI**: 
  - Modern Dark Mode aesthetic.
  - Glassmorphism effects (Login, Modal).
  - Animated transitions and interactions.
  - Tailwind CSS v4 styling.

## Tech Stack
- **Backend**: Node.js, Express, Prisma, SQLite
- **Frontend**: React (Vite), Tailwind CSS v4, Headless UI, Framer Motion, TanStack Query
- **Language**: JavaScript (Backend) / TypeScript (Frontend)

## Setup Instructions

### Prerequisites
- Node.js (v18+ recommended)
- Git

### Installation

1. **Clone the repository** (if applicable) or navigate to project root.

2. **Setup Backend**
   ```bash
   cd server
   npm install
   # Initialize DB and Seed
   npx prisma migrate dev --name init
   npm run seed
   # Start Server
   npm run dev
   ```
   Server runs on `http://localhost:5000`.

   **Default Admin Credentials:**
   - Username: `admin`
   - Password: `admin123`

3. **Setup Frontend**
   ```bash
   cd client
   npm install
   # Start Client
   npm run dev
   ```
   Client runs on `http://localhost:5173`.

## Usage
1. Open the frontend URL.
2. Login with `admin` / `admin123`.
3. Manage employees via the Dashboard or Employees tab.

## API Documentation
The full interactive API documentation consists of schemas and examples.
- **Swagger UI**: `http://localhost:5000/api-docs`

- **Postman Collection**: A `postman_collection.json` file is included in the root directory. Import it into Postman to test APIs.
  - *Tip*: Run the "Login" request first. It automatically saves the token for subsequent requests.

### Key Endpoints
- `POST /api/auth/login`: Login
- `GET /api/employees`: List employees (query: page, limit, search)
- `POST /api/employees`: Create employee
- `PUT /api/employees/:id`: Update employee
- `DELETE /api/employees/:id`: Delete employee
- `GET /api/dashboard`: Get dashboard stats
