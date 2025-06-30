'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Package, CreditCard, Truck, Shield, Globe, Zap, Users, Star } from 'lucide-react';

const features = [
  {
    icon: Package,
    title: 'Global Product Sourcing',
    description: 'Access thousands of verified suppliers worldwide with competitive pricing and quality assurance.',
    color: 'text-blue-600',
    bgColor: 'bg-blue-50',
    stats: '15K+ Products',
  },
  {
    icon: CreditCard,
    title: 'Crypto & Fiat Payments',
    description: 'Pay instantly with XLM, USDC, credit cards, or bank transfers. Choose what works best for you.',
    color: 'text-green-600',
    bgColor: 'bg-green-50',
    stats: 'Multiple Options',
  },
  {
    icon: Truck,
    title: 'End-to-End Logistics',
    description: 'Track your shipments in real-time from supplier to your doorstep with full transparency.',
    color: 'text-orange-600',
    bgColor: 'bg-orange-50',
    stats: '3-5 Day Delivery',
  },
  {
    icon: Shield,
    title: 'Blockchain Security',
    description: 'Built on blockchain technology ensuring transparency, security, and immutable records.',
    color: 'text-purple-600',
    bgColor: 'bg-purple-50',
    stats: '100% Secure',
  },
  {
    icon: Globe,
    title: 'African Focus',
    description: 'Optimized for African businesses and government organizations with local payment methods.',
    color: 'text-red-600',
    bgColor: 'bg-red-50',
    stats: '25+ Countries',
  },
  {
    icon: Zap,
    title: 'Lightning Fast',
    description: 'Process transactions in seconds, not days. Get products moving faster than ever.',
    color: 'text-yellow-600',
    bgColor: 'bg-yellow-50',
    stats: 'Instant Processing',
  },
];

const testimonialHighlights = [
  {
    quote: "Reduced procurement time by 60%",
    author: "Lagos Medical Center",
    rating: 5
  },
  {
    quote: "Streamlined international purchases",
    author: "TechHub Abuja",
    rating: 5
  },
  {
    quote: "Exceptional quality assurance",
    author: "Nairobi Manufacturing",
    rating: 5
  }
];

export function FeaturesSection() {
  return (
    <section className="py-20 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Why Choose Suplar?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We combine the power of blockchain technology with traditional supply chain 
            management to create a seamless experience for African businesses and government organizations.
          </p>
        </div>
        
        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card 
                key={index} 
                className="group hover:shadow-2xl transition-all duration-500 border-0 shadow-lg hover:-translate-y-2 bg-gradient-to-br from-white to-gray-50"
              >
                <CardContent className="p-8">
                  <div className={`w-16 h-16 ${feature.bgColor} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-md`}>
                    <Icon className={`w-8 h-8 ${feature.color}`} />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed mb-4">
                    {feature.description}
                  </p>
                  <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${feature.bgColor} ${feature.color}`}>
                    {feature.stats}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Social Proof Section */}
        <div className="bg-gradient-to-r from-blue-50 to-green-50 rounded-3xl p-12 mb-16">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">
              Trusted by Leading Organizations
            </h3>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Join thousands of businesses and government organizations already transforming their procurement
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonialHighlights.map((testimonial, index) => (
              <div key={index} className="text-center">
                <div className="flex justify-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <blockquote className="text-lg font-medium text-gray-900 mb-2">
                  "{testimonial.quote}"
                </blockquote>
                <cite className="text-blue-600 font-medium">
                  {testimonial.author}
                </cite>
              </div>
            ))}
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div className="space-y-2">
            <div className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
              1000+
            </div>
            <div className="text-gray-600">Active Businesses</div>
          </div>
          <div className="space-y-2">
            <div className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
              50K+
            </div>
            <div className="text-gray-600">Products Sourced</div>
          </div>
          <div className="space-y-2">
            <div className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
              25+
            </div>
            <div className="text-gray-600">Countries</div>
          </div>
          <div className="space-y-2">
            <div className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
              90%
            </div>
            <div className="text-gray-600">Satisfaction Rate</div>
          </div>
        </div>
      </div>

      {/* Background Decorations */}
      <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 bg-blue-100/50 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-green-100/50 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-purple-100/30 rounded-full blur-3xl"></div>
      </div>
    </section>
  );
}