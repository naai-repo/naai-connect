import React, { forwardRef, useImperativeHandle, useState } from 'react'
import MenIcon from "@/assets/images/men_icon.png";
import WomenIcon from "@/assets/images/women_icon.png";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

import { useRecoilValue, useSetRecoilState } from 'recoil';
import { selectedServiceSelector, serviceAddToCartSelector, stepOneCartSelector } from '@/recoil/salon.atom';
import Image from 'next/image';
import { Plus, Variable } from 'lucide-react';
import { currencyConverter } from '@/lib/utils';
import { Button } from '../ui/button';


const ServiceCategory = forwardRef<ServiceCategoryRefType>(({ }, ref) => {
  const [data, setData] = useState({ open: false });
  const selectedService = useRecoilValue(selectedServiceSelector);
  const setServiceAddToCart = useSetRecoilState(serviceAddToCartSelector);
  const [selectedVariableService, setSelectedVariableService] = useState(selectedService);
  const setStepOneCart = useSetRecoilState(stepOneCartSelector);

  const openSheet = () => {
    setData({ open: true });
  }

  const closeSheet = () => {
    setSelectedVariableService({} as SingleSalonServiceDataType);
    setData({ open: false });
  }

  useImperativeHandle(ref, () => {
    return { openSheet, closeSheet };
  });

  const handlevariableChange = (id: string) => {
    let service = {
      ...selectedService,
      variables: selectedService.variables.map(variable => {
        if (variable.id === id) {
          return { ...variable, selected: true }
        }
        return { ...variable, selected: false }
      })
    };
    setSelectedVariableService(service);
  };

  const addToCart = () => {
    setStepOneCart(prev => ({
      ...prev,
      basePrice: prev.basePrice + (selectedVariableService.variables.find(variable => variable.selected)?.variablePrice || 0),
      cutPrice: prev.cutPrice + (selectedVariableService.variables.find(variable => variable.selected)?.variableCutPrice || 0)
    }))
    setServiceAddToCart({ ...selectedVariableService, incart: true });
  }

  return (
    <Sheet key={"bottom"} open={data.open} onOpenChange={(e) => {
      if (!e) closeSheet();
    }}>
      <SheetContent side={"bottom"} className='rounded-t-xl p-4 pt-3'>
        <SheetHeader>
          <SheetTitle className='flex justify-between capitalize pb-5'>{selectedService.serviceTitle}
            {selectedService.targetGender == "male" ? <Image className="h-8" src={MenIcon} alt="men" /> :
              <Image className="h-8" src={WomenIcon} alt="women" />}
          </SheetTitle>
          <div className='text-base capitalize border shadow-lg rounded-lg text-start p-5 pt-2'>
            <span className='font-semibold text-gray-600'>{selectedService.variables && selectedService?.variables[0]?.variableType}</span>
            <div className='pt-3 flex flex-col gap-2'>
              <RadioGroup onValueChange={(val) => handlevariableChange(val)}>
                {selectedService?.variables?.map(variable => (
                  <div key={variable.id} className="flex items-center  justify-between space-x-2">
                    <Label htmlFor={variable.id}>{variable.variableName}</Label>
                    <div className='flex gap-4 items-center'>
                      + <div>
                        {variable.variableCutPrice != variable.variablePrice}<span className='line-through text-gray-600'>{currencyConverter(variable.variableCutPrice)}</span>
                        <span className='pl-2'>{currencyConverter(variable.variablePrice)}</span>
                      </div>
                      <RadioGroupItem value={variable.id} id={variable.id} />
                    </div>
                  </div>
                ))}
              </RadioGroup>
            </div>
          </div>
          <div className='flex justify-end pt-20 pb-5'>
            <Button disabled={selectedVariableService.serviceTitle != selectedService.serviceTitle} onClick={() => {
              addToCart();
              setData({ ...data, open: false });
            }}><Plus /> Add</Button>
          </div>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  )
})

export default ServiceCategory