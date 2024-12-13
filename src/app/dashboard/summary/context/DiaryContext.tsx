'use client';

import React, { createContext, ReactNode, useContext, useState } from 'react';

interface DiaryContextType {
  diaryContent: string;
  setDiaryContent: React.Dispatch<React.SetStateAction<string>>;
}

const DiaryContext = createContext<DiaryContextType | undefined>(undefined);

export const DiaryContextProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [diaryContent, setDiaryContent] = useState<string>('');

  return (
    <DiaryContext.Provider value={{ diaryContent, setDiaryContent }}>
      {children}
    </DiaryContext.Provider>
  );
};

export const useDiary = () => {
  const context = useContext(DiaryContext);
  if (!context) {
    throw new Error('useDiary must be used within a useDiaryContext Provider');
  }
  return context;
};
