import { useQuery } from '@tanstack/react-query';
import { Product, Category } from '@/types';

// Simulated data for demo
const mockCategories: Category[] = [
  { category_id: 1, name: "Burgers", description: "Nos délicieux burgers", is_active: true },
  { category_id: 2, name: "Boissons", description: "Rafraîchissements", is_active: true },
  { category_id: 3, name: "Desserts", description: "Pour les gourmands", is_active: true },
];

const mockProducts: Product[] = [
  {
    product_id: 1,
    category_id: 1,
    name: "Classic Burger",
    description: "Notre burger signature",
    price: 8.99,
    image_url: "/placeholder.svg",
    preparation_time: 10,
    calories: 650,
    is_vegetarian: false,
    is_gluten_free: false,
    stock_quantity: 50,
  },
  // Add more mock products as needed
];

export const useProducts = () => {
  const { data: categories = [] } = useQuery({
    queryKey: ['categories'],
    queryFn: async () => mockCategories,
  });

  const { data: products = [] } = useQuery({
    queryKey: ['products'],
    queryFn: async () => mockProducts,
  });

  const getProductsByCategory = (categoryId: number) => {
    return products.filter(product => product.category_id === categoryId);
  };

  return {
    categories,
    products,
    getProductsByCategory,
  };
};