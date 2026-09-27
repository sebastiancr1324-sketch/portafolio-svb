import barbudosShot from '../assets/projects/barbudos.webp'
import capricciosaShot from '../assets/projects/Capricciosa.webp'
import manabaShot from '../assets/projects/ManabaCafe.webp'
import sebtechShot from '../assets/projects/Sebtech.webp'
import barbudosLogo from '../assets/projects/logo-barbudos.svg'
import capricciosaLogo from '../assets/projects/logo-capricciosa.webp'
import manabaLogo from '../assets/projects/logo-manaba.svg'
import sebtechLogo from '../assets/projects/logo-sebtech.webp'

/**
 * Portfolio case studies — technical data only.
 *
 * All visible copy (name, category, description, tags) lives in src/data/i18n.js
 * under `projects.<id>`, so it can be translated. This file stays free of text.
 *
 * `url` is only set for projects that are actually published on GitHub Pages.
 * Cards render a neutral state when it is null, so we never link to a 404.
 */
export const PROJECTS = [
  {
    id: 'manaba',
    index: '01',
    shot: manabaShot,
    logo: manabaLogo,
    logoType: 'svg',
    url: 'https://sebastiancr1324-sketch.github.io/Manaba.github.io/',
    // Text shown in the mock browser's address bar.
    frameUrl: 'sebastiancr1324-sketch.github.io/Manaba.github.io',
  },
  {
    id: 'sebtech',
    index: '02',
    shot: sebtechShot,
    logo: sebtechLogo,
    logoType: 'webp',
    url: 'https://sebastiancr1324-sketch.github.io/sebtech.github.io/',
    frameUrl: 'sebastiancr1324-sketch.github.io/sebtech.github.io',
  },
  {
    id: 'barbudos',
    index: '03',
    shot: barbudosShot,
    logo: barbudosLogo,
    logoType: 'svg',
    url: 'https://sebastiancr1324-sketch.github.io/Barbudos/',
    frameUrl: 'sebastiancr1324-sketch.github.io/Barbudos',
  },
  {
    id: 'capricciosa',
    index: '04',
    shot: capricciosaShot,
    logo: capricciosaLogo,
    logoType: 'webp',
    url: 'https://sebastiancr1324-sketch.github.io/Capricciosa/',
    frameUrl: 'sebastiancr1324-sketch.github.io/Capricciosa',
  },
]
