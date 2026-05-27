import React, { useState, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ChevronLeft, 
  Users, 
  Shield, 
  Activity, 
  Calendar, 
  Clock, 
  MapPin, 
  Mail, 
  ExternalLink,
  Target,
  Globe, 
  Flag,
  FileText,
  CheckCircle2,
  AlertCircle,
  Filter,
  RefreshCcw,
  Check,
  ListTodo,
  Plus,
  Trash2,
  UserPlus
} from 'lucide-react';
import { cn } from '../lib/utils';
import { useAuth } from '../contexts/AuthContext';

// Mock detailed data for campaigns
const campaignDetails: Record<string, any> = {
  '1': {
    id: '1',
    title: 'Spring Retail Blitz 2024',
    status: 'active',
    region: 'North America',
    type: 'Display Compliance',
    startDate: 'Mar 15, 2024',
    endDate: 'Jun 15, 2024',
    dueDate: 'Jun 20, 2024',
    description: 'Quarterly retail audit focusing on brand visibility and display compliance across top 500 retail locations in the North American market. Field agents are tasked with verifying shelf placement, promotional signage, and stock availability.',
    progress: 68,
    priority: 'high',
    tags: ['Quarterly', 'Audit', 'Retail'],
    agents: [
      { 
        id: 'a1', 
        name: 'Sarah Miller', 
        role: 'Lead', 
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        email: 's.miller@bluefield.com',
        permissions: ['can_submit', 'can_approve', 'can_edit', 'can_export'],
        recentActivity: [
          { id: 1, action: 'Approved submission', target: 'Dallas Store #42', time: '2 hours ago', status: 'success', type: 'submission' },
          { id: 2, action: 'Updated campaign tags', target: 'System', time: '5 hours ago', status: 'info', type: 'report_update' }
        ]
      },
      { 
        id: 'a2', 
        name: 'Robert King', 
        role: 'Auditor', 
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        email: 'r.king@bluefield.com',
        permissions: ['can_submit', 'can_approve', 'can_export'],
        recentActivity: [
          { id: 3, action: 'Submitted audit report', target: 'Miami Retail Center', time: '1 day ago', status: 'success', type: 'submission' },
          { id: 4, action: 'Flagged inventory discrepancy', target: 'Miami Retail Center', time: '1 day ago', status: 'warning', type: 'report_update' }
        ]
      },
      { 
        id: 'a5', 
        name: 'Jason Davis', 
        role: 'Surveyor', 
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        email: 'j.davis@bluefield.com',
        permissions: ['can_submit'],
        recentActivity: [
          { id: 5, action: 'Completed site visit', target: 'NYC Flagship', time: '3 hours ago', status: 'success', type: 'submission' },
          { id: 6, action: 'Changed status to "In Progress"', target: 'Boston Mall Audit', time: '6 hours ago', status: 'info', type: 'status_change' }
        ]
      }
    ],
    timeline: [
      { id: 1, event: 'Campaign Launched', date: 'Mar 15, 2024', user: 'System' },
      { id: 2, event: 'Milestone: 50% Coverage Reached', date: 'Apr 20, 2024', user: 'Sarah Miller' },
      { id: 3, event: 'Updated Submission Criteria', date: 'May 05, 2024', user: 'Sarah Miller' }
    ],
    tasks: [
      { 
        id: 't1', 
        title: 'Verify shelf placement at NYC stations', 
        status: 'completed', 
        assignedTo: 'a5', 
        createdAt: '3 days ago',
        priority: 'high',
        checklist: [
          { id: 'c1', text: 'Visit Grand Central Station', completed: true },
          { id: 'c2', text: 'Visit Penn Station', completed: true },
          { id: 'c3', text: 'Take photos of beverage displays', completed: true }
        ]
      },
      { 
        id: 't2', 
        title: 'Submit quarterly compliance report', 
        status: 'pending', 
        assignedTo: 'a1', 
        createdAt: '1 day ago',
        priority: 'medium',
        checklist: [
          { id: 'c4', text: 'Compile field submissions', completed: false },
          { id: 'c5', text: 'Analyze regional KPIs', completed: false },
          { id: 'c6', text: 'Draft executive summary', completed: false }
        ]
      },
      { 
        id: 't3', 
        title: 'Auditor check for Miami high-traffic locations', 
        status: 'pending', 
        assignedTo: 'a2', 
        createdAt: '5 hours ago',
        priority: 'low',
        checklist: [
          { id: 'c7', text: 'Sync with local surveyors', completed: true },
          { id: 'c8', text: 'Conduct surprise audits at 3 locations', completed: false }
        ]
      }
    ]
  },
  '2': {
    id: '2',
    title: 'Hydrate Pro Launch',
    status: 'scheduled',
    region: 'Western EU',
    type: 'Shelf Availability',
    startDate: 'May 01, 2024',
    endDate: 'Aug 01, 2024',
    dueDate: 'Aug 05, 2024',
    description: 'New product introduction audit for Hydrate Pro performance beverage. Verifying shelf positioning and "New Product" call-out presence in European hypermarkets.',
    progress: 0,
    priority: 'medium',
    tags: ['Launch', 'Retail', 'Beverage'],
    agents: [
      { 
        id: 'a4', 
        name: 'Anna Fischer', 
        role: 'Lead', 
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        email: 'a.fischer@bluefield.com',
        permissions: ['can_submit', 'can_approve', 'can_edit', 'can_export'],
        recentActivity: []
      }
    ],
    tasks: []
  }
};

