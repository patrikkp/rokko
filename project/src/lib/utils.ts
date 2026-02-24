import type { Product } from './database.types';
import type { Lang } from './translations';

export function getWarrantyExpiry(product: Product): Date {
  const purchaseDate = new Date(product.purchase_date);
  const maxMonths = Math.max(product.warranty_months, product.eu_statutory_months);
  const expiry = new Date(purchaseDate);
  expiry.setMonth(expiry.getMonth() + maxMonths);
  return expiry;
}

export function getCommercialExpiry(product: Product): Date {
  const purchaseDate = new Date(product.purchase_date);
  const expiry = new Date(purchaseDate);
  expiry.setMonth(expiry.getMonth() + product.warranty_months);
  return expiry;
}

export function getEuStatutoryExpiry(product: Product): Date {
  const purchaseDate = new Date(product.purchase_date);
  const expiry = new Date(purchaseDate);
  expiry.setMonth(expiry.getMonth() + product.eu_statutory_months);
  return expiry;
}

export function getDaysUntilExpiry(product: Product): number {
  const expiry = getWarrantyExpiry(product);
  const now = new Date();
  const diff = expiry.getTime() - now.getTime();
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
}

export type WarrantyStatus = 'active' | 'expiring_soon' | 'expired';

export function getWarrantyStatus(product: Product): WarrantyStatus {
  const days = getDaysUntilExpiry(product);
  if (days < 0) return 'expired';
  if (days <= 90) return 'expiring_soon';
  return 'active';
}

const localeMap: Record<Lang, string> = {
  hr: 'hr-HR',
  en: 'en-GB',
  de: 'de-DE',
  bs: 'bs-BA',
};

export function formatCurrency(amount: number | null, currency: string = 'EUR', lang: Lang = 'hr'): string {
  if (amount === null) return '—';
  return new Intl.NumberFormat(localeMap[lang], { style: 'currency', currency }).format(amount);
}

export function formatDate(dateStr: string | null, lang: Lang = 'hr'): string {
  if (!dateStr) return '—';
  return new Intl.DateTimeFormat(localeMap[lang], { day: '2-digit', month: '2-digit', year: 'numeric' }).format(new Date(dateStr));
}

export function getStatusColor(status: WarrantyStatus): string {
  switch (status) {
    case 'active': return 'text-emerald-600';
    case 'expiring_soon': return 'text-amber-600';
    case 'expired': return 'text-red-500';
  }
}

export function getStatusBg(status: WarrantyStatus): string {
  switch (status) {
    case 'active': return 'bg-emerald-50 text-emerald-700 border-emerald-200';
    case 'expiring_soon': return 'bg-amber-50 text-amber-700 border-amber-200';
    case 'expired': return 'bg-red-50 text-red-700 border-red-200';
  }
}

export function getStatusLabel(status: WarrantyStatus, t: { active: string; expiringSoon: string; expired: string }): string {
  switch (status) {
    case 'active': return t.active;
    case 'expiring_soon': return t.expiringSoon;
    case 'expired': return t.expired;
  }
}

export function getCategoryIcon(iconName: string): string {
  const icons: Record<string, string> = {
    smartphone: '📱',
    home: '🏠',
    tv: '📺',
    laptop: '💻',
    car: '🚗',
    wrench: '🔧',
    activity: '⚽',
    armchair: '🪑',
    shirt: '👕',
    'gamepad-2': '🎮',
    utensils: '🍴',
    package: '📦',
  };
  return icons[iconName] || '📦';
}

export const CURRENCIES = [
  { code: 'EUR', label: 'Euro (EUR)' },
  { code: 'BAM', label: 'Konvertibilna marka (BAM)' },
  { code: 'RSD', label: 'Srpski dinar (RSD)' },
  { code: 'USD', label: 'US Dollar (USD)' },
  { code: 'GBP', label: 'British Pound (GBP)' },
];

export function getWarrantyPresets(t: { y1: string; y2: string; y3: string; y4: string; y5: string; y7: string; y10: string }) {
  return [
    { months: 12, label: t.y1 },
    { months: 24, label: t.y2 },
    { months: 36, label: t.y3 },
    { months: 48, label: t.y4 },
    { months: 60, label: t.y5 },
    { months: 84, label: t.y7 },
    { months: 120, label: t.y10 },
  ];
}
