# 🍔 FoodRush - Advanced Food Delivery Platform

FoodRush is a state-of-the-art, full-stack food delivery application designed to seamlessly connect customers, restaurants, and delivery partners. Built with performance and user experience in mind, it leverages the power of Next.js 14 and MongoDB to provide real-time ordering, tracking, and management capabilities.

---

## 🚀 Technology Stack

### Frontend & UI
-   **Framework**: [Next.js 14](https://nextjs.org/) (App Router, Server Components)
-   **Language**: JavaScript (ES6+)
-   **Styling**: [Tailwind CSS](https://tailwindcss.com/) for responsive design
-   **Component Library**: [Shadcn UI](https://ui.shadcn.com/) (Radix UI primitives)
-   **Icons**: [Lucide React](https://lucide.dev/)
-   **Animations**: Framer Motion
-   **Maps**: Google Maps JavaScript API (for delivery tracking)

### Backend & Database
-   **Database**: [MongoDB](https://www.mongodb.com/) (NoSQL)
-   **ODM**: [Mongoose](https://mongoosejs.com/) for schema modeling
-   **Authentication**: [NextAuth.js](https://next-auth.js.org/) (Secure session management)
-   **API**: Next.js API Routes (RESTful architecture)

### State & Utilities
-   **State Management**: [Zustand](https://zustand-demo.pmnd.rs/) (Lightweight global state)
-   **Date Handling**: date-fns
-   **Forms**: React Hook Form
-   **Validation**: Zod (implied usage with Shadcn forms)

---

## 🛠️ Environment Configuration

To run this project securely, you need to configure the following environment variables in a `.env.local` file at the root of the project.

| Variable | Description | Required | Default / Example |
| :--- | :--- | :--- | :--- |
| `MONGODB_URI` | Connection string for your MongoDB database. | **Yes** | `mongodb://localhost:27017/foodrush` |
| `NEXTAUTH_SECRET` | A random string used to hash tokens and sign cookies. | **Yes** | `your_secret_key_here` |
| `NEXTAUTH_URL` | The canonical URL of your site. | **Yes** | `http://localhost:3000` |
| `NEXT_PUBLIC_UPI_ID` | The default UPI ID used for receiving payments. | No | `your-business-upi@oksbi` |
| `NEXT_PUBLIC_GOOGLE_MAPS_KEY` | API Key for Google Maps (Address search & tracking). | No | `AIzaSy...` |

---

## 📜 Scripts & Commands

The project comes with several built-in scripts to streamline development and deployment.

| Command | Description |
| :--- | :--- |
| `npm run dev` | Starts the development server at `http://localhost:3000` with hot-reloading. |
| `npm run build` | Compiles the application for production usage. Essential for deployment. |
| `npm run start` | Starts the production server (run this after `npm run build`). |
| `npm run lint` | Runs ESLint to identify and report on patterns in JavaScript. |
| `npm run seed` | **Data Seeding**: Populates your database with initial test data (Users, Restaurants, Dishes). <br> *Usage*: Run this once to set up a demo environment. |

---

## ✨ Comprehensive Features

### 👤 Customer Application
-   **Dynamic Menu Browsing**: Filter dishes by category, rating, and price.
-   **Smart Cart System**: Real-time total calculation, tax estimation, and customization support.
-   **Secure Checkout**:
    -   Support for **UPI Payments** (with Test Mode simulation).
    -   Cash on Delivery (COD) option.
-   **Real-Time Order Tracking**:
    -   Visual progress bar (Confirmed -> Preparing -> Out for Delivery -> Delivered).
    -   Integration with map coordinates for delivery location.
-   **User Profile**: Manage saved addresses, view order history, and re-order favorites.
-   **Review System**: Rate dishes and restaurants with star ratings and comments.

### 🛠️ Admin Dashboard
-   **Operational Overview**: At-a-glance metrics for Total Sales, Active Orders, and User Growth.
-   **Order Verification**:
    -   **Payment Verification**: Validate UPI transaction IDs (UTR) before confirming orders.
    -   **Status Control**: Manually update order stages if needed.
-   **Menu Management**: comprehensive CRUD operations for Dishes and Categories.
-   **Restaurant Onboarding**: Manage restaurant profiles and settings.
-   **QR Code Generator**: Generate unique QR codes for restaurant tables or menus.

### 🛵 Delivery Personnel Portal
-   **Dedicated Dashboard**: tailored view for delivery partners.
-   **Order Assignment**: View orders specifically assigned to the logged-in driver.
-   **Secure Delivery (OTP)**:
    -   System generates a unique **OTP** for every order.
    -   Drivers must enter the customer's OTP to mark an order as "Delivered", ensuring security.
-   **Navigation**: Access delivery addresses with integrated map support.

### 🏢 Restaurant Portal
-   **Order Queue**: Real-time kitchen display system (KDS) for incoming orders.
-   **Availability Toggle**: Instantly mark dishes as "Out of Stock" or "Available".
-   **Business Analytics**: Track daily earnings and popular items.

---

## 🗄️ Database Architecture

The application uses a robust MongoDB schema design:

-   **Users**: Stores secure credentials, roles (`admin`, `user`, `delivery`, `restaurant_owner`), usage history, and saved addresses.
-   **Orders**: The central collection linking Users, Restaurants, and Dishes.
    -   Tracks `status` sequence: `pending` -> `confirmed` -> `preparing` -> `out_for_delivery` -> `delivered`.
    -   Stores `deliveryOTP` for security.
    -   Records payment details (`utrNumber`, `paymentStatus`).
-   **Restaurants**: Profiles including location, ratings, and operational hours.
-   **Dishes**: Menu items with pricing, description, and category associations.

---

## 📂 Project Structure

```bash
foodrush/
├── scripts/                # Database seeding scripts
│   └── seed.js             # Initial data population
├── src/
│   ├── app/                # Next.js App Router
│   │   ├── api/            # Backend API endpoints (admin/, user/, etc.)
│   │   ├── admin/          # Admin Dashboard pages
│   │   ├── delivery/       # Delivery Partner pages
│   │   └── (user)/         # Customer facing pages
│   ├── components/         # Reusable UI components
│   ├── lib/
│   │   ├── models/         # Mongoose Schemas (User, Order, Dish)
│   │   ├── db.js           # Database connection
│   │   └── utils.js        # Helper functions
│   └── hooks/              # Custom React hooks
├── public/                 # Static assets (images, logos)
└── package.json            # Dependencies and scripts
```

---

## 🔌 API Documentation (Key Endpoints)

### User APIs
-   `GET /api/menu`: Fetch all available dishes.
-   `POST /api/orders`: Create a new order.
-   `GET /api/user/profile`: Fetch user details and history.

### Admin APIs
-   `GET /api/admin/orders`: List all orders with filtering.
-   `POST /api/admin/orders/verify-payment`: Verify UPI transactions.
-   `POST /api/admin/menu`: Add new items to the global menu.

### Delivery APIs
-   `GET /api/delivery/orders`: Get orders assigned to the current driver.
-   `POST /api/delivery/verify-otp`: Complete delivery by validating OTP.

---

## 🛠️ Setup & Installation

Follow these steps to run the project locally:

1.  **Clone the Repository**
    ```bash
    git clone <repository-url>
    cd foodrush
    ```

2.  **Install Dependencies**
    ```bash
    npm install
    ```

3.  **Environment Configuration**
    Create a `.env.local` file in the root directory and confirm the variables listed in the **Configuration** section above.

4.  **Seed the Database (Optional)**
    To populate the app with demo data (restaurants, dishes, and an admin user), run:
    ```bash
    npm run seed
    ```

5.  **Run the Application**
    ```bash
    npm run dev
    ```
    Visit `http://localhost:3000` to start exploring.

---

## 🧪 Testing Guide: Payments & Delivery

### 💳 UPI Payment Simulation (Test Mode)
The application includes a robust simulator for UPI payments:
1.  During **Checkout**, select "UPI Payment".
2.  Use the **"🧪 Generate Fake Payment"** button in the purple Test Mode box.
3.  This auto-fills a valid **12-digit UTR** for testing.
4.  Place the order.
5.  **Admin Verification**: Log in as Admin > Orders > Verify Payment to confirm the order.

### 📦 Delivery Flow
1.  Once an order is `out_for_delivery`, a unique **OTP** is generated.
2.  The customer sees this OTP in their order tracking page.
3.  The **Delivery Partner** must request this OTP from the customer.
4.  Enter the OTP in the Delivery Dashboard to successfully mark the order as **Delivered**.

---

## � Deployment

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme).

1.  Push your code to a Git repository (GitHub, GitLab, or BitBucket).
2.  Import your project to Vercel.
3.  Add your **Environment Variables** (MONGODB_URI, NEXTAUTH_SECRET, etc.) in the Vercel dashboard.
4.  Click **Deploy**.

Check out the [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
