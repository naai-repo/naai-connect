"use client"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useBookingService } from "@/hooks/booking.hooks"
import { cn, dehash, formatDateToDDMMYYYY, removeTimeZoneOffsetToDate } from "@/lib/utils"
import { availableSlotsSelector, bookingDateSelector, bookingOverlayLoadingSelector, bookingScheduleSelector, selectedArtistServiceSelector } from "@/recoil/booking.atom"
import { salonIdSelector } from "@/recoil/salon.atom"
import { addDays, format } from "date-fns"
import { CalendarIcon } from "lucide-react"
import { useEffect } from "react"
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil"

export function DatePicker() {
  const [selectedDate, setSelectedDate] = useRecoilState(bookingDateSelector);
  const salonId = useRecoilValue(salonIdSelector);
  const selectedServiceArtist = useRecoilValue(selectedArtistServiceSelector);
  const setBookingSlot = useSetRecoilState(availableSlotsSelector);
  const bookingService = useBookingService();
  const setScehdule = useSetRecoilState(bookingScheduleSelector);
  const setisOverLayLoading = useSetRecoilState(bookingOverlayLoadingSelector);
  
  const checkDate = (date:Date)=>{
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);
    return date < yesterday ;
  }

  useEffect(() => {
    const load = async () => {
      try{
        setisOverLayLoading(true);
        let requests: TimeSlotRequestType[] = selectedServiceArtist.map((serviceArtist) => {
          let variable = serviceArtist.service.variables
          let selectedVariable = variable.length>0?variable.find((v)=>v.selected):undefined;
          return {
            artist: serviceArtist.artist,
            service: serviceArtist.service.id,
            variable:selectedVariable
          }
        })
  
        let payload: TimeSlotPayload = {
          salonId: salonId,
          date: formatDateToDDMMYYYY(removeTimeZoneOffsetToDate(selectedDate)),
          requests: requests ?? []
        }

        const token = dehash(localStorage.getItem("accessToken") || "",5)
        let res = await bookingService.getTimeSlots(payload,token as string);
        setScehdule(res.data);
        setBookingSlot(res.data.timeSlotsVisible);
      }catch{
        setBookingSlot([[""]]);
      }finally{
        setisOverLayLoading(false);
      }
    }
    load();
  }, [selectedDate])

  return (
    <div className="flex w-full flex-col items-center border rounded-lg py-5 shadow-md">
      <h2 className="capitalize text-gray-500 justify-self-start">Select booking date</h2>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant={"outline"}
            className={cn(
              "w-[240px] justify-start text-left font-normal",
              !selectedDate && "text-muted-foreground"
            )}
          >
            <CalendarIcon />
            {selectedDate ? format(selectedDate, "PPP") : <span>Pick a date</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent
          align="start"
          className="flex w-auto flex-col space-y-2 p-2"
        >
          <Select
            onValueChange={(value) =>
              setSelectedDate(addDays(new Date(), parseInt(value)))
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent position="popper">
              <SelectItem value="0">Today</SelectItem>
              <SelectItem value="1">Tomorrow</SelectItem>
              <SelectItem value="3">In 3 days</SelectItem>
              <SelectItem value="7">In a week</SelectItem>
            </SelectContent>
          </Select>
          <div className="rounded-md border">
            <Calendar mode="single" selected={selectedDate} onSelect={(e) => setSelectedDate(e as Date)} disabled={(date) => checkDate(date)} />
          </div>
        </PopoverContent>
      </Popover>
    </div>
  )
}
