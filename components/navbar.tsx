'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Menu, X, Package, ShoppingCart, ChevronDown, Search } from 'lucide-react';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isProductsOpen, setIsProductsOpen] = useState(false);
  const [showRequestForm, setShowRequestForm] = useState(false);
  const router = useRouter();
  const cartItemCount = 3; // This would come from cart state

  const navigation = [
    { name: 'Home', href: '/' },
    { 
      name: 'Browse Products', 
      href: '/products',
      hasDropdown: true,
      categories: [
        'Medical Equipment & Consumables',
        'Electrical Materials & Accessories', 
        'Office Equipment & Supplies',
        'Diagnostic Lab Equipment & Consumables',
        'Research/Science Lab Equipment & Chemicals',
        'Industrial Chemicals'
      ]
    },
    { name: 'How It Works', href: '/how-it-works' },
    { name: 'Track Order', href: '/track-order' },
    { name: 'About Us', href: '/about' },
    { name: 'FAQ', href: '/faq' },
    { name: 'Testimonials', href: '/testimonials' },
    { name: 'Contact Us', href: '/contact' },
  ];

  const handleRequestProduct = () => {
    setShowRequestForm(true);
    // In a real app, this would open a modal or navigate to a form page
    alert('Request Product feature coming soon! Please contact us directly for custom product requests.');
  };

  const handleSignIn = () => {
    // In a real app, this would open a sign-in modal or navigate to auth page
    alert('Sign In functionality will be implemented with authentication provider (Clerk/Firebase Auth)');
  };

  const handleSignUp = () => {
    // In a real app, this would open a sign-up modal or navigate to auth page
    alert('Sign Up functionality will be implemented with authentication provider (Clerk/Firebase Auth)');
  };

  return (
    <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-sm border-b border-gray-200 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-green-600 rounded-lg flex items-center justify-center">
              <Package className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900">Suplar</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-6">
            {navigation.map((item) => (
              <div key={item.name} className="relative">
                {item.hasDropdown ? (
                  <div 
                    className="relative"
                    onMouseEnter={() => setIsProductsOpen(true)}
                    onMouseLeave={() => setIsProductsOpen(false)}
                  >
                    <Link
                      href={item.href}
                      className="flex items-center space-x-1 text-gray-600 hover:text-blue-600 transition-colors duration-200 py-2"
                    >
                      <span>{item.name}</span>
                      <ChevronDown className="w-4 h-4" />
                    </Link>
                    
                    {isProductsOpen && (
                      <div className="absolute top-full left-0 mt-1 w-80 bg-white rounded-lg shadow-lg border border-gray-200 py-4 z-50">
                        <div className="px-4 pb-2 border-b border-gray-100">
                          <h3 className="font-semibold text-gray-900">Product Categories</h3>
                        </div>
                        <div className="py-2">
                          {item.categories?.map((category) => (
                            <Link
                              key={category}
                              href={`/products?category=${category.toLowerCase().replace(/\s+/g, '-')}`}
                              className="block px-4 py-2 text-sm text-gray-600 hover:text-blue-600 hover:bg-gray-50 transition-colors"
                            >
                              {category}
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    href={item.href}
                    className="text-gray-600 hover:text-blue-600 transition-colors duration-200"
                  >
                    {item.name}
                  </Link>
                )}
              </div>
            ))}
          </div>

          <div className="hidden lg:flex items-center space-x-4">
            <Button 
              variant="outline" 
              className="bg-blue-50 text-blue-600 border-blue-200 hover:bg-blue-100"
              onClick={handleRequestProduct}
            >
              Request a Product
            </Button>
            <Link href="/cart" className="relative p-2 text-gray-600 hover:text-blue-600 transition-colors">
              <ShoppingCart className="w-6 h-6" />
              {cartItemCount > 0 && (
                <Badge className="absolute -top-1 -right-1 w-5 h-5 flex items-center justify-center text-xs bg-red-500 text-white rounded-full">
                  {cartItemCount}
                </Badge>
              )}
            </Link>
            <Button variant="ghost" onClick={handleSignIn}>Sign In</Button>
            <Button 
              className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700"
              onClick={handleSignUp}
            >
              Sign Up
            </Button>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100"
          >
            {isOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="lg:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-white border-t border-gray-200">
              {navigation.map((item) => (
                <div key={item.name}>
                  <Link
                    href={item.href}
                    className="block px-3 py-2 rounded-md text-gray-600 hover:text-blue-600 hover:bg-gray-50"
                    onClick={() => setIsOpen(false)}
                  >
                    {item.name}
                  </Link>
                  {item.hasDropdown && (
                    <div className="ml-4 space-y-1">
                      {item.categories?.map((category) => (
                        <Link
                          key={category}
                          href={`/products?category=${category.toLowerCase().replace(/\s+/g, '-')}`}
                          className="block px-3 py-1 text-sm text-gray-500 hover:text-blue-600"
                          onClick={() => setIsOpen(false)}
                        >
                          {category}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              <div className="px-3 py-2 space-y-2 border-t border-gray-200 mt-4">
                <Button 
                  variant="outline" 
                  className="w-full justify-start bg-blue-50 text-blue-600"
                  onClick={() => {
                    setIsOpen(false);
                    handleRequestProduct();
                  }}
                >
                  Request a Product
                </Button>
                <Link href="/cart" className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 px-3 py-2">
                  <ShoppingCart className="w-5 h-5" />
                  <span>Cart ({cartItemCount})</span>
                </Link>
                <Button variant="ghost" className="w-full justify-start" onClick={handleSignIn}>
                  Sign In
                </Button>
                <Button 
                  className="w-full bg-gradient-to-r from-blue-600 to-green-600"
                  onClick={handleSignUp}
                >
                  Sign Up
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}