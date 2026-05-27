import { motion } from 'motion/react';
import { 
  CheckCircle2, 
  XCircle, 
  Search, 
  Filter, 
  Eye
} from 'lucide-react';
import { cn } from '../lib/utils';

const submissions = [
  { id: '1', agent: 'Rahul Sharma', region: 'Maharashtra', store: 'Reliance Fresh Mumbai', type: 'Shelf Compliance', time: '12m ago', priority: 'high' },
  { id: '2', agent: 'Priya Patel', region: 'Gujarat', store: 'Big Bazaar Ahmedabad', type: 'Inventory Audit', time: '45m ago', priority: 'medium' },
  { id: '3', agent: 'Anita Singh', region: 'Delhi', store: 'More Megastore Delhi', type: 'New Lead', time: '1h ago', priority: 'high' },
  { id: '4', agent: 'Vikram Reddy', region: 'Karnataka', store: 'DMart Bangalore', type: 'Display Check', time: '3h ago', priority: 'low' },
  { id: '5', agent: 'Sanjay Kumar', region: 'Tamil Nadu', store: 'Spencer’s Chennai', type: 'Merchandising', time: '5h ago', priority: 'medium' },
];

export const ApprovalsQueue = () => {
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center bg-white p-6 rounded-2xl border border-slate-100 kpi-card-shadow">
        <div className="flex items-center gap-6">
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">Approvals Queue</h2>
          <div className="flex gap-4">
             <div className="flex items-center gap-2">
               <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
               <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">12 Pending</span>
             </div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <input 
              type="text" 
              placeholder="Filter by agent..." 
              className="pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-2 border border-slate-200 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-50">
             <Filter size={14} />
             <span>Batch Actions</span>
          </button>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-100 kpi-card-shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50 border-y border-slate-100">
                <th className="px-8 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Submission</th>
                <th className="px-8 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Agent</th>
                <th className="px-8 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Priority</th>
                <th className="px-8 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Submitted</th>
                <th className="px-8 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {submissions.map((sub, i) => (
                <motion.tr 
                  key={sub.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="hover:bg-slate-50 transition-colors group"
                >
                  <td className="px-8 py-5">
                    <p className="text-sm font-bold text-slate-900 tracking-tight">{sub.type}</p>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-0.5">{sub.store} • {sub.region}</p>
                  </td>
                  <td className="px-8 py-5 text-sm font-semibold text-slate-700">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full overflow-hidden border border-slate-100 shadow-sm flex-shrink-0 bg-slate-50">
                        <img 
                          src={`https://i.pravatar.cc/150?u=${encodeURIComponent(sub.agent)}`} 
                          className="w-full h-full object-cover" 
                          alt={sub.agent} 
                        />
                      </div>
                      <span className="font-bold text-slate-800">{sub.agent}</span>
                    </div>
                  </td>
                  <td className="px-8 py-5">
                    <span className={cn(
                      "px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-widest",
                      sub.priority === 'high' ? "bg-rose-50 text-rose-600" :
                      sub.priority === 'medium' ? "bg-amber-50 text-amber-600" : "bg-blue-50 text-blue-600"
                    )}>
                      {sub.priority}
                    </span>
                  </td>
                  <td className="px-8 py-5 text-xs font-semibold text-slate-400">{sub.time}</td>
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-2 text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors" title="Approve">
                        <CheckCircle2 size={18} />
                      </button>
                      <button className="p-2 text-rose-600 hover:bg-rose-50 rounded-lg transition-colors" title="Reject">
                        <XCircle size={18} />
                      </button>
                      <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="View Details">
                        <Eye size={18} />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
