import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, MessageSquare, Clock, ChevronDown, Send, CheckCircle } from 'lucide-react';

const faqs = [
  { q: 'How do I track my order?', a: 'After placing an order, you will receive a tracking ID via email. You can also view it under My Profile → Orders.' },
  { q: 'What is your return policy?', a: 'We offer 7-day hassle-free returns on all craft items. Food & beauty products are non-returnable for hygiene reasons.' },
  { q: 'How do I become a seller?', a: 'Click "Become a Seller" in the navigation and fill the 3-step application. Our team reviews and approves within 48 hours.' },
  { q: 'Are the products really handmade?', a: 'Yes — 100%. Every product comes with an origin certificate and artisan story card. We personally verify all sellers.' },
  { q: 'How does the Mystery Box work?', a: 'You subscribe to a box tier, and we curate surprise items from our artisan network each month. You reveal on delivery!' },
  { q: 'Do you ship internationally?', a: 'Currently we ship across India. International shipping to UAE, USA, UK, and Singapore coming in 2026.' },
];

export default function Contact() {
  const [openFaq, setOpenFaq] = useState(null);
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });

  const update = (k, v) => setForm(p => ({ ...p, [k]: v }));

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <div style={{ backgroundColor: 'var(--cream)' }} className="min-h-screen">

      {/* Header */}
      <div className="py-14 md:py-20" style={{ background: 'linear-gradient(135deg, var(--tamarind-dark), var(--tamarind))' }}>
        <div className="max-w-3xl mx-auto px-4 md:px-6 text-center">
          <h1 className="font-serif text-3xl md:text-5xl font-bold text-white">We're Here for You</h1>
          <p className="mt-3 text-white/60 text-sm">Questions, feedback, partnerships — reach out any way you prefer</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-6 py-12 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

          {/* Contact form */}
          <div className="lg:col-span-2">
            <h2 className="font-serif text-2xl font-bold mb-6" style={{ color: 'var(--text-primary)' }}>Send a Message</h2>

            {sent ? (
              <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                className="text-center py-16">
                <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: 'var(--banana-leaf)', opacity: 0.15 }}>
                  <CheckCircle className="w-8 h-8" style={{ color: 'var(--banana-leaf)' }} />
                </div>
                <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto -mt-20 mb-4" style={{ backgroundColor: 'var(--banana-leaf)' }}>
                  <CheckCircle className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-serif text-xl font-bold" style={{ color: 'var(--text-primary)' }}>Message Sent!</h3>
                <p className="text-sm mt-2" style={{ color: 'var(--text-muted)' }}>We'll get back to you within 24 hours.</p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    { label: 'Your Name', key: 'name', type: 'text' },
                    { label: 'Email Address', key: 'email', type: 'email' },
                  ].map(f => (
                    <div key={f.key}>
                      <label className="text-xs font-semibold mb-1 block" style={{ color: 'var(--text-secondary)' }}>{f.label}</label>
                      <input
                        type={f.type} required value={form[f.key]} onChange={e => update(f.key, e.target.value)}
                        className="w-full px-4 py-3 rounded-xl text-sm focus:outline-none transition"
                        style={{ border: '1.5px solid var(--border-warm)', backgroundColor: 'white', color: 'var(--text-primary)' }}
                        onFocus={e => e.target.style.borderColor = 'var(--turmeric)'}
                        onBlur={e => e.target.style.borderColor = 'var(--border-warm)'}
                      />
                    </div>
                  ))}
                </div>
                <div>
                  <label className="text-xs font-semibold mb-1 block" style={{ color: 'var(--text-secondary)' }}>Subject</label>
                  <input type="text" value={form.subject} onChange={e => update('subject', e.target.value)}
                    className="w-full px-4 py-3 rounded-xl text-sm focus:outline-none"
                    style={{ border: '1.5px solid var(--border-warm)', backgroundColor: 'white', color: 'var(--text-primary)' }}
                    onFocus={e => e.target.style.borderColor = 'var(--turmeric)'}
                    onBlur={e => e.target.style.borderColor = 'var(--border-warm)'}
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold mb-1 block" style={{ color: 'var(--text-secondary)' }}>Message</label>
                  <textarea rows={5} value={form.message} onChange={e => update('message', e.target.value)} required
                    className="w-full px-4 py-3 rounded-xl text-sm focus:outline-none resize-none"
                    style={{ border: '1.5px solid var(--border-warm)', backgroundColor: 'white', color: 'var(--text-primary)' }}
                    onFocus={e => e.target.style.borderColor = 'var(--turmeric)'}
                    onBlur={e => e.target.style.borderColor = 'var(--border-warm)'}
                  />
                </div>
                <button type="submit" className="btn-primary flex items-center gap-2">
                  <Send className="w-4 h-4" /> Send Message
                </button>
              </form>
            )}
          </div>

          {/* Contact info */}
          <div className="space-y-6">
            <h2 className="font-serif text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>Contact Info</h2>
            {[
              { icon: Phone, label: 'Call Us', value: '+91 9876 543 210', sub: 'Mon–Sat, 9am–6pm' },
              { icon: Mail, label: 'Email', value: 'care@ruralbazaar.in', sub: 'Reply within 24 hours' },
              { icon: MapPin, label: 'Office', value: '3rd Floor, Amrutha Hills, Hyderabad — 500082', sub: 'Telangana, India' },
              { icon: MessageSquare, label: 'WhatsApp', value: '+91 9876 543 210', sub: 'Quick queries only' },
            ].map((c, i) => (
              <div key={i} className="flex gap-4">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ backgroundColor: 'var(--cream-dark)' }}>
                  <c.icon className="w-5 h-5" style={{ color: 'var(--tamarind)' }} />
                </div>
                <div>
                  <p className="text-xs font-semibold" style={{ color: 'var(--text-muted)' }}>{c.label}</p>
                  <p className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>{c.value}</p>
                  <p className="text-xs" style={{ color: 'var(--text-muted)' }}>{c.sub}</p>
                </div>
              </div>
            ))}

            <div className="p-4 rounded-2xl flex items-start gap-3 mt-4" style={{ backgroundColor: 'var(--cream-dark)' }}>
              <Clock className="w-5 h-5 shrink-0 mt-0.5" style={{ color: 'var(--tamarind)' }} />
              <div>
                <p className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>Support Hours</p>
                <p className="text-xs mt-1" style={{ color: 'var(--text-secondary)' }}>Mon–Fri: 9am – 6pm IST<br />Saturday: 10am – 4pm IST<br />Sunday: Closed</p>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ */}
        <section className="mt-16">
          <h2 className="font-serif text-2xl md:text-3xl font-bold mb-6" style={{ color: 'var(--text-primary)' }}>Frequently Asked Questions</h2>
          <div className="space-y-3 max-w-3xl">
            {faqs.map((faq, i) => (
              <div key={i} className="rounded-2xl overflow-hidden border bg-white" style={{ borderColor: 'var(--border-warm)' }}>
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between p-5 text-left">
                  <span className="font-semibold text-sm" style={{ color: 'var(--text-primary)' }}>{faq.q}</span>
                  <ChevronDown className={`w-4 h-4 transition-transform shrink-0 ${openFaq === i ? 'rotate-180' : ''}`} style={{ color: 'var(--text-muted)' }} />
                </button>
                {openFaq === i && (
                  <div className="px-5 pb-5 border-t text-sm leading-relaxed" style={{ borderColor: 'var(--border-warm)', color: 'var(--text-secondary)' }}>
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}