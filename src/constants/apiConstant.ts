
export default class API_CONSTANTS {
  static BASE_URL = process.env.API_BASE_URL || "https://dev.naai.in";

  static getSalonDataById = this.BASE_URL+"/partner/salon/single/<SALON_ID>";
  static getCategories = this.BASE_URL+'/partner/service/category/all';

}