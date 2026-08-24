'use client';

import { Users, UserCheck, CalendarOff, UserX, UserPlus } from 'lucide-react';
import StatsCard from '@/components/ui/Card/StatsCard';

export default function EmployeeStatusInsights() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
      <StatsCard 
        title="Total Employees" 
        value="250" 
        icon={Users} 
        trend="5 new" 
        trendUp 
      />
      <StatsCard 
        title="Active" 
        value="235" 
        icon={UserCheck} 
        trend="94%" 
        trendUp 
      />
      <StatsCard 
        title="On Leave Today" 
        value="12" 
        icon={CalendarOff}
      />
      <StatsCard 
        title="Inactive" 
        value="8" 
        icon={UserX} 
        trend="3.2%" 
        trendUp={false}
      />
      <StatsCard 
        title="New This Month" 
        value="5" 
        icon={UserPlus} 
        trend="Active" 
        trendUp 
      />
    </div>
  );
}
