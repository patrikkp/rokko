import { Calendar, Clock, ChevronRight } from 'lucide-react';
import type { Product, Category } from '../lib/database.types';
import {
  getWarrantyStatus,
  getDaysUntilExpiry,
  getWarrantyExpiry,
  formatCurrency,
  formatDate,
  getStatusBg,
  getStatusLabel,
  getCategoryIcon,
} from '../lib/utils';
import { translations, type Lang } from '../lib/translations';

interface ProductCardProps {
  product: Product;
  category: Category | null;
  onClick: () => void;
  lang: Lang;
}

export default function ProductCard({ product, category, onClick, lang }: ProductCardProps) {
  const status = getWarrantyStatus(product);
  const days = getDaysUntilExpiry(product);
  const expiry = getWarrantyExpiry(product);
  const tStatus = translations[lang].status;
  const tProducts = translations[lang].products;

  const progressPct = (() => {
    if (status === 'expired') return 100;
    const purchaseDate = new Date(product.purchase_date);
    const totalMs = expiry.getTime() - purchaseDate.getTime();
    const elapsedMs = Date.now() - purchaseDate.getTime();
    return Math.min(100, Math.max(0, (elapsedMs / totalMs) * 100));
  })();

  const progressColor = status === 'active' ? 'bg-emerald-500' : status === 'expiring_soon' ? 'bg-amber-500' : 'bg-red-400';

  return (
    <button
      onClick={onClick}
      className="w-full text-left bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:border-brand-100 transition-all p-5 group"
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl flex-shrink-0 overflow-hidden">
            {product.image_url ? (
              <img
                src={product.image_url}
                alt={product.name}
                className="w-full h-full object-cover"
                onError={e => {
                  const target = e.currentTarget;
                  target.style.display = 'none';
                  const parent = target.parentElement;
                  if (parent) {
                    parent.innerHTML = `<div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;font-size:1.125rem;background:${category ? category.color + '15' : '#f1f5f9'}">📦</div>`;
                  }
                }}
              />
            ) : (
              <div
                className="w-full h-full flex items-center justify-center text-lg"
                style={{ backgroundColor: category ? `${category.color}15` : '#f1f5f9' }}
              >
                {category ? getCategoryIcon(category.icon) : '📦'}
              </div>
            )}
          </div>
          <div>
            <h3 className="font-bold text-gray-900 text-sm leading-tight">{product.name}</h3>
            {product.brand && <p className="text-xs text-gray-400">{product.brand}{product.model ? ` · ${product.model}` : ''}</p>}
          </div>
        </div>
        <ChevronRight size={16} className="text-gray-300 group-hover:text-brand-300 transition-colors flex-shrink-0 mt-1" />
      </div>

      <div className="mb-3">
        <div className="flex justify-between text-xs text-gray-400 mb-1">
          <span>{tProducts.warrantyProgress}</span>
          <span className={status === 'expired' ? 'text-red-500 font-medium' : status === 'expiring_soon' ? 'text-amber-600 font-medium' : 'text-gray-400'}>
            {status === 'expired' ? tStatus.expired : `${Math.round(progressPct)}%`}
          </span>
        </div>
        <div className="w-full bg-gray-100 rounded-full h-1.5">
          <div
            className={`${progressColor} h-1.5 rounded-full transition-all`}
            style={{ width: `${progressPct}%` }}
          />
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3 text-xs text-gray-500">
          <div className="flex items-center gap-1">
            <Calendar size={11} />
            <span>{formatDate(product.purchase_date, lang)}</span>
          </div>
          {product.purchase_price && (
            <span className="font-medium text-gray-700">{formatCurrency(product.purchase_price, product.currency, lang)}</span>
          )}
        </div>

        <div className="flex items-center gap-1.5">
          {status !== 'expired' && (
            <div className="flex items-center gap-1 text-xs text-gray-400">
              <Clock size={11} />
              <span className={`font-medium ${days <= 30 ? 'text-red-500' : days <= 90 ? 'text-amber-600' : 'text-gray-600'}`}>
                {days}d
              </span>
            </div>
          )}
          <span className={`text-xs font-semibold px-2 py-0.5 rounded-full border ${getStatusBg(status)}`}>
            {getStatusLabel(status, tStatus)}
          </span>
        </div>
      </div>
    </button>
  );
}
