import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowLeft, 
  Search, 
  Filter, 
  ChevronRight, 
  Store, 
  Clock, 
  Image as ImageIcon,
  AlertCircle,
  Layout,
  ClipboardList,
  Users,
  Settings,
  X,
  MessageCircle,
  Star as StarIcon,
  Package as PackageIcon,
  CheckCircle2
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { cn } from '../lib/utils';

const historyItems = [
  {
    id: '1',
    campaign: 'Nestlé KitKat Promo - Q2',
    retailer: 'Big Bazaar, HSR Layout',
    date: '12 Apr 2025, 2:30 PM',
    status: 'Approved',
    footer: '3 Photos attached',
    footerIcon: ImageIcon,
    color: 'emerald',
    responses: [
      { q: "Stock Level of KitKat", a: "Full Distribution", icon: PackageIcon },
      { q: "Shelf Visibility", a: "4/5 (Good)", icon: StarIcon },
      { q: "Promotional Condition", a: "Excellent", icon: CheckCircle2 },
      { q: "Additional Notes", a: "All SKUs are well organized. Competitor visibility is minimal in this segment." }
    ]
  },
  {
    id: '2',
    campaign: 'Coca-Cola Summer Display',
    retailer: 'Reliance Fresh, Indiranagar',
    date: '11 Apr 2025, 10:15 AM',
    status: 'Pending',
    footer: '1 Photo attached',
    footerIcon: ImageIcon,
    color: 'amber',
    responses: [
      { q: "Cooler Temperature", a: "Optimal (4°C)", icon: PackageIcon },
      { q: "Brand Facing", a: "3/5 (Standard)", icon: StarIcon },
      { q: "POS Material", a: "Good Condition", icon: CheckCircle2 },
      { q: "Additional Notes", a: "Cooler needs minor cleaning on the bottom shelf." }
    ]
  },
  {
    id: '3',
    campaign: 'L\'Oreal Haircare Audit',
    retailer: 'Spar Hypermarket, Koramangala',
    date: '09 Apr 2025, 4:45 PM',
    status: 'Flagged',
    footer: 'Resolution required',
    footerIcon: AlertCircle,
    color: 'rose',
    responses: [
      { q: "Tester Availability", a: "Missing", icon: PackageIcon },
      { q: "Shelf Cleanliness", a: "2/5 (Requires Action)", icon: StarIcon },
      { q: "Pricing Accuracy", a: "Incorrect Labels", icon: AlertCircle },
      { q: "Additional Notes", a: "Tester unit for Elvive 400ml is stolen/missing. Prices on shelf don't match barcode." }
    ]
  }
];

