import { useMemo } from 'react';
import { TrendingUp, ShoppingBag, Shield, DollarSign, BarChart2, PieChart } from 'lucide-react';
import type { Product, Category } from '../lib/database.types';
import { getWarrantyStatus, formatCurrency, getDaysUntilExpiry } from '../lib/utils';
import { translations, type Lang } from '../lib/translations';

interface AnalyticsViewProps {
  products: Product[];
  categories: Category[];
  lang: Lang;
}

export default function AnalyticsView({ products, categories, lang }: AnalyticsViewProps) {
  const t = translations[lang].analytics;
  const localeMap: Record<Lang, string> = { hr: 'hr-HR', en: 'en-GB', de: 'de-DE', bs: 'bs-BA' };

  const stats = useMemo(() => {
    const active = products.filter(p => getWarrantyStatus(p) === 'active');
    const expiring = products.filter(p => getWarrantyStatus(p) === 'expiring_soon');
    const expired = products.filter(p => getWarrantyStatus(p) === 'expired');

    const totalValue = products.reduce((s, p) => s + (p.purchase_price || 0), 0);
    const activeValue = [...active, ...expiring].reduce((s, p) => s + (p.purchase_price || 0), 0);
    const expiredValue = expired.reduce((s, p) => s + (p.purchase_price || 0), 0);

    const avgWarranty = products.length > 0
      ? products.reduce((s, p) => s + Math.max(p.warranty_months, p.eu_statutory_months), 0) / products.length
      : 0;

    const nextExpiry = products
      .filter(p => getWarrantyStatus(p) !== 'expired')
      .sort((a, b) => getDaysUntilExpiry(a) - getDaysUntilExpiry(b))[0];

    return { active, expiring, expired, totalValue, activeValue, expiredValue, avgWarranty, nextExpiry };
  }, [products]);

  const categoryBreakdown = useMemo(() => {
    const map: Record<string, { category: Category | null; count: number; value: number }> = {};
    for (const p of products) {
      const key = p.category_id || 'other';
      if (!map[key]) {
        map[key] = {
          category: categories.find(c => c.id === p.category_id) || null,
          count: 0,
          value: 0,
        };
      }
      map[key].count++;
      map[key].value += p.purchase_price || 0;
    }
    return Object.values(map).sort((a, b) => b.count - a.count);
  }, [products, categories]);

  const maxCount = Math.max(...categoryBreakdown.map(c => c.count), 1);

  const monthlyPurchases = useMemo(() => {
    const map: Record<string, number> = {};
    for (const p of products) {
      const month = p.purchase_date.substring(0, 7);
      map[month] = (map[month] || 0) + 1;
    }
    return Object.entries(map)
      .sort((a, b) => a[0].localeCompare(b[0]))
      .slice(-12);
  }, [products]);

  const maxMonthly = Math.max(...monthlyPurchases.map(([, v]) => v), 1);

  if (products.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <BarChart2 size={48} className="text-gray-200 mx-auto mb-4" />
        <p className="text-gray-500 font-medium">{t.noData}</p>
        <p className="text-gray-400 text-sm mt-1">{t.noDataSub}</p>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="mb-8">
        <h1 className="text-2xl font-black text-gray-900">{t.title}</h1>
        <p className="text-gray-500 text-sm mt-1">{t.subtitle}</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          { label: t.totalValue, value: formatCurrency(stats.totalValue, 'EUR', lang), icon: DollarSign, color: 'text-brand-500', bg: 'bg-brand-50' },
          { label: t.underWarranty, value: formatCurrency(stats.activeValue, 'EUR', lang), icon: Shield, color: 'text-emerald-600', bg: 'bg-emerald-50' },
          { label: t.withoutWarranty, value: formatCurrency(stats.expiredValue, 'EUR', lang), icon: ShoppingBag, color: 'text-red-500', bg: 'bg-red-50' },
          { label: t.avgWarranty, value: `${Math.round(stats.avgWarranty)} ${t.months}`, icon: TrendingUp, color: 'text-cyan-600', bg: 'bg-cyan-50' },
        ].map(metric => (
          <div key={metric.label} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
            <div className={`w-9 h-9 ${metric.bg} rounded-xl flex items-center justify-center mb-3`}>
              <metric.icon size={16} className={metric.color} />
            </div>
            <div className="text-2xl font-black text-gray-900">{metric.value}</div>
            <div className="text-xs text-gray-400 mt-1">{metric.label}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <div className="flex items-center gap-2 mb-5">
            <PieChart size={18} className="text-gray-400" />
            <h2 className="font-bold text-gray-900">{t.byCategory}</h2>
          </div>
          <div className="space-y-3">
            {categoryBreakdown.map(item => (
              <div key={item.category?.id || 'other'}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-700 font-medium">
                    {item.category?.name_hr || t.other}
                  </span>
                  <div className="flex items-center gap-3">
                    <span className="text-gray-400 text-xs">{formatCurrency(item.value, 'EUR', lang)}</span>
                    <span className="font-bold text-gray-900 w-5 text-right">{item.count}</span>
                  </div>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2">
                  <div
                    className="h-2 rounded-full transition-all duration-500"
                    style={{
                      width: `${(item.count / maxCount) * 100}%`,
                      backgroundColor: item.category?.color || '#94a3b8',
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {monthlyPurchases.length > 1 && (
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <div className="flex items-center gap-2 mb-5">
              <BarChart2 size={18} className="text-gray-400" />
              <h2 className="font-bold text-gray-900">{t.monthlyPurchases}</h2>
            </div>
            <div className="flex items-end gap-1.5 h-32">
              {monthlyPurchases.map(([month, count]) => {
                const pct = (count / maxMonthly) * 100;
                const shortMonth = new Date(month + '-01').toLocaleDateString(localeMap[lang], { month: 'short' });
                return (
                  <div key={month} className="flex-1 flex flex-col items-center gap-1">
                    <span className="text-xs text-gray-500 font-medium">{count}</span>
                    <div
                      className="w-full bg-brand-400 rounded-t-md transition-all duration-500 min-h-[4px]"
                      style={{ height: `${Math.max(4, pct)}%` }}
                    />
                    <span className="text-xs text-gray-400 rotate-45 origin-left hidden sm:block" style={{ fontSize: '9px' }}>
                      {shortMonth}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <h2 className="font-bold text-gray-900 mb-5">{t.warrantyStatus}</h2>
          <div className="space-y-4">
            {[
              { label: t.active, count: stats.active.length, color: '#10b981', bg: 'bg-emerald-500' },
              { label: t.expiring, count: stats.expiring.length, color: '#f59e0b', bg: 'bg-amber-500' },
              { label: t.expired, count: stats.expired.length, color: '#ef4444', bg: 'bg-red-400' },
            ].map(item => {
              const pct = products.length > 0 ? (item.count / products.length) * 100 : 0;
              return (
                <div key={item.label} className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full flex-shrink-0" style={{ backgroundColor: item.color }} />
                  <div className="flex-1">
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-600">{item.label}</span>
                      <span className="font-bold text-gray-900">{item.count}</span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-2">
                      <div className={`${item.bg} h-2 rounded-full`} style={{ width: `${pct}%` }} />
                    </div>
                  </div>
                  <span className="text-xs text-gray-400 w-10 text-right">{Math.round(pct)}%</span>
                </div>
              );
            })}
          </div>
        </div>

        <div className="bg-gradient-to-br from-brand-500 to-brand-600 rounded-2xl p-6 text-white">
          <h2 className="font-bold text-white mb-4">{t.insights}</h2>
          <div className="space-y-3">
            {stats.totalValue > 0 && (
              <div className="bg-white/15 rounded-xl p-3">
                <p className="text-sm font-semibold">
                  {Math.round((stats.activeValue / stats.totalValue) * 100)}{t.insightValuePct}
                </p>
                <p className="text-brand-50 text-xs mt-0.5">
                  {formatCurrency(stats.activeValue, 'EUR', lang)} {t.insightValueOf} {formatCurrency(stats.totalValue, 'EUR', lang)}
                </p>
              </div>
            )}
            {stats.expiring.length > 0 && (
              <div className="bg-amber-500/30 rounded-xl p-3">
                <p className="text-sm font-semibold">{stats.expiring.length} {t.insightExpiring}</p>
                <p className="text-brand-50 text-xs mt-0.5">{t.insightCheckExpiring}</p>
              </div>
            )}
            {stats.avgWarranty > 0 && (
              <div className="bg-white/15 rounded-xl p-3">
                <p className="text-sm font-semibold">{t.insightAvg} {Math.round(stats.avgWarranty)} {t.months}</p>
                <p className="text-brand-50 text-xs mt-0.5">{t.insightEuMin}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
