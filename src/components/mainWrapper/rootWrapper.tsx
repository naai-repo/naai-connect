"use client"
import React,{ HTMLAttributes } from "react"
import MainHeader from "./mainHeader"

interface MainWrapperProps {
  children?: React.ReactNode;
  parentWrapper: React.HTMLAttributes<HTMLDivElement>;
  mainWrapper: React.HTMLAttributes<HTMLDivElement>;
}

const rootWrapper :React.FC<{children? : React.ReactNode}> = ({children}) => {
  return (
    <div className="flex h-full w-full flex-col bg-muted/40">
      {children}
    </div>
  )
}
export default rootWrapper;