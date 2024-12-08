import {atom, selector} from 'recoil';
import React from 'react';


export const drawerAtom = atom({
  key: 'drawer',
  default: {
    confrimDialog:false
  } as DrawerAtomType
});

// confirm dialg selctor
export const confirmDialogSelector = selector<boolean>({
  key: 'confirmDialog',
  get: ({get}) => {
    const drawer = get(drawerAtom);
    return drawer.confrimDialog;
  },
  set: ({set}, newValue) => {
    set(drawerAtom, (prevDrawer) => ({
      ...prevDrawer,
      confrimDialog: newValue as boolean,
    }))
  }
})

// confirm text selector
export const confirmTextSelector = selector<string | undefined>({
  key: 'confirmText',
  get: ({get}) => {
    const drawer = get(drawerAtom);
    return drawer.confirmText ?? undefined;
  },
  set: ({set}, newValue) => {
    set(drawerAtom, (prevDrawer) => ({
      ...prevDrawer,
      confirmText: newValue as string | undefined,
    }))
  }
})

export const drawerSelector = selector({
  key:"drawerSelector",
  get: ({get}) => {
    const drawer = get(drawerAtom);
    return drawer;
  },
  set:({set},val)=>{
    set(drawerAtom,val);
  }
})