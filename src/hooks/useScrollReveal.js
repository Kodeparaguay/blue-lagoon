import { useEffect, useRef } from 'react'

export default function useScrollReveal(threshold = 0.15) {
  const ref = useRef(null)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          element.classList.add('opacity-100', 'translate-y-0')
          element.classList.remove('opacity-0', 'translate-y-8')
          observer.unobserve(element)
        }
      },
      { threshold }
    )

    observer.observe(element)
    return () => observer.disconnect()
  }, [threshold])

  return ref
}
