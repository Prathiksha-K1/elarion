import { create } from "zustand";

export interface Player {
  id: string;

  name: string;

  position: [
    number,
    number,
    number
  ];

  question?: string;

  avatar?: string;
}

interface WorldStore {
  selectedBeacon: string | null;

  players: Player[];

  setSelectedBeacon: (
    id: string | null
  ) => void;

  addPlayer: (
    player: Player
  ) => void;

  updatePlayer: (
    id: string,
    position: [
      number,
      number,
      number
    ]
  ) => void;

  removePlayer: (
    id: string
  ) => void;
}

export const useWorldStore =
  create<WorldStore>((set) => ({
    selectedBeacon: null,

    players: [],

    setSelectedBeacon: (id) =>
      set({
        selectedBeacon: id,
      }),

    addPlayer: (player) =>
      set((state) => {
        const exists =
          state.players.some(
            (p) => p.id === player.id
          );

        if (exists) {
          return state;
        }

        return {
          players: [
            ...state.players,
            player,
          ],
        };
      }),

    updatePlayer: (
      id,
      position
    ) =>
      set((state) => ({
        players:
          state.players.map(
            (player) =>
              player.id === id
                ? {
                    ...player,
                    position,
                  }
                : player
          ),
      })),

    removePlayer: (id) =>
      set((state) => ({
        players:
          state.players.filter(
            (player) =>
              player.id !== id
          ),
      })),
  }));