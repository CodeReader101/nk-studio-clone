import React from "react";
import { useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";
import { useRef } from "react";
import * as THREE from "three";

import Stars from "./Stars";

const SpaceScene = () => {
  const pillar = useLoader(GLTFLoader, "/models/pillar.glb", (loader) => {
    const draco = new DRACOLoader();
    draco.setDecoderPath("/draco/");
    draco.preload();
    loader.setDRACOLoader(draco);
  });

  const particlesRef = useRef();

  const particleTexture = useLoader(
    THREE.TextureLoader,
    "/textures/particleTexture.webp"
  );

  const particleGeometry = new THREE.BufferGeometry();

  const count = 1000;

  const positions = new Float32Array(count * 3);

  for (let i = 0; i < count; i++) {
    positions[i] = (Math.random() - 0.5) * 10;
  }

  particleGeometry.setAttribute(
    "position",
    new THREE.BufferAttribute(positions, 3)
  );

  const particleMaterial = new THREE.PointsMaterial({
    size: 5,
    sizeAttenuation: false,
    color: "white",
    transparent: true,
    alphaTest: 0.001,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
  });

  const geometry = new THREE.BoxGeometry(2, 2);

  particlesRef.current = new THREE.Points(geometry, particleMaterial);

  pillar.scene.traverse((child) => {
    if (child.isMesh) {
      if (child.name == "edges") {
        child.material = particleMaterial;
      }
    }
  });
  console.log(pillar.scene);

  return (
    <group>
      <primitive
        scale={0.3}
        position={[-1, 0, 0]}
        object={pillar.scene}
        rotation-y={Math.PI * 0.5}
      />

      <Stars />
    </group>
  );
};

export default SpaceScene;
