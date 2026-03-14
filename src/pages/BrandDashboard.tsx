import { Plus, Users, BarChart3, FileText, TrendingUp, Eye, DollarSign, Target, Star, Clock, ArrowUpRight, ArrowDownRight } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import { campaigns, creators } from "@/data/mockData";
import PageTransition from "@/components/PageTransition";

const weeklyData = [40, 65, 45, 80, 55, 70, 90];
const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export default function BrandDashboard() {
  return (
    <PageTransition>
      <div className="min-h-screen bg-background pb-mobile-nav">
        <Navbar />
        <div className="max-w-6xl mx-auto px-3 sm:px-4 py-4 sm:py-8">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-lg sm:text-2xl font-bold text-foreground">Brand Dashboard</h1>
            <Button size="sm" className="gradient-primary text-primary-foreground border-0 gap-1.5 text-xs sm:text-sm">
              <Plus className="h-3.5 w-3.5" /> Post Campaign
            </Button>
          </div>

          {/* Primary Stats - 2x2 grid on mobile */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-4 mb-4">
            {[
              { label: "Active Campaigns", value: "3", icon: FileText, change: "+1", up: true },
              { label: "Total Applications", value: "27", icon: Users, change: "+8", up: true },
              { label: "Campaign ROI", value: "4.2x", icon: BarChart3, change: "+0.3x", up: true },
              { label: "Total Spend", value: "₹6.5L", icon: DollarSign, change: "₹1.2L", up: true },
            ].map((s, i) => (
              <motion.div
                key={s.label}
                className="bg-card rounded-xl shadow-card p-3 sm:p-5"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                    <s.icon className="h-4 w-4 text-primary" />
                  </div>
                  <span className={`text-[10px] font-medium flex items-center gap-0.5 ${s.up ? "text-green-500" : "text-destructive"}`}>
                    {s.up ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
                    {s.change}
                  </span>
                </div>
                <div className="text-xl sm:text-2xl font-bold text-card-foreground">{s.value}</div>
                <div className="text-[10px] sm:text-xs text-muted-foreground">{s.label}</div>
              </motion.div>
            ))}
          </div>

          {/* Secondary metrics - scrollable on mobile */}
          <div className="flex gap-2.5 overflow-x-auto pb-2 mb-4 scrollbar-hide">
            {[
              { label: "Impressions", value: "1.2M", icon: Eye },
              { label: "Engagement Rate", value: "5.8%", icon: TrendingUp },
              { label: "Avg. Creator Rating", value: "4.7", icon: Star },
              { label: "Response Time", value: "2.4h", icon: Clock },
              { label: "Conversion Rate", value: "3.2%", icon: Target },
            ].map((s, i) => (
              <motion.div
                key={s.label}
                className="bg-card rounded-xl shadow-card p-3 flex-shrink-0 min-w-[120px]"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.3 + i * 0.05 }}
              >
                <s.icon className="h-3.5 w-3.5 text-primary mb-1.5" />
                <div className="text-base font-bold text-card-foreground">{s.value}</div>
                <div className="text-[10px] text-muted-foreground">{s.label}</div>
              </motion.div>
            ))}
          </div>

          {/* Weekly Performance Chart */}
          <motion.div
            className="bg-card rounded-xl shadow-card p-3 sm:p-5 mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.4 }}
          >
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-semibold text-card-foreground">Weekly Engagement</h3>
              <span className="text-[10px] text-muted-foreground">This week</span>
            </div>
            <div className="flex items-end gap-1.5 sm:gap-3 h-20">
              {weeklyData.map((val, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-1">
                  <motion.div
                    className="w-full rounded-md gradient-primary"
                    initial={{ height: 0 }}
                    animate={{ height: `${val}%` }}
                    transition={{ duration: 0.5, delay: 0.5 + i * 0.05 }}
                  />
                  <span className="text-[9px] text-muted-foreground">{weekDays[i]}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Active Campaigns */}
          <h2 className="text-sm sm:text-lg font-semibold text-foreground mb-3">Active Campaigns</h2>
          <div className="space-y-2.5 mb-6">
            {campaigns.map((c, i) => (
              <motion.div
                key={c.id}
                className="bg-card rounded-xl shadow-card p-3 sm:p-5"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <div className="font-medium text-card-foreground text-sm truncate mr-2">{c.title}</div>
                  <span className="text-xs font-semibold text-primary whitespace-nowrap">{c.budget}</span>
                </div>
                <div className="flex items-center justify-between text-xs text-muted-foreground mb-1.5">
                  <span>{c.creatorsApplied}/{c.creatorsNeeded} applied</span>
                  <span>⏰ {c.deadline}</span>
                </div>
                <div className="w-full h-1.5 rounded-full bg-secondary">
                  <div className="h-full rounded-full gradient-primary" style={{ width: `${(c.creatorsApplied / c.creatorsNeeded) * 100}%` }} />
                </div>
              </motion.div>
            ))}
          </div>

          {/* Recent Applications */}
          <h2 className="text-sm sm:text-lg font-semibold text-foreground mb-3">Recent Applications</h2>
          <div className="space-y-2.5">
            {creators.slice(0, 3).map((c, i) => (
              <motion.div
                key={c.id}
                className="bg-card rounded-xl shadow-card p-3 sm:p-5 flex items-center justify-between"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.3 + i * 0.08 }}
              >
                <div className="flex items-center gap-2.5">
                  <img src={c.avatar} alt={c.name} className="w-9 h-9 rounded-full object-cover" />
                  <div>
                    <div className="font-medium text-card-foreground text-xs sm:text-sm">{c.name}</div>
                    <div className="text-[10px] sm:text-xs text-muted-foreground">{c.niche} · {c.followers}</div>
                  </div>
                </div>
                <div className="flex gap-1.5">
                  <Button size="sm" variant="outline" className="text-xs h-7 px-2">View</Button>
                  <Button size="sm" className="gradient-primary text-primary-foreground border-0 text-xs h-7 px-2">Accept</Button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
