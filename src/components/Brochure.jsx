import { useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { motion, useInView } from 'framer-motion'
import { FaDownload, FaFilePdf } from 'react-icons/fa'

export default function Brochure() {
  const { t } = useTranslation()
  const sectionRef = useRef(null)
  const inView = useInView(sectionRef, { once: true, margin: '-80px' })

  return (
    <section id="brochure" ref={sectionRef} className="relative py-12 md:py-16">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          className="relative rounded-2xl overflow-hidden border border-white/15"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ type: 'spring', stiffness: 80, damping: 22 }}
          style={{
            background:
              'linear-gradient(135deg, rgba(12,45,63,0.95) 0%, rgba(10,61,79,0.95) 50%, rgba(14,117,133,0.95) 100%)',
          }}
        >
          <div className="flex flex-col md:flex-row items-center gap-6 md:gap-10 px-6 py-8 md:px-10 md:py-10">
            {/* PDF Icon */}
            <motion.div
              className="flex-shrink-0 w-16 h-16 md:w-20 md:h-20 rounded-xl flex items-center justify-center"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={inView ? { scale: 1, opacity: 1 } : { scale: 0.8, opacity: 0 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
              style={{
                background:
                  'linear-gradient(135deg, rgba(14,165,184,0.35), rgba(45,140,74,0.25))',
                border: '1px solid rgba(255,255,255,0.2)',
              }}
            >
              <FaFilePdf className="text-white" size={28} />
            </motion.div>

            {/* Text */}
            <motion.div
              className="flex-1 text-center md:text-left"
              initial={{ opacity: 0, y: 10 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
              transition={{ delay: 0.3 }}
            >
              <h3 className="font-display text-white text-xl md:text-2xl font-semibold mb-1">
                {t('brochure.title')}
              </h3>
              <p className="font-body text-white/70 text-sm md:text-base max-w-lg">
                {t('brochure.body')}
              </p>
            </motion.div>

            {/* CTA */}
            <motion.a
              href="/brochure-blue-lagoon.pdf"
              download
              className="flex-shrink-0 inline-flex items-center gap-3 bg-gradient-to-r from-tropical to-green-600 text-white px-7 py-3.5 rounded-full text-sm md:text-base font-semibold shadow-lg shadow-tropical/25 hover:shadow-xl hover:shadow-tropical/30 transition-shadow duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-deep-navy"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              initial={{ opacity: 0, x: 20 }}
              animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
              transition={{ delay: 0.4, type: 'spring', stiffness: 200 }}
            >
              <FaDownload size={16} />
              {t('brochure.cta')}
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
