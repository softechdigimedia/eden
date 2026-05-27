
import { motion } from 'motion/react';
import { 
  MapPin, 
  ChevronRight,
  Search,
  Plus
} from 'lucide-react';
import { cn } from '../lib/utils';

const companies = [
  { id: '1', name: 'Reliance Retail', location: 'Maharashtra', agents: 124, status: 'enterprise', logo: 'RR' },
  { id: '2', name: 'Future Retail', location: 'Delhi', agents: 89, status: 'partner', logo: 'FR' },
  { id: '3', name: 'Aditya Birla Retail', location: 'Karnataka', agents: 210, status: 'enterprise', logo: 'AB' },
  { id: '4', name: 'Avenue Supermarts', location: 'Gujarat', agents: 45, status: 'standard', logo: 'AS' },
  { id: '5', name: 'Spencer’s Retail', location: 'West Bengal', agents: 16, status: 'standard', logo: 'SR' },
  { id: '6', name: 'Shoppers Stop', location: 'Tamil Nadu', agents: 72, status: 'partner', logo: 'SS' },
];

export const CompanyDirectory = () => {
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center bg-white p-6 rounded-2xl border border-slate-100 kpi-card-shadow">
        <div className="flex-1 max-w-md relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input 
            type="text" 
            placeholder="Search organizations..." 
            className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="flex items-center gap-3">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-xl text-sm font-bold shadow-md shadow-blue-100 flex items-center gap-2">
            <Plus size={18} />
            <span>Add Organization</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {companies.map((company, i) => (
          <motion.div
            key={company.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.05 }}
            className="bg-white p-6 rounded-2xl border border-slate-100 kpi-card-shadow group hover:border-blue-300 transition-all"
          >
            <div className="flex justify-between items-start mb-6">
              <div className="w-12 h-12 rounded-xl bg-slate-900 flex items-center justify-center text-white font-bold text-lg">
                {company.logo}
              </div>
              <div className={cn(
                "px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-widest",
                company.status === 'enterprise' ? "bg-indigo-50 text-indigo-600" :
                company.status === 'partner' ? "bg-blue-50 text-blue-600" : "bg-slate-50 text-slate-400"
              )}>
                {company.status}
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors tracking-tight">{company.name}</h3>
                <div className="flex items-center gap-1.5 text-xs text-slate-500 font-semibold mt-1">
                  <MapPin size={12} />
                  <span>{company.location} Regional Office</span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-slate-50">
                <div className="flex items-center gap-2">
                  <div className="flex -space-x-2">
                     {[1, 2, 3].map(j => (
                       <div key={j} className="w-6 h-6 rounded-full border-2 border-white bg-slate-200 overflow-hidden">
                         <img src={`https://i.pravatar.cc/150?u=${company.id}${j}`} alt="Agent" />
                       </div>
                     ))}
                  </div>
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">{company.agents} Agents</span>
                </div>
                <button className="p-2 text-slate-300 group-hover:text-blue-600 transition-colors">
                  <ChevronRight size={20} />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
