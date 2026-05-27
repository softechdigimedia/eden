import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useAuth } from '../contexts/AuthContext';
import { 
  Search, 
  Filter, 
  MapPin, 
  Edit2, 
  Eye, 
  ChevronLeft,
  ChevronRight,
  Map,
  Plus,
  X,
  Check
} from 'lucide-react';
import { cn } from '../lib/utils';

const initialPosts = [
  {
    id: 1,
    title: 'Nestle KitKat Promo - Big Bazaar',
    location: 'Big Bazaar Central',
    subLocation: '7th Sector, HSR Layout',
    assignedTo: { name: 'Arjun Mehta', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80' },
    campaign: 'Nestle Summer Drive',
    status: 'Active',
    dueDate: '12 Apr 2025',
  },
  {
    id: 2,
    title: 'Coca-Cola Zero Audit',
    location: 'Reliance Fresh',
    subLocation: 'Koramangala 4th Block',
    assignedTo: { name: 'Sarah Jenkins', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80' },
    campaign: 'Quarterly Retail Audit',
    status: 'Overdue',
    dueDate: '08 Apr 2025',
  },
  {
    id: 3,
    title: 'Nike Jordan Launch - Select',
    location: 'Select Citywalk',
    subLocation: 'Saket District Centre',
    assignedTo: { name: 'David Chen', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80' },
    campaign: 'Nike Spring 2025',
    status: 'Completed',
    dueDate: '10 Apr 2025',
  },
  {
    id: 4,
    title: 'Unilever Soap Display setup',
    location: 'HyperCity Mall',
    subLocation: 'Whitefield Main Rd',
    assignedTo: { name: 'Lisa Wong', type: 'initials', initials: 'LW' },
    campaign: 'Unilever Q2 POSM',
    status: 'Pending',
    dueDate: '15 Apr 2025',
  }
];

const AVAILABLE_AGENTS = [
  { name: 'Arjun Mehta', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80' },
  { name: 'Sarah Jenkins', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80' },
  { name: 'David Chen', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80' },
  { name: 'Lisa Wong', type: 'initials', initials: 'LW' }
];

export const FieldPosts = () => {
  const { user } = useAuth();
  const [posts, setPosts] = useState(initialPosts);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Form states
  const [newTitle, setNewTitle] = useState('');
  const [newLocation, setNewLocation] = useState('');
  const [newSubLocation, setNewSubLocation] = useState('');
  const [newAgentIndex, setNewAgentIndex] = useState('0');
  const [newCampaign, setNewCampaign] = useState('');
  const [newStatus, setNewStatus] = useState('Active');
  const [newDueDate, setNewDueDate] = useState('');

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'active': return 'text-blue-500 bg-blue-500';
      case 'overdue': return 'text-rose-500 bg-rose-500';
      case 'completed': return 'text-emerald-500 bg-emerald-500';
      case 'pending': return 'text-slate-400 bg-slate-400';
      default: return 'text-slate-400 bg-slate-400';
    }
  };

  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newLocation.trim()) return;

    const selectedAgentObj = AVAILABLE_AGENTS[parseInt(newAgentIndex, 10)] || AVAILABLE_AGENTS[0];

    // Format date beautifully
    let formattedDate = newDueDate;
    if (!formattedDate) {
      const today = new Date();
      const options: Intl.DateTimeFormatOptions = { day: '2-digit', month: 'short', year: 'numeric' };
      formattedDate = today.toLocaleDateString('en-US', options);
    } else {
      const parsedDate = new Date(newDueDate);
      if (!isNaN(parsedDate.getTime())) {
        const options: Intl.DateTimeFormatOptions = { day: '2-digit', month: 'short', year: 'numeric' };
        formattedDate = parsedDate.toLocaleDateString('en-US', options);
      }
    }

    const newPost = {
      id: posts.length + 1,
      title: newTitle,
      location: newLocation,
      subLocation: newSubLocation || 'Central Area',
      assignedTo: {
        name: selectedAgentObj.name,
        avatar: (selectedAgentObj as any).avatar,
        initials: (selectedAgentObj as any).initials,
        type: (selectedAgentObj as any).type
      },
      campaign: newCampaign || 'General Operations',
      status: newStatus,
      dueDate: formattedDate,
    };

    setPosts([newPost, ...posts]);

    // Reset Form fields
    setNewTitle('');
    setNewLocation('');
    setNewSubLocation('');
    setNewAgentIndex('0');
    setNewCampaign('');
    setNewStatus('Active');
    setNewDueDate('');
    setIsModalOpen(false);
  };

  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          post.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          post.campaign.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All' || post.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">
            <span>{user?.role === 'client' ? 'Client' : 'Manager'}</span>
            <ChevronRight size={12} />
            <span className="text-blue-600">Posts</span>
          </div>
          <h1 className="text-3xl font-bold text-slate-800 tracking-tight">Field Posts</h1>
          <p className="text-slate-400 text-sm font-medium mt-1">Manage and track field marketing assignments and locations.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-2xl text-sm font-bold shadow-lg shadow-blue-100 hover:bg-blue-700 transition-all active:scale-95"
        >
          <Plus size={20} />
          <span>Create Post</span>
        </button>
      </div>

      <div className="bg-white rounded-[2rem] border border-slate-100 shadow-sm overflow-hidden">
        <div className="p-8 border-b border-slate-50 flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="Search posts, campaigns, or locations..." 
              className="w-full pl-12 pr-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-bold text-slate-700 focus:outline-none focus:ring-4 focus:ring-blue-600/10 focus:border-blue-600 transition-all"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="relative md:w-64">
            <Filter className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <select 
              className="w-full pl-12 pr-10 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-bold text-slate-700 appearance-none focus:outline-none focus:ring-4 focus:ring-blue-600/10 focus:border-blue-600 transition-all cursor-pointer"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="All">Status: All</option>
              <option value="Active">Active</option>
              <option value="Overdue">Overdue</option>
              <option value="Completed">Completed</option>
              <option value="Pending">Pending</option>
            </select>
            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
               <ChevronRight size={16} className="rotate-90" />
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-slate-50">
                <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Post Title</th>
                <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Location</th>
                <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Assigned To</th>
                <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Campaign</th>
                <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Status</th>
                <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Due Date</th>
                <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredPosts.map((post) => (
                <tr key={post.id} className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors group">
                  <td className="px-8 py-6 min-w-[250px]">
                    <p className="text-sm font-bold text-slate-800 tracking-tight">{post.title}</p>
                  </td>
                  <td className="px-8 py-6 min-w-[200px]">
                    <div className="flex items-start gap-2">
                       <MapPin size={16} className="text-blue-500 mt-0.5" />
                       <div>
                         <p className="text-xs font-bold text-slate-800">{post.location}</p>
                         <p className="text-[10px] text-slate-400 font-medium">{post.subLocation}</p>
                       </div>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-3">
                      {post.assignedTo.avatar ? (
                        <img src={post.assignedTo.avatar} className="w-8 h-8 rounded-full border-2 border-white shadow-sm" />
                      ) : (
                        <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-[10px] font-bold text-slate-500">
                          {post.assignedTo.initials}
                        </div>
                      )}
                      <span className="text-xs font-bold text-slate-700">{post.assignedTo.name}</span>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <span className="text-xs font-medium text-slate-500 italic">{post.campaign}</span>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-2">
                       <div className={cn("w-2 h-2 rounded-full", getStatusColor(post.status))} />
                       <span className={cn("text-xs font-black uppercase tracking-widest", getStatusColor(post.status).split(' ')[0])}>
                         {post.status}
                       </span>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <span className="text-xs font-bold text-slate-700">{post.dueDate}</span>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-2">
                      <button className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all">
                        <Edit2 size={18} />
                      </button>
                      <button className="p-2 text-slate-400 hover:text-slate-900 rounded-lg transition-all">
                        <Eye size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredPosts.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-8 py-12 text-center text-slate-400 text-sm font-semibold">
                    No active field posts match your criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="p-8 bg-slate-50/50 flex items-center justify-between">
           <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
             Showing {filteredPosts.length} post{filteredPosts.length === 1 ? '' : 's'} (total {posts.length})
           </p>
           <div className="flex items-center gap-4">
              <button className="p-2 text-slate-400 hover:text-slate-800 transition-colors disabled:opacity-35" disabled>
                <ChevronLeft size={20} />
              </button>
              <p className="text-xs font-bold text-slate-800">Page 1 of 1</p>
              <button className="p-2 text-slate-400 hover:text-slate-800 transition-colors disabled:opacity-35" disabled>
                <ChevronRight size={20} />
              </button>
           </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-gradient-to-br from-indigo-900 to-blue-900 rounded-[2.5rem] p-10 text-white relative overflow-hidden shadow-2xl">
           <div className="relative z-10">
              <h3 className="text-2xl font-bold tracking-tight mb-2">Post Performance Overview</h3>
              <p className="text-indigo-200/80 text-sm font-medium mb-8 max-w-md">Your team has completed 84% of assigned tasks this week. Keep tracking real-time status updates.</p>
              
              <div className="flex gap-12">
                 <div>
                    <p className="text-3xl font-black mb-1">
                      {posts.filter(p => p.status === 'Active').length}
                    </p>
                    <p className="text-[10px] font-black text-indigo-300 uppercase tracking-[0.2em]">Active</p>
                 </div>
                 <div>
                    <p className="text-3xl font-black mb-1">
                      {posts.filter(p => p.status === 'Completed').length}
                    </p>
                    <p className="text-[10px] font-black text-indigo-300 uppercase tracking-[0.2em]">Completed</p>
                 </div>
                 <div>
                    <p className="text-3xl font-black text-rose-400 mb-1">
                      {posts.filter(p => p.status === 'Overdue').length}
                    </p>
                    <p className="text-[10px] font-black text-indigo-300 uppercase tracking-[0.2em]">Overdue</p>
                 </div>
              </div>
           </div>
           
           <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-white/5 backdrop-blur-sm -skew-x-12 translate-x-20" />
        </div>

        <div className="bg-white rounded-[2.5rem] border border-slate-100 p-10 shadow-sm flex flex-col items-center justify-center text-center">
           <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-6 shadow-sm">
              <Map size={32} />
           </div>
           <h3 className="text-xl font-bold text-slate-800 tracking-tight mb-2">Map View</h3>
           <p className="text-slate-400 text-sm font-medium mb-6">Switch to visual geographic view of all active field posts.</p>
           <button className="text-blue-600 font-black text-xs uppercase tracking-widest hover:underline">
              Open Field Map
           </button>
        </div>
      </div>

      {/* Modal Popup overlay */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-slate-950/65 backdrop-blur-sm"
            />

            {/* Modal Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="bg-white rounded-[2.5rem] w-full max-w-xl p-8 border border-slate-100 shadow-2xl relative z-10 overflow-hidden"
            >
              {/* Highlight strip */}
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-blue-500 to-indigo-600" />

              {/* Close Button */}
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="absolute right-6 top-6 p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-xl transition-all"
              >
                <X size={18} />
              </button>

              <div className="mb-6">
                <span className="text-[10px] bg-blue-50 text-blue-600 px-3 py-1 rounded-full font-black uppercase tracking-widest border border-blue-100">
                  New Assignment
                </span>
                <h3 className="text-xl font-extrabold text-slate-800 tracking-tight mt-3">Create New Field Post</h3>
                <p className="text-xs text-slate-400 font-medium mt-1">Deploy tasks and locations to field lead personnel instantly.</p>
              </div>

              <form onSubmit={handleCreatePost} className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-slate-400 tracking-widest uppercase">Post Title</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Nestle KitKat Promo Shelf Setup"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-xs font-bold text-slate-700 focus:outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-600/5 transition-all"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black text-slate-400 tracking-widest uppercase">Location Name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Big Bazaar"
                      value={newLocation}
                      onChange={(e) => setNewLocation(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-xs font-bold text-slate-700 focus:outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-600/5 transition-all"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black text-slate-400 tracking-widest uppercase">Sub-Location / Area</label>
                    <input
                      type="text"
                      placeholder="e.g. HSR Layout, Sector 7"
                      value={newSubLocation}
                      onChange={(e) => setNewSubLocation(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-xs font-bold text-slate-700 focus:outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-600/5 transition-all"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black text-slate-400 tracking-widest uppercase">Campaign Goal</label>
                    <input
                      type="text"
                      placeholder="e.g. Nestle Summer Drive"
                      value={newCampaign}
                      onChange={(e) => setNewCampaign(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-xs font-bold text-slate-700 focus:outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-600/5 transition-all"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black text-slate-400 tracking-widest uppercase">Due Date</label>
                    <input
                      type="date"
                      value={newDueDate}
                      onChange={(e) => setNewDueDate(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-xs font-bold text-slate-701 focus:outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-600/5 transition-all"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black text-slate-400 tracking-widest uppercase">Assign Agent</label>
                    <select
                      value={newAgentIndex}
                      onChange={(e) => setNewAgentIndex(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-xs font-bold text-slate-700 focus:outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-600/5 transition-all cursor-pointer"
                    >
                      {AVAILABLE_AGENTS.map((agent, index) => (
                        <option key={index} value={index}>
                          {agent.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black text-slate-400 tracking-widest uppercase">Initial Status</label>
                    <select
                      value={newStatus}
                      onChange={(e) => setNewStatus(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-xs font-bold text-slate-700 focus:outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-600/5 transition-all cursor-pointer"
                    >
                      <option value="Active">Active</option>
                      <option value="Pending">Pending</option>
                      <option value="Completed">Completed</option>
                      <option value="Overdue">Overdue</option>
                    </select>
                  </div>
                </div>

                <div className="pt-4 flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-5 py-3 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-xs font-bold uppercase tracking-widest text-slate-500 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold uppercase tracking-widest transition-all shadow-lg shadow-blue-100 flex items-center gap-2"
                  >
                    <Check size={14} />
                    <span>Create Field Post</span>
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

