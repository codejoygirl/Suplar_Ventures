'use client';

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Stethoscope, 
  Zap, 
  Laptop, 
  Microscope, 
  FlaskConical,
  Factory,
  X,
  Star,
  MapPin,
  ShoppingCart
} from 'lucide-react';
import { useCartStore } from '@/lib/cart-store';

const categories = [
  {
    icon: Stethoscope,
    name: 'Medical Equipment & Consumables',
    count: '450+',
    color: 'text-red-600',
    bgColor: 'bg-red-50',
    description: 'Medical devices, consumables, and healthcare equipment',
    image: 'https://images.pexels.com/photos/4386467/pexels-photo-4386467.jpeg?auto=compress&cs=tinysrgb&w=400',
    products: [
      {
        id: 101,
        name: 'Digital Blood Pressure Monitor',
        price: 89.99,
        originalPrice: 129.99,
        rating: 4.8,
        reviews: 234,
        supplier: 'MedTech Solutions',
        location: 'Mumbai, India',
        image: 'https://images.pexels.com/photos/4386467/pexels-photo-4386467.jpeg?auto=compress&cs=tinysrgb&w=300',
        category: 'Medical Equipment',
      },
      {
        id: 102,
        name: 'Surgical Gloves (Box of 100)',
        price: 24.99,
        originalPrice: 35.00,
        rating: 4.6,
        reviews: 156,
        supplier: 'MedSupply Co',
        location: 'Bangkok, Thailand',
        image: 'https://images.pexels.com/photos/4386467/pexels-photo-4386467.jpeg?auto=compress&cs=tinysrgb&w=300',
        category: 'Medical Equipment',
      },
      {
        id: 103,
        name: 'Stethoscope Professional',
        price: 145.00,
        originalPrice: 180.00,
        rating: 4.9,
        reviews: 89,
        supplier: 'Healthcare Pro',
        location: 'Seoul, South Korea',
        image: 'https://images.pexels.com/photos/4386467/pexels-photo-4386467.jpeg?auto=compress&cs=tinysrgb&w=300',
        category: 'Medical Equipment',
      },
      {
        id: 104,
        name: 'Thermometer Digital',
        price: 19.99,
        originalPrice: 29.99,
        rating: 4.5,
        reviews: 312,
        supplier: 'TechMed',
        location: 'Taipei, Taiwan',
        image: 'https://images.pexels.com/photos/4386467/pexels-photo-4386467.jpeg?auto=compress&cs=tinysrgb&w=300',
        category: 'Medical Equipment',
      }
    ]
  },
  {
    icon: Zap,
    name: 'Electrical Materials & Accessories',
    count: '320+',
    color: 'text-yellow-600',
    bgColor: 'bg-yellow-50',
    description: 'Electrical components, cables, and accessories',
    image: 'https://images.pexels.com/photos/257736/pexels-photo-257736.jpeg?auto=compress&cs=tinysrgb&w=400',
    products: [
      {
        id: 201,
        name: 'Industrial Cable Set (50m)',
        price: 45.50,
        originalPrice: 65.00,
        rating: 4.6,
        reviews: 156,
        supplier: 'ElectroTech Ltd',
        location: 'Shenzhen, China',
        image: 'https://images.pexels.com/photos/257736/pexels-photo-257736.jpeg?auto=compress&cs=tinysrgb&w=300',
        category: 'Electrical Materials',
      },
      {
        id: 202,
        name: 'LED Light Bulbs (Pack of 10)',
        price: 32.99,
        originalPrice: 45.00,
        rating: 4.7,
        reviews: 203,
        supplier: 'BrightTech',
        location: 'Mumbai, India',
        image: 'https://images.pexels.com/photos/257736/pexels-photo-257736.jpeg?auto=compress&cs=tinysrgb&w=300',
        category: 'Electrical Materials',
      },
      {
        id: 203,
        name: 'Power Extension Cord 20ft',
        price: 18.75,
        originalPrice: 25.00,
        rating: 4.4,
        reviews: 89,
        supplier: 'PowerMax',
        location: 'Ho Chi Minh, Vietnam',
        image: 'https://images.pexels.com/photos/257736/pexels-photo-257736.jpeg?auto=compress&cs=tinysrgb&w=300',
        category: 'Electrical Materials',
      }
    ]
  },
  {
    icon: Laptop,
    name: 'Office Equipment & Supplies',
    count: '280+',
    color: 'text-blue-600',
    bgColor: 'bg-blue-50',
    description: 'Office furniture, stationery, and equipment',
    image: 'https://images.pexels.com/photos/1957477/pexels-photo-1957477.jpeg?auto=compress&cs=tinysrgb&w=400',
    products: [
      {
        id: 301,
        name: 'Ergonomic Office Chair',
        price: 245.99,
        originalPrice: 320.00,
        rating: 4.7,
        reviews: 89,
        supplier: 'Workspace Solutions',
        location: 'Istanbul, Turkey',
        image: 'https://images.pexels.com/photos/1957477/pexels-photo-1957477.jpeg?auto=compress&cs=tinysrgb&w=300',
        category: 'Office Equipment',
      },
      {
        id: 302,
        name: 'Standing Desk Adjustable',
        price: 189.99,
        originalPrice: 250.00,
        rating: 4.6,
        reviews: 145,
        supplier: 'ModernOffice',
        location: 'Bangkok, Thailand',
        image: 'https://images.pexels.com/photos/1957477/pexels-photo-1957477.jpeg?auto=compress&cs=tinysrgb&w=300',
        category: 'Office Equipment',
      },
      {
        id: 303,
        name: 'Office Supplies Bundle',
        price: 45.00,
        originalPrice: 60.00,
        rating: 4.5,
        reviews: 234,
        supplier: 'SupplyHub',
        location: 'Manila, Philippines',
        image: 'https://images.pexels.com/photos/1957477/pexels-photo-1957477.jpeg?auto=compress&cs=tinysrgb&w=300',
        category: 'Office Equipment',
      }
    ]
  },
  {
    icon: Microscope,
    name: 'Diagnostic Lab Equipment',
    count: '190+',
    color: 'text-purple-600',
    bgColor: 'bg-purple-50',
    description: 'Laboratory instruments and diagnostic tools',
    image: 'https://images.pexels.com/photos/2280549/pexels-photo-2280549.jpeg?auto=compress&cs=tinysrgb&w=400',
    products: [
      {
        id: 401,
        name: 'Laboratory Microscope',
        price: 1299.99,
        originalPrice: 1599.00,
        rating: 4.9,
        reviews: 67,
        supplier: 'Scientific Instruments',
        location: 'Tokyo, Japan',
        image: 'https://images.pexels.com/photos/2280549/pexels-photo-2280549.jpeg?auto=compress&cs=tinysrgb&w=300',
        category: 'Diagnostic Lab Equipment',
      },
      {
        id: 402,
        name: 'pH Meter Digital',
        price: 89.99,
        originalPrice: 120.00,
        rating: 4.6,
        reviews: 123,
        supplier: 'LabTech Pro',
        location: 'Berlin, Germany',
        image: 'https://images.pexels.com/photos/2280549/pexels-photo-2280549.jpeg?auto=compress&cs=tinysrgb&w=300',
        category: 'Diagnostic Lab Equipment',
      }
    ]
  },
  {
    icon: FlaskConical,
    name: 'Research/Science Lab Equipment',
    count: '160+',
    color: 'text-green-600',
    bgColor: 'bg-green-50',
    description: 'Research instruments, chemicals, and lab supplies',
    image: 'https://images.pexels.com/photos/2280571/pexels-photo-2280571.jpeg?auto=compress&cs=tinysrgb&w=400',
    products: [
      {
        id: 501,
        name: 'Research Grade Centrifuge',
        price: 2750.00,
        originalPrice: 3200.00,
        rating: 4.8,
        reviews: 43,
        supplier: 'LabTech Pro',
        location: 'Berlin, Germany',
        image: 'https://images.pexels.com/photos/2280571/pexels-photo-2280571.jpeg?auto=compress&cs=tinysrgb&w=300',
        category: 'Research Lab Equipment',
      },
      {
        id: 502,
        name: 'Laboratory Glassware Set',
        price: 145.00,
        originalPrice: 180.00,
        rating: 4.7,
        reviews: 89,
        supplier: 'ScienceSupply',
        location: 'Prague, Czech Republic',
        image: 'https://images.pexels.com/photos/2280571/pexels-photo-2280571.jpeg?auto=compress&cs=tinysrgb&w=300',
        category: 'Research Lab Equipment',
      }
    ]
  },
  {
    icon: Factory,
    name: 'Industrial Chemicals',
    count: '140+',
    color: 'text-gray-600',
    bgColor: 'bg-gray-50',
    description: 'Industrial chemicals and manufacturing materials',
    image: 'https://images.pexels.com/photos/3735747/pexels-photo-3735747.jpeg?auto=compress&cs=tinysrgb&w=400',
    products: [
      {
        id: 601,
        name: 'Industrial Solvent (25L)',
        price: 185.99,
        originalPrice: 220.00,
        rating: 4.5,
        reviews: 123,
        supplier: 'ChemSupply Co',
        location: 'Rotterdam, Netherlands',
        image: 'https://images.pexels.com/photos/3735747/pexels-photo-3735747.jpeg?auto=compress&cs=tinysrgb&w=300',
        category: 'Industrial Chemicals',
      },
      {
        id: 602,
        name: 'Cleaning Agent Industrial',
        price: 45.00,
        originalPrice: 60.00,
        rating: 4.4,
        reviews: 67,
        supplier: 'CleanTech',
        location: 'Hamburg, Germany',
        image: 'https://images.pexels.com/photos/3735747/pexels-photo-3735747.jpeg?auto=compress&cs=tinysrgb&w=300',
        category: 'Industrial Chemicals',
      }
    ]
  },
];

