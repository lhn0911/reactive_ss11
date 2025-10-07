import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  Alert,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Product, ProductDetailParams, ProductStatus } from "../../../types";
import { getProductById, updateProduct } from "../../../utils/storage";
import FormInput from "@/components/shared/FormInput";
import StatusSelector from "@/components/shared/StatusSelector";

const VALIDATION_MESSAGES = {
  NAME_REQUIRED: "Tên sản phẩm không được để trống.",
  PRICE_INVALID: "Giá sản phẩm phải là số lớn hơn 0.",
  QUANTITY_INVALID: "Số lượng phải là số nguyên dương.",
  UPDATE_SUCCESS: "Cập nhật sản phẩm thành công.",
};

const STATUS_CONFIG = {
  draft: { label: "Bản nháp", color: "#555", bgColor: "#eee" },
  active: { label: "Đang bán", color: "#0a0", bgColor: "#cfc" },
  stopped: { label: "Ngừng bán", color: "#a00", bgColor: "#fcc" },
};

export default function ProductDetailScreen() {
  const { id, mode } = useLocalSearchParams() as unknown as ProductDetailParams;
  const router = useRouter();
  const [product, setProduct] = useState<Product | null>(null);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [status, setStatus] = useState<ProductStatus>("draft");
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProduct();
  }, [id]);

  const loadProduct = async () => {
    try {
      setLoading(true);
      const found = await getProductById(id);
      if (found) {
        setProduct(found);
        setName(found.name);
        setPrice(found.price.toString());
        setQuantity(found.quantity.toString());
        setStatus(found.status);
      }
    } catch (error) {
      console.error("Error loading product:", error);
    } finally {
      setLoading(false);
    }
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    if (!name.trim()) newErrors.name = VALIDATION_MESSAGES.NAME_REQUIRED;
    const priceNum = parseFloat(price);
    if (isNaN(priceNum) || priceNum <= 0)
      newErrors.price = VALIDATION_MESSAGES.PRICE_INVALID;
    const qtyNum = parseInt(quantity);
    if (isNaN(qtyNum) || qtyNum <= 0)
      newErrors.quantity = VALIDATION_MESSAGES.QUANTITY_INVALID;
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleUpdate = async () => {
    if (!product) return;
    if (!validateForm()) return;
    try {
      const updated = await updateProduct(id, {
        name: name.trim(),
        price: parseFloat(price),
        quantity: parseInt(quantity),
        status,
      });
      if (updated) {
        Alert.alert("Thành công", VALIDATION_MESSAGES.UPDATE_SUCCESS);
        router.back();
      }
    } catch (error) {
      Alert.alert("Lỗi", "Không thể cập nhật sản phẩm. Vui lòng thử lại.");
    }
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Đang tải...</Text>
      </View>
    );
  }

  if (!product) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Không tìm thấy sản phẩm</Text>
      </View>
    );
  }

  const isEdit = mode === "edit";

  if (!isEdit) {
    const statusConfig = STATUS_CONFIG[status];
    return (
      <View style={styles.container}>
        <Stack.Screen options={{ title: "Chi tiết Sản phẩm" }} />
        <View style={styles.detailSection}>
          <Text style={styles.label}>Mã sản phẩm:</Text>
          <Text style={styles.value}>{id}</Text>
        </View>
        <View style={styles.detailSection}>
          <Text style={styles.label}>Tên sản phẩm:</Text>
          <Text style={styles.productName}>{name}</Text>
        </View>
        <View style={styles.detailSection}>
          <Text style={styles.label}>Giá:</Text>
          <Text style={styles.price}>
            {Number(price).toLocaleString("vi-VN", {
              style: "currency",
              currency: "VND",
            })}
          </Text>
        </View>
        <View style={styles.detailSection}>
          <Text style={styles.label}>Số lượng:</Text>
          <Text style={styles.value}>{quantity}</Text>
        </View>
        <View style={styles.detailSection}>
          <Text style={styles.label}>Trạng thái:</Text>
          <View
            style={[
              styles.statusBadge,
              { backgroundColor: statusConfig.bgColor },
            ]}
          >
            <Text style={[styles.statusText, { color: statusConfig.color }]}>
              {statusConfig.label}
            </Text>
          </View>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: "Chỉnh sửa Sản phẩm" }} />
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
        keyboardType="numeric"
        placeholder="Nhập giá sản phẩm"
        error={errors.price}
        required
      />
      <FormInput
        label="Số lượng"
        value={quantity}
        onChangeText={setQuantity}
        keyboardType="numeric"
        placeholder="Nhập số lượng"
        error={errors.quantity}
        required
      />
      <StatusSelector value={status} onChange={setStatus} />
      <TouchableOpacity style={styles.updateButton} onPress={handleUpdate}>
        <Text style={styles.updateButtonText}>CẬP NHẬT</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#fff" },
  title: { fontSize: 18, fontWeight: "bold", marginBottom: 12 },
  label: { marginTop: 6, marginBottom: 6, fontWeight: "600" },
  value: { fontSize: 16, color: "#333" },
  productName: { fontSize: 18, fontWeight: "600", color: "#000" },
  price: { fontSize: 16, fontWeight: "600", color: "#2a8" },
  detailSection: { marginBottom: 12 },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    alignSelf: "flex-start",
  },
  statusText: { fontWeight: "600" },
  updateButton: {
    backgroundColor: "#2a8",
    paddingVertical: 12,
    borderRadius: 10,
    marginTop: 16,
  },
  updateButtonText: { color: "#fff", textAlign: "center", fontWeight: "600" },
  errorText: { color: "red", fontWeight: "bold", marginTop: 16 },
});
