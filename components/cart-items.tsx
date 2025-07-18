'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Trash2, Plus, Minus } from 'lucide-react';
import { useCartStore } from '@/lib/cart-store';

export function CartItems() {
  const { items, updateQuantity, removeItem } = useCartStore();

  const handleQuantityChange = (id: number, newQuantity: number) => {
    if (newQuantity < 1) return;
    updateQuantity(id, newQuantity);
  };

  const handleRemoveItem = (id: number) => {
    removeItem(id);
  };

  return (
    <Card>
      <CardContent className="p-4 sm:p-6">
        <div className="space-y-4 sm:space-y-6">
          {items.map((item) => (
            <div key={item.id} className="flex flex-col sm:flex-row sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 pb-4 sm:pb-6 border-b border-gray-200 last:border-b-0">
              <img
                src={item.image}
                alt={item.name}
                className="w-full sm:w-20 h-48 sm:h-20 object-cover rounded-lg"
              />
              
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-gray-900 mb-1 text-sm sm:text-base">{item.name}</h3>
                <p className="text-sm text-gray-600 mb-1">by {item.supplier}</p>
                <p className="text-xs text-blue-600">{item.category}</p>
              </div>
              
              <div className="flex items-center justify-between sm:justify-start sm:space-x-4">
                <div className="flex items-center space-x-2 sm:space-x-3">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                    className="w-8 h-8 p-0"
                  >
                    <Minus className="w-4 h-4" />
                  </Button>
                  <Input
                    type="number"
                    value={item.quantity}
                    onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value) || 1)}
                    className="w-16 text-center text-sm"
                    min="1"
                  />
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                    className="w-8 h-8 p-0"
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
                
                <div className="text-right">
                  <div className="font-semibold text-gray-900 text-sm sm:text-base">
                    ${(item.price * item.quantity).toFixed(2)}
                  </div>
                  <div className="text-xs sm:text-sm text-gray-500">
                    ${item.price.toFixed(2)} each
                  </div>
                </div>
                
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleRemoveItem(item.id)}
                  className="text-red-600 hover:text-red-700 hover:bg-red-50 ml-2 sm:ml-0"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ))}
          
          {items.length === 0 && (
            <div className="text-center py-8 sm:py-12">
              <p className="text-gray-500 mb-4">Your cart is empty</p>
              <Button onClick={() => window.location.href = '/products'}>
                Continue Shopping
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}