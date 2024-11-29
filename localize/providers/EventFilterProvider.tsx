'use client';

import React, { createContext, useContext, useState } from 'react';

interface EventFilterContextType {
  filter: string;
  setFilter: (value: string) => void;
}

const EventFilterContext = createContext<EventFilterContextType | undefined>(
  undefined,
);

export const EventFilterProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [filter, setFilter] = useState('');

  return (
    <EventFilterContext.Provider value={{ filter, setFilter }}>
      {children}
    </EventFilterContext.Provider>
  );
};

export const useEventFilter = () => {
  const context = useContext(EventFilterContext);
  if (!context) {
    throw new Error(
      'useEventFilter deve ser usado dentro de um EventFilterProvider',
    );
  }
  return context;
};
