import { useState } from 'react';
import { ArrowLeft, Edit, Trash2, Calendar, Package, Phone, Mail, Hash, AlertTriangle, CheckCircle2, Shield, Clock, Scale, ExternalLink, FileText, QrCode } from 'lucide-react';
import type { Product, Category, ClaimLog } from '../lib/database.types';
import {
  getWarrantyStatus,
  getDaysUntilExpiry,
  getWarrantyExpiry,
  getCommercialExpiry,
  getEuStatutoryExpiry,
  formatCurrency,
  formatDate,
  getStatusBg,
  getStatusLabel,
  getCategoryIcon,
} from '../lib/utils';
import { translations, type Lang } from '../lib/translations';
import { supabase } from '../lib/supabase';

interface ProductDetailProps {
  product: Product;
  category: Category | null;
  claims: ClaimLog[];
  onBack: () => void;
  onEdit: () => void;
  onDeleted: () => void;
  onClaimsUpdated: () => void;
  lang: Lang;
}

export default function ProductDetail({ product, category, claims, onBack, onEdit, onDeleted, onClaimsUpdated, lang }: ProductDetailProps) {
  const [deletingConfirm, setDeletingConfirm] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [showAddClaim, setShowAddClaim] = useState(false);
  const [claimTitle, setClaimTitle] = useState('');
  const [claimDesc, setClaimDesc] = useState('');
  const [savingClaim, setSavingClaim] = useState(false);

  const t = translations[lang].detail;
  const tStatus = translations[lang].status;

  const status = getWarrantyStatus(product);
  const days = getDaysUntilExpiry(product);
  const commercialExpiry = getCommercialExpiry(product);
  const euExpiry = getEuStatutoryExpiry(product);
  const effectiveExpiry = getWarrantyExpiry(product);

  async function handleDelete() {
    setDeleting(true);
    await supabase.from('products').delete().eq('id', product.id);
    setDeleting(false);
    onDeleted();
  }

  async function handleAddClaim(e: React.FormEvent) {
    e.preventDefault();
    if (!claimTitle.trim()) return;
    setSavingClaim(true);
    await supabase.from('claim_logs').insert({
      product_id: product.id,
      user_id: product.user_id,
      title: claimTitle.trim(),
      description: claimDesc.trim() || null,
    });
    setClaimTitle('');
    setClaimDesc('');
    setShowAddClaim(false);
    setSavingClaim(false);
    onClaimsUpdated();
  }

  const claimStatusMap: Record<string, { label: string; color: string }> = {
    pending: { label: t.claimPending, color: 'bg-gray-100 text-gray-600' },
    submitted: { label: t.claimSubmitted, color: 'bg-brand-50 text-brand-500' },
    in_review: { label: t.claimInReview, color: 'bg-amber-100 text-amber-600' },
    approved: { label: t.claimApproved, color: 'bg-emerald-100 text-emerald-600' },
    rejected: { label: t.claimRejected, color: 'bg-red-100 text-red-600' },
    resolved: { label: t.claimResolved, color: 'bg-brand-50 text-brand-500' },
  };

  const claimSteps = [
    { step: 1, title: t.claimGuideStep1Title, desc: t.claimGuideStep1Desc },
    { step: 2, title: t.claimGuideStep2Title, desc: t.claimGuideStep2Desc },
    { step: 3, title: t.claimGuideStep3Title, desc: t.claimGuideStep3Desc },
    { step: 4, title: t.claimGuideStep4Title, desc: t.claimGuideStep4Desc },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="flex items-center justify-between mb-6">
        <button onClick={onBack} className="flex items-center gap-2 text-gray-500 hover:text-gray-700 transition-colors text-sm font-medium">
          <ArrowLeft size={16} />
          <span>{t.back}</span>
        </button>
        <div className="flex items-center gap-2">
          <button
            onClick={onEdit}
            className="flex items-center gap-2 px-3 py-2 border border-gray-200 text-gray-600 hover:bg-gray-50 rounded-lg text-sm font-medium transition-colors"
          >
            <Edit size={14} />
            <span>{t.edit}</span>
          </button>
          {!deletingConfirm ? (
            <button
              onClick={() => setDeletingConfirm(true)}
              className="flex items-center gap-2 px-3 py-2 border border-red-200 text-red-500 hover:bg-red-50 rounded-lg text-sm font-medium transition-colors"
            >
              <Trash2 size={14} />
              <span>{t.delete}</span>
            </button>
          ) : (
            <div className="flex items-center gap-2">
              <button onClick={() => setDeletingConfirm(false)} className="px-3 py-2 border border-gray-200 text-gray-600 rounded-lg text-sm">
                {t.cancel}
              </button>
              <button
                onClick={handleDelete}
                disabled={deleting}
                className="px-3 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg text-sm font-medium"
              >
                {deleting ? t.deleting : t.confirmDelete}
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-5">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <div className="flex items-start gap-4">
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl flex-shrink-0"
                style={{ backgroundColor: category ? `${category.color}15` : '#f1f5f9' }}
              >
                {category ? getCategoryIcon(category.icon) : '📦'}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h1 className="text-2xl font-black text-gray-900">{product.name}</h1>
                    {(product.brand || product.model) && (
                      <p className="text-gray-500 mt-0.5">
                        {[product.brand, product.model].filter(Boolean).join(' · ')}
                      </p>
                    )}
                  </div>
                  <span className={`text-sm font-bold px-3 py-1 rounded-full border flex-shrink-0 ${getStatusBg(status)}`}>
                    {getStatusLabel(status, tStatus)}
                  </span>
                </div>

                {product.serial_number && (
                  <div className="flex items-center gap-1.5 mt-2">
                    <Hash size={13} className="text-gray-400" />
                    <span className="text-sm text-gray-500 font-mono">{product.serial_number}</span>
                  </div>
                )}
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-6 pt-5 border-t border-gray-100">
              <div>
                <p className="text-xs text-gray-400 mb-0.5">{t.purchaseDate}</p>
                <p className="font-semibold text-gray-800 text-sm flex items-center gap-1">
                  <Calendar size={13} className="text-gray-400" />
                  {formatDate(product.purchase_date, lang)}
                </p>
              </div>
              {product.purchase_price && (
                <div>
                  <p className="text-xs text-gray-400 mb-0.5">{t.price}</p>
                  <p className="font-semibold text-gray-800 text-sm">{formatCurrency(product.purchase_price, product.currency, lang)}</p>
                </div>
              )}
              {category && (
                <div>
                  <p className="text-xs text-gray-400 mb-0.5">{t.category}</p>
                  <p className="font-semibold text-gray-800 text-sm">{category.name_hr}</p>
                </div>
              )}
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <h2 className="font-bold text-gray-900 mb-5 flex items-center gap-2">
              <Shield size={18} className="text-brand-500" />
              {t.warrantySection}
            </h2>

            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                <div>
                  <p className="text-sm font-medium text-gray-700">{t.commercialWarranty}</p>
                  <p className="text-xs text-gray-400">{product.warranty_months} {t.monthsFromPurchase}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-gray-800">{formatDate(commercialExpiry.toISOString(), lang)}</p>
                  {commercialExpiry > new Date() ? (
                    <p className="text-xs text-emerald-600">{t.active}</p>
                  ) : (
                    <p className="text-xs text-red-500">{t.expired}</p>
                  )}
                </div>
              </div>

              <div className="flex items-center justify-between p-3 bg-brand-50 rounded-xl border border-brand-50">
                <div>
                  <div className="flex items-center gap-1.5">
                    <Scale size={13} className="text-brand-500" />
                    <p className="text-sm font-medium text-brand-700">{t.euStatutory}</p>
                  </div>
                  <p className="text-xs text-brand-400">{product.eu_statutory_months} {t.months} · {t.euDirective}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-brand-700">{formatDate(euExpiry.toISOString(), lang)}</p>
                  {euExpiry > new Date() ? (
                    <p className="text-xs text-emerald-600">{t.active}</p>
                  ) : (
                    <p className="text-xs text-red-500">{t.expired}</p>
                  )}
                </div>
              </div>

              <div className={`flex items-center justify-between p-4 rounded-xl border-2 ${
                status === 'active' ? 'bg-emerald-50 border-emerald-200' :
                status === 'expiring_soon' ? 'bg-amber-50 border-amber-200' :
                'bg-red-50 border-red-200'
              }`}>
                <div>
                  <p className="text-sm font-bold text-gray-800">{t.effectiveProtection}</p>
                  <p className="text-xs text-gray-500">{t.effectiveSub}</p>
                </div>
                <div className="text-right">
                  <p className="text-base font-black text-gray-900">{formatDate(effectiveExpiry.toISOString(), lang)}</p>
                  {status !== 'expired' && (
                    <p className={`text-xs font-bold flex items-center gap-1 justify-end ${days <= 30 ? 'text-red-600' : days <= 90 ? 'text-amber-600' : 'text-emerald-600'}`}>
                      <Clock size={11} />
                      {days} {t.daysLeft}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {product.notes && (
              <div className="mt-4 pt-4 border-t border-gray-100">
                <p className="text-xs text-gray-400 mb-1">{t.notes}</p>
                <p className="text-sm text-gray-600">{product.notes}</p>
              </div>
            )}
          </div>

          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <div className="flex items-center justify-between mb-5">
              <h2 className="font-bold text-gray-900 flex items-center gap-2">
                <AlertTriangle size={18} className="text-amber-500" />
                {t.claimGuide}
              </h2>
            </div>
            <div className="space-y-3">
              {claimSteps.map(step => (
                <div key={step.step} className="flex gap-4">
                  <div className="w-7 h-7 bg-brand-50 text-brand-600 rounded-full flex items-center justify-center text-xs font-black flex-shrink-0">
                    {step.step}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-800">{step.title}</p>
                    <p className="text-xs text-gray-500 mt-0.5">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <div className="flex items-center justify-between mb-5">
              <h2 className="font-bold text-gray-900 flex items-center gap-2">
                <FileText size={18} className="text-gray-600" />
                {t.claimsTitle} ({claims.length})
              </h2>
              <button
                onClick={() => setShowAddClaim(!showAddClaim)}
                className="text-sm text-brand-500 font-medium hover:text-brand-600 transition-colors"
              >
                {t.addClaim}
              </button>
            </div>

            {showAddClaim && (
              <form onSubmit={handleAddClaim} className="mb-5 bg-brand-50 rounded-xl p-4 space-y-3">
                <input
                  type="text"
                  value={claimTitle}
                  onChange={e => setClaimTitle(e.target.value)}
                  placeholder={t.claimTitlePlaceholder}
                  className="w-full px-3 py-2 border border-brand-100 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-400 bg-white"
                  required
                />
                <textarea
                  value={claimDesc}
                  onChange={e => setClaimDesc(e.target.value)}
                  placeholder={t.claimDescPlaceholder}
                  rows={2}
                  className="w-full px-3 py-2 border border-brand-100 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-400 bg-white resize-none"
                />
                <div className="flex gap-2">
                  <button type="button" onClick={() => setShowAddClaim(false)} className="flex-1 py-2 border border-gray-200 text-gray-600 text-sm rounded-lg">
                    {t.cancel}
                  </button>
                  <button type="submit" disabled={savingClaim} className="flex-1 py-2 bg-brand-500 text-white text-sm font-medium rounded-lg hover:bg-brand-600 disabled:opacity-50">
                    {savingClaim ? t.savingClaim : t.saveClaim}
                  </button>
                </div>
              </form>
            )}

            {claims.length === 0 ? (
              <p className="text-sm text-gray-400 text-center py-4">{t.noClaimsYet}</p>
            ) : (
              <div className="space-y-3">
                {claims.map(claim => (
                  <div key={claim.id} className="border border-gray-100 rounded-xl p-4">
                    <div className="flex items-start justify-between gap-2">
                      <p className="font-semibold text-gray-900 text-sm">{claim.title}</p>
                      <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${claimStatusMap[claim.status]?.color || 'bg-gray-100 text-gray-600'}`}>
                        {claimStatusMap[claim.status]?.label || claim.status}
                      </span>
                    </div>
                    {claim.description && <p className="text-xs text-gray-500 mt-1">{claim.description}</p>}
                    <p className="text-xs text-gray-400 mt-2">{formatDate(claim.created_at, lang)}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="space-y-5">
          <div className={`rounded-2xl p-5 ${
            status === 'active' ? 'bg-emerald-600' :
            status === 'expiring_soon' ? 'bg-amber-500' :
            'bg-red-500'
          } text-white`}>
            <div className="flex items-center gap-2 mb-2">
              {status === 'active' ? <CheckCircle2 size={18} /> : <AlertTriangle size={18} />}
              <span className="font-bold">{getStatusLabel(status, tStatus)}</span>
            </div>
            {status !== 'expired' ? (
              <>
                <div className="text-4xl font-black mb-1">{days}</div>
                <div className="text-sm opacity-80">{t.daysLeft}</div>
              </>
            ) : (
              <div className="text-sm opacity-80">{t.warrantyExpired}</div>
            )}
          </div>

          {(product.retailer_name || product.retailer_phone || product.retailer_email) && (
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
              <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Package size={16} className="text-gray-400" />
                {t.retailer}
              </h3>
              <div className="space-y-3">
                {product.retailer_name && (
                  <p className="font-semibold text-gray-800 text-sm">{product.retailer_name}</p>
                )}
                {product.retailer_phone && (
                  <a href={`tel:${product.retailer_phone}`} className="flex items-center gap-2 text-sm text-brand-500 hover:text-brand-600">
                    <Phone size={13} />
                    {product.retailer_phone}
                  </a>
                )}
                {product.retailer_email && (
                  <a href={`mailto:${product.retailer_email}`} className="flex items-center gap-2 text-sm text-brand-500 hover:text-brand-600">
                    <Mail size={13} />
                    <span className="truncate">{product.retailer_email}</span>
                  </a>
                )}
                {product.retailer_website && (
                  <a href={product.retailer_website} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-brand-500 hover:text-brand-600">
                    <ExternalLink size={13} />
                    {t.website}
                  </a>
                )}
              </div>
            </div>
          )}

          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
            <div className="flex items-center gap-2 mb-3">
              <QrCode size={16} className="text-gray-400" />
              <h3 className="font-bold text-gray-900">{t.qrTitle}</h3>
            </div>
            <p className="text-xs text-gray-500 mb-3">{t.qrDesc}</p>
            <button className="w-full py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium text-sm rounded-lg transition-colors">
              {t.qrGenerate}
            </button>
          </div>

          <div className="bg-brand-50 border border-brand-100 rounded-2xl p-5">
            <div className="flex items-center gap-2 mb-3">
              <Scale size={16} className="text-brand-500" />
              <h3 className="font-bold text-brand-700 text-sm">{t.euRights}</h3>
            </div>
            <div className="space-y-2">
              {[t.euRight1, t.euRight2, t.euRight3].map(right => (
                <div key={right} className="flex items-center gap-2">
                  <CheckCircle2 size={12} className="text-brand-400" />
                  <span className="text-xs text-brand-600">{right}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
