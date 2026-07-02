import { useCallback, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaTimes, FaChevronLeft, FaChevronRight } from 'react-icons/fa'

const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.3 } },
  exit: { opacity: 0, transition: { duration: 0.2 } },
}

const imageWrapperVariants = {
  hidden: { opacity: 0, scale: 0.93 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.35, ease: 'easeOut' },
  },
  exit: {
    opacity: 0,
    scale: 0.93,
    transition: { duration: 0.2 },
  },
}

export default function Lightbox({ images, currentIndex, onClose, onPrev, onNext, onGoTo }) {
  const handleBackdropClick = useCallback(
    (e) => {
      if (e.target === e.currentTarget) onClose()
    },
    [onClose]
  )

  // Keyboard support
  useEffect(() => {
    function handleKeyDown(e) {
      switch (e.key) {
        case 'Escape':
          onClose()
          break
        case 'ArrowLeft':
          onPrev()
          break
        case 'ArrowRight':
          onNext()
          break
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    // Prevent body scroll when lightbox is open
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = prevOverflow
    }
  }, [onClose, onPrev, onNext])

  if (images.length === 0) return null

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center"
        style={{
          background: 'rgba(0, 0, 0, 0.92)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
        }}
        variants={backdropVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        onClick={handleBackdropClick}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-white/70 hover:text-white transition z-10 p-2.5 rounded-full hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
          aria-label="Cerrar"
        >
          <FaTimes size={22} />
        </button>

        {/* Prev button */}
        {images.length > 1 && (
          <motion.button
            onClick={(e) => {
              e.stopPropagation()
              onPrev()
            }}
            className="absolute left-4 md:left-8 z-10 p-3 rounded-full text-white/70 hover:text-white hover:bg-white/10 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
            aria-label="Anterior"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <FaChevronLeft size={26} />
          </motion.button>
        )}

        {/* Image container */}
        <motion.div
          key={currentIndex}
          className="relative max-h-[85vh] max-w-[90vw] flex items-center justify-center"
          variants={imageWrapperVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <img
            src={images[currentIndex]}
            alt={`Foto ${currentIndex + 1} de ${images.length}`}
            className="max-h-[85vh] max-w-[90vw] object-contain rounded-lg shadow-2xl"
          />
        </motion.div>

        {/* Next button */}
        {images.length > 1 && (
          <motion.button
            onClick={(e) => {
              e.stopPropagation()
              onNext()
            }}
            className="absolute right-4 md:right-8 z-10 p-3 rounded-full text-white/70 hover:text-white hover:bg-white/10 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
            aria-label="Siguiente"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <FaChevronRight size={26} />
          </motion.button>
        )}

        {/* Navigation dots */}
        {images.length > 1 && (
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-3">
            <div className="flex items-center gap-2">
              {images.map((_, i) => (
                <button
                  key={i}
                  onClick={(e) => {
                    e.stopPropagation()
                    if (onGoTo) onGoTo(i)
                  }}
                  className={`rounded-full transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 ${
                    i === currentIndex
                      ? 'w-3 h-3 bg-white'
                      : 'w-2 h-2 bg-white/30 hover:bg-white/60'
                  }`}
                  aria-label={`Ir a foto ${i + 1}`}
                />
              ))}
            </div>
          </div>
        )}

        {/* Counter */}
        <div className="absolute top-6 left-6 text-white/50 text-sm font-body tracking-wider">
          {currentIndex + 1} <span className="text-white/30">/</span> {images.length}
        </div>
      </motion.div>
    </AnimatePresence>
  )
}
