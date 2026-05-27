import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 

  MapPin, 
  MoreVertical, 
  Search, 
  LayoutGrid, 
  List as ListIcon, 
  Plus,
  UserPlus,
  X,
  Shield,
  Briefcase,
  Mail,
  User
} from 'lucide-react';
import { cn } from '../lib/utils';

const initialEmployees = [
  { 
    id: '1', 
    name: 'Julian Vance', 
    role: 'SENIOR AGENT', 
    location: 'Zone A - Downtown', 
    status: 'On-Field', 
    leads: 42, 
    completionRate: 88,
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    manager: 'Alex Rivera'
  },
  { 
    id: '2', 
    name: 'Maya Sterling', 
    role: 'FIELD OFFICER', 
    location: 'Zone C - North Park', 
    status: 'Idle', 
    leads: 28, 
    completionRate: 64,
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    manager: 'Alex Rivera'
  },
  { 
    id: '3', 
    name: 'Liam Carter', 
    role: 'LOGISTICS SPECIALIST', 
    location: 'Regional HQ', 
    status: 'Offline', 
    leads: 56, 
    completionRate: 94,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    manager: 'Sarah Miller'
  },
  { 
    id: '4', 
    name: 'Elena Rossi', 
    role: 'SENIOR AGENT', 
    location: 'Zone B - East Side', 
    status: 'On-Field', 
    leads: 39, 
    completionRate: 81,
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    manager: 'Alex Rivera'
  }
];

const managers = [
  { id: 'm1', name: 'Alex Rivera' },
  { id: 'm2', name: 'Sarah Miller' },
  { id: 'm3', name: 'Robert King' },
  { id: 'm4', name: 'Jordan Davis' }
];

