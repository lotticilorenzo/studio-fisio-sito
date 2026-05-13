import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

export const Preloader = () => {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 900);

        return () => clearTimeout(timer);
    }, []);

    return (
        <AnimatePresence>
            {isLoading && (
                <motion.div
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0, y: -50 }}
                    transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
                    className="fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden bg-background"
                >
                    <div className="relative w-32 h-32 flex justify-center items-center mb-12">
                        <motion.div
                            className="absolute w-full h-full rounded-full border-[1px] border-primary/20"
                            animate={{ scale: [1, 1.5, 1], opacity: [0.3, 0.1, 0.3] }}
                            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                        />
                        <motion.div
                            className="absolute w-20 h-20 rounded-full border-[1px] border-accent/40"
                            animate={{ scale: [1, 0.8, 1], opacity: [0.3, 0.8, 0.3] }}
                            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
                        />
                    </div>

                    <motion.div className="flex flex-col items-center overflow-hidden">
                        <motion.h1
                            initial={{ y: 50, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                            className="font-sans text-3xl font-semibold tracking-[-0.04em] text-primary"
                        >
                            Studio Fisyo
                        </motion.h1>
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: "100%" }}
                            transition={{ duration: 1.5, delay: 0.5, ease: "easeInOut" }}
                            className="mt-6 h-[1px] bg-accent/50"
                        />
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};
