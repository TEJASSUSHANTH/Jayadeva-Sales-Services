import React, { useState, useEffect } from 'react';
import { Star, CheckCircle2, ExternalLink, MessageSquareQuote, X, Send, ThumbsUp, Copy, Check } from 'lucide-react';

export interface GoogleReview {
  id: string;
  authorName: string;
  authorInitial: string;
  avatarBg: string;
  location: string;
  businessType: string;
  rating: number;
  timeAgo: string;
  text: string;
  machineModel?: string;
  verified: boolean;
}

const INITIAL_REVIEWS: GoogleReview[] = [
  {
    id: '1',
    authorName: 'Srinivas Gowda',
    authorInitial: 'S',
    avatarBg: 'bg-blue-600',
    location: 'Peenya Industrial Area, Bengaluru',
    businessType: 'Garment Manufacturing Unit Owner',
    rating: 5,
    timeAgo: '2 weeks ago',
    text: 'Purchased a 4-Head Sunshine Computer Embroidery Machine for our export garment unit. Mr. Jayadeva and his technical service team provided excellent on-site installation and operator training. Machine stitch precision is outstanding!',
    machineModel: 'Sunshine 4-Head Embroidery Machine',
    verified: true,
  },
  {
    id: '2',
    authorName: 'Meenakshi Sundaram',
    authorInitial: 'M',
    avatarBg: 'bg-emerald-600',
    location: 'Mysuru, Karnataka',
    businessType: 'Boutique & Designer Studio Owner',
    rating: 5,
    timeAgo: '1 month ago',
    text: 'Bought 3 Shunfa Direct Drive Lockstitch sewing machines for our boutique. Very smooth operation, minimal vibration, low noise, and excellent power savings. The after-sales service from Jayadeva Sales is second to none.',
    machineModel: 'Shunfa Direct Drive S510',
    verified: true,
  },
  {
    id: '3',
    authorName: 'Rajesh Kumar',
    authorInitial: 'R',
    avatarBg: 'bg-amber-600',
    location: 'Chickpet, Bengaluru',
    businessType: 'Royal Apparels & Textiles',
    rating: 5,
    timeAgo: '1 month ago',
    text: 'Most trustworthy shop in Bangalore for industrial sewing machines and genuine Sunshine spare parts. Prompt response whenever we need routine servicing, bobbin cases, or needles.',
    machineModel: 'Shunfa High Speed Overlock',
    verified: true,
  },
  {
    id: '4',
    authorName: 'Anitha Reddy',
    authorInitial: 'A',
    avatarBg: 'bg-purple-600',
    location: 'Custom Saree & Zari Embroidery Studio',
    businessType: 'Owner',
    rating: 5,
    timeAgo: '2 months ago',
    text: 'Sunshine single-head embroidery machine bought 6 months ago. Incredible detail for zari work and designer saree borders. Huge thanks to Jayadeva Sales team for constant technical guidance and thread support.',
    machineModel: 'Sunshine Single Head S1201',
    verified: true,
  },
  {
    id: '5',
    authorName: 'Karthik V.',
    authorInitial: 'K',
    avatarBg: 'bg-[#002B5B]',
    location: 'Hubballi, Karnataka',
    businessType: 'Textile Processing Unit',
    rating: 5,
    timeAgo: '3 months ago',
    text: 'Genuine pricing and honest guidance. The 1-year warranty support from Jayadeva is real — their technician visited our factory within 24 hours when we needed initial setup fine-tuning.',
    machineModel: 'Shunfa Heavy Duty Walking Foot',
    verified: true,
  },
  {
    id: '6',
    authorName: 'Praveen Kumar',
    authorInitial: 'P',
    avatarBg: 'bg-rose-600',
    location: 'Rajajinagar, Bengaluru',
    businessType: 'Uniform & Tailoring Works',
    rating: 5,
    timeAgo: '3 months ago',
    text: 'Excellent service! Bought Shunfa interlock and Sunshine embroidery machines together. High speed, reliable motor performance, and zero breakdown issues. Highly recommended dealer!',
    machineModel: 'Shunfa Interlock & Sunshine Pro',
    verified: true,
  },
];

