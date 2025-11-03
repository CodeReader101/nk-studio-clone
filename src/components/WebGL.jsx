"use client";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { PerspectiveCamera } from "@react-three/drei";
import * as THREE from "three";
import Glow from "./Glow";
import MountainScene from "./MountainScene";
import CamAnimation from "./CamAnimation";
import SceneTransition from "./SceneTransition";
import SpaceScene from "./SpaceScene";

const WebGL = () => {
  return (
    <div id="canvasWrap">
      <Canvas id="canvas">
        <Glow />
        <CamAnimation />
        {/* <SpaceScene /> */}
        <SceneTransition
          A={<MountainScene />}
          B={<SpaceScene />}
          duration={0.8}
          ease="power2.inOut"
        />
        {/* <OrbitControls /> */}
        <ambientLight />
      </Canvas>
    </div>
  );
};

export default WebGL;
