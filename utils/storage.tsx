import AsyncStorage from "@react-native-async-storage/async-storage";
import { STORAGE_KEYS } from "../constants";
import { Product, Products } from "../types";

export async function getProducts(): Promise<Products> {
  try {
    const data = await AsyncStorage.getItem(STORAGE_KEYS.PRODUCTS);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error("Error loading products:", error);
    return [];
  }
}

export async function saveProducts(products: Products): Promise<void> {
  try {
    await AsyncStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(products));
  } catch (error) {
    console.error("Error saving products:", error);
    throw error;
  }
}

export async function getProductById(id: string): Promise<Product | null> {
  try {
    const products = await getProducts();
    return products.find(product => product.id === id) || null;
  } catch (error) {
    console.error("Error getting product by id:", error);
    return null;
  }
}

export async function addProduct(product: Omit<Product, "id">): Promise<Product> {
  try {
    const products = await getProducts();
    const newProduct: Product = {
      ...product,
      id: Date.now().toString(),
    };
    const updatedProducts = [...products, newProduct];
    await saveProducts(updatedProducts);
    return newProduct;
  } catch (error) {
    console.error("Error adding product:", error);
    throw error;
  }
}

export async function updateProduct(id: string, updates: Partial<Product>): Promise<Product | null> {
  try {
    const products = await getProducts();
    const productIndex = products.findIndex(p => p.id === id);
    
    if (productIndex === -1) return null;
    
    const updatedProduct = { ...products[productIndex], ...updates };
    const updatedProducts = [...products];
    updatedProducts[productIndex] = updatedProduct;
    
    await saveProducts(updatedProducts);
    return updatedProduct;
  } catch (error) {
    console.error("Error updating product:", error);
    throw error;
  }
}

export async function deleteProduct(id: string): Promise<boolean> {
  try {
    const products = await getProducts();
    const updatedProducts = products.filter(p => p.id !== id);
    await saveProducts(updatedProducts);
    return true;
  } catch (error) {
    console.error("Error deleting product:", error);
    return false;
  }
}
