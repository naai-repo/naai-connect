import { Plus, Search } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Button } from '@/components/ui/button'
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'
import { categorySelector, filtersFalterFieldSelector, salonIdSelector, serviceSesrchSelector } from '@/recoil/salon.atom'
import { useSalonService } from '@/hooks/salon.hooks'
import { Input } from '@/components/ui/input'


export const SortFilter = () => {
  const [sortby,setSortby] = useRecoilState(filtersFalterFieldSelector("sortby"));

  return (
    <Accordion type="single" collapsible className='border-0 w-full'>
      <AccordionItem value="item-1">
        <AccordionTrigger className='uppercase p-5 text-lg'>Sort by </AccordionTrigger>
        <AccordionContent className='flex gap-2 px-5'>
          <Button onClick={()=>setSortby("asc")} variant={sortby=="asc"?"default":"outline"}>Price : Low to High</Button>
          <Button onClick={()=>setSortby("desc")} variant={sortby=="desc"?"default":"outline"}>Price : High to Low</Button>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}

export const CategoryFilter = () => {
  const salonService = useSalonService()
  const [categories,setCategories] = useRecoilState(categorySelector);
  const salonId = useRecoilValue(salonIdSelector);
  const [selectedCategory,setSelectedCatego] = useRecoilState(filtersFalterFieldSelector("categories"));

  useEffect(()=>{
    const load = async () => {
      const res = await salonService.getAllCategories(salonId);
      setCategories(res?.data?.data);
    }
    load();
  },[salonId])

  return (
    <Accordion type="single" collapsible className='border-0 w-full'>
      <AccordionItem value="item-1" className='px-5'>
        <AccordionTrigger className='uppercase py-5 text-lg '>categories </AccordionTrigger>
        <AccordionContent className='flex gap-2 overflow-auto'>
          {categories.map((category,id)=>(
            <Button onClick={()=>setSelectedCatego(category)} variant={selectedCategory==category?"default":"outline"} key={id}>{category}</Button>
          ))}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}

export const GenderFilter = () => {
  const [gender,setGender] = useRecoilState(filtersFalterFieldSelector("gender"));
  
  return (
    <Accordion type="single" collapsible className='border-0 w-full'>
      <AccordionItem value="item-1">
        <AccordionTrigger className='uppercase p-5 text-lg'>Gender</AccordionTrigger>
        <AccordionContent className='flex gap-2 px-5'>
          <Button onClick={()=>setGender("male")} variant={gender=="male"?"default":"outline"}>Male</Button>
          <Button onClick={()=>setGender("female")} variant={gender=="female"?"default":"outline"}>Female</Button>
          <Button onClick={()=>setGender(undefined)} variant={gender==undefined?"default":"outline"}>All</Button>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}

const Searchbar = () => {
  const setSearch = useSetRecoilState(serviceSesrchSelector);
  return (
    <div className='relative'>
      <Search size={18} className='absolute left-2 top-2 text-gray-500'/>
      <Input onChange={(e)=>setSearch(e.target.value as string)} placeholder='Search Service' className='ps-8'/>
    </div>
  )
}

export default Searchbar