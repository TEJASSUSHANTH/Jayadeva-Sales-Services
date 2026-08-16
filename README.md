# Jayadeva Sales & Services — Official Website & Admin Panel

A fast, simple, clean, and professional website for **Jayadeva Sales & Services**, authorized dealer and technical service provider for **Sunshine Embroidery Machines** and **Shunfa Industrial Sewing Machines**.

---

## Features

- **Public Pages**:
  1. **Home**: Hero section, Sunshine & Shunfa brand highlights, featured machines, service guarantees.
  2. **Products**: Searchable & filterable catalog of Embroidery Machines, Lockstitch, Overlock, Interlock, Heavy Duty, and Accessories.
  3. **Product Details**: Complete machine specifications, features, applications, quote request, WhatsApp enquiry, call button, and brochure download.
  4. **Services**: Sales support, installation, service & maintenance, and 1-year warranty assistance with 6-month service intervals.
  5. **About Us**: Company profile for Jayadeva Sales & Services, Sunshine, and Shunfa.
  6. **Contact Us**: Address, Phone, WhatsApp, Email, Google Map embed, and interactive Enquiry Form.
- **Floating WhatsApp Button**: Pre-filled enquiry message on all public pages.
- **Mobile Action Bar**: Fixed bottom bar with `CALL | WHATSAPP | ENQUIRE` buttons.
- **Admin Panel (`/admin/login` & `/admin`)**:
  - Secure hashed password authentication & JWT session cookies.
  - Simple dashboard with product counters and enquiry management.
  - CRUD operations for products (Add, Edit, Delete, Toggle Price Visibility, Upload Images/Brochures).
  - Status tracking for customer enquiries (`NEW`, `CONTACTED`, `CLOSED`).
  - Company contact information and settings manager.

---

## 1. Local Setup

### Prerequisites
- Node.js >= 18.x
- npm or bun

### Installation
```bash
# Clone repository
git clone https://github.com/your-org/jayadeva-sales-services.git
cd jayadeva-sales-services

# Install dependencies
npm install

# Start local development server
npm run dev
```

The application will run at `http://localhost:3000`.

---

## 2. Environment Variables

Copy `.env.example` to `.env`:

```env
PORT=3000
NODE_ENV=development
JWT_SECRET=jayadeva-secret-key-2026
ADMIN_EMAIL=admin@jayadevaservices.com
ADMIN_PASSWORD=admin123
```

---

## 3. Database Setup

This project uses an embedded persistent JSON database stored at `./data/db.json` with automatic seed data initialized on first boot. 

For PostgreSQL production hosting, the database structure maps directly to the following tables:
- `users`
- `products`
- `categories`
- `product_images`
- `enquiries`
- `website_settings`

---

## 4. Admin Account Setup

Default seeded administrator credentials:
- **Email**: `admin@jayadevaservices.com`
- **Password**: `admin123`

Access the Admin Login at `http://localhost:3000/admin/login` or via the "Admin Login" link in the website footer.

---

## 5. Production Build

To create an optimized production build:

```bash
# Compile Vite frontend and bundling server via esbuild
npm run build

# Start production server
npm start
```

---

## 6. Railway Deployment

This application is fully Railway ready.

### Steps to Deploy on Railway:

1. **Connect Repository**: Create a new project on [Railway](https://railway.app/) and link your Git repository.
2. **Environment Variables**: Add the following variables in Railway's service settings:
   - `NODE_ENV=production`
   - `JWT_SECRET=your-secure-random-secret`
   - `ADMIN_EMAIL=admin@jayadevaservices.com`
   - `ADMIN_PASSWORD=your-secure-password`
3. **Build & Start Command**:
   - Railway auto-detects `npm run build` and `npm start`.
   - Build Command: `npm run build`
   - Start Command: `npm start`
4. **Persistent Volume**: Attach a Railway Volume mounted to `/data` and `/uploads` to ensure custom product uploads and updated database records persist across container restarts.

---

## Copyright

© Jayadeva Sales & Services. All Rights Reserved.
