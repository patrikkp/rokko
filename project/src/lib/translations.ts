export type Lang = 'hr' | 'en' | 'de' | 'bs';

export interface Translations {
  nav: {
    features: string;
    eu: string;
    how: string;
    login: string;
    startFree: string;
  };
  hero: {
    badge: string;
    headline1: string;
    headline2: string;
    headline3: string;
    sub: string;
    cta: string;
    hasAccount: string;
    trust1: string;
    trust2: string;
    trust3: string;
  };
  stats: {
    v1: string; l1: string; s1: string;
    v2: string; l2: string; s2: string;
    v3: string; l3: string; s3: string;
  };
  features: {
    sectionLabel: string;
    sectionTitle: string;
    items: { title: string; description: string; badge: string | null }[];
  };
  eu: {
    sectionLabel: string;
    title: string;
    body: string;
    bodyHighlight: string;
    bodyEnd: string;
    points: string[];
    autoLabel: string;
    autoItems: { label: string; sub: string }[];
  };
  how: {
    sectionLabel: string;
    title: string;
    steps: { num: string; title: string; desc: string }[];
  };
  cta: {
    title1: string;
    title2: string;
    sub: string;
    btn: string;
  };
  footer: {
    legal: string;
    regions: string;
    gdpr: string;
  };
  auth: {
    welcomeBack: string;
    createAccount: string;
    signInSub: string;
    registerSub: string;
    fullName: string;
    namePlaceholder: string;
    password: string;
    loading: string;
    signIn: string;
    register: string;
    noAccount: string;
    hasAccount: string;
    signUpLink: string;
    signInLink: string;
    terms: string;
    errorInvalidCredentials: string;
    errorUserExists: string;
    errorPasswordShort: string;
  };
  app: {
    addWarranty: string;
    profileSettings: string;
    signOut: string;
    navDashboard: string;
    navProducts: string;
    navExpiring: string;
    navCategories: string;
    navAnalytics: string;
    navSettings: string;
    euBanner: string;
    euBannerSub: string;
    loading: string;
    comingSoon: string;
    categories: string;
    warranty: string;
    warranties2to4: string;
    warrantiesMany: string;
  };
  dashboard: {
    noWarranties: string;
    noWarrantiesSub: string;
    addFirst: string;
    statTotal: string;
    statTotalSub: string;
    statActive: string;
    statActiveSub: string;
    statExpiring: string;
    statExpiringSub: string;
    statValue: string;
    statValueSub: string;
    expiringSoonTitle: string;
    expires: string;
    daysLeft: string;
    today: string;
    recentlyAdded: string;
    statusOverview: string;
    activeWarranties: string;
    expiringSoon: string;
    expired: string;
    euTitle: string;
    euQuestion: string;
    euBody: string;
    euFooter: string;
    expiredTitle: string;
    expiredBody: string;
  };
  products: {
    title: string;
    total: string;
    searchPlaceholder: string;
    filters: string;
    filterAll: string;
    filterActive: string;
    filterExpiring: string;
    filterExpired: string;
    categoryLabel: string;
    allCategories: string;
    sortBy: string;
    sortExpiry: string;
    sortName: string;
    sortPurchase: string;
    sortPrice: string;
    clearCategory: string;
    noResults: string;
    noResultsSub: string;
    warrantyProgress: string;
    purchased: string;
    expires: string;
    days: string;
  };
  expiring: {
    title: string;
    subtitle: string;
    allGood: string;
    allGoodSub: string;
    critical: string;
    urgent: string;
    soon: string;
    expires: string;
    days: string;
  };
  detail: {
    back: string;
    edit: string;
    delete: string;
    cancel: string;
    deleting: string;
    confirmDelete: string;
    purchaseDate: string;
    price: string;
    category: string;
    warrantySection: string;
    commercialWarranty: string;
    monthsFromPurchase: string;
    euStatutory: string;
    euDirective: string;
    active: string;
    expired: string;
    effectiveProtection: string;
    effectiveSub: string;
    daysLeft: string;
    warrantyExpired: string;
    notes: string;
    claimGuide: string;
    claimGuideStep1Title: string;
    claimGuideStep1Desc: string;
    claimGuideStep2Title: string;
    claimGuideStep2Desc: string;
    claimGuideStep3Title: string;
    claimGuideStep3Desc: string;
    claimGuideStep4Title: string;
    claimGuideStep4Desc: string;
    claimsTitle: string;
    addClaim: string;
    claimTitlePlaceholder: string;
    claimDescPlaceholder: string;
    savingClaim: string;
    saveClaim: string;
    noClaimsYet: string;
    claimPending: string;
    claimSubmitted: string;
    claimInReview: string;
    claimApproved: string;
    claimRejected: string;
    claimResolved: string;
    retailer: string;
    website: string;
    qrTitle: string;
    qrDesc: string;
    qrGenerate: string;
    euRights: string;
    euRight1: string;
    euRight2: string;
    euRight3: string;
    months: string;
  };
  modal: {
    editWarranty: string;
    newWarranty: string;
    enterProductData: string;
    tabBasic: string;
    tabWarranty: string;
    tabRetailer: string;
    productName: string;
    productNamePlaceholder: string;
    brand: string;
    brandPlaceholder: string;
    model: string;
    modelPlaceholder: string;
    category: string;
    selectCategory: string;
    serialNumber: string;
    serialPlaceholder: string;
    purchaseDate: string;
    price: string;
    euWarrantyTitle: string;
    euWarrantyDesc: string;
    commercialWarrantyMonths: string;
    monthsPlaceholder: string;
    monthsHint: string;
    warrantyPreview: string;
    commercialLabel: string;
    euLabel: string;
    effectiveLabel: string;
    notesLabel: string;
    notesPlaceholder: string;
    retailerName: string;
    retailerNamePlaceholder: string;
    retailerPhone: string;
    retailerPhonePlaceholder: string;
    retailerEmail: string;
    retailerEmailPlaceholder: string;
    claimTip: string;
    claimTipDesc: string;
    cancel: string;
    saving: string;
    saveChanges: string;
    addWarranty: string;
    errorSaving: string;
    tabDocuments: string;
    productPhoto: string;
    productPhotoDesc: string;
    receiptPhoto: string;
    receiptPhotoDesc: string;
    uploadBtn: string;
    uploadChange: string;
    uploadRemove: string;
    uploading: string;
    uploadError: string;
    uploadSizeError: string;
  };
  analytics: {
    title: string;
    subtitle: string;
    noData: string;
    noDataSub: string;
    totalValue: string;
    underWarranty: string;
    withoutWarranty: string;
    avgWarranty: string;
    months: string;
    byCategory: string;
    other: string;
    monthlyPurchases: string;
    warrantyStatus: string;
    active: string;
    expiring: string;
    expired: string;
    insights: string;
    insightValuePct: string;
    insightValueOf: string;
    insightExpiring: string;
    insightCheckExpiring: string;
    insightAvg: string;
    insightEuMin: string;
  };
  status: {
    active: string;
    expiringSoon: string;
    expired: string;
  };
  warrantyPresets: {
    y1: string;
    y2: string;
    y3: string;
    y4: string;
    y5: string;
    y7: string;
    y10: string;
  };
}

