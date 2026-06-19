"use client";

import { useRef } from "react";

import { useFrame } from "@react-three/fiber";

import { usePlayerStore } from "@/stores/playerStore";
import { useBeaconStore } from "@/stores/beaconStore";

export default function AutoSelectNearestBeacon() {
  const playerPosition =
    usePlayerStore(
      (s) => s.position
    );

  const beacons =
    useBeaconStore(
      (s) => s.beacons
    );

  const selectedBeacon =
    useBeaconStore(
      (s) => s.selectedBeacon
    );

  const setSelectedBeacon =
    useBeaconStore(
      (s) => s.setSelectedBeacon
    );

  const lockRef =
    useRef<string | null>(
      null
    );

  useFrame(() => {
    const [px, py, pz] =
      playerPosition;

    let nearestBeacon =
      null as any;

    let nearestDistance =
      Infinity;

    for (const beacon of beacons) {
      const [bx, by, bz] =
        beacon.position;

      const distance =
        Math.sqrt(
          (px - bx) *
            (px - bx) +
            (py - by) *
              (py - by) +
            (pz - bz) *
              (pz - bz)
        );

      if (
        distance <
        nearestDistance
      ) {
        nearestDistance =
          distance;

        nearestBeacon =
          beacon;
      }
    }

    if (
      nearestBeacon &&
      nearestDistance < 6
    ) {
      if (
        lockRef.current !==
        nearestBeacon.id
      ) {
        lockRef.current =
          nearestBeacon.id;

        setSelectedBeacon(
          nearestBeacon
        );
      }

      return;
    }

    if (
      nearestDistance > 8
    ) {
      lockRef.current =
        null;

      if (
        selectedBeacon
      ) {
        setSelectedBeacon(
          null
        );
      }
    }
  });

  return null;
}