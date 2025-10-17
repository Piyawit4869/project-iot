import React, {
  createContext,
  useContext,
  useState,
  type ReactNode,
  type Dispatch,
  type SetStateAction,
} from "react";
import type { Product } from "~/schemas/product/product";

export type OrderData = {
  products: Product[];
  customerName: string;
  customerEmail: string;
  addOns: string[];
  discount: number;
};

export type OrderContextType = {
  order: OrderData;
  setOrder: Dispatch<SetStateAction<OrderData>>;
  step: number;
  setStep: Dispatch<SetStateAction<number>>;
  resetOrder: () => void;
  products: Product[];
  setProducts: Dispatch<SetStateAction<Product[]>>;
  updateProductQuantity: (productId: string, quantity: number) => void;
  updateProducts: (products: Product[]) => void;
};

const defaultOrder: OrderData = {
  products: [],
  customerName: "",
  customerEmail: "",
  addOns: [],
  discount: 0,
};

const OrderContext = createContext<OrderContextType | undefined>(undefined);

export function OrderProvider({ children }: { children: ReactNode }) {
  const [order, setOrder] = useState<OrderData>(defaultOrder);
  const [step, setStep] = useState<number>(1);

  const [products, setProducts] = useState<Product[]>([]);

  const resetOrder = () => {
    setOrder(defaultOrder);
    setStep(1);
  };

  const updateProductQuantity = (productId: string, quantity: number) => {
    setOrder((prev) => {
      const newProducts = prev.products.map((p) =>
        p.id === productId ? { ...p, quantity } : p
      );
      return { ...prev, products: newProducts };
    });
  };

  const updateProducts = (products: Product[]) => {
    setOrder((prev) => ({ ...prev, products }));
  };

  return (
    <OrderContext.Provider
      value={{
        order,
        setOrder,
        products,
        setProducts,
        step,
        setStep,
        resetOrder,
        updateProductQuantity,
        updateProducts,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
}

export function useOrder(): OrderContextType {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error("useOrder must be used within an OrderProvider");
  }
  return context;
}
