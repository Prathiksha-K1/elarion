"use client";

import { useRef } from "react";

import { useFrame, useLoader } from "@react-three/fiber";
import { TextureLoader } from "three";

import { Text } from "@react-three/drei";

export default function Planet() {
  const earthRef = useRef<any>(null);
  const moonRef = useRef<any>(null);

  const earthMap = useLoader(
    TextureLoader,
    "/textures/earth1.jpg"
  );

  const normalMap = useLoader(
    TextureLoader,
    "/textures/earth2.jpg"
  );

  const specularMap = useLoader(
    TextureLoader,
    "/textures/earth3.jpg"
  );

  useFrame(({ clock }) => {
    const time = clock.getElapsedTime();

    if (earthRef.current) {
      earthRef.current.rotation.y += 0.0015;
    }

    if (moonRef.current) {
      moonRef.current.position.x =
        Math.cos(time * 0.25) * 7;

      moonRef.current.position.z =
        Math.sin(time * 0.25) * 7;
    }
  });

  return (
    <group>
      {/* SUN */}

      <pointLight
        position={[15, 10, -15]}
        intensity={120}
        distance={200}
        color="#fff5cc"
      />

      <mesh position={[15, 10, -15]}>
        <sphereGeometry
          args={[2.5, 64, 64]}
        />

        <meshBasicMaterial
          color="#ffd54f"
        />
      </mesh>

      {/* EARTH */}

      <mesh ref={earthRef}>
        <sphereGeometry
          args={[3.5, 128, 128]}
        />

        <meshPhongMaterial
          map={earthMap}
          normalMap={normalMap}
          specularMap={specularMap}
          shininess={20}
        />
      </mesh>

      <Text
        position={[0, 4.6, 0]}
        fontSize={0.35}
        color="white"
      >
        Earth
      </Text>

      {/* ATMOSPHERE */}

      <mesh scale={1.03}>
        <sphereGeometry
          args={[3.5, 128, 128]}
        />

        <meshStandardMaterial
          color="#87cefa"
          transparent
          opacity={0.08}
        />
      </mesh>

      {/* MOON */}

      <mesh
        ref={moonRef}
        position={[7, 0, 0]}
      >
        <sphereGeometry
          args={[0.8, 64, 64]}
        />

        <meshStandardMaterial
          color="#d6d6d6"
        />
      </mesh>

      {/* AI */}

      <group position={[-12, 4, -8]}>
        <mesh>
          <sphereGeometry
            args={[1.5, 64, 64]}
          />

          <meshStandardMaterial
            color="#7c3aed"
          />
        </mesh>

        <Text
          position={[0, 2.3, 0]}
          fontSize={0.22}
          color="white"
        >
          AI
        </Text>
      </group>

      {/* CAREER */}

      <group position={[14, -2, 10]}>
        <mesh>
          <sphereGeometry
            args={[1.8, 64, 64]}
          />

          <meshStandardMaterial
            color="#facc15"
          />
        </mesh>

        <Text
          position={[0, 2.5, 0]}
          fontSize={0.22}
          color="white"
        >
          Career
        </Text>
      </group>

      {/* RESEARCH */}

      <group position={[-15, 5, 15]}>
        <mesh>
          <sphereGeometry
            args={[1.6, 64, 64]}
          />

          <meshStandardMaterial
            color="#06b6d4"
          />
        </mesh>

        <Text
          position={[0, 2.3, 0]}
          fontSize={0.22}
          color="white"
        >
          Research
        </Text>
      </group>

      {/* STARTUP */}

      <group position={[-18, -4, 12]}>
        <mesh>
          <sphereGeometry
            args={[1.8, 64, 64]}
          />

          <meshStandardMaterial
            color="#ef4444"
          />
        </mesh>

        <mesh
          rotation={[
            Math.PI / 2.5,
            0,
            0,
          ]}
        >
          <torusGeometry
            args={[
              2.4,
              0.12,
              16,
              100,
            ]}
          />

          <meshStandardMaterial
            color="#fca5a5"
          />
        </mesh>

        <Text
          position={[0, 2.6, 0]}
          fontSize={0.22}
          color="white"
        >
          Startup
        </Text>
      </group>

      {/* CODING */}

      <group position={[20, 3, -12]}>
        <mesh>
          <sphereGeometry
            args={[1.7, 64, 64]}
          />

          <meshStandardMaterial
            color="#22c55e"
          />
        </mesh>

        <Text
          position={[0, 2.4, 0]}
          fontSize={0.22}
          color="white"
        >
          Coding
        </Text>
      </group>

      {/* CYBERSECURITY */}

      <group position={[25, -4, 0]}>
        <mesh>
          <sphereGeometry
            args={[1.7, 64, 64]}
          />

          <meshStandardMaterial
            color="#f97316"
          />
        </mesh>

        <Text
          position={[0, 2.4, 0]}
          fontSize={0.22}
          color="white"
        >
          Cyber
        </Text>
      </group>

      {/* DESIGN */}

      <group position={[-22, -3, -15]}>
        <mesh>
          <sphereGeometry
            args={[1.6, 64, 64]}
          />

          <meshStandardMaterial
            color="#ec4899"
          />
        </mesh>

        <Text
          position={[0, 2.3, 0]}
          fontSize={0.22}
          color="white"
        >
          Design
        </Text>
      </group>

      {/* GENERAL */}

      <group position={[0, -5, -25]}>
        <mesh>
          <sphereGeometry
            args={[1.8, 64, 64]}
          />

          <meshStandardMaterial
            color="#3b82f6"
          />
        </mesh>

        <Text
          position={[0, 2.5, 0]}
          fontSize={0.22}
          color="white"
        >
          General
        </Text>
      </group>
    </group>
  );
}