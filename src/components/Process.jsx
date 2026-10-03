import { motion } from 'motion/react'
import SplitText from './SplitText'
import { useI18n } from '../lib/locale'

/**
 * Process — the four steps from first message to launch.
 *
 * What reassures a client who has never commissioned a website: knowing what
 * happens next. Same heading as every other section, then a flat grid split
 * by hairlines, no cards and no shadows.
 */
export default function Process() {
  const { t } = useI18n()
  const [titleTop, titleBottom] = t('process.titleLines')
  const steps = t('process.steps')

  return (
    <section id="proceso" className="relative border-t border-white/8 py-24 md:py-32">
      <div className="shell">
        <div className="mb-16 max-w-3xl">
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.6 }}
            className="type-label text-peach"
          >
            {t('process.eyebrow')}
          </motion.span>

          <h2 className="type-display-lg mt-3 text-bone">
            <SplitText as="span" text={titleTop} by="word" className="block" />
            <SplitText
              as="span"
              text={titleBottom}
              by="word"
              className="block"
              fragmentClassName="text-gradient-peach"
            />
          </h2>

          <p className="mt-6 max-w-[60ch] text-base leading-relaxed text-slate md:text-lg">
            {t('process.lead')}
          </p>
        </div>

        <ol className="grid border-t border-white/8 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, i) => (
            <motion.li
              key={step.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.5, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="border-b border-white/8 py-8 sm:px-6 sm:max-lg:odd:pl-0 lg:border-b-0 lg:border-l lg:px-8 lg:py-10 lg:first:border-l-0 lg:first:pl-0"
            >
              <span className="font-display text-[1.75rem] leading-none text-peach">
                {String(i + 1).padStart(2, '0')}
              </span>
              <h3 className="type-title mt-6 text-mist">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate md:text-base">
                {step.text}
              </p>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  )
}
