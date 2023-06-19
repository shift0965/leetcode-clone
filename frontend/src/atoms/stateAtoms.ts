import { atom } from "recoil";
import { AuthModalState } from "../types.const";

export const authModalState = atom<AuthModalState>({
  key: "authModalState",
  default: { isOpen: false, type: "login" },
});
