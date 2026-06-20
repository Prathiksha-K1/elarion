"use client";

import { useRef } from "react";

import { useFrame } from "@react-three/fiber";
import { Group } from "three";

import { Text } from "@react-three/drei";

import useKeyboard from "@/hooks/useKeyboard";
import { usePlayerStore } from "@/stores/playerStore";
import { useBeaconStore } from "@/stores/beaconStore";

export default function Player() {
  const ref = useRef<Group>(null);

  const keys = useKeyboard();

  const position = usePlayerStore(
    (s) => s.position
  );

  const setPosition = usePlayerStore(
    (s) => s.setPosition
  );

  const beacons = useBeaconStore(
    (s) => s.beacons
  );

  const username =
    typeof window !== "undefined"
      ? localStorage.getItem(
          "elarion_username"
        ) || "Explorer"
      : "Explorer";

  useFrame((state) => {
    let [x, y, z] = position;

      const speed = keys.shift
  ? 1.2
  : 0.7;

let nextX = x;
let nextZ = z;

let moving = false;

let moveX = 0;
let moveZ = 0;

if (keys.w) {
  moveZ -= 1;
  moving = true;
}

if (keys.s) {
  moveZ += 1;
  moving = true;
}

if (keys.a) {
  moveX -= 1;
  moving = true;
}

if (keys.d) {
  moveX += 1;
  moving = true;
}

if (moveX !== 0 || moveZ !== 0) {
  const length = Math.sqrt(
    moveX * moveX +
      moveZ * moveZ
  );

  moveX /= length;
  moveZ /= length;

  nextX += moveX * speed;
  nextZ += moveZ * speed;
}

y = 5.3;

let blocked = false;

for (const beacon of beacons) {
  const [bx, , bz] =
    beacon.position;

  const dx = nextX - bx;
  const dz = nextZ - bz;

  const distance =
    Math.sqrt(
      dx * dx +
        dz * dz
    );

  if (distance < 1.5) {
    blocked = true;
    break;
  }
}

if (!blocked) {
  setPosition([
    nextX,
    y,
    nextZ,
  ]);
}

    if (ref.current) {
      ref.current.position.set(
        nextX,
        y,
        nextZ
      );

      if (keys.w) {
        ref.current.rotation.y = 0;
      }

      if (keys.s) {
        ref.current.rotation.y =
          Math.PI;
      }

      if (keys.a) {
        ref.current.rotation.y =
          Math.PI / 2;
      }

      if (keys.d) {
        ref.current.rotation.y =
          -Math.PI / 2;
      }

      ref.current.position.y =
        y +
        Math.sin(
          state.clock.elapsedTime *
            6
        ) *
          (moving
            ? 0.08
            : 0.03);
    }
  });

  return (
    <group
      ref={ref}
      position={position}
      scale={1.45}
    >
      <Text
        position={[0, 1.7, 0]}
        fontSize={0.2}
        color="#c084fc"
        anchorX="center"
        anchorY="middle"
      >
        {username}
      </Text>

      {/* Helmet */}
      <mesh>
        <sphereGeometry
          args={[0.22, 32, 32]}
        />
        <meshStandardMaterial
          color="#f8fafc"
          emissive="#ffffff"
          emissiveIntensity={0.2}
        />
      </mesh>

      {/* Body */}
      <mesh
        position={[0, -0.65, 0]}
      >
        <boxGeometry
          args={[
            0.5,
            1.05,
            0.35,
          ]}
        />
        <meshStandardMaterial
          color="#ffffff"
        />
      </mesh>

      {/* Backpack */}
      <mesh
        position={[
          0,
          -0.65,
          -0.25,
        ]}
      >
        <boxGeometry
          args={[
            0.24,
            0.55,
            0.2,
          ]}
        />
        <meshStandardMaterial
          color="#64748b"
        />
      </mesh>

      {/* Left Arm */}
      <mesh
        position={[
          -0.38,
          -0.55,
          0,
        ]}
      >
        <boxGeometry
          args={[
            0.12,
            0.55,
            0.12,
          ]}
        />
        <meshStandardMaterial
          color="#e2e8f0"
        />
      </mesh>

      {/* Right Arm */}
      <mesh
        position={[
          0.38,
          -0.55,
          0,
        ]}
      >
        <boxGeometry
          args={[
            0.12,
            0.55,
            0.12,
          ]}
        />
        <meshStandardMaterial
          color="#e2e8f0"
        />
      </mesh>

      {/* Left Leg */}
      <mesh
        position={[
          -0.15,
          -1.35,
          0,
        ]}
      >
        <boxGeometry
          args={[
            0.12,
            0.5,
            0.12,
          ]}
        />
        <meshStandardMaterial
          color="#e2e8f0"
        />
      </mesh>

      {/* Right Leg */}
      <mesh
        position={[
          0.15,
          -1.35,
          0,
        ]}
      >
        <boxGeometry
          args={[
            0.12,
            0.5,
            0.12,
          ]}
        />
        <meshStandardMaterial
          color="#e2e8f0"
        />
      </mesh>
    </group>
  );
}