# Website Builder Project Documentation

##  Project Overview

This project is a full-stack website builder focused mainly on creating and managing small online stores. It allows a user to:

- register or log in with email/password or Google OAuth
- create one or more websites
- configure branding and design
- manage categories and products
- edit static business sections like About, Privacy, Shipping, Refund, Terms, Contact, and Location
- preview the website before publishing
- publish the website to a public URL using a subdomain-style route
- accept orders from the public site
- manage order status from the admin dashboard
- view analytics such as revenue, orders, payment breakdown, and top products

The application is split into two major parts:

- `client/`: React + Vite frontend
- `server/`: Express + MongoDB backend


##  Main Objective

The purpose of the project is to give non-technical users a simple builder-style dashboard where they can launch a basic storefront without writing code.


##  Technology Stack

### Frontend

- React 18
- Vite
- React Router
- Axios
- Styled Components
- Lucide React
- React Icons
- `@react-oauth/google`
- `react-fast-marquee`

### Backend

- Node.js
- Express 5
- MongoDB
- Mongoose
- JWT (`jsonwebtoken`)
- `bcryptjs`
- `dotenv`
- `cors`
- `multer`
- `google-auth-library`


### Frontend Architecture

The frontend is organized around pages and reusable builder components:

- authentication pages
- dashboard pages
- site builder modules
- preview components
- reusable UI components

The site builder uses a state-driven editing model:

1. Fetch website + config from backend
2. Store active builder state in React hooks
3. Update preview immediately in the UI
4. Persist changes using API calls

### Backend Architecture

The backend follows a layered Express structure:

- `routes/` handles endpoint definitions
- `controllers/` contain request/response logic
- `services/` contain reusable business logic
- `models/` define MongoDB schemas
- `middleware/` handles authentication and uploads


## Project Structure

```text
builder/
|-- client/
|   |-- src/
|   |   |-- components/
|   |   |   |-- auth/
|   |   |   |-- dashboard/
|   |   |   |-- layouts/
|   |   |   |-- siteBuilder/
|   |   |   |   |-- analytics/
|   |   |   |   |-- editors/
|   |   |   |   |-- orders/
|   |   |   |   |-- preview/
|   |   |   |   |-- products/
|   |   |   |   |-- sections/
|   |   |   |   |-- settings/
|   |   |   |   |-- SiteDesign/
|   |   |   |   `-- SiteHome/
|   |   |   `-- ui/
|   |   |-- pages/
|   |   |-- services/
|   |   |-- styles/
|   |   `-- utils/
|   |-- package.json
|   `-- index.html
|-- server/
|   |-- config/
|   |-- controllers/
|   |-- middleware/
|   |-- models/
|   |-- routes/
|   |-- services/
|   |-- uploads/
|   |-- index.js
|   |-- migrate-configs.js
|   `-- package.json
`-- README.md
```
### Database Connection

`server/config/db.js` connects to MongoDB using:

- `process.env.MONGO_URI`

If the connection fails, the server logs the error and exits.
##  Setup and Installation

### Prerequisites

- Node.js
- npm
- MongoDB database or MongoDB Atlas connection string
- Google OAuth client credentials

### Backend Setup

```bash
cd server
npm install
```

Create a `.env` file inside `server/` with:

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
GOOGLE_CLIENT_ID=your_google_client_id
```

Run the backend:

```bash
npm run dev
```

The backend starts on:

```text
http://localhost:5000
```

### Frontend Setup

```bash
cd client
npm install
```

Run the frontend:

```bash
npm run dev
```

The frontend usually starts on:

```text
http://localhost:5173
```

## Build and Deployment Notes

### Frontend

The frontend supports production build through:

```bash
npm run build
```

### Backend

The backend currently runs with:

- `npm start` for normal mode
- `npm run dev` for `nodemon`








