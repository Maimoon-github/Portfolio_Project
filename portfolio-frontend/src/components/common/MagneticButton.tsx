// src/components/common/MagneticButton.tsx
'use client';

import { forwardRef, ReactNode, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useReducedMotion } from '@/hooks/use-reduced-motion';

export interface MagneticButtonProps {
  children: ReactNode;
  className?: string;
  variant?: 'primary' | 'secondary' | 'outline';
  href?: string;
  onClick?: () => void;
  external?: boolean;
  magneticStrength?: number;
  magneticRadius?: number;
}

export const MagneticButton = forwardRef<HTMLButtonElement | HTMLAnchorElement, MagneticButtonProps>(
  (
    {
      children,
      className,
      variant = 'primary',
      href,
      onClick,
      external = false,
      magneticStrength = 30,
      magneticRadius = 150,
    },
    ref
  ) => {
    const buttonRef = useRef<HTMLDivElement>(null);
    const [isHovered, setIsHovered] = useState(false);
    const prefersReduced = useReducedMotion();

    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const springConfig = { stiffness: 150, damping: 15, mass: 0.1 };
    const springX = useSpring(x, springConfig);
    const springY = useSpring(y, springConfig);

    const magneticX = useTransform(springX, (value) => {
      if (!isHovered || prefersReduced) return 0;
      return value * magneticStrength;
    });
    const magneticY = useTransform(springY, (value) => {
      if (!isHovered || prefersReduced) return 0;
      return value * magneticStrength;
    });

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
      if (prefersReduced) return;
      const rect = e.currentTarget.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const distance = Math.hypot(mouseX - centerX, mouseY - centerY);
      if (distance < magneticRadius) {
        const normX = (mouseX - centerX) / magneticRadius;
        const normY = (mouseY - centerY) / magneticRadius;
        x.set(normX);
        y.set(normY);
      } else {
        x.set(0);
        y.set(0);
      }
    };

    const handleMouseLeave = () => {
      setIsHovered(false);
      x.set(0);
      y.set(0);
    };

    const handleMouseEnter = () => {
      setIsHovered(true);
    };

    const baseStyles =
      'relative inline-flex items-center justify-center font-medium transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:opacity-50 disabled:pointer-events-none px-6 py-3 rounded-lg';

    const variantStyles = {
      primary: 'bg-primary text-on-primary hover:bg-primary/90 hover:shadow-[0_0_12px_var(--color-accent-muted)]',
      secondary: 'bg-secondary text-on-secondary hover:bg-secondary/90',
      outline: 'border border-outline bg-transparent text-on-background hover:bg-surface-container-high hover:border-primary',
    };

    const content = (
      <motion.span
        style={{ x: magneticX, y: magneticY }}
        transition={{ type: 'spring', stiffness: 400, damping: 25 }}
        className="inline-block"
      >
        {children}
      </motion.span>
    );

    const commonProps = {
      className: cn(baseStyles, variantStyles[variant], className),
      onClick,
      onMouseEnter: handleMouseEnter,
      onMouseLeave: handleMouseLeave,
    };

    if (href) {
      const linkProps = external
        ? { target: '_blank', rel: 'noopener noreferrer' }
        : {};
      return (
        <div
          ref={buttonRef}
          onMouseMove={handleMouseMove}
          className="inline-block"
        >
          <motion.a
            ref={ref as React.Ref<HTMLAnchorElement>}
            href={href}
            {...linkProps}
            {...commonProps}
          >
            {content}
          </motion.a>
        </div>
      );
    }

    return (
      <div
        ref={buttonRef}
        onMouseMove={handleMouseMove}
        className="inline-block"
      >
        <motion.button
          ref={ref as React.Ref<HTMLButtonElement>}
          {...commonProps}
        >
          {content}
        </motion.button>
      </div>
    );
  }
);

MagneticButton.displayName = 'MagneticButton';