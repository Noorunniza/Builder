# Package And Page Documentation

## 1. Purpose Of This Document

This document supplements the main `README.md` and focuses on two areas:

- package-by-package documentation
- page-by-page documentation

It is based on the current source code in `client/` and `server/`.

## 2. Package Documentation

## 2.1 Frontend Packages

### `react` - `^18.2.0`

Purpose:

- core frontend library used to build the user interface
- powers all components, state management, and rendering

Used for:

- all pages and components inside `client/src`

Why it is needed:

- this project is built as a component-based single-page application

### `react-dom` - `^18.2.0`

Purpose:

- mounts the React application into the browser DOM

Used in:

- `client/src/main.jsx`

Why it is needed:

- connects the React app to `index.html`

### `react-router-dom` - `^7.13.1`

Purpose:

- handles frontend routing and navigation

Used for:

- `BrowserRouter`
- `Routes` and `Route`
- `useNavigate`
- `useParams`
- `useLocation`
- `useSearchParams`

Used in:

- `client/src/App.jsx`
- auth pages
- dashboard pages
- builder pages
- public site page

Why it is needed:

- the project has multiple screens such as login, register, dashboard, site builder, and live store

### `styled-components` - `^6.3.11`

Purpose:

- CSS-in-JS styling solution used throughout the frontend

Used for:

- page styling
- component styling
- animations
- global styles

Used in:

- nearly every `*.styles.js` file
- `client/src/styles/GlobalStyles.js`

Why it is needed:

- gives modular, component-scoped styling and helps keep UI code organized

### `axios` - `^1.13.6`

Purpose:

- HTTP client used to call backend APIs

Used for:

- authentication requests
- dashboard fetches
- website CRUD
- category/product CRUD
- order/analytics/settings/config requests
- image upload requests

Used in:

- `client/src/services/api.js`
- builder state hooks and pages

Why it is needed:

- provides a clean way to talk to the Express backend and attach JWT tokens

### `@react-oauth/google` - `^0.13.4`

Purpose:

- provides Google login components and OAuth integration for the frontend

Used for:

- `GoogleOAuthProvider`
- `GoogleLogin`
- `googleLogout`

Used in:

- `client/src/main.jsx`
- `client/src/pages/Login/Login.jsx`
- `client/src/pages/Register/Register.jsx`
- logout components

Why it is needed:

- enables Google-based authentication in addition to local email/password login

### `lucide-react` - `^0.576.0`

Purpose:

- icon library used across the dashboard and builder UI

Used for:

- sidebars
- analytics cards
- builder controls
- billing page
- preview controls

Why it is needed:

- gives consistent modern icons across the application

### `react-icons` - `^5.6.0`

Purpose:

- additional icon library used where specific icons are needed

Used in:

- `client/src/components/ui/Input/Input.jsx`

Why it is needed:

- currently used for password show/hide icons

### `react-fast-marquee` - `^1.6.5`

Purpose:

- creates scrolling marquee text

Used in:

- `client/src/components/siteBuilder/preview/SitePreview/SitePreview.jsx`

Why it is needed:

- used to render the moving announcement bar in the website preview/live store header

### `vite` - `^7.3.1`

Type:

- frontend build and development tool

Used for:

- local development server
- production build
- previewing production build output

Defined in:

- `client/package.json`

Why it is needed:

- powers fast development and bundling for the React frontend

## 2.2 Backend Packages

### `express` - `^5.2.1`

Purpose:

- backend web framework

Used for:

- API routes
- middleware registration
- JSON parsing
- static file serving

Used in:

- `server/index.js`
- route files inside `server/routes`

Why it is needed:

- the backend is implemented as a REST API service

### `mongoose` - `^9.2.4`

Purpose:

- ODM for MongoDB

Used for:

- database connection
- schema definitions
- querying and updating collections

Used in:

- `server/config/db.js`
- all files in `server/models`
- controllers and services

Why it is needed:

- the application stores users, websites, configs, categories, products, and orders in MongoDB

### `dotenv` - `^17.3.1`

Purpose:

- loads environment variables from `.env`

Used in:

- `server/index.js`
- `server/migrate-configs.js`

Why it is needed:

- keeps secrets such as MongoDB connection strings and JWT secrets outside source code

### `cors` - `^2.8.6`

Purpose:

- enables cross-origin requests from the frontend to the backend

Used in:

- `server/index.js`

Why it is needed:

- the frontend and backend run on different local ports during development

### `bcryptjs` - `^3.0.3`

Purpose:

- password hashing library

Used in:

- `server/controllers/authController.js`

Why it is needed:

- securely hashes user passwords before storing them in the database

