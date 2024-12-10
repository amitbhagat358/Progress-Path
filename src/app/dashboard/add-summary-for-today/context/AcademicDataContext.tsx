'use client';
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { initial_academic_data } from '../InitialData';

interface Checkbox {
  id: number;
  name: string;
  checked: boolean;
}

interface AcademicDataContextType {
  items: Checkbox[];
  setItems: React.Dispatch<React.SetStateAction<Checkbox[]>>;
}

const AcademicDataContext = createContext<AcademicDataContextType | undefined>(
  undefined
);

export const AcademicDataProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [items, setItems] = useState<Checkbox[]>(initial_academic_data);

  return (
    <AcademicDataContext.Provider
      value={{
        items,
        setItems,
      }}
    >
      {children}
    </AcademicDataContext.Provider>
  );
};

export const useAcademicData = (): AcademicDataContextType => {
  const context = useContext(AcademicDataContext);
  if (!context) {
    throw new Error(
      'useAcademicData must be used within a AcademicDataProvider'
    );
  }
  return context;
};
