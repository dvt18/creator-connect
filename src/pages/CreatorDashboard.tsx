import { DollarSign, Target, TrendingUp, BarChart3, Eye, Users, Star, Zap, ArrowUpRight, ArrowDownRight, Clock, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import { campaigns } from "@/data/mockData";
import PageTransition from "@/components/PageTransition";

const primaryStats = [
  { label: "Earnings", value: "₹1,85,000", icon: DollarSign, change: "+12%", up: true, gradient: "from-cyan-500 to-teal-500", glow: "hsl(187 96% 43% / 0.3)" },
  { label: "Campaigns", value: "8", icon: Target, change: "+2", up: true, gradient: "from-blue-500 to-cyan-500", glow: "hsl(199 89% 48% / 0.3)" },
  { label: "Engagement", value: "6.2%", icon: TrendingUp, change: "+0.5%", up: true, gradient: "from-teal-500 to-emerald-500", glow: "hsl(172 66% 40% / 0.3)" },
  { label: "Active", value: "3", icon: BarChart3, change: "Live", up: true, gradient: "from-cyan-500 to-blue-600", glow: "hsl(187 96% 43% / 0.3)" },
];

const secondaryStats = [
  { label: "Profile Views", value: "2.4K", icon: Eye, change: "+18%", up: true },
  { label: "Followers", value: "12.8K", icon: Users, change: "+320", up: true },
  { label: "Avg Rating", value: "4.8", icon: Star, change: "+0.2", up: true },
  { label: "Response Rate", value: "94%", icon: Zap, change: "+3%", up: true },
];

const weeklyData = [
  { day: "Mon", value: 65 },
  { day: "Tue", value: 80 },
  { day: "Wed", value: 45 },
  { day: "Thu", value: 90 },
  { day: "Fri", value: 70 },
  { day: "Sat", value: 95 },
  { day: "Sun", value: 60 },
];

const recentActivity = [
  { text: "Campaign delivered: Summer Collection", time: "2h ago", status: "completed" },
  { text: "New offer from FashionBrand", time: "5h ago", status: "pending" },
  { text: "Payment received: ₹25,000", time: "1d ago", status: "completed" },
];

export default function CreatorDashboard() {
  const maxVal = Math.max(...weeklyData.map((d) => d.value));

  return (
    <PageTransition>
      <div className="min-h-screen bg-background pb-mobile-nav">
        <Navbar />
        <div className="max-w-6xl mx-auto px-3 sm:px-4 py-4 sm:py-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-4 sm:mb-6">
            <h1 className="text-lg sm:text-2xl font-bold text-foreground">Dashboard</h1>
            <span className="text-[10px] sm:text-xs text-primary bg-primary/10 border border-primary/20 px-2 py-1 rounded-full font-medium">
              Last 30 days
            </span>
          </div>

          {/* Primary Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-4 mb-3 sm:mb-6">
            {primaryStats.map((s, i) => (
              <motion.div
                key={s.label}
                className="glass-card rounded-xl p-3 sm:p-5 group hover:neon-border transition-all duration-300"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: i * 0.06 }}
                whileHover={{ y: -3, transition: { duration: 0.2 } }}>
                {/* Hover glow */}
                <div
                  className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{ boxShadow: `0 0 30px ${s.glow}` }} />
                <div className="flex items-center justify-between mb-1.5 sm:mb-3">
                  <div className={`w-7 h-7 sm:w-10 sm:h-10 rounded-lg bg-gradient-to-br ${s.gradient} flex items-center justify-center`}>
                    <s.icon className="h-3.5 w-3.5 sm:h-5 sm:w-5 text-white" />
                  </div>
                  <span className={`text-[10px] sm:text-xs font-medium flex items-center gap-0.5 px-1.5 py-0.5 rounded-full ${
                    s.up ? "text-cyan-400 bg-cyan-400/10" : "text-destructive bg-destructive/10"
                  }`}>
                    {s.up ? <ArrowUpRight className="h-2.5 w-2.5" /> : <ArrowDownRight className="h-2.5 w-2.5" />}
                    {s.change}
                  </span>
                </div>
                <div className="text-lg sm:text-2xl font-bold text-foreground leading-tight">{s.value}</div>
                <div className="text-[10px] sm:text-xs text-muted-foreground mt-0.5">{s.label}</div>
                {/* Bottom glow bar */}
                <div className={`h-0.5 w-full mt-2 sm:mt-3 rounded-full bg-gradient-to-r ${s.gradient} opacity-60`} />
              </motion.div>
            ))}
          </div>

          {/* Secondary Stats */}
          <div className="flex gap-2 sm:grid sm:grid-cols-4 sm:gap-4 mb-3 sm:mb-6 overflow-x-auto pb-1 -mx-3 px-3 sm:mx-0 sm:px-0">
            {secondaryStats.map((s, i) => (
              <motion.div
                key={s.label}
                className="glass-card rounded-xl p-2.5 sm:p-4 min-w-[120px] sm:min-w-0 flex-shrink-0 sm:flex-shrink"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.25 + i * 0.06 }}>
                <div className="flex items-center gap-1.5 mb-1">
                  <s.icon className="h-3 w-3 sm:h-4 sm:w-4 text-primary" />
                  <span className="text-[10px] sm:text-xs text-muted-foreground truncate">{s.label}</span>
                </div>
                <div className="text-sm sm:text-lg font-bold text-foreground">{s.value}</div>
                <span className="text-[9px] sm:text-xs text-cyan-400 font-medium">{s.change}</span>
              </motion.div>
            ))}
          </div>

          {/* Weekly Performance Chart */}
          <motion.div
            className="glass-card rounded-xl p-3 sm:p-5 mb-3 sm:mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.4 }}>
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-sm sm:text-base font-semibold text-foreground">Weekly Performance</h2>
              <span className="text-[10px] sm:text-xs text-muted-foreground">Engagement Score</span>
            </div>
            <div className="flex items-end gap-1.5 sm:gap-3 h-20 sm:h-32">
              {weeklyData.map((d, i) => (
                <motion.div
                  key={d.day}
                  className="flex-1 flex flex-col items-center gap-1"
                  initial={{ scaleY: 0 }}
                  animate={{ scaleY: 1 }}
                  transition={{ duration: 0.4, delay: 0.5 + i * 0.05 }}
                  style={{ transformOrigin: "bottom" }}>
                  <div
                    className="w-full rounded-md gradient-primary opacity-70 hover:opacity-100 transition-opacity cursor-pointer"
                    style={{
                      height: `${(d.value / maxVal) * 100}%`,
                      minHeight: "4px",
                      boxShadow: `0 0 8px hsl(187 96% 43% / 0.4)`
                    }}
                    title={`${d.value}%`}
                  />
                  <span className="text-[9px] sm:text-[11px] text-muted-foreground">{d.day}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Two column layout */}
          <div className="grid lg:grid-cols-2 gap-3 sm:gap-6 mb-3 sm:mb-6">
            {/* My Campaigns */}
            <motion.div
              className="glass-card rounded-xl p-3 sm:p-5"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.5 }}>
              <h2 className="text-sm sm:text-base font-semibold text-foreground mb-3">My Campaigns</h2>
              <div className="space-y-2">
                {campaigns.slice(0, 3).map((c, i) => (
                  <motion.div
                    key={c.id}
                    className="flex items-center justify-between p-2 sm:p-3 rounded-lg bg-secondary/30 hover:bg-secondary/50 border border-border/30 hover:border-primary/20 transition-all"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.55 + i * 0.08 }}>
                    <div className="flex items-center gap-2 sm:gap-3 min-w-0">
                      <img src={c.brandLogo} alt={c.brandName} className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg object-cover flex-shrink-0 border border-border/50" />
                      <div className="min-w-0">
                        <div className="font-medium text-foreground text-xs sm:text-sm truncate">{c.title}</div>
                        <div className="text-[10px] sm:text-xs text-muted-foreground">{c.brandName}</div>
                      </div>
                    </div>
                    <div className="text-right flex-shrink-0 ml-2">
                      <div className="font-semibold text-primary text-xs sm:text-sm">{c.budget}</div>
                      <div className="text-[10px] sm:text-xs text-muted-foreground">{c.deadline}</div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Recent Activity */}
            <motion.div
              className="glass-card rounded-xl p-3 sm:p-5"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.55 }}>
              <h2 className="text-sm sm:text-base font-semibold text-foreground mb-3">Recent Activity</h2>
              <div className="space-y-2">
                {recentActivity.map((a, i) => (
                  <motion.div
                    key={i}
                    className="flex items-start gap-2 sm:gap-3 p-2 sm:p-3 rounded-lg bg-secondary/30 border border-border/30"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3, delay: 0.6 + i * 0.08 }}>
                    {a.status === "completed" ? (
                      <CheckCircle2 className="h-4 w-4 text-cyan-400 flex-shrink-0 mt-0.5" />
                    ) : (
                      <Clock className="h-4 w-4 text-muted-foreground flex-shrink-0 mt-0.5" />
                    )}
                    <div className="min-w-0">
                      <div className="text-xs sm:text-sm text-foreground leading-tight">{a.text}</div>
                      <div className="text-[10px] sm:text-xs text-muted-foreground mt-0.5">{a.time}</div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Service Listings */}
          <motion.div
            className="glass-card rounded-xl p-3 sm:p-5"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.65 }}>
            <h2 className="text-sm sm:text-base font-semibold text-foreground mb-3">Service Listings</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-4">
              {[
                { name: "Instagram Reel", price: "₹10,000", orders: 15, trend: "+5" },
                { name: "Story Promo", price: "₹3,000", orders: 28, trend: "+8" },
                { name: "YouTube Review", price: "₹25,000", orders: 6, trend: "+1" },
                { name: "Brand Collab Post", price: "₹15,000", orders: 10, trend: "+3" },
              ].map((s, i) => (
                <motion.div
                  key={s.name}
                  className="p-2.5 sm:p-4 rounded-lg bg-secondary/30 hover:bg-secondary/50 border border-border/30 hover:border-primary/20 transition-all group"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.7 + i * 0.06 }}>
                  <div className="font-medium text-foreground text-xs sm:text-sm mb-0.5 truncate">{s.name}</div>
                  <div className="text-base sm:text-xl font-bold text-gradient">{s.price}</div>
                  <div className="flex items-center justify-between mt-1">
                    <span className="text-[10px] sm:text-xs text-muted-foreground">{s.orders} orders</span>
                    <span className="text-[10px] sm:text-xs text-cyan-400 font-medium">{s.trend}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </PageTransition>
  );
}
