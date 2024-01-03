import React, { createContext, useContext, useState } from 'react';

interface StepperContextType {
    userData: {
      username: string;
      password: string;
      address?: string;
      city?: string;
      zipCode?: string;
      state?: string;
      fullName?: string;
      emailAddress?: string;
      dateOfBirth?: string;
    };
    setUserData: React.Dispatch<
      React.SetStateAction<{
        username: string;
        password: string;
        address?: string;
        city?: string;
        zipCode?: string;
        state?: string;
        emailAddress?: string;
        dateOfBirth?: string;
      }>
    >;
  }
  

const StepperContext = createContext<StepperContextType | undefined>(undefined);

export function UseContextProvider({ children }: { children: React.ReactNode }) {
  const [userData, setUserData] = useState<{
    username: string;
    password: string;
    address?: string;
    city?: string;
  }>({
    username: '',
    password: '',
  });

  return (
    <StepperContext.Provider value={{ userData, setUserData }}>
      {children}
    </StepperContext.Provider>
  );
}

export function useStepperContext() {
  const context = useContext(StepperContext);

  if (!context) {
    throw new Error('useStepperContext must be used within a UseContextProvider');
  }

  return context;
}
