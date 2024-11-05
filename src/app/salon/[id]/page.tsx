"use client";

import React, { useEffect, useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { useParams } from "next/navigation";
import { useSalonService } from "@/hooks/salonHooks";
import { useRecoilState } from "recoil";
import { salonLoading, singleSalonDataSelector } from "@/recoil/salon/atom";

const DynamicPage = () => {
  const params = useParams();
  const id = params?.id as string | null;
  const salonService = useSalonService();
  const [salonData,setSalonData] = useRecoilState(singleSalonDataSelector);
  const [loading,setLoading] = useRecoilState(salonLoading);
  const [date, setDate] = useState<Date | undefined>(new Date());

  if (!id) {
    return <div>Loading...</div>;
  }

  useEffect(()=>{
    setLoading(true);
    const load = async ()=>{
      try {
        const res = await salonService.getSalonDataById(id);
        setSalonData(res?.data?.data);
      } catch (error) {
        // naaitoast
      } finally{
        setLoading(false);
      }
    }
    load();
  },[id])

  return (
    <div className="flex flex-col items-center">
      <p>User ID: {id}</p>
      <br />
      <div className="w-full max-w-md">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          className="rounded-md border shadow w-full"
        />
      </div>
    </div>
  );
};

export default DynamicPage;
