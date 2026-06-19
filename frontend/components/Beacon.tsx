"use client";

import { useRef } from "react";

import { useFrame } from "@react-three/fiber";
import { Text } from "@react-three/drei";

import { Beacon as BeaconType } from "@/types/beacon";
import { usePlayerStore } from "@/stores/playerStore";

interface Props {
  beacon: BeaconType;
}

export default function Beacon({
  beacon,
}: Props) {
  const beaconRef =
    useRef<any>(null);

  const ringRef =
    useRef<any>(null);

  const playerPosition =
    usePlayerStore(
      (s) => s.position
    );

  const [px, py, pz] =
    playerPosition;

  const [bx, by, bz] =
    beacon.position;

  const distance =
    Math.sqrt(
      (px - bx) *
        (px - bx) +
        (py - by) *
          (py - by) +
        (pz - bz) *
          (pz - bz)
    );

  const showLabels =
    distance < 12;

  let planetColor =
    "#3b82f6";

  switch (
    beacon.category?.toLowerCase()
  ) {
    case "ai":
      planetColor =
        "#7c3aed";
      break;

    case "career":
      planetColor =
        "#facc15";
      break;

    case "research":
      planetColor =
        "#06b6d4";
      break;

    case "startup":
      planetColor =
        "#ef4444";
      break;

    case "coding":
      planetColor =
        "#22c55e";
      break;

    case "cybersecurity":
      planetColor =
        "#f97316";
      break;

    case "design":
      planetColor =
        "#ec4899";
      break;
  }

  const answerCount =
    beacon.answers.length;

  let planetSize = 0.8;

  if (answerCount >= 5)
    planetSize = 1.0;

  if (answerCount >= 10)
    planetSize = 1.25;

  if (answerCount >= 20)
    planetSize = 1.6;

  const isTrending =
    answerCount >= 5;

  useFrame((state) => {
    const time =
      state.clock.elapsedTime;

    if (beaconRef.current) {
      const pulse =
        1 +
        Math.sin(time * 2) *
          0.05;

      beaconRef.current.scale.set(
        pulse,
        pulse,
        pulse
      );

      beaconRef.current.rotation.y +=
        0.003;

      beaconRef.current.position.y =
        Math.sin(time * 1.2) *
        0.12;
    }

    if (ringRef.current) {
      ringRef.current.rotation.z +=
        0.006;

      ringRef.current.position.y =
        Math.sin(time * 1.2) *
        0.12;
    }
  });

  return (
    <group
      position={beacon.position}
    >
      {/* Glow Sphere */}
      <mesh>
        <sphereGeometry
          args={[
            planetSize * 1.35,
            32,
            32,
          ]}
        />

        <meshBasicMaterial
          color={planetColor}
          transparent
          opacity={0.08}
        />
      </mesh>

      {/* Main Planet */}
      <mesh ref={beaconRef}>
        <sphereGeometry
          args={[
            planetSize,
            64,
            64,
          ]}
        />

        <meshStandardMaterial
          color={planetColor}
          emissive={
            planetColor
          }
          emissiveIntensity={
            distance < 10
              ? 1.8
              : 0.7
          }
        />
      </mesh>

      {/* Trending Ring */}
      {isTrending && (
        <mesh
          ref={ringRef}
          rotation={[
            Math.PI / 2,
            0,
            0,
          ]}
        >
          <torusGeometry
            args={[
              planetSize +
                0.45,
              0.05,
              16,
              100,
            ]}
          />

          <meshStandardMaterial
            color="#fde68a"
            emissive="#fde68a"
            emissiveIntensity={
              1.5
            }
          />
        </mesh>
      )}

      {showLabels && (
        <>
          <Text
            position={[
              0,
              planetSize +
                0.9,
              0,
            ]}
            fontSize={0.18}
            color={
              planetColor
            }
            anchorX="center"
          >
            {
              beacon.category
            }
          </Text>

          <Text
            position={[
              0,
              planetSize +
                0.55,
              0,
            ]}
            fontSize={0.22}
            maxWidth={6}
            color="white"
            anchorX="center"
          >
            {beacon.title}
          </Text>

          <Text
            position={[
              0,
              -(planetSize +
                0.55),
              0,
            ]}
            fontSize={0.14}
            color="#94a3b8"
            anchorX="center"
          >
            💬{" "}
            {
              beacon.answers
                .length
            }{" "}
            responses
          </Text>
        </>
      )}
    </group>
  );
}