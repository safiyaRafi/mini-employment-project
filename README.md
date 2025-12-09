# Mini Employee Management Portal

A simple and modern employee management system that helps you manage your workforce efficiently. Built with a clean interface and powerful features.

## What Does It Do?

This application lets you manage employees through an easy-to-use dashboard. You can view employee statistics, add new team members, update their information, search through records, and remove employees when needed. Everything is protected behind a secure login system.

## Key Features

- **Secure Login** - Admin authentication to protect your data
- **Dashboard Overview** - See your employee statistics at a glance
- **Employee Management** - Add, edit, delete, and search employees easily
- **Modern Design** - Beautiful dark mode interface with smooth animations
- **Fast & Responsive** - Quick loading times and works on all screen sizes

## Technology Used

**Backend:**
- Node.js & Express for the server
- Prisma ORM with SQLite database
- RESTful API architecture

**Frontend:**
- React with Vite for fast development
- Tailwind CSS for modern styling
- Smooth animations and transitions

## Getting Started

### What You'll Need

- Node.js (version 18 or higher)
- Git

### Installation Steps

**Step 1: Set Up the Backend**

Open your terminal and run:

```bash
cd server
npm install
npx prisma migrate dev --name init
npm run seed
npm run dev
```

The server will start at `http://localhost:5000`

**Step 2: Set Up the Frontend**

Open a new terminal window and run:

```bash
cd client
npm install
npm run dev
```

The application will open at `http://localhost:5173`

### Login Credentials

Use these credentials to log in:
- **Username:** admin
- **Password:** admin123

## How to Use

1. Open your browser and go to `http://localhost:5173`
2. Log in with the admin credentials above
3. You'll see the dashboard with employee statistics
4. Click on "Employees" to view, add, edit, or delete employee records
5. Use the search bar to find specific employees quickly

## API Documentation

Want to test the APIs directly? We've got you covered:

**Swagger Documentation:** Visit `http://localhost:5000/api-docs` for interactive API documentation

**Postman Collection:** Import the `postman_collection.json` file from the root directory into Postman
- Tip: Run the Login request first - it automatically saves your authentication token

### Main API Endpoints

- `POST /api/auth/login` - Login to get access token
- `GET /api/employees` - Get list of employees (supports pagination and search)
- `POST /api/employees` - Add a new employee
- `PUT /api/employees/:id` - Update employee details
- `DELETE /api/employees/:id` - Remove an employee
- `GET /api/dashboard` - Get dashboard statistics

## Questions or Issues?

If you run into any problems during setup or have questions about how to use the application, feel free to reach out or check the API documentation for more details.

---

Built with using modern web technologies
