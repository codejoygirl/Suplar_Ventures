'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { ArrowRight, Star, Globe, Shield, Package } from 'lucide-react';

export function HeroSection() {
  const router = useRouter();

  const handleBrowseProducts = () => {
    router.push('/products');
  };

  const handleRequestProduct = () => {
    // In a real app, this would open a modal or navigate to a form page
    alert('Request Product feature coming soon! Please contact us directly for custom product requests.');
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
            <Button 
              size="lg" 
              variant="outline" 
              className="text-lg px-8 py-4 border-2 hover:bg-gray-50 transition-all duration-300"
              onClick={handleRequestProduct}
            >
              Request a Product
            </Button>
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