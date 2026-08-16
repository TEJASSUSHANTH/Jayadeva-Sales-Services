import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { MobileBottomBar } from './components/MobileBottomBar';
import { ProductDetailModal } from './components/ProductDetailModal';
import { EnquiryModal } from './components/EnquiryModal';

import { HomePage } from './pages/HomePage';
import { ProductsPage } from './pages/ProductsPage';
import { ServicesPage } from './pages/ServicesPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { AdminLoginPage } from './pages/AdminLoginPage';
import { AdminDashboard } from './pages/AdminDashboard';

import { Product, WebsiteSettings, User } from './types';
import { fetchProducts, fetchSettings, checkAuth } from './lib/api';

export default function App() {
  const [currentPage, setCurrentPage] = useState<string>('home');
  const [products, setProducts] = useState<Product[]>([]);
  const [settings, setSettings] = useState<WebsiteSettings | null>(null);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Modals state
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [enquiryProduct, setEnquiryProduct] = useState<Product | null>(null);
  const [showEnquiryModal, setShowEnquiryModal] = useState<boolean>(false);

  // Initial path routing
  useEffect(() => {
    const path = window.location.pathname;
    if (path === '/admin/login') {
      setCurrentPage('admin-login');
    } else if (path === '/admin') {
      setCurrentPage('admin-dashboard');
    } else if (path === '/products') {
      setCurrentPage('products');
    } else if (path === '/services') {
      setCurrentPage('services');
    } else if (path === '/about') {
      setCurrentPage('about');
    } else if (path === '/contact') {
      setCurrentPage('contact');
    } else {
      setCurrentPage('home');
    }
  }, []);

  // Fetch initial products, settings, and auth status
  const loadInitialData = async () => {
    setLoading(true);
    try {
      const [prods, sets, user] = await Promise.all([
        fetchProducts(),
        fetchSettings(),
        checkAuth(),
      ]);
      setProducts(prods);
      setSettings(sets);
      setCurrentUser(user);
    } catch (err) {
      console.error('Error initializing Jayadeva Sales application:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadInitialData();
  }, []);

  // Sync URL push state
  const handleNavigate = (page: string) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });

    let urlPath = '/';
    if (page === 'admin-login') urlPath = '/admin/login';
    else if (page === 'admin-dashboard') urlPath = '/admin';
    else if (page !== 'home') urlPath = `/${page}`;

    window.history.pushState({}, '', urlPath);
  };

  const handleOpenQuoteModal = (product?: Product) => {
    setEnquiryProduct(product || null);
    setShowEnquiryModal(true);
  };

  if (loading || !settings) {
    return (
      <div className="min-h-screen bg-slate-900 text-white flex flex-col items-center justify-center p-6 space-y-4">
        <div className="w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
        <div className="font-extrabold text-lg text-orange-400">JAYADEVA SALES & SERVICES</div>
        <div className="text-xs text-slate-400">Loading Machinery Catalog & Authorized Service Center...</div>
      </div>
    );
  }

  // Render Admin Dashboard Page if logged in or navigating to admin
  if (currentPage === 'admin-dashboard' || (currentPage === 'admin-login' && currentUser)) {
    if (!currentUser) {
      return (
        <AdminLoginPage
          onLoginSuccess={(user) => {
            setCurrentUser(user);
            handleNavigate('admin-dashboard');
          }}
          onNavigateHome={() => handleNavigate('home')}
        />
      );
    }
    return (
      <AdminDashboard
        onLogout={() => {
          setCurrentUser(null);
          handleNavigate('home');
        }}
        onNavigateHome={() => handleNavigate('home')}
      />
    );
  }

  if (currentPage === 'admin-login') {
    return (
      <AdminLoginPage
        onLoginSuccess={(user) => {
          setCurrentUser(user);
          handleNavigate('admin-dashboard');
        }}
        onNavigateHome={() => handleNavigate('home')}
      />
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-900 font-sans antialiased selection:bg-orange-500 selection:text-white">
      {/* Sticky Public Header */}
      <Header
        currentPage={currentPage}
        onNavigate={handleNavigate}
        onRequestQuote={() => handleOpenQuoteModal()}
        settings={settings}
      />

      {/* Main Page Routing */}
      <main className="flex-1">
        {currentPage === 'home' && (
          <HomePage
            products={products}
            settings={settings}
            onNavigate={handleNavigate}
            onSelectProduct={(p) => setSelectedProduct(p)}
            onRequestQuote={(p) => handleOpenQuoteModal(p)}
          />
        )}

        {currentPage === 'products' && (
          <ProductsPage
            products={products}
            onSelectProduct={(p) => setSelectedProduct(p)}
            onRequestQuote={(p) => handleOpenQuoteModal(p)}
          />
        )}

        {currentPage === 'services' && (
          <ServicesPage
            settings={settings}
            onRequestQuote={() => handleOpenQuoteModal()}
          />
        )}

        {currentPage === 'about' && (
          <AboutPage settings={settings} onNavigate={handleNavigate} />
        )}

        {currentPage === 'contact' && (
          <ContactPage settings={settings} products={products} />
        )}
      </main>

      {/* Footer */}
      <Footer onNavigate={handleNavigate} settings={settings} />

      {/* Floating WhatsApp Button */}
      <FloatingWhatsApp settings={settings} />

      {/* Mobile Bottom Action Bar */}
      <MobileBottomBar
        settings={settings}
        onRequestQuote={() => handleOpenQuoteModal()}
      />

      {/* Modals */}
      <ProductDetailModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onRequestQuote={(prod) => {
          setSelectedProduct(null);
          handleOpenQuoteModal(prod);
        }}
        settings={settings}
      />

      {showEnquiryModal && (
        <EnquiryModal
          product={enquiryProduct}
          onClose={() => setShowEnquiryModal(false)}
        />
      )}
    </div>
  );
}
