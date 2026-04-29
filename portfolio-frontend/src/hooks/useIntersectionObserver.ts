// src/hooks/useIntersectionObserver.ts
// Returns visible element refs — powers TableOfContents active heading
import { useEffect, useRef, useState, RefObject } from "react"

interface UseIntersectionObserverOptions {
  threshold?: number | number[]
  rootMargin?: string
  root?: Element | null
}

export function useIntersectionObserver(
  options: UseIntersectionObserverOptions = {}
): [RefObject<HTMLElement>, boolean] {
  const ref = useRef<HTMLElement>(null)
  const [isIntersecting, setIsIntersecting] = useState(false)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const observer = new IntersectionObserver(
      ([entry]) => setIsIntersecting(entry.isIntersecting),
      {
        threshold: options.threshold ?? 0,
        rootMargin: options.rootMargin ?? "0px",
        root: options.root ?? null,
      }
    )

    observer.observe(element)

    return () => observer.disconnect()
  }, [options.threshold, options.rootMargin, options.root])

  return [ref, isIntersecting]
}