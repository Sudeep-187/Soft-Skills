import React, { useState } from 'react';
import { base44 } from '@/api/base44Client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CheckCircle, Upload, ArrowRight, Star, Users, TrendingUp, Shield } from 'lucide-react';
import { motion } from 'framer-motion';

const CRAFT_TYPES = ['Handloom', 'Pottery', 'Jewelry', 'Paintings', 'Woodcraft', 'Metalwork', 'Spices', 'Organic Food', 'Leather', 'Bamboo', 'Stone Carving', 'Other'];

export default function BecomeSeller() {
  const [step, setStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: '', phone: '', craft_type: '', village: '', district: '', state: '', bio: '',
    experience_years: '', bank_account: '', bank_ifsc: '', aadhaar: '',
  });

  const updateForm = (field, value) => setForm(prev => ({ ...prev, [field]: value }));

  const handleSubmit = async () => {
    await base44.entities.Artisan.create({
      name: form.name,
      phone: form.phone,
      craft_type: form.craft_type,
      village: form.village,
      district: form.district,
      state: form.state,
      bio: form.bio,
      experience_years: parseInt(form.experience_years) || 0,
      status: 'pending',
    });
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-[var(--cream)] flex items-center justify-center px-4">
        <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="text-center max-w-md">
          <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-green-600" />
          </div>
          <h2 className="font-serif text-3xl font-bold text-[var(--text-primary)]">Application Submitted!</h2>
          <p className="text-sm text-[var(--text-secondary)] mt-4 leading-relaxed">
            Thank you for applying to join Sustainable Rural Bazaar. Our team will review your application within 48 hours. We'll contact you on your registered phone number.
          </p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="bg-[var(--cream)] min-h-screen">
      {/* Hero */}
      <div className="relative py-16 md:py-24 gradient-earth">
        <div className="max-w-5xl mx-auto px-4 md:px-6 text-center text-white">
          <h1 className="font-serif text-3xl md:text-5xl font-bold">Share Your Craft with the World</h1>
          <p className="text-white/70 mt-4 max-w-xl mx-auto text-sm leading-relaxed">
            Join 5,000+ artisans who sell their handcrafted treasures to conscious buyers across India. No listing fees, free pickup, and guaranteed payments.
          </p>
        </div>
      </div>

      {/* Benefits */}
      <div className="max-w-5xl mx-auto px-4 md:px-6 -mt-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { icon: TrendingUp, label: '0% Commission', desc: 'First 6 months' },
            { icon: Users, label: '1L+ Customers', desc: 'Pan-India reach' },
            { icon: Shield, label: 'Guaranteed Pay', desc: 'Within 7 days' },
            { icon: Star, label: 'Free Training', desc: 'Photography & packaging' },
          ].map((b, i) => (
            <div key={i} className="bg-white rounded-xl p-4 border border-[var(--border-warm)]/50 text-center shadow-sm">
              <b.icon className="w-6 h-6 text-[var(--terracotta)] mx-auto mb-2" />
              <p className="font-semibold text-sm">{b.label}</p>
              <p className="text-xs text-[var(--text-muted)]">{b.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Registration form */}
      <div className="max-w-2xl mx-auto px-4 md:px-6 py-10">
        <div className="bg-white rounded-2xl border border-[var(--border-warm)]/50 p-6 md:p-8">
          <div className="flex items-center gap-4 mb-8">
            {['Personal', 'Craft Details', 'Verification'].map((s, i) => (
              <div key={s} className="flex items-center gap-2">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${i <= step ? 'bg-[var(--terracotta)] text-white' : 'bg-[var(--cream-dark)] text-[var(--text-muted)]'}`}>
                  {i < step ? <CheckCircle className="w-4 h-4" /> : i + 1}
                </div>
                <span className="hidden sm:block text-xs font-medium text-[var(--text-secondary)]">{s}</span>
                {i < 2 && <div className={`hidden sm:block w-10 h-0.5 ${i < step ? 'bg-[var(--terracotta)]' : 'bg-[var(--border-warm)]'}`} />}
              </div>
            ))}
          </div>

          {step === 0 && (
            <div className="space-y-4">
              <h2 className="font-serif text-xl font-bold">Personal Information</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div><Label className="text-xs">Full Name *</Label><Input value={form.name} onChange={e => updateForm('name', e.target.value)} className="mt-1 border-[var(--border-warm)]" /></div>
                <div><Label className="text-xs">Phone Number *</Label><Input value={form.phone} onChange={e => updateForm('phone', e.target.value)} className="mt-1 border-[var(--border-warm)]" /></div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div><Label className="text-xs">Village *</Label><Input value={form.village} onChange={e => updateForm('village', e.target.value)} className="mt-1 border-[var(--border-warm)]" /></div>
                <div><Label className="text-xs">District *</Label><Input value={form.district} onChange={e => updateForm('district', e.target.value)} className="mt-1 border-[var(--border-warm)]" /></div>
                <div>
                  <Label className="text-xs">State *</Label>
                  <Select value={form.state} onValueChange={v => updateForm('state', v)}>
                    <SelectTrigger className="mt-1 border-[var(--border-warm)]"><SelectValue placeholder="Select" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Andhra Pradesh">Andhra Pradesh</SelectItem>
                      <SelectItem value="Telangana">Telangana</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          )}

          {step === 1 && (
            <div className="space-y-4">
              <h2 className="font-serif text-xl font-bold">Craft Details</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label className="text-xs">Craft Type *</Label>
                  <Select value={form.craft_type} onValueChange={v => updateForm('craft_type', v)}>
                    <SelectTrigger className="mt-1 border-[var(--border-warm)]"><SelectValue placeholder="Select craft" /></SelectTrigger>
                    <SelectContent>
                      {CRAFT_TYPES.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
                <div><Label className="text-xs">Years of Experience</Label><Input type="number" value={form.experience_years} onChange={e => updateForm('experience_years', e.target.value)} className="mt-1 border-[var(--border-warm)]" /></div>
              </div>
              <div><Label className="text-xs">Tell us about yourself & your craft</Label><Textarea value={form.bio} onChange={e => updateForm('bio', e.target.value)} rows={4} className="mt-1 border-[var(--border-warm)]" placeholder="Share your story..." /></div>
              <div className="p-6 border-2 border-dashed border-[var(--border-warm)] rounded-xl text-center">
                <Upload className="w-8 h-8 text-[var(--text-muted)] mx-auto mb-2" />
                <p className="text-sm text-[var(--text-secondary)]">Upload photos of your craft</p>
                <p className="text-xs text-[var(--text-muted)] mt-1">JPG, PNG up to 5MB</p>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <h2 className="font-serif text-xl font-bold">Verification & Banking</h2>
              <div><Label className="text-xs">Aadhaar Number</Label><Input value={form.aadhaar} onChange={e => updateForm('aadhaar', e.target.value)} className="mt-1 border-[var(--border-warm)]" placeholder="XXXX-XXXX-XXXX" /></div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div><Label className="text-xs">Bank Account Number</Label><Input value={form.bank_account} onChange={e => updateForm('bank_account', e.target.value)} className="mt-1 border-[var(--border-warm)]" /></div>
                <div><Label className="text-xs">IFSC Code</Label><Input value={form.bank_ifsc} onChange={e => updateForm('bank_ifsc', e.target.value)} className="mt-1 border-[var(--border-warm)]" /></div>
              </div>
              <div className="p-6 border-2 border-dashed border-[var(--border-warm)] rounded-xl text-center">
                <Upload className="w-8 h-8 text-[var(--text-muted)] mx-auto mb-2" />
                <p className="text-sm text-[var(--text-secondary)]">Upload ID documents (Aadhaar / Voter ID)</p>
                <p className="text-xs text-[var(--text-muted)] mt-1">PDF, JPG, PNG up to 5MB</p>
              </div>
            </div>
          )}

          <div className="flex justify-between mt-8 pt-6 border-t border-[var(--border-warm)]">
            {step > 0 ? (
              <Button variant="outline" onClick={() => setStep(step - 1)} className="rounded-full border-[var(--border-warm)]">Back</Button>
            ) : <div />}
            {step < 2 ? (
              <Button onClick={() => setStep(step + 1)} className="rounded-full bg-[var(--terracotta)] hover:bg-[var(--terracotta-dark)] text-white gap-2">
                Continue <ArrowRight className="w-4 h-4" />
              </Button>
            ) : (
              <Button onClick={handleSubmit} className="rounded-full bg-[var(--forest)] hover:bg-[var(--forest-dark)] text-white gap-2 px-8">
                Submit Application <CheckCircle className="w-4 h-4" />
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}