import { useEffect } from 'react'
import { motion, useInView, useMotionValue, useTransform, animate } from 'framer-motion'
import { useRef } from 'react'
import { FaExpand } from 'react-icons/fa'

const stats = [
  { number: 86, suffix: ' ha', label: 'desarrollo', prefix: '' },
  { number: 493, suffix: '', label: 'lotes', prefix: '' },
  { number: 4, suffix: ' ha', label: 'laguna cristalina', prefix: '' },
  { number: null, text: 'Frontera', label: 'con Brasil', prefix: '' },
]

function AnimatedCounter({ from = 0, to, duration = 2, suffix = '', prefix = '' }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-50px' })
  const count = useMotionValue(from)
  const rounded = useTransform(count, (v) => Math.round(v))

  useEffect(() => {
    if (inView && to !== null) {
      const controls = animate(count, to, { duration, ease: 'easeOut' })
      return controls.stop
    }
  }, [inView, to, count, duration])

  return (
    <span ref={ref}>
      {prefix}
      <motion.span>{rounded}</motion.span>
      {suffix}
    </span>
  )
}

const sectionVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: 'easeOut' },
  },
}

export default function Proyecto() {
  const sectionRef = useRef(null)
  const inView = useInView(sectionRef, { once: true, margin: '-100px' })

  return (
    <section id="el-proyecto" className="bg-crystal py-20 md:py-32 relative overflow-hidden">
      {/* Subtle grid pattern */}
      <div className="absolute inset-0 bg-grid pointer-events-none" />

      <div ref={sectionRef} className="max-w-6xl mx-auto px-6 relative z-10">
        <motion.div
          variants={sectionVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          {/* Section header with decorative element */}
          <div className="text-center mb-4">
            <div className="inline-block w-16 h-0.5 bg-gradient-to-r from-transparent via-lagoon to-transparent mb-6" />
            <h2 className="font-display text-lagoon text-4xl md:text-5xl font-bold mb-8">
              Blue Lagoon
            </h2>
          </div>

          <p className="font-body text-gray-700 leading-relaxed text-base md:text-lg max-w-4xl mx-auto text-center space-y-4">
            <span className="block">
              Una experiencia residencial única donde la naturaleza, el diseño y el
              bienestar se integran para crear un estilo de vida incomparable.
            </span>
            <span className="block mt-4 border-l-4 border-lagoon/30 pl-4 md:pl-6 text-left inline-block">
              Ubicado en Pedro Juan Caballero, en una posición estratégica sobre la
              frontera con Brasil, Blue Lagoon es un desarrollo residencial premium
              concebido para quienes buscan exclusividad, privacidad y una inversión
              con alto potencial de valorización. Con 86 hectáreas de desarrollo
              planificado y 493 lotes, el proyecto combina una impresionante laguna
              cristalina de 4 hectáreas, playas de arena blanca, infraestructura de
              primer nivel y una selección de amenities diseñadas para elevar cada
              momento.
            </span>
          </p>

          {/* Stats grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 mt-16">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                className="relative bg-white/90 backdrop-blur-sm rounded-2xl p-6 md:p-8 text-center overflow-hidden group"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 + i * 0.1, duration: 0.6, ease: 'easeOut' }}
                whileHover={{ y: -6, scale: 1.03 }}
              >
                {/* Subtle geometric pattern in background */}
                <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-dots rounded-2xl" />

                {/* Gradient border top */}
                <div
                  className="absolute top-0 left-1/2 -translate-x-1/2 w-12 h-0.5 rounded-full"
                  style={{
                    background: 'linear-gradient(to right, transparent, #0EA5B8, transparent)',
                  }}
                />

                <div className="relative z-10">
                  <div className="font-display text-lagoon text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight leading-tight">
                    {stat.number !== null ? (
                      <AnimatedCounter
                        to={stat.number}
                        suffix={stat.suffix}
                        duration={2}
                      />
                    ) : (
                      <span className="text-2xl md:text-3xl lg:text-4xl">{stat.text}</span>
                    )}
                  </div>
                  <div className="font-body text-gray-500 uppercase tracking-widest text-xs md:text-sm mt-2">
                    {stat.label}
                  </div>
                </div>

                {/* Hover glow */}
                <div
                  className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{
                    boxShadow: 'inset 0 0 30px rgba(14,165,184,0.08)',
                  }}
                />
              </motion.div>
            ))}
          </div>

          {/* Masterplan section */}
          <motion.div
            className="mt-20 relative rounded-2xl overflow-hidden group"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.7 }}
          >
            <img
              src="/masterplan/masterplan-principal.webp"
              alt="Masterplan Blue Lagoon"
              className="w-full h-72 md:h-[30rem] object-contain bg-white/50 backdrop-blur-sm rounded-2xl shadow-premium-lg border border-white/50"
              loading="lazy"
            />

            {/* Glass hover panel */}
            <div className="absolute inset-0 rounded-2xl flex items-end justify-center pb-8 opacity-0 group-hover:opacity-100 transition-all duration-500 pointer-events-none">
              <div
                className="pointer-events-auto rounded-2xl px-8 py-4 mx-auto flex items-center gap-3 shadow-premium-lg"
                style={{
                  background: 'rgba(255,255,255,0.85)',
                  backdropFilter: 'blur(16px)',
                  WebkitBackdropFilter: 'blur(16px)',
                  border: '1px solid rgba(255,255,255,0.8)',
                }}
              >
                <span className="font-display text-deep-navy font-semibold text-base">
                  Masterplan Blue Lagoon
                </span>
                <motion.a
                  href="/masterplan/masterplan-principal.webp"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-lagoon text-white px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-lagoon/90 transition-colors shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lagoon focus-visible:ring-offset-2"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.97 }}
                  aria-label="Ver Masterplan en tamaño completo"
                >
                  <FaExpand size={14} />
                  Ver Completo
                </motion.a>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
