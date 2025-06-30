import { create } from "zustand";
import { Notification, NotificationType } from "../types/Notification";
import { generateMockNotification } from "../utils/notificationUtils";

const initialNotifications: Notification[] = [
  {
    id: "1",
    title: "Password Updated",
    description: "Your account password has been successfully updated.",
    time: "1h",
    timestamp: Date.now() - 3600000,
    type: "password",
    read: false,
    createdAt: new Date(Date.now() - 3600000),
  },
  {
    id: "2",
    title: "App Update Available",
    description:
      "A new version of the app is available. Update now for the latest features.",
    time: "2h",
    timestamp: Date.now() - 7200000,
    type: "update",
    read: true,
    createdAt: new Date(Date.now() - 7200000),
  },
  {
    id: "3",
    title: "Subscription Expiring",
    description:
      "Your subscription is expiring soon. Renew now to continue enjoying premium features.",
    time: "3h",
    timestamp: Date.now() - 10800000,
    type: "subscription",
    read: false,
    createdAt: new Date(Date.now() - 10800000),
  },
  {
    id: "4",
    title: "New Device Login",
    description:
      "A new device has been logged into your account. Review the details.",
    time: "4h",
    timestamp: Date.now() - 14400000,
    type: "device",
    read: true,
    createdAt: new Date(Date.now() - 14400000),
  },
  {
    id: "5",
    title: "Payment Method Updated",
    description: "Your payment method has been successfully updated.",
    time: "5h",
    timestamp: Date.now() - 18000000,
    type: "payment",
    read: false,
    createdAt: new Date(Date.now() - 18000000),
  },
  {
    id: "6",
    title: "New Feature Available",
    description: "A new feature is now available. Check it out in the app.",
    time: "6h",
    timestamp: Date.now() - 21600000,
    type: "feature",
    read: true,
    createdAt: new Date(Date.now() - 21600000),
  },
  {
    id: "7",
    title: "Profile Updated",
    description: "Your profile information has been successfully updated.",
    time: "7h",
    timestamp: Date.now() - 25200000,
    type: "profile",
    read: false,
    createdAt: new Date(Date.now() - 25200000),
  },
];

const getRelativeTime = (timestamp: number): string => {
  const now = Date.now();
  const diff = now - timestamp;
  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);

  if (minutes < 1) return "Ahora";
  if (minutes < 60) return `${minutes}${minutes === 1 ? "m" : "m"}`;
  if (hours < 24) return `${hours}${hours === 1 ? "h" : "h"}`;
  return `${days}${days === 1 ? "d" : "d"}`;
};

type NotificationStore = {
  notifications: Notification[];
  unreadCount: number;
  addNotification: (n: Notification) => void;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  generateMockNotification: (type?: NotificationType) => void;
  clearAllNotifications: () => void;
  getUnreadCount: () => number;
};

export const useNotificationStore = create<NotificationStore>((set, get) => ({
  notifications: initialNotifications,
  unreadCount: initialNotifications.filter((n) => !n.read).length,

  addNotification: (n) =>
    set((state) => {
      const newNotifications = [n, ...state.notifications];
      return {
        notifications: newNotifications,
        unreadCount: newNotifications.filter(
          (notification) => !notification.read
        ).length,
      };
    }),

  markAsRead: (id) =>
    set((state) => {
      const updatedNotifications = state.notifications.map((n) =>
        n.id === id ? { ...n, read: true } : n
      );
      return {
        notifications: updatedNotifications,
        unreadCount: updatedNotifications.filter(
          (notification) => !notification.read
        ).length,
      };
    }),

  markAllAsRead: () =>
    set((state) => {
      const updatedNotifications = state.notifications.map((n) => ({
        ...n,
        read: true,
      }));
      return {
        notifications: updatedNotifications,
        unreadCount: 0,
      };
    }),

  generateMockNotification: (type?: NotificationType) => {
    const mockNotification = generateMockNotification(type);
    get().addNotification(mockNotification);
  },

  clearAllNotifications: () =>
    set(() => ({
      notifications: [],
      unreadCount: 0,
    })),

  getUnreadCount: () => {
    const state = get();
    return state.notifications.filter((n) => !n.read).length;
  },
}));
