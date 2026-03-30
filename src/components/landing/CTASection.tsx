import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function CTASection() {
  return (
    <section className="py-24">
      <div className="max-w-6xl mx-auto px-4">
        <motion.div
          className="relative rounded-3xl overflow-hidden p-12 md:p-20 text-center"
          style={{
            background: "linear-gradient(135deg, hsl(187 96% 43% / 0.15), hsl(199 89% 48% / 0.10), hsl(172 66% 40% / 0.15))",
            border: "1px solid hsl(187 96% 43% / 0.3)",
            boxShadow: "0 0 80px hsl(187 96% 43% / 0.15), 0 0 40px hsl(187 96% 43% / 0.08)",
          }}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}>
          {/* Decorative orbs */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full"
              style={{ background: "radial-gradient(circle, hsl(187 96% 43% / 0.2), transparent 70%)" }} />
            <div className="absolute -bottom-20 -left-20 w-64 h-64 rounded-full"
              style={{ background: "radial-gradient(circle, hsl(172 66% 40% / 0.2), transparent 70%)" }} />
          </div>

          {/* Dot grid overlay */}
          <div className="absolute inset-0 dot-grid opacity-30 pointer-events-none" />

          <div className="relative z-10">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 backdrop-blur-sm rounded-full px-4 py-1.5 text-primary text-sm font-medium mb-6">
              <Sparkles className="h-4 w-4" /> Join 10,000+ creators today
            </motion.div>
            <h2 className="text-3xl md:text-5xl font-extrabold text-foreground mb-4 leading-tight">
              Ready to grow your
              <br />
              <span className="text-gradient">creator career?</span>
            </h2>
            <p className="text-muted-foreground text-lg mb-8 max-w-lg mx-auto">
              Start collaborating with brands and monetize your content — completely free to get started.
            </p>
            <Link to="/login">
              <Button
                size="lg"
                className="gradient-primary text-primary-foreground border-0 gap-2 h-12 px-8 text-base rounded-xl shimmer pulse-ring font-semibold hover:opacity-90 transition-opacity">
                Get Started Now <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
