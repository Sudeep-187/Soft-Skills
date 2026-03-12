import React, { useState } from 'react';
import { X, Star, MapPin, Package } from 'lucide-react';

const CATEGORIES = ['All', 'Handloom', 'Pottery', 'Jewelry', 'Paintings', 'Woodcraft', 'Spices & Food', 'Natural Beauty'];

const stalls = [
  { id: 1, x: 18, y: 22, name: 'Lakshmi Devi', craft: 'Handloom', category: 'Handloom', village: 'Pochampally', stall: 'A-12', rating: 4.9, highlights: ['Ikat Silk Sarees', 'Cotton Stoles', 'Patola Dupatta'], color: '#6B3E26' },
  { id: 2, x: 35, y: 18, name: 'Raju Kummara', craft: 'Lacquer Woodcraft', category: 'Woodcraft', village: 'Etikoppaka', stall: 'B-04', rating: 4.8, highlights: ['Lacquer Toys', 'Wooden Dolls', 'Painted Bowls'], color: '#B08A00' },
  { id: 3, x: 55, y: 25, name: 'Padmavathi B.', craft: 'Kalamkari Art', category: 'Paintings', village: 'Srikalahasti', stall: 'C-07', rating: 4.9, highlights: ['Hand-painted Dupattas', 'Wall Art', 'Kalamkari Sarees'], color: '#B22222' },
  { id: 4, x: 72, y: 20, name: 'Venkat Reddy', craft: 'Bidriware Metalwork', category: 'Jewelry', village: 'Bidar', stall: 'D-02', rating: 4.7, highlights: ['Silver Inlay Vases', 'Jewelry Boxes', 'Decorative Items'], color: '#3A6B35' },
  { id: 5, x: 25, y: 48, name: 'Suresh Farms', craft: 'Organic Spices', category: 'Spices & Food', village: 'Guntur', stall: 'E-11', rating: 4.6, highlights: ['Guntur Chilli', 'Turmeric Powder', 'Gongura Pickle'], color: '#B22222' },
  { id: 6, x: 48, y: 52, name: 'Bhavani Potters', craft: 'Terracotta Pottery', category: 'Pottery', village: 'Machilipatnam', stall: 'F-08', rating: 4.5, highlights: ['Horse Figurines', 'Clay Pots', 'Decorative Tiles'], color: '#8B5A3A' },
  { id: 7, x: 65, y: 55, name: 'Sita Devi', craft: 'Silver Filigree Jewelry', category: 'Jewelry', village: 'Karimnagar', stall: 'G-03', rating: 4.7, highlights: ['Jhumkas', 'Bangles', 'Nose Rings'], color: '#3A6B35' },
  { id: 8, x: 82, y: 45, name: 'Krishnaveni SHG', craft: 'Natural Beauty', category: 'Natural Beauty', village: 'Warangal', stall: 'H-01', rating: 4.8, highlights: ['Neem Soap', 'Turmeric Cream', 'Herbal Hair Oil'], color: '#3A6B35' },
  { id: 9, x: 40, y: 75, name: 'Nageshwar D.', craft: 'Cheriyal Scroll Paintings', category: 'Paintings', village: 'Cheriyal', stall: 'I-05', rating: 4.8, highlights: ['Scroll Paintings', 'Wall Murals', 'Custom Portraits'], color: '#B22222' },
  { id: 10, x: 15, y: 72, name: 'Varalakshmi W.', craft: 'Dharmavaram Silk', category: 'Handloom', village: 'Dharmavaram', stall: 'J-09', rating: 4.9, highlights: ['Bridal Sarees', 'Pattu Sarees', 'Silk Blouses'], color: '#6B3E26' },
  { id: 11, x: 60, y: 78, name: 'Krishna Reddy', craft: 'Brass Metalwork', category: 'Woodcraft', village: 'Pembarthi', stall: 'K-06', rating: 4.9, highlights: ['Brass Urli', 'Temple Lamps', 'Decorative Bowls'], color: '#B08A00' },
  { id: 12, x: 80, y: 75, name: 'Ramalingam S.', craft: 'Kondapalli Toys', category: 'Woodcraft', village: 'Kondapalli', stall: 'L-10', rating: 4.7, highlights: ['Dashavataram Sets', 'Village Scenes', 'Painted Animals'], color: '#B08A00' },
];

