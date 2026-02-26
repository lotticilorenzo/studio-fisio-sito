import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

interface RevealProps {
    children: ReactNode;
    width?: "fit-content" | "100%";
    delay?: number;
    direction?: "up" | "down" | "left" | "right";
    className?: string;
}

export const Reveal = ({ children, width = "fit-content", delay = 0, direction = "up", className = "" }: RevealProps) => {

    // Determine translation based on direction
    const yOffset = direction === "up" ? 40 : direction === "down" ? -40 : 0;
    const xOffset = direction === "left" ? 40 : direction === "right" ? -40 : 0;

    return (
        <div style={{ width, position: "relative", overflow: "hidden" }} className={className}>
            <motion.div
                initial={{ opacity: 0, y: yOffset, x: xOffset }}
                whileInView={{ opacity: 1, y: 0, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.8, delay: delay, ease: [0.16, 1, 0.3, 1] }}
                className={className}
            >
                {children}
            </motion.div>
        </div>
    );
};
