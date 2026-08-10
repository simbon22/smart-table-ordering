'use client';

import { useState, useEffect } from 'react';
import { X, CreditCard, Smartphone, Wallet, AlertCircle } from 'lucide-react';
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
            className="fixed inset-0 bg-[var(--ink)]/60 backdrop-blur-sm z-50"
            onClick={onClose}
          />

          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25 }}
            className="fixed right-0 top-0 h-full w-full max-w-lg bg-[var(--bg-0)] shadow-2xl z-50 flex flex-col border-l-2 border-[var(--border-strong)]"
          >
            <div className="border-b-2 border-[var(--border-strong)] bg-[var(--surface-1)]">
              <div className="flex items-center justify-between p-5">
                <div className="flex items-center gap-3">
                  <button onClick={onClose} className="text-[var(--text-secondary)] hover:text-[var(--ink)]">
                    <X size={20} />
                  </button>
                  <h2 className="font-display text-lg tracking-tight">Checkout</h2>
                </div>
                <div className="flex items-center gap-1.5 font-mono-tag text-[11px] bg-[var(--mustard)] text-[var(--ink)] px-3 py-1.5 rounded-full">
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><circle cx="12" cy="16" r="0.5" fill="currentColor" />
                  </svg>
                  AMBIENTE DEMO
                </div>
              </div>
            </div>

            <div className="p-5 bg-[var(--surface-1)] border-b border-[var(--border)]">
              <h3 className="font-semibold text-sm mb-3">Riepilogo ordine</h3>
              <div className="space-y-2 max-h-48 overflow-auto">
                {items.map(({ product, quantity }) => (
                  <div key={product.id} className="flex justify-between text-sm">
                    <span>{quantity}x {product.name}</span>
                    <span className="font-mono-tag">€{(product.price * quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>
              <div className="border-t border-[var(--border)] mt-3 pt-3 space-y-1">
                <div className="flex justify-between text-sm">
                  <span className="text-[var(--text-secondary)]">Subtotale</span>
                  <span className="font-mono-tag">€{subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-[var(--text-secondary)]">IVA 10%</span>
                  <span className="font-mono-tag">€{vat.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-lg font-bold pt-2 border-t border-[var(--border)] mt-1">
                  <span>Totale</span>
                  <span className="font-mono-tag text-[var(--red)]">€{finalTotal.toFixed(2)}</span>
                </div>
              </div>
            </div>

            <div className="p-5 border-b border-[var(--border)]">
              <div className="flex gap-2.5">
                <button
                  onClick={() => {
                    setPaymentMethod('card');
                    setErrorMessage('');
                  }}
                  className={`flex-1 py-3 rounded-xl border-2 flex items-center justify-center gap-2 transition ${
                    paymentMethod === 'card'
                      ? 'bg-[var(--ink)] text-white border-[var(--ink)]'
                      : 'bg-[var(--surface-1)] text-[var(--text-secondary)] border-[var(--border-strong)]'
                  }`}
                >
                  <CreditCard size={17} />
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
                    className={`flex-1 py-3 rounded-xl border-2 flex items-center justify-center gap-2 transition ${
                      paymentMethod === 'apple'
                        ? 'bg-[var(--ink)] text-white border-[var(--ink)]'
                        : 'bg-[var(--surface-1)] text-[var(--text-secondary)] border-[var(--border-strong)]'
                    }`}
                  >
                    <Smartphone size={17} />
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
                    className={`flex-1 py-3 rounded-xl border-2 flex items-center justify-center gap-2 transition ${
                      paymentMethod === 'google'
                        ? 'bg-[var(--ink)] text-white border-[var(--ink)]'
                        : 'bg-[var(--surface-1)] text-[var(--text-secondary)] border-[var(--border-strong)]'
                    }`}
                  >
                    <Wallet size={17} />
                    <span className="text-sm font-medium">Google Pay</span>
                  </button>
                )}
              </div>
            </div>

            {paymentMethod === 'card' && (
              <div className="p-5">
                <form onSubmit={handleCardSubmit} className="space-y-3.5">
                  <input
                    type="text"
                    placeholder="MARIO ROSSI"
                    className="w-full border-[1.5px] border-[var(--border-strong)] rounded-lg p-2.5 text-sm bg-[var(--surface-1)]"
                    value={formData.cardName}
                    onChange={(e) => setFormData({ ...formData, cardName: e.target.value })}
                  />
                  <input
                    type="text"
                    placeholder="4242 4242 4242 4242"
                    className="w-full border-[1.5px] border-[var(--border-strong)] rounded-lg p-2.5 text-sm font-mono-tag bg-[var(--surface-1)]"
                    value={formData.cardNumber}
                    onChange={(e) => setFormData({ ...formData, cardNumber: e.target.value })}
                  />
                  <div className="grid grid-cols-2 gap-3.5">
                    <input
                      type="text"
                      placeholder="MM/AA"
                      className="border-[1.5px] border-[var(--border-strong)] rounded-lg p-2.5 text-sm bg-[var(--surface-1)]"
                      value={formData.expiry}
                      onChange={(e) => setFormData({ ...formData, expiry: e.target.value })}
                    />
                    <input
                      type="password"
                      placeholder="CVV"
                      className="border-[1.5px] border-[var(--border-strong)] rounded-lg p-2.5 text-sm bg-[var(--surface-1)]"
                      value={formData.cvv}
                      onChange={(e) => setFormData({ ...formData, cvv: e.target.value })}
                    />
                  </div>

                  {errorMessage && (
                    <div className="flex items-center gap-2 p-3 bg-[var(--mustard)]/20 border border-[var(--mustard)] text-[var(--ink)] text-sm rounded-lg">
                      <AlertCircle size={16} className="shrink-0" />
                      {errorMessage}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isProcessing}
                    className="w-full bg-[var(--ink)] hover:bg-[var(--red)] text-white py-3 rounded-xl font-semibold transition disabled:opacity-50"
                  >
                    {isProcessing ? 'Elaborazione…' : `Paga €${finalTotal.toFixed(2)}`}
                  </button>
                  <p className="text-center font-mono-tag text-[10.5px] text-[var(--text-secondary)]">
                    Nessun dato lascia questa pagina
                  </p>
                </form>
              </div>
            )}
          </motion.div>

          {showApplePaySheet && (
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 30 }}
              className="fixed bottom-0 left-0 right-0 z-[100] bg-[var(--ink)] rounded-t-3xl shadow-2xl overflow-hidden"
            >
              <div className="p-6 text-center">
                <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Smartphone size={28} className="text-white" />
                </div>

                {!applePayError ? (
                  <>
                    <h3 className="text-white text-xl font-semibold mb-2">Apple Pay</h3>
                    <p className="text-white/60 text-sm mb-2">Simulazione — conferma per pagare €{finalTotal.toFixed(2)}</p>
                    <p className="font-mono-tag text-[10.5px] text-white/40 mb-6">Nessun addebito reale</p>
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
                        {isProcessing ? 'Autorizzazione…' : 'Conferma'}
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

          {showGooglePaySheet && (
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 30 }}
              className="fixed bottom-0 left-0 right-0 z-[100] bg-[var(--surface-1)] rounded-t-3xl shadow-2xl overflow-hidden border-t-2 border-[var(--border-strong)]"
            >
              <div className="p-6 text-center">
                <div className="w-12 h-12 bg-[var(--mustard)]/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Wallet size={26} className="text-[var(--ink)]" />
                </div>

                {!googlePayError ? (
                  <>
                    <h3 className="text-[var(--ink)] text-xl font-semibold mb-2">Google Pay</h3>
                    <p className="text-[var(--text-secondary)] text-sm mb-2">Simulazione — conferma per pagare €{finalTotal.toFixed(2)}</p>
                    <p className="font-mono-tag text-[10.5px] text-[var(--text-secondary)] mb-6">Nessun addebito reale</p>
                    <div className="flex gap-3">
                      <button
                        onClick={() => setShowGooglePaySheet(false)}
                        className="flex-1 py-3 rounded-xl bg-[var(--border)] text-[var(--ink)] font-medium"
                      >
                        Annulla
                      </button>
                      <button
                        onClick={handleGooglePayConfirm}
                        disabled={isProcessing}
                        className="flex-1 py-3 rounded-xl bg-[var(--ink)] text-white font-medium disabled:opacity-50"
                      >
                        {isProcessing ? 'Autorizzazione…' : 'Conferma'}
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
                      className="w-full py-3 rounded-xl bg-[var(--ink)] text-white font-medium"
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
