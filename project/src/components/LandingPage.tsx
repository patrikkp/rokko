import { useState } from 'react';
import { Clock, FileText, BarChart3, AlertTriangle, QrCode, ArrowRight, CheckCircle2, Scale, Zap, Globe2, Menu, X as XIcon } from 'lucide-react';
import LanguageSwitcher from './LanguageSwitcher';
import { translations, type Lang } from '../lib/translations';

interface LandingPageProps {
  onShowAuth: (mode: 'login' | 'register') => void;
  lang: Lang;
  onLangChange: (lang: Lang) => void;
}

const featureIcons = [Scale, Clock, FileText, AlertTriangle, QrCode, BarChart3];

const gridBg: React.CSSProperties = {
  backgroundImage:
    'linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)',
  backgroundSize: '72px 72px',
};

const b = '1px solid rgba(255,255,255,0.08)';

export default function LandingPage({ onShowAuth, lang, onLangChange }: LandingPageProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const t = translations[lang];

  return (
    <div className="min-h-screen bg-black text-white">

      {/* Nav */}
      <nav className="sticky top-0 z-40 bg-black/95 backdrop-blur-md" style={{ borderBottom: b }}>
        <div className="max-w-6xl mx-auto px-5 sm:px-8 flex items-center justify-between h-14">
          <div className="flex items-center gap-2">
            <img src="/rokko-warranty.png" alt="Rokko" className="h-7 w-7 rounded-md object-cover" />
            <span className="text-white text-lg" style={{ fontFamily: "'Extenda', 'Big Shoulders Display', sans-serif", fontWeight: 900 }}>
              Rokko
            </span>
          </div>

          <div className="hidden md:flex items-center gap-8 text-sm text-white/50">
            <a href="#features" className="hover:text-white transition-colors">{t.nav.features}</a>
            <a href="#eu" className="hover:text-white transition-colors">{t.nav.eu}</a>
            <a href="#how" className="hover:text-white transition-colors">{t.nav.how}</a>
          </div>

          <div className="flex items-center gap-3">
            <LanguageSwitcher lang={lang} onChange={onLangChange} />
            <button
              onClick={() => onShowAuth('login')}
              className="hidden md:block text-sm text-white/50 hover:text-white transition-colors px-3 py-1.5"
            >
              {t.nav.login}
            </button>
            <button
              onClick={() => onShowAuth('register')}
              className="btn-primary !px-4 !py-1.5 !text-sm"
            >
              <span>{t.nav.startFree}</span>
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden text-white/60 hover:text-white p-1"
            >
              {mobileMenuOpen ? <XIcon size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden px-5 pb-4 flex flex-col gap-1" style={{ borderTop: b }}>
            {[
              { href: '#features', label: t.nav.features },
              { href: '#eu', label: t.nav.eu },
              { href: '#how', label: t.nav.how },
            ].map(link => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="py-2.5 text-sm text-white/60 hover:text-white transition-colors"
              >
                {link.label}
              </a>
            ))}
            <button
              onClick={() => { setMobileMenuOpen(false); onShowAuth('login'); }}
              className="py-2.5 text-sm text-white/60 hover:text-white text-left transition-colors"
            >
              {t.nav.login}
            </button>
          </div>
        )}
      </nav>

      {/* Hero */}
      <section className="relative overflow-hidden" style={gridBg}>
        <div className="relative max-w-6xl mx-auto px-5 sm:px-8 pt-28 pb-36 text-center">
          <div
            className="inline-flex items-center gap-1.5 text-white/35 text-xs px-3 py-1.5 rounded-full mb-10"
            style={{ border: b }}
          >
            <Globe2 size={11} />
            <span>{t.hero.badge}</span>
          </div>

          <h1
            className="text-white mb-8"
            style={{
              fontFamily: "'Extenda', 'Big Shoulders Display', sans-serif",
              fontWeight: 900,
              fontSize: 'clamp(3.5rem, 9vw, 7.5rem)',
              lineHeight: '0.92',
              letterSpacing: '-0.02em',
            }}
          >
            {t.hero.headline1}<br />
            <span className="text-brand-500">{t.hero.headline2}</span><br />
            {t.hero.headline3}
          </h1>

          <p className="text-white/45 text-lg max-w-xl mx-auto mb-10 leading-relaxed">
            {t.hero.sub}
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={() => onShowAuth('register')}
              className="btn-primary"
            >
              <span>{t.hero.cta}</span>
              <ArrowRight size={15} />
            </button>
            <button
              onClick={() => onShowAuth('login')}
              className="btn-secondary"
            >
              <span>{t.hero.hasAccount}</span>
            </button>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-8 mt-12 text-xs text-white/25">
            {[t.hero.trust1, t.hero.trust2, t.hero.trust3].map(item => (
              <div key={item} className="flex items-center gap-1.5">
                <div className="w-1 h-1 bg-brand-500 rounded-full" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section style={{ borderTop: b, borderBottom: b }}>
        <div className="max-w-6xl mx-auto px-5 sm:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-3">
            {[
              { value: t.stats.v1, label: t.stats.l1, sub: t.stats.s1 },
              { value: t.stats.v2, label: t.stats.l2, sub: t.stats.s2 },
              { value: t.stats.v3, label: t.stats.l3, sub: t.stats.s3 },
            ].map((stat, i) => (
              <div
                key={i}
                className="text-center py-10 px-8"
                style={{ borderRight: i < 2 ? b : 'none' }}
              >
                <div
                  className="text-white mb-1"
                  style={{ fontFamily: "'Extenda', 'Big Shoulders Display', sans-serif", fontWeight: 900, fontSize: '2.75rem' }}
                >
                  {stat.value}
                </div>
                <div className="text-white/40 text-sm">{stat.label}</div>
                <div className="text-white/20 text-xs mt-0.5">{stat.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-28">
        <div className="max-w-6xl mx-auto px-5 sm:px-8">
          <div className="mb-14">
            <p className="text-brand-500 text-xs font-semibold tracking-widest uppercase mb-4">{t.features.sectionLabel}</p>
            <h2
              className="text-white max-w-lg"
              style={{
                fontFamily: "'Extenda', 'Big Shoulders Display', sans-serif",
                fontWeight: 900,
                fontSize: 'clamp(2rem, 5vw, 3.5rem)',
                lineHeight: '1',
              }}
            >
              {t.features.sectionTitle}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3" style={{ border: b, borderRight: 'none', borderBottom: 'none' }}>
            {t.features.items.map((feature, idx) => {
              const Icon = featureIcons[idx];
              return (
                <div
                  key={feature.title}
                  className="p-8 group hover:bg-white/[0.02] transition-colors"
                  style={{ borderRight: b, borderBottom: b }}
                >
                  <div className="flex items-start justify-between mb-6">
                    <Icon size={18} className="text-white/30 group-hover:text-white/60 transition-colors" />
                    {feature.badge && (
                      <span className="text-xs font-medium text-brand-500 px-2 py-0.5 rounded" style={{ border: '1px solid rgba(255,49,49,0.3)' }}>
                        {feature.badge}
                      </span>
                    )}
                  </div>
                  <h3 className="text-white font-semibold text-sm mb-2.5">{feature.title}</h3>
                  <p className="text-white/35 text-sm leading-relaxed">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* EU Law */}
      <section id="eu" className="py-28" style={{ borderTop: b }}>
        <div className="max-w-6xl mx-auto px-5 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
            <div>
              <p className="text-brand-500 text-xs font-semibold tracking-widest uppercase mb-4">{t.eu.sectionLabel}</p>
              <h2
                className="text-white mb-6"
                style={{
                  fontFamily: "'Extenda', 'Big Shoulders Display', sans-serif",
                  fontWeight: 900,
                  fontSize: 'clamp(1.8rem, 4vw, 3rem)',
                  lineHeight: '1.05',
                }}
              >
                {t.eu.title}
              </h2>
              <p className="text-white/45 leading-relaxed mb-8 text-sm">
                {t.eu.body}{' '}
                <span className="text-white">{t.eu.bodyHighlight}</span>{' '}
                {t.eu.bodyEnd}
              </p>
              <div className="space-y-4">
                {t.eu.points.map(item => (
                  <div key={item} className="flex items-start gap-3">
                    <div className="w-1 h-1 bg-brand-500 rounded-full flex-shrink-0 mt-1.5" />
                    <span className="text-white/45 text-sm">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-sm p-8" style={{ border: b, background: '#080808' }}>
              <div className="flex items-center gap-2 mb-8">
                <Zap size={14} className="text-brand-500" />
                <span className="text-white text-sm font-medium">{t.eu.autoLabel}</span>
              </div>
              <div className="space-y-0">
                {t.eu.autoItems.map((item, i, arr) => (
                  <div
                    key={item.label}
                    className="flex items-start gap-3 py-4"
                    style={{ borderBottom: i < arr.length - 1 ? b : 'none' }}
                  >
                    <CheckCircle2 size={14} className="text-brand-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-white text-sm">{item.label}</p>
                      <p className="text-white/30 text-xs mt-0.5">{item.sub}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how" className="py-28" style={{ borderTop: b }}>
        <div className="max-w-6xl mx-auto px-5 sm:px-8">
          <div className="mb-14">
            <p className="text-brand-500 text-xs font-semibold tracking-widest uppercase mb-4">{t.how.sectionLabel}</p>
            <h2
              className="text-white"
              style={{
                fontFamily: "'Extenda', 'Big Shoulders Display', sans-serif",
                fontWeight: 900,
                fontSize: 'clamp(2rem, 5vw, 3.5rem)',
                lineHeight: '1',
              }}
            >
              {t.how.title}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3" style={{ border: b, borderRight: 'none', borderBottom: 'none' }}>
            {t.how.steps.map(step => (
              <div key={step.num} className="p-8" style={{ borderRight: b, borderBottom: b }}>
                <div className="text-brand-500 text-xs font-mono font-bold mb-8 tracking-widest">{step.num}</div>
                <h3 className="text-white font-semibold text-base mb-3">{step.title}</h3>
                <p className="text-white/35 text-sm leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-36 text-center" style={{ borderTop: b, ...gridBg }}>
        <div className="max-w-4xl mx-auto px-5 sm:px-8">
          <h2
            className="text-white mb-5"
            style={{
              fontFamily: "'Extenda', 'Big Shoulders Display', sans-serif",
              fontWeight: 900,
              fontSize: 'clamp(2.5rem, 8vw, 5.5rem)',
              lineHeight: '0.95',
            }}
          >
            {t.cta.title1}<br />
            <span className="text-brand-500">{t.cta.title2}</span>
          </h2>
          <p className="text-white/35 mb-10 text-base">{t.cta.sub}</p>
          <button
            onClick={() => onShowAuth('register')}
            className="btn-primary !px-9 !py-4"
          >
            <span>{t.cta.btn}</span>
            <ArrowRight size={15} />
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8" style={{ borderTop: b }}>
        <div className="max-w-6xl mx-auto px-5 sm:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <img src="/rokko-warranty.png" alt="Rokko" className="h-5 w-5 rounded object-cover" />
            <span className="text-white text-sm" style={{ fontFamily: "'Extenda', 'Big Shoulders Display', sans-serif", fontWeight: 900 }}>
              Rokko
            </span>
            <span className="text-white/20 text-xs ml-1">© 2025</span>
          </div>
          <div className="flex items-center gap-6 text-xs text-white/20">
            <span>{t.footer.legal}</span>
            <span>{t.footer.regions}</span>
            <span>{t.footer.gdpr}</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
