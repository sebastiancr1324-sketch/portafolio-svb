/**
 * Site copy, in every supported language.
 *
 * Spanish is the source language and the default; English is a full translation
 * written to carry the same meaning and tone rather than word-for-word
 * mirroring, which in the Spanish-to-English direction often reads badly.
 *
 * `t('hero.sub')`-style lookups live in src/lib/i18n.jsx.
 */

export const LOCALES = ['es', 'en']
export const DEFAULT_LOCALE = 'es'

/** Short code shown on the toggle. */
export const LOCALE_LABEL = { es: 'ES', en: 'EN' }

/** Name of the other language, shown as the toggle's accessible label. */
export const LOCALE_NAME = { es: 'Español', en: 'English' }

export const DICT = {
  /* ============================== Spanish ============================== */
  es: {
    meta: {
      title: 'SVB — Sebastian de Jesus Valecillos Blanco | Desarrollo web a medida',
      description:
        'Diseño y desarrollo web a medida: landing pages, e-commerce, sitios institucionales y sistemas de turnos. Basado en CABA, Argentina.',
    },
    ui: {
      loading: 'Cargando',
      skipToContent: 'Saltar al contenido',
      backToTop: 'SVB — volver al inicio',
      openMenu: 'Abrir menú',
      closeMenu: 'Cerrar menú',
      menuDialog: 'Menú de navegación',
      mainNav: 'Navegación principal',
      directContact: 'Contacto directo',
      letsTalk: 'Hablemos',
      menuTagline:
        'Desarrollo web a medida para negocios que necesitan aparecer mejor en internet y recibir clientes por WhatsApp.',
      liveSite: 'Ver sitio en vivo',
      inProgress: 'Sitio en preparación',
      viewProject: (name) =>
        `Visitar el sitio de ${name} (se abre en una pestaña nueva)`,
      shot: (name) => `Captura de pantalla del sitio ${name}`,
      ctaWhatsapp:
        'Escribime por WhatsApp para iniciar tu proyecto (se abre en una pestaña nueva)',
    },
    nav: { services: 'Servicios', work: 'Proyectos', about: 'Sobre mí', contact: 'Contacto' },
    role: 'Desarrollador web',
    hero: {
      available: 'Disponible para proyectos nuevos',
      headline: [
        { text: 'Desarrollo web a medida', tone: 'bone' },
        { text: 'diseñado para convertir', tone: 'bone' },
        { text: 'visitantes en clientes.', tone: 'peach' },
      ],
      sub: 'Desde landing pages hasta e-commerce. Soluciones escalables que hacen crecer tu marca.',
      ctaPrimary: 'Iniciar proyecto',
      ctaSecondary: 'Ver proyectos',
    },
    portal: {
      hint: 'Deslizá para ver el trabajo',
      label: 'Portafolio',
      tagline: 'Cada proyecto, resuelto a medida.',
    },
    work: {
      eyebrow: 'Trabajo reciente',
      title: 'Portafolio',
      count: (n) => `${String(n).padStart(2, '0')} proyectos`,
    },
    projects: {
      manaba: {
        name: 'Manaba Café',
        category: 'Web Institucional / Gastronomía',
        description:
          'Interfaz cálida y minimalista enfocada en transmitir la identidad del local y facilitar reservas de mesas.',
        tags: ['Identidad', 'Reservas', 'Menú'],
      },
      sebtech: {
        name: 'SebTech',
        category: 'E-Commerce / Tecnología',
        description:
          'Catálogo digital rápido e intuitivo, diseñado para optimizar el recorrido del usuario y maximizar ventas.',
        tags: ['Catálogo', 'Carrito', 'Filtros'],
      },
      barbudos: {
        name: "Barbudo's Barbershop",
        category: 'Web Corporativa / Sistema de Turnos',
        description:
          'Diseño audaz y de alto impacto visual, estructurado para captar clientes y agilizar reservas vía WhatsApp.',
        tags: ['Turnos', 'WhatsApp', 'Galería'],
      },
      capricciosa: {
        name: 'Capricciosa Postres',
        category: 'Landing Page / Delivery Local',
        description:
          'Experiencia visual vibrante y tentadora, centrada en facilitar pedidos rápidos y destacar los productos.',
        tags: ['Delivery', 'Pedidos', 'Carrito'],
      },
    },
    services: {
      eyebrow: 'Qué hago',
      titleLines: ['Del primer', 'clic a la venta'],
      lead:
        'Construyo sitios pensados para una sola cosa: que alguien que llega desde un anuncio termine hablando con vos por WhatsApp.',
      items: [
        {
          title: 'Landing pages',
          text: 'Páginas de una sola pantalla, cargadas rápido y diseñadas para que el visitante pase a la acción.',
        },
        {
          title: 'E-commerce',
          text: 'Catálogos y carritos rápidos, con un recorrido pensado para que nadie se pierda en el camino a la compra.',
        },
        {
          title: 'Sitios institucionales',
          text: 'Presencia seria para negocios de servicios: identidad clara, información ordenada y contacto directo.',
        },
        {
          title: 'Sistemas de turnos',
          text: 'Reservas y agenda conectados a WhatsApp, para que tu equipo reciba los pedidos sin llamadas perdidas.',
        },
      ],
    },
    about: {
      eyebrow: 'Sobre mí',
      titleLines: ['Detrás de', 'cada proyecto'],
      techLabel: 'Con qué trabajo',
      journeyNote: (years) => `Venezuela · ${years} años en Argentina`,
      bio: [
        'Me llamo Sebastián de Jesús Valecillos Blanco, tengo 18 años y vengo de Venezuela. Llegué a Argentina con 10 años, así que crecí entre dos países y eso me dejó con la costumbre de adaptarme rápido y de no dar por sentado nada.',
        'Estudié programación web en Coder House, y desde entonces el desarrollo se volvió mi forma de pensar las cosas. Me apasiona ese momento en que una idea que tenías en la cabeza de repente existe en pantalla y alguien la puede usar.',
        'Me dedico al 100% a esto porque creo que la tecnología bien usada resuelve problemas concretos: le ahorra tiempo a alguien, le muestra algo que no sabía, o le abre una salida donde no la había. Quiero seguir creciendo en esto y ayudar a las personas a resolver las necesidades que tienen.',
      ],
      stats: [
        { value: '18', label: 'Años', note: 'Edad' },
        { value: '8', label: 'Años en Argentina', note: 'Desde los 10' },
        { value: '1', label: 'Curso', note: 'Programación web · Coder House' },
      ],
      drivers: [
        {
          title: 'Que sea usable de verdad',
          text: 'Me guía que alguien que no sabe de tecnología pueda usarlo sin instrucciones. Si hay que explicar cómo funciona, todavía no está terminado.',
        },
        {
          title: 'Aprender de lo que construyo',
          text: 'Cada proyecto es una obligación de aprender algo nuevo. Me deja llevar por la curiosidad técnica más que por una fórmula.',
        },
        {
          title: 'Impacto antes que estética',
          text: 'Que se vea bien es importante, pero no sirve de nada si no acerca a la persona a lo que buscaba. Primero que funcione, después que se vea.',
        },
      ],
    },
    tech: [
      'HTML5',
      'CSS3',
      'JavaScript',
      'React',
      'Tailwind CSS',
      'Diseño responsive',
      'Git',
      'GitHub',
    ],
    cta: {
      eyebrow: 'Siguiente paso',
      title: '¿Listo para destacar tu negocio en internet?',
      body: 'Contame qué tenés en mente y te paso una idea de cómo se vería tu proyecto.',
      response: 'Respuesta en menos de 24 horas',
      instagram: 'Instagram',
      email: 'Email',
    },
  },

  /* ============================== English ============================== */
  en: {
    meta: {
      title: 'SVB — Sebastian de Jesus Valecillos Blanco | Bespoke web development',
      description:
        'Custom web design and development: landing pages, e-commerce, corporate sites and booking systems. Based in Buenos Aires, Argentina.',
    },
    ui: {
      loading: 'Loading',
      skipToContent: 'Skip to content',
      backToTop: 'SVB — back to top',
      openMenu: 'Open menu',
      closeMenu: 'Close menu',
      menuDialog: 'Navigation menu',
      mainNav: 'Main navigation',
      directContact: 'Direct contact',
      letsTalk: "Let's talk",
      menuTagline:
        'Bespoke web development for businesses that need to show up better online and win customers over WhatsApp.',
      liveSite: 'View live site',
      inProgress: 'Site in progress',
      viewProject: (name) => `Visit the ${name} site (opens in a new tab)`,
      shot: (name) => `Screenshot of the ${name} site`,
      ctaWhatsapp:
        'Message me on WhatsApp to start your project (opens in a new tab)',
    },
    nav: { services: 'Services', work: 'Work', about: 'About', contact: 'Contact' },
    role: 'Web developer',
    hero: {
      available: 'Available for new projects',
      headline: [
        { text: 'Bespoke web development', tone: 'bone' },
        { text: 'built to convert', tone: 'bone' },
        { text: 'visitors into customers.', tone: 'peach' },
      ],
      sub: 'From landing pages to e-commerce. Scalable solutions that grow your brand.',
      ctaPrimary: 'Start a project',
      ctaSecondary: 'See the work',
    },
    portal: {
      hint: 'Scroll to see the work',
      label: 'Portfolio',
      tagline: 'Every project, built to measure.',
    },
    work: {
      eyebrow: 'Recent work',
      title: 'Portfolio',
      count: (n) => `${String(n).padStart(2, '0')} projects`,
    },
    projects: {
      manaba: {
        name: 'Manaba Café',
        category: 'Institutional Site / Food & Drink',
        description:
          'A warm, minimal interface built to convey the character of the venue and make table bookings effortless.',
        tags: ['Identity', 'Bookings', 'Menu'],
      },
      sebtech: {
        name: 'SebTech',
        category: 'E-commerce / Technology',
        description:
          'A fast, intuitive digital catalogue designed to streamline the user journey and maximise sales.',
        tags: ['Catalogue', 'Cart', 'Filters'],
      },
      barbudos: {
        name: "Barbudo's Barbershop",
        category: 'Corporate Site / Booking System',
        description:
          'A bold, high-impact design built to win customers and speed up bookings over WhatsApp.',
        tags: ['Appointments', 'WhatsApp', 'Gallery'],
      },
      capricciosa: {
        name: 'Capricciosa Postres',
        category: 'Landing Page / Local Delivery',
        description:
          'A vibrant, appetising experience focused on quick ordering and putting the products front and centre.',
        tags: ['Delivery', 'Orders', 'Cart'],
      },
    },
    services: {
      eyebrow: 'What I do',
      titleLines: ['From the first', 'click to the sale'],
      lead: 'I build sites with a single goal in mind: that someone arriving from an ad ends up talking to you over WhatsApp.',
      items: [
        {
          title: 'Landing pages',
          text: 'Single-screen pages that load fast and are built to move the visitor to action.',
        },
        {
          title: 'E-commerce',
          text: 'Fast catalogues and carts, with a flow designed so nobody gets lost on the way to checkout.',
        },
        {
          title: 'Corporate sites',
          text: 'A serious presence for service businesses: clear identity, organised information and direct contact.',
        },
        {
          title: 'Booking systems',
          text: 'Reservations and scheduling wired to WhatsApp, so your team takes orders without missing calls.',
        },
      ],
    },
    about: {
      eyebrow: 'About me',
      titleLines: ['Behind', 'every project'],
      techLabel: 'What I work with',
      journeyNote: (years) => `Venezuela · ${years} years in Argentina`,
      bio: [
        'My name is Sebastián de Jesús Valecillos Blanco. I am 18 and I come from Venezuela. I moved to Argentina at 10, so I grew up between two countries, which left me used to adapting fast and taking nothing for granted.',
        'I studied web programming at Coder House, and since then development has become how I think. I love that moment when an idea in your head suddenly exists on screen and someone can actually use it.',
        'I am 100% committed to this because I think technology, used well, solves concrete problems: it saves someone time, shows them something they did not know, or opens a door that was not there before. I want to keep growing in this and help people with the needs they have.',
      ],
      stats: [
        { value: '18', label: 'Years old', note: 'Age' },
        { value: '8', label: 'Years in Argentina', note: 'Since age 10' },
        { value: '1', label: 'Course', note: 'Web programming · Coder House' },
      ],
      drivers: [
        {
          title: 'Genuinely usable',
          text: 'What guides me is that someone who knows nothing about technology can use it without instructions. If it needs explaining, it is not finished yet.',
        },
        {
          title: 'Learning from what I build',
          text: 'Every project obliges me to learn something new. Curiosity about the craft leads me further than any formula does.',
        },
        {
          title: 'Impact before aesthetics',
          text: 'Looking good matters, but it is worthless if it does not bring the person closer to what they came for. First make it work, then make it look good.',
        },
      ],
    },
    tech: [
      'HTML5',
      'CSS3',
      'JavaScript',
      'React',
      'Tailwind CSS',
      'Responsive design',
      'Git',
      'GitHub',
    ],
    cta: {
      eyebrow: 'Next step',
      title: 'Ready to make your business stand out online?',
      body: 'Tell me what you have in mind and I will sketch out what your project could look like.',
      response: 'Reply within 24 hours',
      instagram: 'Instagram',
      email: 'Email',
    },
  },
}
