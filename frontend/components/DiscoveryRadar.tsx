"use client";

import { useMemo } from "react";

import { useBeaconStore } from "@/stores/beaconStore";
import { usePlayerStore } from "@/stores/playerStore";

export default function DiscoveryRadar() {
  const beacons =
    useBeaconStore(
      (s) => s.beacons
    );

  const selectedBeacon =
    useBeaconStore(
      (s) => s.selectedBeacon
    );

  const position =
    usePlayerStore(
      (s) => s.position
    );

  const nearby =
    useMemo(() => {
      return [...beacons]
        .map((beacon) => {
          const [px, py, pz] =
            position;

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

          return {
            ...beacon,
            distance,
          };
        })
        .sort(
          (a, b) =>
            a.distance -
            b.distance
        )
        .slice(0, 3);
    }, [beacons, position]);

  if (selectedBeacon) {
    return null;
  }

  const getColor = (
    category: string
  ) => {
    switch (category) {
      case "ai":
        return "#7c3aed";

      case "career":
        return "#facc15";

      case "research":
        return "#06b6d4";

      case "startup":
        return "#ef4444";

      case "coding":
        return "#22c55e";

      case "cybersecurity":
        return "#f97316";

      case "design":
        return "#ec4899";

      default:
        return "#3b82f6";
    }
  };

  return (
    <div
      style={{
        position: "fixed",

        bottom: 20,
        right: 100,

        width: 220,

        zIndex: 9999,

        background:
          "rgba(15,23,42,0.82)",

        backdropFilter:
          "blur(18px)",

        border:
          "1px solid rgba(124,58,237,0.15)",

        borderRadius: 16,

        padding: 12,

        color: "white",

        boxShadow:
          "0 0 20px rgba(124,58,237,0.1)",
      }}
    >
      <div
        style={{
          fontSize: 9,

          letterSpacing: 2,

          opacity: 0.6,

          marginBottom: 10,
        }}
      >
        📡 RADAR
      </div>

      {nearby.map(
        (beacon) => (
          <div
            key={beacon.id}
            style={{
              display: "flex",

              alignItems:
                "center",

              gap: 8,

              marginBottom: 10,
            }}
          >
            <div
              style={{
                width: 8,

                height: 8,

                borderRadius:
                  "50%",

                background:
                  getColor(
                    beacon.category
                  ),

                boxShadow: `0 0 10px ${getColor(
                  beacon.category
                )}`,
              }}
            />

            <div
              style={{
                flex: 1,
              }}
            >
              <div
                style={{
                  fontSize: 11,

                  fontWeight: 600,

                  overflow:
                    "hidden",

                  whiteSpace:
                    "nowrap",

                  textOverflow:
                    "ellipsis",
                }}
              >
                {beacon.title}
              </div>

              <div
                style={{
                  fontSize: 10,

                  opacity: 0.65,
                }}
              >
                {Math.round(
                  beacon.distance
                )}
                m
              </div>
            </div>
          </div>
        )
      )}
    </div>
  );
}