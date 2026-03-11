import { motion } from "framer-motion";
import { ReactNode } from "react";

interface AnimatedCardProps {
  children: ReactNode;
  index?: number;
  className?: string;
  onClick?: () => void;
}

export default function AnimatedCard({ children, index = 0, className = "", onClick }: AnimatedCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.08, ease: "easeOut" }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className={className}
      onClick={onClick}
    >
      {children}
    </motion.div>
  );
}
