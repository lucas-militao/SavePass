import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, ReactNode, useContext } from "react";
import uuid from 'react-native-uuid';

interface RegisterProviderProps {
  children: ReactNode;
}

interface RegisterProps {
  service_name: string;
  email: string;
  password: string;
}

interface IRegisterContextData {
  addRegister: (newRegister: RegisterProps) => Promise<void>
  getRegisters: () => Promise<RegisterProps[]>
}
 
const RegisterContext = createContext({} as IRegisterContextData);

function RegisterProvider({
  children
}: RegisterProviderProps) {
  const dataKey = '@savepass:logins'; 

  async function addRegister(newRegister: RegisterProps) {
    const data = await AsyncStorage.getItem(dataKey);
    const currentData = data ? JSON.parse(data) : [];
    const newData = {
      id: String(uuid.v4()),
      ...newRegister
    }

    const updatedData = [
      ...currentData,
      newData
    ];

    await AsyncStorage.setItem(dataKey, JSON.stringify(updatedData));
  }

  async function getRegisters(){
    const data = await AsyncStorage.getItem(dataKey);
    const currentData = JSON.parse(data);
    
    return currentData;
  }

  return (
    <RegisterContext.Provider
      value={{
        addRegister,
        getRegisters
      }}
    >
      {children}
    </RegisterContext.Provider>
  );
}

function useRegister() {
  const context = useContext(RegisterContext);

  return context;
}

export { RegisterContext, useRegister, RegisterProvider }