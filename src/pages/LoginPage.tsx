import React from 'react';
import { ShoppingCart, Shield, Users, Briefcase, LayoutDashboard } from 'lucide-react';
import { useAuth, type Role } from '../contexts/AuthContext';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';

export const LoginPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = (role: Role) => {
    login(role);
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full"
      >
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-2xl text-white mb-4 shadow-lg shadow-blue-200">
            <ShoppingCart size={32} />
          </div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">RetailFlow CRM</h1>
          <p className="text-slate-500 mt-2 font-medium">Select a role to enter the demo pipeline</p>
        </div>

        <div className="space-y-4">
          <LoginCard 
            role="super_admin" 
            title="Super Admin" 
            description="Full system control, global analytics, and approvals."
            icon={Shield}
            color="bg-purple-50 text-purple-600"
            onClick={() => handleLogin('super_admin')}
          />
          <LoginCard 
            role="manager" 
            title="Field Manager" 
            description="Manage agents, track regional performance and campaigns."
            icon={Users}
            color="bg-blue-50 text-blue-600"
            onClick={() => handleLogin('manager')}
          />
          <LoginCard 
            role="client" 
            title="Client" 
            description="View campaign reach, retail locations, and reports."
            icon={LayoutDashboard}
            color="bg-indigo-50 text-indigo-600"
            onClick={() => handleLogin('client')}
          />
          <LoginCard 
            role="employee" 
            title="Employee" 
            description="Mobile portal for submissions, tasks, and history."
            icon={Briefcase}
            color="bg-emerald-50 text-emerald-600"
            onClick={() => handleLogin('employee')}
          />
        </div>

        <p className="text-center text-xs text-slate-400 mt-8 uppercase tracking-widest font-bold">
          Seed Credentials Generated for Demo
        </p>
      </motion.div>
    </div>
  );
};

interface LoginCardProps {
  role: Role;
  title: string;
  description: string;
  icon: React.ElementType;
  color: string;
  onClick: () => void;
}

const LoginCard = ({ title, description, icon: Icon, color, onClick }: LoginCardProps) => (
  <button 
    onClick={onClick}
    className="w-full bg-white p-6 rounded-2xl border border-slate-200 text-left hover:border-blue-500 hover:shadow-xl hover:shadow-blue-50 transition-all group flex gap-5"
  >
    <div className={`p-4 rounded-xl flex-shrink-0 transition-transform group-hover:scale-110 ${color}`}>
      <Icon size={24} />
    </div>
    <div>
      <h3 className="font-bold text-slate-900 text-lg group-hover:text-blue-600 transition-colors uppercase tracking-tight">{title}</h3>
      <p className="text-sm text-slate-500 font-medium leading-relaxed mt-1">{description}</p>
    </div>
  </button>
);
