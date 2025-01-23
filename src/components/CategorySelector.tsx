import { Category } from '@/types';
import { Button } from '@/components/ui/button';

interface CategorySelectorProps {
  categories: Category[];
  selectedCategory: number | null;
  onSelectCategory: (categoryId: number) => void;
}

export const CategorySelector = ({ 
  categories, 
  selectedCategory, 
  onSelectCategory 
}: CategorySelectorProps) => {
  return (
    <div className="flex gap-2 overflow-x-auto p-4 bg-white shadow-sm">
      {categories.map(category => (
        <Button
          key={category.category_id}
          variant={selectedCategory === category.category_id ? "default" : "outline"}
          onClick={() => onSelectCategory(category.category_id)}
          className="whitespace-nowrap"
        >
          {category.name}
        </Button>
      ))}
    </div>
  );
};