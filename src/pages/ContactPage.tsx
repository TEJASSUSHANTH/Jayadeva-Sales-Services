import React, { useState } from 'react';
import { Phone, Mail, MapPin, Clock, MessageSquare, Send, CheckCircle2, Globe } from 'lucide-react';
import { WebsiteSettings, Product } from '../types';
import { submitEnquiry } from '../lib/api';

interface ContactPageProps {
  settings: WebsiteSettings;
  products: Product[];
}

export const ContactPage: React.FC<ContactPageProps> = ({ settings, products }) => {
  const [customerName, setCustomerName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [selectedProductId, setSelectedProductId] = useState('');
  const [message, setMessage] = useState('');

  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const publishedProducts = products.filter((p) => p.published);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName.trim() || !phone.trim() || !message.trim()) {
      setErrorMsg('Please fill in Name, Phone, and Message.');
      return;
    }

    setSubmitting(true);
    setErrorMsg('');

    const selectedProd = publishedProducts.find((p) => p.id === selectedProductId);

    try {
      await submitEnquiry({
        customerName,
        phone,
        email,
        productName: selectedProd ? `${selectedProd.brand} ${selectedProd.name} (${selectedProd.model})` : 'General Machine Enquiry',
        productId: selectedProductId || undefined,
        message,
      });
      setSubmitted(true);
      setCustomerName('');
      setPhone('');
      setEmail('');
      setSelectedProductId('');
      setMessage('');
    } catch (err: any) {
      setErrorMsg(err.message || 'Failed to submit enquiry. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleWhatsAppClick = () => {
    const text = encodeURIComponent(
      'Hello Jayadeva Sales & Services, I am interested in your machines. Please share more details.'
    );
    window.open(`https://wa.me/${settings.whatsAppNumber}?text=${text}`, '_blank');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Header */}
      <div className="border-b border-slate-200/80 pb-6">
        <h1 className="text-3xl sm:text-4xl font-black text-[#002B5B] tracking-tight">
          CONTACT US
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 mt-2 max-w-3xl">
          Get in touch with Jayadeva Sales & Services for price quotations, machine demonstrations, service requests, and spare parts.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Left Column: Contact Cards & Info */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white/80 backdrop-blur-md border border-white/80 rounded-2xl p-6 space-y-6 shadow-lg">
            <h2 className="text-xl font-extrabold text-[#002B5B] border-b border-slate-200/80 pb-3">
              Jayadeva Sales & Services
            </h2>

            <ul className="space-y-4 text-xs text-slate-700">
              <li className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-[#FF6321] shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-[#002B5B] text-sm">Address</div>
                  <div className="text-slate-600 mt-0.5 leading-relaxed">
                    {settings.address}, {settings.city}, {settings.state} - {settings.pincode}
                  </div>
                </div>
              </li>

              <li className="flex items-start space-x-3">
                <Phone className="w-5 h-5 text-[#FF6321] shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-[#002B5B] text-sm">Phone</div>
                  <div className="text-slate-600 mt-0.5">
                    {settings.phone1} {settings.phone2 ? `/ ${settings.phone2}` : ''}
                  </div>
                </div>
              </li>

              <li className="flex items-start space-x-3">
                <MessageSquare className="w-5 h-5 text-[#008080] shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-[#002B5B] text-sm">WhatsApp</div>
                  <div className="text-slate-600 mt-0.5">
                    +{settings.whatsAppNumber}
                  </div>
                  <button
                    onClick={handleWhatsAppClick}
                    className="mt-1 text-[#008080] font-bold hover:underline inline-flex items-center space-x-1"
                  >
                    <span>Click to chat on WhatsApp</span>
                  </button>
                </div>
              </li>

              <li className="flex items-start space-x-3">
                <Mail className="w-5 h-5 text-[#FF6321] shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-[#002B5B] text-sm">Email</div>
                  <div className="text-slate-600 mt-0.5">{settings.email}</div>
                </div>
              </li>

              <li className="flex items-start space-x-3">
                <Clock className="w-5 h-5 text-[#FF6321] shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-[#002B5B] text-sm">Working Hours</div>
                  <div className="text-slate-600 mt-0.5">{settings.workingHours}</div>
                </div>
              </li>
            </ul>
          </div>

          {/* Proprietor Direct Contact Card */}
          <div className="bg-gradient-to-br from-[#002B5B] to-[#001733] text-white rounded-2xl p-5 shadow-lg space-y-3 border border-amber-400/30">
            <div className="flex items-center space-x-3.5">
              <div className="w-14 h-14 rounded-xl overflow-hidden border-2 border-amber-400/80 bg-slate-800 shrink-0">
                <img
                  src={settings.proprietorPhotoUrl || 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=800&q=80'}
                  alt={settings.proprietorName || 'Mr. Ravindra VD'}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <span className="text-[10px] font-black uppercase tracking-wider text-amber-400 block">
                  Proprietor Contact
                </span>
                <h3 className="text-base font-extrabold text-white">
                  {settings.proprietorName || 'Mr. Ravindra VD'}
                </h3>
                <p className="text-xs text-slate-300">
                  {settings.proprietorTitle || 'Proprietor & Managing Director'}
                </p>
              </div>
            </div>

            <div className="pt-2 border-t border-white/10 flex items-center justify-between gap-2 text-xs">
              <a
                href={`tel:${settings.proprietorPhone || settings.phone1}`}
                className="flex-1 py-2 px-3 bg-[#FF6321] hover:bg-orange-600 text-white font-bold rounded-xl text-center transition-all"
              >
                Call Proprietor
              </a>
              <a
                href={`https://wa.me/${settings.whatsAppNumber}?text=Hello%20${encodeURIComponent(settings.proprietorName || 'Mr. Ravindra VD')},%20I%20have%20an%20enquiry%20regarding%20machines.`}
                target="_blank"
                rel="noreferrer"
                className="flex-1 py-2 px-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-center transition-all"
              >
                WhatsApp Direct
              </a>
            </div>
          </div>

          {/* Map Embed Container */}
          <div className="bg-white/80 rounded-2xl border border-white/80 overflow-hidden shadow-lg h-64 backdrop-blur-md">
            <iframe
              title="Jayadeva Sales & Services Location"
              src={settings.googleMapsEmbedUrl}
              className="w-full h-full border-0"
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>

        {/* Right Column: Interactive Enquiry Form */}
        <div className="lg:col-span-7 bg-white/80 backdrop-blur-md rounded-2xl border border-white/80 p-6 sm:p-8 shadow-lg">
          <h2 className="text-2xl font-extrabold text-[#002B5B] mb-2">
            Send Us An Enquiry
          </h2>
          <p className="text-xs text-slate-600 mb-6">
            Fill out the form below for machine pricing, technical specification sheets, or service appointment requests.
          </p>

          {submitted ? (
            <div className="bg-emerald-50/90 border border-emerald-200/80 rounded-2xl p-8 text-center space-y-4 backdrop-blur-xs">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center mx-auto shadow-md">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h3 className="text-2xl font-extrabold text-[#002B5B]">
                Thank you. We will contact you shortly.
              </h3>
              <p className="text-xs text-slate-600 max-w-md mx-auto leading-relaxed">
                Your enquiry has been received by Jayadeva Sales & Services. Our sales executive will review your request and get back to you promptly.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="mt-2 px-6 py-2.5 bg-[#002B5B] hover:bg-[#001f42] text-white font-bold text-xs rounded-xl transition-all shadow-md"
              >
                Send Another Enquiry
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {errorMsg && (
                <div className="p-3 bg-red-50/90 border border-red-200/80 text-red-700 text-xs rounded-xl font-medium">
                  {errorMsg}
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Enter your full name"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs bg-white/90 border border-slate-200/80 rounded-xl focus:ring-2 focus:ring-[#FF6321] focus:border-[#FF6321] outline-hidden"
                    id="input-contact-name"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Phone Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="10-digit mobile number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs bg-white/90 border border-slate-200/80 rounded-xl focus:ring-2 focus:ring-[#FF6321] focus:border-[#FF6321] outline-hidden"
                    id="input-contact-phone"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  placeholder="name@company.com (optional)"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs bg-white/90 border border-slate-200/80 rounded-xl focus:ring-2 focus:ring-[#FF6321] focus:border-[#FF6321] outline-hidden"
                  id="input-contact-email"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Product / Machine Interest
                </label>
                <select
                  value={selectedProductId}
                  onChange={(e) => setSelectedProductId(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs bg-white/90 border border-slate-200/80 rounded-xl focus:ring-2 focus:ring-[#FF6321] focus:border-[#FF6321] outline-hidden"
                  id="select-contact-product"
                >
                  <option value="">General Machine / Service Enquiry</option>
                  {publishedProducts.map((p) => (
                    <option key={p.id} value={p.id}>
                      [{p.brand}] {p.name} ({p.model})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Message <span className="text-red-500">*</span>
                </label>
                <textarea
                  rows={4}
                  required
                  placeholder="Describe your machine requirement, fabric type, or service request..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs bg-white/90 border border-slate-200/80 rounded-xl focus:ring-2 focus:ring-[#FF6321] focus:border-[#FF6321] outline-hidden"
                  id="input-contact-message"
                />
              </div>

              <div>
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full sm:w-auto px-8 py-3 bg-[#FF6321] hover:bg-[#e85a1e] text-white font-bold text-xs rounded-xl transition-all flex items-center justify-center space-x-2 shadow-lg shadow-orange-500/25 disabled:opacity-50"
                  id="btn-submit-contact-enquiry"
                >
                  <Send className="w-4 h-4" />
                  <span>{submitting ? 'Sending...' : 'Send Enquiry'}</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
