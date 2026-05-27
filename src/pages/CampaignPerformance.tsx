import  { useState } from 'react';
import { motion } from 'motion/react';
import { 
  BarChart3, 
  Target, 
  TrendingUp, 
  Users, 
  Globe, 
  Calendar,
  Download,
  ArrowUpRight,
  ArrowDownRight,
  Activity,
  Award,
  ChevronDown
} from 'lucide-react';
import { cn } from '../lib/utils';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Cell,
  PieChart,
  Pie
} from 'recharts';

const timeData = [
  { name: 'Week 1', progress: 45, target: 40 },
  { name: 'Week 2', progress: 52, target: 50 },
  { name: 'Week 3', progress: 61, target: 60 },
  { name: 'Week 4', progress: 58, target: 70 },
  { name: 'Week 5', progress: 75, target: 80 },
  { name: 'Week 6', progress: 85, target: 90 },
  { name: 'Week 7', progress: 92, target: 100 },
];

const regionData = [
  { name: 'North America', value: 400, color: '#4F46E5' },
  { name: 'Europe', value: 300, color: '#06B6D4' },
  { name: 'APAC', value: 300, color: '#10B981' },
  { name: 'LATAM', value: 200, color: '#F59E0B' },
];

const agentPerformance = [
  { name: 'Alex R.', score: 98, tasks: 145 },
  { name: 'Sarah J.', score: 92, tasks: 132 },
  { name: 'Marcus T.', score: 88, tasks: 156 },
  { name: 'Emma W.', score: 85, tasks: 118 },
  { name: 'David M.', score: 82, tasks: 124 },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl shadow-2xl">
        <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">{label}</p>
        <div className="space-y-1.5">
          {payload.map((entry: any, index: number) => (
            <div key={index} className="flex items-center justify-between gap-8">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.stroke || entry.fill }} />
                <span className="text-[11px] font-bold text-slate-300 capitalize">{entry.name}</span>
              </div>
              <span className="text-xs font-black text-white">{entry.value}{typeof entry.value === 'number' && entry.name !== 'value' ? '%' : ''}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }
  return null;
};

