import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  MapPin, 
  User,
  Plus,
  Check,
  ChevronDown,
  X,
  Send,
  Building2,
  DollarSign,
  Globe,
  Flag,
  Search,
  Trash2,
  Briefcase
} from 'lucide-react';
import { cn } from '../lib/utils';

const columns = [
  { id: 'new', title: 'New Leads', color: 'bg-blue-500' },
  { id: 'contacted', title: 'Contacted', color: 'bg-amber-500' },
  { id: 'qualified', title: 'Qualified', color: 'bg-emerald-500' },
  { id: 'proposal', title: 'Proposal', color: 'bg-indigo-500' },
];

const initialLeads = [
  { 
    id: '1', 
    name: 'Reliance Retail Ventures', 
    location: 'Mumbai, MH', 
    value: '₹12,40,000', 
    days: 2, 
    status: 'new', 
    priority: 'high',
    owner: 'Rahul Sharma'
  },
  { 
    id: '2', 
    name: 'Tata Consumer Products', 
    location: 'Bangalore, KA', 
    value: '₹8,20,000', 
    days: 4, 
    status: 'contacted', 
    priority: 'medium',
    owner: 'Sneha Kapoor'
  },
  { 
    id: '3', 
    name: 'Aditya Birla Fashion', 
    location: 'New Delhi, DL', 
    value: '₹45,00,000', 
    days: 12, 
    status: 'proposal', 
    priority: 'high',
    owner: 'Anita Singh'
  },
  { 
    id: '4', 
    name: 'ITC Lifestyle', 
    location: 'Kolkata, WB', 
    value: '₹6,50,000', 
    days: 1, 
    status: 'new', 
    priority: 'low',
    owner: 'Rahul Sharma'
  },
  { 
    id: '5', 
    name: 'Future Group', 
    location: 'Pune, MH', 
    value: '₹18,90,000', 
    days: 2, 
    status: 'qualified', 
    priority: 'medium',
    owner: 'Vikram Reddy'
  },
];

const agents = [
  { name: 'Rahul Sharma', id: 'm1' },
  { name: 'Sneha Kapoor', id: 's1' },
  { name: 'Anita Singh', id: 'd1' },
  { name: 'Vikram Reddy', id: 'e1' },
  { name: 'Alex J.', id: 'a1' },
];

