'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Star, MapPin, ShoppingCart } from 'lucide-react';
import { useCartStore } from '@/lib/cart-store';

const initialProducts = [
  {
    id: 1,
    name: 'Digital Blood Pressure Monitor',
    price: 89.99,
    originalPrice: 129.99,
    rating: 4.8,
    reviews: 234,
    supplier: 'MedTech Solutions',
    location: 'Mumbai, India',
    image: 'https://images.pexels.com/photos/4386467/pexels-photo-4386467.jpeg?auto=compress&cs=tinysrgb&w=400',
    badge: 'Best Seller',
    badgeColor: 'bg-green-500',
    category: 'Medical Equipment',
  },
  {
    id: 2,
    name: 'Industrial Cable Set (50m)',
    price: 45.50,
    originalPrice: 65.00,
    rating: 4.6,
    reviews: 156,
    supplier: 'ElectroTech Ltd',
    location: 'Shenzhen, China',
    image: 'https://images.pexels.com/photos/257736/pexels-photo-257736.jpeg?auto=compress&cs=tinysrgb&w=400',
    badge: 'Popular',
    badgeColor: 'bg-blue-500',
    category: 'Electrical Materials',
  },
  {
    id: 3,
    name: 'Ergonomic Office Chair',
    price: 245.99,
    originalPrice: 320.00,
    rating: 4.7,
    reviews: 89,
    supplier: 'Workspace Solutions',
    location: 'Istanbul, Turkey',
    image: 'https://images.pexels.com/photos/1957477/pexels-photo-1957477.jpeg?auto=compress&cs=tinysrgb&w=400',
    badge: 'Premium',
    badgeColor: 'bg-purple-500',
    category: 'Office Equipment',
  },
  {
    id: 4,
    name: 'Laboratory Microscope',
    price: 1299.99,
    originalPrice: 1599.00,
    rating: 4.9,
    reviews: 67,
    supplier: 'Scientific Instruments',
    location: 'Tokyo, Japan',
    image: 'https://images.pexels.com/photos/2280549/pexels-photo-2280549.jpeg?auto=compress&cs=tinysrgb&w=400',
    badge: 'Professional',
    badgeColor: 'bg-red-500',
    category: 'Diagnostic Lab Equipment',
  },
  {
    id: 5,
    name: 'Research Grade Centrifuge',
    price: 2750.00,
    originalPrice: 3200.00,
    rating: 4.8,
    reviews: 43,
    supplier: 'LabTech Pro',
    location: 'Berlin, Germany',
    image: 'https://images.pexels.com/photos/2280571/pexels-photo-2280571.jpeg?auto=compress&cs=tinysrgb&w=400',
    badge: 'Research Grade',
    badgeColor: 'bg-green-600',
    category: 'Research Lab Equipment',
  },
  {
    id: 6,
    name: 'Industrial Solvent (25L)',
    price: 185.99,
    originalPrice: 220.00,
    rating: 4.5,
    reviews: 123,
    supplier: 'ChemSupply Co',
    location: 'Rotterdam, Netherlands',
    image: 'https://images.pexels.com/photos/3735747/pexels-photo-3735747.jpeg?auto=compress&cs=tinysrgb&w=400',
    badge: 'Bulk Available',
    badgeColor: 'bg-orange-500',
    category: 'Industrial Chemicals',
  },
];

