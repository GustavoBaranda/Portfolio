"use client"

import { useRef } from 'react'
import { motion, useMotionValue } from 'framer-motion'
import Image from 'next/image'
import AnimatedText from '@/components/utils/AnimatedText'
import TransitionEffect from '@/components/hero/TransitionEffect'
import { FillButton } from "@/components/hero/fill-button";
import { ArrowRight, Mail } from "lucide-react";

const imageMotion = {
  initial: { opacity: 0, y: 24, scale: 0.96 },
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
  },
}

export default function Hero() {
  const buttonBase =
      "inline-flex items-center justify-center px-6 py-2.5 rounded-xl text-xl font-semibold transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2";
  const primaryButton = 
      `${buttonBase} border border-gray-200 min-w-[180px] whitespace-nowrap bg-dark text-light hover:bg-light hover:text-dark hover:border-dark dark:bg-light dark:text-dark dark:hover:bg-dark dark:hover:text-light dark:hover:border-light`;
  const secondaryButton = 
      `${buttonBase} min-w-[120px] whitespace-nowrap text-dark underline-offset-4 hover:border-dark dark:text-light dark:hover:border-light`;
  const tiltRef = useRef(null)
  const rotationX = useMotionValue(0)
  const rotationY = useMotionValue(0)
  const translateX = useMotionValue(0)
  const translateY = useMotionValue(0)

  const maxTilt = 8
  const maxTranslate = 12

  const applyTiltToMotion = ({ clientX, clientY }) => {
    const rect = tiltRef.current?.getBoundingClientRect()
    if (!rect) return
    const offsetX = (clientX - rect.left - rect.width / 2) / rect.width
    const offsetY = (clientY - rect.top - rect.height / 2) / rect.height
    rotationY.set(offsetX * maxTilt)
    rotationX.set(-offsetY * maxTilt)
    translateX.set(offsetX * maxTranslate)
    translateY.set(offsetY * maxTranslate)
  }

  const resetTilt = () => {
    rotationX.set(0)
    rotationY.set(0)
    translateX.set(0)
    translateY.set(0)
  }

  const handleMouseMove = event => applyTiltToMotion(event)

  const handlePointerMove = event => {
    if (event.pointerType === 'touch') return
    applyTiltToMotion(event)
  }

  const handleTouchMove = event => {
    const touch = event.touches[0]
    if (!touch) return
    applyTiltToMotion(touch)
  }

  return (
    <>
      <TransitionEffect />
      <main className="flex items-center justify-center text-dark min-h-[calc(100vh-225px)] dark:text-light w-full">
        <div className="pt-0">
          <div className="flex flex-col md:flex-row items-center justify-center w-full">
            <div className="w-full md:w-1/2 sm:w-full">
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
                    <Image src="/images/logo.svg" alt="logo" width={400} height={280} className="w-full h-auto md:inline-block md:w-full lg:inline-block"
                      priority
                      style={{ width: '100%', height: 'auto' }}
                      sizes='(max-width: 768px) 100vw,(max-width: 1200px) 50vw, 50vw'
                    />
                  </motion.div>
                </motion.div>
              </motion.div>
            </div>
            <div className="w-full md:w-1/2 sm:w-full flex flex-col items-center md:items-start self-center text-center md:text-left">
              
              {/* Nombre (H1) */}
              <AnimatedText
                text="Gustavo Baranda"
                as="h1"
                align="left"
                className="text-3xl md:text-4xl font-bold capitalize leading-tight"
              />

              {/* Rol */}
              <AnimatedText
                text="Full Stack Developer"
                as="h2"
                align="left"
                className="text-lg md:text-xl font-semibold opacity-90 mt-2"
              />

              {/* Headline */}
              <AnimatedText
                text="Transformo ideas en soluciones digitales con código y diseño."
                as="h2"
                align="left"
                className="text-3xl md:text-5xl lg:text-6xl font-bold mt-6 leading-[1.05] pb-2!"
                allowWrap={true}
              />

              {/* Descripción */}
              <AnimatedText
                text="Enfocado en construir sistemas robustos que combinan eficiencia técnica y claridad visual."
                as="p"
                align="left"
                className="text-base md:text-lg font-medium mt-4 max-w-xl opacity-80"
                allowWrap={true}
              />

              {/* Botones */}
              <div className="flex items-center mt-6 gap-5 w-full justify-center md:justify-start flex-nowrap">
                <FillButton
                  href="/projects"
                  ariaLabel="Ver proyectos"
                  motionProps={{
                    initial: { opacity: 0, x: 0, y: -8 },
                    transition: { duration: 0.5, ease: "easeOut", delay: 0.05 },
                  }}
                  className="hover:-translate-y-px hover:shadow-sm hover:bg-[#081026]/90 hover:text-[#f8fafc]/90"
                >
                  Proyectos
                  <ArrowRight className="h-5 w-5" />
                </FillButton>
                <FillButton
                  href="/contact"
                  ariaLabel="Contacto"
                  variant="ghost"
                  motionProps={{
                    initial: { opacity: 0, x: 0, y: 8 },
                    transition: { duration: 0.5, ease: "easeOut", delay: 0.25 },
                  }}
                >
                  Contacto
                  <Mail className="h-5 w-5" />
                </FillButton>
              </div>
            </div>
          </div>
        </div> 
       </main>       
    </>
  )
}
