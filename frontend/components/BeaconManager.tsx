"use client";

import Beacon from "./Beacon";

import { useBeaconStore } from "@/stores/beaconStore";

export default function BeaconManager() {
  const beacons =
    useBeaconStore(
      (state) => state.beacons
    );

  return (
    <>
      {beacons.map(
        (beacon) => (
          <Beacon
            key={beacon.id}
            beacon={beacon}
          />
        )
      )}
    </>
  );
}