export function ProductCategories() {
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
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

  const selectedCategoryData = selectedCategory !== null ? categories[selectedCategory] : null;

  return (
    <div className="mb-12">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Product Categories</h2>
      
      {selectedCategory === null ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category, index) => {
            const Icon = category.icon;
            return (
              <Card 
                key={index} 
                className="cursor-pointer hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group overflow-hidden"
                onClick={() => setSelectedCategory(index)}
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300"></div>
                  <div className={`absolute top-4 left-4 w-12 h-12 ${category.bgColor} rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                    <Icon className={`w-6 h-6 ${category.color}`} />
                  </div>
                </div>
                <CardContent className="p-6">
                  <h3 className="font-semibold text-gray-900 text-lg mb-2">
                    {category.name}
                  </h3>
                  <p className="text-sm text-gray-600 mb-3 leading-relaxed">
                    {category.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-500">
                      {category.count} products
                    </span>
                    <span className="text-sm text-blue-600 font-medium group-hover:text-blue-700">
                      Browse →
                    </span>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      ) : (
        <div>
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <Button
                variant="outline"
                onClick={() => setSelectedCategory(null)}
                className="flex items-center space-x-2"
              >
                <X className="w-4 h-4" />
                <span>Back to Categories</span>
              </Button>
              <h3 className="text-xl font-semibold text-gray-900">
                {selectedCategoryData?.name}
              </h3>
              <Badge variant="secondary">
                {selectedCategoryData?.count} products
              </Badge>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {selectedCategoryData?.products.map((product) => (
              <Card 
                key={product.id} 
                className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden"
              >
                <div className="relative">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                
                <CardContent className="p-4">
                  <div className="mb-2">
                    <span className="text-xs text-blue-600 font-medium bg-blue-50 px-2 py-1 rounded">
                      {product.category}
                    </span>
                  </div>
                  
                  <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 text-sm">
                    {product.name}
                  </h3>
                  
                  <div className="flex items-center mb-2">
                    <div className="flex items-center">
                      <Star className="w-3 h-3 text-yellow-400 fill-current" />
                      <span className="text-xs font-medium text-gray-700 ml-1">
                        {product.rating}
                      </span>
                      <span className="text-xs text-gray-500 ml-1">
                        ({product.reviews})
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex items-center mb-2">
                    <MapPin className="w-3 h-3 text-gray-400 mr-1" />
                    <span className="text-xs text-gray-600">
                      {product.supplier}, {product.location}
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <span className="text-lg font-bold text-gray-900">
                        ${product.price.toFixed(2)}
                      </span>
                      {product.originalPrice && (
                        <span className="text-xs text-gray-500 line-through ml-1">
                          ${product.originalPrice.toFixed(2)}
                        </span>
                      )}
                    </div>
                  </div>
                  
                  <Button 
                    className="w-full bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-sm py-2"
                    onClick={() => handleAddToCart(product)}
                  >
                    <ShoppingCart className="w-3 h-3 mr-2" />
                    Add to Cart
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}