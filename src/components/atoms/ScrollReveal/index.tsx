'use client';

import * as React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

interface ScrollRevealProps {
    children: React.ReactNode;
    className?: string;
    delay?: number;
    duration?: number;
    direction?: 'up' | 'down' | 'left' | 'right' | 'none';
    distance?: number;
    animate?: boolean;
}

export default function ScrollReveal({
    children,
    className,
    delay = 0,
    duration = 0.6,
    direction = 'up',
    distance = 30,
    animate = false
}: ScrollRevealProps) {
    const prefersReducedMotion = useReducedMotion();

    if (prefersReducedMotion) {
        return <div className={className}>{children}</div>;
    }

    const directionOffset = {
        up: { y: distance, x: 0 },
        down: { y: -distance, x: 0 },
        left: { x: distance, y: 0 },
        right: { x: -distance, y: 0 },
        none: { x: 0, y: 0 }
    };

    const initial = {
        opacity: 0,
        ...directionOffset[direction]
    };

    const target = {
        opacity: 1,
        x: 0,
        y: 0
    };

    const transition = {
        duration,
        delay,
        ease: [0.25, 0.1, 0.25, 1] as const
    };

    if (animate) {
        return (
            <motion.div
                className={className}
                initial={initial}
                animate={target}
                transition={transition}
            >
                {children}
            </motion.div>
        );
    }

    return (
        <motion.div
            className={className}
            initial={initial}
            whileInView={target}
            viewport={{ once: true, margin: '-80px' }}
            transition={transition}
        >
            {children}
        </motion.div>
    );
}
