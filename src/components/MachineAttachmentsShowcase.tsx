import React, { useState } from 'react';
import { Layers, Disc, Sparkles, Wrench, CheckCircle2, ChevronRight, Info, Image as ImageIcon, Code2 } from 'lucide-react';

export interface HoopItem {
  name: string;
  size: string;
  shape: 'Round' | 'Square' | 'Rectangular' | 'Special';
  purpose: string;
  recommendedFor: string[];
  imageUrl: string;
}

export interface DeviceItem {
  name: string;
  codeName?: string;
  category: 'Specialized Frame' | 'Device Attachment';
  description: string;
  keyFeatures: string[];
  applications: string[];
  badgeColor: string;
  imageUrl: string;
}

const HOOP_SIZES: HoopItem[] = [
  {
    name: '90 mm Round Hoop',
    size: '90 mm (3.5")',
    shape: 'Round',
    purpose: 'Small pocket & sleeve embroidery',
    recommendedFor: ['Pocket logos', 'Cuffs', 'Sleeve motifs', 'Baby garments', 'Badges'],
    imageUrl: 'https://images.unsplash.com/photo-1528459801416-a9e53bbf4e17?auto=format&fit=crop&w=600&q=80'
  },
  {
    name: '128 mm Round Hoop',
    size: '128 mm (5.0")',
    shape: 'Round',
    purpose: 'Standard chest logo embroidery',
    recommendedFor: ['Shirt chest logos', 'Cap backs', 'Collar logos', 'Uniform badges'],
    imageUrl: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=600&q=80'
  },
  {
    name: '168 mm Round Hoop',
    size: '168 mm (6.6")',
    shape: 'Round',
    purpose: 'Medium-large circular motifs',
    recommendedFor: ['T-shirt fronts', 'Blouse sleeves', 'Jacket crests', 'Institutional crests'],
    imageUrl: 'https://images.unsplash.com/photo-1611085583191-a3b181a88401?auto=format&fit=crop&w=600&q=80'
  },
  {
    name: '208 mm Round Hoop',
    size: '208 mm (8.2")',
    shape: 'Round',
    purpose: 'Large garment motifs',
    recommendedFor: ['Jacket backs', 'Saree blouse backs', 'Sweatshirts', 'Large emblems'],
    imageUrl: 'https://images.unsplash.com/photo-1616627547584-bf28cee262db?auto=format&fit=crop&w=600&q=80'
  },
  {
    name: '295 x 295 mm Square Frame',
    size: '295 x 295 mm (11.6" x 11.6")',
    shape: 'Square',
    purpose: 'Heavy-duty square motif embroidery',
    recommendedFor: ['Cushions & pillow covers', 'Table runners', 'Saree motifs', 'Bag panels'],
    imageUrl: 'https://images.unsplash.com/photo-1586350977771-b3b0abd50c82?auto=format&fit=crop&w=600&q=80'
  },
  {
    name: '550 x 360 mm Large Border Hoop',
    size: '550 x 360 mm (21.6" x 14.1")',
    shape: 'Rectangular',
    purpose: 'Extra large pantograph border frame',
    recommendedFor: ['Full Saree Palla & borders', 'Dupattas', 'Curtains', 'Heavy ethnic wear', 'Jacket back panels'],
    imageUrl: 'https://images.unsplash.com/photo-1605902711622-cfb43c4437b5?auto=format&fit=crop&w=800&q=80'
  }
];

