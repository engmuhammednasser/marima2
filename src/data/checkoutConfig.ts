import { brand } from "@/data/siteContent";

export const checkoutConfig = {
  requiredFields: ["fullName", "mobile", "governorate", "city", "address"],
  paymentMethods: [
    {
      id: "instapay",
      labelAr: "دفعة مقدمة عبر انستاباي",
      labelEn: "InstaPay deposit"
    },
    {
      id: "cod",
      labelAr: "الدفع عند الاستلام إذا متاح",
      labelEn: "Cash on delivery if available"
    }
  ],
  instapayHandle: brand.instapay,
  confirmationAr: "أؤكد أن المقاس واللون صحيحان",
  confirmationEn: "I confirm that the selected size and color are correct",
  depositRate: 0.1
};
