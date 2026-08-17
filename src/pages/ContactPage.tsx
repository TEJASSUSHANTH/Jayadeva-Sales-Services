import React, { useState } from 'react';
import { Phone, Mail, MapPin, Clock, MessageSquare, Send, CheckCircle2, Globe, Navigation, ExternalLink, Copy, Check } from 'lucide-react';
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

  const [copied, setCopied] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const [lastSubmittedQuote, setLastSubmittedQuote] = useState<{
    name: string;
    phone: string;
    product: string;
    msg: string;
    waUrl: string;
  } | null>(null);

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
    const prodTitle = selectedProd ? `${selectedProd.brand} ${selectedProd.name} (${selectedProd.model})` : 'General Machine & Service Enquiry';

    const targetWhatsApp = settings?.whatsAppNumber || '919343478096';
    const lines = [
      `*NEW QUOTE ENQUIRY - JAYADEVA SALES & SERVICES*`,
      `──────────────────────────`,
      `📌 *Product / Subject:* ${prodTitle}`,
      `👤 *Customer Name:* ${customerName}`,
      `📞 *Phone Number:* ${phone}`,
      `✉️ *Email:* ${email.trim() || 'Not provided'}`,
      `💬 *Requirements / Message:*`,
      `"${message}"`,
      `──────────────────────────`,
      `Please provide machine price quote and specifications on WhatsApp.`
    ];
    const generatedWaUrl = `https://wa.me/${targetWhatsApp}?text=${encodeURIComponent(lines.join('\n'))}`;

    try {
      await submitEnquiry({
        customerName,
        phone,
        email,
        productName: prodTitle,
        productId: selectedProductId || undefined,
        message,
      });
    } catch (err: any) {
      console.warn('Backend save warning:', err);
    } finally {
      // Auto open WhatsApp
      window.open(generatedWaUrl, '_blank');

      setLastSubmittedQuote({
        name: customerName,
        phone: phone,
        product: prodTitle,
        msg: message,
        waUrl: generatedWaUrl,
      });

      setSubmitted(true);
      setCustomerName('');
      setPhone('');
      setEmail('');
      setSelectedProductId('');
      setMessage('');
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
          <div className="bg-gradient-to-br from-[#002B5B] to-[#001733] text-white rounded-2xl p-5 shadow-lg space-y-4 border border-amber-400/30">
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4">
              <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-2xl overflow-hidden border-2 border-amber-400/80 shadow-xl bg-slate-800 shrink-0">
                <img
                  src={settings.proprietorPhotoUrl || 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=800&q=80'}
                  alt={settings.proprietorName || 'Mr. Ravindra VD'}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-top"
                />
              </div>
              <div className="text-center sm:text-left">
                <span className="text-[10px] font-black uppercase tracking-wider text-amber-400 block mb-0.5">
                  Proprietor Direct Contact
                </span>
                <h3 className="text-lg font-extrabold text-white">
                  {settings.proprietorName || 'Mr. Ravindra VD'}
                </h3>
                <p className="text-xs text-slate-300 font-medium">
                  {settings.proprietorTitle || 'Proprietor & Managing Director'}
                </p>
                <p className="text-[11px] text-slate-300 mt-2 line-clamp-2 italic">
                  "{settings.proprietorBio || 'Karnataka authorized sales and service dealer.'}"
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

          {/* Interactive Google Map & Directions Card */}
          <div className="bg-white/80 rounded-2xl border border-white/80 overflow-hidden shadow-lg backdrop-blur-md flex flex-col">
            <div className="p-4 bg-[#002B5B] text-white flex items-center justify-between gap-3">
              <div className="flex items-center space-x-2.5">
                <MapPin className="w-5 h-5 text-[#FF6321] shrink-0" />
                <div>
                  <h3 className="font-extrabold text-sm text-white">Showroom & Workshop Location</h3>
                  <p className="text-[11px] text-slate-300 line-clamp-1">
                    {settings.address}, {settings.city}, {settings.state} - {settings.pincode}
                  </p>
                </div>
              </div>

              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                  `Jayadeva Sales & Services ${settings.address} ${settings.city}`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 bg-[#FF6321] hover:bg-orange-600 text-white font-bold text-xs rounded-xl flex items-center space-x-1.5 transition-all shrink-0 shadow-md"
              >
                <Navigation className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Get Directions</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>

            <div className="relative w-full h-72 bg-slate-100">
              <iframe
                title="Jayadeva Sales & Services Location"
                src={
                  settings.googleMapsEmbedUrl ||
                  `https://maps.google.com/maps?q=${encodeURIComponent(
                    `Jayadeva Sales & Services, ${settings.address}, ${settings.city}, ${settings.state} ${settings.pincode}`
                  )}&t=&z=16&ie=UTF8&iwloc=&output=embed`
                }
                className="w-full h-full border-0"
                allowFullScreen={true}
                loading="lazy"
              ></iframe>
            </div>

            <div className="p-3.5 bg-slate-50/90 border-t border-slate-200/80 flex items-center justify-between gap-2 text-xs">
              <span className="text-slate-600 text-[11px] font-medium flex items-center space-x-1">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                <span>Near Agrahara Dasarahalli Bus Stop, Magadi Main Rd</span>
              </span>

              <button
                type="button"
                onClick={() => {
                  const fullAddr = `${settings.address}, ${settings.city}, ${settings.state} - ${settings.pincode}`;
                  navigator.clipboard.writeText(fullAddr);
                  setCopied(true);
                  setTimeout(() => setCopied(false), 2000);
                }}
                className="px-3 py-1 bg-white border border-slate-200 hover:border-slate-300 text-slate-700 font-bold rounded-lg flex items-center space-x-1 transition-all shadow-2xs"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span className="text-emerald-700">Copied Address!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-slate-500" />
                    <span>Copy Address</span>
                  </>
                )}
              </button>
            </div>
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
            <div className="bg-emerald-50/90 border border-emerald-200/80 rounded-2xl p-6 sm:p-8 text-center space-y-5 backdrop-blur-xs">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center mx-auto shadow-md">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <div>
                <h3 className="text-2xl font-extrabold text-[#002B5B]">
                  Quote Submitted & Sent to WhatsApp!
                </h3>
                <p className="text-xs text-slate-600 max-w-md mx-auto leading-relaxed mt-1">
                  Your enquiry details have been recorded and formatted directly for our sales team on WhatsApp.
                </p>
              </div>

              {lastSubmittedQuote && (
                <div className="bg-white/90 border border-emerald-200/80 rounded-xl p-4 text-left text-xs space-y-2 text-slate-700 max-w-md mx-auto shadow-xs">
                  <div className="font-bold text-[#002B5B] border-b border-slate-200 pb-1 flex items-center justify-between">
                    <span>Sent Quote Payload:</span>
                    <span className="text-[10px] text-emerald-600 font-bold uppercase">WhatsApp Format</span>
                  </div>
                  <div><span className="font-semibold text-slate-900">Name:</span> {lastSubmittedQuote.name}</div>
                  <div><span className="font-semibold text-slate-900">Phone:</span> {lastSubmittedQuote.phone}</div>
                  <div><span className="font-semibold text-slate-900">Machine/Subject:</span> {lastSubmittedQuote.product}</div>
                  <div className="line-clamp-2"><span className="font-semibold text-slate-900">Note:</span> "{lastSubmittedQuote.msg}"</div>
                </div>
              )}

              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                {lastSubmittedQuote?.waUrl && (
                  <a
                    href={lastSubmittedQuote.waUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs rounded-xl transition-all shadow-md flex items-center justify-center space-x-2"
                  >
                    <MessageSquare className="w-4 h-4 fill-white" />
                    <span>Open WhatsApp Chat Again</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}

                <button
                  onClick={() => setSubmitted(false)}
                  className="w-full sm:w-auto px-6 py-3 bg-[#002B5B] hover:bg-[#001f42] text-white font-bold text-xs rounded-xl transition-all shadow-md"
                >
                  Send Another Enquiry
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

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                    className="w-full px-3.5 py-2.5 text-xs bg-white/90 border border-slate-200/80 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-hidden"
                    id="input-contact-name"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    WhatsApp / Mobile Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="10-digit mobile number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs bg-white/90 border border-slate-200/80 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-hidden"
                    id="input-contact-phone"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Email Address <span className="text-slate-400 font-normal">(Optional)</span>
                </label>
                <input
                  type="email"
                  placeholder="name@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs bg-white/90 border border-slate-200/80 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-hidden"
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
                  className="w-full px-3.5 py-2.5 text-xs bg-white/90 border border-slate-200/80 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-hidden"
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
                  Quote Requirements & Message <span className="text-red-500">*</span>
                </label>
                <textarea
                  rows={4}
                  required
                  placeholder="Describe your machine requirement, fabric type, or service request..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs bg-white/90 border border-slate-200/80 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-hidden"
                  id="input-contact-message"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full sm:w-auto px-8 py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs rounded-xl transition-all flex items-center justify-center space-x-2 shadow-lg shadow-emerald-600/25 disabled:opacity-50 cursor-pointer"
                  id="btn-submit-contact-enquiry"
                >
                  <MessageSquare className="w-4 h-4 fill-white" />
                  <span>{submitting ? 'Formatting Quote...' : 'Submit Quote & Send via WhatsApp'}</span>
                  <Send className="w-3.5 h-3.5 ml-1" />
                </button>
                <p className="text-[11px] text-slate-500 mt-2">
                  Submitting will format all details into a structured WhatsApp message to our sales team (+{settings.whatsAppNumber || '919343478096'}).
                </p>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