const hr: Translations = {
  nav: {
    features: 'Mogućnosti',
    eu: 'EU Zaštita',
    how: 'Kako funkcionira',
    login: 'Prijava',
    startFree: 'Počni besplatno',
  },
  hero: {
    badge: 'EU · HR · BA · RS',
    headline1: 'Tvoj digitalni',
    headline2: 'trezor za',
    headline3: 'garanciju.',
    sub: 'Pametni tracker garancija s ugrađenom EU zakonskom zaštitom. Pratite sve garancije, primajte podsjetnike i znajte svoja prava.',
    cta: 'Počnite besplatno',
    hasAccount: 'Imam račun',
    trust1: 'Besplatno za korištenje',
    trust2: 'Bez kreditne kartice',
    trust3: 'Pohrana dokumenata',
  },
  stats: {
    v1: '12.4 mj', l1: 'prosječna garancija propuštena', s1: 'jer kupci zaborave',
    v2: '73%', l2: 'potrošača ne zna', s2: 'za EU zakonsku zaštitu',
    v3: '2 god.', l3: 'zakonska zaštita EU', s3: 'na sve proizvode',
  },
  features: {
    sectionLabel: 'Mogućnosti',
    sectionTitle: 'Više od pukog praćenja garancija',
    items: [
      { title: 'EU Zakonska Zaštita', description: 'Automatski prati 2-godišnju zakonsku garanciju (EU direktiva 2019/771) na svim proizvodima, čak i kada prodavači to ne naglašavaju.', badge: 'Jedinstveno' },
      { title: 'Pametni Podsjetnici', description: 'Dobijte obavijest 90, 60 i 30 dana prije isteka garancije. Nikad više propuštena reklamacija.', badge: null },
      { title: 'Digitalni Trezor', description: 'Pohranite račune, jamstvene listove i uputstva za upotrebu na jednom sigurnom mjestu. Pristupačno s bilo kojeg uređaja.', badge: null },
      { title: 'Reklamacijski Vodič', description: 'Korak-po-korak asistent za pokretanje reklamacije. Prava EU potrošača na dlanu — uključujući kontakte servisnih centara.', badge: 'Novo' },
      { title: 'QR Garancija za Preprodaju', description: 'Generirajte QR kod garancije pri prodaji polovne robe. Kupac skenira i vidi preostalo trajanje — povjerenje u jednom kliku.', badge: 'Jedinstveno' },
      { title: 'Uvidi i Analitika', description: 'Prikaz ukupne vrijednosti predmeta pod garancijom, potrošnje po kategorijama i prediktivnih rokova servisiranja.', badge: null },
    ],
  },
  eu: {
    sectionLabel: 'EU Direktiva 2019/771',
    title: 'Znate li svoja prava kao EU potrošač?',
    body: 'Svaki proizvod kupljen u EU ima',
    bodyHighlight: 'minimalno 2 godine zakonske garancije',
    bodyEnd: '— čak i ako prodavač tvrdi drugačije ili ponudi manje.',
    points: [
      'Prodavač mora besplatno popraviti ili zamijeniti neispravan proizvod',
      'Pravo vrijedi 2 godine od datuma kupovine',
      'Teret dokaza u prvih 12 mjeseci je na prodavaču',
      'Vrijedi u svim zemljama EU, uključujući Hrvatsku',
    ],
    autoLabel: 'Rokko automatski...',
    autoItems: [
      { label: 'Dodaje 2g zakonsku zaštitu', sub: 'Na sve novo kupljene proizvode' },
      { label: 'Uspoređuje komercijalne i zakonske garancije', sub: 'Uvijek prikazuje dulje trajanje' },
      { label: 'Upozorava na reklamacijske rokove', sub: 'Pravovremeno, uvijek' },
      { label: 'Generira reklamacijska pisma', sub: 'Za slanje prodavačima i servisima' },
    ],
  },
  how: {
    sectionLabel: 'Proces',
    title: 'Jednostavno u 3 koraka',
    steps: [
      { num: '01', title: 'Dodajte proizvod', desc: 'Unesite naziv, datum kupovine i trajanje garancije. Priložite sliku računa.' },
      { num: '02', title: 'Pratite status', desc: 'Dashboard prikazuje sve garancije s jasnim vizualnim statusom — aktivna, uskoro istječe, istekla.' },
      { num: '03', title: 'Primajte podsjetnike', desc: 'Automatske obavijesti na email prije isteka. Uvijek na vrijeme za reklamaciju.' },
    ],
  },
  cta: {
    title1: 'Zaštitite svoja',
    title2: 'ulaganja.',
    sub: 'Besplatno. Bez kreditne kartice. Odmah.',
    btn: 'Kreiraj besplatan račun',
  },
  footer: {
    legal: 'Prilagođeno EU zakonodavstvu',
    regions: 'HR · BA · RS',
    gdpr: 'GDPR sukladno',
  },
  auth: {
    welcomeBack: 'Dobrodošli nazad',
    createAccount: 'Kreirajte račun',
    signInSub: 'Prijavite se u svoj Rokko račun',
    registerSub: 'Počnite pratiti garancije besplatno',
    fullName: 'Ime i prezime',
    namePlaceholder: 'Vaše ime',
    password: 'Lozinka',
    loading: 'Učitavanje...',
    signIn: 'Prijavi se',
    register: 'Kreiraj račun',
    noAccount: 'Nemate račun? ',
    hasAccount: 'Već imate račun? ',
    signUpLink: 'Registrirajte se',
    signInLink: 'Prijavite se',
    terms: 'Registracijom prihvaćate naše uvjete korištenja i politiku privatnosti.',
    errorInvalidCredentials: 'Pogrešan email ili lozinka.',
    errorUserExists: 'Korisnik s tim emailom već postoji.',
    errorPasswordShort: 'Lozinka mora imati najmanje 6 znakova.',
  },
  app: {
    addWarranty: 'Dodaj garanciju',
    profileSettings: 'Postavke profila',
    signOut: 'Odjavi se',
    navDashboard: 'Pregled',
    navProducts: 'Garancije',
    navExpiring: 'Uskoro istječe',
    navCategories: 'Kategorije',
    navAnalytics: 'Analitika',
    navSettings: 'Postavke',
    euBanner: 'EU Zaštita aktivna',
    euBannerSub: 'Svi vaši proizvodi su zaštićeni EU Direktivom 2019/771',
    loading: 'Učitavanje...',
    comingSoon: 'Ova sekcija dolazi uskoro.',
    categories: 'Kategorije',
    warranty: 'garancija',
    warranties2to4: 'garancije',
    warrantiesMany: 'garancija',
  },
  dashboard: {
    noWarranties: 'Nema garancija',
    noWarrantiesSub: 'Dodajte svoju prvu garanciju i počnite pratiti rokove isteka vaših proizvoda.',
    addFirst: 'Dodaj prvu garanciju',
    statTotal: 'Ukupno',
    statTotalSub: 'garancija evidentirano',
    statActive: 'Aktivne',
    statActiveSub: 'garancija aktivno',
    statExpiring: 'Uskoro istječe',
    statExpiringSub: 'u roku 90 dana',
    statValue: 'Vrijednost',
    statValueSub: 'pod aktivnom garancijom',
    expiringSoonTitle: 'Uskoro istječe',
    expires: 'Istječe',
    daysLeft: 'preostalo',
    today: 'Danas!',
    recentlyAdded: 'Nedavno dodano',
    statusOverview: 'Pregled stanja',
    activeWarranties: 'Aktivne garancije',
    expiringSoon: 'Uskoro istječe',
    expired: 'Istekle',
    euTitle: 'EU Zakonska Zaštita',
    euQuestion: 'Znate li svoja prava?',
    euBody: 'Svaki proizvod u EU ima 2-godišnju zakonsku garanciju po direktivi 2019/771 — neovisno o komercijalnoj garanciji prodavača.',
    euFooter: 'Rokko automatski prati oba roka',
    expiredTitle: 'Istekle',
    expiredBody: 'garancija je isteklo. Razmislite o proširenoj garanciji za vrijedne predmete.',
  },
  products: {
    title: 'Garancije',
    total: 'ukupno',
    searchPlaceholder: 'Pretraži po nazivu, marki, modelu...',
    filters: 'Filteri',
    filterAll: 'Sve',
    filterActive: 'Aktivne',
    filterExpiring: 'Uskoro istječe',
    filterExpired: 'Istekle',
    categoryLabel: 'Kategorija',
    allCategories: 'Sve kategorije',
    sortBy: 'Sortiraj po',
    sortExpiry: 'Datum isteka',
    sortName: 'Naziv (A-Z)',
    sortPurchase: 'Datum kupovine',
    sortPrice: 'Cijena',
    clearCategory: 'Ukloni filtriranje po kategoriji',
    noResults: 'Nema rezultata',
    noResultsSub: 'Pokušajte promijeniti pretragu ili filtere',
    warrantyProgress: 'Napredak garancije',
    purchased: 'Kupljeno',
    expires: 'Istječe',
    days: 'dana',
  },
  expiring: {
    title: 'Uskoro istječe',
    subtitle: 'Garancije koje ističu u roku 90 dana',
    allGood: 'Sve je u redu!',
    allGoodSub: 'Nema garancija koje ističu u roku 90 dana.',
    critical: 'Kritično — unutar 7 dana',
    urgent: 'Hitno — unutar 30 dana',
    soon: 'Uskoro — unutar 90 dana',
    expires: 'Istječe',
    days: 'dana',
  },
  detail: {
    back: 'Natrag',
    edit: 'Uredi',
    delete: 'Obriši',
    cancel: 'Odustani',
    deleting: 'Brisanje...',
    confirmDelete: 'Potvrdi brisanje',
    purchaseDate: 'Datum kupovine',
    price: 'Cijena',
    category: 'Kategorija',
    warrantySection: 'Garancija',
    commercialWarranty: 'Komercijalna garancija',
    monthsFromPurchase: 'mjeseci od kupovine',
    euStatutory: 'EU Zakonska garancija',
    euDirective: 'Direktiva 2019/771',
    active: 'Aktivna',
    expired: 'Istekla',
    effectiveProtection: 'Efektivna zaštita do',
    effectiveSub: 'Dulje od komercijalne i EU zakonske',
    daysLeft: 'dana preostalo',
    warrantyExpired: 'Garancija je istekla',
    notes: 'Napomene',
    claimGuide: 'Reklamacijski vodič',
    claimGuideStep1Title: 'Kontaktirajte prodavača',
    claimGuideStep1Desc: 'Prema EU zakonu, reklamaciju podnosite prodavaču, ne proizvođaču. Koristite kontakt ispod.',
    claimGuideStep2Title: 'Pripremite dokumentaciju',
    claimGuideStep2Desc: 'Račun kupovine, opis kvara, fotografije ako je primjenjivo. Rokko čuva sve vaše dokumente.',
    claimGuideStep3Title: 'Zahtjev u pisanom obliku',
    claimGuideStep3Desc: 'Pošaljite pismeni zahtjev emailom ili preporučenom poštom. Pisani trag je ključan.',
    claimGuideStep4Title: 'Rok odgovora',
    claimGuideStep4Desc: 'Prodavač ima razuman rok za odgovor (obično 30 dana). Nakon toga možete eskalirati prema HAZU ili europskom centru potrošača.',
    claimsTitle: 'Reklamacije',
    addClaim: '+ Dodaj',
    claimTitlePlaceholder: 'Naslov reklamacije',
    claimDescPlaceholder: 'Opis problema (opcionalno)',
    savingClaim: 'Spremanje...',
    saveClaim: 'Dodaj',
    noClaimsYet: 'Nema evidentiranih reklamacija',
    claimPending: 'Na čekanju',
    claimSubmitted: 'Podnesena',
    claimInReview: 'U obradi',
    claimApproved: 'Odobrena',
    claimRejected: 'Odbijena',
    claimResolved: 'Riješena',
    retailer: 'Prodavač',
    website: 'Web stranica',
    qrTitle: 'QR Garancija',
    qrDesc: 'Generirajte QR kod za ovu garanciju pri prodaji uređaja. Kupac može skenirati i vidjeti preostalo trajanje.',
    qrGenerate: 'Generiraj QR kod',
    euRights: 'Vaša EU Prava',
    euRight1: 'Pravo na popravak ili zamjenu',
    euRight2: 'Pravo na sniženje cijene',
    euRight3: 'Pravo na raskid ugovora',
    months: 'mj',
  },
  modal: {
    editWarranty: 'Uredi garanciju',
    newWarranty: 'Nova garancija',
    enterProductData: 'Unesite podatke o proizvodu',
    tabBasic: 'Osnovni podaci',
    tabWarranty: 'Garancija',
    tabRetailer: 'Prodavač',
    productName: 'Naziv proizvoda *',
    productNamePlaceholder: 'npr. iPhone 15 Pro',
    brand: 'Marka',
    brandPlaceholder: 'Apple',
    model: 'Model',
    modelPlaceholder: 'A3293',
    category: 'Kategorija',
    selectCategory: 'Odaberite kategoriju',
    serialNumber: 'Serijski broj',
    serialPlaceholder: 'npr. XYZ123456789',
    purchaseDate: 'Datum kupovine *',
    price: 'Cijena',
    euWarrantyTitle: 'EU Zakonska garancija',
    euWarrantyDesc: 'Rokko automatski dodaje 24-mjesečnu zakonsku garanciju (EU direktiva 2019/771) uz komercijalnu. Koristit će se dulja od dviju.',
    commercialWarrantyMonths: 'Komercijalna garancija (mjeseci)',
    monthsPlaceholder: 'Broj mjeseci',
    monthsHint: 'Unesite broj ako nije prikazan iznad',
    warrantyPreview: 'Pregled garancije',
    commercialLabel: 'Komercijalna garancija:',
    euLabel: 'EU zakonska (2g):',
    effectiveLabel: 'Efektivna zaštita do:',
    notesLabel: 'Napomene',
    notesPlaceholder: 'Posebni uvjeti garancije, kontakti servisa...',
    retailerName: 'Naziv prodavača',
    retailerNamePlaceholder: 'npr. Electrocroatia, Sancta Domenica',
    retailerPhone: 'Telefon prodavača',
    retailerPhonePlaceholder: '+385 1 234 5678',
    retailerEmail: 'Email prodavača',
    retailerEmailPlaceholder: 'servis@prodavac.hr',
    claimTip: 'Savjet za reklamacije',
    claimTipDesc: 'Pohranite kontakt prodavača — pri reklamaciji prema EU zakonu, prva točka kontakta je uvijek prodavač, a ne proizvođač.',
    cancel: 'Odustani',
    saving: 'Spremanje...',
    saveChanges: 'Spremi promjene',
    addWarranty: 'Dodaj garanciju',
    errorSaving: 'Greška pri spremanju',
    tabDocuments: 'Dokumenti',
    productPhoto: 'Fotografija proizvoda',
    productPhotoDesc: 'Dodajte sliku proizvoda radi lakše identifikacije',
    receiptPhoto: 'Račun / Potvrda kupovine',
    receiptPhotoDesc: 'Fotografija ili PDF računa — ključno za reklamaciju',
    uploadBtn: 'Odaberite datoteku',
    uploadChange: 'Zamijeni',
    uploadRemove: 'Ukloni',
    uploading: 'Učitavanje...',
    uploadError: 'Greška pri učitavanju datoteke',
    uploadSizeError: 'Datoteka je prevelika (max. 10 MB)',
  },
  analytics: {
    title: 'Analitika',
    subtitle: 'Uvidi u vaš portfolio garancija',
    noData: 'Nema podataka za analitiku',
    noDataSub: 'Dodajte garancije da vidite uvide',
    totalValue: 'Ukupna vrijednost',
    underWarranty: 'Pod aktivnom garancijom',
    withoutWarranty: 'Vrijednost bez garancije',
    avgWarranty: 'Prosj. trajanje garancije',
    months: 'mj',
    byCategory: 'Po kategorijama',
    other: 'Ostalo',
    monthlyPurchases: 'Kupovine po mjesecima',
    warrantyStatus: 'Status garancija',
    active: 'Aktivne',
    expiring: 'Uskoro istječe',
    expired: 'Istekle',
    insights: 'Uvidi',
    insightValuePct: '% vrijednosti pod garancijom',
    insightValueOf: 'od',
    insightExpiring: 'garancija uskoro istječe',
    insightCheckExpiring: 'Provjeri sekciju "Uskoro istječe"',
    insightAvg: 'Prosječna zaštita:',
    insightEuMin: 'EU minimum je 24 månaca',
  },
  status: {
    active: 'Aktivna',
    expiringSoon: 'Uskoro istječe',
    expired: 'Istekla',
  },
  warrantyPresets: {
    y1: '1 godina',
    y2: '2 godine (EU minimum)',
    y3: '3 godine',
    y4: '4 godine',
    y5: '5 godina',
    y7: '7 godina',
    y10: '10 godina',
  },
};

