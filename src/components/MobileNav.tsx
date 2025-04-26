'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { Home, ShoppingBag, Search, ShoppingCart, User } from 'lucide-react';

export default function MobileNav() {
  const pathname = usePathname();

  const navItems = [
    {
      name: 'Home',
      href: '/',
      icon: Home
    },
    {
      name: 'Services',
      href: '/services',
      icon: ShoppingBag
    },
    {
      name: 'Products',
      href: '/products',
      icon: ShoppingCart
    },
    {
      name: 'Contact',
      href: '/contact',
      icon: User
    }
  ];

  return (
    <div className="md:hidden">
      <nav className="app-bottom-nav">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link 
              key={item.name} 
              href={item.href}
              className={`app-nav-item ${isActive ? 'active' : ''}`}
            >
              <item.icon />
              <span>{item.name}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
} 