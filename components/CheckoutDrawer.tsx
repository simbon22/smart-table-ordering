/* eslint-disable react-hooks/set-state-in-effect */
'use client';

import { useState, useEffect } from 'react';
import { X, CreditCard, Smartphone, Coffee, Shield, Lock, AlertCircle } from 'lucide-react';
import { CartItem } from '@/hooks/useCart';
import { motion, AnimatePresence } from 'framer-motion';

interface CheckoutDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  total: number;
  clearCart: () => void;
}

export function CheckoutDrawer({ isOpen, onClose, items, total, clearCart }: CheckoutDrawerProps) {
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'apple' | 'google'>('card');
  const [isProcessing, setIsProcessing] = useState(false);
  const [showApplePaySheet, setShowApplePaySheet] = useState(false);
  const [showGooglePaySheet, setShowGooglePaySheet] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [applePayError, setApplePayError] = useState('');
  const [googlePayError, setGooglePayError] = useState('');

  const [formData, setFormData] = useState({
    cardName: '',
    cardNumber: '',
    expiry: '',
    cvv: '',
  });

  const [showApplePay, setShowApplePay] = useState(false);
  const [showGooglePay, setShowGooglePay] = useState(false);

  useEffect(() => {
    const ua = navigator.userAgent.toLowerCase();
    const isSafari = /safari/.test(ua) && !/chrome/.test(ua);
    const isAppleDevice = /iphone|ipad|ipod/.test(ua);
    const isMac = /mac/.test(ua) && !isAppleDevice;
    const isAndroid = /android/.test(ua);
    const isChrome = /chrome/.test(ua);

    const canUseApplePay = isSafari && (isAppleDevice || isMac);
    const canUseGooglePay = (isAndroid || isChrome) && !canUseApplePay;

    setShowApplePay(canUseApplePay);
    setShowGooglePay(canUseGooglePay);
  }, []);

  if (!isOpen) return null;

  const subtotal = total;
  const vat = subtotal * 0.10;
  const finalTotal = subtotal + vat;

  const handleCardSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!formData.cardName || !formData.cardNumber || !formData.expiry || !formData.cvv) {
      setErrorMessage('Compila tutti i campi della carta');
      return;
    }

    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setErrorMessage('Pagamento rifiutato dalla tua banca. Riprova con un’altra carta.');
    }, 1800);
  };

  const handleApplePayConfirm = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setApplePayError('Transazione non autorizzata. Verifica Face ID o prova un’altra carta.');
    }, 1500);
  };

  const handleGooglePayConfirm = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setGooglePayError('Transazione non autorizzata. Riprova con un altro metodo di pagamento.');
    }, 1500);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-md z-50"
            onClick={onClose}
          />

          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25 }}
            className="fixed right-0 top-0 h-full w-full max-w-lg bg-white shadow-2xl z-50 flex flex-col"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-gray-900 to-gray-800">
              <div className="flex items-center justify-between p-5">
                <div className="flex items-center gap-3">
                  <button onClick={onClose} className="text-white/70 hover:text-white">
                    <X size={20} />
                  </button>
                  <div>
                    <h2 className="text-lg font-semibold text-white">Checkout</h2>
                    <div className="flex items-center gap-1 mt-0.5">
                      <Lock size={11} className="text-emerald-400" />
                      <span className="text-[10px] text-white/60">Pagamento sicuro</span>
                    </div>
                  </div>
                </div>
                <Shield size={20} className="text-emerald-400" />
              </div>
            </div>

            {/* Riepilogo ordine con IVA esplicitata */}
            <div className="p-5 bg-gray-50 border-b border-gray-100">
              <h3 className="font-semibold text-gray-700 mb-3">Riepilogo ordine</h3>
              <div className="space-y-2 max-h-48 overflow-auto">
                {items.map(({ product, quantity }) => (
                  <div key={product.id} className="flex justify-between text-sm">
                    <span>{quantity}x {product.name}</span>
                    <span className="font-medium">€{(product.price * quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>
              <div className="border-t border-gray-200 mt-3 pt-3 space-y-1">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Subtotale</span>
                  <span className="text-gray-700">€{subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">IVA 10%</span>
                  <span className="text-gray-700">€{vat.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-lg font-bold pt-1 border-t border-gray-200 mt-1">
                  <span>Totale</span>
                  <span className="text-emerald-700">€{finalTotal.toFixed(2)}</span>
                </div>
              </div>
            </div>

            {/* Metodi pagamento */}
            <div className="p-5 border-b border-gray-100">
              <div className="flex gap-3">
                <button
                  onClick={() => {
                    setPaymentMethod('card');
                    setErrorMessage('');
                  }}
                  className={`flex-1 py-3 rounded-xl flex items-center justify-center gap-2 transition ${
                    paymentMethod === 'card'
                      ? 'bg-emerald-600 text-white shadow-md'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  <CreditCard size={18} />
                  <span className="text-sm font-medium">Carta</span>
                </button>

                {showApplePay && (
                  <button
                    onClick={() => {
                      setPaymentMethod('apple');
                      setErrorMessage('');
                      setApplePayError('');
                      setShowApplePaySheet(true);
                    }}
                    className={`flex-1 py-3 rounded-xl flex items-center justify-center gap-2 transition ${
                      paymentMethod === 'apple'
                        ? 'bg-black text-white shadow-md'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    <Smartphone size={18} />
                    <span className="text-sm font-medium">Apple Pay</span>
                  </button>
                )}

                {showGooglePay && (
                  <button
                    onClick={() => {
                      setPaymentMethod('google');
                      setErrorMessage('');
                      setGooglePayError('');
                      setShowGooglePaySheet(true);
                    }}
                    className={`flex-1 py-3 rounded-xl flex items-center justify-center gap-2 transition ${
                      paymentMethod === 'google'
                        ? 'bg-blue-600 text-white shadow-md'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    <Coffee size={18} />
                    <span className="text-sm font-medium">Google Pay</span>
                  </button>
                )}
              </div>
            </div>

            {/* Form carta */}
            {paymentMethod === 'card' && (
              <div className="p-5">
                <form onSubmit={handleCardSubmit} className="space-y-4">
                  <input
                    type="text"
                    placeholder="MARIO ROSSI"
                    className="w-full border border-gray-300 rounded-lg p-2.5 text-sm"
                    value={formData.cardName}
                    onChange={(e) => setFormData({ ...formData, cardName: e.target.value })}
                  />
                  <input
                    type="text"
                    placeholder="4242 4242 4242 4242"
                    className="w-full border border-gray-300 rounded-lg p-2.5 text-sm font-mono"
                    value={formData.cardNumber}
                    onChange={(e) => setFormData({ ...formData, cardNumber: e.target.value })}
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <input
                      type="text"
                      placeholder="MM/AA"
                      className="border border-gray-300 rounded-lg p-2.5 text-sm"
                      value={formData.expiry}
                      onChange={(e) => setFormData({ ...formData, expiry: e.target.value })}
                    />
                    <input
                      type="password"
                      placeholder="CVV"
                      className="border border-gray-300 rounded-lg p-2.5 text-sm"
                      value={formData.cvv}
                      onChange={(e) => setFormData({ ...formData, cvv: e.target.value })}
                    />
                  </div>

                  {errorMessage && (
                    <div className="flex items-center gap-2 p-3 bg-red-50 text-red-700 text-sm rounded-lg">
                      <AlertCircle size={16} />
                      {errorMessage}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isProcessing}
                    className="w-full bg-emerald-600 text-white py-3 rounded-xl font-medium hover:bg-emerald-700 transition disabled:opacity-50"
                  >
                    {isProcessing ? 'Elaborazione...' : `Paga €${finalTotal.toFixed(2)}`}
                  </button>
                </form>
              </div>
            )}
          </motion.div>

          {/* Apple Pay sheet con errore interno */}
          {showApplePaySheet && (
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 30 }}
              className="fixed bottom-0 left-0 right-0 z-[100] bg-black rounded-t-3xl shadow-2xl overflow-hidden"
            >
              <div className="p-6 text-center">
                <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Smartphone size={28} className="text-white" />
                </div>

                {!applePayError ? (
                  <>
                    <h3 className="text-white text-xl font-semibold mb-2">Apple Pay</h3>
                    <p className="text-white/60 text-sm mb-6">Conferma con Face ID per pagare €{finalTotal.toFixed(2)}</p>
                    <div className="flex gap-3">
                      <button
                        onClick={() => setShowApplePaySheet(false)}
                        className="flex-1 py-3 rounded-xl bg-white/10 text-white font-medium"
                      >
                        Annulla
                      </button>
                      <button
                        onClick={handleApplePayConfirm}
                        disabled={isProcessing}
                        className="flex-1 py-3 rounded-xl bg-white text-black font-medium disabled:opacity-50"
                      >
                        {isProcessing ? 'Autorizzazione...' : 'Conferma'}
                      </button>
                    </div>
                  </>
                ) : (
                  <div className="space-y-4">
                    <div className="flex items-center justify-center gap-2 text-red-400">
                      <AlertCircle size={24} />
                    </div>
                    <p className="text-red-300 text-sm">{applePayError}</p>
                    <button
                      onClick={() => {
                        setShowApplePaySheet(false);
                        setApplePayError('');
                      }}
                      className="w-full py-3 rounded-xl bg-white text-black font-medium"
                    >
                      Chiudi
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          )}

          {/* Google Pay sheet con errore interno */}
          {showGooglePaySheet && (
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 30 }}
              className="fixed bottom-0 left-0 right-0 z-[100] bg-white rounded-t-3xl shadow-2xl overflow-hidden border-t border-gray-200"
            >
              <div className="p-6 text-center">
                <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Coffee size={28} className="text-blue-600" />
                </div>

                {!googlePayError ? (
                  <>
                    <h3 className="text-gray-800 text-xl font-semibold mb-2">Google Pay</h3>
                    <p className="text-gray-500 text-sm mb-6">Conferma con impronta digitale per pagare €{finalTotal.toFixed(2)}</p>
                    <div className="flex gap-3">
                      <button
                        onClick={() => setShowGooglePaySheet(false)}
                        className="flex-1 py-3 rounded-xl bg-gray-100 text-gray-600 font-medium"
                      >
                        Annulla
                      </button>
                      <button
                        onClick={handleGooglePayConfirm}
                        disabled={isProcessing}
                        className="flex-1 py-3 rounded-xl bg-blue-600 text-white font-medium disabled:opacity-50"
                      >
                        {isProcessing ? 'Autorizzazione...' : 'Conferma'}
                      </button>
                    </div>
                  </>
                ) : (
                  <div className="space-y-4">
                    <div className="flex items-center justify-center gap-2 text-red-500">
                      <AlertCircle size={24} />
                    </div>
                    <p className="text-red-600 text-sm">{googlePayError}</p>
                    <button
                      onClick={() => {
                        setShowGooglePaySheet(false);
                        setGooglePayError('');
                      }}
                      className="w-full py-3 rounded-xl bg-gray-800 text-white font-medium"
                    >
                      Chiudi
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </>
      )}
    </AnimatePresence>
  );
}