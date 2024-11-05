import API_CONSTANTS from "@/constants/apiConstant";
import axios from "axios";
import { SingleSalonResponseType } from "./types";



export default class Salons {
  static getSalonDataById = (salonId : string) => {
    return new Promise<SingleSalonResponseType>(async (resolve, reject) => {
      try {
        let res = await axios.get(API_CONSTANTS.getSalonDataById.replace("<SALON_ID>",salonId));
        if(res?.data?.status == "failed") throw res.data.message;
        return resolve(((JSON.parse(JSON.stringify(res.data).replaceAll("_id","id"))) as SingleSalonResponseType));
      } catch (error: any) {
        return reject(error);
      }
    });
  };
}