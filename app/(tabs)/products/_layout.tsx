import { Stack } from "expo-router";

export default function ProductsStackLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{ title: "Danh sách sản phẩm", headerShown: false }}
      />
      <Stack.Screen name="add" options={{ title: "Thêm mới Sản phẩm" }} />
      <Stack.Screen name="[id]" options={{ title: "Chi tiết Sản phẩm" }} />
    </Stack>
  );
}
