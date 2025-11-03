import * as THREE from "three";
import { useLoader } from "@react-three/fiber";
import { useFrame } from "@react-three/fiber";
import { useRef, useEffect } from "react";
import vertexShader from "@/shaders/particles/vertex.glsl";
import fragmentShader from "@/shaders/particles/fragment.glsl";

const Stars = () => {
  //   const particleGeometry = new THREE.SphereGeometry(1, 32, 32);
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
    alphaMap: particleTexture,
    transparent: true,
    alphaTest: 0.001,
    depthWrite: false,
  });

  if (!particlesRef.current) {
    particlesRef.current = new THREE.Points(particleGeometry, particleMaterial);
  }

  useEffect(() => {
    const pos = particlesRef.current.geometry.getAttribute("position");
    pos.setUsage(THREE.DynamicDrawUsage); // once
  }, []);

  useFrame((state, delta) => {
    const max = 5;
    const min = 0;

    const attr = particlesRef.current.geometry.getAttribute("position");
    const arr = attr.array;
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;

      arr[i3 + 1] += delta * 3;
      if (arr[i3 + 1] > 7) {
        arr[i3 + 1] = 0;
      }
    }
    attr.needsUpdate = true;
  });

  return (
    <primitive
      scale={2.4}
      object={particlesRef.current}
      rotation-x={Math.PI * 0.5}
      position={[1.5, 4, 0]}
    />
  );
};

export default Stars;
