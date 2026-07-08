import type { Product } from "@/types/shop";

const sizes = ["S", "M", "L", "XL", "2XL", "3XL"];

const placeholderColors = [
  {
    id: "confirm-color",
    nameAr: "لون مؤقت - يحتاج تأكيد",
    nameEn: "Placeholder color - confirm exact option",
    value: "#e5d3b3",
    isPlaceholder: true
  }
];

export const products: Product[] = [
  {
    id: "linen-zip-tunic",
    slug: "linen-zip-tunic",
    nameAr: "تونيك كتان بسحاب",
    nameEn: "Linen Zip Tunic",
    descriptionAr: "تونيك منظم بتفصيلة سحاب أمامية. متوفر بأربع درجات راقية حسب النموذج الحالي.",
    descriptionEn: "A structured tunic with zip front detail. Available in 4 refined colorways in the current prototype.",
    shortBenefitAr: "قصّة مريحة ومنظمة للحركة اليومية.",
    shortBenefitEn: "Structured ease for everyday movement.",
    price: 890,
    compareAtPrice: 1100,
    images: ["/assets/products/prodcut0 (2).jpg", "/assets/products/prodcut0 (10).jpg", "/assets/products/prodcut0 (11).jpg"],
    colors: placeholderColors,
    sizes,
    fabricAr: "بيانات القماش الدقيقة غير موجودة في الملفات. Placeholder: قماش فاخر يحتاج تأكيد.",
    fabricEn: "Exact fabric composition is missing. Placeholder: premium fabric details to confirm.",
    fitNotesAr: "قصّة محتشمة ومريحة. راجعي دليل المقاسات أو تواصلي عبر واتساب.",
    fitNotesEn: "Modest comfortable fit. Use the size guide or WhatsApp support before ordering.",
    category: "UNFOLDED SS26",
    badgeAr: "جديد",
    badgeEn: "New",
    isFeatured: true,
    dataNote: "Image mapping is inferred because uploaded files are named prodcut0 (n).jpg rather than semantic product filenames."
  },
  {
    id: "mada-a-line-dress",
    slug: "mada-a-line-dress",
    nameAr: "فستان مدى أيه لاين",
    nameEn: "Mada A-Line Dress",
    descriptionAr: "تصميم أيه لاين المميز مع امتداد حزام مدى. إطلالتان في قطعة واحدة.",
    descriptionEn: "Our signature A-line with the Mada belt extension. Two looks in one.",
    shortBenefitAr: "حزام قابل للفصل لإطلالة مرنة.",
    shortBenefitEn: "Detachable belt for flexible styling.",
    price: 1150,
    images: ["/assets/products/prodcut0 (1).jpg", "/assets/products/prodcut0 (3).jpg", "/assets/products/prodcut0 (4).jpg"],
    colors: placeholderColors,
    sizes,
    fabricAr: "بيانات القماش الدقيقة غير موجودة في الملفات. Placeholder: قماش فاخر يحتاج تأكيد.",
    fabricEn: "Exact fabric composition is missing. Placeholder: premium fabric details to confirm.",
    fitNotesAr: "قصّة A-Line محتشمة. اختاري مقاسك من الجدول قبل التأكيد.",
    fitNotesEn: "Modest A-line silhouette. Confirm sizing from the chart before checkout.",
    category: "Dresses",
    badgeAr: "الأكثر مبيعاً",
    badgeEn: "Bestseller",
    isFeatured: true,
    dataNote: "Image mapping is inferred because uploaded files are named prodcut0 (n).jpg rather than semantic product filenames."
  },
  {
    id: "galaxy-linen-cardigan",
    slug: "galaxy-linen-cardigan",
    nameAr: "كارديجان جالاكسي",
    nameEn: "Galaxy Linen Cardigan",
    descriptionAr: "كارديجان فاخر بأكتاف منظمة وقصّة مريحة. متوفر بست درجات مختارة حسب النموذج الحالي.",
    descriptionEn: "Premium cardigan with structured shoulders and a relaxed silhouette. Available in 6 selected colorways in the current prototype.",
    shortBenefitAr: "قطعة طبقات أنيقة ومحتشمة.",
    shortBenefitEn: "Elegant modest layering piece.",
    price: 980,
    images: ["/assets/products/prodcut0 (5).jpg", "/assets/products/prodcut0 (6).jpg", "/assets/products/prodcut0 (7).jpg"],
    colors: placeholderColors,
    sizes,
    fabricAr: "بيانات القماش الدقيقة غير موجودة في الملفات. Placeholder: كتان/قماش فاخر يحتاج تأكيد.",
    fabricEn: "Exact fabric composition is missing. Placeholder: linen/premium fabric details to confirm.",
    fitNotesAr: "قصّة مريحة بأكتاف منظمة. دعم المقاسات متاح عبر واتساب.",
    fitNotesEn: "Relaxed fit with structured shoulders. WhatsApp sizing support is available.",
    category: "Cardigans",
    isFeatured: true,
    dataNote: "Image mapping is inferred because uploaded files are named prodcut0 (n).jpg rather than semantic product filenames."
  }
];

export function getProduct(slug: string) {
  return products.find((product) => product.slug === slug);
}
