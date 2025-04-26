'use client';

import { useState, useEffect } from 'react';
import { getProducts, addProduct, updateProduct, deleteProduct } from '@/lib/firebase-utils';
import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Plus, Pencil, Trash2, Upload, X } from 'lucide-react';

interface Product {
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

export default function ProductsManagement() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    features: [''],
    images: [] as string[],
    contactInfo: {
      phone: '',
      email: '',
      address: ''
    }
  });

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const data = await getProducts();
      setProducts(data);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch products",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const newImages = Array.from(files).filter(file => {
      // Check file size (2MB limit)
      if (file.size > 2 * 1024 * 1024) {
        toast({
          title: "Error",
          description: `Image ${file.name} is larger than 2MB`,
          variant: "destructive",
        });
        return false;
      }
      return true;
    });

    // Convert valid images to base64
    newImages.forEach(file => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({
          ...prev,
          images: [...prev.images, reader.result as string]
        }));
      };
      reader.readAsDataURL(file);
    });
  };

  const removeImage = (index: number) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

  const addFeature = () => {
    setFormData(prev => ({
      ...prev,
      features: [...prev.features, '']
    }));
  };

  const removeFeature = (index: number) => {
    setFormData(prev => ({
      ...prev,
      features: prev.features.filter((_, i) => i !== index)
    }));
  };

  const updateFeature = (index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      features: prev.features.map((feature, i) => i === index ? value : feature)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      if (editingProduct) {
        await updateProduct(editingProduct.id, formData);
        toast({
          title: "Success",
          description: "Product updated successfully",
          variant: "success",
        });
      } else {
        await addProduct(formData);
        toast({
          title: "Success",
          description: "Product added successfully",
          variant: "success",
        });
      }
      fetchProducts();
      setIsModalOpen(false);
      resetForm();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save product",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      description: product.description,
      price: product.price,
      features: product.features,
      images: product.images,
      contactInfo: product.contactInfo
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this product?')) {
      try {
        await deleteProduct(id);
        toast({
          title: "Success",
          description: "Product deleted successfully",
          variant: "success",
        });
        fetchProducts();
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to delete product",
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
      images: [],
      contactInfo: {
        phone: '',
        email: '',
        address: ''
      }
    });
    setEditingProduct(null);
  };

  const openModal = () => {
    resetForm();
    setIsModalOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold heading-base">Products Management</h1>
        <Button onClick={openModal} className="button-base flex items-center gap-2">
          <Plus className="w-5 h-5" />
          Add Product
        </Button>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center py-10">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      ) : products.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-muted-foreground">No products added yet</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <div key={product.id} className="card-base p-6 hover-card">
              <div className="aspect-video rounded-lg overflow-hidden mb-4 bg-muted">
                {product.images[0] ? (
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                    No image
                  </div>
                )}
              </div>
              <h3 className="text-xl font-semibold mb-2 heading-base">{product.name}</h3>
              <p className="text-base mb-4 line-clamp-2">{product.description}</p>
              <div className="flex items-center justify-between">
                <span className="text-lg font-semibold text-primary">₹{product.price}</span>
                <div className="flex items-center gap-2">
                  <Button
                    onClick={() => handleEdit(product)}
                    variant="outline"
                    size="sm"
                    className="flex items-center gap-1"
                  >
                    <Pencil className="w-4 h-4" />
                    Edit
                  </Button>
                  <Button
                    onClick={() => handleDelete(product.id)}
                    variant="destructive"
                    size="sm"
                    className="flex items-center gap-1"
                  >
                    <Trash2 className="w-4 h-4" />
                    Delete
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-2xl">
          <DialogHeader className="px-6 pt-6">
            <DialogTitle>{editingProduct ? 'Edit Product' : 'Add New Product'}</DialogTitle>
            <DialogDescription>
              Fill in the product details below. All fields are required.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="px-6 pb-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-base mb-1">Name</label>
                <Input
                  placeholder="Enter product name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="input-base"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-base mb-1">Description</label>
                <Textarea
                  placeholder="Enter product description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="input-base min-h-[100px]"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-base mb-1">Price</label>
                <Input
                  type="number"
                  placeholder="Enter price"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  className="input-base"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-base mb-1">Features</label>
                <div className="space-y-2">
                  {formData.features.map((feature, index) => (
                    <div key={index} className="flex gap-2">
                      <Input
                        placeholder={`Feature ${index + 1}`}
                        value={feature}
                        onChange={(e) => updateFeature(index, e.target.value)}
                        className="input-base"
                        required
                      />
                      <Button
                        type="button"
                        variant="destructive"
                        size="icon"
                        onClick={() => removeFeature(index)}
                        disabled={formData.features.length === 1}
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                  <Button
                    type="button"
                    variant="outline"
                    onClick={addFeature}
                    className="w-full"
                  >
                    Add Feature
                  </Button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-base mb-1">Images (Max 2MB each)</label>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {formData.images.map((image, index) => (
                      <div key={index} className="relative aspect-video rounded-lg overflow-hidden bg-muted">
                        <img src={image} alt={`Product ${index + 1}`} className="w-full h-full object-cover" />
                        <button
                          type="button"
                          onClick={() => removeImage(index)}
                          className="absolute top-2 right-2 p-1 bg-destructive text-white rounded-full hover:bg-destructive/90"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                    <label className="aspect-video rounded-lg border-2 border-dashed border-muted-foreground/25 hover:border-primary/50 cursor-pointer flex flex-col items-center justify-center gap-2 text-muted-foreground hover:text-primary transition-colors">
                      <Upload className="w-8 h-8" />
                      <span className="text-sm">Upload Image</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                        multiple
                      />
                    </label>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <label className="block text-sm font-medium text-base">Contact Information</label>
                <Input
                  placeholder="Phone"
                  value={formData.contactInfo.phone}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    contactInfo: { ...prev.contactInfo, phone: e.target.value }
                  }))}
                  className="input-base"
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
                  className="input-base"
                  required
                />
                <Input
                  placeholder="Address"
                  value={formData.contactInfo.address}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    contactInfo: { ...prev.contactInfo, address: e.target.value }
                  }))}
                  className="input-base"
                  required
                />
              </div>
            </div>

            <div className="flex justify-end gap-4 mt-6">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsModalOpen(false)}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="button-base"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Saving...</span>
                  </div>
                ) : (
                  editingProduct ? 'Update Product' : 'Add Product'
                )}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
} 