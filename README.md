# Website Builder Project Documentation

## 1. Project Overview

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

Supplementary documentation:

- `PACKAGE_AND_PAGE_DOCUMENTATION.md` contains package-by-package documentation and page-by-page documentation

## 2. Main Objective

The purpose of the project is to give non-technical users a simple builder-style dashboard where they can launch a basic storefront without writing code.

The product currently has the strongest implementation for the `online-store` website type. Other website types such as `portfolio`, `blog`, `restaurant`, `booking`, and `business` are present in the UI, but several of their tabs are still scaffolded or placeholder-only.

## 3. Core Features

### Authentication

- User registration with email and password
- User login with email and password
- Google sign-in using Google OAuth
- JWT-based protected routes on the backend
- Token stored in browser `localStorage`

### User Dashboard

- Displays logged-in user information
- Shows all websites owned by the user
- Supports navigation to create and manage websites
- Includes a billing tab in the UI

### Website Creation

- User selects website type
- User enters store/site details
- Backend creates a website document and a matching config document
- A unique subdomain is automatically generated from the website name

### Website Builder

- Home tab with live/draft status and public URL
- Design tab for header, banner, theme, footer, and social settings
- Sections tab for editable text-based store sections
- Products tab for categories, subcategories, products, and sorting
- Orders tab for order list, status updates, and checkout/order-builder settings
- Analytics tab for store performance metrics
- Settings tab for store name, subdomain, publish toggle, and delete action

### Public Storefront

- Public site available at `/live/:subdomain`
- Product browsing by category/subcategory
- Cart drawer
- Checkout flow
- Order placement and order success screen
- Policy pages and footer-driven navigation

### Order Management

- Public customer order submission
- Admin order listing
- Bulk order status updates
- Order statuses: `pending`, `confirmed`, `shipped`, `delivered`, `cancelled`

### Analytics

- Total revenue
- Total orders
- Average order value
- Pending orders
- Orders today, this week, and this month
- Revenue today, this week, and this month
- Status distribution
- Payment method distribution
- Top products by revenue
- 7-day and 30-day trends

### Media Uploads

- Image upload endpoint using `multer`
- Files stored in `server/uploads`
- Uploaded files served statically from `/uploads/...`

## 4. Technology Stack

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

## 5. High-Level Architecture

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

### Database Design

The backend separates website metadata from flexible builder configuration:

- `Website` stores main website identity and publishing data
- `Config` stores dynamic JSON config for design/sections/order-builder settings
- `Category`, `Product`, and `Order` support store operations

This separation makes it easier to evolve the builder config without changing the main website schema each time.

## 6. Project Structure

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

## 7. Frontend Module Documentation

### 7.1 App Routing

Defined in `client/src/App.jsx`:

- `/` -> Login
- `/register` -> Register
- `/dashboard` -> User dashboard
- `/create` -> Website type selection
- `/create/store-details` -> Website detail form
- `/dashboard/site/:id` -> Website builder dashboard
- `/live/:subdomain` -> Public live website

### 7.2 Authentication Flow

- Login and Register pages use Axios through `client/src/services/api.js`
- Successful login stores the JWT token in `localStorage`
- Google login posts the Google credential token to `/api/auth/google`
- Protected frontend screens check for the token and redirect if missing

### 7.3 API Service

`client/src/services/api.js` creates a shared Axios instance with:

- base URL: `http://localhost:5000/api`
- request interceptor that adds `Authorization: Bearer <token>` if a token exists

### 7.4 Dashboard

The user dashboard:

- loads user data from `/api/dashboard`
- shows current plan and total websites
- lists all owned websites
- lets the user navigate to create a new website or manage an existing one

### 7.5 Website Builder Tabs

#### Home

- shows store ID
- shows live URL
- copies URL to clipboard
- toggles publish/draft state
- shows analytics summary cards

#### Design

Used to manage visual identity:

- header message, colors, logo
- banner store name, tagline, background image/color, text color
- theme primary color
- social links
- footer text and color

#### Sections

Manages informational content blocks:

- About Us
- Privacy Policy
- Shipping Policy
- Refund Policy
- Terms of Service
- Contact Us
- Location

#### Products

Handles catalog management:

- add category
- edit category
- delete category
- add subcategory
- add product
- edit product
- delete product
- reorder categories
- reorder products

#### Orders

Contains both operational and configuration features:

- fetches all orders for the website
- filters and searches orders
- bulk updates order status
- edits order-builder settings such as shipping, payment, and checkout labels

