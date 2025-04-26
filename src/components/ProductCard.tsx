"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { type Product } from "@/data/products";
import { useState, useEffect } from "react";
import ProductModal from "./ProductModal";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIfMobile = () => setIsMobile(window.innerWidth < 768);
    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  return (
    <>
      <Card className="card-base overflow-hidden group hover:shadow-xl transition-all duration-300">
        <div className="relative h-48">
          <Image
            src={product.images[0] || '/images/placeholder.jpg'}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 to-transparent" />
        </div>
        <CardHeader>
          <CardTitle className="heading-base">{product.name}</CardTitle>
          <CardDescription className="text-base">{product.description}</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-lg font-bold heading-base">₹{parseInt(product.price).toLocaleString('en-IN')}</p>
        </CardContent>
        <CardFooter>
          <Button
            onClick={() => setIsModalOpen(true)}
            className="w-full button-base"
          >
            Enquire Now
          </Button>
        </CardFooter>
      </Card>

      <ProductModal
        product={product}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        isMobile={isMobile}
      />
    </>
  );
} 