'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { ArrowRight, Star, Globe, Shield, Package, Mail } from 'lucide-react';
import { sendEmail } from '@/lib/email-service';

export function HeroSection() {
  const router = useRouter();
  const [showRequestModal, setShowRequestModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [requestForm, setRequestForm] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    productName: '',
    description: '',
    quantity: '',
    budget: '',
    timeline: ''
  });

  const handleBrowseProducts = () => {
    router.push('/products');
  };

  const handleRequestSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const emailData = {
        to: 'info.suplar@gmail.com',
        subject: 'New Product Request from Homepage',
        message: `
          Product Request Details:
          
          Name: ${requestForm.name}
          Email: ${requestForm.email}
          Phone: ${requestForm.phone}
          Company: ${requestForm.company}
          
          Product Name: ${requestForm.productName}
          Description: ${requestForm.description}
          Quantity: ${requestForm.quantity}
          Budget: ${requestForm.budget}
          Timeline: ${requestForm.timeline}
        `,
        name: requestForm.name,
        email: requestForm.email,
        phone: requestForm.phone,
        company: requestForm.company,
        productName: requestForm.productName
      };
      
      const success = await sendEmail(emailData);
      
      if (success) {
        alert('Product request sent successfully! We\'ll get back to you within 24 hours.');
        setRequestForm({
          name: '', email: '', phone: '', company: '', productName: '',
          description: '', quantity: '', budget: '', timeline: ''
        });
        setShowRequestModal(false);
      } else {
        alert('Failed to send request. Please try again.');
      }
    } catch (error) {
      alert('An error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-green-50 pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <div className="flex justify-center mb-6">
            <div className="flex items-center space-x-2 bg-white/80 backdrop-blur-sm rounded-full px-4 py-2 shadow-sm border">
              <Star className="w-4 h-4 text-yellow-500 fill-current" />
              <span className="text-sm font-medium text-gray-700">
                Trusted by 1000+ African businesses
              </span>
            </div>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight">
            Africa's Leading
            <span className="block bg-gradient-to-r from-blue-600 via-purple-600 to-green-600 bg-clip-text text-transparent">
              B2B Supply Platform
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-4xl mx-auto leading-relaxed">
            Source products from verified suppliers, pay with crypto or fiat, and track deliveries 
            end-to-end. Streamline your procurement process with Suplar.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button 
              size="lg" 
              className="text-lg px-8 py-4 bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 shadow-lg hover:shadow-xl transition-all duration-300"
              onClick={handleBrowseProducts}
            >
              Browse Products
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            
            <Dialog open={showRequestModal} onOpenChange={setShowRequestModal}>
              <DialogTrigger asChild>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="text-lg px-8 py-4 border-2 hover:bg-gray-50 transition-all duration-300"
                >
                  Request a Product
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Request a Product</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleRequestSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="hero-req-name">Full Name *</Label>
                      <Input
                        id="hero-req-name"
                        value={requestForm.name}
                        onChange={(e) => setRequestForm({...requestForm, name: e.target.value})}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="hero-req-email">Email *</Label>
                      <Input
                        id="hero-req-email"
                        type="email"
                        value={requestForm.email}
                        onChange={(e) => setRequestForm({...requestForm, email: e.target.value})}
                        required
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="hero-req-phone">Phone</Label>
                      <Input
                        id="hero-req-phone"
                        value={requestForm.phone}
                        onChange={(e) => setRequestForm({...requestForm, phone: e.target.value})}
                      />
                    </div>
                    <div>
                      <Label htmlFor="hero-req-company">Company</Label>
                      <Input
                        id="hero-req-company"
                        value={requestForm.company}
                        onChange={(e) => setRequestForm({...requestForm, company: e.target.value})}
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="hero-req-product">Product Name *</Label>
                    <Input
                      id="hero-req-product"
                      value={requestForm.productName}
                      onChange={(e) => setRequestForm({...requestForm, productName: e.target.value})}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="hero-req-description">Product Description *</Label>
                    <Textarea
                      id="hero-req-description"
                      value={requestForm.description}
                      onChange={(e) => setRequestForm({...requestForm, description: e.target.value})}
                      required
                    />
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="hero-req-quantity">Quantity</Label>
                      <Input
                        id="hero-req-quantity"
                        value={requestForm.quantity}
                        onChange={(e) => setRequestForm({...requestForm, quantity: e.target.value})}
                      />
                    </div>
                    <div>
                      <Label htmlFor="hero-req-budget">Budget Range</Label>
                      <Input
                        id="hero-req-budget"
                        value={requestForm.budget}
                        onChange={(e) => setRequestForm({...requestForm, budget: e.target.value})}
                      />
                    </div>
                    <div>
                      <Label htmlFor="hero-req-timeline">Timeline</Label>
                      <Input
                        id="hero-req-timeline"
                        value={requestForm.timeline}
                        onChange={(e) => setRequestForm({...requestForm, timeline: e.target.value})}
                      />
                    </div>
                  </div>
                  <Button type="submit" className="w-full" disabled={isSubmitting}>
                    {isSubmitting ? 'Sending...' : 'Submit Request'}
                  </Button>
                </form>
              </DialogContent>
            </Dialog>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
            <div className="flex items-center justify-center space-x-3 p-4 bg-white/60 backdrop-blur-sm rounded-lg border shadow-sm">
              <Package className="w-6 h-6 text-blue-600" />
              <span className="font-semibold text-gray-800">200+ SKUs</span>
            </div>
            <div className="flex items-center justify-center space-x-3 p-4 bg-white/60 backdrop-blur-sm rounded-lg border shadow-sm">
              <Globe className="w-6 h-6 text-green-600" />
              <span className="font-semibold text-gray-800">Global Sourcing</span>
            </div>
            <div className="flex items-center justify-center space-x-3 p-4 bg-white/60 backdrop-blur-sm rounded-lg border shadow-sm">
              <Shield className="w-6 h-6 text-purple-600" />
              <span className="font-semibold text-gray-800">Crypto & Fiat</span>
            </div>
            <div className="flex items-center justify-center space-x-3 p-4 bg-white/60 backdrop-blur-sm rounded-lg border shadow-sm">
              <Star className="w-6 h-6 text-orange-600" />
              <span className="font-semibold text-gray-800">90% Fulfillment</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-40 -right-32 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-green-400/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-32 w-80 h-80 bg-gradient-to-tr from-purple-400/20 to-orange-400/20 rounded-full blur-3xl"></div>
      </div>
    </div>
  );
}