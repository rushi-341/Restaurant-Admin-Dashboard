# Restaurant Admin Dashboard

A full-stack restaurant admin dashboard that allows restaurant owners to manage menu items and orders.

## Tech Stack

**Frontend**
- React 18
- Vite
- Axios
- React Router

**Backend**
- Node.js
- Express.js
- MongoDB (Mongoose)

---

## Features

### Menu Management
- View all menu items
- Search menu items by name or ingredients (debounced search)
- Filter menu items
- Toggle item availability with optimistic UI updates
- Add, update, and delete menu items

### Orders Management
- View all orders with pagination
- Filter orders by status
- Update order status
- View order details

---

## Project Structure

# Restaurant Admin Dashboard

A full-stack restaurant admin dashboard that allows restaurant owners to manage menu items and orders.

## Tech Stack

**Frontend**
- React 18
- Vite
- Axios
- React Router

**Backend**
- Node.js
- Express.js
- MongoDB (Mongoose)

---

## Features

### Menu Management
- View all menu items
- Search menu items by name or ingredients (debounced search)
- Filter menu items
- Toggle item availability with optimistic UI updates
- Add, update, and delete menu items

### Orders Management
- View all orders with pagination
- Filter orders by status
- Update order status
- View order details

---

## Project Structure

Restaurant-Admin-Dashboard/
├── Backend/
│ ├── src/
│ │ ├── controllers/
│ │ ├── models/
│ │ ├── routes/
│ │ └── config/
│ ├── package.json
│ └── .gitignore
├── Frontend/
│ ├── src/
│ │ ├── components/
│ │ ├── pages/
│ │ ├── api/
│ │ ├── hooks/
│ │ └── styles/
│ ├── package.json
│ └── .gitignore
└── README.md

---

## Backend Setup


---

## Backend Setup

1. Navigate to backend directory:
```bash
cd Backend
2. Install dependencies:

bash
Copy code
npm install
Create a .env file:

env
Copy code
PORT=3000
MONGODB_URI=your_mongodb_connection_string
Start the backend server:

bash
Copy code
npm run dev
Backend runs at:

arduino
Copy code
http://localhost:3000
Frontend Setup
Navigate to frontend directory:

bash
Copy code
cd Frontend
Install dependencies:

bash
Copy code
npm install
Start the frontend:

bash
Copy code
npm run dev
Frontend runs at:

arduino
Copy code
http://localhost:5173
API Endpoints
Menu APIs
GET /api/menu

GET /api/menu/search?q=query

GET /api/menu/:id

POST /api/menu

PUT /api/menu/:id

DELETE /api/menu/:id

PATCH /api/menu/:id/availability

Order APIs
GET /api/orders

GET /api/orders/:id

POST /api/orders

PATCH /api/orders/:id/status

Notes
MongoDB text indexing is used for efficient search.

Debounced search reduces unnecessary API calls.

Optimistic UI updates improve user experience.

Environment variables are excluded from version control.
