import { useState } from 'react';
import { Product } from '@/types';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';

interface CustomizationModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (product: Product, customizations: string[]) => void;
}

export const CustomizationModal = ({
  product,
  isOpen,
  onClose,
  onConfirm,
}: CustomizationModalProps) => {
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

  // Mock options for demo
  const options = [
    "Sans oignon",
    "Sans tomate",
    "Sans sauce",
    "Double fromage",
  ];

  const handleConfirm = () => {
    if (product) {
      onConfirm(product, selectedOptions);
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Personnaliser {product?.name}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          {options.map((option) => (
            <div key={option} className="flex items-center space-x-2">
              <Checkbox
                id={option}
                checked={selectedOptions.includes(option)}
                onCheckedChange={(checked) => {
                  setSelectedOptions(prev =>
                    checked
                      ? [...prev, option]
                      : prev.filter(o => o !== option)
                  );
                }}
              />
              <label
                htmlFor={option}
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {option}
              </label>
            </div>
          ))}
        </div>
        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={onClose}>
            Annuler
          </Button>
          <Button onClick={handleConfirm}>
            Confirmer
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};