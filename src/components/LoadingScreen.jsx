import useStore from "../utils/useStore";
import { useEffect, useState, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const LoadingScreen = () => {
  const sceneLoaded = useStore((s) => s.sceneLoaded);

  const cube1 = useRef();
  const cube2 = useRef();
  const cube3 = useRef();
  const container = useRef();

  const tl1 = useRef();
  const tl2 = useRef();
  const tl3 = useRef();

  const [isVisible, setIsVisible] = useState(true);

  useGSAP(() => {
    if (!sceneLoaded) return;

    gsap.to(container.current, {
      opacity: 0,
      duration: 0.5,
      onComplete: () => {
        setIsVisible(false);
      },
    });
  }, [sceneLoaded]);

  // const sceneLoaded = useStore((s) => s.sceneLoaded);
  // const [visible, setVisible] = useState();

  // useEffect(() => {
  //   if (sceneLoaded) {
  //     const timeout = setTimeout(() => {
  //       setVisible(false), 500;
  //     });
  //     return () => clearTimeout(timeout);
  //   }
  // }, [sceneLoaded]);

  // if (!visible) return null;

  useGSAP(() => {
    if (!isVisible) return;
    tl1.current = gsap.timeline({ repeat: -1 });
    tl2.current = gsap.timeline({ repeat: -1 });
    tl3.current = gsap.timeline({ repeat: -1 });

    tl1.current
      .to(cube1.current, {
        y: 24,
      })
      .to(cube1.current, {
        y: 48,
      })
      .to(cube1.current, {
        x: 20,
        y: 58,
      })
      .to(cube1.current, {
        y: 11,
      })
      .to(cube1.current, {
        x: 0,
        y: 0,
      });

    tl2.current
      .to(cube2.current, {
        y: 24,
      })
      .to(cube2.current, {
        x: 20,
        y: 36,
      })
      .to(cube2.current, {
        y: -14,
      })
      .to(cube2.current, {
        x: 0,
        y: -24,
      })
      .to(cube2.current, {
        y: 0,
      });

    tl1.current
      .to(cube3.current, {
        x: 20,
        y: 10,
      })
      .to(cube3.current, {
        y: -60,
      })
      .to(cube3.current, {
        x: 0,
        y: -70,
      })
      .to(cube3.current, {
        y: -48,
      })
      .to(cube3.current, {
        y: 0,
      });
  }, []);

  if (!isVisible) return null;

  return (
    <div className=" fixed w-screen h-screen z-40 text-4xl flex justify-center items-center">
      <div ref={container} className=" w-16 h-20 relative">
        <img
          ref={cube1}
          src="/svg/cube.svg"
          alt=""
          className="w-14 absolute top-0"
        />

        <img
          ref={cube2}
          src="/svg/cube.svg"
          alt=""
          className="w-14 absolute top-6"
        />
        <img
          ref={cube3}
          src="/svg/cube.svg"
          alt=""
          className="w-14 absolute top-12"
        />
      </div>
    </div>
  );
};

export default LoadingScreen;
