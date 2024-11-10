import {atom, selector} from 'recoil';
import React from 'react';


export const drawerAtom = atom({
  key: 'drawer',
  default: {
  
  } as DrawerAtomType
});


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