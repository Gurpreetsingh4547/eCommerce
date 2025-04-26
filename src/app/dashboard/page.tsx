import Header from '@/components/Header';
import Image from 'next/image';

const stats = [
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

const recentServices = [
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

const serviceDistribution = [
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

export default function Dashboard() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Header />
      <div className="pt-[100px] relative z-0">
        <div className="container-base">
          <h1 className="text-4xl font-bold mb-8 heading-base">Dashboard</h1>
          
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {stats.map((stat, index) => (
              <div key={index} className="stats-card">
                <div className="relative h-32">
                  <Image
                    src={stat.image}
                    alt={stat.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                    className="object-cover"
                    priority={index < 2}
                    onError={(e) => {
                      console.error(`Error loading image: ${stat.image}`);
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 to-transparent" />
                </div>
                <div className="p-6">
                  <h3 className="text-sm font-medium text-base">{stat.title}</h3>
                  <div className="flex items-baseline justify-between mt-2">
                    <p className="text-2xl font-semibold heading-base">{stat.value}</p>
                    <span className={`text-sm font-medium ${
                      stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {stat.change}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Recent Services */}
          <div className="card-base p-6 mb-8">
            <h2 className="text-2xl font-bold mb-6 heading-base">Recent Services</h2>
            <div className="space-y-6">
              {recentServices.map((service, index) => (
                <div key={index} className="flex items-center gap-6 p-4 border rounded-lg hover:bg-secondary transition-colors duration-200">
                  <div className="relative w-24 h-24 rounded-lg overflow-hidden">
                    <Image
                      src={service.image}
                      alt={service.title}
                      fill
                      sizes="96px"
                      className="object-cover"
                      onError={(e) => {
                        console.error(`Error loading image: ${service.image}`);
                      }}
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg heading-base">{service.title}</h3>
                    <p className="text-base">Customer: {service.customer}</p>
                    <p className="text-sm text-muted-foreground">Date: {service.date}</p>
                  </div>
                  <div className="badge">
                    {service.status}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Service Distribution */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="card-base p-6">
              <h2 className="text-2xl font-bold mb-6 heading-base">Service Distribution</h2>
              <div className="space-y-4">
                {serviceDistribution.map((service, index) => (
                  <div key={index} className="flex items-center gap-4">
                    <div className="relative w-16 h-16 rounded-lg overflow-hidden">
                      <Image
                        src={service.image}
                        alt={service.name}
                        fill
                        sizes="64px"
                        className="object-cover"
                        onError={(e) => {
                          console.error(`Error loading image: ${service.image}`);
                        }}
                      />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between mb-1">
                        <span className="font-medium heading-base">{service.name}</span>
                        <span className="text-base">{service.percentage}%</span>
                      </div>
                      <div className="progress-container">
                        <div className="progress-bar" style={{ width: `${service.percentage}%` }}></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
} 