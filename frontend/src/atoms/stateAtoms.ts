import { atom } from "recoil";
import { AuthModalState } from "../types.const";

export const authModalState = atom<AuthModalState>({
  key: "authModalState",
  default: { isOpen: false, type: "login", isLogin: false },
});

export const bulletSwitchState = atom<boolean>({
  key: "bulletSwitchState",
  default: true,
});

export const loadingState = atom<boolean>({
  key: "loadingState",
  default: true,
});
