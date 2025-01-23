import { useQuery } from '@tanstack/react-query';
import { Product, Category } from '@/types';

const API_URL = 'http://localhost:3001/api';

const fetchCategories = async (): Promise<Category[]> => {
  const response = await fetch(`${API_URL}/categories`);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};

const fetchProducts = async (): Promise<Product[]> => {
  const response = await fetch(`${API_URL}/products`);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};

const fetchProductsByCategory = async (categoryId: number): Promise<Product[]> => {
  const response = await fetch(`${API_URL}/products/category/${categoryId}`);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
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
    const { data = [] } = useQuery({
      queryKey: ['products', categoryId],
      queryFn: () => fetchProductsByCategory(categoryId),
    });
    return data;
  };

  return {
    categories,
    products,
    getProductsByCategory,
  };
};