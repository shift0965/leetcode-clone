import { atom } from "recoil";

export const profileModalState = atom<boolean>({
  key: "profileModalState",
  default: false,
});

export const bulletSwitchState = atom<boolean>({
  key: "bulletSwitchState",
  default: true,
});

export const loadingState = atom<boolean>({
  key: "loadingState",
  default: true,
});
