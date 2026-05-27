import { motion } from 'motion/react';
import { 
  Download, 
  TrendingUp, 
  CheckCircle2, 
  BarChart3, 
  ChevronRight,
  MoreVertical,
  Scale,
  RefreshCw
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  XAxis, 
  CartesianGrid, 
  Tooltip,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { cn } from '../lib/utils';

const leadVolumeData = [
  { name: 'Mon', value: 400 },
  { name: 'Tue', value: 300 },
  { name: 'Wed', value: 800 },
  { name: 'Thu', value: 450 },
  { name: 'Fri', value: 900 },
  { name: 'Sat', value: 600 },
  { name: 'Sun', value: 850 },
];

const surveyDistribution = [
  { name: 'Completed', value: 8942, color: '#3b82f6' },
  { name: 'Pending', value: 1244, color: '#fee2e2' }, // Soft red/peach in image
];

const employeeLeads = [
  { name: 'Priya Sharma (HUL North)', leads: 2401, target: 3000 },
  { name: 'Michael Chen (Nestlé West)', leads: 2188, target: 3000 },
  { name: 'Sarah Jenkins (HUL South)', leads: 1940, target: 3000 },
  { name: 'Rahul Kapoor (Nestlé East)', leads: 1620, target: 3000 },
  { name: 'Anita Desai (HUL Central)', leads: 1410, target: 3000 },
];

const reportExports = [
  { id: 1, name: 'Weekly_Leads_Audit_Q4.csv', client: 'HUL', date: 'Oct 24, 2023 • 10:45 AM', status: 'Completed' },
  { id: 2, name: 'Nestle_In-Store_Visibility_Final.csv', client: 'NESTLÉ', date: 'Oct 23, 2023 • 04:20 PM', status: 'Completed' },
  { id: 3, name: 'Monthly_Campaign_Snapshot_HUL.xlsx', client: 'HUL', date: 'Oct 22, 2023 • 09:12 AM', status: 'Processing' },
  { id: 4, name: 'Compliance_Audit_National_Agg.csv', client: 'ALL BRANDS', date: 'Oct 20, 2023 • 11:58 PM', status: 'Failed' },
];

export const ManagerReports = () => {
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">
            <span>Manager</span>
            <ChevronRight size={12} />
            <span className="text-blue-600">Reports</span>
          </div>
          <h1 className="text-3xl font-bold text-slate-800 tracking-tight">Manager Reports</h1>
        </div>
        <button className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-2xl text-sm font-bold shadow-lg shadow-blue-100 hover:bg-blue-700 transition-all active:scale-95">
          <Download size={20} />
          <span>Export CSV</span>
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm relative overflow-hidden group">
          <div className="flex justify-between items-start mb-6">
            <div>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1">TOTAL LEADS (TEAM)</p>
              <h3 className="text-3xl font-black text-slate-800 tracking-tight">12,482</h3>
            </div>
            <div className="p-3 bg-blue-50 text-blue-600 rounded-2xl">
              <BarChart3 size={24} />
            </div>
          </div>
          <div className="flex items-center gap-2 text-emerald-500 font-bold text-xs uppercase tracking-widest">
            <TrendingUp size={14} />
            <span>+12.5% vs last month</span>
          </div>
        </div>

        <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm relative overflow-hidden group">
          <div className="flex justify-between items-start mb-6">
            <div>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1">AVG LEAD QUALITY SCORE</p>
              <h3 className="text-3xl font-black text-slate-800 tracking-tight">8.4<span className="text-lg text-slate-300">/10</span></h3>
            </div>
            <div className="p-3 bg-amber-50 text-amber-600 rounded-2xl">
              <Scale size={24} />
            </div>
          </div>
          <div className="flex items-center gap-2 text-amber-500 font-bold text-xs uppercase tracking-widest">
            <RefreshCw size={14} />
            <span>Stable from Q3</span>
          </div>
        </div>

        <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm relative overflow-hidden group">
          <div className="flex justify-between items-start mb-6">
            <div>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1">CAMPAIGN COMPLETION %</p>
              <h3 className="text-3xl font-black text-slate-800 tracking-tight">94.2%</h3>
            </div>
            <div className="p-3 bg-emerald-50 text-emerald-600 rounded-2xl">
              <CheckCircle2 size={24} />
            </div>
          </div>
          <div className="text-[10px] font-bold text-blue-600 uppercase tracking-widest">
            Project: Nestlé Retail Audit
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        {/* Leads by Employee */}
        <div className="lg:col-span-3 bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden">
          <div className="flex justify-between items-center mb-10">
            <div>
              <h3 className="text-xl font-bold text-slate-800 tracking-tight">Leads by Employee</h3>
              <p className="text-slate-400 text-sm font-medium mt-1">Top 5 performing agents across HUL & Nestlé campaigns</p>
            </div>
            <button className="p-2 text-slate-300 hover:text-slate-600">
               <MoreVertical size={20} />
            </button>
          </div>
          <div className="space-y-8">
             {employeeLeads.map((emp) => (
               <div key={emp.name}>
                 <div className="flex justify-between items-end mb-2">
                    <span className="text-xs font-bold text-slate-600 tracking-tight">{emp.name}</span>
                    <span className="text-[10px] font-black text-slate-800 uppercase tracking-widest">{emp.leads.toLocaleString()} leads</span>
                 </div>
                 <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${(emp.leads / emp.target) * 100}%` }}
                      className="h-full bg-blue-600 rounded-full"
                    />
                 </div>
               </div>
             ))}
          </div>
        </div>

        {/* Survey Status Distribution */}
        <div className="lg:col-span-2 bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-sm">
          <h3 className="text-xl font-bold text-slate-800 tracking-tight">Survey Status Distribution</h3>
          <p className="text-slate-400 text-sm font-medium mt-1 mb-8">Active campaign health metrics</p>
          
          <div className="h-[250px] relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={surveyDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={70}
                  outerRadius={90}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {surveyDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
               <p className="text-3xl font-black text-slate-800">10,186</p>
               <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Total Surveys</p>
            </div>
          </div>
          
          <div className="flex justify-center gap-12 mt-8">
             <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-blue-500" />
                <div>
                   <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">COMPLETED</p>
                   <p className="text-sm font-bold text-slate-800">8,942</p>
                </div>
             </div>
             <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-red-100" />
                <div>
                   <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">PENDING</p>
                   <p className="text-sm font-bold text-slate-800">1,244</p>
                </div>
             </div>
          </div>
        </div>
      </div>

      {/* Lead Volume Area Chart */}
      <div className="bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden">
        <div className="mb-10">
          <h3 className="text-xl font-bold text-slate-800 tracking-tight">Lead Volume Over Last 7 Days</h3>
          <p className="text-slate-400 text-sm font-medium mt-1">Daily aggregate across all field teams</p>
        </div>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={leadVolumeData}>
              <defs>
                <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.1}/>
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis 
                dataKey="name" 
                axisLine={false} 
                tickLine={false} 
                tick={{ fontSize: 10, fontWeight: 'bold', fill: '#94a3b8' }} 
              />
              <Tooltip 
                contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
              />
              <Area 
                type="monotone" 
                dataKey="value" 
                stroke="#3b82f6" 
                strokeWidth={4}
                fillOpacity={1} 
                fill="url(#colorValue)" 
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Report Exports */}
      <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden">
        <div className="p-10 border-b border-slate-50 flex justify-between items-center">
          <h3 className="text-xl font-bold text-slate-800 tracking-tight">Recent Report Exports</h3>
          <button className="text-xs font-black text-blue-600 uppercase tracking-widest hover:underline">View All</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-slate-50">
                <th className="px-10 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">REPORT NAME</th>
                <th className="px-10 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">CLIENT</th>
                <th className="px-10 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">DATE GENERATED</th>
                <th className="px-10 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">STATUS</th>
                <th className="px-10 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">ACTION</th>
              </tr>
            </thead>
            <tbody>
              {reportExports.map((report) => (
                <tr key={report.id} className="border-b border-slate-50 hover:bg-slate-50 transition-colors">
                  <td className="px-10 py-6">
                    <p className="text-sm font-bold text-slate-800 tracking-tight">{report.name}</p>
                  </td>
                  <td className="px-10 py-6">
                    <span className="px-2 py-1 bg-blue-50 text-blue-600 rounded text-[9px] font-black uppercase tracking-widest border border-blue-100">
                      {report.client}
                    </span>
                  </td>
                  <td className="px-10 py-6">
                    <p className="text-xs font-medium text-slate-500">{report.date}</p>
                  </td>
                  <td className="px-10 py-6">
                    <div className="flex items-center gap-2">
                       <div className={cn(
                         "w-2 h-2 rounded-full",
                         report.status === 'Completed' ? "bg-emerald-500" :
                         report.status === 'Processing' ? "bg-amber-500" : "bg-rose-500"
                       )} />
                       <span className={cn(
                         "text-[10px] font-black uppercase tracking-widest",
                         report.status === 'Completed' ? "text-emerald-500" :
                         report.status === 'Processing' ? "text-amber-500" : "text-rose-500"
                       )}>{report.status}</span>
                    </div>
                  </td>
                  <td className="px-10 py-6">
                    <button className="text-blue-500 hover:text-blue-700">
                      {report.status === 'Failed' ? <RefreshCw size={18} /> : <Download size={18} />}
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
