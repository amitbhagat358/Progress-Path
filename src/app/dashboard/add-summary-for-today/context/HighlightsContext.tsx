'use client';
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface BulletPoint {
  id: number;
  text: string;
}

interface HighlightsContextType {
  highlights: BulletPoint[];
  setHighlights: React.Dispatch<React.SetStateAction<BulletPoint[]>>;
}

const HighlightsContext = createContext<HighlightsContextType | undefined>(
  undefined
);

export const HighlightsProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [highlights, setHighlights] = useState<BulletPoint[]>([]);

  return (
    <HighlightsContext.Provider
      value={{
        highlights,
        setHighlights,
      }}
    >
      {children}
    </HighlightsContext.Provider>
  );
};

export const useHighlights = (): HighlightsContextType => {
  const context = useContext(HighlightsContext);
  if (!context) {
    throw new Error('useHighlights must be used within a HighlightsProvider');
  }
  return context;
};
