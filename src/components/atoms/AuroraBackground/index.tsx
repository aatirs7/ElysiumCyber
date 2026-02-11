import React, { useRef, useEffect, useState } from 'react';

export default function AuroraBackground() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const halftoneCanvasRef = useRef<HTMLCanvasElement | null>(null);
    const animationRef = useRef<number>(0);
    const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

    // Diagonal magenta/pink streaks
    const streaksRef = useRef([
        { offset: 0, speed: 0.15, width: 180, opacity: 0.85, color: [200, 100, 140] },
        { offset: 200, speed: 0.12, width: 140, opacity: 0.7, color: [180, 80, 130] },
        { offset: 450, speed: 0.18, width: 200, opacity: 0.75, color: [220, 120, 160] },
        { offset: 650, speed: 0.1, width: 120, opacity: 0.6, color: [160, 70, 110] },
        { offset: 850, speed: 0.14, width: 160, opacity: 0.65, color: [190, 90, 140] },
    ]);

    // Track container dimensions via ResizeObserver
    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const updateDimensions = () => {
            setDimensions({ width: container.clientWidth, height: container.clientHeight });
        };

        updateDimensions();
        const observer = new ResizeObserver(updateDimensions);
        observer.observe(container);
        return () => observer.disconnect();
    }, []);

    // Pre-render halftone dot pattern to offscreen canvas
    useEffect(() => {
        if (dimensions.width === 0) return;
        const { width, height } = dimensions;
        const dpr = typeof window !== 'undefined' ? window.devicePixelRatio || 1 : 1;

        const halftoneCanvas = document.createElement('canvas');
        halftoneCanvas.width = width * dpr;
        halftoneCanvas.height = height * dpr;
        const hCtx = halftoneCanvas.getContext('2d');
        if (!hCtx) return;
        hCtx.scale(dpr, dpr);

        const dotSpacing = 4;
        const dotRadius = 0.6;
        hCtx.fillStyle = 'rgba(255, 255, 255, 0.04)';

        for (let y = 0; y < height; y += dotSpacing) {
            for (let x = 0; x < width; x += dotSpacing) {
                hCtx.beginPath();
                hCtx.arc(x, y, dotRadius, 0, Math.PI * 2);
                hCtx.fill();
            }
        }
        halftoneCanvasRef.current = halftoneCanvas;
    }, [dimensions]);

    // Main animation loop
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas || dimensions.width === 0) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;
        const { width, height } = dimensions;
        const dpr = typeof window !== 'undefined' ? window.devicePixelRatio || 1 : 1;
        canvas.width = width * dpr;
        canvas.height = height * dpr;
        ctx.scale(dpr, dpr);

        const diagonal = Math.sqrt(width * width + height * height);
        let lastTime = 0;
        const streaks = streaksRef.current;

        // Check for reduced motion preference
        const prefersReducedMotion =
            typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        const drawStreak = (
            ctx: CanvasRenderingContext2D,
            streak: { offset: number; width: number; opacity: number; color: number[] },
            width: number,
            height: number,
            diagonal: number
        ) => {
            const { offset, width: streakWidth, opacity, color } = streak;
            ctx.save();
            ctx.translate(width / 2, height / 2);
            ctx.rotate(-Math.PI / 3.6);

            const x = offset - diagonal / 2;
            const gradient = ctx.createLinearGradient(x - streakWidth, 0, x + streakWidth, 0);
            const [r, g, b] = color;
            gradient.addColorStop(0, `rgba(${r}, ${g}, ${b}, 0)`);
            gradient.addColorStop(0.15, `rgba(${r}, ${g}, ${b}, ${opacity * 0.2})`);
            gradient.addColorStop(0.35, `rgba(${r}, ${g}, ${b}, ${opacity * 0.6})`);
            gradient.addColorStop(0.5, `rgba(${r}, ${g}, ${b}, ${opacity})`);
            gradient.addColorStop(0.65, `rgba(${r}, ${g}, ${b}, ${opacity * 0.6})`);
            gradient.addColorStop(0.85, `rgba(${r}, ${g}, ${b}, ${opacity * 0.2})`);
            gradient.addColorStop(1, `rgba(${r}, ${g}, ${b}, 0)`);

            ctx.fillStyle = gradient;
            ctx.fillRect(x - streakWidth, -diagonal, streakWidth * 2, diagonal * 2);
            ctx.restore();
        };

        const drawVignette = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
            const gradient = ctx.createRadialGradient(
                width / 2,
                height / 2,
                0,
                width / 2,
                height / 2,
                Math.max(width, height) * 0.7
            );
            gradient.addColorStop(0, 'rgba(13, 5, 9, 0)');
            gradient.addColorStop(0.5, 'rgba(13, 5, 9, 0.1)');
            gradient.addColorStop(1, 'rgba(13, 5, 9, 0.5)');
            ctx.fillStyle = gradient;
            ctx.fillRect(0, 0, width, height);
        };

        const render = (currentTime: number) => {
            const deltaTime = lastTime ? currentTime - lastTime : 16.67;
            lastTime = currentTime;

            // Dark burgundy/black base
            ctx.fillStyle = '#0d0509';
            ctx.fillRect(0, 0, width, height);

            // Animate streaks (skip movement if reduced motion)
            streaks.forEach((streak) => {
                if (!prefersReducedMotion) {
                    streak.offset += streak.speed * (deltaTime / 16.67);
                    const maxOffset = diagonal + streak.width * 2;
                    if (streak.offset > maxOffset) streak.offset = -streak.width * 2;
                }
                drawStreak(ctx, streak, width, height, diagonal);
            });

            // Halftone dot overlay (additive blending)
            if (halftoneCanvasRef.current) {
                ctx.globalCompositeOperation = 'lighter';
                ctx.drawImage(halftoneCanvasRef.current, 0, 0, width, height);
                ctx.globalCompositeOperation = 'source-over';
            }

            // Vignette darkening at edges
            drawVignette(ctx, width, height);

            if (!prefersReducedMotion) {
                animationRef.current = requestAnimationFrame(render);
            }
        };

        animationRef.current = requestAnimationFrame(render);
        return () => {
            if (animationRef.current) cancelAnimationFrame(animationRef.current);
        };
    }, [dimensions]);

    return (
        <div ref={containerRef} style={{ position: 'absolute', inset: 0, overflow: 'hidden', zIndex: 0 }}>
            <canvas
                ref={canvasRef}
                style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
            />
        </div>
    );
}
