export interface Service {
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

export const services: Service[] = [
  {
    id: '1',
    name: "Computer Repair",
    description: "Professional computer repair and maintenance services",
    price: "999",
    images: [
      '/images/services/computer-repair.jpg'
    ],
    features: [
      "Hardware Diagnostics",
      "Software Troubleshooting",
      "Virus Removal",
      "Data Recovery",
      "System Optimization"
    ],
    contactInfo: {
      phone: "+91 98765 43210",
      email: "service@ekamtech.com",
      address: "123 Tech Street, IT Park"
    }
  },
  {
    id: '2',
    name: "Laptop Repair",
    description: "Expert laptop repair and upgrade services",
    price: "1499",
    images: [
      '/images/services/laptop-repair.jpg'
    ],
    features: [
      "Screen Replacement",
      "Keyboard Repair",
      "Battery Replacement",
      "Hardware Upgrades",
      "Performance Optimization"
    ],
    contactInfo: {
      phone: "+91 98765 43210",
      email: "service@ekamtech.com",
      address: "123 Tech Street, IT Park"
    }
  },
  {
    id: '3',
    name: "Printer Repair",
    description: "Comprehensive printer repair and maintenance",
    price: "799",
    images: [
      '/images/services/printer-repair.jpg'
    ],
    features: [
      "Print Quality Issues",
      "Paper Jam Resolution",
      "Network Setup",
      "Driver Installation",
      "Regular Maintenance"
    ],
    contactInfo: {
      phone: "+91 98765 43210",
      email: "service@ekamtech.com",
      address: "123 Tech Street, IT Park"
    }
  },
  {
    id: '4',
    name: "Network Setup",
    description: "Professional network installation and configuration",
    price: "2999",
    images: [
      '/images/services/network-setup.jpg'
    ],
    features: [
      "Router Configuration",
      "Network Security",
      "WiFi Setup",
      "Network Troubleshooting",
      "Performance Optimization"
    ],
    contactInfo: {
      phone: "+91 98765 43210",
      email: "service@ekamtech.com",
      address: "123 Tech Street, IT Park"
    }
  }
]; 