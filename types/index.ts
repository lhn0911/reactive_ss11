export interface Product {
  id: string;
  name: string;
  price: number;
  quantity: number;
  status: ProductStatus;
}

export type ProductStatus = "draft" | "active" | "stopped";

export interface ProductItemProps {
  product: Product;
  onPress: () => void;
  onDelete: () => void;
  onEdit: () => void;
}

export interface ConfirmModalProps {
  visible: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  title?: string;
  message?: string;
}

export interface SegmentItemProps {
  label: string;
  selected: boolean;
  color: string;
  onPress: () => void;
}

export interface FormInputProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder: string;
  keyboardType?: "default" | "numeric";
  style?: any;
}

export interface ProductDetailParams {
  id: string;
  mode?: "edit" | "view";
}

export type Products = Product[];
