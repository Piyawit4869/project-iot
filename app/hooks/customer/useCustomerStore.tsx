import React, { createContext, useContext, useState } from "react";

type CustomerContextType = {
  layout: "ordinary_person" | "juristic_person";
  setLayout: (value: "ordinary_person" | "juristic_person") => void;
};

const CustomerContext = createContext<CustomerContextType | undefined>(
  undefined
);

export function CustomerProvider({ children }: { children: React.ReactNode }) {
  const [layout, setCustomerLayout] = useState<
    "ordinary_person" | "juristic_person"
  >("juristic_person");

  const setLayout = (value: "ordinary_person" | "juristic_person") => {
    setCustomerLayout(value);
  };

  return (
    <CustomerContext.Provider value={{ layout, setLayout }}>
      {children}
    </CustomerContext.Provider>
  );
}

export const useCustomerLayout = () => {
  const context = useContext(CustomerContext);
  if (!context)
    throw new Error("useCustomerLayout must be used within CustomerProvider");
  return context;
};
