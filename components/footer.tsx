'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Package, Linkedin, Twitter, Instagram, MessageCircle, Facebook } from 'lucide-react';

export function Footer() {
  const [email, setEmail] = useState('');

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      alert('Please enter your email address.');
      return;
    }
    // In a real app, this would submit to newsletter service
    alert('Thank you for subscribing! Newsletter functionality will be implemented with email service.');
    setEmail('');
  };

  const handleSocialClick = (platform: string, url?: string) => {
    if (url) {
      window.open(url, '_blank');
    } else {
      alert(`${platform} page coming soon! Follow us for updates.`);
    }
  };

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About Suplar */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-green-600 rounded-lg flex items-center justify-center">
                <Package className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold">Suplar</span>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed mb-4">
              Africa's leading B2B and B2G supply chain management platform. We help businesses and government organizations seamlessly source and procure goods from a vetted network of manufacturers, importers, and distributors.
            </p>
            <div className="flex space-x-4">
              <button 
                onClick={() => handleSocialClick('LinkedIn')}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <Linkedin className="w-5 h-5" />
              </button>
              <button 
                onClick={() => handleSocialClick('Twitter')}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <Twitter className="w-5 h-5" />
              </button>
              <button 
                onClick={() => handleSocialClick('Instagram', 'https://www.instagram.com/suplar_ventures?igsh=OTRoNTExcGI2OWZt&utm_source=qr')}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </button>
              <button 
                onClick={() => handleSocialClick('Facebook', 'https://www.facebook.com/share/16mKMGbGnp/?mibextid=wwXIfr')}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <Facebook className="w-5 h-5" />
              </button>
              <button 
                onClick={() => handleSocialClick('WhatsApp', 'https://wa.me/2349036735450')}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <MessageCircle className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/products" className="text-gray-300 hover:text-white transition-colors text-sm">
                  Browse Products
                </Link>
              </li>
              <li>
                <Link href="/track-order" className="text-gray-300 hover:text-white transition-colors text-sm">
                  Track Order
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-gray-300 hover:text-white transition-colors text-sm">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-300 hover:text-white transition-colors text-sm">
                  Contact Us
                </Link>
              </li>
              <li>
                <button 
                  onClick={() => alert('Become a Supplier feature coming soon! Please contact us for partnership opportunities.')}
                  className="text-gray-300 hover:text-white transition-colors text-sm text-left"
                >
                  Become a Supplier <span className="text-xs text-blue-400">(Coming Soon)</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Categories</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/products?category=medical" className="text-gray-300 hover:text-white transition-colors text-sm">
                  Medical Equipment
                </Link>
              </li>
              <li>
                <Link href="/products?category=electrical" className="text-gray-300 hover:text-white transition-colors text-sm">
                  Electrical Materials
                </Link>
              </li>
              <li>
                <Link href="/products?category=office" className="text-gray-300 hover:text-white transition-colors text-sm">
                  Office Equipment
                </Link>
              </li>
              <li>
                <Link href="/products?category=lab" className="text-gray-300 hover:text-white transition-colors text-sm">
                  Lab Equipment
                </Link>
              </li>
              <li>
                <Link href="/products?category=industrial" className="text-gray-300 hover:text-white transition-colors text-sm">
                  Industrial Chemicals
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Stay Updated</h3>
            <p className="text-gray-300 text-sm mb-4">
              Get the latest updates on new products and exclusive deals.
            </p>
            <form onSubmit={handleNewsletterSubmit} className="space-y-3">
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-gray-800 border-gray-700 text-white placeholder-gray-400 focus:border-blue-500"
              />
              <Button 
                type="submit"
                className="w-full bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700"
              >
                Subscribe
              </Button>
            </form>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © 2025 Suplar. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link href="/terms" className="text-gray-400 hover:text-white text-sm transition-colors">
                Terms of Use
              </Link>
              <Link href="/privacy" className="text-gray-400 hover:text-white text-sm transition-colors">
                Privacy Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}