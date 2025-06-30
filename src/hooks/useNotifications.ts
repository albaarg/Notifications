import { useCallback } from "react";
import { useNotificationStore } from "../store/useNotificationStore";
import { NotificationType } from "../types/Notification";

export const useNotifications = () => {
  const {
    notifications,
    unreadCount,
    addNotification,
    markAsRead,
    markAllAsRead,
    generateMockNotification,
    clearAllNotifications,
  } = useNotificationStore();

  const refreshNotifications = useCallback(async () => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
  }, []);

  const simulatePushNotification = useCallback(
    async (type: NotificationType) => {
      await new Promise((resolve) => setTimeout(resolve, 500));
      generateMockNotification(type);
    },
    [generateMockNotification]
  );

  const markNotificationAsRead = useCallback(
    (id: string) => {
      markAsRead(id);
    },
    [markAsRead]
  );

  const getNotificationsByType = useCallback(
    (type: NotificationType) => {
      return notifications.filter((n) => n.type === type);
    },
    [notifications]
  );

  const getUnreadNotifications = useCallback(() => {
    return notifications.filter((n) => !n.read);
  }, [notifications]);

  const getNotificationStats = useCallback(() => {
    const total = notifications.length;
    const unread = unreadCount;
    const read = total - unread;

    const byType = notifications.reduce((acc, notification) => {
      acc[notification.type] = (acc[notification.type] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return {
      total,
      unread,
      read,
      byType,
    };
  }, [notifications, unreadCount]);

  return {
    notifications,
    unreadCount,

    addNotification,
    markAsRead: markNotificationAsRead,
    markAllAsRead,
    generateMockNotification,
    clearAllNotifications,
    refreshNotifications,
    simulatePushNotification,
    getNotificationsByType,
    getUnreadNotifications,
    getNotificationStats,
  };
};
