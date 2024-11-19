import Booking from "@/services/booking.service";
import { errorResponse, successResponse } from "@/services/responseWrapper";

export function useBookingService() {

  const getTimeSlots = async (payload:TimeSlotPayload,token:string):Promise<TimeSlotController>=>{
    try {
      let res = await Booking.getTimeSlots(payload,token);
      return successResponse<typeof res>({ data: res });
    } catch (error: any) {
      throw errorResponse({message: error.toString()});
    }
  }
  return {getTimeSlots}
}