"use client";
import React from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Navbar = () => {
  const navRef = useRef();

  useGSAP(() => {
    gsap.to(navRef.current, {
      scrollTrigger: {
        trigger: navRef.current,
        pin: true,
        start: "top-=10 top",
        end: "+=4000",
      },
    });
  });

  return (
    <div className="absolute inset-0 flex justify-center items-end">
      <div
        ref={navRef}
        className=" inline-block mb-8 rounded-lg bg-blur p-4 px-7 text-white text-sm font-semibold"
      >
        <nav>
          <ul className="flex gap-10">
            <li>Studio</li>
            <li>Work</li>
            <li>Services</li>
            <li>News</li>
            <li>Contact</li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Navbar;
