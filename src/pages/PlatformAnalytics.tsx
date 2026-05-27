import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { APIProvider, Map, AdvancedMarker,  useMap } from '@vis.gl/react-google-maps';
import { 
  Megaphone, 
  Zap, 
  MapPin, 
  Server, 
  Bell, 
  ChevronDown, 
  ChevronRight,
  Search,
  Building2,
  AlertTriangle,
  Settings,
  ArrowRight,
  Globe,
  Info
} from 'lucide-react';
import { cn } from '../lib/utils';
import { useNotifications } from '../contexts/NotificationContext';
import { NotificationPopover } from '../components/NotificationPopover';

const API_KEY = import.meta.env.GOOGLE_MAPS_PLATFORM_KEY || '';
const hasValidKey = Boolean(API_KEY) && API_KEY !== 'YOUR_API_KEY';

const MAP_CENTERS = {
  'North America': { lat: 39.8283, lng: -98.5795 },
  'Western Europe': { lat: 48.8566, lng: 2.3522 },
  'APAC Region': { lat: 13.7563, lng: 100.5018 }
};

const SAMPLE_DATA_POINTS = [
  { lat: 40.7128, lng: -74.0060, label: 'NYC Hub', density: 'high' },
  { lat: 34.0522, lng: -118.2437, label: 'LA Port', density: 'high' },
  { lat: 41.8781, lng: -87.6298, label: 'Chicago Dist', density: 'moderate' },
  { lat: 48.8566, lng: 2.3522, label: 'Paris HQ', density: 'high' },
  { lat: 51.5074, lng: -0.1278, label: 'London Node', density: 'moderate' },
  { lat: 1.3521, lng: 103.8198, label: 'Singapore Ops', density: 'high' },
  { lat: 35.6762, lng: 139.6503, label: 'Tokyo Edge', density: 'high' }
];

type LatLngLiteral = { lat: number; lng: number };

const MapController = ({ center }: { center: LatLngLiteral }) => {
  const map = useMap();
  useEffect(() => {
    if (map) {
      map.panTo(center);
      map.setZoom(center.lat === 39.8283 ? 4 : 5);
    }
  }, [map, center]);
  return null;
};

interface KPICardProps {
  label: string;
  value: string;
  trend: string;
  icon: React.ElementType;
  iconColor: string;
  subText: string;
}

const KPICard = ({ label, value, trend, icon: Icon, iconColor, subText }: KPICardProps) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm flex flex-col justify-between"
  >
    <div className="flex justify-between items-start mb-4">
      <div>
        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-1">{label}</p>
        <div className="flex items-baseline gap-2">
          <h3 className="text-2xl font-black text-slate-800 tracking-tight">{value}</h3>
        </div>
      </div>
      <div className={cn("p-3 rounded-2xl", iconColor)}>
        <Icon size={20} />
      </div>
    </div>
    <div className="flex items-center gap-2 mt-auto">
      <span className={cn(
        "text-[10px] font-bold px-2 py-0.5 rounded-lg",
        trend.startsWith('+') ? "bg-emerald-50 text-emerald-600" : "bg-blue-50 text-blue-600"
      )}>
        {trend}
      </span>
      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{subText}</span>
    </div>
  </motion.div>
);

const activities = [
  {
    id: 1,
    icon: Building2,
    iconBg: 'bg-blue-50 text-blue-600',
    title: 'RetailSync Corp joined the platform.',
    time: '2 minutes ago',
    location: 'San Francisco'
  },
  {
    id: 2,
    icon: AlertTriangle,
    iconBg: 'bg-rose-50 text-rose-600',
    title: 'Threshold alert in Midwest Region.',
    time: '15 minutes ago',
    location: 'Chicago Hub'
  },
  {
    id: 3,
    icon: Megaphone,
    iconBg: 'bg-amber-50 text-amber-600',
    title: 'Global Logistics campaign finalized.',
    time: '1 hour ago',
    location: 'London'
  },
  {
    id: 4,
    icon: MapPin,
    iconBg: 'bg-indigo-50 text-indigo-600',
    title: '50+ New Agents onboarded by BrandX.',
    time: '3 hours ago',
    location: 'Distributed'
  }
];

