import { useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { motion, useScroll, useTransform, useInView } from 'framer-motion'

const lagoonPhotos = [
  '/fotos/IMG_7553.jpg',
  '/fotos/IMG_7634.jpg',
  '/fotos/IMG_7654.jpg',
  '/fotos/IMG_7701.jpg',
]

const sectionVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: 'easeOut' },
  },
}

const staggerImages = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
}

const imageVariant = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: 'easeOut' },
  },
}

export default function Laguna() {
  const { t } = useTranslation()
  const sectionRef = useRef(null)
  const inView = useInView(sectionRef, { once: true, margin: '-100px' })
  const parallaxRef = useRef(null)

  const { scrollYProgress } = useScroll({
    target: parallaxRef,
    offset: ['start end', 'end start'],
  })
  const parallaxY = useTransform(scrollYProgress, [0, 1], [-60, 60])

  return (
    <section id="la-laguna" className="bg-lagoon py-20 md:py-32 relative overflow-hidden">
      {/* Decorative radial glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full pointer-events-none opacity-20"
        style={{
          background:
            'radial-gradient(circle, rgba(255,255,255,0.15) 0%, transparent 70%)',
        }}
      />

      {/* Dot pattern */}
      <div className="absolute inset-0 bg-dots-light pointer-events-none opacity-40" />

      <div ref={sectionRef} className="max-w-6xl mx-auto px-6 relative z-10">
        <motion.div
          variants={sectionVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          {/* Two-column layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left: text */}
            <div>
              <h2 className="font-display text-white text-4xl md:text-5xl font-bold mb-4">
                {t('laguna.title')}
              </h2>
              <p className="font-display italic text-crystal text-lg md:text-xl mb-6 tracking-wide">
                {t('laguna.highlight')}
              </p>
              <p className="font-body text-white/90 leading-relaxed text-base md:text-lg max-w-md">
                {t('laguna.body')}
              </p>
            </div>

            {/* Right: featured photo with enhanced parallax */}
            <motion.div
              ref={parallaxRef}
              className="relative"
              style={{ y: parallaxY }}
            >
              <img
                src="/fotos/IMG_7553.jpg"
                alt="Laguna cristalina Blue Lagoon"
                className="w-full h-80 md:h-96 object-cover rounded-2xl shadow-2xl shadow-deep-navy/30 border border-white/10"
                loading="lazy"
              />
              {/* Glass-morphism stat badge */}
              <motion.div
                className="absolute -bottom-5 -left-5 rounded-2xl shadow-premium-lg px-6 py-4 border border-white/40"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6, type: 'spring', stiffness: 200 }}
                style={{
                  background: 'rgba(255,255,255,0.9)',
                  backdropFilter: 'blur(12px)',
                  WebkitBackdropFilter: 'blur(12px)',
                }}
              >
                <span className="block font-display text-lagoon text-2xl md:text-3xl font-bold">
                  4 ha
                </span>
                <span className="block font-body text-gray-500 text-xs md:text-sm uppercase tracking-wider">
                  La más grande del portafolio
                </span>
              </motion.div>
            </motion.div>
          </div>

          {/* Photo carousel */}
          <div className="mt-20 relative">
            <div className="flex items-center justify-center gap-4 mb-10">
              <div className="h-px w-12 bg-white/20" />
              <h3 className="font-display text-white/80 text-xl md:text-2xl italic">
                Recorré la laguna
              </h3>
              <div className="h-px w-12 bg-white/20" />
            </div>

            {/* Gradient fades on edges */}
            <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-lagoon via-lagoon/80 to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-lagoon via-lagoon/80 to-transparent z-10 pointer-events-none" />

            <motion.div
              className="flex gap-5 overflow-x-auto pb-6 snap-x snap-mandatory scrollbar-hide px-6"
              variants={staggerImages}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-50px' }}
            >
              {lagoonPhotos.map((photo, index) => (
                <motion.div
                  key={photo}
                  className="flex-shrink-0 w-72 md:w-80 snap-center"
                  variants={imageVariant}
                  whileHover={{ scale: 1.03, y: -4 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <div className="rounded-xl overflow-hidden shadow-lg shadow-deep-navy/20 border border-white/10">
                    <img
                      src={photo}
                      alt={`Laguna Blue Lagoon ${index + 1}`}
                      className="w-full h-48 md:h-56 object-cover"
                      loading="lazy"
                    />
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
