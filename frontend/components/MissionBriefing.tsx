"use client";

import { useEffect, useState } from "react";

export default function MissionBriefing() {
  const [show, setShow] =
    useState(false);

  useEffect(() => {
    const seen =
      localStorage.getItem(
        "elarion_briefing"
      );

    if (!seen) {
      const timer =
        setTimeout(() => {
          setShow(true);
        }, 800);

      return () =>
        clearTimeout(timer);
    }
  }, []);

  if (!show) return null;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 999999,
        background:
          "rgba(2,6,23,0.88)",
        backdropFilter:
          "blur(16px)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
      }}
    >
      <div
        style={{
          width: 560,
          maxWidth: "95vw",
          background:
            "rgba(15,23,42,0.96)",
          border:
            "1px solid rgba(124,58,237,0.2)",
          borderRadius: 28,
          padding: 30,
          color: "white",
          boxShadow:
            "0 0 60px rgba(124,58,237,0.18)",
        }}
      >
        <div
          style={{
            fontSize: 11,
            letterSpacing: 6,
            opacity: 0.6,
            marginBottom: 10,
            textTransform:
              "uppercase",
          }}
        >
          Elarion Galaxy
        </div>

        <h1
          style={{
            margin: 0,
            fontSize: 44,
            lineHeight: 1.1,
          }}
        >
          🚀 Welcome Explorer
        </h1>

        <p
          style={{
            marginTop: 14,
            opacity: 0.75,
            lineHeight: 1.7,
            fontSize: 15,
          }}
        >
          Discover worlds.
          Share knowledge.
          Build your signal.
          Become an Oracle.
        </p>

        <div
          style={{
            marginTop: 22,
            padding: 20,
            borderRadius: 20,
            background:
              "rgba(255,255,255,0.04)",
          }}
        >
          <div
            style={{
              fontWeight: 700,
              marginBottom: 12,
              fontSize: 17,
            }}
          >
            🎮 Controls - LAPTOP
          </div>

          <div
            style={{
              lineHeight: 2,
              opacity: 0.85,
            }}
          >
             Use "W" "A" "S" "D" From Your Keyboard → Locomotion

            <br />

             SHIFT → Boost


            <br />

            Land near worlds to interact

            <br />

            Mobile → Just drag to move
          </div>
        </div>

        <div
          style={{
            marginTop: 18,
            padding: 20,
            borderRadius: 20,
            background:
              "rgba(124,58,237,0.08)",
            border:
              "1px solid rgba(124,58,237,0.15)",
          }}
        >
          <div
            style={{
              fontWeight: 700,
              marginBottom: 12,
              fontSize: 17,
            }}
          >
            🪐 Worlds Available - Just click on icons to jump to that world
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(2,1fr)",
              gap: 10,
              lineHeight: 1.8,
            }}
          >
            <div>🤖 - AI</div>
            <div>🚀 - Career</div>
            <div>🔬 - Research</div>
            <div>💡 - Startup</div>
            <div>💻 - Coding</div>
            <div>🔐 - Cyber</div>
            <div>🎨 - Design</div>
            <div>🌎 - General</div>
          </div>
        </div>

        <button
          onClick={() => {
            localStorage.setItem(
              "elarion_briefing",
              "seen"
            );

            setShow(false);
          }}
          style={{
            marginTop: 24,
            width: "100%",
            padding: 17,
            border: "none",
            borderRadius: 16,
            cursor: "pointer",
            fontWeight: 700,
            fontSize: 17,
            background:
              "linear-gradient(90deg,#7c3aed,#3b82f6)",
            color: "white",
          }}
        >
          🚀 ENTER GALAXY
        </button>
      </div>
    </div>
  );
}