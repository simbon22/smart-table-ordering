'use client';

import { useState } from 'react';
import { X, Trash2, CreditCard, ShoppingBag, ArrowRight, Check } from 'lucide-react';
import { toast } from 'sonner';
import { CartItem } from '@/hooks/useCart';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  total: number;
  updateQuantity: (productId: string, quantity: number) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
}

export function CartDrawer({
  isOpen,
  onClose,
  items,
  total,
  updateQuantity,
  removeFromCart,
  clearCart,
}: CartDrawerProps) {
  const [showSuccess, setShowSuccess] = useState(false);

  if (!isOpen) return null;

  const handleCheckout = () => {
    setShowSuccess(true);
    setTimeout(() => {
      toast.success('Pagamento effettuato!', {
        description: `€${total.toFixed(2)} - Riceverai la conferma via SMS`,
        duration: 4000,
        icon: '🍕',
        style: { background: '#1f2937', color: '#fff', border: '1px solid #10b981' },
      });
      clearCart();
      onClose();
      setShowSuccess(false);
    }, 800);
  };

  return (
    <>
      <div className="fixed inset-0 bg-black/30 backdrop-blur-md z-50 transition-all duration-300 animate-in fade-in" onClick={onClose} />
      <div className="fixed right-0 top-0 h-full w-full max-w-md bg-white/95 backdrop-blur-xl shadow-2xl z-50 flex flex-col animate-in slide-in-from-right duration-500">
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <ShoppingBag size={20} className="text-rose-500" />
            <h2 className="text-xl font-semibold text-gray-800">Il tuo ordine</h2>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-transform hover:scale-110">
            <X size={22} />
          </button>
        </div>

        <div className="flex-1 overflow-auto p-6 space-y-5">
          {items.length === 0 ? (
            <div className="text-center py-16">
              <ShoppingBag size={48} className="mx-auto text-gray-200 mb-4" />
              <p className="text-gray-400 text-sm">Carrello vuoto</p>
            </div>
          ) : (
            items.map(({ product, quantity }) => (
              <div key={product.id} className="flex gap-4 pb-5 border-b border-gray-50 group transition-all hover:bg-gray-50/50 rounded-xl p-2 -mx-2">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-rose-100 to-rose-200 flex-shrink-0 shadow-inner" />
                <div className="flex-1">
                  <div className="flex justify-between">
                    <p className="font-medium text-gray-700">{product.name}</p>
                    <p className="text-sm font-medium text-gray-600">€{(product.price * quantity).toFixed(2)}</p>
                  </div>
                  <div className="flex items-center justify-between mt-3">
                    <div className="flex items-center gap-3 bg-gray-50 rounded-full p-1">
                      <button
                        onClick={() => updateQuantity(product.id, quantity - 1)}
                        className="w-7 h-7 rounded-full bg-white shadow-sm text-gray-500 hover:text-rose-500 transition-all duration-200 active:scale-95"
                      >
                        -
                      </button>
                      <span className="text-sm text-gray-700 w-6 text-center font-medium">{quantity}</span>
                      <button
                        onClick={() => updateQuantity(product.id, quantity + 1)}
                        className="w-7 h-7 rounded-full bg-white shadow-sm text-gray-500 hover:text-rose-500 transition-all duration-200 active:scale-95"
                      >
                        +
                      </button>
                    </div>
                    <button
                      onClick={() => removeFromCart(product.id)}
                      className="text-gray-300 hover:text-red-400 transition-all p-1 rounded-full hover:bg-red-50"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {items.length > 0 && (
          <div className="p-6 border-t border-gray-100 bg-white/80 backdrop-blur-md relative">
            <div className="flex justify-between items-center mb-5">
              <span className="text-gray-500 text-sm">Totale</span>
              <span className="text-2xl font-bold text-gray-800">€{total.toFixed(2)}</span>
            </div>
            <button
              onClick={handleCheckout}
              className="relative w-full py-3.5 rounded-full bg-gradient-to-r from-rose-500 to-rose-600 text-white font-medium shadow-md hover:shadow-xl transition-all duration-300 active:scale-95 flex items-center justify-center gap-2 group overflow-hidden"
            >
              <CreditCard size={18} />
              Procedi al pagamento
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              
              {showSuccess && (
                <div className="absolute inset-0 bg-white/95 backdrop-blur-sm flex items-center justify-center gap-2 animate-in fade-in duration-200">
                  <div className="w-5 h-5 rounded-full bg-emerald-500 flex items-center justify-center shadow-md animate-in zoom-in">
                    <Check size={12} className="text-white" />
                  </div>
                  <span className="text-sm font-medium text-emerald-700">Ordine inviato</span>
                </div>
              )}
            </button>
          </div>
        )}
      </div>
    </>
  );
}