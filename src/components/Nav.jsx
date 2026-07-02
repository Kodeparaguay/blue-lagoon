import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaBars, FaTimes } from 'react-icons/fa'

const links = [
  { label: 'Proyecto', href: '#el-proyecto' },
  { label: 'Laguna', href: '#la-laguna' },
  { label: 'Lifestyle', href: '#lifestyle' },
  { label: 'Deportes', href: '#deportes' },
  { label: 'Brochure', href: '#brochure' },
  { label: 'Galería', href: '#galeria' },
  { label: 'Ubicación', href: '#ubicacion' },
]

const mobileMenuVariants = {
  closed: {
    height: 0,
    opacity: 0,
    transition: { duration: 0.3, ease: 'easeInOut' },
  },
  open: {
    height: 'auto',
    opacity: 1,
    transition: { duration: 0.4, ease: 'easeOut' },
  },
}

const mobileItemVariants = {
  closed: { opacity: 0, x: -20 },
  open: (i) => ({
    opacity: 1,
    x: 0,
    transition: { delay: 0.1 + i * 0.05, duration: 0.3 },
  }),
}

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('')

  useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const sectionIds = links.map((l) => l.href.replace('#', ''))
    const observers = []

    sectionIds.forEach((id) => {
      const el = document.getElementById(id)
      if (!el) return
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveSection(id)
          }
        },
        { threshold: 0.2, rootMargin: '-80px 0px -60% 0px' }
      )
      observer.observe(el)
      observers.push(observer)
    })

    return () => observers.forEach((o) => o.disconnect())
  }, [])

  function handleLinkClick() {
    setMenuOpen(false)
  }

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-lagoon/90 backdrop-blur-xl shadow-lg shadow-lagoon/15 border-b border-white/10'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16 md:h-[4.5rem]">
        <a href="#" className="flex-shrink-0">
          <img
            src="/logos/png white-11.png"
            alt="Blue Lagoon"
            className="h-11 md:h-[3.25rem] w-auto"
          />
        </a>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-6 lg:gap-8">
          {links.map((link) => {
            const sectionId = link.href.replace('#', '')
            const isActive = activeSection === sectionId
            return (
              <li key={link.href} className="relative">
                <a
                  href={link.href}
                  className={`text-sm lg:text-base font-medium tracking-wide transition-colors duration-300 ${
                    isActive
                      ? 'text-white'
                      : 'text-white/75 hover:text-white'
                  }`}
                  aria-label={`Ir a ${link.label}`}
                >
                  {link.label}
                  {/* Active indicator dot */}
                  {isActive && (
                    <motion.span
                      className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-white"
                      layoutId="navDot"
                      transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                    />
                  )}
                </a>
              </li>
            )
          })}
        </ul>

        {/* Hamburger button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden p-2 text-white rounded-lg hover:bg-white/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
          aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
        >
          {menuOpen ? <FaTimes size={22} /> : <FaBars size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className={`md:hidden overflow-hidden ${
              scrolled ? 'bg-lagoon/95 backdrop-blur-xl' : 'bg-lagoon/90 backdrop-blur-xl'
            }`}
            variants={mobileMenuVariants}
            initial="closed"
            animate="open"
            exit="closed"
          >
            <ul className="px-6 pb-6 space-y-4">
              {links.map((link, i) => (
                <motion.li
                  key={link.href}
                  variants={mobileItemVariants}
                  initial="closed"
                  animate="open"
                  exit="closed"
                  custom={i}
                >
                  <a
                    href={link.href}
                    onClick={handleLinkClick}
                    className="block text-white/85 hover:text-white text-base font-medium tracking-wide transition-colors py-1"
                  >
                    {link.label}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
