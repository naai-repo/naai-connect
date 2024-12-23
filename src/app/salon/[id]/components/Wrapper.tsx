import Services from '@/components/serviceComponents/Services'
import { Button } from '@/components/ui/button'
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { categorySelector, filtersFieldSelector } from '@/recoil/salon.atom'
import Image from 'next/image'
import { useRecoilState, useRecoilValue } from 'recoil'
import MenIcon from "../../../../assets/images/men_icon.png"
import WomenIcon from "../../../../assets/images/women_icon.png"
import UnisexIcon from "../../../../assets/images/unisex.png"
import AllArtistCarousel from './Artists/carouselWrapper'
import Searchbar from '@/components/serviceComponents/Filter/FilterCategories'

const Wrapper = () => {
  return (
    <div className='w-full bg-[#fbfbfb]'>
      <Tabs defaultValue="services" className="w-full">
        <TabsList className='w-full border-b-2 border-black rounded-none bg-[#fbfbfb] sticky top-[15rem] sm:top-[13.8rem] z-20 flex justify-start py-7'>
          <TabsTrigger className='text-base border-0 bg-transparent' value="services">Services</TabsTrigger>
          <TabsTrigger className='text-base border-0 bg-transparent' value="artists">Artists</TabsTrigger>
          <TabsTrigger className='text-base border-0 bg-transparent' value="reviews">Reviews</TabsTrigger>
        </TabsList>
        <TabsContent className='w-full' value="services">
          <div className='sticky top-[18.6rem] sm:top-[17.4rem] bg-[#fbfbfb] w-full pt-2'>
            <ServicesContent />
          </div>
          <Services from='hero' />
        </TabsContent>
        <TabsContent value="artists">
          <AllArtistCarousel />
        </TabsContent>
        <TabsContent value="reviews">Reviews</TabsContent>
      </Tabs>
    </div>
  )
}

export default Wrapper;

const ServicesContent = () => {
  const categories = useRecoilValue(categorySelector);
  const [selectedCategory,setSelectedCatego] = useRecoilState(filtersFieldSelector("categories"));
  const [selectedGender,setSelctedGender] = useRecoilState(filtersFieldSelector("gender"));

  const handleGenderFilter = (val:string)=>{
    if(selectedGender==val){
      setSelctedGender(undefined);
    }else {
      setSelctedGender(val);
    }
  }

  const handleCategorySelect = (val:string)=>{
    if(selectedCategory==val){
      setSelectedCatego(undefined);
    }else{
      setSelectedCatego(val);
    }
  }

  return (
    <>
      <div className='flex justify-between gap-2 flex-col-reverse sm:flex-row'>
        <div className='flex gap-2'>
          <Button onClick={()=>{handleGenderFilter("male")}}  variant={selectedGender=="male"?"secondary":"outline"} size={"icon"} className='w-fit px-2'>
            Men <Image className="h-6 w-6" src={MenIcon} alt="women" />
          </Button>
          <Button onClick={()=>{handleGenderFilter("female")}} variant={selectedGender=="female"?"secondary":"outline"} size={"icon"} className='w-fit px-2'>
            Women <Image className="h-6 w-6" src={WomenIcon} alt="women" />
          </Button>
          <Button onClick={()=>{handleGenderFilter("unisex")}} variant={selectedGender=="unisex"?"secondary":"outline"} size={"icon"} className='w-fit px-2'>
            Unisex <Image className="h-6 w-6" src={UnisexIcon} alt="unisex" />
          </Button>
        </div>
        <Searchbar />
      </div>
      <div className=''>
        <div className='flex justify-between gap-2 pt-2'>
          Categories : 
        </div>
          <ScrollArea className="p-2 whitespace-nowrap w-96 md:w-auto scrollbar-hide ">
            {categories.map((category,id)=>(
              <Button onClick={()=>handleCategorySelect(category)} key={id} variant={category==selectedCategory?"default":"outline"} className='capitalize rounded-2xl mx-1'>{category}</Button>
            ))}
            <ScrollBar orientation='horizontal' />
          </ScrollArea>
      </div>
    </>
  )
}