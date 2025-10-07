import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { PRODUCT_STATUS, STATUS_CONFIG } from "../../constants";
import { ProductStatus } from "../../types";
import SegmentItem from "./SegmentItem";

interface StatusSelectorProps {
  value: ProductStatus;
  onChange: (status: ProductStatus) => void;
  label?: string;
}

export default function StatusSelector({ 
  value, 
  onChange, 
  label = "Trạng thái" 
}: StatusSelectorProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.segments}>
        {Object.values(PRODUCT_STATUS).map((status) => (
          <SegmentItem
            key={status}
            label={STATUS_CONFIG[status].label}
            selected={value === status}
            color={STATUS_CONFIG[status].color}
            onPress={() => onChange(status)}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 8,
    color: "#000",
  },
  segments: {
    flexDirection: "row",
    gap: 8,
  },
});
