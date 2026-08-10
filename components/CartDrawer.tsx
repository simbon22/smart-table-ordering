'use client';

import { useState } from 'react';
import { X, Trash2, ShoppingBag } from 'lucide-react';
import { CartItem } from '@/hooks/useCart';
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
        className="fixed inset-0 bg-[var(--ink)]/50 backdrop-blur-sm z-50"
        onClick={onClose}
      />
      <motion.div
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ type: 'spring', damping: 28, stiffness: 220 }}
        className="fixed right-0 top-0 h-full w-full max-w-md bg-[var(--bg-0)] shadow-2xl z-50 flex flex-col border-l-2 border-[var(--border-strong)]"
      >
        <div className="flex items-center justify-between p-5 border-b-2 border-[var(--border-strong)]">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-[10px] bg-[var(--red)] flex items-center justify-center">
              <ShoppingBag size={16} className="text-white" />
            </div>
            <div>
              <h2 className="font-display text-lg tracking-tight">Il tuo ordine</h2>
              <p className="font-mono-tag text-[10.5px] text-[var(--text-secondary)]">{items.length} prodotti</p>
            </div>
          </div>
          <button onClick={onClose} className="text-[var(--text-secondary)] hover:text-[var(--ink)] transition">
            <X size={22} />
          </button>
        </div>

        <div className="flex-1 overflow-auto p-5 space-y-3">
          <AnimatePresence mode="popLayout">
            {items.length === 0 ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center py-16"
              >
                <ShoppingBag size={44} className="mx-auto text-[var(--border)] mb-4" />
                <p className="text-[var(--text-secondary)] text-sm">Carrello vuoto</p>
                <p className="font-mono-tag text-[11px] text-[var(--border-strong)]/60 mt-1">
                  Aggiungi qualcosa dal menu
                </p>
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
                  className={`flex gap-3.5 pb-3.5 border-b border-[var(--border)] ${
                    removingId === product.id ? 'opacity-0' : ''
                  }`}
                >
                  <div className="relative w-14 h-14 rounded-[10px] overflow-hidden bg-[var(--surface-1)] border-2 border-[var(--border-strong)] shrink-0">
                    <img
                      src={`/${product.image}.jpg`}
                      alt={product.name}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between gap-2">
                      <p className="font-semibold text-sm">{product.name}</p>
                      <p className="font-mono-tag text-sm text-[var(--red)] whitespace-nowrap">
                        €{(product.price * quantity).toFixed(2)}
                      </p>
                    </div>
                    <div className="flex items-center justify-between mt-2.5">
                      <div className="flex items-center border-[1.5px] border-[var(--border-strong)] rounded-full overflow-hidden">
                        <button
                          onClick={() => updateQuantity(product.id, quantity - 1)}
                          className="w-7 h-7 flex items-center justify-center text-sm active:scale-95 transition"
                        >
                          –
                        </button>
                        <span className="text-xs w-6 text-center font-mono-tag">{quantity}</span>
                        <button
                          onClick={() => updateQuantity(product.id, quantity + 1)}
                          className="w-7 h-7 flex items-center justify-center text-sm active:scale-95 transition"
                        >
                          +
                        </button>
                      </div>
                      <button
                        onClick={() => handleRemove(product.id)}
                        className="text-[var(--border-strong)]/40 hover:text-[var(--red)] transition p-1"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))
            )}
          </AnimatePresence>
        </div>

        {items.length > 0 && (
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="p-5 border-t-2 border-[var(--border-strong)] bg-[var(--surface-1)]"
          >
            <div className="flex justify-between items-center mb-4">
              <span className="text-[var(--text-secondary)] text-sm">Totale</span>
              <div className="text-right">
                <span className="font-display text-2xl">€{total.toFixed(2)}</span>
                <p className="font-mono-tag text-[10px] text-[var(--text-secondary)]">IVA inclusa</p>
              </div>
            </div>
            <button
              onClick={() => setIsCheckoutOpen(true)}
              className="w-full bg-[var(--ink)] hover:bg-[var(--red)] text-white py-3.5 rounded-2xl font-semibold text-sm transition-colors"
            >
              Vai al pagamento
            </button>
            <p className="text-center font-mono-tag text-[10px] text-[var(--text-secondary)] mt-3">
              Ambiente demo — nessun pagamento reale
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
