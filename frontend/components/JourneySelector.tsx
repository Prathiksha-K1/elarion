"use client";

import { useEffect, useState } from "react";

import { usePlayerStore } from "@/stores/playerStore";

export default function JourneySelector() {
  const setPosition = usePlayerStore(
    (s) => s.setPosition
  );

  const [isMobile, setIsMobile] =
    useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(
        window.innerWidth < 768
      );
    };

    checkMobile();

    window.addEventListener(
      "resize",
      checkMobile
    );

    return () =>
      window.removeEventListener(
        "resize",
        checkMobile
      );
  }, []);

  // Hide on phones
  if (isMobile) {
    return null;
  }

  const destinations = [
    {
      name: "AI",
      icon: "🤖",
      color: "#7c3aed",
      position: [-35, 5.3, -35],
    },
    {
      name: "Career",
      icon: "🚀",
      color: "#facc15",
      position: [35, 5.3, -35],
    },
    {
      name: "Research",
      icon: "🔬",
      color: "#06b6d4",
      position: [-35, 5.3, 35],
    },
    {
      name: "Startup",
      icon: "💡",
      color: "#ef4444",
      position: [35, 5.3, 35],
    },
    {
      name: "Coding",
      icon: "💻",
      color: "#22c55e",
      position: [-55, 5.3, 0],
    },
    {
      name: "Cyber",
      icon: "🔐",
      color: "#f97316",
      position: [55, 5.3, 0],
    },
    {
      name: "Design",
      icon: "🎨",
      color: "#ec4899",
      position: [0, 5.3, 55],
    },
    {
      name: "General",
      icon: "🌎",
      color: "#3b82f6",
      position: [0, 5.3, -55],
    },
  ];

  return (
    <div
      style={{
        position: "fixed",
        right: 16,
        top: "50%",
        transform: "translateY(-50%)",
        zIndex: 9999,
        display: "flex",
        flexDirection: "column",
        gap: 8,
      }}
    >
      {destinations.map((planet) => (
        <button
          key={planet.name}
          onClick={() =>
            setPosition(
              planet.position as [
                number,
                number,
                number
              ]
            )
          }
          title={planet.name}
          style={{
            width: 46,
            height: 46,
            borderRadius: 14,
            border: `1px solid ${planet.color}`,
            cursor: "pointer",
            fontSize: 18,
            color: "white",
            background:
              "rgba(15,23,42,0.88)",
            backdropFilter:
              "blur(12px)",
            boxShadow: `0 0 12px ${planet.color}`,
            transition:
              "all 0.2s ease",
          }}
        >
          {planet.icon}
        </button>
      ))}
    </div>
  );
}