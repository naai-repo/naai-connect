import React, { useState } from 'react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from '../ui/button';
import { LogInIcon, LogOutIcon, User } from 'lucide-react';
import { loginDialogSelector, loginFromHeaderSelector } from '@/recoil/auth.atom';
import { useSetRecoilState } from 'recoil';


const ProfilePopOver = () => {
  const [data, setData] = useState({ open: false });
  const setOpenLoginDialog = useSetRecoilState(loginDialogSelector);
  const setIsFromHeader = useSetRecoilState(loginFromHeaderSelector);

  const token = localStorage.getItem("accessToken");

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    setIsFromHeader(false);
  }

  return (
    <div className='flex gap-5'>
      <DropdownMenu open={data?.open} modal={true}>
        <DropdownMenuTrigger asChild>
          <Button
            onClick={() => {
              setData({ ...data, open: true })
            }}
            variant="outline"
            size="icon"
            className="overflow-hidden rounded-full"
          >
            <User size={20} />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" onInteractOutside={(e) => {
          setData({ ...data, open: false });
        }}>
          <DropdownMenuItem className='cursor-pointer'>
            {token ? <div onClick={(e) => handleLogout()} className='flex gap-2 items-center'><LogOutIcon size={18} />
              <span className='cursor-pointer'>Logout</span></div> :
              <div onClick={() => {
                setIsFromHeader(true);
                setOpenLoginDialog(true)
                }} className='flex gap-2 items-center'><LogInIcon size={20} />
                <span className='cursor-pointer'>Login</span></div>}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}

export default ProfilePopOver