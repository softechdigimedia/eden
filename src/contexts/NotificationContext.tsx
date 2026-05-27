import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';

export interface Notification {
  id: string;
  title: string;
  description: string;
  time: string;
  type: 'lead' | 'audit' | 'campaign' | 'compliance' | 'system';
  unread: boolean;
  route?: string;
}

interface NotificationContextType {
  notifications: Notification[];
  unreadCount: number;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  clearAll: () => void;
  addNotification: (title: string, description: string, type: Notification['type'], route?: string) => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

const defaultNotificationsByRole: Record<string, Omit<Notification, 'id'>[]> = {
  super_admin: [
    {
      title: 'Reliance Retail Active',
      description: 'Western regional retail operations campaign has launched on schedule.',
      time: '12 mins ago',
      type: 'campaign',
      unread: true,
      route: '/admin/analytics',
    },
    {
      title: 'Audit compliance flagged',
      description: 'Low compliance report received for Nestlé East region, checking required.',
      time: '1 hour ago',
      type: 'compliance',
      unread: true,
      route: '/admin/approvals',
    },
    {
      title: 'System telemetry check',
      description: 'Monthly platform sync with national databases completed successfully.',
      time: '4 hours ago',
      type: 'system',
      unread: false,
      route: '/admin/dashboard',
    },
    {
      title: 'High-Value Lead Target Reached',
      description: 'India revenue pipeline crossed ₹4.5 Cr milestone this quarter.',
      time: '1 day ago',
      type: 'lead',
      unread: false,
      route: '/admin/pipeline',
    }
  ],
  manager: [
    {
      title: 'Audit Complete (Priya Sharma)',
      description: 'Priya Sharma submitted a visual checklist for HUL Sector 12, Noida.',
      time: '5 mins ago',
      type: 'audit',
      unread: true,
      route: '/manager/reports',
    },
    {
      title: 'Compliance Alarm: Nestlé West',
      description: 'Survey average score dipped to 58% at retail point checkpoints in Mumbai.',
      time: '34 mins ago',
      type: 'compliance',
      unread: true,
      route: '/manager/operations',
    },
    {
      title: 'New Campaign Guidelines',
      description: 'Summer display standards for Hindustan Unilever campaigns have been initialized.',
      time: '2 hours ago',
      type: 'campaign',
      unread: false,
      route: '/manager/campaigns',
    },
    {
      title: 'Lead Target Milestone Achieved',
      description: 'Team lead acquisition target reached 2,400 leads for North HUL team.',
      time: '1 day ago',
      type: 'lead',
      unread: false,
      route: '/manager/dashboard?tab=leads',
    }
  ],
  client: [
    {
      title: 'Maggi Display Campaign Live',
      description: 'Your Nestlé visual placement campaign audit forms have been distributed to regional agents.',
      time: '20 mins ago',
      type: 'campaign',
      unread: true,
      route: '/client/campaigns',
    },
    {
      title: 'Audit report compiled',
      description: 'A comprehensive analytical PDF report is ready for download (Q1 Nestlé shelf presence).',
      time: '3 hours ago',
      type: 'system',
      unread: true,
      route: '/client/reports',
    },
    {
      title: 'Surveys Upload Completed',
      description: '145 physical survey entries with high resolution store audit snaps uploaded for review.',
      time: '1 day ago',
      type: 'audit',
      unread: false,
      route: '/client/surveys',
    }
  ],
  employee: [
    {
      title: 'New Mission Dispatched',
      description: 'Go to Flagship Retail Store: Sector 4 hub for immediate visual audit and pricing inventory check.',
      time: 'Just now',
      type: 'audit',
      unread: true,
      route: '/agent/survey',
    },
    {
      title: 'Submission Approved',
      description: 'Your shelf presentation photos have been validated by Manager Sarah Chen.',
      time: '2 hours ago',
      type: 'system',
      unread: true,
      route: '/agent/history',
    },
    {
      title: 'Audit Check Overdue',
      description: 'Checklist compliance report for Sector 12 hub is due. Perform audit before 6:00 PM.',
      time: '5 hours ago',
      type: 'compliance',
      unread: false,
      route: '/agent/portal',
    }
  ]
};

export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    if (!user) {
      setNotifications([]);
      return;
    }

    const localStorageKey = `retailflow_notifications_${user.id}`;
    const cached = localStorage.getItem(localStorageKey);

    if (cached) {
      setNotifications(JSON.parse(cached));
    } else {
      // Seed default notifications for the user's role
      const roleDefaults = defaultNotificationsByRole[user.role] || [];
      const seeded: Notification[] = roleDefaults.map((item, idx) => ({
        ...item,
        id: `${user.role}-seeded-notif-${idx}-${Date.now()}`
      }));
      setNotifications(seeded);
      localStorage.setItem(localStorageKey, JSON.stringify(seeded));
    }
  }, [user]);

  const saveNotifications = (newNotifs: Notification[]) => {
    if (!user) return;
    const localStorageKey = `retailflow_notifications_${user.id}`;
    setNotifications(newNotifs);
    localStorage.setItem(localStorageKey, JSON.stringify(newNotifs));
  };

  const markAsRead = (id: string) => {
    const updated = notifications.map(notif => 
      notif.id === id ? { ...notif, unread: false } : notif
    );
    saveNotifications(updated);
  };

  const markAllAsRead = () => {
    const updated = notifications.map(notif => ({ ...notif, unread: false }));
    saveNotifications(updated);
  };

  const clearAll = () => {
    saveNotifications([]);
  };

  const addNotification = (title: string, description: string, type: Notification['type'], route?: string) => {
    const newNotif: Notification = {
      id: `dynamic-notif-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      title,
      description,
      time: 'Just now',
      type,
      unread: true,
      route,
    };
    saveNotifications([newNotif, ...notifications]);
  };

  const unreadCount = notifications.filter(n => n.unread).length;

  return (
    <NotificationContext.Provider value={{
      notifications,
      unreadCount,
      markAsRead,
      markAllAsRead,
      clearAll,
      addNotification
    }}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  return context;
};
