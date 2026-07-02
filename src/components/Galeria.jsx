import { useState, useCallback } from 'react'
import { motion } from 'framer-motion'
import Lightbox from './Lightbox'

// Filtered non-x variants only
const galleryPhotos = [
  '/fotos/IMG_7553.jpg',
  '/fotos/IMG_7571.jpg',
  '/fotos/IMG_7634.jpg',
  '/fotos/IMG_7654.jpg',
  '/fotos/IMG_7667.jpg',
  '/fotos/IMG_7701.jpg',
  '/fotos/IMG_7739.jpg',
  '/fotos/IMG_7786.jpg',
  '/fotos/IMG_7938.jpg',
  '/fotos/IMG_8057.jpg',
  '/fotos/IMG_8071.jpg',
  '/fotos/IMG_8085.jpg',
  '/fotos/IMG_8098.jpg',
  '/fotos/IMG_8237.jpg',
  '/fotos/IMG_8293.jpg',
  '/fotos/IMG_8459.jpg',
  '/fotos/IMG_8685.jpg',
  '/fotos/IMG_8774.jpg',
  '/fotos/IMG_8899.jpg',
  '/fotos/IMG_8949.jpg',
]

function shuffleArray(arr) {
  const shuffled = [...arr]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}

const staggerImages = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.06,
    },
  },
}

const imageVariant = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: 'easeOut' },
  },
}

export default function Galeria() {
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)

  const [photos] = useState(() => shuffleArray(galleryPhotos))

  const openLightbox = useCallback((index) => {
    setCurrentIndex(index)
    setLightboxOpen(true)
  }, [])

  const closeLightbox = useCallback(() => {
    setLightboxOpen(false)
  }, [])

  const goToPrev = useCallback(() => {
    setCurrentIndex((prev) => (prev === 0 ? photos.length - 1 : prev - 1))
  }, [photos.length])

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev === photos.length - 1 ? 0 : prev + 1))
  }, [photos.length])

  const goToIndex = useCallback((index) => {
    setCurrentIndex(index)
  }, [])

  return (
    <section id="galeria" className="bg-lagoon py-20 md:py-32 relative overflow-hidden">
      {/* Decorative radial glow */}
      <div
        className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full pointer-events-none opacity-15"
        style={{
          background:
            'radial-gradient(circle, rgba(255,255,255,0.15) 0%, transparent 70%)',
          transform: 'translate(30%, -30%)',
        }}
      />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <div className="flex items-center justify-center gap-4 mb-14">
          <div className="h-px w-12 bg-white/20" />
          <h2 className="font-display text-white text-4xl md:text-5xl font-bold text-center">
            Galería
          </h2>
          <div className="h-px w-12 bg-white/20" />
        </div>

        {/* Masonry grid */}
        <motion.div
          className="columns-1 sm:columns-2 lg:columns-3 gap-5"
          variants={staggerImages}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
        >
          {photos.map((photo, index) => (
            <motion.div
              key={photo}
              className="mb-5 break-inside-avoid rounded-xl overflow-hidden cursor-pointer group relative"
              variants={imageVariant}
              onClick={() => openLightbox(index)}
              whileHover={{ scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 300 }}
              role="button"
              tabIndex={0}
              aria-label={`Ver foto ${index + 1} de la galería`}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault()
                  openLightbox(index)
                }
              }}
              style={{
                border: '1px solid rgba(255,255,255,0.12)',
              }}
            >
              {/* Skeleton shimmer */}
              <div className="absolute inset-0 bg-gradient-to-br from-lagoon/40 to-lagoon/20 animate-pulse" />
              <img
                src={photo}
                alt={`Blue Lagoon galería ${index + 1}`}
                className="w-full h-auto object-cover relative z-10 transition-all duration-500 group-hover:brightness-110 group-hover:scale-105"
                loading="lazy"
              />
              {/* Hover overlay with subtle magnification hint */}
              <div className="absolute inset-0 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none"
                style={{
                  background:
                    'linear-gradient(to top, rgba(12,45,63,0.3) 0%, transparent 40%)',
                }}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Lightbox */}
      {lightboxOpen && (
        <Lightbox
          images={photos}
          currentIndex={currentIndex}
          onClose={closeLightbox}
          onPrev={goToPrev}
          onNext={goToNext}
          onGoTo={goToIndex}
        />
      )}
    </section>
  )
}
