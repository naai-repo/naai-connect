"use client"
import Cart from "@/components/demoCart/cart";
import MainWrapper from "@/components/mainWrapper/mainWrapper";
import { useSalonService } from "@/hooks/salon.hooks";
import { useToast } from "@/hooks/use-toast";
import { userIdSelector } from "@/recoil/auth.atom";
import { progressSelector } from "@/recoil/booking.atom";
import { getCartServicesSelector, salonIdSelector, salonLoading, serviceSelector, singleSalonDataSelector } from "@/recoil/salon.atom";
import { useParams } from "next/navigation";
import { useEffect } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import Hero from "./components/Hero";

const DynamicPage = () => {
  const params = useParams();
  const id = params?.id as string | null;
  const salonService = useSalonService();
  const [salonData,setSalonData] = useRecoilState(singleSalonDataSelector);
  const [loading,setLoading] = useRecoilState(salonLoading);
  const setSalonId = useSetRecoilState(salonIdSelector);
  const setServices = useSetRecoilState(serviceSelector);
  const cartServices = useRecoilValue(getCartServicesSelector);
  const setProgress = useSetRecoilState(progressSelector);
  const setuserId = useSetRecoilState(userIdSelector);
  const {toast} = useToast();

  if (!id) {
    return <div>Loading...</div>;
  }

  useEffect(()=>{
    setLoading(true);
    setSalonId(id);
    let userId = localStorage.getItem("userId");
    setuserId(userId ?? undefined)
    const load = async ()=>{
      try {
        const res = await salonService.getSalonDataById(id);
        setSalonData(res?.data?.data);
        setServices(res.data?.data?.services);
        toast({
          description:  "Artist is not Available please Select Different Artist",
        })
      } catch (error) {
      } finally{
        setLoading(false);
      }
    }
    load();
  },[id])

  useEffect(()=>{
    setProgress(0);
  },[cartServices])

  return (
    <MainWrapper name="Salon" parentWrapper={{
      className : "flex flex-col sm:px-4 sm:py-4  h-full"
    }} mainWrapper={{
      className : "grid flex-1 items-start gap-4 p-2 pt-0 sm:px-6 sm:py-0 md:gap-4 h-full w-full"
    }}>
      <div className="flex flex-col w-full items-start gap-4 md:gap-4 h-full z-10">
        <div className="w-[94%] right-[3%] fixed bottom-5">
          <Cart/>
        </div>
        <Hero/>
      </div>
    </MainWrapper>
  );
};

export default DynamicPage;

