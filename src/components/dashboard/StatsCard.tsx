import Image from 'next/image';
import { Stat } from '@/data/dashboard-data';

interface StatsCardProps {
  stat: Stat;
}

export default function StatsCard({ stat }: StatsCardProps) {
  return (
    <div className="stats-card">
      <div className="relative h-32">
        <Image
          src={stat.image}
          alt={stat.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          className="object-cover"
          priority={true}
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
  );
} 