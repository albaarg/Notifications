export type NotificationType =
  | "warning"
  | "info"
  | "error"
  | "password"
  | "update"
  | "subscription"
  | "device"
  | "payment"
  | "feature"
  | "profile";

export interface Notification {
  id: string;
  title: string;
  description: string;
  time: string;
  timestamp: number;
  type: NotificationType;
  read?: boolean;
  createdAt: Date;
}
