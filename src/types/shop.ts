export type Locale = "ar" | "en";

export type LocalizedText = {
  ar: string;
  en: string;
};

export type ProductColor = {
  id: string;
  nameAr: string;
  nameEn: string;
  value: string;
  isPlaceholder?: boolean;
};

export type Product = {
  id: string;
  slug: string;
  nameAr: string;
  nameEn: string;
  descriptionAr: string;
  descriptionEn: string;
  shortBenefitAr: string;
  shortBenefitEn: string;
  price: number;
  compareAtPrice?: number;
  images: string[];
  colors: ProductColor[];
  sizes: string[];
  fabricAr: string;
  fabricEn: string;
  fitNotesAr: string;
  fitNotesEn: string;
  category: string;
  badgeAr?: string;
  badgeEn?: string;
  isFeatured: boolean;
  dataNote?: string;
};

export type CartItem = {
  productId: string;
  slug: string;
  nameAr: string;
  nameEn: string;
  image: string;
  size: string;
  colorId: string;
  colorNameAr: string;
  colorNameEn: string;
  unitPrice: number;
  quantity: number;
  subtotal: number;
};
