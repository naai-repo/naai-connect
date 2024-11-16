import { atom, selector} from 'recoil';

export const userAtom = atom({
  key: 'user',
  default: {
    loginform:{
      phoneNumber:"",
      otp:"",
      step:0
    },
    openDialog:false,
  } as User
});
// userid getter
export const getUserIdSelector = selector<string | undefined>({
  key: 'getUserId',
  get: ({ get }) => {
    const user = get(userAtom);
    return user.userDetails?.data._id ?? undefined;
  },
})

// logindialog
export const loginDialogSelector = selector<boolean>({
  key: 'loginDialog',
  get: ({ get }) => {
    const user = get(userAtom);
    return user.openDialog ?? false;
  },
  set:({set},val)=>{
    set(userAtom,prev=>({
      ...prev,
      openDialog:val as boolean
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