import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { 
  Calendar, 
  ChevronRight, 
  Plus, 
  Search, 
  Tag, 
  Users,
  CheckCircle2,
  Clock,
  ExternalLink,
  X,
  Target,
  Globe,
  Flag,
  Send,
  BarChart2,
  UserPlus,
  Shield,
  Trash2,
  Bell
} from 'lucide-react';
import { cn } from '../lib/utils';
import { useAuth } from '../contexts/AuthContext';

const permissions = [
  { id: 'can_submit', label: 'Submit Data', icon: Send },
  { id: 'can_approve', label: 'Approve', icon: CheckCircle2 },
  { id: 'can_edit', label: 'Edit Form', icon: Target },
  { id: 'can_export', label: 'Export', icon: ExternalLink },
];

const availableAgents = [
  { id: 'a1', name: 'Sarah Miller', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80', active: true, region: 'North America' },
  { id: 'a2', name: 'Robert King', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80', active: true, region: 'Western Europe' },
  { id: 'a3', name: 'Liam Chen', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80', active: true, region: 'APAC Region' },
  { id: 'a4', name: 'Anna Fischer', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80', active: true, region: 'DACH Region' },
  { id: 'a5', name: 'Jason Davis', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80', active: true, region: 'North America' },
];

const rolePermissions: Record<string, string[]> = {
  'Surveyor': ['can_submit'],
  'Lead': ['can_submit', 'can_approve'],
  'Auditor': ['can_submit', 'can_approve', 'can_export'],
  'Viewer': [],
  'Admin': ['can_submit', 'can_approve', 'can_edit', 'can_export']
};

const roles = ['Surveyor', 'Lead', 'Auditor', 'Viewer', 'Admin'];

const campaigns = [
  {
    id: '1',
    title: 'Spring Retail Blitz 2024',
    status: 'active',
    region: 'North America',
    type: 'Display Compliance',
    startDate: 'Mar 15, 2024',
    endDate: 'Jun 15, 2024',
    dueDate: 'Jun 20, 2024',
    progress: 68,
    agents: 12,
    priority: 'high',
    tags: ['Quarterly', 'Audit'],
    reminderTime: '24h'
  },
  {
    id: '2',
    title: 'New Product Launch - Hydrate Pro',
    status: 'scheduled',
    region: 'Western EU',
    type: 'Shelf Availability',
    startDate: 'May 01, 2024',
    endDate: 'Aug 01, 2024',
    dueDate: 'Aug 05, 2024',
    progress: 0,
    agents: 45,
    priority: 'medium',
    tags: ['Launch', 'Retail'],
    reminderTime: '12h'
  },
  {
    id: '3',
    title: 'Q1 Quarterly Inventory Audit',
    status: 'completed',
    region: 'APAC',
    type: 'Inventory Audit',
    startDate: 'Jan 01, 2024',
    endDate: 'Mar 31, 2024',
    dueDate: 'Apr 05, 2024',
    progress: 100,
    agents: 28,
    priority: 'high',
    tags: ['Strategy', 'Pricing'],
    reminderTime: 'none'
  },
  {
    id: '4',
    title: 'Summer Seasonal Clearance',
    status: 'draft',
    region: 'Global',
    type: 'Merchandising',
    startDate: 'Jul 01, 2024',
    endDate: 'Sep 30, 2024',
    dueDate: 'Oct 01, 2024',
    progress: 0,
    agents: 0,
    priority: 'low',
    tags: ['Visuals'],
    reminderTime: 'none'
  }
];

const reminderOptions = [
  { value: 'none', label: 'No Reminder' },
  { value: '1h', label: '1 hour before' },
  { value: '6h', label: '6 hours before' },
  { value: '12h', label: '12 hours before' },
  { value: '24h', label: '24 hours before' },
  { value: '48h', label: '2 days before' },
  { value: '1w', label: '1 week before' },
];

export const Campaigns = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [sortOrder, setSortOrder] = useState<'desc' | 'asc' | 'none'>('none');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [newCampaignTags, setNewCampaignTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState('');
  const [assignedAgents, setAssignedAgents] = useState<{id: string, role: string, permissions: string[]}[]>([]);
  const [expandedAgent, setExpandedAgent] = useState<string | null>(null);
  const [agentSearch, setAgentSearch] = useState('');

  const navigate = useNavigate();
  const { user } = useAuth();

  const allTags = Array.from(new Set(campaigns.flatMap(c => c.tags)));

  const priorityWeight: Record<string, number> = {
    'high': 3,
    'medium': 2,
    'low': 1
  };

  const filteredAndSortedCampaigns = React.useMemo(() => {
    let result = [...campaigns];
    
    if (selectedTags.length > 0) {
      result = result.filter(c => selectedTags.every(t => c.tags.includes(t)));
    }

    if (sortOrder !== 'none') {
      result.sort((a, b) => {
        const weightA = priorityWeight[a.priority];
        const weightB = priorityWeight[b.priority];
        return sortOrder === 'desc' ? weightB - weightA : weightA - weightB;
      });
    }
    
    return result;
  }, [sortOrder, selectedTags]);

  const toggleFilterTag = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    );
  };

  const addTagToNewCampaign = () => {
    if (tagInput.trim() && !newCampaignTags.includes(tagInput.trim())) {
      setNewCampaignTags(prev => [...prev, tagInput.trim()]);
      setTagInput('');
    }
  };

  const removeTagFromNewCampaign = (tag: string) => {
    setNewCampaignTags(prev => prev.filter(t => t !== tag));
  };

  const addAgent = (agentId: string) => {
    if (!assignedAgents.find(a => a.id === agentId)) {
      const defaultRole = 'Surveyor';
      setAssignedAgents(prev => [...prev, { 
        id: agentId, 
        role: defaultRole, 
        permissions: rolePermissions[defaultRole] || [] 
      }]);
      setAgentSearch('');
      setExpandedAgent(agentId);
    }
  };

  const removeAgent = (agentId: string) => {
    setAssignedAgents(prev => prev.filter(a => a.id !== agentId));
    if (expandedAgent === agentId) setExpandedAgent(null);
  };

  const updateAgentRole = (agentId: string, role: string) => {
    setAssignedAgents(prev => prev.map(a => a.id === agentId ? { 
      ...a, 
      role,
      permissions: rolePermissions[role] || []
    } : a));
  };

  const togglePermission = (agentId: string, permissionId: string) => {
    setAssignedAgents(prev => prev.map(a => {
      if (a.id === agentId) {
        const hasPermission = a.permissions.includes(permissionId);
        return {
          ...a,
          permissions: hasPermission 
            ? a.permissions.filter(p => p !== permissionId)
            : [...a.permissions, permissionId]
        };
      }
      return a;
    }));
  };

  const filteredAgents = availableAgents.filter(agent => 
    agent.name.toLowerCase().includes(agentSearch.toLowerCase()) &&
    !assignedAgents.find(a => a.id === agent.id)
  );

  const toggleSort = () => {
    setSortOrder(current => {
      if (current === 'none') return 'desc';
      if (current === 'desc') return 'asc';
      return 'none';
    });
  };

  const [form, setForm] = useState({
    title: '',
    region: 'North America',
    type: 'Display Compliance',
    startDate: '',
    endDate: '',
    dueDate: '',
    priority: 'medium',
    description: '',
    reminderTime: 'none'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Creating Campaign:', { ...form, tags: newCampaignTags, agents: assignedAgents });
    // In a real app, logic to save campaign would go here
    setIsModalOpen(false);
    setForm({
      title: '',
      region: 'North America',
      type: 'Display Compliance',
      startDate: '',
      endDate: '',
      dueDate: '',
      priority: 'medium',
      description: '',
      reminderTime: 'none'
    });
    setAssignedAgents([]);
    setNewCampaignTags([]);
    setAgentSearch('');
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setForm({
      title: '',
      region: 'North America',
      type: 'Display Compliance',
      startDate: '',
      endDate: '',
      dueDate: '',
      priority: 'medium',
      description: '',
      reminderTime: 'none'
    });
    setAssignedAgents([]);
    setNewCampaignTags([]);
    setAgentSearch('');
  };

  const goToPerformance = () => {
    const base = user?.role === 'super_admin' ? '/admin' : user?.role === 'manager' ? '/manager' : '/client';
    navigate(`${base}/performance`);
  };

  const handleCampaignClick = (id: string) => {
    const base = user?.role === 'manager' ? '/manager' : '/client';
    navigate(`${base}/campaigns/${id}`);
  };

  return (
    <div className="space-y-8 relative">
      {/* Create Campaign Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleCloseModal}
              className="fixed inset-0 bg-slate-900/60 backdrop-blur-md z-[60] flex items-center justify-center p-6"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="fixed inset-0 m-auto w-full max-w-xl h-fit bg-white rounded-[2.5rem] z-[70] overflow-hidden shadow-2xl flex flex-col"
            >
              <div className="p-8 border-b border-slate-50 flex justify-between items-center bg-white sticky top-0 z-10">
                <div>
                  <h3 className="text-xl font-bold text-slate-800 tracking-tight">Create New Campaign</h3>
                  <p className="text-sm text-slate-400 font-medium mt-1 uppercase tracking-wider">Set campaign parameters and target region</p>
                </div>
                <button 
                  onClick={handleCloseModal}
                  className="p-3 bg-slate-50 text-slate-400 hover:text-slate-600 rounded-2xl transition-colors shadow-sm"
                >
                  <X size={20} />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="p-8 space-y-6 overflow-y-auto max-h-[70vh] bg-slate-50/50">
                {/* Campaign Title */}
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] px-1">Campaign Title</label>
                  <div className="relative group">
                    <Target className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors" size={20} />
                    <input 
                      type="text" 
                      placeholder="e.g. Summer Visual Audit"
                      value={form.title}
                      onChange={(e) => setForm({ ...form, title: e.target.value })}
                      className="w-full bg-white border border-slate-200 rounded-2xl py-4 pl-12 pr-6 text-sm font-bold text-slate-700 focus:outline-none focus:ring-4 focus:ring-blue-600/10 focus:border-blue-600 transition-all shadow-sm"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  {/* Region */}
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] px-1">Target Region</label>
                    <div className="relative">
                      <Globe className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                      <select 
                        value={form.region}
                        onChange={(e) => setForm({ ...form, region: e.target.value })}
                        className="w-full bg-white border border-slate-200 rounded-2xl py-4 pl-12 pr-6 text-sm font-bold text-slate-700 focus:outline-none focus:ring-4 focus:ring-blue-600/10 focus:border-blue-600 transition-all shadow-sm appearance-none cursor-pointer"
                      >
                        <option value="North America">North America</option>
                        <option value="Western EU">Western Europe</option>
                        <option value="APAC">APAC Region</option>
                        <option value="Global">Global Blitz</option>
                      </select>
                    </div>
                  </div>

                  {/* Priority */}
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] px-1">Initial Priority</label>
                    <div className="relative">
                      <Flag className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                      <select 
                        value={form.priority}
                        onChange={(e) => setForm({ ...form, priority: e.target.value })}
                        className="w-full bg-white border border-slate-200 rounded-2xl py-4 pl-12 pr-6 text-sm font-bold text-slate-700 focus:outline-none focus:ring-4 focus:ring-blue-600/10 focus:border-blue-600 transition-all shadow-sm appearance-none cursor-pointer"
                      >
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Audit Type */}
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] px-1">Campaign Type</label>
                  <div className="relative">
                    <Tag className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                    <select 
                      value={form.type}
                      onChange={(e) => setForm({ ...form, type: e.target.value })}
                      className="w-full bg-white border border-slate-200 rounded-2xl py-4 pl-12 pr-6 text-sm font-bold text-slate-700 focus:outline-none focus:ring-4 focus:ring-blue-600/10 focus:border-blue-600 transition-all shadow-sm appearance-none cursor-pointer"
                    >
                      <option value="Display Compliance">Display Compliance</option>
                      <option value="Shelf Availability">Shelf Availability</option>
                      <option value="Inventory Audit">Inventory Audit</option>
                      <option value="Merchandising">Merchandising</option>
                      <option value="Price Check">Price Check</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  {/* Date Range Start */}
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] px-1">Start Date</label>
                    <div className="relative">
                      <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                      <input 
                        type="date"
                        value={form.startDate}
                        onChange={(e) => setForm({ ...form, startDate: e.target.value })}
                        className="w-full bg-white border border-slate-200 rounded-2xl py-4 pl-12 pr-6 text-sm font-bold text-slate-700 focus:outline-none focus:ring-4 focus:ring-blue-600/10 focus:border-blue-600 transition-all shadow-sm"
                        required
                      />
                    </div>
                  </div>

                  {/* Date Range End */}
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] px-1">End Date</label>
                    <div className="relative">
                      <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                      <input 
                        type="date"
                        value={form.endDate}
                        onChange={(e) => setForm({ ...form, endDate: e.target.value })}
                        className="w-full bg-white border border-slate-200 rounded-2xl py-4 pl-12 pr-6 text-sm font-bold text-slate-700 focus:outline-none focus:ring-4 focus:ring-blue-600/10 focus:border-blue-600 transition-all shadow-sm"
                        required
                      />
                    </div>
                  </div>
                </div>

                  {/* Due Date */}
                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] px-1">Final Due Date</label>
                      <div className="relative">
                        <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                        <input 
                          type="date"
                          value={form.dueDate}
                          onChange={(e) => setForm({ ...form, dueDate: e.target.value })}
                          className="w-full bg-white border border-slate-200 rounded-2xl py-4 pl-12 pr-6 text-sm font-bold text-slate-700 focus:outline-none focus:ring-4 focus:ring-blue-600/10 focus:border-blue-600 transition-all shadow-sm"
                          required
                        />
                      </div>
                    </div>

                    {/* Reminder Time */}
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] px-1">Set Reminder</label>
                      <div className="relative">
                        <Bell className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                        <select 
                          value={form.reminderTime}
                          onChange={(e) => setForm({ ...form, reminderTime: e.target.value })}
                          className="w-full bg-white border border-slate-200 rounded-2xl py-4 pl-12 pr-6 text-sm font-bold text-slate-700 focus:outline-none focus:ring-4 focus:ring-blue-600/10 focus:border-blue-600 transition-all shadow-sm appearance-none cursor-pointer"
                        >
                          {reminderOptions.map(opt => (
                            <option key={opt.value} value={opt.value}>{opt.label}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>

                {/* Campaign Description */}
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] px-1">Campaign Instructions</label>
                  <textarea 
                    rows={4}
                    value={form.description}
                    onChange={(e) => setForm({ ...form, description: e.target.value })}
                    placeholder="Describe specific shelf audit criteria or display standards for field agents..."
                    className="w-full bg-white border border-slate-200 rounded-[1.5rem] p-6 text-sm font-bold text-slate-700 focus:outline-none focus:ring-4 focus:ring-blue-600/10 focus:border-blue-600 transition-all shadow-sm resize-none"
                  />
                </div>

                {/* Tag Functionality */}
                <div className="space-y-3">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] px-1">Campaign Tags</label>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {newCampaignTags.map(tag => (
                      <span key={tag} className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-xs font-bold flex items-center gap-2 group">
                        {tag}
                        <button 
                          type="button"
                          onClick={() => removeTagFromNewCampaign(tag)}
                          className="hover:text-blue-800"
                        >
                          <X size={12} />
                        </button>
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <div className="relative flex-1">
                      <Tag className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                      <input 
                        type="text" 
                        value={tagInput}
                        onChange={(e) => setTagInput(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTagToNewCampaign())}
                        placeholder="Add a custom tag..."
                        className="w-full bg-white border border-slate-200 rounded-2xl py-3 pl-12 pr-4 text-sm font-bold text-slate-700 focus:outline-none focus:ring-4 focus:ring-blue-600/10 focus:border-blue-600 transition-all shadow-sm"
                      />
                    </div>
                    <button 
                      type="button"
                      onClick={addTagToNewCampaign}
                      className="px-4 py-3 bg-slate-900 text-white rounded-2xl font-bold text-sm hover:bg-slate-800 transition-all"
                    >
                      Add
                    </button>
                  </div>
                </div>

                {/* Agent Assignment */}
                <div className="space-y-4 pt-4 border-t border-slate-100">
                  <div className="flex justify-between items-center px-1">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">Assigned Agents ({assignedAgents.length})</label>
                  </div>
                  
                  {assignedAgents.length > 0 && (
                    <div className="space-y-3">
                      {assignedAgents.map(assignment => {
                        const agent = availableAgents.find(a => a.id === assignment.id);
                        if (!agent) return null;
                        const isExpanded = expandedAgent === agent.id;
                        return (
                          <motion.div 
                            key={agent.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden"
                          >
                            <div className="flex items-center gap-4 p-3 pr-4">
                              <img src={agent.avatar} className="w-10 h-10 rounded-xl object-cover" alt={agent.name} />
                              <div className="flex-1 min-w-0">
                                <button 
                                  type="button"
                                  onClick={() => setExpandedAgent(isExpanded ? null : agent.id)}
                                  className="text-sm font-bold text-slate-800 hover:text-blue-600 transition-colors text-left"
                                >
                                  {agent.name}
                                </button>
                                <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">
                                  <Shield size={10} className="text-blue-500" />
                                  {assignment.role} • {assignment.permissions.length} Overrides
                                </div>
                              </div>
                              <div className="flex items-center gap-2">
                                <select 
                                  value={assignment.role}
                                  onChange={(e) => updateAgentRole(agent.id, e.target.value)}
                                  className="bg-slate-50 border border-slate-100 rounded-xl px-3 py-1.5 text-[11px] font-bold text-slate-600 focus:outline-none cursor-pointer"
                                >
                                  {roles.map(role => (
                                    <option key={role} value={role}>{role}</option>
                                  ))}
                                </select>
                                <button 
                                  type="button"
                                  onClick={() => removeAgent(agent.id)}
                                  className="p-2 text-slate-300 hover:text-rose-500 hover:bg-rose-50 rounded-xl transition-all"
                                >
                                  <Trash2 size={16} />
                                </button>
                              </div>
                            </div>
                            
                            {isExpanded && (
                              <motion.div 
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                className="px-4 pb-4 pt-2 bg-slate-50 border-t border-slate-50"
                              >
                                <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-3">Granular Permissions</p>
                                <div className="grid grid-cols-2 gap-3">
                                  {permissions.map(perm => (
                                    <button
                                      key={perm.id}
                                      type="button"
                                      onClick={() => togglePermission(agent.id, perm.id)}
                                      className={cn(
                                        "flex items-center gap-2 p-2 rounded-xl border text-[10px] font-bold transition-all",
                                        assignment.permissions.includes(perm.id)
                                          ? "bg-white border-blue-200 text-blue-600 shadow-sm"
                                          : "bg-transparent border-slate-100 text-slate-400"
                                      )}
                                    >
                                      <perm.icon size={12} />
                                      {perm.label}
                                    </button>
                                  ))}
                                </div>
                              </motion.div>
                            )}
                          </motion.div>
                        );
                      })}
                    </div>
                  )}

                  <div className="relative">
                    <div className="relative group">
                      <UserPlus className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors" size={20} />
                      <input 
                        type="text" 
                        placeholder="Search agents to assign..."
                        value={agentSearch}
                        onChange={(e) => setAgentSearch(e.target.value)}
                        className="w-full bg-white border border-slate-200 rounded-2xl py-4 pl-12 pr-6 text-sm font-bold text-slate-700 focus:outline-none focus:ring-4 focus:ring-blue-600/10 focus:border-blue-600 transition-all shadow-sm"
                      />
                    </div>
                    
                    {agentSearch && (
                      <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-xl border border-slate-100 z-50 py-2 max-h-48 overflow-y-auto overflow-x-hidden">
                        {filteredAgents.length > 0 ? (
                          filteredAgents.map(agent => (
                            <button
                              key={agent.id}
                              type="button"
                              onClick={() => addAgent(agent.id)}
                              className="w-full px-4 py-3 flex items-center gap-4 hover:bg-slate-50 transition-colors text-left"
                            >
                              <img src={agent.avatar} className="w-9 h-9 rounded-xl object-cover" alt={agent.name} />
                              <div>
                                <p className="text-sm font-bold text-slate-700">{agent.name}</p>
                                <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">{agent.region}</p>
                              </div>
                              <Plus size={16} className="ml-auto text-slate-300" />
                            </button>
                          ))
                        ) : (
                          <div className="px-4 py-3 text-sm text-slate-400 font-medium text-center">No matching agents found</div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </form>

              <div className="p-8 bg-white border-t border-slate-50 flex items-center justify-between">
                <button 
                  type="button"
                  onClick={handleCloseModal}
                  className="px-8 py-4 bg-slate-50 text-slate-500 rounded-2xl font-bold text-sm hover:bg-slate-100 transition-all"
                >
                  Cancel
                </button>
                <button 
                  onClick={handleSubmit}
                  className="px-10 py-4 bg-blue-600 text-white rounded-2xl font-bold text-sm shadow-xl shadow-blue-100 flex items-center gap-3 hover:bg-blue-700 transition-all active:scale-95"
                >
                  <Send size={18} />
                  <span>Launch Campaign</span>
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <div className="flex justify-between items-center bg-white p-6 rounded-2xl border border-slate-100 kpi-card-shadow">
        <div className="flex items-center gap-4 flex-1 max-w-md">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="Search campaigns by name, region..." 
              className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all font-medium"
            />
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 mr-2">
            {allTags.map(tag => (
              <button
                key={tag}
                onClick={() => toggleFilterTag(tag)}
                className={cn(
                  "px-3 py-1.5 rounded-xl text-xs font-bold transition-all border",
                  selectedTags.includes(tag) 
                    ? "bg-indigo-600 text-white border-indigo-600 shadow-md shadow-indigo-100" 
                    : "bg-white text-slate-500 border-slate-200 hover:border-slate-300"
                )}
              >
                {tag}
              </button>
            ))}
          </div>
          <button 
            onClick={toggleSort}
            className={cn(
              "flex items-center gap-2 px-4 py-2 border rounded-xl text-sm font-bold transition-all",
              sortOrder !== 'none' ? "bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-100" : "bg-white text-slate-600 border-slate-200"
            )}
          >
            <Flag size={16} />
            <span>Priority {sortOrder !== 'none' ? (sortOrder === 'desc' ? 'High' : 'Low') : ''}</span>
          </button>
          <button className="flex items-center gap-2 px-4 py-2 border border-slate-200 rounded-xl text-sm font-bold text-slate-600 hover:bg-slate-50 transition-colors">
            Filter Results
          </button>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-xl text-sm font-bold hover:bg-blue-700 transition-all shadow-md shadow-blue-100"
          >
            <Plus size={18} />
            <span>Create Campaign</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {filteredAndSortedCampaigns.map((campaign, idx) => (
          <motion.div
            key={campaign.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.1 }}
            onClick={() => handleCampaignClick(campaign.id)}
            className="bg-white rounded-2xl border border-slate-100 kpi-card-shadow overflow-hidden group hover:border-blue-200 transition-all cursor-pointer"
          >
            <div className="p-6 flex items-center gap-8">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 mb-2">
                  <span className={cn(
                    "text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full",
                    campaign.status === 'active' ? "bg-emerald-50 text-emerald-600" :
                    campaign.status === 'completed' ? "bg-blue-50 text-blue-600" :
                    campaign.status === 'scheduled' ? "bg-amber-50 text-amber-600" :
                    "bg-slate-100 text-slate-500"
                  )}>
                    {campaign.status}
                  </span>
                  <span className={cn(
                    "text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full flex items-center gap-1",
                    campaign.priority === 'high' ? "bg-rose-50 text-rose-600" :
                    campaign.priority === 'medium' ? "bg-amber-50 text-amber-600" :
                    "bg-blue-50 text-blue-600"
                  )}>
                    <Flag size={10} />
                    {campaign.priority} priority
                  </span>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 flex items-center gap-1">
                    <Tag size={12} />
                    {campaign.type}
                  </span>
                  <div className="flex gap-1">
                    {campaign.tags.map(tag => (
                      <span key={tag} className="text-[10px] font-bold text-indigo-500 bg-indigo-50 px-2 py-0.5 rounded-md">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
                <h3 className="text-xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors truncate">
                  {campaign.title}
                </h3>
                <div className="flex items-center gap-4 mt-3">
                  <div className="flex items-center gap-1.5 text-xs text-slate-500 font-semibold">
                    <Calendar size={14} />
                    <span>{campaign.startDate} - {campaign.endDate}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs font-bold text-rose-500 bg-rose-50 px-2 py-0.5 rounded-lg ml-2">
                    <Clock size={12} />
                    <span>Due: {campaign.dueDate}</span>
                  </div>
                  {campaign.reminderTime && campaign.reminderTime !== 'none' && (
                    <div className="flex items-center gap-1.5 text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-lg ml-2 border border-blue-100 shadow-sm animate-pulse">
                      <Bell size={10} />
                      <span>Reminder: {reminderOptions.find(o => o.value === campaign.reminderTime)?.label}</span>
                    </div>
                  )}
                  <div className="flex items-center gap-1.5 text-xs text-slate-500 font-semibold ml-auto">
                    <Users size={14} />
                    <span>{campaign.agents} Agents Assigned</span>
                  </div>
                </div>
              </div>

              <div className="w-48 text-right space-y-2">
                <div className="flex justify-between items-end mb-1">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Progress</span>
                  <span className="text-sm font-mono font-bold text-slate-900">{campaign.progress}%</span>
                </div>
                <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${campaign.progress}%` }}
                    className={cn(
                      "h-full rounded-full transition-all",
                      campaign.status === 'active' ? "bg-blue-600" :
                      campaign.status === 'completed' ? "bg-emerald-500" :
                      "bg-slate-300"
                    )}
                  />
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    goToPerformance();
                  }}
                  className="p-3 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-all flex items-center gap-2 bg-slate-50 border border-slate-100"
                  title="View Performance"
                >
                  <BarChart2 size={20} />
                  <span className="text-xs font-bold whitespace-nowrap hidden md:inline">Analytics</span>
                </button>
                <button 
                  onClick={(e) => e.stopPropagation()}
                  className="p-3 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all"
                >
                  <ExternalLink size={20} />
                </button>
                <button 
                  onClick={(e) => e.stopPropagation()}
                  className="p-3 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all"
                >
                  <ChevronRight size={20} />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

