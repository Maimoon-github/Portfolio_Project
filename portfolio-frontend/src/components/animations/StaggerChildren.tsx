import { motion } from 'framer-motion';
export function StaggerChildren({ children }: { children: React.ReactNode }) {
  return <motion.div initial="hidden" animate="visible">{children}</motion.div>;
}
