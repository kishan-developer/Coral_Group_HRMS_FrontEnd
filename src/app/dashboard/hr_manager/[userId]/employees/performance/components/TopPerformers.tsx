'use client';

import { Award, Star, Trophy, Medal } from 'lucide-react';

interface TopPerformersProps {
  onEmployeeClick: (employee: any) => void;
}

const topPerformers = [
  {
    id: 1,
    name: 'Rahul Sharma',
    department: 'Sales',
    score: 95,
    achievement: 120,
    badge: 'Employee of the Month',
    badgeIcon: 'trophy',
    badgeColor: 'amber',
  },
  {
    id: 2,
    name: 'Amit Kumar',
    department: 'Support',
    score: 92,
    achievement: 110,
    badge: 'Best Sales Performer',
    badgeIcon: 'star',
    badgeColor: 'blue',
  },
  {
    id: 3,
    name: 'Priya Singh',
    department: 'Marketing',
    score: 90,
    achievement: 105,
    badge: 'Best Attendance',
    badgeIcon: 'medal',
    badgeColor: 'green',
  },
  {
    id: 4,
    name: 'John Doe',
    department: 'IT',
    score: 88,
    achievement: 98,
    badge: 'Top Performer',
    badgeIcon: 'award',
    badgeColor: 'purple',
  },
];

const getBadgeIcon = (icon: string) => {
  switch (icon) {
    case 'trophy':
      return <Trophy className="h-4 w-4" />;
    case 'star':
      return <Star className="h-4 w-4" />;
    case 'medal':
      return <Medal className="h-4 w-4" />;
    default:
      return <Award className="h-4 w-4" />;
  }
};

const getBadgeColor = (color: string) => {
  switch (color) {
    case 'amber':
      return 'bg-amber-100 text-amber-700 border-amber-300';
    case 'blue':
      return 'bg-blue-100 text-blue-700 border-blue-300';
    case 'green':
      return 'bg-green-100 text-green-700 border-green-300';
    case 'purple':
      return 'bg-purple-100 text-purple-700 border-purple-300';
    default:
      return 'bg-zinc-100 text-zinc-700 border-zinc-300';
  }
};

export default function TopPerformers({ onEmployeeClick }: TopPerformersProps) {
  return (
    <div>
      <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 mb-6">Top Performers</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {topPerformers.map((performer) => (
          <div
            key={performer.id}
            onClick={() => onEmployeeClick(performer)}
            className="bg-gradient-to-br from-zinc-50 to-zinc-100 dark:from-zinc-800 dark:to-zinc-900 rounded-xl p-5 border border-zinc-200 dark:border-zinc-700 hover:shadow-lg hover:border-[#94cb3d] transition-all cursor-pointer"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#94cb3d] to-[#7ab32e] flex items-center justify-center text-white font-bold text-lg">
                {performer.name.charAt(0)}
              </div>
              <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-semibold border ${getBadgeColor(performer.badgeColor)}`}>
                {getBadgeIcon(performer.badgeIcon)}
                <span className="ml-1">{performer.badge}</span>
              </div>
            </div>
            <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 mb-1">
              {performer.name}
            </h3>
            <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-3">{performer.department}</p>
            <div className="flex justify-between items-center">
              <div>
                <p className="text-xs text-zinc-500 dark:text-zinc-500">Score</p>
                <p className="text-xl font-bold text-[#94cb3d]">{performer.score}%</p>
              </div>
              <div className="text-right">
                <p className="text-xs text-zinc-500 dark:text-zinc-500">Achievement</p>
                <p className="text-xl font-bold text-blue-600">{performer.achievement}%</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
