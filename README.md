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
- **Modern UI**: Clean interface using Tailwind CSS and Headless UI.

## Tech Stack
- **Backend**: Node.js, Express, Prisma, SQLite
- **Frontend**: React (Vite), Tailwind CSS, Headless UI, TanStack Query, React Hook Form
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
- `POST /api/auth/login`: Login
- `GET /api/employees`: List employees (query: page, limit, search)
- `POST /api/employees`: Create employee
- `PUT /api/employees/:id`: Update employee
- `DELETE /api/employees/:id`: Delete employee
- `GET /api/dashboard`: Get dashboard stats
