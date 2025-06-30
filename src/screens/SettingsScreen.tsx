import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useNotificationStore } from "../store/useNotificationStore";
import { NotificationType } from "../types/Notification";
import { colors } from "../constants/colors";

export default function SettingsScreen() {
  const {
    notifications,
    unreadCount,
    markAllAsRead,
    clearAllNotifications,
    generateMockNotification,
  } = useNotificationStore();

  const handleMarkAllAsRead = () => {
    Alert.alert(
      "Mark as Read",
      "Do you want to mark all notifications as read?",
      [
        { text: "Cancel", style: "cancel" },
        { text: "Confirm", onPress: markAllAsRead },
      ]
    );
  };

  const handleClearAll = () => {
    Alert.alert(
      "Delete All",
      "Are you sure you want to delete all notifications? This action cannot be undone.",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: clearAllNotifications,
        },
      ]
    );
  };

  const generateMockNotificationType = (type: NotificationType) => {
    generateMockNotification(type);
  };

  const mockNotificationTypes: {
    type: NotificationType;
    label: string;
    icon: any;
    color: string;
  }[] = [
    {
      type: "info",
      label: "Information",
      icon: "information-circle-outline",
      color: colors.blue,
    },
    {
      type: "warning",
      label: "Warning",
      icon: "warning-outline",
      color: colors.warning,
    },
    {
      type: "error",
      label: "Error",
      icon: "alert-circle-outline",
      color: colors.red,
    },
    {
      type: "password",
      label: "Password",
      icon: "shield-checkmark-outline",
      color: colors.green,
    },
    {
      type: "update",
      label: "Update",
      icon: "refresh-outline",
      color: colors.purple,
    },
    {
      type: "subscription",
      label: "Subscription",
      icon: "card-outline",
      color: colors.pink,
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.content}>
          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{notifications.length}</Text>
              <Text style={styles.statLabel}>Total</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{unreadCount}</Text>
              <Text style={styles.statLabel}>Unread</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>
                {notifications.length - unreadCount}
              </Text>
              <Text style={styles.statLabel}>Read</Text>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Actions</Text>
            <TouchableOpacity
              style={styles.actionButton}
              onPress={handleMarkAllAsRead}
            >
              <Ionicons
                name="checkmark-done-outline"
                size={24}
                color={colors.blue}
              />
              <Text style={styles.actionButtonText}>Mark all as read</Text>
              <Ionicons name="chevron-forward" size={20} color={colors.gray1} />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.actionButton}
              onPress={handleClearAll}
            >
              <Ionicons name="trash-outline" size={24} color={colors.red} />
              <Text style={[styles.actionButtonText, { color: colors.red }]}>
                Delete all
              </Text>
              <Ionicons name="chevron-forward" size={20} color={colors.gray1} />
            </TouchableOpacity>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Generate Mock Notifications</Text>
            <Text style={styles.sectionSubtitle}>
              Test different notification types
            </Text>

            <View style={styles.mockGrid}>
              {mockNotificationTypes.map((item) => (
                <TouchableOpacity
                  key={item.type}
                  style={styles.mockButton}
                  onPress={() => generateMockNotificationType(item.type)}
                >
                  <Ionicons name={item.icon} size={24} color={item.color} />
                  <Text style={styles.mockButtonText}>{item.label}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Information</Text>
            <View style={styles.infoItem}>
              <Ionicons
                name="phone-portrait-outline"
                size={20}
                color={colors.gray}
              />
              <Text style={styles.infoText}>Notification App v1.0.0</Text>
            </View>
            <View style={styles.infoItem}>
              <Ionicons name="code-outline" size={20} color={colors.gray} />
              <Text style={styles.infoText}>React Native + TypeScript</Text>
            </View>
            <View style={styles.infoItem}>
              <Ionicons
                name="construct-outline"
                size={20}
                color={colors.gray}
              />
              <Text style={styles.infoText}>Zustand + React Navigation</Text>
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
  statsContainer: {
    flexDirection: "row",
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 20,
    marginBottom: 24,
    shadowColor: colors.shadow,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  statItem: {
    flex: 1,
    alignItems: "center",
  },
  statNumber: {
    fontSize: 24,
    fontWeight: "bold",
    color: colors.darkGray,
  },
  statLabel: {
    fontSize: 12,
    color: colors.gray,
    marginTop: 4,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: colors.darkGray,
    marginBottom: 8,
  },
  sectionSubtitle: {
    fontSize: 14,
    color: colors.gray,
    marginBottom: 16,
  },
  actionButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.white,
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: colors.shadow,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  actionButtonText: {
    flex: 1,
    fontSize: 16,
    color: colors.darkGray,
    marginLeft: 12,
  },
  mockGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  mockButton: {
    width: "48%",
    backgroundColor: colors.white,
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 12,
    shadowColor: colors.shadow,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  mockButtonText: {
    fontSize: 14,
    color: colors.darkGray,
    marginTop: 8,
    textAlign: "center",
  },
  infoItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.white,
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: colors.shadow,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  infoText: {
    fontSize: 14,
    color: colors.gray,
    marginLeft: 12,
  },
});
