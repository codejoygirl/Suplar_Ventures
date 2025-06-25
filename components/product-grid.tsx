'use client';

import { useRouter } from 'next/navigation';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Star, MapPin, ShoppingCart } from 'lucide-react';

const products = [
  {
    id: 1,
    name: 'Wireless Bluetooth Headphones',
    price: '$45.99',
    originalPrice: '$89.99',
    rating: 4.8,
    reviews: 234,
    supplier: 'TechPro Electronics',
    location: 'Shenzhen, China',
    image: 'https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=400',
    badge: 'Best Seller',
    badgeColor: 'bg-green-500',
  },
  {
    id: 2,
    name: 'Solar Power Bank 20000mAh',
    price: '$28.50',
    originalPrice: '$45.00',
    rating: 4.6,
    reviews: 156,
    supplier: 'GreenTech Solutions',
    location: 'Mumbai, India',
    image: 'https://images.pexels.com/photos/4068314/pexels-photo-4068314.jpeg?auto=compress&cs=tinysrgb&w=400',
    badge: 'Eco-Friendly',
    badgeColor: 'bg-green-600',
  },
  {
    id: 3,
    name: 'Premium Cotton T-Shirts (Pack of 5)',
    price: '$32.99',
    originalPrice: '$55.00',
    rating: 4.7,
    reviews: 89,
    supplier: 'Quality Textiles',
    location: 'Istanbul, Turkey',
    image: 'https://images.pexels.com/photos/8532616/pexels-photo-8532616.jpeg?auto=compress&cs=tinysrgb&w=400',
    badge: 'Bulk Deal',
    badgeColor: 'bg-blue-500',
  },
  {
    id: 4,
    name: 'LED Desk Lamp with USB Charging',
    price: '$19.99',
    originalPrice: '$35.00',
    rating: 4.5,
    reviews: 67,
    supplier: 'Modern Home',
    location: 'Ho Chi Minh, Vietnam',
    image: 'https://images.pexels.com/photos/1112598/pexels-photo-1112598.jpeg?auto=compress&cs=tinysrgb&w=400',
    badge: 'Limited Time',
    badgeColor: 'bg-red-500',
  },
  {
    id: 5,
    name: 'Stainless Steel Water Bottle',
    price: '$12.75',
    originalPrice: '$25.00',
    rating: 4.9,
    reviews: 312,
    supplier: 'EcoWare',
    location: 'Bangkok, Thailand',
    image: 'https://images.pexels.com/photos/1000084/pexels-photo-1000084.jpeg?auto=compress&cs=tinysrgb&w=400',
    badge: 'Top Rated',
    badgeColor: 'bg-yellow-500',
  },
  {
    id: 6,
    name: 'Smartphone Car Mount',
    price: '$8.99',
    originalPrice: '$18.00',
    rating: 4.4,
    reviews: 123,
    supplier: 'AutoTech Plus',
    location: 'Guangzhou, China',
    image: 'https://images.pexels.com/photos/1038916/pexels-photo-1038916.jpeg?auto=compress&cs=tinysrgb&w=400',
    badge: 'Popular',
    badgeColor: 'bg-purple-500',
  },
];

export function ProductGrid() {
  const router = useRouter();

  const handleAddToCart = (productId: number) => {
    // In a real app, this would add the product to cart state/context
    alert(`Product ${productId} added to cart! Cart functionality will be fully implemented with state management.`);
  };

  const handleLoadMore = () => {
    // In a real app, this would load more products from API
    alert('Load more functionality will be implemented with pagination/infinite scroll.');
  };

  const handleProductClick = (productId: number) => {
    // In a real app, this would navigate to product detail page
    router.push(`/products/${productId}`);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">
          Featured Products
        </h2>
        <div className="text-sm text-gray-600">
          Showing 1-6 of 15,430 results
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
                    {product.price}
                  </span>
                  <span className="text-sm text-gray-500 line-through ml-2">
                    {product.originalPrice}
                  </span>
                </div>
              </div>
              
              <Button 
                className="w-full bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700"
                onClick={(e) => {
                  e.stopPropagation();
                  handleAddToCart(product.id);
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
          Load More Products
        </Button>
      </div>
    </div>
  );
}