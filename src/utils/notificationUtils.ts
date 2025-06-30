import { Notification, NotificationType } from "../types/Notification";

export const generateMockNotification = (
  type?: NotificationType
): Notification => {
  const types: NotificationType[] = ["info", "warning", "error"];
  const chosenType = type ?? types[Math.floor(Math.random() * types.length)];
  const now = Date.now();

  return {
    id: now.toString(),
    title: `New alert (${chosenType})`,
    description: "This is a mock description.",
    type: chosenType,
    time: "Now",
    timestamp: now,
    read: false,
    createdAt: new Date(now),
  };
};