### `jsonwebtoken` - `^9.0.3`

Purpose:

- creates and verifies JWT access tokens

Used in:

- `server/controllers/authController.js`
- `server/middleware/authMiddleware.js`

Why it is needed:

- protects private backend routes and identifies the logged-in user

### `google-auth-library` - `^9.15.1`

Purpose:

- verifies Google ID tokens on the backend

Used in:

- `server/controllers/authController.js`

Why it is needed:

- ensures Google login tokens are valid before issuing the app’s JWT

### `multer` - `^2.1.1`

Purpose:

- handles multipart file uploads

Used in:

- `server/middleware/upload.js`
- `server/routes/uploadRoutes.js`

Why it is needed:

- allows users to upload images used in the builder

### `nodemon` - `^3.1.14`

Type:

- backend development dependency

Used for:

- auto-restarting the server during development when files change

Defined in:

- `server/package.json`

Why it is needed:

- improves local development speed

### `cloudinary` - `^1.41.3`

Purpose:

- cloud media storage and delivery SDK

Current project status:

- installed, but not actively used by the current upload implementation

Reason this matters:

- the current project stores uploads locally in `server/uploads`
- this package suggests the project may have planned or previous support for cloud-based media storage

### `multer-storage-cloudinary` - `^4.0.0`

Purpose:

- integrates `multer` with Cloudinary storage

Current project status:

- installed, but not actively used in the current code path

Reason this matters:

- the current upload middleware uses `multer.diskStorage`, not Cloudinary storage

## 2.3 Package Summary Table

| Package | Layer | Role In Project | Current Usage |
|---|---|---|---|
| `react` | Frontend | Core UI library | Active |
| `react-dom` | Frontend | Mounts React app | Active |
| `react-router-dom` | Frontend | Routing/navigation | Active |
| `styled-components` | Frontend | Styling system | Active |
| `axios` | Frontend | API requests | Active |
| `@react-oauth/google` | Frontend | Google login | Active |
| `lucide-react` | Frontend | Main icon system | Active |
| `react-icons` | Frontend | Extra icons | Active |
| `react-fast-marquee` | Frontend | Scrolling header text | Active |
| `vite` | Frontend | Build/dev tool | Active |
| `express` | Backend | API framework | Active |
| `mongoose` | Backend | MongoDB ODM | Active |
| `dotenv` | Backend | Env variable loading | Active |
| `cors` | Backend | Cross-origin requests | Active |
| `bcryptjs` | Backend | Password hashing | Active |
| `jsonwebtoken` | Backend | JWT auth | Active |
| `google-auth-library` | Backend | Google token verification | Active |
| `multer` | Backend | File uploads | Active |
| `nodemon` | Backend | Dev auto-reload | Active |
| `cloudinary` | Backend | Cloud media storage | Installed but not active |
| `multer-storage-cloudinary` | Backend | Cloudinary upload adapter | Installed but not active |

## 3. Page Documentation

## 3.1 Frontend Route Pages

### 1. Login Page

Path:

- `client/src/pages/Login/Login.jsx`

Route:

- `/`

Purpose:

- allows existing users to log in using email/password or Google

Main responsibilities:

- collects email and password
- validates login form
- sends login request to backend
- stores JWT token in `localStorage`
- redirects to dashboard on success

APIs used:

- `POST /api/auth/login`
- `POST /api/auth/google`

Main UI elements:

- email input
- password input
- login button
- Google login button
- link to register page

Navigation behavior:

- success -> `/dashboard`
- sign up link -> `/register`

### 2. Register Page

Path:

- `client/src/pages/Register/Register.jsx`

Route:

- `/register`

Purpose:

- creates a new user account or allows Google-based sign-up

Main responsibilities:

- collects email, password, and confirm password
- validates registration form
- sends registration request
- redirects to login after successful local registration
- supports Google sign-up flow

APIs used:

- `POST /api/auth/register`
- `POST /api/auth/google`

Main UI elements:

- email input
- password input
- confirm password input
- sign-up button
- Google login button
- link back to login page

Navigation behavior:

- successful local registration -> `/`
- successful Google auth -> `/dashboard`

### 3. Dashboard Page

Path:

- `client/src/pages/Dashboard/Dashboard.jsx`

Route:

- `/dashboard`

Purpose:

- acts as the main logged-in user dashboard

Main responsibilities:

- checks whether a token exists
- fetches dashboard data from backend
- shows either dashboard overview or billing view
- supplies user info and websites to child content

APIs used:

- `GET /api/dashboard`

Main child components:

- `UserSidebar`
- `DashboardLayout`
- `DashboardHome`
- `BillingPage`

Navigation behavior:

- if no token -> `/`

