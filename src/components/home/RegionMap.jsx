import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { MapPin, Calendar, Users } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Event pins on the map (x/y as % of map container)
const eventPins = [
  { id: 'e1', x: 62, y: 38, state: 'Telangana', district: 'Hyderabad', name: 'Hyderabad Crafts Mela', date: 'Mar 15–20, 2026', artisans: 120, status: 'upcoming', color: '#B22222' },
  { id: 'e2', x: 74, y: 28, state: 'Telangana', district: 'Warangal', name: 'Warangal Weave Festival', date: 'Apr 5–8, 2026', artisans: 65, status: 'upcoming', color: '#B08A00' },
  { id: 'e3', x: 55, y: 55, state: 'Telangana', district: 'Nalgonda', name: 'Pochampally Ikat Utsav', date: 'Feb 28, 2026', artisans: 40, status: 'live', color: '#3A6B35' },
  { id: 'e4', x: 35, y: 72, state: 'Andhra Pradesh', district: 'Krishna', name: 'Kondapalli Toy Fair', date: 'Mar 1–3, 2026', artisans: 55, status: 'upcoming', color: '#6B3E26' },
  { id: 'e5', x: 22, y: 85, state: 'Andhra Pradesh', district: 'Guntur', name: 'Guntur Spice & Craft Expo', date: 'Feb 25, 2026', artisans: 80, status: 'live', color: '#B22222' },
  { id: 'e6', x: 18, y: 60, state: 'Andhra Pradesh', district: 'West Godavari', name: 'Etikoppaka Wood Craft Mela', date: 'May 10–12, 2026', artisans: 30, status: 'upcoming', color: '#8B5A3A' },
  { id: 'e7', x: 12, y: 50, state: 'Andhra Pradesh', district: 'East Godavari', name: 'Kalamkari Art Festival', date: 'Jun 7–9, 2026', artisans: 45, status: 'upcoming', color: '#B08A00' },
  { id: 'e8', x: 45, y: 88, state: 'Andhra Pradesh', district: 'Nellore', name: 'Nellore Rural Bazaar', date: 'Apr 20–22, 2026', artisans: 38, status: 'upcoming', color: '#3A6B35' },
];

const districts = {
  telangana: [
    { id: 'hyd', name: 'Hyderabad', x: 58, y: 35, w: 12, h: 10 },
    { id: 'war', name: 'Warangal', x: 70, y: 25, w: 14, h: 12 },
    { id: 'nal', name: 'Nalgonda', x: 52, y: 48, w: 13, h: 12 },
    { id: 'kar', name: 'Karimnagar', x: 68, y: 14, w: 15, h: 13 },
    { id: 'kha', name: 'Khammam', x: 64, y: 55, w: 13, h: 12 },
    { id: 'med', name: 'Medak', x: 50, y: 23, w: 12, h: 13 },
    { id: 'niz', name: 'Nizamabad', x: 46, y: 12, w: 13, h: 13 },
    { id: 'adi', name: 'Adilabad', x: 52, y: 3, w: 20, h: 11 },
    { id: 'mah', name: 'Mahabubnagar', x: 45, y: 52, w: 16, h: 14 },
    { id: 'ran', name: 'Ranga Reddy', x: 49, y: 39, w: 10, h: 11 },
  ],
  andhra: [
    { id: 'vis', name: 'Visakhapatnam', x: 8, y: 30, w: 15, h: 14 },
    { id: 'eas', name: 'East Godavari', x: 10, y: 44, w: 15, h: 12 },
    { id: 'wes', name: 'West Godavari', x: 15, y: 56, w: 13, h: 12 },
    { id: 'kri', name: 'Krishna', x: 28, y: 66, w: 13, h: 12 },
    { id: 'gun', name: 'Guntur', x: 22, y: 77, w: 14, h: 12 },
    { id: 'pra', name: 'Prakasam', x: 30, y: 80, w: 14, h: 12 },
    { id: 'nel', name: 'Nellore', x: 40, y: 85, w: 12, h: 10 },
    { id: 'kur', name: 'Kurnool', x: 28, y: 67, w: 16, h: 14 },
    { id: 'cud', name: 'Cuddapah', x: 38, y: 72, w: 14, h: 14 },
    { id: 'ani', name: 'Anantapur', x: 22, y: 72, w: 16, h: 14 },
    { id: 'chi', name: 'Chittoor', x: 32, y: 87, w: 15, h: 10 },
    { id: 'sri', name: 'Srikakulam', x: 8, y: 18, w: 14, h: 14 },
    { id: 'viz', name: 'Vizianagaram', x: 8, y: 25, w: 12, h: 10 },
  ],
};

