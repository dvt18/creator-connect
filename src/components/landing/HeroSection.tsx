import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Zap, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import FloatingOrbs from "./FloatingOrbs";
import FloatingCards from "./FloatingCards";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.6 }
  })
} as const;

export default function HeroSection() {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden animated-bg">
      <FloatingOrbs />
      <FloatingCards />

      {/* Dot grid overlay */}
      <div className="absolute inset-0 dot-grid opacity-40" />

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />

      <div className="relative max-w-6xl mx-auto px-4 py-24 md:py-32 text-center z-10">
        <motion.div initial="hidden" animate="visible" variants={fadeUp} custom={0}>
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full neon-border bg-primary/5 text-primary text-sm font-semibold mb-8">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
            </span>
            #1 Creator-Brand Marketplace
          </span>
        </motion.div>

        <motion.h1
          className="text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tight text-foreground mb-6 leading-[0.95]"
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          custom={1}>
          Where Brands
          <br />
          Meet{" "}
          <span className="relative inline-block">
            <span className="text-gradient">Creators</span>
            <motion.span
              className="absolute -bottom-2 left-0 right-0 h-1.5 rounded-full gradient-primary"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.8, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              style={{ transformOrigin: "left" }} />
          </span>
        </motion.h1>

        <motion.p
          className="text-lg md:text-xl text-muted-foreground max-w-xl mx-auto mb-10 leading-relaxed"
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          custom={2}>
          Discover top creators, launch viral campaigns, and collaborate
          effortlessly — all in one powerful platform.
        </motion.p>

        <motion.div
          className="flex gap-4 justify-center flex-wrap"
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          custom={3}>
          <Link to="/login">
            <Button
              size="lg"
              className="gradient-primary text-primary-foreground border-0 gap-2 h-12 px-8 text-base rounded-xl shimmer pulse-ring font-semibold hover:opacity-90 transition-opacity">
              Get Started Free <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
          <Link to="/discover">
            <Button
              size="lg"
              variant="outline"
              className="gap-2 h-12 px-8 text-base rounded-xl border-primary/20 bg-primary/5 text-foreground hover:bg-primary/10 hover:border-primary/40 transition-all">
              <Play className="h-4 w-4 text-primary" /> See How It Works
            </Button>
          </Link>
        </motion.div>

        {/* Stats bar */}
        <motion.div
          className="flex items-center justify-center gap-8 md:gap-14 mt-20"
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          custom={4}>
          {[
          { value: "10K+", label: "Active Creators" },
          { value: "2.5K+", label: "Campaigns" },
          { value: "500+", label: "Brands" },
          { value: "₹50Cr+", label: "Paid Out" }].
          map((s) =>
          <div key={s.label} className="text-center group">
              <div className="text-2xl md:text-3xl font-extrabold text-gradient group-hover:scale-110 transition-transform duration-200">
                {s.value}
              </div>
              <div className="text-xs md:text-sm text-muted-foreground mt-0.5">
                {s.label}
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}