'use client';

import { Badge } from '@/components/ui/badge';
import { Search, ShoppingCart, CreditCard, Truck } from 'lucide-react';

const steps = [
  {
    icon: Search,
    step: '01',
    title: 'Browse & Source',
    description: 'Search through thousands of products from verified global suppliers with competitive pricing.',
    color: 'text-blue-600',
    bgColor: 'bg-blue-50',
    borderColor: 'border-blue-200',
  },
  {
    icon: ShoppingCart,
    step: '02',
    title: 'Generate Invoice',
    description: 'Use InvoyBox to create professional invoices with crypto payment options integrated.',
    color: 'text-green-600',
    bgColor: 'bg-green-50',
    borderColor: 'border-green-200',
  },
  {
    icon: CreditCard,
    step: '03',
    title: 'Pay with Crypto',
    description: 'Complete payments instantly using XLM or USDC on the Stellar network with minimal fees.',
    color: 'text-purple-600',
    bgColor: 'bg-purple-50',
    borderColor: 'border-purple-200',
  },
  {
    icon: Truck,
    step: '04',
    title: 'Track Delivery',
    description: 'Monitor your shipment in real-time from supplier to your location with complete transparency.',
    color: 'text-orange-600',
    bgColor: 'bg-orange-50',
    borderColor: 'border-orange-200',
  },
];

export function HowItWorksSection() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4 text-sm font-medium">
            How It Works
          </Badge>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Four Simple Steps to Success
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            From sourcing to delivery, our streamlined process makes global trade 
            accessible to every African business.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div key={index} className="relative">
                <div className={`bg-white rounded-2xl p-8 border-2 ${step.borderColor} hover:shadow-xl transition-all duration-300 hover:-translate-y-2 group`}>
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
                  
                  <p className="text-gray-600 leading-relaxed">
                    {step.description}
                  </p>
                </div>
                
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
      </div>
    </section>
  );
}