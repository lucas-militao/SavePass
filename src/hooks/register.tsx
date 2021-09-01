import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, ReactNode, useContext } from "react";
import uuid from 'react-native-uuid';

interface RegisterProviderProps {
  children: ReactNode;
}

interface RegisterProps {
  id: string;
  service_name: string;
  email: string;
  password: string;
}

interface IRegisterContextData {
  addRegister: (newRegister: RegisterProps, userId: string) => Promise<void>
  getRegisters: (userId: string) => Promise<RegisterProps[]>
  deleteRegister: (userId: string, idRegister: string) => Promise<RegisterProps[]>
}
 
const RegisterContext = createContext({} as IRegisterContextData);

function RegisterProvider({
  children
}: RegisterProviderProps) {
  const dataKey = `@savepass:logins`; 

  async function addRegister(newRegister: RegisterProps, userId: string) {
    const dataKeyUser = dataKey + `:${userId}`;

    const data = await AsyncStorage.getItem(dataKeyUser);
    const currentData = data ? JSON.parse(data) : [];
    const newData = {
      id: String(uuid.v4()),
      ...newRegister
    }

    const updatedData = [
      ...currentData,
      newData
    ];

    await AsyncStorage.setItem(dataKeyUser, JSON.stringify(updatedData));
  }

  async function getRegisters(userId: string) {
    const dataKeyUser = dataKey + `:${userId}`;
    const data = await AsyncStorage.getItem(dataKeyUser);
    const currentData = data!! ? JSON.parse(data) : [];
    
    console.log(currentData);

    return currentData;
  }

  async function deleteRegister(userId: string, idRegister: string) {
    const dataKeyUser = dataKey + `:${userId}`;
    const data = await AsyncStorage.getItem(dataKeyUser);
    const currentData = JSON.parse(data);

    const formattedData = currentData.filter(item => {
      if (item.id !== idRegister) {
        return item;
      }
    });

    await AsyncStorage.setItem(dataKeyUser, JSON.stringify(formattedData));

    return formattedData;
  }

  return (
    <RegisterContext.Provider
      value={{
        addRegister,
        getRegisters,
        deleteRegister
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