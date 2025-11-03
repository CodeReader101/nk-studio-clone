"use client";
import { useRef, useEffect, useLayoutEffect } from "react";
import * as THREE from "three";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useFrame, useThree } from "@react-three/fiber";
import { PerspectiveCamera } from "@react-three/drei";
import useCursorMotion from "@/utils/useCursorMotion";
import useStore from "@/utils/useStore";

gsap.registerPlugin(ScrollTrigger);

const CamAnimation = () => {
  const cameraRef = useRef();
  const tl = useRef();
  const { camera } = useThree();

  const { setMountainScene, setScrollProgress, scrollProgress } = useStore();

  console.log(scrollProgress);

  const initialPosition = new THREE.Vector3();
  const initialRotation = new THREE.Euler();

  const targetPosition = useRef(new THREE.Vector3());
  const targetQuaternion = useRef(new THREE.Quaternion());

  //Mouse Parallex Effect
  const { posX, posY } = useCursorMotion();
  const mouseOffset = useRef(new THREE.Vector3());
  const smoothedMouseOffset = useRef({ x: 0, y: 0 });

  //final camera position
  const finalPosition = useRef(new THREE.Vector3());

  useEffect(() => {
    initialPosition.copy(new THREE.Vector3(-2, 1.5, 7));
    initialRotation.copy(new THREE.Euler(0, 0, 0));

    targetPosition.current.copy(initialPosition);
    finalPosition.current.copy(initialPosition);

    const initialQuaternion = new THREE.Quaternion().setFromEuler(
      initialRotation
    );
    targetQuaternion.current.copy(initialQuaternion);
  }, [camera]);

  const lastRoundedRef = useRef(null);

  useGSAP(() => {
    const container = document.getElementById("scrollContainer");
    tl.current = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        scrub: 1,
        start: "top top",
        end: "bottom bottom",
        onUpdate: (self) => {
          const p = Math.max(0, Math.min(1, self.progress));
          const rounded = Math.round(p * 10) / 10;
          if (rounded !== lastRoundedRef.current) {
            lastRoundedRef.current = rounded;
            setScrollProgress(rounded);
          }
        },
      },
    });

    tl.current
      .to(targetPosition.current, {
        x: 0.8,
        y: 3,
        z: 7,
        duration: 0.001,
      })
      .to(targetPosition.current, {
        z: 0,
        x: 5,
        duration: 0.1,
      })
      .to(
        initialRotation,
        {
          x: 0,
          y: Math.PI * 0.5,
          z: 0,
          duration: 0.1,
          onUpdate: () => {
            targetQuaternion.current.setFromEuler(initialRotation);
          },
        },

        "<"
      )
      .to(targetPosition.current, {
        z: -5,
        x: 0,
        duration: 0.1,
      })
      .to(
        initialRotation,
        {
          x: 0,
          y: Math.PI,
          z: 0,
          duration: 0.1,
          onUpdate: () => {
            targetQuaternion.current.setFromEuler(initialRotation);
          },
        },

        "<"
      )
      .to(targetPosition.current, {
        z: 0,
        x: -5,
        y: 1,
        duration: 0.1,
      })
      .to(
        initialRotation,
        {
          x: 0,
          y: Math.PI * 1.5,
          z: 0,
          duration: 0.1,
          onUpdate: () => {
            targetQuaternion.current.setFromEuler(initialRotation);
          },
        },

        "<"
      )
      .to(targetPosition.current, {
        z: 7,
        x: 0,
        y: 1.5,
        duration: 0.1,
      })
      .to(
        initialRotation,
        {
          x: 0,
          y: Math.PI * 2,
          z: 0,
          duration: 0.1,
          onUpdate: () => {
            targetQuaternion.current.setFromEuler(initialRotation);
          },
          onComplete: () => {
            setMountainScene(false);
          },
          onReverse: () => {},
        },
        "<"
      );
  }, []);

  useFrame((state, delta) => {
    const lerpFactor = Math.min(0.15, delta * 6);

    smoothedMouseOffset.current.x = THREE.MathUtils.lerp(
      smoothedMouseOffset.current.x,
      posX,
      0.1 * delta * 60
    );
    smoothedMouseOffset.current.y = THREE.MathUtils.lerp(
      smoothedMouseOffset.current.y,
      posY,
      0.1 * delta * 60
    );

    mouseOffset.current.set(
      smoothedMouseOffset.current.x * 0.8,
      smoothedMouseOffset.current.y * 0.8,
      0
    );

    finalPosition.current.copy(targetPosition.current).add(mouseOffset.current);

    camera.position.lerp(finalPosition.current, lerpFactor);
    camera.quaternion.slerp(targetQuaternion.current, lerpFactor);
    camera.updateMatrixWorld();
  });

  return (
    <PerspectiveCamera makeDefault ref={cameraRef} position={[-2, 1.5, 7]} />
  );
};

export default CamAnimation;
