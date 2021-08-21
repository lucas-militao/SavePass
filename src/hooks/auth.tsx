import React, { useContext, useEffect, useState } from "react";

const { CLIENT_ID } = process.env;
const { REDIRECT_URI } = process.env;

import { 
  createContext,
  ReactNode 
} from "react";

import * as AuthSession from 'expo-auth-session';
import AsyncStorage from "@react-native-async-storage/async-storage";

interface User {
  id: string;
  email: string;
  name: string;
  picture?: string;
}

interface AuthorizationResponse {
  params: {
    access_token: string;
  };
  type: string;
}

interface AuthProviderProps {
  children: ReactNode
}

interface IAuthContextData {
  signInWithGoogle: () => Promise<void>;
}

const AuthContext = createContext({} as IAuthContextData)

function AuthProvider({
  children
}: AuthProviderProps) {
  const [user, setUser] = useState<User>({} as User);

  const dataKey = '@savepass:user';

  async function signInWithGoogle() {

    try {
      const RESPONSE_TYPE = "token";
      const SCOPE = encodeURI('profile email');
  
      const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}`;

      const { type, params } = await AuthSession
        .startAsync({ authUrl }) as AuthorizationResponse;

      if (type === "success") {
        const response = await fetch(`https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${params.access_token}`);
        const userInfo = await response.json();

        const userLogged: User = userInfo;

        setUser(userLogged);
      }
      
    } catch (error) {
      console.log("ERRO AQUI OHHHHHHHHHHHHHHHHHHHHHHHH: "+ error);
    }

  }

  useEffect(() => {
    async function loadUserData() {
      const userStorage = await AsyncStorage.getItem(dataKey);

      if (userStorage) {
        const userLogged = JSON.parse(userStorage);
        setUser(userLogged);
      }
    }

    loadUserData();
  }, [])

  return (
    <AuthContext.Provider value={{ 
      signInWithGoogle
    }}>
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContext);

  return context;
}

export { AuthProvider, useAuth };