import React, { useState } from 'react';
import { X, Send, CheckCircle2, Truck } from 'lucide-react';
import { Product } from '../types';
import { submitEnquiry } from '../lib/api';

interface EnquiryModalProps {
  product?: Product | null;
  onClose: () => void;
}

export const EnquiryModal: React.FC<EnquiryModalProps> = ({ product, onClose }) => {
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
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName.trim() || !phone.trim() || !message.trim()) {
      setErrorMsg('Please fill in Name, Phone, and Message.');
      return;
    }

    setSubmitting(true);
    setErrorMsg('');

    try {
      await submitEnquiry({
        customerName,
        phone,
        email,
        productName: product ? `${product.brand} ${product.name} (${product.model})` : 'General Machine Enquiry',
        productId: product?.id,
        message,
      });
      setSubmitted(true);
    } catch (err: any) {
      setErrorMsg(err.message || 'Submission failed. Please try again or contact via WhatsApp.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white/90 backdrop-blur-xl rounded-2xl max-w-lg w-full shadow-2xl border border-white/80 overflow-hidden relative animate-fadeIn">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#002B5B] to-[#001733] text-white p-5 flex items-center justify-between">
          <div>
            <h3 className="font-extrabold text-lg">Request Machine Quote</h3>
            <p className="text-xs text-slate-300 mt-0.5">
              {product ? `${product.brand} ${product.model}` : 'Jayadeva Sales & Services'}
            </p>
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
            <div className="text-center py-8 space-y-4">
              <div className="w-16 h-16 bg-emerald-100/90 text-emerald-600 rounded-2xl flex items-center justify-center mx-auto shadow-md">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h4 className="text-xl font-extrabold text-[#002B5B]">
                Thank you. We will contact you shortly.
              </h4>
              <p className="text-xs text-slate-600 max-w-xs mx-auto leading-relaxed">
                Our sales representative will get in touch with you shortly on your phone number.
              </p>
              <button
                onClick={onClose}
                className="mt-4 px-6 py-2.5 bg-[#002B5B] hover:bg-[#001f42] text-white font-bold text-xs rounded-xl transition-all shadow-md"
                id="btn-enquiry-done"
              >
                Close Window
              </button>
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
                    className="w-12 h-12 object-cover rounded-lg border border-amber-200/80"
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
                  <span className="font-extrabold">Pan-India Shipping Notice:</span> Doorstep delivery available across all states in India. Transportation and freight charges are billed separately based on delivery location and machine requirements.
                </div>
              </div>

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
                  className="w-full px-3.5 py-2.5 text-xs bg-white/90 border border-slate-200/80 rounded-xl focus:ring-2 focus:ring-[#002B5B] focus:border-[#002B5B] outline-hidden"
                  id="input-enquiry-name"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Phone Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  required
                  placeholder="Enter 10-digit mobile number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs bg-white/90 border border-slate-200/80 rounded-xl focus:ring-2 focus:ring-[#002B5B] focus:border-[#002B5B] outline-hidden"
                  id="input-enquiry-phone"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  placeholder="Enter email address (optional)"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs bg-white/90 border border-slate-200/80 rounded-xl focus:ring-2 focus:ring-[#002B5B] focus:border-[#002B5B] outline-hidden"
                  id="input-enquiry-email"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Message / Requirements <span className="text-red-500">*</span>
                </label>
                <textarea
                  rows={3}
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs bg-white/90 border border-slate-200/80 rounded-xl focus:ring-2 focus:ring-[#002B5B] focus:border-[#002B5B] outline-hidden"
                  id="input-enquiry-message"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-3 px-4 bg-[#002B5B] hover:bg-[#001d3d] text-white font-bold text-xs rounded-xl transition-all flex items-center justify-center space-x-2 shadow-lg shadow-blue-900/20 disabled:opacity-50"
                  id="btn-submit-enquiry"
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
