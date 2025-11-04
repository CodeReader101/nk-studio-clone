import * as THREE from "three";
import { useLoader } from "@react-three/fiber";
import { useFrame } from "@react-three/fiber";
import { useRef, useEffect } from "react";
import vertexShader from "@/shaders/particles/vertex.glsl";
import fragmentShader from "@/shaders/particles/fragment.glsl";

const RisingParticles = () => {
  //   const particleGeometry = new THREE.SphereGeometry(1, 32, 32);
  const particlesRef = useRef();
  // const particleTexture = useLoader(
  //   THREE.TextureLoader,
  //   "/textures/particleTexture.webp"
  // );
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

  // const particleMaterial = new THREE.PointsMaterial({
  //   size: 5,
  //   sizeAttenuation: false,
  //   color: "#15d7a5",
  //   alphaMap: particleTexture,
  //   transparent: true,
  //   alphaTest: 0.001,
  //   blending: THREE.AdditiveBlending,
  // });

  //   const particleMaterial = new THREE.ShaderMaterial({
  //     vertexShader: vertexShader,
  //     fragmentShader: fragmentShader,
  //   });

  const particleMaterial = new THREE.ShaderMaterial({
    transparent: true,
    depthWrite: false,
    // blending: THREE.AdditiveBlending,
    uniforms: {
      uTime: { value: 0 },
      uColor: { value: new THREE.Color("#15d7a5") },
      uGlow: { value: 1.7 },
      uSize: { value: 0.15 },
    },
    vertexShader: vertexShader,
    fragmentShader: fragmentShader,
    toneMapped: false,
  });

  if (!particlesRef.current) {
    particlesRef.current = new THREE.Points(particleGeometry, particleMaterial);
  }

  useEffect(() => {
    const pos = particlesRef.current.geometry.getAttribute("position");
    pos.setUsage(THREE.DynamicDrawUsage); // once
  }, []);

  useFrame((state, delta) => {
    // for (let i = 0; i < count; i++) {
    //   const i3 = i * 3;

    //   particlesRef.current.geometry.attributes.position.array[i3 + 1] =
    //     delta * 0.3;

    //   if (
    //     particlesRef.current.geometry.attributes.position.array[i3 + 1] > 10
    //   ) {
    //     particlesRef.current.geometry.attributes.position.array[i3 + 1] = 0;
    //   }
    // }

    // particlesRef.current.geometry.attributes.position.needsUpdate = true;

    const max = 5;
    const min = 0;

    const attr = particlesRef.current.geometry.getAttribute("position");
    const arr = attr.array;
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;

      arr[i3 + 1] += delta * 0.3;
      if (arr[i3 + 1] > 7) {
        arr[i3 + 1] = Math.floor(Math.random() * (max - min + 1)) + min;
      }
    }
    attr.needsUpdate = true;
  });

  return <primitive object={particlesRef.current} />;
};

export default RisingParticles;
