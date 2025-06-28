'use client';

import { TrendingUp, Users, Package, Globe } from 'lucide-react';

const stats = [
  {
    icon: Users,
    value: '500+',
    label: 'Active Businesses & Organizations',
    description: 'African companies and institutions trust Suplar',
    color: 'text-blue-600',
    bgColor: 'bg-blue-50',
  },
  {
    icon: Package,
    value: '50K+',
    label: 'Products Sourced',
    description: 'Successfully delivered worldwide',
    color: 'text-green-600',
    bgColor: 'bg-green-50',
  },
  {
    icon: Globe,
    value: '25+',
    label: 'Countries',
    description: 'Supplier network coverage',
    color: 'text-purple-600',
    bgColor: 'bg-purple-50',
  },
  {
    icon: TrendingUp,
    value: '$2M+',
    label: 'Trade Volume',
    description: 'Processed through our platform',
    color: 'text-orange-600',
    bgColor: 'bg-orange-50',
  },
];

export function StatsSection() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Powering African Trade
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Join hundreds of businesses and organizations already transforming their supply chains 
            with blockchain technology.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div 
                key={index} 
                className="text-center group hover:transform hover:scale-105 transition-all duration-300"
              >
                <div className={`w-16 h-16 ${stat.bgColor} rounded-full flex items-center justify-center mx-auto mb-4 group-hover:shadow-lg transition-shadow duration-300`}>
                  <Icon className={`w-8 h-8 ${stat.color}`} />
                </div>
                <div className="text-4xl font-bold text-gray-900 mb-2">
                  {stat.value}
                </div>
                <div className="text-xl font-semibold text-gray-800 mb-1">
                  {stat.label}
                </div>
                <div className="text-gray-600">
                  {stat.description}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}