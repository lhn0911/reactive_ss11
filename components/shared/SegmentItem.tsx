import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { SegmentItemProps } from "../../types";

export default function SegmentItem({ 
  label, 
  selected, 
  color, 
  onPress 
}: SegmentItemProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.container,
        {
          borderColor: color,
          backgroundColor: selected ? `${color}22` : "#fff",
          borderWidth: selected ? 2 : 1,
        }
      ]}
    >
      <Text style={[styles.text, { color }]}>
        {label}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 16,
  },
  text: {
    fontSize: 14,
    fontWeight: "500",
  },
});
