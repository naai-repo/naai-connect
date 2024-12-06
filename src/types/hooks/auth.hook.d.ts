

declare type authOTPController = responseWrapperType & {
  data?:loginOTPResType
}

declare type authVerifyController = responseWrapperType & {
  data?:verifyUserRes
}

declare type UserDataUpdateController = responseWrapperType & {
  data?:userUpdateResType
}

declare type UserDataResController = responseWrapperType & {
  data?:UserDataresType
}