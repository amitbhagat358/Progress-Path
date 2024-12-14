'use client';
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { initial_coding_data } from '../InitialData';

interface Checkbox {
  id: number;
  name: string;
  checked: boolean;
}

interface CodingDataContextType {
  items: Checkbox[];
  setItems: React.Dispatch<React.SetStateAction<Checkbox[]>>;
}

const CodingDataContext = createContext<CodingDataContextType | undefined>(
  undefined
);

export const CodingDataProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [items, setItems] = useState<Checkbox[]>(initial_coding_data);

  return (
    <CodingDataContext.Provider
      value={{
        items,
        setItems,
      }}
    >
      {children}
    </CodingDataContext.Provider>
  );
};

export const useCodingData = (): CodingDataContextType => {
  const context = useContext(CodingDataContext);
  if (!context) {
    throw new Error('useCodingData must be used within a CodingDataProvider');
  }
  return context;
};