export default function RegionMap() {
  const [hoveredDistrict, setHoveredDistrict] = useState(null);
  const [selectedPin, setSelectedPin] = useState(null);

  return (
    <div className="mt-12">
      <div className="text-center mb-8">
        <h2 className="font-serif text-2xl md:text-3xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>
          Explore by Region & Mela
        </h2>
        <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
          Hover over districts · Click event pins to explore upcoming Melas
        </p>
      </div>

      <div className="relative rounded-3xl overflow-hidden border" style={{ borderColor: 'var(--border-warm)', boxShadow: 'var(--shadow-hover)', backgroundColor: '#EDE3D0' }}>
        {/* Legend */}
        <div className="absolute top-3 left-3 z-20 flex flex-col gap-1.5">
          <span className="flex items-center gap-1.5 text-[11px] font-semibold px-2 py-1 rounded-full"
            style={{ backgroundColor: 'rgba(255,252,245,0.9)', color: 'var(--text-secondary)' }}>
            <span className="w-2.5 h-2.5 rounded-full animate-ping" style={{ backgroundColor: '#3A6B35' }} /> Live Events
          </span>
          <span className="flex items-center gap-1.5 text-[11px] px-2 py-1 rounded-full"
            style={{ backgroundColor: 'rgba(255,252,245,0.9)', color: 'var(--text-secondary)' }}>
            <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: '#B22222' }} /> Upcoming
          </span>
        </div>

        {/* State labels */}
        <div className="absolute z-10" style={{ top: '45%', left: '16%', transform: 'translate(-50%, -50%)' }}>
          <p className="text-[10px] font-bold tracking-widest uppercase opacity-40" style={{ color: 'var(--tamarind)' }}>Andhra Pradesh</p>
        </div>
        <div className="absolute z-10" style={{ top: '35%', left: '64%', transform: 'translate(-50%, -50%)' }}>
          <p className="text-[10px] font-bold tracking-widest uppercase opacity-40" style={{ color: 'var(--tamarind)' }}>Telangana</p>
        </div>

        {/* SVG Map */}
        <svg viewBox="0 0 100 100" className="w-full" style={{ display: 'block', maxHeight: '480px' }} preserveAspectRatio="xMidYMid meet">
          {/* Andhra Pradesh districts */}
          {districts.andhra.map(d => (
            <rect key={d.id} x={d.x} y={d.y} width={d.w} height={d.h} rx="1.5"
              fill={hoveredDistrict === d.id ? 'rgba(107,62,38,0.25)' : 'rgba(107,62,38,0.1)'}
              stroke="rgba(107,62,38,0.3)" strokeWidth="0.4"
              style={{ cursor: 'pointer', transition: 'fill 0.2s' }}
              onMouseEnter={() => setHoveredDistrict(d.id)}
              onMouseLeave={() => setHoveredDistrict(null)} />
          ))}
          {districts.andhra.map(d => hoveredDistrict === d.id && (
            <text key={`t-${d.id}`} x={d.x + d.w / 2} y={d.y + d.h / 2 + 1} textAnchor="middle"
              fontSize="2.2" fill="rgba(107,62,38,0.8)" fontWeight="600">{d.name}</text>
          ))}

          {/* Telangana districts */}
          {districts.telangana.map(d => (
            <rect key={d.id} x={d.x} y={d.y} width={d.w} height={d.h} rx="1.5"
              fill={hoveredDistrict === d.id ? 'rgba(178,34,34,0.22)' : 'rgba(178,34,34,0.1)'}
              stroke="rgba(178,34,34,0.3)" strokeWidth="0.4"
              style={{ cursor: 'pointer', transition: 'fill 0.2s' }}
              onMouseEnter={() => setHoveredDistrict(d.id)}
              onMouseLeave={() => setHoveredDistrict(null)} />
          ))}
          {districts.telangana.map(d => hoveredDistrict === d.id && (
            <text key={`t-${d.id}`} x={d.x + d.w / 2} y={d.y + d.h / 2 + 1} textAnchor="middle"
              fontSize="2.2" fill="rgba(178,34,34,0.8)" fontWeight="600">{d.name}</text>
          ))}

          {/* State border separator (rough diagonal) */}
          <path d="M 43 5 Q 50 30 47 50 Q 46 68 32 80" fill="none" stroke="rgba(107,62,38,0.4)" strokeWidth="0.6" strokeDasharray="2 1" />

          {/* Event Pins */}
          {eventPins.map(pin => (
            <g key={pin.id} style={{ cursor: 'pointer' }} onClick={() => setSelectedPin(selectedPin?.id === pin.id ? null : pin)}>
              {pin.status === 'live' && (
                <circle cx={pin.x} cy={pin.y} r="4" fill="transparent" stroke={pin.color} strokeWidth="0.5" opacity="0.4">
                  <animate attributeName="r" from="3" to="6" dur="1.5s" repeatCount="indefinite" />
                  <animate attributeName="opacity" from="0.4" to="0" dur="1.5s" repeatCount="indefinite" />
                </circle>
              )}
              <circle cx={pin.x} cy={pin.y} r="2.8" fill={pin.color}
                stroke="white" strokeWidth="0.8"
                opacity={selectedPin?.id === pin.id ? 1 : 0.9}
                style={{ filter: selectedPin?.id === pin.id ? 'drop-shadow(0 0 3px rgba(0,0,0,0.4))' : 'none' }} />
              <text x={pin.x} y={pin.y + 0.8} textAnchor="middle" fontSize="1.8" fill="white" fontWeight="bold">📍</text>
            </g>
          ))}
        </svg>

        {/* Event Popup */}
        <AnimatePresence>
          {selectedPin && (
            <motion.div
              key={selectedPin.id}
              initial={{ opacity: 0, scale: 0.9, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 10 }}
              className="absolute z-30 rounded-2xl p-4 w-72 shadow-2xl"
              style={{
                backgroundColor: 'white',
                border: '1.5px solid var(--border-warm)',
                left: selectedPin.x > 60 ? 'auto' : `${selectedPin.x + 2}%`,
                right: selectedPin.x > 60 ? `${100 - selectedPin.x + 2}%` : 'auto',
                top: selectedPin.y > 60 ? 'auto' : `${selectedPin.y + 2}%`,
                bottom: selectedPin.y > 60 ? `${100 - selectedPin.y + 2}%` : 'auto',
              }}>
              {selectedPin.status === 'live' && (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold text-white mb-2"
                  style={{ backgroundColor: '#3A6B35' }}>
                  <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" /> LIVE NOW
                </span>
              )}
              <h4 className="font-serif font-bold text-base leading-snug mb-1" style={{ color: 'var(--text-primary)' }}>
                {selectedPin.name}
              </h4>
              <div className="flex items-center gap-3 text-xs mb-3" style={{ color: 'var(--text-muted)' }}>
                <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {selectedPin.date}</span>
                <span className="flex items-center gap-1"><Users className="w-3 h-3" /> {selectedPin.artisans} artisans</span>
              </div>
              <div className="flex items-center gap-1.5 text-xs mb-3" style={{ color: 'var(--text-muted)' }}>
                <MapPin className="w-3 h-3" /> {selectedPin.district}, {selectedPin.state}
              </div>
              <Link to={createPageUrl('EventDetail') + '?id=' + selectedPin.id}
                className="block w-full text-center py-2 rounded-full text-xs font-bold text-white transition hover:opacity-90"
                style={{ backgroundColor: selectedPin.color }}>
                {selectedPin.status === 'live' ? '🔴 View Live Event' : 'Explore This Mela →'}
              </Link>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}