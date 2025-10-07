import { Ionicons } from "@expo/vector-icons";
import { router, Tabs } from "expo-router";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

const COLORS = {
  primary: "#f70808ff",
  inactive: "#4e4b4bff",
  success: "#22c55e",
  white: "#fff",
} as const;

type TabConfig = {
  name: string;
  title: string;
  icon: keyof typeof Ionicons.glyphMap;
  hasHeaderButton?: boolean;
};

const TAB_CONFIG: TabConfig[] = [
  {
    name: "home",
    title: "Trang chủ",
    icon: "home",
  },
  {
    name: "products",
    title: "Danh sách Sản phẩm",
    icon: "cube",
    hasHeaderButton: true,
  },
  {
    name: "account",
    title: "Tài khoản",
    icon: "person",
  },
];

const AddProductButton = () => (
  <TouchableOpacity
    onPress={() => router.push("/(tabs)/products/add")}
    style={styles.addButton}
  >
    <Text style={styles.addButtonText}>+</Text>
  </TouchableOpacity>
);

const TabIcon = ({ 
  name, 
  color, 
  size 
}: { 
  name: keyof typeof Ionicons.glyphMap; 
  color: string; 
  size: number; 
}) => (
  <Ionicons name={name} color={color} size={size} />
);

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: true,
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: COLORS.inactive,
      }}
    >
      {TAB_CONFIG.map((tab) => (
        <Tabs.Screen
          key={tab.name}
          name={tab.name}
          options={{
            title: tab.title,
            tabBarIcon: ({ color, size }) => (
              <TabIcon name={tab.icon} color={color} size={size} />
            ),
            ...(tab.hasHeaderButton && {
              headerRight: () => <AddProductButton />,
            }),
          }}
        />
      ))}
    </Tabs>
  );
}

const styles = StyleSheet.create({
  addButton: {
    backgroundColor: COLORS.success,
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 6,
  },
  addButtonText: {
    color: COLORS.white,
    fontSize: 22,
    marginTop: -2,
  },
});
