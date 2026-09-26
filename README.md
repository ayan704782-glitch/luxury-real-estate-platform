# RealEstate

A full-stack real estate listing application with React frontend and Express backend.

## Project Structure

- `backend/` - Express API server with authentication, property listing, image upload, and admin approval flow.
- `frontend/` - React app for user registration, login, adding properties, and viewing listings.

## Features

- User registration and login with JWT authentication
- Add property listings with detailed fields and ID proof upload
- Admin approval workflow for property listings
- Protected routes for authenticated users and admin-only actions
- Responsive, polished UI for listing submissions

## Setup

### 1. Install dependencies

Open two terminals or run sequentially:

```bash
cd backend
npm install

cd ../frontend
npm install
```

### 2. Configure backend

Create a `.env` file inside `backend/` with your MongoDB and JWT values:

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
PORT=5000
```

### 3. Run the backend

```bash
cd backend
npm run dev
```

### 4. Run the frontend

```bash
cd frontend
npm start
```

The frontend uses `proxy` to forward API requests to `http://localhost:5000`.

## Usage

- Open `http://localhost:3000`
- Register or login
- Add a property listing and upload ID proof
- Admin users can approve pending property listings

## Notes

- Admin accounts must be created manually in the database or seeded with role `admin`.
- Uploaded images are saved in the backend `uploads/` folder.

## Scripts

### Backend

- `npm run start` - start the server
- `npm run dev` - start the server with `nodemon`

### Frontend

- `npm start` - run the React development server
- `npm run build` - build the React app for production
