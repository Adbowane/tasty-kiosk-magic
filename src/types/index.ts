export interface Product {
  product_id: number;
  category_id: number;
  name: string;
  description: string;
  price: number;
  image_url: string;
  preparation_time: number;
  calories: number;
  is_vegetarian: boolean;
  is_gluten_free: boolean;
  stock_quantity: number;
}

export interface Category {
  category_id: number;
  name: string;
  description: string;
  is_active: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
  customizations?: string[];
}