export const PlatformAnalytics = () => {
  const [region, setRegion] = useState('North America');
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const { unreadCount } = useNotifications();

  return (
    <div className="space-y-8 pb-12">
      {/* Top Bar Navigation */}
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 bg-slate-100 rounded-2xl flex items-center justify-center text-slate-400">
            <Search size={20} />
          </div>
          <h1 className="text-xl font-bold text-slate-800 tracking-tight underline decoration-blue-600/30 decoration-4 underline-offset-8">Field Lead Dashboard</h1>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative">
            <button 
              onClick={() => setIsNotifOpen(!isNotifOpen)}
              className="relative p-3 bg-white border border-slate-100 rounded-2xl text-slate-400 hover:text-slate-600 transition-all hover:bg-slate-50"
            >
              <Bell size={20} className={cn(isNotifOpen ? "text-indigo-600" : "")} />
              {unreadCount > 0 && (
                <span className="absolute top-2 right-2 w-2 h-2 bg-rose-500 rounded-full border-2 border-white" />
              )}
            </button>
            <NotificationPopover isOpen={isNotifOpen} onClose={() => setIsNotifOpen(false)} />
          </div>
          <button className="flex items-center gap-2 bg-indigo-600 text-white px-6 py-3 rounded-2xl font-bold text-sm shadow-xl shadow-indigo-100 hover:bg-indigo-700 transition-all active:scale-95">
            Onboard New Company
          </button>
        </div>
      </div>

      {/* KPI Cards section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <KPICard 
          label="Total Active Campaigns"
          value="1,284"
          trend="+12%"
          icon={Megaphone}
          iconColor="bg-blue-50 text-blue-600"
          subText="from last month"
        />
        <KPICard 
          label="Platform Lead Volume"
          value="42.8k"
          trend="+8.4%"
          icon={Zap}
          iconColor="bg-amber-50 text-amber-600"
          subText="today"
        />
        <KPICard 
          label="Active Field Agents"
          value="3,590"
          trend="Real-time"
          icon={MapPin}
          iconColor="bg-slate-50 text-slate-400"
          subText="active"
        />
        <KPICard 
          label="System Health"
          value="99.9%"
          trend="All systems"
          icon={Server}
          iconColor="bg-emerald-50 text-emerald-600"
          subText="operational"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Regional Distribution Section */}
        <div className="lg:col-span-3 bg-white rounded-[2.5rem] p-8 border border-slate-50 shadow-sm relative overflow-hidden">
          <div className="flex justify-between items-center mb-8 relative z-10">
            <h2 className="text-xl font-bold text-slate-800 tracking-tight">Regional Distribution</h2>
            <div className="relative">
              <select 
                value={region}
                onChange={(e) => setRegion(e.target.value)}
                className="appearance-none bg-slate-50 border border-slate-100 rounded-xl px-4 py-2 pr-10 text-xs font-bold text-slate-600 outline-none hover:bg-slate-100 transition-all cursor-pointer"
              >
                <option>North America</option>
                <option>Western Europe</option>
                <option>APAC Region</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={14} />
            </div>
          </div>

          {/* Map Visualization */}
          <div className="relative aspect-[16/9] w-full rounded-[2rem] bg-[#1a1c22] overflow-hidden group shadow-inner">
            {!hasValidKey ? (
              <div className="absolute inset-0 flex items-center justify-center p-8 text-center bg-slate-900">
                <div className="max-w-md space-y-4">
                  <div className="w-16 h-16 bg-blue-600/20 text-blue-400 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <Globe size={32} className="animate-pulse" />
                  </div>
                  <h3 className="text-xl font-bold text-white tracking-tight">Real-time Map Integration</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    Connect your Google Maps Platform API key to visualize live regional distribution and agent density across your global operational hubs.
                  </p>
                  <div className="pt-4 flex flex-col items-center gap-3">
                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2">
                       <Info size={12} /> Setup instructions in sidebar
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <APIProvider apiKey={API_KEY} version="weekly">
                <Map
                  mapId="bf50a9134b96183" // Dark Mode mapId pattern
                  defaultCenter={MAP_CENTERS['North America']}
                  defaultZoom={4}
                  gestureHandling={'greedy'}
                  disableDefaultUI={true}
                  internalUsageAttributionIds={['gmp_mcp_codeassist_v1_aistudio']}
                  style={{ width: '100%', height: '100%' }}
                >
                  <MapController center={MAP_CENTERS[region as keyof typeof MAP_CENTERS]} />
                  
                  {SAMPLE_DATA_POINTS.map((point, i) => (
                    <AdvancedMarker 
                      key={i} 
                      position={{ lat: point.lat, lng: point.lng }}
                      title={point.label}
                    >
                      <div className="relative group/marker">
                        <div className={cn(
                          "w-4 h-4 rounded-full border-2 border-white shadow-lg transition-transform group-hover/marker:scale-150 duration-300",
                          point.density === 'high' ? "bg-indigo-500 shadow-indigo-500/50" : "bg-purple-500 shadow-purple-500/50"
                        )} />
                        <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 px-2 py-1 bg-slate-900 text-white text-[10px] font-bold rounded-lg opacity-0 group-hover/marker:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-50">
                          {point.label}
                        </div>
                      </div>
                    </AdvancedMarker>
                  ))}
                </Map>
              </APIProvider>
            )}

            {/* Glowing Points representing density (Only show as overlay if no key) */}
            {!hasValidKey && (
              <>
                <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-indigo-500/20 blur-3xl animate-pulse" />
                <div className="absolute bottom-1/3 right-1/4 w-48 h-48 bg-purple-500/20 blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
              </>
            )}

            {/* Map Legend (Overlay on actual map too) */}
            <div className="absolute top-6 left-6 bg-slate-900/40 backdrop-blur-md px-4 py-3 rounded-2xl border border-white/10 flex flex-col gap-2 z-10">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-indigo-400 shadow-[0_0_5px_rgba(129,140,248,1)]" />
                <span className="text-[10px] font-bold text-white uppercase tracking-widest">High Density</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-purple-400 shadow-[0_0_5px_rgba(192,132,252,1)]" />
                <span className="text-[10px] font-bold text-white uppercase tracking-widest">Moderate</span>
              </div>
            </div>

            <div className="absolute bottom-6 right-6 bg-slate-900/40 backdrop-blur-md px-4 py-2 rounded-xl border border-white/10 z-10 flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[10px] font-black text-white uppercase tracking-widest">Live Feed active</span>
            </div>
          </div>
        </div>

        {/* Recent Global Activity Section */}
        <div className="bg-white rounded-[2.5rem] p-8 border border-slate-50 shadow-sm h-full flex flex-col">
          <h2 className="text-xl font-bold text-slate-800 tracking-tight mb-8">Recent Global Activity</h2>
          <div className="space-y-6 flex-1">
            {activities.map((activity) => (
              <div key={activity.id} className="flex gap-4 group">
                <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-transform group-hover:scale-110", activity.iconBg)}>
                  <activity.icon size={18} />
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-bold text-slate-700 leading-tight group-hover:text-indigo-600 transition-colors">{activity.title}</p>
                  <p className="text-[10px] font-medium text-slate-400 uppercase tracking-wider flex items-center gap-2">
                    {activity.time} <span className="w-1 h-1 rounded-full bg-slate-200" /> {activity.location}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <button className="w-full mt-8 py-4 bg-slate-50 text-indigo-600 rounded-2xl font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-indigo-50 transition-all border border-transparent hover:border-indigo-100">
            View Audit Logs <ArrowRight size={14} />
          </button>
        </div>
      </div>

      {/* Bottom Grid Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Onboard Company Card */}
        <div className="bg-indigo-600 rounded-[2.5rem] p-8 relative overflow-hidden group shadow-2xl shadow-indigo-100">
          <div className="relative z-10 h-full flex flex-col">
            <Building2 className="text-indigo-300 mb-4" size={32} />
            <h3 className="text-2xl font-black text-white mb-2">Onboard Company</h3>
            <p className="text-indigo-100 text-sm font-medium leading-relaxed mb-8 max-w-[200px]">Set up a new brand workspace and initialize enterprise data flows.</p>
            <button className="mt-auto bg-white text-indigo-600 px-8 py-3 rounded-2xl font-bold text-sm tracking-tight hover:bg-slate-50 transition-all active:scale-95 self-start shadow-xl shadow-indigo-900/20">
              Get Started
            </button>
          </div>
          {/* Abstract Grid background */}
          <div className="absolute right-0 bottom-0 w-32 h-32 opacity-20 group-hover:scale-110 transition-transform duration-700 translate-x-4 translate-y-4">
            <div className="grid grid-cols-4 gap-2 h-full w-full">
              {[...Array(16)].map((_, i) => (
                <div key={i} className="bg-white rounded-sm" />
              ))}
            </div>
          </div>
        </div>

        {/* System Alerts Card */}
        <div className="bg-white rounded-[2.5rem] p-8 border border-slate-50 shadow-sm flex flex-col">
          <div className="flex justify-between items-start mb-6">
            <AlertTriangle className="text-rose-500" size={32} />
            <span className="bg-rose-500 text-white text-[10px] font-black px-2 py-1 rounded-lg uppercase">3 active</span>
          </div>
          <h3 className="text-xl font-bold text-slate-800 mb-2">System Alerts</h3>
          <p className="text-slate-400 text-sm font-medium leading-relaxed mb-8">Monitor infrastructure anomalies and platform health disruptions.</p>
          <button className="mt-auto w-full py-4 text-rose-500 font-bold text-sm border-2 border-slate-50 rounded-2xl hover:bg-rose-50 hover:border-rose-100 transition-all">
            Review Status
          </button>
        </div>

        {/* Admin Configuration Card */}
        <div className="bg-white rounded-[2.5rem] p-8 border border-slate-50 shadow-sm">
          <h3 className="text-xl font-bold text-slate-800 mb-6 tracking-tight">Admin Configuration</h3>
          <div className="space-y-6">
            <div className="flex items-center justify-between group">
              <span className="text-sm font-bold text-slate-600">Global API Access</span>
              <div className="w-10 h-5 bg-emerald-500 rounded-full relative shadow-inner">
                <div className="absolute right-0.5 top-0.5 w-4 h-4 bg-white rounded-full shadow-sm" />
              </div>
            </div>
            <div className="flex items-center justify-between group">
              <span className="text-sm font-bold text-slate-600">Multi-Tenant Isolation</span>
              <div className="w-10 h-5 bg-emerald-500 rounded-full relative shadow-inner">
                <div className="absolute right-0.5 top-0.5 w-4 h-4 bg-white rounded-full shadow-sm" />
              </div>
            </div>
            <div className="flex items-center justify-between group">
              <span className="text-sm font-bold text-slate-600">Auto-Scaling Nodes</span>
              <div className="w-10 h-5 bg-slate-200 rounded-full relative shadow-inner">
                <div className="absolute left-0.5 top-0.5 w-4 h-4 bg-white rounded-full shadow-sm" />
              </div>
            </div>
          </div>
          <button className="w-full mt-8 flex items-center justify-between text-indigo-600 font-bold text-sm group">
            <div className="flex items-center gap-2">
              <Settings size={18} className="group-hover:rotate-45 transition-transform" />
              <span>Open Settings</span>
            </div>
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};
