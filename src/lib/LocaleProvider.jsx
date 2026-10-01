import { useCallback, useEffect, useMemo, useState } from 'react'
import { DEFAULT_LOCALE, DICT, LOCALES } from '../data/i18n'
import { LocaleContext } from './locale'

const STORAGE_KEY = 'svb:locale'

/**
 * An explicit language in the URL, e.g. /?lang=en.
 *
 * Highest priority, so a shared link opens in the language it was shared in.
 * This is also what makes the hreflang tags honest: the two locales have two
 * distinct URLs instead of both pointing at the same one.
 */
function readQuery() {
  try {
    const value = new URLSearchParams(window.location.search).get('lang')
    return LOCALES.includes(value) ? value : null
  } catch {
    return null
  }
}

/** A previous explicit choice, if any. */
function readStored() {
  try {
    const value = window.localStorage.getItem(STORAGE_KEY)
    return LOCALES.includes(value) ? value : null
  } catch {
    return null
  }
}

/**
 * The browser's language preference, in order. `navigator.languages` is a
 * ranked list, so an exact region match (es-AR) is honoured before falling
 * through to the base tag (es).
 */
function detectBrowser() {
  if (typeof navigator === 'undefined') return null
  const prefs =
    navigator.languages && navigator.languages.length
      ? navigator.languages
      : [navigator.language]
  for (const tag of prefs) {
    if (!tag) continue
    const base = String(tag).toLowerCase().split('-')[0]
    if (LOCALES.includes(base)) return base
  }
  return null
}

export function LocaleProvider({ children }) {
  // Precedence: explicit URL, then a saved choice, then the browser, then
  // Spanish. Resolved during the first render so the page never paints in the
  // wrong language first.
  const [locale, setLocaleState] = useState(
    () => readQuery() ?? readStored() ?? detectBrowser() ?? DEFAULT_LOCALE,
  )

  useEffect(() => {
    document.documentElement.lang = locale

    // Keep the SEO surface in step with the visible language.
    const { meta } = DICT[locale]
    document.title = meta.title
    const set = (selector, value) => {
      const el = document.querySelector(selector)
      if (el) el.setAttribute('content', value)
    }
    set('meta[name="description"]', meta.description)
    set('meta[property="og:title"]', meta.title)
    set('meta[property="og:description"]', meta.description)
    set('meta[property="og:locale"]', locale === 'es' ? 'es_AR' : 'en_US')
  }, [locale])

  const setLocale = useCallback((next) => {
    if (!LOCALES.includes(next)) return
    setLocaleState(next)
    // Only an explicit choice is remembered. Saving the detected or URL
    // language would freeze it: a visitor who once opened a ?lang=en link
    // would get English forever, even with a Spanish browser.
    try {
      window.localStorage.setItem(STORAGE_KEY, next)
    } catch {
      // Private browsing: the choice just will not survive a reload.
    }
    // Reflect the choice in the URL so the page can be shared in that language.
    // replaceState rather than push, so switching back and forth does not pile
    // up history entries for the reader to press Back through.
    try {
      const url = new URL(window.location.href)
      url.searchParams.set('lang', next)
      window.history.replaceState(null, '', url)
    } catch {
      // Nothing to update if the URL is not manipulable.
    }
  }, [])

  const value = useMemo(() => {
    const dict = DICT[locale]

    /** Dot-path lookup, e.g. t('hero.ctaPrimary'). */
    const t = (path) => {
      const found = path
        .split('.')
        .reduce((acc, key) => (acc == null ? acc : acc[key]), dict)
      // Returning the path makes a missing key obvious on screen instead of
      // rendering an empty string.
      return found === undefined ? path : found
    }

    return {
      locale,
      setLocale,
      toggle: () => setLocale(locale === 'es' ? 'en' : 'es'),
      t,
      dict,
    }
  }, [locale, setLocale])

  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>
}
