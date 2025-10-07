import React from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import { COLORS } from "../../constants";
import { FormInputProps } from "../../types";

interface ExtendedFormInputProps extends FormInputProps {
  label?: string;
  error?: string;
  required?: boolean;
}

export default function FormInput({
  value,
  onChangeText,
  placeholder,
  keyboardType = "default",
  style,
  label,
  error,
  required = false,
}: ExtendedFormInputProps) {
  return (
    <View style={styles.container}>
      {label && (
        <Text style={styles.label}>
          {label}
          {required && <Text style={styles.required}> *</Text>}
        </Text>
      )}
      <TextInput
        style={[
          styles.input,
          error && styles.inputError,
          style
        ]}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        keyboardType={keyboardType}
        placeholderTextColor={COLORS.gray}
      />
      {error && <Text style={styles.errorText}>{error}</Text>}
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
    marginBottom: 6,
    color: COLORS.black,
  },
  required: {
    color: COLORS.danger,
  },
  input: {
    borderWidth: 1,
    borderColor: COLORS.gray,
    borderRadius: 6,
    padding: 12,
    fontSize: 16,
    backgroundColor: COLORS.white,
  },
  inputError: {
    borderColor: COLORS.danger,
  },
  errorText: {
    color: COLORS.danger,
    fontSize: 12,
    marginTop: 4,
  },
});
