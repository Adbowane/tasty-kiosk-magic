import { useState } from 'react';
import { Product } from '@/types';
import { ProductCatalog } from '@/components/ProductCatalog';
import { Cart } from '@/components/Cart';
import { CustomizationModal } from '@/components/CustomizationModal';
import { PaymentSection } from '@/components/PaymentSection';
import { useCart } from '@/hooks/useCart';
import { useToast } from '@/components/ui/use-toast';

const Index = () => {
  const { items, addToCart, removeFromCart, updateQuantity, clearCart, total } = useCart();
  const { toast } = useToast();
  const [customizeProduct, setCustomizeProduct] = useState<Product | null>(null);
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);

  const handleCustomization = (product: Product) => {
    setCustomizeProduct(product);
  };

  const handleCustomizationConfirm = (product: Product, customizations: string[]) => {
    addToCart(product, 1, customizations);
  };

  const handlePaymentComplete = () => {
    toast({
      title: "Commande confirmée",
      description: "Votre commande a été enregistrée avec succès",
    });
    clearCart();
  };

  return (
    <div className="min-h-screen bg-gray-100 flex">
      <ProductCatalog
        onAddToCart={(product) => addToCart(product)}
        onCustomize={handleCustomization}
      />
      <Cart
        items={items}
        onUpdateQuantity={updateQuantity}
        onRemove={removeFromCart}
        total={total}
        onCheckout={() => setIsPaymentOpen(true)}
      />
      <CustomizationModal
        product={customizeProduct}
        isOpen={customizeProduct !== null}
        onClose={() => setCustomizeProduct(null)}
        onConfirm={handleCustomizationConfirm}
      />
      <PaymentSection
        isOpen={isPaymentOpen}
        onClose={() => setIsPaymentOpen(false)}
        amount={total}
        onPaymentComplete={handlePaymentComplete}
      />
    </div>
  );
};

export default Index;