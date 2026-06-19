import { create } from "zustand";

interface SignalState {
  show: boolean;

  text: string;

  showSignal: (
    text: string
  ) => void;

  hideSignal: () => void;
}

export const useSignalStore =
  create<SignalState>((set) => ({
    show: false,

    text: "",

    showSignal: (text) =>
      set({
        show: true,
        text,
      }),

    hideSignal: () =>
      set({
        show: false,
      }),
  }));