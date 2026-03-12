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

  if (orderPlaced) {
    return (
      <div className="min-h-screen bg-[var(--cream)] flex items-center justify-center px-4">
        <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="text-center max-w-md">
          <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
            <Check className="w-10 h-10 text-green-600" />
          </div>
          <h2 className="font-serif text-3xl font-bold text-[var(--text-primary)]">Order Placed!</h2>
          <p className="text-[var(--text-muted)] mt-2">Order #{orderNumber}</p>
          <p className="text-sm text-[var(--text-secondary)] mt-4">Thank you for supporting rural artisans. Your order helps preserve centuries of craft heritage.</p>
          <div className="flex flex-col sm:flex-row gap-3 mt-8 justify-center">
            <Link to={createPageUrl('Profile') + '?tab=orders'}>
              <Button className="rounded-full bg-[var(--terracotta)] hover:bg-[var(--terracotta-dark)] text-white px-6 gap-2">View Order <ChevronRight className="w-4 h-4" /></Button>
            </Link>
            <Link to={createPageUrl('Home')}>
              <Button variant="outline" className="rounded-full border-[var(--border-warm)] px-6">Continue Shopping</Button>
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--cream)]">
      {/* Mini header */}
      <div className="bg-[var(--warm-white)] border-b border-[var(--border-warm)] py-4">
        <div className="max-w-4xl mx-auto px-4 flex items-center justify-between">
          <Link to={createPageUrl('Home')} className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full gradient-warm flex items-center justify-center"><span className="text-white font-serif font-bold">S</span></div>
            <span className="font-serif font-bold text-[var(--text-primary)]">Checkout</span>
          </Link>
          <div className="flex items-center gap-1 text-xs text-[var(--text-muted)]"><Shield className="w-3.5 h-3.5" /> Secure Checkout</div>
        </div>
      </div>

      {/* Steps */}
      <div className="max-w-4xl mx-auto px-4 py-6">
        <div className="flex items-center justify-between mb-8">
          {steps.map((step, i) => (
            <div key={step.id} className="flex items-center gap-2">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition ${i <= currentStep ? 'bg-[var(--terracotta)] text-white' : 'bg-[var(--cream-dark)] text-[var(--text-muted)]'}`}>
                {i < currentStep ? <Check className="w-4 h-4" /> : i + 1}
              </div>
              <span className={`hidden sm:block text-sm ${i <= currentStep ? 'text-[var(--text-primary)] font-medium' : 'text-[var(--text-muted)]'}`}>{step.label}</span>
              {i < steps.length - 1 && <div className={`hidden sm:block w-16 md:w-24 h-0.5 mx-2 ${i < currentStep ? 'bg-[var(--terracotta)]' : 'bg-[var(--border-warm)]'}`} />}
            </div>
          ))}
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          <div className="flex-1">
            <motion.div key={currentStep} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="bg-white rounded-2xl border border-[var(--border-warm)]/50 p-6">
              {/* Step 0: Address */}
              {currentStep === 0 && (
                <div className="space-y-4">
                  <h2 className="font-serif text-xl font-bold">Delivery Address</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div><Label className="text-xs">Full Name *</Label><Input value={address.full_name} onChange={e => setAddress({...address, full_name: e.target.value})} className="mt-1 border-[var(--border-warm)]" /></div>
                    <div><Label className="text-xs">Phone *</Label><Input value={address.phone} onChange={e => setAddress({...address, phone: e.target.value})} className="mt-1 border-[var(--border-warm)]" /></div>
                  </div>
                  <div><Label className="text-xs">Address *</Label><Input value={address.address_line} onChange={e => setAddress({...address, address_line: e.target.value})} className="mt-1 border-[var(--border-warm)]" /></div>
                  <div><Label className="text-xs">Landmark</Label><Input value={address.landmark} onChange={e => setAddress({...address, landmark: e.target.value})} className="mt-1 border-[var(--border-warm)]" /></div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div><Label className="text-xs">City *</Label><Input value={address.city} onChange={e => setAddress({...address, city: e.target.value})} className="mt-1 border-[var(--border-warm)]" /></div>
                    <div><Label className="text-xs">State *</Label><Input value={address.state} onChange={e => setAddress({...address, state: e.target.value})} className="mt-1 border-[var(--border-warm)]" /></div>
                    <div><Label className="text-xs">Pincode *</Label><Input value={address.pincode} onChange={e => setAddress({...address, pincode: e.target.value})} maxLength={6} className="mt-1 border-[var(--border-warm)]" /></div>
                  </div>
                </div>
              )}

              {/* Step 1: Delivery */}
              {currentStep === 1 && (
                <div className="space-y-4">
                  <h2 className="font-serif text-xl font-bold">Delivery Options</h2>
                  <RadioGroup value={deliveryOption} onValueChange={setDeliveryOption} className="space-y-3">
                    <label className={`flex items-center gap-4 p-4 rounded-xl border cursor-pointer transition ${deliveryOption === 'standard' ? 'border-[var(--terracotta)] bg-[var(--terracotta)]/5' : 'border-[var(--border-warm)]'}`}>
                      <RadioGroupItem value="standard" />
                      <div className="flex-1">
                        <p className="font-medium text-sm">Standard Delivery</p>
                        <p className="text-xs text-[var(--text-muted)]">5-7 business days</p>
                      </div>
                      <span className="font-medium text-sm">{subtotal > 999 ? 'Free' : '₹99'}</span>
                    </label>
                    <label className={`flex items-center gap-4 p-4 rounded-xl border cursor-pointer transition ${deliveryOption === 'express' ? 'border-[var(--terracotta)] bg-[var(--terracotta)]/5' : 'border-[var(--border-warm)]'}`}>
                      <RadioGroupItem value="express" />
                      <div className="flex-1">
                        <p className="font-medium text-sm">Express Delivery</p>
                        <p className="text-xs text-[var(--text-muted)]">2-3 business days</p>
                      </div>
                      <span className="font-medium text-sm">₹149</span>
                    </label>
                  </RadioGroup>
                </div>
              )}

              {/* Step 2: Payment */}
              {currentStep === 2 && (
                <div className="space-y-4">
                  <h2 className="font-serif text-xl font-bold">Payment Method</h2>
                  <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="space-y-3">
                    {[
                      { value: 'upi', label: 'UPI (GPay, PhonePe, Paytm)', desc: 'Instant payment' },
                      { value: 'card', label: 'Credit / Debit Card', desc: 'Visa, Mastercard, RuPay' },
                      { value: 'netbanking', label: 'Net Banking', desc: 'All major banks' },
                      { value: 'cod', label: 'Cash on Delivery', desc: '+₹40 COD charges' },
                    ].map(opt => (
                      <label key={opt.value} className={`flex items-center gap-4 p-4 rounded-xl border cursor-pointer transition ${paymentMethod === opt.value ? 'border-[var(--terracotta)] bg-[var(--terracotta)]/5' : 'border-[var(--border-warm)]'}`}>
                        <RadioGroupItem value={opt.value} />
                        <div>
                          <p className="font-medium text-sm">{opt.label}</p>
                          <p className="text-xs text-[var(--text-muted)]">{opt.desc}</p>
                        </div>
                      </label>
                    ))}
                  </RadioGroup>
                </div>
              )}

              {/* Step 3: Review */}
              {currentStep === 3 && (
                <div className="space-y-6">
                  <h2 className="font-serif text-xl font-bold">Review Order</h2>
                  <div className="space-y-3">
                    {cartItems.map(item => (
                      <div key={item.id} className="flex items-center gap-3 p-3 bg-[var(--cream)] rounded-xl">
                        <img src={item.product_image || 'https://images.unsplash.com/photo-1606722590583-6951b5ea92ad?w=100&h=100&fit=crop'} alt="" className="w-14 h-14 rounded-lg object-cover" />
                        <div className="flex-1">
                          <p className="text-sm font-medium line-clamp-1">{item.product_name}</p>
                          <p className="text-xs text-[var(--text-muted)]">Qty: {item.quantity}</p>
                        </div>
                        <span className="font-medium text-sm">₹{((item.price || 0) * (item.quantity || 1)).toLocaleString()}</span>
                      </div>
                    ))}
                  </div>
                  <div className="p-4 bg-[var(--cream)] rounded-xl text-sm">
                    <p className="font-medium">{address.full_name}</p>
                    <p className="text-[var(--text-muted)] text-xs mt-1">{address.address_line}, {address.city}, {address.state} - {address.pincode}</p>
                    <p className="text-[var(--text-muted)] text-xs">{address.phone}</p>
                  </div>
                </div>
              )}

              {/* Navigation */}
              <div className="flex justify-between mt-8 pt-6 border-t border-[var(--border-warm)]">
                {currentStep > 0 ? (
                  <Button variant="outline" onClick={() => setCurrentStep(currentStep - 1)} className="rounded-full gap-2 border-[var(--border-warm)]">
                    <ArrowLeft className="w-4 h-4" /> Back
                  </Button>
                ) : (
                  <Link to={createPageUrl('Cart')}>
                    <Button variant="outline" className="rounded-full gap-2 border-[var(--border-warm)]">
                      <ArrowLeft className="w-4 h-4" /> Back to Cart
                    </Button>
                  </Link>
                )}
                {currentStep < 3 ? (
                  <Button onClick={() => setCurrentStep(currentStep + 1)} className="rounded-full bg-[var(--terracotta)] hover:bg-[var(--terracotta-dark)] text-white gap-2">
                    Continue <ArrowRight className="w-4 h-4" />
                  </Button>
                ) : (
                  <Button onClick={placeOrder} className="rounded-full bg-[var(--forest)] hover:bg-[var(--forest-dark)] text-white gap-2 px-8">
                    Place Order — ₹{total.toLocaleString()} <Check className="w-4 h-4" />
                  </Button>
                )}
              </div>
            </motion.div>
          </div>

          {/* Summary sidebar */}
          <div className="lg:w-80 shrink-0">
            <div className="bg-white rounded-2xl border border-[var(--border-warm)]/50 p-5 sticky top-28">
              <h3 className="font-semibold text-sm mb-4">Summary</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between"><span className="text-[var(--text-muted)]">Items ({cartItems.length})</span><span>₹{subtotal.toLocaleString()}</span></div>
                <div className="flex justify-between"><span className="text-[var(--text-muted)]">Shipping</span><span>{shipping === 0 ? <span className="text-green-600">Free</span> : `₹${shipping}`}</span></div>
                <div className="border-t border-[var(--border-warm)] pt-2 flex justify-between font-bold"><span>Total</span><span>₹{total.toLocaleString()}</span></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}