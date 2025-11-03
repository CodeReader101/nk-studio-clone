import { useEffect, useState } from "react";

const useCursorMotion = () => {
  const [mousePosition, setMousePosition] = useState({ posX: 0, posY: 0 });
  useEffect(() => {
    const mouseHandler = (e) => {
      const posX = (e.clientX / window.innerWidth) * 2 - 1;
      const posY = -((e.clientY / window.innerHeight) * 2 - 1);

      setMousePosition({ posX, posY });
    };
    window.addEventListener("mousemove", mouseHandler);

    return () => {
      window.removeEventListener("mousemove", mouseHandler);
    };
  }, []);
  return mousePosition;
};

export default useCursorMotion;