const en: Translations = {
  nav: {
    features: 'Features',
    eu: 'EU Protection',
    how: 'How it works',
    login: 'Sign in',
    startFree: 'Start free',
  },
  hero: {
    badge: 'EU · HR · BA · RS',
    headline1: 'Your digital',
    headline2: 'vault for',
    headline3: 'warranties.',
    sub: 'Smart warranty tracker with built-in EU legal protection. Track all warranties, receive reminders and know your rights.',
    cta: 'Get started for free',
    hasAccount: 'I have an account',
    trust1: 'Free to use',
    trust2: 'No credit card',
    trust3: 'Document storage',
  },
  stats: {
    v1: '12.4 mo', l1: 'average warranty missed', s1: 'because buyers forget',
    v2: '73%', l2: 'of consumers unaware', s2: 'of EU legal protection',
    v3: '2 yrs', l3: 'EU legal protection', s3: 'on all products',
  },
  features: {
    sectionLabel: 'Features',
    sectionTitle: 'More than just tracking warranties',
    items: [
      { title: 'EU Legal Protection', description: 'Automatically tracks the 2-year statutory warranty (EU directive 2019/771) on all products, even when sellers don\'t mention it.', badge: 'Unique' },
      { title: 'Smart Reminders', description: 'Get notified 90, 60 and 30 days before warranty expiry. Never miss a claim again.', badge: null },
      { title: 'Digital Vault', description: 'Store receipts, warranty cards and manuals in one secure place. Accessible from any device.', badge: null },
      { title: 'Claim Assistant', description: 'Step-by-step guide for filing a warranty claim. EU consumer rights at your fingertips — including service center contacts.', badge: 'New' },
      { title: 'QR Warranty for Resale', description: 'Generate a warranty QR code when selling second-hand goods. Buyer scans and sees remaining coverage — trust in one click.', badge: 'Unique' },
      { title: 'Insights & Analytics', description: 'View total value of items under warranty, spending by category and predictive service schedules.', badge: null },
    ],
  },
  eu: {
    sectionLabel: 'EU Directive 2019/771',
    title: 'Do you know your rights as an EU consumer?',
    body: 'Every product bought in the EU has',
    bodyHighlight: 'at least 2 years of statutory warranty',
    bodyEnd: '— even if the seller claims otherwise or offers less.',
    points: [
      'The seller must repair or replace a defective product for free',
      'The right is valid for 2 years from the date of purchase',
      'Burden of proof is on the seller in the first 12 months',
      'Valid in all EU countries including Croatia',
    ],
    autoLabel: 'Rokko automatically...',
    autoItems: [
      { label: 'Adds 2yr statutory protection', sub: 'On all newly purchased products' },
      { label: 'Compares commercial and statutory warranties', sub: 'Always shows the longer duration' },
      { label: 'Warns about claim deadlines', sub: 'On time, every time' },
      { label: 'Generates claim letters', sub: 'To send to sellers and service centers' },
    ],
  },
  how: {
    sectionLabel: 'Process',
    title: 'Simple in 3 steps',
    steps: [
      { num: '01', title: 'Add a product', desc: 'Enter the name, purchase date and warranty duration. Attach a photo of your receipt.' },
      { num: '02', title: 'Track status', desc: 'Dashboard shows all warranties with clear visual status — active, expiring soon, expired.' },
      { num: '03', title: 'Receive reminders', desc: 'Automatic email notifications before expiry. Always on time for a claim.' },
    ],
  },
  cta: {
    title1: 'Protect your',
    title2: 'investments.',
    sub: 'Free. No credit card. Instant.',
    btn: 'Create a free account',
  },
  footer: {
    legal: 'Compliant with EU legislation',
    regions: 'HR · BA · RS',
    gdpr: 'GDPR compliant',
  },
  auth: {
    welcomeBack: 'Welcome back',
    createAccount: 'Create an account',
    signInSub: 'Sign in to your Rokko account',
    registerSub: 'Start tracking warranties for free',
    fullName: 'Full name',
    namePlaceholder: 'Your name',
    password: 'Password',
    loading: 'Loading...',
    signIn: 'Sign in',
    register: 'Create account',
    noAccount: "Don't have an account? ",
    hasAccount: 'Already have an account? ',
    signUpLink: 'Sign up',
    signInLink: 'Sign in',
    terms: 'By registering you accept our terms of service and privacy policy.',
    errorInvalidCredentials: 'Invalid email or password.',
    errorUserExists: 'A user with that email already exists.',
    errorPasswordShort: 'Password must be at least 6 characters.',
  },
  app: {
    addWarranty: 'Add warranty',
    profileSettings: 'Profile settings',
    signOut: 'Sign out',
    navDashboard: 'Dashboard',
    navProducts: 'Warranties',
    navExpiring: 'Expiring soon',
    navCategories: 'Categories',
    navAnalytics: 'Analytics',
    navSettings: 'Settings',
    euBanner: 'EU Protection active',
    euBannerSub: 'All your products are protected by EU Directive 2019/771',
    loading: 'Loading...',
    comingSoon: 'This section is coming soon.',
    categories: 'Categories',
    warranty: 'warranty',
    warranties2to4: 'warranties',
    warrantiesMany: 'warranties',
  },
  dashboard: {
    noWarranties: 'No warranties',
    noWarrantiesSub: 'Add your first warranty and start tracking expiry dates for your products.',
    addFirst: 'Add first warranty',
    statTotal: 'Total',
    statTotalSub: 'warranties recorded',
    statActive: 'Active',
    statActiveSub: 'warranties active',
    statExpiring: 'Expiring soon',
    statExpiringSub: 'within 90 days',
    statValue: 'Value',
    statValueSub: 'under active warranty',
    expiringSoonTitle: 'Expiring soon',
    expires: 'Expires',
    daysLeft: 'remaining',
    today: 'Today!',
    recentlyAdded: 'Recently added',
    statusOverview: 'Status overview',
    activeWarranties: 'Active warranties',
    expiringSoon: 'Expiring soon',
    expired: 'Expired',
    euTitle: 'EU Statutory Protection',
    euQuestion: 'Do you know your rights?',
    euBody: 'Every product in the EU has a 2-year statutory warranty under Directive 2019/771 — regardless of the seller\'s commercial warranty.',
    euFooter: 'Rokko automatically tracks both deadlines',
    expiredTitle: 'Expired',
    expiredBody: 'warranties have expired. Consider extended warranty for valuable items.',
  },
  products: {
    title: 'Warranties',
    total: 'total',
    searchPlaceholder: 'Search by name, brand, model...',
    filters: 'Filters',
    filterAll: 'All',
    filterActive: 'Active',
    filterExpiring: 'Expiring soon',
    filterExpired: 'Expired',
    categoryLabel: 'Category',
    allCategories: 'All categories',
    sortBy: 'Sort by',
    sortExpiry: 'Expiry date',
    sortName: 'Name (A-Z)',
    sortPurchase: 'Purchase date',
    sortPrice: 'Price',
    clearCategory: 'Clear category filter',
    noResults: 'No results',
    noResultsSub: 'Try changing your search or filters',
    warrantyProgress: 'Warranty progress',
    purchased: 'Purchased',
    expires: 'Expires',
    days: 'days',
  },
  expiring: {
    title: 'Expiring soon',
    subtitle: 'Warranties expiring within 90 days',
    allGood: 'All good!',
    allGoodSub: 'No warranties expiring within 90 days.',
    critical: 'Critical — within 7 days',
    urgent: 'Urgent — within 30 days',
    soon: 'Soon — within 90 days',
    expires: 'Expires',
    days: 'days',
  },
  detail: {
    back: 'Back',
    edit: 'Edit',
    delete: 'Delete',
    cancel: 'Cancel',
    deleting: 'Deleting...',
    confirmDelete: 'Confirm delete',
    purchaseDate: 'Purchase date',
    price: 'Price',
    category: 'Category',
    warrantySection: 'Warranty',
    commercialWarranty: 'Commercial warranty',
    monthsFromPurchase: 'months from purchase',
    euStatutory: 'EU Statutory warranty',
    euDirective: 'Directive 2019/771',
    active: 'Active',
    expired: 'Expired',
    effectiveProtection: 'Effective protection until',
    effectiveSub: 'Longer of commercial and EU statutory',
    daysLeft: 'days remaining',
    warrantyExpired: 'Warranty has expired',
    notes: 'Notes',
    claimGuide: 'Claim guide',
    claimGuideStep1Title: 'Contact the seller',
    claimGuideStep1Desc: 'Under EU law, submit the claim to the seller, not the manufacturer. Use the contact below.',
    claimGuideStep2Title: 'Prepare documentation',
    claimGuideStep2Desc: 'Purchase receipt, fault description, photos if applicable. Rokko stores all your documents.',
    claimGuideStep3Title: 'Written request',
    claimGuideStep3Desc: 'Send a written request by email or registered mail. A written trail is key.',
    claimGuideStep4Title: 'Response deadline',
    claimGuideStep4Desc: 'The seller has a reasonable period to respond (usually 30 days). After that you can escalate to the national consumer authority or European Consumer Centre.',
    claimsTitle: 'Claims',
    addClaim: '+ Add',
    claimTitlePlaceholder: 'Claim title',
    claimDescPlaceholder: 'Problem description (optional)',
    savingClaim: 'Saving...',
    saveClaim: 'Add',
    noClaimsYet: 'No claims recorded',
    claimPending: 'Pending',
    claimSubmitted: 'Submitted',
    claimInReview: 'In review',
    claimApproved: 'Approved',
    claimRejected: 'Rejected',
    claimResolved: 'Resolved',
    retailer: 'Retailer',
    website: 'Website',
    qrTitle: 'QR Warranty',
    qrDesc: 'Generate a QR code for this warranty when selling the device. The buyer can scan it and see the remaining duration.',
    qrGenerate: 'Generate QR code',
    euRights: 'Your EU Rights',
    euRight1: 'Right to repair or replacement',
    euRight2: 'Right to price reduction',
    euRight3: 'Right to cancel the contract',
    months: 'mo',
  },
  modal: {
    editWarranty: 'Edit warranty',
    newWarranty: 'New warranty',
    enterProductData: 'Enter product details',
    tabBasic: 'Basic info',
    tabWarranty: 'Warranty',
    tabRetailer: 'Retailer',
    productName: 'Product name *',
    productNamePlaceholder: 'e.g. iPhone 15 Pro',
    brand: 'Brand',
    brandPlaceholder: 'Apple',
    model: 'Model',
    modelPlaceholder: 'A3293',
    category: 'Category',
    selectCategory: 'Select a category',
    serialNumber: 'Serial number',
    serialPlaceholder: 'e.g. XYZ123456789',
    purchaseDate: 'Purchase date *',
    price: 'Price',
    euWarrantyTitle: 'EU Statutory warranty',
    euWarrantyDesc: 'Rokko automatically adds a 24-month statutory warranty (EU Directive 2019/771) alongside the commercial one. The longer of the two will be used.',
    commercialWarrantyMonths: 'Commercial warranty (months)',
    monthsPlaceholder: 'Number of months',
    monthsHint: 'Enter a number if not shown above',
    warrantyPreview: 'Warranty preview',
    commercialLabel: 'Commercial warranty:',
    euLabel: 'EU statutory (2yr):',
    effectiveLabel: 'Effective protection until:',
    notesLabel: 'Notes',
    notesPlaceholder: 'Special warranty conditions, service contacts...',
    retailerName: 'Retailer name',
    retailerNamePlaceholder: 'e.g. Best Buy, Amazon',
    retailerPhone: 'Retailer phone',
    retailerPhonePlaceholder: '+1 234 567 8900',
    retailerEmail: 'Retailer email',
    retailerEmailPlaceholder: 'service@retailer.com',
    claimTip: 'Claims tip',
    claimTipDesc: 'Store the retailer\'s contact — when filing a claim under EU law, the first point of contact is always the seller, not the manufacturer.',
    cancel: 'Cancel',
    saving: 'Saving...',
    saveChanges: 'Save changes',
    addWarranty: 'Add warranty',
    errorSaving: 'Error saving',
    tabDocuments: 'Documents',
    productPhoto: 'Product photo',
    productPhotoDesc: 'Add a photo of the product for easy identification',
    receiptPhoto: 'Receipt / Proof of purchase',
    receiptPhotoDesc: 'Photo or PDF of the receipt — essential for warranty claims',
    uploadBtn: 'Choose file',
    uploadChange: 'Replace',
    uploadRemove: 'Remove',
    uploading: 'Uploading...',
    uploadError: 'Error uploading file',
    uploadSizeError: 'File is too large (max. 10 MB)',
  },
  analytics: {
    title: 'Analytics',
    subtitle: 'Insights into your warranty portfolio',
    noData: 'No analytics data',
    noDataSub: 'Add warranties to see insights',
    totalValue: 'Total value',
    underWarranty: 'Under active warranty',
    withoutWarranty: 'Value without warranty',
    avgWarranty: 'Avg. warranty duration',
    months: 'mo',
    byCategory: 'By category',
    other: 'Other',
    monthlyPurchases: 'Purchases by month',
    warrantyStatus: 'Warranty status',
    active: 'Active',
    expiring: 'Expiring soon',
    expired: 'Expired',
    insights: 'Insights',
    insightValuePct: '% of value under warranty',
    insightValueOf: 'of',
    insightExpiring: 'warranties expiring soon',
    insightCheckExpiring: 'Check the "Expiring soon" section',
    insightAvg: 'Average protection:',
    insightEuMin: 'EU minimum is 24 months',
  },
  status: {
    active: 'Active',
    expiringSoon: 'Expiring soon',
    expired: 'Expired',
  },
  warrantyPresets: {
    y1: '1 year',
    y2: '2 years (EU minimum)',
    y3: '3 years',
    y4: '4 years',
    y5: '5 years',
    y7: '7 years',
    y10: '10 years',
  },
};

