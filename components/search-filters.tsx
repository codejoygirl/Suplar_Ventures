'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Filter, MapPin, DollarSign } from 'lucide-react';

const nigerianCities = [
  'Lagos',
  'Abuja',
  'Port Harcourt',
  'Kano',
  'Ibadan',
  'Kaduna',
  'Benin City',
  'Maiduguri',
  'Zaria',
  'Aba',
  'Jos',
  'Ilorin',
  'Oyo',
  'Enugu',
  'Abeokuta',
  'Other'
];

export function SearchFilters() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [priceRange, setPriceRange] = useState('');
  const [customLocation, setCustomLocation] = useState('');
  const [showCustomLocation, setShowCustomLocation] = useState(false);

  const handleLocationChange = (value: string) => {
    setSelectedLocation(value);
    if (value === 'Other') {
      setShowCustomLocation(true);
    } else {
      setShowCustomLocation(false);
      setCustomLocation('');
    }
  };

  const handleSearch = () => {
    const filters = {
      query: searchQuery,
      location: selectedLocation === 'Other' ? customLocation : selectedLocation,
      priceRange: priceRange
    };
    
    console.log('Search filters:', filters);
    alert(`Searching with filters:\n\nQuery: ${filters.query || 'All products'}\nLocation: ${filters.location || 'All locations'}\nPrice Range: ${filters.priceRange || 'All prices'}`);
  };

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
        
        <div className="space-y-2">
          <Select onValueChange={handleLocationChange}>
            <SelectTrigger className="h-12">
              <MapPin className="w-4 h-4 mr-2 text-gray-400" />
              <SelectValue placeholder="Supplier Location" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Locations</SelectItem>
              <SelectItem value="china">China</SelectItem>
              <SelectItem value="india">India</SelectItem>
              <SelectItem value="turkey">Turkey</SelectItem>
              <SelectItem value="vietnam">Vietnam</SelectItem>
              <SelectItem value="thailand">Thailand</SelectItem>
              <SelectItem value="germany">Germany</SelectItem>
              <SelectItem value="japan">Japan</SelectItem>
              <SelectItem value="netherlands">Netherlands</SelectItem>
            </SelectContent>
          </Select>
          
          {showCustomLocation && (
            <Input
              placeholder="Enter custom location"
              value={customLocation}
              onChange={(e) => setCustomLocation(e.target.value)}
              className="h-10"
            />
          )}
        </div>
        
        <Select onValueChange={setPriceRange}>
          <SelectTrigger className="h-12">
            <DollarSign className="w-4 h-4 mr-2 text-gray-400" />
            <SelectValue placeholder="Price Range" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="0-100">$0 - $100</SelectItem>
            <SelectItem value="100-500">$100 - $500</SelectItem>
            <SelectItem value="500-1000">$500 - $1,000</SelectItem>
            <SelectItem value="1000-5000">$1,000 - $5,000</SelectItem>
            <SelectItem value="5000+">$5,000+</SelectItem>
          </SelectContent>
        </Select>
        
        <Button 
          className="h-12 bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700"
          onClick={handleSearch}
        >
          <Filter className="w-4 h-4 mr-2" />
          Search
        </Button>
      </div>
      
      <div className="mt-4 pt-4 border-t border-gray-100">
        <h4 className="text-sm font-medium text-gray-700 mb-2">Popular Nigerian Cities for Delivery:</h4>
        <div className="flex flex-wrap gap-2">
          {nigerianCities.slice(0, 6).map((city) => (
            <Button
              key={city}
              variant="outline"
              size="sm"
              className="text-xs"
              onClick={() => {
                setSelectedLocation(city);
                setShowCustomLocation(city === 'Other');
              }}
            >
              {city}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
}