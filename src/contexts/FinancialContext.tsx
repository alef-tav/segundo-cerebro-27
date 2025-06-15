
import React, { createContext, useContext, useState, ReactNode } from 'react';

type FinancialType = 'pessoal' | 'empresarial';

interface FinancialContextType {
  financialType: FinancialType;
  setFinancialType: (type: FinancialType) => void;
}

const FinancialContext = createContext<FinancialContextType | undefined>(undefined);

interface FinancialProviderProps {
  children: ReactNode;
}

export function FinancialProvider({ children }: FinancialProviderProps) {
  const [financialType, setFinancialType] = useState<FinancialType>('pessoal');

  return (
    <FinancialContext.Provider value={{ financialType, setFinancialType }}>
      {children}
    </FinancialContext.Provider>
  );
}

export function useFinancialContext() {
  const context = useContext(FinancialContext);
  if (context === undefined) {
    throw new Error('useFinancialContext must be used within a FinancialProvider');
  }
  return context;
}
