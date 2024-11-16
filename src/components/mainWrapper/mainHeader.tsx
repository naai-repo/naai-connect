"use client"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { drawerSelector } from "@/recoil/drawer.atom"
import {
  MenuIcon,
  Search
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import React, { Fragment } from 'react'
import { useRecoilValue } from "recoil"
import logo from '../../../public/logos/logo.svg'

interface MainHeaderProps {
  name: string,
  externalHeaderElements?: React.ReactNode[]
}

const MainHeader: React.FC<MainHeaderProps> = ({ name, externalHeaderElements }) => {

  const drawerData = useRecoilValue(drawerSelector);

  return (
    <header className="sticky top-0 z-30 py-4 sm:py-0 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
      <Card className="hidden sm:block">
        <CardContent className="flex items-center px-2 py-2">
          <Image src={logo} alt="naai_logo" width={40} ></Image>
        </CardContent>
      </Card>
      <Card className="sm:hidden">
        <CardContent className="flex items-center px-2 py-2">
          <Image src={logo} alt="naai_logo" width={40}></Image>
        </CardContent>
      </Card>

      <div className="hidden sm:relative ml-auto flex-1 md:grow-0">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search..."
          className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[320px]"
        />
      </div>

      <div className='ml-auto'></div>
      <div className='flex flex-row gap-4'>
        {
          externalHeaderElements?.map((item, idx) => {
            return (
              <Fragment key={idx}>
                {item}
              </Fragment>
            )
          })
        }

      </div>
    </header>
  )
}

export default MainHeader