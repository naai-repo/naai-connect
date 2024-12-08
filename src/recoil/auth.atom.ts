import { atom, selector, selectorFamily} from 'recoil';

const defaultState = {
  loginform:{
    phoneNumber:"",
    name:"",
    gender:"",
    otp:"",
    step:0
  },
  openDialog:{
    val:false,
    header:false
  },
  hash:5
}

export const userAtom = atom({
  key: 'user',
  default: defaultState as User
});

// userid getter
export const userIdSelector = selector<string | undefined >({
  key: 'getUserId',
  get: ({ get }) => {
    const user = get(userAtom);
    return user.userDetails?.id ?? undefined;
  },
  set:({set},val)=>{
    set(userAtom,prev=>({
      ...prev,userDetails:{
        ...prev.userDetails,
        id:val as string
      }
    }))
  }
});

// user data selector
export const userDataSelector = selector<userDataType | undefined >({
  key: 'userDataSelector',
  get: ({ get }) => {
    const user = get(userAtom);
    return user.userData ?? undefined;
  },
  set:({set},val)=>{
    set(userAtom,prev=>({
      ...prev,
      userData:val as userDataType
    }))
  }
})

//otp response selector
export const otpResSelector = selector<loginOTPResType>({
  key: 'otpRes',
  get: ({ get }) => {
    const user = get(userAtom);
    return user.loginOTPRes ?? {} as loginOTPResType;
  },
  set:({set},val)=>{
    set(userAtom,(prev)=>({
      ...prev,
      loginOTPRes:val as loginOTPResType
    }))
  }
})


// logindialog
export const loginDialogSelector = selector<boolean>({
  key: 'loginDialog',
  get: ({ get }) => {
    const user = get(userAtom);
    return user.openDialog.val ?? false;
  },
  set:({set},val)=>{
    set(userAtom,prev=>({
      ...prev,
      loginform:defaultState.loginform as loginFormType,
      openDialog:{
        ...prev.openDialog,
        val:val as boolean
      }
    }))
  }
});

//login is from header
export const loginFromHeaderSelector = selector<boolean>({
  key: 'loginFromHeader',
  get: ({ get }) => {
    const user = get(userAtom);
    return user.openDialog.header ?? false;
  },
  set:({set},val)=>{
    set(userAtom,prev=>({
      ...prev,
      openDialog:{
        ...prev.openDialog,
        header:val as boolean
      }
    }))
  }
});

//mobine number input
export const phoneNumberSelector = selector<string>({
  key: 'mobilenumber',
  get: ({ get }) => {
    const user = get(userAtom);
    return user.loginform.phoneNumber ?? "";
  },
  set:({set},val)=>{
    set(userAtom,prev=>({
      ...prev,
      loginform:{...prev.loginform,phoneNumber:val as string}
    }))
  }
});

// userInputFieldSelector
export const userInputFieldSelector = selectorFamily<loginFormType[userLoginFieldSelector],userLoginFieldSelector>({
  key: 'userInputField',
  get: (field) => ({ get }) => {
    const user = get(userAtom);
    return user.loginform[field] ?? undefined;
  },
  set:(field)=>({set},val)=>{
    set(userAtom,prev=>({
      ...prev,
      loginform:{...prev.loginform,[field]:val as loginFormType[userLoginFieldSelector]}
    }))
  }
})

// otp
export const otpSelector = selector<string>({
  key: 'otp',
  get: ({ get }) => {
    const user = get(userAtom);
    return user.loginform.otp ?? "";
  },
  set:({set},val)=>{
    set(userAtom,prev=>({
      ...prev,
      loginform:{...prev.loginform,otp:val as string}
    }))
  }
})

export const loginStepSelector = selector<number>({
  key: 'loginStep',
  get: ({ get }) => {
    const user = get(userAtom);
    return user.loginform.step ?? 0;
  },
  set:({set},val)=>{
    set(userAtom,prev=>({
      ...prev,
      loginform:{...prev.loginform,step:val as number}
    }))
  }
})

// hash selector
export const hashSelector = selector<number>({
  key: 'hashSelector',
  get: ({ get }) => {
    const user = get(userAtom);
    return user.hash ?? 0;
  }
})
