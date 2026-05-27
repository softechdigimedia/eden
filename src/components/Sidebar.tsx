import React from 'react';
import { NavLink } from 'react-router-dom';
import { motion } from 'motion/react';
import { 
  Users, 
  BarChart3, 
  LayoutDashboard, 
  Target, 
  Settings, 
  LogOut,
  ChevronLeft,
  ChevronRight,
  Crosshair,
  Zap,
  Layers,
  ShieldAlert,
  PieChart,
  Building2,
  LifeBuoy,
  Megaphone,
  Inbox,
  FileBarChart,
} from 'lucide-react';
import { cn } from '../lib/utils';
import { useAuth,type Role } from '../contexts/AuthContext';

interface NavItem {
  icon: React.ElementType;
  label: string;
  path: string;
  roles: Role[];
}

const navItems: NavItem[] = [
  // Super Admin Items
  { icon: LayoutDashboard, label: 'Super Dashboard', path: '/admin/dashboard', roles: ['super_admin'] },
  { icon: Building2, label: 'Organizations', path: '/admin/companies', roles: ['super_admin'] },
  { icon: Target, label: 'Lead Pipeline', path: '/admin/pipeline', roles: ['super_admin'] },
  { icon: ShieldAlert, label: 'Approvals', path: '/admin/approvals', roles: ['super_admin'] },
  { icon: BarChart3, label: 'Global Analytics', path: '/admin/analytics', roles: ['super_admin'] },

  // Manager Items
  { icon: LayoutDashboard, label: 'Overview', path: '/manager/dashboard', roles: ['manager'] },
  { icon: Users, label: 'Employees', path: '/manager/employees', roles: ['manager'] },
  { icon: Inbox, label: 'Field Posts', path: '/manager/posts', roles: ['manager'] },
  { icon: Layers, label: 'Campaigns', path: '/manager/campaigns', roles: ['manager'] },
  { icon: Target, label: 'Leads', path: '/manager/operations', roles: ['manager'] },
  { icon: PieChart, label: 'Survey Results', path: '/manager/results', roles: ['manager'] },
  { icon: FileBarChart, label: 'Reports', path: '/manager/reports', roles: ['manager'] },
  { icon: LifeBuoy, label: 'Support', path: '/manager/support', roles: ['manager'] },

  // Client Items
  { icon: LayoutDashboard, label: 'Dashboard', path: '/client/dashboard', roles: ['client'] },
  { icon: BarChart3, label: 'Performance', path: '/client/performance', roles: ['client'] },
  { icon: Megaphone, label: 'My Campaigns', path: '/client/campaigns', roles: ['client'] },
  { icon: Zap, label: 'Surveys', path: '/client/surveys', roles: ['client'] },
  { icon: FileBarChart, label: 'Reports', path: '/client/reports', roles: ['client'] },

  // Shared
  { icon: Settings, label: 'Settings', path: '/settings', roles: ['super_admin', 'manager', 'client'] },
];

interface SidebarProps {
  isCollapsed: boolean;
  onToggle: () => void;
}

export const Sidebar = ({ isCollapsed, onToggle }: SidebarProps) => {
  const { user, logout } = useAuth();
  
  if (!user) return null;

  const filteredItems = navItems.filter(item => item.roles.includes(user.role));

  return (
    <aside className={cn(
      "h-screen flex flex-col bg-[#0F172A] border-r border-slate-800 fixed left-0 top-0 z-50 transition-all duration-300 ease-in-out",
      isCollapsed ? "w-20" : "w-72"
    )}>
      <div className={cn(
        "p-6 flex items-center justify-between",
        isCollapsed && "flex-col gap-4 px-0"
      )}>
        <div className="flex items-center gap-4 overflow-hidden">
          <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center text-white shadow-xl shadow-blue-900/20 flex-shrink-0">
            <Crosshair size={24} />
          </div>
          {!isCollapsed && (
            <motion.div 
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex flex-col whitespace-nowrap"
            >
              <span className="font-bold text-white text-lg tracking-tight leading-none uppercase">EDEN</span>
              <span className="text-[10px] font-bold text-slate-500 mt-1 uppercase tracking-[0.2em]">CRM</span>
            </motion.div>
          )}
        </div>
        
        <button 
          onClick={onToggle}
          className={cn(
            "p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors",
            isCollapsed && "mt-2"
          )}
        >
          {isCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
        </button>
      </div>

      <nav className="flex-1 px-4 mt-8 space-y-2 overflow-y-auto scrollbar-hide">
        {filteredItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) => cn(
              "flex items-center gap-4 px-4 py-4 rounded-2xl text-sm font-semibold transition-all group relative",
              isCollapsed && "justify-center px-0",
              isActive 
                ? "bg-[#1E293B] text-white shadow-lg border border-slate-700/50" 
                : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/30"
            )}
          >
            <item.icon size={20} className={cn(
              "transition-colors flex-shrink-0",
              "group-hover:text-blue-400"
            )} />
            {!isCollapsed && (
              <motion.span
                initial={{ opacity: 0, x: -5 }}
                animate={{ opacity: 1, x: 0 }}
                className="whitespace-nowrap"
              >
                {item.label}
              </motion.span>
            )}
            
            {isCollapsed && (
              <div className="absolute left-full ml-4 px-3 py-2 bg-slate-800 text-white text-xs font-bold rounded-lg opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity whitespace-nowrap z-[100] shadow-xl">
                {item.label}
              </div>
            )}
          </NavLink>
        ))}
      </nav>

      <div className={cn(
        "mt-auto",
        isCollapsed ? "p-3" : "p-6"
      )}>
        <div className={cn(
          "bg-[#1E293B] rounded-[2rem] border border-slate-700/50 overflow-hidden transition-all",
          isCollapsed ? "p-2" : "p-6"
        )}>
          <div className={cn(
            "flex items-center gap-3",
            isCollapsed ? "justify-center" : "flex-col mb-6"
          )}>
            <div className={cn(
              "rounded-full overflow-hidden ring-4 ring-slate-700 flex-shrink-0",
              isCollapsed ? "w-10 h-10" : "w-16 h-16"
            )}>
              <img 
                src={user.avatar}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
            {!isCollapsed && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-col items-center min-w-0"
              >
                <span className="text-sm font-bold text-white truncate text-center w-full">{user.name}</span>
                <span className="text-[10px] text-slate-500 uppercase tracking-widest font-bold truncate mt-1">
                  {user.role.replace('_', ' ')}
                </span>
              </motion.div>
            )}
          </div>
          {!isCollapsed && (
            <button 
              onClick={logout}
              className="w-full py-4 bg-slate-700/50 hover:bg-slate-700 text-white rounded-2xl text-xs font-bold transition-all active:scale-95 shadow-lg flex items-center justify-center gap-2"
            >
              <LogOut size={14} />
              <span>Sign Out</span>
            </button>
          )}
          {isCollapsed && (
            <button 
              onClick={logout}
              className="w-full h-10 flex items-center justify-center bg-slate-700/50 hover:bg-slate-700 text-white rounded-xl transition-all mt-4"
              title="Sign Out"
            >
              <LogOut size={16} />
            </button>
          )}
        </div>
      </div>
    </aside>
  );
};

