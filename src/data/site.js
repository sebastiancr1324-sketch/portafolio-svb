/**
 * Site-wide constants: contact channels and navigation.
 * Single WhatsApp number reused across every call to action.
 */
export const WHATSAPP_URL = 'https://wa.me/541138991228'
export const INSTAGRAM_URL = 'https://www.instagram.com/sebbasv/'
export const EMAIL = 'sebastianvalecillosblanco@gmail.com'

/** Full name used for SEO / structured data. */
export const OWNER = {
  name: 'Sebastian de Jesus Valecillos Blanco',
  initials: 'SVB',
  role: 'Desarrollador web',
  location: 'CABA, Argentina',
}

/**
 * Anchor targets for the full-screen menu and in-page links. `key` resolves
 * to a label in src/data/i18n.js under `nav`, so the menu is translated
 * rather than hardcoded.
 */
export const NAV_LINKS = [
  { key: 'services', href: '#servicios' },
  { key: 'work', href: '#proyectos' },
  { key: 'about', href: '#sobre-mi' },
  { key: 'contact', href: '#contacto' },
]
