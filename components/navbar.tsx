'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Menu, X, Package, ShoppingCart, ChevronDown, Search, Wallet, User, Mail } from 'lucide-react';
import { useCartStore } from '@/lib/cart-store';
import { useWalletStore } from '@/lib/wallet-store';
import { sendEmail } from '@/lib/email-service';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isProductsOpen, setIsProductsOpen] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signin');
  const [showWalletModal, setShowWalletModal] = useState(false);
  const [showRequestModal, setShowRequestModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const router = useRouter();
  const cartItemCount = useCartStore((state) => state.getTotalItems());
  const { isConnected, walletType, address, connectWallet, disconnectWallet } = useWalletStore();

  const [authForm, setAuthForm] = useState({
    name: '',
    email: '',
    password: '',
    company: '',
    phone: ''
  });

  const [requestForm, setRequestForm] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    productName: '',
    description: '',
    quantity: '',
    budget: '',
    timeline: ''
  });

  const navigation = [
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

  const handleAuthSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const emailData = {
        to: 'info.suplar@gmail.com',
        subject: `New ${authMode === 'signup' ? 'Sign Up' : 'Sign In'} Request`,
        message: `
          User ${authMode === 'signup' ? 'Registration' : 'Login'} Request:
          
          Name: ${authForm.name}
          Email: ${authForm.email}
          ${authForm.company ? `Company: ${authForm.company}` : ''}
          ${authForm.phone ? `Phone: ${authForm.phone}` : ''}
          
          Action: ${authMode === 'signup' ? 'Account Registration' : 'Login Attempt'}
        `,
        name: authForm.name,
        email: authForm.email,
        company: authForm.company,
        phone: authForm.phone
      };
      
      const success = await sendEmail(emailData);
      
      if (success) {
        alert(`${authMode === 'signup' ? 'Registration' : 'Sign in'} request sent successfully! We'll contact you shortly.`);
        setAuthForm({ name: '', email: '', password: '', company: '', phone: '' });
        setShowAuthModal(false);
      } else {
        alert('Failed to send request. Please try again.');
      }
    } catch (error) {
      alert('An error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRequestSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const emailData = {
        to: 'info.suplar@gmail.com',
        subject: 'New Product Request',
        message: `
          Product Request Details:
          
          Name: ${requestForm.name}
          Email: ${requestForm.email}
          Phone: ${requestForm.phone}
          Company: ${requestForm.company}
          
          Product Name: ${requestForm.productName}
          Description: ${requestForm.description}
          Quantity: ${requestForm.quantity}
          Budget: ${requestForm.budget}
          Timeline: ${requestForm.timeline}
        `,
        name: requestForm.name,
        email: requestForm.email,
        phone: requestForm.phone,
        company: requestForm.company,
        productName: requestForm.productName
      };
      
      const success = await sendEmail(emailData);
      
      if (success) {
        alert('Product request sent successfully! We\'ll get back to you within 24 hours.');
        setRequestForm({
          name: '', email: '', phone: '', company: '', productName: '',
          description: '', quantity: '', budget: '', timeline: ''
        });
        setShowRequestModal(false);
      } else {
        alert('Failed to send request. Please try again.');
      }
    } catch (error) {
      alert('An error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleWalletConnect = async (walletType: 'metamask' | 'freighter' | 'albedo') => {
    try {
      await connectWallet(walletType);
      setShowWalletModal(false);
      alert(`${walletType.charAt(0).toUpperCase() + walletType.slice(1)} wallet connected successfully!`);
    } catch (error) {
      alert(`Failed to connect ${walletType} wallet. Please make sure it's installed and try again.`);
    }
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
            <Dialog open={showRequestModal} onOpenChange={setShowRequestModal}>
              <DialogTrigger asChild>
                <Button variant="outline" className="bg-blue-50 text-blue-600 border-blue-200 hover:bg-blue-100">
                  Request a Product
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Request a Product</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleRequestSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="req-name">Full Name *</Label>
                      <Input
                        id="req-name"
                        value={requestForm.name}
                        onChange={(e) => setRequestForm({...requestForm, name: e.target.value})}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="req-email">Email *</Label>
                      <Input
                        id="req-email"
                        type="email"
                        value={requestForm.email}
                        onChange={(e) => setRequestForm({...requestForm, email: e.target.value})}
                        required
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="req-phone">Phone</Label>
                      <Input
                        id="req-phone"
                        value={requestForm.phone}
                        onChange={(e) => setRequestForm({...requestForm, phone: e.target.value})}
                      />
                    </div>
                    <div>
                      <Label htmlFor="req-company">Company</Label>
                      <Input
                        id="req-company"
                        value={requestForm.company}
                        onChange={(e) => setRequestForm({...requestForm, company: e.target.value})}
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="req-product">Product Name *</Label>
                    <Input
                      id="req-product"
                      value={requestForm.productName}
                      onChange={(e) => setRequestForm({...requestForm, productName: e.target.value})}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="req-description">Product Description *</Label>
                    <Textarea
                      id="req-description"
                      value={requestForm.description}
                      onChange={(e) => setRequestForm({...requestForm, description: e.target.value})}
                      required
                    />
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="req-quantity">Quantity</Label>
                      <Input
                        id="req-quantity"
                        value={requestForm.quantity}
                        onChange={(e) => setRequestForm({...requestForm, quantity: e.target.value})}
                      />
                    </div>
                    <div>
                      <Label htmlFor="req-budget">Budget Range</Label>
                      <Input
                        id="req-budget"
                        value={requestForm.budget}
                        onChange={(e) => setRequestForm({...requestForm, budget: e.target.value})}
                      />
                    </div>
                    <div>
                      <Label htmlFor="req-timeline">Timeline</Label>
                      <Input
                        id="req-timeline"
                        value={requestForm.timeline}
                        onChange={(e) => setRequestForm({...requestForm, timeline: e.target.value})}
                      />
                    </div>
                  </div>
                  <Button type="submit" className="w-full" disabled={isSubmitting}>
                    {isSubmitting ? 'Sending...' : 'Submit Request'}
                  </Button>
                </form>
              </DialogContent>
            </Dialog>

            <Link href="/cart" className="relative p-2 text-gray-600 hover:text-blue-600 transition-colors">
              <ShoppingCart className="w-6 h-6" />
              {cartItemCount > 0 && (
                <Badge className="absolute -top-1 -right-1 w-5 h-5 flex items-center justify-center text-xs bg-red-500 text-white rounded-full">
                  {cartItemCount}
                </Badge>
              )}
            </Link>

            <Dialog open={showAuthModal} onOpenChange={setShowAuthModal}>
              <DialogTrigger asChild>
                <Button variant="ghost" onClick={() => setAuthMode('signin')}>
                  <User className="w-4 h-4 mr-2" />
                  Sign In
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>{authMode === 'signin' ? 'Sign In' : 'Sign Up'}</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleAuthSubmit} className="space-y-4">
                  {authMode === 'signup' && (
                    <div>
                      <Label htmlFor="auth-name">Full Name *</Label>
                      <Input
                        id="auth-name"
                        value={authForm.name}
                        onChange={(e) => setAuthForm({...authForm, name: e.target.value})}
                        required
                      />
                    </div>
                  )}
                  <div>
                    <Label htmlFor="auth-email">Email *</Label>
                    <Input
                      id="auth-email"
                      type="email"
                      value={authForm.email}
                      onChange={(e) => setAuthForm({...authForm, email: e.target.value})}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="auth-password">Password *</Label>
                    <Input
                      id="auth-password"
                      type="password"
                      value={authForm.password}
                      onChange={(e) => setAuthForm({...authForm, password: e.target.value})}
                      required
                    />
                  </div>
                  {authMode === 'signup' && (
                    <>
                      <div>
                        <Label htmlFor="auth-company">Company</Label>
                        <Input
                          id="auth-company"
                          value={authForm.company}
                          onChange={(e) => setAuthForm({...authForm, company: e.target.value})}
                        />
                      </div>
                      <div>
                        <Label htmlFor="auth-phone">Phone</Label>
                        <Input
                          id="auth-phone"
                          value={authForm.phone}
                          onChange={(e) => setAuthForm({...authForm, phone: e.target.value})}
                        />
                      </div>
                    </>
                  )}
                  <Button type="submit" className="w-full" disabled={isSubmitting}>
                    {isSubmitting ? 'Processing...' : (authMode === 'signin' ? 'Sign In' : 'Sign Up')}
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    className="w-full"
                    onClick={() => setAuthMode(authMode === 'signin' ? 'signup' : 'signin')}
                  >
                    {authMode === 'signin' ? 'Need an account? Sign Up' : 'Have an account? Sign In'}
                  </Button>
                </form>
              </DialogContent>
            </Dialog>

            <Dialog open={showWalletModal} onOpenChange={setShowWalletModal}>
              <DialogTrigger asChild>
                <Button 
                  className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700"
                  onClick={() => !isConnected && setShowWalletModal(true)}
                >
                  <Wallet className="w-4 h-4 mr-2" />
                  {isConnected ? `${walletType?.toUpperCase()} Connected` : 'Connect Wallet'}
                </Button>
              </DialogTrigger>
              {!isConnected && (
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Connect Your Wallet</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <Button
                      onClick={() => handleWalletConnect('metamask')}
                      className="w-full justify-start"
                      variant="outline"
                    >
                      <Wallet className="w-5 h-5 mr-3" />
                      MetaMask
                    </Button>
                    <Button
                      onClick={() => handleWalletConnect('freighter')}
                      className="w-full justify-start"
                      variant="outline"
                    >
                      <Wallet className="w-5 h-5 mr-3" />
                      Freighter (Stellar)
                    </Button>
                    <Button
                      onClick={() => handleWalletConnect('albedo')}
                      className="w-full justify-start"
                      variant="outline"
                    >
                      <Wallet className="w-5 h-5 mr-3" />
                      Albedo (Stellar)
                    </Button>
                  </div>
                </DialogContent>
              )}
            </Dialog>

            {isConnected && (
              <Button variant="outline" onClick={disconnectWallet}>
                Disconnect
              </Button>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
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
                    setShowRequestModal(true);
                  }}
                >
                  Request a Product
                </Button>
                <Link href="/cart" className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 px-3 py-2">
                  <ShoppingCart className="w-5 h-5" />
                  <span>Cart ({cartItemCount})</span>
                </Link>
                <Button 
                  variant="ghost" 
                  className="w-full justify-start" 
                  onClick={() => {
                    setIsOpen(false);
                    setAuthMode('signin');
                    setShowAuthModal(true);
                  }}
                >
                  Sign In
                </Button>
                <Button 
                  className="w-full bg-gradient-to-r from-blue-600 to-green-600"
                  onClick={() => {
                    setIsOpen(false);
                    setAuthMode('signup');
                    setShowAuthModal(true);
                  }}
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