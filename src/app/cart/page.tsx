'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import Image from 'next/image';
import { Trash2 } from 'lucide-react';

// Sample cart data
const cartItems = [
  {
    id: 1,
    name: 'Gaming Laptop',
    price: '₹89,999',
    quantity: 1,
    image: '/images/services/laptop-repair.jpg',
  },
  {
    id: 2,
    name: 'All-in-One Printer',
    price: '₹24,999',
    quantity: 1,
    image: '/images/services/printer-repair.jpg',
  }
];

export default function CartPage() {
  const [items, setItems] = useState(cartItems);
  
  const removeItem = (id: number) => {
    setItems(items.filter(item => item.id !== id));
  };
  
  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity < 1) return;
    setItems(items.map(item => 
      item.id === id ? { ...item, quantity: newQuantity } : item
    ));
  };
  
  // Calculate subtotal
  const subtotal = items.reduce((total, item) => {
    const price = parseFloat(item.price.replace('₹', '').replace(',', ''));
    return total + (price * item.quantity);
  }, 0);
  
  // Calculate tax (18% GST)
  const tax = subtotal * 0.18;
  
  // Calculate total
  const total = subtotal + tax;
  
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Header />
      <div className="pt-[100px] relative z-0">
        <div className="container-base">
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-8 heading-base">
            Your Cart
          </h1>
          
          {items.length === 0 ? (
            <div className="text-center py-12">
              <h2 className="text-2xl font-semibold mb-4">Your cart is empty</h2>
              <p className="mb-8">Looks like you haven't added any products to your cart yet.</p>
              <Button className="button-base">Continue Shopping</Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <Card className="card-base mb-6">
                  <CardHeader>
                    <CardTitle className="heading-base">Cart Items</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {items.map((item) => (
                      <div key={item.id} className="flex flex-col sm:flex-row items-start sm:items-center gap-4 py-4">
                        <div className="relative w-24 h-24 rounded-md overflow-hidden">
                          <Image
                            src={item.image}
                            alt={item.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold heading-base">{item.name}</h3>
                          <p className="text-lg font-bold heading-base">{item.price}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          >
                            -
                          </Button>
                          <span className="w-8 text-center">{item.quantity}</span>
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          >
                            +
                          </Button>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-destructive"
                          onClick={() => removeItem(item.id)}
                        >
                          <Trash2 className="h-5 w-5" />
                        </Button>
                        {items.indexOf(item) < items.length - 1 && (
                          <Separator className="mt-4 sm:hidden" />
                        )}
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>
              
              <div>
                <Card className="card-base">
                  <CardHeader>
                    <CardTitle className="heading-base">Order Summary</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between">
                        <span>Subtotal</span>
                        <span>₹{subtotal.toLocaleString('en-IN')}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Tax (18% GST)</span>
                        <span>₹{tax.toLocaleString('en-IN', { maximumFractionDigits: 2 })}</span>
                      </div>
                      <Separator />
                      <div className="flex justify-between font-bold">
                        <span>Total</span>
                        <span>₹{total.toLocaleString('en-IN', { maximumFractionDigits: 2 })}</span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex flex-col gap-4">
                    <div className="space-y-2 w-full">
                      <Label htmlFor="coupon">Coupon Code</Label>
                      <div className="flex gap-2">
                        <Input id="coupon" placeholder="Enter coupon code" />
                        <Button variant="outline">Apply</Button>
                      </div>
                    </div>
                    <Button className="w-full button-base">Proceed to Checkout</Button>
                  </CardFooter>
                </Card>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
} 