const de: Translations = {
  nav: {
    features: 'Funktionen',
    eu: 'EU-Schutz',
    how: 'Wie es funktioniert',
    login: 'Anmelden',
    startFree: 'Kostenlos starten',
  },
  hero: {
    badge: 'EU · HR · BA · RS',
    headline1: 'Dein digitaler',
    headline2: 'Tresor für',
    headline3: 'Garantien.',
    sub: 'Intelligenter Garantie-Tracker mit integriertem EU-Rechtsschutz. Verfolge alle Garantien, erhalte Erinnerungen und kenne deine Rechte.',
    cta: 'Kostenlos starten',
    hasAccount: 'Ich habe ein Konto',
    trust1: 'Kostenlos nutzbar',
    trust2: 'Keine Kreditkarte',
    trust3: 'Dokumentenspeicher',
  },
  stats: {
    v1: '12.4 Mo', l1: 'Garantie im Durchschnitt verpasst', s1: 'weil Käufer vergessen',
    v2: '73%', l2: 'der Verbraucher wissen nicht', s2: 'vom EU-Rechtsschutz',
    v3: '2 J.', l3: 'EU-Rechtsschutz', s3: 'auf alle Produkte',
  },
  features: {
    sectionLabel: 'Funktionen',
    sectionTitle: 'Mehr als nur Garantieverfolgung',
    items: [
      { title: 'EU-Rechtsschutz', description: 'Verfolgt automatisch die 2-jährige gesetzliche Garantie (EU-Richtlinie 2019/771) für alle Produkte, auch wenn Verkäufer das nicht erwähnen.', badge: 'Einzigartig' },
      { title: 'Intelligente Erinnerungen', description: 'Erhalte Benachrichtigungen 90, 60 und 30 Tage vor Ablauf der Garantie. Nie wieder eine Reklamation verpassen.', badge: null },
      { title: 'Digitaler Tresor', description: 'Belege, Garantiekarten und Bedienungsanleitungen sicher an einem Ort speichern. Von jedem Gerät zugänglich.', badge: null },
      { title: 'Reklamationsassistent', description: 'Schritt-für-Schritt-Anleitung zur Einreichung einer Reklamation. EU-Verbraucherrechte auf einen Blick.', badge: 'Neu' },
      { title: 'QR-Garantie für Wiederverkauf', description: 'Erstelle einen Garantie-QR-Code beim Verkauf von Gebrauchtware. Käufer scannt und sieht die verbleibende Deckung.', badge: 'Einzigartig' },
      { title: 'Einblicke & Analytik', description: 'Gesamtwert der garantierten Artikel, Ausgaben nach Kategorien und vorausschauende Servicepläne.', badge: null },
    ],
  },
  eu: {
    sectionLabel: 'EU-Richtlinie 2019/771',
    title: 'Kennen Sie Ihre Rechte als EU-Verbraucher?',
    body: 'Jedes in der EU gekaufte Produkt hat',
    bodyHighlight: 'mindestens 2 Jahre gesetzliche Garantie',
    bodyEnd: '— auch wenn der Verkäufer etwas anderes behauptet.',
    points: [
      'Der Verkäufer muss fehlerhafte Produkte kostenlos reparieren oder ersetzen',
      'Das Recht gilt 2 Jahre ab Kaufdatum',
      'Beweislast liegt in den ersten 12 Monaten beim Verkäufer',
      'Gilt in allen EU-Ländern einschließlich Kroatien',
    ],
    autoLabel: 'Rokko automatisch...',
    autoItems: [
      { label: 'Fügt 2J gesetzlichen Schutz hinzu', sub: 'Für alle neu gekauften Produkte' },
      { label: 'Vergleicht kommerzielle und gesetzliche Garantien', sub: 'Zeigt immer die längere Dauer' },
      { label: 'Warnt vor Reklamationsfristen', sub: 'Rechtzeitig, immer' },
      { label: 'Generiert Reklamationsschreiben', sub: 'Zum Senden an Verkäufer und Servicezentren' },
    ],
  },
  how: {
    sectionLabel: 'Prozess',
    title: 'Einfach in 3 Schritten',
    steps: [
      { num: '01', title: 'Produkt hinzufügen', desc: 'Name, Kaufdatum und Garantiedauer eingeben. Foto des Belegs anhängen.' },
      { num: '02', title: 'Status verfolgen', desc: 'Dashboard zeigt alle Garantien mit klarem visuellem Status — aktiv, läuft bald ab, abgelaufen.' },
      { num: '03', title: 'Erinnerungen erhalten', desc: 'Automatische E-Mail-Benachrichtigungen vor Ablauf. Immer rechtzeitig für eine Reklamation.' },
    ],
  },
  cta: {
    title1: 'Schütze deine',
    title2: 'Investitionen.',
    sub: 'Kostenlos. Keine Kreditkarte. Sofort.',
    btn: 'Kostenloses Konto erstellen',
  },
  footer: {
    legal: 'Konform mit EU-Recht',
    regions: 'HR · BA · RS',
    gdpr: 'DSGVO-konform',
  },
  auth: {
    welcomeBack: 'Willkommen zurück',
    createAccount: 'Konto erstellen',
    signInSub: 'Melden Sie sich bei Ihrem Rokko-Konto an',
    registerSub: 'Garantien kostenlos verfolgen',
    fullName: 'Vollständiger Name',
    namePlaceholder: 'Ihr Name',
    password: 'Passwort',
    loading: 'Laden...',
    signIn: 'Anmelden',
    register: 'Konto erstellen',
    noAccount: 'Kein Konto? ',
    hasAccount: 'Haben Sie bereits ein Konto? ',
    signUpLink: 'Registrieren',
    signInLink: 'Anmelden',
    terms: 'Mit der Registrierung akzeptieren Sie unsere Nutzungsbedingungen und Datenschutzrichtlinie.',
    errorInvalidCredentials: 'Ungültige E-Mail oder Passwort.',
    errorUserExists: 'Ein Benutzer mit dieser E-Mail existiert bereits.',
    errorPasswordShort: 'Das Passwort muss mindestens 6 Zeichen lang sein.',
  },
  app: {
    addWarranty: 'Garantie hinzufügen',
    profileSettings: 'Profileinstellungen',
    signOut: 'Abmelden',
    navDashboard: 'Übersicht',
    navProducts: 'Garantien',
    navExpiring: 'Bald ablaufend',
    navCategories: 'Kategorien',
    navAnalytics: 'Analytik',
    navSettings: 'Einstellungen',
    euBanner: 'EU-Schutz aktiv',
    euBannerSub: 'Alle Ihre Produkte sind durch die EU-Richtlinie 2019/771 geschützt',
    loading: 'Laden...',
    comingSoon: 'Dieser Bereich kommt bald.',
    categories: 'Kategorien',
    warranty: 'Garantie',
    warranties2to4: 'Garantien',
    warrantiesMany: 'Garantien',
  },
  dashboard: {
    noWarranties: 'Keine Garantien',
    noWarrantiesSub: 'Fügen Sie Ihre erste Garantie hinzu und beginnen Sie, Ablaufdaten zu verfolgen.',
    addFirst: 'Erste Garantie hinzufügen',
    statTotal: 'Gesamt',
    statTotalSub: 'Garantien erfasst',
    statActive: 'Aktiv',
    statActiveSub: 'Garantien aktiv',
    statExpiring: 'Bald ablaufend',
    statExpiringSub: 'innerhalb von 90 Tagen',
    statValue: 'Wert',
    statValueSub: 'unter aktiver Garantie',
    expiringSoonTitle: 'Bald ablaufend',
    expires: 'Läuft ab',
    daysLeft: 'verbleibend',
    today: 'Heute!',
    recentlyAdded: 'Kürzlich hinzugefügt',
    statusOverview: 'Statusübersicht',
    activeWarranties: 'Aktive Garantien',
    expiringSoon: 'Bald ablaufend',
    expired: 'Abgelaufen',
    euTitle: 'EU-gesetzlicher Schutz',
    euQuestion: 'Kennen Sie Ihre Rechte?',
    euBody: 'Jedes Produkt in der EU hat eine 2-jährige gesetzliche Garantie gemäß Richtlinie 2019/771 — unabhängig von der kommerziellen Garantie des Verkäufers.',
    euFooter: 'Rokko verfolgt automatisch beide Fristen',
    expiredTitle: 'Abgelaufen',
    expiredBody: 'Garantien sind abgelaufen. Erwägen Sie eine erweiterte Garantie für wertvolle Gegenstände.',
  },
  products: {
    title: 'Garantien',
    total: 'gesamt',
    searchPlaceholder: 'Nach Name, Marke, Modell suchen...',
    filters: 'Filter',
    filterAll: 'Alle',
    filterActive: 'Aktiv',
    filterExpiring: 'Bald ablaufend',
    filterExpired: 'Abgelaufen',
    categoryLabel: 'Kategorie',
    allCategories: 'Alle Kategorien',
    sortBy: 'Sortieren nach',
    sortExpiry: 'Ablaufdatum',
    sortName: 'Name (A-Z)',
    sortPurchase: 'Kaufdatum',
    sortPrice: 'Preis',
    clearCategory: 'Kategoriefilter entfernen',
    noResults: 'Keine Ergebnisse',
    noResultsSub: 'Versuchen Sie, Suche oder Filter zu ändern',
    warrantyProgress: 'Garantiefortschritt',
    purchased: 'Gekauft',
    expires: 'Läuft ab',
    days: 'Tage',
  },
  expiring: {
    title: 'Bald ablaufend',
    subtitle: 'Garantien, die innerhalb von 90 Tagen ablaufen',
    allGood: 'Alles in Ordnung!',
    allGoodSub: 'Keine Garantien laufen innerhalb von 90 Tagen ab.',
    critical: 'Kritisch — innerhalb von 7 Tagen',
    urgent: 'Dringend — innerhalb von 30 Tagen',
    soon: 'Bald — innerhalb von 90 Tagen',
    expires: 'Läuft ab',
    days: 'Tage',
  },
  detail: {
    back: 'Zurück',
    edit: 'Bearbeiten',
    delete: 'Löschen',
    cancel: 'Abbrechen',
    deleting: 'Löschen...',
    confirmDelete: 'Löschen bestätigen',
    purchaseDate: 'Kaufdatum',
    price: 'Preis',
    category: 'Kategorie',
    warrantySection: 'Garantie',
    commercialWarranty: 'Kommerzielle Garantie',
    monthsFromPurchase: 'Monate ab Kauf',
    euStatutory: 'EU-gesetzliche Garantie',
    euDirective: 'Richtlinie 2019/771',
    active: 'Aktiv',
    expired: 'Abgelaufen',
    effectiveProtection: 'Effektiver Schutz bis',
    effectiveSub: 'Länger von kommerzieller und EU-gesetzlicher',
    daysLeft: 'Tage verbleibend',
    warrantyExpired: 'Garantie ist abgelaufen',
    notes: 'Notizen',
    claimGuide: 'Reklamationsanleitung',
    claimGuideStep1Title: 'Verkäufer kontaktieren',
    claimGuideStep1Desc: 'Nach EU-Recht reichen Sie die Reklamation beim Verkäufer ein, nicht beim Hersteller. Verwenden Sie den Kontakt unten.',
    claimGuideStep2Title: 'Dokumentation vorbereiten',
    claimGuideStep2Desc: 'Kaufbeleg, Fehlerbeschreibung, Fotos falls zutreffend. Rokko speichert alle Ihre Dokumente.',
    claimGuideStep3Title: 'Schriftliche Anfrage',
    claimGuideStep3Desc: 'Senden Sie eine schriftliche Anfrage per E-Mail oder Einschreiben. Ein schriftlicher Nachweis ist entscheidend.',
    claimGuideStep4Title: 'Antwortfrist',
    claimGuideStep4Desc: 'Der Verkäufer hat eine angemessene Frist zur Antwort (in der Regel 30 Tage). Danach können Sie sich an die Verbraucherschutzbehörde wenden.',
    claimsTitle: 'Reklamationen',
    addClaim: '+ Hinzufügen',
    claimTitlePlaceholder: 'Reklamationstitel',
    claimDescPlaceholder: 'Problembeschreibung (optional)',
    savingClaim: 'Speichern...',
    saveClaim: 'Hinzufügen',
    noClaimsYet: 'Keine Reklamationen erfasst',
    claimPending: 'Ausstehend',
    claimSubmitted: 'Eingereicht',
    claimInReview: 'In Bearbeitung',
    claimApproved: 'Genehmigt',
    claimRejected: 'Abgelehnt',
    claimResolved: 'Gelöst',
    retailer: 'Verkäufer',
    website: 'Website',
    qrTitle: 'QR-Garantie',
    qrDesc: 'Erstellen Sie einen QR-Code für diese Garantie beim Verkauf des Geräts. Der Käufer kann ihn scannen und die verbleibende Laufzeit sehen.',
    qrGenerate: 'QR-Code erstellen',
    euRights: 'Ihre EU-Rechte',
    euRight1: 'Recht auf Reparatur oder Ersatz',
    euRight2: 'Recht auf Preisminderung',
    euRight3: 'Recht auf Vertragsauflösung',
    months: 'Mo.',
  },
  modal: {
    editWarranty: 'Garantie bearbeiten',
    newWarranty: 'Neue Garantie',
    enterProductData: 'Produktdaten eingeben',
    tabBasic: 'Grunddaten',
    tabWarranty: 'Garantie',
    tabRetailer: 'Verkäufer',
    productName: 'Produktname *',
    productNamePlaceholder: 'z.B. iPhone 15 Pro',
    brand: 'Marke',
    brandPlaceholder: 'Apple',
    model: 'Modell',
    modelPlaceholder: 'A3293',
    category: 'Kategorie',
    selectCategory: 'Kategorie auswählen',
    serialNumber: 'Seriennummer',
    serialPlaceholder: 'z.B. XYZ123456789',
    purchaseDate: 'Kaufdatum *',
    price: 'Preis',
    euWarrantyTitle: 'EU-gesetzliche Garantie',
    euWarrantyDesc: 'Rokko fügt automatisch eine 24-monatige gesetzliche Garantie (EU-Richtlinie 2019/771) neben der kommerziellen hinzu. Die längere der beiden wird verwendet.',
    commercialWarrantyMonths: 'Kommerzielle Garantie (Monate)',
    monthsPlaceholder: 'Anzahl der Monate',
    monthsHint: 'Geben Sie eine Zahl ein, falls oben nicht angezeigt',
    warrantyPreview: 'Garantievorschau',
    commercialLabel: 'Kommerzielle Garantie:',
    euLabel: 'EU-gesetzlich (2J):',
    effectiveLabel: 'Effektiver Schutz bis:',
    notesLabel: 'Notizen',
    notesPlaceholder: 'Besondere Garantiebedingungen, Servicekontakte...',
    retailerName: 'Verkäufername',
    retailerNamePlaceholder: 'z.B. MediaMarkt, Saturn',
    retailerPhone: 'Verkäufer Telefon',
    retailerPhonePlaceholder: '+49 123 456 7890',
    retailerEmail: 'Verkäufer E-Mail',
    retailerEmailPlaceholder: 'service@haendler.de',
    claimTip: 'Reklamationstipp',
    claimTipDesc: 'Speichern Sie den Verkäuferkontakt — bei einer Reklamation nach EU-Recht ist der erste Ansprechpartner immer der Verkäufer, nicht der Hersteller.',
    cancel: 'Abbrechen',
    saving: 'Speichern...',
    saveChanges: 'Änderungen speichern',
    addWarranty: 'Garantie hinzufügen',
    errorSaving: 'Fehler beim Speichern',
    tabDocuments: 'Dokumente',
    productPhoto: 'Produktfoto',
    productPhotoDesc: 'Fügen Sie ein Foto des Produkts zur einfachen Identifikation hinzu',
    receiptPhoto: 'Kassenbon / Kaufnachweis',
    receiptPhotoDesc: 'Foto oder PDF des Belegs — wichtig für Garantieansprüche',
    uploadBtn: 'Datei auswählen',
    uploadChange: 'Ersetzen',
    uploadRemove: 'Entfernen',
    uploading: 'Hochladen...',
    uploadError: 'Fehler beim Hochladen',
    uploadSizeError: 'Datei zu groß (max. 10 MB)',
  },
  analytics: {
    title: 'Analytik',
    subtitle: 'Einblicke in Ihr Garantieportfolio',
    noData: 'Keine Analysedaten',
    noDataSub: 'Fügen Sie Garantien hinzu, um Einblicke zu sehen',
    totalValue: 'Gesamtwert',
    underWarranty: 'Unter aktiver Garantie',
    withoutWarranty: 'Wert ohne Garantie',
    avgWarranty: 'Durchschn. Garantiedauer',
    months: 'Mo.',
    byCategory: 'Nach Kategorie',
    other: 'Sonstiges',
    monthlyPurchases: 'Käufe nach Monat',
    warrantyStatus: 'Garantiestatus',
    active: 'Aktiv',
    expiring: 'Bald ablaufend',
    expired: 'Abgelaufen',
    insights: 'Einblicke',
    insightValuePct: '% des Werts unter Garantie',
    insightValueOf: 'von',
    insightExpiring: 'Garantien laufen bald ab',
    insightCheckExpiring: 'Überprüfen Sie den Bereich "Bald ablaufend"',
    insightAvg: 'Durchschnittlicher Schutz:',
    insightEuMin: 'EU-Minimum sind 24 Monate',
  },
  status: {
    active: 'Aktiv',
    expiringSoon: 'Bald ablaufend',
    expired: 'Abgelaufen',
  },
  warrantyPresets: {
    y1: '1 Jahr',
    y2: '2 Jahre (EU-Minimum)',
    y3: '3 Jahre',
    y4: '4 Jahre',
    y5: '5 Jahre',
    y7: '7 Jahre',
    y10: '10 Jahre',
  },
};

