import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Zap, Users, Target, TrendingUp, Star, Quote } from "lucide-react";
import { Button } from "@/components/ui/button";
import { creators, campaigns } from "@/data/mockData";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.5 } }),
};

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Nav */}
      <nav className="sticky top-0 z-50 glass border-b border-border">
        <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 font-bold text-lg">
            <div className="h-8 w-8 rounded-lg gradient-primary flex items-center justify-center">
              <Zap className="h-4 w-4 text-primary-foreground" />
            </div>
            <span>CreatorHub</span>
          </Link>
          <div className="flex items-center gap-3">
            <Link to="/login">
              <Button variant="ghost" size="sm">Log in</Button>
            </Link>
            <Link to="/login">
              <Button size="sm" className="gradient-primary text-primary-foreground border-0">Get Started</Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="gradient-hero">
        <div className="max-w-6xl mx-auto px-4 py-24 md:py-32 text-center">
          <motion.div initial="hidden" animate="visible" variants={fadeUp} custom={0}>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
              <Zap className="h-3.5 w-3.5" /> #1 Creator-Brand Marketplace
            </span>
          </motion.div>
          <motion.h1
            className="text-4xl md:text-6xl font-extrabold tracking-tight text-foreground mb-4"
            initial="hidden" animate="visible" variants={fadeUp} custom={1}
          >
            Where Brands Meet{" "}
            <span className="bg-clip-text text-transparent gradient-primary">Creators</span>
          </motion.h1>
          <motion.p
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8"
            initial="hidden" animate="visible" variants={fadeUp} custom={2}
          >
            Discover creators, launch campaigns, and collaborate effortlessly.
          </motion.p>
          <motion.div className="flex gap-3 justify-center flex-wrap" initial="hidden" animate="visible" variants={fadeUp} custom={3}>
            <Link to="/login">
              <Button size="lg" className="gradient-primary text-primary-foreground border-0 gap-2">
                Get Started <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link to="/discover">
              <Button size="lg" variant="outline">Explore Creators</Button>
            </Link>
          </motion.div>

          {/* Stats */}
          <motion.div
            className="grid grid-cols-3 gap-6 max-w-lg mx-auto mt-16"
            initial="hidden" animate="visible" variants={fadeUp} custom={4}
          >
            {[
              { label: "Creators", value: "10K+" },
              { label: "Campaigns", value: "2.5K+" },
              { label: "Brands", value: "500+" },
            ].map((s) => (
              <div key={s.label}>
                <div className="text-2xl md:text-3xl font-bold text-foreground">{s.value}</div>
                <div className="text-sm text-muted-foreground">{s.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* How it Works */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-foreground mb-12">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: Users, title: "Create Profile", desc: "Sign up as a creator or brand and showcase your work." },
              { icon: Target, title: "Find Opportunities", desc: "Browse campaigns or discover creators that fit your brand." },
              { icon: TrendingUp, title: "Collaborate & Grow", desc: "Work together, deliver content, and track your success." },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                className="bg-card rounded-xl p-6 shadow-card text-center"
                initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i}
              >
                <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center mx-auto mb-4">
                  <item.icon className="h-6 w-6 text-primary-foreground" />
                </div>
                <h3 className="text-lg font-semibold text-card-foreground mb-2">{item.title}</h3>
                <p className="text-muted-foreground text-sm">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Top Creators */}
      <section className="py-20 bg-secondary/30">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-foreground mb-12">Top Creators</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {creators.slice(0, 3).map((c, i) => (
              <motion.div
                key={c.id}
                initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i}
              >
                <Link to={`/profile/creator/${c.id}`} className="block bg-card rounded-xl p-6 shadow-card hover:shadow-elevated transition-shadow">
                  <div className="flex items-center gap-3 mb-4">
                    <img src={c.avatar} alt={c.name} className="w-12 h-12 rounded-full object-cover" />
                    <div>
                      <div className="font-semibold text-card-foreground">{c.name}</div>
                      <div className="text-sm text-muted-foreground">{c.niche}</div>
                    </div>
                  </div>
                  <div className="flex gap-4 text-sm">
                    <div><span className="font-semibold text-card-foreground">{c.followers}</span> <span className="text-muted-foreground">followers</span></div>
                    <div><span className="font-semibold text-card-foreground">{c.engagement}</span> <span className="text-muted-foreground">engagement</span></div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Active Campaigns */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-foreground mb-12">Active Campaigns</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {campaigns.slice(0, 4).map((c, i) => (
              <motion.div
                key={c.id}
                initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i}
              >
                <Link to={`/campaign/${c.id}`} className="block bg-card rounded-xl p-6 shadow-card hover:shadow-elevated transition-shadow">
                  <div className="flex items-center gap-3 mb-3">
                    <img src={c.brandLogo} alt={c.brandName} className="w-10 h-10 rounded-lg object-cover" />
                    <div>
                      <div className="font-semibold text-card-foreground">{c.title}</div>
                      <div className="text-sm text-muted-foreground">{c.brandName}</div>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                    <span>💰 {c.budget}</span>
                    <span>👥 {c.creatorsNeeded} creators</span>
                    <span>⏰ {c.deadline}</span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-secondary/30">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-foreground mb-12">What People Say</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { name: "Rahul Sharma", role: "Tech Creator", text: "CreatorHub helped me land 5 brand deals in my first month. The platform is incredibly easy to use." },
              { name: "FitFuel Marketing", role: "Brand", text: "We found amazing fitness creators for our campaign. The ROI was incredible compared to traditional ads." },
              { name: "Ananya Mehta", role: "Fashion Creator", text: "Finally a platform that values creators fairly. The campaign matching is spot-on!" },
            ].map((t, i) => (
              <motion.div
                key={t.name}
                className="bg-card rounded-xl p-6 shadow-card"
                initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i}
              >
                <Quote className="h-8 w-8 text-primary/20 mb-3" />
                <p className="text-card-foreground text-sm mb-4">{t.text}</p>
                <div className="flex items-center gap-2">
                  <div className="flex">
                    {[...Array(5)].map((_, si) => (
                      <Star key={si} className="h-3.5 w-3.5 fill-primary text-primary" />
                    ))}
                  </div>
                </div>
                <div className="mt-2">
                  <div className="font-semibold text-card-foreground text-sm">{t.name}</div>
                  <div className="text-xs text-muted-foreground">{t.role}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8">
        <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 font-bold">
            <div className="h-6 w-6 rounded-md gradient-primary flex items-center justify-center">
              <Zap className="h-3 w-3 text-primary-foreground" />
            </div>
            CreatorHub
          </div>
          <p className="text-sm text-muted-foreground">© 2026 CreatorHub. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
