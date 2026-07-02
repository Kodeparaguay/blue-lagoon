import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Routes, Route } from 'react-router-dom'
import { FaArrowUp } from 'react-icons/fa'
import Nav from './components/Nav'
import Hero from './components/Hero'
import Proyecto from './components/Proyecto'
import Laguna from './components/Laguna'
import Lifestyle from './components/Lifestyle'
import Deportes from './components/Deportes'
import Brochure from './components/Brochure'
import Noticias from './components/Noticias'
import Galeria from './components/Galeria'
import Ubicacion from './components/Ubicacion'
import Footer from './components/Footer'
import NoticiaDetallePage from './components/NoticiaDetallePage'

function BackToTop() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    function handleScroll() {
      setVisible(window.scrollY > 500)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-40 bg-lagoon text-white p-3.5 rounded-full shadow-xl cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lagoon focus-visible:ring-offset-2 focus-visible:ring-offset-white"
          initial={{ opacity: 0, scale: 0.3, y: 20 }}
          animate={{
            opacity: 1,
            scale: 1,
            y: 0,
            boxShadow: '0 8px 32px rgba(14, 165, 184, 0.4)',
          }}
          exit={{ opacity: 0, scale: 0.3, y: 20 }}
          whileHover={{
            scale: 1.12,
            boxShadow: '0 12px 40px rgba(14, 165, 184, 0.55)',
          }}
          whileTap={{ scale: 0.9 }}
          transition={{ type: 'spring', stiffness: 260, damping: 20 }}
          aria-label="Volver arriba"
        >
          <FaArrowUp size={18} />
        </motion.button>
      )}
    </AnimatePresence>
  )
}

function LandingPage() {
  return (
    <>
      <Hero />
      <Proyecto />
      <Laguna />
      <Lifestyle />
      <Deportes />
      <Brochure />
      <Noticias />
      <Galeria />
      <Ubicacion />
    </>
  )
}

function App() {
  return (
    <>
      <Nav />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/noticias/:id" element={<NoticiaDetallePage />} />
      </Routes>
      <Footer />
      <BackToTop />
    </>
  )
}

export default App
