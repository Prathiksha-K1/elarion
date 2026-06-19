"use client";

import { useFrame } from "@react-three/fiber";
import { useThree } from "@react-three/fiber";

import { Vector3 } from "three";

import { usePlayerStore } from "@/stores/playerStore";
import { useCinematicStore } from "@/stores/cinematicStore";

export default function FollowCamera() {
  const { camera } =
    useThree();

  const position =
    usePlayerStore(
      (s) => s.position
    );

  const cinematic =
    useCinematicStore(
      (s) => s.cinematic
    );

  useFrame((state) => {
    const t =
      state.clock.elapsedTime;

    if (cinematic) {
      if (t < 2) {
        camera.position.lerp(
          new Vector3(
            0,
            24,
            45
          ),
          0.05
        );

        camera.lookAt(
          0,
          0,
          0
        );

        return;
      }

      if (t < 4) {
        const progress =
          (t - 2) / 2;

        camera.position.lerp(
          new Vector3(
            14 -
              progress * 28,
            12,
            22 -
              progress * 10
          ),
          0.06
        );

        camera.lookAt(
          0,
          5,
          0
        );

        return;
      }

      const progress =
        Math.min(
          (t - 4) / 1.2,
          1
        );

      const start =
        new Vector3(
          -14,
          10,
          12
        );

      const end =
        new Vector3(
          0,
          7,
          10
        );

      const finalPos =
        start
          .clone()
          .lerp(
            end,
            progress
          );

      camera.position.lerp(
        finalPos,
        0.08
      );

      camera.lookAt(
        0,
        5,
        0
      );

      return;
    }

    const [x, y, z] =
      position;

    const desiredPosition =
      new Vector3(
        x,
        y + 3.5,
        z + 7
      );

    camera.position.lerp(
      desiredPosition,
      0.14
    );

    camera.lookAt(
      x,
      y + 1,
      z
    );
  });

  return null;
}