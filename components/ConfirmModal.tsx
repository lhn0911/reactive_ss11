import React from "react";
import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { ConfirmModalProps } from "../types";
import { COLORS } from "@/constants";

export default function ConfirmModal({ 
  visible, 
  onConfirm, 
  onCancel, 
  title = "Xác nhận",
  message = "Bạn có chắc chắn muốn xóa sản phẩm này?"
}: ConfirmModalProps) {
  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.modal}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.message}>{message}</Text>
          <View style={styles.buttons}>
            <TouchableOpacity style={styles.cancelButton} onPress={onCancel}>
              <Text style={styles.cancelText}>Hủy</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.confirmButton} onPress={onConfirm}>
              <Text style={styles.confirmText}>Xóa</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modal: {
    width: "85%",
    backgroundColor: COLORS.white,
    padding: 24,
    borderRadius: 12,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    color: COLORS.black,
    marginBottom: 8,
  },
  message: {
    fontSize: 16,
    color: COLORS.gray,
    marginBottom: 24,
    lineHeight: 22,
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 12,
  },
  cancelButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: COLORS.gray,
  },
  cancelText: {
    color: COLORS.gray,
    fontSize: 16,
    fontWeight: "500",
  },
  confirmButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 6,
    backgroundColor: COLORS.danger,
  },
  confirmText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: "500",
  },
});
