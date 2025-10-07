import { useFocusEffect, useRouter } from "expo-router";
import { useCallback, useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  View,
} from "react-native";
import ConfirmModal from "../../../components/ConfirmModal";
import ProductItem from "../../../components/ProductItem";
import { Product } from "../../../types";
import { deleteProduct, getProducts } from "../../../utils/storage";
import { COLORS } from "@/constants";

export default function ProductListScreen() {
  const [products, setProducts] = useState<Product[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const router = useRouter();

  const loadData = async () => {
    try {
      const data = await getProducts();
      setProducts(data);
    } catch (error) {
      console.error("Error loading products:", error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      loadData();
    }, [])
  );

  const handleDelete = async () => {
    if (!selectedId) return;
    
    try {
      const success = await deleteProduct(selectedId);
      if (success) {
        setProducts(prev => prev.filter(p => p.id !== selectedId));
        setModalVisible(false);
        setSelectedId(null);
      }
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={products}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ProductItem
            product={item}
            onPress={() => router.push(`/(tabs)/products/${item.id}`)}
            onDelete={() => {
              setSelectedId(item.id);
              setModalVisible(true);
            }}
            onEdit={() =>
              router.push({
                pathname: "/(tabs)/products/[id]",
                params: { id: item.id, mode: "edit" },
              })
            }
          />
        )}
        ListEmptyComponent={() => (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>Chưa có sản phẩm nào.</Text>
          </View>
        )}
        showsVerticalScrollIndicator={false}
      />

      <ConfirmModal
        visible={modalVisible}
        onConfirm={handleDelete}
        onCancel={() => {
          setModalVisible(false);
          setSelectedId(null);
        }}
        title="Xóa sản phẩm"
        message="Bạn có chắc chắn muốn xóa sản phẩm này?"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    padding: 16,
    backgroundColor: COLORS.background,
  },
  emptyContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 60,
  },
  emptyText: {
    fontSize: 16,
    color: COLORS.gray,
    textAlign: "center",
  },
});
