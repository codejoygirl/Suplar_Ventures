'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Search, ShoppingCart, CreditCard, Truck, Package, Users, Globe, CheckCircle, Mail } from 'lucide-react';
import { sendEmail } from '@/lib/email-service';

const steps = [
  {
    icon: Search,
    step: '01',
    title: 'Browse & Source',
    description: 'Search through thousands of products from verified global suppliers with competitive pricing.',
    details: [
      'Access 200+ product categories',
      'Compare prices from multiple suppliers',
      'Read verified reviews and ratings',
      'Filter by location, price, and specifications'
    ],
    color: 'text-blue-600',
    bgColor: 'bg-blue-50',
    borderColor: 'border-blue-200',
  },
  {
    icon: ShoppingCart,
    step: '02',
    title: 'Add to Cart & Checkout',
    description: 'Select your products, add them to cart, and proceed to our streamlined checkout process.',
    details: [
      'Smart cart management',
      'Bulk quantity discounts',
      'Real-time inventory updates',
      'Secure checkout process'
    ],
    color: 'text-green-600',
    bgColor: 'bg-green-50',
    borderColor: 'border-green-200',
  },
  {
    icon: CreditCard,
    step: '03',
    title: 'Pay with Crypto or Fiat',
    description: 'Complete payments instantly using XLM, USDC on Stellar network, or traditional payment methods.',
    details: [
      'Crypto payments (XLM, USDC)',
      'Credit/Debit cards',
      'Bank transfers',
      'Secure wallet integration'
    ],
    color: 'text-purple-600',
    bgColor: 'bg-purple-50',
    borderColor: 'border-purple-200',
  },
  {
    icon: Truck,
    step: '04',
    title: 'Track & Receive',
    description: 'Monitor your shipment in real-time from supplier to your location with complete transparency.',
    details: [
      'Real-time tracking updates',
      'SMS and email notifications',
      'Delivery confirmation',
      'Quality assurance checks'
    ],
    color: 'text-orange-600',
    bgColor: 'bg-orange-50',
    borderColor: 'border-orange-200',
  },
];

const benefits = [
  {
    icon: Package,
    title: 'Global Sourcing',
    description: 'Access to verified suppliers worldwide with quality assurance.',
  },
  {
    icon: Users,
    title: 'Trusted Network',
    description: 'Join 1000+ businesses already using our platform.',
  },
  {
    icon: Globe,
    title: 'African Focus',
    description: 'Optimized for African businesses with local support.',
  },
];

export default function HowItWorksPage() {
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showContactModal, setShowContactModal] = useState(false);

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const emailData = {
        to: 'info.suplar@gmail.com',
        subject: 'How It Works - Contact Inquiry',
        message: `
          Contact Inquiry from How It Works Page:
          
          Name: ${contactForm.name}
          Email: ${contactForm.email}
          Phone: ${contactForm.phone}
          Company: ${contactForm.company}
          
          Message:
          ${contactForm.message}
        `,
        name: contactForm.name,
        email: contactForm.email,
        phone: contactForm.phone,
        company: contactForm.company
      };
      
      const success = await sendEmail(emailData);
      
      if (success) {
        alert('Thank you for your inquiry! We\'ll get back to you within 24 hours.');
        setContactForm({ name: '', email: '', phone: '', company: '', message: '' });
        setShowContactModal(false);
      } else {
        alert('Failed to send message. Please try again.');
      }
    } catch (error) {
      alert('An error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4 text-sm font-medium">
            How It Works
          </Badge>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Four Simple Steps to Success
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            From sourcing to delivery, our streamlined process makes global trade 
            accessible to every African business.
          </p>
        </div>
        
        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div key={index} className="relative">
                <Card className={`bg-white rounded-2xl p-8 border-2 ${step.borderColor} hover:shadow-xl transition-all duration-300 hover:-translate-y-2 group h-full`}>
                  <div className={`w-16 h-16 ${step.bgColor} rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className={`w-8 h-8 ${step.color}`} />
                  </div>
                  
                  <div className="flex items-center mb-4">
                    <span className={`text-2xl font-bold ${step.color} mr-3`}>
                      {step.step}
                    </span>
                    <h3 className="text-xl font-semibold text-gray-900">
                      {step.title}
                    </h3>
                  </div>
                  
                  <p className="text-gray-600 leading-relaxed mb-4">
                    {step.description}
                  </p>
                  
                  <ul className="space-y-2">
                    {step.details.map((detail, idx) => (
                      <li key={idx} className="flex items-center text-sm text-gray-600">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                        {detail}
                      </li>
                    ))}
                  </ul>
                </Card>
                
                {/* Connection line */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-0.5 bg-gradient-to-r from-gray-300 to-gray-200 transform -translate-y-1/2 z-10">
                    <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-2 h-2 bg-gray-400 rounded-full"></div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Benefits Section */}
        <div className="bg-white rounded-2xl p-8 mb-16">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">
            Why Choose Suplar?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-8 h-8 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {benefit.title}
                  </h3>
                  <p className="text-gray-600">
                    {benefit.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-blue-600 to-green-600 rounded-2xl p-8 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of businesses already transforming their procurement process.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-white text-blue-600 hover:bg-gray-100"
              onClick={() => window.location.href = '/products'}
            >
              Browse Products
            </Button>
            <Dialog open={showContactModal} onOpenChange={setShowContactModal}>
              <DialogTrigger asChild>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-white text-white hover:bg-white hover:text-blue-600"
                >
                  <Mail className="w-4 h-4 mr-2" />
                  Contact Us
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Contact Us</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleContactSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="contact-name">Name *</Label>
                      <Input
                        id="contact-name"
                        value={contactForm.name}
                        onChange={(e) => setContactForm({...contactForm, name: e.target.value})}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="contact-email">Email *</Label>
                      <Input
                        id="contact-email"
                        type="email"
                        value={contactForm.email}
                        onChange={(e) => setContactForm({...contactForm, email: e.target.value})}
                        required
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="contact-phone">Phone</Label>
                      <Input
                        id="contact-phone"
                        value={contactForm.phone}
                        onChange={(e) => setContactForm({...contactForm, phone: e.target.value})}
                      />
                    </div>
                    <div>
                      <Label htmlFor="contact-company">Company</Label>
                      <Input
                        id="contact-company"
                        value={contactForm.company}
                        onChange={(e) => setContactForm({...contactForm, company: e.target.value})}
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="contact-message">Message *</Label>
                    <Textarea
                      id="contact-message"
                      value={contactForm.message}
                      onChange={(e) => setContactForm({...contactForm, message: e.target.value})}
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full" disabled={isSubmitting}>
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                  </Button>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>
    </div>
  );
}