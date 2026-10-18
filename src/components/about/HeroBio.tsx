"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { textReveal, paragraphReveal } from "@/data/aboutData";

export default function HeroBio() {
  const [step, setStep] = useState<number>(1);

  return (
    <motion.section className="space-y-10 mb-16 sm:mb-20 md:mb-28">
      <motion.header
        className="space-y-3"
        variants={textReveal}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <p className="text-xl sm:text-2xl font-bold uppercase tracking-[0.3em] text-foreground">
          Sobre mi
        </p>
        <h2 className="text-3xl font-extrabold leading-snug sm:text-4xl md:text-6xl text-foreground text-balance">
          Construyendo el puente entre el{" "}
          <span className="text-indigo-600 dark:text-indigo-400">código</span> y los{" "}
          <span className="text-blue-600 dark:text-blue-400">datos</span>.
        </h2>
      </motion.header>

      <div className="space-y-6 sm:space-y-7 text-lg text-muted-foreground leading-relaxed">
        <motion.p
          variants={paragraphReveal}
          custom={0}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="text-xl md:text-2xl"
        >
          Me gusta pensar el desarrollo de software como un punto de
          encuentro donde la lógica se transforma en soluciones y los datos
          en decisiones.
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
          y estudiante de la{" "}
          <span className="font-semibold italic text-foreground">
            Licenciatura en Ciencias de Datos
          </span>{" "}
          en la Universidad de la Ciudad de Buenos Aires (Udelaciudad). Comencé
          creando aplicaciones y, con el tiempo, incorporé una mirada
          analítica que hoy guía cómo afronto cada proyecto.
        </motion.p>

        <div className="space-y-6">
          <motion.p
            variants={paragraphReveal}
            custom={2}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            En el{" "}
            <span className="text-indigo-600 dark:text-indigo-400 font-semibold uppercase tracking-wider text-sm">
              Backend
            </span>
            , busco solidez y escalabilidad. Trabajo principalmente con{" "}
            <span className="font-semibold text-foreground">
              Python y Django
            </span>
            . Me interesa diseñar soluciones claras y mantenibles,
            equilibrando simplicidad y rendimiento desde la arquitectura.
          </motion.p>

          <motion.p
            variants={paragraphReveal}
            custom={3}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            En el{" "}
            <span className="text-blue-600 dark:text-blue-400 font-semibold uppercase tracking-wider text-sm">
              Frontend
            </span>
            , utilizo React para crear interfaces limpias y funcionales.
            Creo que la experiencia de usuario no es un extra: si algo
            es potente pero confuso, todavía no está terminado.
          </motion.p>

          <motion.p
            variants={paragraphReveal}
            custom={4}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            La{" "}
            <span className="text-cyan-700 dark:text-cyan-400 font-semibold uppercase tracking-wider text-sm">
              Ciencia de Datos
            </span>{" "}
            me aporta una forma distinta de decidir. Analizo información
            para entender qué ocurre realmente y elegir caminos con
            criterio. No se trata de acumular datos, sino de usarlos para
            mejorar procesos y construir soluciones más inteligentes.
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
                Creo profundamente en el{" "}
                <span className="font-semibold text-foreground">aprendizaje constante</span>.
                La tecnología cambia todo el tiempo y eso es parte de lo que hace interesante
                este rubro; para mí, la curiosidad es una herramienta de trabajo fundamental.
              </p>
              <p className="mt-6">
                Valoro el{" "}
                <span className="font-semibold text-foreground">trabajo en equipo</span> y la
                comunicación clara. Compartir ideas, escuchar otras miradas y construir en
                conjunto suele llevar a resultados más sólidos y completos que el trabajo
                aislado.
              </p>
              <p className="mt-6">
                Busco que exista un{" "}
                <span className="font-semibold text-foreground">propósito en cada entrega</span>.
                No me interesa hacer cosas por inercia, sino aportar algo concreto: optimizar
                un proceso, mejorar una experiencia o resolver un problema real en el cruce
                entre datos y software.
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
