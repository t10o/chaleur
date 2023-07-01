import { Session } from "@supabase/gotrue-js";
import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

export interface AuthState {
  session: Session;
}

export const authState = atom({
  key: "auth",
  default: {
    session: null,
  },
  effects_UNSTABLE: [persistAtom],
});
