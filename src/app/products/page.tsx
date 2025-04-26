"use client";

import { useState } from 'react';
import { products, type Product } from '@/data/products';
import ProductCard from '@/components/ProductCard';
import Header from '@/components/Header';

export default function ProductsPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24 pb-8">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-8">Our Products</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
} 