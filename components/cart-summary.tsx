'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { MapPin, CreditCard, Wallet, User, DollarSign } from 'lucide-react';
import { useCartStore } from '@/lib/cart-store';
import { useWalletStore } from '@/lib/wallet-store';
import { sendEmail } from '@/lib/email-service';

const nigerianCities = [
  { value: 'lagos-mainland', label: 'Lagos Mainland', fee: 1500 },
  { value: 'lagos-island', label: 'Lagos Island', fee: 2000 },
  { value: 'ibadan', label: 'Ibadan', fee: 5000 },
  { value: 'abuja', label: 'Abuja', fee: 4500 },
  { value: 'port-harcourt', label: 'Port Harcourt', fee: 6000 },
  { value: 'kano', label: 'Kano', fee: 7000 },
  { value: 'other', label: 'Other', fee: 7500 }
];

export function CartSummary() {
  const [selectedCity, setSelectedCity] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [address, setAddress] = useState('');
  const [state, setState] = useState('');
  const [currency, setCurrency] = useState<'USD' | 'NGN'>('USD');
  const [showCheckoutModal, setShowCheckoutModal] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  
  // Payment form states
  const [cardDetails, setCardDetails] = useState({
    number: '',
    expiry: '',
    cvv: '',
    name: ''
  });
  
  const [userDetails, setUserDetails] = useState({
    name: '',
    email: '',
    phone: ''
  });

  const router = useRouter();
  const { getTotalPrice, items, clearCart } = useCartStore();
  const { isConnected, walletType, connectWallet } = useWalletStore();

  const subtotal = getTotalPrice();
  const exchangeRate = 800; // 1 USD = 800 NGN
  
  const getLogisticsFee = (cityValue: string) => {
    const city = nigerianCities.find(c => c.value === cityValue);
    return city ? city.fee : 2500;
  };

  const logisticsFee = selectedCity ? getLogisticsFee(selectedCity) : 2500;
  const logisticsInUSD = logisticsFee / exchangeRate;
  const total = subtotal + logisticsInUSD;

  const formatPrice = (price: number) => {
    if (currency === 'NGN') {
      return `₦${(price * exchangeRate).toLocaleString()}`;
    }
    return `$${price.toFixed(2)}`;
  };

  const handleProceedToCheckout = () => {
    if (!selectedCity) {
      alert('Please select your delivery city to calculate logistics fee.');
      return;
    }
    
    if (!address.trim()) {
      alert('Please enter your delivery address.');
      return;
    }
    
    if (!paymentMethod) {
      alert('Please select a payment method.');
      return;
    }
    
    setShowCheckoutModal(true);
  };

  const handlePayment = async () => {
    if (!userDetails.name || !userDetails.email) {
      alert('Please fill in your contact details.');
      return;
    }

    if (paymentMethod === 'card' && (!cardDetails.number || !cardDetails.expiry || !cardDetails.cvv || !cardDetails.name)) {
      alert('Please fill in all card details.');
      return;
    }

    if ((paymentMethod === 'usdc' || paymentMethod === 'xlm') && !isConnected) {
      alert('Please connect your wallet first.');
      return;
    }

    setIsProcessing(true);

    try {
      // Generate order ID
      const orderId = `SUP-${Date.now()}`;
      
      // Send order confirmation email
      const emailData = {
        to: 'info.suplar@gmail.com',
        subject: `New Order Confirmation - ${orderId}`,
        message: `
          New Order Details:
          
          Order ID: ${orderId}
          Customer: ${userDetails.name}
          Email: ${userDetails.email}
          Phone: ${userDetails.phone}
          
          Delivery Address: ${address}, ${selectedCity}, ${state}
          
          Items:
          ${items.map(item => `- ${item.name} (x${item.quantity}) - ${formatPrice(item.price * item.quantity)}`).join('\n')}
          
          Subtotal: ${formatPrice(subtotal)}
          Logistics Fee: ₦${logisticsFee.toLocaleString()} (${formatPrice(logisticsInUSD)})
          Total: ${formatPrice(total)}
          
          Payment Method: ${paymentMethod.toUpperCase()}
          ${paymentMethod === 'card' ? `Card: ****${cardDetails.number.slice(-4)}` : ''}
          ${paymentMethod === 'bank' ? 'Bank Transfer - Account: 6116293603 (SUPLAR VENTURES - MONIEPOINT MFB)' : ''}
          ${(paymentMethod === 'usdc' || paymentMethod === 'xlm') ? `Wallet: ${walletType?.toUpperCase()}` : ''}
          
          Currency: ${currency}
        `,
        name: userDetails.name,
        email: userDetails.email,
        phone: userDetails.phone,
        orderNumber: orderId
      };
      
      const success = await sendEmail(emailData);
      
      if (success) {
        alert(`Order placed successfully! Order ID: ${orderId}\n\nYou will receive a confirmation email shortly. Thank you for choosing Suplar!`);
        clearCart();
        setShowCheckoutModal(false);
        router.push('/track-order');
      } else {
        alert('Failed to process order. Please try again.');
      }
    } catch (error) {
      alert('An error occurred while processing your order. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleWalletConnect = async (type: 'metamask' | 'freighter' | 'albedo') => {
    try {
      await connectWallet(type);
      alert(`${type.charAt(0).toUpperCase() + type.slice(1)} wallet connected successfully!`);
    } catch (error) {
      alert(`Failed to connect ${type} wallet. Please make sure it's installed and try again.`);
    }
  };

  return (
    <div className="space-y-6">
      {/* Currency Toggle */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center text-lg">
            <DollarSign className="w-5 h-5 mr-2 text-green-600" />
            Currency
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex space-x-2">
            <Button
              variant={currency === 'USD' ? 'default' : 'outline'}
              onClick={() => setCurrency('USD')}
              className="flex-1"
            >
              USD ($)
            </Button>
            <Button
              variant={currency === 'NGN' ? 'default' : 'outline'}
              onClick={() => setCurrency('NGN')}
              className="flex-1"
            >
              Naira (₦)
            </Button>
          </div>
        </CardContent>
      </Card>

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
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label htmlFor="city">City *</Label>
              <Select onValueChange={setSelectedCity}>
                <SelectTrigger>
                  <SelectValue placeholder="Select city" />
                </SelectTrigger>
                <SelectContent>
                  {nigerianCities.map((city) => (
                    <SelectItem key={city.value} value={city.value}>
                      {city.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="state">State *</Label>
              <Input 
                id="state" 
                placeholder="State" 
                value={state}
                onChange={(e) => setState(e.target.value)}
              />
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
              <span className="text-gray-600">Subtotal ({items.length} items):</span>
              <span>{formatPrice(subtotal)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Logistics Fee:</span>
              <span>{formatPrice(logisticsInUSD)}</span>
            </div>
            <div className="border-t pt-2">
              <div className="flex justify-between font-semibold text-lg">
                <span>Total:</span>
                <span>{formatPrice(total)}</span>
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
              <SelectItem value="card">
                <div className="flex items-center">
                  <CreditCard className="w-4 h-4 mr-2" />
                  MasterCard / Visa
                </div>
              </SelectItem>
              <SelectItem value="bank">
                <div className="flex items-center">
                  <CreditCard className="w-4 h-4 mr-2" />
                  Bank Transfer
                </div>
              </SelectItem>
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
            </SelectContent>
          </Select>
          
          {paymentMethod === 'bank' && (
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-semibold mb-2">Bank Transfer Details:</h4>
              <div className="text-sm space-y-1">
                <p><strong>Account Number:</strong> 6116293603</p>
                <p><strong>Account Name:</strong> SUPLAR VENTURES</p>
                <p><strong>Bank:</strong> MONIEPOINT MFB</p>
              </div>
            </div>
          )}
          
          {(paymentMethod === 'usdc' || paymentMethod === 'xlm') && !isConnected && (
            <div className="space-y-2">
              <p className="text-sm text-gray-600">Connect your Stellar wallet to proceed:</p>
              <div className="space-y-2">
                <Button
                  variant="outline"
                  className="w-full justify-start"
                  onClick={() => handleWalletConnect('freighter')}
                >
                  <Wallet className="w-4 h-4 mr-2" />
                  Freighter
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start"
                  onClick={() => handleWalletConnect('albedo')}
                >
                  <Wallet className="w-4 h-4 mr-2" />
                  Albedo
                </Button>
              </div>
            </div>
          )}
          
          <div className="text-xs text-gray-500 bg-gray-50 p-3 rounded">
            <p className="mb-1">💡 <strong>Payment Options:</strong></p>
            <p>Choose from crypto (USDC/XLM), card payments, or bank transfer for your convenience.</p>
          </div>
        </CardContent>
      </Card>

      {/* Checkout Button */}
      <Dialog open={showCheckoutModal} onOpenChange={setShowCheckoutModal}>
        <DialogTrigger asChild>
          <Button 
            size="lg" 
            className="w-full bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-lg py-4"
            onClick={handleProceedToCheckout}
            disabled={items.length === 0}
          >
            Proceed to Checkout
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Complete Your Order</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-6">
            {/* User Details */}
            <div>
              <h3 className="font-semibold mb-4 flex items-center">
                <User className="w-5 h-5 mr-2" />
                Contact Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="checkout-name">Full Name *</Label>
                  <Input
                    id="checkout-name"
                    value={userDetails.name}
                    onChange={(e) => setUserDetails({...userDetails, name: e.target.value})}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="checkout-email">Email *</Label>
                  <Input
                    id="checkout-email"
                    type="email"
                    value={userDetails.email}
                    onChange={(e) => setUserDetails({...userDetails, email: e.target.value})}
                    required
                  />
                </div>
              </div>
              <div className="mt-4">
                <Label htmlFor="checkout-phone">Phone Number</Label>
                <Input
                  id="checkout-phone"
                  value={userDetails.phone}
                  onChange={(e) => setUserDetails({...userDetails, phone: e.target.value})}
                />
              </div>
            </div>

            {/* Payment Details */}
            {paymentMethod === 'card' && (
              <div>
                <h3 className="font-semibold mb-4 flex items-center">
                  <CreditCard className="w-5 h-5 mr-2" />
                  Card Details
                </h3>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="card-name">Cardholder Name *</Label>
                    <Input
                      id="card-name"
                      value={cardDetails.name}
                      onChange={(e) => setCardDetails({...cardDetails, name: e.target.value})}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="card-number">Card Number *</Label>
                    <Input
                      id="card-number"
                      placeholder="1234 5678 9012 3456"
                      value={cardDetails.number}
                      onChange={(e) => setCardDetails({...cardDetails, number: e.target.value})}
                      required
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="card-expiry">Expiry Date *</Label>
                      <Input
                        id="card-expiry"
                        placeholder="MM/YY"
                        value={cardDetails.expiry}
                        onChange={(e) => setCardDetails({...cardDetails, expiry: e.target.value})}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="card-cvv">CVV *</Label>
                      <Input
                        id="card-cvv"
                        placeholder="123"
                        value={cardDetails.cvv}
                        onChange={(e) => setCardDetails({...cardDetails, cvv: e.target.value})}
                        required
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Order Summary */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold mb-2">Order Summary</h3>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Logistics:</span>
                  <span>{formatPrice(logisticsInUSD)}</span>
                </div>
                <div className="flex justify-between font-semibold text-base border-t pt-1">
                  <span>Total:</span>
                  <span>{formatPrice(total)}</span>
                </div>
              </div>
            </div>

            <Button 
              onClick={handlePayment}
              className="w-full bg-gradient-to-r from-blue-600 to-green-600"
              disabled={isProcessing}
            >
              {isProcessing ? 'Processing...' : `Pay ${formatPrice(total)}`}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
      
      <p className="text-xs text-gray-500 text-center">
        Secure checkout with multiple payment options
      </p>
    </div>
  );
}