import { create } from "zustand";

interface PlayerState {
  position: [number, number, number];

  playerId: string;

  username: string;

  score: number;

  level: number;

  rank: string;

  worldsCreated: number;

  responsesPosted: number;

  setPosition: (
    position: [number, number, number]
  ) => void;

  setUsername: (
    username: string
  ) => void;

  addScore: (
    points: number
  ) => void;

  addWorld: () => void;

  addResponse: () => void;

  loadScore: () => void;
}

export const usePlayerStore =
  create<PlayerState>((set) => ({
    position: [0, 5.3, 0],

    playerId:
      typeof crypto !== "undefined"
        ? crypto.randomUUID()
        : Math.random()
            .toString(36)
            .substring(2),

    username: "",

    score: 0,

    level: 1,

    rank: "Explorer",

    worldsCreated: 0,

    responsesPosted: 0,

    setPosition: (
      position
    ) =>
      set({
        position,
      }),

    setUsername: (
      username
    ) =>
      set({
        username,
      }),

    loadScore: () => {
      if (
        typeof window ===
        "undefined"
      )
        return;

      const score =
        Number(
          localStorage.getItem(
            "elarion_score"
          )
        ) || 0;

      const worlds =
        Number(
          localStorage.getItem(
            "elarion_worlds"
          )
        ) || 0;

      const responses =
        Number(
          localStorage.getItem(
            "elarion_responses"
          )
        ) || 0;

      const level =
        Math.max(
          1,
          Math.floor(score / 25) + 1
        );

      let rank =
        "Explorer";

      if (score >= 25)
        rank = "Navigator";

      if (score >= 50)
        rank = "Researcher";

      if (score >= 100)
        rank = "Architect";

      if (score >= 200)
        rank = "Visionary";

      if (score >= 350)
        rank = "Oracle";

      set({
        score,
        worldsCreated: worlds,
        responsesPosted: responses,
        level,
        rank,
      });
    },

    addScore: (
      points
    ) =>
      set((state) => {
        const newScore =
          state.score + points;

        const level =
          Math.max(
            1,
            Math.floor(
              newScore / 25
            ) + 1
          );

        let rank =
          "Explorer";

        if (newScore >= 25)
          rank =
            "Navigator";

        if (newScore >= 50)
          rank =
            "Researcher";

        if (newScore >= 100)
          rank =
            "Architect";

        if (newScore >= 200)
          rank =
            "Visionary";

        if (newScore >= 350)
          rank = "Oracle";

        if (
          typeof window !==
          "undefined"
        ) {
          localStorage.setItem(
            "elarion_score",
            String(newScore)
          );
        }

        return {
          score: newScore,
          level,
          rank,
        };
      }),

    addWorld: () =>
      set((state) => {
        const count =
          state.worldsCreated + 1;

        if (
          typeof window !==
          "undefined"
        ) {
          localStorage.setItem(
            "elarion_worlds",
            String(count)
          );
        }

        return {
          worldsCreated:
            count,
        };
      }),

    addResponse: () =>
      set((state) => {
        const count =
          state.responsesPosted +
          1;

        if (
          typeof window !==
          "undefined"
        ) {
          localStorage.setItem(
            "elarion_responses",
            String(count)
          );
        }

        return {
          responsesPosted:
            count,
        };
      }),
  }));