"use client";

import { useEffect, useState } from "react";

import { usePlayerStore } from "@/stores/playerStore";

export default function NetworkHUD() {
  const score = usePlayerStore(
    (s) => s.score
  );

  const [mounted, setMounted] =
    useState(false);

  const [username, setUsername] =
    useState("");

  useEffect(() => {
    setMounted(true);

    const stored =
      localStorage.getItem(
        "elarion_username"
      ) || "Explorer";

    setUsername(stored);
  }, []);

  if (!mounted) {
    return null;
  }

  let rank = "Explorer";

  if (score >= 25) {
    rank = "Navigator";
  }

  if (score >= 50) {
    rank = "Researcher";
  }

  if (score >= 100) {
    rank = "Architect";
  }

  if (score >= 200) {
    rank = "Visionary";
  }

  if (score >= 350) {
    rank = "Oracle";
  }

  return (
    <div
      style={{
        position: "fixed",

        top: 20,
        left: 20,

        zIndex: 9999,

        display: "flex",

        gap: 20,

        background:
          "rgba(15,23,42,0.88)",

        backdropFilter:
          "blur(24px)",

        border:
          "1px solid rgba(124,58,237,0.25)",

        borderRadius: 24,

        padding: "18px 24px",

        color: "white",

        boxShadow:
          "0 0 40px rgba(124,58,237,0.18)",
      }}
    >
      <Stat
        label="EXPLORER"
        value={username}
      />

      <Stat
        label="SIGNAL"
        value={String(score)}
      />

      <Stat
        label="RANK"
        value={rank}
      />

      <Stat
        label="ONLINE"
        value="18"
      />
    </div>
  );
}

function Stat({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div
      style={{
        minWidth: 120,
      }}
    >
      <div
        style={{
          fontSize: 12,

          letterSpacing: 3,

          opacity: 0.6,

          marginBottom: 8,
        }}
      >
        {label}
      </div>

      <div
        style={{
          fontSize: 22,

          fontWeight: 800,

          color: "#c4b5fd",

          textShadow:
            "0 0 18px rgba(196,181,253,0.4)",
        }}
      >
        {value}
      </div>
    </div>
  );
}