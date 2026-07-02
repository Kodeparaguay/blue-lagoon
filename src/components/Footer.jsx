import { motion } from 'framer-motion'
import { FaInstagram, FaFacebook, FaWhatsapp, FaDownload } from 'react-icons/fa'

const links = [
  { label: 'Proyecto', href: '#el-proyecto' },
  { label: 'Laguna', href: '#la-laguna' },
  { label: 'Lifestyle', href: '#lifestyle' },
  { label: 'Deportes', href: '#deportes' },
  { label: 'Brochure', href: '#brochure' },
  { label: 'Galería', href: '#galeria' },
  { label: 'Ubicación', href: '#ubicacion' },
]

const socialLinks = [
  { Icon: FaInstagram, href: '#', label: 'Instagram' },
  { Icon: FaFacebook, href: '#', label: 'Facebook' },
  { Icon: FaWhatsapp, href: '#', label: 'WhatsApp' },
]

const linkVariants = {
  initial: { width: '0%' },
  hover: { width: '100%', transition: { duration: 0.3, ease: 'easeOut' } },
}

export default function Footer() {
  return (
    <footer className="bg-deep-navy pt-20 md:pt-24 relative">
      {/* Wave divider at top */}
      <div className="absolute top-0 left-0 w-full overflow-hidden leading-[0] -translate-y-[99%]">
        <svg
          viewBox="0 0 1440 120"
          className="w-full h-16 md:h-24"
          preserveAspectRatio="none"
        >
          <path
            d="M0,60L60,55C120,50,240,40,360,42C480,44,600,58,720,60C840,62,960,52,1080,46C1200,40,1320,38,1380,37L1440,36L1440,120L1380,120C1320,120,1200,120,1080,120C960,120,840,120,720,120C600,120,480,120,360,120C240,120,120,120,60,120L0,120Z"
            fill="currentColor"
            className="text-deep-navy"
          />
        </svg>
      </div>

      {/* Top gradient accent line */}
      <div
        className="absolute top-0 left-0 w-full h-0.5"
        style={{
          background: 'linear-gradient(to right, #0EA5B8, #2D8C4A, transparent)',
        }}
      />

      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center">
          <img
            src="/logos/png white-11.png"
            alt="Blue Lagoon"
            className="max-w-[200px] md:max-w-[240px] mx-auto mb-4"
          />

          <p className="font-display italic text-crystal mb-8 text-lg md:text-xl tracking-wide">
            Momentos Únicos
          </p>

          {/* Division line */}
          <div className="w-16 h-px bg-white/15 mx-auto mb-8" />

          {/* Social media */}
          <div className="flex justify-center gap-3 mb-10">
            {socialLinks.map((social) => (
              <motion.a
                key={social.label}
                href={social.href}
                className="text-white/40 hover:text-white transition-colors duration-300 p-2.5 rounded-full hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lagoon"
                aria-label={social.label}
                onClick={(e) => e.preventDefault()}
                whileHover={{ scale: 1.15 }}
                whileTap={{ scale: 0.95 }}
              >
                <social.Icon size={20} />
              </motion.a>
            ))}
          </div>

          {/* Navigation links */}
          <nav className="flex flex-wrap justify-center gap-3 mb-10">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="relative text-white/60 hover:text-white transition-colors px-3 py-1.5 text-sm md:text-base font-body group"
              >
                {link.label}
                <motion.span
                  className="absolute bottom-0 left-0 h-px bg-lagoon"
                  variants={linkVariants}
                  initial="initial"
                  whileHover="hover"
                />
              </a>
            ))}
          </nav>

          {/* Secondary brochure button */}
          <div className="mb-10">
            <motion.a
              href="/brochure-blue-lagoon.pdf"
              download
              className="inline-flex items-center gap-2.5 text-white/60 hover:text-white border border-white/15 hover:border-lagoon/50 px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lagoon"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              <FaDownload size={14} />
              Descargar Brochure
            </motion.a>
          </div>

          <div className="border-t border-white/10 my-6 max-w-xs mx-auto" />

          <p className="text-white/40 text-sm font-body pb-8 tracking-wide">
            &copy; 2026 Blue Lagoon. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  )
}