const categoryColors = {
  'Handloom': '#6B3E26',
  'Woodcraft': '#B08A00',
  'Paintings': '#B22222',
  'Jewelry': '#3A6B35',
  'Spices & Food': '#B22222',
  'Pottery': '#8B5A3A',
  'Natural Beauty': '#3A6B35',
};

export default function MelaStallMap() {
  const [activeFilter, setActiveFilter] = useState('All');
  const [selectedStall, setSelectedStall] = useState(null);

  const filtered = activeFilter === 'All' ? stalls : stalls.filter(s => s.category === activeFilter);

  return (
    <div className="mt-12">
      <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
        <h3 className="font-serif text-xl font-bold" style={{ color: 'var(--text-primary)' }}>🗺️ Interactive Stall Map</h3>
        <div className="flex flex-wrap gap-1.5">
          {CATEGORIES.map(cat => (
            <button key={cat} onClick={() => setActiveFilter(cat)}
              className="px-3 py-1 rounded-full text-xs font-semibold transition-all"
              style={{
                backgroundColor: activeFilter === cat ? 'var(--tamarind)' : 'white',
                color: activeFilter === cat ? 'white' : 'var(--text-secondary)',
                border: `1.5px solid ${activeFilter === cat ? 'var(--tamarind)' : 'var(--border-warm)'}`,
              }}>
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="relative rounded-3xl overflow-hidden border" style={{ borderColor: 'var(--border-warm)', boxShadow: 'var(--shadow-card)' }}>
        {/* Map background */}
        <div className="relative w-full" style={{ paddingBottom: '50%', backgroundColor: '#F5EDD8', backgroundImage: 'radial-gradient(circle at 30% 30%, #EDE3D0 0%, #F5EDD8 60%)', minHeight: 280 }}>
          {/* Grid lines */}
          <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" width="10%" height="10%" patternUnits="userSpaceOnUse" x="0" y="0"
                patternTransform="translate(0,0)">
                <path d="M 100 0 L 0 0 0 100" fill="none" stroke="rgba(107,62,38,0.08)" strokeWidth="1"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)"/>
            {/* Walkways */}
            <line x1="33.3%" y1="0" x2="33.3%" y2="100%" stroke="rgba(107,62,38,0.12)" strokeWidth="3" strokeDasharray="8 4"/>
            <line x1="66.6%" y1="0" x2="66.6%" y2="100%" stroke="rgba(107,62,38,0.12)" strokeWidth="3" strokeDasharray="8 4"/>
            <line x1="0" y1="33.3%" x2="100%" y2="33.3%" stroke="rgba(107,62,38,0.12)" strokeWidth="3" strokeDasharray="8 4"/>
            <line x1="0" y1="66.6%" x2="100%" y2="66.6%" stroke="rgba(107,62,38,0.12)" strokeWidth="3" strokeDasharray="8 4"/>
          </svg>

          {/* Zone labels */}
          <div className="absolute top-2 left-2 text-[10px] font-bold px-2 py-0.5 rounded" style={{ backgroundColor: 'rgba(107,62,38,0.12)', color: 'var(--text-muted)' }}>Zone A–D</div>
          <div className="absolute bottom-2 right-2 text-[10px] font-bold px-2 py-0.5 rounded" style={{ backgroundColor: 'rgba(107,62,38,0.12)', color: 'var(--text-muted)' }}>Zone I–L</div>
          <div className="absolute bottom-2 left-2 text-[10px] font-bold px-2 py-0.5 rounded" style={{ backgroundColor: 'rgba(107,62,38,0.12)', color: 'var(--text-muted)' }}>Zone E–H</div>

          {/* Entry label */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 text-[11px] font-bold px-4 py-1 text-white" style={{ backgroundColor: 'var(--tamarind)' }}>
            🚪 MAIN ENTRANCE
          </div>

          {/* Stall dots */}
          {stalls.map(stall => {
            const isVisible = activeFilter === 'All' || stall.category === activeFilter;
            const isSelected = selectedStall?.id === stall.id;
            return (
              <button key={stall.id}
                onClick={() => setSelectedStall(isSelected ? null : stall)}
                className="absolute transition-all duration-300"
                style={{ left: `${stall.x}%`, top: `${stall.y}%`, transform: 'translate(-50%, -50%)', opacity: isVisible ? 1 : 0.2, zIndex: isSelected ? 20 : 10 }}>
                <div className="relative">
                  <div className="w-7 h-7 rounded-full border-2 border-white flex items-center justify-center shadow-md transition-transform hover:scale-125"
                    style={{ backgroundColor: isVisible ? categoryColors[stall.category] : '#999', transform: isSelected ? 'scale(1.3)' : 'scale(1)' }}>
                    <span className="text-white text-[8px] font-bold">{stall.stall.split('-')[0]}</span>
                  </div>
                  {isSelected && (
                    <div className="absolute -top-1 -right-1 w-3 h-3 rounded-full animate-ping" style={{ backgroundColor: 'var(--turmeric)' }} />
                  )}
                </div>
              </button>
            );
          })}

          {/* Popup */}
          {selectedStall && (
            <div className="absolute z-30 bg-white rounded-2xl shadow-2xl p-4 w-64"
              style={{
                left: selectedStall.x > 60 ? 'auto' : `${selectedStall.x + 3}%`,
                right: selectedStall.x > 60 ? `${100 - selectedStall.x + 3}%` : 'auto',
                top: selectedStall.y > 60 ? 'auto' : `${selectedStall.y + 3}%`,
                bottom: selectedStall.y > 60 ? `${100 - selectedStall.y + 3}%` : 'auto',
                border: '1.5px solid var(--border-warm)',
              }}>
              <button onClick={() => setSelectedStall(null)} className="absolute top-2 right-2 w-6 h-6 rounded-full flex items-center justify-center" style={{ backgroundColor: 'var(--cream-dark)' }}>
                <X className="w-3 h-3" style={{ color: 'var(--text-muted)' }} />
              </button>
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 rounded-xl flex items-center justify-center text-white text-xs font-bold shrink-0"
                  style={{ backgroundColor: categoryColors[selectedStall.category] }}>
                  {selectedStall.stall}
                </div>
                <div>
                  <p className="font-bold text-sm leading-tight" style={{ color: 'var(--text-primary)' }}>{selectedStall.name}</p>
                  <p className="text-[11px]" style={{ color: 'var(--text-muted)' }}>{selectedStall.craft}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 mb-2 text-xs" style={{ color: 'var(--text-muted)' }}>
                <MapPin className="w-3 h-3" /> {selectedStall.village}
                <span className="ml-auto flex items-center gap-1 font-bold" style={{ color: 'var(--text-primary)' }}>
                  <Star className="w-3 h-3 fill-current" style={{ color: 'var(--turmeric)' }} /> {selectedStall.rating}
                </span>
              </div>
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-wider mb-1" style={{ color: 'var(--text-muted)' }}>Product Highlights</p>
                <div className="flex flex-wrap gap-1">
                  {selectedStall.highlights.map(h => (
                    <span key={h} className="px-2 py-0.5 rounded-full text-[10px] font-medium"
                      style={{ backgroundColor: 'var(--cream-dark)', color: 'var(--tamarind)' }}>{h}</span>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Legend */}
        <div className="p-3 flex flex-wrap gap-3" style={{ backgroundColor: 'var(--warm-white)', borderTop: '1px solid var(--border-warm)' }}>
          {Object.entries(categoryColors).map(([cat, color]) => (
            <span key={cat} className="flex items-center gap-1.5 text-xs" style={{ color: 'var(--text-secondary)' }}>
              <span className="w-3 h-3 rounded-full" style={{ backgroundColor: color }} /> {cat}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}