export const SurveyHistory = () => {
  const navigate = useNavigate();
  const [selectedSurvey, setSelectedSurvey] = useState<typeof historyItems[0] | null>(null);

  return (
    <div className="max-w-md mx-auto bg-[#F9F9FF] min-h-screen pb-32 font-sans relative">
      {/* Detail Modal */}
      <AnimatePresence>
        {selectedSurvey && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedSurvey(null)}
              className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[60] flex items-end sm:items-center justify-center p-0 sm:p-6"
            />
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="fixed bottom-0 sm:relative sm:bottom-auto w-full max-w-md bg-white rounded-t-[2.5rem] sm:rounded-[2.5rem] z-[70] overflow-hidden shadow-2xl flex flex-col max-h-[85vh]"
            >
              <div className="p-8 border-b border-slate-50 flex justify-between items-start sticky top-0 bg-white z-10">
                <div className="flex-1 pr-4">
                  <span className={cn(
                    "px-3 py-1 rounded-lg text-[10px] font-bold uppercase tracking-widest inline-flex items-center gap-1.5 mb-3",
                    selectedSurvey.color === 'emerald' ? "bg-emerald-50 text-emerald-600" :
                    selectedSurvey.color === 'amber' ? "bg-amber-50 text-amber-600" : "bg-rose-50 text-rose-600"
                  )}>
                    <span className={cn("w-1.5 h-1.5 rounded-full", selectedSurvey.color === 'emerald' ? 'bg-emerald-500' : selectedSurvey.color === 'amber' ? 'bg-amber-500' : 'bg-rose-500')} />
                    {selectedSurvey.status}
                  </span>
                  <h3 className="text-xl font-bold text-slate-800 tracking-tight leading-tight">{selectedSurvey.campaign}</h3>
                  <p className="text-sm text-slate-400 font-medium mt-1 uppercase tracking-wider">{selectedSurvey.retailer}</p>
                </div>
                <button 
                  onClick={() => setSelectedSurvey(null)}
                  className="p-3 bg-slate-50 text-slate-400 hover:text-slate-600 rounded-2xl transition-colors shadow-sm"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="p-8 overflow-y-auto space-y-8 pb-12">
                <div className="space-y-6">
                  <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] px-1">Survey Responses</h4>
                  <div className="space-y-4">
                    {selectedSurvey.responses.map((resp, i) => (
                      <div key={i} className="bg-[#F8FAFC] rounded-2xl p-6 border border-slate-100 flex gap-5 group hover:border-indigo-100 transition-colors">
                        <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center text-indigo-500 flex-shrink-0 group-hover:scale-110 transition-transform">
                          {resp.icon ? <resp.icon size={22} /> : <MessageCircle size={22} />}
                        </div>
                        <div className="flex-1">
                          <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-1">{resp.q}</p>
                          <p className="text-base font-bold text-slate-700">{resp.a}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                   <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] px-1">Audit Metadata</h4>
                   <div className="grid grid-cols-2 gap-4">
                      <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100">
                         <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1">Date Submitted</p>
                         <p className="text-sm font-bold text-slate-700">{selectedSurvey.date.split(',')[0]}</p>
                      </div>
                      <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100">
                         <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1">Time Elapsed</p>
                         <p className="text-sm font-bold text-slate-700">12m 40s</p>
                      </div>
                   </div>
                </div>
              </div>

              <div className="p-8 bg-slate-50 border-t border-slate-200 mt-auto">
                <button 
                  onClick={() => setSelectedSurvey(null)}
                  className="w-full py-4 bg-white border border-slate-200 text-slate-600 rounded-2xl font-bold text-sm shadow-sm hover:bg-slate-100 transition-all active:scale-95"
                >
                  Close Details
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
      {/* Header */}
      <header className="px-6 py-8 flex justify-between items-center bg-white sticky top-0 z-50 border-b border-slate-50">
        <button 
          onClick={() => navigate('/agent/portal')}
          className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-full transition-colors"
        >
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-xl font-bold text-slate-800 tracking-tight">Survey History</h1>
        <button className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-full transition-colors">
          <Filter size={24} />
        </button>
      </header>

      <div className="px-6 py-6 space-y-6">
        {/* Search Bar */}
        <div className="relative group">
          <div className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-500 transition-colors">
            <Search size={20} />
          </div>
          <input 
            type="text" 
            placeholder="Search campaigns or retailers..."
            className="w-full bg-white border border-slate-200 rounded-[1.5rem] py-5 pl-14 pr-8 text-sm font-medium focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all shadow-sm"
          />
        </div>

        {/* History List */}
        <div className="space-y-6">
          {historyItems.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              onClick={() => setSelectedSurvey(item)}
              className="bg-white rounded-[2rem] p-8 border border-slate-100 shadow-sm hover:border-indigo-100 transition-all group cursor-pointer active:scale-[0.98]"
            >
              <div className="flex justify-between items-start mb-6">
                <h3 className="text-lg font-bold text-slate-800 tracking-tight leading-tight flex-1 pr-4">{item.campaign}</h3>
                <span className={cn(
                  "px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider flex items-center gap-1.5",
                  item.color === 'emerald' ? "bg-emerald-50 text-emerald-600" :
                  item.color === 'amber' ? "bg-amber-50 text-amber-600" : "bg-rose-50 text-rose-600"
                )}>
                  <span className={cn("w-1.5 h-1.5 rounded-full", 
                    item.color === 'emerald' ? "bg-emerald-500" :
                    item.color === 'amber' ? "bg-amber-500" : "bg-rose-500"
                  )}></span>
                  {item.status}
                </span>
              </div>

              <div className="space-y-3 mb-8">
                <div className="flex items-center gap-3 text-slate-500">
                  <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center text-slate-400">
                    <Store size={18} />
                  </div>
                  <span className="text-sm font-medium">{item.retailer}</span>
                </div>
                <div className="flex items-center gap-3 text-slate-500">
                  <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center text-slate-400">
                    <Clock size={18} />
                  </div>
                  <span className="text-sm font-medium">{item.date}</span>
                </div>
              </div>

              <div className="pt-6 border-t border-slate-50 flex justify-between items-center group-hover:bg-slate-50/50 -mx-8 -mb-8 px-8 pb-8 rounded-b-[2rem] transition-colors">
                <div className={cn(
                  "flex items-center gap-3 text-xs font-bold",
                  item.color === 'rose' ? "text-rose-600" : "text-slate-400"
                )}>
                  <item.footerIcon size={18} />
                  <span>{item.footer}</span>
                </div>
                <ChevronRight size={20} className="text-slate-300 group-hover:translate-x-1 transition-transform" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Floating Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 h-24 bg-white border-t border-slate-100 flex items-center justify-around px-4 z-50 shadow-[0_-10px_25px_-5px_rgba(0,0,0,0.05)]">
        <button 
          onClick={() => navigate('/agent/portal')}
          className="flex flex-col items-center gap-1.5 text-slate-400 hover:text-slate-600 transition-colors"
        >
          <Layout size={22} />
          <span className="text-[10px] font-bold uppercase tracking-widest">Dashboard</span>
        </button>
        <button className="flex flex-col items-center gap-1.5 text-indigo-600">
          <div className="relative">
            <ClipboardList size={22} className="relative z-10" />
            <div className="absolute inset-0 bg-indigo-100 blur-lg opacity-40 scale-150 rounded-full" />
          </div>
          <span className="text-[10px] font-bold uppercase tracking-widest">Surveys</span>
        </button>
        <button className="flex flex-col items-center gap-1.5 text-slate-300 hover:text-slate-400 transition-colors">
          <Users size={22} />
          <span className="text-[10px] font-bold uppercase tracking-widest">Roster</span>
        </button>
        <button className="flex flex-col items-center gap-1.5 text-slate-300 hover:text-slate-400 transition-colors">
          <Settings size={22} />
          <span className="text-[10px] font-bold uppercase tracking-widest">Settings</span>
        </button>
      </nav>
    </div>
  );
};
