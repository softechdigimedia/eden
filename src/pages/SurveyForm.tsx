import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  ArrowLeft, 
  MoreVertical, 
  Store, 
  Package, 
  Star, 
  Camera, 
  Send,
  CheckCircle2,
  ChevronDown
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { cn } from '../lib/utils';

export const SurveyForm = () => {
  const navigate = useNavigate();
  const [submitted, setSubmitted] = useState(false);
  const [rating, setRating] = useState<number | null>(null);
  const [condition, setCondition] = useState<string | null>('Excellent');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      navigate('/agent/portal');
    }, 2000);
  };

  if (submitted) {
    return (
      <div className="fixed inset-0 bg-white z-[60] flex flex-col items-center justify-center p-8 text-center">
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", damping: 15 }}
        >
          <div className="w-24 h-24 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mb-8 mx-auto">
            <CheckCircle2 size={48} />
          </div>
          <h2 className="text-2xl font-bold text-slate-800 mb-4">Survey Submitted!</h2>
          <p className="text-slate-500 font-medium leading-relaxed">
            Your audit for Nestlé KitKat at Sector 7 has been successfully recorded. Redirecting to portal...
          </p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto bg-[#F9F9FF] min-h-screen font-sans flex flex-col pb-24">
      {/* Header */}
      <header className="px-6 py-6 flex justify-between items-center bg-white sticky top-0 z-50 border-b border-slate-50">
        <button 
          onClick={() => navigate('/agent/portal')}
          className="p-2 text-slate-800 hover:bg-slate-50 rounded-full transition-colors"
        >
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-lg font-bold text-slate-800 tracking-tight">Survey Form</h1>
        <button className="p-2 text-slate-800 hover:bg-slate-50 rounded-full transition-colors">
          <MoreVertical size={24} />
        </button>
      </header>

      <form onSubmit={handleSubmit} className="p-6 space-y-8 flex-1">
        {/* Mission Info Card */}
        <div className="bg-[#EEEFFF] rounded-[2rem] p-6 relative overflow-hidden">
          <div className="absolute top-4 right-4 bg-[#1E293B] text-white px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-lg">
            <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></span>
            GPS Active: Store #882
          </div>
          
          <div className="mt-8">
            <p className="text-[#6366F1] text-[11px] font-bold uppercase tracking-[0.2em] mb-2">Active Mission</p>
            <h2 className="text-xl font-bold text-slate-900 mb-2">Retail Audit: Nestlé KitKat</h2>
            <div className="flex items-center gap-2 text-slate-500 text-sm">
              <span className="font-medium">Sector 7 - Downtown Commercial Hub</span>
            </div>
          </div>
          
          {/* Decorative elements to match mockup style */}
          <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-white/20 blur-2xl rounded-full" />
        </div>

        {/* Retailer Name */}
        <div className="space-y-3">
          <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-1">Retailer Name</label>
          <div className="relative">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
              <Store size={20} />
            </div>
            <input 
              type="text" 
              placeholder="Enter branch location"
              className="w-full bg-white border border-slate-200 rounded-2xl py-4 pl-12 pr-6 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all shadow-sm"
              required
            />
          </div>
        </div>

        {/* Stock Level */}
        <div className="space-y-3">
          <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-1">Stock Level of KitKat</label>
          <div className="relative">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
              <Package size={20} />
            </div>
            <select 
              className="w-full bg-white border border-slate-200 rounded-2xl py-4 pl-12 pr-12 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all shadow-sm appearance-none cursor-pointer"
              required
            >
              <option value="" disabled selected>Select level</option>
              <option>Full Distribution</option>
              <option>Medium Stock</option>
              <option>Low Stock</option>
              <option>Out of Stock</option>
            </select>
            <div className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
              <ChevronDown size={20} />
            </div>
          </div>
        </div>

        {/* Shelf Visibility */}
        <div className="space-y-3">
          <div className="bg-white p-6 rounded-[1.5rem] border border-slate-100 shadow-sm space-y-4">
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Shelf Visibility</p>
            <div className="flex items-center justify-between gap-2">
              <span className="text-[10px] font-bold text-slate-400">Poor</span>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setRating(s)}
                    className={cn(
                      "w-10 h-10 rounded-lg flex items-center justify-center transition-all border",
                      rating && s <= rating 
                        ? "bg-blue-600 border-blue-600 text-white shadow-lg shadow-blue-200" 
                        : "bg-white border-slate-200 text-slate-400 hover:border-blue-300"
                    )}
                  >
                    <Star size={20} fill={rating && s <= rating ? "currentColor" : "none"} />
                  </button>
                ))}
              </div>
              <span className="text-[10px] font-bold text-slate-400">Optimal</span>
            </div>
          </div>
        </div>

        {/* Promotional Display Condition */}
        <div className="space-y-3">
          <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-1">Promotional Display Condition</label>
          <div className="grid grid-cols-2 gap-4">
            {['Excellent', 'Good', 'Poor', 'Missing'].map((opt) => (
              <button
                key={opt}
                type="button"
                onClick={() => setCondition(opt)}
                className={cn(
                  "p-5 rounded-2xl border text-sm font-bold flex items-center gap-3 transition-all",
                  condition === opt 
                    ? "bg-white border-blue-600 text-blue-600 ring-4 ring-blue-50 shadow-md shadow-blue-100" 
                    : "bg-white border-slate-200 text-slate-600 hover:border-slate-300 shadow-sm"
                )}
              >
                <div className={cn(
                  "w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all",
                  condition === opt ? "border-blue-600 bg-blue-600" : "border-slate-200"
                )}>
                  {condition === opt && <div className="w-1.5 h-1.5 bg-white rounded-full" />}
                </div>
                {opt}
              </button>
            ))}
          </div>
        </div>

        {/* Store Photo Evidence */}
        <div className="space-y-3">
          <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-1">Store Photo Evidence</label>
          <div className="border-2 border-dashed border-slate-200 rounded-[2rem] bg-indigo-50/30 p-10 flex flex-col items-center justify-center text-center group hover:border-blue-400 hover:bg-slate-50 transition-all cursor-pointer">
            <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-blue-600 shadow-xl shadow-blue-100 mb-6 group-hover:scale-110 transition-transform">
              <Camera size={32} />
            </div>
            <p className="font-bold text-slate-800 mb-1">Upload Photo</p>
            <p className="text-xs text-slate-400 font-medium">JPEG or PNG up to 10MB</p>
          </div>
        </div>

        {/* Additional Comments */}
        <div className="space-y-3">
          <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-1">Additional Comments</label>
          <textarea 
            rows={4}
            placeholder="Describe any shelf maintenance issues or competitor placement..."
            className="w-full bg-white border border-slate-200 rounded-[1.5rem] p-6 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all shadow-sm resize-none"
          />
        </div>
      </form>

      {/* Footer Submit Button */}
      <div className="sticky bottom-0 p-6 bg-white border-t border-slate-50 ring-1 ring-slate-100">
        <button 
          onClick={handleSubmit}
          className="w-full py-5 bg-[#4338CA] text-white rounded-2xl font-bold flex items-center justify-center gap-3 shadow-xl shadow-blue-100 active:scale-[0.98] hover:bg-blue-800 transition-all"
        >
          <Send size={18} className="rotate-[-10deg]" />
          <span>Submit Survey</span>
        </button>
      </div>
    </div>
  );
};
