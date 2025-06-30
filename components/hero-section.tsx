'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { 
  ArrowRight, 
  Star, 
  Globe, 
  Shield, 
  Package, 
  Mail, 
  Play, 
  Sparkles,
  Building2,
  Factory,
  Truck,
  CreditCard,
  Users,
  Zap,
  CheckCircle,
  ArrowDown,
  Stethoscope,
  Laptop,
  FlaskConical,
  Microscope
} from 'lucide-react';
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

  const categories = [
    { icon: Stethoscope, name: 'Medical', color: 'text-red-500', bgColor: 'bg-red-50' },
    { icon: Zap, name: 'Electrical', color: 'text-yellow-500', bgColor: 'bg-yellow-50' },
    { icon: Laptop, name: 'Office', color: 'text-blue-500', bgColor: 'bg-blue-50' },
    { icon: Microscope, name: 'Lab', color: 'text-purple-500', bgColor: 'bg-purple-50' },
    { icon: FlaskConical, name: 'Research', color: 'text-green-500', bgColor: 'bg-green-50' },
    { icon: Factory, name: 'Industrial', color: 'text-gray-500', bgColor: 'bg-gray-50' }
  ];

  const processFlow = [
    { icon: Package, label: 'Browse', color: 'text-blue-600' },
    { icon: CreditCard, label: 'Pay', color: 'text-green-600' },
    { icon: Truck, label: 'Track', color: 'text-orange-600' },
    { icon: CheckCircle, label: 'Receive', color: 'text-purple-600' }
  ];

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-green-50 pt-16 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Column - Content */}
          <div className="text-left">
            {/* Floating Badge */}
            <div className="flex justify-start mb-8">
              <div className="flex items-center space-x-2 bg-white/80 backdrop-blur-sm rounded-full px-6 py-3 shadow-lg border border-white/20 hover:shadow-xl transition-all duration-300">
                <Sparkles className="w-5 h-5 text-yellow-500" />
                <Star className="w-4 h-4 text-yellow-500 fill-current" />
                <span className="text-sm font-medium text-gray-700">
                  Trusted by 1000+ African businesses
                </span>
              </div>
            </div>
            
            {/* Main Headline */}
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-8 leading-tight">
              Africa's Leading
              <span className="block bg-gradient-to-r from-blue-600 via-purple-600 to-green-600 bg-clip-text text-transparent">
                B2B & B2G Platform
              </span>
            </h1>
            
            {/* Subheadline */}
            <p className="text-xl text-gray-600 mb-10 leading-relaxed">
              Source products from verified suppliers, pay with crypto or fiat, and track deliveries 
              end-to-end. Streamline your procurement with blockchain technology.
            </p>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-6 mb-12">
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
                    Request Product
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

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-4 bg-white/70 backdrop-blur-sm rounded-xl border border-white/30 shadow-lg">
                <div className="font-bold text-gray-800 text-lg">15K+</div>
                <div className="text-sm text-gray-600">Products</div>
              </div>
              <div className="text-center p-4 bg-white/70 backdrop-blur-sm rounded-xl border border-white/30 shadow-lg">
                <div className="font-bold text-gray-800 text-lg">25+</div>
                <div className="text-sm text-gray-600">Countries</div>
              </div>
              <div className="text-center p-4 bg-white/70 backdrop-blur-sm rounded-xl border border-white/30 shadow-lg">
                <div className="font-bold text-gray-800 text-lg">90%</div>
                <div className="text-sm text-gray-600">Satisfaction</div>
              </div>
              <div className="text-center p-4 bg-white/70 backdrop-blur-sm rounded-xl border border-white/30 shadow-lg">
                <div className="font-bold text-gray-800 text-lg">24/7</div>
                <div className="text-sm text-gray-600">Support</div>
              </div>
            </div>
          </div>

          {/* Right Column - Interactive Infographic */}
          <div className="relative">
            {/* Central Hub */}
            <div className="flex justify-center mb-8">
              <div className="relative">
                <div className="w-56 h-56 bg-gradient-to-br from-blue-600 to-green-600 rounded-full flex items-center justify-center shadow-2xl animate-pulse">
                  <div className="text-center text-white">
                    <Package className="w-20 h-20 mx-auto mb-3" />
                    <h3 className="text-2xl font-bold">SUPLAR</h3>
                    <p className="text-sm opacity-90">Supply Chain Hub</p>
                  </div>
                </div>
                
                {/* Orbiting Product Categories */}
                <div className="absolute inset-0 animate-spin" style={{ animationDuration: '30s' }}>
                  {categories.map((category, index) => {
                    const Icon = category.icon;
                    const angle = (index * 60) * (Math.PI / 180);
                    const radius = 160;
                    const x = Math.cos(angle) * radius;
                    const y = Math.sin(angle) * radius;
                    
                    return (
                      <div
                        key={index}
                        className={`absolute w-20 h-20 ${category.bgColor} rounded-full shadow-xl flex flex-col items-center justify-center transform -translate-x-1/2 -translate-y-1/2 hover:scale-110 transition-transform duration-300`}
                        style={{
                          left: `calc(50% + ${x}px)`,
                          top: `calc(50% + ${y}px)`,
                          animation: 'reverse-spin 30s linear infinite'
                        }}
                      >
                        <Icon className={`w-8 h-8 ${category.color} mb-1`} />
                        <span className="text-xs font-medium text-gray-700">{category.name}</span>
                      </div>
                    );
                  })}
                </div>

                {/* Connection Lines */}
                <div className="absolute inset-0 pointer-events-none">
                  {categories.map((_, index) => {
                    const angle = (index * 60) * (Math.PI / 180);
                    const startRadius = 112;
                    const endRadius = 140;
                    const x1 = Math.cos(angle) * startRadius;
                    const y1 = Math.sin(angle) * startRadius;
                    const x2 = Math.cos(angle) * endRadius;
                    const y2 = Math.sin(angle) * endRadius;
                    
                    return (
                      <div
                        key={index}
                        className="absolute w-0.5 h-7 bg-gradient-to-r from-blue-400 to-green-400 opacity-60"
                        style={{
                          left: `calc(50% + ${x1}px)`,
                          top: `calc(50% + ${y1}px)`,
                          transform: `rotate(${(index * 60) + 90}deg)`,
                          transformOrigin: 'center'
                        }}
                      />
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Process Flow */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-white/30">
              <h3 className="text-xl font-bold text-gray-900 text-center mb-6">How It Works</h3>
              <div className="flex justify-between items-center">
                {processFlow.map((step, index) => {
                  const Icon = step.icon;
                  return (
                    <div key={index} className="flex flex-col items-center">
                      <div className={`w-16 h-16 bg-white rounded-full shadow-lg flex items-center justify-center mb-3 hover:scale-110 transition-transform duration-300`}>
                        <Icon className={`w-8 h-8 ${step.color}`} />
                      </div>
                      <span className="text-sm font-medium text-gray-700">{step.label}</span>
                      {index < processFlow.length - 1 && (
                        <ArrowRight className="w-4 h-4 text-gray-400 absolute" style={{ left: '75%' }} />
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Floating Elements */}
            <div className="absolute top-10 right-10 w-6 h-6 bg-blue-400 rounded-full animate-bounce opacity-60" style={{ animationDelay: '0s', animationDuration: '3s' }}></div>
            <div className="absolute bottom-20 left-10 w-4 h-4 bg-green-400 rounded-full animate-bounce opacity-60" style={{ animationDelay: '1s', animationDuration: '4s' }}></div>
            <div className="absolute top-1/3 left-5 w-5 h-5 bg-purple-400 rounded-full animate-bounce opacity-60" style={{ animationDelay: '2s', animationDuration: '5s' }}></div>
          </div>
        </div>

        {/* Bottom Section - Demo Video */}
        <div className="mt-20 max-w-4xl mx-auto">
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
      
      {/* Enhanced Background Decorations */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-40 -right-32 w-96 h-96 bg-gradient-to-br from-blue-400/20 to-green-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-32 w-96 h-96 bg-gradient-to-tr from-purple-400/20 to-orange-400/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-br from-green-400/10 to-blue-400/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-br from-yellow-400/10 to-red-400/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '3s' }}></div>
      </div>

      {/* CSS for reverse spin animation */}
      <style jsx>{`
        @keyframes reverse-spin {
          from {
            transform: rotate(360deg);
          }
          to {
            transform: rotate(0deg);
          }
        }
      `}</style>
    </div>
  );
}