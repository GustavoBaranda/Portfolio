import { motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";

const SvgCurve = () => {
  const [height, setHeight] = useState(0);

  useEffect(() => {
    const updateHeight = () => setHeight(window.innerHeight);
    updateHeight();
    window.addEventListener("resize", updateHeight);
    return () => window.removeEventListener("resize", updateHeight);
  }, []);

  const curve = useMemo(() => {
    if (!height) return null;
    const controlPointY = Math.round(height / 2);
    const bulge = Math.max(Math.round(height * 0.8), 340);
    const offsetX = 180;
    const initialPath = `M${offsetX} 0 L${offsetX} ${height} Q-${bulge} ${controlPointY} ${offsetX} 0`;
    const targetPath = `M${offsetX} 0 L${offsetX} ${height} Q${bulge} ${controlPointY} ${offsetX} 0`;
    const exitPath = `M${offsetX} 0 L${offsetX} ${height} Q-${Math.round(bulge * 1.5)} ${controlPointY} ${offsetX} 0`;

    return {
      initial: { d: initialPath },
      enter: { d: targetPath, transition: { duration: 1, ease: [0.76, 0, 0.24, 1] } },
      exit: { d: exitPath, transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } },
    };
  }, [height]);

  if (!curve) {
    return null;
  }

  return (
    <svg className="svgCurve">
      <motion.path variants={curve} initial="initial" animate="enter" exit="exit" />
    </svg>
  );
};

export default SvgCurve;
