import { motion } from 'framer-motion';
export function ScrollReveal({ children }: { children: React.ReactNode }) {
  return <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}>{children}</motion.div>;
}
