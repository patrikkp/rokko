import { useState } from 'react';
import { Bell, User, LogOut, ChevronDown, Plus } from 'lucide-react';
import type { User as SupabaseUser } from '@supabase/supabase-js';
import { supabase } from '../lib/supabase';
import { translations, type Lang } from '../lib/translations';
import LanguageSwitcher from './LanguageSwitcher';

interface NavbarProps {
  user: SupabaseUser | null;
  onShowAuth: (mode: 'login' | 'register') => void;
  onAddProduct: () => void;
  expiringCount: number;
  lang: Lang;
  onLangChange: (lang: Lang) => void;
}

export default function Navbar({ user, onShowAuth, onAddProduct, expiringCount, lang, onLangChange }: NavbarProps) {
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const t = translations[lang].app;
  const tNav = translations[lang].nav;

  async function handleSignOut() {
    await supabase.auth.signOut();
    setUserMenuOpen(false);
  }

  const displayName = user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'Korisnik';

  return (
    <nav className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-2.5">
            <img
              src="/rokko-warranty.png"
              alt="Rokko"
              className="h-9 w-9 rounded-lg object-cover shadow-sm"
            />
            <span className="font-display text-xl tracking-tight text-gray-900" style={{ fontFamily: "'Extenda', 'Big Shoulders Display', sans-serif", fontWeight: 900 }}>
              Rokko
            </span>
            <span className="hidden sm:block text-xs text-gray-400 ml-0.5 font-medium">Warranty Tracker</span>
          </div>

          {user ? (
            <div className="flex items-center gap-3">
              <LanguageSwitcher lang={lang} onChange={onLangChange} dark={false} />

              <button
                onClick={onAddProduct}
                className="hidden sm:flex items-center gap-2 bg-brand-500 hover:bg-brand-600 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors"
              >
                <Plus size={16} />
                <span>{t.addWarranty}</span>
              </button>

              <button
                onClick={onAddProduct}
                className="sm:hidden w-9 h-9 bg-brand-500 hover:bg-brand-600 text-white rounded-lg flex items-center justify-center transition-colors"
              >
                <Plus size={16} />
              </button>

              <button className="relative w-9 h-9 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg flex items-center justify-center transition-colors">
                <Bell size={18} />
                {expiringCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-brand-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
                    {expiringCount > 9 ? '9+' : expiringCount}
                  </span>
                )}
              </button>

              <div className="relative">
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center gap-2 hover:bg-gray-100 px-2 py-1.5 rounded-lg transition-colors"
                >
                  <div className="w-7 h-7 bg-gradient-to-br from-brand-400 to-brand-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                    {displayName[0].toUpperCase()}
                  </div>
                  <span className="hidden sm:block text-sm font-medium text-gray-700 max-w-24 truncate">{displayName}</span>
                  <ChevronDown size={14} className="text-gray-400" />
                </button>

                {userMenuOpen && (
                  <>
                    <div className="fixed inset-0 z-30" onClick={() => setUserMenuOpen(false)} />
                    <div className="absolute right-0 top-full mt-2 w-52 bg-white rounded-xl shadow-lg border border-gray-100 py-1 z-40">
                      <div className="px-4 py-2 border-b border-gray-100">
                        <p className="text-sm font-medium text-gray-900 truncate">{displayName}</p>
                        <p className="text-xs text-gray-500 truncate">{user.email}</p>
                      </div>
                      <button className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-600 hover:bg-gray-50 transition-colors">
                        <User size={15} />
                        <span>{t.profileSettings}</span>
                      </button>
                      <button
                        onClick={handleSignOut}
                        className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors"
                      >
                        <LogOut size={15} />
                        <span>{t.signOut}</span>
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <LanguageSwitcher lang={lang} onChange={onLangChange} dark={false} />
              <button
                onClick={() => onShowAuth('login')}
                className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors px-3 py-2"
              >
                {tNav.login}
              </button>
              <button
                onClick={() => onShowAuth('register')}
                className="text-sm font-medium bg-brand-500 hover:bg-brand-600 text-white px-4 py-2 rounded-lg transition-colors"
              >
                {tNav.startFree}
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
