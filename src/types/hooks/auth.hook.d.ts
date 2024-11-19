

declare type authOTPController = responseWrapperType & {
  data?:loginOTPResType
}

declare type authVerifyController = responseWrapperType & {
  data?:verifyUserRes
}