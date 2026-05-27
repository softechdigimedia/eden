
import { motion } from 'motion/react';
import { 
  FileText, 
  Download, 
  Search, 
  Filter, 
  FileBox,
  Image as ImageIcon,
  FileCode
} from 'lucide-react';
import { cn } from '../lib/utils';

const assets = [
  { id: '1', title: 'Shelf Compliance Manual v4', type: 'PDF', size: '2.4 MB', date: 'Mar 12, 2024', category: 'Training' },
  { id: '2', title: 'Regional Brand Assets Q2', type: 'ZIP', size: '45.1 MB', date: 'Mar 08, 2024', category: 'Marketing' },
  { id: '3', title: 'Agent Submission Template', type: 'XLSX', size: '124 KB', date: 'Feb 28, 2024', category: 'Operations' },
  { id: '4', title: 'Product Display Guide - Spring', type: 'PDF', size: '8.2 MB', date: 'Feb 15, 2024', category: 'Merchandising' },
  { id: '5', title: 'API Integration Documentation', type: 'MD', size: '45 KB', date: 'Jan 30, 2024', category: 'Developer' },
];

export const Downloads = () => {
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center bg-white p-6 rounded-2xl border border-slate-100 kpi-card-shadow">
        <div className="flex items-center gap-6 flex-1 max-w-md">
           <div className="relative w-full">
             <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
             <input 
               type="text" 
               placeholder="Search assets and documentation..." 
               className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all shadow-sm"
             />
           </div>
        </div>
        <div className="flex items-center gap-3">
           <button className="flex items-center gap-2 px-4 py-2 border border-slate-200 rounded-xl text-sm font-bold text-slate-600 hover:bg-slate-50">
             <Filter size={16} />
             <span>Categories</span>
           </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Training Materials', count: 12, icon: FileBox, color: 'blue' },
          { label: 'Brand Assets', count: 45, icon: ImageIcon, color: 'rose' },
          { label: 'Operations Data', count: 8, icon: FileText, color: 'emerald' },
          { label: 'Technical Docs', count: 4, icon: FileCode, color: 'indigo' },
        ].map((cat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white p-6 rounded-2xl border border-slate-100 kpi-card-shadow group hover:border-blue-300 transition-all cursor-pointer"
          >
            <div className={cn(
              "p-4 rounded-2xl w-14 h-14 mb-4 flex items-center justify-center transition-transform group-hover:scale-110",
              cat.color === 'blue' ? "bg-blue-50 text-blue-600" :
              cat.color === 'rose' ? "bg-rose-50 text-rose-600" :
              cat.color === 'emerald' ? "bg-emerald-50 text-emerald-600" : "bg-indigo-50 text-indigo-600"
            )}>
              <cat.icon size={24} />
            </div>
            <h4 className="text-lg font-bold text-slate-900 tracking-tight">{cat.label}</h4>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">{cat.count} Files Available</p>
          </motion.div>
        ))}
      </div>

      <div className="bg-white rounded-2xl border border-slate-100 kpi-card-shadow overflow-hidden">
        <div className="p-8 border-b border-slate-50 flex justify-between items-center">
           <h3 className="text-lg font-bold text-slate-900 tracking-tight">Recent Assets</h3>
           <button className="text-blue-600 text-sm font-bold hover:underline">View All Files</button>
        </div>
        <div className="divide-y divide-slate-50">
          {assets.map((asset, i) => (
            <motion.div
              key={asset.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
              className="p-6 flex items-center justify-between hover:bg-slate-50 transition-all group"
            >
              <div className="flex items-center gap-6 flex-1 min-w-0">
                 <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center text-slate-400 group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors">
                   <FileText size={24} />
                 </div>
                 <div className="min-w-0">
                    <h4 className="text-sm font-bold text-slate-900 truncate tracking-tight">{asset.title}</h4>
                    <div className="flex items-center gap-3 mt-1">
                       <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{asset.category}</span>
                       <span className="w-1 h-1 bg-slate-300 rounded-full"></span>
                       <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{asset.type} • {asset.size}</span>
                    </div>
                 </div>
              </div>
              <div className="flex items-center gap-6">
                 <span className="text-xs font-semibold text-slate-400 hidden md:block uppercase tracking-wider">{asset.date}</span>
                 <button className="p-2 border border-slate-200 rounded-xl text-slate-400 hover:text-blue-600 hover:border-blue-200 hover:bg-white transition-all">
                   <Download size={18} />
                 </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};
