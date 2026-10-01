import { motion } from 'motion/react'
import BrowserFrame from './BrowserFrame'
import PillButton from './PillButton'
import TiltedCard from './TiltedCard'
import { PROJECTS } from '../data/projects'
import { useI18n } from '../lib/locale'

/** Section heading. */
function SectionHeading({ eyebrow, title, count }) {
  return (
    <div className="mb-16 flex flex-col gap-6 border-b border-white/8 pb-8 md:mb-24 md:flex-row md:items-end md:justify-between">
      <div>
        <motion.span
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.6 }}
          className="font-mono text-[0.62rem] tracking-[0.3em] text-peach uppercase"
        >
          {eyebrow}
        </motion.span>
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.8, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
          className="mt-4 font-display text-[clamp(2.5rem,7vw,5.5rem)] text-bone"
        >
          {title}
        </motion.h2>
      </div>
      <span className="font-mono text-[0.62rem] tracking-[0.24em] text-slate-dim uppercase">
        {count}
      </span>
    </div>
  )
}

function ProjectCard({ project, index }) {
  const { t } = useI18n()
  // Copy for this project in the active language.
  const copy = t(`projects.${project.id}`)
  const wide = index % 2 === 0
  const Wrapper = project.url ? 'a' : 'div'

  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      className={`group flex flex-col ${
        wide ? 'lg:col-span-7' : 'lg:col-span-5 lg:mt-28'
      }`}
    >
      <TiltedCard maxTilt={7}>
        <Wrapper
          {...(project.url
            ? {
                href: project.url,
                target: '_blank',
                rel: 'noopener noreferrer',
                'aria-label': t('ui.viewProject')(copy.name),
                // The "View live site" button below goes to the same place,
                // so the screenshot stays clickable but is skipped by the
                // keyboard instead of being a second, identical tab stop.
                tabIndex: -1,
              }
            : {})}
          className="block rounded-xl"
        >
          <BrowserFrame
            url={project.frameUrl}
            logo={project.logo}
            logoType={project.logoType}
          >
            <img
              src={project.shot}
              alt={t('ui.shot')(copy.name)}
              loading="lazy"
              decoding="async"
              className="h-full w-full object-cover transition-transform duration-[1.2s] [transition-timing-function:var(--ease-out-expo)] group-hover:scale-[1.04]"
            />
          </BrowserFrame>
        </Wrapper>
      </TiltedCard>

      {/* Meta */}
      <div className="mt-7 flex flex-1 flex-col">
        <div className="flex items-center gap-4">
          <span className="font-mono text-[0.6rem] tracking-[0.2em] text-peach">
            {project.index}
          </span>
          <span className="h-px flex-1 bg-white/10" aria-hidden="true" />
          <span className="font-mono text-[0.6rem] tracking-[0.16em] text-slate-dim uppercase">
            {copy.category}
          </span>
        </div>

        <h3 className="mt-4 font-display text-[clamp(1.6rem,3.2vw,2.6rem)] text-bone">
          {copy.name}
        </h3>

        <p className="mt-3 max-w-prose text-sm leading-relaxed text-slate md:text-base">
          {copy.description}
        </p>

        <div className="mt-6 flex flex-wrap items-center gap-2">
          {copy.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-white/[0.04] px-3 py-1.5 font-mono text-[0.58rem] tracking-[0.14em] text-slate uppercase ring-1 ring-white/8"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="mt-7 flex items-center">
          {project.url ? (
            <PillButton href={project.url} variant="ghost" size="sm" withArrow>
              {t('ui.liveSite')}
            </PillButton>
          ) : (
            <span className="inline-flex items-center gap-2.5 font-mono text-[0.62rem] tracking-[0.18em] text-slate-dim uppercase">
              <span
                className="h-1.5 w-1.5 rounded-full bg-slate-dim"
                aria-hidden="true"
              />
              {t('ui.inProgress')}
            </span>
          )}
        </div>
      </div>
    </motion.article>
  )
}

/**
 * Portfolio — the case-study gallery.
 *
 * Laid out on a 12-column grid with alternating spans and a vertical offset
 * on the narrow column, so the four projects read as an editorial spread
 * rather than a uniform card grid.
 */
export default function Portfolio() {
  const { t } = useI18n()
  return (
    <section id="proyectos" className="relative scroll-mt-24 py-28 md:py-36">
      <div className="shell">
        <SectionHeading
          eyebrow={t('work.eyebrow')}
          title={t('work.title')}
          count={t('work.count')(PROJECTS.length)}
        />

        <div className="grid grid-cols-1 gap-x-8 gap-y-20 lg:grid-cols-12 lg:gap-y-28">
          {PROJECTS.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
