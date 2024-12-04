"use client"
import React,{ HTMLAttributes } from "react"
import MainHeader from "./mainHeader"

interface MainWrapperProps {
  children?: React.ReactNode;
  parentWrapper: React.HTMLAttributes<HTMLDivElement>;
  mainWrapper: React.HTMLAttributes<HTMLDivElement>;
  externalHeaderElements?:React.ReactNode[]
  name:string
}

const MainWrapper :React.FC<MainWrapperProps> = ({children,parentWrapper,mainWrapper,name,externalHeaderElements}) => {
  return (
    <>
      <div className="flex h-full w-full flex-col bg-muted/40">
        <div {...parentWrapper}>
          <MainHeader name={name} externalHeaderElements={externalHeaderElements}></MainHeader>
          <main {...mainWrapper}>
            {children}
          </main>
        </div>
      </div>
    </>
  )
}
export default MainWrapper;