const SPECIALIZED_DEVICES: DeviceItem[] = [
  {
    name: 'Shoes Embroidery Device',
    category: 'Specialized Frame',
    description: 'Specialized heavy-duty clamping driver designed specifically for embroidering directly on sneakers, leather shoes, sports footwear, and canvas sides.',
    keyFeatures: [
      'Multi-angle shoe heel & side clamp',
      'High-rigidity holding mechanism prevents flex during stitching',
      'Works seamlessly with Sunshine single & multi-head machines'
    ],
    applications: ['Custom sneakers', 'Sports shoes branding', 'Leather footwear motifs', 'Canvas shoes'],
    badgeColor: 'bg-blue-100 text-blue-900 border-blue-200',
    imageUrl: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=800&q=80'
  },
  {
    name: 'Sock Frame Attachment',
    category: 'Specialized Frame',
    description: '3-Socket continuous sock framing device allowing simultaneous tensioning and embroidery on hosiery socks, wristbands, and tubular knitwear.',
    keyFeatures: [
      'Triple-socket simultaneous holding stations',
      'Quick-release tensioning clamps',
      'Prevents fabric bunching on stretch socks'
    ],
    applications: ['Athletic socks', 'Corporate branded socks', 'Wristbands & leg warmers'],
    badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-200',
    imageUrl: 'https://images.unsplash.com/photo-1586350977771-b3b0abd50c82?auto=format&fit=crop&w=800&q=80'
  },
  {
    name: 'Cap Attachment System',
    category: 'Specialized Frame',
    description: '270° wide-angle cap driver assembly with cap gauge frame, driver ring, and mounting station for structured and unstructured caps.',
    keyFeatures: [
      '270-degree curved embroidery arc',
      'Snap-lock cap frame for fast loading',
      'Heavy-duty cap driver for high-speed operation'
    ],
    applications: ['Baseball caps', 'Snapbacks', 'Sun visors', 'Promotional hats'],
    badgeColor: 'bg-amber-100 text-amber-900 border-amber-200',
    imageUrl: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?auto=format&fit=crop&w=800&q=80'
  },
  {
    name: 'Simple Towel Device',
    category: 'Device Attachment',
    description: 'Pneumatic/mechanical towel loop stitching attachment for dense terry cloth, plush bathrobes, and chenille-style textured embroidery.',
    keyFeatures: [
      'Specialized loop presser foot mechanism',
      'Prevents thread snagging on long pile terry fabric',
      'Creates plush raised loop embroidery effects'
    ],
    applications: ['Bath towels', 'Hotel bathrobes', 'Plush blankets', 'Hand towels'],
    badgeColor: 'bg-purple-100 text-purple-900 border-purple-200',
    imageUrl: 'https://images.unsplash.com/photo-1616627547584-bf28cee262db?auto=format&fit=crop&w=800&q=80'
  },
  {
    name: 'Beads Device',
    category: 'Device Attachment',
    description: 'Automatic bead feeder device for stitching glass seed beads, tubular beads, and pearls seamlessly alongside embroidery threads.',
    keyFeatures: [
      'Precision bead dispenser tube with adjustable bead feeder',
      'High speed bead placement synchronized with needle stroke',
      'Supports various bead diameters (2mm - 5mm)'
    ],
    applications: ['Bridal sarees', 'Haute couture gowns', 'Zardosi work', 'Designer blouses'],
    badgeColor: 'bg-pink-100 text-pink-900 border-pink-200',
    imageUrl: 'https://images.unsplash.com/photo-1611085583191-a3b181a88401?auto=format&fit=crop&w=800&q=80'
  },
  {
    name: 'Cording Device (Coarding)',
    category: 'Device Attachment',
    description: 'Heavy-duty cording and yarn feeding attachment for stitching thick ropes, metallic cords, ribbons, and yarns onto fabrics.',
    keyFeatures: [
      '360-degree rotating cording guide foot',
      'Handles yarns, ribbons, metallic cords, and ropes',
      'Creates rich 3D tactile rope embroidery'
    ],
    applications: ['Ethnic wear borders', 'Designer lehengas', 'Cording lace work', 'Curtains & drapes'],
    badgeColor: 'bg-indigo-100 text-indigo-900 border-indigo-200',
    imageUrl: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=800&q=80'
  },
  {
    name: 'Twin Sequence / Sequin Device',
    category: 'Device Attachment',
    description: 'Dual-dispenser sequin feeding attachment capable of feeding two different sizes or colors of sequins in a single embroidery run.',
    keyFeatures: [
      'Dual-spool sequin reel mechanism',
      'Automated color/size sequin switching via computer command',
      'Supports 3mm, 5mm, 7mm, 9mm sequins'
    ],
    applications: ['Multi-color sequin sarees', 'Glamour party wear', 'Stage costumes', 'Fashion garments'],
    badgeColor: 'bg-rose-100 text-rose-900 border-rose-200',
    imageUrl: 'https://images.unsplash.com/photo-1528459801416-a9e53bbf4e17?auto=format&fit=crop&w=800&q=80'
  },
  {
    name: 'Sequence Device (Single Sequin)',
    category: 'Device Attachment',
    description: 'High-speed automatic single sequin feeding device for fast, flawless sequin dispersion on high-speed embroidery machines.',
    keyFeatures: [
      'High speed motorized sequin cutter & feeder',
      'Low noise & smooth sequin reel unwinding',
      'Compatible with standard Dahao computer controllers'
    ],
    applications: ['Sequin sarees & dupattas', 'Dancewear', 'Fashion patches', 'Designer wear'],
    badgeColor: 'bg-teal-100 text-teal-900 border-teal-200',
    imageUrl: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=800&q=80'
  }
];

