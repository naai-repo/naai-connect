import API_CONSTANTS from "@/constants/apiConstant";
import axios from "axios";

export default class Artist {
  static getArtistByid = (artistId:string)=>{
    return new Promise<ArtistResType>(async (resolve,reject)=>{
      try {
        let res = await axios.get(API_CONSTANTS.getArtistById.replace("<ARTIST_ID>",artistId));
        if (res?.data?.status == "failed") throw res.data.message;
        return resolve(JSON.parse(JSON.stringify(res.data)) as ArtistResType);
      } catch (error:any) {
        return reject(error);
      }
    })
  }
}

