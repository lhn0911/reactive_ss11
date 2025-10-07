export const COLORS = {
  primary: "#f70808ff",
  inactive: "#4e4b4bff",
  success: "#22c55e",
  warning: "#e4d20dff",
  danger: "#DC2626",
  gray: "#6B7280",
  lightGray: "#E5E7EB",
  white: "#fff",
  black: "#000",
  background: "#f5f5f5",
} as const;

export const PRODUCT_STATUS = {
  DRAFT: "draft",
  ACTIVE: "active", 
  STOPPED: "stopped",
} as const;

export const STATUS_CONFIG = {
  [PRODUCT_STATUS.DRAFT]: {
    label: "Chưa bán",
    color: COLORS.gray,
    bgColor: COLORS.lightGray,
  },
  [PRODUCT_STATUS.ACTIVE]: {
    label: "Đang bán", 
    color: COLORS.success,
    bgColor: "#DCFCE7",
  },
  [PRODUCT_STATUS.STOPPED]: {
    label: "Ngừng bán",
    color: COLORS.danger,
    bgColor: "#FEE2E2",
  },
} as const;

export const STORAGE_KEYS = {
  PRODUCTS: "@products_v1",
} as const;

export const VALIDATION_MESSAGES = {
  NAME_REQUIRED: "Tên không được để trống",
  PRICE_INVALID: "Giá phải là số > 0",
  QUANTITY_INVALID: "Số lượng phải là số > 0",
  NAME_EXISTS: "Tên sản phẩm đã tồn tại",
  UPDATE_SUCCESS: "Cập nhật thành công",
} as const;
