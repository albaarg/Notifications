import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { useNotificationStore } from "../store/useNotificationStore";
import { NavigationProp } from "../types/navigation";
import { NotificationType } from "../types/Notification";
import { colors } from "../constants/colors";

const notificationTypes = [
  { key: "password", label: "Password" },
  { key: "update", label: "Update" },
  { key: "subscription", label: "Subscription" },
  { key: "device", label: "Device" },
  { key: "payment", label: "Payment" },
  { key: "feature", label: "Feature" },
  { key: "profile", label: "Profile" },
  { key: "warning", label: "Warning" },
  { key: "info", label: "Info" },
  { key: "error", label: "Error" },
];

export default function AddNotificationScreen() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [selectedType, setSelectedType] = useState("info");
  const navigation = useNavigation<NavigationProp>();
  const addNotification = useNotificationStore((s) => s.addNotification);

  const handleSave = () => {
    if (!title.trim() || !description.trim()) {
      Alert.alert("Error", "Please complete all fields");
      return;
    }

    const newNotification = {
      id: Date.now().toString(),
      title: title.trim(),
      description: description.trim(),
      time: "Now",
      timestamp: Date.now(),
      type: selectedType as NotificationType,
      read: false,
      createdAt: new Date(),
    };

    addNotification(newNotification);
    Alert.alert("Success", "Notification added successfully", [
      { text: "OK", onPress: () => navigation.goBack() },
    ]);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container}>
        <View style={styles.content}>
          <Text style={styles.title}>Add Notification</Text>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Title</Text>
            <TextInput
              style={styles.input}
              value={title}
              onChangeText={setTitle}
              placeholder="Enter notification title"
              maxLength={100}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Description</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              value={description}
              onChangeText={setDescription}
              placeholder="Enter notification description"
              multiline
              numberOfLines={4}
              maxLength={500}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Notification Type</Text>
            <View style={styles.typeContainer}>
              {notificationTypes.map((type) => (
                <TouchableOpacity
                  key={type.key}
                  style={[
                    styles.typeButton,
                    selectedType === type.key && styles.selectedTypeButton,
                  ]}
                  onPress={() => setSelectedType(type.key)}
                >
                  <Text
                    style={[
                      styles.typeButtonText,
                      selectedType === type.key &&
                        styles.selectedTypeButtonText,
                    ]}
                  >
                    {type.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={() => navigation.goBack()}
            >
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
              <Text style={styles.saveButtonText}>Save</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: colors.darkGray,
    marginBottom: 30,
    textAlign: "center",
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.darkGray,
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: colors.white,
  },
  textArea: {
    height: 100,
    textAlignVertical: "top",
  },
  typeContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  typeButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.white,
  },
  selectedTypeButton: {
    backgroundColor: colors.blue,
    borderColor: colors.blue,
  },
  typeButtonText: {
    fontSize: 14,
    color: colors.darkGray,
  },
  selectedTypeButtonText: {
    color: colors.white,
  },
  buttonContainer: {
    flexDirection: "row",
    gap: 12,
    marginTop: 30,
  },
  cancelButton: {
    flex: 1,
    paddingVertical: 15,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.white,
    alignItems: "center",
  },
  cancelButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.gray,
  },
  saveButton: {
    flex: 1,
    paddingVertical: 15,
    borderRadius: 8,
    backgroundColor: colors.blue,
    alignItems: "center",
  },
  saveButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.white,
  },
});
