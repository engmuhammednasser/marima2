"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { CartItem, Product, ProductColor } from "@/types/shop";

type AddInput = {
  product: Product;
  size: string;
  color: ProductColor;
  quantity: number;
};

type CartContextValue = {
  items: CartItem[];
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  addItem: (input: AddInput) => void;
  updateQuantity: (key: string, quantity: number) => void;
  removeItem: (key: string) => void;
  clearCart: () => void;
  subtotal: number;
  deposit: number;
  count: number;
};

const CartContext = createContext<CartContextValue | null>(null);

function keyOf(item: Pick<CartItem, "productId" | "size" | "colorId">) {
  return `${item.productId}:${item.size}:${item.colorId}`;
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const stored = window.localStorage.getItem("mariam-cart");
    if (stored) setItems(JSON.parse(stored) as CartItem[]);
  }, []);

  useEffect(() => {
    window.localStorage.setItem("mariam-cart", JSON.stringify(items));
  }, [items]);

  const value = useMemo<CartContextValue>(() => {
    const subtotal = items.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);
    return {
      items,
      isOpen,
      openCart: () => setIsOpen(true),
      closeCart: () => setIsOpen(false),
      addItem: ({ product, size, color, quantity }) => {
        setItems((current) => {
          const next: CartItem = {
            productId: product.id,
            slug: product.slug,
            nameAr: product.nameAr,
            nameEn: product.nameEn,
            image: product.images[0],
            size,
            colorId: color.id,
            colorNameAr: color.nameAr,
            colorNameEn: color.nameEn,
            unitPrice: product.price,
            quantity
          };
          const key = keyOf(next);
          const existing = current.find((item) => keyOf(item) === key);
          if (!existing) return [...current, next];
          return current.map((item) => keyOf(item) === key ? { ...item, quantity: item.quantity + quantity } : item);
        });
        setIsOpen(true);
      },
      updateQuantity: (key, quantity) => {
        setItems((current) => current.flatMap((item) => {
          if (keyOf(item) !== key) return [item];
          return quantity > 0 ? [{ ...item, quantity }] : [];
        }));
      },
      removeItem: (key) => setItems((current) => current.filter((item) => keyOf(item) !== key)),
      clearCart: () => setItems([]),
      subtotal,
      deposit: Math.ceil(subtotal * 0.1),
      count: items.reduce((sum, item) => sum + item.quantity, 0)
    };
  }, [items, isOpen]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used inside CartProvider");
  return context;
}

export const cartKey = keyOf;
