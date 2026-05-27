import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  MapPin, 
  CheckCircle2, 
  Bell,
  ClipboardCheck,
  Trophy,
  Layout,
  ClipboardList,
  Users,
  Settings,
  LogOut,
  Clock,
  Flag,
  ArrowUpDown,
  X,
  BellRing
} from 'lucide-react';
import { cn } from '../lib/utils';
import { useAuth } from '../contexts/AuthContext';
import { useNotifications } from '../contexts/NotificationContext';
import { NotificationPopover } from '../components/NotificationPopover';

import { useNavigate } from 'react-router-dom';

type Priority = 'High' | 'Medium' | 'Low';

interface ScheduleItem {
  time: string;
  store: string;
  task: string;
  status: 'completed' | 'current' | 'pending';
  dueDate: string;
  priority: Priority;
}

const initialSchedule: ScheduleItem[] = [
  { time: '09:00 AM', store: 'Westside Mall Store', task: 'Visual Merchandising Audit', status: 'completed', dueDate: 'Today, 10:00 AM', priority: 'Medium' },
  { time: '13:30 PM', store: 'Downtown Flagship', task: 'Inventory Check', status: 'current', dueDate: 'Today, 15:00 PM', priority: 'High' },
  { time: '15:45 PM', store: 'Northstar Boutique', task: 'Safety Compliance', status: 'pending', dueDate: 'Tomorrow, 12:00 PM', priority: 'Low' },
];

const priorityWeight: Record<Priority, number> = {
  'High': 3,
  'Medium': 2,
  'Low': 1
};

