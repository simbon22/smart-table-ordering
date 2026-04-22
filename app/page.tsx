'use client';

import { useState, useEffect } from 'react';
import { ShoppingCart, Smartphone, QrCode, CreditCard, Sparkles, ArrowRight } from 'lucide-react';
import { Toaster } from 'sonner';
import { MenuItem } from '@/components/MenuItems';
import { CartDrawer } from '@/components/CartDrawer';
import { menu } from '@/data/menu';
import { useCart } from '@/hooks/useCart';

export default function Home() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { items, addToCart, updateQuantity, removeFromCart, clearCart, total, itemCount } = useCart();
  const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: (e.clientX / window.innerWidth) * 100, y: (e.clientY / window.innerHeight) * 100 });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <>
      <div className="glow-mouse" style={{ '--mouse-x': `${mousePosition.x}%`, '--mouse-y': `${mousePosition.y}%` } as React.CSSProperties} />
      
      <nav className="sticky top-0 z-50 glass-nav">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 sm:py-4 flex justify-between items-center">
          <div className="flex items-baseline gap-2 sm:gap-3">
            <span className="text-xl sm:text-2xl font-bold tracking-tight bg-gradient-to-r from-gray-800 to-gray-500 bg-clip-text text-transparent">Smart<span className="text-rose-500 bg-none">Table</span></span>
            <span className="text-[10px] sm:text-[11px] font-mono text-rose-400 bg-rose-50/80 px-1.5 sm:px-2 py-0.5 rounded-full backdrop-blur-sm">Pizzalandia</span>
          </div>
          <button onClick={() => setIsCartOpen(true)} className="relative p-1.5 sm:p-2 rounded-full hover:bg-gray-100/80 transition-all duration-300 group">
            <ShoppingCart size={18} className="text-gray-600 group-hover:scale-105 transition" />
            {itemCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-rose-500 text-white text-[9px] sm:text-[10px] font-bold rounded-full w-4 h-4 sm:w-5 sm:h-5 flex items-center justify-center shadow-lg ring-2 ring-white">
                {itemCount}
              </span>
            )}
          </button>
        </div>
      </nav>

      <main className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        {/* Hero section con QR animato */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-24 relative">
          {/* QR Code decorativo fluttuante */}
          <div className="absolute -top-8 -right-8 w-20 h-20 opacity-30 animate-pulse pointer-events-none hidden sm:block">
            <svg viewBox="0 0 100 100" fill="none">
              <rect x="20" y="20" width="60" height="60" stroke="#f43f5e" strokeWidth="2" fill="none" />
              <rect x="30" y="30" width="10" height="10" fill="#f43f5e" />
              <rect x="50" y="30" width="10" height="10" fill="#f43f5e" />
              <rect x="70" y="30" width="10" height="10" fill="#f43f5e" />
              <rect x="30" y="50" width="10" height="10" fill="#f43f5e" />
              <rect x="50" y="50" width="10" height="10" fill="#f43f5e" />
              <rect x="70" y="50" width="10" height="10" fill="#f43f5e" />
              <rect x="30" y="70" width="10" height="10" fill="#f43f5e" />
              <rect x="50" y="70" width="10" height="10" fill="#f43f5e" />
              <rect x="70" y="70" width="10" height="10" fill="#f43f5e" />
            </svg>
          </div>
          
          <div className="inline-flex items-center gap-1.5 sm:gap-2 bg-white/60 backdrop-blur-sm rounded-full px-3 sm:px-4 py-1 text-xs sm:text-sm text-gray-600 shadow-sm border border-white/40 mb-5 sm:mb-6 animate-float">
            <Smartphone size={12} className="text-rose-500" />
            Scansiona il QR sul tavolo
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight bg-gradient-to-r from-gray-900 via-gray-700 to-gray-500 bg-clip-text text-transparent leading-tight">
            Ordina senza<br className="hidden sm:block" /> alzarti
          </h1>
          <p className="text-gray-500 mt-4 sm:mt-6 text-base sm:text-lg max-w-md mx-auto px-4">
            Sfoglia il menu, personalizza e paga con un tap.
          </p>
          <div className="mt-6 sm:mt-8 flex justify-center">
            <div className="px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-rose-50 text-rose-600 text-xs sm:text-sm font-medium flex items-center gap-1 shadow-sm">
              <Sparkles size={12} /> QR dinamico attivo
            </div>
          </div>
        </div>

        {/* Come funziona */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-8 mb-20 sm:mb-28">
          {[
            { icon: QrCode, title: 'Inquadra il QR', desc: 'Sul tavolo', color: 'from-rose-50 to-rose-100', iconColor: 'text-rose-500' },
            { icon: ShoppingCart, title: 'Scegli dal menu', desc: 'Aggiungi', color: 'from-amber-50 to-amber-100', iconColor: 'text-amber-500' },
            { icon: CreditCard, title: 'Paga in un tap', desc: 'Apple/Google Pay', color: 'from-emerald-50 to-emerald-100', iconColor: 'text-emerald-500' }
          ].map((step, idx) => (
            <div key={idx} className="group relative bg-white/50 backdrop-blur-sm rounded-2xl p-5 sm:p-6 text-center shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-2 border border-white/40">
              <div className={`w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br ${step.color} ${step.iconColor} flex items-center justify-center mx-auto mb-4 shadow-md group-hover:scale-110 transition-transform duration-300`}>
                <step.icon size={24} strokeWidth={1.5} />
              </div>
              <h3 className="font-semibold text-gray-800 text-base sm:text-lg">{step.title}</h3>
              <p className="text-gray-400 text-xs sm:text-sm mt-1">{step.desc}</p>
            </div>
          ))}
        </div>

        {/* Menu */}
        {['Pizze', 'Bevande', 'Dolci'].map((category, catIdx) => (
          <div key={category} className="mb-12 sm:mb-16">
            <div className="flex items-baseline justify-between border-b border-gray-200/60 pb-2 sm:pb-3 mb-5 sm:mb-7">
              <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-gray-800">{category}</h2>
              <span className="text-xs sm:text-sm text-gray-400 font-mono">{menu.filter(item => item.category === category).length} elementi</span>
            </div>
            <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
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

      <footer className="relative z-10 py-6 sm:py-8 text-center border-t border-gray-100/80 mt-12 sm:mt-20 bg-white/30 backdrop-blur-sm">
        <p className="text-[10px] sm:text-xs text-gray-400 tracking-wide px-4">
          Smart Table Ordering — Pizzalandia • Rione Alto, Napoli
        </p>
      </footer>
    </>
  );
}