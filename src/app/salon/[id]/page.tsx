"use client"
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useRecoilState, useSetRecoilState } from "recoil";
import { salonIdSelector, salonLoading, serviceSelector, singleSalonDataSelector } from "@/recoil/salon.atom";
import { useSalonService } from "@/hooks/salon.hooks";
import MainWrapper from "@/components/mainWrapper/mainWrapper";
import Services from "./comonents/Services";
import Hero from "./comonents/hero";

const DynamicPage = () => {
  const params = useParams();
  const id = params?.id as string | null;
  const salonService = useSalonService();
  const [salonData,setSalonData] = useRecoilState(singleSalonDataSelector);
  const [loading,setLoading] = useRecoilState(salonLoading);
  const setSalonId = useSetRecoilState(salonIdSelector);
  const setServices = useSetRecoilState(serviceSelector);

  if (!id) {
    return <div>Loading...</div>;
  }

  useEffect(()=>{
    setLoading(true);
    setSalonId(id);
    const load = async ()=>{
      try {
        const res = await salonService.getSalonDataById(id);
        setSalonData(res?.data?.data);
        setServices(res.data?.data?.services);
      } catch (error) {
        // naaitoast
      } finally{
        setLoading(false);
      }
    }
    load();
  },[id])

  return (
    <MainWrapper name="Salon" parentWrapper={{
      className : "flex flex-col sm:gap-4 sm:py-4 sm:pl-14 h-full"
    }} mainWrapper={{
      className : "grid flex-1 items-start gap-4 p-2 sm:px-6 sm:py-0 md:gap-8 h-full w-full"
    }}>
      <div className="flex flex-col w-full items-start gap-4 md:gap-4 h-full z-10">
        <Hero/>
      </div>
    </MainWrapper>
  );
};

export default DynamicPage;

