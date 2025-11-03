import { useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";
import { useAnimations, Clone } from "@react-three/drei";
import * as THREE from "three";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useEffect, useRef } from "react";

import Aurora from "./Aurora";
import RisingParticles from "./RisingParticles";

const MountainScene = () => {
  const stoneGroup = useRef();
  const stone1Ref = useRef();
  const stone2Ref = useRef();
  const stone3Ref = useRef();

  const swarm = useRef();
  const firefly1 = useRef();
  const firefly2 = useRef();
  const firefly3 = useRef();
  const firefly4 = useRef();

  const [mountain, pillar, stone1, stone2, stone3, firefly] = useLoader(
    GLTFLoader,
    [
      "/models/mountain.glb",
      "/models/pillar.glb",
      "/models/stone1.glb",
      "/models/stone2.glb",
      "/models/stone3.glb",
      "/models/firefly.glb",
    ],
    (loader) => {
      const draco = new DRACOLoader();
      draco.setDecoderPath("/draco/");
      draco.preload();
      loader.setDRACOLoader(draco);
    }
  );

  const [mountainTexture, stoneTexture] = useLoader(THREE.TextureLoader, [
    "/textures/mountain/x.jpg",
    "/textures/stone/stoneTexture.webp",
  ]);

  const wingsMaterial = new THREE.MeshBasicMaterial({
    transparent: true,
    color: "black",
    opacity: 0.6,
  });

  const glowingMaterial = new THREE.MeshStandardMaterial({
    color: "#169d7a",
    emissive: "#00ffff", // emits light
    emissiveIntensity: 2.5, // strength of the glow color
  });

  const blackMaterial = new THREE.MeshBasicMaterial({
    color: "#000",
  });

  firefly.scene.traverse((child) => {
    if (!child.isMesh) return;
    if (child.name.includes("Plane")) {
      child.material = wingsMaterial;
    }
    if (child.name == "light") {
      child.material = glowingMaterial;
    }
    if (child.name == "body") {
      child.material = blackMaterial;
    }
  });

  const rand = gsap.utils.random;
  function randomTarget(range = 5) {
    return {
      x: rand(-range, range),
      y: rand(0.5, range),
      z: rand(-range, range),
    };
  }

  const { animations } = firefly;
  console.log(animations);
  const { actions, mixer } = useAnimations(firefly.animations, firefly.scene);

  useEffect(() => {
    actions.Animation.play();
    mixer.timeScale = 2;
  }, []);

  useGSAP(() => {
    gsap.to(stone1Ref.current.rotation, {
      y: "+=" + Math.PI * 2,
      duration: 20,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut",
    });
    gsap.to(stone2Ref.current.rotation, {
      y: "+=" + Math.PI * 2,
      duration: 20,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut",
    });
    gsap.to(stone3Ref.current.rotation, {
      y: "+=" + Math.PI * 2,
      duration: 20,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut",
    });
    gsap.to(stoneGroup.current.rotation, {
      y: "+=" + Math.PI * 2,
      repeat: -1,
      duration: 60,
      ease: "none",
    });

    gsap.to(swarm.current.rotation, {
      y: "+=" + Math.PI * 2,
      repeat: -1,
      duration: 45,
      ease: "none",
    });

    gsap.to(firefly1.current.position, {
      y: 2,
      duration: 12,
      ease: "power2.inOut",
      repeat: -1,
      yoyo: true,
    });
    gsap.to(firefly2.current.position, {
      y: 3,
      duration: 7,
      ease: "power2.inOut",
      repeat: -1,
      yoyo: true,
    });
    gsap.to(firefly3.current.position, {
      y: 1,
      duration: 14,
      ease: "power2.inOut",
      repeat: -1,
      yoyo: true,
    });
    gsap.to(firefly4.current.position, {
      y: 4,
      duration: 10,
      ease: "power2.inOut",
      repeat: -1,
      yoyo: true,
    });
  }, []);

  return (
    <group>
      <Aurora />
      <RisingParticles />
      {/* Mountain */}
      <primitive object={mountain.scene} scale={2.5}>
        <meshBasicMaterial
          attach={"children-0-material"}
          map={mountainTexture}
          color={"#128a69"}
        />
      </primitive>

      {/* Lake */}
      <mesh position={[0, -0.8, 0]} rotation-x={-Math.PI * 0.5}>
        <planeGeometry args={[50, 50]} />
        <meshStandardMaterial
          side={2}
          color={"#169d7a"}
          emissive={"#15d7a4"} // emits light
          emissiveIntensity={1}
        />
      </mesh>

      <group scale={0.5}>
        {/* Slash */}
        <primitive
          object={pillar.scene}
          scale={0.5}
          rotation-y={Math.PI * 0.5}
          position-x={-1}
        >
          <meshStandardMaterial
            transparent={true}
            opacity={0.5}
            roughness={1}
            color={"#169d7a"}
            attach={"children-1-material"}
            side={2}
          />
          <meshStandardMaterial
            side={2}
            attach={"children-0-material"}
            color={"#169d7a"}
            emissive={"#00ffff"} // emits light
            emissiveIntensity={1.2}
          />
        </primitive>

        {/* Stones */}
        <group ref={stoneGroup}>
          <primitive
            scale={0.8}
            position={[10, 0, 0]}
            ref={stone1Ref}
            object={stone1.scene}
          >
            <meshBasicMaterial
              attach={"children-0-material"}
              map={stoneTexture}
            />
          </primitive>
          <primitive
            scale={0.8}
            position={[-5.0, 0, 8.66]}
            ref={stone2Ref}
            object={stone2.scene}
          >
            <meshBasicMaterial
              attach={"children-0-material"}
              map={stoneTexture}
            />
          </primitive>
          <primitive
            scale={0.8}
            position={[-5.0, 0, -8.66]}
            ref={stone3Ref}
            object={stone3.scene}
          >
            <meshBasicMaterial
              attach={"children-0-material"}
              map={stoneTexture}
            />
          </primitive>
        </group>
      </group>

      <group ref={swarm}>
        <primitive
          scale={0.05}
          ref={firefly1}
          object={firefly.scene}
          position={[0, 0, -7]}
        />
        <Clone ref={firefly2} object={firefly.scene} position={[2, 0, -2]} />
        <Clone ref={firefly3} object={firefly.scene} position={[1, 2, 1.4]} />
        <Clone ref={firefly4} object={firefly.scene} position-z={-1.2} />
      </group>
    </group>
  );
};

export default MountainScene;
