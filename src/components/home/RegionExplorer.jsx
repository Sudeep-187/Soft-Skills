import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '../../utils';
import { motion } from 'framer-motion';
import { MapPin, ArrowRight } from 'lucide-react';

const regions = [
  // Andhra Pradesh
  { name: 'Pochampally', state: 'Andhra Pradesh', craft: 'Ikat Handlooms', image: 'https://images.unsplash.com/photo-1617791160505-6f00504e3519?w=500&h=360&fit=crop', stateColor: 'bg-yellow-100 text-yellow-800 border-yellow-300' },
  { name: 'Srikalahasti', state: 'Andhra Pradesh', craft: 'Kalamkari Art', image: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=500&h=360&fit=crop', stateColor: 'bg-yellow-100 text-yellow-800 border-yellow-300' },
  { name: 'Kondapalli', state: 'Andhra Pradesh', craft: 'Wooden Toys', image: 'https://images.unsplash.com/photo-1602517623547-daea57e10fda?w=500&h=360&fit=crop', stateColor: 'bg-yellow-100 text-yellow-800 border-yellow-300' },
  // Telangana
  { name: 'Nirmal', state: 'Telangana', craft: 'Wooden Paintings', image: 'https://images.unsplash.com/photo-1582738411706-bfc8e691d1c2?w=500&h=360&fit=crop', stateColor: 'bg-red-100 text-red-800 border-red-300' },
  { name: 'Pembarthi', state: 'Telangana', craft: 'Brass Metalwork', image: 'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=500&h=360&fit=crop', stateColor: 'bg-red-100 text-red-800 border-red-300' },
  { name: 'Cheriyal', state: 'Telangana', craft: 'Scroll Paintings', image: 'https://images.unsplash.com/photo-1578321272176-b7bbc0679853?w=500&h=360&fit=crop', stateColor: 'bg-red-100 text-red-800 border-red-300' },
  // Tamil Nadu
  { name: 'Kanchipuram', state: 'Tamil Nadu', craft: 'Silk Weaving', image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=500&h=360&fit=crop', stateColor: 'bg-green-100 text-green-800 border-green-300' },
  { name: 'Thanjavur', state: 'Tamil Nadu', craft: 'Tanjore Paintings & Bronze', image: 'https://images.unsplash.com/photo-1578321272176-b7bbc0679853?w=500&h=360&fit=crop', stateColor: 'bg-green-100 text-green-800 border-green-300' },
  // Kerala
  { name: 'Aranmula', state: 'Kerala', craft: 'Metal Mirror Craft', image: 'https://images.unsplash.com/photo-1515562141589-67f0d4c68dab?w=500&h=360&fit=crop', stateColor: 'bg-blue-100 text-blue-800 border-blue-300' },
  { name: 'Kannur', state: 'Kerala', craft: 'Handloom Weaving & Theyyam', image: 'https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?w=500&h=360&fit=crop', stateColor: 'bg-blue-100 text-blue-800 border-blue-300' },
];

const STATE_BG = {
  'Andhra Pradesh': 'linear-gradient(135deg, #FEF3C7, #FDE68A)',
  'Telangana': 'linear-gradient(135deg, #FEE2E2, #FCA5A5)',
  'Tamil Nadu': 'linear-gradient(135deg, #DCFCE7, #86EFAC)',
  'Kerala': 'linear-gradient(135deg, #DBEAFE, #93C5FD)',
};

export default function RegionExplorer() {
  return (
    <section className="py-16 md:py-24" style={{ background: 'var(--warm-white)' }}>
      <div className="max-w-7xl mx-auto px-4 md:px-6">

        {/* Header */}
        <div className="flex items-end justify-between mb-10">
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <span className="section-sub">Explore by Village</span>
            <h2 className="section-heading mt-2">Craft Villages of South India</h2>
            <p className="section-desc mt-2 max-w-md">
              Each village is a living museum of centuries-old craft traditions, passed down through generations
            </p>
          </motion.div>
          <Link to={createPageUrl('Products')} className="hidden md:flex items-center gap-1.5 text-sm font-semibold hover:underline" style={{ color: 'var(--terracotta)' }}>
            Browse All <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Regions grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {regions.map((region, i) => (
            <motion.div
              key={`${region.name}-${i}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
            >
              <Link
                to={`${createPageUrl('Products')}?state=${encodeURIComponent(region.state)}`}
                className="group block rounded-2xl overflow-hidden relative h-48 md:h-52"
                style={{ boxShadow: 'var(--shadow-card)' }}
              >
                <img
                  src={region.image}
                  alt={region.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  onError={(e) => e.target.style.display = 'none'}
                />
                {/* Gradient overlay */}
                <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(30,14,6,0.85) 0%, rgba(30,14,6,0.1) 60%)' }} />
                {/* Hover glow */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-30 transition-opacity duration-500"
                  style={{ background: STATE_BG[region.state] }} />

                {/* Text */}
                <div className="absolute bottom-0 inset-x-0 p-3">
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${region.stateColor}`}>
                    {region.state}
                  </span>
                  <h3 className="font-serif font-bold text-white text-sm md:text-base mt-1.5 leading-tight">
                    {region.name}
                  </h3>
                  <p className="text-white/65 text-[11px] mt-0.5 flex items-center gap-1">
                    <MapPin className="w-2.5 h-2.5" /> {region.craft}
                  </p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* State quick links */}
        <div className="flex flex-wrap justify-center gap-3 mt-10">
          {[
            { state: 'Andhra Pradesh', color: 'bg-yellow-100 text-yellow-800 border-yellow-300 hover:bg-yellow-200' },
            { state: 'Telangana', color: 'bg-red-100 text-red-800 border-red-300 hover:bg-red-200' },
            { state: 'Tamil Nadu', color: 'bg-green-100 text-green-800 border-green-300 hover:bg-green-200' },
            { state: 'Kerala', color: 'bg-blue-100 text-blue-800 border-blue-300 hover:bg-blue-200' },
          ].map(s => (
            <Link key={s.state} to={`${createPageUrl('Products')}?state=${encodeURIComponent(s.state)}`}
              className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-semibold border transition ${s.color}`}>
              <MapPin className="w-3.5 h-3.5" /> Explore {s.state}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}