const additionalProducts = [
  {
    id: 7,
    name: 'Surgical Gloves (Box of 100)',
    price: 24.99,
    originalPrice: 35.00,
    rating: 4.6,
    reviews: 156,
    supplier: 'MedSupply Co',
    location: 'Bangkok, Thailand',
    image: 'https://images.pexels.com/photos/4386467/pexels-photo-4386467.jpeg?auto=compress&cs=tinysrgb&w=400',
    badge: 'Bulk Deal',
    badgeColor: 'bg-blue-500',
    category: 'Medical Equipment',
  },
  {
    id: 8,
    name: 'LED Light Bulbs (Pack of 10)',
    price: 32.99,
    originalPrice: 45.00,
    rating: 4.7,
    reviews: 203,
    supplier: 'BrightTech',
    location: 'Mumbai, India',
    image: 'https://images.pexels.com/photos/257736/pexels-photo-257736.jpeg?auto=compress&cs=tinysrgb&w=400',
    badge: 'Energy Efficient',
    badgeColor: 'bg-green-500',
    category: 'Electrical Materials',
  },
  {
    id: 9,
    name: 'Standing Desk Adjustable',
    price: 189.99,
    originalPrice: 250.00,
    rating: 4.6,
    reviews: 145,
    supplier: 'ModernOffice',
    location: 'Bangkok, Thailand',
    image: 'https://images.pexels.com/photos/1957477/pexels-photo-1957477.jpeg?auto=compress&cs=tinysrgb&w=400',
    badge: 'Ergonomic',
    badgeColor: 'bg-purple-500',
    category: 'Office Equipment',
  },
  {
    id: 10,
    name: 'pH Meter Digital',
    price: 89.99,
    originalPrice: 120.00,
    rating: 4.6,
    reviews: 123,
    supplier: 'LabTech Pro',
    location: 'Berlin, Germany',
    image: 'https://images.pexels.com/photos/2280549/pexels-photo-2280549.jpeg?auto=compress&cs=tinysrgb&w=400',
    badge: 'Precision',
    badgeColor: 'bg-red-500',
    category: 'Diagnostic Lab Equipment',
  },
  {
    id: 11,
    name: 'Laboratory Glassware Set',
    price: 145.00,
    originalPrice: 180.00,
    rating: 4.7,
    reviews: 89,
    supplier: 'ScienceSupply',
    location: 'Prague, Czech Republic',
    image: 'https://images.pexels.com/photos/2280571/pexels-photo-2280571.jpeg?auto=compress&cs=tinysrgb&w=400',
    badge: 'Complete Set',
    badgeColor: 'bg-green-600',
    category: 'Research Lab Equipment',
  },
  {
    id: 12,
    name: 'Cleaning Agent Industrial',
    price: 45.00,
    originalPrice: 60.00,
    rating: 4.4,
    reviews: 67,
    supplier: 'CleanTech',
    location: 'Hamburg, Germany',
    image: 'https://images.pexels.com/photos/3735747/pexels-photo-3735747.jpeg?auto=compress&cs=tinysrgb&w=400',
    badge: 'Eco-Friendly',
    badgeColor: 'bg-orange-500',
    category: 'Industrial Chemicals',
  },
];

export function ProductGrid() {
  const [products, setProducts] = useState(initialProducts);
  const [hasLoadedMore, setHasLoadedMore] = useState(false);
  const router = useRouter();
  const addItem = useCartStore((state) => state.addItem);

  const handleAddToCart = (product: any) => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      originalPrice: product.originalPrice,
      image: product.image,
      supplier: product.supplier,
      category: product.category,
    });
    alert(`${product.name} added to cart!`);
  };

  const handleLoadMore = () => {
    if (!hasLoadedMore) {
      setProducts([...products, ...additionalProducts]);
      setHasLoadedMore(true);
    } else {
      alert('All products loaded! In a real application, this would fetch more products from the API.');
    }
  };

  const handleProductClick = (productId: number) => {
    router.push(`/products/${productId}`);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">
          Featured Products
        </h2>
        <div className="text-sm text-gray-600">
          Showing 1-{products.length} of 15,430 results
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <Card 
            key={product.id} 
            className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden cursor-pointer"
            onClick={() => handleProductClick(product.id)}
          >
            <div className="relative">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <Badge 
                className={`absolute top-3 left-3 ${product.badgeColor} text-white border-0`}
              >
                {product.badge}
              </Badge>
            </div>
            
            <CardContent className="p-6">
              <div className="mb-2">
                <span className="text-xs text-blue-600 font-medium bg-blue-50 px-2 py-1 rounded">
                  {product.category}
                </span>
              </div>
              
              <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
                {product.name}
              </h3>
              
              <div className="flex items-center mb-3">
                <div className="flex items-center">
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <span className="text-sm font-medium text-gray-700 ml-1">
                    {product.rating}
                  </span>
                  <span className="text-sm text-gray-500 ml-1">
                    ({product.reviews})
                  </span>
                </div>
              </div>
              
              <div className="flex items-center mb-3">
                <MapPin className="w-4 h-4 text-gray-400 mr-1" />
                <span className="text-sm text-gray-600">
                  {product.supplier}, {product.location}
                </span>
              </div>
              
              <div className="flex items-center justify-between mb-4">
                <div>
                  <span className="text-2xl font-bold text-gray-900">
                    ${product.price.toFixed(2)}
                  </span>
                  <span className="text-sm text-gray-500 line-through ml-2">
                    ${product.originalPrice?.toFixed(2)}
                  </span>
                </div>
              </div>
              
              <Button 
                className="w-full bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700"
                onClick={(e) => {
                  e.stopPropagation();
                  handleAddToCart(product);
                }}
              >
                <ShoppingCart className="w-4 h-4 mr-2" />
                Add to Cart
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <div className="flex justify-center mt-12">
        <Button variant="outline" size="lg" onClick={handleLoadMore}>
          {hasLoadedMore ? 'Load More Products' : 'Load More Products'}
        </Button>
      </div>
    </div>
  );
}