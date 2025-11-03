import { OrbitControls } from "@react-three/drei";
import { Canvas, useFrame, extend } from "@react-three/fiber";
import { LayerMaterial, Depth, Fresnel } from "lamina";
import { useMemo, useRef } from "react";

import CustomLayer from "./CustomLayer";

extend({ CustomLayer });

const Aurora = () => {
  const materialRef = useRef();

  useFrame((state) => {
    const { clock } = state;
    materialRef.current.time = clock.getElapsedTime();
  });

  return (
    <group scale={10}>
      <mesh scale={1.5} position={[0, 0, 0]} rotation={[0, 0, -Math.PI * 0.5]}>
        <icosahedronGeometry args={[2, 11]} />
        <LayerMaterial lighting="lambert" side={1}>
          <Depth colorA="blue" colorB="aqua" alpha={0.9} mode="add" />
          <customLayer ref={materialRef} time={0.6} lacunarity={2} />
          <Fresnel color="black" mode="add" intensity={0.1} />
        </LayerMaterial>
      </mesh>
    </group>
  );
};

export default Aurora;
