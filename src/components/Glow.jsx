import { EffectComposer, Bloom } from "@react-three/postprocessing";
import React from "react";

const Glow = () => {
  return (
    <EffectComposer>
      <Bloom
        intensity={1.8}
        luminanceThreshold={0.8}
        luminanceSmoothing={0.0}
      />
    </EffectComposer>
  );
};

export default Glow;
