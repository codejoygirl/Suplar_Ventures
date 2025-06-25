'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { MapPin, CreditCard, Wallet } from 'lucide-react';

export function CartSummary() {
  const [selectedCity, setSelectedCity] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  const router = useRouter();

  const subtotal = 2462.46;
  
  // Logistics fee based on selected city
  const getLogisticsFee = (city: string) => {
    switch (city) {
      case 'lagos-mainland': return 1500;
      case 'lagos-island': return 2000;
      case 'ibadan': return 5000;
      case 'abuja': return 4500;
      default: return 7500;
    }
  };

  const logisticsFee = selectedCity ? getLogisticsFee(selectedCity) : 2500;
  const total = subtotal + (logisticsFee / 800); // Convert NGN to USD for display

  const handleProceedToCheckout = () => {
    if (!selectedCity) {
      alert('Please select your delivery city to calculate logistics fee.');
      return;
    }
    
    // In a real app, this would navigate to checkout with authentication check
    alert('Checkout functionality will redirect to sign-in/sign-up if not authenticated, then process payment.');
    // router.push('/checkout');
  };

  const handleCityChange = (city: string) => {
    setSelectedCity(city);
  };

  return (
    <div className="space-y-6">
      {/* Delivery Address */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center text-lg">
            <MapPin className="w-5 h-5 mr-2 text-blue-600" />
            Delivery Address
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="address">Full Address *</Label>
            <Input 
              id="address" 
              placeholder="Enter your complete delivery address"
              className="mt-1"
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label htmlFor="city">City *</Label>
              <Select onValueChange={handleCityChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Select city" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="lagos-mainland">Lagos Mainland</SelectItem>
                  <SelectItem value="lagos-island">Lagos Island</SelectItem>
                  <SelectItem value="ibadan">Ibadan</SelectItem>
                  <SelectItem value="abuja">Abuja</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="state">State *</Label>
              <Input id="state" placeholder="State" />
            </div>
          </div>
          <div className="bg-blue-50 p-3 rounded-lg">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Estimated Delivery:</span>
              <span className="font-medium">3-5 business days</span>
            </div>
            <div className="flex justify-between text-sm mt-1">
              <span className="text-gray-600">Logistics Fee:</span>
              <span className="font-medium">₦{logisticsFee.toLocaleString()}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Order Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Order Summary</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Subtotal (3 items):</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Logistics Fee:</span>
              <span>${(logisticsFee / 800).toFixed(2)}</span>
            </div>
            <div className="border-t pt-2">
              <div className="flex justify-between font-semibold text-lg">
                <span>Total:</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Payment Method */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center text-lg">
            <CreditCard className="w-5 h-5 mr-2 text-green-600" />
            Payment Method
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Select onValueChange={setPaymentMethod}>
            <SelectTrigger>
              <SelectValue placeholder="Choose payment method" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="usdc">
                <div className="flex items-center">
                  <Wallet className="w-4 h-4 mr-2" />
                  USDC (Stellar)
                </div>
              </SelectItem>
              <SelectItem value="xlm">
                <div className="flex items-center">
                  <Wallet className="w-4 h-4 mr-2" />
                  XLM (Stellar Lumens)
                </div>
              </SelectItem>
              <SelectItem value="card">
                <div className="flex items-center">
                  <CreditCard className="w-4 h-4 mr-2" />
                  Credit/Debit Card
                </div>
              </SelectItem>
              <SelectItem value="bank">Bank Transfer</SelectItem>
            </SelectContent>
          </Select>
          
          <div className="text-xs text-gray-500 bg-gray-50 p-3 rounded">
            <p className="mb-1">💡 <strong>New to crypto payments?</strong></p>
            <p>You'll be prompted to connect your wallet (Freighter, Lobstr, or Albedo) if you choose USDC or XLM.</p>
          </div>
        </CardContent>
      </Card>

      {/* Checkout Button */}
      <Button 
        size="lg" 
        className="w-full bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-lg py-4"
        onClick={handleProceedToCheckout}
      >
        Proceed to Checkout
      </Button>
      
      <p className="text-xs text-gray-500 text-center">
        You'll be prompted to sign in or create an account at checkout
      </p>
    </div>
  );
}