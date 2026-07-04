type Props = {
  items: string[];
  /** Seconds for one full loop (lower = faster). */
  duration?: number;
  dark?: boolean;
  className?: string;
};

/**
 * Kinetic marquee — a seamless horizontal scroll (CSS keyframe), paused on hover,
 * with a gold ✳ separator. Content is duplicated so -50% = one clean loop.
 */
export const Marquee = ({ items, duration = 40, dark = false, className = '' }: Props) => {
  const list = [...items, ...items];
  return (
    <div className={`marquee ${dark ? 'dark' : ''} ${className}`} aria-hidden="true">
      <div className="mq-track" style={{ animationDuration: `${duration}s` }}>
        {list.map((item, i) => (
          <span key={i} className="mq-item">
            {item}
          </span>
        ))}
      </div>
    </div>
  );
};
