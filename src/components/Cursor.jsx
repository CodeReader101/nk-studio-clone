"use client";

import React, { use, useEffect } from "react";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const Cursor = () => {
  const circle = useRef();
  const point = useRef();

  const mouse = useRef({ x: 0, y: 0 });

  const delayedMouse = useRef({
    x: 0,
    y: 0,
  });

  const delayedPoint = useRef({
    pointX: 0,
    pointY: 0,
  });

  const manageMouseMove = (e) => {
    const { clientX, clientY } = e;

    mouse.current = { x: clientX, y: clientY };
  };

  const lerp = (x, y, a) => x * (1 - a) + y * a;

  const moveCircle = (x, y) => {
    gsap.set(circle.current, { x, y, xPercent: -50, yPercent: -50 });
  };

  const movePoint = (x, y) => {
    gsap.set(point.current, { x, y, xPercent: -50, yPercent: -50 });
  };

  const animate = () => {
    const { x, y } = delayedMouse.current;

    const { pointX, pointY } = delayedPoint.current;

    delayedMouse.current = {
      x: lerp(x, mouse.current.x, 0.075),
      y: lerp(y, mouse.current.y, 0.075),
    };

    delayedPoint.current = {
      pointX: lerp(pointX, mouse.current.x, 0.085),
      pointY: lerp(pointY, mouse.current.y, 0.09),
    };

    moveCircle(delayedMouse.current.x, delayedMouse.current.y);
    movePoint(delayedPoint.current.pointX, delayedPoint.current.pointY);
    window.requestAnimationFrame(animate);
  };

  useEffect(() => {
    animate();
    window.addEventListener("mousemove", manageMouseMove);
    return () => window.removeEventListener("mousemove", manageMouseMove);
  }, []);

  return (
    <>
      <div
        ref={circle}
        className="z-30 fixed top-0 left-0 bg-black/40 rounded-full w-10 h-10
        pointer-events-none grid place-items-center"
      ></div>
      <div
        ref={point}
        className="z-30 bg-primary fixed top-0 left-0 rounded-full w-1 h-1 pointer-events-none grid place-items-center"
      ></div>
    </>
  );
};

export default Cursor;
