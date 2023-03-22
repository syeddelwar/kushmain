/** @format */

import { useEffect, useState } from "react";

import { motion } from "framer-motion";

const Cursor = ({ scaling, children }) => {
  const [largecircle, setlargecircle] = useState({ x: 0, y: 0 });
  const [smallcircle, setsmallcircle] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const mousemove = (e) => {
      setlargecircle({ x: e.clientX, y: e.clientY });
      setsmallcircle({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", mousemove);

    return () => {
      window.removeEventListener("mousemove", mousemove);
    };
  }, []);

  //   .large_circle,
  // .small_circle {
  //   width: 64px;
  //   height: 64px;
  //   border-radius: 50%;
  //   background-color: rgb(253, 92, 205);
  //   position: fixed;
  //   pointer-events: none;
  //   transition: transform 0.1s;
  // }
  // .small_circle {
  //   width: 16px;
  //   height: 16px;
  //   background-color: rgb(90, 176, 247);
  // }
  return (
    <div>
      <motion.div
        animate={{
          x: largecircle.x - 20,
          y: largecircle.y - 20,
          transition: { type: "spring", mass: 3 },
        }}
        className="w-[35px] h-[35px] rounded-full border border-primary fixed z-[9999] pointer-events-none transition-all duration-150"
        style={{ scale: scaling ? 0.1 : 1 }}
      ></motion.div>
      <motion.div
        animate={{
          x: smallcircle.x - 8,
          y: smallcircle.y - 8,
          transition: { type: "spring", mass: 2 },
        }}
        className="w-[10px] h-[10px] rounded-full z-[99999] bg-primary fixed pointer-events-none transition-all duration-150"
      ></motion.div>
      {children}
    </div>
  );
};

export default Cursor;
