"use client";

import { useEffect } from "react";

import { connectSocket } from "@/multiplayer/socket";

import { useBeaconStore } from "@/stores/beaconStore";
import { useNotificationStore } from "@/stores/notificationStore";
import { playSound } from "@/lib/sound";
export default function WebSocketProvider() {
  const addBeacon =
    useBeaconStore(
      (s) => s.addBeacon
    );

  const addAnswer =
    useBeaconStore(
      (s) => s.addAnswer
    );

  const addNotification =
    useNotificationStore(
      (s) => s.addNotification
    );

  useEffect(() => {
    const socket =
      connectSocket();

    socket.onmessage = (
      event
    ) => {
      const data =
        JSON.parse(
          event.data
        );

      console.log(
        "WS Message:",
        data
      );

      if (
        data.type ===
        "new_beacon"
      ) {
        const category =
          (
            data.beacon
              .category ||
            "general"
          ).toLowerCase();

        const categoryZones =
          {
            ai: [-35, -35],

            career: [
              35, -35,
            ],

            research: [
              -35, 35,
            ],

            startup: [
              35, 35,
            ],

            coding: [
              -55, 0,
            ],

            cybersecurity:
              [55, 0],

            design: [
              0, 55,
            ],

            general: [
              0, -55,
            ],
          };

        const zone =
          categoryZones[
            category as keyof typeof categoryZones
          ] ||
          categoryZones.general;

        addBeacon({
          id: String(
            data.beacon.id
          ),

          title:
            data.beacon
              .question,

          author:
            data.beacon
              .author ||
            "Anonymous",

          category,

          type: "question",

          position: [
            zone[0] +
              (Math.random() -
                0.5) *
                18,

            5.3,

            zone[1] +
              (Math.random() -
                0.5) *
                18,
          ],

          answers:
            data.beacon
              .answers || [],
        });

        addNotification({
          id: crypto.randomUUID(),

          message: `🌍 New World Created: ${data.beacon.question}`,
        });
      }

      if (
        data.type ===
        "new_answer"
      ) {
        addAnswer(
          String(
            data.answer
              .beacon_id
          ),
          {
            id: String(
              data.answer.id
            ),

            author:
              data.answer
                .author,

            text:
              data.answer
                .text,
          }
        );
        playSound("notify.mp3");
        addNotification({
          id: crypto.randomUUID(),

          message: `💬 ${data.answer.author} posted a response`,
        });
      }

      if (
        data.type ===
        "rank_up"
      ) {
        addNotification({
          id: crypto.randomUUID(),

          message: `🏆 Rank Up: ${data.rank}`,
        });
      }
    };

    return () => {
      socket.onmessage =
        null;
    };
  }, [
    addBeacon,
    addAnswer,
    addNotification,
  ]);

  return null;
}