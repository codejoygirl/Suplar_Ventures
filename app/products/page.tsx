import { ProductCategories } from '@/components/product-categories';
import { ProductGrid } from '@/components/product-grid';
import { SearchFilters } from '@/components/search-filters';

export default function ProductsPage() {
  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Browse Our Product Catalogue
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover thousands of products from verified suppliers worldwide through our comprehensive supply chain management platform. 
            From medical equipment to industrial chemicals - we have what you need.
          </p>
        </div>
        
        <SearchFilters />
        <ProductCategories />
        <ProductGrid />
      </div>
    </div>
  );
}