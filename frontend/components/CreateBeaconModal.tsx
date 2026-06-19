"use client";

import { useState } from "react";

import { useBeaconStore } from "@/stores/beaconStore";
import { usePlayerStore } from "@/stores/playerStore";
import { createBeacon as createBeaconAPI } from "@/lib/api";
import { playSound } from "@/lib/sound";
export default function CreateBeaconModal() {
  const addBeacon = useBeaconStore(
    (s) => s.addBeacon
  );

  const setSelectedBeacon =
    useBeaconStore(
      (s) => s.setSelectedBeacon
    );

  const addWorld = usePlayerStore(
    (s) => s.addWorld
  );

  const addScore = usePlayerStore(
    (s) => s.addScore
  );

  const setPosition =
    usePlayerStore(
      (s) => s.setPosition
    );

  const [text, setText] =
    useState("");

  const [category, setCategory] =
    useState("ai");

  const createBeacon = async () => {
    if (!text.trim()) return;

    const username =
      localStorage.getItem(
        "elarion_username"
      ) || "Explorer";

    try {
      const response =
        await createBeaconAPI(
          text,
          username,
          category
        );

      const zones = {
        ai: [-35, -35],

        career: [35, -35],

        research: [-35, 35],

        startup: [35, 35],

        coding: [-55, 0],

        cybersecurity: [55, 0],

        design: [0, 55],

        general: [0, -55],
      };

      const zone =
        zones[
          category as keyof typeof zones
        ] || zones.general;

      const position: [
        number,
        number,
        number
      ] = [
        zone[0] +
          (Math.random() - 0.5) * 50,

        5.3,

        zone[1] +
          (Math.random() - 0.5) * 50,
      ];

      const newBeacon = {
        id: String(response.id),

        title: response.question,

        author: response.author,

        category: response.category,

        type: "question" as const,

        position,

        answers:
          response.answers || [],
      };

      addBeacon(newBeacon);

      addWorld();

      addScore(2);

      playSound("launch.mp3");

      // TELEPORT PLAYER
      setPosition([
        position[0],
        5.3,
        position[2] + 4,
      ]);

      // AUTO OPEN PANEL
      setTimeout(() => {
        setSelectedBeacon(
          newBeacon
        );
      }, 500);

      setText("");
      setCategory("ai");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div
      style={{
        position: "absolute",

        bottom: 20,
        left: 20,

        width:
          typeof window !==
            "undefined" &&
          window.innerWidth < 768
            ? 300
            : 380,

        background:
          "rgba(15,23,42,0.92)",

        backdropFilter:
          "blur(24px)",

        border:
          "1px solid rgba(124,58,237,0.18)",

        borderRadius: 24,

        padding: 22,

        color: "white",

        zIndex: 999,

        boxShadow:
          "0 0 40px rgba(124,58,237,0.15)",
      }}
    >
      <div
        style={{
          fontSize: 11,

          letterSpacing: 3,

          opacity: 0.55,

          marginBottom: 8,
        }}
      >
        KNOWLEDGE NETWORK
      </div>

      <h2
        style={{
          margin: 0,

          marginBottom: 6,

          fontSize: 24,
        }}
      >
        Create A Knowledge World
      </h2>

      <div
        style={{
          fontSize: 13,

          opacity: 0.65,

          marginBottom: 18,
        }}
      >
        Launch a signal into the galaxy
        and let explorers contribute.
      </div>

      <label
        style={{
          display: "block",

          marginBottom: 8,

          fontSize: 12,

          opacity: 0.7,
        }}
      >
        Category
      </label>

      <select
        value={category}
        onChange={(e) =>
          setCategory(
            e.target.value
          )
        }
        style={{
          width: "100%",

          padding: 14,

          marginBottom: 14,

          borderRadius: 14,

          border:
            "1px solid rgba(255,255,255,0.08)",

          background: "#1e293b",

          color: "#ffffff",

          outline: "none",
        }}
      >
        <option value="ai">
          AI
        </option>

        <option value="career">
          Career
        </option>

        <option value="research">
          Research
        </option>

        <option value="startup">
          Startup
        </option>

        <option value="coding">
          Coding
        </option>

        <option value="cybersecurity">
          Cybersecurity
        </option>

        <option value="design">
          Design
        </option>

        <option value="general">
          General
        </option>
      </select>

      <label
        style={{
          display: "block",

          marginBottom: 8,

          fontSize: 12,

          opacity: 0.7,
        }}
      >
        Question / Topic
      </label>

      <textarea
        value={text}
        onChange={(e) =>
          setText(
            e.target.value
          )
        }
        placeholder="Example: What is the fastest way to become a GenAI Engineer?"
        rows={5}
        style={{
          width: "100%",

          padding: 14,

          borderRadius: 14,

          border:
            "1px solid rgba(255,255,255,0.08)",

          resize: "none",

          background:
            "rgba(255,255,255,0.06)",

          color: "white",

          outline: "none",
        }}
      />

      <button
        onClick={createBeacon}
        style={{
          marginTop: 16,

          width: "100%",

          padding: 15,

          border: "none",

          borderRadius: 14,

          cursor: "pointer",

          fontWeight: 700,

          fontSize: 15,

          background:
            "linear-gradient(90deg,#7c3aed,#3b82f6)",

          color: "white",
        }}
      >
        🚀 Launch Knowledge World
      </button>
    </div>
  );
}