export const CampaignPerformance = () => {
  const [selectedRegion ] = useState('All Regions');
  const [dateRange ] = useState('Last 30 Days');

  return (
    <div className="p-8 space-y-8 bg-slate-50/30 min-h-screen">
      {/* Header & Global Filters */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-2">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Campaign Performance</h1>
          <p className="text-slate-500 text-sm font-medium mt-1">Real-time KPI tracking and goal visualization</p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex bg-white border border-slate-200 rounded-xl p-1 shadow-sm">
            <FilterButton 
              label={selectedRegion} 
              icon={Globe} 
              onClick={() => {}} 
            />
            <div className="w-[1px] bg-slate-100 my-2 mx-1" />
            <FilterButton 
              label={dateRange} 
              icon={Calendar} 
              onClick={() => {}} 
            />
          </div>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl font-bold flex items-center gap-2 shadow-lg shadow-blue-100 transition-all active:scale-95">
            <Download size={18} />
            <span>Export Report</span>
          </button>
        </div>
      </header>

      {/* KPI Overview Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <KPICard 
          title="Overall Progress"
          value="84.2%"
          target="Goal: 90%"
          trend="+5.4%"
          trendUp={true}
          icon={Activity}
          color="blue"
        />
        <KPICard 
          title="Avg. Shelf Score"
          value="8.7"
          target="Goal: 8.5"
          trend="+0.3"
          trendUp={true}
          icon={Award}
          color="emerald"
        />
        <KPICard 
          title="Conversion Rate"
          value="12.5%"
          target="Goal: 15%"
          trend="-1.2%"
          trendUp={false}
          icon={TrendingUp}
          color="amber"
        />
        <KPICard 
          title="Active Agents"
          value="142"
          target="Peak: 156"
          trend="+8"
          trendUp={true}
          icon={Users}
          color="indigo"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Progress Chart */}
        <div className="lg:col-span-2 bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-sm">
          <div className="flex justify-between items-center mb-10">
            <div>
              <h2 className="text-xl font-bold text-slate-800">Performance vs. Goals</h2>
              <p className="text-sm text-slate-400 font-medium">Trajectory of key campaign objectives</p>
            </div>
            <div className="flex gap-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-blue-600" />
                <span className="text-xs font-bold text-slate-500">Actual</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-slate-200" />
                <span className="text-xs font-bold text-slate-500">Target</span>
              </div>
            </div>
          </div>
          
          <div className="h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={timeData}>
                <defs>
                  <linearGradient id="colorProgress" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#4F46E5" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#4F46E5" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#94A3B8', fontSize: 12, fontWeight: 600 }}
                  dy={10}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#94A3B8', fontSize: 12, fontWeight: 600 }}
                  tickFormatter={(val) => `${val}%`}
                />
                <Tooltip 
                  content={<CustomTooltip />}
                  cursor={{ stroke: '#F1F5F9', strokeWidth: 2 }}
                />
                <Area 
                  type="monotone" 
                  dataKey="progress" 
                  name="Actual Progress"
                  stroke="#4F46E5" 
                  strokeWidth={3}
                  fillOpacity={1} 
                  fill="url(#colorProgress)" 
                  activeDot={{ r: 6, strokeWidth: 0, fill: '#4F46E5' }}
                />
                <Area 
                  type="monotone" 
                  dataKey="target" 
                  name="Target Goal"
                  stroke="#94A3B8" 
                  strokeWidth={2}
                  strokeDasharray="5 5"
                  fill="none" 
                  activeDot={{ r: 4, strokeWidth: 0, fill: '#94A3B8' }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Regional Segmentation */}
        <div className="bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-sm flex flex-col">
          <h2 className="text-xl font-bold text-slate-800 mb-2">Regional Split</h2>
          <p className="text-sm text-slate-400 font-medium mb-8">Performance distribution by area</p>
          
          <div className="flex-1 min-h-[250px] relative flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={regionData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={8}
                  dataKey="value"
                >
                  {regionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-2xl font-black text-slate-800">1.2k</span>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest text-center">Total<br/>Points</span>
            </div>
          </div>

          <div className="space-y-3 mt-8">
            {regionData.map((region) => (
              <div key={region.name} className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: region.color }} />
                  <span className="text-sm font-bold text-slate-600">{region.name}</span>
                </div>
                <span className="text-sm font-black text-slate-800">{region.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Agent Leaderboard */}
        <div className="bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-sm">
          <header className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-xl font-bold text-slate-800">Top Performing Agents</h2>
              <p className="text-sm text-slate-400 font-medium">Ranked by KPI completion score</p>
            </div>
            <button className="text-blue-600 text-sm font-bold hover:underline">Full Leaderboard</button>
          </header>

          <div className="space-y-6">
            {agentPerformance.map((agent, idx) => (
              <div key={agent.name} className="flex flex-col gap-2">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-black text-slate-300 w-4">0{idx + 1}</span>
                    <span className="text-sm font-bold text-slate-700">{agent.name}</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-xs font-bold text-slate-400">{agent.tasks} tasks</span>
                    <span className="text-sm font-black text-blue-600">{agent.score}%</span>
                  </div>
                </div>
                <div className="h-2 bg-slate-50 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${agent.score}%` }}
                    className="h-full bg-blue-600 rounded-full"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Goal Setters */}
        <div className="bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-sm flex flex-col">
          <h2 className="text-xl font-bold text-slate-800 mb-2">Configure Goals</h2>
          <p className="text-sm text-slate-400 font-medium mb-8">Define new targets for this campaign</p>
          
          <div className="space-y-6 flex-1">
            <GoalInput 
              label="Minimum Shelf Score"
              icon={BarChart3}
              value="8.5"
              unit="/10"
            />
            <GoalInput 
              label="Weekly Submission Target"
              icon={Target}
              value="1,200"
              unit="reports"
            />
            <GoalInput 
              label="Max Issue Resolution Time"
              icon={Activity}
              value="24"
              unit="hours"
            />
          </div>

          <button className="w-full bg-slate-800 text-white py-4 rounded-2xl font-bold text-sm mt-8 hover:bg-slate-900 transition-all active:scale-95 shadow-lg">
            Update Targets
          </button>
        </div>
      </div>
    </div>
  );
};

const KPICard = ({ title, value, target, trend, trendUp, icon: Icon, color }: any) => {
  const colorMap: any = {
    blue: 'bg-blue-50 text-blue-600 border-blue-600',
    emerald: 'bg-emerald-50 text-emerald-600 border-emerald-600',
    amber: 'bg-amber-50 text-amber-600 border-amber-600',
    indigo: 'bg-indigo-50 text-indigo-600 border-indigo-600'
  };

  return (
    <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm group hover:border-blue-100 transition-all">
      <div className="flex justify-between items-start mb-4">
        <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center", colorMap[color].split(' ')[0], colorMap[color].split(' ')[1])}>
          <Icon size={20} />
        </div>
        <div className={cn(
          "flex items-center gap-0.5 text-[10px] font-bold px-2 py-1 rounded-lg",
          trendUp ? "text-emerald-500 bg-emerald-50" : "text-rose-500 bg-rose-50"
        )}>
          {trendUp ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
          {trend}
        </div>
      </div>
      <div>
        <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{title}</h3>
        <p className="text-2xl font-black text-slate-800 mt-1">{value}</p>
        <p className="text-[10px] font-bold text-slate-400 mt-1">{target}</p>
      </div>
    </div>
  );
};

const FilterButton = ({ label, icon: Icon, onClick }: any) => (
  <button 
    onClick={onClick}
    className="flex items-center gap-2 px-4 py-2 hover:bg-slate-50 rounded-lg transition-colors group"
  >
    <Icon size={16} className="text-slate-400 group-hover:text-blue-600 transition-colors" />
    <span className="text-xs font-bold text-slate-700">{label}</span>
    <ChevronDown size={14} className="text-slate-300" />
  </button>
);

const GoalInput = ({ label, icon: Icon, value, unit }: any) => (
  <div className="space-y-2">
    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-1">{label}</label>
    <div className="relative group">
      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors">
        <Icon size={18} />
      </div>
      <input 
        type="text" 
        defaultValue={value}
        className="w-full bg-slate-50 border border-slate-100 rounded-xl py-3 pl-12 pr-12 text-sm font-bold text-slate-700 focus:outline-none focus:ring-4 focus:ring-blue-600/5 focus:border-blue-600 transition-all"
      />
      <div className="absolute right-4 top-1/2 -translate-y-1/2 text-[10px] font-black text-slate-300 uppercase">
        {unit}
      </div>
    </div>
  </div>
);
