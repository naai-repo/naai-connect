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
import { useRouter } from "next/navigation"
import { salonIdSelector } from "@/recoil/salon.atom"
import ProfilePopOver from "./ProfilePopOver"

interface MainHeaderProps {
  name: string,
  externalHeaderElements?: React.ReactNode[]
}

const MainHeader: React.FC<MainHeaderProps> = ({ name, externalHeaderElements }) => {
  const salonId = localStorage.getItem("salonId");
  const router = useRouter();

  return (
    <header className="sticky top-0 z-30 px-4 flex h-14 items-center gap-4 border-b bg-[#fbfbfb] justify-between">
      <Card className="">
        <CardContent className="flex items-center px-2 py-2">
          <Image onClick={()=>router.push(`/salon/${salonId}`)} src={logo} alt="naai_logo" width={40}></Image>
        </CardContent>
      </Card>
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
      <ProfilePopOver/>
    </header>
  )
}

export default MainHeader