import { FontAwesome6, Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { COLORS, STATUS_CONFIG } from "../constants";
import { ProductItemProps } from "../types";

function formatCurrency(value: number): string {
  try {
    return value.toLocaleString("vi-VN", {
      style: "currency",
      currency: "VND",
    });
  } catch {
    return `${value} VND`;
  }
}

export default function ProductItem({
  product,
  onPress,
  onDelete,
  onEdit,
}: ProductItemProps) {
  const statusConfig = STATUS_CONFIG[product.status];
  
  return (
    <TouchableOpacity onPress={onPress} style={styles.item}>
      <View style={styles.left}>
        <Text style={styles.name}>{product.name}</Text>
        <View style={styles.row}>
          <View
            style={[
              styles.badge,
              {
                backgroundColor: statusConfig.bgColor,
                borderColor: statusConfig.color,
              },
            ]}
          >
            <Text style={[styles.badgeText, { color: statusConfig.color }]}>
              {statusConfig.label}
            </Text>
          </View>
        </View>
        <Text style={styles.price}>Giá: {formatCurrency(product.price)}</Text>
        <Text style={styles.quantity}>Số lượng: {product.quantity}</Text>
      </View>
      <View style={styles.actions}>
        <TouchableOpacity onPress={onEdit} style={styles.actionButton}>
          <FontAwesome6 name="edit" size={22} color={COLORS.warning} />
        </TouchableOpacity>
        <TouchableOpacity onPress={onDelete} style={styles.actionButton}>
          <Ionicons name="trash" size={22} color={COLORS.danger} />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 12,
    backgroundColor: COLORS.white,
    borderRadius: 10,
    elevation: 1,
    marginBottom: 10,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  left: { 
    flex: 1,
    paddingRight: 8,
  },
  name: { 
    fontWeight: "700", 
    marginBottom: 4,
    fontSize: 16,
    color: COLORS.black,
  },
  row: { 
    flexDirection: "row", 
    alignItems: "center", 
    marginBottom: 6 
  },
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 999,
    borderWidth: 1,
    marginBottom: 2,
    alignSelf: "flex-start",
  },
  badgeText: {
    fontSize: 12,
    fontWeight: "500",
  },
  price: {
    fontSize: 14,
    color: COLORS.gray,
    marginBottom: 2,
  },
  quantity: {
    fontSize: 14,
    color: COLORS.gray,
  },
  actions: { 
    flexDirection: "row", 
    alignItems: "center",
    gap: 8,
  },
  actionButton: {
    padding: 4,
  },
});
