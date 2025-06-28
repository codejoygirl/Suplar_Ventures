'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Search, Package, Truck, CheckCircle, Clock, MapPin, Phone, Mail } from 'lucide-react';
import { sendEmail } from '@/lib/email-service';

const mockOrders = [
  {
    orderNumber: 'SUP-2025-001',
    status: 'delivered',
    items: [
      { name: 'Digital Blood Pressure Monitor', quantity: 2, price: 89.99 },
      { name: 'Surgical Gloves (Box of 100)', quantity: 1, price: 24.99 }
    ],
    total: 204.97,
    orderDate: '2025-01-10',
    estimatedDelivery: '2025-01-15',
    actualDelivery: '2025-01-14',
    supplier: 'MedTech Solutions',
    trackingSteps: [
      { status: 'Order Placed', date: '2025-01-10 09:30', completed: true },
      { status: 'Payment Confirmed', date: '2025-01-10 09:45', completed: true },
      { status: 'Supplier Processing', date: '2025-01-10 14:20', completed: true },
      { status: 'Shipped', date: '2025-01-11 08:15', completed: true },
      { status: 'In Transit', date: '2025-01-12 16:30', completed: true },
      { status: 'Out for Delivery', date: '2025-01-14 07:00', completed: true },
      { status: 'Delivered', date: '2025-01-14 14:30', completed: true }
    ]
  },
  {
    orderNumber: 'SUP-2025-002',
    status: 'in_transit',
    items: [
      { name: 'Laboratory Microscope', quantity: 1, price: 1299.99 }
    ],
    total: 1299.99,
    orderDate: '2025-01-12',
    estimatedDelivery: '2025-01-18',
    supplier: 'Scientific Instruments',
    trackingSteps: [
      { status: 'Order Placed', date: '2025-01-12 11:20', completed: true },
      { status: 'Payment Confirmed', date: '2025-01-12 11:35', completed: true },
      { status: 'Supplier Processing', date: '2025-01-12 16:45', completed: true },
      { status: 'Shipped', date: '2025-01-13 09:30', completed: true },
      { status: 'In Transit', date: '2025-01-14 12:15', completed: true },
      { status: 'Out for Delivery', date: '', completed: false },
      { status: 'Delivered', date: '', completed: false }
    ]
  }
];

export default function TrackOrderPage() {
  const [orderNumber, setOrderNumber] = useState('');
  const [email, setEmail] = useState('');
  const [trackedOrder, setTrackedOrder] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleTrackOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setTrackedOrder(null);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const order = mockOrders.find(o => o.orderNumber.toLowerCase() === orderNumber.toLowerCase());
      
      if (order) {
        setTrackedOrder(order);
        
        // Send tracking request email
        await sendEmail({
          to: 'info.suplar@gmail.com',
          subject: 'Order Tracking Request',
          message: `
            Order tracking request:
            
            Order Number: ${orderNumber}
            Customer Email: ${email}
            Request Time: ${new Date().toISOString()}
          `,
          email: email,
          orderNumber: orderNumber
        });
      } else {
        setError('Order not found. Please check your order number and try again.');
      }
    } catch (error) {
      setError('An error occurred while tracking your order. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered': return 'bg-green-500';
      case 'in_transit': return 'bg-blue-500';
      case 'processing': return 'bg-yellow-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'delivered': return 'Delivered';
      case 'in_transit': return 'In Transit';
      case 'processing': return 'Processing';
      default: return 'Unknown';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Track Your Order
          </h1>
          <p className="text-xl text-gray-600">
            Enter your order number to get real-time updates on your shipment
          </p>
        </div>

        {/* Tracking Form */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Search className="w-5 h-5 mr-2 text-blue-600" />
              Order Tracking
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleTrackOrder} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="order-number">Order Number *</Label>
                  <Input
                    id="order-number"
                    placeholder="e.g., SUP-2025-001"
                    value={orderNumber}
                    onChange={(e) => setOrderNumber(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email Address *</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="your@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? 'Tracking...' : 'Track Order'}
              </Button>
            </form>
            
            {error && (
              <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-600">{error}</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Order Details */}
        {trackedOrder && (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle>Order {trackedOrder.orderNumber}</CardTitle>
                    <p className="text-gray-600">Placed on {new Date(trackedOrder.orderDate).toLocaleDateString()}</p>
                  </div>
                  <Badge className={`${getStatusColor(trackedOrder.status)} text-white`}>
                    {getStatusText(trackedOrder.status)}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-2">Order Items</h4>
                    <div className="space-y-2">
                      {trackedOrder.items.map((item: any, index: number) => (
                        <div key={index} className="flex justify-between text-sm">
                          <span>{item.name} (x{item.quantity})</span>
                          <span>${(item.price * item.quantity).toFixed(2)}</span>
                        </div>
                      ))}
                    </div>
                    <Separator className="my-2" />
                    <div className="flex justify-between font-semibold">
                      <span>Total</span>
                      <span>${trackedOrder.total.toFixed(2)}</span>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold mb-2">Delivery Information</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center">
                        <Package className="w-4 h-4 mr-2 text-gray-400" />
                        <span>Supplier: {trackedOrder.supplier}</span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-2 text-gray-400" />
                        <span>
                          {trackedOrder.status === 'delivered' 
                            ? `Delivered on ${new Date(trackedOrder.actualDelivery).toLocaleDateString()}`
                            : `Expected: ${new Date(trackedOrder.estimatedDelivery).toLocaleDateString()}`
                          }
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Tracking Timeline */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Truck className="w-5 h-5 mr-2 text-blue-600" />
                  Tracking Timeline
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {trackedOrder.trackingSteps.map((step: any, index: number) => (
                    <div key={index} className="flex items-start space-x-4">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        step.completed ? 'bg-green-500' : 'bg-gray-300'
                      }`}>
                        {step.completed ? (
                          <CheckCircle className="w-5 h-5 text-white" />
                        ) : (
                          <Clock className="w-5 h-5 text-gray-500" />
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-center">
                          <h4 className={`font-medium ${step.completed ? 'text-gray-900' : 'text-gray-500'}`}>
                            {step.status}
                          </h4>
                          {step.date && (
                            <span className="text-sm text-gray-500">
                              {new Date(step.date).toLocaleString()}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Sample Order Numbers */}
        <Card>
          <CardHeader>
            <CardTitle>Need Help?</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-2">Sample Order Numbers (for testing)</h4>
                <div className="space-y-1 text-sm">
                  <p><code className="bg-gray-100 px-2 py-1 rounded">SUP-2025-001</code> - Delivered order</p>
                  <p><code className="bg-gray-100 px-2 py-1 rounded">SUP-2025-002</code> - In transit order</p>
                </div>
              </div>
              
              <div>
                <h4 className="font-semibold mb-2">Contact Support</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center">
                    <Mail className="w-4 h-4 mr-2 text-gray-400" />
                    <a 
                      href="mailto:info.suplar@gmail.com" 
                      className="hover:text-blue-600 transition-colors cursor-pointer"
                    >
                      info.suplar@gmail.com
                    </a>
                  </div>
                  <div className="flex items-center">
                    <Phone className="w-4 h-4 mr-2 text-gray-400" />
                    <a 
                      href="tel:+2348062249498" 
                      className="hover:text-blue-600 transition-colors cursor-pointer"
                    >
                      +2348062249498
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}