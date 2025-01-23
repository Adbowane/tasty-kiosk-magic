import { CartItem } from '@/types';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Minus, Plus, Trash2 } from 'lucide-react';

interface CartProps {
  items: CartItem[];
  onUpdateQuantity: (index: number, quantity: number) => void;
  onRemove: (index: number) => void;
  total: number;
  onCheckout: () => void;
}

export const Cart = ({ 
  items, 
  onUpdateQuantity, 
  onRemove, 
  total,
  onCheckout 
}: CartProps) => {
  return (
    <div className="w-full md:w-96 bg-white shadow-lg flex flex-col h-full animate-slideIn">
      <div className="p-4 border-b">
        <h2 className="text-xl font-semibold">Votre commande</h2>
      </div>
      
      <ScrollArea className="flex-1 p-4">
        {items.length === 0 ? (
          <p className="text-center text-gray-500">Votre panier est vide</p>
        ) : (
          <div className="space-y-4">
            {items.map((item, index) => (
              <div key={index} className="flex items-start gap-4 p-2 border rounded-lg">
                <img
                  src={item.product.image_url}
                  alt={item.product.name}
                  className="w-20 h-20 object-cover rounded"
                />
                <div className="flex-1">
                  <h3 className="font-medium">{item.product.name}</h3>
                  <p className="text-sm text-gray-600">
                    {(item.product.price * item.quantity).toFixed(2)} €
                  </p>
                  {item.customizations?.length > 0 && (
                    <p className="text-sm text-gray-500">
                      {item.customizations.join(", ")}
                    </p>
                  )}
                  <div className="flex items-center gap-2 mt-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => onUpdateQuantity(index, item.quantity - 1)}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="w-8 text-center">{item.quantity}</span>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => onUpdateQuantity(index, item.quantity + 1)}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="ml-auto text-red-500"
                      onClick={() => onRemove(index)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </ScrollArea>

      <div className="p-4 border-t">
        <div className="flex justify-between items-center mb-4">
          <span className="font-semibold">Total</span>
          <span className="text-xl font-bold">{total.toFixed(2)} €</span>
        </div>
        <Button 
          className="w-full"
          size="lg"
          disabled={items.length === 0}
          onClick={onCheckout}
        >
          Commander
        </Button>
      </div>
    </div>
  );
};