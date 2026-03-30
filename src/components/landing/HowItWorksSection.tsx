import { motion } from "framer-motion";
import { Users, Target, TrendingUp } from "lucide-react";

const steps = [
  {
    icon: Users,
    step: "01",
    title: "Create Your Profile",
    desc: "Sign up as a creator or brand. Showcase your portfolio, audience stats, and set your rates.",
    color: "from-cyan-500 to-teal-500",
    glow: "hsl(187 96% 43% / 0.25)",
  },
  {
    icon: Target,
    step: "02",
    title: "Find Perfect Matches",
    desc: "Browse campaigns or discover creators with smart filters for niche, budget, and engagement.",
    color: "from-blue-500 to-cyan-500",
    glow: "hsl(199 89% 48% / 0.25)",
  },
  {
    icon: TrendingUp,
    step: "03",
    title: "Collaborate & Earn",
    desc: "Work together seamlessly, deliver content, track performance, and get paid securely.",
    color: "from-teal-500 to-emerald-500",
    glow: "hsl(172 66% 40% / 0.25)",
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

export default function HowItWorksSection() {
  return (
    <section className="py-24 relative">
      {/* Subtle section divider gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/[0.03] to-transparent pointer-events-none" />

      <div className="relative max-w-6xl mx-auto px-4">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}>
          <span className="text-primary font-semibold text-sm uppercase tracking-widest">
            How It Works
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mt-3">
            Three steps to success
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 relative">
          {/* Connecting line */}
          <div className="hidden md:block absolute top-24 left-[20%] right-[20%] h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

          {steps.map((item, i) => (
            <motion.div
              key={item.title}
              className="relative glass-card rounded-2xl p-8 text-center group hover:neon-border transition-all duration-300"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              custom={i}
              whileHover={{ y: -6 }}
              style={{
                boxShadow: `0 0 0 1px hsl(220 20% 18%)`
              }}>
              {/* Glow on hover */}
              <div
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{ boxShadow: `0 0 40px ${item.glow}`, background: `radial-gradient(ellipse at center, ${item.glow} 0%, transparent 70%)` }}
              />

              <div className="text-5xl font-black text-primary/10 absolute top-4 right-6 select-none">
                {item.step}
              </div>
              <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${item.color} flex items-center justify-center mx-auto mb-5 group-hover:scale-110 group-hover:shadow-glow transition-all duration-300`}>
                <item.icon className="h-7 w-7 text-white" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3">
                {item.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
