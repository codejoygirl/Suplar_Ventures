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
    description: 'Medical devices, consumables, and healthcare equipment'
  },
  {
    icon: Zap,
    name: 'Electrical Materials & Accessories',
    count: '320+',
    color: 'text-yellow-600',
    bgColor: 'bg-yellow-50',
    description: 'Electrical components, cables, and accessories'
  },
  {
    icon: Laptop,
    name: 'Office Equipment & Supplies',
    count: '280+',
    color: 'text-blue-600',
    bgColor: 'bg-blue-50',
    description: 'Office furniture, stationery, and equipment'
  },
  {
    icon: Microscope,
    name: 'Diagnostic Lab Equipment',
    count: '190+',
    color: 'text-purple-600',
    bgColor: 'bg-purple-50',
    description: 'Laboratory instruments and diagnostic tools'
  },
  {
    icon: FlaskConical,
    name: 'Research/Science Lab Equipment',
    count: '160+',
    color: 'text-green-600',
    bgColor: 'bg-green-50',
    description: 'Research instruments, chemicals, and lab supplies'
  },
  {
    icon: Factory,
    name: 'Industrial Chemicals',
    count: '140+',
    color: 'text-gray-600',
    bgColor: 'bg-gray-50',
    description: 'Industrial chemicals and manufacturing materials'
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
              className="cursor-pointer hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group"
            >
              <CardContent className="p-6">
                <div className={`w-12 h-12 ${category.bgColor} rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className={`w-6 h-6 ${category.color}`} />
                </div>
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