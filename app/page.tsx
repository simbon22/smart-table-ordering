'use client';

import { useState } from 'react';
import { ShoppingCart } from 'lucide-react';
import { Toaster } from 'sonner';
import { MenuItem } from '@/components/MenuItems';
import { CartDrawer } from '@/components/CartDrawer';
import { menu } from '@/data/menu';
import { useCart } from '@/hooks/useCart';

const STEPS = [
  {
    num: '01',
    title: 'Inquadra il QR',
    desc: 'È sul tavolo, zero download',
    icon: <><rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" /><rect x="3" y="14" width="7" height="7" /></>,
  },
  {
    num: '02',
    title: 'Scegli in pochi tap',
    desc: 'Foto vere, zero sorprese',
    icon: <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />,
  },
  {
    num: '03',
    title: 'Paga quando vuoi',
    desc: 'Direttamente dal telefono',
    icon: <><rect x="2" y="5" width="20" height="14" rx="1" /><line x1="2" y1="10" x2="22" y2="10" /></>,
  },
];

export default function Home() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { items, addToCart, updateQuantity, removeFromCart, clearCart, total, itemCount } = useCart();

  return (
    <>
      <nav className="sticky top-0 z-50 bg-[var(--bg-0)]/90 backdrop-blur-sm border-b-2 border-[var(--border-strong)]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-3 sm:py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-[10px] bg-[var(--red)] flex items-center justify-center shrink-0">
              <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.2">
                <rect x="3" y="3" width="6" height="6" rx="1" /><rect x="15" y="3" width="6" height="6" rx="1" /><rect x="3" y="15" width="6" height="6" rx="1" />
              </svg>
            </div>
            <span className="font-display text-lg sm:text-xl tracking-tight">
              SMART<span className="text-[var(--red)]">TABLE</span>
            </span>
            <span className="font-mono-tag text-[10px] sm:text-[11px] bg-[var(--mustard)] text-[var(--ink)] px-2.5 py-1 rounded-md">
              TAVOLO 12
            </span>
          </div>
          <button
            onClick={() => setIsCartOpen(true)}
            className="relative w-10 h-10 rounded-[10px] border-2 border-[var(--border-strong)] bg-[var(--surface-1)] flex items-center justify-center"
          >
            <ShoppingCart size={17} className="text-[var(--ink)]" />
            {itemCount > 0 && (
              <span className="absolute -top-2 -right-2 w-[19px] h-[19px] rounded-full bg-[var(--red)] text-white font-mono-tag text-[9.5px] flex items-center justify-center border-2 border-[var(--bg-0)]">
                {itemCount}
              </span>
            )}
          </button>
        </div>
      </nav>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        {/* Hero */}
        <div className="mb-14 sm:mb-16">
          <div className="inline-flex items-center gap-2 font-mono-tag text-[11px] tracking-wide text-[var(--text-secondary)] bg-[var(--surface-1)] border-[1.5px] border-[var(--border-strong)] rounded-full px-3.5 py-1.5 mb-6">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="var(--red)" strokeWidth="2">
              <rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" /><rect x="3" y="14" width="7" height="7" />
            </svg>
            NIENTE FILA, NIENTE APP
          </div>
          <h1 className="font-display text-4xl sm:text-5xl md:text-[52px] leading-[1.05] tracking-tight mb-5 max-w-xl">
            Zero code.<br />Tutto dal <span className="text-[var(--red)]">tavolo</span>.
          </h1>
          <p className="text-[var(--text-secondary)] text-base sm:text-lg max-w-md leading-relaxed mb-8">
            Inquadra il QR, scegli dal menu, paga quando vuoi. Comodo, semplice, veloce — senza passare dalla cassa.
          </p>

          <div className="inline-flex border-2 border-[var(--border-strong)] rounded-2xl overflow-hidden">
            {[
              { b: '1', s: 'QR per tavolo' },
              { b: '0', s: 'App da installare' },
              { b: 'Live', s: 'Ordine in cucina' },
            ].map((t, i) => (
              <div key={i} className={`px-5 sm:px-6 py-3.5 text-center ${i < 2 ? 'border-r-[1.5px] border-[var(--border)]' : ''}`}>
                <b className="block font-display text-lg sm:text-xl text-[var(--red)]">{t.b}</b>
                <span className="font-mono-tag text-[9px] sm:text-[9.5px] text-[var(--text-secondary)] uppercase tracking-wide">{t.s}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Come funziona */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-16 sm:mb-20">
          {STEPS.map((step) => (
            <div key={step.num} className="border-2 border-[var(--border-strong)] rounded-2xl bg-[var(--surface-1)] p-5 sm:p-[22px]">
              <div className="font-mono-tag text-[11px] text-[var(--text-secondary)] mb-3.5">{step.num}</div>
              <div className="w-9 h-9 sm:w-[38px] sm:h-[38px] rounded-[10px] bg-[var(--mustard)] flex items-center justify-center mb-3.5">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--ink)" strokeWidth="2">{step.icon}</svg>
              </div>
              <h3 className="font-semibold text-[15px] sm:text-[15.5px]">{step.title}</h3>
              <p className="text-[12.5px] text-[var(--text-secondary)] mt-0.5 leading-snug">{step.desc}</p>
            </div>
          ))}
        </div>

        {/* Menu */}
        {['Antipasti', 'Pizze', 'Bevande', 'Dolci'].map((category, catIdx) => (
          <div key={category} className="mb-12 sm:mb-14">
            <div className="flex items-baseline justify-between mb-5">
              <h2 className="font-display text-2xl sm:text-[26px] tracking-tight">{category.toUpperCase()}</h2>
              <span className="font-mono-tag text-[11px] text-[var(--text-secondary)]">
                {menu.filter(item => item.category === category).length} ELEMENTI
              </span>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              {menu.filter(item => item.category === category).map((product, idx) => (
                <div key={product.id} className="animate-in-stagger" style={{ animationDelay: `${catIdx * 100 + idx * 50}ms` }}>
                  <MenuItem product={product} onAddToCart={addToCart} />
                </div>
              ))}
            </div>
          </div>
        ))}
      </main>

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={items}
        total={total}
        updateQuantity={updateQuantity}
        removeFromCart={removeFromCart}
        clearCart={clearCart}
      />

      <Toaster position="bottom-center" richColors />

      <footer className="py-8 text-center border-t-2 border-[var(--border-strong)] mt-12">
        <p className="font-mono-tag text-[11px] text-[var(--text-secondary)] tracking-wide px-4">
          Progetto dimostrativo — Smart Table · Pizzalandia
        </p>
      </footer>
    </>
  );
}
