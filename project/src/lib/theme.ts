export type ThemeMode = 'system' | 'light' | 'dark';

const STORAGE_KEY = 'rokko-theme';

function prefersDark(): boolean {
  return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
}

export function getStoredTheme(): ThemeMode {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (raw === 'light' || raw === 'dark' || raw === 'system') return raw;
  return 'system';
}

export function applyTheme(mode: ThemeMode) {
  const root = document.documentElement;
  const isDark = mode === 'dark' || (mode === 'system' && prefersDark());
  root.classList.toggle('dark', isDark);
}

export function setTheme(mode: ThemeMode) {
  localStorage.setItem(STORAGE_KEY, mode);
  applyTheme(mode);
}

export function initTheme() {
  const mode = getStoredTheme();
  applyTheme(mode);

  // React to system theme changes only when mode === 'system'
  const media = window.matchMedia ? window.matchMedia('(prefers-color-scheme: dark)') : null;
  if (!media) return;

  const handler = () => {
    if (getStoredTheme() === 'system') applyTheme('system');
  };

  if (media.addEventListener) media.addEventListener('change', handler);
  else media.addListener(handler);
}
