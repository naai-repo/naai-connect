import { errorResponse, successResponse } from "@/services/responseWrapper";
import Salons from "@/services/salon.service";

export function useSalonService() {
  const getSalonDataById = async (salonId:string): Promise<SingleSalonResponseControllerType> => {
    try {
      let res = await Salons.getSalonDataById(salonId);
      return successResponse<typeof res>({ data: res });
    } catch (error: any) {
      throw errorResponse({message: error.toString()});
    }
  };
  return {getSalonDataById}
}
