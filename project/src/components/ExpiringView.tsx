import { Clock, AlertTriangle, CheckCircle } from 'lucide-react';
import type { Product, Category } from '../lib/database.types';
import { getWarrantyStatus, getDaysUntilExpiry, getWarrantyExpiry, formatDate, getCategoryIcon } from '../lib/utils';
import { translations, type Lang } from '../lib/translations';

interface ExpiringViewProps {
  products: Product[];
  categories: Category[];
  onViewProduct: (product: Product) => void;
  lang: Lang;
}

export default function ExpiringView({ products, categories, onViewProduct, lang }: ExpiringViewProps) {
  const t = translations[lang].expiring;
  const getCategoryById = (id: string | null) => categories.find(c => c.id === id) || null;

  const expiring = products
    .filter(p => getWarrantyStatus(p) === 'expiring_soon')
    .sort((a, b) => getDaysUntilExpiry(a) - getDaysUntilExpiry(b));

  const today7 = expiring.filter(p => getDaysUntilExpiry(p) <= 7);
  const days30 = expiring.filter(p => getDaysUntilExpiry(p) > 7 && getDaysUntilExpiry(p) <= 30);
  const days90 = expiring.filter(p => getDaysUntilExpiry(p) > 30 && getDaysUntilExpiry(p) <= 90);

  function ProductRow({ product }: { product: Product }) {
    const days = getDaysUntilExpiry(product);
    const expiry = getWarrantyExpiry(product);
    const cat = getCategoryById(product.category_id);
    const urgency = days <= 7 ? 'border-red-200 bg-red-50' : days <= 30 ? 'border-amber-200 bg-amber-50' : 'border-gray-100 bg-white';

    return (
      <button
        onClick={() => onViewProduct(product)}
        className={`w-full text-left rounded-xl border p-4 hover:shadow-md transition-all flex items-center gap-4 ${urgency}`}
      >
        <div
          className="w-11 h-11 rounded-xl flex items-center justify-center text-xl flex-shrink-0"
          style={{ backgroundColor: cat ? `${cat.color}15` : '#f1f5f9' }}
        >
          {cat ? getCategoryIcon(cat.icon) : '📦'}
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-bold text-gray-900">{product.name}</p>
          <div className="flex items-center gap-2 mt-0.5">
            {product.brand && <span className="text-xs text-gray-400">{product.brand}</span>}
            <span className="text-xs text-gray-400">·</span>
            <span className="text-xs text-gray-500">{t.expires} {formatDate(expiry.toISOString(), lang)}</span>
          </div>
        </div>
        <div className={`text-center flex-shrink-0 ${days <= 7 ? 'text-red-600' : days <= 30 ? 'text-amber-600' : 'text-gray-600'}`}>
          <p className="text-2xl font-black">{days}</p>
          <p className="text-xs font-medium">{t.days}</p>
        </div>
      </button>
    );
  }

  function Section({ title, items, icon: Icon, color }: { title: string; items: Product[]; icon: typeof Clock; color: string }) {
    if (items.length === 0) return null;
    return (
      <div>
        <div className={`flex items-center gap-2 mb-3 ${color}`}>
          <Icon size={16} />
          <h2 className="font-bold text-sm">{title} ({items.length})</h2>
        </div>
        <div className="space-y-2">
          {items.map(p => <ProductRow key={p.id} product={p} />)}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="mb-8">
        <h1 className="text-2xl font-black text-gray-900">{t.title}</h1>
        <p className="text-gray-500 text-sm mt-1">{t.subtitle}</p>
      </div>

      {expiring.length === 0 ? (
        <div className="text-center py-16">
          <div className="w-20 h-20 bg-emerald-50 rounded-3xl flex items-center justify-center mx-auto mb-4">
            <CheckCircle size={36} className="text-emerald-400" />
          </div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">{t.allGood}</h2>
          <p className="text-gray-500">{t.allGoodSub}</p>
        </div>
      ) : (
        <div className="space-y-8">
          <Section title={t.critical} items={today7} icon={AlertTriangle} color="text-red-600" />
          <Section title={t.urgent} items={days30} icon={Clock} color="text-amber-600" />
          <Section title={t.soon} items={days90} icon={Clock} color="text-gray-600" />
        </div>
      )}
    </div>
  );
}
