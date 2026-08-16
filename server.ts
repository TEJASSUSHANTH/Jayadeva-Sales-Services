import express, { Request, Response, NextFunction } from 'express';
import path from 'path';
import fs from 'fs';
import cookieParser from 'cookie-parser';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import multer from 'multer';
import pg from 'pg';
import { createServer as createViteServer } from 'vite';
import { initialProducts, initialEnquiries, initialSettings } from './src/data/initialData';
import { Product, Enquiry, WebsiteSettings, User } from './src/types';

const PORT = 3000;
const JWT_SECRET = process.env.JWT_SECRET || 'jayadeva-secret-key-2026';
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'admin@jayadevaservices.com';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin123';
const DATABASE_URL = process.env.DATABASE_URL;

// Setup Data Storage directory for local fallback
const DATA_DIR = path.join(process.cwd(), 'data');
const UPLOADS_DIR = path.join(process.cwd(), 'uploads');
const DB_FILE = path.join(DATA_DIR, 'db.json');

if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}
if (!fs.existsSync(UPLOADS_DIR)) {
  fs.mkdirSync(UPLOADS_DIR, { recursive: true });
}

// Memory database structure
interface DatabaseSchema {
  products: Product[];
  enquiries: Enquiry[];
  settings: WebsiteSettings;
  adminPasswordHash: string;
}

let db: DatabaseSchema = {
  products: initialProducts,
  enquiries: initialEnquiries,
  settings: initialSettings,
  adminPasswordHash: bcrypt.hashSync(ADMIN_PASSWORD, 10),
};

// --- RAILWAY POSTGRESQL POOL SETUP ---
let pgPool: pg.Pool | null = null;

if (DATABASE_URL) {
  console.log('Connecting to Railway PostgreSQL database...');
  pgPool = new pg.Pool({
    connectionString: DATABASE_URL,
    ssl: DATABASE_URL.includes('localhost') || DATABASE_URL.includes('127.0.0.1')
      ? false
      : { rejectUnauthorized: false },
  });
}

// Initialize PostgreSQL Tables if connected
async function initPgDb() {
  if (!pgPool) return;
  try {
    const client = await pgPool.connect();
    try {
      // Create tables
      await client.query(`
        CREATE TABLE IF NOT EXISTS products (
          id VARCHAR(100) PRIMARY KEY,
          brand VARCHAR(100),
          category VARCHAR(100),
          name VARCHAR(255),
          model VARCHAR(100),
          description TEXT,
          specifications JSONB,
          features JSONB,
          applications JSONB,
          price NUMERIC,
          show_price BOOLEAN DEFAULT FALSE,
          main_image TEXT,
          gallery_images JSONB,
          brochure_url TEXT,
          published BOOLEAN DEFAULT TRUE,
          created_at TIMESTAMPTZ DEFAULT NOW(),
          updated_at TIMESTAMPTZ DEFAULT NOW()
        );

        CREATE TABLE IF NOT EXISTS enquiries (
          id VARCHAR(100) PRIMARY KEY,
          customer_name VARCHAR(255),
          phone VARCHAR(100),
          email VARCHAR(255),
          product_name VARCHAR(255),
          product_id VARCHAR(100),
          message TEXT,
          status VARCHAR(50) DEFAULT 'NEW',
          created_at TIMESTAMPTZ DEFAULT NOW()
        );

        CREATE TABLE IF NOT EXISTS settings (
          id INT PRIMARY KEY DEFAULT 1,
          data JSONB,
          updated_at TIMESTAMPTZ DEFAULT NOW()
        );

        CREATE TABLE IF NOT EXISTS admin_users (
          id VARCHAR(100) PRIMARY KEY,
          email VARCHAR(255) UNIQUE,
          password_hash TEXT,
          updated_at TIMESTAMPTZ DEFAULT NOW()
        );
      `);

      // Check if products exist, else seed
      const prodRes = await client.query('SELECT COUNT(*) FROM products');
      if (parseInt(prodRes.rows[0].count, 10) === 0) {
        console.log('Seeding initial products into Railway PostgreSQL...');
        for (const p of initialProducts) {
          await client.query(
            `INSERT INTO products (
              id, brand, category, name, model, description, specifications,
              features, applications, price, show_price, main_image, gallery_images,
              brochure_url, published, created_at, updated_at
            ) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17)`,
            [
              p.id,
              p.brand,
              p.category,
              p.name,
              p.model,
              p.description,
              JSON.stringify(p.specifications || {}),
              JSON.stringify(p.features || []),
              JSON.stringify(p.applications || []),
              p.price || null,
              p.showPrice || false,
              p.mainImage,
              JSON.stringify(p.galleryImages || []),
              p.brochureUrl || '',
              p.published !== false,
              p.createdAt || new Date().toISOString(),
              p.updatedAt || new Date().toISOString(),
            ]
          );
        }
      }

      // Check if settings exist, else seed
      const setRes = await client.query('SELECT COUNT(*) FROM settings');
      if (parseInt(setRes.rows[0].count, 10) === 0) {
        console.log('Seeding initial settings into Railway PostgreSQL...');
        await client.query('INSERT INTO settings (id, data) VALUES (1, $1)', [
          JSON.stringify(initialSettings),
        ]);
      }

      // Check admin user, else seed
      const adminRes = await client.query('SELECT COUNT(*) FROM admin_users');
      if (parseInt(adminRes.rows[0].count, 10) === 0) {
        await client.query(
          'INSERT INTO admin_users (id, email, password_hash) VALUES ($1, $2, $3)',
          ['admin-1', ADMIN_EMAIL.toLowerCase(), db.adminPasswordHash]
        );
      }

      // Load DB into memory cache
      await loadDbFromPg(client);
      console.log('Railway PostgreSQL initialization complete.');
    } finally {
      client.release();
    }
  } catch (err) {
    console.error('Failed to initialize Railway PostgreSQL database:', err);
  }
}

