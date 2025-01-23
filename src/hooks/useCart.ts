import { useState } from 'react';
import { CartItem, Product } from '@/types';
import { useToast } from '@/components/ui/use-toast';

export const useCart = () => {
  const [items, setItems] = useState<CartItem[]>([]);
  const { toast } = useToast();

  const addToCart = (product: Product, quantity: number = 1, customizations?: string[]) => {
    if (product.stock_quantity < quantity) {
      toast({
        title: "Stock insuffisant",
        description: "La quantité demandée n'est pas disponible",
        variant: "destructive",
      });
      return;
    }

    setItems(prev => {
      const existingItem = prev.find(item => 
        item.product.product_id === product.product_id &&
        JSON.stringify(item.customizations) === JSON.stringify(customizations)
      );

      if (existingItem) {
        return prev.map(item => 
          item === existingItem
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }

      return [...prev, { product, quantity, customizations }];
    });

    toast({
      title: "Produit ajouté",
      description: `${product.name} a été ajouté au panier`,
    });
  };

  const removeFromCart = (index: number) => {
    setItems(prev => prev.filter((_, i) => i !== index));
  };

  const updateQuantity = (index: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(index);
      return;
    }

    setItems(prev => 
      prev.map((item, i) => 
        i === index ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const total = items.reduce((sum, item) => 
    sum + (item.product.price * item.quantity), 0
  );

  return {
    items,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    total,
  };
};