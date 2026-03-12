import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function CTASection() {
  return (
    <section className="py-24">
      <div className="max-w-6xl mx-auto px-4">
        <motion.div
          className="relative rounded-3xl overflow-hidden gradient-primary p-12 md:p-20 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          {/* Decorative elements */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-20 -right-20 w-60 h-60 rounded-full bg-white/10 blur-2xl" />
            <div className="absolute -bottom-20 -left-20 w-60 h-60 rounded-full bg-white/10 blur-2xl" />
          </div>

          <div className="relative z-10">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm rounded-full px-4 py-1.5 text-primary-foreground/90 text-sm font-medium mb-6"
            >
              <Sparkles className="h-4 w-4" /> Join 10,000+ creators today
            </motion.div>
            <h2 className="text-3xl md:text-5xl font-extrabold text-primary-foreground mb-4 leading-tight">
              Ready to grow your
              <br />
              creator career?
            </h2>
            <p className="text-primary-foreground/80 text-lg mb-8 max-w-lg mx-auto">
              Start collaborating with brands and monetize your content — completely free to get started.
            </p>
            <Link to="/login">
              <Button
                size="lg"
                className="bg-white text-primary hover:bg-white/90 border-0 gap-2 h-12 px-8 text-base rounded-xl shadow-lg font-semibold"
              >
                Get Started Now <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
