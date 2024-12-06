import API_CONSTANTS from "@/constants/apiConstant";
import axios from "axios";

export default class Auth {
  static getOptp = (payload: loginOtpPayload) => {
    return new Promise<loginOTPResType>(async (resolve, reject) => {
      try {
        const res = await axios.post(API_CONSTANTS.getUserOtp,payload);
        if (res?.data?.status == "failed") throw res.data.message;
        return resolve(JSON.parse(JSON.stringify(res.data)) as loginOTPResType);
      } catch (error: any) {
        return reject(error);
      }
    });
  };

  static verifyOTP = (payload:verifyUserPayload)=>{
    return new Promise<verifyUserRes> (async (resolve,reject)=>{
      try {
        const res = await axios.post(API_CONSTANTS.verifyUserOtp,payload);
        if (res?.data?.status == "failed") throw res.data.message;
        return resolve(JSON.parse(JSON.stringify(res.data).replaceAll("_id","id")) as verifyUserRes);
      } catch (error:any) {
        return reject(error);
      }
    })
  }

  static updateUserData = (payload:userDataPayloadType)=>{
    return new Promise<userUpdateResType> (async (resolve,reject)=>{
      try {
        let res = await axios.post(API_CONSTANTS.updateUser,payload);
        if (res?.data?.status == "failed") throw res.data.message;
        return resolve(JSON.parse(JSON.stringify(res.data)) as userUpdateResType)
      } catch (error:any) {
        return reject(error);
      }
    })
  }
  static getUserData = (userId:string)=>{
    return new Promise<UserDataresType> (async (resolve,reject)=>{
      try {
        let res = await axios.get(API_CONSTANTS.getUserById.replace("<USER_ID>",userId));
        if (res?.data?.status == "failed") throw res.data.message;
        return resolve(JSON.parse(JSON.stringify(res.data)) as UserDataresType)
      } catch (error:any) {
        return reject(error);
      }
    })
  }
  
}
