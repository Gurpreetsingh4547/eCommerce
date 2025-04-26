'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { ThemeToggle } from '@/components/ThemeToggle';
import { Home, Package, Settings, Users, Image, LogOut } from 'lucide-react';

export default function SuperAdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();
  const { toast } = useToast();

  const navItems = [
    {
      name: 'Dashboard',
      href: '/superadmin/dashboard',
      icon: Home
    },
    {
      name: 'Products',
      href: '/superadmin/products',
      icon: Package
    },
    {
      name: 'Services',
      href: '/superadmin/services',
      icon: Settings
    },
    {
      name: 'Contacts',
      href: '/superadmin/contacts',
      icon: Users
    },
    {
      name: 'Slideshow',
      href: '/superadmin/slideshow',
      icon: Image
    }
  ];

  useEffect(() => {
    const checkAuth = () => {
      const isAuth = sessionStorage.getItem('isAdminAuthenticated') === 'true';
      setIsAuthenticated(isAuth);
      setIsLoading(false);

      if (!isAuth && pathname !== '/superadmin/login') {
        router.push('/superadmin/login');
      }
    };

    checkAuth();
  }, [pathname, router]);

  const handleLogout = () => {
    sessionStorage.removeItem('isAdminAuthenticated');
    setIsAuthenticated(false);
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out",
      variant: "success",
    });
    router.push('/superadmin/login');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!isAuthenticated && pathname !== '/superadmin/login') {
    return null;
  }

  if (pathname === '/superadmin/login') {
    return children;
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-40 bg-white border-b border-border/40 shadow-sm dark:bg-[#0A192F] dark:border-slate-800">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-bold text-foreground dark:text-white">
                Ekam Admin
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <ThemeToggle />
              <Button
                onClick={handleLogout}
                variant="destructive"
                size="sm"
                className="flex items-center gap-2"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Sidebar */}
      <div className="fixed left-0 top-16 h-[calc(100vh-4rem)] w-64 bg-white border-r border-border/40 dark:bg-[#0A192F] dark:border-slate-800 hidden md:block">
        <nav className="p-4">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg mb-2 transition-colors ${
                  isActive 
                    ? 'bg-primary/10 text-primary dark:bg-slate-800 dark:text-white' 
                    : 'text-muted-foreground hover:bg-muted dark:hover:bg-slate-800 dark:text-slate-400 dark:hover:text-white'
                }`}
              >
                <item.icon className="w-5 h-5" />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Mobile Navigation */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-border/40 dark:bg-[#0A192F] dark:border-slate-800">
        <nav className="flex justify-around py-2">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex flex-col items-center p-2 ${
                  isActive 
                    ? 'text-primary dark:text-white' 
                    : 'text-muted-foreground dark:text-slate-400'
                }`}
              >
                <item.icon className="w-5 h-5" />
                <span className="text-xs mt-1">{item.name}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Main Content */}
      <main className="md:ml-64 pt-16 min-h-screen">
        <div className="container-base">
          {children}
        </div>
      </main>
    </div>
  );
} 