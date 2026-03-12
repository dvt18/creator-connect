import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowUpRight, TrendingUp } from "lucide-react";
import { creators } from "@/data/mockData";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.5 },
  }),
};

export default function CreatorsSection() {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Subtle background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-secondary/40 via-secondary/20 to-transparent" />

      <div className="relative max-w-6xl mx-auto px-4">
        <motion.div
          className="flex items-end justify-between mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div>
            <span className="text-primary font-semibold text-sm uppercase tracking-widest">
              Featured
            </span>
            <h2 className="text-3xl md:text-5xl font-bold text-foreground mt-3">
              Top Creators
            </h2>
          </div>
          <Link
            to="/discover"
            className="hidden md:flex items-center gap-1 text-primary font-semibold text-sm hover:gap-2 transition-all"
          >
            View all <ArrowUpRight className="h-4 w-4" />
          </Link>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {creators.slice(0, 3).map((c, i) => (
            <motion.div
              key={c.id}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              custom={i}
            >
              <Link
                to={`/profile/creator/${c.id}`}
                className="group block bg-card rounded-2xl overflow-hidden shadow-card border border-border/50 hover:shadow-elevated transition-all duration-300"
              >
                {/* Gradient header strip */}
                <div className="h-20 gradient-primary relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-transparent to-black/20" />
                </div>
                <div className="px-6 pb-6 -mt-10 relative">
                  <img
                    src={c.avatar}
                    alt={c.name}
                    className="w-16 h-16 rounded-xl object-cover border-4 border-card shadow-lg group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="mt-3">
                    <div className="font-bold text-card-foreground text-lg">
                      {c.name}
                    </div>
                    <div className="text-sm text-muted-foreground mb-3">
                      {c.niche}
                    </div>
                    <div className="flex items-center gap-4 text-sm">
                      <div className="flex items-center gap-1">
                        <span className="font-bold text-card-foreground">
                          {c.followers}
                        </span>
                        <span className="text-muted-foreground">followers</span>
                      </div>
                      <div className="flex items-center gap-1 text-emerald-600">
                        <TrendingUp className="h-3.5 w-3.5" />
                        <span className="font-semibold">{c.engagement}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
