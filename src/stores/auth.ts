import { Session, User } from "@supabase/gotrue-js";
import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

export interface AuthState {
  user: User;
  session: Session;
}

export const authState = atom({
  key: "auth",
  default: {
    user: null,
    session: null,
  },
  effects_UNSTABLE: [persistAtom],
});
