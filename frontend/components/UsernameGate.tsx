"use client";

import { useEffect, useState } from "react";

import { usePlayerStore } from "@/stores/playerStore";
import { useCinematicStore } from "@/stores/cinematicStore";

export default function UsernameGate() {
  const cinematic =
    useCinematicStore(
      (s) => s.cinematic
    );

  const username =
    usePlayerStore(
      (s) => s.username
    );

  const setUsername =
    usePlayerStore(
      (s) => s.setUsername
    );

  const [name, setName] =
    useState("");

  const [visible, setVisible] =
    useState(false);

  const [savedUser, setSavedUser] =
    useState("");

  const [loaded, setLoaded] =
    useState(false);

  useEffect(() => {
    const stored =
      localStorage.getItem(
        "elarion_username"
      );

    if (stored) {
      setSavedUser(stored);
    }

    setLoaded(true);
  }, []);

  useEffect(() => {
    if (!cinematic) {
      setTimeout(() => {
        setVisible(true);
      }, 800);
    }
  }, [cinematic]);

  if (cinematic) return null;

  if (!visible) return null;

  if (!loaded) return null;

  if (username) return null;

  const enterGalaxy = () => {
    if (!name.trim()) return;

    localStorage.setItem(
      "elarion_username",
      name
    );

    setUsername(name);
  };

  const continueGalaxy = () => {
    setUsername(savedUser);
  };

  if (savedUser) {
    return (
      <div
        style={{
          position: "fixed",
          inset: 0,

          zIndex: 999999,

          background:
            "rgba(2,6,23,0.92)",

          backdropFilter:
            "blur(20px)",

          display: "flex",

          justifyContent: "center",

          alignItems: "center",

          animation:
            "fadeIn 1s ease",
        }}
      >
        <div
          style={{
            width: 500,

            padding: 40,

            borderRadius: 28,

            background:
              "rgba(15,23,42,0.9)",

            border:
              "1px solid rgba(255,255,255,0.08)",

            color: "white",

            textAlign: "center",
          }}
        >
          <div
            style={{
              fontSize: 12,
              letterSpacing: 4,
              opacity: 0.6,
            }}
          >
            ELARION NETWORK
          </div>

          <h1
            style={{
              fontSize: 42,
              marginTop: 20,
              marginBottom: 10,
            }}
          >
            Welcome Back
          </h1>

          <div
            style={{
              fontSize: 24,
              color: "#a78bfa",
              marginBottom: 30,
            }}
          >
            {savedUser}
          </div>

          <button
            onClick={
              continueGalaxy
            }
            style={{
              width: "100%",

              padding: 16,

              borderRadius: 14,

              border: "none",

              cursor: "pointer",

              fontWeight: 700,

              fontSize: 16,

              background:
                "linear-gradient(90deg,#7c3aed,#3b82f6)",

              color: "white",
            }}
          >
            Enter Galaxy
          </button>

          <button
            onClick={() => {
              localStorage.removeItem(
                "elarion_username"
              );

              location.reload();
            }}
            style={{
              width: "100%",

              padding: 14,

              marginTop: 12,

              borderRadius: 14,

              border:
                "1px solid rgba(255,255,255,0.08)",

              background:
                "transparent",

              color: "#94a3b8",

              cursor: "pointer",
            }}
          >
            Switch Identity
          </button>
        </div>

        <style jsx>{`
          @keyframes fadeIn {
            from {
              opacity: 0;
            }

            to {
              opacity: 1;
            }
          }
        `}</style>
      </div>
    );
  }

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,

        zIndex: 999999,

        background:
          "rgba(2,6,23,0.92)",

        backdropFilter:
          "blur(20px)",

        display: "flex",

        justifyContent: "center",

        alignItems: "center",

        animation:
          "fadeIn 1s ease",
      }}
    >
      <div
        style={{
          width: 500,

          padding: 40,

          borderRadius: 28,

          background:
            "rgba(15,23,42,0.9)",

          border:
            "1px solid rgba(255,255,255,0.08)",

          color: "white",
        }}
      >
        <div
          style={{
            fontSize: 12,
            letterSpacing: 4,
            opacity: 0.6,
            marginBottom: 12,
          }}
        >
          ELARION NETWORK
        </div>

        <h1
          style={{
            fontSize: 40,
            marginBottom: 12,
          }}
        >
          Choose Your Identity
        </h1>

        <p
          style={{
            opacity: 0.7,
            marginBottom: 24,
          }}
        >
          Your name becomes your
          presence inside the
          knowledge galaxy.
        </p>

        <input
          value={name}
          onChange={(e) =>
            setName(
              e.target.value
            )
          }
          placeholder="Enter your name"
          style={{
            width: "100%",

            padding: 16,

            borderRadius: 14,

            border:
              "1px solid rgba(255,255,255,0.1)",

            background:
              "rgba(255,255,255,0.05)",

            color: "white",

            marginBottom: 18,
          }}
        />

        <button
          onClick={enterGalaxy}
          style={{
            width: "100%",

            padding: 16,

            borderRadius: 14,

            border: "none",

            cursor: "pointer",

            fontWeight: 700,

            fontSize: 16,

            background:
              "linear-gradient(90deg,#7c3aed,#3b82f6)",

            color: "white",
          }}
        >
          Enter Galaxy
        </button>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }

          to {
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}