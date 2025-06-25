'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Filter, MapPin, DollarSign } from 'lucide-react';

export function SearchFilters() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="bg-white rounded-lg shadow-sm border p-6 mb-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <div className="lg:col-span-2 relative">
          <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
          <Input
            placeholder="Search products, suppliers, or categories..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 h-12"
          />
        </div>
        
        <Select>
          <SelectTrigger className="h-12">
            <MapPin className="w-4 h-4 mr-2 text-gray-400" />
            <SelectValue placeholder="Supplier Location" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="china">China</SelectItem>
            <SelectItem value="india">India</SelectItem>
            <SelectItem value="turkey">Turkey</SelectItem>
            <SelectItem value="vietnam">Vietnam</SelectItem>
            <SelectItem value="thailand">Thailand</SelectItem>
          </SelectContent>
        </Select>
        
        <Select>
          <SelectTrigger className="h-12">
            <DollarSign className="w-4 h-4 mr-2 text-gray-400" />
            <SelectValue placeholder="Price Range" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="0-100">$0 - $100</SelectItem>
            <SelectItem value="100-500">$100 - $500</SelectItem>
            <SelectItem value="500-1000">$500 - $1,000</SelectItem>
            <SelectItem value="1000+">$1,000+</SelectItem>
          </SelectContent>
        </Select>
        
        <Button className="h-12 bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700">
          <Filter className="w-4 h-4 mr-2" />
          Search
        </Button>
      </div>
    </div>
  );
}