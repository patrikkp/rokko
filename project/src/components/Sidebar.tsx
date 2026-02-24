import { LayoutDashboard, Shield, Clock, Tag, BarChart3, Settings, X, Plus } from 'lucide-react';
import { translations, type Lang } from '../lib/translations';

export type AppView = 'dashboard' | 'products' | 'expiring' | 'categories' | 'analytics' | 'settings';

interface SidebarProps {
  currentView: AppView;
  onViewChange: (view: AppView) => void;
  onAddProduct: () => void;
  expiringCount: number;
  isOpen: boolean;
  onClose: () => void;
  lang: Lang;
}

interface SidebarContentProps {
  currentView: AppView;
  onViewChange: (view: AppView) => void;
  onAddProduct: () => void;
  expiringCount: number;
  onClose?: () => void;
  lang: Lang;
}

function SidebarContent({ currentView, onViewChange, onAddProduct, expiringCount, onClose, lang }: SidebarContentProps) {
  const t = translations[lang].app;

  const navItems = [
    { id: 'dashboard' as AppView, label: t.navDashboard, icon: LayoutDashboard },
    { id: 'products' as AppView, label: t.navProducts, icon: Shield },
    { id: 'expiring' as AppView, label: t.navExpiring, icon: Clock, badge: true },
    { id: 'categories' as AppView, label: t.navCategories, icon: Tag },
    { id: 'analytics' as AppView, label: t.navAnalytics, icon: BarChart3 },
    { id: 'settings' as AppView, label: t.navSettings, icon: Settings },
  ];

  function handleNavClick(view: AppView) {
    onViewChange(view);
    onClose?.();
  }

  return (
    <div className="flex flex-col h-full">
      <div className="p-4 mb-2">
        <button
          onClick={() => { onAddProduct(); onClose?.(); }}
          className="w-full flex items-center justify-center gap-2 bg-brand-500 hover:bg-brand-600 text-white font-semibold py-2.5 px-4 rounded-xl text-sm transition-colors shadow-sm"
        >
          <Plus size={16} />
          {t.addWarranty}
        </button>
      </div>

      <nav className="flex-1 px-3 space-y-0.5">
        {navItems.map(item => (
          <button
            key={item.id}
            onClick={() => handleNavClick(item.id)}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
              currentView === item.id
                ? 'bg-brand-50 text-brand-600'
                : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
            }`}
          >
            <item.icon size={17} className={currentView === item.id ? 'text-brand-500' : 'text-gray-400'} />
            <span>{item.label}</span>
            {item.badge && expiringCount > 0 && (
              <span className="ml-auto bg-amber-500 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                {expiringCount > 9 ? '9+' : expiringCount}
              </span>
            )}
          </button>
        ))}
      </nav>

      <div className="p-4 border-t border-gray-100">
        <div className="bg-brand-50 rounded-xl p-3">
          <p className="text-xs font-semibold text-brand-700 mb-1">{t.euBanner}</p>
          <p className="text-xs text-brand-500">{t.euBannerSub}</p>
        </div>
      </div>
    </div>
  );
}

export default function Sidebar({ currentView, onViewChange, onAddProduct, expiringCount, isOpen, onClose, lang }: SidebarProps) {
  return (
    <>
      <aside className="hidden lg:flex flex-col w-56 bg-white border-r border-gray-100 fixed left-0 top-16 bottom-0 z-30">
        <SidebarContent
          currentView={currentView}
          onViewChange={onViewChange}
          onAddProduct={onAddProduct}
          expiringCount={expiringCount}
          lang={lang}
        />
      </aside>

      {isOpen && (
        <>
          <div className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm lg:hidden" onClick={onClose} />
          <aside className="fixed left-0 top-0 bottom-0 w-72 bg-white z-50 shadow-2xl lg:hidden flex flex-col">
            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
              <img src="/rokko-warranty.png" alt="Rokko" className="h-7 w-7 rounded-lg object-cover" />
              <span style={{ fontFamily: "'Extenda', 'Big Shoulders Display', sans-serif", fontWeight: 900 }} className="text-gray-900 text-lg">Rokko</span>
              <button onClick={onClose} className="text-gray-400 hover:text-gray-600 w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100">
                <X size={18} />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto">
              <SidebarContent
                currentView={currentView}
                onViewChange={onViewChange}
                onAddProduct={onAddProduct}
                expiringCount={expiringCount}
                onClose={onClose}
                lang={lang}
              />
            </div>
          </aside>
        </>
      )}
    </>
  );
}
