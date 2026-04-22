'use client';

import { useState } from 'react';
import { Plus, Minus } from 'lucide-react';
import { toast } from 'sonner';
import { Product } from '@/data/menu';

interface MenuItemProps {
  product: Product;
  onAddToCart: (product: Product, quantity: number) => void;
}

export function MenuItem({ product, onAddToCart }: MenuItemProps) {
  const [quantity, setQuantity] = useState(1);
  const [isHovered, setIsHovered] = useState(false);

  const handleAdd = () => {
    onAddToCart(product, quantity);
    toast.success(`${product.name} aggiunto al carrello`, {
      duration: 1500,
      icon: '🍕',
      style: { background: '#1f2937', color: '#fff', border: '1px solid #f43f5e' }
    });
    setQuantity(1);
  };

  return (
    <div
      className="group relative bg-white rounded-2xl shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-1 border border-gray-100/80 hover:border-rose-200/80 overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={`absolute inset-0 bg-gradient-to-r from-rose-200 via-rose-100 to-amber-100 opacity-0 transition-opacity duration-700 ${isHovered ? 'opacity-100' : ''}`} style={{ zIndex: -1 }} />
      
      <div className="relative flex items-start gap-3 sm:gap-5 p-3 sm:p-5 bg-white/90 backdrop-blur-sm rounded-2xl transition-all duration-300">
        {/* Immagine + badge popolarità */}
        <div className="relative overflow-hidden rounded-xl w-16 h-16 sm:w-20 sm:h-20 flex-shrink-0">
          <div className="absolute inset-0 bg-gradient-to-br from-rose-100 to-rose-200 transition-transform duration-700 group-hover:scale-110" />
          {product.popular && (
            <div className="absolute top-0 left-0 z-10 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-[9px] sm:text-[10px] font-bold px-1.5 sm:px-2 py-0.5 rounded-br-xl shadow-md flex items-center gap-1">
              🔥 Popolare
            </div>
          )}
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap justify-between items-start gap-2">
            <div>
              <h3 className="font-semibold text-gray-800 text-base sm:text-lg tracking-tight">{product.name}</h3>
              <p className="text-xs sm:text-sm text-gray-400 mt-0.5 line-clamp-1">{product.description}</p>
            </div>
            <span className="text-rose-500 font-bold text-base sm:text-lg">€{product.price.toFixed(2)}</span>
          </div>
          
          <div className="flex justify-end items-center gap-2 sm:gap-3 mt-3 sm:mt-4">
            <div className="flex items-center gap-1 bg-gray-50 rounded-full p-0.5 sm:p-1 shadow-inner">
              <button
                onClick={() => setQuantity(q => Math.max(1, q - 1))}
                className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white shadow-sm text-gray-500 hover:text-rose-500 transition-all duration-200 hover:shadow flex items-center justify-center active:scale-95"
              >
                <Minus size={12} />
              </button>
              <span className="w-6 text-center text-gray-700 font-medium text-sm">{quantity}</span>
              <button
                onClick={() => setQuantity(q => q + 1)}
                className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white shadow-sm text-gray-500 hover:text-rose-500 transition-all duration-200 hover:shadow flex items-center justify-center active:scale-95"
              >
                <Plus size={12} />
              </button>
            </div>
            <button
              onClick={handleAdd}
              className="px-3 sm:px-5 py-1.5 sm:py-2 rounded-full bg-gradient-to-r from-rose-500 to-rose-600 text-white text-xs sm:text-sm font-medium shadow-md hover:shadow-lg hover:from-rose-600 hover:to-rose-700 transition-all duration-300 active:scale-95"
            >
              Aggiungi
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}