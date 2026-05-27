
import { motion } from 'motion/react';
import { 
  Globe, 
  MapPin, 
  ChevronRight,
} from 'lucide-react';
import { cn } from '../lib/utils';

const regionalStats = [
  { region: 'Maharashtra', active: 142, compliance: 88, status: 'stable' },
  { region: 'Karnataka', active: 98, compliance: 92, status: 'improving' },
  { region: 'Delhi NCR', active: 210, compliance: 74, status: 'warning' },
  { region: 'Tamil Nadu', active: 56, compliance: 81, status: 'stable' },
];

export const FieldOperations = () => {
  return (
    <div className="space-y-8">
      {/* Global Activity Header */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3 bg-slate-900 rounded-3xl p-8 text-white relative overflow-hidden shadow-2xl">
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-6">
               <div className="px-3 py-1 bg-blue-500/20 text-blue-400 border border-blue-500/30 rounded-full text-[10px] font-bold uppercase tracking-widest">
                 Live Monitoring
               </div>
               <div className="flex items-center gap-2">
                 <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
                 <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">421 Agents Connected</span>
               </div>
            </div>
            <h2 className="text-4xl font-bold tracking-tight mb-4">India Field Operations</h2>
            <p className="text-slate-400 max-w-lg mb-8 leading-relaxed font-medium">Real-time telemetry and compliance tracking across all major Indian retail partners. Analyzing 2.4k data points per hour from major states.</p>
            
            <div className="flex gap-12">
               <div>
                  <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Global Compliance</p>
                  <p className="text-3xl font-bold">84.2%</p>
               </div>
               <div className="w-[1px] bg-slate-800"></div>
               <div>
                  <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Active Leads</p>
                  <p className="text-3xl font-bold text-blue-400">1,482</p>
               </div>
               <div className="w-[1px] bg-slate-800"></div>
               <div>
                  <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Safety Incidents</p>
                  <p className="text-3xl font-bold text-rose-500">0</p>
               </div>
            </div>
          </div>
          <div className="absolute right-0 top-0 bottom-0 w-1/2 opacity-10 pointer-events-none">
             <Globe className="w-full h-full transform translate-x-20 scale-125" />
          </div>
        </div>

        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white rounded-3xl p-8 border border-slate-100 kpi-card-shadow flex flex-col justify-between"
        >
          <div>
            <h3 className="text-lg font-bold text-slate-900 tracking-tight">Active Pulse</h3>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">System Load: 42%</p>
          </div>
          <div className="space-y-4">
             <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
               <motion.div 
                 initial={{ width: 0 }}
                 animate={{ width: '82%' }}
                 className="h-full bg-blue-600 rounded-full"
               />
             </div>
             <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Network Efficiency</p>
          </div>
          <button className="w-full py-4 bg-slate-50 text-slate-900 rounded-2xl text-xs font-bold uppercase tracking-widest hover:bg-slate-100 transition-colors">
            System Diagnostics
          </button>
        </motion.div>
      </div>

      {/* Regional Performance Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {regionalStats.map((stat, i) => (
          <motion.div
            key={stat.region}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white p-6 rounded-3xl border border-slate-100 kpi-card-shadow group hover:border-blue-300 transition-all"
          >
            <div className="flex justify-between items-start mb-6">
               <div className="p-3 bg-slate-50 rounded-2xl text-slate-400 group-hover:text-blue-600 group-hover:bg-blue-50 transition-all">
                 <MapPin size={24} />
               </div>
               <span className={cn(
                 "px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-widest",
                 stat.status === 'improving' ? "bg-emerald-50 text-emerald-600" :
                 stat.status === 'warning' ? "bg-rose-50 text-rose-600" : "bg-blue-50 text-blue-600"
               )}>
                 {stat.status}
               </span>
            </div>
            
            <h4 className="text-lg font-bold text-slate-900 tracking-tight mb-2">{stat.region}</h4>
            <div className="flex justify-between items-end">
               <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-0.5">Active Agents</p>
                  <p className="text-xl font-bold text-slate-900">{stat.active}</p>
               </div>
               <div className="text-right">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-0.5">Compliance</p>
                  <p className={cn(
                    "text-xl font-bold",
                    stat.compliance >= 90 ? "text-emerald-500" : 
                    stat.compliance >= 80 ? "text-blue-500" : "text-amber-500"
                  )}>{stat.compliance}%</p>
               </div>
            </div>
            
            <div className="mt-4 pt-4 border-t border-slate-50 flex justify-between items-center">
               <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none">Market Share: 24%</span>
               <ChevronRight size={16} className="text-slate-300 group-hover:text-blue-600 transition-colors" />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
