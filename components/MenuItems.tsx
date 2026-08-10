'use client';

import { useState } from 'react';
import { Plus, Minus } from 'lucide-react';
import Image from 'next/image';
import { toast } from 'sonner';
import { Product } from '@/data/menu';

interface MenuItemProps {
  product: Product;
  onAddToCart: (product: Product, quantity: number) => void;
}

export function MenuItem({ product, onAddToCart }: MenuItemProps) {
  const [quantity, setQuantity] = useState(1);
  const [imgError, setImgError] = useState(false);

  const handleAdd = () => {
    onAddToCart(product, quantity);
    toast.success(`${product.name} aggiunto al carrello`, {
      duration: 1500,
      icon: '🍕',
    });
    setQuantity(1);
  };

  const imagePath = `/${product.image}.jpg`;

  return (
    <div className="group border-2 border-[var(--border-strong)] rounded-2xl bg-[var(--surface-1)] overflow-hidden transition-all duration-200 hover:-translate-y-0.5 hover:border-[var(--red)] hover:shadow-[0_12px_28px_-14px_rgba(26,22,19,0.35)]">
      <div className="relative aspect-[16/10] overflow-hidden border-b-2 border-[var(--border-strong)] bg-[var(--border)]">
        {!imgError ? (
          <Image
            src={imagePath}
            alt={product.name}
            fill
            className="object-cover"
            loading="lazy"
            quality={70}
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-3xl">🍕</div>
        )}
        {product.popular && (
          <div className="absolute top-2.5 left-2.5 bg-[var(--red)] text-white font-mono-tag text-[9.5px] px-2.5 py-1 rounded-full">
            POPOLARE
          </div>
        )}
      </div>

      <div className="p-4">
        <div className="flex justify-between items-baseline gap-2 mb-1">
          <h3 className="font-display text-[16.5px] tracking-tight">{product.name}</h3>
          <span className="font-mono-tag font-medium text-[14.5px] text-[var(--red)] whitespace-nowrap">
            €{product.price.toFixed(2)}
          </span>
        </div>
        <p className="text-[12.5px] text-[var(--text-secondary)] leading-snug mb-3.5 line-clamp-2">
          {product.description}
        </p>

        <div className="flex justify-between items-center">
          <div className="flex items-center border-[1.5px] border-[var(--border-strong)] rounded-full overflow-hidden">
            <button
              onClick={() => setQuantity(q => Math.max(1, q - 1))}
              className="w-[26px] h-[26px] flex items-center justify-center active:scale-95 transition"
            >
              <Minus size={12} />
            </button>
            <span className="w-6 text-center font-mono-tag text-[12.5px]">{quantity}</span>
            <button
              onClick={() => setQuantity(q => q + 1)}
              className="w-[26px] h-[26px] flex items-center justify-center active:scale-95 transition"
            >
              <Plus size={12} />
            </button>
          </div>
          <button
            onClick={handleAdd}
            className="bg-[var(--ink)] hover:bg-[var(--red)] text-white text-xs font-bold px-[17px] py-[9px] rounded-full transition-colors active:scale-95"
          >
            Aggiungi
          </button>
        </div>
      </div>
    </div>
  );
}
