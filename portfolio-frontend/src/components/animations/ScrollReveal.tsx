import { motion } from 'framer-motion';
interface ScrollRevealProps {
  children: React.ReactNode;
  delay?: number;
}

export function ScrollReveal({ children, delay = 0 }: ScrollRevealProps) {

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ delay, duration: 0.5 }}
      viewport={{ once: true }}
    >
      {children}
    </motion.div>
  );
}