#### Analytics

Shows business insights from the order database.

#### Settings

Allows:

- updating store name
- updating subdomain
- toggling published state
- deleting the website

### 7.6 Public Site Preview and Live Site

The same preview-oriented storefront components are used for builder preview and live rendering.

Key preview modules include:

- navbar
- hero/banner
- products
- product details
- cart drawer
- checkout page
- order placed page
- policy page
- footer

When used inside `/live/:subdomain`, order placement can persist to the backend.

## 8. Backend Module Documentation

### 8.1 Server Entry Point

`server/index.js` performs the following:

- loads environment variables
- connects to MongoDB
- enables CORS
- enables JSON and URL-encoded parsing with large payload limits
- ensures the `uploads/` directory exists
- serves uploaded images statically
- mounts API routes
- starts the server on port `5000`

### 8.2 Database Connection

`server/config/db.js` connects to MongoDB using:

- `process.env.MONGO_URI`

If the connection fails, the server logs the error and exits.

### 8.3 Middleware

#### `authMiddleware.js`

- reads JWT from `Authorization` header
- verifies token with `JWT_SECRET`
- sets `req.userId`
- blocks unauthenticated access

#### `upload.js`

- uses `multer.diskStorage`
- saves uploads inside `uploads/`
- generates unique file names using timestamp + random number

## 9. API Documentation

Base URL:

```text
http://localhost:5000/api
```

### 9.1 Authentication Routes

| Method | Endpoint | Access | Purpose |
|---|---|---|---|
| `POST` | `/auth/register` | Public | Register a local user |
| `POST` | `/auth/login` | Public | Login with email/password |
| `POST` | `/auth/google` | Public | Login/register with Google OAuth |

### 9.2 Dashboard Route

| Method | Endpoint | Access | Purpose |
|---|---|---|---|
| `GET` | `/dashboard` | Private | Return user summary and owned websites |

### 9.3 Website Routes

| Method | Endpoint | Access | Purpose |
|---|---|---|---|
| `POST` | `/websites` | Private | Create a website |
| `GET` | `/websites` | Private | List websites owned by current user |
| `GET` | `/websites/:id` | Private | Get one website and merged config |
| `PATCH` | `/websites/:id/config` | Private | Save website builder config |
| `PATCH` | `/websites/:id/settings` | Private | Update store name/subdomain |
| `PUT` | `/websites/publish/:id` | Private | Toggle publish state |
| `DELETE` | `/websites/:id` | Private | Delete website and related data |
| `GET` | `/websites/:id/analytics` | Private | Get analytics for website |
| `GET` | `/websites/subdomain/:sub` | Public | Get published website by subdomain |
| `POST` | `/websites/subdomain/:sub/orders` | Public | Place a public order |

### 9.4 Category Routes

Mounted under `/websites/:id/categories`

| Method | Endpoint | Access | Purpose |
|---|---|---|---|
| `GET` | `/` | Private | List categories |
| `POST` | `/` | Private | Create category |
| `PATCH` | `/reorder` | Private | Reorder categories |
| `PUT` | `/:catId` | Private | Update category |
| `DELETE` | `/:catId` | Private | Delete category |

### 9.5 Product Routes

Mounted under `/websites/:id/products`

| Method | Endpoint | Access | Purpose |
|---|---|---|---|
| `GET` | `/` | Private | List products |
| `POST` | `/` | Private | Create product |
| `PATCH` | `/reorder` | Private | Reorder products |
| `PUT` | `/:prodId` | Private | Update product |
| `DELETE` | `/:prodId` | Private | Delete product |

### 9.6 Order Routes

Mounted under `/websites/:id/orders`

| Method | Endpoint | Access | Purpose |
|---|---|---|---|
| `GET` | `/` | Private | List website orders |
| `PATCH` | `/status` | Private | Bulk update order status |

### 9.7 Upload Route

| Method | Endpoint | Access | Purpose |
|---|---|---|---|
| `POST` | `/upload` | Public | Upload image and return public URL |

## 10. Data Model Documentation

### 10.1 User

Fields:

- `email`
- `password`
- `provider` (`local` or `google`)
- `googleId`
- `plan`
- timestamps

### 10.2 Website

Fields:

- `name`
- `type`
- `industry`
- `owner`
- `subdomain`
- `published`
- timestamps

Supported `type` values:

- `online-store`
- `portfolio`
- `blog`
- `restaurant`
- `booking`
- `business`

### 10.3 Config

Fields:

- `websiteId`
- `data` (flexible object)
- timestamps

