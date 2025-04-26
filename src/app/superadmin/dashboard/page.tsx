'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getProducts, getServices, getAllContacts, getSlideshow } from '@/lib/firebase-utils';

export default function Dashboard() {
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalServices: 0,
    totalContacts: 0,
    totalSlides: 0
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [products, services, contacts, slides] = await Promise.all([
          getProducts(),
          getServices(),
          getAllContacts(),
          getSlideshow()
        ]);

        setStats({
          totalProducts: products.length,
          totalServices: services.length,
          totalContacts: contacts.length,
          totalSlides: slides.length
        });
      } catch (error) {
        console.error('Error fetching stats:', error);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Products</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalProducts}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Services</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalServices}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Contact Submissions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalContacts}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Slideshow Images</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalSlides}</div>
          </CardContent>
        </Card>
      </div>

      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <a href="/superadmin/products" className="block p-6 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
            Manage Products
          </a>
          <a href="/superadmin/services" className="block p-6 bg-green-500 text-white rounded-lg hover:bg-green-600">
            Manage Services
          </a>
          <a href="/superadmin/contacts" className="block p-6 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600">
            View Contacts
          </a>
          <a href="/superadmin/slideshow" className="block p-6 bg-purple-500 text-white rounded-lg hover:bg-purple-600">
            Manage Slideshow
          </a>
        </div>
      </div>
    </div>
  );
} 