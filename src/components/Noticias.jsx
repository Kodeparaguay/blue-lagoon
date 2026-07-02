import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

const API_BASE = import.meta.env.VITE_API_BASE || ''

function imgSrc(path) {
  if (!path) return ''
  if (path.startsWith('http')) return path
  return API_BASE + (path.startsWith('/') ? path : '/uploads/' + path)
}

function formatDate(dateStr, locale) {
  try {
    return new Date(dateStr).toLocaleDateString(locale, {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  } catch {
    return dateStr
  }
}

const cardVariant = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: 'easeOut' },
  }),
}

export default function Noticias() {
  const { t, i18n } = useTranslation()
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    let cancelled = false
    setLoading(true)
    setError(false)

    fetch(`${API_BASE}/api/posts?siteId=4&lang=${i18n.language}&limit=3`)
      .then((res) => {
        if (!res.ok) throw new Error('Failed')
        return res.json()
      })
      .then((data) => {
        if (!cancelled) {
          setPosts(Array.isArray(data) ? data : data.posts || data.data || [])
          setLoading(false)
        }
      })
      .catch(() => {
        if (!cancelled) {
          setError(true)
          setLoading(false)
        }
      })

    return () => {
      cancelled = true
    }
  }, [i18n.language])

  if (loading) {
    return (
      <section id="noticias" className="bg-crystal py-20 md:py-32 relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <div className="flex items-center justify-center gap-4 mb-14">
            <div className="h-px w-12 bg-lagoon/20" />
            <h2 className="font-display text-deep-navy text-4xl md:text-5xl font-bold">
              {t('noticias.title')}
            </h2>
            <div className="h-px w-12 bg-lagoon/20" />
          </div>
          <div className="flex items-center justify-center py-12">
            <div className="w-8 h-8 border-4 border-lagoon/30 border-t-lagoon rounded-full animate-spin" />
            <span className="ml-3 font-body text-gray-500">{t('noticias.loading')}</span>
          </div>
        </div>
      </section>
    )
  }

  if (error) {
    return (
      <section id="noticias" className="bg-crystal py-20 md:py-32 relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <div className="flex items-center justify-center gap-4 mb-14">
            <div className="h-px w-12 bg-lagoon/20" />
            <h2 className="font-display text-deep-navy text-4xl md:text-5xl font-bold">
              {t('noticias.title')}
            </h2>
            <div className="h-px w-12 bg-lagoon/20" />
          </div>
          <p className="font-body text-gray-500">{t('noticias.error')}</p>
        </div>
      </section>
    )
  }

  if (!posts.length) {
    return (
      <section id="noticias" className="bg-crystal py-20 md:py-32 relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <div className="flex items-center justify-center gap-4 mb-14">
            <div className="h-px w-12 bg-lagoon/20" />
            <h2 className="font-display text-deep-navy text-4xl md:text-5xl font-bold">
              {t('noticias.title')}
            </h2>
            <div className="h-px w-12 bg-lagoon/20" />
          </div>
          <p className="font-body text-gray-500">{t('noticias.empty')}</p>
        </div>
      </section>
    )
  }

  return (
    <section id="noticias" className="bg-crystal py-20 md:py-32 relative overflow-hidden">
      {/* Decorative radial glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full pointer-events-none opacity-10"
        style={{
          background:
            'radial-gradient(ellipse at center, rgba(14,165,184,0.12) 0%, transparent 70%)',
        }}
      />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <div className="flex items-center justify-center gap-4 mb-14">
          <div className="h-px w-12 bg-lagoon/20" />
          <h2 className="font-display text-deep-navy text-4xl md:text-5xl font-bold text-center">
            {t('noticias.title')}
          </h2>
          <div className="h-px w-12 bg-lagoon/20" />
        </div>

        {/* Grid 3 cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {posts.map((post, i) => (
            <motion.div
              key={post.id || i}
              custom={i}
              variants={cardVariant}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-40px' }}
            >
              <Link
                to={`/noticias/${post.id}`}
                className="group block bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 border border-lagoon/10"
              >
                {/* Card image */}
                <div className="relative aspect-[16/10] overflow-hidden bg-gradient-to-br from-lagoon/10 to-lagoon/5">
                  {post.image_url || post.image ? (
                    <img
                      src={imgSrc(post.image_url || post.image)}
                      alt={post.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-12 h-12 border-2 border-lagoon/20 rounded-full" />
                    </div>
                  )}
                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-deep-navy/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400" />
                </div>

                {/* Card content */}
                <div className="p-6">
                  {post.date || post.created_at ? (
                    <p className="font-body text-xs text-lagoon font-semibold tracking-wide mb-2 uppercase">
                      {formatDate(post.date || post.created_at, i18n.language)}
                    </p>
                  ) : null}
                  <h3 className="font-display text-deep-navy text-lg font-semibold leading-snug line-clamp-2 group-hover:text-lagoon transition-colors duration-300">
                    {post.title}
                  </h3>
                  {post.excerpt || post.summary ? (
                    <p className="font-body text-gray-500 text-sm mt-2 line-clamp-2">
                      {post.excerpt || post.summary}
                    </p>
                  ) : null}
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
