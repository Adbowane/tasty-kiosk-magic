import { useState } from 'react';
import { Product } from '@/types';
import { useProducts } from '@/hooks/useProducts';
import { ProductCard } from './ProductCard';
import { CategorySelector } from './CategorySelector';

interface ProductCatalogProps {
  onAddToCart: (product: Product) => void;
  onCustomize: (product: Product) => void;
}

export const ProductCatalog = ({ onAddToCart, onCustomize }: ProductCatalogProps) => {
  const { categories, getProductsByCategory } = useProducts();
  const [selectedCategory, setSelectedCategory] = useState<number | null>(
    categories[0]?.category_id ?? null
  );

  const displayedProducts = selectedCategory 
    ? getProductsByCategory(selectedCategory)
    : [];

  return (
    <div className="flex-1 overflow-hidden flex flex-col">
      <CategorySelector
        categories={categories}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
      />
      <div className="flex-1 overflow-y-auto p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {displayedProducts.map(product => (
          <ProductCard
            key={product.product_id}
            product={product}
            onAddToCart={onAddToCart}
            onCustomize={onCustomize}
          />
        ))}
      </div>
    </div>
  );
};