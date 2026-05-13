import { useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { Link } from 'react-router-dom';

const MotionLink = motion.create(Link);

interface MagneticButtonProps {
    children: React.ReactNode;
    href?: string;
    to?: string;
    className?: string;
    onClick?: () => void;
    target?: string;
    rel?: string;
}

export const MagneticButton = ({ children, href, to, className = "", onClick, target, rel }: MagneticButtonProps) => {
    const ref = useRef<HTMLDivElement>(null);

    // Create motion values that exist outside of React render cycle
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    // Smooth out the movement with a spring
    const mouseXSpring = useSpring(x, { stiffness: 150, damping: 15, mass: 0.1 });
    const mouseYSpring = useSpring(y, { stiffness: 150, damping: 15, mass: 0.1 });

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        // Skip magnetic effect on touch devices
        if (window.matchMedia('(pointer: coarse)').matches) return;
        if (!ref.current) return;
        const { clientX, clientY } = e;
        const { height, width, left, top } = ref.current.getBoundingClientRect();

        // Calculate distance from center of the element
        const center_x = left + width / 2;
        const center_y = top + height / 2;

        // Magnetic pull factor
        const pull_x = (clientX - center_x) * 0.3;
        const pull_y = (clientY - center_y) * 0.3;

        x.set(pull_x);
        y.set(pull_y);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    let Component: React.ElementType = motion.button;
    let props: Record<string, unknown> = { onClick };

    if (to) {
        Component = MotionLink;
        props = { to };
    } else if (href) {
        Component = motion.a;
        props = { href, ...(target && { target }), ...(rel && { rel }) };
    }

    return (
        <div
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className={`relative inline-block ${href ? '' : 'cursor-pointer'}`}
        >
            <Component
                {...props}
                style={{ x: mouseXSpring, y: mouseYSpring }}
                className={`group relative inline-flex items-center justify-center overflow-hidden rounded-full transition-[background-color,color,border-color,transform,box-shadow] duration-300 active:scale-[0.98] ${className}`}
                whileTap={{ scale: 0.98 }}
            >
                <span className="absolute inset-0 z-0 translate-y-full bg-white/12 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-y-0" />
                <span className="relative z-10">{children}</span>
            </Component>
        </div>
    );
};
