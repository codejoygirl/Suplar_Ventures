'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { ArrowRight, Package, CreditCard, Truck } from 'lucide-react';

export function CTASection() {
  const router = useRouter();

  const handleStartBrowsing = () => {
    router.push('/products');
  };

  const handleRequestDemo = () => {
    // In a real app, this would open a demo request form or contact modal
    alert('Demo request feature coming soon! Please contact us directly to schedule a demo.');
  };

  return (
    <section className="py-20 bg-gradient-to-r from-blue-600 to-green-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center text-white">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Transform Your Procurement?
          </h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto opacity-90">
            Join over 1000+ businesses already using Suplar to streamline their supply chain operations.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button 
              size="lg" 
              className="text-lg px-8 py-4 bg-white text-blue-600 hover:bg-gray-100 shadow-lg hover:shadow-xl transition-all duration-300"
              onClick={handleStartBrowsing}
            >
              Start Browsing Products
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="text-lg px-8 py-4 border-2 border-white text-white hover:bg-white hover:text-blue-600 transition-all duration-300"
              onClick={handleRequestDemo}
            >
              Request a Demo
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Package className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Browse & Source</h3>
              <p className="text-white/80">Access 200+ verified products from trusted suppliers</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <CreditCard className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Pay Seamlessly</h3>
              <p className="text-white/80">Choose from crypto (USDC/XLM) or traditional payment methods</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Truck className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Track & Receive</h3>
              <p className="text-white/80">Monitor your orders with real-time tracking and updates</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}