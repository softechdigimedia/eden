import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { 
  useNotifications, 
 type Notification 
} from '../contexts/NotificationContext';
import { 
  Target, 
  ClipboardList, 
  Megaphone, 
  AlertTriangle, 
  Settings, 
  Check, 
  CheckCheck, 
  Trash2, 
  BellOff, 
  Sparkles
} from 'lucide-react';
import { cn } from '../lib/utils';

interface NotificationPopoverProps {
  isOpen: boolean;
  onClose: () => void;
}

const typeConfig: Record<Notification['type'], {
  icon: React.ComponentType<{ size?: number; className?: string }>;
  bg: string;
  border: string;
  badge: string;
}> = {
  lead: {
    icon: Target,
    bg: 'bg-emerald-50 text-emerald-600',
    border: 'border-emerald-100',
    badge: 'bg-emerald-100 text-emerald-800'
  },
  audit: {
    icon: ClipboardList,
    bg: 'bg-indigo-50 text-indigo-600',
    border: 'border-indigo-100',
    badge: 'bg-indigo-100 text-indigo-800'
  },
  campaign: {
    icon: Megaphone,
    bg: 'bg-blue-50 text-blue-600',
    border: 'border-blue-100',
    badge: 'bg-blue-100 text-blue-800'
  },
  compliance: {
    icon: AlertTriangle,
    bg: 'bg-rose-50 text-rose-600',
    border: 'border-rose-100',
    badge: 'bg-rose-100 text-rose-800'
  },
  system: {
    icon: Settings,
    bg: 'bg-slate-100 text-slate-600',
    border: 'border-slate-200',
    badge: 'bg-slate-200 text-slate-800'
  }
};

