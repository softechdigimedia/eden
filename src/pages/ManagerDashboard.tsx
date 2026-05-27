import React from 'react';
import { useLocation } from 'react-router-dom';
import { 
  Users, 
  Target, 
  Zap, 
  Clock,
  ChevronRight,
  TrendingUp,
  TrendingDown,
  Filter,
  Plus,
  LayoutGrid,
  List,
  AlertCircle,
  Activity,
  History,
  X,
  MapPin,
  FileText,
  FileBarChart,
  ShieldAlert,
  Check,
  ListTodo,
  UserPlus,
  Flag,
  Trash2,
  Inbox
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';
import { FieldPosts } from './FieldPosts';
import { ManagerReports } from './ManagerReports';
import { LeadPipeline } from './LeadPipeline';
import { 
  APIProvider, 
  Map, 
  AdvancedMarker, 

} from '@vis.gl/react-google-maps';
import { 
  LineChart, 
  Line, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';

const API_KEY =
  import.meta.env.GOOGLE_MAPS_PLATFORM_KEY ||
  (import.meta as any).env?.VITE_GOOGLE_MAPS_PLATFORM_KEY ||
  (globalThis as any).GOOGLE_MAPS_PLATFORM_KEY ||
  '';
const hasValidKey = Boolean(API_KEY) && API_KEY !== 'YOUR_API_KEY';

const kpis = [
  {
    title: "Team Conversion Rate",
    value: "68.4%",
    trend: "+12.4%",
    icon: TrendingUp,
    color: "blue",
    progress: 70
  },
  {
    title: "Pending Approvals",
    value: "24",
    trend: "High Priority",
    subtitle: "Avg response time: 2.4h",
    icon: Clock,
    color: "amber"
  },
  {
    title: "Campaign Progress (%)",
    value: "82%",
    trend: "8 Active",
    icon: Zap,
    color: "indigo",
    agents: [
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
    ]
  },
  {
    title: "Active Agents",
    value: "142",
    trend: "Live",
    subtitle: "Across 12 retail territories",
    icon: Users,
    color: "emerald"
  }
];

const feed = [
  { agent: 'Sarah Miller', time: '2 minutes ago', campaign: 'Summer Retail Launch 2024', status: 'Completed', verification: 'Review Photos', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80' },
  { agent: 'Robert King', time: '15 minutes ago', campaign: 'Quarterly Brand Audit', status: 'In-Progress', verification: 'Track Location', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80' },
  { agent: 'Liam Chen', time: '24 minutes ago', campaign: 'Competitor Pricing Survey', status: 'Overdue', verification: 'Escalate', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80' },
  { agent: 'Anna Fischer', time: '48 minutes ago', campaign: 'Store Manager Feedback', status: 'Pending', verification: 'Verify Data', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80' },
];

const leaderboard = [
  { 
    id: 'a1',
    name: 'Jason Davis', 
    submissions: 42, 
    score: 98, 
    rank: 1, 
    trend: 'up', 
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    region: 'North America',
    location: { lat: 40.7128, lng: -74.0060 },
    efficiency: '96%',
    accuracy: '99%',
    activity: [
      { id: 1, type: 'Submission', title: 'Luxury Retail Audit', time: '2h ago', status: 'Approved' },
      { id: 2, type: 'Survey', title: 'Brand Visibility Check', time: '5h ago', status: 'Pending' },
      { id: 3, type: 'Audit', title: 'Stock Availability Survey', time: 'Yesterday', status: 'Approved' },
    ],
    weeklyPerformance: [
      { day: 'Mon', value: 12 },
      { day: 'Tue', value: 18 },
      { day: 'Wed', value: 15 },
      { day: 'Thu', value: 22 },
      { day: 'Fri', value: 30 },
      { day: 'Sat', value: 25 },
      { day: 'Sun', value: 20 },
    ]
  },
  { 
    id: 'a2',
    name: 'Elena Lopez', 
    submissions: 38, 
    score: 95, 
    rank: 2, 
    trend: 'stable', 
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    region: 'Western Europe',
    location: { lat: 51.5074, lng: -0.1278 },
    efficiency: '94%',
    accuracy: '97%',
    activity: [
      { id: 1, type: 'Submission', title: 'Store Display Audit', time: '1h ago', status: 'Approved' },
      { id: 2, type: 'Survey', title: 'Customer Feedback', time: '4h ago', status: 'Approved' },
      { id: 3, type: 'Audit', title: 'Inventory Reconciliation', time: 'Yesterday', status: 'Approved' },
    ],
    weeklyPerformance: [
      { day: 'Mon', value: 10 },
      { day: 'Tue', value: 15 },
      { day: 'Wed', value: 18 },
      { day: 'Thu', value: 20 },
      { day: 'Fri', value: 25 },
      { day: 'Sat', value: 22 },
      { day: 'Sun', value: 18 },
    ]
  },
  { 
    id: 'a3',
    name: 'Marcus Wright', 
    submissions: 35, 
    score: 92, 
    rank: 3, 
    trend: 'down', 
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    region: 'APAC Region',
    location: { lat: 1.3521, lng: 103.8198 },
    efficiency: '91%',
    accuracy: '95%',
    activity: [
      { id: 1, type: 'Submission', title: 'Competitor Analysis', time: '3h ago', status: 'Pending' },
      { id: 2, type: 'Survey', title: 'Pricing Audit', time: 'Yesterday', status: 'Approved' },
      { id: 3, type: 'Audit', title: 'Product Placement', time: '2 days ago', status: 'Approved' },
    ],
    weeklyPerformance: [
      { day: 'Mon', value: 8 },
      { day: 'Tue', value: 12 },
      { day: 'Wed', value: 10 },
      { day: 'Thu', value: 15 },
      { day: 'Fri', value: 18 },
      { day: 'Sat', value: 14 },
      { day: 'Sun', value: 12 },
    ]
  },
];

const campaigns = [
  { title: 'New Product Placement', region: 'West Coast Region - Q3 Rollout', status: 'Active', color: 'emerald', completion: 78 },
  { title: 'Holiday Display Audit', region: 'National Chain Stores - Global', status: 'On Deck', color: 'blue', completion: 12 },
  { title: 'Summer BBQ Promo', region: 'Regional Markets - East Coast', status: 'Paused', color: 'amber', completion: 94 },
];

const initialGlobalTasks = [
  { 
    id: 't1', 
    title: 'Review Spring Campaign deliverables', 
    status: 'pending', 
    assignedTo: 'a1', 
    createdAt: '2 hours ago',
    priority: 'high',
    campaign: 'Spring Retail Blitz 2024',
    checklist: [
      { id: 'c1', text: 'Check Dallas store photos', completed: true },
      { id: 'c2', text: 'Verify Miami inventory logs', completed: false }
    ]
  },
  { 
    id: 't2', 
    title: 'Update agent training modules', 
    status: 'pending', 
    assignedTo: 'a4', 
    createdAt: '5 hours ago',
    priority: 'medium',
    campaign: 'System Operations',
    checklist: [
      { id: 'c3', text: 'Draft new safety guidelines', completed: false },
      { id: 'c4', text: 'Optimize GPS tracking protocol', completed: false }
    ]
  }
];

const taskPriorityLabels: Record<string, { label: string, color: string, dot: string }> = {
  'high': { label: 'High', color: 'bg-rose-50 text-rose-600 border-rose-100', dot: 'bg-rose-500' },
  'medium': { label: 'Medium', color: 'bg-amber-50 text-amber-600 border-amber-100', dot: 'bg-amber-500' },
  'low': { label: 'Low', color: 'bg-blue-50 text-blue-600 border-blue-100', dot: 'bg-blue-500' }
};

const priorityOrder: Record<string, number> = {
  'high': 1,
  'medium': 2,
  'low': 3
};

const getTaskStatusInfo = (task: any) => {
  const total = task.checklist?.length || 0;
  const completed = task.checklist?.filter((it: any) => it.completed).length || 0;
  const percent = total > 0 ? Math.round((completed / total) * 100) : (task.status === 'completed' ? 100 : 0);
  
  if (task.status === 'completed' || percent === 100) {
    return { label: 'Completed', color: 'bg-emerald-50 text-emerald-600 border-emerald-100', dot: 'bg-emerald-500', percent };
  }
  if (percent > 0) {
    return { label: 'In Progress', color: 'bg-blue-50 text-blue-600 border-blue-100', dot: 'bg-blue-500', percent };
  }
  return { label: 'Pending', color: 'bg-slate-50 text-slate-400 border-slate-100', dot: 'bg-slate-300', percent };
};

export const ManagerDashboard = () => {
  const location = useLocation();
  const [activeTab, setActiveTab ] = React.useState<'overview' | 'posts' | 'reports' | 'leads'>('overview');

  React.useEffect(() => {
    const params = new URLSearchParams(location.search);
    const tabParam = params.get('tab');
    if (tabParam && ['overview', 'posts', 'reports', 'leads'].includes(tabParam)) {
      setActiveTab(tabParam as any);
    }
  }, [location.search]);

  const [selectedAgent, setSelectedAgent] = React.useState<typeof leaderboard[0] | null>(null);
  const [hoveredAgent, setHoveredAgent] = React.useState<string | null>(null);

  // Task state
  const [tasks, setTasks] = React.useState(initialGlobalTasks);
  const [newTaskTitle, setNewTaskTitle] = React.useState('');
  const [taskAgentId, setTaskAgentId] = React.useState('');
  const [newTaskPriority, setNewTaskPriority] = React.useState('medium');
  const [taskSortBy, setTaskSortBy] = React.useState<'date' | 'priority'>('priority');
  const [newChecklistItems, setNewChecklistItems] = React.useState<Record<string, string>>({});
  const [taskToDelete, setTaskToDelete] = React.useState<string | null>(null);

  const addTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskTitle.trim() || !taskAgentId) return;

    const newTask = {
      id: `t${Date.now()}`,
      title: newTaskTitle,
      status: 'pending',
      assignedTo: taskAgentId,
      createdAt: 'Just now',
      priority: newTaskPriority,
      campaign: 'General Operations',
      checklist: []
    };

    setTasks(prev => [newTask, ...prev]);
    setNewTaskTitle('');
    setTaskAgentId('');
    setNewTaskPriority('medium');
  };

  const toggleTaskStatus = (taskId: string) => {
    setTasks(prev => prev.map(t => 
      t.id === taskId ? { ...t, status: t.status === 'completed' ? 'pending' : 'completed' } : t
    ));
  };

  const deleteTask = (taskId: string) => {
    setTasks(prev => prev.filter(t => t.id !== taskId));
  };

  const addChecklistItem = (taskId: string) => {
    const text = newChecklistItems[taskId];
    if (!text?.trim()) return;

    setTasks(prev => prev.map(t => {
      if (t.id === taskId) {
        return {
          ...t,
          checklist: [...(t.checklist || []), { id: `c${Date.now()}`, text: text.trim(), completed: false }]
        };
      }
      return t;
    }));
    setNewChecklistItems(prev => ({ ...prev, [taskId]: '' }));
  };

  const toggleChecklistItem = (taskId: string, itemId: string) => {
    setTasks(prev => prev.map(t => {
      if (t.id === taskId) {
        return {
          ...t,
          checklist: t.checklist.map((item: any) => 
            item.id === itemId ? { ...item, completed: !item.completed } : item
          )
        };
      }
      return t;
    }));
  };

  const deleteChecklistItem = (taskId: string, itemId: string) => {
    setTasks(prev => prev.map(t => {
      if (t.id === taskId) {
        return {
          ...t,
          checklist: t.checklist.filter((item: any) => item.id !== itemId)
        };
      }
      return t;
    }));
  };

  const sortedTasks = React.useMemo(() => {
    return [...tasks].sort((a, b) => {
      if (taskSortBy === 'priority') {
        const orderA = priorityOrder[a.priority as keyof typeof priorityOrder] || 99;
        const orderB = priorityOrder[b.priority as keyof typeof priorityOrder] || 99;
        if (orderA !== orderB) return orderA - orderB;
      }
      return b.id.localeCompare(a.id);
    });
  }, [tasks, taskSortBy]);

  const agents = leaderboard; // Using leaderboard as mock agents list

  return (
    <APIProvider apiKey={API_KEY} version="weekly">
      <div className="space-y-10 pb-20 relative">
        <AnimatePresence>
          {selectedAgent && (
            <>
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedAgent(null)}
                className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[100] cursor-pointer"
              />
              <motion.div 
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                className="fixed top-0 right-0 h-full w-full max-w-xl bg-white shadow-2xl z-[101] overflow-y-auto"
              >
                <div className="p-8 flex flex-col h-full">
                  <div className="flex justify-between items-center mb-10">
                    <h2 className="text-xl font-bold text-slate-800 tracking-tight">Agent Profile</h2>
                    <button 
                      onClick={() => setSelectedAgent(null)}
                      className="p-2 hover:bg-slate-50 rounded-xl transition-colors"
                    >
                      <X size={24} className="text-slate-400" />
                    </button>
                  </div>

                  <div className="flex items-center gap-6 mb-10">
                    <div className="relative">
                      <img src={selectedAgent.avatar} className="w-24 h-24 rounded-[2rem] object-cover shadow-xl border-4 border-white" alt={selectedAgent.name} />
                      <div className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full bg-emerald-500 border-4 border-white shadow-sm flex items-center justify-center">
                        <TrendingUp size={14} className="text-white" />
                      </div>
                    </div>
                    <div>
                      <h3 className="text-2xl font-black text-slate-800 tracking-tight">{selectedAgent.name}</h3>
                      <p className="text-sm font-bold text-slate-400 uppercase tracking-widest mt-1">{selectedAgent.region}</p>
                      <div className="mt-2 flex items-center gap-3">
                        <span className="px-3 py-1 bg-indigo-50 text-indigo-600 rounded-lg text-[10px] font-bold uppercase">Rank #{selectedAgent.rank}</span>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4 mb-10">
                    <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100">
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Efficiency</p>
                      <p className="text-xl font-black text-slate-800">{selectedAgent.efficiency}</p>
                    </div>
                    <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100">
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Accuracy</p>
                      <p className="text-xl font-black text-slate-800">{selectedAgent.accuracy}</p>
                    </div>
                    <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100">
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Submissions</p>
                      <p className="text-xl font-black text-slate-800">{selectedAgent.submissions}</p>
                    </div>
                  </div>

                  <div className="mb-10 rounded-[2.5rem] overflow-hidden border border-slate-100 shadow-lg h-60 relative group">
                    {hasValidKey ? (
                      <Map
                        defaultCenter={selectedAgent.location}
                        defaultZoom={11}
                        mapId="BF_AGENT_LOCATION"
                        disableDefaultUI={true}
                        internalUsageAttributionIds={['gmp_mcp_codeassist_v1_aistudio']}
                        className="w-full h-full"
                      >
                        <AdvancedMarker position={selectedAgent.location}>
                          <div className="w-10 h-10 rounded-full border-2 border-white shadow-xl overflow-hidden ring-4 ring-indigo-500/30 ring-offset-0 ring-offset-white">
                            <img src={selectedAgent.avatar} className="w-full h-full object-cover" alt={selectedAgent.name} />
                          </div>
                        </AdvancedMarker>
                      </Map>
                    ) : (
                      <div className="w-full h-full bg-slate-50 flex flex-col items-center justify-center p-6 text-center relative">
                        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#3b82f6_1.5px,transparent_1.5px)] [background-size:16px_16px]"></div>
                        <MapPin size={32} className="text-indigo-500 mb-2 z-10 animate-pulse" />
                        <span className="text-xs font-bold text-slate-700 uppercase tracking-widest z-10">Live GPS Offline</span>
                        <span className="text-[9px] text-slate-400 font-medium max-w-xs mt-1 z-10">Configure GOOGLE_MAPS_PLATFORM_KEY in settings to activate tracking.</span>
                      </div>
                    )}
                    <div className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur-md p-3 rounded-2xl border border-white/50 shadow-sm transition-opacity opacity-0 group-hover:opacity-100">
                      <div className="flex items-center gap-2 overflow-hidden">
                        <MapPin size={14} className="text-indigo-600 shrink-0" />
                        <p className="text-[10px] font-black text-slate-700 truncate uppercase tracking-widest">Last Check-in: {selectedAgent.activity[0].time}</p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-8 flex-1">
                    <div>
                      <div className="flex justify-between items-center mb-6">
                        <div className="flex items-center gap-2">
                          <Activity size={18} className="text-indigo-600" />
                           <h4 className="text-sm font-bold text-slate-800 uppercase tracking-widest">Performance trend</h4>
                        </div>
                      </div>
                      <div className="h-48 bg-slate-50/50 rounded-2xl p-4 border border-slate-100 shadow-inner">
                        <ResponsiveContainer width="100%" height="100%">
                          <LineChart data={selectedAgent.weeklyPerformance}>
                            <Line type="monotone" dataKey="value" stroke="#4F46E5" strokeWidth={4} dot={{ r: 4, fill: '#4F46E5', strokeWidth: 0 }} activeDot={{ r: 6 }} />
                            <Tooltip 
                              contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)', fontSize: '10px', fontWeight: 'bold' }}
                              labelStyle={{ color: '#94A3B8', marginBottom: '4px' }}
                            />
                          </LineChart>
                        </ResponsiveContainer>
                      </div>
                    </div>

                    <div className="space-y-6">
                      <div className="flex items-center gap-2">
                         <History size={18} className="text-indigo-600" />
                         <h4 className="text-sm font-bold text-slate-800 uppercase tracking-widest">Recent Activity</h4>
                      </div>
                      <div className="space-y-4">
                        {selectedAgent.activity.map((item) => (
                          <div key={item.id} className="flex gap-4 group">
                            <div className={cn(
                              "w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border border-slate-100 transition-colors group-hover:bg-indigo-50 group-hover:border-indigo-100",
                              item.status === 'Approved' ? "bg-emerald-50 text-emerald-500" : "bg-amber-50 text-amber-500"
                            )}>
                              <FileText size={18} />
                            </div>
                            <div className="flex-1 pb-4 border-b border-slate-50 last:border-0">
                              <div className="flex justify-between items-start">
                                <div>
                                  <p className="text-sm font-bold text-slate-800">{item.title}</p>
                                  <p className="text-xs font-medium text-slate-400 mt-0.5">{item.type} • {item.time}</p>
                                </div>
                                <span className={cn(
                                  "text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded-md",
                                  item.status === 'Approved' ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700"
                                )}>{item.status}</span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="mt-auto pt-10">
                     <button className="w-full bg-slate-900 text-white py-4 rounded-2xl font-bold hover:bg-slate-800 transition-all flex items-center justify-center gap-3 active:scale-95 shadow-xl shadow-slate-900/10">
                       <FileBarChart size={20} />
                       Generate Full Performance Report
                     </button>
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>

        {/* Dynamic Navigation Toggles (Manager Hub Option Toggles) */}
        <div className="bg-white p-3 rounded-2xl border border-slate-100 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex bg-slate-50 p-1.5 rounded-xl w-full sm:w-auto overflow-x-auto">
            <button
              onClick={() => setActiveTab('overview')}
              className={cn(
                "px-6 py-3 rounded-lg text-xs font-black uppercase tracking-widest transition-all flex items-center justify-center gap-2 whitespace-nowrap min-w-[145px]",
                activeTab === 'overview' 
                  ? "bg-white text-blue-600 shadow-md border border-slate-200/50" 
                  : "text-slate-500 hover:text-slate-800"
              )}
            >
              <LayoutGrid size={14} className={cn(activeTab === 'overview' ? "text-blue-500" : "text-slate-400")} />
              <span>Overview</span>
            </button>
            <button
              onClick={() => setActiveTab('posts')}
              className={cn(
                "px-6 py-3 rounded-lg text-xs font-black uppercase tracking-widest transition-all flex items-center justify-center gap-2 whitespace-nowrap min-w-[145px]",
                activeTab === 'posts' 
                  ? "bg-white text-blue-600 shadow-md border border-slate-200/50" 
                  : "text-slate-500 hover:text-slate-800"
              )}
            >
              <Inbox size={14} className={cn(activeTab === 'posts' ? "text-blue-500" : "text-slate-400")} />
              <span>Field Posts</span>
            </button>
            <button
               onClick={() => setActiveTab('reports')}
               className={cn(
                 "px-6 py-3 rounded-lg text-xs font-black uppercase tracking-widest transition-all flex items-center justify-center gap-2 whitespace-nowrap min-w-[145px]",
                 activeTab === 'reports' 
                   ? "bg-white text-blue-600 shadow-md border border-slate-200/50" 
                   : "text-slate-500 hover:text-slate-800"
               )}
             >
               <FileBarChart size={14} className={cn(activeTab === 'reports' ? "text-blue-500" : "text-slate-400")} />
               <span>Analytical Reports</span>
             </button>
             <button
               onClick={() => setActiveTab('leads')}
               className={cn(
                 "px-6 py-3 rounded-lg text-xs font-black uppercase tracking-widest transition-all flex items-center justify-center gap-2 whitespace-nowrap min-w-[145px]",
                 activeTab === 'leads' 
                   ? "bg-white text-blue-600 shadow-md border border-slate-200/50" 
                   : "text-slate-500 hover:text-slate-800"
               )}
             >
               <Target size={14} className={cn(activeTab === 'leads' ? "text-blue-500" : "text-slate-400")} />
               <span>Leads</span>
             </button>
           </div>
          
          <div className="hidden lg:flex items-center gap-3 bg-indigo-50/50 border border-indigo-100/30 px-4 py-2.5 rounded-xl text-indigo-600">
            <ShieldAlert size={15} className="animate-pulse" />
            <span className="text-[10px] font-black uppercase tracking-widest">Active Executive Supervision Mode</span>
          </div>
        </div>

        {activeTab === 'overview' && (
          <>
            {/* KPI Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {kpis.map((kpi, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-sm relative overflow-hidden group"
          >
            <div className="flex justify-between items-start mb-10">
              <div className={cn(
                "p-4 rounded-2xl",
                kpi.color === 'blue' ? "bg-blue-50 text-blue-600" :
                kpi.color === 'amber' ? "bg-orange-50 text-orange-600" :
                kpi.color === 'indigo' ? "bg-indigo-50 text-indigo-600" : "bg-emerald-50 text-emerald-600"
              )}>
                <kpi.icon size={28} />
              </div>
              <div className="flex flex-col items-end">
                <span className={cn(
                  "text-sm font-bold",
                  kpi.trend.includes('+') ? "text-emerald-500" : 
                  kpi.trend === 'High Priority' ? "text-orange-600" :
                  kpi.trend === 'Live' ? "text-emerald-500 flex items-center gap-1.5" : "text-blue-600"
                )}>
                  {kpi.trend === 'Live' && <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>}
                  {kpi.trend}
                </span>
              </div>
            </div>
            
            <p className="text-slate-400 text-sm font-bold uppercase tracking-widest mb-3">{kpi.title}</p>
            <h3 className="text-5xl font-extrabold text-slate-900 tracking-tight mb-6">{kpi.value}</h3>
            
            {kpi.progress ? (
              <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-blue-600 rounded-full w-[70%]" />
              </div>
            ) : kpi.agents ? (
              <div className="flex -space-x-3">
                {kpi.agents.map((agent, j) => (
                  <img key={j} src={agent} className="w-9 h-9 rounded-full border-4 border-white shadow-sm" alt="agent" />
                ))}
                <div className="w-9 h-9 rounded-full bg-emerald-100 border-4 border-white flex items-center justify-center text-[10px] font-bold text-emerald-700 shadow-sm">
                  +5
                </div>
              </div>
            ) : (
              <p className="text-slate-400 text-sm font-semibold">{kpi.subtitle}</p>
            )}
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Live Field Feed */}
        <div className="lg:col-span-2 bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden flex flex-col">
          <div className="p-10 flex justify-between items-center border-b border-slate-50">
            <div>
              <h3 className="text-2xl font-bold text-slate-800 tracking-tight">Live Field Feed</h3>
              <p className="text-slate-400 text-sm font-medium mt-1">Real-time survey submissions and field updates</p>
            </div>
            <button className="flex items-center gap-3 px-6 py-3 bg-slate-50 text-slate-600 rounded-2xl text-sm font-bold hover:bg-slate-100 transition-all border border-slate-200">
              <Filter size={18} />
              <span>Filter Feed</span>
            </button>
          </div>
          
          <table className="w-full">
            <thead>
              <tr className="bg-slate-50/50">
                <th className="px-10 py-5 text-left text-xs font-bold text-slate-400 uppercase tracking-widest">Agent / Time</th>
                <th className="px-10 py-5 text-left text-xs font-bold text-slate-400 uppercase tracking-widest">Campaign</th>
                <th className="px-10 py-5 text-left text-xs font-bold text-slate-400 uppercase tracking-widest">Status</th>
                <th className="px-10 py-5 text-left text-xs font-bold text-slate-400 uppercase tracking-widest text-right">Verification</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {feed.map((row, i) => (
                <tr key={i} className="hover:bg-slate-50/80 transition-colors">
                  <td className="px-10 py-8">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-slate-100 shadow-sm flex-shrink-0 bg-slate-50">
                        <img 
                          src={row.avatar} 
                          className="w-full h-full object-cover" 
                          alt={row.agent} 
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(row.agent)}&background=EEF2FF&color=4F46E5`;
                          }}
                        />
                      </div>
                      <div>
                        <p className="font-bold text-slate-800">{row.agent}</p>
                        <p className="text-slate-400 text-xs font-medium">{row.time}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-10 py-8">
                    <p className="text-sm font-bold text-slate-600 max-w-[200px]">{row.campaign}</p>
                  </td>
                  <td className="px-10 py-8">
                    <div className="flex items-center gap-2">
                      <span className={cn(
                        "w-2.5 h-2.5 rounded-full",
                        row.status === 'Completed' ? "bg-emerald-500" :
                        row.status === 'In-Progress' ? "bg-blue-500" :
                        row.status === 'Overdue' ? "bg-rose-500" : "bg-slate-400"
                      )}></span>
                      <span className={cn(
                        "text-sm font-bold",
                        row.status === 'Completed' ? "text-emerald-600" :
                        row.status === 'In-Progress' ? "text-blue-600" :
                        row.status === 'Overdue' ? "text-rose-600" : "text-slate-600"
                      )}>{row.status}</span>
                    </div>
                  </td>
                  <td className="px-10 py-8 text-right">
                    <button className="text-blue-600 font-bold text-sm hover:underline">
                      {row.verification}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Team Performance */}
        <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm p-10 flex flex-col">
          <div className="mb-10">
            <h3 className="text-2xl font-bold text-slate-800 tracking-tight">Team Performance</h3>
            <p className="text-slate-400 text-sm font-medium mt-1">Top performing field agents this week</p>
          </div>

          {hasValidKey ? (
            <div className="h-64 mb-10 rounded-[2rem] overflow-hidden border border-slate-100 shadow-lg relative group">
              <Map
                defaultCenter={{ lat: 30, lng: 0 }}
                defaultZoom={1}
                mapId="BF_TEAM_MAP"
                disableDefaultUI={true}
                internalUsageAttributionIds={['gmp_mcp_codeassist_v1_aistudio']}
                className="w-full h-full"
              >
                {leaderboard.map((agent) => (
                  <AdvancedMarker 
                    key={agent.id} 
                    position={agent.location}
                    className={cn(
                      "transition-all duration-300",
                      hoveredAgent === agent.id ? "scale-125 z-10" : "scale-100"
                    )}
                  >
                    <div className={cn(
                      "w-10 h-10 rounded-full border-2 border-white shadow-xl overflow-hidden ring-4 transition-all",
                      hoveredAgent === agent.id ? "ring-indigo-501 shadow-indigo-200" : "ring-slate-200/50"
                    )}>
                      <img src={agent.avatar} className="w-full h-full object-cover" alt={agent.name} />
                    </div>
                  </AdvancedMarker>
                ))}
              </Map>
              <div className="absolute top-4 left-4 right-4 flex justify-center">
                <div className="px-4 py-2 bg-white/90 backdrop-blur-md rounded-full shadow-lg border border-white text-[10px] font-black text-slate-800 uppercase tracking-widest">
                  Field Deployment View
                </div>
              </div>
            </div>
          ) : (
            <div className="h-64 mb-10 rounded-[2rem] overflow-hidden border border-slate-100 bg-slate-50 flex flex-col items-center justify-center p-6 text-center relative group">
              <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#3b82f6_1.5px,transparent_1.5px)] [background-size:20px_20px]"></div>
              
              <div className="absolute inset-0 flex items-center justify-center opacity-20">
                <svg className="w-full h-full" viewBox="0 0 400 200">
                  <path d="M50,150 L150,55 L250,140 L350,60" fill="none" stroke="#4f46e5" strokeWidth="2" strokeDasharray="4 4" />
                  <circle cx="50" cy="150" r="5" fill="#4f46e5" />
                  <circle cx="150" cy="55" r="5" fill="#4f46e5" />
                  <circle cx="250" cy="140" r="5" fill="#4f46e5" />
                  <circle cx="350" cy="60" r="5" fill="#4f46e5" />
                </svg>
              </div>

              <div className="relative z-10 flex flex-col items-center">
                <div className="w-12 h-12 rounded-full bg-slate-100 border border-slate-200 shadow-sm flex items-center justify-center mb-3">
                  <MapPin size={24} className="text-slate-500" />
                </div>
                <span className="text-xs font-black text-slate-700 uppercase tracking-widest">Interactive Map Offline</span>
                <span className="text-[10px] text-slate-400 font-medium max-w-[200px] mt-1">Connect your Google Maps key to unlock agent spatial locations.</span>
              </div>
            </div>
          )}

          <div className="space-y-8 flex-1">
            {leaderboard.map((agent) => (
              <div 
                key={agent.id} 
                onClick={() => setSelectedAgent(agent as any)}
                onMouseEnter={() => setHoveredAgent(agent.id)}
                onMouseLeave={() => setHoveredAgent(null)}
                className={cn(
                  "flex items-center justify-between group cursor-pointer p-4 rounded-2xl transition-all border border-transparent",
                  hoveredAgent === agent.id ? "bg-indigo-50 border-indigo-100 shadow-sm" : "hover:bg-slate-50"
                )}
              >
                <div className="flex items-center gap-5">
                  <div className="relative">
                    <img src={agent.avatar} className="w-16 h-16 rounded-2xl object-cover shadow-md" alt={agent.name} />
                    <div className={cn(
                      "absolute -top-3 -left-3 w-8 h-8 rounded-full flex items-center justify-center text-sm font-extrabold text-white shadow-lg border-4 border-white",
                      agent.rank === 1 ? "bg-[#FBBF24]" :
                      agent.rank === 2 ? "bg-[#94A3B8]" : "bg-[#B45309]"
                    )}>
                      {agent.rank}
                    </div>
                  </div>
                  <div>
                    <p className="font-extrabold text-slate-800">{agent.name}</p>
                    <p className="text-slate-400 text-[10px] font-black mt-1 uppercase tracking-widest">
                      {agent.submissions} Sub / {agent.score}% Acc
                    </p>
                  </div>
                </div>
                <div className={cn(
                  "p-2.5 rounded-xl transition-transform",
                  hoveredAgent === agent.id ? "scale-110" : "",
                  agent.trend === 'up' ? "text-emerald-500" :
                  agent.trend === 'down' ? "text-rose-500" : "text-slate-400"
                )}>
                  {agent.trend === 'up' ? <TrendingUp size={24} /> :
                   agent.trend === 'down' ? <TrendingDown size={24} /> : <div className="w-6 h-1 bg-slate-400 rounded-full" />}
                </div>
              </div>
            ))}
          </div>

          <button className="w-full mt-10 py-5 bg-[#EEF2FF] text-blue-600 rounded-2xl text-sm font-bold hover:bg-blue-100 transition-all">
            View Full Leaderboard
          </button>
        </div>
      </div>

      {/* Task Management Section */}
      <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm p-10">
        <div className="flex justify-between items-center mb-10">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 shadow-sm">
              <ListTodo size={24} />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-slate-800 tracking-tight">Global Tasks</h3>
              <p className="text-slate-400 text-sm font-medium mt-1">Operational management and system-wide action items</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex bg-slate-100 p-1 rounded-2xl border border-slate-200">
              <button 
                onClick={() => setTaskSortBy('priority')}
                className={cn(
                  "px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all",
                  taskSortBy === 'priority' ? "bg-white text-slate-800 shadow-sm" : "text-slate-400 hover:text-slate-600"
                )}
              >
                Priority
              </button>
              <button 
                onClick={() => setTaskSortBy('date')}
                className={cn(
                  "px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all",
                  taskSortBy === 'date' ? "bg-white text-slate-800 shadow-sm" : "text-slate-400 hover:text-slate-600"
                )}
              >
                Date
              </button>
            </div>
            <span className="px-4 py-2 bg-slate-50 text-slate-500 rounded-full text-[10px] font-black uppercase tracking-widest border border-slate-100">
              {tasks.filter(t => t.status === 'completed').length}/{tasks.length} Done
            </span>
          </div>
        </div>

        <div className="space-y-8">
          {/* Task Creation Form */}
          <form onSubmit={addTask} className="flex flex-col lg:flex-row gap-4 p-6 bg-slate-50 rounded-[2rem] border border-slate-100 border-dashed">
            <div className="flex-1 relative">
              <input 
                type="text" 
                value={newTaskTitle}
                onChange={(e) => setNewTaskTitle(e.target.value)}
                placeholder="Enter new management task..."
                className="w-full bg-white border border-slate-200 rounded-2xl py-4 pl-12 pr-6 text-sm font-bold text-slate-700 focus:outline-none focus:border-blue-500 transition-all shadow-sm"
              />
              <Plus size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
            </div>
            <div className="grid grid-cols-2 gap-4 lg:w-fit">
              <div className="relative">
                <select 
                  value={taskAgentId}
                  onChange={(e) => setTaskAgentId(e.target.value)}
                  className="appearance-none bg-white border border-slate-200 rounded-2xl py-4 pl-12 pr-10 text-sm font-bold text-slate-700 focus:outline-none focus:border-blue-500 transition-all shadow-sm cursor-pointer min-w-[200px]"
                >
                  <option value="">Assign To...</option>
                  {agents.map((agent: any) => (
                    <option key={agent.id} value={agent.id}>{agent.name}</option>
                  ))}
                </select>
                <UserPlus size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                <ChevronRight size={16} className="absolute right-4 top-1/2 -translate-y-1/2 rotate-90 text-slate-400 pointer-events-none" />
              </div>
              <div className="relative">
                <select 
                  value={newTaskPriority}
                  onChange={(e) => setNewTaskPriority(e.target.value)}
                  className="appearance-none bg-white border border-slate-200 rounded-2xl py-4 pl-12 pr-10 text-sm font-bold text-slate-700 focus:outline-none focus:border-blue-500 transition-all shadow-sm cursor-pointer min-w-[150px]"
                >
                  {Object.entries(taskPriorityLabels).map(([key, config]) => (
                    <option key={key} value={key}>{config.label} Priority</option>
                  ))}
                </select>
                <Flag size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                <ChevronRight size={16} className="absolute right-4 top-1/2 -translate-y-1/2 rotate-90 text-slate-400 pointer-events-none" />
              </div>
            </div>
            <button 
              type="submit"
              disabled={!newTaskTitle.trim() || !taskAgentId}
              className="bg-slate-900 text-white px-8 py-4 rounded-2xl font-bold hover:bg-slate-800 disabled:opacity-50 transition-all shadow-lg active:scale-95 whitespace-nowrap"
            >
              Add Task
            </button>
          </form>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <AnimatePresence mode="popLayout">
              {sortedTasks.map((task) => {
                const assignedAgent = agents.find((a: any) => a.id === task.assignedTo);
                const priorityConfig = taskPriorityLabels[task.priority as keyof typeof taskPriorityLabels] || taskPriorityLabels.medium;
                const statusInfo = getTaskStatusInfo(task);
                
                return (
                  <motion.div 
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    key={task.id}
                    className={cn(
                      "group flex flex-col p-8 bg-white border rounded-[2.5rem] transition-all relative overflow-hidden",
                      task.status === 'completed' ? "border-emerald-100 bg-emerald-50/20" : "border-slate-100 hover:border-slate-200"
                    )}
                  >
                    <div className="absolute top-0 left-0 h-1 bg-blue-500/5 transition-all duration-1000 pointer-events-none" style={{ width: `${statusInfo.percent}%` }} />

                    <div className="flex items-center justify-between gap-4 mb-6 relative z-10">
                      <div className="flex items-center gap-4 flex-1">
                        <button 
                          onClick={() => toggleTaskStatus(task.id)}
                          className={cn(
                            "w-8 h-8 rounded-xl border-2 flex items-center justify-center transition-all",
                            task.status === 'completed' 
                              ? "bg-emerald-500 border-emerald-500 text-white shadow-lg shadow-emerald-100" 
                              : "border-slate-200 text-transparent hover:border-blue-400"
                          )}
                        >
                          <Check size={18} />
                        </button>
                        <div className={cn(
                          "flex-1 transition-all",
                          task.status === 'completed' ? "opacity-50 line-through" : ""
                        )}>
                          <div className="flex flex-wrap items-center gap-3">
                            <p className="text-base font-bold text-slate-800 tracking-tight">{task.title}</p>
                            <div className="flex items-center gap-2">
                              <span className={cn(
                                "px-2.5 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest border flex items-center gap-1.5",
                                priorityConfig.color
                              )}>
                                <div className={cn("w-1.5 h-1.5 rounded-full", priorityConfig.dot)} />
                                {priorityConfig.label}
                              </span>
                              <span className={cn(
                                "px-2.5 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest border flex items-center gap-1.5",
                                statusInfo.color
                              )}>
                                <div className={cn("w-1.5 h-1.5 rounded-full", statusInfo.dot)} />
                                {statusInfo.label}
                              </span>
                            </div>
                          </div>
                          <div className="flex items-center gap-4 mt-2">
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
                              <Clock size={10} />
                              {task.createdAt}
                            </span>
                            <div className="w-1.5 h-1.5 rounded-full bg-slate-200" />
                            <div className="flex items-center gap-2">
                              <img src={assignedAgent?.avatar} className="w-5 h-5 rounded-full object-cover" />
                              <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest">{assignedAgent?.name}</span>
                            </div>
                            <div className="w-1.5 h-1.5 rounded-full bg-slate-200" />
                            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest truncate max-w-[120px]">{task.campaign}</span>
                          </div>
                        </div>
                      </div>
                      <button 
                        onClick={() => setTaskToDelete(task.id)}
                        className="p-2.5 border border-transparent text-slate-300 hover:text-rose-500 hover:bg-rose-50 hover:border-rose-100 rounded-xl transition-all opacity-0 group-hover:opacity-100"
                      >
                        <Trash2 size={20} />
                      </button>
                    </div>

                    {/* Checklist Section */}
                    <div className="pl-12 space-y-5 relative z-10">
                      <div className="flex items-center justify-between">
                         <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] flex items-center gap-2">
                           <ListTodo size={14} className="text-blue-500" />
                           Checklist
                         </p>
                         {task.checklist?.length > 0 && (
                           <span className={cn(
                             "text-[10px] font-bold px-3 py-1 rounded-full",
                             statusInfo.percent === 100 ? "text-emerald-600 bg-emerald-50" : "text-blue-600 bg-blue-50"
                           )}>
                             {statusInfo.percent}% Complete
                           </span>
                         )}
                      </div>
                      
                      {task.checklist?.length > 0 && (
                        <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                          <motion.div 
                            initial={{ width: 0 }}
                            animate={{ width: `${statusInfo.percent}%` }}
                            className={cn(
                              "h-full rounded-full transition-all duration-1000",
                              statusInfo.percent === 100 ? "bg-emerald-500 shadow-[0_0_12px_rgba(16,185,129,0.3)]" : "bg-blue-500"
                            )}
                          />
                        </div>
                      )}
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                         {task.checklist?.map((item: any) => (
                           <div key={item.id} className="flex items-center justify-between group/item p-3 bg-slate-50/50 rounded-2xl hover:bg-slate-50 transition-colors">
                             <button 
                               onClick={() => toggleChecklistItem(task.id, item.id)}
                               className="flex items-center gap-3 text-left flex-1"
                             >
                               <div className={cn(
                                 "w-5 h-5 rounded-lg border-2 transition-all flex items-center justify-center",
                                 item.completed ? "bg-blue-500 border-blue-500 text-white" : "border-slate-200 text-transparent hover:border-blue-300"
                               )}>
                                 <Check size={12} />
                               </div>
                               <span className={cn(
                                 "text-sm font-medium transition-all",
                                 item.completed ? "text-slate-400 line-through" : "text-slate-700"
                               )}>
                                 {item.text}
                               </span>
                             </button>
                             <button 
                               onClick={() => deleteChecklistItem(task.id, item.id)}
                               className="p-1.5 text-slate-300 hover:text-rose-400 opacity-0 group-hover/item:opacity-100 transition-all ml-2"
                             >
                               <Trash2 size={14} />
                             </button>
                           </div>
                         ))}
                      </div>

                      <div className="flex gap-3 pt-2">
                        <input 
                          type="text"
                          placeholder="Add detail..."
                          value={newChecklistItems[task.id] || ''}
                          onChange={(e) => setNewChecklistItems(prev => ({ ...prev, [task.id]: e.target.value }))}
                          onKeyDown={(e) => e.key === 'Enter' && addChecklistItem(task.id)}
                          className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-5 py-3 text-xs font-bold focus:outline-none focus:border-blue-400 transition-all shadow-inner"
                        />
                        <button 
                          onClick={() => addChecklistItem(task.id)}
                          disabled={!newChecklistItems[task.id]?.trim()}
                          className="bg-blue-600 text-white p-3 rounded-xl hover:bg-blue-700 disabled:opacity-30 transition-all shadow-md active:scale-95"
                        >
                          <Plus size={18} />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Campaign Status */}
      <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm p-10">
        <div className="flex justify-between items-center mb-10">
          <h3 className="text-2xl font-bold text-slate-800 tracking-tight">Campaign Status</h3>
          <div className="flex items-center gap-4 bg-slate-100 p-1.5 rounded-2xl">
            <button className="p-2.5 bg-white text-slate-800 rounded-xl shadow-sm"><LayoutGrid size={20} /></button>
            <button className="p-2.5 text-slate-400 hover:text-slate-600"><List size={20} /></button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {campaigns.map((campaign, i) => (
            <div key={i} className="p-8 rounded-[2rem] bg-white border border-slate-100 shadow-sm hover:border-blue-200 transition-all group">
              <div className="flex justify-between items-start mb-10">
                <span className={cn(
                  "px-4 py-1.5 rounded-xl text-[10px] font-bold uppercase tracking-[0.1em]",
                  campaign.status === 'Active' ? "bg-emerald-50 text-emerald-600" :
                  campaign.status === 'On Deck' ? "bg-blue-50 text-blue-600" : "bg-orange-50 text-orange-600"
                )}>
                  {campaign.status}
                </span>
                <button className="text-slate-300 hover:text-slate-600"><Plus size={20} /></button>
              </div>

              <h4 className="text-xl font-bold text-slate-800 tracking-tight mb-2">{campaign.title}</h4>
              <p className="text-slate-400 text-sm font-medium mb-10">{campaign.region}</p>

              <div className="space-y-4">
                <div className="flex justify-between items-center text-xs font-bold uppercase tracking-widest text-slate-400">
                  <span>Completion</span>
                  <span className="text-slate-900">{campaign.completion}%</span>
                </div>
                <div className="h-2.5 w-full bg-slate-100 rounded-full overflow-hidden">
                  <div className={cn(
                    "h-full rounded-full transition-all duration-1000",
                    campaign.color === 'emerald' ? "bg-emerald-500" :
                    campaign.color === 'blue' ? "bg-blue-500" : "bg-orange-500"
                  )} style={{ width: `${campaign.completion}%` }} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      </>
      )}

      {/* Embedded Field Posts Tab */}
      {activeTab === 'posts' && (
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="pb-10"
        >
          <FieldPosts />
        </motion.div>
      )}

      {/* Embedded Analytical Reports Tab */}
      {activeTab === 'reports' && (
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="pb-10"
        >
          <ManagerReports />
        </motion.div>
      )}

      {/* Embedded Leads Tab */}
      {activeTab === 'leads' && (
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="pb-10"
        >
          <LeadPipeline />
        </motion.div>
      )}

      {/* Task Delete Confirmation Dialog */}
      <AnimatePresence>
        {taskToDelete && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setTaskToDelete(null)}
              className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
            />

            {/* Modal Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="relative bg-white rounded-3xl shadow-xl border border-slate-100 max-w-md w-full p-8 overflow-hidden z-10"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-rose-50 rounded-2xl flex items-center justify-center text-rose-500 shrink-0">
                  <AlertCircle size={24} />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-slate-800 tracking-tight">Delete Task?</h3>
                  <p className="text-slate-500 text-sm mt-2 leading-relaxed">
                    Are you sure you want to delete this task? This action cannot be undone and will permanently remove the task and all associated checklist items.
                  </p>
                  
                  {/* Task details preview */}
                  {(() => {
                    const taskObj = tasks.find(t => t.id === taskToDelete);
                    return taskObj ? (
                      <div className="mt-4 p-4 bg-slate-50 rounded-2xl border border-slate-100">
                        <p className="text-xs font-black text-slate-400 uppercase tracking-widest">Task Title</p>
                        <p className="text-sm font-semibold text-slate-700 mt-1 line-clamp-2">{taskObj.title}</p>
                      </div>
                    ) : null;
                  })()}
                </div>
              </div>

              <div className="flex gap-3 mt-8">
                <button
                  type="button"
                  onClick={() => setTaskToDelete(null)}
                  className="flex-1 py-3 px-4 border border-slate-200 text-slate-500 hover:text-slate-700 hover:bg-slate-50 font-bold rounded-xl text-sm transition-all active:scale-95"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={() => {
                    if (taskToDelete) {
                      deleteTask(taskToDelete);
                      setTaskToDelete(null);
                    }
                  }}
                  className="flex-1 py-3 px-4 bg-rose-600 hover:bg-rose-700 text-white font-bold rounded-xl text-sm shadow-lg shadow-rose-200 transition-all active:scale-95"
                >
                  Delete Task
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
    </APIProvider>
  );
};
