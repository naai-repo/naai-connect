import React, { forwardRef, useImperativeHandle, useState } from 'react'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Button } from '../../../../../components/ui/button';
import { Plus, X } from 'lucide-react';
import { CategoryFilter, GenderFilter, SortFilter } from './FilterCategories';
import { useRecoilState } from 'recoil';
import { ApplyFilterSelector, resetFilterSelector } from '@/recoil/salon.atom';


const Filter = forwardRef<ServiceFilterRefType>(({ }, ref) => {
  const [data, setData] = useState({ open: false });
  const [clearFilter,setClearFilter] = useRecoilState(resetFilterSelector);
  const [applyFilter,setApplyFilter] = useRecoilState(ApplyFilterSelector)

  const openSheet = () => {
    setData({ open: true });
  }
  const closeSheet = () => {
    setData({ open: false });
  }

  useImperativeHandle(ref, () => {
    return { openSheet, closeSheet };
  });

  return (
    <Sheet key={"bottom"} open={data.open} onOpenChange={(e) => {
      if (data.open != e) setData({ ...data, open: e });
    }}>
      <SheetContent side={"bottom"} className="p-0">
        <SheetHeader className='flex flex-col'>
          <SortFilter/>
          <CategoryFilter/>
          <GenderFilter/>
          <div className='flex justify-between p-5 px-10'>
            <Button className='px-14 py-5 text-lg font-semibold' variant={"outline"} onClick={()=>setClearFilter()}>Clear</Button>
            <Button className='px-14 py-5 text-lg font-semibold' onClick={()=>{
              setApplyFilter();
              closeSheet();
            }}>Apply</Button>
          </div>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  )
})

export default Filter