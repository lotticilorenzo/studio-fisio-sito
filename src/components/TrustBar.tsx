import { motion } from 'framer-motion';

const metrics = [
  { value: '8+', label: 'anni di attività' },
  { value: '6', label: 'professioniste' },
  { value: '5.0 ★', label: 'rating Google' },
  { value: '100%', label: 'prima valutazione gratuita' },
];

export const TrustBar = () => (
  <div className="border-b border-t border-primary/8 bg-surface px-6 py-5">
    <div className="mx-auto grid max-w-7xl grid-cols-2 gap-y-5 sm:grid-cols-4">
      {metrics.map((metric, i) => (
        <motion.div
          key={metric.label}
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.6, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center gap-1 text-center"
        >
          <span className="font-drama text-4xl font-normal text-primary">{metric.value}</span>
          <span className="text-xs uppercase tracking-[0.2em] text-primary/50">{metric.label}</span>
        </motion.div>
      ))}
    </div>
  </div>
);
