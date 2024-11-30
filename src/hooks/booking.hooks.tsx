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

  const makeAppointment = async (payload:MakeAppointmentPayload,token:string):Promise<MakeAppointmentController>=>{
    try {
      let res = await Booking.makeAppointment(payload,token);
      return successResponse<typeof res>({ data: res });
    } catch (error:any) {
      throw errorResponse({message: error.toString()});
    }
  }

  const confirmAppointment = async (payload:MakeAppointmentResType,token:string):Promise<ConfirmAppointmentController>=>{
    try {
      let res = await Booking.confirmAppointment(payload,token);
      return successResponse<typeof res>({ data: res });
    } catch (error:any) {
      throw errorResponse({message: error.toString()});
    }
  }
  
  return {getTimeSlots , makeAppointment, confirmAppointment}
}