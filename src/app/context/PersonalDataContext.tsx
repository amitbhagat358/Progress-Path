'use client';
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { initial_personal_data } from '@/lib/initialData';

interface Checkbox {
  id: number;
  name: string;
  checked: boolean;
}

interface PersonalDataContextType {
  items: Checkbox[];
  setItems: React.Dispatch<React.SetStateAction<Checkbox[]>>;
}

const PersonalDataContext = createContext<PersonalDataContextType | undefined>(
  undefined
);

export const PersonalDataProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [items, setItems] = useState<Checkbox[]>(initial_personal_data);

  return (
    <PersonalDataContext.Provider
      value={{
        items,
        setItems,
      }}
    >
      {children}
    </PersonalDataContext.Provider>
  );
};

export const usePersonalData = (): PersonalDataContextType => {
  const context = useContext(PersonalDataContext);
  if (!context) {
    throw new Error(
      'usePersonalData must be used within a PersonalDataProvider'
    );
  }
  return context;
};