### 4. Dashboard Home Page

Path:

- `client/src/pages/Dashboard/DashboardHome.jsx`

Rendered inside:

- `Dashboard.jsx`

Purpose:

- shows overview data and quick actions inside the dashboard

Main responsibilities:

- displays website count
- shows current plan
- lists owned websites
- links to create/manage actions

Main UI elements:

- overview cards
- create website button
- AI builder button
- website list with manage buttons

Important note:

- the AI builder quick action currently points to `/ai-builder`, but that route is not defined in `App.jsx`

### 5. Billing Page

Paths:

- `client/src/pages/Dashboard/BillingPage.jsx`
- `client/src/components/dashboard/BillingPage/BillingPageView.jsx`

Rendered inside:

- `Dashboard.jsx`

Purpose:

- displays plan and subscription-style billing UI

Main responsibilities:

- shows current plan
- shows upgrade prompts
- displays plan cards
- shows mock payment method details
- shows invoice history UI

Current project status:

- mostly presentation/UI
- not backed by real billing or payment gateway logic

### 6. Create Website Page

Path:

- `client/src/pages/CreateWebsite/CreateWebsite.jsx`

Route:

- `/create`

Purpose:

- first step of website creation flow

Main responsibilities:

- lets the user choose the website type
- forwards selected type to the next page

Website types shown:

- online store
- portfolio
- blog
- restaurant
- booking
- business

Navigation behavior:

- back -> `/dashboard`
- continue -> `/create/store-details`

### 7. Store Details Page

Path:

- `client/src/pages/StoreDetails/StoreDetails.jsx`

Route:

- `/create/store-details`

Purpose:

- second step of website creation flow

Main responsibilities:

- collects site/store name
- collects industry when the selected type is `online-store`
- submits create-website request to backend

APIs used:

- `POST /api/websites`

Navigation behavior:

- back -> `/create`
- success -> `/dashboard/site/:id`

### 8. Site Dashboard Page

Path:

- `client/src/pages/siteDashboard/SiteDashboard.jsx`

Route:

- `/dashboard/site/:id`

Purpose:

- main builder workspace for managing a specific website

Main responsibilities:

- fetches website details
- fetches dashboard user details
- loads active builder tab from query string
- renders the correct builder screen for the selected tab

APIs used:

- `GET /api/websites/:id`
- `GET /api/dashboard`

Main tabs/screens:

- Home
- Design
- Sections
- Products
- Orders
- Analytics
- Settings

Navigation behavior:

- auth/not-found errors redirect back to `/dashboard`

### 9. Public Site Viewer Page

Path:

- `client/src/pages/publicSite/PublicSiteViewer.jsx`

Route:

- `/live/:subdomain`

Purpose:

- renders the public-facing version of a published website

Main responsibilities:

- loads website by subdomain
- handles loading state
- handles not-live state
- handles not-found state
- renders live site preview in full-screen mode

APIs used:

- `GET /api/websites/subdomain/:subdomain`

Important behavior:

- if the store is published, visitors can browse products and place orders

## 3.2 Website Builder Internal Pages/Tabs

These are not top-level router pages, but they function like major workspace pages inside the site dashboard.

### 10. Site Home Tab

Path:

- `client/src/components/siteBuilder/SiteHome/SiteHome.jsx`

Purpose:

- dashboard landing screen for one website

Main responsibilities:

- greets the user
- shows website ID
- shows and copies public URL
- toggles publish/draft mode
- loads analytics summary

APIs used:

- `GET /api/websites/:id/analytics`
- `PUT /api/websites/publish/:id`

### 11. Site Design Tab

Path:

- `client/src/components/siteBuilder/SiteDesign/SiteDesign.jsx`

Purpose:

- manages visual branding and theme settings

Main responsibilities:

- edits header content
- edits banner/store hero content
- edits theme color
- edits social links
- edits footer settings
- saves config to backend

APIs used:

- `PATCH /api/websites/:id/config`

### 12. Sections Manager Tab

Path:

- `client/src/components/siteBuilder/sections/SectionsManager/SectionsManager.jsx`

Purpose:

- manages static informational sections for the website

Main responsibilities:

- edits About, Privacy, Shipping, Refund, Terms, Contact, and Location sections
- supports desktop/mobile preview switching
- stores the active section in query parameters
- saves section config

APIs used:

- `PATCH /api/websites/:id/config`

### 13. Products Tab

Path:

- `client/src/components/siteBuilder/products/ProductsTab/ProductsTab.jsx`

Purpose:

- full product catalog management page

Main responsibilities:

- load categories
- load products
- add/edit/delete categories
- add subcategories
- add/edit/delete products
- reorder products and categories
- sync builder preview state

