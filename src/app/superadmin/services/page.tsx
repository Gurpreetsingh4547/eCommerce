'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { getServices, addService, updateService, deleteService } from '@/lib/firebase-utils';

interface Service {
  id: string;
  name: string;
  description: string;
  price: string;
  features: string[];
  images: string[];
  contactInfo: {
    phone: string;
    email: string;
    address: string;
  };
}

export default function ServicesManagement() {
  const [services, setServices] = useState<Service[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingService, setEditingService] = useState<Service | null>(null);
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    features: [''],
    images: [''],
    contactInfo: {
      phone: '',
      email: '',
      address: ''
    }
  });

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const data = await getServices();
      setServices(data);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch services",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const serviceData = {
        ...formData,
        features: formData.features.filter(feature => feature.trim() !== ''),
        images: formData.images.filter(img => img.trim() !== '')
      };

      if (editingService) {
        await updateService(editingService.id, serviceData);
        toast({
          title: "Success",
          description: "Service updated successfully",
          variant: "success",
        });
      } else {
        await addService(serviceData);
        toast({
          title: "Success",
          description: "Service added successfully",
          variant: "success",
        });
      }

      setIsModalOpen(false);
      setEditingService(null);
      resetForm();
      fetchServices();
    } catch (error) {
      toast({
        title: "Error",
        description: editingService ? "Failed to update service" : "Failed to add service",
        variant: "destructive",
      });
    }
  };

  const handleEdit = (service: Service) => {
    setEditingService(service);
    setFormData({
      name: service.name,
      description: service.description,
      price: service.price,
      features: service.features,
      images: service.images,
      contactInfo: service.contactInfo
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (serviceId: string) => {
    if (window.confirm('Are you sure you want to delete this service?')) {
      try {
        await deleteService(serviceId);
        toast({
          title: "Success",
          description: "Service deleted successfully",
          variant: "success",
        });
        fetchServices();
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to delete service",
          variant: "destructive",
        });
      }
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      price: '',
      features: [''],
      images: [''],
      contactInfo: {
        phone: '',
        email: '',
        address: ''
      }
    });
  };

  const addField = (field: 'images' | 'features') => {
    setFormData(prev => ({
      ...prev,
      [field]: [...prev[field], '']
    }));
  };

  const removeField = (field: 'images' | 'features', index: number) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index)
    }));
  };

  const updateField = (field: 'images' | 'features', index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].map((item, i) => i === index ? value : item)
    }));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Services Management</h1>
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => {
              setEditingService(null);
              resetForm();
            }}>
              Add New Service
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingService ? 'Edit Service' : 'Add New Service'}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Input
                  placeholder="Service Name"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  required
                />
              </div>
              <div>
                <Textarea
                  placeholder="Description"
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  required
                />
              </div>
              <div>
                <Input
                  placeholder="Price"
                  value={formData.price}
                  onChange={(e) => setFormData(prev => ({ ...prev, price: e.target.value }))}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <label className="font-medium">Images</label>
                {formData.images.map((url, index) => (
                  <div key={index} className="flex gap-2">
                    <Input
                      placeholder="Image URL"
                      value={url}
                      onChange={(e) => updateField('images', index, e.target.value)}
                    />
                    <Button
                      type="button"
                      variant="destructive"
                      onClick={() => removeField('images', index)}
                    >
                      Remove
                    </Button>
                  </div>
                ))}
                <Button type="button" onClick={() => addField('images')}>
                  Add Image URL
                </Button>
              </div>

              <div className="space-y-2">
                <label className="font-medium">Features</label>
                {formData.features.map((feature, index) => (
                  <div key={index} className="flex gap-2">
                    <Input
                      placeholder="Feature"
                      value={feature}
                      onChange={(e) => updateField('features', index, e.target.value)}
                    />
                    <Button
                      type="button"
                      variant="destructive"
                      onClick={() => removeField('features', index)}
                    >
                      Remove
                    </Button>
                  </div>
                ))}
                <Button type="button" onClick={() => addField('features')}>
                  Add Feature
                </Button>
              </div>

              <div className="space-y-2">
                <label className="font-medium">Contact Information</label>
                <Input
                  placeholder="Phone"
                  value={formData.contactInfo.phone}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    contactInfo: { ...prev.contactInfo, phone: e.target.value }
                  }))}
                  required
                />
                <Input
                  placeholder="Email"
                  type="email"
                  value={formData.contactInfo.email}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    contactInfo: { ...prev.contactInfo, email: e.target.value }
                  }))}
                  required
                />
                <Input
                  placeholder="Address"
                  value={formData.contactInfo.address}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    contactInfo: { ...prev.contactInfo, address: e.target.value }
                  }))}
                  required
                />
              </div>

              <Button type="submit">
                {editingService ? 'Update Service' : 'Add Service'}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <div key={service.id} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold mb-2">{service.name}</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-2">{service.description}</p>
              <p className="text-lg font-bold mb-4">{service.price}</p>
              
              <div className="flex space-x-2">
                <Button onClick={() => handleEdit(service)}>
                  Edit
                </Button>
                <Button
                  variant="destructive"
                  onClick={() => handleDelete(service.id)}
                >
                  Delete
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
} 