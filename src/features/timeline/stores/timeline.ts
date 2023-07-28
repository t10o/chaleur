import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

export interface TimelineState {
  timelineDetail: any;
}

export const timelineState = atom({
  key: "timeline",
  default: {
    timelineDetail: null,
  },
  effects_UNSTABLE: [persistAtom],
});
