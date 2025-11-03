import { useRef, useMemo, useEffect, useState } from "react";
import * as THREE from "three";
import { useFrame, useThree } from "@react-three/fiber";
import gsap from "gsap";
import useStore from "@/utils/useStore";

// Simple crossfade shader
const CrossfadeMaterial = ({ tex0, tex1, mix }) => {
  const material = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: {
        t0: { value: tex0 },
        t1: { value: tex1 },
        uMix: { value: mix ?? 0 },
      },
      vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = vec4(position.xy, 0.0, 1.0);
        }
      `,
      fragmentShader: `
        uniform sampler2D t0;
        uniform sampler2D t1;
        uniform float uMix;
        varying vec2 vUv;
        void main() {
          vec4 c0 = texture2D(t0, vUv);
          vec4 c1 = texture2D(t1, vUv);
          gl_FragColor = mix(c0, c1, uMix);
        }
      `,
      transparent: false,
      depthTest: false,
      depthWrite: false,
    });
  }, [tex0, tex1, mix]);

  useEffect(() => {
    material.uniforms.t0.value = tex0;
    material.uniforms.t1.value = tex1;
  }, [tex0, tex1, material]);

  return <primitive object={material} attach="material" />;
};

export default function SceneTransition({
  A,
  B,
  // 0 shows A, 1 shows B
  duration = 0.6, // seconds
  ease = "power2.inOut",
}) {
  const { scrollProgress } = useStore();

  const [active, setActive] = useState(0);

  useEffect(() => {
    if (scrollProgress > 0.7) {
      setActive(1);
    } else {
      setActive(0);
    }
  }, [scrollProgress]);

  const { gl, size, camera, scene } = useThree();

  // Two offscreen buffers
  const rtA = useMemo(
    () => new THREE.WebGLRenderTarget(size.width, size.height, { samples: 4 }),
    [size]
  );
  const rtB = useMemo(
    () => new THREE.WebGLRenderTarget(size.width, size.height, { samples: 4 }),
    [size]
  );

  // Scenes holding each subtree
  const sceneA = useMemo(() => new THREE.Scene(), []);
  const sceneB = useMemo(() => new THREE.Scene(), []);

  // Hold root groups for mounting/unmounting children
  const rootA = useRef(new THREE.Group());
  const rootB = useRef(new THREE.Group());

  // Fullscreen quad geometry/mesh
  const quadMesh = useRef();
  const fsGeo = useMemo(() => new THREE.PlaneGeometry(2, 2), []);
  const fsMatRef = useRef();
  const mixRef = useRef({ value: active });

  // Mount React children into the groups via primitive
  useEffect(() => {
    sceneA.add(rootA.current);
    sceneB.add(rootB.current);
    return () => {
      sceneA.remove(rootA.current);
      sceneB.remove(rootB.current);
    };
  }, [sceneA, sceneB]);

  // Handle resize
  useEffect(() => {
    rtA.setSize(size.width, size.height);
    rtB.setSize(size.width, size.height);
  }, [size, rtA, rtB]);

  // Animate mix when active changes
  useEffect(() => {
    gsap.to(mixRef.current, {
      value: active,
      duration,
      ease,
      onUpdate: () => {
        if (fsMatRef.current) {
          fsMatRef.current.uniforms.uMix.value = mixRef.current.value;
        }
      },
    });
  }, [active, duration, ease]);

  useFrame(() => {
    // Render A into rtA
    gl.setRenderTarget(rtA);
    gl.clear();
    gl.render(sceneA, camera);

    // Render B into rtB
    gl.setRenderTarget(rtB);
    gl.clear();
    gl.render(sceneB, camera);

    // Restore default backbuffer
    gl.setRenderTarget(null);
  });

  return (
    <>
      {/* Mount your components into separate scenes */}
      <group>
        <primitive object={rootA.current}>{A}</primitive>
      </group>
      <group>
        <primitive object={rootB.current}>{B}</primitive>
      </group>

      {/* Fullscreen quad that mixes the two render targets */}
      <mesh ref={quadMesh} geometry={fsGeo} position={[0, 0, 0]}>
        <CrossfadeMaterial
          ref={fsMatRef}
          tex0={rtA.texture}
          tex1={rtB.texture}
          mix={mixRef.current.value}
        />
      </mesh>
    </>
  );
}
