import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Rahul Sharma",
    role: "Tech Creator",
    avatar: "RS",
    text: "CreatorHub helped me land 5 brand deals in my first month. The platform is incredibly intuitive and the campaign matching is spot-on.",
    gradient: "from-blue-500 to-cyan-400",
  },
  {
    name: "FitFuel Marketing",
    role: "Brand",
    avatar: "FF",
    text: "We found amazing fitness creators for our campaign. The ROI was 3x compared to traditional advertising channels.",
    gradient: "from-emerald-500 to-teal-400",
  },
  {
    name: "Ananya Mehta",
    role: "Fashion Creator",
    avatar: "AM",
    text: "Finally a platform that values creators fairly. The payment system is transparent and the collaboration tools are world-class!",
    gradient: "from-purple-500 to-pink-400",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.5 },
  }),
};

export default function TestimonialsSection() {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-secondary/30 to-transparent" />

      <div className="relative max-w-6xl mx-auto px-4">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="text-primary font-semibold text-sm uppercase tracking-widest">
            Testimonials
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mt-3">
            Loved by creators & brands
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              className="group bg-card rounded-2xl p-7 shadow-card border border-border/50 hover:shadow-elevated transition-all duration-300 relative"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              custom={i}
              whileHover={{ y: -4 }}
            >
              <Quote className="h-10 w-10 text-primary/10 mb-4" />
              <p className="text-card-foreground text-sm leading-relaxed mb-6">
                "{t.text}"
              </p>
              <div className="flex items-center gap-1 mb-4">
                {[...Array(5)].map((_, si) => (
                  <Star
                    key={si}
                    className="h-4 w-4 fill-amber-400 text-amber-400"
                  />
                ))}
              </div>
              <div className="flex items-center gap-3 pt-4 border-t border-border/50">
                <div
                  className={`w-10 h-10 rounded-xl bg-gradient-to-br ${t.gradient} flex items-center justify-center text-white font-bold text-sm`}
                >
                  {t.avatar}
                </div>
                <div>
                  <div className="font-semibold text-card-foreground text-sm">
                    {t.name}
                  </div>
                  <div className="text-xs text-muted-foreground">{t.role}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
