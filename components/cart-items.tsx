'use client';

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Trash2, Plus, Minus } from 'lucide-react';

const cartItems = [
  {
    id: 1,
    name: 'Digital Blood Pressure Monitor',
    supplier: 'MedTech Solutions',
    price: 89.99,
    quantity: 2,
    image: 'https://images.pexels.com/photos/4386467/pexels-photo-4386467.jpeg?auto=compress&cs=tinysrgb&w=300',
    category: 'Medical Equipment',
  },
  {
    id: 2,
    name: 'Laboratory Microscope',
    supplier: 'Scientific Instruments Ltd',
    price: 1299.99,
    quantity: 1,
    image: 'https://images.pexels.com/photos/2280549/pexels-photo-2280549.jpeg?auto=compress&cs=tinysrgb&w=300',
    category: 'Lab Equipment',
  },
  {
    id: 3,
    name: 'Office Desk Chair (Ergonomic)',
    supplier: 'Workspace Solutions',
    price: 245.50,
    quantity: 4,
    image: 'https://images.pexels.com/photos/1957477/pexels-photo-1957477.jpeg?auto=compress&cs=tinysrgb&w=300',
    category: 'Office Equipment',
  },
];

export function CartItems() {
  const [items, setItems] = useState(cartItems);

  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity < 1) return;
    setItems(items.map(item => 
      item.id === id ? { ...item, quantity: newQuantity } : item
    ));
  };

  const removeItem = (id: number) => {
    setItems(items.filter(item => item.id !== id));
  };

  return (
    <Card>
      <CardContent className="p-6">
        <div className="space-y-6">
          {items.map((item) => (
            <div key={item.id} className="flex items-center space-x-4 pb-6 border-b border-gray-200 last:border-b-0">
              <img
                src={item.image}
                alt={item.name}
                className="w-20 h-20 object-cover rounded-lg"
              />
              
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 mb-1">{item.name}</h3>
                <p className="text-sm text-gray-600 mb-1">by {item.supplier}</p>
                <p className="text-xs text-blue-600">{item.category}</p>
              </div>
              
              <div className="flex items-center space-x-3">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  className="w-8 h-8 p-0"
                >
                  <Minus className="w-4 h-4" />
                </Button>
                <Input
                  type="number"
                  value={item.quantity}
                  onChange={(e) => updateQuantity(item.id, parseInt(e.target.value) || 1)}
                  className="w-16 text-center"
                  min="1"
                />
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  className="w-8 h-8 p-0"
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
              
              <div className="text-right">
                <div className="font-semibold text-gray-900">
                  ${(item.price * item.quantity).toFixed(2)}
                </div>
                <div className="text-sm text-gray-500">
                  ${item.price.toFixed(2)} each
                </div>
              </div>
              
              <Button
                variant="outline"
                size="sm"
                onClick={() => removeItem(item.id)}
                className="text-red-600 hover:text-red-700 hover:bg-red-50"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          ))}
          
          {items.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 mb-4">Your cart is empty</p>
              <Button>Continue Shopping</Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}