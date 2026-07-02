import { useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { FaChevronDown, FaArrowRight } from 'react-icons/fa'

const staggerChildren = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2,
    },
  },
}

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: 'easeOut' },
  },
}

export default function Hero() {
  const { t } = useTranslation()
  const videoRef = useRef(null)

  function handleVideoError() {
    if (videoRef.current) {
      videoRef.current.src = '/videos/Reel 7 - Playa_V2.mp4'
      videoRef.current.load()
    }
  }

  return (
    <section className="relative h-screen overflow-hidden">
      {/* Video background */}
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        onError={handleVideoError}
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source
          src="/videos/Video 2 - Blue lagoon.mp4"
          type="video/mp4"
        />
      </video>

      {/* Gradient overlay with vignette + light rays */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse at center, transparent 35%, rgba(12, 45, 63, 0.65) 100%),
            linear-gradient(to bottom, rgba(12, 45, 63, 0.5) 0%, rgba(14, 165, 184, 0.25) 50%, rgba(12, 45, 63, 0.55) 100%)
          `,
        }}
      />

      {/* Light rays effect */}
      <div
        className="absolute inset-0 opacity-[0.12] pointer-events-none"
        style={{
          background: `
            conic-gradient(
              from 180deg at 50% 40%,
              transparent 0deg,
              transparent 20deg,
              rgba(255,255,255,0.15) 22deg,
              transparent 25deg,
              transparent 50deg,
              rgba(255,255,255,0.08) 52deg,
              transparent 55deg,
              transparent 80deg,
              transparent 120deg,
              rgba(255,255,255,0.15) 122deg,
              transparent 125deg,
              transparent 200deg,
              transparent 290deg,
              rgba(255,255,255,0.08) 292deg,
              transparent 295deg,
              transparent 340deg,
              transparent 360deg
            )
          `,
        }}
      />

      {/* Animated floating orbs */}
      <motion.div
        className="absolute w-[400px] h-[400px] rounded-full pointer-events-none"
        style={{
          background:
            'radial-gradient(circle, rgba(14,165,184,0.18) 0%, transparent 70%)',
          left: '10%',
          top: '20%',
          filter: 'blur(60px)',
        }}
        animate={{
          x: [0, 30, -20, 15, 0],
          y: [0, -30, -10, 20, 0],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: 'linear',
        }}
      />
      <motion.div
        className="absolute w-[300px] h-[300px] rounded-full pointer-events-none"
        style={{
          background:
            'radial-gradient(circle, rgba(45,140,74,0.14) 0%, transparent 70%)',
          right: '15%',
          bottom: '25%',
          filter: 'blur(50px)',
        }}
        animate={{
          x: [0, -25, 15, -10, 0],
          y: [0, 20, -15, -5, 0],
        }}
        transition={{
          duration: 14,
          repeat: Infinity,
          ease: 'linear',
        }}
      />
      <motion.div
        className="absolute w-[200px] h-[200px] rounded-full pointer-events-none"
        style={{
          background:
            'radial-gradient(circle, rgba(14,165,184,0.12) 0%, transparent 70%)',
          left: '50%',
          top: '60%',
          filter: 'blur(40px)',
        }}
        animate={{
          x: [0, 40, -30, 10, 0],
          y: [0, -15, -25, 5, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'linear',
        }}
      />

      {/* Content */}
      <motion.div
        className="relative z-10 h-full flex flex-col items-center justify-center px-4 text-center"
        variants={staggerChildren}
        initial="hidden"
        animate="visible"
      >
        <motion.img
          src="/logos/png white-11.png"
          alt="Blue Lagoon"
          className="max-w-[200px] md:max-w-[220px] mx-auto mb-6"
          variants={fadeUp}
        />

        <motion.h1
          className="font-display text-white text-6xl sm:text-7xl md:text-8xl font-bold mb-4 tracking-tight"
          variants={fadeUp}
        >
          {t('hero.title')}
        </motion.h1>

        <motion.p
          className="font-display italic text-crystal text-lg sm:text-xl md:text-2xl mb-10 tracking-wide"
          variants={fadeUp}
        >
          {t('brand.slogan')}
        </motion.p>

        <motion.a
          href="#el-proyecto"
          className="relative inline-flex items-center gap-3 bg-gradient-to-r from-tropical to-green-600 text-white px-9 py-[1.125rem] rounded-full text-lg font-semibold shadow-lg shadow-tropical/30 hover:shadow-xl hover:shadow-tropical/40 transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-lagoon"
          variants={fadeUp}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
          aria-label={t('hero.cta')}
        >
          {t('hero.cta')}
          <FaArrowRight size={16} />
        </motion.a>
      </motion.div>

      {/* Scroll-down indicator with ring */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.6 }}
      >
        {/* Subtle ring */}
        <div className="absolute inset-x-0 -inset-y-3 rounded-full border border-white/10" />
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <FaChevronDown className="text-white/60 text-xl" aria-hidden="true" />
        </motion.div>
      </motion.div>
    </section>
  )
}
