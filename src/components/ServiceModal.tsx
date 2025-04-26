'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogBody,
  DialogFooter,
} from "@/components/ui/dialog";
import { type Service } from "@/data/services";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

interface ServiceModalProps {
  service: Service;
  isOpen: boolean;
  onClose: () => void;
  isMobile: boolean;
}

export default function ServiceModal({ service, isOpen, onClose, isMobile }: ServiceModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className={
        isMobile
          ? "w-full rounded-t-lg rounded-b-none fixed bottom-0 top-auto translate-y-0 mobile-modal max-h-[90vh] overflow-y-auto p-0"
          : ""
      }>
        <div className={isMobile ? "w-12 h-1.5 bg-muted rounded-full mx-auto mt-2 mb-1" : "hidden"} />
        <DialogHeader>
          <DialogTitle>{service.name}</DialogTitle>
          <DialogDescription>
            Service details and contact information.
          </DialogDescription>
        </DialogHeader>
        <DialogBody>
          <div className="flex flex-col gap-6">
            <div className="relative aspect-square overflow-hidden rounded-lg">
              <Carousel>
                <CarouselContent>
                  {service.images.map((image, index) => (
                    <CarouselItem key={index}>
                      <div className="relative aspect-square">
                        <Image
                          src={image}
                          alt={`${service.name} - Image ${index + 1}`}
                          fill
                          className="object-cover"
                        />
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="absolute left-2 top-1/2 -translate-y-1/2" />
                <CarouselNext className="absolute right-2 top-1/2 -translate-y-1/2" />
              </Carousel>
            </div>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold mb-2">Description</h3>
                <p className="text-gray-600">{service.description}</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">Features</h3>
                <ul className="list-disc list-inside space-y-1 text-gray-600">
                  {service.features.map((feature, index) => (
                    <li key={index}>{feature}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">Price</h3>
                <p className="text-2xl font-bold">₹{parseInt(service.price).toLocaleString('en-IN')}</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">Contact Information</h3>
                <div className="space-y-1 text-gray-600">
                  <p>Phone: {service.contactInfo.phone}</p>
                  <p>Email: {service.contactInfo.email}</p>
                  <p>Address: {service.contactInfo.address}</p>
                </div>
              </div>
            </div>
          </div>
        </DialogBody>
        <DialogFooter>
          <Button
            className="button-base w-full sm:w-auto"
            onClick={onClose}
            type="button"
          >
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
} 