'use client';

import { useState, useEffect } from 'react';
import { Menu, X, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';

const navItems = [
  { name: 'Features', href: '#features' },
  { name: 'Come funziona', href: '#how-it-works' },
  { name: 'Clienti', href: '#case-study' },
  { name: 'Prezzi', href: '#pricing' },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-slate-900/80 backdrop-blur-xl border-b border-white/10'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <a href="#" className="text-xl font-bold tracking-tight">
              Smart<span className="text-purple-400">Table</span>
            </a>

            {/* Desktop menu */}
            <div className="hidden md:flex gap-8">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-sm text-slate-300 hover:text-white transition-colors"
                >
                  {item.name}
                </a>
              ))}
            </div>

            {/* CTA Desktop */}
            <div className="hidden md:block">
              <Button className="bg-purple-600 hover:bg-purple-700">
                Richiedi demo
              </Button>
            </div>

            {/* Mobile button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden text-white"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-slate-900/95 backdrop-blur-xl pt-20">
          <div className="flex flex-col items-center gap-6">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-lg text-slate-200 hover:text-white transition-colors"
              >
                {item.name}
              </a>
            ))}
            <Button className="bg-purple-600 hover:bg-purple-700 mt-4">
              Richiedi demo
            </Button>
          </div>
        </div>
      )}
    </>
  );
}