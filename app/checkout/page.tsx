/* eslint-disable react-hooks/purity */
'use client';

import { useState } from 'react';
import { useCart } from '@/hooks/useCart';
import { OrderSummary } from '@/components/OrderSummary';
import { CheckoutForm } from '@/components/CheckoutForm';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function CheckoutPage() {
  const { items, total, clearCart } = useCart();
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  // Se carrello vuoto, redirect mentale (ma mostriamo messaggio)
  if (items.length === 0 && !paymentSuccess) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold mb-4">Carrello vuoto</h1>
        <p className="text-gray-500 mb-6">Non hai ancora aggiunto nulla al tuo ordine.</p>
        <Link href="/">
          <Button>Torna al menu</Button>
        </Link>
      </div>
    );
  }

  if (paymentSuccess) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <div className="bg-green-50 border border-green-200 rounded-2xl p-8 mb-6">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Ordine confermato!</h2>
          <p className="text-gray-600 mb-4">
            Il tuo ordine è stato ricevuto. Riceverai un SMS quando sarà pronto.
          </p>
          <p className="text-sm text-gray-500">
            Numero ordine: #{Math.floor(Math.random() * 10000)} • Pizzalandia 
          </p>
        </div>
        <Link href="/">
          <Button variant="outline">Torna al menu</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header con navigazione */}
        <div className="mb-6">
          <Link href="/" className="inline-flex items-center text-gray-500 hover:text-gray-700">
            <ArrowLeft size={16} className="mr-1" /> Continua a ordinare
          </Link>
        </div>

        <h1 className="text-2xl font-bold text-gray-800 mb-8">Checkout</h1>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Colonna sinistra: Form di pagamento */}
          <div className="md:col-span-2">
            <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Dettagli pagamento</h2>
              <CheckoutForm
                total={total}
                onSuccess={() => {
                  setIsProcessing(true);
                  // Simula una vera richiesta di pagamento (1.5 sec realistici)
                  setTimeout(() => {
                    setPaymentSuccess(true);
                    clearCart();
                    setIsProcessing(false);
                  }, 1500);
                }}
                isProcessing={isProcessing}
              />
            </div>
          </div>

          {/* Colonna destra: Riepilogo ordine */}
          <div className="md:col-span-1">
            <OrderSummary items={items} total={total} />
          </div>
        </div>
      </div>
    </div>
  );
}