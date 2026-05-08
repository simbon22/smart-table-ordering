/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { CreditCard, Smartphone, Coffee } from 'lucide-react';

interface CheckoutFormProps {
  total: number;
  onSuccess: () => void;
  isProcessing: boolean;
}

export function CheckoutForm({ total, onSuccess, isProcessing }: CheckoutFormProps) {
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'apple' | 'google'>('card');
  const [formData, setFormData] = useState({
    cardName: '',
    cardNumber: '',
    expiry: '',
    cvv: '',
    installments: '1',
  });

  const handleCardSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.cardName || !formData.cardNumber || !formData.expiry || !formData.cvv) {
      alert('Compila tutti i campi della carta');
      return;
    }
    onSuccess();
  };

  const handleDigitalPay = (method: 'apple' | 'google') => {
    // Nessun alert, sembra reale. Simula il tempo di autenticazione.
    onSuccess();
  };

  return (
    <div>
      {/* Selezione metodo pagamento */}
      <div className="mb-6">
        <div className="flex gap-3 border-b border-gray-200 pb-3">
          <button
            onClick={() => setPaymentMethod('card')}
            className={`flex-1 py-2 text-center rounded-lg transition ${
              paymentMethod === 'card'
                ? 'bg-rose-50 text-rose-600 font-medium'
                : 'text-gray-500 hover:bg-gray-50'
            }`}
          >
            <CreditCard size={18} className="inline mr-1" />
            Carta
          </button>
          <button
            onClick={() => setPaymentMethod('apple')}
            className={`flex-1 py-2 text-center rounded-lg transition ${
              paymentMethod === 'apple'
                ? 'bg-rose-50 text-rose-600 font-medium'
                : 'text-gray-500 hover:bg-gray-50'
            }`}
          >
            <Smartphone size={18} className="inline mr-1" />
            Apple Pay
          </button>
          <button
            onClick={() => setPaymentMethod('google')}
            className={`flex-1 py-2 text-center rounded-lg transition ${
              paymentMethod === 'google'
                ? 'bg-rose-50 text-rose-600 font-medium'
                : 'text-gray-500 hover:bg-gray-50'
            }`}
          >
            <Coffee size={18} className="inline mr-1" />
            Google Pay
          </button>
        </div>
      </div>

      {/* Contenuto dinamico in base al metodo */}
      {paymentMethod === 'card' && (
        <form onSubmit={handleCardSubmit}>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nome sulla carta
              </label>
              <Input
                placeholder="Mario Rossi"
                value={formData.cardName}
                onChange={(e) => setFormData({ ...formData, cardName: e.target.value })}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Numero carta
              </label>
              <Input
                placeholder="4242 4242 4242 4242"
                value={formData.cardNumber}
                onChange={(e) => setFormData({ ...formData, cardNumber: e.target.value })}
                required
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Scadenza (MM/AA)
                </label>
                <Input
                  placeholder="12/28"
                  value={formData.expiry}
                  onChange={(e) => setFormData({ ...formData, expiry: e.target.value })}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  CVV
                </label>
                <Input
                  placeholder="123"
                  type="password"
                  value={formData.cvv}
                  onChange={(e) => setFormData({ ...formData, cvv: e.target.value })}
                  required
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
              Rateizzazione
              </label>
              <select
                className="w-full border border-gray-300 rounded-lg p-2 text-sm"
                value={formData.installments}
                onChange={(e) => setFormData({ ...formData, installments: e.target.value })}
              >
                <option value="1">Paga subito</option>
                <option value="3">3 rate senza interessi</option>
              </select>
            </div>
          </div>

          <Button
            type="submit"
            className="w-full mt-6 bg-rose-500 hover:bg-rose-600"
            disabled={isProcessing}
          >
            {isProcessing ? 'Elaborazione...' : `Paga €${total.toFixed(2)}`}
          </Button>
        </form>
      )}

      {paymentMethod === 'apple' && (
        <div className="text-center py-8">
          <button
            onClick={() => handleDigitalPay('apple')}
            className="w-full bg-black text-white py-3 rounded-full font-medium flex items-center justify-center gap-2 hover:bg-gray-900 transition"
            disabled={isProcessing}
          >
            <Smartphone size={20} />
            {isProcessing ? 'Autenticazione in corso...' : `Paga con Apple Pay • €${total.toFixed(2)}`}
          </button>
          <p className="text-xs text-gray-500 mt-3">
            Usa Face ID / Touch ID per confermare
          </p>
        </div>
      )}

      {paymentMethod === 'google' && (
        <div className="text-center py-8">
          <button
            onClick={() => handleDigitalPay('google')}
            className="w-full bg-blue-600 text-white py-3 rounded-full font-medium flex items-center justify-center gap-2 hover:bg-blue-700 transition"
            disabled={isProcessing}
          >
            <Coffee size={20} />
            {isProcessing ? 'Elaborazione...' : `Paga con Google Pay • €${total.toFixed(2)}`}
          </button>
          <p className="text-xs text-gray-500 mt-3">
            Utilizza il tuo metodo salvato su Google
          </p>
        </div>
      )}
    </div>
  );
}