export const MachineAttachmentsShowcase: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'hoops' | 'specialized' | 'devices'>('hoops');
  const [viewModes, setViewModes] = useState<Record<string, 'photo' | 'diagram'>>({});

  const toggleViewMode = (key: string) => {
    setViewModes(prev => ({
      ...prev,
      [key]: prev[key] === 'diagram' ? 'photo' : 'diagram'
    }));
  };

  // SVG Visual Diagram Renderer for Hoops & Frames
  const renderHoopVisual = (shape: string, size: string) => {
    if (shape === 'Round') {
      return (
        <div className="w-full h-32 bg-slate-900/90 rounded-xl mb-4 p-3 flex flex-col items-center justify-center relative overflow-hidden border border-slate-800">
          <svg className="w-24 h-24 text-amber-400" viewBox="0 0 100 100" fill="none">
            {/* Outer hoop ring */}
            <circle cx="50" cy="50" r="42" stroke="currentColor" strokeWidth="4" strokeDasharray="3 3" opacity="0.6" />
            <circle cx="50" cy="50" r="38" stroke="#38bdf8" strokeWidth="3" />
            {/* Inner clamp screw */}
            <rect x="46" y="4" width="8" height="8" fill="#f59e0b" rx="1" />
            {/* Fabric grid */}
            <path d="M20 50 H80 M50 20 V80" stroke="#ffffff" strokeWidth="0.8" opacity="0.25" />
            {/* Center crosshair */}
            <circle cx="50" cy="50" r="3" fill="#ef4444" />
          </svg>
          <div className="absolute bottom-1.5 right-2 text-[9px] font-mono text-slate-300 font-bold bg-slate-800/80 px-2 py-0.5 rounded border border-slate-700">
            {size}
          </div>
        </div>
      );
    }
    if (shape === 'Square') {
      return (
        <div className="w-full h-32 bg-slate-900/90 rounded-xl mb-4 p-3 flex flex-col items-center justify-center relative overflow-hidden border border-slate-800">
          <svg className="w-24 h-24 text-amber-400" viewBox="0 0 100 100" fill="none">
            <rect x="12" y="12" width="76" height="76" rx="6" stroke="#f59e0b" strokeWidth="4" />
            <rect x="18" y="18" width="64" height="64" rx="4" stroke="#38bdf8" strokeWidth="2" strokeDasharray="2 2" />
            {/* Corner brackets */}
            <circle cx="12" cy="12" r="3" fill="#ffffff" />
            <circle cx="88" cy="12" r="3" fill="#ffffff" />
            <circle cx="12" cy="88" r="3" fill="#ffffff" />
            <circle cx="88" cy="88" r="3" fill="#ffffff" />
            <path d="M30 50 H70 M50 30 V70" stroke="#ffffff" strokeWidth="1" opacity="0.3" />
          </svg>
          <div className="absolute bottom-1.5 right-2 text-[9px] font-mono text-slate-300 font-bold bg-slate-800/80 px-2 py-0.5 rounded border border-slate-700">
            {size}
          </div>
        </div>
      );
    }
    // Rectangular Border Frame
    return (
      <div className="w-full h-32 bg-slate-900/90 rounded-xl mb-4 p-3 flex flex-col items-center justify-center relative overflow-hidden border border-slate-800">
        <svg className="w-full h-24 text-amber-400" viewBox="0 0 200 100" fill="none">
          <rect x="10" y="15" width="180" height="70" rx="4" stroke="#f59e0b" strokeWidth="4" />
          <rect x="16" y="21" width="168" height="58" rx="2" stroke="#38bdf8" strokeWidth="2" strokeDasharray="4 2" />
          {/* Pantograph mounting clips */}
          <rect x="5" y="42" width="6" height="16" fill="#cbd5e1" rx="1" />
          <rect x="189" y="42" width="6" height="16" fill="#cbd5e1" rx="1" />
          {/* Saree border pattern preview */}
          <path d="M25 50 Q 50 30, 75 50 T 125 50 T 175 50" stroke="#f43f5e" strokeWidth="2" fill="none" />
        </svg>
        <div className="absolute bottom-1.5 right-2 text-[9px] font-mono text-slate-300 font-bold bg-slate-800/80 px-2 py-0.5 rounded border border-slate-700">
          {size}
        </div>
      </div>
    );
  };

  // SVG Visual Diagram Renderer for Devices
  const renderDeviceVisual = (deviceName: string) => {
    if (deviceName.includes('Shoes')) {
      return (
        <div className="w-full h-36 bg-[#001733] rounded-xl mb-4 p-3 flex flex-col items-center justify-center relative overflow-hidden border border-blue-900/80">
          <svg className="w-full h-28 text-sky-400" viewBox="0 0 180 100" fill="none">
            {/* Pantograph arm */}
            <path d="M10 20 H170 V30 H10 Z" fill="#334155" />
            {/* Shoe Clamp Frame */}
            <rect x="40" y="30" width="100" height="60" rx="6" stroke="#f59e0b" strokeWidth="3" fill="#0f172a" />
            {/* Sneaker Outline */}
            <path d="M50 75 C60 75 70 70 80 60 L100 55 C120 55 125 70 130 75 Z" fill="#1e293b" stroke="#38bdf8" strokeWidth="2" />
            <circle cx="110" cy="62" r="6" fill="#f43f5e" />
            {/* Needle stroke lines */}
            <line x1="110" y1="35" x2="110" y2="56" stroke="#fbbf24" strokeWidth="2" strokeDasharray="2 2" />
          </svg>
          <span className="absolute top-2 right-2 text-[10px] bg-blue-900/80 text-blue-200 font-extrabold px-2 py-0.5 rounded border border-blue-700">
            Footwear Clamp
          </span>
        </div>
      );
    }
    if (deviceName.includes('Sock')) {
      return (
        <div className="w-full h-36 bg-[#001733] rounded-xl mb-4 p-3 flex flex-col items-center justify-center relative overflow-hidden border border-emerald-900/80">
          <svg className="w-full h-28 text-emerald-400" viewBox="0 0 180 100" fill="none">
            {/* 3 Socket Stations */}
            <rect x="20" y="25" width="40" height="60" rx="4" stroke="#10b981" strokeWidth="2" fill="#064e3b" />
            <rect x="70" y="25" width="40" height="60" rx="4" stroke="#10b981" strokeWidth="2" fill="#064e3b" />
            <rect x="120" y="25" width="40" height="60" rx="4" stroke="#10b981" strokeWidth="2" fill="#064e3b" />
            {/* Sock Shapes */}
            <path d="M30 35 V65 C30 72 45 72 45 65 L45 55" stroke="#a7f3d0" strokeWidth="3" fill="none" />
            <path d="M80 35 V65 C80 72 95 72 95 65 L95 55" stroke="#a7f3d0" strokeWidth="3" fill="none" />
            <path d="M130 35 V65 C130 72 145 72 145 65 L145 55" stroke="#a7f3d0" strokeWidth="3" fill="none" />
          </svg>
          <span className="absolute top-2 right-2 text-[10px] bg-emerald-900/80 text-emerald-200 font-extrabold px-2 py-0.5 rounded border border-emerald-700">
            3-Socket Station
          </span>
        </div>
      );
    }
    if (deviceName.includes('Cap')) {
      return (
        <div className="w-full h-36 bg-[#001733] rounded-xl mb-4 p-3 flex flex-col items-center justify-center relative overflow-hidden border border-amber-900/80">
          <svg className="w-full h-28 text-amber-400" viewBox="0 0 180 100" fill="none">
            {/* 270 degree cap ring */}
            <path d="M30 75 A 50 50 0 1 1 150 75" stroke="#f59e0b" strokeWidth="5" fill="none" strokeDasharray="6 3" />
            {/* Cap visor brim */}
            <path d="M120 75 L165 82 C160 88 130 88 120 85 Z" fill="#d97706" />
            {/* Cap dome */}
            <path d="M50 70 C50 40 130 40 130 70 Z" fill="#1e293b" stroke="#38bdf8" strokeWidth="2" />
            {/* Front embroidery zone */}
            <rect x="75" y="48" width="30" height="20" rx="2" fill="#f43f5e" opacity="0.8" />
          </svg>
          <span className="absolute top-2 right-2 text-[10px] bg-amber-900/80 text-amber-200 font-extrabold px-2 py-0.5 rounded border border-amber-700">
            270° Driver
          </span>
        </div>
      );
    }
    if (deviceName.includes('Towel')) {
      return (
        <div className="w-full h-36 bg-[#001733] rounded-xl mb-4 p-3 flex flex-col items-center justify-center relative overflow-hidden border border-purple-900/80">
          <svg className="w-full h-28 text-purple-300" viewBox="0 0 180 100" fill="none">
            {/* Terry Towel loop texture */}
            <rect x="20" y="20" width="140" height="60" rx="4" fill="#2e1065" stroke="#a855f7" strokeWidth="2" />
            {/* Loop stitches */}
            <path d="M30 50 C30 35 40 35 40 50 M45 50 C45 35 55 35 55 50 M60 50 C60 35 70 35 70 50 M75 50 C75 35 85 35 85 50" stroke="#d8b4fe" strokeWidth="3" strokeLinecap="round" fill="none" />
            {/* Loop foot head */}
            <circle cx="115" cy="45" r="12" stroke="#f59e0b" strokeWidth="3" fill="#0f172a" />
          </svg>
          <span className="absolute top-2 right-2 text-[10px] bg-purple-900/80 text-purple-200 font-extrabold px-2 py-0.5 rounded border border-purple-700">
            Loop Presser Foot
          </span>
        </div>
      );
    }
    if (deviceName.includes('Beads')) {
      return (
        <div className="w-full h-36 bg-[#001733] rounded-xl mb-4 p-3 flex flex-col items-center justify-center relative overflow-hidden border border-pink-900/80">
          <svg className="w-full h-28 text-pink-300" viewBox="0 0 180 100" fill="none">
            {/* Bead tube dispenser */}
            <line x1="90" y1="10" x2="90" y2="50" stroke="#e2e8f0" strokeWidth="6" />
            <path d="M80 50 L100 50 L90 65 Z" fill="#f59e0b" />
            {/* Pearls/Beads row */}
            <circle cx="90" cy="70" r="5" fill="#fbcfe8" stroke="#ec4899" strokeWidth="2" />
            <circle cx="105" cy="72" r="5" fill="#fbcfe8" stroke="#ec4899" strokeWidth="2" />
            <circle cx="120" cy="70" r="5" fill="#fbcfe8" stroke="#ec4899" strokeWidth="2" />
            <circle cx="75" cy="72" r="5" fill="#fbcfe8" stroke="#ec4899" strokeWidth="2" />
          </svg>
          <span className="absolute top-2 right-2 text-[10px] bg-pink-900/80 text-pink-200 font-extrabold px-2 py-0.5 rounded border border-pink-700">
            Automated Bead Tube
          </span>
        </div>
      );
    }
    if (deviceName.includes('Cording')) {
      return (
        <div className="w-full h-36 bg-[#001733] rounded-xl mb-4 p-3 flex flex-col items-center justify-center relative overflow-hidden border border-indigo-900/80">
          <svg className="w-full h-28 text-indigo-300" viewBox="0 0 180 100" fill="none">
            {/* Thick Rope Cording Trail */}
            <path d="M20 70 C50 30 100 90 160 40" stroke="#f59e0b" strokeWidth="7" fill="none" strokeDasharray="8 3" />
            {/* Rotating Guide Foot */}
            <circle cx="100" cy="65" r="14" stroke="#818cf8" strokeWidth="3" fill="#1e1b4b" />
            <line x1="100" y1="20" x2="100" y2="51" stroke="#cbd5e1" strokeWidth="4" />
          </svg>
          <span className="absolute top-2 right-2 text-[10px] bg-indigo-900/80 text-indigo-200 font-extrabold px-2 py-0.5 rounded border border-indigo-700">
            360° Rotating Guide
          </span>
        </div>
      );
    }
    // Sequin Device (Single or Twin)
    return (
      <div className="w-full h-36 bg-[#001733] rounded-xl mb-4 p-3 flex flex-col items-center justify-center relative overflow-hidden border border-rose-900/80">
        <svg className="w-full h-28 text-rose-300" viewBox="0 0 180 100" fill="none">
          {/* Sequin Spool Reel */}
          <circle cx="50" cy="35" r="18" fill="#881337" stroke="#f43f5e" strokeWidth="3" />
          {deviceName.includes('Twin') && (
            <circle cx="130" cy="35" r="18" fill="#065f46" stroke="#10b981" strokeWidth="3" />
          )}
          {/* Sequin Tape Strip */}
          <path d="M50 53 L90 75" stroke="#fb7185" strokeWidth="4" strokeDasharray="3 3" />
          {/* Shiny Sequins on Fabric */}
          <circle cx="90" cy="75" r="6" fill="#f43f5e" stroke="#ffffff" strokeWidth="1.5" />
          <circle cx="106" cy="77" r="6" fill="#10b981" stroke="#ffffff" strokeWidth="1.5" />
          <circle cx="122" cy="75" r="6" fill="#f43f5e" stroke="#ffffff" strokeWidth="1.5" />
        </svg>
        <span className="absolute top-2 right-2 text-[10px] bg-rose-900/80 text-rose-200 font-extrabold px-2 py-0.5 rounded border border-rose-700">
          {deviceName.includes('Twin') ? 'Dual-Spool Feeder' : 'Motorized Cutter'}
        </span>
      </div>
    );
  };

  return (
    <section className="py-16 bg-slate-50/80 border-y border-slate-200/80 relative overflow-hidden" id="section-machine-attachments">
      {/* Decorative Subtle Background Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(#002B5B_1px,transparent_1px)] [background-size:24px_24px] opacity-5 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header Title */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-amber-100/90 text-amber-900 text-xs font-bold border border-amber-300/80 mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#C89327]" />
            <span>Complete Machine Ecosystem</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#002B5B] tracking-tight">
            Standard Frames, Hoops & Specialized Machine Attachments
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
            Jayadeva Sales & Services provides a full range of high-precision embroidery hoops, specialized garment devices, and motorized attachments for Sunshine Computer Embroidery Machines.
          </p>
        </div>

        {/* Navigation Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-10">
          <button
            onClick={() => setActiveTab('hoops')}
            className={`px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all flex items-center space-x-2 cursor-pointer ${
              activeTab === 'hoops'
                ? 'bg-[#002B5B] text-white shadow-md shadow-blue-950/20 scale-102'
                : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            <Disc className="w-4 h-4 text-[#C89327]" />
            <span>Standard Embroidery Hoops (6 Sizes)</span>
          </button>

          <button
            onClick={() => setActiveTab('specialized')}
            className={`px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all flex items-center space-x-2 cursor-pointer ${
              activeTab === 'specialized'
                ? 'bg-[#002B5B] text-white shadow-md shadow-blue-950/20 scale-102'
                : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            <Layers className="w-4 h-4 text-[#C89327]" />
            <span>Shoes, Socks & Cap Devices</span>
          </button>

          <button
            onClick={() => setActiveTab('devices')}
            className={`px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all flex items-center space-x-2 cursor-pointer ${
              activeTab === 'devices'
                ? 'bg-[#002B5B] text-white shadow-md shadow-blue-950/20 scale-102'
                : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            <Wrench className="w-4 h-4 text-[#C89327]" />
            <span>Specialized Attachments (Towel, Beads, Cording, Sequin)</span>
          </button>
        </div>

        {/* TAB 1: Standard Embroidery Hoops */}
        {activeTab === 'hoops' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 animate-fadeIn">
            {HOOP_SIZES.map((hoop, index) => {
              const currentMode = viewModes[`hoop-${index}`] || 'photo';
              return (
                <div
                  key={index}
                  className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-sm hover:shadow-md transition-all group relative overflow-hidden flex flex-col justify-between"
                >
                  <div>
                    {/* Header Toggle bar */}
                    <div className="flex items-center justify-between mb-3">
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-slate-100 text-[#002B5B] border border-slate-200">
                        {hoop.shape} Hoop
                      </span>
                      <button
                        onClick={() => toggleViewMode(`hoop-${index}`)}
                        className="inline-flex items-center space-x-1 text-[11px] font-bold text-[#002B5B] hover:text-[#C89327] bg-amber-50 hover:bg-amber-100 px-2.5 py-1 rounded-lg border border-amber-200 transition-colors cursor-pointer"
                      >
                        {currentMode === 'photo' ? (
                          <>
                            <Code2 className="w-3 h-3" />
                            <span>View Schematic</span>
                          </>
                        ) : (
                          <>
                            <ImageIcon className="w-3 h-3" />
                            <span>View Real Photo</span>
                          </>
                        )}
                      </button>
                    </div>

                    {/* Image / Visual Container */}
                    {currentMode === 'photo' ? (
                      <div className="w-full h-36 rounded-xl mb-4 overflow-hidden relative group/img border border-slate-200 bg-slate-100">
                        <img
                          src={hoop.imageUrl}
                          alt={hoop.name}
                          className="w-full h-full object-cover group-hover/img:scale-108 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent opacity-80" />
                        <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between text-white text-[10px] font-mono font-extrabold">
                          <span className="bg-slate-900/80 px-2 py-0.5 rounded border border-white/20">
                            {hoop.size}
                          </span>
                          <span className="bg-amber-500/90 text-slate-950 font-sans px-2 py-0.5 rounded font-bold">
                            High Precision Steel
                          </span>
                        </div>
                      </div>
                    ) : (
                      renderHoopVisual(hoop.shape, hoop.size)
                    )}

                    <h3 className="text-base font-extrabold text-[#002B5B] group-hover:text-emerald-700 transition-colors mb-1">
                      {hoop.name}
                    </h3>

                    <div className="text-xs font-mono font-extrabold text-[#C89327] mb-2">
                      DIMENSION: {hoop.size}
                    </div>
                    <p className="text-xs text-slate-600 mb-4 leading-relaxed">
                      {hoop.purpose}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-slate-100">
                    <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2">
                      Recommended Applications
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {hoop.recommendedFor.map((rec, i) => (
                        <span
                          key={i}
                          className="px-2.5 py-0.5 bg-slate-50 text-slate-700 border border-slate-200/80 rounded-md text-[11px] font-medium"
                        >
                          {rec}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* TAB 2: Shoes, Socks & Cap Devices */}
        {activeTab === 'specialized' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-fadeIn">
            {SPECIALIZED_DEVICES.filter((d) => d.category === 'Specialized Frame').map((device, index) => {
              const currentMode = viewModes[`spec-${index}`] || 'photo';
              return (
                <div
                  key={index}
                  className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
                >
                  <div>
                    {/* Header Toggle bar */}
                    <div className="flex items-center justify-between mb-3">
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${device.badgeColor}`}>
                        {device.category}
                      </span>
                      <button
                        onClick={() => toggleViewMode(`spec-${index}`)}
                        className="inline-flex items-center space-x-1 text-[11px] font-bold text-[#002B5B] hover:text-[#C89327] bg-amber-50 hover:bg-amber-100 px-2.5 py-1 rounded-lg border border-amber-200 transition-colors cursor-pointer"
                      >
                        {currentMode === 'photo' ? (
                          <>
                            <Code2 className="w-3 h-3" />
                            <span>View Schematic</span>
                          </>
                        ) : (
                          <>
                            <ImageIcon className="w-3 h-3" />
                            <span>View Real Photo</span>
                          </>
                        )}
                      </button>
                    </div>

                    {/* Image / Visual Container */}
                    {currentMode === 'photo' ? (
                      <div className="w-full h-40 rounded-xl mb-4 overflow-hidden relative group/img border border-slate-200 bg-slate-100">
                        <img
                          src={device.imageUrl}
                          alt={device.name}
                          className="w-full h-full object-cover group-hover/img:scale-108 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-85" />
                        <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between text-white">
                          <span className="text-xs font-bold text-amber-300">
                            Verified Attachment
                          </span>
                          <span className="text-[10px] bg-white/20 backdrop-blur-xs px-2 py-0.5 rounded text-white font-mono">
                            Heavy Duty
                          </span>
                        </div>
                      </div>
                    ) : (
                      renderDeviceVisual(device.name)
                    )}

                    <h3 className="text-lg font-extrabold text-[#002B5B]">
                      {device.name}
                    </h3>
                    <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                      {device.description}
                    </p>

                    <div className="mt-4 space-y-2">
                      <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                        Key Engineering Features
                      </div>
                      {device.keyFeatures.map((feat, i) => (
                        <div key={i} className="flex items-start space-x-2 text-xs text-slate-700">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-100">
                    <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2">
                      Suitable Products
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {device.applications.map((app, i) => (
                        <span
                          key={i}
                          className="px-2.5 py-1 bg-amber-50/80 text-amber-900 border border-amber-200/80 rounded-lg text-[11px] font-semibold"
                        >
                          {app}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* TAB 3: Specialized Device Attachments */}
        {activeTab === 'devices' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fadeIn">
            {SPECIALIZED_DEVICES.filter((d) => d.category === 'Device Attachment').map((device, index) => {
              const currentMode = viewModes[`dev-${index}`] || 'photo';
              return (
                <div
                  key={index}
                  className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
                >
                  <div>
                    {/* Header Toggle bar */}
                    <div className="flex items-center justify-between mb-3">
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${device.badgeColor}`}>
                        Motorized Attachment
                      </span>
                      <button
                        onClick={() => toggleViewMode(`dev-${index}`)}
                        className="inline-flex items-center space-x-1 text-[11px] font-bold text-[#002B5B] hover:text-[#C89327] bg-amber-50 hover:bg-amber-100 px-2.5 py-1 rounded-lg border border-amber-200 transition-colors cursor-pointer"
                      >
                        {currentMode === 'photo' ? (
                          <>
                            <Code2 className="w-3 h-3" />
                            <span>View Schematic</span>
                          </>
                        ) : (
                          <>
                            <ImageIcon className="w-3 h-3" />
                            <span>View Real Photo</span>
                          </>
                        )}
                      </button>
                    </div>

                    {/* Image / Visual Container */}
                    {currentMode === 'photo' ? (
                      <div className="w-full h-40 rounded-xl mb-4 overflow-hidden relative group/img border border-slate-200 bg-slate-100">
                        <img
                          src={device.imageUrl}
                          alt={device.name}
                          className="w-full h-full object-cover group-hover/img:scale-108 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-85" />
                        <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between text-white">
                          <span className="text-xs font-bold text-amber-300">
                            Sunshine Motorized Attachment
                          </span>
                          <span className="text-[10px] bg-white/20 backdrop-blur-xs px-2 py-0.5 rounded text-white font-mono">
                            Auto Motorized
                          </span>
                        </div>
                      </div>
                    ) : (
                      renderDeviceVisual(device.name)
                    )}

                    <h3 className="text-base font-extrabold text-[#002B5B]">
                      {device.name}
                    </h3>
                    <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                      {device.description}
                    </p>

                    <div className="mt-4 space-y-1.5">
                      <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                        Technical Highlights
                      </div>
                      {device.keyFeatures.map((feat, i) => (
                        <div key={i} className="flex items-start space-x-2 text-xs text-slate-700">
                          <ChevronRight className="w-3.5 h-3.5 text-[#C89327] shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-5 pt-3 border-t border-slate-100">
                    <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2">
                      Ideal Embroidery Work
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {device.applications.map((app, i) => (
                        <span
                          key={i}
                          className="px-2.5 py-1 bg-slate-50 text-slate-800 border border-slate-200/80 rounded-lg text-[11px] font-semibold"
                        >
                          {app}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Footer Technical Note */}
        <div className="mt-10 bg-white/90 border border-slate-200/80 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-xs">
          <div className="flex items-start space-x-3">
            <div className="p-2.5 bg-amber-100/80 rounded-xl text-amber-900 shrink-0">
              <Info className="w-5 h-5 text-[#C89327]" />
            </div>
            <div>
              <h4 className="text-xs font-extrabold text-[#002B5B]">
                Need Custom Frame Clamps or Specialized Attachment Installation?
              </h4>
              <p className="text-[11px] text-slate-600 mt-0.5">
                Jayadeva Sales & Services technical team provides complete on-site mounting, calibration, and training for all Sunshine embroidery attachments and custom frames.
              </p>
            </div>
          </div>
          <a
            href="https://wa.me/919343478096?text=Hello%20Jayadeva%20Sales,%20I%20would%20like%20information%20on%20embroidery%20frames,%20hoops%20and%20specialized%20devices."
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2.5 bg-[#002B5B] hover:bg-[#001f42] text-white font-bold text-xs rounded-xl shadow-sm transition-all whitespace-nowrap active:scale-95 shrink-0"
          >
            Enquire for Attachments
          </a>
        </div>
      </div>
    </section>
  );
};
