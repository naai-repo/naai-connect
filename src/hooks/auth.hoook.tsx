import Auth from "@/services/auth.service";
import { errorResponse, successResponse } from "@/services/responseWrapper";

export function useAuthServices() {
  const getOTP = async(payload:loginOtpPayload):Promise<authOTPController> =>{
    try {
      let res = await Auth.getOptp(payload);
      return successResponse<typeof res>({ data: res });
    } catch (error:any) {
      throw errorResponse({message: error.toString()});
    }
  }
  const verifyOTP = async(payload:verifyUserPayload):Promise<authVerifyController> =>{
    try {
      let res = await Auth.verifyOTP(payload);
      return successResponse<typeof res>({ data: res });
    } catch (error:any) {
      throw errorResponse({message: error.toString()});
    }
  }
  const updateUserData = async (payload:userDataPayloadType):Promise<UserDataUpdateController> =>{
    try {
      let res = await Auth.updateUserData(payload);
      return successResponse<typeof res>({ data: res });
    } catch (error:any) {
      throw errorResponse({message: error.toString()});
    }
  }
  const getUserData = async (userId:string):Promise<UserDataResController> =>{
    try {
      let res = await Auth.getUserData(userId);
      return successResponse<typeof res>({ data: res });
    } catch (error:any) {
      throw errorResponse({message: error.toString()});
    }
  }
  return {getOTP,verifyOTP,updateUserData,getUserData}
}