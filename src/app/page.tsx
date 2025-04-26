'use client';

import Header from '@/components/Header';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import { ThemeToggle } from '@/components/ThemeToggle';

const sliderImages = [
  {
    src: '/images/services/computer-repair.jpg',
    alt: 'Computer Repair Services',
    title: 'Professional Computer Repair',
    subtitle: 'Expert hardware and software solutions'
  },
  {
    src: '/images/services/technical-support.jpg',
    alt: 'Technical Support',
    title: 'Technical Support & Maintenance',
    subtitle: 'Comprehensive IT support for your business'
  },
  {
    src: '/images/services/thin-client.jpg',
    alt: 'Thin Client Solutions',
    title: 'Thin Client Solutions',
    subtitle: 'Efficient and cost-effective computing'
  }
];

const services = [
  {
    title: 'Computer Repair',
    description: 'Expert repair services for all types of computer issues.',
    image: '/images/services/computer-repair.jpg',
  },
  {
    title: 'Toner Refill',
    description: 'Professional toner refill services for all printer brands.',
    image: '/images/services/toner-refill.jpg',
  },
  {
    title: 'Window Installation',
    description: 'Expert Windows OS installation and configuration services.',
    image: '/images/services/window-installation.jpg',
  },
];

const features = [
  {
    title: 'Expert Team',
    description: 'Highly skilled and certified technicians with years of experience.',
  },
  {
    title: 'Quick Service',
    description: 'Fast turnaround time without compromising on quality.',
  },
  {
    title: 'Affordable Pricing',
    description: 'Competitive prices with no hidden charges.',
  },
];

function ImageSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev === sliderImages.length - 1 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const goToPrevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? sliderImages.length - 1 : prev - 1));
  };

  const goToNextSlide = () => {
    setCurrentSlide((prev) => (prev === sliderImages.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="relative h-[500px] rounded-lg overflow-hidden card-base">
      {sliderImages.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
        >
          <Image
            src={slide.src}
            alt={slide.alt}
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 to-slate-900/30" />
          <div className="absolute bottom-0 left-0 right-0 p-8">
            <h2 className="text-3xl md:text-4xl font-bold mb-2 text-white">{slide.title}</h2>
            <p className="text-xl text-white/80">{slide.subtitle}</p>
          </div>
        </div>
      ))}

      <button
        onClick={goToPrevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/80 text-white p-2 rounded-full transition-all duration-300"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <button
        onClick={goToNextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/80 text-white p-2 rounded-full transition-all duration-300"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
        {sliderImages.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide ? 'bg-white' : 'bg-white/50 hover:bg-white/80'
            }`}
          />
        ))}
      </div>
    </div>
  );
}

function MobileImageSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev === sliderImages.length - 1 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative h-[200px] rounded-lg overflow-hidden">
      {sliderImages.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
        >
          <Image
            src={slide.src}
            alt={slide.alt}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-4">
            <h2 className="text-lg font-bold mb-1 text-white">{slide.title}</h2>
            <p className="text-sm text-white/80">{slide.subtitle}</p>
          </div>
        </div>
      ))}

      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex space-x-1.5">
        {sliderImages.map((_, index) => (
          <div
            key={index}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === currentSlide ? 'bg-white' : 'bg-white/50'
            }`}
          />
        ))}
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Header />
      <div className="pt-[100px] relative z-0">
        <div className="container-base">
          {/* Image Slider */}
          <section className="mb-16">
            <ImageSlider />
          </section>

          {/* Hero Section */}
          <section className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 heading-base">
              Welcome to Ekam Computer Point
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-base">
              Your One-Stop Solution for All Computer Needs
            </p>
            <Button asChild className="button-base px-8 py-3 text-lg">
              <Link href="/products">
                Explore Our Products
              </Link>
            </Button>
          </section>

          {/* Services Section */}
          <section className="mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center heading-base">
              Our Services
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service) => (
                <div key={service.title} className="card-base p-6 rounded-lg">
                  <div className="relative h-48 mb-4 rounded-lg overflow-hidden">
                    <Image
                      src={service.image}
                      alt={service.title}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 to-slate-900/30" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2 heading-base">{service.title}</h3>
                  <p className="text-base">{service.description}</p>
                </div>
              ))}
            </div>
          </section>

          {/* About Section */}
          <section className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 heading-base">
              Why Choose Us?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
              {features.map((feature) => (
                <div key={feature.title} className="card-base p-6 rounded-lg">
                  <h3 className="text-xl font-semibold mb-3 heading-base">{feature.title}</h3>
                  <p className="text-base">{feature.description}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Contact Section */}
          <section className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 heading-base">
              Get In Touch
            </h2>
            <p className="text-xl mb-8 text-base">
              Have questions? We're here to help!
            </p>
            <Button asChild className="button-base px-8 py-3 text-lg">
              <Link href="/contact">
                Contact Us
              </Link>
            </Button>
          </section>
        </div>
      </div>
    </main>
  );
} 