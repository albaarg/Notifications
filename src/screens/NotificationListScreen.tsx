import React, { useLayoutEffect } from "react";
import {
  View,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Text,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNotificationStore } from "../store/useNotificationStore";
import NotificationItem from "../components/NotificationItem";
import { useNavigation } from "@react-navigation/native";
import { NavigationProp } from "../types/navigation";
import { colors } from "../constants/colors";

export default function NotificationListScreen() {
  const notifications = useNotificationStore((s) => s.notifications);
  const unreadCount = useNotificationStore((s) => s.unreadCount);
  const navigation = useNavigation<NavigationProp>();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <TouchableOpacity
            onPress={() => navigation.navigate("Settings")}
            style={styles.headerButton}
          >
            <Ionicons
              name="notifications-outline"
              size={24}
              color={colors.gray}
            />
          </TouchableOpacity>
          {unreadCount > 0 && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>
                {unreadCount > 99 ? "99+" : unreadCount}
              </Text>
            </View>
          )}
        </View>
      ),
    });
  }, [navigation, unreadCount]);

  const renderNotificationItem = ({ item }: { item: any }) => (
    <View style={styles.notificationContainer}>
      <NotificationItem
        notification={item}
        onPress={() => navigation.navigate("Detail", { id: item.id })}
      />
    </View>
  );

  return (
    <View style={styles.safeArea}>
      <View style={styles.container}>
        {notifications.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Ionicons
              name="notifications-off-outline"
              size={64}
              color={colors.gray1}
            />
            <Text style={styles.emptyText}>Not notifications</Text>
            <Text style={styles.emptySubtext}>
              Notifications will appear here
            </Text>
          </View>
        ) : (
          <FlatList
            data={notifications}
            keyExtractor={(item) => item.id}
            renderItem={renderNotificationItem}
            contentContainerStyle={styles.listContainer}
            showsVerticalScrollIndicator={false}
          />
        )}

        <TouchableOpacity
          style={styles.fab}
          onPress={() => navigation.navigate("AddNotification")}
        >
          <Text style={styles.fabText}>+</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
    marginTop: 18,
  },
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  headerRight: {
    flexDirection: "row",
    alignItems: "center",
  },
  headerButton: {
    justifyContent: "center",
    alignItems: "center",
    height: 40,
    width: 40,
  },
  badge: {
    position: "absolute",
    top: 4,
    right: 4,
    backgroundColor: colors.red,
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 4,
  },
  badgeText: {
    color: colors.white,
    fontSize: 12,
    fontWeight: "bold",
  },
  listContainer: {
    padding: 12,
    paddingTop: 0,
  },
  notificationContainer: {
    marginBottom: 12,
    borderRadius: 12,
    backgroundColor: colors.white,
    shadowColor: colors.shadow,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 40,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: "600",
    color: colors.gray,
    marginTop: 16,
    textAlign: "center",
  },
  emptySubtext: {
    fontSize: 14,
    color: colors.time,
    marginTop: 8,
    textAlign: "center",
  },
  fab: {
    position: "absolute",
    bottom: 30,
    right: 30,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: colors.blue,
    justifyContent: "center",
    alignItems: "center",
    elevation: 8,
    shadowColor: colors.shadow,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
  },
  fabText: {
    fontSize: 24,
    color: colors.white,
    fontWeight: "bold",
  },
});
