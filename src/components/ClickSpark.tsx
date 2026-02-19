"use client";

import React, { useEffect, useRef } from "react";

type ClickSparkProps = {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  sparkColor?: "auto" | string;
  sparkCount?: number;
  sparkSize?: number;
  sparkRadius?: number;
  duration?: number;
};

export function ClickSpark({
  children,
  className,
  style,
  sparkColor = "auto",
  sparkCount = 8,
  sparkSize = 10,
  sparkRadius = 15,
  duration = 400,
}: ClickSparkProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sparksRef = useRef<
    Array<{
      x: number;
      y: number;
      angle: number;
      startTime: number;
    }>
  >([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const parent = canvas.parentElement;
    if (!parent) return;

    const updateCanvasSize = () => {
      canvas.width = parent.clientWidth;
      canvas.height = parent.clientHeight;
    };

    updateCanvasSize();
    const resizeObserver = new ResizeObserver(updateCanvasSize);
    resizeObserver.observe(parent);

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;

    const resolveColor = () => {
      if (sparkColor === "auto") {
        const theme = document.documentElement.getAttribute("data-theme");
        if (theme === "dark") return "#fff";
        if (theme === "light") return "#000";
        const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
        return prefersDark ? "#fff" : "#000";
      }
      if (sparkColor.startsWith("var(")) {
        const name = sparkColor.replace("var(", "").replace(")", "").trim();
        return getComputedStyle(document.documentElement).getPropertyValue(name).trim() || "#fff";
      }
      return sparkColor;
    };

    const draw = (timestamp: number) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const resolvedColor = resolveColor();

      sparksRef.current = sparksRef.current.filter((spark) => {
        const elapsed = timestamp - spark.startTime;
        if (elapsed > duration) return false;

        const progress = elapsed / duration;
        const distance = progress * sparkRadius;
        const size = sparkSize * (1 - progress);

        ctx.save();
        ctx.translate(spark.x + Math.cos(spark.angle) * distance, spark.y + Math.sin(spark.angle) * distance);
        ctx.rotate(spark.angle);
        ctx.fillStyle = resolvedColor;
        ctx.fillRect(-size / 2, -size / 2, size, size);
        ctx.restore();

        return true;
      });

      animationFrameId = requestAnimationFrame(draw);
    };

    animationFrameId = requestAnimationFrame(draw);

    return () => {
      resizeObserver.disconnect();
      cancelAnimationFrame(animationFrameId);
    };
  }, [sparkColor, sparkCount, sparkRadius, sparkSize, duration]);

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const parent = canvasRef.current?.parentElement;
    if (!parent) return;

    const rect = parent.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const now = performance.now();
    const sparks = Array.from({ length: sparkCount }, (_, i) => ({
      x,
      y,
      angle: (2 * Math.PI * i) / sparkCount,
      startTime: now,
    }));

    sparksRef.current.push(...sparks);
  };

  return (
    <div
      onClick={handleClick}
      className={className}
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "stretch",
        ...style,
      }}
    >
      <canvas
        ref={canvasRef}
        style={{ position: "absolute", inset: 0, pointerEvents: "none" }}
      />
      {children}
    </div>
  );
}
