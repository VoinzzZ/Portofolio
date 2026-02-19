"use client";

import { useEffect, useRef, useState } from "react";

type Direction = "diagonal" | "up" | "right" | "down" | "left" | "none";

interface SquaresProps {
    direction?: Direction;
    speed?: number;
    squareSize?: number;
    className?: string;
    style?: React.CSSProperties;
}

function getThemeColors() {
    if (typeof document === "undefined") {
        return {
            borderColor: "rgba(255,255,255,0.08)",
            hoverFillColor: "rgba(255,255,255,0.05)",
        };
    }
    const theme = document.documentElement.getAttribute("data-theme");
    if (theme === "light") {
        return {
            borderColor: "rgba(0,0,0,0.1)",
            hoverFillColor: "rgba(0,0,0,0.05)",
        };
    }
    return {
        borderColor: "rgba(255,255,255,0.08)",
        hoverFillColor: "rgba(255,255,255,0.05)",
    };
}

export function Squares({
    direction = "diagonal",
    speed = 0.5,
    squareSize = 40,
    className,
    style,
}: SquaresProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const requestRef = useRef<number>(0);
    const gridOffset = useRef({ x: 0, y: 0 });
    const hoveredSquare = useRef<{ x: number; y: number } | null>(null);
    const colorsRef = useRef(getThemeColors());
    const [, forceUpdate] = useState(0);

    // Watch for theme changes via MutationObserver
    useEffect(() => {
        const observer = new MutationObserver(() => {
            colorsRef.current = getThemeColors();
            forceUpdate((n) => n + 1);
        });

        observer.observe(document.documentElement, {
            attributes: true,
            attributeFilter: ["data-theme"],
        });

        // Sync on first mount
        colorsRef.current = getThemeColors();

        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const resizeCanvas = () => {
            canvas.width = canvas.offsetWidth;
            canvas.height = canvas.offsetHeight;
        };

        window.addEventListener("resize", resizeCanvas);
        resizeCanvas();

        const drawGrid = () => {
            if (!ctx || !canvas) return;
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            const { borderColor, hoverFillColor } = colorsRef.current;

            const startX =
                Math.floor(gridOffset.current.x / squareSize) * squareSize;
            const startY =
                Math.floor(gridOffset.current.y / squareSize) * squareSize;

            for (
                let x = startX - squareSize;
                x < canvas.width + squareSize;
                x += squareSize
            ) {
                for (
                    let y = startY - squareSize;
                    y < canvas.height + squareSize;
                    y += squareSize
                ) {
                    const squareX = Math.floor(
                        (x - gridOffset.current.x) / squareSize
                    );
                    const squareY = Math.floor(
                        (y - gridOffset.current.y) / squareSize
                    );

                    const drawX = x - (gridOffset.current.x % squareSize);
                    const drawY = y - (gridOffset.current.y % squareSize);

                    if (
                        hoveredSquare.current &&
                        hoveredSquare.current.x === squareX &&
                        hoveredSquare.current.y === squareY
                    ) {
                        ctx.fillStyle = hoverFillColor;
                        ctx.fillRect(drawX, drawY, squareSize, squareSize);
                    }

                    ctx.strokeStyle = borderColor;
                    ctx.strokeRect(drawX, drawY, squareSize, squareSize);
                }
            }
        };

        const updateAnimation = () => {
            const effectiveSpeed = Math.max(speed, 0);
            switch (direction) {
                case "right":
                    gridOffset.current.x =
                        (gridOffset.current.x - effectiveSpeed + squareSize) % squareSize;
                    break;
                case "left":
                    gridOffset.current.x =
                        (gridOffset.current.x + effectiveSpeed + squareSize) % squareSize;
                    break;
                case "up":
                    gridOffset.current.y =
                        (gridOffset.current.y + effectiveSpeed + squareSize) % squareSize;
                    break;
                case "down":
                    gridOffset.current.y =
                        (gridOffset.current.y - effectiveSpeed + squareSize) % squareSize;
                    break;
                case "diagonal":
                    gridOffset.current.x =
                        (gridOffset.current.x - effectiveSpeed + squareSize) % squareSize;
                    gridOffset.current.y =
                        (gridOffset.current.y - effectiveSpeed + squareSize) % squareSize;
                    break;
                default:
                    break;
            }
            drawGrid();
            requestRef.current = requestAnimationFrame(updateAnimation);
        };

        const handleMouseMove = (event: MouseEvent) => {
            const rect = canvas.getBoundingClientRect();
            const mouseX = event.clientX - rect.left;
            const mouseY = event.clientY - rect.top;

            const squareX = Math.floor(
                (mouseX + gridOffset.current.x) / squareSize
            );
            const squareY = Math.floor(
                (mouseY + gridOffset.current.y) / squareSize
            );

            if (
                !hoveredSquare.current ||
                hoveredSquare.current.x !== squareX ||
                hoveredSquare.current.y !== squareY
            ) {
                hoveredSquare.current = { x: squareX, y: squareY };
            }
        };

        const handleMouseLeave = () => {
            hoveredSquare.current = null;
        };

        canvas.addEventListener("mousemove", handleMouseMove);
        canvas.addEventListener("mouseleave", handleMouseLeave);

        requestRef.current = requestAnimationFrame(updateAnimation);

        return () => {
            window.removeEventListener("resize", resizeCanvas);
            canvas.removeEventListener("mousemove", handleMouseMove);
            canvas.removeEventListener("mouseleave", handleMouseLeave);
            cancelAnimationFrame(requestRef.current);
        };
    }, [direction, speed, squareSize]);

    return (
        <canvas
            ref={canvasRef}
            className={className}
            style={{
                width: "100%",
                height: "100%",
                ...style,
            }}
        />
    );
}
