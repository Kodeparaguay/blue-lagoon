import { useTranslation } from 'react-i18next'

const langs = [
  { code: 'es', label: 'ES' },
  { code: 'en', label: 'EN' },
  { code: 'pt', label: 'PT' },
]

export default function LanguageSwitcher() {
  const { i18n } = useTranslation()

  return (
    <div className="flex items-center gap-1">
      {langs.map((lang) => {
        const isActive = i18n.language === lang.code || (lang.code === 'es' && !i18n.language)
        return (
          <button
            key={lang.code}
            onClick={() => i18n.changeLanguage(lang.code)}
            className={`font-body text-xs font-semibold px-2 py-1 rounded transition-colors duration-300 ${
              isActive
                ? 'bg-lagoon text-white'
                : 'text-white/60 hover:text-white hover:bg-white/10'
            }`}
            aria-label={`Switch to ${lang.label}`}
          >
            {lang.label}
          </button>
        )
      })}
    </div>
  )
}
