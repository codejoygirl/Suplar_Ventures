'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Package, CreditCard, Truck, Shield, Globe, Zap } from 'lucide-react';

const features = [
  {
    icon: Package,
    title: 'Global Product Sourcing',
    description: 'Access thousands of verified suppliers worldwide with competitive pricing and quality assurance.',
    color: 'text-blue-600',
    bgColor: 'bg-blue-50',
  },
  {
    icon: CreditCard,
    title: 'Crypto Payments',
    description: 'Pay instantly with XLM or USDC on the Stellar network. Low fees, fast settlements.',
    color: 'text-green-600',
    bgColor: 'bg-green-50',
  },
  {
    icon: Truck,
    title: 'End-to-End Logistics',
    description: 'Track your shipments in real-time from supplier to your doorstep with full transparency.',
    color: 'text-orange-600',
    bgColor: 'bg-orange-50',
  },
  {
    icon: Shield,
    title: 'Secure Transactions',
    description: 'Built on blockchain technology ensuring transparency, security, and immutable records.',
    color: 'text-purple-600',
    bgColor: 'bg-purple-50',
  },
  {
    icon: Globe,
    title: 'African Focus',
    description: 'Optimized for African businesses with local payment methods and delivery networks.',
    color: 'text-red-600',
    bgColor: 'bg-red-50',
  },
  {
    icon: Zap,
    title: 'Lightning Fast',
    description: 'Process transactions in seconds, not days. Get products moving faster than ever.',
    color: 'text-yellow-600',
    bgColor: 'bg-yellow-50',
  },
];

export function FeaturesSection() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Why Choose Suplar?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We combine the power of blockchain technology with traditional supply chain 
            management to create a seamless experience for African businesses.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card 
                key={index} 
                className="group hover:shadow-lg transition-all duration-300 border-0 shadow-md hover:-translate-y-1"
              >
                <CardContent className="p-8">
                  <div className={`w-12 h-12 ${feature.bgColor} rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className={`w-6 h-6 ${feature.color}`} />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}