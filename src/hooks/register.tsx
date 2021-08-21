import React, { createContext, ReactNode, useContext } from "react";

interface RegisterProviderProps {
  children: ReactNode;
}

interface IRegisterContextData {}
 
const RegisterContext = createContext({} as IRegisterContextData);

function RegisterProvider({
  children
}: RegisterProviderProps) {
  
  return (
    <RegisterContext.Provider
      value={{}}
    >
      {children}
    </RegisterContext.Provider>
  );
}

function useRegister() {
  const context = useContext(RegisterContext);

  return context;
}

export { RegisterContext, useRegister }