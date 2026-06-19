"use client";

import { useState } from "react";

import { useBeaconStore } from "@/stores/beaconStore";
import { usePlayerStore } from "@/stores/playerStore";
import { playSound } from "@/lib/sound";
import { createAnswer } from "@/lib/api";

export default function BeaconPanel() {
  const beacon =
    useBeaconStore(
      (s) => s.selectedBeacon
    );

  const setSelectedBeacon =
    useBeaconStore(
      (s) => s.setSelectedBeacon
    );

  const addAnswer =
    useBeaconStore(
      (s) => s.addAnswer
    );

  const addScore =
    usePlayerStore(
      (s) => s.addScore
    );
  
    
  const addResponse =
  usePlayerStore(
    (s) => s.addResponse
  );

  const [answerText, setAnswerText] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  if (!beacon) return null;

  const categoryColorMap = {
    ai: "#7c3aed",
    career: "#facc15",
    research: "#06b6d4",
    startup: "#ef4444",
    coding: "#22c55e",
    cybersecurity: "#f97316",
    design: "#ec4899",
    general: "#3b82f6",
  };

  const categoryColor =
    categoryColorMap[
      beacon.category as keyof typeof categoryColorMap
    ] || "#7c3aed";

  const submitAnswer = async () => {
    if (!answerText.trim()) return;

    try {
      setLoading(true);

      const username =
        localStorage.getItem(
          "elarion_username"
        ) || "Unknown";

      const answer =
        await createAnswer(
          Number(beacon.id),
          answerText,
          username
        );

      addAnswer(
        beacon.id,
        {
          id: String(answer.id),
          author: answer.author,
          text: answer.text,
        }
      );

      addScore(5);

addResponse();

playSound("reward.mp3");

window.dispatchEvent(
  new CustomEvent(
    "elarion-popup",
    {
      detail: {
        text: "⚡ +5 SIGNAL EARNED",
      },
    }
  )
);

setAnswerText("");
    } catch (err) {
  console.error(
    "Failed to post answer:",
    err
  );

  window.dispatchEvent(
    new CustomEvent(
      "elarion-popup",
      {
        detail: {
          text:
            "❌ Failed To Sync Response",
        },
      }
    )
  );
} finally {
  setLoading(false);
}
  };

  return (
    <div
      style={{
        position: "absolute",

        right: 20,
        top: 20,

        width: 480,

        maxHeight: "85vh",

        overflowY: "auto",

        background:
          "rgba(15,23,42,0.92)",

        backdropFilter:
          "blur(20px)",

        border:
          "1px solid rgba(255,255,255,0.08)",

        borderRadius: 24,

        padding: 24,

        color: "white",

        zIndex: 1000,

        boxShadow:
          "0 0 40px rgba(0,0,0,0.4)",
      }}
    >
      <button
        onClick={() =>
          setSelectedBeacon(null)
        }
        style={{
          position: "absolute",

          right: 18,
          top: 18,

          width: 34,
          height: 34,

          border: "none",

          borderRadius: 10,

          cursor: "pointer",

          color: "white",

          background:
            "rgba(239,68,68,0.8)",
        }}
      >
        ×
      </button>

      <div
        style={{
          display: "inline-flex",

          padding:
            "6px 12px",

          borderRadius: 999,

          fontSize: 12,

          fontWeight: 700,

          marginBottom: 12,

          background:
            categoryColor,

          color: "#fff",
        }}
      >
        {beacon.category
          .toUpperCase()}
      </div>

      <h2
        style={{
          marginTop: 0,

          marginBottom: 12,

          lineHeight: 1.4,
        }}
      >
        {beacon.title}
      </h2>

      <div
        style={{
          display: "flex",

          gap: 18,

          marginBottom: 20,

          color: "#94a3b8",

          fontSize: 13,
        }}
      >
        <span>
          {beacon.answers.length}
          {" "}
          Responses
        </span>

        <span>
          Signal World
        </span>

        <span>
          +5 Signal Reward
        </span>
      </div>

      {beacon.answers.length >= 5 && (
        <div
          style={{
            marginBottom: 20,

            padding: 16,

            borderRadius: 14,

            background:
              "rgba(124,58,237,0.12)",

            border:
              "1px solid rgba(124,58,237,0.18)",
          }}
        >
          <div
            style={{
              fontSize: 11,

              letterSpacing: 2,

              opacity: 0.6,

              marginBottom: 8,
            }}
          >
            CONSENSUS SIGNAL
          </div>

          <div
            style={{
              lineHeight: 1.7,

              color: "#e2e8f0",
            }}
          >
            This world has enough
            explorer activity to
            generate a future AI
            consensus summary.
          </div>
        </div>
      )}

      <h3
        style={{
          marginBottom: 16,
        }}
      >
        Responses
      </h3>

      {beacon.answers.length ===
        0 && (
        <div
          style={{
            opacity: 0.6,
          }}
        >
          No responses yet.
        </div>
      )}

      {beacon.answers.map(
        (
          answer,
          index
        ) => (
          <div
            key={`${answer.id}-${index}`}
            style={{
              marginBottom: 14,

              padding: 14,

              borderRadius: 14,

              background:
                index === 0
                  ? "rgba(124,58,237,0.12)"
                  : "rgba(255,255,255,0.04)",

              border:
                index === 0
                  ? "1px solid rgba(124,58,237,0.2)"
                  : "1px solid rgba(255,255,255,0.05)",
            }}
          >
            <div
              style={{
                display: "flex",

                alignItems:
                  "center",

                gap: 8,

                marginBottom: 8,
              }}
            >
              <span
                style={{
                  fontWeight: 700,
                }}
              >
                {
                  answer.author
                }
              </span>

              {index === 0 && (
                <span
                  style={{
                    fontSize: 10,

                    padding:
                      "3px 8px",

                    borderRadius: 999,

                    background:
                      "#7c3aed",
                  }}
                >
                  AI
                </span>
              )}
            </div>

            <div
              style={{
                lineHeight: 1.7,

                color:
                  "#e2e8f0",
              }}
            >
              {answer.text}
            </div>
          </div>
        )
      )}

      <div
        style={{
          marginTop: 20,
        }}
      >
        <h3>
          Contribute
        </h3>

        <textarea
          value={answerText}
          onChange={(e) =>
            setAnswerText(
              e.target.value
            )
          }
          placeholder="Share your knowledge with the network..."
          rows={4}
          style={{
            width: "100%",

            padding: 14,

            borderRadius: 14,

            border:
              "1px solid rgba(255,255,255,0.08)",

            resize: "none",

            background:
              "rgba(255,255,255,0.05)",

            color: "white",
          }}
        />

        <button
          onClick={submitAnswer}
          disabled={loading}
          style={{
            marginTop: 14,

            width: "100%",

            padding: 14,

            border: "none",

            borderRadius: 14,

            cursor: "pointer",

            fontWeight: 700,

            background:
              "linear-gradient(90deg,#7c3aed,#3b82f6)",

            color: "white",

            opacity:
              loading
                ? 0.7
                : 1,
          }}
        >
          {loading
            ? "Syncing Network..."
            : "Submit Response (+5 Signal)"}
        </button>
      </div>
    </div>
  );
}