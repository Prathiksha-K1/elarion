"use client";

import { useEffect, useState } from "react";

import { useCinematicStore } from "@/stores/cinematicStore";

export default function IntroCinematic() {
  const [visible, setVisible] =
    useState(true);

  const setCinematic =
    useCinematicStore(
      (s) => s.setCinematic
    );

  useEffect(() => {
    const titleTimer =
      setTimeout(() => {
        setVisible(false);
      }, 5500);

    const cinematicTimer =
      setTimeout(() => {
        setCinematic(false);
      }, 12000);

    return () => {
      clearTimeout(titleTimer);
      clearTimeout(cinematicTimer);
    };
  }, [setCinematic]);

  if (!visible) return null;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,

        zIndex: 999999,

        background: "#000",

        display: "flex",
        flexDirection: "column",

        justifyContent: "center",
        alignItems: "center",

        color: "white",

        animation:
          "elarionFade 1.2s ease 3.2s forwards",
      }}
    >
      <h1
        style={{
          fontSize: "5rem",
          fontWeight: 900,
          letterSpacing: "0.35em",

          margin: 0,

          textShadow:
            "0 0 40px rgba(255,255,255,0.35)",
        }}
      >
        ELARION
      </h1>

      <p
        style={{
          marginTop: 16,

          opacity: 0.75,

          letterSpacing: "0.3em",

          fontSize: 14,
        }}
      >
        LIVING KNOWLEDGE GALAXY
      </p>

      <div
        style={{
          position: "absolute",

          bottom: 42,

          display: "flex",
          flexDirection: "column",
          alignItems: "center",

          animation:
            "creatorFade 4s ease-in-out infinite alternate",
        }}
      >
        <div
          style={{
            width: 80,
            height: 1,

            background:
              "rgba(255,255,255,0.15)",

            marginBottom: 14,
          }}
        />

        <div
          style={{
            fontSize: 12,

            letterSpacing: "0.22em",

            color:
              "rgba(255,255,255,0.55)",

            textTransform:
              "uppercase",
          }}
        >
          One Developer. Infinite Worlds.
        </div>

        <div
          style={{
            marginTop: 6,

            fontSize: 13,

            fontWeight: 600,

            letterSpacing: "0.08em",

            color:
              "rgba(255,255,255,0.82)",
          }}
        >
          ✦ Prathiksha
        </div>
      </div>

      <style jsx>{`
        @keyframes elarionFade {
          to {
            opacity: 0;
            visibility: hidden;
          }
        }

        @keyframes creatorFade {
          from {
            opacity: 0.35;
            transform: translateY(4px);
          }

          to {
            opacity: 0.95;
            transform: translateY(0px);
          }
        }
      `}</style>
    </div>
  );
}
