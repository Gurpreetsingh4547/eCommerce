import dynamic from 'next/dynamic';
import { Suspense } from 'react';
import Header from '@/components/Header';
import { stats, recentServices, serviceDistribution } from '@/data/dashboard-data';

// Dynamically import components with loading states
const StatsCard = dynamic(() => import('@/components/dashboard/StatsCard'), {
  loading: () => <div className="stats-card animate-pulse" />,
  ssr: false
});

const RecentServices = dynamic(() => import('@/components/dashboard/RecentServices'), {
  loading: () => <div className="card-base p-6 animate-pulse" />,
  ssr: false
});

const ServiceDistribution = dynamic(() => import('@/components/dashboard/ServiceDistribution'), {
  loading: () => <div className="card-base p-6 animate-pulse" />,
  ssr: false
});

export default function Dashboard() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Header />
      <div className="pt-[100px] relative z-0">
        <div className="container-base">
          <h1 className="text-4xl font-bold mb-8 heading-base">Dashboard</h1>
          
          {/* Stats Grid */}
          <Suspense fallback={<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="stats-card animate-pulse" />
            ))}
          </div>}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              {stats.map((stat, index) => (
                <StatsCard key={index} stat={stat} />
              ))}
            </div>
          </Suspense>

          {/* Recent Services */}
          <Suspense fallback={<div className="card-base p-6 mb-8 animate-pulse" />}>
            <RecentServices services={recentServices} />
          </Suspense>

          {/* Service Distribution */}
          <Suspense fallback={<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="card-base p-6 animate-pulse" />
          </div>}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <ServiceDistribution distribution={serviceDistribution} />
            </div>
          </Suspense>
        </div>
      </div>
    </main>
  );
} 