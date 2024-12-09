import API_CONSTANTS from "@/constants/apiConstant";
import axios from "axios";

export default class Booking {
  static getTimeSlots = (payload: TimeSlotPayload,authToken:string) => {
    return new Promise<TimeSlotResType>(async (resolve, reject) => {
      try {
        let res = await axios.post(API_CONSTANTS.getTimeSlots, payload,{
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          });
        if (res?.data?.status == "failed") throw res.data.message;
        return resolve(JSON.parse(JSON.stringify(res.data)) as TimeSlotResType);
      } catch (error: any) {
        return reject(error);
      }
    });
  };

  static makeAppointment = (payload:MakeAppointmentPayload,authToken:string)=>{
    return new Promise<MakeAppointmentResType>(async (resolve, reject) => {
      try {
        let res = await axios.post(API_CONSTANTS.makeAppointment, payload,{
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          });
        if (res?.data?.status == "failed") throw res.data.message;
        return resolve(JSON.parse( JSON.stringify(res.data)) as MakeAppointmentResType)
      } catch (error:any) {
        return reject(error);
      }
    })
  }

  static confirmAppointment = (payload:MakeAppointmentResType,authToken:string)=>{
    return new Promise<ConfirmAppointmentResType>(async (resolve, reject) => {
      try {
        let res = await axios.post(API_CONSTANTS.confirmAppointment,payload,{
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          });
        if (res?.data?.status == "failed") throw res.data.message;
        return resolve(JSON.parse( JSON.stringify(res.data)) as ConfirmAppointmentResType);
      } catch (error:any) {
        return reject(error);
      }
    })
  }
}
