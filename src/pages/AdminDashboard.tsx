import React, { useState, useEffect } from 'react';
import {
  LayoutDashboard,
  Package,
  Inbox,
  Settings as SettingsIcon,
  LogOut,
  Plus,
  Edit2,
  Trash2,
  Eye,
  EyeOff,
  Upload,
  CheckCircle2,
  X,
  Phone,
  Mail,
  Calendar,
  Save,
  Globe,
  Tag,
  Image,
  Palette,
  ShieldCheck,
  Lock,
  Key,
  ShieldAlert,
} from 'lucide-react';
import { Product, Enquiry, WebsiteSettings, BrandType, CategoryType, EnquiryStatus } from '../types';
import { Logo } from '../components/Logo';
import {
  fetchProducts,
  fetchEnquiries,
  fetchSettings,
  createProduct,
  updateProduct,
  deleteProduct,
  updateEnquiryStatus,
  deleteEnquiry,
  updateSettings,
  uploadFile,
  logoutAdmin,
  changePassword,
} from '../lib/api';

interface AdminDashboardProps {
  onLogout: () => void;
  onNavigateHome: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ onLogout, onNavigateHome }) => {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'products' | 'enquiries' | 'settings' | 'logo' | 'security'>('dashboard');

  const [products, setProducts] = useState<Product[]>([]);
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [settings, setSettings] = useState<WebsiteSettings | null>(null);
  const [loading, setLoading] = useState(true);

  // Product Add / Edit Modal State
  const [showProductModal, setShowProductModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  // Product Form Fields
  const [formBrand, setFormBrand] = useState<BrandType>('Sunshine');
  const [formCategory, setFormCategory] = useState<CategoryType>('Embroidery Machines');
  const [formName, setFormName] = useState('');
  const [formModel, setFormModel] = useState('');
  const [formDescription, setFormDescription] = useState('');
  const [formSpecsText, setFormSpecsText] = useState('');
  const [formFeaturesText, setFormFeaturesText] = useState('');
  const [formPrice, setFormPrice] = useState<string>('');
  const [formShowPrice, setFormShowPrice] = useState(false);
  const [formMainImage, setFormMainImage] = useState('');
  const [formBrochureUrl, setFormBrochureUrl] = useState('');
  const [formPublished, setFormPublished] = useState(true);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [uploadingLogo, setUploadingLogo] = useState(false);
  const [uploadingProprietorPhoto, setUploadingProprietorPhoto] = useState(false);
  const [uploadingShopPhoto, setUploadingShopPhoto] = useState(false);

  // Settings Form State
  const [settingsForm, setSettingsForm] = useState<WebsiteSettings | null>(null);
  const [savingSettings, setSavingSettings] = useState(false);
  const [settingsMsg, setSettingsMsg] = useState('');

  // Security & Password Form State
  const [currPassword, setCurrPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [pwdMsg, setPwdMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [pwdLoading, setPwdLoading] = useState(false);

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setPwdMsg(null);
    if (!currPassword || !newPassword || !confirmPassword) {
      setPwdMsg({ type: 'error', text: 'Please fill in all password fields.' });
      return;
    }
    if (newPassword !== confirmPassword) {
      setPwdMsg({ type: 'error', text: 'New passwords do not match.' });
      return;
    }
    if (newPassword.length < 8) {
      setPwdMsg({ type: 'error', text: 'New password must be at least 8 characters.' });
      return;
    }

    setPwdLoading(true);
    try {
      await changePassword(currPassword, newPassword);
      setPwdMsg({ type: 'success', text: 'Admin password updated successfully!' });
      setCurrPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (err: any) {
      setPwdMsg({ type: 'error', text: err.message || 'Failed to update password.' });
    } finally {
      setPwdLoading(false);
    }
  };

  const loadAllData = async () => {
    setLoading(true);
    try {
      const [prods, enqs, sets] = await Promise.all([
        fetchProducts(),
        fetchEnquiries(),
        fetchSettings(),
      ]);
      setProducts(prods);
      setEnquiries(enqs);
      setSettings(sets);
      setSettingsForm(sets);
    } catch (err) {
      console.error('Failed to load admin data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAllData();
  }, []);

  const handleLogout = async () => {
    await logoutAdmin();
    onLogout();
  };

  // Open Product Modal
  const openProductModal = (product?: Product) => {
    if (product) {
      setEditingProduct(product);
      setFormBrand(product.brand);
      setFormCategory(product.category);
      setFormName(product.name);
      setFormModel(product.model);
      setFormDescription(product.description);

      // Specs formatted as Key: Value
      const specsArr = Object.entries(product.specifications || {}).map(
        ([k, v]) => `${k}: ${v}`
      );
      setFormSpecsText(specsArr.join('\n'));

      setFormFeaturesText((product.features || []).join('\n'));
      setFormPrice(product.price ? String(product.price) : '');
      setFormShowPrice(product.showPrice);
      setFormMainImage(product.mainImage);
      setFormBrochureUrl(product.brochureUrl || '');
      setFormPublished(product.published);
    } else {
      setEditingProduct(null);
      setFormBrand('Sunshine');
      setFormCategory('Embroidery Machines');
      setFormName('');
      setFormModel('');
      setFormDescription('');
      setFormSpecsText('Max Speed: 1200 RPM\nNeedles: 12 Needles\nMotor: Direct Drive Servo');
      setFormFeaturesText('High speed stitching\nAuto thread trimming\nHeavy duty frame');
      setFormPrice('');
      setFormShowPrice(false);
      setFormMainImage('https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1000&q=80');
      setFormBrochureUrl('');
      setFormPublished(true);
    }
    setShowProductModal(true);
  };

  // Handle Product Save
  const handleSaveProduct = async (e: React.FormEvent) => {
    e.preventDefault();

    // Parse specifications
    const specsObj: Record<string, string> = {};
    if (formSpecsText.trim()) {
      formSpecsText.split('\n').forEach((line) => {
        const parts = line.split(':');
        if (parts.length >= 2) {
          const key = parts[0].trim();
          const val = parts.slice(1).join(':').trim();
          if (key && val) specsObj[key] = val;
        }
      });
    }

    // Parse features
    const featuresArr = formFeaturesText
      .split('\n')
      .map((f) => f.trim())
      .filter(Boolean);

    const payload: Partial<Product> = {
      brand: formBrand,
      category: formCategory,
      name: formName,
      model: formModel,
      description: formDescription,
      specifications: specsObj,
      features: featuresArr,
      price: formPrice ? Number(formPrice) : undefined,
      showPrice: formShowPrice,
      mainImage: formMainImage,
      brochureUrl: formBrochureUrl,
      published: formPublished,
    };

    try {
      if (editingProduct) {
        await updateProduct(editingProduct.id, payload);
      } else {
        await createProduct(payload);
      }
      setShowProductModal(false);
      loadAllData();
    } catch (err: any) {
      alert('Error saving product: ' + err.message);
    }
  };

  // Handle Image File Upload
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    const file = e.target.files[0];
    setUploadingImage(true);
    try {
      const url = await uploadFile(file);
      setFormMainImage(url);
    } catch (err) {
      alert('Image upload failed.');
    } finally {
      setUploadingImage(false);
    }
  };

  // Handle Logo File Upload
  const handleLogoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    const file = e.target.files[0];
    setUploadingLogo(true);
    try {
      const url = await uploadFile(file);
      if (settingsForm) {
        setSettingsForm({ ...settingsForm, logoUrl: url });
      }
    } catch (err) {
      alert('Logo upload failed.');
    } finally {
      setUploadingLogo(false);
    }
  };

  // Handle Proprietor Photo Upload
  const handleProprietorPhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    const file = e.target.files[0];
    setUploadingProprietorPhoto(true);
    try {
      const url = await uploadFile(file);
      if (settingsForm) {
        setSettingsForm({ ...settingsForm, proprietorPhotoUrl: url });
      }
    } catch (err) {
      alert('Proprietor photo upload failed.');
    } finally {
      setUploadingProprietorPhoto(false);
    }
  };

  // Handle Shop Photo Upload
  const handleShopPhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    const file = e.target.files[0];
    setUploadingShopPhoto(true);
    try {
      const url = await uploadFile(file);
      if (settingsForm) {
        const currentShopPhotos = settingsForm.shopPhotos || [];
        setSettingsForm({ ...settingsForm, shopPhotos: [...currentShopPhotos, url] });
      }
    } catch (err) {
      alert('Shop photo upload failed.');
    } finally {
      setUploadingShopPhoto(false);
    }
  };

  // Delete Product
  const handleDeleteProduct = async (id: string) => {
    if (confirm('Are you sure you want to delete this product?')) {
      try {
        await deleteProduct(id);
        loadAllData();
      } catch (err) {
        alert('Failed to delete product.');
      }
    }
  };

  // Toggle Publish
  const handleTogglePublish = async (product: Product) => {
    try {
      await updateProduct(product.id, { published: !product.published });
      loadAllData();
    } catch (err) {
      alert('Failed to update status.');
    }
  };

  // Toggle Show Price
  const handleToggleShowPrice = async (product: Product) => {
    try {
      await updateProduct(product.id, { showPrice: !product.showPrice });
      loadAllData();
    } catch (err) {
      alert('Failed to update price visibility.');
    }
  };

  // Status Change for Enquiry
  const handleEnquiryStatusChange = async (id: string, status: EnquiryStatus) => {
    try {
      await updateEnquiryStatus(id, status);
      loadAllData();
    } catch (err) {
      alert('Failed to update enquiry status.');
    }
  };

  // Delete Enquiry
  const handleDeleteEnquiry = async (id: string) => {
    if (confirm('Delete this enquiry record?')) {
      try {
        await deleteEnquiry(id);
        loadAllData();
      } catch (err) {
        alert('Failed to delete enquiry.');
      }
    }
  };

  // Save Settings
  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!settingsForm) return;
    setSavingSettings(true);
    setSettingsMsg('');
    try {
      const updated = await updateSettings(settingsForm);
      setSettings(updated);
      setSettingsMsg('Settings updated successfully!');
    } catch (err) {
      setSettingsMsg('Failed to update settings.');
    } finally {
      setSavingSettings(false);
    }
  };

  // Dashboard Counters
  const totalProducts = products.length;
  const publishedProductsCount = products.filter((p) => p.published).length;
  const newEnquiriesCount = enquiries.filter((e) => e.status === 'NEW').length;
  const recentEnquiries = enquiries.slice(0, 5);

  return (
    <div className="min-h-screen bg-slate-900/5 flex flex-col md:flex-row backdrop-blur-3xl">
      {/* ADMIN SIDEBAR */}
      <aside className="w-full md:w-64 bg-[#001733]/90 backdrop-blur-xl text-slate-300 flex flex-col justify-between shrink-0 border-r border-white/10">
        <div>
          <div className="p-6 border-b border-white/10 flex items-center justify-between">
            <Logo variant="footer" size="sm" />
            <button
              onClick={onNavigateHome}
              className="text-xs text-slate-400 hover:text-white underline ml-2"
            >
              Site
            </button>
          </div>

          <nav className="p-4 space-y-1.5 text-xs font-bold">
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all ${
                activeTab === 'dashboard'
                  ? 'bg-[#FF6321] text-white shadow-lg shadow-orange-500/20'
                  : 'hover:bg-white/10 text-slate-300'
              }`}
            >
              <LayoutDashboard className="w-4 h-4" />
              <span>Dashboard</span>
            </button>

            <button
              onClick={() => setActiveTab('products')}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all ${
                activeTab === 'products'
                  ? 'bg-[#FF6321] text-white shadow-lg shadow-orange-500/20'
                  : 'hover:bg-white/10 text-slate-300'
              }`}
            >
              <Package className="w-4 h-4" />
              <span>Products ({totalProducts})</span>
            </button>

            <button
              onClick={() => setActiveTab('enquiries')}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all ${
                activeTab === 'enquiries'
                  ? 'bg-[#FF6321] text-white shadow-lg shadow-orange-500/20'
                  : 'hover:bg-white/10 text-slate-300'
              }`}
            >
              <Inbox className="w-4 h-4" />
              <div className="flex-1 flex justify-between items-center">
                <span>Enquiries</span>
                {newEnquiriesCount > 0 && (
                  <span className="px-2 py-0.5 bg-red-500 text-white rounded-full text-[10px]">
                    {newEnquiriesCount}
                  </span>
                )}
              </div>
            </button>

            <button
              onClick={() => setActiveTab('logo')}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all ${
                activeTab === 'logo'
                  ? 'bg-[#FF6321] text-white shadow-lg shadow-orange-500/20'
                  : 'hover:bg-white/10 text-slate-300'
              }`}
            >
              <Palette className="w-4 h-4" />
              <span>Logo Editor</span>
            </button>

            <button
              onClick={() => setActiveTab('settings')}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all ${
                activeTab === 'settings'
                  ? 'bg-[#FF6321] text-white shadow-lg shadow-orange-500/20'
                  : 'hover:bg-white/10 text-slate-300'
              }`}
            >
              <SettingsIcon className="w-4 h-4" />
              <span>Settings</span>
            </button>

            <button
              onClick={() => setActiveTab('security')}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all ${
                activeTab === 'security'
                  ? 'bg-[#FF6321] text-white shadow-lg shadow-orange-500/20'
                  : 'hover:bg-white/10 text-slate-300'
              }`}
            >
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Security & Password</span>
            </button>
          </nav>
        </div>

        <div className="p-4 border-t border-white/10">
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center space-x-2 px-4 py-2.5 bg-red-900/40 hover:bg-red-900/70 text-red-200 font-bold text-xs rounded-xl transition-all border border-red-500/20"
          >
            <LogOut className="w-4 h-4" />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* ADMIN MAIN CONTENT AREA */}
      <main className="flex-1 p-4 sm:p-8 overflow-y-auto">
        {loading ? (
          <div className="text-center py-20 text-slate-500 text-xs font-bold">
            Loading Admin Panel Data...
          </div>
        ) : (
          <>
            {/* 1. DASHBOARD TAB */}
            {activeTab === 'dashboard' && (
              <div className="space-y-8">
                <div>
                  <h1 className="text-2xl font-black text-[#002B5B]">Admin Dashboard</h1>
                  <p className="text-xs text-slate-600 mt-1">
                    Quick overview of website catalog status and incoming machine enquiries.
                  </p>
                </div>

                {/* Counter Cards Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="bg-white/80 backdrop-blur-md p-5 rounded-2xl border border-white/80 shadow-lg">
                    <div className="text-xs font-bold text-slate-500">Total Products</div>
                    <div className="text-3xl font-black text-[#002B5B] mt-1">
                      {totalProducts}
                    </div>
                  </div>

                  <div className="bg-white/80 backdrop-blur-md p-5 rounded-2xl border border-white/80 shadow-lg">
                    <div className="text-xs font-bold text-slate-500">Published Products</div>
                    <div className="text-3xl font-black text-emerald-600 mt-1">
                      {publishedProductsCount}
                    </div>
                  </div>

                  <div className="bg-white/80 backdrop-blur-md p-5 rounded-2xl border border-white/80 shadow-lg">
                    <div className="text-xs font-bold text-slate-500">New Enquiries</div>
                    <div className="text-3xl font-black text-[#FF6321] mt-1">
                      {newEnquiriesCount}
                    </div>
                  </div>

                  <div className="bg-white/80 backdrop-blur-md p-5 rounded-2xl border border-white/80 shadow-lg">
                    <div className="text-xs font-bold text-slate-500">Total Enquiries</div>
                    <div className="text-3xl font-black text-[#002B5B] mt-1">
                      {enquiries.length}
                    </div>
                  </div>
                </div>

                {/* Recent Enquiries Table */}
                <div className="bg-white/80 backdrop-blur-md rounded-2xl border border-white/80 p-6 space-y-4 shadow-lg">
                  <div className="flex items-center justify-between border-b border-slate-200/80 pb-3">
                    <h3 className="font-bold text-[#002B5B] text-base">Recent Enquiries</h3>
                    <button
                      onClick={() => setActiveTab('enquiries')}
                      className="text-xs font-bold text-[#FF6321] hover:underline"
                    >
                      View All
                    </button>
                  </div>

                  {recentEnquiries.length > 0 ? (
                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-xs">
                        <thead>
                          <tr className="border-b border-slate-200/80 text-slate-500 font-bold uppercase">
                            <th className="py-2 px-3">Customer</th>
                            <th className="py-2 px-3">Phone</th>
                            <th className="py-2 px-3">Product</th>
                            <th className="py-2 px-3">Status</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                          {recentEnquiries.map((enq) => (
                            <tr key={enq.id}>
                              <td className="py-3 px-3 font-bold text-slate-900">
                                {enq.customerName}
                              </td>
                              <td className="py-3 px-3 text-slate-600">{enq.phone}</td>
                              <td className="py-3 px-3 text-slate-600">
                                {enq.productName || 'General'}
                              </td>
                              <td className="py-3 px-3">
                                <span
                                  className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                                    enq.status === 'NEW'
                                      ? 'bg-red-100/90 text-red-800'
                                      : enq.status === 'CONTACTED'
                                      ? 'bg-amber-100/90 text-amber-800'
                                      : 'bg-emerald-100/90 text-emerald-800'
                                  }`}
                                >
                                  {enq.status}
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    <p className="text-xs text-slate-500 text-center py-6">
                      No enquiries received yet.
                    </p>
                  )}
                </div>
              </div>
            )}

            {/* 2. PRODUCTS TAB */}
            {activeTab === 'products' && (
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h1 className="text-2xl font-black text-[#002B5B]">Manage Products</h1>
                    <p className="text-xs text-slate-600 mt-1">
                      Add, edit, change pricing display, publish or delete Sunshine & Shunfa models.
                    </p>
                  </div>
                  <button
                    onClick={() => openProductModal()}
                    className="px-4 py-2.5 bg-[#FF6321] hover:bg-[#e85a1e] text-white font-bold text-xs rounded-xl transition-all flex items-center space-x-2 shrink-0 shadow-lg shadow-orange-500/20"
                    id="btn-admin-add-product"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add New Product</span>
                  </button>
                </div>

                {/* Products List Table */}
                <div className="bg-white/80 backdrop-blur-md rounded-2xl border border-white/80 overflow-hidden shadow-lg">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs border-collapse">
                      <thead>
                        <tr className="bg-slate-50/80 border-b border-slate-200/80 text-slate-600 font-bold uppercase">
                          <th className="py-3 px-4">Machine</th>
                          <th className="py-3 px-4">Brand / Category</th>
                          <th className="py-3 px-4">Model</th>
                          <th className="py-3 px-4">Price</th>
                          <th className="py-3 px-4">Status</th>
                          <th className="py-3 px-4 text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {products.map((p) => (
                          <tr key={p.id} className="hover:bg-white/50">
                            <td className="py-3 px-4">
                              <div className="flex items-center space-x-3">
                                <img
                                  src={p.mainImage}
                                  alt={p.name}
                                  referrerPolicy="no-referrer"
                                  className="w-10 h-10 object-cover rounded-xl border border-slate-200 shrink-0"
                                />
                                <div className="font-bold text-[#002B5B]">{p.name}</div>
                              </div>
                            </td>
                            <td className="py-3 px-4 text-slate-600">
                              <span className="font-semibold text-slate-900">{p.brand}</span> • {p.category}
                            </td>
                            <td className="py-3 px-4 font-mono font-bold text-slate-800">
                              {p.model}
                            </td>
                            <td className="py-3 px-4">
                              <button
                                onClick={() => handleToggleShowPrice(p)}
                                className="text-[11px] hover:underline focus:outline-hidden"
                                title="Click to toggle price display"
                              >
                                {p.showPrice && p.price ? (
                                  <span className="font-bold text-emerald-700">
                                    ₹{p.price.toLocaleString('en-IN')} (Shown)
                                  </span>
                                ) : (
                                  <span className="text-slate-500 font-semibold">
                                    Contact for Price (Hidden)
                                  </span>
                                )}
                              </button>
                            </td>
                            <td className="py-3 px-4">
                              <button
                                onClick={() => handleTogglePublish(p)}
                                className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                                  p.published
                                    ? 'bg-emerald-100/90 text-emerald-800'
                                    : 'bg-slate-200/90 text-slate-700'
                                }`}
                              >
                                {p.published ? 'Published' : 'Hidden'}
                              </button>
                            </td>
                            <td className="py-3 px-4 text-right space-x-2">
                              <button
                                onClick={() => openProductModal(p)}
                                className="p-1 text-slate-600 hover:text-[#FF6321]"
                                title="Edit Product"
                              >
                                <Edit2 className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => handleDeleteProduct(p.id)}
                                className="p-1 text-slate-600 hover:text-red-600"
                                title="Delete Product"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* 3. ENQUIRIES TAB */}
            {activeTab === 'enquiries' && (
              <div className="space-y-6">
                <div>
                  <h1 className="text-2xl font-black text-[#002B5B]">Customer Enquiries</h1>
                  <p className="text-xs text-slate-600 mt-1">
                    Review incoming quote requests from customer website submissions.
                  </p>
                </div>

                <div className="bg-white/80 backdrop-blur-md rounded-2xl border border-white/80 overflow-hidden shadow-lg">
                  {enquiries.length > 0 ? (
                    <div className="divide-y divide-slate-200/80">
                      {enquiries.map((enq) => (
                        <div key={enq.id} className="p-5 space-y-3 hover:bg-white/50">
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-2">
                            <div>
                              <span className="font-extrabold text-[#002B5B] text-sm">
                                {enq.customerName}
                              </span>
                              <div className="text-xs text-slate-500 mt-0.5 flex items-center space-x-3">
                                <span className="flex items-center space-x-1">
                                  <Phone className="w-3 h-3 text-[#FF6321]" />
                                  <a href={`tel:${enq.phone}`} className="font-bold text-slate-800 hover:underline">
                                    {enq.phone}
                                  </a>
                                </span>
                                {enq.email && (
                                  <span className="flex items-center space-x-1">
                                    <Mail className="w-3 h-3 text-slate-400" />
                                    <span>{enq.email}</span>
                                  </span>
                                )}
                              </div>
                            </div>

                            <div className="flex items-center space-x-3">
                              <span className="text-[11px] text-slate-400 flex items-center space-x-1">
                                <Calendar className="w-3 h-3" />
                                <span>{new Date(enq.createdAt).toLocaleDateString()}</span>
                              </span>

                              <select
                                value={enq.status}
                                onChange={(e) =>
                                  handleEnquiryStatusChange(enq.id, e.target.value as EnquiryStatus)
                                }
                                className="px-2.5 py-1 text-xs font-bold rounded-xl border border-slate-300 bg-white/90"
                              >
                                <option value="NEW">NEW</option>
                                <option value="CONTACTED">CONTACTED</option>
                                <option value="CLOSED">CLOSED</option>
                              </select>

                              <button
                                onClick={() => handleDeleteEnquiry(enq.id)}
                                className="p-1 text-slate-400 hover:text-red-600"
                                title="Delete Record"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </div>

                          <div className="text-xs text-slate-800 space-y-1">
                            <div className="font-bold text-[#FF6321]">
                              Requested Product: {enq.productName || 'General Machine Enquiry'}
                            </div>
                            <div className="bg-white/60 p-3 rounded-xl border border-slate-100 text-slate-700 leading-relaxed">
                              "{enq.message}"
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="p-12 text-center text-xs text-slate-500">
                      No enquiries received yet.
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* 4. LOGO EDITOR TAB */}
            {activeTab === 'logo' && settingsForm && (
              <div className="space-y-6 max-w-4xl">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h1 className="text-2xl font-black text-[#002B5B] flex items-center space-x-2">
                      <Palette className="w-6 h-6 text-[#FF6321]" />
                      <span>Logo Customization Studio</span>
                    </h1>
                    <p className="text-xs text-slate-600 mt-1">
                      Customize or replace the Jayadeva website logo, upload image files, or adjust brand title text.
                    </p>
                  </div>

                  <button
                    onClick={handleSaveSettings}
                    disabled={savingSettings}
                    className="px-5 py-2.5 bg-[#FF6321] hover:bg-[#e05316] text-white font-extrabold text-xs rounded-xl shadow-md transition-all flex items-center space-x-2 shrink-0"
                  >
                    <Save className="w-4 h-4" />
                    <span>{savingSettings ? 'Saving...' : 'Save Logo Changes'}</span>
                  </button>
                </div>

                {settingsMsg && (
                  <div className="p-3 bg-emerald-50/90 border border-emerald-200/80 text-emerald-800 text-xs rounded-xl font-bold flex items-center space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>{settingsMsg}</span>
                  </div>
                )}

                {/* LIVE PREVIEWS CARD */}
                <div className="bg-white/90 backdrop-blur-md p-6 rounded-2xl border border-white/80 shadow-lg space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                    <h2 className="font-extrabold text-[#002B5B] text-sm">Real-time Website Logo Previews</h2>
                    <span className="text-[11px] font-semibold text-slate-400">Updates live across all pages</span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Header Preview (Light Theme) */}
                    <div className="p-5 bg-white rounded-2xl border border-slate-200/80 shadow-xs flex flex-col justify-between">
                      <div className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider mb-3 flex items-center justify-between">
                        <span>Desktop Header Bar (Light)</span>
                        <span className="text-emerald-600 font-bold text-[9px] bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200/60">Live</span>
                      </div>
                      <div className="py-4 px-2 flex items-center justify-center bg-slate-50/50 rounded-xl border border-dashed border-slate-200">
                        <Logo
                          variant="header"
                          size="md"
                          customLogoUrl={settingsForm.logoUrl}
                          companyName={settingsForm.companyName}
                        />
                      </div>
                    </div>

                    {/* Footer Preview (Dark Theme) */}
                    <div className="p-5 bg-[#001733] text-white rounded-2xl border border-white/10 shadow-xs flex flex-col justify-between">
                      <div className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider mb-3 flex items-center justify-between">
                        <span>Footer & Dark Sections</span>
                        <span className="text-emerald-400 font-bold text-[9px] bg-emerald-950 px-2 py-0.5 rounded-full border border-emerald-800/60">Live</span>
                      </div>
                      <div className="py-4 px-2 flex items-center justify-center bg-[#000d1a]/80 rounded-xl border border-dashed border-white/10">
                        <Logo
                          variant="footer"
                          size="md"
                          customLogoUrl={settingsForm.logoUrl}
                          companyName={settingsForm.companyName}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* LOGO INPUT & UPLOAD CONTROLS */}
                <form onSubmit={handleSaveSettings} className="bg-white/90 backdrop-blur-md p-6 rounded-2xl border border-white/80 shadow-lg space-y-6">
                  {/* Upload Image Section */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="font-extrabold text-[#002B5B] text-sm">1. Choose Logo Source</h3>
                      {settingsForm.logoUrl && (
                        <button
                          type="button"
                          onClick={() => setSettingsForm({ ...settingsForm, logoUrl: '' })}
                          className="px-3 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-[11px] rounded-lg transition-colors"
                        >
                          Reset to Vector Lotus Emblem
                        </button>
                      )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Option A: Upload File */}
                      <div className="p-4 bg-slate-50/90 rounded-xl border border-slate-200/80 space-y-3">
                        <span className="text-xs font-bold text-[#002B5B] block">Option A: Upload Image File</span>
                        <p className="text-[11px] text-slate-500">
                          Upload your custom logo image (PNG, JPG, SVG, WebP format with transparent background).
                        </p>
                        <label className="cursor-pointer px-4 py-2.5 bg-[#002B5B] hover:bg-[#001e40] text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center justify-center space-x-2 w-full">
                          <Upload className="w-4 h-4" />
                          <span>{uploadingLogo ? 'Uploading Logo...' : 'Upload Logo Image'}</span>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleLogoUpload}
                            disabled={uploadingLogo}
                            className="hidden"
                          />
                        </label>
                      </div>

                      {/* Option B: Enter URL */}
                      <div className="p-4 bg-slate-50/90 rounded-xl border border-slate-200/80 space-y-3">
                        <span className="text-xs font-bold text-[#002B5B] block">Option B: Enter Image URL</span>
                        <p className="text-[11px] text-slate-500">
                          Paste a direct web link to an online logo image asset.
                        </p>
                        <input
                          type="url"
                          placeholder="https://example.com/logo.png"
                          value={settingsForm.logoUrl || ''}
                          onChange={(e) =>
                            setSettingsForm({ ...settingsForm, logoUrl: e.target.value })
                          }
                          className="w-full px-3.5 py-2 text-xs bg-white border border-slate-200/80 rounded-xl focus:ring-[#FF6321] focus:border-[#FF6321] outline-hidden"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Company Title & Subtitle Settings */}
                  <div className="space-y-4 pt-2 border-t border-slate-100">
                    <h3 className="font-extrabold text-[#002B5B] text-sm">2. Company Brand Name</h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          Primary Company Name
                        </label>
                        <input
                          type="text"
                          value={settingsForm.companyName}
                          onChange={(e) =>
                            setSettingsForm({ ...settingsForm, companyName: e.target.value })
                          }
                          className="w-full px-3.5 py-2 text-xs bg-slate-50/80 border border-slate-200/80 rounded-xl focus:ring-[#FF6321] focus:border-[#FF6321] outline-hidden font-bold"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          Tagline / Subtitle
                        </label>
                        <input
                          type="text"
                          value={settingsForm.tagline || ''}
                          onChange={(e) =>
                            setSettingsForm({ ...settingsForm, tagline: e.target.value })
                          }
                          className="w-full px-3.5 py-2 text-xs bg-slate-50/80 border border-slate-200/80 rounded-xl focus:ring-[#FF6321] focus:border-[#FF6321] outline-hidden"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Save Button */}
                  <div className="pt-2 flex justify-end">
                    <button
                      type="submit"
                      disabled={savingSettings}
                      className="px-6 py-3 bg-[#FF6321] hover:bg-[#e05316] text-white font-extrabold text-xs rounded-xl shadow-lg shadow-orange-500/20 transition-all flex items-center space-x-2"
                    >
                      <Save className="w-4 h-4" />
                      <span>{savingSettings ? 'Saving...' : 'Save & Apply Logo'}</span>
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* 5. SETTINGS TAB */}
            {activeTab === 'settings' && settingsForm && (
              <div className="space-y-6 max-w-3xl">
                <div>
                  <h1 className="text-2xl font-black text-[#002B5B]">Website Settings & Logo Customization</h1>
                  <p className="text-xs text-slate-600 mt-1">
                    Manage your company logo, branding text, contact details, and working hours.
                  </p>
                </div>

                <form onSubmit={handleSaveSettings} className="bg-white/80 backdrop-blur-md p-6 rounded-2xl border border-white/80 shadow-lg space-y-6">
                  {settingsMsg && (
                    <div className="p-3 bg-emerald-50/90 border border-emerald-200/80 text-emerald-800 text-xs rounded-xl font-bold">
                      {settingsMsg}
                    </div>
                  )}

                  {/* LOGO CUSTOMIZATION & UPLOAD SECTION */}
                  <div className="p-5 bg-slate-50/80 rounded-2xl border border-slate-200/80 space-y-4">
                    <div className="flex items-center justify-between border-b border-slate-200/80 pb-3">
                      <div>
                        <h3 className="font-extrabold text-[#002B5B] text-sm flex items-center space-x-2">
                          <span>Website Brand Logo</span>
                        </h3>
                        <p className="text-[11px] text-slate-500 mt-0.5">
                          Upload a custom logo image or customize the built-in Lotus emblem
                        </p>
                      </div>
                      {settingsForm.logoUrl && (
                        <button
                          type="button"
                          onClick={() => setSettingsForm({ ...settingsForm, logoUrl: '' })}
                          className="px-3 py-1 bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold text-[11px] rounded-lg transition-colors"
                        >
                          Reset to Vector Lotus Emblem
                        </button>
                      )}
                    </div>

                    {/* Live Logo Previews */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Light Header Preview */}
                      <div className="p-4 bg-white rounded-xl border border-slate-200/80 shadow-xs">
                        <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                          Header Preview (Light)
                        </div>
                        <div className="py-2 flex items-center justify-center">
                          <Logo
                            variant="header"
                            size="md"
                            customLogoUrl={settingsForm.logoUrl}
                            companyName={settingsForm.companyName}
                          />
                        </div>
                      </div>

                      {/* Dark Footer Preview */}
                      <div className="p-4 bg-[#001733] text-white rounded-xl border border-white/10 shadow-xs">
                        <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                          Footer Preview (Dark)
                        </div>
                        <div className="py-2 flex items-center justify-center">
                          <Logo
                            variant="footer"
                            size="md"
                            customLogoUrl={settingsForm.logoUrl}
                            companyName={settingsForm.companyName}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Logo Image Upload Control */}
                    <div className="space-y-3 pt-1">
                      <label className="block text-xs font-bold text-slate-700">
                        Upload Logo Image
                      </label>
                      <div className="flex flex-wrap items-center gap-3">
                        <label className="cursor-pointer px-4 py-2.5 bg-[#002B5B] hover:bg-[#001e40] text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center space-x-2">
                          <Upload className="w-4 h-4" />
                          <span>{uploadingLogo ? 'Uploading Logo...' : 'Choose Logo File'}</span>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleLogoUpload}
                            disabled={uploadingLogo}
                            className="hidden"
                          />
                        </label>
                        <span className="text-[11px] text-slate-500">
                          Supports PNG, JPG, SVG, WebP with transparent background
                        </span>
                      </div>

                      <div>
                        <label className="block text-[11px] font-semibold text-slate-600 mb-1 mt-2">
                          Or Direct Image URL
                        </label>
                        <input
                          type="url"
                          placeholder="https://example.com/logo.png"
                          value={settingsForm.logoUrl || ''}
                          onChange={(e) =>
                            setSettingsForm({ ...settingsForm, logoUrl: e.target.value })
                          }
                          className="w-full px-3.5 py-2 text-xs bg-white border border-slate-200/80 rounded-xl focus:ring-[#FF6321] focus:border-[#FF6321] outline-hidden"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Company Name
                    </label>
                    <input
                      type="text"
                      value={settingsForm.companyName}
                      onChange={(e) =>
                        setSettingsForm({ ...settingsForm, companyName: e.target.value })
                      }
                      className="w-full px-3.5 py-2.5 text-xs bg-white/90 border border-slate-200/80 rounded-xl focus:ring-[#FF6321] focus:border-[#FF6321] outline-hidden"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Primary Phone
                    </label>
                    <input
                      type="text"
                      value={settingsForm.phone1}
                      onChange={(e) =>
                        setSettingsForm({ ...settingsForm, phone1: e.target.value })
                      }
                      className="w-full px-3.5 py-2.5 text-xs bg-white/90 border border-slate-200/80 rounded-xl focus:ring-[#FF6321] focus:border-[#FF6321] outline-hidden"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      WhatsApp Number (Country code without +)
                    </label>
                    <input
                      type="text"
                      value={settingsForm.whatsAppNumber}
                      onChange={(e) =>
                        setSettingsForm({ ...settingsForm, whatsAppNumber: e.target.value })
                      }
                      className="w-full px-3.5 py-2.5 text-xs bg-white/90 border border-slate-200/80 rounded-xl focus:ring-[#FF6321] focus:border-[#FF6321] outline-hidden"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={settingsForm.email}
                      onChange={(e) =>
                        setSettingsForm({ ...settingsForm, email: e.target.value })
                      }
                      className="w-full px-3.5 py-2.5 text-xs bg-white/90 border border-slate-200/80 rounded-xl focus:ring-[#FF6321] focus:border-[#FF6321] outline-hidden"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Street Address
                    </label>
                    <input
                      type="text"
                      value={settingsForm.address}
                      onChange={(e) =>
                        setSettingsForm({ ...settingsForm, address: e.target.value })
                      }
                      className="w-full px-3.5 py-2.5 text-xs bg-white/90 border border-slate-200/80 rounded-xl focus:ring-[#FF6321] focus:border-[#FF6321] outline-hidden"
                      placeholder="#42, 1st Main, Industrial Suburb, Rajajinagar 2nd Stage"
                    />
                  </div>

                  <div className="grid grid-cols-3 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        City
                      </label>
                      <input
                        type="text"
                        value={settingsForm.city}
                        onChange={(e) =>
                          setSettingsForm({ ...settingsForm, city: e.target.value })
                        }
                        className="w-full px-3.5 py-2.5 text-xs bg-white/90 border border-slate-200/80 rounded-xl focus:ring-[#FF6321] focus:border-[#FF6321] outline-hidden"
                        placeholder="Bengaluru"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        State
                      </label>
                      <input
                        type="text"
                        value={settingsForm.state}
                        onChange={(e) =>
                          setSettingsForm({ ...settingsForm, state: e.target.value })
                        }
                        className="w-full px-3.5 py-2.5 text-xs bg-white/90 border border-slate-200/80 rounded-xl focus:ring-[#FF6321] focus:border-[#FF6321] outline-hidden"
                        placeholder="Karnataka"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Pincode
                      </label>
                      <input
                        type="text"
                        value={settingsForm.pincode}
                        onChange={(e) =>
                          setSettingsForm({ ...settingsForm, pincode: e.target.value })
                        }
                        className="w-full px-3.5 py-2.5 text-xs bg-white/90 border border-slate-200/80 rounded-xl focus:ring-[#FF6321] focus:border-[#FF6321] outline-hidden"
                        placeholder="560010"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Working Hours
                    </label>
                    <input
                      type="text"
                      value={settingsForm.workingHours || ''}
                      onChange={(e) =>
                        setSettingsForm({ ...settingsForm, workingHours: e.target.value })
                      }
                      className="w-full px-3.5 py-2.5 text-xs bg-white/90 border border-slate-200/80 rounded-xl focus:ring-[#FF6321] focus:border-[#FF6321] outline-hidden"
                    />
                  </div>

                  {/* PROPRIETOR DETAILS SECTION */}
                  <div className="pt-4 border-t border-slate-200/80 space-y-4">
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-black text-[#002B5B] uppercase tracking-wider">
                        Proprietor & Leadership Details
                      </h4>
                      <span className="text-[10px] bg-amber-100 text-amber-800 font-bold px-2 py-0.5 rounded-full">
                        Displayed on About & Contact Pages
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          Proprietor Name
                        </label>
                        <input
                          type="text"
                          value={settingsForm.proprietorName || ''}
                          onChange={(e) =>
                            setSettingsForm({ ...settingsForm, proprietorName: e.target.value })
                          }
                          className="w-full px-3.5 py-2.5 text-xs bg-white/90 border border-slate-200/80 rounded-xl focus:ring-[#FF6321] focus:border-[#FF6321] outline-hidden"
                          placeholder="Mr. Ravindra VD"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          Proprietor Title / Role
                        </label>
                        <input
                          type="text"
                          value={settingsForm.proprietorTitle || ''}
                          onChange={(e) =>
                            setSettingsForm({ ...settingsForm, proprietorTitle: e.target.value })
                          }
                          className="w-full px-3.5 py-2.5 text-xs bg-white/90 border border-slate-200/80 rounded-xl focus:ring-[#FF6321] focus:border-[#FF6321] outline-hidden"
                          placeholder="Proprietor & Managing Director"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          Proprietor Direct Phone
                        </label>
                        <input
                          type="text"
                          value={settingsForm.proprietorPhone || ''}
                          onChange={(e) =>
                            setSettingsForm({ ...settingsForm, proprietorPhone: e.target.value })
                          }
                          className="w-full px-3.5 py-2.5 text-xs bg-white/90 border border-slate-200/80 rounded-xl focus:ring-[#FF6321] focus:border-[#FF6321] outline-hidden"
                          placeholder="+91 93434 78096"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          Proprietor Direct Email
                        </label>
                        <input
                          type="email"
                          value={settingsForm.proprietorEmail || ''}
                          onChange={(e) =>
                            setSettingsForm({ ...settingsForm, proprietorEmail: e.target.value })
                          }
                          className="w-full px-3.5 py-2.5 text-xs bg-white/90 border border-slate-200/80 rounded-xl focus:ring-[#FF6321] focus:border-[#FF6321] outline-hidden"
                          placeholder="jayadevtech1@gmail.com"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Proprietor Bio / Leadership Message
                      </label>
                      <textarea
                        rows={3}
                        value={settingsForm.proprietorBio || ''}
                        onChange={(e) =>
                          setSettingsForm({ ...settingsForm, proprietorBio: e.target.value })
                        }
                        className="w-full px-3.5 py-2.5 text-xs bg-white/90 border border-slate-200/80 rounded-xl focus:ring-[#FF6321] focus:border-[#FF6321] outline-hidden"
                        placeholder="With over 20+ years of industrial machinery expertise..."
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Proprietor Profile Photo
                      </label>
                      <div className="flex items-center space-x-3">
                        {settingsForm.proprietorPhotoUrl && (
                          <img
                            src={settingsForm.proprietorPhotoUrl}
                            alt="Proprietor Preview"
                            referrerPolicy="no-referrer"
                            className="w-12 h-12 rounded-xl object-cover border border-slate-200 shrink-0"
                          />
                        )}
                        <input
                          type="text"
                          value={settingsForm.proprietorPhotoUrl || ''}
                          onChange={(e) =>
                            setSettingsForm({ ...settingsForm, proprietorPhotoUrl: e.target.value })
                          }
                          className="flex-1 px-3.5 py-2.5 text-xs bg-white/90 border border-slate-200/80 rounded-xl focus:ring-[#FF6321] focus:border-[#FF6321] outline-hidden"
                          placeholder="https://... or upload photo"
                        />
                        <label className="px-3.5 py-2.5 bg-slate-100 hover:bg-slate-200 border border-slate-200 rounded-xl text-xs font-bold text-slate-700 cursor-pointer shrink-0 transition-all flex items-center space-x-1">
                          <Upload className="w-3.5 h-3.5" />
                          <span>{uploadingProprietorPhoto ? 'Uploading...' : 'Upload Photo'}</span>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleProprietorPhotoUpload}
                            className="hidden"
                          />
                        </label>
                      </div>
                    </div>
                  </div>

                  {/* SHOP & SHOWROOM PHOTOS GALLERY SECTION */}
                  <div className="pt-4 border-t border-slate-200/80 space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-sm font-black text-[#002B5B] uppercase tracking-wider">
                          Shop & Showroom Photos Gallery
                        </h4>
                        <p className="text-xs text-slate-500">
                          Photos of your store, machinery showroom floor, workshop, and spare parts depot.
                        </p>
                      </div>
                      <label className="px-3.5 py-2 bg-[#002B5B] hover:bg-[#001733] text-white rounded-xl text-xs font-bold cursor-pointer transition-all flex items-center space-x-1">
                        <Upload className="w-3.5 h-3.5" />
                        <span>{uploadingShopPhoto ? 'Uploading...' : 'Add Shop Photo'}</span>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleShopPhotoUpload}
                          className="hidden"
                        />
                      </label>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      {(settingsForm.shopPhotos || []).map((photoUrl, index) => (
                        <div
                          key={index}
                          className="relative aspect-4/3 rounded-xl overflow-hidden border border-slate-200 group bg-slate-100"
                        >
                          <img
                            src={photoUrl}
                            alt={`Shop Photo ${index + 1}`}
                            referrerPolicy="no-referrer"
                            className="w-full h-full object-cover"
                          />
                          <button
                            type="button"
                            onClick={() => {
                              const updatedPhotos = (settingsForm.shopPhotos || []).filter((_, i) => i !== index);
                              setSettingsForm({ ...settingsForm, shopPhotos: updatedPhotos });
                            }}
                            className="absolute top-1.5 right-1.5 p-1.5 bg-red-600 text-white rounded-lg opacity-0 group-hover:opacity-100 transition-opacity shadow-md"
                            title="Remove Photo"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={savingSettings}
                      className="px-6 py-3 bg-[#FF6321] hover:bg-[#e85a1e] text-white font-bold text-xs rounded-xl transition-all flex items-center space-x-2 shadow-lg shadow-orange-500/20"
                    >
                      <Save className="w-4 h-4" />
                      <span>{savingSettings ? 'Saving...' : 'Save Website Settings'}</span>
                    </button>
                  </div>
                </form>
              </div>
            )}

            {activeTab === 'security' && (
              <div className="space-y-6">
                {/* SECURITY STATUS OVERVIEW */}
                <div className="bg-white/80 backdrop-blur-md rounded-2xl p-6 border border-white/80 shadow-lg">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="p-2.5 bg-emerald-100 text-emerald-800 rounded-xl">
                      <ShieldCheck className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-extrabold text-[#002B5B] text-base">System Security Controls</h3>
                      <p className="text-xs text-slate-500">
                        Active protective layers defending your application and customer data
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
                    <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-xl flex items-start space-x-3">
                      <Lock className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                      <div>
                        <span className="text-xs font-black text-emerald-900 block">Rate Limiting</span>
                        <span className="text-[11px] text-emerald-700">Brute-force & spam flood protection active</span>
                      </div>
                    </div>

                    <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-xl flex items-start space-x-3">
                      <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                      <div>
                        <span className="text-xs font-black text-emerald-900 block">HTTP Security</span>
                        <span className="text-[11px] text-emerald-700">Nosniff, SameOrigin & HSTS headers</span>
                      </div>
                    </div>

                    <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-xl flex items-start space-x-3">
                      <Key className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                      <div>
                        <span className="text-xs font-black text-emerald-900 block">Secure Cookies</span>
                        <span className="text-[11px] text-emerald-700">HttpOnly, SameSite lax auth tokens</span>
                      </div>
                    </div>

                    <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-xl flex items-start space-x-3">
                      <ShieldAlert className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                      <div>
                        <span className="text-xs font-black text-emerald-900 block">Input Sanitization</span>
                        <span className="text-[11px] text-emerald-700">MIME type filtering & XSS escaping</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* CHANGE PASSWORD CARD */}
                <div className="bg-white/80 backdrop-blur-md rounded-2xl p-6 border border-white/80 shadow-lg max-w-xl">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="p-2 bg-[#002B5B] text-white rounded-xl">
                      <Lock className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-extrabold text-[#002B5B] text-base">Change Admin Password</h3>
                      <p className="text-xs text-slate-500">Update your account credentials using salted bcrypt hashing</p>
                    </div>
                  </div>

                  {pwdMsg && (
                    <div
                      className={`p-3.5 rounded-xl text-xs font-bold mb-4 flex items-center space-x-2 ${
                        pwdMsg.type === 'success'
                          ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                          : 'bg-red-100 text-red-800 border border-red-300'
                      }`}
                    >
                      <ShieldCheck className="w-4 h-4 shrink-0" />
                      <span>{pwdMsg.text}</span>
                    </div>
                  )}

                  <form onSubmit={handleChangePassword} className="space-y-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Current Password *
                      </label>
                      <input
                        type="password"
                        value={currPassword}
                        onChange={(e) => setCurrPassword(e.target.value)}
                        required
                        className="w-full px-3.5 py-2.5 text-xs bg-white/90 border border-slate-200/80 rounded-xl focus:ring-[#FF6321] focus:border-[#FF6321] outline-hidden"
                        placeholder="••••••••"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        New Password (Min. 8 characters) *
                      </label>
                      <input
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        required
                        minLength={8}
                        className="w-full px-3.5 py-2.5 text-xs bg-white/90 border border-slate-200/80 rounded-xl focus:ring-[#FF6321] focus:border-[#FF6321] outline-hidden"
                        placeholder="••••••••"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Confirm New Password *
                      </label>
                      <input
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                        minLength={8}
                        className="w-full px-3.5 py-2.5 text-xs bg-white/90 border border-slate-200/80 rounded-xl focus:ring-[#FF6321] focus:border-[#FF6321] outline-hidden"
                        placeholder="••••••••"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={pwdLoading}
                      className="w-full py-3 bg-[#002B5B] hover:bg-[#001733] text-white font-bold text-xs rounded-xl transition-all shadow-md flex items-center justify-center space-x-2"
                    >
                      <Lock className="w-4 h-4" />
                      <span>{pwdLoading ? 'Updating Password...' : 'Update Password'}</span>
                    </button>
                  </form>
                </div>
              </div>
            )}
          </>
        )}
      </main>

      {/* ADD / EDIT PRODUCT MODAL */}
      {showProductModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white/90 backdrop-blur-xl rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-white/80">
            <div className="px-6 py-4 border-b border-slate-200/80 flex items-center justify-between sticky top-0 bg-white/90 backdrop-blur-md z-10">
              <h3 className="font-extrabold text-[#002B5B] text-base">
                {editingProduct ? 'Edit Machine Product' : 'Add New Machine Product'}
              </h3>
              <button
                onClick={() => setShowProductModal(false)}
                className="p-1 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveProduct} className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Brand *
                  </label>
                  <select
                    value={formBrand}
                    onChange={(e) => setFormBrand(e.target.value as BrandType)}
                    className="w-full px-3.5 py-2.5 text-xs bg-white/90 border border-slate-200/80 rounded-xl"
                  >
                    <option value="Sunshine">Sunshine</option>
                    <option value="Shunfa">Shunfa</option>
                    <option value="Jayadeva">Jayadeva</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Category *
                  </label>
                  <select
                    value={formCategory}
                    onChange={(e) => setFormCategory(e.target.value as CategoryType)}
                    className="w-full px-3.5 py-2.5 text-xs bg-white/90 border border-slate-200/80 rounded-xl"
                  >
                    <option value="Embroidery Machines">Embroidery Machines</option>
                    <option value="Lockstitch">Lockstitch</option>
                    <option value="Overlock">Overlock</option>
                    <option value="Interlock">Interlock</option>
                    <option value="Heavy Duty">Heavy Duty</option>
                    <option value="Special Machines">Special Machines</option>
                    <option value="Accessories & Threads">Accessories & Threads</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Product Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formName}
                    onChange={(e) => setFormName(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs bg-white/90 border border-slate-200/80 rounded-xl"
                    placeholder="e.g. Sunshine Pro High Speed Multi-Head"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Model Number *
                  </label>
                  <input
                    type="text"
                    required
                    value={formModel}
                    onChange={(e) => setFormModel(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs bg-white/90 border border-slate-200/80 rounded-xl font-mono"
                    placeholder="e.g. SUN-1202 Pro / S310"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Description
                </label>
                <textarea
                  rows={3}
                  value={formDescription}
                  onChange={(e) => setFormDescription(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs bg-white/90 border border-slate-200/80 rounded-xl"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Specifications (One per line as Key: Value)
                  </label>
                  <textarea
                    rows={4}
                    value={formSpecsText}
                    onChange={(e) => setFormSpecsText(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs bg-white/90 border border-slate-200/80 rounded-xl font-mono"
                    placeholder="Max Speed: 1200 RPM&#10;Needles: 12 Needles"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Key Features (One per line)
                  </label>
                  <textarea
                    rows={4}
                    value={formFeaturesText}
                    onChange={(e) => setFormFeaturesText(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs bg-white/90 border border-slate-200/80 rounded-xl"
                    placeholder="Auto thread trimmer&#10;Direct drive servo motor"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 items-center">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Price (Optional in ₹)
                  </label>
                  <input
                    type="number"
                    value={formPrice}
                    onChange={(e) => setFormPrice(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs bg-white/90 border border-slate-200/80 rounded-xl"
                    placeholder="e.g. 150000"
                  />
                </div>

                <div className="pt-5">
                  <label className="flex items-center space-x-2 text-xs font-bold text-slate-800 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formShowPrice}
                      onChange={(e) => setFormShowPrice(e.target.checked)}
                      className="rounded text-[#FF6321] focus:ring-[#FF6321]"
                    />
                    <span>Show Price on Product Card (Default is Hidden)</span>
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Main Image URL
                </label>
                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={formMainImage}
                    onChange={(e) => setFormMainImage(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs bg-white/90 border border-slate-200/80 rounded-xl"
                  />
                  <label className="px-3.5 py-2.5 bg-white/80 hover:bg-slate-100 text-slate-800 font-bold text-xs rounded-xl border border-slate-200/80 cursor-pointer flex items-center space-x-1 shrink-0">
                    <Upload className="w-3.5 h-3.5" />
                    <span>{uploadingImage ? 'Uploading...' : 'Upload'}</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>

              <div className="flex items-center space-x-4 pt-2">
                <label className="flex items-center space-x-2 text-xs font-bold text-slate-800 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formPublished}
                    onChange={(e) => setFormPublished(e.target.checked)}
                    className="rounded text-emerald-600 focus:ring-emerald-500"
                  />
                  <span>Publish Product on Website</span>
                </label>
              </div>

              <div className="pt-4 border-t border-slate-200/80 flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setShowProductModal(false)}
                  className="px-4 py-2 bg-slate-100/80 hover:bg-slate-200/80 text-slate-800 font-bold text-xs rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-[#FF6321] hover:bg-[#e85a1e] text-white font-bold text-xs rounded-xl shadow-md"
                >
                  Save Product
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
