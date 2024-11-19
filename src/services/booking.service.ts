import API_CONSTANTS from "@/constants/apiConstant";
import axios from "axios";

export default class Booking {
  static getTimeSlots = (payload: TimeSlotPayload,authToken:string) => {
    return new Promise<TimeSlotResType>(async (resolve, reject) => {
      try {
        let res = await axios.post(API_CONSTANTS.getTimeSlots, payload,
          {
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          }
        );
        if (res?.data?.status == "failed") throw res.data.message;
        return resolve(JSON.parse( JSON.stringify(res.data).replaceAll("_id", "id")) as TimeSlotResType);
      } catch (error: any) {
        return reject(error);
      }
    });
  };

}
