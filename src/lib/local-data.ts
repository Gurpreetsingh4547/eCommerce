// Local data store
let products: any[] = [];
let services: any[] = [];

// Products
export const addProduct = async (productData: any) => {
  const newProduct = {
    id: Date.now().toString(),
    ...productData,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
  products.push(newProduct);
  return newProduct.id;
};

export const getProducts = async (limitCount = 20) => {
  return products.slice(-limitCount).reverse();
};

export const searchProducts = async (searchTerm: string) => {
  return products
    .filter(product => 
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .slice(0, 10);
};

export const getProductById = async (productId: string) => {
  const product = products.find(p => p.id === productId);
  if (!product) {
    throw new Error('Product not found');
  }
  return product;
};

export const updateProduct = async (productId: string, productData: any) => {
  const index = products.findIndex(p => p.id === productId);
  if (index === -1) {
    throw new Error('Product not found');
  }
  products[index] = {
    ...products[index],
    ...productData,
    updatedAt: new Date().toISOString()
  };
};

export const deleteProduct = async (productId: string) => {
  products = products.filter(p => p.id !== productId);
};

// Services
export const addService = async (serviceData: any) => {
  const newService = {
    id: Date.now().toString(),
    ...serviceData,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
  services.push(newService);
  return newService.id;
};

export const getServices = async () => {
  return services;
};

export const updateService = async (serviceId: string, serviceData: any) => {
  const index = services.findIndex(s => s.id === serviceId);
  if (index === -1) {
    throw new Error('Service not found');
  }
  services[index] = {
    ...services[index],
    ...serviceData,
    updatedAt: new Date().toISOString()
  };
};

export const deleteService = async (serviceId: string) => {
  services = services.filter(s => s.id !== serviceId);
};

// Contact Form Submissions
let contactSubmissions: any[] = [];

export const submitContactForm = async (formData: any) => {
  const newSubmission = {
    id: Date.now().toString(),
    ...formData,
    status: 'new',
    submittedAt: new Date().toISOString()
  };
  contactSubmissions.push(newSubmission);
  return newSubmission.id;
};

export const getAllContacts = async () => {
  return contactSubmissions.reverse();
}; 