APIs used:

- `GET /api/websites/:id/categories`
- `POST /api/websites/:id/categories`
- `PUT /api/websites/:id/categories/:catId`
- `DELETE /api/websites/:id/categories/:catId`
- `PATCH /api/websites/:id/categories/reorder`
- `GET /api/websites/:id/products`
- `POST /api/websites/:id/products`
- `PUT /api/websites/:id/products/:prodId`
- `DELETE /api/websites/:id/products/:prodId`
- `PATCH /api/websites/:id/products/reorder`

### 14. Orders Tab

Path:

- `client/src/components/siteBuilder/orders/OrdersTab/OrdersTab.jsx`

Purpose:

- manages customer orders and checkout/order-builder settings

Main responsibilities:

- fetches all website orders
- filters and searches orders
- expands order details
- selects multiple orders
- updates order status in bulk
- edits shipping, payment, checkout, and success-screen settings

APIs used:

- `GET /api/websites/:id/orders`
- `PATCH /api/websites/:id/orders/status`
- `PATCH /api/websites/:id/config`

### 15. Analytics Tab

Path:

- `client/src/components/siteBuilder/analytics/AnalyticsTab/AnalyticsTab.jsx`

Purpose:

- shows performance insights for the website

Main responsibilities:

- displays KPIs
- renders revenue trend chart
- shows order status distribution
- shows payment distribution
- shows top products by revenue

APIs used:

- `GET /api/websites/:id/analytics`

### 16. Settings Tab

Path:

- `client/src/components/siteBuilder/settings/SettingsTab/SettingsTab.jsx`

Purpose:

- manages website-level settings and destructive actions

Main responsibilities:

- edits store name
- edits subdomain
- toggles publish state
- deletes website after confirmation

APIs used:

- `PATCH /api/websites/:id/settings`
- `PUT /api/websites/publish/:id`
- `DELETE /api/websites/:id`

## 3.3 Public Store Internal Screens

The public live store is built from reusable screen-like components.

### 17. Site Preview Screen

Path:

- `client/src/components/siteBuilder/preview/SitePreview/SitePreview.jsx`

Purpose:

- root screen composer for the live store and builder preview

Main responsibilities:

- renders top bar, navbar, content area, cart, and footer
- passes theme, banner, section, and cart state into subcomponents

### 18. Products Screen

Path:

- `client/src/components/siteBuilder/preview/Products/Products.jsx`

Purpose:

- lists categories, product sections, and product cards for shoppers

### 19. Product Details Screen

Path:

- `client/src/components/siteBuilder/preview/ProductDetails/ProductDetails.jsx`

Purpose:

- displays full product information and lets the user add items to cart

### 20. Cart Drawer Screen

Path:

- `client/src/components/siteBuilder/preview/CartDrawer/CartDrawer.jsx`

Purpose:

- shows the current cart and allows quantity updates or removal

### 21. Checkout Page

Path:

- `client/src/components/siteBuilder/preview/CheckoutPage/CheckoutPage.jsx`

Purpose:

- collects customer and shipping details
- calculates and shows order summary
- submits the order

Backend interaction:

- when `persistOrders` is enabled on the live site, checkout posts the order to the backend

### 22. Order Placed Page

Path:

- `client/src/components/siteBuilder/preview/OrderPlacedPage/OrderPlacedPage.jsx`

Purpose:

- shows final success message after order placement

### 23. Policy Page

Path:

- `client/src/components/siteBuilder/preview/PolicyPage/PolicyPage.jsx`

Purpose:

- displays policy content such as privacy, shipping, refund, and terms

## 4. Page Flow Summary

Main user flow:

1. User opens Login page
2. User signs in or registers
3. User enters Dashboard
4. User creates a website
5. User completes Store Details
6. User is redirected into the Site Dashboard
7. User configures design, sections, products, orders, and settings
8. User publishes the website
9. Public visitors open `/live/:subdomain`
10. Visitors browse products and place orders
11. Admin returns to Orders and Analytics tabs to manage business operations

## 5. Honest Notes For Submission

- the package list above documents direct project dependencies, not every transitive package from `node_modules`
- `cloudinary` and `multer-storage-cloudinary` are installed but not currently active in the upload flow
- billing is a UI page right now, not a complete subscription system
- some website types have builder navigation items that are still placeholders

## 6. Recommended Use In Submission

For submission, you can use the documents like this:

- `README.md` for complete project documentation
- `PACKAGE_AND_PAGE_DOCUMENTATION.md` for detailed dependency and page explanation

This makes the project easier to evaluate because one file explains the system at a high level and the second file explains the working parts in a more structured way.
