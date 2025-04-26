export interface Stat {
  title: string;
  value: string;
  change: string;
  trend: 'up' | 'down';
  image: string;
}

export const stats: Stat[] = [
  {
    title: 'Total Services',
    value: '6',
    change: '+100%',
    trend: 'up',
    image: '/images/services/window-installation.jpg'
  },
  {
    title: 'Active Customers',
    value: '150',
    change: '+25%',
    trend: 'up',
    image: '/images/services/laptop-repair.jpg'
  },
  {
    title: 'Revenue',
    value: '₹5.2L',
    change: '+18%',
    trend: 'up',
    image: '/images/services/printer-repair.jpg'
  },
  {
    title: 'Pending Services',
    value: '12',
    change: '-8%',
    trend: 'down',
    image: '/images/services/computer-repair.jpg'
  }
];

export const recentServices = [
  {
    title: 'Window Installation',
    customer: 'John Doe',
    date: '2024-03-15',
    status: 'Completed',
    image: '/images/services/window-installation.jpg'
  },
  {
    title: 'Laptop Repair',
    customer: 'Jane Smith',
    date: '2024-03-14',
    status: 'In Progress',
    image: '/images/services/laptop-repair.jpg'
  },
  {
    title: 'Toner Refills',
    customer: 'Mike Johnson',
    date: '2024-03-13',
    status: 'Scheduled',
    image: '/images/services/toner-refill.jpg'
  }
];

export const serviceDistribution = [
  {
    name: 'Window Installation',
    percentage: 25,
    image: '/images/services/window-installation.jpg'
  },
  {
    name: 'Laptop Repair',
    percentage: 20,
    image: '/images/services/laptop-repair.jpg'
  },
  {
    name: 'Printer Repair',
    percentage: 15,
    image: '/images/services/printer-repair.jpg'
  },
  {
    name: 'Toner Refills',
    percentage: 15,
    image: '/images/services/toner-refill.jpg'
  },
  {
    name: 'Computer Repair',
    percentage: 15,
    image: '/images/services/computer-repair.jpg'
  },
  {
    name: 'Thin Clients',
    percentage: 10,
    image: '/images/services/thin-client.jpg'
  }
]; 