import { create } from "zustand";
import { Beacon } from "@/types/beacon";

interface BeaconStore {
  beacons: Beacon[];

  selectedBeacon: Beacon | null;

  focusedBeacon: Beacon | null;

  trendingBeacons: Beacon[];

  setSelectedBeacon: (
    beacon: Beacon | null
  ) => void;

  setFocusedBeacon: (
    beacon: Beacon | null
  ) => void;

  setBeacons: (
    beacons: Beacon[]
  ) => void;

  addBeacon: (
    beacon: Beacon
  ) => void;

  addAnswer: (
    beaconId: string,
    answer: {
      id: string;
      author: string;
      text: string;
    }
  ) => void;

  refreshTrending: () => void;
}

export const useBeaconStore =
  create<BeaconStore>((set, get) => ({
    beacons: [],

    selectedBeacon: null,

    focusedBeacon: null,

    trendingBeacons: [],

    setSelectedBeacon: (
      beacon
    ) =>
      set({
        selectedBeacon: beacon,
      }),

    setFocusedBeacon: (
      beacon
    ) =>
      set({
        focusedBeacon: beacon,
      }),

    setBeacons: (
      beacons
    ) => {
      const trending =
        [...beacons]
          .sort(
            (a, b) =>
              b.answers.length -
              a.answers.length
          )
          .slice(0, 5);

      set({
        beacons,
        trendingBeacons:
          trending,
      });
    },

    addBeacon: (
      beacon
    ) =>
      set((state) => {
        const exists =
          state.beacons.some(
            (b) =>
              b.id === beacon.id
          );

        if (exists) {
          return state;
        }

        const updated =
          [
            ...state.beacons,
            beacon,
          ];

        return {
          beacons: updated,

          trendingBeacons:
            [...updated]
              .sort(
                (a, b) =>
                  b.answers.length -
                  a.answers.length
              )
              .slice(0, 5),
        };
      }),

    addAnswer: (
      beaconId,
      answer
    ) =>
      set((state) => {
        const updatedBeacons =
          state.beacons.map(
            (beacon) =>
              beacon.id ===
              beaconId
                ? {
                    ...beacon,
                    answers: [
                      ...beacon.answers,
                      answer,
                    ],
                  }
                : beacon
          );

        let updatedSelected =
          state.selectedBeacon;

        if (
          state.selectedBeacon &&
          state.selectedBeacon.id ===
            beaconId
        ) {
          updatedSelected = {
            ...state.selectedBeacon,

            answers: [
              ...state
                .selectedBeacon
                .answers,
              answer,
            ],
          };
        }

        const trending =
          [...updatedBeacons]
            .sort(
              (a, b) =>
                b.answers.length -
                a.answers.length
            )
            .slice(0, 5);

        return {
          beacons:
            updatedBeacons,

          selectedBeacon:
            updatedSelected,

          trendingBeacons:
            trending,
        };
      }),

    refreshTrending: () => {
      const beacons =
        get().beacons;

      const trending =
        [...beacons]
          .sort(
            (a, b) =>
              b.answers.length -
              a.answers.length
          )
          .slice(0, 5);

      set({
        trendingBeacons:
          trending,
      });
    },
  }));