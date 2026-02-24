import { ChevronRight } from 'lucide-react';
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

interface ProductListRowProps {
  product: Product;
  category: Category | null;
  onClick: () => void;
  lang: Lang;
}

export default function ProductListRow({ product, category, onClick, lang }: ProductListRowProps) {
  const status = getWarrantyStatus(product);
  const days = getDaysUntilExpiry(product);
  const expiry = getWarrantyExpiry(product);
  const tStatus = translations[lang].status;
  const tProducts = translations[lang].products;

  return (
    <button
      onClick={onClick}
      className="w-full text-left bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md hover:border-brand-100 transition-all px-4 py-3 flex items-center gap-4 group"
    >
      <div className="w-9 h-9 rounded-lg flex-shrink-0 overflow-hidden">
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
                parent.innerHTML = `<div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;font-size:1rem;background:${category ? category.color + '15' : '#f1f5f9'}">📦</div>`;
              }
            }}
          />
        ) : (
          <div
            className="w-full h-full flex items-center justify-center text-base"
            style={{ backgroundColor: category ? `${category.color}15` : '#f1f5f9' }}
          >
            {category ? getCategoryIcon(category.icon) : '📦'}
          </div>
        )}
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <p className="font-semibold text-gray-900 text-sm truncate">{product.name}</p>
          {product.brand && <span className="text-xs text-gray-400 hidden sm:block">{product.brand}</span>}
        </div>
        <div className="flex items-center gap-3 mt-0.5">
          <span className="text-xs text-gray-400">{tProducts.purchased} {formatDate(product.purchase_date, lang)}</span>
          {product.purchase_price && (
            <span className="text-xs text-gray-500 font-medium">{formatCurrency(product.purchase_price, product.currency, lang)}</span>
          )}
        </div>
      </div>

      <div className="flex items-center gap-3 flex-shrink-0">
        <div className="text-right hidden sm:block">
          <p className="text-xs text-gray-400">{tProducts.expires}</p>
          <p className="text-sm font-semibold text-gray-700">{formatDate(expiry.toISOString(), lang)}</p>
        </div>

        {status !== 'expired' && (
          <div className={`text-center ${days <= 30 ? 'text-red-600' : days <= 90 ? 'text-amber-600' : 'text-gray-500'}`}>
            <p className="text-sm font-black">{days}</p>
            <p className="text-xs">{tProducts.days}</p>
          </div>
        )}

        <span className={`text-xs font-semibold px-2 py-1 rounded-full border hidden sm:block ${getStatusBg(status)}`}>
          {getStatusLabel(status, tStatus)}
        </span>

        <ChevronRight size={16} className="text-gray-300 group-hover:text-brand-300 transition-colors" />
      </div>
    </button>
  );
}
