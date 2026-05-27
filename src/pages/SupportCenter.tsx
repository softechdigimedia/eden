
import { motion } from 'motion/react';
import { 
  LifeBuoy, 
  MessageSquare, 
  BookOpen, 
  Search, 
  ChevronRight, 
  ArrowRight,
  Plus,
  Clock,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { cn } from '../lib/utils';

const tickets = [
  { id: 'TK-1024', subject: 'Map clustering error on mobile', status: 'open', priority: 'high', updated: '12m ago' },
  { id: 'TK-1025', subject: 'Regional data sync delay', status: 'pending', priority: 'medium', updated: '45m ago' },
  { id: 'TK-1026', subject: 'New agent onboarding flow', status: 'resolved', priority: 'low', updated: '2d ago' },
];

export const SupportCenter = () => {
  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      {/* Search Hero */}
      <div className="text-center py-8">
        <h2 className="text-3xl font-bold text-slate-900 tracking-tight">How can we help you?</h2>
        <p className="text-slate-500 font-medium mt-2">Search our knowledge base or open a technical support ticket.</p>
        <div className="max-w-2xl mx-auto mt-8 relative">
           <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
           <input 
             type="text" 
             placeholder="Search documentation, guides, and FAQ..." 
             className="w-full pl-12 pr-4 py-4 bg-white border border-slate-200 rounded-2xl text-sm font-medium shadow-xl shadow-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
           />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { title: 'Knowledge Base', desc: 'Browse our articles and guides.', icon: BookOpen, color: 'blue' },
          { title: 'Community Forum', desc: 'Connect with other field leads.', icon: MessageSquare, color: 'emerald' },
          { title: 'Technical Support', desc: 'Open a ticket with our experts.', icon: LifeBuoy, color: 'rose' },
        ].map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white p-8 rounded-3xl border border-slate-100 kpi-card-shadow group hover:border-blue-300 transition-all cursor-pointer"
          >
            <div className={cn(
              "w-12 h-12 rounded-2xl mb-6 flex items-center justify-center",
              item.color === 'blue' ? "bg-blue-50 text-blue-600" :
              item.color === 'emerald' ? "bg-emerald-50 text-emerald-600" : "bg-rose-50 text-rose-600"
            )}>
              <item.icon size={24} />
            </div>
            <h3 className="text-lg font-bold text-slate-900 tracking-tight mb-2 group-hover:text-blue-600 transition-colors">{item.title}</h3>
            <p className="text-sm text-slate-500 font-medium leading-relaxed mb-6">{item.desc}</p>
            <div className="flex items-center gap-2 text-blue-600 text-sm font-bold">
              <span>Explore</span>
              <ArrowRight size={16} />
            </div>
          </motion.div>
        ))}
      </div>

      {/* Support Tickets */}
      <div className="bg-white rounded-3xl border border-slate-100 kpi-card-shadow overflow-hidden">
        <div className="p-8 border-b border-slate-50 flex justify-between items-center">
           <div>
             <h3 className="text-lg font-bold text-slate-900 tracking-tight">Active Tickets</h3>
             <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">Your recent support requests</p>
           </div>
           <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-xl text-xs font-bold hover:bg-blue-700 transition-all shadow-md shadow-blue-100">
             <Plus size={16} />
             <span>Create Ticket</span>
           </button>
        </div>
        <div className="divide-y divide-slate-50">
          {tickets.map((ticket) => (
            <div key={ticket.id} className="p-6 flex items-center justify-between hover:bg-slate-50 transition-all group">
              <div className="flex items-center gap-6">
                <div className={cn(
                  "w-10 h-10 rounded-xl flex items-center justify-center",
                  ticket.status === 'open' ? "bg-blue-50 text-blue-600" :
                  ticket.status === 'pending' ? "bg-amber-50 text-amber-600" : "bg-emerald-50 text-emerald-600"
                )}>
                  {ticket.status === 'open' ? <Clock size={20} /> :
                   ticket.status === 'pending' ? <AlertCircle size={20} /> : <CheckCircle2 size={20} />}
                </div>
                <div>
                   <h4 className="text-sm font-bold text-slate-900 tracking-tight">{ticket.subject}</h4>
                   <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-0.5">{ticket.id} • Updated {ticket.updated}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                 <span className={cn(
                   "px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-widest",
                   ticket.priority === 'high' ? "bg-rose-50 text-rose-600" : "bg-slate-100 text-slate-500"
                 )}>
                   {ticket.priority} priority
                 </span>
                 <ChevronRight size={18} className="text-slate-300 group-hover:text-blue-600 transition-colors" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
