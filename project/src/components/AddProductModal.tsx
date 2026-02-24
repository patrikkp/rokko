import { useState, useRef } from 'react';
import { X, Package, Info, ChevronDown, Upload, Image, FileText, Trash2, CheckCircle } from 'lucide-react';
import type { Category } from '../lib/database.types';
import { supabase } from '../lib/supabase';
import { CURRENCIES, getWarrantyPresets, getCategoryIcon } from '../lib/utils';
import { translations, type Lang } from '../lib/translations';
import type { User } from '@supabase/supabase-js';

interface AddProductModalProps {
  user: User;
  categories: Category[];
  onClose: () => void;
  onAdded: () => void;
  lang: Lang;
  editProduct?: {
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
    image_url?: string | null;
    receipt_url?: string | null;
  };
}

type Tab = 'basic' | 'warranty' | 'retailer' | 'documents';

interface UploadState {
  file: File | null;
  url: string | null;
  uploading: boolean;
  error: string;
  preview: string | null;
}

const MAX_FILE_SIZE = 10 * 1024 * 1024;

export default function AddProductModal({ user, categories, onClose, onAdded, lang, editProduct }: AddProductModalProps) {
  const isEdit = !!editProduct;
  const t = translations[lang].modal;
  const warrantyPresets = getWarrantyPresets(translations[lang].warrantyPresets);
  const [tab, setTab] = useState<Tab>('basic');

  const [name, setName] = useState(editProduct?.name || '');
  const [brand, setBrand] = useState(editProduct?.brand || '');
  const [model, setModel] = useState(editProduct?.model || '');
  const [serialNumber, setSerialNumber] = useState(editProduct?.serial_number || '');
  const [categoryId, setCategoryId] = useState(editProduct?.category_id || '');
  const [purchaseDate, setPurchaseDate] = useState(editProduct?.purchase_date || new Date().toISOString().split('T')[0]);
  const [purchasePrice, setPurchasePrice] = useState(editProduct?.purchase_price?.toString() || '');
  const [currency, setCurrency] = useState(editProduct?.currency || 'EUR');
  const [warrantyMonths, setWarrantyMonths] = useState(editProduct?.warranty_months?.toString() || '24');
  const [retailerName, setRetailerName] = useState(editProduct?.retailer_name || '');
  const [retailerPhone, setRetailerPhone] = useState(editProduct?.retailer_phone || '');
  const [retailerEmail, setRetailerEmail] = useState(editProduct?.retailer_email || '');
  const [notes, setNotes] = useState(editProduct?.notes || '');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const isImageUrl = (url: string | null | undefined) =>
    !!url && /\.(jpg|jpeg|png|webp|heic)(\?|$)/i.test(url);

  const [imageUpload, setImageUpload] = useState<UploadState>({
    file: null,
    url: editProduct?.image_url || null,
    uploading: false,
    error: '',
    preview: isImageUrl(editProduct?.image_url) ? editProduct!.image_url! : null,
  });
  const [receiptUpload, setReceiptUpload] = useState<UploadState>({
    file: null,
    url: editProduct?.receipt_url || null,
    uploading: false,
    error: '',
    preview: isImageUrl(editProduct?.receipt_url) ? editProduct!.receipt_url! : null,
  });

  const imageInputRef = useRef<HTMLInputElement>(null);
  const receiptInputRef = useRef<HTMLInputElement>(null);

  const tabs: { id: Tab; label: string }[] = [
    { id: 'basic', label: t.tabBasic },
    { id: 'warranty', label: t.tabWarranty },
    { id: 'retailer', label: t.tabRetailer },
    { id: 'documents', label: t.tabDocuments },
  ];

  const localeMap: Record<Lang, string> = { hr: 'hr-HR', en: 'en-GB', de: 'de-DE', bs: 'bs-BA' };

  async function uploadFile(file: File, type: 'image' | 'receipt'): Promise<string | null> {
    const ext = file.name.split('.').pop();
    const path = `${user.id}/${type}-${Date.now()}.${ext}`;

    const { error: uploadError } = await supabase.storage
      .from('product-files')
      .upload(path, file, { upsert: true });

    if (uploadError) throw uploadError;

    const { data } = supabase.storage.from('product-files').getPublicUrl(path);
    return data.publicUrl;
  }

  async function handleFileSelect(
    e: React.ChangeEvent<HTMLInputElement>,
    type: 'image' | 'receipt',
    setter: React.Dispatch<React.SetStateAction<UploadState>>
  ) {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > MAX_FILE_SIZE) {
      setter(prev => ({ ...prev, error: t.uploadSizeError }));
      return;
    }

    const isImage = file.type.startsWith('image/');
    const preview = isImage ? URL.createObjectURL(file) : null;

    setter(prev => ({ ...prev, file, preview, error: '', uploading: true }));

    try {
      const url = await uploadFile(file, type);
      setter(prev => ({ ...prev, url, uploading: false }));
    } catch {
      setter(prev => ({ ...prev, uploading: false, error: t.uploadError }));
    }
  }

  function handleRemove(
    type: 'image' | 'receipt',
    setter: React.Dispatch<React.SetStateAction<UploadState>>,
    inputRef: React.RefObject<HTMLInputElement>
  ) {
    setter({ file: null, url: null, uploading: false, error: '', preview: null });
    if (inputRef.current) inputRef.current.value = '';
  }

  const hasDocuments = !!(imageUpload.url || receiptUpload.url);
  const canSubmit = !!(name.trim() || hasDocuments);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!canSubmit) return;
    setLoading(true);
    setError('');

    const fallbackNames: Record<Lang, string> = {
      hr: 'Nepoznat proizvod',
      en: 'Unknown product',
      de: 'Unbekanntes Produkt',
      bs: 'Nepoznat proizvod',
    };

    try {
      const payload = {
        user_id: user.id,
        name: name.trim() || fallbackNames[lang],
        brand: brand.trim() || null,
        model: model.trim() || null,
        serial_number: serialNumber.trim() || null,
        category_id: categoryId || null,
        purchase_date: purchaseDate || new Date().toISOString().split('T')[0],
        purchase_price: purchasePrice ? parseFloat(purchasePrice) : null,
        currency,
        warranty_months: parseInt(warrantyMonths) || 24,
        eu_statutory_months: 24,
        retailer_name: retailerName.trim() || null,
        retailer_phone: retailerPhone.trim() || null,
        retailer_email: retailerEmail.trim() || null,
        notes: notes.trim() || null,
        image_url: imageUpload.url,
        receipt_url: receiptUpload.url,
      };

      if (isEdit && editProduct) {
        const { error } = await supabase.from('products').update(payload).eq('id', editProduct.id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from('products').insert(payload);
        if (error) throw error;
      }

      onAdded();
      onClose();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : t.errorSaving);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full sm:max-w-xl bg-white sm:rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[95vh] sm:max-h-[90vh]">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-brand-50 rounded-xl flex items-center justify-center">
              <Package size={18} className="text-brand-500" />
            </div>
            <div>
              <h2 className="font-bold text-gray-900 text-base">{isEdit ? t.editWarranty : t.newWarranty}</h2>
              <p className="text-xs text-gray-400">{t.enterProductData}</p>
            </div>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100">
            <X size={18} />
          </button>
        </div>

        <div className="flex border-b border-gray-100 px-6 overflow-x-auto">
          {tabs.map(tabItem => (
            <button
              key={tabItem.id}
              onClick={() => setTab(tabItem.id)}
              className={`py-3 px-1 mr-5 text-sm font-medium border-b-2 transition-colors whitespace-nowrap flex items-center gap-1.5 ${
                tab === tabItem.id ? 'border-brand-500 text-brand-500' : 'border-transparent text-gray-400 hover:text-gray-600'
              }`}
            >
              {tabItem.label}
              {tabItem.id === 'documents' && (imageUpload.url || receiptUpload.url) && (
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 inline-block" />
              )}
            </button>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col flex-1 overflow-hidden">
          <div className="flex-1 overflow-y-auto px-6 py-5 space-y-4">
            {tab === 'basic' && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">{t.productName}</label>
                  <input
                    type="text"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    placeholder={t.productNamePlaceholder}
                    className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-400 focus:border-transparent"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">{t.brand}</label>
                    <input
                      type="text"
                      value={brand}
                      onChange={e => setBrand(e.target.value)}
                      placeholder={t.brandPlaceholder}
                      className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-400 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">{t.model}</label>
                    <input
                      type="text"
                      value={model}
                      onChange={e => setModel(e.target.value)}
                      placeholder={t.modelPlaceholder}
                      className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-400 focus:border-transparent"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">{t.category}</label>
                  <div className="relative">
                    <select
                      value={categoryId}
                      onChange={e => setCategoryId(e.target.value)}
                      className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-400 focus:border-transparent appearance-none bg-white"
                    >
                      <option value="">{t.selectCategory}</option>
                      {categories.map(cat => (
                        <option key={cat.id} value={cat.id}>
                          {getCategoryIcon(cat.icon)} {cat.name_hr}
                        </option>
                      ))}
                    </select>
                    <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">{t.serialNumber}</label>
                  <input
                    type="text"
                    value={serialNumber}
                    onChange={e => setSerialNumber(e.target.value)}
                    placeholder={t.serialPlaceholder}
                    className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-400 focus:border-transparent"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">{t.purchaseDate}</label>
                    <input
                      type="date"
                      value={purchaseDate}
                      onChange={e => setPurchaseDate(e.target.value)}
                      className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-400 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">{t.price}</label>
                    <div className="flex gap-2">
                      <input
                        type="number"
                        value={purchasePrice}
                        onChange={e => setPurchasePrice(e.target.value)}
                        placeholder="0.00"
                        step="0.01"
                        min="0"
                        className="flex-1 min-w-0 px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-400 focus:border-transparent"
                      />
                      <div className="relative">
                        <select
                          value={currency}
                          onChange={e => setCurrency(e.target.value)}
                          className="px-2 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-400 focus:border-transparent appearance-none bg-white pr-6"
                        >
                          {CURRENCIES.map(c => (
                            <option key={c.code} value={c.code}>{c.code}</option>
                          ))}
                        </select>
                        <ChevronDown size={12} className="absolute right-1.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}

            {tab === 'warranty' && (
              <>
                <div className="bg-brand-50 border border-brand-100 rounded-xl p-4 flex gap-3">
                  <Info size={16} className="text-brand-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-semibold text-brand-700">{t.euWarrantyTitle}</p>
                    <p className="text-xs text-brand-500 mt-1">{t.euWarrantyDesc}</p>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">{t.commercialWarrantyMonths}</label>
                  <div className="grid grid-cols-3 gap-2 mb-3">
                    {warrantyPresets.map(preset => (
                      <button
                        key={preset.months}
                        type="button"
                        onClick={() => setWarrantyMonths(preset.months.toString())}
                        className={`py-2 px-3 text-xs font-medium rounded-lg border transition-colors ${
                          warrantyMonths === preset.months.toString()
                            ? 'bg-brand-500 border-brand-500 text-white'
                            : 'bg-white border-gray-200 text-gray-600 hover:border-brand-200'
                        }`}
                      >
                        {preset.label}
                      </button>
                    ))}
                  </div>
                  <input
                    type="number"
                    value={warrantyMonths}
                    onChange={e => setWarrantyMonths(e.target.value)}
                    placeholder={t.monthsPlaceholder}
                    min="1"
                    max="360"
                    className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-400 focus:border-transparent"
                  />
                  <p className="text-xs text-gray-400 mt-1.5">{t.monthsHint}</p>
                </div>

                <div className="bg-gray-50 rounded-xl p-4 space-y-2">
                  <p className="text-sm font-semibold text-gray-700">{t.warrantyPreview}</p>
                  {purchaseDate && (
                    <>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">{t.commercialLabel}</span>
                        <span className="font-medium text-gray-800">
                          {new Date(new Date(purchaseDate).setMonth(new Date(purchaseDate).getMonth() + (parseInt(warrantyMonths) || 0))).toLocaleDateString(localeMap[lang])}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">{t.euLabel}</span>
                        <span className="font-medium text-gray-800">
                          {new Date(new Date(purchaseDate).setMonth(new Date(purchaseDate).getMonth() + 24)).toLocaleDateString(localeMap[lang])}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm border-t border-gray-200 pt-2 mt-2">
                        <span className="text-gray-700 font-medium">{t.effectiveLabel}</span>
                        <span className="font-bold text-brand-500">
                          {new Date(new Date(purchaseDate).setMonth(new Date(purchaseDate).getMonth() + Math.max(parseInt(warrantyMonths) || 0, 24))).toLocaleDateString(localeMap[lang])}
                        </span>
                      </div>
                    </>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">{t.notesLabel}</label>
                  <textarea
                    value={notes}
                    onChange={e => setNotes(e.target.value)}
                    placeholder={t.notesPlaceholder}
                    rows={3}
                    className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-400 focus:border-transparent resize-none"
                  />
                </div>
              </>
            )}

            {tab === 'retailer' && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">{t.retailerName}</label>
                  <input
                    type="text"
                    value={retailerName}
                    onChange={e => setRetailerName(e.target.value)}
                    placeholder={t.retailerNamePlaceholder}
                    className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-400 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">{t.retailerPhone}</label>
                  <input
                    type="tel"
                    value={retailerPhone}
                    onChange={e => setRetailerPhone(e.target.value)}
                    placeholder={t.retailerPhonePlaceholder}
                    className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-400 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">{t.retailerEmail}</label>
                  <input
                    type="email"
                    value={retailerEmail}
                    onChange={e => setRetailerEmail(e.target.value)}
                    placeholder={t.retailerEmailPlaceholder}
                    className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-400 focus:border-transparent"
                  />
                </div>

                <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
                  <p className="text-xs font-semibold text-amber-800 mb-1">{t.claimTip}</p>
                  <p className="text-xs text-amber-700">{t.claimTipDesc}</p>
                </div>
              </>
            )}

            {tab === 'documents' && (
              <>
                <div className="bg-blue-50 border border-blue-100 rounded-xl px-4 py-3 flex gap-2.5 items-start">
                  <Info size={15} className="text-blue-400 flex-shrink-0 mt-0.5" />
                  <p className="text-xs text-blue-600">
                    {lang === 'hr' || lang === 'bs'
                      ? 'Možete spremiti garanciju samo s dokumentima — naziv i datum kupovine nisu obavezni.'
                      : lang === 'de'
                      ? 'Sie können die Garantie nur mit Dokumenten speichern — Name und Kaufdatum sind optional.'
                      : 'You can save the warranty with documents only — name and purchase date are optional.'}
                  </p>
                </div>
                <FileUploadCard
                  label={t.productPhoto}
                  description={t.productPhotoDesc}
                  icon={<Image size={20} className="text-brand-400" />}
                  accept="image/jpeg,image/jpg,image/png,image/webp,image/heic"
                  state={imageUpload}
                  inputRef={imageInputRef}
                  onFileSelect={e => handleFileSelect(e, 'image', setImageUpload)}
                  onRemove={() => handleRemove('image', setImageUpload, imageInputRef)}
                  productName={name.trim()}
                  t={t}
                />

                <FileUploadCard
                  label={t.receiptPhoto}
                  description={t.receiptPhotoDesc}
                  icon={<FileText size={20} className="text-amber-400" />}
                  accept="image/jpeg,image/jpg,image/png,image/webp,image/heic,application/pdf"
                  state={receiptUpload}
                  inputRef={receiptInputRef}
                  onFileSelect={e => handleFileSelect(e, 'receipt', setReceiptUpload)}
                  onRemove={() => handleRemove('receipt', setReceiptUpload, receiptInputRef)}
                  productName={name.trim()}
                  t={t}
                />
              </>
            )}

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 text-sm px-3 py-2 rounded-lg">
                {error}
              </div>
            )}
          </div>

          <div className="px-6 py-4 border-t border-gray-100 flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2.5 border border-gray-200 text-gray-600 font-medium rounded-xl text-sm hover:bg-gray-50 transition-colors"
            >
              {t.cancel}
            </button>
            <button
              type="submit"
              disabled={loading || !canSubmit || imageUpload.uploading || receiptUpload.uploading}
              className="flex-1 py-2.5 bg-brand-500 hover:bg-brand-600 disabled:opacity-50 text-white font-semibold rounded-xl text-sm transition-colors"
            >
              {loading ? t.saving : isEdit ? t.saveChanges : t.addWarranty}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

interface FileUploadCardProps {
  label: string;
  description: string;
  icon: React.ReactNode;
  accept: string;
  state: UploadState;
  inputRef: React.RefObject<HTMLInputElement>;
  onFileSelect: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onRemove: () => void;
  t: ReturnType<typeof translations[Lang]['modal']['uploadBtn'] extends string ? () => typeof translations[Lang]['modal'] : never>;
}

function FileUploadCard({
  label,
  description,
  icon,
  accept,
  state,
  inputRef,
  onFileSelect,
  onRemove,
  productName,
  t,
}: {
  label: string;
  description: string;
  icon: React.ReactNode;
  accept: string;
  state: UploadState;
  inputRef: React.RefObject<HTMLInputElement>;
  onFileSelect: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onRemove: () => void;
  productName: string;
  t: { uploadBtn: string; uploadChange: string; uploadRemove: string; uploading: string; uploadError: string; uploadSizeError: string; [key: string]: string };
}) {
  const isPdf = state.file?.type === 'application/pdf' || (state.url && !state.preview && !state.file && !state.url.match(/\.(jpg|jpeg|png|webp|heic)(\?|$)/i));
  const displayName = state.file?.name || productName || 'Dokument';

  return (
    <div className="border border-gray-200 rounded-xl overflow-hidden">
      <div className="px-4 py-3 bg-gray-50 flex items-start gap-3 border-b border-gray-100">
        <div className="w-8 h-8 rounded-lg bg-white border border-gray-200 flex items-center justify-center flex-shrink-0">
          {icon}
        </div>
        <div>
          <p className="text-sm font-semibold text-gray-800">{label}</p>
          <p className="text-xs text-gray-400 mt-0.5">{description}</p>
        </div>
      </div>

      <div className="p-4">
        {!state.url && !state.file ? (
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            className="w-full border-2 border-dashed border-gray-200 rounded-xl py-6 flex flex-col items-center gap-2 hover:border-brand-300 hover:bg-brand-50/50 transition-colors group"
          >
            <div className="w-10 h-10 rounded-xl bg-gray-100 group-hover:bg-brand-100 flex items-center justify-center transition-colors">
              <Upload size={18} className="text-gray-400 group-hover:text-brand-500 transition-colors" />
            </div>
            <span className="text-sm font-medium text-gray-500 group-hover:text-brand-600 transition-colors">
              {t.uploadBtn}
            </span>
          </button>
        ) : (
          <div className="space-y-3">
            {state.preview && (
              <div className="relative rounded-xl overflow-hidden bg-gray-100 aspect-video">
                <img src={state.preview} alt="" className="w-full h-full object-contain" />
              </div>
            )}
            {(isPdf || (!state.preview && state.url)) && (
              <div className="flex items-center gap-3 p-3 bg-amber-50 border border-amber-100 rounded-xl">
                <FileText size={20} className="text-amber-500 flex-shrink-0" />
                <span className="text-sm text-amber-700 font-medium truncate flex-1">
                  {displayName}
                </span>
                <CheckCircle size={16} className="text-green-500 flex-shrink-0" />
              </div>
            )}
            {state.uploading && (
              <div className="flex items-center gap-2 text-sm text-brand-500">
                <div className="w-4 h-4 border-2 border-brand-300 border-t-brand-500 rounded-full animate-spin" />
                {t.uploading}
              </div>
            )}
            {!state.uploading && state.url && (
              <div className="flex items-center gap-2 text-xs text-green-600">
                <CheckCircle size={13} />
                <span className="font-medium">Uploaded</span>
              </div>
            )}
            {state.error && (
              <p className="text-xs text-red-500">{state.error}</p>
            )}
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => inputRef.current?.click()}
                className="flex-1 py-2 border border-gray-200 text-gray-600 text-xs font-medium rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center gap-1.5"
              >
                <Upload size={12} />
                {t.uploadChange}
              </button>
              <button
                type="button"
                onClick={onRemove}
                className="py-2 px-3 border border-red-100 text-red-400 text-xs font-medium rounded-lg hover:bg-red-50 transition-colors flex items-center justify-center gap-1.5"
              >
                <Trash2 size={12} />
                {t.uploadRemove}
              </button>
            </div>
          </div>
        )}

        {state.error && !state.file && (
          <p className="text-xs text-red-500 mt-2">{state.error}</p>
        )}
      </div>

      <input
        ref={inputRef}
        type="file"
        accept={accept}
        className="hidden"
        onChange={onFileSelect}
      />
    </div>
  );
}
