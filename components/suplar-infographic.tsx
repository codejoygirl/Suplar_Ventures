'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Search, 
  ShoppingCart, 
  CreditCard, 
  Truck, 
  Package, 
  Globe, 
  Shield, 
  Users,
  ArrowRight,
  CheckCircle,
  Zap,
  Star,
  Building2,
  Factory,
  Stethoscope,
  Laptop,
  FlaskConical,
  Microscope
} from 'lucide-react';

export function SuplarInfographic() {
  const processSteps = [
    {
      icon: Search,
      title: 'Browse & Source',
      description: 'Search 15,000+ products from verified global suppliers',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200',
      features: ['200+ Categories', 'Verified Suppliers', 'Competitive Pricing']
    },
    {
      icon: ShoppingCart,
      title: 'Add to Cart',
      description: 'Smart cart management with bulk discounts',
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200',
      features: ['Bulk Discounts', 'Real-time Inventory', 'Smart Recommendations']
    },
    {
      icon: CreditCard,
      title: 'Pay Securely',
      description: 'Multiple payment options including crypto',
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      borderColor: 'border-purple-200',
      features: ['Crypto (XLM/USDC)', 'Credit Cards', 'Bank Transfer']
    },
    {
      icon: Truck,
      title: 'Track & Receive',
      description: 'Real-time tracking from supplier to your door',
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
      borderColor: 'border-orange-200',
      features: ['Real-time Tracking', 'SMS Updates', 'Quality Assurance']
    }
  ];

  const benefits = [
    {
      icon: Globe,
      title: 'Global Reach',
      description: '25+ countries',
      stat: '50K+ Products Sourced'
    },
    {
      icon: Shield,
      title: 'Secure & Trusted',
      description: 'Blockchain-powered',
      stat: '100% Verified Suppliers'
    },
    {
      icon: Users,
      title: 'Growing Community',
      description: '1000+ businesses',
      stat: '90% Customer Satisfaction'
    },
    {
      icon: Zap,
      title: 'Lightning Fast',
      description: 'Instant payments',
      stat: '3-5 Day Delivery'
    }
  ];

  const categories = [
    { icon: Stethoscope, name: 'Medical Equipment', color: 'text-red-500' },
    { icon: Zap, name: 'Electrical Materials', color: 'text-yellow-500' },
    { icon: Laptop, name: 'Office Equipment', color: 'text-blue-500' },
    { icon: Microscope, name: 'Lab Equipment', color: 'text-purple-500' },
    { icon: FlaskConical, name: 'Research Tools', color: 'text-green-500' },
    { icon: Factory, name: 'Industrial Chemicals', color: 'text-gray-500' }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-blue-50 via-white to-green-50 overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4 text-sm font-medium">
            How Suplar Works
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Transforming African Trade
            <span className="block bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
              Through Technology
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            From sourcing to delivery, our comprehensive platform streamlines every step 
            of your procurement journey with cutting-edge blockchain technology.
          </p>
        </div>

        {/* Main Infographic - Central Hub Design */}
        <div className="relative mb-20">
          {/* Central Hub */}
          <div className="flex justify-center mb-12">
            <div className="relative">
              <div className="w-48 h-48 bg-gradient-to-br from-blue-600 to-green-600 rounded-full flex items-center justify-center shadow-2xl">
                <div className="text-center text-white">
                  <Package className="w-16 h-16 mx-auto mb-2" />
                  <h3 className="text-xl font-bold">SUPLAR</h3>
                  <p className="text-sm opacity-90">Supply Chain Hub</p>
                </div>
              </div>
              
              {/* Orbiting Elements */}
              <div className="absolute inset-0 animate-spin" style={{ animationDuration: '20s' }}>
                {categories.map((category, index) => {
                  const Icon = category.icon;
                  const angle = (index * 60) * (Math.PI / 180);
                  const radius = 140;
                  const x = Math.cos(angle) * radius;
                  const y = Math.sin(angle) * radius;
                  
                  return (
                    <div
                      key={index}
                      className="absolute w-16 h-16 bg-white rounded-full shadow-lg flex items-center justify-center transform -translate-x-1/2 -translate-y-1/2"
                      style={{
                        left: `calc(50% + ${x}px)`,
                        top: `calc(50% + ${y}px)`,
                        animation: 'reverse-spin 20s linear infinite'
                      }}
                    >
                      <Icon className={`w-8 h-8 ${category.color}`} />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Process Flow */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {processSteps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div key={index} className="relative">
                  <Card className={`bg-white rounded-2xl p-8 border-2 ${step.borderColor} hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 group h-full`}>
                    {/* Step Number */}
                    <div className="absolute -top-4 -left-4 w-12 h-12 bg-gradient-to-r from-blue-600 to-green-600 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg">
                      {index + 1}
                    </div>
                    
                    {/* Icon */}
                    <div className={`w-16 h-16 ${step.bgColor} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-md`}>
                      <Icon className={`w-8 h-8 ${step.color}`} />
                    </div>
                    
                    {/* Content */}
                    <h3 className="text-xl font-bold text-gray-900 mb-3">
                      {step.title}
                    </h3>
                    <p className="text-gray-600 mb-4 leading-relaxed">
                      {step.description}
                    </p>
                    
                    {/* Features */}
                    <div className="space-y-2">
                      {step.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center text-sm text-gray-600">
                          <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                          {feature}
                        </div>
                      ))}
                    </div>
                  </Card>
                  
                  {/* Connection Arrow */}
                  {index < processSteps.length - 1 && (
                    <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
                      <div className="w-8 h-8 bg-white rounded-full border-2 border-gray-200 flex items-center justify-center shadow-md">
                        <ArrowRight className="w-4 h-4 text-gray-400" />
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Benefits Grid */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Why Choose Suplar?
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <Card key={index} className="text-center p-8 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-green-600 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h4 className="text-xl font-bold text-gray-900 mb-2">
                    {benefit.title}
                  </h4>
                  <p className="text-gray-600 mb-3">
                    {benefit.description}
                  </p>
                  <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
                    {benefit.stat}
                  </div>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Interactive Network Visualization */}
        <div className="mb-16">
          <Card className="bg-gradient-to-br from-gray-900 to-blue-900 text-white p-12 rounded-2xl overflow-hidden relative">
            <div className="relative z-10">
              <h3 className="text-3xl font-bold text-center mb-8">
                Global Supply Network
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                <div className="space-y-4">
                  <div className="w-20 h-20 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto">
                    <Building2 className="w-10 h-10 text-blue-300" />
                  </div>
                  <h4 className="text-xl font-semibold">African Businesses</h4>
                  <p className="text-blue-200">1000+ companies trust our platform</p>
                </div>
                <div className="space-y-4">
                  <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto">
                    <Globe className="w-10 h-10 text-green-300" />
                  </div>
                  <h4 className="text-xl font-semibold">Global Suppliers</h4>
                  <p className="text-green-200">Verified partners across 25+ countries</p>
                </div>
                <div className="space-y-4">
                  <div className="w-20 h-20 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto">
                    <Shield className="w-10 h-10 text-purple-300" />
                  </div>
                  <h4 className="text-xl font-semibold">Secure Transactions</h4>
                  <p className="text-purple-200">Blockchain-powered security</p>
                </div>
              </div>
            </div>
            
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-10 left-10 w-32 h-32 border border-white/20 rounded-full"></div>
              <div className="absolute bottom-10 right-10 w-40 h-40 border border-white/20 rounded-full"></div>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 border border-white/20 rounded-full"></div>
            </div>
          </Card>
        </div>

        {/* Stats Banner */}
        <Card className="bg-gradient-to-r from-blue-600 to-green-600 text-white p-8 rounded-2xl">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="flex items-center justify-center mb-2">
                <Package className="w-6 h-6 mr-2" />
                <span className="text-3xl font-bold">15K+</span>
              </div>
              <p className="text-blue-100">Products Available</p>
            </div>
            <div>
              <div className="flex items-center justify-center mb-2">
                <Users className="w-6 h-6 mr-2" />
                <span className="text-3xl font-bold">1000+</span>
              </div>
              <p className="text-blue-100">Active Businesses</p>
            </div>
            <div>
              <div className="flex items-center justify-center mb-2">
                <Globe className="w-6 h-6 mr-2" />
                <span className="text-3xl font-bold">25+</span>
              </div>
              <p className="text-blue-100">Countries Served</p>
            </div>
            <div>
              <div className="flex items-center justify-center mb-2">
                <Star className="w-6 h-6 mr-2" />
                <span className="text-3xl font-bold">90%</span>
              </div>
              <p className="text-blue-100">Satisfaction Rate</p>
            </div>
          </div>
        </Card>

        {/* Background Decorations */}
        <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-32 h-32 bg-blue-200/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-40 h-40 bg-green-200/20 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-purple-200/10 rounded-full blur-3xl"></div>
        </div>
      </div>
      
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
    </section>
  );
}