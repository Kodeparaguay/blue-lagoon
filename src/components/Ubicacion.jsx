import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { FaMapMarkerAlt, FaFlag, FaChartLine } from 'react-icons/fa'

const badges = [
  { text: 'Ubicación estratégica', Icon: FaMapMarkerAlt },
  { text: 'Frontera con Brasil', Icon: FaFlag },
  { text: 'Alto potencial de valorización', Icon: FaChartLine },
]

const sectionVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: 'easeOut' },
  },
}

export default function Ubicacion() {
  const sectionRef = useRef(null)
  const inView = useInView(sectionRef, { once: true, margin: '-100px' })

  return (
    <section id="ubicacion" className="bg-sand py-20 md:py-32 relative overflow-hidden">
      {/* Subtle radial glow */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[700px] h-[300px] rounded-full pointer-events-none opacity-20"
        style={{
          background:
            'radial-gradient(ellipse at center, rgba(14,165,184,0.08) 0%, transparent 70%)',
        }}
      />

      <div ref={sectionRef} className="max-w-6xl mx-auto px-6 relative z-10">
        <motion.div
          variants={sectionVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          <div className="inline-block w-16 h-0.5 bg-gradient-to-r from-transparent via-lagoon to-transparent mb-6 mx-auto block" />
          <h2 className="font-display text-lagoon text-4xl md:text-5xl font-bold text-center mb-4">
            Ubicación
          </h2>
          <p className="font-body font-semibold text-deep-navy text-lg md:text-xl text-center tracking-widest mb-4">
            PEDRO JUAN CABALLERO · FRONTERA CON BRASIL
          </p>
          <p className="font-body text-gray-500 text-center max-w-2xl mx-auto mb-14">
            Una ubicación estratégica sobre la frontera con Brasil, con alto
            potencial de valorización inmobiliaria.
          </p>

          {/* Two-column layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
            {/* Left: info + badges */}
            <div className="flex flex-col justify-center">
              <div className="space-y-6 mb-8">
                <div className="flex items-start gap-4">
                  <div
                    className="rounded-xl p-2.5 flex-shrink-0 mt-0.5"
                    style={{
                      background:
                        'linear-gradient(135deg, rgba(14,165,184,0.15), rgba(14,165,184,0.06))',
                      border: '1px solid rgba(14,165,184,0.12)',
                    }}
                  >
                    <FaMapMarkerAlt className="text-lagoon" size={22} />
                  </div>
                  <div>
                    <h3 className="font-display text-deep-navy text-lg font-semibold mb-1">
                      Pedro Juan Caballero
                    </h3>
                    <p className="font-body text-gray-600 text-sm leading-relaxed">
                      Departamento de Amambay, Paraguay. Una ciudad en pleno
                      crecimiento con acceso directo a Brasil y una economía
                      dinámica impulsada por el comercio fronterizo.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div
                    className="rounded-xl p-2.5 flex-shrink-0 mt-0.5"
                    style={{
                      background:
                        'linear-gradient(135deg, rgba(14,165,184,0.15), rgba(14,165,184,0.06))',
                      border: '1px solid rgba(14,165,184,0.12)',
                    }}
                  >
                    <FaFlag className="text-lagoon" size={22} />
                  </div>
                  <div>
                    <h3 className="font-display text-deep-navy text-lg font-semibold mb-1">
                      Doble Nacionalidad
                    </h3>
                    <p className="font-body text-gray-600 text-sm leading-relaxed">
                      Sobre la frontera exacta con Ponta Porã, Brasil. Dos países,
                      dos mercados, infinitas posibilidades.
                    </p>
                  </div>
                </div>
              </div>

              {/* Premium gradient badges */}
              <div className="flex flex-wrap gap-3">
                {badges.map((badge) => (
                  <motion.span
                    key={badge.text}
                    className="inline-flex items-center gap-2.5 px-5 py-3 rounded-full font-semibold text-sm md:text-base font-body shadow-sm"
                    style={{
                      background:
                        'linear-gradient(135deg, rgba(14,165,184,0.12), rgba(45,140,74,0.08))',
                      border: '1px solid rgba(14,165,184,0.15)',
                      color: '#0C2D3F',
                    }}
                    whileHover={{ scale: 1.05, y: -2 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                  >
                    <badge.Icon
                      className="text-lagoon"
                      size={16}
                      aria-hidden="true"
                    />
                    {badge.text}
                  </motion.span>
                ))}
              </div>
            </div>

            {/* Right: map */}
            <div className="relative">
              <div className="rounded-2xl overflow-hidden shadow-premium-lg border-2 border-white/60">
                <iframe
                  src="https://maps.google.com/maps?q=-22.5890232,-55.6890723&z=15&output=embed"
                  width="100%"
                  height="420"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Ubicación Blue Lagoon"
                  className="block"
                />
              </div>
              {/* Premium glass overlay card */}
              <div
                className="absolute bottom-6 left-6 right-6 rounded-xl p-4 shadow-premium-lg border border-white/50"
                style={{
                  background: 'rgba(255,255,255,0.9)',
                  backdropFilter: 'blur(16px)',
                  WebkitBackdropFilter: 'blur(16px)',
                }}
              >
                <div className="flex items-center gap-3">
                  <div
                    className="rounded-full p-2 flex-shrink-0"
                    style={{
                      background:
                        'linear-gradient(135deg, #0EA5B8, #15B8C9)',
                    }}
                  >
                    <FaMapMarkerAlt className="text-white" size={16} />
                  </div>
                  <div>
                    <p className="font-display text-deep-navy text-sm font-semibold">
                      Pedro Juan Caballero, Amambay
                    </p>
                    <p className="font-body text-gray-500 text-xs">
                      Frontera con Ponta Porã, Brasil
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
