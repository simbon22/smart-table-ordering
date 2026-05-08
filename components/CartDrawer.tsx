'use client';

import { useState } from 'react';
import { X, Trash2, ShoppingBag, CreditCard, Sparkles } from 'lucide-react';
import { toast } from 'sonner';
import { CartItem } from '@/hooks/useCart';
import { Button } from './ui/button';
import { CheckoutDrawer } from './CheckoutDrawer';
import { motion, AnimatePresence } from 'framer-motion';

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
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [removingId, setRemovingId] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleRemove = (id: string) => {
    setRemovingId(id);
    setTimeout(() => {
      removeFromCart(id);
      setRemovingId(null);
    }, 200);
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 backdrop-blur-md z-50"
        onClick={onClose}
      />
      <motion.div
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        className="fixed right-0 top-0 h-full w-full max-w-md bg-white/90 backdrop-blur-2xl shadow-2xl z-50 flex flex-col border-l border-white/20"
      >
        {/* Header con gradiente */}
        <div className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-rose-500/10 to-amber-500/10" />
          <div className="relative flex items-center justify-between p-6 border-b border-gray-100/50">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-rose-500 to-amber-500 flex items-center justify-center shadow-lg">
                <ShoppingBag size={16} className="text-white" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-800">Il tuo ordine</h2>
                <p className="text-xs text-gray-400 mt-0.5">{items.length} prodotti</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-all hover:scale-110 active:scale-95"
            >
              <X size={22} />
            </button>
          </div>
        </div>

        {/* Items con animazione e IMMAGINI */}
        <div className="flex-1 overflow-auto p-6 space-y-4">
          <AnimatePresence mode="popLayout">
            {items.length === 0 ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center py-16"
              >
                <ShoppingBag size={48} className="mx-auto text-gray-200 mb-4" />
                <p className="text-gray-400 text-sm">Carrello vuoto</p>
                <p className="text-xs text-gray-300 mt-1">Aggiungi qualcosa dal menu</p>
              </motion.div>
            ) : (
              items.map(({ product, quantity }) => (
                <motion.div
                  key={product.id}
                  layout
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 50 }}
                  transition={{ duration: 0.2 }}
                  className={`flex gap-4 pb-4 border-b border-gray-100 group transition-all hover:bg-gray-50/50 rounded-xl p-2 -mx-2 ${
                    removingId === product.id ? 'opacity-0' : ''
                  }`}
                >
                  {/* IMMAGINE DEL PRODOTTO */}
                  <div className="relative w-14 h-14 rounded-xl overflow-hidden bg-gradient-to-br from-rose-100 to-amber-100 shrink-0 shadow-inner">
                    <img
                      src={`/${product.image}.jpg`}
                      alt={product.name}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between">
                      <p className="font-medium text-gray-800">{product.name}</p>
                      <p className="text-sm font-semibold text-gray-700">€{(product.price * quantity).toFixed(2)}</p>
                    </div>
                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center gap-2 bg-gray-100 rounded-full p-1">
                        <button
                          onClick={() => updateQuantity(product.id, quantity - 1)}
                          className="w-7 h-7 rounded-full bg-white shadow-sm text-gray-500 hover:text-rose-500 transition-all duration-200 hover:shadow active:scale-95"
                        >
                          -
                        </button>
                        <span className="text-sm text-gray-700 w-6 text-center font-medium">{quantity}</span>
                        <button
                          onClick={() => updateQuantity(product.id, quantity + 1)}
                          className="w-7 h-7 rounded-full bg-white shadow-sm text-gray-500 hover:text-rose-500 transition-all duration-200 hover:shadow active:scale-95"
                        >
                          +
                        </button>
                      </div>
                      <button
                        onClick={() => handleRemove(product.id)}
                        className="text-gray-300 hover:text-red-500 transition-all p-1 rounded-full hover:bg-red-50"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))
            )}
          </AnimatePresence>
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="p-6 border-t border-gray-100 bg-white/80 backdrop-blur-md"
          >
            <div className="flex justify-between items-center mb-5">
              <span className="text-gray-500 text-sm">Totale</span>
              <div className="text-right">
                <span className="text-2xl font-bold text-gray-800">€{total.toFixed(2)}</span>
                <p className="text-xs text-gray-400">IVA inclusa</p>
              </div>
            </div>
            <Button
              onClick={() => setIsCheckoutOpen(true)}
              className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2 py-6 text-base font-semibold group"
            >
              <CreditCard size={18} className="group-hover:scale-110 transition" />
              Procedi al pagamento sicuro
              <Sparkles size={14} className="opacity-70" />
            </Button>
            <p className="text-center text-[10px] text-gray-400 mt-3 flex items-center justify-center gap-1">
              <span className="w-1 h-1 bg-emerald-400 rounded-full" />
              Transazione protetta
              <span className="w-1 h-1 bg-emerald-400 rounded-full" />
            </p>
          </motion.div>
        )}
      </motion.div>

      <CheckoutDrawer
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        items={items}
        total={total}
        clearCart={clearCart}
      />
    </>
  );
}