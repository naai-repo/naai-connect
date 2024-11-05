"use client";

import * as React from "react";
import { Calendar } from "@/components/ui/calendar";
import { useParams } from "next/navigation";

const DynamicPage = () => {
  
  const params = useParams();
  const id = params?.id as string | null;

  const [date, setDate] = React.useState<Date | undefined>(new Date());

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
