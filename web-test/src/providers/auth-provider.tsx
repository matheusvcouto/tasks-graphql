import React from "react";
import Cookies from "js-cookie";
import { redirect } from "@tanstack/react-router";

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const token = Cookies.get('token')
  
  return (
    <>
    {children}
    </>
  )
}