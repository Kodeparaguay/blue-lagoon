import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { FaArrowLeft } from 'react-icons/fa'

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

export default function NoticiaDetallePage() {
  const { id } = useParams()
  const { t, i18n } = useTranslation()

  const [post, setPost] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [notFound, setNotFound] = useState(false)

  useEffect(() => {
    let cancelled = false
    setLoading(true)
    setError(false)
    setNotFound(false)
    setPost(null)

    fetch(`${API_BASE}/api/posts/${id}?siteId=4`)
      .then((res) => {
        if (res.status === 404) {
          setNotFound(true)
          setLoading(false)
          return null
        }
        if (!res.ok) throw new Error('Failed')
        return res.json()
      })
      .then((data) => {
        if (!cancelled && data) {
          setPost(data.post || data)
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
  }, [id])

  if (loading) {
    return (
      <div className="min-h-screen bg-crystal flex items-center justify-center">
        <div className="text-center">
          <div className="w-10 h-10 border-4 border-lagoon/30 border-t-lagoon rounded-full animate-spin mx-auto mb-4" />
          <p className="font-body text-gray-500">{t('noticias.loading')}</p>
        </div>
      </div>
    )
  }

  if (notFound) {
    return (
      <div className="min-h-screen bg-crystal flex items-center justify-center px-6">
        <div className="text-center max-w-md">
          <h1 className="font-display text-deep-navy text-4xl font-bold mb-4">
            {t('noticias.notFound')}
          </h1>
          <p className="font-body text-gray-500 mb-8">
            {t('noticias.notFoundDesc')}
          </p>
          <Link
            to="/"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-tropical to-green-600 text-white px-6 py-3 rounded-full text-sm font-semibold shadow-lg shadow-tropical/25 hover:shadow-xl hover:shadow-tropical/30 transition-shadow duration-300"
          >
            <FaArrowLeft size={14} />
            {t('noticias.back')}
          </Link>
        </div>
      </div>
    )
  }

  if (error || !post) {
    return (
      <div className="min-h-screen bg-crystal flex items-center justify-center px-6">
        <div className="text-center max-w-md">
          <h1 className="font-display text-deep-navy text-3xl font-bold mb-4">
            {t('noticias.error')}
          </h1>
          <Link
            to="/"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-tropical to-green-600 text-white px-6 py-3 rounded-full text-sm font-semibold shadow-lg shadow-tropical/25 hover:shadow-xl hover:shadow-tropical/30 transition-shadow duration-300"
          >
            <FaArrowLeft size={14} />
            {t('noticias.back')}
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-crystal">
      {/* Back link */}
      <div className="max-w-3xl mx-auto px-6 pt-24 pb-4">
        <Link
          to="/"
          className="inline-flex items-center gap-2 font-body text-lagoon hover:text-deep-navy text-sm font-semibold transition-colors duration-300"
        >
          <FaArrowLeft size={14} />
          {t('noticias.back')}
        </Link>
      </div>

      {/* Featured image */}
      {(post.image_url || post.image) && (
        <div className="max-w-3xl mx-auto px-6 mb-8">
          <motion.div
            className="rounded-2xl overflow-hidden shadow-lg border border-lagoon/10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            <img
              src={imgSrc(post.image_url || post.image)}
              alt={post.title}
              className="w-full h-auto object-cover"
            />
          </motion.div>
        </div>
      )}

      {/* Content */}
      <article className="max-w-3xl mx-auto px-6 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6, ease: 'easeOut' }}
        >
          <h1 className="font-display text-deep-navy text-3xl md:text-4xl font-bold mb-4">
            {post.title}
          </h1>

          {(post.date || post.created_at) && (
            <p className="font-body text-lagoon font-semibold text-sm tracking-wide mb-8 uppercase">
              {formatDate(post.date || post.created_at, i18n.language)}
            </p>
          )}

          {/* Body */}
          {(post.body || post.content) && (
            <div
              className="font-body text-gray-700 leading-relaxed text-base md:text-lg space-y-4 prose-custom"
              dangerouslySetInnerHTML={{
                __html: post.body || post.content,
              }}
            />
          )}

          {/* Fallback excerpt */}
          {!post.body && !post.content && (post.excerpt || post.summary) && (
            <p className="font-body text-gray-700 leading-relaxed text-base md:text-lg">
              {post.excerpt || post.summary}
            </p>
          )}
        </motion.div>
      </article>
    </div>
  )
}