const bs: Translations = {
  nav: {
    features: 'Mogućnosti',
    eu: 'EU Zaštita',
    how: 'Kako funkcioniše',
    login: 'Prijava',
    startFree: 'Počni besplatno',
  },
  hero: {
    badge: 'EU · HR · BA · RS',
    headline1: 'Tvoj digitalni',
    headline2: 'trezor za',
    headline3: 'garanciju.',
    sub: 'Pametni tracker garancija s ugrađenom EU zakonskom zaštitom. Pratite sve garancije, primajte podsjetnika i znajte svoja prava.',
    cta: 'Počnite besplatno',
    hasAccount: 'Imam nalog',
    trust1: 'Besplatno za korištenje',
    trust2: 'Bez kreditne kartice',
    trust3: 'Pohrana dokumenata',
  },
  stats: {
    v1: '12.4 mj', l1: 'prosječna garancija propuštena', s1: 'jer kupci zaborave',
    v2: '73%', l2: 'potrošača ne zna', s2: 'za EU zakonsku zaštitu',
    v3: '2 god.', l3: 'zakonska zaštita EU', s3: 'na sve proizvode',
  },
  features: {
    sectionLabel: 'Mogućnosti',
    sectionTitle: 'Više od pukog praćenja garancija',
    items: [
      { title: 'EU Zakonska Zaštita', description: 'Automatski prati 2-godišnju zakonsku garanciju (EU direktiva 2019/771) na svim proizvodima, čak i kada prodavači to ne naglašavaju.', badge: 'Jedinstveno' },
      { title: 'Pametni Podsjetnici', description: 'Dobijte obavijest 90, 60 i 30 dana prije isteka garancije. Nikad više propuštena reklamacija.', badge: null },
      { title: 'Digitalni Trezor', description: 'Pohranite račune, jamstvene listove i uputstva za upotrebu na jednom sigurnom mjestu. Pristupačno s bilo kojeg uređaja.', badge: null },
      { title: 'Reklamacijski Vodič', description: 'Korak-po-korak asistent za pokretanje reklamacije. Prava EU potrošača na dlanu — uključujući kontakte servisnih centara.', badge: 'Novo' },
      { title: 'QR Garancija za Preprodaju', description: 'Generirajte QR kod garancije pri prodaji polovne robe. Kupac skenira i vidi preostalo trajanje — povjerenje u jednom kliku.', badge: 'Jedinstveno' },
      { title: 'Uvidi i Analitika', description: 'Prikaz ukupne vrijednosti predmeta pod garancijom, potrošnje po kategorijama i prediktivnih rokova servisiranja.', badge: null },
    ],
  },
  eu: {
    sectionLabel: 'EU Direktiva 2019/771',
    title: 'Znate li svoja prava kao EU potrošač?',
    body: 'Svaki proizvod kupljen u EU ima',
    bodyHighlight: 'minimalno 2 godine zakonske garancije',
    bodyEnd: '— čak i ako prodavač tvrdi drugačije ili ponudi manje.',
    points: [
      'Prodavač mora besplatno popraviti ili zamijeniti neispravan proizvod',
      'Pravo vrijedi 2 godine od datuma kupovine',
      'Teret dokaza u prvih 12 mjeseci je na prodavaču',
      'Vrijedi u svim zemljama EU, uključujući Bosnu i Hercegovinu',
    ],
    autoLabel: 'Rokko automatski...',
    autoItems: [
      { label: 'Dodaje 2g zakonsku zaštitu', sub: 'Na sve novo kupljene proizvode' },
      { label: 'Uspoređuje komercijalne i zakonske garancije', sub: 'Uvijek prikazuje dulje trajanje' },
      { label: 'Upozorava na reklamacijske rokove', sub: 'Pravovremeno, uvijek' },
      { label: 'Generira reklamacijska pisma', sub: 'Za slanje prodavačima i servisima' },
    ],
  },
  how: {
    sectionLabel: 'Proces',
    title: 'Jednostavno u 3 koraka',
    steps: [
      { num: '01', title: 'Dodajte proizvod', desc: 'Unesite naziv, datum kupovine i trajanje garancije. Priložite sliku računa.' },
      { num: '02', title: 'Pratite status', desc: 'Dashboard prikazuje sve garancije s jasnim vizualnim statusom — aktivna, uskoro istječe, istekla.' },
      { num: '03', title: 'Primajte podsjetnika', desc: 'Automatske obavijesti na email prije isteka. Uvijek na vrijeme za reklamaciju.' },
    ],
  },
  cta: {
    title1: 'Zaštitite svoja',
    title2: 'ulaganja.',
    sub: 'Besplatno. Bez kreditne kartice. Odmah.',
    btn: 'Kreiraj besplatan nalog',
  },
  footer: {
    legal: 'Prilagođeno EU zakonodavstvu',
    regions: 'HR · BA · RS',
    gdpr: 'GDPR usklađeno',
  },
  auth: {
    welcomeBack: 'Dobrodošli nazad',
    createAccount: 'Kreirajte nalog',
    signInSub: 'Prijavite se u svoj Rokko nalog',
    registerSub: 'Počnite pratiti garancije besplatno',
    fullName: 'Ime i prezime',
    namePlaceholder: 'Vaše ime',
    password: 'Lozinka',
    loading: 'Učitavanje...',
    signIn: 'Prijavi se',
    register: 'Kreiraj nalog',
    noAccount: 'Nemate nalog? ',
    hasAccount: 'Već imate nalog? ',
    signUpLink: 'Registrujte se',
    signInLink: 'Prijavite se',
    terms: 'Registracijom prihvatate naše uvjete korištenja i politiku privatnosti.',
    errorInvalidCredentials: 'Pogrešan email ili lozinka.',
    errorUserExists: 'Korisnik s tim emailom već postoji.',
    errorPasswordShort: 'Lozinka mora imati najmanje 6 znakova.',
  },
  app: {
    addWarranty: 'Dodaj garanciju',
    profileSettings: 'Postavke profila',
    signOut: 'Odjavi se',
    navDashboard: 'Pregled',
    navProducts: 'Garancije',
    navExpiring: 'Uskoro istječe',
    navCategories: 'Kategorije',
    navAnalytics: 'Analitika',
    navSettings: 'Postavke',
    euBanner: 'EU Zaštita aktivna',
    euBannerSub: 'Svi vaši proizvodi su zaštićeni EU Direktivom 2019/771',
    loading: 'Učitavanje...',
    comingSoon: 'Ova sekcija dolazi uskoro.',
    categories: 'Kategorije',
    warranty: 'garancija',
    warranties2to4: 'garancije',
    warrantiesMany: 'garancija',
  },
  dashboard: {
    noWarranties: 'Nema garancija',
    noWarrantiesSub: 'Dodajte svoju prvu garanciju i počnite pratiti rokove isteka vaših proizvoda.',
    addFirst: 'Dodaj prvu garanciju',
    statTotal: 'Ukupno',
    statTotalSub: 'garancija evidentirano',
    statActive: 'Aktivne',
    statActiveSub: 'garancija aktivno',
    statExpiring: 'Uskoro istječe',
    statExpiringSub: 'u roku 90 dana',
    statValue: 'Vrijednost',
    statValueSub: 'pod aktivnom garancijom',
    expiringSoonTitle: 'Uskoro istječe',
    expires: 'Istječe',
    daysLeft: 'preostalo',
    today: 'Danas!',
    recentlyAdded: 'Nedavno dodano',
    statusOverview: 'Pregled stanja',
    activeWarranties: 'Aktivne garancije',
    expiringSoon: 'Uskoro istječe',
    expired: 'Istekle',
    euTitle: 'EU Zakonska Zaštita',
    euQuestion: 'Znate li svoja prava?',
    euBody: 'Svaki proizvod u EU ima 2-godišnju zakonsku garanciju po direktivi 2019/771 — neovisno o komercijalnoj garanciji prodavača.',
    euFooter: 'Rokko automatski prati oba roka',
    expiredTitle: 'Istekle',
    expiredBody: 'garancija je isteklo. Razmislite o proširenoj garanciji za vrijedne predmete.',
  },
  products: {
    title: 'Garancije',
    total: 'ukupno',
    searchPlaceholder: 'Pretraži po nazivu, marki, modelu...',
    filters: 'Filteri',
    filterAll: 'Sve',
    filterActive: 'Aktivne',
    filterExpiring: 'Uskoro istječe',
    filterExpired: 'Istekle',
    categoryLabel: 'Kategorija',
    allCategories: 'Sve kategorije',
    sortBy: 'Sortiraj po',
    sortExpiry: 'Datum isteka',
    sortName: 'Naziv (A-Z)',
    sortPurchase: 'Datum kupovine',
    sortPrice: 'Cijena',
    clearCategory: 'Ukloni filtriranje po kategoriji',
    noResults: 'Nema rezultata',
    noResultsSub: 'Pokušajte promijeniti pretragu ili filtere',
    warrantyProgress: 'Napredak garancije',
    purchased: 'Kupljeno',
    expires: 'Istječe',
    days: 'dana',
  },
  expiring: {
    title: 'Uskoro istječe',
    subtitle: 'Garancije koje ističu u roku 90 dana',
    allGood: 'Sve je u redu!',
    allGoodSub: 'Nema garancija koje ističu u roku 90 dana.',
    critical: 'Kritično — unutar 7 dana',
    urgent: 'Hitno — unutar 30 dana',
    soon: 'Uskoro — unutar 90 dana',
    expires: 'Istječe',
    days: 'dana',
  },
  detail: {
    back: 'Natrag',
    edit: 'Uredi',
    delete: 'Obriši',
    cancel: 'Odustani',
    deleting: 'Brisanje...',
    confirmDelete: 'Potvrdi brisanje',
    purchaseDate: 'Datum kupovine',
    price: 'Cijena',
    category: 'Kategorija',
    warrantySection: 'Garancija',
    commercialWarranty: 'Komercijalna garancija',
    monthsFromPurchase: 'mjeseci od kupovine',
    euStatutory: 'EU Zakonska garancija',
    euDirective: 'Direktiva 2019/771',
    active: 'Aktivna',
    expired: 'Istekla',
    effectiveProtection: 'Efektivna zaštita do',
    effectiveSub: 'Dulje od komercijalne i EU zakonske',
    daysLeft: 'dana preostalo',
    warrantyExpired: 'Garancija je istekla',
    notes: 'Napomene',
    claimGuide: 'Reklamacijski vodič',
    claimGuideStep1Title: 'Kontaktirajte prodavača',
    claimGuideStep1Desc: 'Prema EU zakonu, reklamaciju podnosite prodavaču, ne proizvođaču. Koristite kontakt ispod.',
    claimGuideStep2Title: 'Pripremite dokumentaciju',
    claimGuideStep2Desc: 'Račun kupovine, opis kvara, fotografije ako je primjenjivo. Rokko čuva sve vaše dokumente.',
    claimGuideStep3Title: 'Zahtjev u pisanom obliku',
    claimGuideStep3Desc: 'Pošaljite pismeni zahtjev emailom ili preporučenom poštom. Pisani trag je ključan.',
    claimGuideStep4Title: 'Rok odgovora',
    claimGuideStep4Desc: 'Prodavač ima razuman rok za odgovor (obično 30 dana). Nakon toga možete eskalirati prema ZZP-u ili europskom centru potrošača.',
    claimsTitle: 'Reklamacije',
    addClaim: '+ Dodaj',
    claimTitlePlaceholder: 'Naslov reklamacije',
    claimDescPlaceholder: 'Opis problema (opcionalno)',
    savingClaim: 'Spremanje...',
    saveClaim: 'Dodaj',
    noClaimsYet: 'Nema evidentiranih reklamacija',
    claimPending: 'Na čekanju',
    claimSubmitted: 'Podnesena',
    claimInReview: 'U obradi',
    claimApproved: 'Odobrena',
    claimRejected: 'Odbijena',
    claimResolved: 'Riješena',
    retailer: 'Prodavač',
    website: 'Web stranica',
    qrTitle: 'QR Garancija',
    qrDesc: 'Generirajte QR kod za ovu garanciju pri prodaji uređaja. Kupac može skenirati i vidjeti preostalo trajanje.',
    qrGenerate: 'Generiraj QR kod',
    euRights: 'Vaša EU Prava',
    euRight1: 'Pravo na popravak ili zamjenu',
    euRight2: 'Pravo na sniženje cijene',
    euRight3: 'Pravo na raskid ugovora',
    months: 'mj',
  },
  modal: {
    editWarranty: 'Uredi garanciju',
    newWarranty: 'Nova garancija',
    enterProductData: 'Unesite podatke o proizvodu',
    tabBasic: 'Osnovni podaci',
    tabWarranty: 'Garancija',
    tabRetailer: 'Prodavač',
    productName: 'Naziv proizvoda *',
    productNamePlaceholder: 'npr. iPhone 15 Pro',
    brand: 'Marka',
    brandPlaceholder: 'Apple',
    model: 'Model',
    modelPlaceholder: 'A3293',
    category: 'Kategorija',
    selectCategory: 'Odaberite kategoriju',
    serialNumber: 'Serijski broj',
    serialPlaceholder: 'npr. XYZ123456789',
    purchaseDate: 'Datum kupovine *',
    price: 'Cijena',
    euWarrantyTitle: 'EU Zakonska garancija',
    euWarrantyDesc: 'Rokko automatski dodaje 24-mjesečnu zakonsku garanciju (EU direktiva 2019/771) uz komercijalnu. Koristit će se dulja od dviju.',
    commercialWarrantyMonths: 'Komercijalna garancija (mjeseci)',
    monthsPlaceholder: 'Broj mjeseci',
    monthsHint: 'Unesite broj ako nije prikazan iznad',
    warrantyPreview: 'Pregled garancije',
    commercialLabel: 'Komercijalna garancija:',
    euLabel: 'EU zakonska (2g):',
    effectiveLabel: 'Efektivna zaštita do:',
    notesLabel: 'Napomene',
    notesPlaceholder: 'Posebni uvjeti garancije, kontakti servisa...',
    retailerName: 'Naziv prodavača',
    retailerNamePlaceholder: 'npr. Tehnostop, BH Telecom shop',
    retailerPhone: 'Telefon prodavača',
    retailerPhonePlaceholder: '+387 33 123 456',
    retailerEmail: 'Email prodavača',
    retailerEmailPlaceholder: 'servis@prodavac.ba',
    claimTip: 'Savjet za reklamacije',
    claimTipDesc: 'Pohranite kontakt prodavača — pri reklamaciji prema EU zakonu, prva točka kontakta je uvijek prodavač, a ne proizvođač.',
    cancel: 'Odustani',
    saving: 'Spremanje...',
    saveChanges: 'Spremi promjene',
    addWarranty: 'Dodaj garanciju',
    errorSaving: 'Greška pri spremanju',
    tabDocuments: 'Dokumenti',
    productPhoto: 'Fotografija proizvoda',
    productPhotoDesc: 'Dodajte sliku proizvoda radi lakše identifikacije',
    receiptPhoto: 'Račun / Potvrda kupovine',
    receiptPhotoDesc: 'Fotografija ili PDF računa — ključno za reklamaciju',
    uploadBtn: 'Odaberite datoteku',
    uploadChange: 'Zamijeni',
    uploadRemove: 'Ukloni',
    uploading: 'Učitavanje...',
    uploadError: 'Greška pri učitavanju datoteke',
    uploadSizeError: 'Datoteka je prevelika (max. 10 MB)',
  },
  analytics: {
    title: 'Analitika',
    subtitle: 'Uvidi u vaš portfolio garancija',
    noData: 'Nema podataka za analitiku',
    noDataSub: 'Dodajte garancije da vidite uvide',
    totalValue: 'Ukupna vrijednost',
    underWarranty: 'Pod aktivnom garancijom',
    withoutWarranty: 'Vrijednost bez garancije',
    avgWarranty: 'Prosj. trajanje garancije',
    months: 'mj',
    byCategory: 'Po kategorijama',
    other: 'Ostalo',
    monthlyPurchases: 'Kupovine po mjesecima',
    warrantyStatus: 'Status garancija',
    active: 'Aktivne',
    expiring: 'Uskoro istječe',
    expired: 'Istekle',
    insights: 'Uvidi',
    insightValuePct: '% vrijednosti pod garancijom',
    insightValueOf: 'od',
    insightExpiring: 'garancija uskoro istječe',
    insightCheckExpiring: 'Provjeri sekciju "Uskoro istječe"',
    insightAvg: 'Prosječna zaštita:',
    insightEuMin: 'EU minimum je 24 månaca',
  },
  status: {
    active: 'Aktivna',
    expiringSoon: 'Uskoro istječe',
    expired: 'Istekla',
  },
  warrantyPresets: {
    y1: '1 godina',
    y2: '2 godine (EU minimum)',
    y3: '3 godine',
    y4: '4 godine',
    y5: '5 godina',
    y7: '7 godina',
    y10: '10 godina',
  },
};

export const translations: Record<Lang, Translations> = { hr, en, de, bs };

export const languages: { code: Lang; flag: string; label: string }[] = [
  { code: 'hr', flag: '🇭🇷', label: 'Hrvatski' },
  { code: 'en', flag: '🇬🇧', label: 'English' },
  { code: 'de', flag: '🇩🇪', label: 'Deutsch' },
  { code: 'bs', flag: '🇧🇦', label: 'Bosanski' },
];
