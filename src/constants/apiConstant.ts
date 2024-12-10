
export default class API_CONSTANTS {
  static BASE_URL = process.env.API_BASE_URL || "http://localhost:8800";

  static getSalonDataById = this.BASE_URL+"/partner/salon/single/<SALON_ID>";
  static getCategories = this.BASE_URL+'/partner/service/category/all';
  static getTimeSlots = this.BASE_URL+"/appointments/schedule";
  static getUserOtp = this.BASE_URL+ "/customer/user/login";
  static verifyUserOtp = this.BASE_URL+ "/customer/otp/verify";
  static makeAppointment = this.BASE_URL + "/appointments/book";
  static confirmAppointment = this.BASE_URL + "/appointments/confirm";
  static getUserById = this.BASE_URL + "/customer/user/<USER_ID>"
  static updateUser = this.BASE_URL + "/customer/user/update";
  static getArtistById = this.BASE_URL + "/partner/artist/single/<ARTIST_ID>";
}