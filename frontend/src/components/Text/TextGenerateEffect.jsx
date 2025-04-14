"use client";
import { useEffect } from "react";
import { motion, stagger, useAnimate } from "motion/react";
import { useInView } from "react-intersection-observer";
import { cn } from "../../lib/utils.js";

export const TextGenerateEffect = ({ words, className, filter = true, duration = 0.5 }) => {
    const [scope, animate] = useAnimate();
    const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });
    const wordsArray = words.split(" ");

    useEffect(() => {
        if (inView) {
            animate(
                "span",
                {
                    opacity: 1,
                    filter: filter ? "blur(0px)" : "none",
                },
                {
                    duration: duration || 1,
                    delay: stagger(0.05),
                }
            );
        }
    }, [inView]);

    return (
        <div ref={ref} className={cn("font-bold", className)}>
            <div className="mt-4">
                <div className="dark:text-white text-black text-2xl leading-snug tracking-wide">
                    <motion.div ref={scope}>
                        {wordsArray.map((word, idx) => (
                            <motion.span
                                key={word + idx}
                                className="dark:text-white text-black opacity-0"
                                style={{
                                    filter: filter ? "blur(10px)" : "none",
                                }}
                            >
                                {word}{" "}
                            </motion.span>
                        ))}
                    </motion.div>
                </div>
            </div>
        </div>
    );
};
