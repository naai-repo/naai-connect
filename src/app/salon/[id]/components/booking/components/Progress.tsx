"use client"
import Services from '@/components/serviceComponents/Services'
import { progressSelector } from '@/recoil/booking.atom'
import React from 'react'
import { useRecoilValue } from 'recoil'

const Progress = () => {
  const progress = useRecoilValue(progressSelector);
  const steps = ["services", "artists", "time & date", "confirm"];

  return (
    <div className="flex items-center justify-center w-[99%] sm:w-[59%] md:w-[59%] 2xl:w-[39%] z-20">
      {steps.map((step, index) => {
        const isActive = index < progress;
        const isLastStep = index === steps.length - 1;
        return (
          <React.Fragment key={index}>
            <div className="flex flex-col items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold border-2 ${
                  isActive ? 'bg-gray-300 border-black text-black' : 'bg-white border-gray-300 text-gray-400'
                } ${index==0 || index==1 ? "mx-4":""}`}
              >
                {index + 1}
              </div>
              <span className="text-xs mt-1 text-center capitalize">{step}</span>
            </div>
            {!isLastStep && (
              <div
                className={`flex-grow h-0.5  ${
                  isActive ? 'bg-black' : 'bg-gray-300'
                }`}
              ></div>
            )}
            
          </React.Fragment>
        );
      })}
    </div>
  );
}

export default Progress;
