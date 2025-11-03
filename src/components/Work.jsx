"use client";
import React from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Work = () => {
  const tl = useRef();
  const container = useRef();
  const textRef = useRef();
  const pic1Ref = useRef();
  const pic2Ref = useRef();

  useGSAP(() => {
    if (!container.current) return;
    tl.current = gsap.timeline({
      scrollTrigger: {
        trigger: container.current,
        // markers: true,
        start: "top top",
        end: "bottom top",
        scrub: 1,
        pin: true,
      },
    });

    tl.current
      .addLabel("start")
      .fromTo(
        container.current,
        {
          opacity: 0,
        },
        { opacity: 1 },
        "start"
      )
      .fromTo(textRef.current, { scale: 0 }, { scale: 1 }, "start")
      .to(container.current, { opacity: 0, duration: 0.4 });

    //   .to(pic1Ref.current, {
    //     scale: 10,
    //     x: "-800%",
    //     duration: 2,
    //     ease: "power2.out",
    //     transformOrigin: "center center",
    //   })
    //   .fromTo(pic2Ref.current, { z: 0 }, { z: 10 });
  });
  return (
    <div
      ref={container}
      className="h-screen w-screen text-white grid grid-rows-[3fr_1fr]"
    >
      <div className="flex justify-center items-center">
        <div ref={textRef} className="flex flex-col items-center">
          <div className="text-sm">DIGITAL</div>
          <h2 className="text-5xl text-">Endless Frontier NYU</h2>
        </div>
      </div>
      <div className="flex justify-between ml-40 items-end mb-20">
        <div className="text-sm">STANDOUT WORK</div>
        <div className="border-b-primary border-b-2">
          EXPLORE ENDLESS FRONTIER NYU
        </div>
        <div className="flex flex-col mr-14">
          <span className="text-4xl">$2.3B+</span>{" "}
          <span className="text-shadow-md">raised by EFL startups</span>
        </div>
      </div>
    </div>
  );
};

export default Work;
