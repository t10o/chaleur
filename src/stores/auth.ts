import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

export interface AuthState {
  id: number;
  nickname: string;
  like: string;
}

export const authState = atom({
  key: "auth",
  default: {
    id: 0,
    nickname: "",
    like: "",
  },
  effects_UNSTABLE: [persistAtom],
});
