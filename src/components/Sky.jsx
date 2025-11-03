import React, { useEffect, useRef, useMemo } from "react";
import { ShaderMaterial } from "three";
import skyVertexShader from "@/shaders/sky/vertex.glsl";
import skyFragmentShader from "@/shaders/sky/fragment.glsl";
import { useLoader, useThree, useFrame } from "@react-three/fiber";
import * as THREE from "three";

const sky = () => {
  const [noise1, noise2] = useLoader(THREE.TextureLoader, [
    "/textures/noise/noise1.png",
    "/textures/noise/noise2.png",
  ]);

  useEffect(() => {
    for (const t of [noise1, noise2]) {
      t.wrapS = t.wrapT = THREE.RepeatWrapping;
      t.minFilter = t.magFilter = THREE.LinearFilter;
      t.needsUpdate = true;
    }
  }, [noise1, noise2]);

  const { size } = useThree();
  const matRef = useRef();

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uRes: { value: new THREE.Vector3(size.width, size.height, 1) },
      uTexture1: { value: noise1 },
      uTexture2: { value: noise2 },
    }),
    [size.width, size.height, noise1, noise2]
  );

  useEffect(() => {
    uniforms.uRes.value.set(size.width, size.height, 1);
  }, [size, uniforms]);

  useFrame((state, delta) => {
    uniforms.uTime.value += delta;
  });

  return (
    <mesh position={[0, 4, 0]}>
      {/* <planeGeometry args={[10, 10]} /> */}
      <sphereGeometry args={[30]} />
      <shaderMaterial
        fragmentShader={skyFragmentShader}
        vertexShader={skyVertexShader}
        uniforms={uniforms}
        side={THREE.BackSide}
      />
    </mesh>
  );
};

export default sky;
