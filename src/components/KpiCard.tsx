
import {type LucideIcon, TrendingUp, TrendingDown } from 'lucide-react';
import { motion } from 'motion/react';
import { cn } from '../lib/utils';

interface KpiCardProps {
  title: string;
  value: string;
  trend: number;
  icon: LucideIcon;
  color: 'blue' | 'indigo' | 'emerald' | 'amber' | 'rose';
}

const colorMap = {
  blue: 'bg-blue-50 text-blue-600',
  indigo: 'bg-indigo-50 text-indigo-600',
  emerald: 'bg-emerald-50 text-emerald-600',
  amber: 'bg-amber-50 text-amber-600',
  rose: 'bg-rose-50 text-rose-600',
};

export const KpiCard = ({ title, value, trend, icon: Icon, color }: KpiCardProps) => {
  const isPositive = trend >= 0;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl p-6 kpi-card-shadow border border-slate-100 flex flex-col gap-4"
    >
      <div className="flex justify-between items-start">
        <div className={cn("p-3 rounded-xl", colorMap[color])}>
          <Icon size={24} />
        </div>
        <div className={cn(
          "flex items-center gap-1.5 px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider",
          isPositive ? "bg-emerald-50 text-emerald-600" : "bg-rose-50 text-rose-600"
        )}>
          {isPositive ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
          <span>{Math.abs(trend)}%</span>
        </div>
      </div>
      
      <div>
        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">{title}</p>
        <h3 className="text-3xl font-bold text-slate-900 tracking-tight">{value}</h3>
      </div>

      <div className="mt-2 h-1 w-full bg-slate-50 rounded-full overflow-hidden">
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: '70%' }}
          transition={{ duration: 1, delay: 0.2 }}
          className={cn("h-full rounded-full", isPositive ? "bg-emerald-500" : "bg-rose-500")}
        />
      </div>
    </motion.div>
  );
};
