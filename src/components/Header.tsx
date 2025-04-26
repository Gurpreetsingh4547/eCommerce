'use client';

import Link from 'next/link';
import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { Search } from 'lucide-react';
import { ThemeToggle } from '@/components/ThemeToggle';
import ProductModal from '@/components/ProductModal';
import ServiceModal from '@/components/ServiceModal';
import { Badge } from '@/components/ui/badge';
import { products } from '@/data/products';
import { services } from '@/data/services';
import { Product } from '@/data/products';
import { Service } from '@/data/services';

interface SearchResult {
  id: string;
  name: string;
  description: string;
  price: string;
  images: string[];
  type: 'product' | 'service';
  features: string[];
  contactInfo: {
    phone: string;
    email: string;
    address: string;
  };
}

export default function Header() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [selectedItem, setSelectedItem] = useState<SearchResult | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setLoading(true);
      try {
        // Search in products
        const productResults = products
          .filter(product => 
            product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            product.description.toLowerCase().includes(searchQuery.toLowerCase())
          )
          .map(product => ({
            ...product,
            type: 'product' as const
          }));

        // Search in services
        const serviceResults = services
          .filter(service => 
            service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            service.description.toLowerCase().includes(searchQuery.toLowerCase())
          )
          .map(service => ({
            ...service,
            type: 'service' as const
          }));

        // Combine and limit results
        const results = [...productResults, ...serviceResults].slice(0, 10);
        setSearchResults(results);
        setShowResults(true);
      } catch (error) {
        console.error('Error searching:', error);
        setSearchResults([]);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleItemClick = (item: SearchResult) => {
    setSelectedItem(item);
    setIsModalOpen(true);
    setShowResults(false);
    setSearchQuery('');
  };

  // Close results when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowResults(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
  };

  useEffect(() => {
    const checkIfMobile = () => setIsMobile(window.innerWidth < 768);
    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-white border-b border-border/40 shadow-sm dark:bg-[#0A192F] dark:border-slate-800 dark:shadow-md">
      <div className="container mx-auto px-6 dark:px-4">
        <div className="flex flex-col md:flex-row items-center justify-between py-4">
          <div className="flex items-center justify-between w-full md:w-auto mb-4 md:mb-0">
            <Link href="/" className="text-2xl font-bold text-foreground hover:opacity-90 transition-opacity duration-200 dark:text-slate-100">
              Ekam Computer Point
            </Link>
            <div className="flex items-center gap-2 md:hidden">
              <button
                onClick={toggleSearch}
                className="icon-button"
                aria-label="Search"
              >
                <Search className="w-5 h-5" />
              </button>
            </div>
          </div>
          
          {/* Mobile search bar */}
          {isSearchOpen && (
            <div ref={searchRef} className="w-full mb-4 md:hidden relative">
              <form onSubmit={handleSearch}>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search products and services..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="search-input"
                    autoFocus
                  />
                  <button
                    type="submit"
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 icon-button"
                    disabled={loading}
                  >
                    {loading ? (
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-primary"></div>
                    ) : (
                      <Search className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </form>
              
              {/* Mobile Search Results Dropdown */}
              {showResults && searchQuery && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-background border border-border/10 rounded-lg shadow-lg overflow-hidden z-50 max-h-[60vh] overflow-y-auto">
                  {searchResults.length === 0 ? (
                    <div className="p-4 text-sm text-muted-foreground text-center">
                      No results found
                    </div>
                  ) : (
                    <div>
                      {searchResults.map((item) => (
                        <div
                          key={`${item.type}-${item.id}`}
                          onClick={() => handleItemClick(item)}
                          className="flex items-center gap-3 p-3 hover:bg-muted/50 cursor-pointer"
                        >
                          <div className="relative w-12 h-12 rounded-md overflow-hidden bg-muted">
                            <Image
                              src={item.images[0] || '/images/placeholder.jpg'}
                              alt={item.name}
                              fill
                              className="object-cover"
                              sizes="48px"
                              quality={80}
                              onError={(e) => {
                                const img = e.target as HTMLImageElement;
                                img.src = '/images/placeholder.jpg';
                              }}
                            />
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <p className="font-medium text-sm">{item.name}</p>
                              <Badge variant="secondary" className="text-xs">
                                {item.type === 'product' ? 'Product' : 'Service'}
                              </Badge>
                            </div>
                            <p className="text-xs text-muted-foreground line-clamp-1">
                              {item.description}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
          
          {/* Desktop search and theme toggle */}
          <div className="hidden md:flex items-center gap-4">
            <div ref={searchRef} className="relative">
              <form onSubmit={handleSearch}>
                <input
                  type="text"
                  placeholder="Search products and services..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="search-input pr-12"
                />
                <button
                  type="submit"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 icon-button"
                  aria-label="Search"
                  disabled={loading}
                >
                  {loading ? (
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-primary"></div>
                  ) : (
                    <Search className="w-5 h-5" />
                  )}
                </button>
              </form>

              {/* Desktop Search Results Dropdown */}
              {showResults && searchQuery && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-background border border-border/10 rounded-lg shadow-lg overflow-hidden z-50 max-h-[60vh] overflow-y-auto min-w-[400px]">
                  {searchResults.length === 0 ? (
                    <div className="p-4 text-sm text-muted-foreground text-center">
                      No results found
                    </div>
                  ) : (
                    <div>
                      {searchResults.map((item) => (
                        <div
                          key={`${item.type}-${item.id}`}
                          onClick={() => handleItemClick(item)}
                          className="flex items-center gap-3 p-3 hover:bg-muted/50 cursor-pointer"
                        >
                          <div className="relative w-12 h-12 rounded-md overflow-hidden bg-muted">
                            <Image
                              src={item.images[0] || '/images/placeholder.jpg'}
                              alt={item.name}
                              fill
                              className="object-cover"
                              sizes="48px"
                              quality={80}
                              onError={(e) => {
                                const img = e.target as HTMLImageElement;
                                img.src = '/images/placeholder.jpg';
                              }}
                            />
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <p className="font-medium text-sm">{item.name}</p>
                              <Badge variant="secondary" className="text-xs">
                                {item.type === 'product' ? 'Product' : 'Service'}
                              </Badge>
                            </div>
                            <p className="text-xs text-muted-foreground line-clamp-1">
                              {item.description}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex flex-row items-center gap-4 w-auto dark:bg-[#0A192F]">
            <Link href="/" className="nav-link">
              Home
            </Link>
            <Link href="/services" className="nav-link">
              Services
            </Link>
            <Link href="/products" className="nav-link">
              Products
            </Link>
            <Link href="/contact" className="nav-link">
              Contact
            </Link>
            {/* Theme Toggle - Show on both mobile and desktop */}
            <div className="w-auto flex justify-center py-0">
              <ThemeToggle />
            </div>
          </nav>
        </div>
      </div>

      {/* Modals */}
      {selectedItem && (
        <>
          {selectedItem.type === 'product' ? (
            <ProductModal
              isOpen={isModalOpen}
              onClose={() => {
                setIsModalOpen(false);
                setSelectedItem(null);
              }}
              product={selectedItem as Product}
              isMobile={isMobile}
            />
          ) : (
            <ServiceModal
              isOpen={isModalOpen}
              onClose={() => {
                setIsModalOpen(false);
                setSelectedItem(null);
              }}
              service={selectedItem as Service}
              isMobile={isMobile}
            />
          )}
        </>
      )}
    </header>
  );
} 