import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowUpRight, Clock, Users, Wallet } from "lucide-react";
import { campaigns } from "@/data/mockData";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5 },
  }),
};

export default function CampaignsSection() {
  return (
    <section className="py-24">
      <div className="max-w-6xl mx-auto px-4">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="text-primary font-semibold text-sm uppercase tracking-widest">
            Opportunities
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mt-3">
            Active Campaigns
          </h2>
          <p className="text-muted-foreground mt-3 max-w-lg mx-auto">
            Browse live campaigns from top brands and apply today
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {campaigns.slice(0, 4).map((c, i) => (
            <motion.div
              key={c.id}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              custom={i}
            >
              <Link
                to={`/campaign/${c.id}`}
                className="group block bg-card rounded-2xl p-6 shadow-card border border-border/50 hover:shadow-elevated hover:border-primary/20 transition-all duration-300"
              >
                <div className="flex items-start gap-4 mb-4">
                  <img
                    src={c.brandLogo}
                    alt={c.brandName}
                    className="w-12 h-12 rounded-xl object-cover shadow-sm"
                  />
                  <div className="flex-1">
                    <div className="font-bold text-card-foreground text-lg group-hover:text-primary transition-colors">
                      {c.title}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {c.brandName}
                    </div>
                  </div>
                  <ArrowUpRight className="h-5 w-5 text-muted-foreground group-hover:text-primary group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all" />
                </div>
                <div className="flex flex-wrap gap-3">
                  {[
                    { icon: Wallet, text: c.budget },
                    { icon: Users, text: `${c.creatorsNeeded} creators` },
                    { icon: Clock, text: c.deadline },
                  ].map((tag, ti) => (
                    <span
                      key={ti}
                      className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground bg-secondary/80 rounded-lg px-3 py-1.5"
                    >
                      <tag.icon className="h-3.5 w-3.5" />
                      {tag.text}
                    </span>
                  ))}
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
