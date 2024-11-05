import { atom} from 'recoil';

export const userAtom = atom<User>({
  key: 'user',
  default: {
    
  }
});