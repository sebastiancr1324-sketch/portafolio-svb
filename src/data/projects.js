import barbudosShot from '../assets/projects/barbudos.webp'
import capricciosaShot from '../assets/projects/Capricciosa.webp'
import manabaShot from '../assets/projects/ManabaCafe.webp'
import sebtechShot from '../assets/projects/Sebtech.webp'
import barbudosLogo from '../assets/projects/logo-barbudos.svg'
import capricciosaLogo from '../assets/projects/logo-capricciosa.webp'
import manabaLogo from '../assets/projects/logo-manaba.svg'
import sebtechLogo from '../assets/projects/logo-sebtech.webp'

/**
 * Portfolio case studies.
 *
 * `url` is only set for projects that are actually published on GitHub Pages.
 * Cards render a neutral state when it is null, so we never link to a 404.
 */
export const PROJECTS = [
  {
    id: 'manaba',
    index: '01',
    name: 'Manaba Café',
    category: 'Web Institucional / Gastronomía',
    description:
      'Interfaz cálida y minimalista enfocada en transmitir la identidad del local y facilitar reservas de mesas.',
    shot: manabaShot,
    logo: manabaLogo,
    logoType: 'svg',
    url: 'https://sebastiancr1324-sketch.github.io/Manaba.github.io/',
    // Text shown in the mock browser's address bar.
    frameUrl: 'sebastiancr1324-sketch.github.io/Manaba.github.io',
    live: true,
    tags: ['Identidad', 'Reservas', 'Menú'],
    accent: '#C98F5E',
  },
  {
    id: 'sebtech',
    index: '02',
    name: 'SebTech',
    category: 'E-Commerce / Tecnología',
    description:
      'Catálogo digital rápido e intuitivo, diseñado para optimizar el recorrido del usuario y maximizar ventas.',
    shot: sebtechShot,
    logo: sebtechLogo,
    logoType: 'webp',
    url: 'https://sebastiancr1324-sketch.github.io/sebtech.github.io/',
    frameUrl: 'sebastiancr1324-sketch.github.io/sebtech.github.io',
    live: true,
    tags: ['Catálogo', 'Carrito', 'Filtros'],
    accent: '#4C7DF0',
  },
  {
    id: 'barbudos',
    index: '03',
    name: "Barbudo's Barbershop",
    category: 'Web Corporativa / Sistema de Turnos',
    description:
      'Diseño audaz y de alto impacto visual, estructurado para captar clientes y agilizar reservas vía WhatsApp.',
    shot: barbudosShot,
    logo: barbudosLogo,
    logoType: 'svg',
    url: 'https://sebastiancr1324-sketch.github.io/Barbudos/',
    frameUrl: 'sebastiancr1324-sketch.github.io/Barbudos',
    live: true,
    tags: ['Turnos', 'WhatsApp', 'Galería'],
    accent: '#E8B4A0',
  },
  {
    id: 'capricciosa',
    index: '04',
    name: 'Capricciosa Postres',
    category: 'Landing Page / Delivery Local',
    description:
      'Experiencia visual vibrante y tentadora, centrada en facilitar pedidos rápidos y destacar los productos.',
    shot: capricciosaShot,
    logo: capricciosaLogo,
    logoType: 'webp',
    url: 'https://sebastiancr1324-sketch.github.io/Capricciosa/',
    frameUrl: 'sebastiancr1324-sketch.github.io/Capricciosa',
    live: true,
    tags: ['Delivery', 'Pedidos', 'Carrito'],
    accent: '#F4A8C0',
  },
]

/** Service offerings, referenced by the Services section. */
export const SERVICES = [
  {
    index: '01',
    title: 'Landing pages',
    text: 'Páginas de una sola pantalla, cargadas rápido y diseñadas para que el visitante pase a la acción.',
  },
  {
    index: '02',
    title: 'E-commerce',
    text: 'Catálogos y carritos rápidos, con un recorrido pensado para que nadie se pierda en el camino a la compra.',
  },
  {
    index: '03',
    title: 'Sitios institucionales',
    text: 'Presencia seria para negocios de servicios: identidad clara, información ordenada y contacto directo.',
  },
  {
    index: '04',
    title: 'Sistemas de turnos',
    text: 'Reservas y agenda conectados a WhatsApp, para que tu equipo reciba los pedidos sin llamadas perdidas.',
  },
]
