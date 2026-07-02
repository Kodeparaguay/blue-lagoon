import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { FaUmbrellaBeach, FaCocktail, FaBuilding, FaLeaf, FaUsers, FaSwimmer } from 'react-icons/fa'

const amenities = [
  { Icon: FaUmbrellaBeach, text: 'Playa de arena blanca' },
  { Icon: FaCocktail, text: 'Bar de playa' },
  { Icon: FaBuilding, text: 'Club House' },
  { Icon: FaLeaf, text: 'Áreas de descanso y recreación' },
  { Icon: FaUsers, text: 'Espacios para disfrutar en familia' },
  { Icon: FaSwimmer, text: 'Piscina' },
]

const sectionVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: 'easeOut' },
  },
}

const staggerCards = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const cardVariant = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' },
  },
}

function WaveDivider() {
  return (
    <div className="relative bg-sand">
      <div className="absolute top-0 left-0 w-full overflow-hidden leading-[0] -translate-y-full">
        <svg
          viewBox="0 0 1440 100"
          className="w-full h-12 md:h-20"
          preserveAspectRatio="none"
        >
          <path
            d="M0,64L48,58C96,53,192,43,288,48C384,53,480,75,576,80C672,85,768,75,864,64C960,53,1056,43,1152,42C1248,42,1344,53,1392,58L1440,64L1440,100L1392,100C1344,100,1248,100,1152,100C1056,100,960,100,864,100C768,100,672,100,576,100C480,100,384,100,288,100C192,100,96,100,48,100L0,100Z"
            fill="currentColor"
            className="text-sand"
          />
        </svg>
      </div>
    </div>
  )
}

export default function Lifestyle() {
  const sectionRef = useRef(null)
  const inView = useInView(sectionRef, { once: true, margin: '-100px' })

  return (
    <>
      <WaveDivider />
      <section id="lifestyle" className="bg-sand py-20 md:py-32 relative overflow-hidden">
        {/* Subtle radial glow in the center */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none opacity-30"
          style={{
            background:
              'radial-gradient(circle, rgba(14,165,184,0.06) 0%, transparent 70%)',
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
              Lifestyle & Bienestar
            </h2>
            <p className="font-body text-gray-500 text-lg text-center mb-14 tracking-wide">
              Espacios diseñados para el disfrute diario.
            </p>

            {/* Premium amenity cards */}
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6"
              variants={staggerCards}
              initial="hidden"
              animate={inView ? 'visible' : 'hidden'}
            >
              {amenities.map((amenity) => (
                <motion.div
                  key={amenity.text}
                  className="relative rounded-2xl p-6 md:p-8 flex items-center gap-5 group cursor-default"
                  variants={cardVariant}
                  whileHover={{ y: -8, scale: 1.02 }}
                  transition={{ type: 'spring', stiffness: 250, damping: 20 }}
                  style={{
                    background: 'rgba(255,255,255,0.9)',
                    backdropFilter: 'blur(16px)',
                    WebkitBackdropFilter: 'blur(16px)',
                    border: '1px solid rgba(255,255,255,0.7)',
                  }}
                >
                  {/* Gradient border via pseudo-element style — using inset box-shadow for effect */}
                  <div
                    className="absolute inset-0 rounded-2xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{
                      background:
                        'linear-gradient(135deg, rgba(14,165,184,0.15), rgba(45,140,74,0.1), transparent)',
                      borderRadius: '1rem',
                    }}
                  />

                  {/* Colored shadow on hover */}
                  <div
                    className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10"
                    style={{
                      boxShadow:
                        '0 8px 32px rgba(14,165,184,0.2), 0 2px 8px rgba(14,165,184,0.1)',
                    }}
                  />

                  {/* Icon container with gradient */}
                  <div
                    className="rounded-xl p-3.5 flex-shrink-0"
                    style={{
                      background:
                        'linear-gradient(135deg, rgba(14,165,184,0.15), rgba(14,165,184,0.08))',
                      border: '1px solid rgba(14,165,184,0.12)',
                    }}
                  >
                    <amenity.Icon className="text-lagoon" size={26} aria-hidden="true" />
                  </div>

                  <div className="relative z-10">
                    <span className="font-body text-gray-800 text-base md:text-lg font-medium leading-snug">
                      {amenity.text}
                    </span>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Social/beach photo */}
          <motion.div
            className="mt-16 max-w-5xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="rounded-2xl overflow-hidden shadow-premium-lg border border-white/50">
              <img
                src="/fotos/IMG_7571.jpg"
                alt="Espacios de bienestar Blue Lagoon"
                className="w-full h-64 md:h-80 object-cover"
                loading="lazy"
              />
            </div>
          </motion.div>
        </div>
      </section>
    </>
  )
}
