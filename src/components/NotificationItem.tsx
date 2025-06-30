import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Notification } from "../types/Notification";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../constants/colors";

interface Props {
  notification: Notification;
  onPress?: () => void;
}

const iconMap: Record<string, any> = {
  password: "shield-checkmark-outline",
  update: "tablet-portrait-outline",
  subscription: "notifications-outline",
  device: "phone-portrait-outline",
  payment: "card-outline",
  feature: "star-outline",
  profile: "person-outline",
  warning: "warning-outline",
  info: "information-circle-outline",
  error: "alert-circle-outline",
};

export default function NotificationItem({ notification, onPress }: Props) {
  const icon = iconMap[notification.type] || "notifications-outline";
  const isUnread = !notification.read;

  const ItemContent = () => (
    <View style={[styles.item, isUnread && styles.unreadItem]}>
      <View
        style={[styles.iconContainer, isUnread && styles.unreadIconContainer]}
      >
        <Ionicons
          name={icon}
          size={20}
          color={isUnread ? colors.blue : colors.gray}
        />
      </View>
      <View style={styles.textContainer}>
        <Text style={[styles.title, isUnread && styles.unreadTitle]}>
          {notification.title}
        </Text>
        <Text
          style={[styles.description, isUnread && styles.unreadDescription]}
        >
          {notification.description}
        </Text>
      </View>
      <View style={styles.timeContainer}>
        <Text style={[styles.time, isUnread && styles.unreadTime]}>
          {notification.time}
        </Text>
        {isUnread && <View style={styles.unreadDot} />}
      </View>
    </View>
  );

  if (onPress) {
    return (
      <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
        <ItemContent />
      </TouchableOpacity>
    );
  }

  return <ItemContent />;
}

const styles = StyleSheet.create({
  item: {
    flexDirection: "row",
    alignItems: "flex-start",
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
  unreadItem: {
    backgroundColor: colors.blueLight,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: colors.lightGray,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
    marginTop: 2,
  },
  unreadIconContainer: {
    backgroundColor: colors.blueLight,
  },
  textContainer: {
    flex: 1,
    paddingRight: 8,
  },
  title: {
    fontWeight: "600",
    fontSize: 15,
    color: colors.black,
    marginBottom: 4,
  },
  unreadTitle: {
    fontWeight: "700",
    color: colors.black,
  },
  description: {
    color: colors.gray,
    fontSize: 14,
    lineHeight: 20,
  },
  unreadDescription: {
    color: colors.darkGray,
  },
  timeContainer: {
    alignItems: "flex-end",
    justifyContent: "space-between",
    height: 40,
  },
  time: {
    fontSize: 12,
    color: colors.time,
    marginTop: 2,
  },
  unreadTime: {
    color: colors.blue,
    fontWeight: "600",
  },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.blue,
    marginTop: 4,
  },
});
