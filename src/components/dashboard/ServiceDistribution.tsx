import Image from 'next/image';

interface Distribution {
  name: string;
  percentage: number;
  image: string;
}

interface ServiceDistributionProps {
  distribution: Distribution[];
}

export default function ServiceDistribution({ distribution }: ServiceDistributionProps) {
  return (
    <div className="card-base p-6">
      <h2 className="text-2xl font-bold mb-6 heading-base">Service Distribution</h2>
      <div className="space-y-4">
        {distribution.map((service, index) => (
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
  );
} 