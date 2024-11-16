"use client"
import { progressSelector } from '@/recoil/booking.atom'
import React from 'react'
import { useRecoilState } from 'recoil'

const Progress = () => {
  const [progress,setProgress] = useRecoilState(progressSelector);
  const steps = ["artists", "time & date", "confirm"];

  return (
    <div className="flex items-center justify-center w-[95%] z-20 fixed top-15 left-2" >
      {steps.map((step, index) => {
        const isActive = index < progress;
        const isLastStep = index === steps.length - 1;
        return (
          <React.Fragment key={index}>
            <div className="flex flex-col items-center" onClick={()=>{
              console.log(progress,index);
              if(progress>index+1){
                setProgress(index+1);
              }
            }}>
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
