'use client';

import * as React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

interface StaggerChildrenProps {
    children: React.ReactNode;
    className?: string;
    staggerDelay?: number;
}

export default function StaggerChildren({ children, className, staggerDelay = 0.1 }: StaggerChildrenProps) {
    const prefersReducedMotion = useReducedMotion();

    if (prefersReducedMotion) {
        return <div className={className}>{children}</div>;
    }

    return (
        <motion.div
            className={className}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            variants={{
                visible: {
                    transition: {
                        staggerChildren: staggerDelay
                    }
                }
            }}
        >
            {children}
        </motion.div>
    );
}

export function StaggerItem({ children, className }: { children: React.ReactNode; className?: string }) {
    return (
        <motion.div
            className={className}
            variants={{
                hidden: { opacity: 0, y: 24 },
                visible: {
                    opacity: 1,
                    y: 0,
                    transition: {
                        duration: 0.5,
                        ease: [0.25, 0.1, 0.25, 1]
                    }
                }
            }}
        >
            {children}
        </motion.div>
    );
}