export const LeadPipeline = () => {
  // State initialization loading from LocalStorage
  const [leads, setLeads] = useState(() => {
    const cached = localStorage.getItem('retailflow_pipeline_leads');
    if (cached) {
      try {
        return JSON.parse(cached);
      } catch (e) {
        console.error("Failed to parse cached pipeline leads", e);
      }
    }
    return initialLeads;
  });

  const [assigningLeadId, setAssigningLeadId] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Search & Filter state
  const [searchQuery, setSearchQuery] = useState('');
  const [priorityFilter, setPriorityFilter] = useState<'all' | 'high' | 'medium' | 'low'>('all');

  // Drag-and-drop states
  const [draggingLeadId, setDraggingLeadId] = useState<string | null>(null);
  const [dragOverColumn, setDragOverColumn] = useState<string | null>(null);

  // Form states for new lead creation
  const [formName, setFormName] = useState('');
  const [formLocation, setFormLocation] = useState('');
  const [formValue, setFormValue] = useState('');
  const [formOwner, setFormOwner] = useState(agents[0].name);
  const [formPriority, setFormPriority] = useState<'low' | 'medium' | 'high'>('medium');
  const [formNotes, setFormNotes] = useState('');
  const [openFastAddStatus, setOpenFastAddStatus] = useState<string | null>(null);

  // Sync leads back to local storage
  useEffect(() => {
    localStorage.setItem('retailflow_pipeline_leads', JSON.stringify(leads));
  }, [leads]);

  const assignLead = (leadId: string, agentName: string) => {
    setLeads((prev: any[]) => prev.map(l => l.id === leadId ? { ...l, owner: agentName } : l));
    setAssigningLeadId(null);
  };

  const handleCreateLead = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName.trim()) return;

    const formattedValue = formValue.trim().startsWith('₹') 
      ? formValue.trim() 
      : `₹${Number(formValue.replace(/[^\d]/g, '') || 0).toLocaleString('en-IN')}`;

    const newLead = {
      id: `lead-${Date.now()}`,
      name: formName.trim(),
      location: formLocation.trim() || 'Remote',
      value: formattedValue === '₹0' ? '₹1,00,000' : formattedValue,
      days: 0,
      status: openFastAddStatus || 'new',
      priority: formPriority,
      owner: formOwner,
    };

    setLeads((prev: any[]) => [newLead, ...prev]);
    
    // Clear and close
    setFormName('');
    setFormLocation('');
    setFormValue('');
    setFormOwner(agents[0].name);
    setFormPriority('medium');
    setFormNotes('');
    setOpenFastAddStatus(null);
    setIsModalOpen(false);
  };

  const handleDeleteLead = (id: string) => {
    if (window.confirm('Are you sure you want to delete this lead?')) {
      setLeads((prev: any[])  => prev.filter(l => l.id !== id));
    }
  };

  const handleDragStart = (
    e: React.DragEvent<HTMLDivElement> | React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement> | React.PointerEvent<HTMLDivElement> | MouseEvent | TouchEvent | PointerEvent,
    id: string
  ) => {
    setDraggingLeadId(id);
    if ('dataTransfer' in e) {
      e.dataTransfer.setData('text/plain', id);
      e.dataTransfer.effectAllowed = 'move';
    }
  };

  const handleDragEnd = () => {
    setDraggingLeadId(null);
    setDragOverColumn(null);
  };

  const handleDragOver = (e: React.DragEvent, columnId: string) => {
    e.preventDefault();
    if (dragOverColumn !== columnId) {
      setDragOverColumn(columnId);
    }
  };

  const handleDrop = (e: React.DragEvent, targetColumnId: string) => {
    e.preventDefault();
    const leadId = e.dataTransfer.getData('text/plain') || draggingLeadId;
    if (leadId) {
      setLeads((prev: any[]) => prev.map(l => l.id === leadId ? { ...l, status: targetColumnId } : l));
    }
    setDraggingLeadId(null);
    setDragOverColumn(null);
  };

  // Switch status via dropdown/quick button
  const setLeadStatusDirectly = (leadId: string, targetColumnId: string) => {
    setLeads((prev: any[]) => prev.map(l => l.id === leadId ? { ...l, status: targetColumnId } : l));
  };

  // Filter leads dynamically
  const filteredLeads = leads.filter((l: { name: string; location: string; owner: string; priority: string }) => {
    const matchesSearch = l.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          l.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          l.owner.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesPriority = priorityFilter === 'all' || l.priority === priorityFilter;
    return matchesSearch && matchesPriority;
  });

  // Calculate dynamic summary statistics
  const totalValueString = (() => {
    const sum = filteredLeads.reduce((acc: number, lead: { value: string }) => {
      const num = parseInt(lead.value.replace(/[^\d]/g, ''), 10) || 0;
      return acc + num;
    }, 0);
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(sum);
  })();

  return (
    <div className="h-full flex flex-col gap-6 relative">
      {/* Create Lead Modal */}
      <AnimatePresence>
        {(isModalOpen || openFastAddStatus) && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => {
                setIsModalOpen(false);
                setOpenFastAddStatus(null);
              }}
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
                  <h3 className="text-xl font-bold text-slate-800 tracking-tight">
                    Add New Lead {openFastAddStatus && `(to ${columns.find(c => c.id === openFastAddStatus)?.title})`}
                  </h3>
                  <p className="text-sm text-slate-400 font-medium mt-1 uppercase tracking-wider">Initialize new potential opportunity</p>
                </div>
                <button 
                  onClick={() => {
                    setIsModalOpen(false);
                    setOpenFastAddStatus(null);
                  }}
                  className="p-3 bg-slate-50 text-slate-400 hover:text-slate-600 rounded-2xl transition-colors shadow-sm"
                >
                  <X size={20} />
                </button>
              </div>

              <form onSubmit={handleCreateLead} className="p-8 space-y-6 overflow-y-auto max-h-[70vh] bg-slate-50/50">
                {/* Company Name */}
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] px-1">Company / Group Name</label>
                  <div className="relative group">
                    <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors" size={20} />
                    <input 
                      type="text" 
                      placeholder="e.g. Reliance Retail Ventures"
                      value={formName}
                      onChange={(e) => setFormName(e.target.value)}
                      className="w-full bg-white border border-slate-200 rounded-2xl py-4 pl-12 pr-6 text-sm font-bold text-slate-700 focus:outline-none focus:ring-4 focus:ring-blue-600/10 focus:border-blue-600 transition-all shadow-sm"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  {/* Market / Location */}
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] px-1">Market Location</label>
                    <div className="relative">
                      <Globe className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                      <input 
                        type="text" 
                        placeholder="e.g. Mumbai, MH"
                        value={formLocation}
                        onChange={(e) => setFormLocation(e.target.value)}
                        className="w-full bg-white border border-slate-200 rounded-2xl py-4 pl-12 pr-6 text-sm font-bold text-slate-700 focus:outline-none focus:ring-4 focus:ring-blue-600/10 focus:border-blue-600 transition-all shadow-sm"
                        required
                      />
                    </div>
                  </div>

                  {/* Estimated Value */}
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] px-1">Estimated Value (₹)</label>
                    <div className="relative">
                      <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                      <input 
                        type="text" 
                        placeholder="e.g. 1240000"
                        value={formValue}
                        onChange={(e) => setFormValue(e.target.value)}
                        className="w-full bg-white border border-slate-200 rounded-2xl py-4 pl-12 pr-6 text-sm font-bold text-slate-700 focus:outline-none focus:ring-4 focus:ring-blue-600/10 focus:border-blue-600 transition-all shadow-sm"
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  {/* Lead Owner */}
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] px-1">Assign Lead Owner</label>
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                      <select 
                        value={formOwner}
                        onChange={(e) => setFormOwner(e.target.value)}
                        className="w-full bg-white border border-slate-200 rounded-2xl py-4 pl-12 pr-6 text-sm font-bold text-slate-700 focus:outline-none focus:ring-4 focus:ring-blue-600/10 focus:border-blue-600 transition-all shadow-sm appearance-none cursor-pointer"
                      >
                        {agents.map(a => <option key={a.id} value={a.name}>{a.name}</option>)}
                      </select>
                    </div>
                  </div>

                  {/* Priority */}
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] px-1">Lead Priority</label>
                    <div className="relative">
                      <Flag className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                      <select 
                        value={formPriority}
                        onChange={(e) => setFormPriority(e.target.value as any)}
                        className="w-full bg-white border border-slate-200 rounded-2xl py-4 pl-12 pr-6 text-sm font-bold text-slate-700 focus:outline-none focus:ring-4 focus:ring-blue-600/10 focus:border-blue-600 transition-all shadow-sm appearance-none cursor-pointer"
                      >
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Additional Notes */}
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] px-1">Strategic Notes</label>
                  <textarea 
                    rows={3}
                    placeholder="Describe specific opportunity details, competitor context, or meeting highlights..."
                    value={formNotes}
                    onChange={(e) => setFormNotes(e.target.value)}
                    className="w-full bg-white border border-slate-200 rounded-2xl p-6 text-sm font-bold text-slate-700 focus:outline-none focus:ring-4 focus:ring-blue-600/10 focus:border-blue-600 transition-all shadow-sm resize-none"
                  />
                </div>
              </form>

              <div className="p-8 bg-white border-t border-slate-50 flex items-center justify-between">
                <button 
                  type="button"
                  onClick={() => {
                    setIsModalOpen(false);
                    setOpenFastAddStatus(null);
                  }}
                  className="px-8 py-4 bg-slate-50 text-slate-500 rounded-2xl font-bold text-sm hover:bg-slate-100 transition-all"
                >
                  Discard
                </button>
                <button 
                  type="button"
                  onClick={handleCreateLead}
                  className="px-10 py-4 bg-blue-600 text-white rounded-2xl font-bold text-sm shadow-xl shadow-blue-100 flex items-center gap-3 hover:bg-blue-700 transition-all active:scale-95"
                >
                  <Send size={18} />
                  <span>Create Lead</span>
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Kanban Filter Controls */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center bg-white p-6 rounded-3xl border border-slate-100 kpi-card-shadow gap-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 w-full md:w-auto">
          <div>
            <h2 className="text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
              <Briefcase size={22} className="text-blue-600" />
              <span>Active Lead Pipeline Board</span>
            </h2>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Pipeline Value:</span>
              <span className="text-sm font-extrabold text-blue-600">{totalValueString}</span>
              <span className="text-slate-300">|</span>
              <span className="text-xs font-semibold text-slate-400">{filteredLeads.length} Lead{filteredLeads.length === 1 ? '' : 's'}</span>
            </div>
          </div>
        </div>

        {/* Board Search & Filtering Elements */}
        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
          {/* Quick search input */}
          <div className="relative min-w-[200px] flex-1 sm:flex-initial">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <input 
              type="text"
              placeholder="Search by lead, location, owner..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-slate-50 hover:bg-slate-100/70 focus:bg-white border border-slate-200/60 rounded-xl text-xs font-semibold text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
            />
          </div>

          {/* Priority filter selector */}
          <div className="flex bg-slate-100 p-1 rounded-xl border border-slate-200/50">
            {(['all', 'high', 'medium', 'low'] as const).map(p => (
              <button
                key={p}
                onClick={() => setPriorityFilter(p)}
                className={cn(
                  "px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-wider transition-all",
                  priorityFilter === p 
                    ? "bg-white text-slate-800 shadow-sm" 
                    : "text-slate-400 hover:text-slate-600"
                )}
              >
                {p}
              </button>
            ))}
          </div>

          <button 
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-black uppercase tracking-wider shadow-lg shadow-blue-100 transition-all active:scale-95 ml-auto sm:ml-0"
          >
            <Plus size={15} />
            <span>New Lead</span>
          </button>
        </div>
      </div>

      {/* Kanban Board columns layout */}
      <div className="flex gap-6 overflow-x-auto pb-6 flex-1 min-h-0 custom-scrollbar select-none">
        {columns.map((column) => {
          const colLeads = filteredLeads.filter((l: { status: string }) => l.status === column.id);
          const isOver = dragOverColumn === column.id;

          return (
            <div 
              key={column.id} 
              onDragOver={(e) => handleDragOver(e, column.id)}
              onDragLeave={() => setDragOverColumn(null)}
              onDrop={(e) => handleDrop(e, column.id)}
              className={cn(
                "flex-shrink-0 w-80 flex flex-col gap-4 rounded-[2rem] p-4 border-2 transition-all duration-200",
                isOver 
                  ? "bg-blue-50/40 border-dashed border-blue-400 scale-[1.01]" 
                  : "bg-slate-50/50 border-transparent"
              )}
            >
              {/* Column Header */}
              <div className="flex items-center justify-between px-2">
                <div className="flex items-center gap-2.5">
                  <div className={cn("w-2.5 h-2.5 rounded-full ring-4", column.color, `ring-${column.color.split('-')[1]}-100`)} />
                  <h3 className="font-extrabold text-sm text-slate-800 tracking-tight uppercase tracking-wider">{column.title}</h3>
                  <span className="px-2 py-0.5 bg-slate-200/60 rounded-lg text-[10px] font-extrabold text-slate-600">
                    {colLeads.length}
                  </span>
                </div>
                <button 
                  onClick={() => {
                    setOpenFastAddStatus(column.id);
                    setFormPriority('medium');
                  }}
                  className="p-1.5 hover:bg-slate-200/50 rounded-lg text-slate-400 hover:text-blue-600 transition-colors"
                  title="Add Lead to column"
                >
                  <Plus size={16} />
                </button>
              </div>

              {/* Column Cards body */}
              <div className="flex-1 space-y-4 overflow-y-auto max-h-[64vh] pr-1.5 custom-scrollbar min-h-[350px]">
                {colLeads.length > 0 ? (
                  colLeads.map((lead: { id: string; status: string; priority: string; name: string ;location: string; owner: string ;value: string }) => {
                    const isBeingDragged = draggingLeadId === lead.id;

                    return (
                      <motion.div
                        layoutId={lead.id}
                        key={lead.id}
                        draggable="true"
                        onDragStart={(e) => handleDragStart(e, lead.id)}
                        onDragEnd={handleDragEnd}
                        className={cn(
                          "bg-white p-5 rounded-2xl border border-slate-200/75 kpi-card-shadow group hover:border-blue-400 transition-all cursor-grab active:cursor-grabbing relative",
                          isBeingDragged ? "opacity-40 border-dashed border-blue-300 shadow-none scale-[0.98]" : "hover:shadow-md"
                        )}
                      >
                        <div className="flex justify-between items-start mb-3">
                          <span className={cn(
                            "text-[8px] font-black uppercase tracking-widest px-2.5 py-0.5 rounded-full",
                            lead.priority === 'high' ? "bg-rose-50 text-rose-600 border border-rose-100" :
                            lead.priority === 'medium' ? "bg-amber-50 text-amber-600 border border-amber-100" :
                            "bg-blue-50 text-blue-600 border border-blue-100"
                          )}>
                            {lead.priority} priority
                          </span>
                          <div className="flex items-center gap-1.5">
                            {/* Column action swap button for touchscreen adaptability */}
                            <select 
                              value={lead.status}
                              onChange={(e) => setLeadStatusDirectly(lead.id, e.target.value)}
                              className="text-[10px] bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-lg py-1 px-1.5 font-bold text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 cursor-pointer"
                              title="Move status"
                            >
                              {columns.map(c => <option key={c.id} value={c.id}>{c.title.split(' ')[0]}</option>)}
                            </select>

                            <button 
                              onClick={() => handleDeleteLead(lead.id)}
                              className="p-1 text-slate-300 hover:text-rose-500 hover:bg-rose-50 rounded-lg transition-all opacity-0 group-hover:opacity-100 cursor-pointer"
                              title="Delete Opportunity"
                            >
                              <Trash2 size={13} />
                            </button>
                          </div>
                        </div>

                        <h4 className="font-extrabold text-slate-800 text-sm group-hover:text-blue-600 transition-colors mb-2 leading-snug">
                          {lead.name}
                        </h4>
                        
                        <div className="space-y-4">
                          <div className="flex items-center gap-2 text-[11px] text-slate-400 font-bold uppercase tracking-wider">
                            <MapPin size={11} className="text-slate-400 shrink-0" />
                            <span>{lead.location}</span>
                          </div>
                          
                          <div className="flex flex-col gap-3 pt-4 border-t border-slate-100 relative">
                            <div className="flex items-center justify-between">
                              <button 
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setAssigningLeadId(assigningLeadId === lead.id ? null : lead.id);
                                }}
                                className="flex items-center gap-2 hover:bg-slate-50 p-1 rounded-lg transition-colors group/assign"
                              >
                                <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center text-[9px] font-black text-blue-600 group-hover/assign:bg-blue-600 group-hover/assign:text-white transition-colors">
                                  {lead.owner.split(' ').map(n => n[0]).join('')}
                                </div>
                                <div className="flex flex-col items-start leading-none">
                                  <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">Owner</span>
                                  <div className="flex items-center gap-1 text-slate-900">
                                    <span className="text-[11px] font-bold">{lead.owner}</span>
                                    <ChevronDown size={10} className={cn("text-slate-400 transition-transform", assigningLeadId === lead.id && "rotate-180")} />
                                  </div>
                                </div>
                              </button>

                              <div className="text-right">
                                <p className="text-[9px] text-slate-400 font-extrabold uppercase tracking-widest mb-0.5">Value</p>
                                <p className="text-sm font-black text-slate-800">{lead.value}</p>
                              </div>
                            </div>

                            <AnimatePresence>
                              {assigningLeadId === lead.id && (
                                <>
                                  <div 
                                    className="fixed inset-0 z-40" 
                                    onClick={() => setAssigningLeadId(null)}
                                  />
                                  <motion.div
                                    initial={{ opacity: 0, scale: 0.95, y: -10 }}
                                    animate={{ opacity: 1, scale: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.95, y: -10 }}
                                    className="absolute z-50 left-0 right-0 bottom-[calc(100%-8px)] mb-3 bg-white border border-slate-200/80 rounded-2xl shadow-2xl overflow-hidden"
                                  >
                                    <div className="p-2 flex flex-col gap-1 max-h-48 overflow-y-auto custom-scrollbar">
                                      <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1.5 px-3 pt-2">Assign Owner</p>
                                      {agents.map(agent => (
                                        <button
                                          key={agent.id}
                                          type="button"
                                          onClick={() => assignLead(lead.id, agent.name)}
                                          className={cn(
                                            "flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-bold transition-all",
                                            lead.owner === agent.name 
                                              ? "bg-blue-600 text-white shadow-lg shadow-blue-200" 
                                              : "bg-white text-slate-600 hover:bg-slate-50"
                                          )}
                                        >
                                          <div className="flex items-center gap-2">
                                            <div className={cn(
                                              "w-5 h-5 rounded-full flex items-center justify-center text-[8px]",
                                              lead.owner === agent.name ? "bg-white/20" : "bg-slate-100 text-slate-500"
                                            )}>
                                              {agent.name.split(' ').map(n => n[0]).join('')}
                                            </div>
                                            <span>{agent.name}</span>
                                          </div>
                                          {lead.owner === agent.name && <Check size={14} />}
                                        </button>
                                      ))}
                                    </div>
                                  </motion.div>
                                </>
                              )}
                            </AnimatePresence>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })
                ) : (
                  <div className="py-12 px-4 border border-dashed border-slate-200 rounded-2xl flex flex-col items-center text-center justify-center">
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Empty Stage</p>
                    <p className="text-[10px] text-slate-400 mt-1 max-w-[180px] leading-relaxed">Drag leads here or click the "+" button to add one.</p>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
