import { Stack, useRouter } from "expo-router";
import { useState } from "react";
import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import FormInput from "../../../components/shared/FormInput";
import StatusSelector from "../../../components/shared/StatusSelector";
import { COLORS, VALIDATION_MESSAGES } from "../../../constants";
import { ProductStatus } from "../../../types";
import { addProduct } from "../../../utils/storage";

export default function AddProductScreen() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [status, setStatus] = useState<ProductStatus>("draft");
  const [errors, setErrors] = useState<{[key: string]: string}>({});

  const validateForm = () => {
    const newErrors: {[key: string]: string} = {};
    
    if (!name.trim()) {
      newErrors.name = VALIDATION_MESSAGES.NAME_REQUIRED;
    }
    
    const priceNum = parseFloat(price);
    if (isNaN(priceNum) || priceNum <= 0) {
      newErrors.price = VALIDATION_MESSAGES.PRICE_INVALID;
    }
    
    const qtyNum = parseInt(quantity);
    if (isNaN(qtyNum) || qtyNum <= 0) {
      newErrors.quantity = VALIDATION_MESSAGES.QUANTITY_INVALID;
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async () => {
    if (!validateForm()) return;
    
    try {
      await addProduct({
        name: name.trim(),
        price: parseFloat(price),
        quantity: parseInt(quantity),
        status,
      });
      router.back();
    } catch (error) {
      Alert.alert("Lỗi", "Không thể thêm sản phẩm. Vui lòng thử lại.");
    }
  };

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: "Thêm mới Sản phẩm" }} />

      <FormInput
        label="Tên sản phẩm"
        value={name}
        onChangeText={setName}
        placeholder="Nhập tên sản phẩm"
        error={errors.name}
        required
      />

      <FormInput
        label="Giá"
        value={price}
        onChangeText={setPrice}
        placeholder="Nhập giá sản phẩm"
        keyboardType="numeric"
        error={errors.price}
        required
      />

      <FormInput
        label="Số lượng"
        value={quantity}
        onChangeText={setQuantity}
        placeholder="Nhập số lượng"
        keyboardType="numeric"
        error={errors.quantity}
        required
      />

      <StatusSelector
        value={status}
        onChange={setStatus}
      />

      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveButtonText}>THÊM MỚI</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    padding: 16,
    backgroundColor: COLORS.background,
  },
  saveButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 20,
  },
  saveButtonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: "600",
  },
});
