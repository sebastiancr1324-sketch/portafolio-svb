import { createContext, useContext } from 'react'

/**
 * Locale context and the hook that reads it.
 *
 * Deliberately JSX-free and separate from LocaleProvider.jsx: a module that
 * exports both a component and a hook breaks React Fast Refresh, so the two
 * live apart.
 */
export const LocaleContext = createContext(null)

/** Reads the active language. Must be called inside a <LocaleProvider>. */
export function useI18n() {
  const ctx = useContext(LocaleContext)
  if (!ctx) throw new Error('useI18n must be used inside a <LocaleProvider>')
  return ctx
}
