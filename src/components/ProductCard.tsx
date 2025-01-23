import { Product } from '@/types';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  onCustomize: (product: Product) => void;
}

export const ProductCard = ({ product, onAddToCart, onCustomize }: ProductCardProps) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105">
      <img 
        src={product.image_url} 
        alt={product.name}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-semibold">{product.name}</h3>
          <span className="text-primary font-bold">{product.price.toFixed(2)} €</span>
        </div>
        <p className="text-gray-600 text-sm mb-2">{product.description}</p>
        <div className="flex gap-2 mb-3">
          {product.is_vegetarian && (
            <Badge variant="secondary">Végétarien</Badge>
          )}
          {product.is_gluten_free && (
            <Badge variant="secondary">Sans Gluten</Badge>
          )}
        </div>
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            className="flex-1"
            onClick={() => onCustomize(product)}
          >
            Personnaliser
          </Button>
          <Button 
            className="flex-1"
            onClick={() => onAddToCart(product)}
            disabled={product.stock_quantity <= 0}
          >
            Ajouter
          </Button>
        </div>
      </div>
    </div>
  );
};