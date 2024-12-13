'use client';
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface BulletPoint {
  id: number;
  text: string;
}

interface LearningContextType {
  learnings: BulletPoint[];
  setLearnings: React.Dispatch<React.SetStateAction<BulletPoint[]>>;
}

const LearningContext = createContext<LearningContextType | undefined>(
  undefined
);

export const LearningsProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [learnings, setLearnings] = useState<BulletPoint[]>([]);

  return (
    <LearningContext.Provider
      value={{
        learnings,
        setLearnings,
      }}
    >
      {children}
    </LearningContext.Provider>
  );
};

export const useLearnings = (): LearningContextType => {
  const context = useContext(LearningContext);
  if (!context) {
    throw new Error('useLearnings must be used within a LearningsProvider');
  }
  return context;
};
