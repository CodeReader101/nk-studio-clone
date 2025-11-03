import React, { useMemo } from "react";
import * as THREE from "three";

const Particles = () => {
  // Create particle positions once (memoized)
  const particlesCount = 500;
  const positions = useMemo(() => {
    const pos = new Float32Array(particlesCount * 3);
    for (let i = 0; i < particlesCount * 3; i++) {
      pos[i] = (Math.random() - 0.5) * 10; // random spread
    }
    return pos;
  }, [particlesCount]);

  return (
    <points>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial size={0.05} color="#00ffff" sizeAttenuation />
    </points>
  );
};

export default Particles;