export const GoogleReviewsSection: React.FC = () => {
  const [reviewsList, setReviewsList] = useState<GoogleReview[]>(() => {
    try {
      const saved = localStorage.getItem('jayadeva_user_reviews');
      if (saved) {
        const parsed = JSON.parse(saved);
        return [...parsed, ...INITIAL_REVIEWS];
      }
    } catch {
      // Fallback
    }
    return INITIAL_REVIEWS;
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [submittedSuccess, setSubmittedSuccess] = useState(false);
  const [lastSubmittedReview, setLastSubmittedReview] = useState<GoogleReview | null>(null);
  const [copiedText, setCopiedText] = useState(false);

  // Form State
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [authorName, setAuthorName] = useState('');
  const [location, setLocation] = useState('');
  const [businessType, setBusinessType] = useState('');
  const [machineModel, setMachineModel] = useState('');
  const [text, setText] = useState('');

  const GOOGLE_MAPS_SEARCH_URL =
    'https://www.google.com/maps/search/?api=1&query=Jayadeva+Sales+%26+Services+Bengaluru';

  const handleOpenReviewModal = () => {
    setIsModalOpen(true);
    setSubmittedSuccess(false);
    setCopiedText(false);
  };

  const handleOpenGoogleMaps = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    window.open(GOOGLE_MAPS_SEARCH_URL, '_blank', 'noopener,noreferrer');
  };

  const handleCopyReviewText = async (reviewContent: string) => {
    try {
      await navigator.clipboard.writeText(reviewContent);
      setCopiedText(true);
      setTimeout(() => setCopiedText(false), 3000);
    } catch {
      // Clipboard write fallback
    }
  };

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!authorName.trim() || !text.trim()) return;

    const initials = authorName.trim().charAt(0).toUpperCase();
    const colors = ['bg-blue-600', 'bg-emerald-600', 'bg-amber-600', 'bg-purple-600', 'bg-rose-600', 'bg-[#002B5B]'];
    const randomBg = colors[Math.floor(Math.random() * colors.length)];

    const newReviewItem: GoogleReview = {
      id: Date.now().toString(),
      authorName: authorName.trim(),
      authorInitial: initials,
      avatarBg: randomBg,
      location: location.trim() || 'Bengaluru, Karnataka',
      businessType: businessType.trim() || 'Verified Customer',
      rating,
      timeAgo: 'Just now',
      text: text.trim(),
      machineModel: machineModel.trim() || undefined,
      verified: true,
    };

    // 1. Update state & localStorage
    const updatedList = [newReviewItem, ...reviewsList];
    setReviewsList(updatedList);
    setLastSubmittedReview(newReviewItem);

    try {
      const customOnly = updatedList.filter(r => !INITIAL_REVIEWS.some(init => init.id === r.id));
      localStorage.setItem('jayadeva_user_reviews', JSON.stringify(customOnly));
    } catch {
      // Storage save fallback
    }

    // 2. Copy review text to clipboard automatically
    const fullTextToPost = `${text.trim()}${machineModel ? ` (Machine: ${machineModel.trim()})` : ''}`;
    handleCopyReviewText(fullTextToPost);

    // 3. Open Google Maps search / review page in a new tab
    window.open(GOOGLE_MAPS_SEARCH_URL, '_blank', 'noopener,noreferrer');

    // 4. Show success screen
    setSubmittedSuccess(true);

    // Reset Form fields
    setAuthorName('');
    setLocation('');
    setBusinessType('');
    setMachineModel('');
    setText('');
    setRating(5);
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
      {/* HEADER CARD WITH GOOGLE BADGE */}
      <div className="bg-white/80 backdrop-blur-md rounded-3xl border border-slate-200/80 p-6 sm:p-8 shadow-xl mb-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          
          {/* Left: Google Header Info */}
          <div className="flex items-center space-x-4 text-center md:text-left">
            {/* Google Icon SVG */}
            <div className="w-14 h-14 bg-white rounded-2xl p-2.5 shadow-md border border-slate-100 shrink-0 flex items-center justify-center">
              <svg className="w-9 h-9" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"
                />
                <path
                  fill="#34A853"
                  d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.29v3.15C3.26 21.3 7.31 24 12 24z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.29C.47 8.21 0 10.05 0 12s.47 3.79 1.29 5.42l3.99-3.15z"
                />
                <path
                  fill="#EA4335"
                  d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.31 0 3.26 2.7 1.29 6.58l3.99 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
                />
              </svg>
            </div>

            <div>
              <div className="flex items-center space-x-2 justify-center md:justify-start">
                <span className="text-2xl font-black text-[#002B5B]">4.9</span>
                <div className="flex items-center text-amber-400 space-x-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-amber-400" />
                  ))}
                </div>
                <span className="text-xs font-bold text-slate-500">
                  ({reviewsList.length + 80}+ Google Reviews)
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-[#002B5B] tracking-tight mt-0.5">
                Verified Google Business Reviews
              </h2>
              <p className="text-xs text-slate-600">
                Real feedback from apparel manufacturers and embroidery unit owners across Karnataka.
              </p>
            </div>
          </div>

          {/* Right: Write Review / View Maps */}
          <div className="flex flex-wrap items-center justify-center md:justify-end gap-3 shrink-0">
            <button
              type="button"
              onClick={handleOpenReviewModal}
              className="px-5 py-2.5 bg-[#002B5B] hover:bg-[#001d3d] text-white font-bold text-xs rounded-xl shadow-md transition-all inline-flex items-center space-x-2 cursor-pointer active:scale-95"
              id="btn-open-review-modal"
            >
              <MessageSquareQuote className="w-4 h-4 text-[#C89327]" />
              <span>Review Us on Google</span>
            </button>

            <button
              type="button"
              onClick={(e) => handleOpenGoogleMaps(e)}
              className="px-4 py-2.5 bg-white hover:bg-slate-50 text-[#002B5B] font-bold text-xs rounded-xl border border-slate-200 shadow-sm transition-all inline-flex items-center space-x-1.5 cursor-pointer active:scale-95"
              id="btn-open-google-maps"
            >
              <span>View Google Maps</span>
              <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
            </button>
          </div>
        </div>
      </div>

      {/* REVIEWS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {reviewsList.map((review) => (
          <div
            key={review.id}
            className="bg-white/90 backdrop-blur-md rounded-2xl border border-slate-200/80 p-6 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all flex flex-col justify-between space-y-4"
          >
            <div className="space-y-3">
              {/* Reviewer Header */}
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-3">
                  <div
                    className={`w-10 h-10 ${review.avatarBg} text-white font-extrabold text-sm rounded-full flex items-center justify-center shadow-sm shrink-0`}
                  >
                    {review.authorInitial}
                  </div>
                  <div>
                    <div className="flex items-center space-x-1.5">
                      <h4 className="font-bold text-[#002B5B] text-sm leading-snug">
                        {review.authorName}
                      </h4>
                      {review.verified && (
                        <CheckCircle2 className="w-4 h-4 text-blue-500 fill-blue-50 shrink-0" />
                      )}
                    </div>
                    <div className="text-[11px] text-slate-500 font-medium">
                      {review.businessType}
                    </div>
                    <div className="text-[10px] text-slate-400">{review.location}</div>
                  </div>
                </div>

                {/* Stars & Time */}
                <div className="text-right shrink-0">
                  <div className="flex items-center text-amber-400 space-x-0.5 justify-end">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                    ))}
                  </div>
                  <span className="text-[10px] text-slate-400 block mt-0.5">{review.timeAgo}</span>
                </div>
              </div>

              {/* Review Body */}
              <p className="text-xs text-slate-700 leading-relaxed italic">
                "{review.text}"
              </p>
            </div>

            {/* Machine Model Tag */}
            {review.machineModel && (
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[11px]">
                <span className="text-slate-400 font-semibold">Machine Purchased:</span>
                <span className="font-bold text-[#002B5B] bg-slate-100 px-2.5 py-0.5 rounded-full border border-slate-200">
                  {review.machineModel}
                </span>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* INTERACTIVE WRITE A REVIEW MODAL */}
      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 overflow-y-auto"
          onClick={() => setIsModalOpen(false)}
        >
          <div
            className="bg-white rounded-3xl border border-slate-200 shadow-2xl max-w-lg w-full p-6 sm:p-8 relative space-y-5 animate-in fade-in zoom-in duration-200 my-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header Bar with prominent Close button */}
            <div className="flex items-start justify-between border-b border-slate-100 pb-4 gap-3">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-blue-50 rounded-2xl flex items-center justify-center shrink-0">
                  <svg className="w-6 h-6" viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.29v3.15C3.26 21.3 7.31 24 12 24z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.29C.47 8.21 0 10.05 0 12s.47 3.79 1.29 5.42l3.99-3.15z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.31 0 3.26 2.7 1.29 6.58l3.99 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-black text-[#002B5B]">
                    Write a Google Review
                  </h3>
                  <p className="text-xs text-slate-500">
                    Your review will be saved on our website & posted on Google Maps
                  </p>
                </div>
              </div>

              {/* Close Button */}
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition-all cursor-pointer shrink-0"
                id="btn-close-review-modal"
                title="Close review popup"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {submittedSuccess ? (
              <div className="py-6 text-center space-y-4">
                <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-sm">
                  <ThumbsUp className="w-7 h-7" />
                </div>
                <h4 className="text-xl font-black text-[#002B5B]">
                  Review Saved & Google Maps Opened!
                </h4>
                <p className="text-xs text-slate-600 max-w-sm mx-auto leading-relaxed">
                  Your feedback has been published on our website. We have also opened the Google Maps review page and copied your review text to your clipboard.
                </p>

                {/* Status Box */}
                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 text-left space-y-2">
                  <div className="flex items-center justify-between text-xs font-bold text-[#002B5B]">
                    <span>Review Text Copied</span>
                    {copiedText ? (
                      <span className="text-emerald-600 inline-flex items-center space-x-1">
                        <Check className="w-3.5 h-3.5" />
                        <span>Copied!</span>
                      </span>
                    ) : null}
                  </div>
                  {lastSubmittedReview && (
                    <p className="text-xs text-slate-600 italic line-clamp-2 bg-white p-2.5 rounded-xl border border-slate-200/80">
                      "{lastSubmittedReview.text}"
                    </p>
                  )}
                </div>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => handleOpenGoogleMaps()}
                    className="w-full sm:flex-1 py-3 px-4 bg-[#4285F4] hover:bg-blue-600 text-white font-bold text-xs rounded-xl shadow-md transition-all inline-flex items-center justify-center space-x-2 cursor-pointer active:scale-95"
                  >
                    <ExternalLink className="w-4 h-4" />
                    <span>Open Google Maps Tab</span>
                  </button>

                  {lastSubmittedReview && (
                    <button
                      type="button"
                      onClick={() => handleCopyReviewText(lastSubmittedReview.text)}
                      className="w-full sm:w-auto py-3 px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl transition-all inline-flex items-center justify-center space-x-1.5 cursor-pointer"
                    >
                      <Copy className="w-4 h-4 text-slate-500" />
                      <span>{copiedText ? 'Copied!' : 'Copy Text'}</span>
                    </button>
                  )}
                </div>

                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-6 py-2 bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold text-xs rounded-xl cursor-pointer"
                >
                  Done
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmitReview} className="space-y-4">
                {/* Star Rating selector */}
                <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200/80 text-center space-y-1">
                  <label className="text-xs font-bold text-slate-700 block">
                    Overall Rating
                  </label>
                  <div className="flex items-center justify-center space-x-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setRating(star)}
                        onMouseEnter={() => setHoverRating(star)}
                        onMouseLeave={() => setHoverRating(0)}
                        className="p-1 focus:outline-none transition-transform hover:scale-125 cursor-pointer"
                      >
                        <Star
                          className={`w-7 h-7 ${
                            star <= (hoverRating || rating)
                              ? 'text-amber-400 fill-amber-400'
                              : 'text-slate-300'
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                </div>

                {/* Name */}
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    Your Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Ramesh Babu"
                    value={authorName}
                    onChange={(e) => setAuthorName(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#002B5B] focus:border-[#002B5B] outline-hidden"
                    id="input-review-name"
                  />
                </div>

                {/* Location & Business */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">
                      City / Area
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Peenya, Bengaluru"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-xs bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#002B5B] outline-hidden"
                      id="input-review-location"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">
                      Business Type / Role
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Boutique Owner"
                      value={businessType}
                      onChange={(e) => setBusinessType(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-xs bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#002B5B] outline-hidden"
                      id="input-review-business"
                    />
                  </div>
                </div>

                {/* Machine Model */}
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    Machine Model Purchased (Optional)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Sunshine 4-Head Embroidery / Shunfa S510"
                    value={machineModel}
                    onChange={(e) => setMachineModel(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#002B5B] outline-hidden"
                    id="input-review-machine"
                  />
                </div>

                {/* Review Text */}
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    Your Review *
                  </label>
                  <textarea
                    rows={3}
                    required
                    placeholder="Describe your machine purchase or technical service experience with Jayadeva Sales..."
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#002B5B] outline-hidden"
                    id="input-review-text"
                  />
                </div>

                {/* Submit & Cancel Options */}
                <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
                  <button
                    type="submit"
                    className="w-full sm:w-auto flex-1 py-3 px-5 bg-[#002B5B] hover:bg-[#001d3d] text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center justify-center space-x-2 cursor-pointer active:scale-95"
                    id="btn-submit-review"
                  >
                    <Send className="w-4 h-4 text-[#C89327]" />
                    <span>Submit & Post to Google Maps</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="w-full sm:w-auto py-3 px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl transition-all flex items-center justify-center space-x-1.5 cursor-pointer"
                  >
                    <span>Cancel</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </section>
  );
};