This model stores dynamic builder configuration such as:

- header settings
- banner settings
- theme settings
- social links
- footer settings
- informational sections
- order-builder settings
- active policy

### 10.4 Category

Fields:

- `websiteId`
- `name`
- `image`
- `subcategories`
- `order`
- timestamps

### 10.5 Product

Fields:

- `websiteId`
- `category`
- `subcategory`
- `name`
- `price`
- `offerPrice`
- `image`
- `status`
- `order`
- timestamps

Supported `status` values:

- `shown`
- `hidden`
- `coming_soon`
- `sold_out`

### 10.6 Order

Fields:

- `websiteId`
- `ownerId`
- `orderId`
- `customer`
- `shippingAddress`
- `items`
- `subtotal`
- `shipping`
- `total`
- `currency`
- `paymentMethod`
- `paymentStatus`
- `orderStatus`
- `source`
- timestamps

Supported `paymentMethod` values:

- `cod`
- `card`
- `upi`

Supported `paymentStatus` values:

- `pending`
- `paid`
- `failed`
- `refunded`

Supported `orderStatus` values:

- `pending`
- `confirmed`
- `shipped`
- `delivered`
- `cancelled`

## 11. Important Business Logic

### Unique Subdomain Generation

When a website is created:

- its name is converted into a slug
- the backend checks whether the slug already exists
- if needed, a numeric suffix is appended

### Config Loading

When a website is opened in the builder:

- the `Website` document is loaded
- the `Config` document is loaded
- related categories and products are fetched
- the final config is merged and returned to the frontend

### Banner Synchronization

If the builder updates the banner store name or tagline, the backend also updates the parent `Website` document so the main website metadata stays aligned with the design data.

### Order Creation

When a public order is placed:

1. The website is loaded by subdomain
2. Only published websites are accepted
3. Product IDs and quantities are validated
4. Only available products with `status: shown` are used
5. Totals are recalculated on the server
6. Shipping cost is derived from order-builder config
7. The order is saved with a generated order ID

## 12. Setup and Installation

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

## 13. Build and Deployment Notes

### Frontend

The frontend supports production build through:

```bash
npm run build
```

### Backend

The backend currently runs with:

- `npm start` for normal mode
- `npm run dev` for `nodemon`

### Uploads

Uploaded media is stored on the local server filesystem in `server/uploads`. For production deployment, cloud storage would be more reliable and scalable.

## 14. Migration Utility

The backend includes `server/migrate-configs.js`.

Purpose:

- migrate legacy embedded website config data into the standalone `Config` collection

This is helpful if older database records stored builder config directly in the website document.

## 15. Security Considerations

Current security-related behavior in the codebase:

- passwords are hashed with `bcryptjs`
- JWT is used for authenticated backend routes
- ownership checks are enforced before returning or mutating website resources

Current gaps that should be improved for production:

- upload endpoint is public
- CORS is currently open for all origins
- client API base URL is hardcoded to `http://localhost:5000/api`
- Google OAuth provider ID is hardcoded in the frontend source
- no rate limiting is present
- no request validation library is used

## 16. Current Limitations and Honest Project Status

This section is important for a project submission because it reflects the real current state of the code.

### Fully or mostly implemented

- authentication
- website creation
- online store builder
- category and product management
- live public store route
- order placement
- order management
- analytics dashboard
- settings management
- file uploads

### Partially implemented or scaffolded

- billing is present in the UI but not backed by full payment/subscription logic
- website types other than `online-store` have navigation options, but some tabs are placeholders
- quick action for `Generate With AI` points to `/ai-builder`, but that route is not defined in the main router
- no automated tests are present
- backend still contains some debugging `console.log` statements

## 17. Suggested Future Enhancements

- add automated tests for frontend and backend
- move hardcoded frontend constants to environment variables
- secure the upload route
- add role-based authorization if multi-user team support is needed
- support custom domains instead of route-based subdomains only
- add payment gateway integration
- add inventory tracking
- add pagination for products and orders
- add form validation on all backend endpoints
- improve deployment readiness with Docker and CI/CD

## 18. Conclusion

This project is a practical full-stack website builder with a strong emphasis on online store creation. It demonstrates:

- full-stack architecture
- protected REST API development
- MongoDB schema design
- React-based dashboard and builder UX
- public storefront rendering
- real order and analytics workflows

For submission purposes, the project can be presented as a working e-commerce website builder prototype with admin management, public storefront delivery, and basic commerce operations already implemented.
