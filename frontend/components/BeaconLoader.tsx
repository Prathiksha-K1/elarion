"use client";

import { useEffect } from "react";

import { getBeacons } from "@/lib/api";
import { useBeaconStore } from "@/stores/beaconStore";

export default function BeaconLoader() {
  const setBeacons = useBeaconStore(
    (s) => s.setBeacons
  );

  useEffect(() => {
    async function load() {
      try {
        const data =
          await getBeacons();

        /*
          Bigger galaxy zones
          Less overlap
          Better exploration
        */
        const categoryZones = {
          ai: [-35, -35],

          career: [35, -35],

          research: [-35, 35],

          startup: [35, 35],

          coding: [-55, 0],

          cybersecurity: [55, 0],

          design: [0, 55],

          general: [0, -55],
        };

        setBeacons(
          data.map(
            (beacon: any) => {
              const category =
                (
                  beacon.category ||
                  "general"
                ).toLowerCase();

              const zone =
                categoryZones[
                  category as keyof typeof categoryZones
                ] ||
                categoryZones.general;

              return {
                id: String(
                  beacon.id
                ),

                title:
                  beacon.question,

                author:
                  beacon.author ||
                  "Explorer",

                category,

                type: "question",

                /*
                  Much wider spread
                  Prevents beacon stacking
                */
                position: [
                  zone[0] +
                    (Math.random() -
                      0.5) *
                      40,

                  5.3,

                  zone[1] +
                    (Math.random() -
                      0.5) *
                      40,
                ],

                answers:
                  (
                    beacon.answers ||
                    []
                  ).map(
                    (
                      answer: any
                    ) => ({
                      id: String(
                        answer.id
                      ),

                      author:
                        answer.author,

                      text:
                        answer.text,
                    })
                  ),
              };
            }
          )
        );
      } catch (err) {
        console.error(err);
      }
    }

    load();
  }, [setBeacons]);

  return null;
}