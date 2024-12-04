
import Artist from "@/services/artist.service";
import { errorResponse, successResponse } from "@/services/responseWrapper";
import axios from "axios";

export function useArtistService() {
  const getArtistById = async (artistId:string):Promise<ArtistResController>=>{
    try {
      let res = await Artist.getArtistByid(artistId);
      return successResponse<typeof res>({ data: res });
    } catch (error:any) {
      throw errorResponse(error);
    }
  }

  return { getArtistById };
}
