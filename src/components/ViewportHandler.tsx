'use client';

import { useEffect } from 'react';

export default function ViewportHandler() {
  useEffect(() => {
    // Set the --vh custom property to the viewport height
    const setVh = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    };

    // Initial call
    setVh();

    // Add event listener
    window.addEventListener('resize', setVh);

    // Cleanup
    return () => window.removeEventListener('resize', setVh);
  }, []);

  // This component doesn't render anything
  return null;
} 