export const NotificationPopover: React.FC<NotificationPopoverProps> = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { 
    notifications, 
    unreadCount, 
    markAsRead, 
    markAllAsRead, 
    clearAll,
    addNotification 
  } = useNotifications();

  // Helper to trigger realistic simulation suited specifically to the current dashboard/role
  const handleSimulate = () => {
    if (!user) return;

    const templatesByRole: Record<string, { title: string; description: string; type: Notification['type']; route: string }[]> = {
      super_admin: [
        {
          title: '🚨 High Deviation: BrandX Retail',
          description: 'Platform AI detected 40% compliance drop for Western regional outlets.',
          type: 'compliance',
          route: '/admin/approvals'
        },
        {
          title: '📈 Lead Target Milestone Crossed',
          description: 'HUL enterprise lead pipeline reached ₹12 Cr total potential value.',
          type: 'lead',
          route: '/admin/pipeline'
        },
        {
          title: '🏢 New Franchise Onboarded',
          description: 'Reliance Digital signed and integrated 14 main hubs into Platform.',
          type: 'system',
          route: '/admin/companies'
        },
        {
          title: '📣 ITC Winter Display Campaign live',
          description: 'Campaign tracking and spatial analytics engine is actively receiving audits.',
          type: 'campaign',
          route: '/admin/analytics'
        }
      ],
      manager: [
        {
          title: '📸 Visual Audit Uploaded (Noida)',
          description: 'Agent Sarah Chen uploaded store front display audit for Sector 18.',
          type: 'audit',
          route: '/manager/reports'
        },
        {
          title: '🎯 High-Priority Lead Opportunity',
          description: 'A new high-value retail contact is allocated under Delhi North team.',
          type: 'lead',
          route: '/manager/dashboard?tab=leads'
        },
        {
          title: '⚠️ Placement Mismatch Flagged',
          description: 'Low compliance audit submitted for HUL shelf stacker configuration.',
          type: 'compliance',
          route: '/manager/operations'
        },
        {
          title: '🎉 Campaign Target Reached',
          description: 'Western region finished Maggi display standards checklist.',
          type: 'campaign',
          route: '/manager/campaigns'
        }
      ],
      client: [
        {
          title: '🚀 Pepsi Summer Ad Blitz live',
          description: 'Your verified premium placement campaign audit forms have been distributed.',
          type: 'campaign',
          route: '/client/campaigns'
        },
        {
          title: '📊 Consolidated Q1 Report Ready',
          description: 'The finalized analytical sales shelf correlation report is compiles as PDF.',
          type: 'system',
          route: '/client/reports'
        },
        {
          title: '✅ 145 Custom Surveys Validated',
          description: 'Customer visual feedback data completed high-fidelity analysis.',
          type: 'audit',
          route: '/client/surveys'
        }
      ],
      employee: [
        {
          title: '📋 High Priority Mission Dispatched',
          description: 'Perform immediate shelf visual inventory checklist at Flagship Block-C center.',
          type: 'audit',
          route: '/agent/survey'
        },
        {
          title: '🌟 Timesheet Validation Verified',
          description: 'Your custom agent visual checklist submission was verified by Manager Chen.',
          type: 'system',
          route: '/agent/history'
        },
        {
          title: '🚨 Audit Approaching Deadline',
          description: 'Sector 4 display checklist is due. Submit store photos in the next 2 hours.',
          type: 'compliance',
          route: '/agent/portal'
        }
      ]
    };

    const roleTemplates = templatesByRole[user.role] || templatesByRole['employee'];
    const randomTemplate = roleTemplates[Math.floor(Math.random() * roleTemplates.length)];
    addNotification(
      randomTemplate.title, 
      randomTemplate.description, 
      randomTemplate.type, 
      randomTemplate.route
    );
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Invisible click-away backdrop */}
          <div 
            id="notification-backdrop" 
            className="fixed inset-0 z-40 bg-transparent cursor-default" 
            onClick={onClose} 
          />

          {/* Popover content card */}
          <motion.div
            initial={{ opacity: 0, y: 15, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 15, scale: 0.95 }}
            transition={{ duration: 0.18, ease: 'easeOut' }}
            className="absolute right-0 mt-3 w-80 sm:w-96 bg-white rounded-3xl border border-slate-100 shadow-2xl z-50 overflow-hidden cursor-default text-left"
          >
            {/* Header */}
            <div className="p-5 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-slate-800">Notifications</span>
                {unreadCount > 0 && (
                  <span className="bg-blue-500 text-white text-[10px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider">
                    {unreadCount} New
                  </span>
                )}
              </div>
              
              {notifications.length > 0 && unreadCount > 0 && (
                <button 
                  onClick={() => markAllAsRead()}
                  className="flex items-center gap-1.5 text-xs font-bold text-blue-600 hover:text-blue-700 transition"
                >
                  <CheckCheck size={14} />
                  <span>Mark all read</span>
                </button>
              )}
            </div>

            {/* List of notifications */}
            <div className="max-h-[380px] overflow-y-auto divide-y divide-slate-100/80 custom-scrollbar">
              {notifications.length > 0 ? (
                notifications.map((item) => {
                  const config = typeConfig[item.type];
                  const Icon = config.icon;

                  return (
                    <div 
                      key={item.id} 
                      onClick={() => {
                        if (item.unread) markAsRead(item.id);
                        if (item.route) {
                          navigate(item.route);
                        }
                        onClose();
                      }}
                      className={cn(
                        "p-4 flex items-start gap-3.5 hover:bg-slate-50/70 transition cursor-pointer relative group",
                        item.unread ? "bg-blue-50/20" : ""
                      )}
                    >
                      {/* Unread circle marker */}
                      {item.unread && (
                        <div className="absolute left-2.5 top-[22px] w-2 h-2 bg-blue-500 rounded-full" />
                      )}

                      {/* Icon */}
                      <div className={cn(
                        "w-9 h-9 shrink-0 rounded-2xl border flex items-center justify-center transition",
                        config.bg,
                        config.border
                      )}>
                        <Icon size={18} />
                      </div>

                      {/* Text */}
                      <div className="flex-1 min-w-0 pr-4">
                        <div className="flex items-baseline justify-between gap-1.5">
                          <p className={cn(
                            "text-xs leading-snug truncate",
                            item.unread ? "font-extrabold text-slate-800" : "font-medium text-slate-600"
                          )}>
                            {item.title}
                          </p>
                          <span className="text-[10px] text-slate-400 font-semibold shrink-0 whitespace-nowrap">
                            {item.time}
                          </span>
                        </div>
                        <p className={cn(
                          "text-[11px] leading-relaxed mt-1 line-clamp-2",
                          item.unread ? "text-slate-600 font-medium" : "text-slate-400 font-normal"
                        )}>
                          {item.description}
                        </p>
                      </div>

                      {/* Interactive individual checkmark if unread */}
                      {item.unread && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            markAsRead(item.id);
                          }}
                          className="absolute right-3.5 top-[18px] p-1.5 text-slate-300 hover:text-blue-500 rounded-lg group-hover:scale-105 hover:bg-white border border-transparent hover:border-slate-100 hover:shadow-sm transition"
                          title="Mark as read"
                        >
                          <Check size={14} />
                        </button>
                      )}
                    </div>
                  );
                })
              ) : (
                <div className="py-12 px-5 flex flex-col items-center justify-center text-center">
                  <div className="w-14 h-14 bg-slate-50 text-slate-300 rounded-2xl flex items-center justify-center mb-4">
                    <BellOff size={28} />
                  </div>
                  <h4 className="text-sm font-bold text-slate-800">You're all caught up!</h4>
                  <p className="text-xs text-slate-400 mt-1 max-w-xs leading-relaxed">
                    No new system, lead, audit, or campaign compliance notifications found.
                  </p>
                </div>
              )}
            </div>

            {/* Actions Footer */}
            <div className="p-4 border-t border-slate-100 bg-slate-50/50 flex items-center justify-between text-xs font-bold text-slate-400">
              <button 
                onClick={handleSimulate}
                className="flex items-center gap-1.5 text-indigo-600 hover:text-indigo-700 hover:underline transition"
              >
                <Sparkles size={13} />
                <span>Simulate Event</span>
              </button>

              {notifications.length > 0 && (
                <button 
                  onClick={() => clearAll()}
                  className="flex items-center gap-1.5 text-slate-400 hover:text-rose-500 hover:underline transition"
                >
                  <Trash2 size={13} />
                  <span>Clear All</span>
                </button>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
