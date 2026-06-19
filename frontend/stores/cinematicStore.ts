"use client";

import { create } from "zustand";

interface CinematicState {
  cinematic: boolean;

  setCinematic: (
    value: boolean
  ) => void;
}

export const useCinematicStore =
  create<CinematicState>((set) => ({
    cinematic: true,

    setCinematic: (
      value
    ) =>
      set({
        cinematic: value,
      }),
  }));