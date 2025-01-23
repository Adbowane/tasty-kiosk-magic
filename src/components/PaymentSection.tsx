import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { CreditCard, Banknote } from 'lucide-react';

interface PaymentSectionProps {
  isOpen: boolean;
  onClose: () => void;
  amount: number;
  onPaymentComplete: () => void;
}

export const PaymentSection = ({
  isOpen,
  onClose,
  amount,
  onPaymentComplete,
}: PaymentSectionProps) => {
  const handlePayment = (method: 'CARD' | 'CASH') => {
    // Simulate payment processing
    setTimeout(() => {
      onPaymentComplete();
      onClose();
    }, 1500);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Choisissez votre mode de paiement</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <p className="text-center text-2xl font-bold">
            Total : {amount.toFixed(2)} €
          </p>
          <div className="grid grid-cols-2 gap-4">
            <Button
              size="lg"
              className="h-32"
              onClick={() => handlePayment('CARD')}
            >
              <div className="flex flex-col items-center gap-2">
                <CreditCard className="h-8 w-8" />
                <span>Carte Bancaire</span>
              </div>
            </Button>
            <Button
              size="lg"
              className="h-32"
              onClick={() => handlePayment('CASH')}
            >
              <div className="flex flex-col items-center gap-2">
                <Banknote className="h-8 w-8" />
                <span>Espèces</span>
              </div>
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};