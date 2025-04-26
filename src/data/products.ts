export interface Product {
  id: string;
  name: string;
  description: string;
  price: string;
  images: string[];
  features: string[];
  contactInfo: {
    phone: string;
    email: string;
    address: string;
  };
}

export const products: Product[] = [
  {
    id: '1',
    name: 'Product 1',
    description: 'Description for product 1',
    price: '999',
    features: [
      'Feature 1',
      'Feature 2',
      'Feature 3'
    ],
    images: ['/images/product1.jpg'],
    contactInfo: {
      phone: '+1234567890',
      email: 'contact@example.com',
      address: '123 Street, City'
    }
  },
  {
    id: '2',
    name: "Gaming Laptop",
    description: "High-performance gaming laptop with the latest hardware",
    price: "89999",
    images: [
      '/images/services/printer-repair.jpg'
    ],
    features: [
      "Intel Core i7 12th Gen",
      "NVIDIA RTX 3060 6GB",
      "16GB DDR5 RAM",
      "1TB NVMe SSD",
      "15.6\" FHD 144Hz Display"
    ],
    contactInfo: {
      phone: "+91 98765 43210",
      email: "sales@ekamtech.com",
      address: "123 Tech Street, IT Park"
    }
  },
  {
    id: '3',
    name: "Professional Workstation",
    description: "Powerful workstation for content creation and professional work",
    price: "149999",
    images: [
      '/images/services/printer-repair.jpg'
    ],
    features: [
      "Intel Core i9 13th Gen",
      "NVIDIA RTX 4070 12GB",
      "32GB DDR5 RAM",
      "2TB NVMe SSD",
      "27\" 4K Display"
    ],
    contactInfo: {
      phone: "+91 98765 43210",
      email: "sales@ekamtech.com",
      address: "123 Tech Street, IT Park"
    }
  },
  {
    id: '4',
    name: "All-in-One Printer",
    description: "Professional grade all-in-one printer for office use",
    price: "29999",
    images: [
      '/images/services/computer-repair.jpg'
    ],
    features: [
      "Color Printing",
      "Wireless Connectivity",
      "Scanner & Copier",
      "Automatic Document Feeder",
      "Duplex Printing"
    ],
    contactInfo: {
      phone: "+91 98765 43210",
      email: "sales@ekamtech.com",
      address: "123 Tech Street, IT Park"
    }
  },
  {
    id: '5',
    name: "Gaming Monitor",
    description: "High refresh rate gaming monitor for competitive gaming",
    price: "34999",
    images: [
      '/images/services/laptop-repair.jpg'
    ],
    features: [
      "27\" QHD Display",
      "165Hz Refresh Rate",
      "1ms Response Time",
      "G-Sync Compatible",
      "HDR Support"
    ],
    contactInfo: {
      phone: "+91 98765 43210",
      email: "sales@ekamtech.com",
      address: "123 Tech Street, IT Park"
    }
  }
]; 