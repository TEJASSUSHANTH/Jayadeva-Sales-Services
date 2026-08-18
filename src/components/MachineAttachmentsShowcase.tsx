import React, { useState } from 'react';
import { Layers, Disc, Sparkles, Wrench, CheckCircle2, ChevronRight, Info } from 'lucide-react';

export interface HoopItem {
  name: string;
  size: string;
  shape: 'Round' | 'Square' | 'Rectangular' | 'Special';
  purpose: string;
  recommendedFor: string[];
}

export interface DeviceItem {
  name: string;
  codeName?: string;
  category: 'Specialized Frame' | 'Device Attachment';
  description: string;
  keyFeatures: string[];
  applications: string[];
  badgeColor: string;
}

const HOOP_SIZES: HoopItem[] = [
  {
    name: '90 mm Round Hoop',
    size: '90 mm (3.5")',
    shape: 'Round',
    purpose: 'Small pocket & sleeve embroidery',
    recommendedFor: ['Pocket logos', 'Cuffs', 'Sleeve motifs', 'Baby garments', 'Badges']
  },
  {
    name: '128 mm Round Hoop',
    size: '128 mm (5.0")',
    shape: 'Round',
    purpose: 'Standard chest logo embroidery',
    recommendedFor: ['Shirt chest logos', 'Cap backs', 'Collar logos', 'Uniform badges']
  },
  {
    name: '168 mm Round Hoop',
    size: '168 mm (6.6")',
    shape: 'Round',
    purpose: 'Medium-large circular motifs',
    recommendedFor: ['T-shirt fronts', 'Blouse sleeves', 'Jacket crests', 'Institutional crests']
  },
  {
    name: '208 mm Round Hoop',
    size: '208 mm (8.2")',
    shape: 'Round',
    purpose: 'Large garment motifs',
    recommendedFor: ['Jacket backs', 'Saree blouse backs', 'Sweatshirts', 'Large emblems']
  },
  {
    name: '295 x 295 mm Square Frame',
    size: '295 x 295 mm (11.6" x 11.6")',
    shape: 'Square',
    purpose: 'Heavy-duty square motif embroidery',
    recommendedFor: ['Cushions & pillow covers', 'Table runners', 'Saree motifs', 'Bag panels']
  },
  {
    name: '550 x 360 mm Large Border Hoop',
    size: '550 x 360 mm (21.6" x 14.1")',
    shape: 'Rectangular',
    purpose: 'Extra large pantograph border frame',
    recommendedFor: ['Full Saree Palla & borders', 'Dupattas', 'Curtains', 'Heavy ethnic wear', 'Jacket back panels']
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
    badgeColor: 'bg-blue-100 text-blue-900 border-blue-200'
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
    badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-200'
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
    badgeColor: 'bg-amber-100 text-amber-900 border-amber-200'
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
    badgeColor: 'bg-purple-100 text-purple-900 border-purple-200'
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
    badgeColor: 'bg-pink-100 text-pink-900 border-pink-200'
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
    badgeColor: 'bg-indigo-100 text-indigo-900 border-indigo-200'
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
    badgeColor: 'bg-rose-100 text-rose-900 border-rose-200'
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
    badgeColor: 'bg-teal-100 text-teal-900 border-teal-200'
  }
];

export const MachineAttachmentsShowcase: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'hoops' | 'specialized' | 'devices'>('hoops');

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
            {HOOP_SIZES.map((hoop, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-sm hover:shadow-md transition-all group relative overflow-hidden"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-200/80 flex items-center justify-center text-emerald-600 font-bold">
                    <Disc className="w-6 h-6" />
                  </div>
                  <span className="px-3 py-1 rounded-full text-[11px] font-extrabold bg-slate-100 text-[#002B5B] border border-slate-200">
                    {hoop.shape} Frame
                  </span>
                </div>

                <h3 className="text-base font-extrabold text-[#002B5B] group-hover:text-emerald-700 transition-colors">
                  {hoop.name}
                </h3>
                <div className="text-xs font-mono font-extrabold text-[#C89327] mt-0.5">
                  DIMENSION: {hoop.size}
                </div>
                <p className="text-xs text-slate-600 mt-2 mb-4 leading-relaxed">
                  {hoop.purpose}
                </p>

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
            ))}
          </div>
        )}

        {/* TAB 2: Shoes, Socks & Cap Devices */}
        {activeTab === 'specialized' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-fadeIn">
            {SPECIALIZED_DEVICES.filter((d) => d.category === 'Specialized Frame').map((device, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className={`px-3 py-1 rounded-full text-[11px] font-bold border ${device.badgeColor}`}>
                      {device.category}
                    </span>
                  </div>

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
            ))}
          </div>
        )}

        {/* TAB 3: Specialized Device Attachments */}
        {activeTab === 'devices' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fadeIn">
            {SPECIALIZED_DEVICES.filter((d) => d.category === 'Device Attachment').map((device, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className={`px-3 py-1 rounded-full text-[11px] font-bold border ${device.badgeColor}`}>
                      {device.name.includes('Device') ? 'Motorized Attachment' : 'Special Device'}
                    </span>
                  </div>

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
            ))}
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
