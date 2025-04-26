'use client';

import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
  DialogBody,
  DialogFooter,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Phone, Mail, MapPin, MessageSquare, Send } from "lucide-react"
import { useToast } from "@/components/ui/use-toast";

const contactInfo = [
  {
    icon: MapPin,
    title: "Visit Us",
    description: "123 Business Street, Tech Park, City - 12345",
    action: null
  },
  {
    icon: Phone,
    title: "Call Us",
    description: "+1 234 567 8900",
    action: "tel:+12345678900"
  },
  {
    icon: Mail,
    title: "Email Us",
    description: "info@techsolutions.com",
    action: "mailto:info@techsolutions.com"
  },
  {
    icon: (props: any) => (
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        viewBox="0 0 24 24" 
        fill="currentColor" 
        {...props}
      >
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
      </svg>
    ),
    title: "WhatsApp",
    description: "+1 234 567 8900",
    action: "https://wa.me/12345678900?text=Hello%2C%20I%20would%20like%20to%20inquire%20about%20your%20services",
    highlight: true
  }
];

// Local mock for contact form submission
const submitContactForm = async (formData: any) => {
  return new Promise((resolve) => setTimeout(resolve, 500));
};

export default function ContactPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  // Check if the device is mobile
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    // Initial check
    checkIfMobile();
    
    // Add event listener for window resize
    window.addEventListener('resize', checkIfMobile);
    
    // Cleanup
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      setIsSubmitting(true);
      
      // Submit form data to Firebase
      await submitContactForm(formData);
      
      // Show success message
      toast({
        title: "Message Sent!",
        description: "We'll get back to you as soon as possible.",
        variant: "success",
      });
      
      // Reset form and close modal
      setFormData({
        name: '',
        email: '',
        phone: '',
        message: '',
      });
      setIsModalOpen(false);
    } catch (error) {
      console.error('Error submitting form:', error);
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Header />
      <div className="pt-[100px] relative z-0 pb-20 overflow-y-auto">
        <div className="container-base">
          {/* Contact Header */}
          <section className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 heading-base">
              Get in Touch
            </h1>
            <p className="text-xl text-base max-w-2xl mx-auto">
              Have questions or need assistance? We're here to help! Choose your preferred way to reach us.
            </p>
          </section>

          {/* Contact Cards */}
          <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {contactInfo.map((info, index) => (
              <div 
                key={index} 
                className={`card-base p-6 rounded-lg text-center ${
                  info.highlight ? 'border-green-500 dark:border-green-600 shadow-lg' : ''
                }`}
              >
                <div className={`flex justify-center mb-4 ${
                  info.highlight ? 'text-green-600 dark:text-green-500' : 'text-base'
                }`}>
                  <info.icon className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-semibold mb-2 heading-base">{info.title}</h3>
                {info.action ? (
                  <a 
                    href={info.action} 
                    target={info.action.startsWith('http') ? '_blank' : undefined}
                    rel={info.action.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className={`text-base hover:text-foreground transition-colors duration-300 ${
                      info.highlight ? 'text-green-600 dark:text-green-500 font-medium' : ''
                    }`}
                  >
                    {info.description}
                  </a>
                ) : (
                  <p className="text-base">{info.description}</p>
                )}
                {info.highlight && (
                  <div className="mt-4">
                    <Button 
                      className="w-full bg-green-600 hover:bg-green-700 text-white border-none"
                      onClick={() => window.open(info.action, '_blank')}
                    >
                      Chat Now
                    </Button>
                  </div>
                )}
              </div>
            ))}
          </section>

          {/* Contact Form Button - Only visible on desktop */}
          {!isMobile && (
            <section className="text-center mb-16">
              <Button
                onClick={() => setIsModalOpen(true)}
                className="button-base px-8 py-3 text-lg"
              >
                Send us a Message
              </Button>
            </section>
          )}

          {/* Map or Additional Info */}
          <section className="card-base p-6 rounded-lg">
            <h2 className="text-2xl font-bold mb-4 heading-base">Business Hours</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-base">
              <div>
                <h3 className="font-semibold mb-2 heading-base">Weekdays</h3>
                <p>Monday - Friday: 9:00 AM - 7:00 PM</p>
              </div>
              <div>
                <h3 className="font-semibold mb-2 heading-base">Weekends</h3>
                <p>Saturday: 10:00 AM - 5:00 PM</p>
                <p>Sunday: Closed</p>
              </div>
            </div>
          </section>
        </div>
      </div>

      {/* Mobile floating action button */}
      {isMobile && (
        <div className="fixed bottom-20 right-6 z-40">
          <button 
            onClick={() => setIsModalOpen(true)}
            className="w-14 h-14 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-lg border border-input hover:bg-primary/90 transition-colors"
          >
            <Send className="w-6 h-6" />
          </button>
        </div>
      )}

      {/* Contact Form Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className={`${isMobile ? 'w-full rounded-t-lg rounded-b-none fixed bottom-0 top-auto translate-y-0 mobile-modal' : ''}`}>
          <div className={`${isMobile ? 'w-12 h-1.5 bg-muted rounded-full mx-auto mt-2 mb-1' : 'hidden'}`} />
          <DialogHeader>
            <DialogTitle>Send us a Message</DialogTitle>
            <DialogDescription>
              Fill out the form below and we'll get back to you as soon as possible.
            </DialogDescription>
          </DialogHeader>
          
          <DialogBody>
            <form id="contact-form" onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-base mb-1">
                  Name
                </label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="input-base"
                  placeholder="Enter your name"
                  required
                  disabled={isSubmitting}
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-base mb-1">
                  Email
                </label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="input-base"
                  placeholder="Enter your email"
                  required
                  disabled={isSubmitting}
                />
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-base mb-1">
                  Phone
                </label>
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="input-base"
                  placeholder="Enter your phone number"
                  required
                  disabled={isSubmitting}
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-base mb-1">
                  Message
                </label>
                <Textarea
                  id="message"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="input-base min-h-[100px]"
                  placeholder="Type your message here"
                  required
                  disabled={isSubmitting}
                />
              </div>
            </form>
          </DialogBody>
          
          <DialogFooter>
            <Button 
              type="submit" 
              form="contact-form" 
              className="button-base w-full sm:w-auto"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Sending...</span>
                </div>
              ) : (
                'Send Message'
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </main>
  );
} 