import { useState, useMemo } from 'react';
import { Search, Filter, Grid, List, SlidersHorizontal, X } from 'lucide-react';
import type { Product, Category } from '../lib/database.types';
import { getWarrantyStatus } from '../lib/utils';
import { translations, type Lang } from '../lib/translations';
import ProductCard from './ProductCard';
import ProductListRow from './ProductListRow';

interface ProductsListProps {
  products: Product[];
  categories: Category[];
  onViewProduct: (product: Product) => void;
  lang: Lang;
}

type FilterStatus = 'all' | 'active' | 'expiring_soon' | 'expired';
type SortBy = 'expiry' | 'name' | 'purchase_date' | 'price';
type ViewMode = 'grid' | 'list';

export default function ProductsList({ products, categories, onViewProduct, lang }: ProductsListProps) {
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState<FilterStatus>('all');
  const [filterCategory, setFilterCategory] = useState('');
  const [sortBy, setSortBy] = useState<SortBy>('expiry');
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [showFilters, setShowFilters] = useState(false);

  const t = translations[lang].products;

  const getCategoryById = (id: string | null) => categories.find(c => c.id === id) || null;

  const filtered = useMemo(() => {
    let result = [...products];

    if (search) {
      const q = search.toLowerCase();
      result = result.filter(p =>
        p.name.toLowerCase().includes(q) ||
        p.brand?.toLowerCase().includes(q) ||
        p.model?.toLowerCase().includes(q) ||
        p.retailer_name?.toLowerCase().includes(q)
      );
    }

    if (filterStatus !== 'all') {
      result = result.filter(p => getWarrantyStatus(p) === filterStatus);
    }

    if (filterCategory) {
      result = result.filter(p => p.category_id === filterCategory);
    }

    result.sort((a, b) => {
      switch (sortBy) {
        case 'expiry': {
          const aDate = new Date(a.purchase_date);
          aDate.setMonth(aDate.getMonth() + Math.max(a.warranty_months, a.eu_statutory_months));
          const bDate = new Date(b.purchase_date);
          bDate.setMonth(bDate.getMonth() + Math.max(b.warranty_months, b.eu_statutory_months));
          return aDate.getTime() - bDate.getTime();
        }
        case 'name': return a.name.localeCompare(b.name);
        case 'purchase_date': return new Date(b.purchase_date).getTime() - new Date(a.purchase_date).getTime();
        case 'price': return (b.purchase_price || 0) - (a.purchase_price || 0);
        default: return 0;
      }
    });

    return result;
  }, [products, search, filterStatus, filterCategory, sortBy]);

  const statusCounts = useMemo(() => ({
    all: products.length,
    active: products.filter(p => getWarrantyStatus(p) === 'active').length,
    expiring_soon: products.filter(p => getWarrantyStatus(p) === 'expiring_soon').length,
    expired: products.filter(p => getWarrantyStatus(p) === 'expired').length,
  }), [products]);

  const statusFilters: { id: FilterStatus; label: string; color: string }[] = [
    { id: 'all', label: t.filterAll, color: 'bg-gray-800 text-white border-gray-800' },
    { id: 'active', label: t.filterActive, color: 'bg-emerald-600 text-white border-emerald-600' },
    { id: 'expiring_soon', label: t.filterExpiring, color: 'bg-amber-500 text-white border-amber-500' },
    { id: 'expired', label: t.filterExpired, color: 'bg-red-500 text-white border-red-500' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-black text-gray-900">{t.title}</h1>
          <p className="text-gray-500 text-sm mt-0.5">{products.length} {t.total}</p>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 mb-5">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder={t.searchPlaceholder}
            className="w-full pl-9 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-400 focus:border-transparent bg-white"
          />
          {search && (
            <button onClick={() => setSearch('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
              <X size={14} />
            </button>
          )}
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`flex items-center gap-2 px-4 py-2.5 border rounded-xl text-sm font-medium transition-colors ${
              showFilters || filterCategory ? 'border-brand-400 bg-brand-50 text-brand-500' : 'border-gray-200 text-gray-600 hover:bg-gray-50'
            }`}
          >
            <SlidersHorizontal size={15} />
            <span className="hidden sm:block">{t.filters}</span>
          </button>

          <div className="flex border border-gray-200 rounded-xl overflow-hidden">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2.5 ${viewMode === 'grid' ? 'bg-gray-900 text-white' : 'text-gray-400 hover:bg-gray-50'} transition-colors`}
            >
              <Grid size={16} />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2.5 ${viewMode === 'list' ? 'bg-gray-900 text-white' : 'text-gray-400 hover:bg-gray-50'} transition-colors`}
            >
              <List size={16} />
            </button>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        {statusFilters.map(f => (
          <button
            key={f.id}
            onClick={() => setFilterStatus(f.id)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border transition-colors ${
              filterStatus === f.id ? f.color : 'bg-white border-gray-200 text-gray-600 hover:border-gray-300'
            }`}
          >
            {f.label}
            <span className={`text-xs ${filterStatus === f.id ? 'opacity-70' : 'text-gray-400'}`}>
              {statusCounts[f.id]}
            </span>
          </button>
        ))}
      </div>

      {showFilters && (
        <div className="bg-white border border-gray-100 rounded-2xl p-4 mb-5 shadow-sm">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1.5">{t.categoryLabel}</label>
              <select
                value={filterCategory}
                onChange={e => setFilterCategory(e.target.value)}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-400"
              >
                <option value="">{t.allCategories}</option>
                {categories.map(cat => (
                  <option key={cat.id} value={cat.id}>{cat.name_hr}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1.5">{t.sortBy}</label>
              <select
                value={sortBy}
                onChange={e => setSortBy(e.target.value as SortBy)}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-400"
              >
                <option value="expiry">{t.sortExpiry}</option>
                <option value="name">{t.sortName}</option>
                <option value="purchase_date">{t.sortPurchase}</option>
                <option value="price">{t.sortPrice}</option>
              </select>
            </div>
          </div>
          {filterCategory && (
            <button onClick={() => setFilterCategory('')} className="mt-3 text-xs text-brand-500 hover:text-brand-600 flex items-center gap-1">
              <X size={12} />
              {t.clearCategory}
            </button>
          )}
        </div>
      )}

      {filtered.length === 0 ? (
        <div className="text-center py-16">
          <Filter size={40} className="text-gray-200 mx-auto mb-3" />
          <p className="text-gray-500 font-medium">{t.noResults}</p>
          <p className="text-gray-400 text-sm mt-1">{t.noResultsSub}</p>
        </div>
      ) : viewMode === 'grid' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map(product => (
            <ProductCard
              key={product.id}
              product={product}
              category={getCategoryById(product.category_id)}
              onClick={() => onViewProduct(product)}
              lang={lang}
            />
          ))}
        </div>
      ) : (
        <div className="space-y-2">
          {filtered.map(product => (
            <ProductListRow
              key={product.id}
              product={product}
              category={getCategoryById(product.category_id)}
              onClick={() => onViewProduct(product)}
              lang={lang}
            />
          ))}
        </div>
      )}
    </div>
  );
}
