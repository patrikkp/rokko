import { useState, useRef, useEffect } from 'react';
import { type Lang, languages } from '../lib/translations';

interface LanguageSwitcherProps {
  lang: Lang;
  onChange: (lang: Lang) => void;
  dark?: boolean;
}

export default function LanguageSwitcher({ lang, onChange, dark = true }: LanguageSwitcherProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const current = languages.find(l => l.code === lang)!;

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const borderColor = dark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.12)';
  const borderHoverColor = dark ? 'rgba(255,255,255,0.25)' : 'rgba(0,0,0,0.25)';
  const bgColor = dark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.04)';

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(o => !o)}
        onMouseEnter={e => (e.currentTarget.style.borderColor = borderHoverColor)}
        onMouseLeave={e => (e.currentTarget.style.borderColor = borderColor)}
        className="flex items-center w-7 h-7 rounded-full overflow-hidden transition-all hover:scale-105 active:scale-95"
        style={{ border: `1px solid ${borderColor}`, background: bgColor, fontSize: '1.05rem', lineHeight: 1 }}
        title={current.label}
      >
        <span className="w-full h-full flex items-center justify-center">
          {current.flag}
        </span>
      </button>

      {open && (
        <div
          className="absolute right-0 mt-2 py-1 rounded-md overflow-hidden z-50"
          style={{
            background: dark ? '#111' : '#fff',
            border: dark ? '1px solid rgba(255,255,255,0.1)' : '1px solid rgba(0,0,0,0.08)',
            minWidth: '130px',
            boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
          }}
        >
          {languages.map(l => (
            <button
              key={l.code}
              onClick={() => { onChange(l.code); setOpen(false); }}
              className="w-full flex items-center gap-2.5 px-3 py-2 text-left transition-colors"
              style={{
                color: l.code === lang
                  ? (dark ? '#fff' : '#111')
                  : (dark ? 'rgba(255,255,255,0.45)' : 'rgba(0,0,0,0.45)'),
                background: 'transparent',
              }}
              onMouseEnter={e => e.currentTarget.style.background = dark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.04)'}
              onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
            >
              <span style={{ fontSize: '1rem' }}>{l.flag}</span>
              <span className="text-xs font-medium">{l.label}</span>
              {l.code === lang && (
                <span className="ml-auto w-1 h-1 rounded-full bg-brand-500 flex-shrink-0" />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
