
import { motion } from 'motion/react';
import { 
  PieChart, 
  Pie, 
  Cell, 
  ResponsiveContainer, 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip,
} from 'recharts';
import { 
  CheckCircle2, 
  AlertCircle, 
  Clock, 
  ArrowUpRight,
  Filter
} from 'lucide-react';
import { cn } from '../lib/utils';

const complianceData = [
  { name: 'Compliant', value: 74, color: '#10B981' },
  { name: 'Non-Compliant', value: 18, color: '#EF4444' },
  { name: 'Pending Review', value: 8, color: '#F59E0B' },
];

const trendData = [
  { name: 'Week 1', score: 82 },
  { name: 'Week 2', score: 78 },
  { name: 'Week 3', score: 85 },
  { name: 'Week 4', score: 88 },
  { name: 'Week 5', score: 84 },
  { name: 'Week 6', score: 91 },
];

export const SurveyResults = () => {
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Compliance Pie Chart */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl p-8 border border-slate-100 kpi-card-shadow"
        >
          <div className="flex justify-between items-start mb-6">
            <div>
              <h3 className="text-lg font-bold text-slate-900 tracking-tight">Display Compliance</h3>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">Aggregated shelf metrics</p>
            </div>
            <div className="p-2 bg-slate-50 rounded-lg text-slate-400">
              <Filter size={16} />
            </div>
          </div>

          <div className="h-[250px] w-full relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={complianceData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {complianceData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-3xl font-bold text-slate-900">74%</span>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none">Passing</span>
            </div>
          </div>

          <div className="space-y-3 mt-6">
            {complianceData.map((item) => (
              <div key={item.name} className="flex justify-between items-center text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }} />
                  <span className="text-slate-600 font-medium">{item.name}</span>
                </div>
                <span className="font-bold text-slate-900">{item.value}%</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Trend Line Chart */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="lg:col-span-2 bg-white rounded-2xl p-8 border border-slate-100 kpi-card-shadow"
        >
          <div className="flex justify-between items-start mb-8">
            <div>
              <h3 className="text-lg font-bold text-slate-900 tracking-tight">Quality Score Trend</h3>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">Regional performance over time</p>
            </div>
            <div className="flex items-center gap-2 px-3 py-1 bg-emerald-50 text-emerald-600 rounded-full text-xs font-bold">
              <ArrowUpRight size={14} />
              <span>+12.4%</span>
            </div>
          </div>

          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={trendData} margin={{ top: 5, right: 20, left: -20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#94A3B8', fontSize: 11, fontWeight: 600 }}
                  dy={10}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#94A3B8', fontSize: 11, fontWeight: 600 }}
                />
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
                />
                <Line 
                  type="monotone" 
                  dataKey="score" 
                  stroke="#3B82F6" 
                  strokeWidth={4} 
                  dot={{ r: 6, fill: '#3B82F6', strokeWidth: 2, stroke: '#fff' }}
                  activeDot={{ r: 8, strokeWidth: 0 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>

      {/* Audit Log / Table */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white rounded-2xl border border-slate-100 kpi-card-shadow overflow-hidden"
      >
        <div className="p-8 border-bottom border-slate-50 flex justify-between items-center">
          <h3 className="text-lg font-bold text-slate-900 tracking-tight">Recent Survey Submissions</h3>
          <button className="text-blue-600 text-sm font-bold hover:underline">Download CSV</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50 border-y border-slate-100">
                <th className="px-8 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Store / Region</th>
                <th className="px-8 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Agent</th>
                <th className="px-8 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Score</th>
                <th className="px-8 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Status</th>
                <th className="px-8 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {[
                { store: 'Reliance Fresh Pune', region: 'Maharashtra', agent: 'Rahul S.', score: 92, status: 'approved' },
                { store: 'Big Bazaar Hyd', region: 'Telangana', agent: 'Sneha K.', score: 45, status: 'rejected' },
                { store: 'More Megastore Delhi', region: 'Delhi NCR', agent: 'Anita S.', score: 88, status: 'pending' },
                { store: 'DMart Bangalore', region: 'Karnataka', agent: 'Vikram R.', score: 100, status: 'approved' },
              ].map((row, i) => (
                <tr key={i} className="hover:bg-slate-50 transition-colors group">
                  <td className="px-8 py-5">
                    <p className="text-sm font-bold text-slate-800">{row.store}</p>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">{row.region}</p>
                  </td>
                  <td className="px-8 py-5 text-sm font-medium text-slate-600">{row.agent}</td>
                  <td className="px-8 py-5">
                    <span className={cn(
                      "text-sm font-bold font-mono px-2 py-1 rounded-lg",
                      row.score >= 80 ? "text-emerald-600 bg-emerald-50" :
                      row.score >= 50 ? "text-amber-600 bg-amber-50" : "text-rose-600 bg-rose-50"
                    )}>
                      {row.score}%
                    </span>
                  </td>
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-1.5">
                      {row.status === 'approved' ? (
                        <CheckCircle2 size={14} className="text-emerald-500" />
                      ) : row.status === 'rejected' ? (
                        <AlertCircle size={14} className="text-rose-500" />
                      ) : (
                        <Clock size={14} className="text-amber-500" />
                      )}
                      <span className="text-xs font-bold capitalize text-slate-700">{row.status}</span>
                    </div>
                  </td>
                  <td className="px-8 py-5 text-xs font-semibold text-slate-400 tracking-wider">MAR 12, 10:45 AM</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
};