const permissionLabels: Record<string, string> = {
  'can_submit': 'Submit Data',
  'can_approve': 'Approve Submissions',
  'can_edit': 'Edit Form',
  'can_export': 'Export Reports'
};

const rolePermissions: Record<string, string[]> = {
  'Lead': ['can_submit', 'can_approve', 'can_edit', 'can_export'],
  'Auditor': ['can_submit', 'can_approve', 'can_export'],
  'Surveyor': ['can_submit'],
  'Viewer': []
};

const activityTypeLabels: Record<string, string> = {
  'submission': 'Submission',
  'report_update': 'Report Update',
  'status_change': 'Status Change'
};

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

export const CampaignDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const [selectedAgentFilter, setSelectedAgentFilter] = useState<string>('all');
  const [selectedTypeFilter, setSelectedTypeFilter] = useState<string>('all');

  const initialCampaign = campaignDetails[id || ''] || campaignDetails['1'];
  const [agents, setAgents] = useState(initialCampaign.agents);
  const [tasks, setTasks] = useState(initialCampaign.tasks || []);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [taskAgentId, setTaskAgentId] = useState('');
  const [newTaskPriority, setNewTaskPriority] = useState('medium');
  const [taskSortBy, setTaskSortBy] = useState<'date' | 'priority'>('priority');
  const [newChecklistItems, setNewChecklistItems] = useState<Record<string, string>>({});
  const [savingAgentId, setSavingAgentId] = useState<string | null>(null);
  const isManager = user?.role === 'manager';

  const campaign = { ...initialCampaign, agents, tasks };

  const handleRoleChange = (agentId: string, newRole: string) => {
    setSavingAgentId(agentId);
    setAgents((prev: any[]) => prev.map((agent: any) => {
      if (agent.id === agentId) {
        return {
          ...agent,
          role: newRole,
          permissions: rolePermissions[newRole] || []
        };
      }
      return agent;
    }));
    setTimeout(() => setSavingAgentId(null), 1000);
  };

  const togglePermission = (agentId: string, permission: string) => {
    setSavingAgentId(agentId);
    setAgents((prev: any[]) => prev.map((agent: any) => {
      if (agent.id === agentId) {
        const hasPermission = agent.permissions.includes(permission);
        const newPermissions = hasPermission
          ? agent.permissions.filter((p: string) => p !== permission)
          : [...agent.permissions, permission];
        return {
          ...agent,
          permissions: newPermissions
        };
      }
      return agent;
    }));
    setTimeout(() => setSavingAgentId(null), 1000);
  };

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
      checklist: []
    };

    setTasks((prev: any) => [newTask, ...prev]);
    setNewTaskTitle('');
    setTaskAgentId('');
    setNewTaskPriority('medium');
  };

  const toggleTaskStatus = (taskId: string) => {
    setTasks((prev: any[]) => prev.map((t: { id: string; status: string; }) => 
      t.id === taskId ? { ...t, status: t.status === 'completed' ? 'pending' : 'completed' } : t
    ));
  };

  const deleteTask = (taskId: string) => {
    setTasks((prev: any[]) => prev.filter((t: { id: string; }) => t.id !== taskId));
  };

  const addChecklistItem = (taskId: string) => {
    const text = newChecklistItems[taskId];
    if (!text?.trim()) return;

    setTasks((prev: any[]) => prev.map((t: { id: string; checklist: any; }) => {
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
    setTasks((prev: any[]) => prev.map((t: { id: string; checklist: any[]; }) => {
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
    setTasks((prev: any[]) => prev.map((t: { id: string; checklist: any[]; }) => {
      if (t.id === taskId) {
        return {
          ...t,
          checklist: t.checklist.filter((item: any) => item.id !== itemId)
        };
      }
      return t;
    }));
  };

  const sortedTasks = useMemo(() => {
    return [...tasks].sort((a, b) => {
      if (taskSortBy === 'priority') {
        const orderA = priorityOrder[a.priority as keyof typeof priorityOrder] || 99;
        const orderB = priorityOrder[b.priority as keyof typeof priorityOrder] || 99;
        if (orderA !== orderB) return orderA - orderB;
      }
      // Falling back to "createdAt" (reverse chronological roughly)
      return b.id.localeCompare(a.id);
    });
  }, [tasks, taskSortBy]);

  const allActivities = useMemo(() => {
    return campaign.agents.flatMap((agent: any) => 
      agent.recentActivity.map((activity: any) => ({
        ...activity,
        agentName: agent.name,
        agentAvatar: agent.avatar,
        agentId: agent.id
      }))
    ).sort((a: any, b: any) => {
      // Very crude time sorting for mock data
      const timeA = a.time.includes('hours') ? parseInt(a.time) : 24;
      const timeB = b.time.includes('hours') ? parseInt(b.time) : 24;
      return timeA - timeB;
    });
  }, [campaign.agents]);

  const filteredActivities = useMemo(() => {
    return allActivities.filter((activity: any) => {
      const matchesAgent = selectedAgentFilter === 'all' || activity.agentId === selectedAgentFilter;
      const matchesType = selectedTypeFilter === 'all' || activity.type === selectedTypeFilter;
      return matchesAgent && matchesType;
    });
  }, [allActivities, selectedAgentFilter, selectedTypeFilter]);

  const goBack = () => {
    const base = user?.role === 'manager' ? '/manager' : '/client';
    navigate(`${base}/campaigns`);
  };

  return (
    <div className="space-y-8 pb-10">
      <div className="flex items-center gap-4">
        <button 
          onClick={goBack}
          className="p-3 bg-white border border-slate-100 text-slate-400 hover:text-slate-600 rounded-2xl transition-all shadow-sm hover:shadow-md"
        >
          <ChevronLeft size={20} />
        </button>
        <div>
          <h1 className="text-2xl font-black text-slate-800 tracking-tight">Campaign Detail</h1>
          <p className="text-sm font-bold text-slate-400 uppercase tracking-widest mt-0.5">Reference ID: #BF-{campaign.id}{campaign.status.toUpperCase()}</p>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-8">
        {/* Main Info Column */}
        <div className="col-span-2 space-y-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/40 p-8"
          >
            <div className="flex justify-between items-start mb-8">
              <div className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  <span className={cn(
                    "px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest",
                    campaign.status === 'active' ? "bg-emerald-50 text-emerald-600" :
                    campaign.status === 'completed' ? "bg-blue-50 text-blue-600" :
                    campaign.status === 'scheduled' ? "bg-amber-50 text-amber-600" :
                    "bg-slate-100 text-slate-500"
                  )}>
                    {campaign.status}
                  </span>
                  <span className={cn(
                    "px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center gap-1.5",
                    campaign.priority === 'high' ? "bg-rose-50 text-rose-600" :
                    campaign.priority === 'medium' ? "bg-amber-50 text-amber-600" :
                    "bg-blue-50 text-blue-600"
                  )}>
                    <Flag size={10} />
                    {campaign.priority} priority
                  </span>
                </div>
                <h2 className="text-3xl font-black text-slate-900 leading-tight">
                  {campaign.title}
                </h2>
              </div>
              <div className="text-right">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2">Overall Progress</p>
                <div className="flex items-center gap-4">
                   <span className="text-4xl font-black text-slate-900 tracking-tighter">{campaign.progress}%</span>
                   <div className="w-32 h-3 bg-slate-100 rounded-full overflow-hidden">
                     <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${campaign.progress}%` }}
                        className={cn(
                          "h-full rounded-full transition-all duration-1000",
                          campaign.status === 'active' ? "bg-blue-600 shadow-[0_0_12px_rgba(37,99,235,0.4)]" :
                          campaign.status === 'completed' ? "bg-emerald-500" :
                          "bg-slate-300"
                        )}
                     />
                   </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-6 p-6 bg-slate-50 rounded-3xl border border-slate-100">
              <div className="space-y-1">
                <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Target Region</p>
                <div className="flex items-center gap-2 text-sm font-bold text-slate-700">
                  <Globe size={14} className="text-blue-500" />
                  {campaign.region}
                </div>
              </div>
              <div className="space-y-1">
                <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Audit Type</p>
                <div className="flex items-center gap-2 text-sm font-bold text-slate-700">
                  <Target size={14} className="text-indigo-500" />
                  {campaign.type}
                </div>
              </div>
              <div className="space-y-1">
                <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Timeframe</p>
                <div className="flex items-center gap-2 text-sm font-bold text-slate-700">
                  <Calendar size={14} className="text-emerald-500" />
                  {campaign.startDate} - {campaign.endDate}
                </div>
              </div>
            </div>

            <div className="mt-8 space-y-4">
              <div className="flex items-center gap-2">
                <FileText size={18} className="text-slate-400" />
                <h3 className="text-sm font-bold text-slate-800 uppercase tracking-widest">Campaign Description</h3>
              </div>
              <p className="text-slate-500 text-sm font-medium leading-relaxed">
                {campaign.description}
              </p>
              <div className="flex gap-2 pt-2">
                {campaign.tags.map((tag: string) => (
                  <span key={tag} className="px-3 py-1 bg-white border border-slate-100 text-[10px] font-bold text-indigo-500 rounded-lg shadow-sm">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>

          {/* New Task Management Section */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/40 p-8"
          >
            <div className="flex justify-between items-center mb-8">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 shadow-sm shadow-blue-100">
                  <ListTodo size={20} />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-800 tracking-tight">Task Management</h3>
                  <p className="text-xs text-slate-400 font-medium uppercase tracking-wider">Campaign specific sub-tasks</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                 <div className="flex bg-slate-50 p-1 rounded-xl border border-slate-100 items-center">
                    <button 
                      onClick={() => setTaskSortBy('priority')}
                      className={cn(
                        "px-3 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-widest transition-all",
                        taskSortBy === 'priority' ? "bg-white text-slate-800 shadow-sm border border-slate-100" : "text-slate-400 hover:text-slate-600"
                      )}
                    >
                      Priority
                    </button>
                    <button 
                      onClick={() => setTaskSortBy('date')}
                      className={cn(
                        "px-3 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-widest transition-all",
                        taskSortBy === 'date' ? "bg-white text-slate-800 shadow-sm border border-slate-100" : "text-slate-400 hover:text-slate-600"
                      )}
                    >
                      Date
                    </button>
                 </div>
                 <span className="px-3 py-1 bg-slate-50 text-slate-500 rounded-full text-[10px] font-black uppercase tracking-widest">
                   {tasks.filter((t: { status: string; }) => t.status === 'completed').length}/{tasks.length} Done
                 </span>
              </div>
            </div>

            <div className="space-y-6">
              {/* Task Creation Form - Only for Managers */}
              {isManager && (
                <form onSubmit={addTask} className="flex flex-col md:flex-row gap-3 p-4 bg-slate-50 rounded-3xl border border-slate-100 border-dashed">
                   <div className="flex flex-wrap gap-3">
                    <div className="flex-1 relative min-w-[200px]">
                      <input 
                        type="text" 
                        value={newTaskTitle}
                        onChange={(e) => setNewTaskTitle(e.target.value)}
                        placeholder="Enter new campaign task..."
                        className="w-full bg-white border border-slate-200 rounded-2xl py-3 pl-10 pr-4 text-xs font-bold text-slate-700 focus:outline-none focus:border-blue-500 transition-all shadow-sm"
                      />
                      <Plus size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                    </div>
                    <div className="relative">
                      <select 
                        value={taskAgentId}
                        onChange={(e) => setTaskAgentId(e.target.value)}
                        className="appearance-none bg-white border border-slate-200 rounded-2xl py-3 pl-10 pr-10 text-xs font-bold text-slate-700 focus:outline-none focus:border-blue-500 transition-all shadow-sm cursor-pointer min-w-[150px]"
                      >
                        <option value="">Assign To...</option>
                        {agents.map((agent: any) => (
                          <option key={agent.id} value={agent.id}>{agent.name}</option>
                        ))}
                      </select>
                      <UserPlus size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                      <ChevronLeft size={12} className="absolute right-4 top-1/2 -translate-y-1/2 rotate-[270deg] text-slate-400 pointer-events-none" />
                    </div>
                    <div className="relative">
                      <select 
                        value={newTaskPriority}
                        onChange={(e) => setNewTaskPriority(e.target.value)}
                        className="appearance-none bg-white border border-slate-200 rounded-2xl py-3 pl-10 pr-10 text-xs font-bold text-slate-700 focus:outline-none focus:border-blue-500 transition-all shadow-sm cursor-pointer min-w-[120px]"
                      >
                        {Object.entries(taskPriorityLabels).map(([key, config]) => (
                          <option key={key} value={key}>{config.label} Priority</option>
                        ))}
                      </select>
                      <Flag size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                      <ChevronLeft size={12} className="absolute right-4 top-1/2 -translate-y-1/2 rotate-[270deg] text-slate-400 pointer-events-none" />
                    </div>
                    <button 
                      type="submit"
                      disabled={!newTaskTitle.trim() || !taskAgentId}
                      className="bg-slate-900 text-white px-6 py-3 rounded-2xl text-xs font-bold hover:bg-slate-800 disabled:opacity-50 disabled:grayscale transition-all shadow-lg active:scale-95 ml-auto"
                    >
                      Add Task
                    </button>
                   </div>
                </form>
              )}

              <div className="space-y-3">
                <AnimatePresence mode="popLayout">
                  {sortedTasks.length > 0 ? sortedTasks.map((task) => {
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
                          "group flex flex-col p-6 bg-white border rounded-[2rem] transition-all relative overflow-hidden",
                          task.status === 'completed' ? "border-emerald-100 bg-emerald-50/20" : "border-slate-100 hover:border-slate-200"
                        )}
                      >
                        {/* Subtle Background Progress - Purely aesthetic */}
                        <div className="absolute top-0 left-0 h-1 bg-blue-500/5 transition-all duration-1000 pointer-events-none" style={{ width: `${statusInfo.percent}%` }} />

                        <div className="flex items-center justify-between gap-4 mb-4 relative z-10">
                          <div className="flex items-center gap-4 flex-1">
                            <button 
                              onClick={() => toggleTaskStatus(task.id)}
                              className={cn(
                                "w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all",
                                task.status === 'completed' 
                                  ? "bg-emerald-500 border-emerald-500 text-white shadow-lg shadow-emerald-100" 
                                  : "border-slate-200 text-transparent hover:border-blue-400"
                              )}
                            >
                              <Check size={14} />
                            </button>
                            <div className={cn(
                              "flex-1 transition-all",
                              task.status === 'completed' ? "opacity-50 line-through" : ""
                            )}>
                              <div className="flex flex-wrap items-center gap-2">
                                <p className="text-sm font-bold text-slate-800 tracking-tight">{task.title}</p>
                                <div className="flex items-center gap-1.5 ml-auto md:ml-0">
                                  <span className={cn(
                                    "px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-widest border flex items-center gap-1",
                                    priorityConfig.color
                                  )}>
                                    <div className={cn("w-1 h-1 rounded-full", priorityConfig.dot)} />
                                    {priorityConfig.label}
                                  </span>
                                  <span className={cn(
                                    "px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-widest border flex items-center gap-1",
                                    statusInfo.color
                                  )}>
                                    <div className={cn("w-1 h-1 rounded-full", statusInfo.dot)} />
                                    {statusInfo.label}
                                  </span>
                                </div>
                              </div>
                              <div className="flex items-center gap-3 mt-1">
                                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{task.createdAt}</span>
                                <div className="w-1 h-1 rounded-full bg-slate-200" />
                                <div className="flex items-center gap-1.5">
                                  <img src={assignedAgent?.avatar} className="w-4 h-4 rounded-full object-cover" />
                                  <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest">{assignedAgent?.name}</span>
                                </div>
                              </div>
                            </div>
                          </div>
                          {isManager && (
                            <button 
                              onClick={() => deleteTask(task.id)}
                              className="p-2 border border-transparent text-slate-300 hover:text-rose-500 hover:bg-rose-50 hover:border-rose-100 rounded-xl transition-all opacity-0 group-hover:opacity-100"
                            >
                              <Trash2 size={16} />
                            </button>
                          )}
                        </div>

                        {/* Checklist Section */}
                        <div className="pl-10 space-y-4 relative z-10">
                          <div className="flex items-center justify-between mb-1">
                             <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] flex items-center gap-2">
                               <ListTodo size={12} className="text-blue-500" />
                               Sub-Task Checklist
                             </p>
                             {task.checklist?.length > 0 && (
                               <span className={cn(
                                 "text-[10px] font-bold px-2 py-0.5 rounded-full",
                                 statusInfo.percent === 100 
                                   ? "text-emerald-600 bg-emerald-50" 
                                   : "text-blue-600 bg-blue-50"
                               )}>
                                 {statusInfo.percent}% Complete
                               </span>
                             )}
                          </div>
                          
                          {task.checklist?.length > 0 && (
                            <div className="w-full h-1 bg-slate-100 rounded-full overflow-hidden">
                              <motion.div 
                                initial={{ width: 0 }}
                                animate={{ width: `${statusInfo.percent}%` }}
                                className={cn(
                                  "h-full rounded-full transition-all duration-500",
                                  statusInfo.percent === 100 
                                    ? "bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.3)]" 
                                    : "bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.3)]"
                                )}
                              />
                            </div>
                          )}
                          
                          <div className="space-y-2 pt-2">
                             {task.checklist?.map((item: any) => (
                               <div key={item.id} className="flex items-center justify-between group/item">
                                 <button 
                                   onClick={() => toggleChecklistItem(task.id, item.id)}
                                   className="flex items-center gap-3 text-left"
                                 >
                                   <div className={cn(
                                     "w-4 h-4 rounded border transition-all flex items-center justify-center",
                                     item.completed ? "bg-blue-500 border-blue-500 text-white" : "border-slate-200 text-transparent"
                                   )}>
                                     <Check size={10} />
                                   </div>
                                   <span className={cn(
                                     "text-xs font-medium transition-all",
                                     item.completed ? "text-slate-400 line-through" : "text-slate-600"
                                   )}>
                                     {item.text}
                                   </span>
                                 </button>
                                 {isManager && (
                                   <button 
                                     onClick={() => deleteChecklistItem(task.id, item.id)}
                                     className="p-1 text-slate-300 hover:text-rose-400 opacity-0 group-hover/item:opacity-100 transition-all"
                                   >
                                     <Trash2 size={12} />
                                   </button>
                                 )}
                               </div>
                             ))}
                          </div>

                          {isManager && (
                            <div className="flex gap-2 pt-2">
                              <input 
                                type="text"
                                placeholder="Add checklist item..."
                                value={newChecklistItems[task.id] || ''}
                                onChange={(e) => setNewChecklistItems(prev => ({ ...prev, [task.id]: e.target.value }))}
                                onKeyDown={(e) => e.key === 'Enter' && addChecklistItem(task.id)}
                                className="flex-1 bg-slate-50 border border-slate-100 rounded-xl px-4 py-2 text-[11px] font-bold focus:outline-none focus:border-blue-300 transition-all"
                              />
                              <button 
                                onClick={() => addChecklistItem(task.id)}
                                disabled={!newChecklistItems[task.id]?.trim()}
                                className="bg-blue-600 text-white p-2 rounded-xl hover:bg-blue-700 disabled:opacity-30 transition-all"
                              >
                                <Plus size={14} />
                              </button>
                            </div>
                          )}
                        </div>
                      </motion.div>
                    );
                  }) : (
                    <div className="py-12 text-center rounded-[2rem] border-2 border-dashed border-slate-50">
                      <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center text-slate-200 mx-auto mb-4">
                        <ListTodo size={32} />
                      </div>
                      <h4 className="text-sm font-bold text-slate-800 tracking-tight">No sub-tasks yet</h4>
                      <p className="text-xs text-slate-400 font-medium max-w-[200px] mx-auto mt-1">Break down this campaign into actionable micro-tasks.</p>
                    </div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>

          {/* New Integrated Activity Feed Section */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="bg-white rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/40 overflow-hidden"
          >
            <div className="p-8 border-b border-slate-50 space-y-6">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-600 shadow-sm shadow-indigo-100">
                    <Activity size={20} />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-800 tracking-tight">Real-time Activity Feed</h3>
                    <p className="text-xs text-slate-400 font-medium uppercase tracking-wider">Audit trail for all assigned agents</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-black text-emerald-500 bg-emerald-50 px-3 py-1 rounded-full uppercase tracking-widest animate-pulse">Live</span>
                </div>
              </div>

              {/* Filters */}
              <div className="flex flex-wrap gap-4 items-center pt-2">
                <div className="flex items-center gap-2">
                  <Filter size={14} className="text-slate-400" />
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Filter:</span>
                </div>
                
                <div className="flex gap-2 bg-slate-50 p-1 rounded-xl border border-slate-100">
                  <button 
                    onClick={() => setSelectedAgentFilter('all')}
                    className={cn(
                      "px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-widest transition-all",
                      selectedAgentFilter === 'all' ? "bg-white text-slate-800 shadow-sm border border-slate-100" : "text-slate-400 hover:text-slate-600"
                    )}
                  >
                    All Agents
                  </button>
                  {campaign.agents.map((agent: any) => (
                    <button 
                      key={agent.id}
                      onClick={() => setSelectedAgentFilter(agent.id)}
                      className={cn(
                        "px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-widest transition-all flex items-center gap-2",
                        selectedAgentFilter === agent.id ? "bg-white text-slate-800 shadow-sm border border-slate-100" : "text-slate-400 hover:text-slate-600"
                      )}
                    >
                      <img src={agent.avatar} className="w-4 h-4 rounded-full object-cover" />
                      {agent.name.split(' ')[0]}
                    </button>
                  ))}
                </div>

                <div className="flex gap-2 bg-slate-50 p-1 rounded-xl border border-slate-100">
                  <button 
                    onClick={() => setSelectedTypeFilter('all')}
                    className={cn(
                      "px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-widest transition-all",
                      selectedTypeFilter === 'all' ? "bg-white text-slate-800 shadow-sm border border-slate-100" : "text-slate-400 hover:text-slate-600"
                    )}
                  >
                    All Activities
                  </button>
                  {Object.entries(activityTypeLabels).map(([type, label]) => (
                    <button 
                      key={type}
                      onClick={() => setSelectedTypeFilter(type)}
                      className={cn(
                        "px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-widest transition-all",
                        selectedTypeFilter === type ? "bg-white text-slate-800 shadow-sm border border-slate-100" : "text-slate-400 hover:text-slate-600"
                      )}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="max-h-[600px] overflow-y-auto">
              <table className="w-full text-left border-collapse">
                <thead className="sticky top-0 bg-white z-20 border-b border-slate-100 shadow-sm">
                  <tr>
                    <th className="p-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Agent</th>
                    <th className="p-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Action</th>
                    <th className="p-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Type</th>
                    <th className="p-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Target</th>
                    <th className="p-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] text-right">Time</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50 bg-white">
                  <AnimatePresence mode="popLayout">
                    {filteredActivities.length > 0 ? filteredActivities.map((activity: any, idx: number) => (
                      <motion.tr 
                        layout
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ delay: idx * 0.03 }}
                        key={`${activity.agentId}-${activity.id}`} 
                        className="group hover:bg-slate-50/50 transition-colors"
                      >
                        <td className="p-6">
                           <div className="flex items-center gap-3">
                             <img src={activity.agentAvatar} className="w-8 h-8 rounded-xl object-cover shadow-sm border border-white" alt={activity.agentName} />
                             <span className="text-sm font-bold text-slate-800">{activity.agentName}</span>
                           </div>
                        </td>
                        <td className="p-6">
                          <p className="text-sm font-medium text-slate-600">{activity.action}</p>
                          {activity.type === 'submission' && (
                            <div className="mt-2 text-[10px] flex items-center gap-1.5 text-emerald-600 font-bold bg-emerald-50 w-fit px-2 py-0.5 rounded-full">
                              <CheckCircle2 size={10} />
                              Verified
                            </div>
                          )}
                        </td>
                        <td className="p-6">
                          <span className={cn(
                            "px-2.5 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest shadow-sm border",
                            activity.type === 'submission' ? "bg-emerald-50 text-emerald-600 border-emerald-100" :
                            activity.type === 'report_update' ? "bg-blue-50 text-blue-600 border-blue-100" :
                            "bg-amber-50 text-amber-600 border-amber-100"
                          )}>
                            {activityTypeLabels[activity.type] || activity.type}
                          </span>
                        </td>
                        <td className="p-6">
                          <div className="flex items-center gap-1.5 text-xs font-bold text-slate-400 uppercase tracking-widest">
                            <MapPin size={10} className="text-slate-300" />
                            {activity.target}
                          </div>
                        </td>
                        <td className="p-6 text-right">
                          <div className="flex items-center justify-end gap-1.5 text-xs font-bold text-slate-400 uppercase tracking-widest">
                            <Clock size={10} className="text-slate-300" />
                            {activity.time}
                          </div>
                        </td>
                      </motion.tr>
                    )) : (
                      <tr>
                        <td colSpan={5}>
                          <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="flex flex-col items-center justify-center py-20 text-center"
                          >
                            <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center text-slate-200 mb-4">
                              <Activity size={40} />
                            </div>
                            <h4 className="text-lg font-bold text-slate-800">No matching activities</h4>
                            <p className="text-sm text-slate-400 max-w-xs mt-1">Adjust your filters to see recent squad operations within this campaign.</p>
                            <button 
                              onClick={() => { setSelectedAgentFilter('all'); setSelectedTypeFilter('all'); }}
                              className="mt-6 px-6 py-2 bg-slate-900 text-white rounded-xl text-xs font-bold hover:bg-slate-800 transition-all flex items-center gap-2"
                            >
                              <RefreshCcw size={14} />
                              Reset All Filters
                            </button>
                          </motion.div>
                        </td>
                      </tr>
                    )}
                  </AnimatePresence>
                </tbody>
              </table>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/40 overflow-hidden"
          >
            <div className="p-8 border-b border-slate-50 flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 shadow-sm shadow-blue-100">
                  <Users size={20} />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-800 tracking-tight">Assigned Agents</h3>
                  <p className="text-xs text-slate-400 font-medium uppercase tracking-wider">Managing {campaign.agents.length} field operations</p>
                </div>
              </div>
              <button className="px-5 py-2.5 bg-slate-900 text-white rounded-xl text-xs font-bold hover:bg-slate-800 transition-all flex items-center gap-2 shadow-lg shadow-slate-200">
                Manage Squad
                <ChevronLeft size={14} className="rotate-180" />
              </button>
            </div>

            <div className="divide-y divide-slate-50">
              {campaign.agents.map((agent: any) => (
                <div key={agent.id} className="p-8 hover:bg-slate-50/50 transition-colors">
                  <div className="flex items-start gap-6">
                    <img src={agent.avatar} className="w-16 h-16 rounded-[1.25rem] object-cover ring-4 ring-white shadow-lg" alt={agent.name} />
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <div className="flex items-center gap-3">
                            <h4 className="text-lg font-bold text-slate-800">{agent.name}</h4>
                            <AnimatePresence>
                              {savingAgentId === agent.id && (
                                <motion.span 
                                  initial={{ opacity: 0, scale: 0.8 }}
                                  animate={{ opacity: 1, scale: 1 }}
                                  exit={{ opacity: 0, scale: 0.8 }}
                                  className="text-[8px] font-black uppercase tracking-widest text-emerald-500 bg-emerald-50 px-2 py-0.5 rounded-full flex items-center gap-1"
                                >
                                  <RefreshCcw size={8} className="animate-spin" />
                                  Applying Changes...
                                </motion.span>
                              )}
                            </AnimatePresence>
                          </div>
                          <div className="flex items-center gap-2 text-xs text-slate-400 font-medium mt-0.5">
                            <Mail size={12} />
                            {agent.email}
                          </div>
                        </div>
                        {isManager ? (
                          <div className="relative">
                            <select 
                              value={agent.role}
                              onChange={(e) => handleRoleChange(agent.id, e.target.value)}
                              className="appearance-none bg-blue-50 text-blue-700 px-8 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest border border-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm cursor-pointer"
                            >
                              {Object.keys(rolePermissions).map(role => (
                                <option key={role} value={role}>{role}</option>
                              ))}
                            </select>
                            <ChevronLeft size={10} className="absolute right-3 top-1/2 -translate-y-1/2 rotate-[270deg] text-blue-600 pointer-events-none" />
                          </div>
                        ) : (
                          <span className="px-4 py-1.5 bg-blue-50 text-blue-700 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-sm">
                            {agent.role}
                          </span>
                        )}
                      </div>

                      <div className="space-y-4">
                         <div>
                           <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-3 flex items-center gap-1.5">
                             <Shield size={10} />
                             {isManager ? 'Manage Permissions' : 'Active Permissions'}
                           </p>
                           <div className="flex flex-wrap gap-2">
                             {Object.entries(permissionLabels).map(([key, label]) => {
                               const isActive = agent.permissions.includes(key);
                               if (!isManager && !isActive) return null;
                               
                               return (
                                 <button
                                   key={key}
                                   disabled={!isManager}
                                   onClick={() => togglePermission(agent.id, key)}
                                   className={cn(
                                     "px-3 py-1.5 rounded-lg text-[10px] font-bold flex items-center gap-1.5 transition-all",
                                     isActive 
                                       ? "bg-emerald-50 text-emerald-700 border border-emerald-100 shadow-sm" 
                                       : "bg-slate-50 text-slate-400 border border-slate-100 grayscale opacity-60 hover:grayscale-0 hover:opacity-100"
                                   )}
                                 >
                                   <CheckCircle2 size={10} className={cn(isActive ? "text-emerald-500" : "text-slate-300")} />
                                   {label}
                                 </button>
                               );
                             })}
                           </div>
                         </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Sidebar Column */}
        <div className="space-y-8">
           <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/40 p-8"
          >
            <div className="flex items-center gap-3 mb-8">
               <div className="w-10 h-10 bg-rose-50 rounded-2xl flex items-center justify-center text-rose-500 shadow-sm shadow-rose-100">
                  <Clock size={20} />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-800 tracking-tight">Deadlines</h3>
                  <p className="text-xs text-slate-400 font-medium uppercase tracking-wider">Critical milestones</p>
                </div>
            </div>

            <div className="space-y-6">
              <div className="relative pl-6 border-l-2 border-slate-50 space-y-1">
                <div className="absolute -left-[5px] top-0 w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Project Launch</p>
                <p className="text-sm font-bold text-slate-800">{campaign.startDate}</p>
              </div>
              <div className="relative pl-6 border-l-2 border-slate-50 space-y-1">
                <div className="absolute -left-[5px] top-0 w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.5)]" />
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Current Target</p>
                <p className="text-sm font-bold text-slate-800">{campaign.endDate}</p>
                <p className="text-[10px] text-blue-500 font-bold">24 Days Remaining</p>
              </div>
              <div className="relative pl-6 border-l-2 border-slate-50 space-y-1">
                <div className="absolute -left-[5px] top-0 w-2 h-2 rounded-full bg-rose-500 animate-pulse shadow-[0_0_8px_rgba(244,63,94,0.5)]" />
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Final Reporting Due</p>
                <p className="text-sm font-bold text-slate-800">{campaign.dueDate}</p>
              </div>
            </div>

            <button className="w-full mt-10 py-4 bg-slate-50 text-slate-600 rounded-2xl text-xs font-bold hover:bg-slate-100 transition-all flex items-center justify-center gap-2 border border-slate-100">
               <Calendar size={16} />
               Export Timeline to Calendar
            </button>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/40 p-8"
          >
            <div className="flex items-center gap-3 mb-8">
               <div className="w-10 h-10 bg-amber-50 rounded-2xl flex items-center justify-center text-amber-500 shadow-sm shadow-amber-100">
                  <AlertCircle size={20} />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-800 tracking-tight">Recent Logs</h3>
                  <p className="text-xs text-slate-400 font-medium uppercase tracking-wider">Campaign history</p>
                </div>
            </div>

            <div className="space-y-6">
              {campaign.timeline?.map((item: any) => (
                <div key={item.id} className="space-y-1 p-4 bg-slate-50/50 rounded-2xl border border-slate-50">
                  <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">{item.date}</p>
                  <p className="text-xs font-bold text-slate-800">{item.event}</p>
                  <p className="text-[10px] text-slate-400 font-medium">By {item.user}</p>
                </div>
              ))}
            </div>

            <button className="w-full mt-10 py-4 border-2 border-dashed border-slate-100 text-slate-400 rounded-2xl text-xs font-bold hover:border-slate-200 hover:text-slate-500 transition-all flex items-center justify-center gap-2">
               View Full Audit Logs
               <ExternalLink size={14} />
            </button>
          </motion.div>
        </div>
      </div>
    </div>
  );
};
