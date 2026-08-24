import { Briefcase, Clock, Users, Wallet } from 'lucide-react';
import StatsCard from '../ui/Card/StatsCard';

export default function KPIStats() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <StatsCard title="Total Employees" value="248" icon={Users} trend="12%" trendUp />
      <StatsCard title="Attendance Today" value="96.5%" icon={Clock} trend="2.1%" trendUp />
      <StatsCard title="Open Positions" value="14" icon={Briefcase} trend="3" trendUp={false} />
      <StatsCard title="Monthly Payroll" value="$124K" icon={Wallet} trend="8%" trendUp />
    </div>
  );
}
