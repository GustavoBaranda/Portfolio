"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { textReveal, paragraphReveal } from "@/data/aboutData";

export default function HeroBio() {
  const [step, setStep] = useState<number>(1);

  return (
    <motion.section className="space-y-10 mb-16 sm:mb-20 md:mb-28">
      <motion.header
        className="max-w-3xl space-y-3 sm:space-y-4"
        variants={textReveal}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <p className="text-xs sm:text-sm font-bold uppercase tracking-[0.2em] sm:tracking-[0.3em] text-indigo-600 dark:text-indigo-400">
          Sobre mí
        </p>
        <h2
          aria-describedby="about-section-subtitle"
          className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight tracking-tight text-foreground text-balance"
        >
          Construyendo el puente entre el{" "}
          <span className="bg-linear-to-r from-violet-600 via-indigo-600 to-blue-600 bg-clip-text text-transparent dark:from-violet-400 dark:via-indigo-400 dark:to-blue-400">
            código
          </span>{" "}
          y los{" "}
          <span className="bg-linear-to-r from-violet-600 via-indigo-600 to-blue-600 bg-clip-text text-transparent dark:from-violet-400 dark:via-indigo-400 dark:to-blue-400">
            datos
          </span>.
        </h2>
      </motion.header>

      <div className="space-y-6 sm:space-y-7 text-lg text-muted-foreground leading-relaxed">
        <motion.p
          id="about-section-subtitle"
          variants={paragraphReveal}
          custom={0}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="max-w-2xl text-base sm:text-lg text-muted leading-relaxed"
        >
          Desarrollo soluciones donde la lógica de negocio, los datos y las integraciones
          forman parte de un mismo sistema.
        </motion.p>

        <motion.p
          variants={paragraphReveal}
          custom={1}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          Soy{" "}
          <span className="font-semibold text-foreground">
            Técnico Superior en Desarrollo de Software
          </span>{" "}
          y actualmente estudio la{" "}
          <span className="font-semibold italic text-foreground">
            Licenciatura en Ciencia de Datos
          </span>{" "}
          en la Universidad de la Ciudad de Buenos Aires.
        </motion.p>

        <div className="space-y-6">
          <motion.p
            variants={paragraphReveal}
            custom={2}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            Mi especialización está en el{" "}
            <span className="font-semibold text-foreground">
              backend con Python, Django y SQL Server
            </span>, desarrollando aplicaciones empresariales que integran reglas de negocio, bases
            de datos relacionales, procesos asíncronos y diferentes servicios. Mi experiencia
            abarca sistemas de logística y depósitos fiscales, servicios financieros y
            medicina laboral.
          </motion.p>

          <motion.p
            variants={paragraphReveal}
            custom={3}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            También tengo experiencia{" "}
            <span className="font-semibold text-foreground">
              Full Stack
            </span>, trabajando con tecnologías como React, Next.js, Laravel y PHP para desarrollar
            soluciones que conectan el backend con interfaces funcionales y accesibles.
          </motion.p>
        </div>

        <div
          id="bio-details"
          inert={step !== 2}
          aria-hidden={step !== 2}
          className={`grid transition-[grid-template-rows] duration-300 ease-in-out ${
            step === 2 ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
          }`}
        >
          <div className="min-h-0 overflow-hidden space-y-6">
            <div className={step === 2 ? "pt-0" : ""}>
              <p>
                Me interesa construir software que no solamente funcione, sino que también
                sea{" "}
                <span className="font-semibold text-foreground">
                  mantenible, escalable y fácil de evolucionar
                </span>. Por eso presto especial atención a la arquitectura, la organización del
                código, las pruebas y la claridad de las soluciones que implemento.
              </p>
              <p className="mt-6">
                Además de mi experiencia profesional, soy{" "}
                <span className="font-semibold text-foreground">
                  creador y mantenedor de chatflow-agent
                </span>, una librería Python open source orientada al desarrollo de agentes
                conversacionales. Este proyecto me permite profundizar en arquitectura de
                software, programación asíncrona, documentación, testing y colaboración con
                otros desarrolladores.
              </p>
              <p className="mt-6">
                Considero que el desarrollo Full Stack no consiste únicamente en conocer
                tecnologías de frontend y backend, sino en comprender cómo se relacionan las
                distintas partes de una aplicación para ofrecer una experiencia consistente a
                quienes la utilizan.
              </p>
              <p className="mt-6">
                Mi formación en{" "}
                <span className="font-semibold text-foreground">Ciencia de Datos</span>{" "}
                complementa esta perspectiva, aportándome herramientas para analizar
                información, comprender procesos y tomar decisiones fundamentadas.
              </p>
              <p className="mt-6">
                Valoro especialmente el{" "}
                <span className="font-semibold text-foreground">
                  aprendizaje continuo, el trabajo en equipo y la comunicación clara
                </span>. Me gusta compartir conocimientos, recibir diferentes perspectivas y
                encontrar soluciones que equilibren las necesidades del negocio con la
                calidad técnica.
              </p>
              <p className="mt-6">
                Mi objetivo es seguir desarrollando soluciones que resuelvan problemas reales,
                aporten valor y puedan mantenerse y mejorar con el tiempo.
              </p>
            </div>
          </div>
        </div>

        <motion.div
          className="pt-4"
          variants={paragraphReveal}
          custom={5}
          initial="hidden"
          animate="visible"
        >
          <motion.button
            type="button"
            onClick={() => setStep(step === 1 ? 2 : 1)}
            aria-expanded={step === 2}
            aria-controls="bio-details"
            className="text-indigo-600 dark:text-indigo-400 font-semibold hover:underline cursor-pointer"
            whileHover={{ y: -2, scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <AnimatePresence initial={false} mode="wait">
              <motion.span
                key={step === 1 ? "show-more" : "show-less"}
                className="inline-block"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 6 }}
                transition={{ duration: 0.24, ease: "easeInOut" }}
              >
                {step === 1 ? "Ver más ↓" : "Ver menos ↑"}
              </motion.span>
            </AnimatePresence>
          </motion.button>
        </motion.div>
      </div>
    </motion.section>
  );
}
