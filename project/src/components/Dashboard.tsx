import { useMemo } from 'react';
import { Shield, AlertTriangle, CheckCircle, XCircle, TrendingUp, Plus, Package } from 'lucide-react';
import type { Product, Category } from '../lib/database.types';
import { getWarrantyStatus, getDaysUntilExpiry, getWarrantyExpiry, formatCurrency, formatDate } from '../lib/utils';
import { translations, type Lang } from '../lib/translations';
import ProductCard from './ProductCard';

interface DashboardProps {
  products: Product[];
  categories: Category[];
  onAddProduct: () => void;
  onViewProduct: (product: Product) => void;
  lang: Lang;
}

export default function Dashboard({ products, categories, onAddProduct, onViewProduct, lang }: DashboardProps) {
  const t = translations[lang].dashboard;
  const tStatus = translations[lang].status;

  const stats = useMemo(() => {
    const active = products.filter(p => getWarrantyStatus(p) === 'active').length;
    const expiringSoon = products.filter(p => getWarrantyStatus(p) === 'expiring_soon').length;
    const expired = products.filter(p => getWarrantyStatus(p) === 'expired').length;
    const totalValue = products.reduce((sum, p) => sum + (p.purchase_price || 0), 0);
    const activeValue = products
      .filter(p => getWarrantyStatus(p) !== 'expired')
      .reduce((sum, p) => sum + (p.purchase_price || 0), 0);
    return { active, expiringSoon, expired, totalValue, activeValue, total: products.length };
  }, [products]);

  const upcomingExpiry = useMemo(() => {
    return products
      .filter(p => getWarrantyStatus(p) === 'expiring_soon')
      .sort((a, b) => getDaysUntilExpiry(a) - getDaysUntilExpiry(b))
      .slice(0, 5);
  }, [products]);

  const recentProducts = useMemo(() => {
    return [...products]
      .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
      .slice(0, 6);
  }, [products]);

  const getCategoryName = (categoryId: string | null) => {
    if (!categoryId) return null;
    return categories.find(c => c.id === categoryId) || null;
  };

  if (products.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <div className="w-24 h-24 bg-brand-50 rounded-3xl flex items-center justify-center mx-auto mb-6">
            <Package size={40} className="text-brand-200" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-3">{t.noWarranties}</h2>
          <p className="text-gray-500 mb-8 max-w-md mx-auto">{t.noWarrantiesSub}</p>
          <button
            onClick={onAddProduct}
            className="inline-flex items-center gap-2 bg-brand-500 hover:bg-brand-600 text-white font-semibold px-6 py-3 rounded-xl transition-colors"
          >
            <Plus size={18} />
            {t.addFirst}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-medium text-gray-500">{t.statTotal}</span>
            <div className="w-9 h-9 bg-brand-50 rounded-xl flex items-center justify-center">
              <Shield size={16} className="text-brand-500" />
            </div>
          </div>
          <div className="text-3xl font-black text-gray-900">{stats.total}</div>
          <div className="text-xs text-gray-400 mt-1">{t.statTotalSub}</div>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-medium text-gray-500">{t.statActive}</span>
            <div className="w-9 h-9 bg-emerald-50 rounded-xl flex items-center justify-center">
              <CheckCircle size={16} className="text-emerald-600" />
            </div>
          </div>
          <div className="text-3xl font-black text-gray-900">{stats.active}</div>
          <div className="text-xs text-gray-400 mt-1">{t.statActiveSub}</div>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-medium text-gray-500">{t.statExpiring}</span>
            <div className="w-9 h-9 bg-amber-50 rounded-xl flex items-center justify-center">
              <AlertTriangle size={16} className="text-amber-600" />
            </div>
          </div>
          <div className="text-3xl font-black text-gray-900">{stats.expiringSoon}</div>
          <div className="text-xs text-gray-400 mt-1">{t.statExpiringSub}</div>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-medium text-gray-500">{t.statValue}</span>
            <div className="w-9 h-9 bg-cyan-50 rounded-xl flex items-center justify-center">
              <TrendingUp size={16} className="text-cyan-600" />
            </div>
          </div>
          <div className="text-2xl font-black text-gray-900">{formatCurrency(stats.activeValue, 'EUR', lang)}</div>
          <div className="text-xs text-gray-400 mt-1">{t.statValueSub}</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {upcomingExpiry.length > 0 && (
            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5">
              <div className="flex items-center gap-2 mb-4">
                <AlertTriangle size={18} className="text-amber-600" />
                <h3 className="font-bold text-amber-800">{t.expiringSoonTitle} ({upcomingExpiry.length})</h3>
              </div>
              <div className="space-y-3">
                {upcomingExpiry.map(product => {
                  const days = getDaysUntilExpiry(product);
                  const expiry = getWarrantyExpiry(product);
                  return (
                    <button
                      key={product.id}
                      onClick={() => onViewProduct(product)}
                      className="w-full flex items-center justify-between bg-white rounded-xl p-3 hover:bg-amber-50/50 transition-colors text-left border border-amber-100"
                    >
                      <div>
                        <p className="font-semibold text-gray-900 text-sm">{product.name}</p>
                        <p className="text-xs text-gray-500">{product.brand} · {t.expires} {formatDate(expiry.toISOString(), lang)}</p>
                      </div>
                      <div className="text-right">
                        <p className={`text-sm font-bold ${days <= 30 ? 'text-red-600' : 'text-amber-600'}`}>
                          {days === 0 ? t.today : `${days}d`}
                        </p>
                        <p className="text-xs text-gray-400">{t.daysLeft}</p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-gray-900">{t.recentlyAdded}</h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {recentProducts.map(product => (
                <ProductCard
                  key={product.id}
                  product={product}
                  category={getCategoryName(product.category_id)}
                  onClick={() => onViewProduct(product)}
                  lang={lang}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-5">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
            <h3 className="font-bold text-gray-900 mb-4">{t.statusOverview}</h3>
            <div className="space-y-3">
              {[
                { label: t.activeWarranties, value: stats.active, color: 'bg-emerald-500', pct: stats.total > 0 ? (stats.active / stats.total) * 100 : 0 },
                { label: t.expiringSoon, value: stats.expiringSoon, color: 'bg-amber-500', pct: stats.total > 0 ? (stats.expiringSoon / stats.total) * 100 : 0 },
                { label: t.expired, value: stats.expired, color: 'bg-red-400', pct: stats.total > 0 ? (stats.expired / stats.total) * 100 : 0 },
              ].map(item => (
                <div key={item.label}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600">{item.label}</span>
                    <span className="font-semibold text-gray-900">{item.value}</span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-2">
                    <div
                      className={`${item.color} h-2 rounded-full transition-all duration-500`}
                      style={{ width: `${item.pct}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-brand-500 rounded-2xl p-5 text-white">
            <div className="flex items-center gap-2 mb-3">
              <Shield size={16} className="text-brand-200" />
              <span className="text-sm font-bold text-brand-50">{t.euTitle}</span>
            </div>
            <p className="text-white text-sm font-semibold mb-2">{t.euQuestion}</p>
            <p className="text-brand-50 text-xs leading-relaxed">{t.euBody}</p>
            <div className="mt-4 pt-3 border-t border-brand-400 flex items-center justify-between">
              <span className="text-brand-50 text-xs">{t.euFooter}</span>
              <CheckCircle size={14} className="text-emerald-300" />
            </div>
          </div>

          {stats.expired > 0 && (
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
              <div className="flex items-center gap-2 mb-3">
                <XCircle size={16} className="text-red-500" />
                <h3 className="font-bold text-gray-900">{t.expiredTitle} ({stats.expired})</h3>
              </div>
              <p className="text-sm text-gray-500">
                {stats.expired} {t.expiredBody}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
