"use client";

import { useRef, MouseEvent, PointerEvent } from 'react';
import { motion, useMotionValue, useReducedMotion, Variants } from 'framer-motion';
import Image from 'next/image';

export interface TiltImageProps {
  src?: string;
  alt?: string;
  width?: number;
  height?: number;
  sizes?: string;
  priority?: boolean;
  className?: string;
}

export default function TiltImage({
  src = '/images/logo.svg',
  alt = 'Logo Gustavo Baranda',
  width = 400,
  height = 280,
  sizes = '(max-width: 768px) 100vw,(max-width: 1200px) 50vw, 50vw',
  priority = true,
  className = '',
}: TiltImageProps) {
  const reducedMotion = useReducedMotion();
  const tiltRef = useRef<HTMLDivElement | null>(null);
  const rotationX = useMotionValue(0);
  const rotationY = useMotionValue(0);
  const translateX = useMotionValue(0);
  const translateY = useMotionValue(0);

  const maxTilt = 8;
  const maxTranslate = 12;

  const applyTiltToMotion = ({ clientX, clientY }: { clientX: number; clientY: number }) => {
    if (reducedMotion) return;
    const rect = tiltRef.current?.getBoundingClientRect();
    if (!rect) return;
    const offsetX = (clientX - rect.left - rect.width / 2) / rect.width;
    const offsetY = (clientY - rect.top - rect.height / 2) / rect.height;
    rotationY.set(offsetX * maxTilt);
    rotationX.set(-offsetY * maxTilt);
    translateX.set(offsetX * maxTranslate);
    translateY.set(offsetY * maxTranslate);
  };

  const resetTilt = () => {
    rotationX.set(0);
    rotationY.set(0);
    translateX.set(0);
    translateY.set(0);
  };

  const handleMouseMove = (event: MouseEvent<HTMLDivElement>) => applyTiltToMotion(event);

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (event.pointerType !== 'mouse') return;
    applyTiltToMotion(event);
  };

  const imageMotion: Variants = {
    initial: { opacity: 0, y: 24, scale: 0.96 },
    animate: { opacity: 1, y: 0, scale: 1 },
  };

  return (
    <motion.div
      ref={tiltRef}
      style={{ perspective: 900 }}
      onMouseMove={handleMouseMove}
      onPointerMove={handlePointerMove}
      onPointerLeave={resetTilt}
    >
      <motion.div
        variants={imageMotion}
        initial={reducedMotion ? false : "initial"}
        animate="animate"
        transition={{
          opacity: { duration: 0.9, ease: 'easeOut' },
          scale: { duration: 0.9, ease: 'easeOut' },
        }}
        style={{
          transformStyle: 'preserve-3d',
          willChange: 'transform',
          rotateX: reducedMotion ? 0 : rotationX,
          rotateY: reducedMotion ? 0 : rotationY,
          translateX: reducedMotion ? 0 : translateX,
          translateY: reducedMotion ? 0 : translateY,
        }}
        whileHover={reducedMotion ? undefined : { scale: 1.05 }}
      >
        <motion.div
          animate={{ y: reducedMotion ? 0 : [0, -12, 0] }}
          transition={{
            duration: 4,
            ease: 'easeInOut',
            repeat: reducedMotion ? 0 : Infinity,
            repeatType: 'reverse',
            delay: 0.3,
          }}
        >
          <Image
            src={src}
            alt={alt}
            width={width}
            height={height}
            className={className}
            priority={priority}
            style={{ width: '100%', height: 'auto' }}
            sizes={sizes}
          />
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
