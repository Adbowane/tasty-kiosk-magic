import { useQuery } from '@tanstack/react-query';
import { Product, Category } from '@/types';

// Simulated data for demo
const mockCategories: Category[] = [
  { 
    category_id: 1, 
    name: "Burgers", 
    description: "Nos délicieux burgers", 
    is_active: true 
  },
  { 
    category_id: 2, 
    name: "Boissons", 
    description: "Rafraîchissements", 
    is_active: true 
  },
  { 
    category_id: 3, 
    name: "Desserts", 
    description: "Pour les gourmands", 
    is_active: true 
  },
];

const mockProducts: Product[] = [
  {
    product_id: 1,
    category_id: 1,
    name: "Classic Burger",
    description: "Notre burger signature avec steak haché, salade, tomate et sauce maison",
    price: 8.99,
    image_url: "/placeholder.svg",
    preparation_time: 10,
    calories: 650,
    is_vegetarian: false,
    is_gluten_free: false,
    stock_quantity: 50,
  },
  {
    product_id: 2,
    category_id: 1,
    name: "Cheese Burger",
    description: "Notre classic burger avec du cheddar fondu",
    price: 9.99,
    image_url: "/placeholder.svg",
    preparation_time: 10,
    calories: 750,
    is_vegetarian: false,
    is_gluten_free: false,
    stock_quantity: 45,
  },
  {
    product_id: 3,
    category_id: 2,
    name: "Coca Cola",
    description: "Coca Cola bien frais",
    price: 2.99,
    image_url: "/placeholder.svg",
    preparation_time: 1,
    calories: 140,
    is_vegetarian: true,
    is_gluten_free: true,
    stock_quantity: 100,
  },
  {
    product_id: 4,
    category_id: 3,
    name: "Sundae Chocolat",
    description: "Glace vanille avec sauce chocolat",
    price: 3.99,
    image_url: "/placeholder.svg",
    preparation_time: 2,
    calories: 350,
    is_vegetarian: true,
    is_gluten_free: true,
    stock_quantity: 30,
  },
];

// Simulated API calls
const fetchCategories = async (): Promise<Category[]> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  return mockCategories;
};

const fetchProducts = async (): Promise<Product[]> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  return mockProducts;
};

export const useProducts = () => {
  const { data: categories = [] } = useQuery({
    queryKey: ['categories'],
    queryFn: fetchCategories,
  });

  const { data: products = [] } = useQuery({
    queryKey: ['products'],
    queryFn: fetchProducts,
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