async function loadDbFromPg(clientParam?: pg.PoolClient) {
  if (!pgPool) return;
  const client = clientParam || (await pgPool.connect());
  try {
    const prodRes = await client.query('SELECT * FROM products ORDER BY created_at DESC');
    const products: Product[] = prodRes.rows.map((r) => ({
      id: r.id,
      brand: r.brand,
      category: r.category,
      name: r.name,
      model: r.model,
      description: r.description,
      specifications: typeof r.specifications === 'string' ? JSON.parse(r.specifications) : r.specifications,
      features: typeof r.features === 'string' ? JSON.parse(r.features) : r.features,
      applications: typeof r.applications === 'string' ? JSON.parse(r.applications) : r.applications,
      price: r.price ? Number(r.price) : undefined,
      showPrice: Boolean(r.show_price),
      mainImage: r.main_image,
      galleryImages: typeof r.gallery_images === 'string' ? JSON.parse(r.gallery_images) : r.gallery_images,
      brochureUrl: r.brochure_url,
      published: Boolean(r.published),
      createdAt: r.created_at,
      updatedAt: r.updated_at,
    }));

    const enqRes = await client.query('SELECT * FROM enquiries ORDER BY created_at DESC');
    const enquiries: Enquiry[] = enqRes.rows.map((r) => ({
      id: r.id,
      customerName: r.customer_name,
      phone: r.phone,
      email: r.email,
      productName: r.product_name,
      productId: r.product_id,
      message: r.message,
      status: r.status,
      createdAt: r.created_at,
    }));

    const setRes = await client.query('SELECT data FROM settings WHERE id = 1');
    const settings = setRes.rows[0]?.data || initialSettings;

    const admRes = await client.query('SELECT password_hash FROM admin_users LIMIT 1');
    const adminPasswordHash = admRes.rows[0]?.password_hash || db.adminPasswordHash;

    db = { products, enquiries, settings, adminPasswordHash };
  } finally {
    if (!clientParam) client.release();
  }
}

// Load existing JSON DB if present (Local Fallback)
if (!DATABASE_URL) {
  if (fs.existsSync(DB_FILE)) {
    try {
      const raw = fs.readFileSync(DB_FILE, 'utf-8');
      const parsed = JSON.parse(raw);
      db = {
        products: parsed.products && parsed.products.length > 0 ? parsed.products : initialProducts,
        enquiries: parsed.enquiries ? parsed.enquiries : initialEnquiries,
        settings: parsed.settings ? parsed.settings : initialSettings,
        adminPasswordHash: parsed.adminPasswordHash || bcrypt.hashSync(ADMIN_PASSWORD, 10),
      };
    } catch (err) {
      console.error('Failed to parse db.json, using defaults:', err);
    }
  } else {
    saveDb();
  }
}

