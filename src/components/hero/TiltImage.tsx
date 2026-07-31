"use client";

import { useRef, MouseEvent, PointerEvent, TouchEvent } from 'react';
import { motion, useMotionValue, Variants } from 'framer-motion';
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
  alt = 'logo',
  width = 400,
  height = 280,
  sizes = '(max-width: 768px) 100vw,(max-width: 1200px) 50vw, 50vw',
  priority = true,
  className = '',
}: TiltImageProps) {
  const tiltRef = useRef<HTMLDivElement | null>(null);
  const rotationX = useMotionValue(0);
  const rotationY = useMotionValue(0);
  const translateX = useMotionValue(0);
  const translateY = useMotionValue(0);

  const maxTilt = 8;
  const maxTranslate = 12;

  const applyTiltToMotion = ({ clientX, clientY }: { clientX: number; clientY: number }) => {
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
    if (event.pointerType === 'touch') return;
    applyTiltToMotion(event);
  };

  const handleTouchMove = (event: TouchEvent<HTMLDivElement>) => {
    const touch = event.touches[0];
    if (!touch) return;
    applyTiltToMotion(touch);
  };

  const imageMotion: Variants = {
    initial: { opacity: 0, y: 24, scale: 0.96 },
    animate: { opacity: 1, y: 0, scale: 1 },
  };

  return (
    <motion.div
      ref={tiltRef}
      style={{ perspective: 900, touchAction: 'none' }}
      onMouseMove={handleMouseMove}
      onPointerMove={handlePointerMove}
      onPointerLeave={resetTilt}
      onTouchMove={handleTouchMove}
      onTouchEnd={resetTilt}
    >
      <motion.div
        variants={imageMotion}
        initial="initial"
        animate="animate"
        transition={{
          opacity: { duration: 0.9, ease: 'easeOut' },
          scale: { duration: 0.9, ease: 'easeOut' },
        }}
        style={{
          transformStyle: 'preserve-3d',
          willChange: 'transform',
          rotateX: rotationX,
          rotateY: rotationY,
          translateX: translateX,
          translateY: translateY,
        }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.98 }}
      >
        <motion.div
          animate={{ y: [0, -12, 0] }}
          transition={{
            duration: 4,
            ease: 'easeInOut',
            repeat: Infinity,
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
