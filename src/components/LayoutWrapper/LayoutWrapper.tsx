"use client";
import { usePathname } from "next/navigation";
import React, { ReactNode } from "react";
import Navbar from "../navbar/Navbar";

interface LayoutWrapperProps {
  children: ReactNode;
}

const LayoutWrapper = ({ children }: LayoutWrapperProps) => {
  const pathname = usePathname();
  return (
    <>
      {pathname !== "/login" && pathname !== "/register" && (
        <>
          <Navbar />
        </>
      )}
      <div>{children}</div>
    </>
  );
};

export default LayoutWrapper;
