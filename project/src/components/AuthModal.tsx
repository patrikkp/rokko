import { useState } from 'react';
import { X, Mail, Lock, User, Eye, EyeOff } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { translations, type Lang } from '../lib/translations';

interface AuthModalProps {
  onClose: () => void;
  initialMode?: 'login' | 'register';
  lang?: Lang;
}

const b = '1px solid rgba(255,255,255,0.08)';

export default function AuthModal({ onClose, initialMode = 'login', lang = 'hr' }: AuthModalProps) {
  const [mode, setMode] = useState<'login' | 'register'>(initialMode);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const t = translations[lang].auth;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (mode === 'register') {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: { data: { full_name: fullName } },
        });
        if (error) throw error;
        onClose();
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        onClose();
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : t.errorInvalidCredentials;
      if (msg.includes('Invalid login credentials')) setError(t.errorInvalidCredentials);
      else if (msg.includes('User already registered')) setError(t.errorUserExists);
      else if (msg.includes('Password should be at least')) setError(t.errorPasswordShort);
      else setError(msg);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} />

      <div
        className="relative w-full max-w-md rounded-sm overflow-hidden"
        style={{ background: '#0a0a0a', border: b }}
      >
        {/* Header */}
        <div className="px-8 pt-8 pb-6" style={{ borderBottom: b }}>
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <img src="/rokko-warranty.png" alt="Rokko" className="h-6 w-6 rounded object-cover" />
              <span
                className="text-white text-base"
                style={{ fontFamily: "'Extenda', 'Big Shoulders Display', sans-serif", fontWeight: 900 }}
              >
                Rokko
              </span>
            </div>
            <button onClick={onClose} className="text-white/30 hover:text-white transition-colors">
              <X size={18} />
            </button>
          </div>

          <h2 className="text-white text-xl font-semibold">
            {mode === 'login' ? t.welcomeBack : t.createAccount}
          </h2>
          <p className="text-white/35 text-sm mt-1">
            {mode === 'login' ? t.signInSub : t.registerSub}
          </p>
        </div>

        {/* Form */}
        <div className="px-8 py-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === 'register' && (
              <div>
                <label className="block text-xs font-medium text-white/40 mb-1.5 uppercase tracking-wider">{t.fullName}</label>
                <div className="relative">
                  <User size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/25" />
                  <input
                    type="text"
                    value={fullName}
                    onChange={e => setFullName(e.target.value)}
                    placeholder={t.namePlaceholder}
                    className="w-full pl-9 pr-4 py-2.5 text-sm text-white placeholder-white/20 rounded focus:outline-none focus:ring-1 focus:ring-brand-500/40 transition-all"
                    style={{ background: '#111', border: b }}
                    required
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-xs font-medium text-white/40 mb-1.5 uppercase tracking-wider">Email</label>
              <div className="relative">
                <Mail size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/25" />
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="vas@email.com"
                  className="w-full pl-9 pr-4 py-2.5 text-sm text-white placeholder-white/20 rounded focus:outline-none focus:ring-1 focus:ring-brand-500/40 transition-all"
                  style={{ background: '#111', border: b }}
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-white/40 mb-1.5 uppercase tracking-wider">{t.password}</label>
              <div className="relative">
                <Lock size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/25" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-9 pr-10 py-2.5 text-sm text-white placeholder-white/20 rounded focus:outline-none focus:ring-1 focus:ring-brand-500/40 transition-all"
                  style={{ background: '#111', border: b }}
                  required
                  minLength={6}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-white/25 hover:text-white/60 transition-colors"
                >
                  {showPassword ? <EyeOff size={14} /> : <Eye size={14} />}
                </button>
              </div>
            </div>

            {error && (
              <div
                className="text-xs px-3 py-2.5 rounded"
                style={{ color: '#ff6b6b', background: 'rgba(255,49,49,0.08)', border: '1px solid rgba(255,49,49,0.2)' }}
              >
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-white hover:bg-white/90 disabled:opacity-40 text-black font-semibold py-2.5 rounded text-sm transition-colors mt-1"
            >
              {loading ? t.loading : mode === 'login' ? t.signIn : t.register}
            </button>
          </form>
        </div>

        {/* Footer */}
        <div className="px-8 pb-7 pt-0">
          <p className="text-center text-sm text-white/30 mb-3">
            {mode === 'login' ? t.noAccount : t.hasAccount}
            <button
              onClick={() => { setMode(mode === 'login' ? 'register' : 'login'); setError(''); }}
              className="text-white hover:text-white/70 font-medium underline underline-offset-2 transition-colors"
            >
              {mode === 'login' ? t.signUpLink : t.signInLink}
            </button>
          </p>
          <p className="text-xs text-white/15 text-center">
            {t.terms}
          </p>
        </div>
      </div>
    </div>
  );
}
