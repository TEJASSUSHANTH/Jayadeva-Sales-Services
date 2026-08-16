import express, { Request, Response, NextFunction } from 'express';
import path from 'path';
import fs from 'fs';
import cookieParser from 'cookie-parser';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import multer from 'multer';
import { createServer as createViteServer } from 'vite';
import { initialProducts, initialEnquiries, initialSettings } from './src/data/initialData';
import { Product, Enquiry, WebsiteSettings, User } from './src/types';

const PORT = 3000;
const JWT_SECRET = process.env.JWT_SECRET || 'jayadeva-secret-key-2026';
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'admin@jayadevaservices.com';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin123';

// Setup Data Storage directory
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

// Load existing DB if present
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

function saveDb() {
  try {
    fs.writeFileSync(DB_FILE, JSON.stringify(db, null, 2), 'utf-8');
  } catch (err) {
    console.error('Failed to save db.json:', err);
  }
}

// Multer setup for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, UPLOADS_DIR);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + '-' + uniqueSuffix + ext);
  },
});
const upload = multer({ storage });

async function startServer() {
  const app = express();

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
  app.post('/api/auth/login', async (req: Request, res: Response) => {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    if (email.toLowerCase() === ADMIN_EMAIL.toLowerCase()) {
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
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'lax',
          maxAge: 24 * 60 * 60 * 1000,
        });
        return res.json({ message: 'Login successful', user, token });
      }
    }

    return res.status(401).json({ message: 'Invalid email or password' });
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

  app.post('/api/products', authenticateToken, (req: Request, res: Response) => {
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
    return res.status(201).json(newProduct);
  });

  app.put('/api/products/:id', authenticateToken, (req: Request, res: Response) => {
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
    return res.json(updatedProduct);
  });

  app.delete('/api/products/:id', authenticateToken, (req: Request, res: Response) => {
    const index = db.products.findIndex((p) => p.id === req.params.id);
    if (index === -1) {
      return res.status(404).json({ message: 'Product not found' });
    }

    db.products.splice(index, 1);
    saveDb();
    return res.json({ message: 'Product deleted successfully' });
  });

  // --- ENQUIRIES API ---
  app.get('/api/enquiries', authenticateToken, (req: Request, res: Response) => {
    return res.json(db.enquiries);
  });

  app.post('/api/enquiries', (req: Request, res: Response) => {
    const { customerName, phone, email, productName, productId, message } = req.body;
    if (!customerName || !phone || !message) {
      return res.status(400).json({ message: 'Name, Phone, and Message are required' });
    }

    const newEnquiry: Enquiry = {
      id: 'enq-' + Date.now(),
      customerName,
      phone,
      email: email || '',
      productName: productName || 'General Enquiry',
      productId: productId || '',
      message,
      status: 'NEW',
      createdAt: new Date().toISOString(),
    };

    db.enquiries.unshift(newEnquiry);
    saveDb();
    return res.status(201).json({
      message: 'Thank you. We will contact you shortly.',
      enquiry: newEnquiry,
    });
  });

  app.put('/api/enquiries/:id/status', authenticateToken, (req: Request, res: Response) => {
    const { status } = req.body;
    const enquiry = db.enquiries.find((e) => e.id === req.params.id);
    if (!enquiry) {
      return res.status(404).json({ message: 'Enquiry not found' });
    }

    enquiry.status = status;
    saveDb();
    return res.json(enquiry);
  });

  app.delete('/api/enquiries/:id', authenticateToken, (req: Request, res: Response) => {
    const index = db.enquiries.findIndex((e) => e.id === req.params.id);
    if (index === -1) {
      return res.status(404).json({ message: 'Enquiry not found' });
    }

    db.enquiries.splice(index, 1);
    saveDb();
    return res.json({ message: 'Enquiry deleted' });
  });

  // --- SETTINGS API ---
  app.get('/api/settings', (req: Request, res: Response) => {
    return res.json(db.settings);
  });

  app.put('/api/settings', authenticateToken, (req: Request, res: Response) => {
    db.settings = {
      ...db.settings,
      ...req.body,
    };
    saveDb();
    return res.json(db.settings);
  });

  // --- FILE UPLOAD API ---
  app.post('/api/upload', authenticateToken, upload.single('file'), (req: Request, res: Response) => {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }
    const fileUrl = `/uploads/${req.file.filename}`;
    return res.json({ url: fileUrl });
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
