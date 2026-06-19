import Scene from "@/components/Scene";
import BeaconPanel from "@/components/BeaconPanel";
import CreateBeaconModal from "@/components/CreateBeaconModal";
import WebSocketProvider from "@/components/WebSocketProvider";

export default function Home() {
  return (
    <>
      <WebSocketProvider />

      <Scene />

      <BeaconPanel />
      
      <CreateBeaconModal />
    </>
  );
}