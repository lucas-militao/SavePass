import React from "react";
import { AuthProvider } from "./auth";
import { RegisterProvider } from "./register";

interface Props {
  children: React.ReactNode;
}

export function Hooks({
  children
}: Props) {

  return (
    <AuthProvider>
      <RegisterProvider>
        { children }
      </RegisterProvider>
    </AuthProvider>
  );
}