export const AgentPortal = () => {
  const navigate = useNavigate();
  const { logout, user } = useAuth();
  const { unreadCount } = useNotifications();
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [schedule ] = useState<ScheduleItem[]>(initialSchedule);
  const [sortOrder, setSortOrder] = useState<'desc' | 'asc' | 'none'>('none');

  const sortedSchedule = useMemo(() => {
    if (sortOrder === 'none') return schedule;
    return [...schedule].sort((a, b) => {
      const weightA = priorityWeight[a.priority];
      const weightB = priorityWeight[b.priority];
      return sortOrder === 'desc' ? weightB - weightA : weightA - weightB;
    });
  }, [schedule, sortOrder]);

  const toggleSort = () => {
    setSortOrder(current => {
      if (current === 'none') return 'desc';
      if (current === 'desc') return 'asc';
      return 'none';
    });
  };

  const priorityColors: Record<Priority, string> = {
    'High': 'text-rose-500 bg-rose-50',
    'Medium': 'text-amber-500 bg-amber-50',
    'Low': 'text-blue-500 bg-blue-50'
  };

  const [reminders, setReminders] = useState<Record<string, number>>({});
  const [editingReminder, setEditingReminder] = useState<string | null>(null);
  const [customMins, setCustomMins] = useState<string>('');

  const reminderOptions = [
    { label: '5 mins before', value: 5 },
    { label: '15 mins before', value: 15 },
    { label: '30 mins before', value: 30 },
    { label: '1 hour before', value: 60 },
  ];

  const handleSetReminder = (key: string, value: number) => {
    setReminders(prev => ({ ...prev, [key]: value }));
    setEditingReminder(null);
    setCustomMins('');
  };

  return (
    <div className="max-w-md mx-auto bg-[#F9F9FF] min-h-screen pb-24 font-sans relative">
      <AnimatePresence>
        {editingReminder && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => {
                setEditingReminder(null);
                setCustomMins('');
              }}
              className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[100]"
            />
            <motion.div 
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white rounded-t-[2.5rem] p-8 z-[101] shadow-2xl"
            >
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h3 className="text-lg font-bold text-slate-800">Set Reminder</h3>
                  <p className="text-xs text-slate-400 font-medium">Notification timing for this task</p>
                </div>
                <button 
                  onClick={() => {
                    setEditingReminder(null);
                    setCustomMins('');
                  }}
                  className="p-2 hover:bg-slate-50 rounded-full transition-colors"
                >
                  <X size={20} className="text-slate-400" />
                </button>
              </div>
              
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  {reminderOptions.map((opt) => (
                    <button
                      key={opt.value}
                      onClick={() => handleSetReminder(editingReminder, opt.value)}
                      className={cn(
                        "p-4 rounded-2xl border text-left font-bold transition-all flex flex-col gap-1",
                        reminders[editingReminder] === opt.value
                          ? "bg-blue-600 border-blue-600 text-white shadow-lg shadow-blue-200"
                          : "bg-white border-slate-100 text-slate-600 hover:border-blue-200"
                      )}
                    >
                      <Clock size={16} className={cn(reminders[editingReminder] === opt.value ? "text-white" : "text-blue-500")} />
                      <span className="text-[11px] uppercase tracking-wider mt-1">{opt.label}</span>
                    </button>
                  ))}
                </div>

                <div className="pt-4 border-t border-slate-50">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">Or set custom minutes</p>
                  <div className="flex gap-2">
                    <div className="relative flex-1">
                      <input 
                        type="number" 
                        value={customMins}
                        onChange={(e) => setCustomMins(e.target.value)}
                        placeholder="Enter minutes"
                        className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 text-sm font-bold focus:outline-none focus:ring-4 focus:ring-blue-600/5 focus:border-blue-200 transition-all"
                      />
                      <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[10px] font-bold text-slate-400 uppercase tracking-widest pointer-events-none">MINS</span>
                    </div>
                    <button 
                      onClick={() => {
                        const val = parseInt(customMins);
                        if (val > 0) handleSetReminder(editingReminder, val);
                      }}
                      disabled={!customMins || parseInt(customMins) <= 0}
                      className="bg-slate-900 text-white px-6 rounded-xl text-xs font-bold disabled:opacity-30 disabled:grayscale transition-all active:scale-95"
                    >
                      Apply
                    </button>
                  </div>
                </div>

                {reminders[editingReminder] && (
                  <button
                    onClick={() => {
                      const newReminders = { ...reminders };
                      delete newReminders[editingReminder];
                      setReminders(newReminders);
                      setEditingReminder(null);
                      setCustomMins('');
                    }}
                    className="w-full p-4 rounded-2xl border border-rose-100 text-rose-500 font-bold hover:bg-rose-50 transition-all text-center mt-2 flex items-center justify-center gap-2"
                  >
                    <X size={16} />
                    Remove Reminder
                  </button>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
      {/* Header */}
      <header className="px-6 py-6 flex justify-between items-center bg-white border-b border-slate-50">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full border-2 border-white shadow-sm overflow-hidden bg-slate-100">
             <img 
               src={user?.avatar} 
               className="w-full h-full object-cover"
               alt="avatar" 
             />
          </div>
          <h1 className="text-lg font-bold text-slate-800 tracking-tight">Field Agent Portal</h1>
        </div>
        <div className="relative">
          <button 
            onClick={() => setIsNotifOpen(!isNotifOpen)}
            className="relative p-2 text-blue-600 hover:bg-blue-50 rounded-full transition-colors"
          >
            <Bell size={24} className={cn(isNotifOpen ? "text-blue-800" : "")} />
            {unreadCount > 0 && (
              <span className="absolute top-2 right-2 w-2 h-2 bg-rose-500 rounded-full border-2 border-white"></span>
            )}
          </button>
          <NotificationPopover isOpen={isNotifOpen} onClose={() => setIsNotifOpen(false)} />
        </div>
      </header>

      <div className="px-6 py-6 space-y-6">
        {/* Active Mission Card */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-gradient-to-br from-[#6366F1] to-[#4F46E5] rounded-[2rem] p-8 text-white shadow-xl shadow-blue-200 relative overflow-hidden"
        >
          <div className="flex justify-between items-start mb-4">
            <h2 className="text-xl font-bold tracking-tight">Flagship Store Audit</h2>
            <span className="px-3 py-1 bg-white/20 rounded-full text-[10px] font-bold uppercase tracking-wider flex items-center gap-1.5 backdrop-blur-sm">
              <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse"></span>
              Active Mission
            </span>
          </div>
          
          <div className="flex items-center gap-2 text-white/80 text-sm mb-8">
            <MapPin size={16} />
            <span className="font-medium">Northgate Retail Hub, Sector 4</span>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="bg-white/10 rounded-2xl p-4 backdrop-blur-sm border border-white/10">
              <p className="text-[10px] text-white/60 font-bold uppercase tracking-widest mb-1">Deadline</p>
              <p className="text-lg font-bold">17:00 Today</p>
            </div>
            <div className="bg-white/10 rounded-2xl p-4 backdrop-blur-sm border border-white/10">
              <p className="text-[10px] text-white/60 font-bold uppercase tracking-widest mb-1">Priority</p>
              <p className="text-lg font-bold">High</p>
            </div>
          </div>

          <button 
            onClick={() => navigate('/agent/survey')}
            className="w-full py-4 bg-white text-blue-600 rounded-2xl font-bold flex items-center justify-center gap-2 shadow-lg shadow-black/5 active:scale-95 hover:bg-blue-50 transition-all"
          >
            <ClipboardCheck size={20} />
            <span>Start Survey</span>
          </button>
        </motion.div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-[1.5rem] border border-slate-100 shadow-sm flex flex-col gap-4">
            <div className="w-10 h-10 bg-indigo-50 text-indigo-500 rounded-xl flex items-center justify-center">
              <CheckCircle2 size={24} />
            </div>
            <div>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-1">Surveys</p>
              <p className="text-xl font-bold text-slate-800">12 <span className="text-slate-300 font-medium">/15</span></p>
            </div>
          </div>
          <div className="bg-white p-6 rounded-[1.5rem] border border-slate-100 shadow-sm flex flex-col gap-4">
            <div className="w-10 h-10 bg-orange-50 text-orange-500 rounded-xl flex items-center justify-center">
              <Trophy size={24} />
            </div>
            <div>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-1">Points</p>
              <p className="text-xl font-bold text-slate-800">2,450</p>
            </div>
          </div>
        </div>

        {/* Daily Goal Progress */}
        <div className="bg-white p-6 rounded-[1.5rem] border border-slate-100 shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Daily Goal Progress</h3>
            <span className="text-blue-600 font-bold">80%</span>
          </div>
          <div className="h-3 w-full bg-slate-100 rounded-full overflow-hidden mb-6">
            <div className="h-full bg-blue-600 rounded-full transition-all duration-1000 ease-out" style={{ width: '80%' }}></div>
          </div>
          <p className="text-sm text-slate-500 font-medium leading-relaxed">Complete 3 more tasks to reach your daily milestone.</p>
        </div>

        {/* Recent Messages */}
        <div className="space-y-4">
          <div className="flex justify-between items-center px-1">
            <h3 className="text-sm font-bold text-slate-800">Recent Messages</h3>
            <button className="text-blue-600 text-[10px] font-bold uppercase tracking-widest">View All</button>
          </div>
          <div className="bg-white p-4 pr-6 rounded-[1.25rem] border border-slate-100 shadow-sm flex items-center gap-4 relative overflow-hidden">
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-blue-600"></div>
            <div className="w-12 h-12 rounded-full overflow-hidden border border-slate-50 flex-shrink-0 bg-slate-50 shadow-sm">
               <img 
                 src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" 
                 className="w-full h-full object-cover"
                 alt="Admin" 
               />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-center mb-0.5">
                <span className="font-bold text-slate-800 truncate">System Admin</span>
                <span className="text-[10px] text-slate-400 font-medium">10m ago</span>
              </div>
              <p className="text-xs text-slate-400 truncate">New branding guidelines updated for...</p>
            </div>
          </div>
        </div>

        {/* Team Roster */}
        <div className="space-y-4">
          <div className="flex justify-between items-center px-1">
            <h3 className="text-sm font-bold text-slate-800">Team Roster</h3>
            <button className="text-blue-600 text-[10px] font-bold uppercase tracking-widest">View All</button>
          </div>
          <div className="bg-white p-6 rounded-[1.5rem] border border-slate-100 shadow-sm overflow-x-auto">
            <div className="flex gap-6 min-w-max px-2 py-1">
              {[
                { name: 'Sarah M.', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80' },
                { name: 'Robert K.', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80' },
                { name: 'Liam C.', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80' },
                { name: 'Anna F.', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80' },
                { name: 'Marcus W.', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80' }
              ].map((member, i) => (
                <div key={i} className="flex flex-col items-center gap-2 group cursor-pointer">
                  <div className="w-14 h-14 rounded-full overflow-hidden ring-4 ring-slate-50 group-hover:ring-blue-100 transition-all shadow-sm">
                    <img src={member.avatar} className="w-full h-full object-cover" alt={member.name} />
                  </div>
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-tight">{member.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Today's Schedule */}
        <div className="space-y-4">
          <div className="flex justify-between items-center px-1">
            <h3 className="text-sm font-bold text-slate-800">Today's Schedule</h3>
            <button 
              onClick={toggleSort}
              className={cn(
                "flex items-center gap-2 px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-widest transition-all",
                sortOrder !== 'none' ? "bg-blue-600 text-white shadow-md shadow-blue-100" : "bg-white text-slate-400 border border-slate-100"
              )}
            >
              <ArrowUpDown size={12} />
              <span>Priority {sortOrder !== 'none' ? (sortOrder === 'desc' ? 'High' : 'Low') : ''}</span>
            </button>
          </div>
          <div className="space-y-4">
            {sortedSchedule.map((item, idx) => {
              const itemKey = `${item.task}-${item.store}-${idx}`;
              const reminder = reminders[itemKey];
              return (
                <div key={itemKey} className="bg-white p-6 rounded-[1.5rem] border border-slate-100 shadow-sm flex gap-6 group hover:border-blue-200 transition-all relative overflow-hidden">
                  <div className="flex flex-col items-center justify-center min-w-[64px] border-r border-slate-50 pr-6">
                    <span className="text-xs font-medium text-slate-400 flex items-center gap-1">{item.time.split(' ')[0]}</span>
                    <span className="text-xs font-extrabold text-slate-800 tracking-tight uppercase">{item.time.split(' ')[1]}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start mb-1">
                      <h4 className="font-bold text-slate-800 truncate pr-8">{item.store}</h4>
                      <span className={cn(
                        "text-[9px] font-bold uppercase tracking-widest flex items-center gap-1.5",
                        item.status === 'completed' ? "text-emerald-500" :
                        item.status === 'current' ? "text-blue-600" : "text-slate-400"
                      )}>
                        <span className={cn("w-1.5 h-1.5 rounded-full", 
                          item.status === 'completed' ? "bg-emerald-500" :
                          item.status === 'current' ? "bg-blue-600" : "bg-slate-300"
                        )}></span>
                        {item.status}
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 font-medium leading-relaxed">{item.task}</p>
                    <div className="mt-3 flex items-center flex-wrap gap-2">
                      <span className="text-[10px] font-bold text-rose-500 bg-rose-50 px-2 py-0.5 rounded-lg flex items-center gap-1">
                        <Clock size={10} />
                        Due: {item.dueDate}
                      </span>
                      <span className={cn(
                        "text-[10px] font-bold px-2 py-0.5 rounded-lg flex items-center gap-1",
                        priorityColors[item.priority]
                      )}>
                        <Flag size={10} />
                        {item.priority}
                      </span>
                      {reminder && (
                        <span className="text-[10px] font-bold bg-indigo-50 text-indigo-600 px-2 py-0.5 rounded-lg flex items-center gap-1">
                          <BellRing size={10} />
                          {reminder} min reminder
                        </span>
                      )}
                    </div>
                  </div>
                  
                  <button 
                    onClick={() => setEditingReminder(itemKey)}
                    className={cn(
                      "absolute top-5 right-5 p-2 rounded-xl transition-all",
                      reminder 
                        ? "bg-blue-50 text-blue-600" 
                        : "text-slate-200 hover:text-blue-400 hover:bg-slate-50"
                    )}
                  >
                    <Bell size={16} />
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        <div className="pt-6">
          <button 
            onClick={logout}
            className="w-full py-4 rounded-2xl border border-slate-200 text-slate-400 font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-slate-50 hover:text-slate-600 transition-all active:scale-95"
          >
            <LogOut size={16} />
            <span>Sign Out from Portal</span>
          </button>
        </div>
      </div>

      {/* Floating Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 h-24 bg-white border-t border-slate-100 flex items-center justify-around px-4 z-50 shadow-[0_-10px_25px_-5px_rgba(0,0,0,0.05)]">
        <button className="flex flex-col items-center gap-1.5 text-blue-600">
          <div className="relative">
            <Layout size={22} className="relative z-10" />
            <div className="absolute inset-0 bg-blue-100 blur-lg opacity-40 scale-150 rounded-full" />
          </div>
          <span className="text-[10px] font-bold uppercase tracking-widest">Dashboard</span>
        </button>
        <button 
          onClick={() => navigate('/agent/history')}
          className="flex flex-col items-center gap-1.5 text-slate-300 hover:text-slate-400 transition-colors"
        >
          <ClipboardList size={22} />
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
