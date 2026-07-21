"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { textReveal, paragraphReveal } from "@/data/aboutData";

export default function HeroBio() {
  const [step, setStep] = useState(1);

  return (
    <motion.section className="space-y-10 mb-32">
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
        <h1 className="text-3xl font-extrabold leading-snug sm:text-4xl md:text-6xl text-foreground text-balance">
          Construyendo el puente entre el{" "}
          <span className="text-indigo-600">{"código"}</span> y los{" "}
          <span className="text-blue-600">{"datos"}</span>.
        </h1>
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
            {"Técnico Superior en Desarrollo de Software"}
          </span>{" "}
          y estudiante de la{" "}
          <span className="font-semibold italic text-foreground">
            {"Licenciatura en Ciencias de Datos"}
          </span>{" "}
          en la Universidad de la Ciudad de Buenos Aires (UniCABA). Comencé
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
            <span className="text-indigo-600 font-semibold uppercase tracking-wider text-sm">
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
            <span className="text-blue-600 font-semibold uppercase tracking-wider text-sm">
              Frontend
            </span>
            , utilizo React para crear interfaces limpias y funcionales.
            Creo que la experiencia de usuario no es un {"\"extra\""}: si algo
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
            <span className="text-cyan-600 font-semibold uppercase tracking-wider text-sm">
              Ciencia de Datos
            </span>{" "}
            me aporta una forma distinta de decidir. Analizo información
            para entender qué ocurre realmente y elegir caminos con
            criterio. No se trata de acumular datos, sino de usarlos para
            mejorar procesos y construir soluciones más inteligentes.
          </motion.p>
        </div>

        <AnimatePresence>
          {step === 2 && (
            <motion.div
              key="extra-content"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="overflow-hidden space-y-6"
            >
              <motion.p variants={paragraphReveal} custom={0} initial="hidden" animate="visible">
                Creo profundamente en el{" "}
                <span className="font-semibold text-foreground">aprendizaje constante</span>.
                La tecnología cambia todo el tiempo y eso es parte de lo que hace interesante
                este rubro; para mí, la curiosidad es una herramienta de trabajo fundamental.
              </motion.p>
              <motion.p variants={paragraphReveal} custom={1} initial="hidden" animate="visible">
                Valoro el{" "}
                <span className="font-semibold text-foreground">trabajo en equipo</span> y la
                comunicación clara. Compartir ideas, escuchar otras miradas y construir en
                conjunto suele llevar a resultados más sólidos y completos que el trabajo
                aislado.
              </motion.p>
              <motion.p variants={paragraphReveal} custom={2} initial="hidden" animate="visible">
                Busco que exista un{" "}
                <span className="font-semibold text-foreground">propósito en cada entrega</span>.
                No me interesa hacer cosas por inercia, sino aportar algo concreto: optimizar
                un proceso, mejorar una experiencia o resolver un problema real en el cruce
                entre datos y software.
              </motion.p>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div
          className="pt-4"
          variants={paragraphReveal}
          custom={5}
          initial="hidden"
          animate="visible"
        >
          <AnimatePresence initial={false} mode="wait">
            {step === 1 && (
              <motion.button
                key="show-more"
                onClick={() => setStep(2)}
                className="text-indigo-600 font-semibold hover:underline cursor-pointer"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 6 }}
                transition={{ duration: 0.24, ease: "easeInOut" }}
                whileHover={{ y: -2, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {"Ver más ↓"}
              </motion.button>
            )}
            {step === 2 && (
              <motion.button
                key="show-less"
                onClick={() => {
                  setStep(1);
                  setTimeout(() => window.scrollTo({ top: 0, behavior: "smooth" }), 420);
                }}
                className="text-indigo-600 font-semibold hover:underline cursor-pointer"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 6 }}
                transition={{ duration: 0.24, ease: "easeInOut" }}
                whileHover={{ y: -2, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {"Ver menos ↑"}
              </motion.button>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </motion.section>
  );
}
