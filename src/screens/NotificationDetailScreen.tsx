import React, { useEffect } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRoute } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { useNotificationStore } from "../store/useNotificationStore";
import { colors } from "../constants/colors";

export default function NotificationDetailScreen() {
  const { id } = useRoute().params as { id: string };
  const notification = useNotificationStore((s) =>
    s.notifications.find((n) => n.id === id)
  );
  const markAsRead = useNotificationStore((s) => s.markAsRead);

  useEffect(() => {
    if (notification && !notification.read) {
      markAsRead(id);
    }
  }, [id, notification, markAsRead]);

  const getRelativeTime = (timestamp: number): string => {
    const now = Date.now();
    const diff = now - timestamp;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return "Just now";
    if (minutes < 60)
      return `${minutes} ${minutes === 1 ? "minute" : "minutes"} ago`;
    if (hours < 24) return `${hours} ${hours === 1 ? "hour" : "hours"} ago`;
    return `${days} ${days === 1 ? "day" : "days"} ago`;
  };

  if (!notification) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.errorContainer}>
          <Ionicons name="alert-circle-outline" size={64} color={colors.time} />
          <Text style={styles.errorText}>Notification not found</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.content}>
          <View style={styles.header}>
            <View style={styles.iconContainer}>
              <Ionicons
                name="notifications-outline"
                size={32}
                color={colors.blue}
              />
            </View>
            <Text style={styles.title}>{notification.title}</Text>
            <Text style={styles.time}>
              {getRelativeTime(notification.timestamp)}
            </Text>
          </View>

          <View style={styles.descriptionContainer}>
            <Text style={styles.description}>{notification.description}</Text>
          </View>

          <View style={styles.metadata}>
            <View style={styles.metadataItem}>
              <Ionicons name="time-outline" size={16} color={colors.gray} />
              <Text style={styles.metadataText}>
                {notification.createdAt.toLocaleString()}
              </Text>
            </View>
            <View style={styles.metadataItem}>
              <Ionicons name="pricetag-outline" size={16} color={colors.gray} />
              <Text style={styles.metadataText}>Type: {notification.type}</Text>
            </View>
            <View style={styles.metadataItem}>
              <Ionicons
                name="checkmark-circle-outline"
                size={16}
                color={colors.gray}
              />
              <Text style={styles.metadataText}>
                Status: {notification.read ? "Read" : "Unread"}
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 20,
  },
  header: {
    alignItems: "center",
    marginBottom: 30,
  },
  iconContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: colors.blueLight,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: colors.darkGray,
    textAlign: "center",
    marginBottom: 8,
  },
  time: {
    fontSize: 14,
    color: colors.gray,
    textAlign: "center",
  },
  descriptionContainer: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    shadowColor: colors.shadow,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    color: colors.darkGray,
  },
  metadata: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 20,
    shadowColor: colors.shadow,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  metadataItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  metadataText: {
    fontSize: 14,
    color: colors.gray,
    marginLeft: 8,
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  errorText: {
    fontSize: 18,
    color: colors.time,
    marginTop: 16,
    textAlign: "center",
  },
});
