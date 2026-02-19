"use client";

import { useEffect, useRef, useState } from "react";

interface FadeContentProps {
    children: React.ReactNode;
    delay?: number;
    duration?: number;
    blur?: boolean;
    translateY?: number;
    className?: string;
    style?: React.CSSProperties;
}

export function FadeContent({
    children,
    delay = 0,
    duration = 600,
    blur = false,
    translateY = 24,
    className,
    style,
}: FadeContentProps) {
    const ref = useRef<HTMLDivElement>(null);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setVisible(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.1 }
        );

        observer.observe(el);
        return () => observer.disconnect();
    }, []);

    return (
        <div
            ref={ref}
            className={className}
            style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0px)" : `translateY(${translateY}px)`,
                filter: blur
                    ? visible
                        ? "blur(0px)"
                        : "blur(8px)"
                    : undefined,
                transition: `opacity ${duration}ms cubic-bezier(0.22,1,0.36,1) ${delay}s, transform ${duration}ms cubic-bezier(0.22,1,0.36,1) ${delay}s${blur ? `, filter ${duration}ms cubic-bezier(0.22,1,0.36,1) ${delay}s` : ""}`,
                willChange: "opacity, transform",
                ...style,
            }}
        >
            {children}
        </div>
    );
}
