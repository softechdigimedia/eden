import React from 'react';
import { motion } from 'motion/react';
import { 
  ChevronRight,
  Layers,
  FileText,
  Megaphone,
  Inbox,
  Download,
  Star,

  TrendingUp,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';
import { cn } from '../lib/utils';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  Tooltip, 
  ResponsiveContainer,
  Cell
} from 'recharts';

const performanceData = [
  { name: 'Mon', value: 400 },
  { name: 'Tue', value: 700 },
  { name: 'Wed', value: 550 },
  { name: 'Thu', value: 900 },
  { name: 'Fri', value: 1100 },
  { name: 'Sat', value: 800 },
  { name: 'Sun', value: 1200 },
];

const topAgents = [
  { id: 'a1', name: 'Jason Davis', submissions: 142, score: 98, rank: 1, trend: 'up', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80', region: 'North America' },
  { id: 'a2', name: 'Elena Lopez', submissions: 128, score: 95, rank: 2, trend: 'stable', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80', region: 'Western Europe' },
  { id: 'a3', name: 'Marcus Wright', submissions: 115, score: 92, rank: 3, trend: 'down', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80', region: 'APAC Region' },
];

const reports = [
  { id: 1, name: 'Q3 Brand Visibility Audit', user: 'Alex Rivera', market: 'Northeast Region', status: 'Completed', color: 'emerald' },
  { id: 2, name: 'Shelf Presence - CVS Pharm', user: 'Sarah Jenkins', market: 'Southeast Dist.', status: 'Processing', color: 'amber' },
  { id: 3, name: 'Lead Conversion Analysis', user: 'Marcus Thorne', market: 'West Coast', status: 'Completed', color: 'emerald' },
];

export const ClientDashboard = () => {
  return (
    <div className="p-8 space-y-8 bg-slate-50/50 min-h-screen relative">
      {/* Header */}
      <header className="flex justify-between items-center mb-10">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Field Operations</h1>
          <p className="text-slate-500 text-sm font-medium mt-1">Global marketing visibility dashboard</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-6 text-sm font-semibold text-slate-500 mr-8">
            <button className="text-indigo-600 border-b-2 border-indigo-600 pb-1">Overview</button>
            <button className="hover:text-slate-800 transition-colors">Performance</button>
            <button className="hover:text-slate-800 transition-colors">Visibility</button>
          </div>
        </div>
      </header>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          icon={Megaphone}
          label="Campaign Reach"
          value="1.2M"
          trend="+12.4%"
          trendUp={true}
          progress={65}
          color="indigo"
        />
        <StatCard 
          icon={Layers}
          label="Average Shelf Score"
          value="8.4"
          suffix="/10"
          trend="+3.1%"
          trendUp={true}
          progress={75}
          color="orange"
        />
        <StatCard 
          icon={Star}
          label="Lead Quality Index"
          value="92"
          trend="-0.8%"
          trendUp={false}
          progress={85}
          color="blue"
        />
        <StatCard 
          icon={Inbox}
          label="Total Survey Submissions"
          value="4,829"
          isNew={true}
          progress={50}
          color="slate"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Chart */}
        <div className="lg:col-span-2 bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-sm flex flex-col">
          <div className="flex justify-between items-center mb-10">
            <div>
              <h2 className="text-xl font-bold text-slate-800">Campaign Performance</h2>
              <p className="text-sm text-slate-400 font-medium mt-1">ROI and Engagement Tracking over 30 days</p>
            </div>
            <div className="flex bg-slate-50 p-1.5 rounded-xl border border-slate-100">
              <button className="px-4 py-1.5 text-xs font-bold text-slate-500 rounded-lg hover:text-slate-800 transition-all">Daily</button>
              <button className="px-4 py-1.5 text-xs font-bold text-white bg-indigo-600 rounded-lg shadow-md shadow-indigo-100">Weekly</button>
            </div>
          </div>
          
          <div className="flex-1 min-h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={performanceData}>
                <Bar dataKey="value" radius={[12, 12, 0, 0]}>
                  {performanceData.map((_entry: { value: number }, index: number) => (
                    <Cell key={`cell-${index}`} fill={index === performanceData.length - 1 ? '#4F46E5' : '#4F46E5'} fillOpacity={index === performanceData.length - 1 ? 1 : 0.8} />
                  
                 
                 ))}
                </Bar>
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#94A3B8', fontSize: 12, fontWeight: 600 }}
                  dy={10}
                />
                <Tooltip 
                  cursor={{ fill: '#F8FAFC' }}
                  contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Location Card */}
        <div className="bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-sm">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-xl font-bold text-slate-800">Top Retail Locations</h2>
              <p className="text-sm text-slate-400 font-medium mt-1">Market Visibility by Region</p>
            </div>
          </div>
          
          <div className="relative rounded-[2rem] overflow-hidden mb-8 shadow-inner border border-slate-50">
            <img 
              src="https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&q=80&w=1000" 
              alt="Map"
              className="w-full h-64 object-cover opacity-80"
            />
            {/* Mock markers overlay */}
            <div className="absolute inset-0 bg-indigo-900/10" />
            <div className="absolute top-1/4 left-1/3 w-4 h-4 bg-indigo-600 rounded-full border-4 border-white shadow-lg animate-pulse" />
            <div className="absolute bottom-1/3 right-1/4 w-4 h-4 bg-orange-500 rounded-full border-4 border-white shadow-lg" />
            <div className="absolute top-1/2 right-1/2 w-4 h-4 bg-blue-500 rounded-full border-4 border-white shadow-lg" />
          </div>

          <div className="flex justify-between items-end">
            <div>
              <h4 className="text-sm font-bold text-slate-800">Manhattan Hub</h4>
              <p className="text-xs text-slate-400 font-medium mt-1 flex items-center gap-1">
                <TrendingUp size={12} className="text-emerald-500" />
                <span>Steady growth this quarter</span>
              </p>
            </div>
            <div className="text-right">
              <span className="text-lg font-bold text-indigo-600">98%</span>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-0.5">Visibility</p>
            </div>
          </div>
        </div>

        {/* Top Performing Agents */}
        <div className="bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-sm flex flex-col h-full">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-xl font-bold text-slate-800">Top Performing Agents</h2>
              <p className="text-sm text-slate-400 font-medium mt-1">Leading field operatives by metrics</p>
            </div>
            <button className="text-xs font-bold text-indigo-600 hover:underline">View All</button>
          </div>
          
          <div className="space-y-6 flex-1">
            {topAgents.map((agent) => (
              <motion.div 
                key={agent.id} 
                whileHover={{ x: 4 }}
                onClick={() => {}}
                className="flex items-center justify-between p-4 rounded-2xl hover:bg-slate-50 transition-all cursor-default group border border-transparent"
              >
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <img src={agent.avatar} className="w-12 h-12 rounded-[1.25rem] object-cover shadow-sm group-hover:shadow-md transition-shadow" alt={agent.name} />
                    <div className={cn(
                      "absolute -top-2 -left-2 w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-black text-white shadow-lg border-2 border-white",
                      agent.rank === 1 ? "bg-amber-400" : agent.rank === 2 ? "bg-slate-400" : "bg-orange-600"
                    )}>
                      {agent.rank}
                    </div>
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800 leading-tight group-hover:text-indigo-600 transition-colors">{agent.name}</h4>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">{agent.region}</p>
                  </div>
                </div>
                <div className="text-right flex items-center gap-4">
                  <div>
                    <p className="text-sm font-black text-slate-800">{agent.score}%</p>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Score</p>
                  </div>
                  <ChevronRight size={16} className="text-slate-300 group-hover:text-indigo-400 group-hover:translate-x-1 transition-all" />
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-8 pt-8 border-t border-slate-50">
             <div className="flex items-center justify-between text-xs font-bold text-slate-400 uppercase tracking-widest">
               <span>Team Average Score</span>
               <span className="text-slate-800">89.4%</span>
             </div>
             <div className="mt-4 h-2 bg-slate-50 rounded-full overflow-hidden">
               <div className="h-full bg-indigo-600 rounded-full w-[89%]" />
             </div>
          </div>
        </div>
      </div>

      {/* Reports Table */}
      <div className="bg-white rounded-[2.5rem] overflow-hidden border border-slate-100 shadow-sm">
        <div className="p-8 flex justify-between items-center bg-white border-b border-slate-50">
          <h2 className="text-xl font-bold text-slate-800">Recent Reports</h2>
          <button className="text-indigo-600 text-sm font-bold hover:underline">View All Reports</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-slate-50/50">
                <th className="px-8 py-5 text-left text-[10px] font-bold text-slate-400 uppercase tracking-widest">Report Name</th>
                <th className="px-8 py-5 text-left text-[10px] font-bold text-slate-400 uppercase tracking-widest">Generated By</th>
                <th className="px-8 py-5 text-left text-[10px] font-bold text-slate-400 uppercase tracking-widest">Market</th>
                <th className="px-8 py-5 text-left text-[10px] font-bold text-slate-400 uppercase tracking-widest">Status</th>
                <th className="px-8 py-5 text-center text-[10px] font-bold text-slate-400 uppercase tracking-widest">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {reports.map((report) => (
                <tr key={report.id} className="group hover:bg-slate-50/50 transition-colors">
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-4">
                      <div className={cn(
                        "w-10 h-10 rounded-xl flex items-center justify-center",
                        report.id === 1 ? "bg-emerald-50 text-emerald-500" :
                        report.id === 2 ? "bg-amber-50 text-amber-500" : "bg-indigo-50 text-indigo-500"
                      )}>
                        <FileText size={20} />
                      </div>
                      <span className="font-bold text-slate-700">{report.name}</span>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full overflow-hidden border border-slate-100 shadow-sm flex-shrink-0 bg-slate-50">
                        <img 
                          src={`https://i.pravatar.cc/150?u=${encodeURIComponent(report.user)}`} 
                          className="w-full h-full object-cover" 
                          alt={report.user} 
                        />
                      </div>
                      <span className="text-sm font-bold text-slate-700">{report.user}</span>
                    </div>
                  </td>
                  <td className="px-8 py-6 text-sm font-medium text-slate-500">{report.market}</td>
                  <td className="px-8 py-6">
                    <span className={cn(
                      "px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider flex items-center gap-1.5 w-fit",
                      report.color === 'emerald' ? "bg-emerald-50 text-emerald-600" : "bg-amber-50 text-amber-600"
                    )}>
                      <span className={cn("w-1.5 h-1.5 rounded-full", report.color === 'emerald' ? 'bg-emerald-500' : 'bg-amber-500')} />
                      {report.status}
                    </span>
                  </td>
                  <td className="px-8 py-6 text-center">
                    <button className="p-2 text-slate-300 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all">
                      <Download size={20} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

interface StatCardProps {
  icon: React.ElementType;
  label: string;
  value: string;
  suffix?: string;
  trend?: string;
  trendUp?: boolean;
  isNew?: boolean;
  progress: number;
  color: string;
}

const StatCard = ({ icon: Icon, label, value, suffix, trend, trendUp, isNew, progress, color }: StatCardProps) => {
  const getColors = () => {
    switch (color) {
      case 'indigo': return 'bg-indigo-50 text-indigo-600 border-indigo-600';
      case 'orange': return 'bg-orange-50 text-orange-600 border-orange-700/50';
      case 'blue': return 'bg-blue-50 text-blue-600 border-blue-600';
      default: return 'bg-slate-50 text-slate-600 border-slate-400';
    }
  };

  return (
    <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm relative overflow-hidden group hover:border-indigo-100 transition-all">
      <div className="flex justify-between items-start mb-6">
        <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center", getColors().split(' ')[0], getColors().split(' ')[1])}>
          <Icon size={24} />
        </div>
        {trend && (
          <div className={cn(
            "flex items-center gap-1 text-[11px] font-bold px-2 py-1 rounded-lg",
            trendUp ? "text-emerald-500 bg-emerald-50" : "text-rose-500 bg-rose-50"
          )}>
            {trendUp ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
            {trend}
          </div>
        )}
        {isNew && (
          <div className="bg-blue-50 text-blue-600 px-3 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider">
            New
          </div>
        )}
      </div>
      
      <div className="space-y-1 mb-8">
        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">{label}</p>
        <div className="flex items-baseline gap-1">
          <span className="text-3xl font-black text-slate-800 tracking-tight">{value}</span>
          {suffix && <span className="text-slate-300 font-bold text-lg">{suffix}</span>}
        </div>
      </div>

      <div className="relative h-2 bg-slate-50 rounded-full overflow-hidden">
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          className={cn("absolute inset-y-0 left-0 rounded-full", getColors().split(' ')[2].replace('border-', 'bg-'))}
        />
      </div>
    </div>
  );
};
