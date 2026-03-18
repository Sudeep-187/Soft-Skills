import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { base44 } from '@/api/base44Client';
import { MapPin, Truck, CreditCard, Check, ArrowRight, ArrowLeft, Shield, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { motion } from 'framer-motion';

const steps = [
  { id: 'address', label: 'Address', icon: MapPin },
  { id: 'delivery', label: 'Delivery', icon: Truck },
  { id: 'payment', label: 'Payment', icon: CreditCard },
  { id: 'review', label: 'Review', icon: Check },
];

export default function Checkout() {
  const [currentStep, setCurrentStep] = useState(0);
  const [cartItems, setCartItems] = useState([]);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderNumber, setOrderNumber] = useState('');
  const [address, setAddress] = useState({ full_name: '', phone: '', address_line: '', landmark: '', city: '', state: '', pincode: '' });
  const [deliveryOption, setDeliveryOption] = useState('standard');
  const [paymentMethod, setPaymentMethod] = useState('upi');

  useEffect(() => {
    const load = async () => {
      const items = await base44.entities.CartItem.filter({ saved_for_later: false });
      setCartItems(items);
    };
    load();
  }, []);

  const subtotal = cartItems.reduce((sum, i) => sum + (i.price || 0) * (i.quantity || 1), 0);
  const shipping = deliveryOption === 'express' ? 149 : (subtotal > 999 ? 0 : 99);
  const total = subtotal + shipping;

  const placeOrder = async () => {
    const num = 'SRB' + Date.now().toString().slice(-8);
    await base44.entities.Order.create({
      order_number: num,
      items: cartItems.map(i => ({ product_id: i.product_id, product_name: i.product_name, price: i.price, quantity: i.quantity, image: i.product_image })),
      total_amount: total,
      shipping_address: address,
      payment_method: paymentMethod,
      status: 'placed',
    });
    for (const item of cartItems) { await base44.entities.CartItem.delete(item.id); }
    setOrderNumber(num);
    setOrderPlaced(true);
  };

  const inputClasses = "mt-2 rounded-xl h-12 bg-zinc-950 border-white/10 text-white placeholder-white/20 focus:border-[#D4A017] focus:ring-[#D4A017]/20";
  const labelClasses = "text-[10px] font-bold uppercase tracking-widest text-[#D4A017]/70";

  if (orderPlaced) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center px-4 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#D4A017]/20 blur-[120px] rounded-full mix-blend-screen" />
        </div>
        <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="text-center max-w-md relative z-10">
          <div className="w-24 h-24 rounded-full bg-[#D4A017]/10 border border-[#D4A017]/30 flex items-center justify-center mx-auto mb-8 shadow-[0_0_30px_rgba(212,160,23,0.2)]">
            <Check className="w-10 h-10 text-[#D4A017]" />
          </div>
          <h2 className="font-serif text-4xl font-bold text-white mb-3">Tribute Secured</h2>
          <p className="text-[#D4A017] font-bold uppercase tracking-widest text-sm mb-6">Charter #{orderNumber}</p>
          <p className="text-sm text-white/50 leading-relaxed mb-10">Your patronage honours the artisans of South India. The craft shall soon journey to your abode.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to={createPageUrl('Profile') + '?tab=orders'}>
              <Button className="w-full sm:w-auto h-14 rounded-full bg-[#D4A017] hover:bg-[#E8BB3A] text-black font-bold px-8 gap-3 transition hover:scale-105">View Charter <ChevronRight className="w-4 h-4" /></Button>
            </Link>
            <Link to={createPageUrl('Home')}>
              <Button variant="outline" className="w-full sm:w-auto h-14 rounded-full border-white/20 bg-transparent text-white hover:bg-white/5 hover:text-white px-8">Return to Realm</Button>
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white pt-20 pb-20">
      {/* Header */}
      <div className="bg-zinc-950 border-b border-white/5 py-4">
        <div className="max-w-5xl mx-auto px-6 flex items-center justify-between">
          <Link to={createPageUrl('Home')} className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center shadow-[0_0_15px_rgba(212,160,23,0.3)] transition transform group-hover:scale-105" style={{ background: 'linear-gradient(135deg, #D4A017, #E8BB3A)' }}>
              <span className="text-black font-black text-xl" style={{ fontFamily: 'Playfair Display, serif' }}>R</span>
            </div>
            <span className="font-serif font-bold text-xl text-white">Secure Checkout</span>
          </Link>
          <div className="flex items-center gap-2 text-[10px] uppercase font-bold tracking-widest text-[#D4A017]/50"><Shield className="w-4 h-4" /> Encrypted Protocol</div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-12">
        <div className="flex items-center justify-between mb-12 relative">
          <div className="absolute left-0 right-0 top-1/2 h-px bg-white/10 -translate-y-1/2" />
          {steps.map((step, i) => (
            <div key={step.id} className="relative z-10 flex flex-col items-center gap-3 bg-black px-4">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 ${i <= currentStep ? 'bg-[#D4A017] text-black shadow-[0_0_15px_rgba(212,160,23,0.3)]' : 'bg-zinc-900 border border-white/20 text-white/30'}`}>
                {i < currentStep ? <Check className="w-5 h-5" /> : i + 1}
              </div>
              <span className={`hidden sm:block text-[10px] uppercase tracking-widest font-bold transition-colors ${i <= currentStep ? 'text-[#D4A017]' : 'text-white/30'}`}>{step.label}</span>
            </div>
          ))}
        </div>

        <div className="flex flex-col lg:flex-row gap-10">
          <div className="flex-1">
            <motion.div key={currentStep} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="bg-zinc-900 rounded-3xl border border-white/10 p-8 shadow-2xl">
              {/* Step 0 */}
              {currentStep === 0 && (
                <div className="space-y-6">
                  <h2 className="font-serif text-3xl font-bold text-white mb-8 border-b border-white/10 pb-4">Destination Coordinates</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div><Label className={labelClasses}>Full Name *</Label><Input value={address.full_name} onChange={e => setAddress({...address, full_name: e.target.value})} className={inputClasses} /></div>
                    <div><Label className={labelClasses}>Phone *</Label><Input value={address.phone} onChange={e => setAddress({...address, phone: e.target.value})} className={inputClasses} /></div>
                  </div>
                  <div><Label className={labelClasses}>Address Line *</Label><Input value={address.address_line} onChange={e => setAddress({...address, address_line: e.target.value})} className={inputClasses} /></div>
                  <div><Label className={labelClasses}>Landmark</Label><Input value={address.landmark} onChange={e => setAddress({...address, landmark: e.target.value})} className={inputClasses} /></div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                    <div><Label className={labelClasses}>City *</Label><Input value={address.city} onChange={e => setAddress({...address, city: e.target.value})} className={inputClasses} /></div>
                    <div><Label className={labelClasses}>State *</Label><Input value={address.state} onChange={e => setAddress({...address, state: e.target.value})} className={inputClasses} /></div>
                    <div><Label className={labelClasses}>Pincode *</Label><Input value={address.pincode} onChange={e => setAddress({...address, pincode: e.target.value})} maxLength={6} className={inputClasses} /></div>
                  </div>
                </div>
              )}

              {/* Step 1 */}
              {currentStep === 1 && (
                <div className="space-y-6">
                  <h2 className="font-serif text-3xl font-bold text-white mb-8 border-b border-white/10 pb-4">Caravan Speed</h2>
                  <RadioGroup value={deliveryOption} onValueChange={setDeliveryOption} className="space-y-4">
                    <label className={`flex items-center gap-5 p-6 rounded-2xl border cursor-pointer transition ${deliveryOption === 'standard' ? 'border-[#D4A017] bg-[#D4A017]/10' : 'border-white/10 bg-black hover:border-white/20'}`}>
                      <RadioGroupItem value="standard" />
                      <div className="flex-1">
                        <p className={`font-bold text-base ${deliveryOption === 'standard' ? 'text-[#D4A017]' : 'text-white'}`}>Standard Journey</p>
                        <p className="text-xs text-white/40 mt-1 uppercase tracking-wider font-bold">5-7 sunrises</p>
                      </div>
                      <span className="font-black text-lg text-white">{subtotal > 999 ? 'Free' : '₹99'}</span>
                    </label>
                    <label className={`flex items-center gap-5 p-6 rounded-2xl border cursor-pointer transition ${deliveryOption === 'express' ? 'border-[#D4A017] bg-[#D4A017]/10' : 'border-white/10 bg-black hover:border-white/20'}`}>
                      <RadioGroupItem value="express" />
                      <div className="flex-1">
                        <p className={`font-bold text-base ${deliveryOption === 'express' ? 'text-[#D4A017]' : 'text-white'}`}>Swift Courier</p>
                        <p className="text-xs text-white/40 mt-1 uppercase tracking-wider font-bold">2-3 sunrises</p>
                      </div>
                      <span className="font-black text-lg text-white">₹149</span>
                    </label>
                  </RadioGroup>
                </div>
              )}

              {/* Step 2 */}
              {currentStep === 2 && (
                <div className="space-y-6">
                  <h2 className="font-serif text-3xl font-bold text-white mb-8 border-b border-white/10 pb-4">Exchange Protocol</h2>
                  <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="space-y-4">
                    {[
                      { value: 'upi', label: 'UPI Array (GPay, PhonePe, Paytm)', desc: 'Instantaneous transfer' },
                      { value: 'card', label: 'Credit / Debit Plaque', desc: 'Visa, Mastercard, RuPay algorithms' },
                      { value: 'netbanking', label: 'Net Banking Interface', desc: 'Secure bank portal transfer' },
                      { value: 'cod', label: 'Physical Currency on Arrival', desc: '+₹40 handling fee' },
                    ].map(opt => (
                      <label key={opt.value} className={`flex items-center gap-5 p-6 rounded-2xl border cursor-pointer transition ${paymentMethod === opt.value ? 'border-[#D4A017] bg-[#D4A017]/10' : 'border-white/10 bg-black hover:border-white/20'}`}>
                        <RadioGroupItem value={opt.value} />
                        <div>
                          <p className={`font-bold text-base ${paymentMethod === opt.value ? 'text-[#D4A017]' : 'text-white'}`}>{opt.label}</p>
                          <p className="text-xs text-white/40 mt-1 uppercase tracking-wider font-bold">{opt.desc}</p>
                        </div>
                      </label>
                    ))}
                  </RadioGroup>
                </div>
              )}

              {/* Step 3 */}
              {currentStep === 3 && (
                <div className="space-y-8">
                  <h2 className="font-serif text-3xl font-bold text-white mb-8 border-b border-white/10 pb-4">Manifest Review</h2>
                  
                  <div className="space-y-4">
                    <h4 className={labelClasses}>Acquisitions</h4>
                    <div className="grid gap-4">
                      {cartItems.map(item => (
                        <div key={item.id} className="flex items-center gap-4 p-4 bg-zinc-950 rounded-2xl border border-white/5">
                          <img src={item.product_image || 'https://images.unsplash.com/photo-1606722590583-6951b5ea92ad?w=100&h=100&fit=crop'} alt="" className="w-16 h-16 rounded-xl object-cover" />
                          <div className="flex-1">
                            <p className="text-sm font-bold text-white line-clamp-1">{item.product_name}</p>
                            <p className="text-xs text-white/40 font-bold uppercase tracking-wider mt-1">Allocation: {item.quantity}</p>
                          </div>
                          <span className="font-bold text-lg text-white">₹{((item.price || 0) * (item.quantity || 1)).toLocaleString()}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="p-6 bg-zinc-950 rounded-2xl border border-white/5 relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-1.5 h-full bg-[#D4A017]" />
                    <h4 className={labelClasses + " mb-4"}>Destination Coordinates</h4>
                    <p className="font-bold text-white text-lg">{address.full_name}</p>
                    <p className="text-white/60 text-sm mt-2 leading-relaxed">{address.address_line},<br />{address.city}, {address.state} — {address.pincode}</p>
                    <p className="text-white/40 text-sm font-bold uppercase tracking-wider mt-4">Comms: {address.phone}</p>
                  </div>
                </div>
              )}

              <div className="flex justify-between mt-12 pt-8 border-t border-white/10">
                {currentStep > 0 ? (
                  <Button variant="outline" onClick={() => setCurrentStep(currentStep - 1)} className="rounded-full gap-2 border-white/20 text-white hover:bg-white/10 bg-transparent h-12 px-6">
                    <ArrowLeft className="w-4 h-4" /> Go Back
                  </Button>
                ) : (
                  <Link to={createPageUrl('Cart')}>
                    <Button variant="outline" className="rounded-full gap-2 border-white/20 text-white hover:bg-white/10 bg-transparent h-12 px-6">
                      <ArrowLeft className="w-4 h-4" /> Halt Process
                    </Button>
                  </Link>
                )}
                
                {currentStep < 3 ? (
                  <Button onClick={() => setCurrentStep(currentStep + 1)} className="rounded-full bg-[#D4A017] hover:bg-[#E8BB3A] text-black font-bold h-12 px-8 gap-2 border-none">
                    Proceed <ArrowRight className="w-4 h-4" />
                  </Button>
                ) : (
                  <Button onClick={placeOrder} className="rounded-full bg-[#A3E635] hover:bg-[#84cc16] text-black font-black text-base h-14 px-8 gap-3 shadow-[0_0_20px_rgba(163,230,53,0.3)]">
                    Authorize Transfer — ₹{total.toLocaleString()} <Check className="w-5 h-5" />
                  </Button>
                )}
              </div>
            </motion.div>
          </div>

          <div className="lg:w-[350px] shrink-0">
            <div className="bg-zinc-950 rounded-3xl border border-white/10 p-8 sticky top-32">
              <h3 className="font-serif text-2xl font-bold text-white mb-6 border-b border-white/10 pb-4">Ledger Summary</h3>
              <div className="space-y-4 text-sm font-bold text-white/50">
                <div className="flex justify-between"><span>Relics ({cartItems.length})</span><span className="text-white">₹{subtotal.toLocaleString()}</span></div>
                <div className="flex justify-between"><span>Caravan Tribute</span><span>{shipping === 0 ? <span className="text-[#D4A017]">Waived</span> : `₹${shipping}`}</span></div>
                <div className="border-t border-white/10 pt-6 mt-6 flex justify-between items-center text-xl font-black text-white">
                  <span>Grand Total</span><span className="text-[#D4A017]">₹{total.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}