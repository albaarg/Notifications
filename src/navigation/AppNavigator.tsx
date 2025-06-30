import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import NotificationListScreen from "../screens/NotificationListScreen";
import NotificationDetailScreen from "../screens/NotificationDetailScreen";
import AddNotificationScreen from "../screens/AddNotificationScreen";
import SettingsScreen from "../screens/SettingsScreen";
import { colors } from "../constants/colors";

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerBackTitle: "",
        headerStyle: {
          backgroundColor: colors.background,
        },
        headerTintColor: colors.darkGray,
      }}
    >
      <Stack.Screen
        name="Home"
        component={NotificationListScreen}
        options={{
          title: "Notifications",
          headerShown: true,
          headerTitleStyle: {
            fontWeight: "600",
          },
        }}
      />
      <Stack.Screen
        name="Detail"
        component={NotificationDetailScreen}
        options={{
          title: "Notification Detail",
          headerBackTitle: "",
        }}
      />
      <Stack.Screen
        name="AddNotification"
        component={AddNotificationScreen}
        options={{
          title: "Add Notification",
          headerBackTitle: "",
        }}
      />
      <Stack.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          title: "Settings",
          headerBackTitle: "",
        }}
      />
    </Stack.Navigator>
  );
}
