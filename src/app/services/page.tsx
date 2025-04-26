'use client';

import Header from '@/components/Header';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { useState, useEffect } from "react";
import ServiceModal from "@/components/ServiceModal";
import type { Service } from "@/data/services";

const services = [
  {
    title: 'Computer Repair',
    description: 'Expert repair services for all types of computer issues, including hardware replacement, software troubleshooting, and system optimization.',
    image: '/images/services/computer-repair.jpg',
    features: [
      'Hardware Diagnostics & Repair',
      'Software Installation & Updates',
      'Virus Removal & Protection',
      'Data Recovery Services',
      'System Performance Optimization',
      'Component Upgrades'
    ],
    price: 'Starting from ₹499'
  },
  {
    title: 'Laptop Repair',
    description: 'Professional laptop repair services with quick turnaround time and quality assurance for all major brands.',
    image: '/images/services/laptop-repair.jpg',
    features: [
      'Screen Replacement',
      'Keyboard Repair',
      'Battery Replacement',
      'Motherboard Repair',
      'Cooling System Service',
      'Hardware Upgrades'
    ],
    price: 'Starting from ₹699'
  },
  {
    title: 'Printer Repair',
    description: 'Comprehensive printer repair and maintenance services for all types of printers and related hardware.',
    image: '/images/services/printer-repair.jpg',
    features: [
      'Printer Diagnostics',
      'Parts Replacement',
      'Print Quality Optimization',
      'Network Setup',
      'Regular Maintenance',
      'Toner Services'
    ],
    price: 'Starting from ₹399'
  }
];

export default function ServicesPage() {
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIfMobile = () => setIsMobile(window.innerWidth < 768);
    checkIfMobile();
    window.addEventListener("resize", checkIfMobile);
    return () => window.removeEventListener("resize", checkIfMobile);
  }, []);

  return (
    <main className="min-h-screen bg-background text-foreground">
      <Header />
      <div className="pt-[100px] relative z-0">
        <div className="container-base">
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-8 heading-base">
            Our Services
          </h1>
          <p className="text-xl text-center mb-12 text-base">
            Professional Computer Services at Competitive Prices
          </p>

          <div className="space-y-12">
            {services.map((service, index) => (
              <div key={service.title} className="card-base p-6 rounded-lg">
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="relative h-[300px] rounded-lg overflow-hidden">
                    <Image
                      src={service.image}
                      alt={service.title}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 to-slate-900/30" />
                  </div>
                  <div className="space-y-4">
                    <h2 className="text-2xl font-bold heading-base">{service.title}</h2>
                    <p className="text-base">{service.description}</p>
                    <div>
                      <h3 className="text-xl font-semibold mb-2 heading-base">Key Features:</h3>
                      <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {service.features.map((feature, idx) => (
                          <li key={idx} className="flex items-center text-base">
                            <svg className="w-5 h-5 mr-2 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <p className="text-xl font-bold heading-base">{service.price}</p>
                    <Button
                      className="button-base"
                      onClick={() => {
                        setSelectedService({
                          id: `local-${service.title.replace(/\s+/g, '-').toLowerCase()}`,
                          name: service.title,
                          description: service.description,
                          price: service.price,
                          images: [service.image],
                          features: service.features,
                          contactInfo: {
                            phone: "",
                            email: "",
                            address: ""
                          }
                        });
                        setIsModalOpen(true);
                      }}
                    >
                      View Details
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {selectedService && (
        <ServiceModal
          service={selectedService}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          isMobile={isMobile}
        />
      )}
    </main>
  );
} 