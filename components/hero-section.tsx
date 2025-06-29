'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { ArrowRight, Star, Globe, Shield, Package, Mail, Play, Sparkles } from 'lucide-react';
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
    <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-green-50 pt-16 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
        <div className="text-center">
          {/* Floating Badge */}
          <div className="flex justify-center mb-8">
            <div className="flex items-center space-x-2 bg-white/80 backdrop-blur-sm rounded-full px-6 py-3 shadow-lg border border-white/20 hover:shadow-xl transition-all duration-300">
              <Sparkles className="w-5 h-5 text-yellow-500" />
              <Star className="w-4 h-4 text-yellow-500 fill-current" />
              <span className="text-sm font-medium text-gray-700">
                Trusted by 1000+ African businesses & organizations
              </span>
              <Star className="w-4 h-4 text-yellow-500 fill-current" />
            </div>
          </div>
          
          {/* Main Headline */}
          <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-8 leading-tight">
            Africa's Leading
            <span className="block bg-gradient-to-r from-blue-600 via-purple-600 to-green-600 bg-clip-text text-transparent animate-pulse">
              B2B & B2G Supply Platform
            </span>
          </h1>
          
          {/* Subheadline */}
          <p className="text-xl md:text-2xl text-gray-600 mb-10 max-w-4xl mx-auto leading-relaxed">
            Source products from verified suppliers, pay with crypto or fiat, and track deliveries 
            end-to-end. Streamline your procurement process with our comprehensive supply chain management platform.
          </p>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
            <Button 
              size="lg" 
              className="text-lg px-10 py-6 bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
              onClick={handleBrowseProducts}
            >
              <Package className="mr-3 w-6 h-6" />
              Browse Products
              <ArrowRight className="ml-3 w-6 h-6" />
            </Button>
            
            <Dialog open={showRequestModal} onOpenChange={setShowRequestModal}>
              <DialogTrigger asChild>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="text-lg px-10 py-6 border-2 border-gray-300 hover:bg-gray-50 hover:border-gray-400 transition-all duration-300 transform hover:scale-105 shadow-lg"
                >
                  <Mail className="mr-3 w-6 h-6" />
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
          
          {/* Feature Highlights */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-6xl mx-auto mb-16">
            <div className="flex items-center justify-center space-x-3 p-6 bg-white/70 backdrop-blur-sm rounded-2xl border border-white/30 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <Package className="w-8 h-8 text-blue-600" />
              <div className="text-left">
                <div className="font-bold text-gray-800 text-lg">15K+</div>
                <div className="text-sm text-gray-600">Products</div>
              </div>
            </div>
            <div className="flex items-center justify-center space-x-3 p-6 bg-white/70 backdrop-blur-sm rounded-2xl border border-white/30 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <Globe className="w-8 h-8 text-green-600" />
              <div className="text-left">
                <div className="font-bold text-gray-800 text-lg">Global</div>
                <div className="text-sm text-gray-600">Sourcing</div>
              </div>
            </div>
            <div className="flex items-center justify-center space-x-3 p-6 bg-white/70 backdrop-blur-sm rounded-2xl border border-white/30 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <Shield className="w-8 h-8 text-purple-600" />
              <div className="text-left">
                <div className="font-bold text-gray-800 text-lg">Crypto</div>
                <div className="text-sm text-gray-600">& Fiat</div>
              </div>
            </div>
            <div className="flex items-center justify-center space-x-3 p-6 bg-white/70 backdrop-blur-sm rounded-2xl border border-white/30 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <Star className="w-8 h-8 text-orange-600" />
              <div className="text-left">
                <div className="font-bold text-gray-800 text-lg">90%</div>
                <div className="text-sm text-gray-600">Satisfaction</div>
              </div>
            </div>
          </div>

          {/* Demo Video Placeholder */}
          <div className="max-w-4xl mx-auto">
            <div className="relative bg-gradient-to-br from-gray-900 to-blue-900 rounded-2xl p-12 shadow-2xl">
              <div className="text-center text-white">
                <Play className="w-20 h-20 mx-auto mb-6 text-blue-300" />
                <h3 className="text-2xl font-bold mb-4">See Suplar in Action</h3>
                <p className="text-blue-200 mb-6">
                  Watch how businesses across Africa are transforming their procurement with our platform
                </p>
                <Button 
                  variant="outline" 
                  className="border-white text-white hover:bg-white hover:text-gray-900"
                  onClick={() => alert('Demo video coming soon! Contact us for a live demonstration.')}
                >
                  <Play className="w-5 h-5 mr-2" />
                  Watch Demo
                </Button>
              </div>
              
              {/* Background Pattern */}
              <div className="absolute inset-0 opacity-10 pointer-events-none">
                <div className="absolute top-4 left-4 w-16 h-16 border border-white/30 rounded-full"></div>
                <div className="absolute bottom-4 right-4 w-20 h-20 border border-white/30 rounded-full"></div>
                <div className="absolute top-1/2 left-1/4 w-12 h-12 border border-white/30 rounded-full"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Enhanced Background Decorations */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-40 -right-32 w-96 h-96 bg-gradient-to-br from-blue-400/20 to-green-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-32 w-96 h-96 bg-gradient-to-tr from-purple-400/20 to-orange-400/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-br from-green-400/10 to-blue-400/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-br from-yellow-400/10 to-red-400/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '3s' }}></div>
      </div>

      {/* Floating Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-4 h-4 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0s', animationDuration: '3s' }}></div>
        <div className="absolute top-40 right-20 w-3 h-3 bg-green-400 rounded-full animate-bounce" style={{ animationDelay: '1s', animationDuration: '4s' }}></div>
        <div className="absolute bottom-40 left-20 w-5 h-5 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '2s', animationDuration: '5s' }}></div>
        <div className="absolute bottom-20 right-10 w-4 h-4 bg-orange-400 rounded-full animate-bounce" style={{ animationDelay: '3s', animationDuration: '3.5s' }}></div>
      </div>
    </div>
  );
}