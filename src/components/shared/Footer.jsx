import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '../../utils';
import { MapPin, Phone, Mail, Instagram, Facebook, Twitter, Youtube, ArrowRight } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-black text-white/80" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
      {/* Newsletter */}
      <div className="border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-10 md:py-14">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="font-serif text-2xl md:text-3xl text-white font-bold">Stay Connected</h3>
              <p className="text-white/60 mt-1 text-sm">Get updates on new artisan collections, festivals & exclusive offers</p>
            </div>
            <div className="flex w-full md:w-auto gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 md:w-72 px-5 py-3 rounded-full bg-white/10 border border-white/20 text-sm placeholder-white/40 focus:outline-none focus:border-white/40"
              />
              <button className="px-6 py-3 rounded-full bg-[var(--terracotta)] hover:bg-[var(--terracotta-dark)] text-white text-sm font-medium flex items-center gap-2 shrink-0 transition">
                Subscribe <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-12 md:py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-full gradient-warm flex items-center justify-center">
                <span className="text-white font-serif font-bold text-xl">S</span>
              </div>
              <div>
                <h2 className="font-serif text-lg font-bold text-white">Sustainable</h2>
                <p className="text-[10px] text-white/50 uppercase tracking-wider">Rural Bazaar</p>
              </div>
            </div>
            <p className="text-sm text-white/50 leading-relaxed mb-4">
              Bridging the gap between rural artisans and conscious consumers. Every purchase supports a family.
            </p>
            <div className="flex gap-3">
              {[Instagram, Facebook, Twitter, Youtube].map((Icon, i) => (
                <a key={i} href="#" className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition">
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-4 text-sm uppercase tracking-wider">Shop</h4>
            <ul className="space-y-2.5">
              {['Handlooms', 'Pottery', 'Jewelry', 'Paintings', 'Spices', 'Festival Specials'].map(item => (
                <li key={item}><Link to={createPageUrl('Products')} className="text-sm hover:text-white transition">{item}</Link></li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-4 text-sm uppercase tracking-wider">Company</h4>
            <ul className="space-y-2.5">
              {['About Us', 'Our Artisans', 'Impact Report', 'Blog', 'Careers', 'Press'].map(item => (
                <li key={item}><a href="#" className="text-sm hover:text-white transition">{item}</a></li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-4 text-sm uppercase tracking-wider">Support</h4>
            <ul className="space-y-2.5">
              <li><a href="#" className="text-sm hover:text-white transition">Help Center</a></li>
              <li><a href="#" className="text-sm hover:text-white transition">Shipping Info</a></li>
              <li><a href="#" className="text-sm hover:text-white transition">Returns</a></li>
              <li><a href="#" className="text-sm hover:text-white transition">Track Order</a></li>
              <li className="flex items-center gap-2 text-sm"><Phone className="w-3.5 h-3.5" /> +91 9876 543 210</li>
              <li className="flex items-center gap-2 text-sm"><Mail className="w-3.5 h-3.5" /> care@ruralbazaar.in</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-5 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/40">© 2026 Sustainable Rural Bazaar. All rights reserved.</p>
          <div className="flex items-center gap-6 text-xs text-white/40">
            <a href="#" className="hover:text-white/60 transition">Privacy Policy</a>
            <a href="#" className="hover:text-white/60 transition">Terms of Service</a>
            <a href="#" className="hover:text-white/60 transition">Refund Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}