// Local data store
let products: any[] = [];
let services: any[] = [];
let contacts: any[] = [];
let slideshow: any[] = [];

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

export const getServices = async (limitCount = 20) => {
  return services.slice(-limitCount).reverse();
};

export const searchServices = async (searchTerm: string) => {
  return services
    .filter(service => 
      service.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .slice(0, 10);
};

export const getServiceById = async (serviceId: string) => {
  const service = services.find(s => s.id === serviceId);
  if (!service) {
    throw new Error('Service not found');
  }
  return service;
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

// Contacts
export const addContact = async (contactData: any) => {
  const newContact = {
    id: Date.now().toString(),
    ...contactData,
    status: 'pending',
    submittedAt: new Date().toISOString()
  };
  contacts.push(newContact);
  return newContact.id;
};

export const getAllContacts = async () => {
  return contacts.slice().reverse();
};

export const updateContactStatus = async (contactId: string, status: string) => {
  const index = contacts.findIndex(c => c.id === contactId);
  if (index === -1) {
    throw new Error('Contact not found');
  }
  contacts[index] = {
    ...contacts[index],
    status,
    updatedAt: new Date().toISOString()
  };
};

// Slideshow
export const addSlideshow = async (file: File, caption: string) => {
  const newSlide = {
    id: Date.now().toString(),
    imageUrl: URL.createObjectURL(file),
    caption,
    createdAt: new Date().toISOString()
  };
  slideshow.push(newSlide);
  return newSlide.id;
};

export const getSlideshow = async () => {
  return slideshow.slice().reverse();
};

export const deleteSlideshow = async (id: string) => {
  slideshow = slideshow.filter(s => s.id !== id);
}; 