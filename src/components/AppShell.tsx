import React, { useState } from 'react';
import { Sidebar } from './Sidebar';
// import { useAuth } from '../contexts/AuthContext';
import { useLocation, useNavigate } from 'react-router-dom';
import { Bell, Search,  Menu, User } from 'lucide-react';
import { cn } from '../lib/utils';
import { useNotifications } from '../contexts/NotificationContext';
import { NotificationPopover } from './NotificationPopover';

interface AppShellProps {
  children: React.ReactNode;
}

const routeTitles: Record<string, { title: string, subtitle: string }> = {
  '/admin/dashboard': { title: 'India Operations', subtitle: 'National telemetry and system status.' },
  '/admin/companies': { title: 'Organization Directory', subtitle: 'Manage retail partners across Indian states.' },
  '/admin/pipeline': { title: 'Revenue Pipeline', subtitle: 'High-value lead tracking across Indian markets.' },
  '/admin/approvals': { title: 'Compliance Queue', subtitle: 'Pending field submissions requiring verification.' },
  '/manager/dashboard': { title: 'Overview', subtitle: 'Performance monitoring for your assigned agents.' },
  '/manager/operations': { title: 'Leads', subtitle: 'Live status of regional retail operations.' },
  '/manager/campaigns': { title: 'Campaigns', subtitle: 'Strategy execution and deployment status.' },
  '/manager/results': { title: 'Survey Results', subtitle: 'Deep dive into survey compliance and scores.' },
  '/manager/downloads': { title: 'Downloads', subtitle: 'Centralized documentation and media assets.' },
  '/manager/support': { title: 'Support', subtitle: 'Technical assistance and knowledge base.' },
  '/settings': { title: 'Settings', subtitle: 'Configure your profile, notification systems, and security credentials.' },
};

export const AppShell = ({ children }: AppShellProps) => {
  // const { user } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const { unreadCount } = useNotifications();
  const currentRoute = routeTitles[location.pathname] || { title: 'Overview', subtitle: 'Enterprise management system.' };

  return (
    <div className="flex min-h-screen bg-[#F8FAFC] font-sans">
      <Sidebar isCollapsed={isSidebarCollapsed} onToggle={() => setIsSidebarCollapsed(!isSidebarCollapsed)} />
      <main className={cn(
        "flex-1 flex flex-col min-w-0 transition-all duration-300 ease-in-out",
        isSidebarCollapsed ? "ml-20" : "ml-72"
      )}>
        <header className="h-20 bg-white border-b border-slate-200 px-12 flex items-center justify-between sticky top-0 z-40">
          <div className="flex items-center gap-4">
            <button className="p-2 text-slate-400 hover:text-blue-600 transition-colors lg:hidden">
               <Menu size={24} />
            </button>
            <h1 className="text-2xl font-bold text-slate-800 tracking-tight leading-tight">{currentRoute.title}</h1>
          </div>
          
          <div className="flex items-center gap-8">
            <div className="hidden lg:flex items-center gap-3 bg-slate-50 border border-slate-200 px-5 py-2.5 rounded-full w-96 shadow-sm focus-within:ring-2 focus-within:ring-blue-500/20 transition-all">
               <Search size={18} className="text-slate-400" />
               <input 
                 type="text" 
                 placeholder="Search operations..." 
                 className="bg-transparent border-none text-sm font-medium focus:outline-none w-full"
               />
            </div>
            
            <div className="flex items-center gap-4 relative">
               <button 
                 onClick={() => setIsNotifOpen(!isNotifOpen)}
                 className="p-2.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-all relative"
               >
                 <Bell size={22} className={cn(isNotifOpen ? "text-blue-600" : "")} />
                 {unreadCount > 0 && (
                   <span className="absolute top-2.5 right-2.5 w-2.5 h-2.5 bg-rose-500 rounded-full border-2 border-white"></span>
                 )}
               </button>
               <NotificationPopover isOpen={isNotifOpen} onClose={() => setIsNotifOpen(false)} />
            </div>

            <div className="h-8 w-[1px] bg-slate-200"></div>

            <button 
              onClick={() => navigate('/settings')}
              className="flex items-center gap-4 hover:bg-slate-50 px-3 py-1.5 rounded-2xl transition-all"
            >
               <span className="text-base font-semibold text-slate-600">User Settings</span>
               <div className="w-11 h-11 rounded-full bg-slate-800 flex items-center justify-center text-white ring-4 ring-slate-100 shadow-lg">
                  <User size={20} />
               </div>
            </button>
          </div>
        </header>

        <div className="flex-1 p-12 overflow-y-auto">
          {children}
        </div>
      </main>
    </div>
  );
};

