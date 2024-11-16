import API_CONSTANTS from "@/constants/apiConstant";
import axios from "axios";

export default class Auth {
  static getOptp = (payload: loginOtpPayload) => {
    return new Promise<loginResType>(async (resolve, reject) => {
      try {
        const res = await axios.post(API_CONSTANTS.getUserOtp,payload);
        if (res?.data?.status == "failed") throw res.data.message;
        return resolve(JSON.parse(JSON.stringify(res.data)) as loginResType);
      } catch (error: any) {
        return reject(error);
      }
    });
  };
}
