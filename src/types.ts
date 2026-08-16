export type BrandType = 'Sunshine' | 'Shunfa' | 'Jayadeva' | 'Generic';

export type CategoryType = 
  | 'Embroidery Machines' 
  | 'Lockstitch' 
  | 'Overlock' 
  | 'Interlock' 
  | 'Heavy Duty' 
  | 'Special Machines' 
  | 'Accessories & Threads';

export interface Product {
  id: string;
  brand: BrandType;
  category: CategoryType;
  name: string;
  model: string;
  description: string;
  specifications: Record<string, string>;
  features: string[];
  applications: string[];
  price?: number;
  showPrice: boolean;
  mainImage: string;
  galleryImages: string[];
  brochureUrl?: string;
  published: boolean;
  createdAt: string;
  updatedAt: string;
}

export type EnquiryStatus = 'NEW' | 'CONTACTED' | 'CLOSED';

export interface Enquiry {
  id: string;
  customerName: string;
  phone: string;
  email?: string;
  productName?: string;
  productId?: string;
  message: string;
  status: EnquiryStatus;
  createdAt: string;
}

export interface WebsiteSettings {
  companyName: string;
  tagline: string;
  phone1: string;
  phone2?: string;
  whatsAppNumber: string;
  email: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  workingHours: string;
  googleMapsEmbedUrl: string;
  generalBrochureUrl?: string;
  logoUrl?: string;
  logoPrimaryColor?: string;
  logoSubtitleColor?: string;
  // Proprietor & Shop Photos details
  proprietorName?: string;
  proprietorTitle?: string;
  proprietorPhone?: string;
  proprietorEmail?: string;
  proprietorBio?: string;
  proprietorPhotoUrl?: string;
  shopPhotos?: string[];
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin';
}
