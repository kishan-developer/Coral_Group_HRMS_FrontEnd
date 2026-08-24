import { MapPin, Navigation, ShieldAlert } from 'lucide-react';
import StatsCard from '@/components/ui/Card/StatsCard';

export default function GpsSummary() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <StatsCard title="GPS Users" value="142" icon={MapPin} trend="Active" trendUp />
      <StatsCard title="In-Transit" value="18" icon={Navigation} trend="On field" trendUp />
      <StatsCard title="Geo-Fence Violations" value="3" icon={ShieldAlert} trend="1 resolved" trendUp={false} />
      <StatsCard title="Last Check-in" value="2m ago" icon={MapPin} />
    </div>
  );
}
