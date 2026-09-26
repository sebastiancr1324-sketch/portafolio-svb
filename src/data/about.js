/**
 * Contenido de la sección "Sobre mí".
 *
 * IMPORTANTE — este archivo arranca con una mezcla de:
 *
 *   [REAL]      Datos que me pasaste vos. No tocar sin confirmar.
 *   [INVENTADO] Texto genérico que escribí para que la sección se vea
 *               completa. Revisalo y reemplazalo con tu voz.
 *
 * Todo vive acá para que editarlo sea rápido, sin tocar componentes.
 */

/** [REAL] Datos objetivos que confirmaste. */
export const FACTS = {
  age: 18,
  coderHouse: true,
  originCountry: 'Venezuela',
  originCity: 'Caracas',
  yearsInArgentina: 8,
  movedAtAge: 10, // [INVENTADO] deducido: 18 - 8. Confirmar.
}

/** [INVENTADO] Párrafos de presentación. */
export const BIO = [
  'Me llamo Sebastián Valecillos Blanco, tengo 18 años y vengo de Venezuela. Llegué a Argentina con 10 años, así que crecí entre dos países y eso me dejó con la costumbre de adaptarme rápido y de no dar por sentado nada.',
  'Estudié programación web en Coder House, y desde entonces el desarrollo se volvió mi forma de pensar las cosas. Me apasiona ese momento en que una idea que tenías en la cabeza de repente existe en pantalla y alguien la puede usar.',
  'Me dedico al 100% a esto porque creo que la tecnología bien usada resuelve problemas concretos: le ahorra tiempo a alguien, le muestra algo que no sabía, o le abre una salida donde no la había. Quiero seguir creciendo en esto y ayudar a las personas a resolver las necesidades que tienen.',
]

/** [INVENTADO] Cifras para la franja de datos. */
export const STATS = [
  { value: '18', label: 'Años', note: 'Edad' },
  { value: '8', label: 'Años en Argentina', note: 'Desde los 10' },
  { value: '1', label: 'Curso', note: 'Programación web · Coder House' },
]

/** [INVENTADO] Motor del sitio, en lista corta. */
export const DRIVERS = [
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
]
