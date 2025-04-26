'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import ProductModal from '@/components/ProductModal';
import { Badge } from '@/components/ui/badge';
import { products, type Product } from '@/data/products';
import { services, type Service } from '@/data/services';

type SearchItem = (Product | Service) & { type: 'product' | 'service' };

export default function SearchPage() {
  const [query, setQuery] = useState('');
  const [selectedItem, setSelectedItem] = useState<SearchItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const searchProducts = (query: string) => {
    return products.filter(product => {
      const searchString = query.toLowerCase();
      return (
        product.name.toLowerCase().includes(searchString) ||
        product.description.toLowerCase().includes(searchString) ||
        product.features.some(feature => 
          feature.toLowerCase().includes(searchString)
        )
      );
    });
  };

  const searchServices = (query: string) => {
    return services.filter(service => {
      const searchString = query.toLowerCase();
      return (
        service.name.toLowerCase().includes(searchString) ||
        service.description.toLowerCase().includes(searchString) ||
        service.features.some(feature => 
          feature.toLowerCase().includes(searchString)
        )
      );
    });
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Search functionality will be implemented here
  };

  const handleItemClick = (item: Product | Service, type: 'product' | 'service') => {
    setSelectedItem({ ...item, type });
    setIsModalOpen(true);
  };

  const filteredProducts = searchProducts(query.toLowerCase());
  const filteredServices = searchServices(query.toLowerCase());

  return (
    <div className="container mx-auto py-8">
      <form onSubmit={handleSearch} className="mb-8">
        <div className="flex gap-4">
          <Input
            type="text"
            placeholder="Search products and services..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1"
          />
          <Button type="submit">Search</Button>
        </div>
      </form>

      {query && (
        <div className="space-y-8">
          {/* Products */}
          {filteredProducts.length > 0 && (
            <div>
              <h2 className="text-2xl font-bold mb-4">Products</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <div
                    key={product.id}
                    className="p-4 border rounded-lg cursor-pointer hover:shadow-lg transition-shadow"
                    onClick={() => handleItemClick(product, 'product')}
                  >
                    <h3 className="text-lg font-semibold">{product.name}</h3>
                    <p className="text-gray-600 mt-2">{product.description}</p>
                    <div className="mt-4">
                      <Badge>₹{parseInt(product.price).toLocaleString('en-IN')}</Badge>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Services */}
          {filteredServices.length > 0 && (
            <div>
              <h2 className="text-2xl font-bold mb-4">Services</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredServices.map((service) => (
                  <div
                    key={service.id}
                    className="p-4 border rounded-lg cursor-pointer hover:shadow-lg transition-shadow"
                    onClick={() => handleItemClick(service, 'service')}
                  >
                    <h3 className="text-lg font-semibold">{service.name}</h3>
                    <p className="text-gray-600 mt-2">{service.description}</p>
                    <div className="mt-4">
                      <Badge>₹{parseInt(service.price).toLocaleString('en-IN')}</Badge>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {filteredProducts.length === 0 && filteredServices.length === 0 && (
            <p className="text-center text-gray-600">No results found for "{query}"</p>
          )}
        </div>
      )}

      {selectedItem && (
        <ProductModal
          product={selectedItem as Product}
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setSelectedItem(null);
          }}
        />
      )}
    </div>
  );
} 