function saveDb() {
  if (!DATABASE_URL) {
    try {
      fs.writeFileSync(DB_FILE, JSON.stringify(db, null, 2), 'utf-8');
    } catch (err) {
      console.error('Failed to save db.json:', err);
    }
  }
}

// --- SECURITY UTILITIES & RATE LIMITING ---

// Security Input Sanitization Helpers
function sanitizeString(str: string): string {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;')
    .trim();
}

function isValidEmail(email: string): boolean {
  if (!email) return true; // Optional in enquiry
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email.trim());
}

function isValidPhone(phone: string): boolean {
  const re = /^[\d\s+\-()]{7,20}$/;
  return re.test(phone.trim());
}

// In-Memory Rate Limiter
interface RateLimitEntry {
  count: number;
  resetTime: number;
}

function createRateLimiter(opts: { windowMs: number; max: number; message: string }) {
  const store = new Map<string, RateLimitEntry>();
  return (req: Request, res: Response, next: NextFunction) => {
    const ip = (
      (req.headers['x-forwarded-for'] as string) ||
      req.socket.remoteAddress ||
      'unknown'
    )
      .split(',')[0]
      .trim();

    const now = Date.now();
    let record = store.get(ip);

    if (!record || now > record.resetTime) {
      record = { count: 1, resetTime: now + opts.windowMs };
      store.set(ip, record);
    } else {
      record.count += 1;
    }

    res.setHeader('X-RateLimit-Limit', opts.max);
    res.setHeader('X-RateLimit-Remaining', Math.max(0, opts.max - record.count));
    res.setHeader('X-RateLimit-Reset', Math.ceil(record.resetTime / 1000));

    if (record.count > opts.max) {
      return res.status(429).json({ message: opts.message });
    }
    next();
  };
}

// Rate Limiter Instances
const loginLimiter = createRateLimiter({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5,
  message: 'Too many login attempts. Please try again after 15 minutes.',
});

const enquiryLimiter = createRateLimiter({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10,
  message: 'Too many enquiry submissions. Please try again in 15 minutes.',
});

const apiLimiter = createRateLimiter({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 300,
  message: 'Too many requests. Please slow down.',
});

// Secure Multer setup for file uploads
const ALLOWED_MIME_TYPES = new Set([
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp',
  'image/gif',
  'image/svg+xml',
  'application/pdf',
]);

const ALLOWED_EXTENSIONS = new Set(['.jpg', '.jpeg', '.png', '.webp', '.gif', '.svg', '.pdf']);

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, UPLOADS_DIR);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    const sanitizedExt = ALLOWED_EXTENSIONS.has(ext) ? ext : '.bin';
    const randomStr = Math.random().toString(36).substring(2, 10);
    const uniqueName = `file-${Date.now()}-${randomStr}${sanitizedExt}`;
    cb(null, uniqueName);
  },
});

const fileFilter = (req: Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
  const ext = path.extname(file.originalname).toLowerCase();
  if (ALLOWED_MIME_TYPES.has(file.mimetype) && ALLOWED_EXTENSIONS.has(ext)) {
    cb(null, true);
  } else {
    cb(
      new Error(
        'Invalid file type. Only JPEG, PNG, WEBP, GIF, SVG images and PDF documents are allowed.'
      )
    );
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB maximum limit
  },
});

// Dummy hash for timing attack mitigation during login
const DUMMY_HASH = '$2a$10$abcdefghijklmnopqrstuuABCDEFGHIJKLMNOPQRSTUV';

