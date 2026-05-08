'use client';

import { CartItem } from '@/hooks/useCart';

interface OrderSummaryProps {
  items: CartItem[];
  total: number;
}

export function OrderSummary({ items, total }: OrderSummaryProps) {
  const subtotal = total;
  const vat = subtotal * 0.10;
  const finalTotal = subtotal + vat;

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 sticky top-24">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">Il tuo ordine</h2>
      
      <div className="space-y-3 max-h-96 overflow-auto mb-4">
        {items.map(({ product, quantity }) => (
          <div key={product.id} className="flex justify-between text-sm">
            <span className="text-gray-600">
              {quantity}x {product.name}
            </span>
            <span className="font-medium text-gray-800">
              €{(product.price * quantity).toFixed(2)}
            </span>
          </div>
        ))}
      </div>

      <div className="border-t border-gray-200 pt-4 space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-gray-500">Subtotale</span>
          <span className="text-gray-700">€{subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-500">IVA 10%</span>
          <span className="text-gray-700">€{vat.toFixed(2)}</span>
        </div>
        <div className="flex justify-between font-semibold text-lg pt-2 border-t border-gray-200">
          <span>Totale</span>
          <span className="text-rose-600">€{finalTotal.toFixed(2)}</span>
        </div>
      </div>

      <div className="mt-4 text-[11px] text-gray-400 text-center">
        *Transazione sicura con crittografia SSL
      </div>
    </div>
  );
}