import Image from 'next/image';

interface Service {
  title: string;
  customer: string;
  date: string;
  status: string;
  image: string;
}

interface RecentServicesProps {
  services: Service[];
}

export default function RecentServices({ services }: RecentServicesProps) {
  return (
    <div className="card-base p-6 mb-8">
      <h2 className="text-2xl font-bold mb-6 heading-base">Recent Services</h2>
      <div className="space-y-6">
        {services.map((service, index) => (
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
  );
} 