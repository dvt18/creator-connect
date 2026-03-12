import { motion } from "framer-motion";
import { Heart, TrendingUp, DollarSign, Users, Star } from "lucide-react";

const cards = [
  {
    icon: Heart,
    label: "12.4K Likes",
    color: "from-pink-500/20 to-rose-500/10",
    iconColor: "text-pink-500",
    x: "8%",
    y: "18%",
    delay: 0,
    rotate: -6,
  },
  {
    icon: TrendingUp,
    label: "↑ 340% Growth",
    color: "from-emerald-500/20 to-green-500/10",
    iconColor: "text-emerald-500",
    x: "78%",
    y: "12%",
    delay: 0.5,
    rotate: 4,
  },
  {
    icon: DollarSign,
    label: "₹2.5L Earned",
    color: "from-amber-500/20 to-yellow-500/10",
    iconColor: "text-amber-500",
    x: "5%",
    y: "65%",
    delay: 1,
    rotate: 5,
  },
  {
    icon: Users,
    label: "50K+ Reach",
    color: "from-blue-500/20 to-cyan-500/10",
    iconColor: "text-blue-500",
    x: "82%",
    y: "60%",
    delay: 1.5,
    rotate: -3,
  },
  {
    icon: Star,
    label: "Top Creator",
    color: "from-purple-500/20 to-violet-500/10",
    iconColor: "text-purple-500",
    x: "70%",
    y: "38%",
    delay: 2,
    rotate: 7,
  },
];

export default function FloatingCards() {
  return (
    <div className="absolute inset-0 pointer-events-none hidden lg:block">
      {cards.map((card, i) => (
        <motion.div
          key={i}
          className={`absolute bg-gradient-to-br ${card.color} backdrop-blur-xl border border-border/50 rounded-2xl px-4 py-3 shadow-elevated flex items-center gap-2.5`}
          style={{ left: card.x, top: card.y, rotate: card.rotate }}
          initial={{ opacity: 0, scale: 0.5, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ delay: 0.8 + card.delay * 0.3, duration: 0.6, type: "spring" }}
        >
          <motion.div
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 3 + i * 0.5, repeat: Infinity, ease: "easeInOut", delay: i * 0.3 }}
          >
            <div className={`w-9 h-9 rounded-xl bg-card/80 flex items-center justify-center ${card.iconColor}`}>
              <card.icon className="h-4.5 w-4.5" />
            </div>
          </motion.div>
          <span className="text-sm font-semibold text-foreground whitespace-nowrap">{card.label}</span>
        </motion.div>
      ))}
    </div>
  );
}
