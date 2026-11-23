import React from 'react';
import { ComplaintStatus } from '../../types';
import { 
  Clock, 
  Search, 
  UserCheck, 
  Activity, 
  CheckCircle2, 
  XCircle 
} from 'lucide-react';

interface StatusBadgeProps {
  status: ComplaintStatus;
  size?: 'sm' | 'md' | 'lg';
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, size = 'md' }) => {
  const getBadgeConfig = () => {
    switch (status) {
      case 'Submitted':
        return {
          bg: 'bg-amber-500/15 text-amber-300 border-amber-500/30',
          dot: 'bg-amber-400',
          icon: Clock,
          label: 'Submitted'
        };
      case 'Under Review':
        return {
          bg: 'bg-sky-500/15 text-sky-300 border-sky-500/30',
          dot: 'bg-sky-400',
          icon: Search,
          label: 'Under Review'
        };
      case 'Officer Assigned':
        return {
          bg: 'bg-indigo-500/15 text-indigo-300 border-indigo-500/30',
          dot: 'bg-indigo-400',
          icon: UserCheck,
          label: 'Officer Assigned'
        };
      case 'In Progress':
        return {
          bg: 'bg-purple-500/15 text-purple-300 border-purple-500/30',
          dot: 'bg-purple-400',
          icon: Activity,
          label: 'In Progress'
        };
      case 'Resolved':
        return {
          bg: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30',
          dot: 'bg-emerald-400',
          icon: CheckCircle2,
          label: 'Resolved / Closed'
        };
      case 'Rejected':
        return {
          bg: 'bg-red-500/15 text-red-300 border-red-500/30',
          dot: 'bg-red-400',
          icon: XCircle,
          label: 'Dismissed'
        };
      default:
        return {
          bg: 'bg-slate-700/50 text-slate-300 border-slate-600',
          dot: 'bg-slate-400',
          icon: Clock,
          label: status
        };
    }
  };

  const config = getBadgeConfig();
  const Icon = config.icon;

  const sizeClasses = {
    sm: 'text-[10px] px-2 py-0.5 gap-1',
    md: 'text-xs px-2.5 py-1 gap-1.5',
    lg: 'text-sm px-3.5 py-1.5 gap-2 font-semibold',
  };

  return (
    <span className={`inline-flex items-center rounded-full border font-medium ${config.bg} ${sizeClasses[size]}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${config.dot} animate-pulse shrink-0`} />
      <Icon className="w-3 h-3 shrink-0" />
      <span>{config.label}</span>
    </span>
  );
};