async function startServer() {
  if (pgPool) {
    await initPgDb();
  }

  const app = express();

  // --- HTTP SECURITY HEADERS MIDDLEWARE ---
  app.use((req: Request, res: Response, next: NextFunction) => {
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('X-Frame-Options', 'SAMEORIGIN');
    res.setHeader('X-XSS-Protection', '1; mode=block');
    res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
    res.setHeader('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');
    if (req.secure || req.headers['x-forwarded-proto'] === 'https') {
      res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
    }
    next();
  });

  // Global API Rate Limiter
  app.use('/api', apiLimiter);

  app.use(express.json({ limit: '10mb' }));
  app.use(cookieParser());
  app.use('/uploads', express.static(UPLOADS_DIR));

  // Authentication Middleware
  const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies.auth_token || req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    try {
      const decoded = jwt.verify(token, JWT_SECRET) as User;
      (req as any).user = decoded;
      next();
    } catch (err) {
      return res.status(403).json({ message: 'Invalid or expired token' });
    }
  };

  // --- AUTH ROUTES ---
  app.post('/api/auth/login', loginLimiter, async (req: Request, res: Response) => {
    const { email, password } = req.body;
    if (!email || !password || typeof email !== 'string' || typeof password !== 'string') {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    const cleanEmail = email.trim().toLowerCase();
    const cleanAdminEmail = ADMIN_EMAIL.trim().toLowerCase();

    if (cleanEmail === cleanAdminEmail) {
      const isMatch = await bcrypt.compare(password, db.adminPasswordHash);
      if (isMatch) {
        const user: User = {
          id: 'admin-1',
          email: ADMIN_EMAIL,
          name: 'Jayadeva Admin',
          role: 'admin',
        };
        const token = jwt.sign(user, JWT_SECRET, { expiresIn: '24h' });
        res.cookie('auth_token', token, {
          httpOnly: true,
          secure: req.secure || req.headers['x-forwarded-proto'] === 'https' || process.env.NODE_ENV === 'production',
          sameSite: 'lax',
          maxAge: 24 * 60 * 60 * 1000,
        });
        return res.json({ message: 'Login successful', user, token });
      }
    } else {
      // Execute dummy compare to prevent timing-based user enumeration
      await bcrypt.compare(password, DUMMY_HASH);
    }

    return res.status(401).json({ message: 'Invalid email or password' });
  });

  app.post('/api/auth/change-password', authenticateToken, async (req: Request, res: Response) => {
    const { currentPassword, newPassword } = req.body;
    if (!currentPassword || !newPassword) {
      return res.status(400).json({ message: 'Current password and new password are required' });
    }

    if (typeof newPassword !== 'string' || newPassword.length < 8) {
      return res.status(400).json({ message: 'New password must be at least 8 characters long' });
    }

    const isMatch = await bcrypt.compare(currentPassword, db.adminPasswordHash);
    if (!isMatch) {
      return res.status(400).json({ message: 'Incorrect current password' });
    }

    const newHash = await bcrypt.hash(newPassword, 10);
    db.adminPasswordHash = newHash;
    saveDb();

    if (pgPool) {
      try {
        await pgPool.query('UPDATE admin_users SET password_hash=$1, updated_at=NOW() WHERE id=$2', [
          newHash,
          'admin-1',
        ]);
      } catch (err) {
        console.error('Failed updating admin password in Railway PostgreSQL:', err);
      }
    }

    return res.json({ message: 'Password updated successfully' });
  });

  app.get('/api/auth/me', (req: Request, res: Response) => {
    const token = req.cookies.auth_token || req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ user: null });
    }
    try {
      const decoded = jwt.verify(token, JWT_SECRET) as User;
      return res.json({ user: decoded });
    } catch (err) {
      return res.status(401).json({ user: null });
    }
  });

  app.post('/api/auth/logout', (req: Request, res: Response) => {
    res.clearCookie('auth_token');
    return res.json({ message: 'Logged out successfully' });
  });

  // --- PRODUCTS API ---
  app.get('/api/products', (req: Request, res: Response) => {
    const isAdmin = Boolean(req.cookies.auth_token);
    let result = db.products;
    if (!isAdmin) {
      result = result.filter((p) => p.published);
    }
    return res.json(result);
  });

  app.get('/api/products/:id', (req: Request, res: Response) => {
    const product = db.products.find((p) => p.id === req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    return res.json(product);
  });

  app.post('/api/products', authenticateToken, async (req: Request, res: Response) => {
    const body = req.body;
    const newProduct: Product = {
      id: 'prod-' + Date.now(),
      brand: body.brand || 'Sunshine',
      category: body.category || 'Embroidery Machines',
      name: body.name || 'Untitled Machine',
      model: body.model || 'MODEL-00',
      description: body.description || '',
      specifications: body.specifications || {},
      features: body.features || [],
      applications: body.applications || [],
      price: body.price ? Number(body.price) : undefined,
      showPrice: Boolean(body.showPrice),
      mainImage: body.mainImage || 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1000&q=80',
      galleryImages: body.galleryImages || [],
      brochureUrl: body.brochureUrl || '',
      published: body.published !== undefined ? Boolean(body.published) : true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    db.products.unshift(newProduct);
    saveDb();

    if (pgPool) {
      try {
        await pgPool.query(
          `INSERT INTO products (
            id, brand, category, name, model, description, specifications,
            features, applications, price, show_price, main_image, gallery_images,
            brochure_url, published, created_at, updated_at
          ) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17)`,
          [
            newProduct.id,
            newProduct.brand,
            newProduct.category,
            newProduct.name,
            newProduct.model,
            newProduct.description,
            JSON.stringify(newProduct.specifications),
            JSON.stringify(newProduct.features),
            JSON.stringify(newProduct.applications),
            newProduct.price || null,
            newProduct.showPrice,
            newProduct.mainImage,
            JSON.stringify(newProduct.galleryImages),
            newProduct.brochureUrl,
            newProduct.published,
            newProduct.createdAt,
            newProduct.updatedAt,
          ]
        );
      } catch (err) {
        console.error('Failed inserting product into Railway PostgreSQL:', err);
      }
    }

    return res.status(201).json(newProduct);
  });

  app.put('/api/products/:id', authenticateToken, async (req: Request, res: Response) => {
    const index = db.products.findIndex((p) => p.id === req.params.id);
    if (index === -1) {
      return res.status(404).json({ message: 'Product not found' });
    }

    const updatedProduct: Product = {
      ...db.products[index],
      ...req.body,
      updatedAt: new Date().toISOString(),
    };

    db.products[index] = updatedProduct;
    saveDb();

    if (pgPool) {
      try {
        await pgPool.query(
          `UPDATE products SET
            brand=$1, category=$2, name=$3, model=$4, description=$5,
            specifications=$6, features=$7, applications=$8, price=$9,
            show_price=$10, main_image=$11, gallery_images=$12, brochure_url=$13,
            published=$14, updated_at=$15
          WHERE id=$16`,
          [
            updatedProduct.brand,
            updatedProduct.category,
            updatedProduct.name,
            updatedProduct.model,
            updatedProduct.description,
            JSON.stringify(updatedProduct.specifications),
            JSON.stringify(updatedProduct.features),
            JSON.stringify(updatedProduct.applications),
            updatedProduct.price || null,
            updatedProduct.showPrice,
            updatedProduct.mainImage,
            JSON.stringify(updatedProduct.galleryImages),
            updatedProduct.brochureUrl,
            updatedProduct.published,
            updatedProduct.updatedAt,
            updatedProduct.id,
          ]
        );
      } catch (err) {
        console.error('Failed updating product in Railway PostgreSQL:', err);
      }
    }

    return res.json(updatedProduct);
  });

  app.delete('/api/products/:id', authenticateToken, async (req: Request, res: Response) => {
    const index = db.products.findIndex((p) => p.id === req.params.id);
    if (index === -1) {
      return res.status(404).json({ message: 'Product not found' });
    }

    const id = db.products[index].id;
    db.products.splice(index, 1);
    saveDb();

    if (pgPool) {
      try {
        await pgPool.query('DELETE FROM products WHERE id=$1', [id]);
      } catch (err) {
        console.error('Failed deleting product from Railway PostgreSQL:', err);
      }
    }

    return res.json({ message: 'Product deleted successfully' });
  });

  // --- ENQUIRIES API ---
  app.get('/api/enquiries', authenticateToken, (req: Request, res: Response) => {
    return res.json(db.enquiries);
  });

  app.post('/api/enquiries', enquiryLimiter, async (req: Request, res: Response) => {
    const { customerName, phone, email, productName, productId, message } = req.body;
    if (!customerName || !phone || !message) {
      return res.status(400).json({ message: 'Name, Phone, and Message are required' });
    }

    const cleanName = sanitizeString(customerName);
    const cleanPhone = sanitizeString(phone);
    const cleanEmail = sanitizeString(email || '');
    const cleanProductName = sanitizeString(productName || 'General Enquiry');
    const cleanProductId = sanitizeString(productId || '');
    const cleanMessage = sanitizeString(message);

    if (cleanName.length > 100) {
      return res.status(400).json({ message: 'Name must be 100 characters or less' });
    }
    if (!isValidPhone(cleanPhone)) {
      return res.status(400).json({ message: 'Please enter a valid phone number' });
    }
    if (cleanEmail && !isValidEmail(cleanEmail)) {
      return res.status(400).json({ message: 'Please enter a valid email address' });
    }
    if (cleanMessage.length > 2000) {
      return res.status(400).json({ message: 'Message must be 2000 characters or less' });
    }

    const newEnquiry: Enquiry = {
      id: 'enq-' + Date.now(),
      customerName: cleanName,
      phone: cleanPhone,
      email: cleanEmail,
      productName: cleanProductName,
      productId: cleanProductId,
      message: cleanMessage,
      status: 'NEW',
      createdAt: new Date().toISOString(),
    };

    db.enquiries.unshift(newEnquiry);
    saveDb();

    if (pgPool) {
      try {
        await pgPool.query(
          `INSERT INTO enquiries (id, customer_name, phone, email, product_name, product_id, message, status, created_at)
           VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`,
          [
            newEnquiry.id,
            newEnquiry.customerName,
            newEnquiry.phone,
            newEnquiry.email,
            newEnquiry.productName,
            newEnquiry.productId,
            newEnquiry.message,
            newEnquiry.status,
            newEnquiry.createdAt,
          ]
        );
      } catch (err) {
        console.error('Failed inserting enquiry into Railway PostgreSQL:', err);
      }
    }

    return res.status(201).json({
      message: 'Thank you. We will contact you shortly.',
      enquiry: newEnquiry,
    });
  });

  app.put('/api/enquiries/:id/status', authenticateToken, async (req: Request, res: Response) => {
    const { status } = req.body;
    const enquiry = db.enquiries.find((e) => e.id === req.params.id);
    if (!enquiry) {
      return res.status(404).json({ message: 'Enquiry not found' });
    }

    enquiry.status = status;
    saveDb();

    if (pgPool) {
      try {
        await pgPool.query('UPDATE enquiries SET status=$1 WHERE id=$2', [status, enquiry.id]);
      } catch (err) {
        console.error('Failed updating enquiry status in Railway PostgreSQL:', err);
      }
    }

    return res.json(enquiry);
  });

  app.delete('/api/enquiries/:id', authenticateToken, async (req: Request, res: Response) => {
    const index = db.enquiries.findIndex((e) => e.id === req.params.id);
    if (index === -1) {
      return res.status(404).json({ message: 'Enquiry not found' });
    }

    const id = db.enquiries[index].id;
    db.enquiries.splice(index, 1);
    saveDb();

    if (pgPool) {
      try {
        await pgPool.query('DELETE FROM enquiries WHERE id=$1', [id]);
      } catch (err) {
        console.error('Failed deleting enquiry from Railway PostgreSQL:', err);
      }
    }

    return res.json({ message: 'Enquiry deleted' });
  });

  // --- SETTINGS API ---
  app.get('/api/settings', (req: Request, res: Response) => {
    return res.json(db.settings);
  });

  app.put('/api/settings', authenticateToken, async (req: Request, res: Response) => {
    db.settings = {
      ...db.settings,
      ...req.body,
    };
    saveDb();

    if (pgPool) {
      try {
        await pgPool.query('UPDATE settings SET data=$1 WHERE id=1', [JSON.stringify(db.settings)]);
      } catch (err) {
        console.error('Failed updating settings in Railway PostgreSQL:', err);
      }
    }

    return res.json(db.settings);
  });

  // --- FILE UPLOAD API ---
  app.post('/api/upload', authenticateToken, (req: Request, res: Response) => {
    upload.single('file')(req, res, (err: any) => {
      if (err) {
        if (err instanceof multer.MulterError) {
          if (err.code === 'LIMIT_FILE_SIZE') {
            return res.status(400).json({ message: 'File is too large. Maximum allowed size is 10MB.' });
          }
          return res.status(400).json({ message: `Upload error: ${err.message}` });
        }
        return res.status(400).json({ message: err.message || 'File upload failed' });
      }
      if (!req.file) {
        return res.status(400).json({ message: 'No file uploaded' });
      }
      const fileUrl = `/uploads/${req.file.filename}`;
      return res.json({ url: fileUrl });
    });
  });

  // Global Error Handler Middleware
  app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    console.error('Unhandled Server Error:', err);
    res.status(500).json({
      message: process.env.NODE_ENV === 'production'
        ? 'Internal Server Error'
        : err.message || 'An unexpected error occurred',
    });
  });

  // --- VITE OR STATIC SERVING ---
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req: Request, res: Response) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();

