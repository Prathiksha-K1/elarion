"use client";

import { useMemo, useState } from "react";

import { useBeaconStore } from "@/stores/beaconStore";
import { usePlayerStore } from "@/stores/playerStore";
import { playSound } from "@/lib/sound";

export default function MySpace() {
  const [open, setOpen] = useState(false);

  const beacons = useBeaconStore(
    (s) => s.beacons
  );

  const setSelectedBeacon =
    useBeaconStore(
      (s) => s.setSelectedBeacon
    );

  const setPosition =
    usePlayerStore(
      (s) => s.setPosition
    );

  const username =
    typeof window !== "undefined"
      ? localStorage.getItem(
          "elarion_username"
        ) || "Explorer"
      : "Explorer";

  const myWorlds = useMemo(() => {
    return beacons.filter(
      (beacon) =>
        beacon.author === username
    );
  }, [beacons, username]);

  const unreadCount =
    myWorlds.filter(
      (world) =>
        world.answers.length > 1
    ).length;

  return (
    <>
      <button
        onClick={() =>
          setOpen(!open)
        }
        style={{
          position: "fixed",
          top: 90,
          right: 20,

          width: 64,
          height: 64,

          border:
            "1px solid rgba(124,58,237,0.25)",

          borderRadius: 20,

          cursor: "pointer",

          zIndex: 99999,

          fontSize: 28,

          background:
            "rgba(15,23,42,0.92)",

          color: "white",

          backdropFilter:
            "blur(18px)",

          boxShadow:
            "0 0 25px rgba(124,58,237,0.25)",
        }}
      >
        🌌

        {unreadCount > 0 && (
          <div
            style={{
              position: "absolute",

              top: -6,
              right: -6,

              width: 24,
              height: 24,

              borderRadius: "50%",

              background:
                "#ef4444",

              display: "flex",

              alignItems:
                "center",

              justifyContent:
                "center",

              fontSize: 12,

              fontWeight: 700,

              color: "white",
            }}
          >
            {unreadCount}
          </div>
        )}
      </button>

      {open && (
        <div
          style={{
            position: "fixed",

            top: 165,
            right: 20,

            width: 340,

            maxHeight: "60vh",

            overflowY: "auto",

            zIndex: 99998,

            background:
              "rgba(15,23,42,0.95)",

            backdropFilter:
              "blur(20px)",

            border:
              "1px solid rgba(124,58,237,0.18)",

            borderRadius: 22,

            padding: 18,

            color: "white",

            boxShadow:
              "0 0 35px rgba(124,58,237,0.15)",
          }}
        >
          <div
            style={{
              fontSize: 11,

              letterSpacing: 3,

              opacity: 0.6,

              marginBottom: 10,
            }}
          >
            MY SPACE
          </div>

          <h2
            style={{
              margin: 0,

              marginBottom: 16,
            }}
          >
            🌌 My Worlds
          </h2>

          {myWorlds.length === 0 && (
            <div
              style={{
                opacity: 0.7,
              }}
            >
              No worlds created yet.
            </div>
          )}

          {myWorlds.map((world) => (
            <div
              key={world.id}
              style={{
                padding: 14,

                marginBottom: 12,

                borderRadius: 16,

                background:
                  "rgba(255,255,255,0.04)",

                border:
                  "1px solid rgba(255,255,255,0.06)",
              }}
            >
              <div
                style={{
                  fontWeight: 700,

                  marginBottom: 8,
                }}
              >
                {world.title}
              </div>

              <div
                style={{
                  fontSize: 12,

                  opacity: 0.7,

                  marginBottom: 12,
                }}
              >
                💬 {world.answers.length} Responses
              </div>

              <button
                onClick={() => {
                  setPosition(
                    world.position
                  );

                  playSound("teleport.mp3");

                  setSelectedBeacon(
                  world
                 );

setOpen(false);
                }}
                style={{
                  width: "100%",

                  padding: 10,

                  border: "none",

                  borderRadius: 12,

                  cursor: "pointer",

                  background:
                    "linear-gradient(90deg,#7c3aed,#3b82f6)",

                  color: "white",

                  fontWeight: 700,
                }}
              >
                Open World 🚀
              </button>
            </div>
          ))}
        </div>
      )}
    </>
  );
}