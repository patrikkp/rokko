import { useState, useEffect, useCallback } from 'react';
import { Menu } from 'lucide-react';
import type { User } from '@supabase/supabase-js';
import { supabase } from './lib/supabase';
import type { Product, Category, ClaimLog } from './lib/database.types';
import { getWarrantyStatus } from './lib/utils';
import { translations, type Lang } from './lib/translations';

import Navbar from './components/Navbar';
import Sidebar, { type AppView } from './components/Sidebar';
import AuthModal from './components/AuthModal';
import LandingPage from './components/LandingPage';
import Dashboard from './components/Dashboard';
import ProductsList from './components/ProductsList';
import ProductDetail from './components/ProductDetail';
import AddProductModal from './components/AddProductModal';
import ExpiringView from './components/ExpiringView';
import AnalyticsView from './components/AnalyticsView';

type ProductEditPayload = {
  id: string;
  name: string;
  brand: string | null;
  model: string | null;
  serial_number: string | null;
  category_id: string | null;
  purchase_date: string;
  purchase_price: number | null;
  currency: string;
  warranty_months: number;
  retailer_name: string | null;
  retailer_phone: string | null;
  retailer_email: string | null;
  notes: string | null;
};

export default function App() {
  const [user, setUser] = useState<User | null>(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [showAuth, setShowAuth] = useState<'login' | 'register' | null>(null);
  const [lang, setLang] = useState<Lang>('hr');
  const t = translations[lang];
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentView, setCurrentView] = useState<AppView>('dashboard');
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [editProduct, setEditProduct] = useState<ProductEditPayload | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [claims, setClaims] = useState<ClaimLog[]>([]);
  const [loadingData, setLoadingData] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setAuthLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const loadCategories = useCallback(async () => {
    const { data } = await supabase.from('categories').select('*').order('name_hr');
    if (data) setCategories(data);
  }, []);

  const loadProducts = useCallback(async () => {
    if (!user) return;
    setLoadingData(true);
    const { data } = await supabase
      .from('products')
      .select('*')
      .eq('user_id', user.id)
      .eq('is_active', true)
      .order('created_at', { ascending: false });
    if (data) setProducts(data);
    setLoadingData(false);
  }, [user]);

  const loadClaims = useCallback(async (productId: string) => {
    const { data } = await supabase
      .from('claim_logs')
      .select('*')
      .eq('product_id', productId)
      .order('created_at', { ascending: false });
    if (data) setClaims(data);
  }, []);

  useEffect(() => {
    loadCategories();
  }, [loadCategories]);

  useEffect(() => {
    if (user) {
      loadProducts();
    } else {
      setProducts([]);
    }
  }, [user, loadProducts]);

  useEffect(() => {
    if (selectedProduct) {
      loadClaims(selectedProduct.id);
    }
  }, [selectedProduct, loadClaims]);

  const expiringCount = products.filter(p => getWarrantyStatus(p) === 'expiring_soon').length;

  function handleViewProduct(product: Product) {
    setSelectedProduct(product);
    setCurrentView('products');
  }

  function handleEditProduct(product: Product) {
    setEditProduct({
      id: product.id,
      name: product.name,
      brand: product.brand,
      model: product.model,
      serial_number: product.serial_number,
      category_id: product.category_id,
      purchase_date: product.purchase_date,
      purchase_price: product.purchase_price,
      currency: product.currency,
      warranty_months: product.warranty_months,
      retailer_name: product.retailer_name,
      retailer_phone: product.retailer_phone,
      retailer_email: product.retailer_email,
      notes: product.notes,
    });
    setShowAddProduct(true);
  }

  function handleProductDeleted() {
    setSelectedProduct(null);
    loadProducts();
  }

  if (authLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-2 border-brand-500 border-t-transparent rounded-full animate-spin" />
          <p className="text-gray-500 text-sm">{t.app.loading}</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <>
        <LandingPage onShowAuth={setShowAuth} lang={lang} onLangChange={setLang} />
        {showAuth && (
          <AuthModal onClose={() => setShowAuth(null)} initialMode={showAuth} lang={lang} />
        )}
      </>
    );
  }

  const getCategoryById = (id: string | null) => categories.find(c => c.id === id) || null;

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar
        user={user}
        onShowAuth={setShowAuth}
        onAddProduct={() => { setEditProduct(null); setShowAddProduct(true); }}
        expiringCount={expiringCount}
        lang={lang}
        onLangChange={setLang}
      />

      <Sidebar
        currentView={currentView}
        onViewChange={view => { setCurrentView(view); setSelectedProduct(null); }}
        onAddProduct={() => { setEditProduct(null); setShowAddProduct(true); }}
        expiringCount={expiringCount}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        lang={lang}
      />

      {/* Mobile menu button */}
      <button
        onClick={() => setSidebarOpen(true)}
        className="lg:hidden fixed bottom-5 left-5 z-30 w-12 h-12 bg-white shadow-lg border border-gray-200 rounded-2xl flex items-center justify-center text-gray-600 hover:bg-gray-50 transition-colors"
      >
        <Menu size={20} />
      </button>

      {/* Main content */}
      <main className="lg:ml-56 min-h-[calc(100vh-4rem)]">
        {loadingData && products.length === 0 ? (
          <div className="flex items-center justify-center py-32">
            <div className="w-8 h-8 border-2 border-brand-500 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : selectedProduct && currentView === 'products' ? (
          <ProductDetail
            product={selectedProduct}
            category={getCategoryById(selectedProduct.category_id)}
            claims={claims}
            onBack={() => setSelectedProduct(null)}
            onEdit={() => handleEditProduct(selectedProduct)}
            onDeleted={handleProductDeleted}
            onClaimsUpdated={() => loadClaims(selectedProduct.id)}
            lang={lang}
          />
        ) : currentView === 'dashboard' ? (
          <Dashboard
            products={products}
            categories={categories}
            onAddProduct={() => { setEditProduct(null); setShowAddProduct(true); }}
            onViewProduct={handleViewProduct}
            lang={lang}
          />
        ) : currentView === 'products' ? (
          <ProductsList
            products={products}
            categories={categories}
            onViewProduct={handleViewProduct}
            lang={lang}
          />
        ) : currentView === 'expiring' ? (
          <ExpiringView
            products={products}
            categories={categories}
            onViewProduct={handleViewProduct}
            lang={lang}
          />
        ) : currentView === 'analytics' ? (
          <AnalyticsView
            products={products}
            categories={categories}
            lang={lang}
          />
        ) : currentView === 'categories' ? (
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <h1 className="text-2xl font-black text-gray-900 mb-6">{t.app.categories}</h1>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {categories.map(cat => {
                const count = products.filter(p => p.category_id === cat.id).length;
                const countLabel = count === 1 ? t.app.warranty : count < 5 ? t.app.warranties2to4 : t.app.warrantiesMany;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setCurrentView('products')}
                    className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 hover:shadow-md hover:border-brand-100 transition-all text-left"
                  >
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl mb-3" style={{ backgroundColor: `${cat.color}15` }}>
                      {['📱','🏠','📺','💻','🚗','🔧','⚽','🪑','👕','🎮','🍴','📦'][categories.indexOf(cat)] || '📦'}
                    </div>
                    <p className="font-bold text-gray-900 text-sm">{cat.name_hr}</p>
                    <p className="text-xs text-gray-400 mt-0.5">{count} {countLabel}</p>
                  </button>
                );
              })}
            </div>
          </div>
        ) : (
          <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
            <p className="text-gray-400">{t.app.comingSoon}</p>
          </div>
        )}
      </main>

      {showAddProduct && (
        <AddProductModal
          user={user}
          categories={categories}
          onClose={() => { setShowAddProduct(false); setEditProduct(null); }}
          onAdded={loadProducts}
          editProduct={editProduct || undefined}
          lang={lang}
        />
      )}

      {showAuth && (
        <AuthModal onClose={() => setShowAuth(null)} initialMode={showAuth} lang={lang} />
      )}
    </div>
  );
}
