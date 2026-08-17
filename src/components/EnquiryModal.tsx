import React, { useState } from 'react';
import { X, Send, CheckCircle2, Truck, MessageSquare, ExternalLink } from 'lucide-react';
import { Product, WebsiteSettings } from '../types';
import { submitEnquiry } from '../lib/api';

interface EnquiryModalProps {
  product?: Product | null;
  onClose: () => void;
  settings?: WebsiteSettings;
}

export const EnquiryModal: React.FC<EnquiryModalProps> = ({ product, onClose, settings }) => {
  const [customerName, setCustomerName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState(
    product
      ? `Hello, I would like to request a price quotation and specification sheet for ${product.brand} ${product.name} (Model: ${product.model}).`
      : 'Hello Jayadeva Sales & Services, I am looking for industrial sewing / embroidery machines and service.'
  );

  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [waUrl, setWaUrl] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const buildWhatsAppUrl = (name: string, phoneNum: string, userEmail: string, prodName: string, reqMsg: string) => {
    const targetWhatsApp = settings?.whatsAppNumber || '919343478096';
    const lines = [
      `*NEW QUOTE REQUEST - JAYADEVA SALES & SERVICES*`,
      `──────────────────────────`,
      `📌 *Product / Subject:* ${prodName}`,
      `👤 *Customer Name:* ${name}`,
      `📞 *Phone:* ${phoneNum}`,
      `✉️ *Email:* ${userEmail.trim() || 'Not provided'}`,
      `💬 *Requirements:*`,
      `"${reqMsg}"`,
      `──────────────────────────`,
      `Please provide price quotation and machine details on WhatsApp.`
    ];
    return `https://wa.me/${targetWhatsApp}?text=${encodeURIComponent(lines.join('\n'))}`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName.trim() || !phone.trim() || !message.trim()) {
      setErrorMsg('Please fill in Name, Phone Number, and Requirements.');
      return;
    }

    setSubmitting(true);
    setErrorMsg('');

    const prodTitle = product ? `${product.brand} ${product.name} (${product.model})` : 'General Machine & Service Enquiry';
    const generatedWaUrl = buildWhatsAppUrl(customerName, phone, email, prodTitle, message);
    setWaUrl(generatedWaUrl);

    try {
      await submitEnquiry({
        customerName,
        phone,
        email,
        productName: prodTitle,
        productId: product?.id,
        message,
      });
    } catch (err: any) {
      console.warn('Backend enquiry save warning:', err);
    } finally {
      // Auto redirect to WhatsApp
      window.open(generatedWaUrl, '_blank');
      setSubmitted(true);
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white/95 backdrop-blur-xl rounded-2xl max-w-lg w-full shadow-2xl border border-white/80 overflow-hidden relative animate-fadeIn">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#002B5B] to-[#001733] text-white p-5 flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <div className="p-2 bg-emerald-500/20 border border-emerald-400/40 rounded-xl text-emerald-400">
              <MessageSquare className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-lg leading-tight">Request Quote on WhatsApp</h3>
              <p className="text-xs text-slate-300 mt-0.5">
                {product ? `${product.brand} ${product.model}` : 'Jayadeva Sales & Services'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
            id="btn-close-enquiry-modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body or Success View */}
        <div className="p-6">
          {submitted ? (
            <div className="text-center py-6 space-y-5">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center mx-auto shadow-md">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div>
                <h4 className="text-xl font-extrabold text-[#002B5B]">
                  Quote Details Ready for WhatsApp!
                </h4>
                <p className="text-xs text-slate-600 max-w-xs mx-auto leading-relaxed mt-1">
                  Your filled quote information has been formatted and opened directly in WhatsApp.
                </p>
              </div>

              {/* Quote Summary Box */}
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-left text-xs space-y-2 text-slate-700">
                <div className="font-bold text-[#002B5B] text-xs border-b border-slate-200 pb-1.5">
                  Summary of Details Sent:
                </div>
                <div><span className="font-semibold text-slate-900">Name:</span> {customerName}</div>
                <div><span className="font-semibold text-slate-900">Phone:</span> {phone}</div>
                {email && <div><span className="font-semibold text-slate-900">Email:</span> {email}</div>}
                <div><span className="font-semibold text-slate-900">Item:</span> {product ? `${product.brand} ${product.model}` : 'General Enquiry'}</div>
                <div className="line-clamp-2"><span className="font-semibold text-slate-900">Message:</span> "{message}"</div>
              </div>

              <div className="space-y-2 pt-2">
                <a
                  href={waUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3.5 px-4 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs rounded-xl transition-all flex items-center justify-center space-x-2 shadow-lg shadow-emerald-600/25"
                  id="btn-reopen-whatsapp"
                >
                  <MessageSquare className="w-4 h-4 fill-white" />
                  <span>Open WhatsApp Chat Now</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>

                <button
                  onClick={onClose}
                  className="w-full py-2.5 px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl transition-all"
                  id="btn-enquiry-done"
                >
                  Close Window
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {errorMsg && (
                <div className="p-3 bg-red-50/90 border border-red-200/80 text-red-700 text-xs rounded-xl font-medium">
                  {errorMsg}
                </div>
              )}

              {product && (
                <div className="bg-amber-50/80 border border-amber-200/80 rounded-xl p-3 text-xs flex items-center space-x-3 backdrop-blur-xs">
                  <img
                    src={product.mainImage}
                    alt={product.name}
                    referrerPolicy="no-referrer"
                    className="w-12 h-12 object-cover rounded-lg border border-amber-200/80 shrink-0"
                  />
                  <div>
                    <div className="font-bold text-[#002B5B]">{product.name}</div>
                    <div className="text-[11px] text-slate-600">Model: {product.model}</div>
                  </div>
                </div>
              )}

              {/* Transportation Note */}
              <div className="bg-amber-50/90 border border-amber-200/90 rounded-xl p-2.5 text-xs text-[#002B5B] flex items-start space-x-2">
                <Truck className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                <div>
                  <span className="font-extrabold">Pan-India Delivery:</span> Doorstep delivery available across all states in India. Freight billed based on delivery location.
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Your Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="Enter your full name"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-hidden"
                  id="input-enquiry-name"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  WhatsApp / Mobile Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  required
                  placeholder="Enter 10-digit mobile number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-hidden"
                  id="input-enquiry-phone"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Email Address <span className="text-slate-400 font-normal">(Optional)</span>
                </label>
                <input
                  type="email"
                  placeholder="Enter email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-hidden"
                  id="input-enquiry-email"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Quote Requirements & Details <span className="text-red-500">*</span>
                </label>
                <textarea
                  rows={3}
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-hidden"
                  id="input-enquiry-message"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-3.5 px-4 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs rounded-xl transition-all flex items-center justify-center space-x-2 shadow-lg shadow-emerald-600/25 disabled:opacity-50 cursor-pointer"
                  id="btn-submit-enquiry"
                >
                  <MessageSquare className="w-4 h-4 fill-white" />
                  <span>{submitting ? 'Formatting Quote...' : 'Submit Quote & Send via WhatsApp'}</span>
                  <Send className="w-3.5 h-3.5 ml-1" />
                </button>
                <p className="text-[11px] text-center text-slate-500 mt-2">
                  Submitting will format your quote and open WhatsApp directly with our sales team.
                </p>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

