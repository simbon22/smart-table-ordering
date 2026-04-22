'use client';

import { ArrowDown, Smartphone, QrCode, CreditCard } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function Hero() {
  const scrollToDemo = () => {
    document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="min-h-screen flex items-center justify-center relative pt-20">
      {/* Effetti sfondo */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-600/20 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
        <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-white/5 border border-white/10 text-sm text-slate-300 mb-6">
          <QrCode size={14} />
          Ordinazione dal tavolo
        </div>

        <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6">
          Ordina e paga
          <span className="text-transparent bg-linear-to-r from-purple-400 to-cyan-400 bg-clip-text">
            {' '}dal tuo telefono
          </span>
        </h1>

        <p className="text-xl text-slate-300 max-w-2xl mx-auto mb-8">
          Scansiona il QR code, ordina quello che vuoi e paga con Apple Pay o Google Pay.
          Niente code, niente attese.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
          <Button className="bg-purple-600 hover:bg-purple-700 text-lg px-8 py-6">
            Richiedi demo
          </Button>
          <Button variant="outline" className="border-white/20 text-white hover:bg-white/10 text-lg px-8 py-6" onClick={scrollToDemo}>
            Come funziona
          </Button>
        </div>

        {/* Metriche */}
        <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto">
          <div>
            <p className="text-3xl font-bold text-purple-400">-60%</p>
            <p className="text-sm text-slate-400">Code alle casse</p>
          </div>
          <div>
            <p className="text-3xl font-bold text-purple-400">+25%</p>
            <p className="text-sm text-slate-400">Fatturato medio</p>
          </div>
          <div>
            <p className="text-3xl font-bold text-purple-400">4.8★</p>
            <p className="text-sm text-slate-400">Soddisfazione clienti</p>
          </div>
        </div>

        {/* Freccia */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <ArrowDown className="text-slate-400" size={24} />
        </div>
      </div>
    </section>
  );
}