export const Employees = () => {
  const [employees, setEmployees] = useState(initialEmployees);
  const [view, setView] = useState<'grid' | 'list'>('grid');
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: 'FIELD OFFICER',
    location: '',
    manager: ''
  });

  const handleCreateEmployee = (e: React.FormEvent) => {
    e.preventDefault();
    const newEmployee = {
      id: String(Date.now()),
      name: formData.name,
      role: formData.role,
      location: formData.location,
      status: 'Offline',
      leads: 0,
      completionRate: 0,
      avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(formData.name)}&background=random&color=fff`,
      manager: formData.manager
    };
    
    setEmployees([newEmployee, ...employees]);
    setIsModalOpen(false);
    setFormData({ name: '', email: '', role: 'FIELD OFFICER', location: '', manager: '' });
  };

  return (
    <div className="space-y-8 relative">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-slate-800 tracking-tight">Field Team</h1>
          <p className="text-slate-400 text-sm font-medium mt-1">Manage and monitor your team's field performance.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="px-6 py-3 bg-blue-600 text-white rounded-2xl text-sm font-bold shadow-lg shadow-blue-100 flex items-center gap-2 hover:bg-blue-700 transition-all active:scale-95"
        >
          <Plus size={20} />
          <span>Create Employee</span>
        </button>
      </div>

      <div className="flex flex-col md:flex-row gap-4 bg-white p-6 rounded-[2rem] border border-slate-100 kpi-card-shadow">
        <div className="flex-1 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input 
            type="text" 
            placeholder="Search employees by name, role or location..." 
            className="w-full pl-12 pr-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-bold text-slate-700 focus:outline-none focus:ring-4 focus:ring-blue-600/10 focus:border-blue-600 transition-all"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex gap-4">
          <select className="px-6 py-4 bg-white border border-slate-200 rounded-2xl text-sm font-bold text-slate-600 hover:border-blue-600 transition-all cursor-pointer">
            <option>All Roles</option>
            <option>Senior Agent</option>
            <option>Field Officer</option>
          </select>
          <select className="px-6 py-4 bg-white border border-slate-200 rounded-2xl text-sm font-bold text-slate-600 hover:border-blue-600 transition-all cursor-pointer">
            <option>All Statuses</option>
            <option>On-Field</option>
            <option>Idle</option>
            <option>Offline</option>
          </select>
          <div className="flex bg-slate-100 p-1 rounded-2xl border border-slate-200">
            <button 
              onClick={() => setView('grid')}
              className={cn(
                "p-3 rounded-xl transition-all",
                view === 'grid' ? "bg-white text-blue-600 shadow-sm" : "text-slate-400 hover:text-slate-600"
              )}
            >
              <LayoutGrid size={18} />
            </button>
            <button 
              onClick={() => setView('list')}
              className={cn(
                "p-3 rounded-xl transition-all",
                view === 'list' ? "bg-white text-blue-600 shadow-sm" : "text-slate-400 hover:text-slate-600"
              )}
            >
              <ListIcon size={18} />
            </button>
          </div>
        </div>
      </div>

      <div className={cn(
        "grid gap-6",
        view === 'grid' ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3" : "grid-cols-1"
      )}>
        {employees.filter(e => 
          e.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
          e.location.toLowerCase().includes(searchTerm.toLowerCase())
        ).map((employee, i) => (
          <motion.div
            key={employee.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white rounded-[2rem] border border-slate-100 kpi-card-shadow overflow-hidden group hover:border-blue-200 transition-all"
          >
            <div className="p-8">
              <div className="flex justify-between items-start mb-6">
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <img src={employee.avatar} className="w-16 h-16 rounded-2xl object-cover border border-slate-100 shadow-sm" alt={employee.name} />
                    <div className={cn(
                      "absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white shadow-sm",
                      employee.status === 'On-Field' ? "bg-emerald-500" :
                      employee.status === 'Idle' ? "bg-amber-500" : "bg-slate-400"
                    )} />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-800 tracking-tight">{employee.name}</h3>
                    <span className="px-2 py-0.5 bg-blue-50 text-blue-600 rounded-lg text-[9px] font-black tracking-widest uppercase border border-blue-100">
                      {employee.role}
                    </span>
                  </div>
                </div>
                <button className="p-2 text-slate-300 hover:text-slate-600 transition-colors">
                  <MoreVertical size={20} />
                </button>
              </div>

              <div className="flex items-center gap-2 text-xs text-slate-400 font-bold uppercase tracking-widest mb-4">
                <MapPin size={14} className="text-blue-500" />
                {employee.location}
              </div>

              <div className="flex items-center gap-2 text-xs text-slate-400 font-bold uppercase tracking-widest mb-6">
                <Shield size={14} className="text-slate-400" />
                <span className="text-slate-400">Mgr:</span>
                <span className="text-blue-600 font-black">{employee.manager}</span>
                <div className="ml-auto flex items-center gap-1.5">
                  <div className={cn(
                    "w-2 h-2 rounded-full",
                    employee.status === 'On-Field' ? "bg-emerald-500 animate-pulse" :
                    employee.status === 'Idle' ? "bg-amber-500" : "bg-slate-400"
                  )} />
                  <span className={cn(
                    "font-black",
                    employee.status === 'On-Field' ? "text-emerald-500" :
                    employee.status === 'Idle' ? "text-amber-500" : "text-slate-400"
                  )}>{employee.status}</span>
                </div>
              </div>

              <div className="space-y-6 bg-slate-50 p-6 rounded-2xl border border-slate-100">
                <div className="flex justify-between items-end">
                  <div>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-1">Leads this month</p>
                    <p className="text-2xl font-black text-slate-800">{employee.leads}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-1">COMPLETION RATE</p>
                    <p className="text-xs font-black text-blue-600 uppercase tracking-widest">{employee.completionRate}%</p>
                  </div>
                </div>
                <div className="h-2 w-full bg-slate-200 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-blue-600 rounded-full transition-all duration-1000" 
                    style={{ width: `${employee.completionRate}%` }}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mt-6">
                <button className="py-3 bg-white border border-slate-200 text-slate-600 rounded-xl text-xs font-bold hover:bg-slate-50 transition-all active:scale-95">
                  View Profile
                </button>
                <button className="py-3 bg-white border border-slate-200 text-slate-600 rounded-xl text-xs font-bold hover:bg-slate-50 transition-all active:scale-95">
                  Edit
                </button>
              </div>
            </div>
          </motion.div>
        ))}

        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-white rounded-[2rem] border-2 border-dashed border-slate-200 flex flex-col items-center justify-center p-12 text-center group hover:border-blue-300 transition-all cursor-pointer w-full h-full"
        >
          <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <UserPlus size={32} />
          </div>
          <h3 className="text-lg font-bold text-slate-800 tracking-tight">Add Team Member</h3>
          <p className="text-slate-400 text-sm font-medium mt-1">Grow your field force</p>
        </button>
      </div>

      {/* Create Employee Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-xl bg-white rounded-[2.5rem] shadow-2xl overflow-hidden"
            >
              <div className="p-8 pb-0 flex justify-between items-center">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600">
                    <UserPlus size={24} />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-slate-800 tracking-tight">Onboard Agent</h2>
                    <p className="text-slate-400 text-sm font-medium">Add a new intelligence operative to the network</p>
                  </div>
                </div>
                <button 
                  onClick={() => setIsModalOpen(false)}
                  className="p-2 text-slate-400 hover:text-slate-600 transition-colors"
                >
                  <X size={24} />
                </button>
              </div>

              <form onSubmit={handleCreateEmployee} className="p-8 pt-6 space-y-6">
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                      <User size={12} className="text-blue-500" />
                      Full Name
                    </label>
                    <input 
                      required
                      type="text"
                      className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-bold text-slate-700 focus:outline-none focus:ring-4 focus:ring-blue-600/10 focus:border-blue-600 transition-all"
                      placeholder="e.g. John Doe"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                      <Mail size={12} className="text-blue-500" />
                      Email Address
                    </label>
                    <input 
                      required
                      type="email"
                      className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-bold text-slate-700 focus:outline-none focus:ring-4 focus:ring-blue-600/10 focus:border-blue-600 transition-all"
                      placeholder="john@bluefield.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                      <Briefcase size={12} className="text-blue-500" />
                      Designated Role
                    </label>
                    <select 
                      className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-bold text-slate-700 focus:outline-none focus:ring-4 focus:ring-blue-600/10 focus:border-blue-600 transition-all appearance-none cursor-pointer"
                      value={formData.role}
                      onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    >
                      <option value="SENIOR AGENT">Senior Agent</option>
                      <option value="FIELD OFFICER">Field Officer</option>
                      <option value="LOGISTICS">Logistics Specialist</option>
                      <option value="AUDITOR">Compliance Auditor</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                      <MapPin size={12} className="text-blue-500" />
                      Operating Location
                    </label>
                    <input 
                      required
                      type="text"
                      className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-bold text-slate-700 focus:outline-none focus:ring-4 focus:ring-blue-600/10 focus:border-blue-600 transition-all"
                      placeholder="e.g. Zone D - South Bay"
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                    <Shield size={12} className="text-blue-500" />
                    Assign Reporting Manager
                  </label>
                  <select 
                    required
                    className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-bold text-slate-700 focus:outline-none focus:ring-4 focus:ring-blue-600/10 focus:border-blue-600 transition-all appearance-none cursor-pointer"
                    value={formData.manager}
                    onChange={(e) => setFormData({ ...formData, manager: e.target.value })}
                  >
                    <option value="">Select Manager...</option>
                    {managers.map(m => (
                      <option key={m.id} value={m.name}>{m.name}</option>
                    ))}
                  </select>
                </div>

                <div className="pt-4 flex gap-4">
                  <button 
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="flex-1 py-4 bg-slate-50 text-slate-600 rounded-2xl text-sm font-bold hover:bg-slate-100 transition-all"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit"
                    className="flex-[2] py-4 bg-blue-600 text-white rounded-2xl text-sm font-bold shadow-lg shadow-blue-100 hover:bg-blue-700 transition-all active:scale-95"
                  >
                    Deploy Agent
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

