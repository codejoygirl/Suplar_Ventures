import { Card, CardContent } from '@/components/ui/card';
import { 
  Stethoscope, 
  Zap, 
  Laptop, 
  Microscope, 
  FlaskConical,
  Factory
} from 'lucide-react';

const categories = [
  {
    icon: Stethoscope,
    name: 'Medical Equipment & Consumables',
    count: '450+',
    color: 'text-red-600',
    bgColor: 'bg-red-50',
    description: 'Medical devices, consumables, and healthcare equipment',
    image: 'https://images.pexels.com/photos/4386467/pexels-photo-4386467.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    icon: Zap,
    name: 'Electrical Materials & Accessories',
    count: '320+',
    color: 'text-yellow-600',
    bgColor: 'bg-yellow-50',
    description: 'Electrical components, cables, and accessories',
    image: 'https://images.pexels.com/photos/257736/pexels-photo-257736.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    icon: Laptop,
    name: 'Office Equipment & Supplies',
    count: '280+',
    color: 'text-blue-600',
    bgColor: 'bg-blue-50',
    description: 'Office furniture, stationery, and equipment',
    image: 'https://images.pexels.com/photos/1957477/pexels-photo-1957477.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    icon: Microscope,
    name: 'Diagnostic Lab Equipment',
    count: '190+',
    color: 'text-purple-600',
    bgColor: 'bg-purple-50',
    description: 'Laboratory instruments and diagnostic tools',
    image: 'https://images.pexels.com/photos/2280549/pexels-photo-2280549.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    icon: FlaskConical,
    name: 'Research/Science Lab Equipment',
    count: '160+',
    color: 'text-green-600',
    bgColor: 'bg-green-50',
    description: 'Research instruments, chemicals, and lab supplies',
    image: 'https://images.pexels.com/photos/2280571/pexels-photo-2280571.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    icon: Factory,
    name: 'Industrial Chemicals',
    count: '140+',
    color: 'text-gray-600',
    bgColor: 'bg-gray-50',
    description: 'Industrial chemicals and manufacturing materials',
    image: 'https://images.pexels.com/photos/3735747/pexels-photo-3735747.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
];

export function ProductCategories() {
  return (
    <div className="mb-12">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Product Categories</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((category, index) => {
          const Icon = category.icon;
          return (
            <Card 
              key={index} 
              className="cursor-pointer hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group overflow-hidden"
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
    </div>
  );
}