"use client";

import { Canvas } from "@react-three/fiber";
import { Stars } from "@react-three/drei";

import {
  EffectComposer,
  Bloom,
} from "@react-three/postprocessing";

import { useSignalStore } from "@/stores/signalStore";

import Planet from "./Planet";
import Player from "./Player";
import FollowCamera from "./FollowCamera";
import MySpace from "./MySpace";
import BeaconManager from "./BeaconManager";
import BeaconLoader from "./BeaconLoader";
import BeaconPanel from "./BeaconPanel";
import WebSocketProvider from "./WebSocketProvider";
import IntroCinematic from "./IntroCinematic";
import AutoSelectNearestBeacon from "./AutoSelectNearestBeacon";
import JourneySelector from "./JourneySelector";
import UsernameGate from "./UsernameGate";
import NetworkHUD from "./NetworkHUD";
import DiscoveryRadar from "./DiscoveryRadar";
import MissionBriefing from "./MissionBriefing";
import NotificationCenter from "./NotificationCenter";
import CreateBeaconModal from "./CreateBeaconModal";
import SignalPopup from "./SignalPopup";

export default function Scene() {
  const show = useSignalStore(
    (s) => s.show
  );

  const text = useSignalStore(
    (s) => s.text
  );

  const hideSignal =
    useSignalStore(
      (s) => s.hideSignal
    );

  return (
    <>
      <IntroCinematic />

      <UsernameGate />

      <MissionBriefing />

      <NetworkHUD />

      <MySpace />

      <WebSocketProvider />

      <NotificationCenter />

      <JourneySelector />

      <DiscoveryRadar />

      <CreateBeaconModal />

      <BeaconPanel />

      <SignalPopup
        text={text}
        show={show}
        onHide={hideSignal}
      />

      <Canvas
        camera={{
          position: [0, 30, 60],
          fov: 75,
        }}
      >
        <color
          attach="background"
          args={["#020617"]}
        />

        <ambientLight
          intensity={0.6}
        />

        <directionalLight
          position={[10, 10, 5]}
          intensity={2}
        />

        <Stars
          radius={300}
          depth={100}
          count={12000}
          factor={5}
          saturation={0}
          fade
        />

        <Planet />

        <Player />

        <BeaconLoader />

        <BeaconManager />

        <AutoSelectNearestBeacon />

        <FollowCamera />

        <EffectComposer>
          <Bloom
            intensity={0.6}
            luminanceThreshold={0.8}
            luminanceSmoothing={0.9}
          />
        </EffectComposer>
      </Canvas>
    </>
  );
}