import { motion, useSpring } from 'framer-motion';
import { useEffect, useState } from 'react';

export const CustomCursor = () => {
    const [isHovering, setIsHovering] = useState(false);
    const [isVisible, setIsVisible] = useState(false); // Hide until mouse moves
    const [isMobile, setIsMobile] = useState(true);

    // Smooth spring physics for the cursor
    const springConfig = { damping: 25, stiffness: 200, mass: 0.5 };
    const cursorX = useSpring(-100, springConfig);
    const cursorY = useSpring(-100, springConfig);

    useEffect(() => {
        // Only activate on desktop (touch devices don't need a cursor)
        const checkMobile = () => {
            const hasTouch = window.matchMedia("(pointer: coarse)").matches;
            setIsMobile(hasTouch);
        };

        checkMobile();
        // Fallback for resizing (e.g. Chrome DevTools toggle)
        window.addEventListener('resize', checkMobile);

        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    useEffect(() => {
        if (isMobile) return;

        const handleMouseMove = (e: MouseEvent) => {
            if (!isVisible) setIsVisible(true);

            // Offset by half the cursor size (standard size is 24px)
            const offset = isHovering ? 32 : 12;

            cursorX.set(e.clientX - offset);
            cursorY.set(e.clientY - offset);
        };

        const handleMouseOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            // Check if hovering over a link, button, or custom magnetic element
            if (
                target.tagName.toLowerCase() === 'a' ||
                target.tagName.toLowerCase() === 'button' ||
                target.closest('a') ||
                target.closest('button') ||
                target.classList.contains('magnetic-target') ||
                getComputedStyle(target).cursor === 'pointer'
            ) {
                setIsHovering(true);
            } else {
                setIsHovering(false);
            }
        };

        const handleMouseLeave = () => setIsVisible(false);
        const handleMouseEnter = () => setIsVisible(true);

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseover', handleMouseOver);
        document.body.addEventListener('mouseleave', handleMouseLeave);
        document.body.addEventListener('mouseenter', handleMouseEnter);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseover', handleMouseOver);
            document.body.removeEventListener('mouseleave', handleMouseLeave);
            document.body.removeEventListener('mouseenter', handleMouseEnter);
        };
    }, [isMobile, isVisible, isHovering, cursorX, cursorY]);

    if (isMobile) return null;

    return (
        <motion.div
            className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-exclusion rounded-full flex items-center justify-center"
            style={{
                x: cursorX,
                y: cursorY,
                width: isHovering ? 64 : 24,
                height: isHovering ? 64 : 24,
                backgroundColor: isHovering ? "rgba(255, 255, 255, 0.1)" : "#fdf6e9",
                border: isHovering ? "1px solid rgba(255, 255, 255, 0.5)" : "none",
                opacity: isVisible ? 1 : 0,
            }}
            transition={{ type: "tween", ease: "backOut", duration: 0.2 }}
        >
            {/* Optional inner dot or text for hover state */}
            {isHovering && (
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="w-1.5 h-1.5 rounded-full bg-white"
                />
            )}
        </motion.div>
    );
};
