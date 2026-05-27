import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { motion, AnimatePresence } from 'motion/react';
import { 
  User, 
  Shield, 
  MapPin, 
  Bell, 
  Database, 
  Check, 
  RefreshCw, 
  Eye, 
  EyeOff, 
  Upload, 
  Smartphone, 
  Globe, 
  Clock,
  AlertCircle,
} from 'lucide-react';
import { cn } from '../lib/utils';

export const SettingsPage = () => {
  const { user, updateUser } = useAuth();
  const [activeSubTab, setActiveSubTab] = useState<'profile' | 'security' | 'region' | 'notifications' | 'system'>('profile');
  
  // Profile Form States
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [avatar, setAvatar] = useState(user?.avatar || '');
  const [phone, setPhone] = useState('+1 (555) 382-9402');
  const [company, setCompany] = useState('Field Lead Pro Inc.');
  
  // Security States
  const [showMapsKey, setShowMapsKey] = useState(false);
  const [mapsKey, setMapsKey] = useState(localStorage.getItem('GOOGLE_MAPS_PLATFORM_KEY') || '');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [mfaEnabled, setMfaEnabled] = useState(true);

  // Region States
  const [timezone, setTimezone] = useState('America/Los_Angeles');
  const [language, setLanguage] = useState('en');
  const [timeFormat, setTimeFormat] = useState('12h');
  const [officeLocation, setOfficeLocation] = useState('West Coast Headquarters');

  // Notification States
  const [notifyEmailEscalation, setNotifyEmailEscalation] = useState(true);
  const [notifySmsAlerts, setNotifySmsAlerts] = useState(false);
  const [notifyDesktopDaily, setNotifyDesktopDaily] = useState(true);
  const [notifyReportComplete, setNotifyReportComplete] = useState(true);

  // Success Notification banner
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const triggerSuccessBanner = (msg: string) => {
    setSuccessMessage(msg);
    setTimeout(() => {
      setSuccessMessage(null);
    }, 4000);
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    if (updateUser) {
      updateUser({ name, email, avatar });
      triggerSuccessBanner('Profile settings updated successfully across the platform!');
    }
  };

  const handleSaveSecurity = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem('GOOGLE_MAPS_PLATFORM_KEY', mapsKey);
    // Trigger windows storage event to update other views if any
    window.dispatchEvent(new Event('storage'));
    triggerSuccessBanner('Security credentials and integration keys persisted safely.');
  };

  const handleSaveRegion = (e: React.FormEvent) => {
    e.preventDefault();
    triggerSuccessBanner('Localization preferences synchronised with network databases.');
  };

  const handleSaveNotifications = (e: React.FormEvent) => {
    e.preventDefault();
    triggerSuccessBanner('Notification distribution policy updated successfully.');
  };

  const handleResetApp = () => {
    if (window.confirm('Are you sure you want to reset localized preferences? This will restore defaults.')) {
      setMapsKey('');
      localStorage.removeItem('GOOGLE_MAPS_PLATFORM_KEY');
      window.dispatchEvent(new Event('storage'));
      triggerSuccessBanner('System storage cleared and re-initialised.');
    }
  };

  const selectPresetAvatar = (url: string) => {
    setAvatar(url);
  };

  const avatarPresets = [
    'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
  ];

  if (!user) return null;

  return (
    <div className="space-y-10 pb-20 max-w-6xl mx-auto">
      {/* Toast Announcement */}
      <AnimatePresence>
        {successMessage && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            className="fixed top-8 left-1/2 -translate-x-1/2 bg-emerald-600 text-white px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-3 z-50 border border-emerald-500/20 backdrop-blur-md"
          >
            <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">
              <Check size={14} className="text-white font-bold" />
            </div>
            <span className="text-sm font-bold tracking-tight">{successMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex flex-col lg:flex-row gap-8">
        
        {/* Left Side: Navigation Links & Profile Snapshot */}
        <div className="w-full lg:w-80 shrink-0 space-y-6">
          <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm flex flex-col items-center text-center">
            <div className="relative group mb-4">
              <div className="w-24 h-24 rounded-full overflow-hidden ring-4 ring-blue-50 border-2 border-white shadow-md">
                <img src={avatar || 'https://via.placeholder.com/150'} alt="Avatar" className="w-full h-full object-cover" />
              </div>
              <div className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                <Upload size={16} className="text-white" />
              </div>
            </div>

            <h3 className="text-lg font-black text-slate-800 tracking-tight leading-tight">{user.name}</h3>
            <p className="text-xs font-bold text-slate-500 tracking-wide truncate max-w-[200px] mt-1">{user.email}</p>
            
            <div className="mt-4 px-4 py-1.5 bg-blue-50 text-blue-600 text-[10px] font-black uppercase tracking-widest rounded-full border border-blue-100">
              {user.role.replace('_', ' ')}
            </div>

            <div className="w-full h-[1px] bg-slate-100 my-6"></div>

            <div className="text-left w-full space-y-4">
              <div className="flex justify-between items-center text-xs text-slate-400 font-medium">
                <span>Account ID</span>
                <span className="text-slate-700 font-mono font-semibold">{user.id}</span>
              </div>
              <div className="flex justify-between items-center text-xs text-slate-400 font-medium">
                <span>Status</span>
                <span className="inline-flex items-center gap-1.5 font-bold text-emerald-600">
                  <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                  Active
                </span>
              </div>
              <div className="flex justify-between items-center text-xs text-slate-400 font-medium">
                <span>Last Updated</span>
                <span className="text-slate-700 font-bold">Today</span>
              </div>
            </div>
          </div>

          <div className="bg-white p-3 rounded-[2rem] border border-slate-100 shadow-sm space-y-1">
            <button
              onClick={() => setActiveSubTab('profile')}
              className={cn(
                "w-full px-5 py-3.5 rounded-xl text-left text-xs font-black uppercase tracking-widest transition-all flex items-center gap-3",
                activeSubTab === 'profile' 
                  ? "bg-slate-50 text-blue-600 font-black border border-slate-200/50" 
                  : "text-slate-400 hover:text-slate-700 hover:bg-slate-50/50"
              )}
            >
              <User size={16} className={activeSubTab === 'profile' ? 'text-blue-500' : 'text-slate-400'} />
              <span>User Profile</span>
            </button>
            <button
              onClick={() => setActiveSubTab('security')}
              className={cn(
                "w-full px-5 py-3.5 rounded-xl text-left text-xs font-black uppercase tracking-widest transition-all flex items-center gap-3",
                activeSubTab === 'security' 
                  ? "bg-slate-50 text-blue-600 font-black border border-slate-200/50" 
                  : "text-slate-400 hover:text-slate-700 hover:bg-slate-50/50"
              )}
            >
              <Shield size={16} className={activeSubTab === 'security' ? 'text-blue-500' : 'text-slate-400'} />
              <span>API & Security</span>
            </button>
            <button
              onClick={() => setActiveSubTab('region')}
              className={cn(
                "w-full px-5 py-3.5 rounded-xl text-left text-xs font-black uppercase tracking-widest transition-all flex items-center gap-3",
                activeSubTab === 'region' 
                  ? "bg-slate-50 text-blue-600 font-black border border-slate-200/50" 
                  : "text-slate-400 hover:text-slate-700 hover:bg-slate-50/50"
              )}
            >
              <MapPin size={16} className={activeSubTab === 'region' ? 'text-blue-500' : 'text-slate-400'} />
              <span>Localization</span>
            </button>
            <button
              onClick={() => setActiveSubTab('notifications')}
              className={cn(
                "w-full px-5 py-3.5 rounded-xl text-left text-xs font-black uppercase tracking-widest transition-all flex items-center gap-3",
                activeSubTab === 'notifications' 
                  ? "bg-slate-50 text-blue-600 font-black border border-slate-200/50" 
                  : "text-slate-400 hover:text-slate-700 hover:bg-slate-50/50"
              )}
            >
              <Bell size={16} className={activeSubTab === 'notifications' ? 'text-blue-500' : 'text-slate-400'} />
              <span>Notifications</span>
            </button>
            <button
              onClick={() => setActiveSubTab('system')}
              className={cn(
                "w-full px-5 py-3.5 rounded-xl text-left text-xs font-black uppercase tracking-widest transition-all flex items-center gap-3",
                activeSubTab === 'system' 
                  ? "bg-slate-50 text-blue-600 font-black border border-slate-200/50" 
                  : "text-slate-400 hover:text-slate-700 hover:bg-slate-50/50"
              )}
            >
              <Database size={16} className={activeSubTab === 'system' ? 'text-blue-500' : 'text-slate-400'} />
              <span>Advanced System</span>
            </button>
          </div>
        </div>

        {/* Right Side: Tab Form Modules */}
        <div className="flex-1">
          <div className="bg-white rounded-[2.5rem] p-10 border border-slate-100 shadow-sm relative overflow-hidden">
            
            {/* Ambient subtle linear accents */}
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-blue-500 via-indigo-500 to-cyan-400"></div>

            <AnimatePresence mode="wait">
              
              {/* Profile Personalization */}
              {activeSubTab === 'profile' && (
                <motion.div
                  key="profile-tab"
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.15 }}
                  className="space-y-8"
                >
                  <div>
                    <h2 className="text-xl font-extrabold text-slate-800 tracking-tight leading-tight">Profile Personalization</h2>
                    <p className="text-xs text-slate-400 font-bold tracking-wide mt-1 uppercase">Modify public identity metrics and avatars</p>
                  </div>

                  <form onSubmit={handleSaveProfile} className="space-y-6">
                    <div className="space-y-3">
                      <label className="text-[10px] font-black text-slate-400 tracking-widest uppercase">Quick Avatar Selector</label>
                      <div className="flex flex-wrap gap-3">
                        {avatarPresets.map((preset, i) => (
                          <button
                            type="button"
                            key={i}
                            onClick={() => selectPresetAvatar(preset)}
                            className={cn(
                              "w-12 h-12 rounded-full overflow-hidden border-2 transition-all p-0.5",
                              avatar === preset ? "border-blue-500 ring-4 ring-blue-500/10 scale-105" : "border-transparent hover:border-slate-300"
                            )}
                          >
                            <img src={preset} className="w-full h-full object-cover rounded-full" alt={`Preset ${i}`} />
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-400 tracking-widest uppercase">Full Name</label>
                        <input
                          type="text"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className="w-full px-5 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-sm font-semibold text-slate-800 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/5 transition-all"
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-400 tracking-widest uppercase">Email Address</label>
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="w-full px-5 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-sm font-semibold text-slate-800 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/5 transition-all"
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-400 tracking-widest uppercase">Phone Number</label>
                        <input
                          type="text"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          className="w-full px-5 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-sm font-semibold text-slate-800 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/5 transition-all"
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-400 tracking-widest uppercase">Company / Organization</label>
                        <input
                          type="text"
                          value={company}
                          onChange={(e) => setCompany(e.target.value)}
                          className="w-full px-5 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-sm font-semibold text-slate-800 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/5 transition-all"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-400 tracking-widest uppercase">Custom Avatar URL</label>
                      <input
                        type="url"
                        value={avatar}
                        onChange={(e) => setAvatar(e.target.value)}
                        placeholder="https://..."
                        className="w-full px-5 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-sm font-semibold text-slate-800 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/5 transition-all"
                      />
                    </div>

                    <div className="pt-4 flex justify-end">
                      <button
                        type="submit"
                        className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl text-xs font-bold uppercase tracking-widest transition-all active:scale-95 shadow-xl shadow-blue-500/10 flex items-center gap-2"
                      >
                        <Check size={14} />
                        <span>Save Workspace Profile</span>
                      </button>
                    </div>
                  </form>
                </motion.div>
              )}

              {/* Security & System Keys */}
              {activeSubTab === 'security' && (
                <motion.div
                  key="security-tab"
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.15 }}
                  className="space-y-8"
                >
                  <div>
                    <h2 className="text-xl font-extrabold text-slate-800 tracking-tight leading-tight">Security & Integrations</h2>
                    <p className="text-xs text-slate-400 font-bold tracking-wide mt-1 uppercase">Manage Google API keys & compliance credentials</p>
                  </div>

                  <form onSubmit={handleSaveSecurity} className="space-y-6">
                    
                    {/* Google Maps Configuration */}
                    <div className="p-6 bg-slate-50 rounded-[1.5rem] border border-slate-200/50 space-y-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-orange-50 flex items-center justify-center text-orange-500">
                          <MapPin size={20} />
                        </div>
                        <div>
                          <h4 className="text-sm font-bold text-slate-800 leading-tight">Google Maps Javascript API Key</h4>
                          <span className="text-[10px] text-slate-400 font-medium">Powers real-time GPS tracking of field agents on maps.</span>
                        </div>
                      </div>

                      <div className="relative">
                        <input
                          type={showMapsKey ? 'text' : 'password'}
                          value={mapsKey}
                          onChange={(e) => setMapsKey(e.target.value)}
                          placeholder="AIzaSy..."
                          className="w-full pl-5 pr-12 py-3 rounded-xl border border-slate-200 text-sm font-mono font-medium text-slate-800 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/5 transition-all bg-white"
                        />
                        <button
                          type="button"
                          onClick={() => setShowMapsKey(!showMapsKey)}
                          className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                        >
                          {showMapsKey ? <EyeOff size={16} /> : <Eye size={16} />}
                        </button>
                      </div>

                      <div className="text-[10px] text-slate-400/90 leading-relaxed font-medium">
                        The key is securely stored inside local secure storage buffers and will be referenced by spatial modules across both Super Admin and Manager dashboards.
                      </div>
                    </div>

                    {/* Change Password Panel */}
                    <div className="space-y-4 pt-4 border-t border-slate-100">
                      <h4 className="text-xs font-black text-slate-400 tracking-widest uppercase">Change Secure Password</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label className="text-[10px] font-black text-slate-400 tracking-widest uppercase">Current Password</label>
                          <input
                            type="password"
                            value={currentPassword}
                            onChange={(e) => setCurrentPassword(e.target.value)}
                            placeholder="••••••••"
                            className="w-full px-5 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-sm font-medium text-slate-800 focus:outline-none focus:border-blue-500 transition-all"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-[10px] font-black text-slate-400 tracking-widest uppercase">New Passcode</label>
                          <input
                            type="password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            placeholder="••••••••"
                            className="w-full px-5 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-sm font-medium text-slate-800 focus:outline-none focus:border-blue-500 transition-all"
                          />
                        </div>
                      </div>
                    </div>

                    {/* MFA Toggle */}
                    <div className="flex items-center justify-between p-4 bg-blue-50/50 rounded-2xl border border-blue-100/30">
                      <div className="flex items-center gap-3">
                        <Smartphone size={18} className="text-blue-500" />
                        <div>
                          <p className="text-xs font-bold text-slate-800 uppercase tracking-wide">Multi-Factor Authentication</p>
                          <p className="text-[10px] text-slate-400 font-medium">Mandatory for elevated roles (super_admin, manager)</p>
                        </div>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={mfaEnabled}
                          onChange={(e) => setMfaEnabled(e.target.checked)}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                    </div>

                    <div className="pt-4 flex justify-end">
                      <button
                        type="submit"
                        className="px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl text-xs font-bold uppercase tracking-widest transition-all active:scale-95 shadow-xl shadow-indigo-500/10 flex items-center gap-2"
                      >
                        <Check size={14} />
                        <span>Update Critical Keys</span>
                      </button>
                    </div>
                  </form>
                </motion.div>
              )}

              {/* Regional Settings */}
              {activeSubTab === 'region' && (
                <motion.div
                  key="region-tab"
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.15 }}
                  className="space-y-8"
                >
                  <div>
                    <h2 className="text-xl font-extrabold text-slate-800 tracking-tight leading-tight">Localization Preferences</h2>
                    <p className="text-xs text-slate-400 font-bold tracking-wide mt-1 uppercase">Adjust system times, offices, and regional frameworks</p>
                  </div>

                  <form onSubmit={handleSaveRegion} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-400 tracking-widest uppercase">Office Assignment Hub</label>
                        <select
                          value={officeLocation}
                          onChange={(e) => setOfficeLocation(e.target.value)}
                          className="w-full px-5 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-sm font-semibold text-slate-800 focus:outline-none focus:border-blue-500 transition-all"
                        >
                          <option value="West Coast Headquarters">West Coast Headquarters</option>
                          <option value="East Coast Operations">East Coast Operations</option>
                          <option value="Mumbai Regional Office">Mumbai Regional Office</option>
                          <option value="Delhi Central Hub">Delhi Central Hub</option>
                          <option value="London Europe Office">London Europe Office</option>
                        </select>
                      </div>

                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-400 tracking-widest uppercase">System Timezone</label>
                        <div className="relative">
                          <select
                            value={timezone}
                            onChange={(e) => setTimezone(e.target.value)}
                            className="w-full px-5 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-sm font-semibold text-slate-800 focus:outline-none focus:border-blue-500 transition-all appearance-none"
                          >
                            <option value="America/Los_Angeles">Pacific Time (PT) - US/Canada</option>
                            <option value="America/New_York">Eastern Time (ET) - US/Canada</option>
                            <option value="Asia/Kolkata">India Standard Time (IST) - New Delhi</option>
                            <option value="Europe/London">Greenwich Mean Time (GMT) - London</option>
                          </select>
                          <Clock size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-400 tracking-widest uppercase">Display Language</label>
                        <div className="relative">
                          <select
                            value={language}
                            onChange={(e) => setLanguage(e.target.value)}
                            className="w-full px-5 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-sm font-semibold text-slate-800 focus:outline-none focus:border-blue-500 transition-all appearance-none"
                          >
                            <option value="en">English (US Standard)</option>
                            <option value="hi">हिन्दी (Hindi Standard)</option>
                            <option value="es">Español (Spanish)</option>
                            <option value="fr">Français (French)</option>
                          </select>
                          <Globe size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-400 tracking-widest uppercase">Hour Cycle Suffix</label>
                        <div className="flex gap-4">
                          <button
                            type="button"
                            onClick={() => setTimeFormat('12h')}
                            className={cn(
                              "flex-1 py-3 rounded-2xl border text-sm font-bold transition-all",
                              timeFormat === '12h' 
                                ? "bg-slate-800 text-white border-slate-800" 
                                : "bg-white text-slate-500 border-slate-200 hover:bg-slate-50"
                            )}
                          >
                            12-Hour Cycle
                          </button>
                          <button
                            type="button"
                            onClick={() => setTimeFormat('24h')}
                            className={cn(
                              "flex-1 py-3 rounded-2xl border text-sm font-bold transition-all",
                              timeFormat === '24h' 
                                ? "bg-slate-800 text-white border-slate-800" 
                                : "bg-white text-slate-500 border-slate-200 hover:bg-slate-50"
                            )}
                          >
                            24-Hour Cycle
                          </button>
                        </div>
                      </div>

                    </div>

                    <div className="pt-4 flex justify-end">
                      <button
                        type="submit"
                        className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl text-xs font-bold uppercase tracking-widest transition-all shadow-xl shadow-blue-500/10"
                      >
                        Save Locale Settings
                      </button>
                    </div>
                  </form>
                </motion.div>
              )}

              {/* Notification Rules */}
              {activeSubTab === 'notifications' && (
                <motion.div
                  key="notifications-tab"
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.15 }}
                  className="space-y-8"
                >
                  <div>
                    <h2 className="text-xl font-extrabold text-slate-800 tracking-tight leading-tight">Notification Systems</h2>
                    <p className="text-xs text-slate-400 font-bold tracking-wide mt-1 uppercase">Determine how telemetry thresholds ping you</p>
                  </div>

                  <form onSubmit={handleSaveNotifications} className="space-y-5">
                    
                    <div className="space-y-4">
                      
                      <div className="flex items-start justify-between p-4 bg-slate-50/50 rounded-2xl border border-slate-100/80 transition-all hover:bg-slate-50">
                        <div className="space-y-1 pr-6">
                          <span className="text-xs font-bold text-slate-800 uppercase tracking-wide flex items-center gap-2">
                            <span>Immediate Escalation Emails</span>
                            <span className="bg-rose-50 text-rose-500 text-[8px] font-black uppercase px-2 py-0.5 rounded-full border border-rose-100">Critical</span>
                          </span>
                          <p className="text-[10px] text-slate-400 font-medium leading-relaxed">Send high-priority notifications immediately to management if agents report severe non-compliance.</p>
                        </div>
                        <input
                          type="checkbox"
                          checked={notifyEmailEscalation}
                          onChange={(e) => setNotifyEmailEscalation(e.target.checked)}
                          className="mt-1 w-5 h-5 rounded-lg border-slate-300 text-blue-600 focus:ring-blue-500"
                        />
                      </div>

                      <div className="flex items-start justify-between p-4 bg-slate-50/50 rounded-2xl border border-slate-100/80 transition-all hover:bg-slate-50">
                        <div className="space-y-1 pr-6">
                          <span className="text-xs font-bold text-slate-800 uppercase tracking-wide">SMS Operations Dispatch</span>
                          <p className="text-[10px] text-slate-400 font-medium leading-relaxed">Ping my active mobile device if a territory deployment experiences delay or geographic anomaly.</p>
                        </div>
                        <input
                          type="checkbox"
                          checked={notifySmsAlerts}
                          onChange={(e) => setNotifySmsAlerts(e.target.checked)}
                          className="mt-1 w-5 h-5 rounded-lg border-slate-300 text-blue-600 focus:ring-blue-500"
                        />
                      </div>

                      <div className="flex items-start justify-between p-4 bg-slate-50/50 rounded-2xl border border-slate-100/80 transition-all hover:bg-slate-50">
                        <div className="space-y-1 pr-6">
                          <span className="text-xs font-bold text-slate-800 uppercase tracking-wide">Daily Desktop Intelligence Digest</span>
                          <p className="text-[10px] text-slate-400 font-medium leading-relaxed">Weekly summary and daily briefing of top target performance delivered on desktop entry.</p>
                        </div>
                        <input
                          type="checkbox"
                          checked={notifyDesktopDaily}
                          onChange={(e) => setNotifyDesktopDaily(e.target.checked)}
                          className="mt-1 w-5 h-5 rounded-lg border-slate-300 text-blue-600 focus:ring-blue-500"
                        />
                      </div>

                      <div className="flex items-start justify-between p-4 bg-slate-50/50 rounded-2xl border border-slate-100/80 transition-all hover:bg-slate-50">
                        <div className="space-y-1 pr-6">
                          <span className="text-xs font-bold text-slate-800 uppercase tracking-wide">CSV Performance Generation Alert</span>
                          <p className="text-[10px] text-slate-400 font-medium leading-relaxed">Alert me via standard local push notifications once analytical file downloads or PDF reports compound.</p>
                        </div>
                        <input
                          type="checkbox"
                          checked={notifyReportComplete}
                          onChange={(e) => setNotifyReportComplete(e.target.checked)}
                          className="mt-1 w-5 h-5 rounded-lg border-slate-300 text-blue-600 focus:ring-blue-500"
                        />
                      </div>

                    </div>

                    <div className="pt-4 flex justify-end">
                      <button
                        type="submit"
                        className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl text-xs font-bold uppercase tracking-widest transition-all"
                      >
                        Apply Notifications Matrix
                      </button>
                    </div>
                  </form>
                </motion.div>
              )}

              {/* Advanced System */}
              {activeSubTab === 'system' && (
                <motion.div
                  key="system-tab"
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.15 }}
                  className="space-y-8"
                >
                  <div>
                    <h2 className="text-xl font-extrabold text-slate-800 tracking-tight leading-tight">Advanced Platform Diagnostics</h2>
                    <p className="text-xs text-slate-400 font-bold tracking-wide mt-1 uppercase">Diagnose active framework details and storage volumes</p>
                  </div>

                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100">
                        <span className="text-[10px] font-black text-rose-500 uppercase tracking-widest block mb-2">Platform Stack Build</span>
                        <div className="flex justify-between items-center text-xs font-bold text-slate-700">
                          <span>Framework</span>
                          <span className="bg-slate-200 px-2 py-0.5 rounded text-[10px] font-mono">React 18.3 / Vite 5</span>
                        </div>
                        <div className="flex justify-between items-center text-xs font-bold text-slate-700 mt-2">
                          <span>Build Revision</span>
                          <span className="text-slate-400 font-mono">FLDPRO_v1.0.42_STABLE</span>
                        </div>
                      </div>

                      <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100">
                        <span className="text-[10px] font-black text-indigo-500 uppercase tracking-widest block mb-2">Memory Latency Buffer</span>
                        <div className="flex justify-between items-center text-xs font-bold text-slate-700">
                          <span>Local Buffer Vol</span>
                          <span className="text-slate-500 font-mono">1.28 KB (State cached)</span>
                        </div>
                        <div className="flex justify-between items-center text-xs font-bold text-slate-700 mt-2">
                          <span>Sync Speed</span>
                          <span className="text-emerald-500 flex items-center gap-1">
                            <RefreshCw size={10} className="animate-spin" />
                            0.04 ms
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="p-6 bg-rose-50/40 rounded-2xl border border-rose-100 flex items-start gap-4">
                      <AlertCircle size={22} className="text-rose-500 shrink-0 mt-0.5" />
                      <div className="space-y-1">
                        <h4 className="text-xs font-black text-rose-800 uppercase tracking-wide">Danger Zone: Workspace Flush</h4>
                        <p className="text-[10px] text-rose-600/80 font-medium leading-relaxed">
                          Resetting local buffer arrays will purge Maps Key storage allocations and reverse active workspace changes to initial state. Confirm before execution.
                        </p>
                        <button
                          type="button"
                          onClick={handleResetApp}
                          className="mt-3 px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white text-[10px] font-black uppercase tracking-widest rounded-lg transition-all active:scale-95 shadow-md shadow-rose-200"
                        >
                          Clear Platform Buffer Array
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

            </AnimatePresence>

          </div>
        </div>

      </div>
    </div>
  );
};
