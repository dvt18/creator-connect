import { useState } from "react";
import { Plus, Users, BarChart3, FileText, TrendingUp, Eye, DollarSign, Target, Star, Clock, ArrowUpRight, ArrowDownRight, CheckCircle2, XCircle } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import { campaigns, creators } from "@/data/mockData";
import PageTransition from "@/components/PageTransition";
import CreateCampaignModal from "@/components/CreateCampaignModal";
import { CampaignStatusBadge } from "@/components/BadgeComponents";
import { VerifiedBadge } from "@/components/BadgeComponents";

const weeklyData = [40, 65, 45, 80, 55, 70, 90];
const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const maxWeekly = Math.max(...weeklyData);

export default function BrandDashboard() {
  const [modalOpen, setModalOpen] = useState(false);
  const [applicationStatuses, setApplicationStatuses] = useState<Record<string, 'pending' | 'accepted' | 'rejected'>>(
    Object.fromEntries(creators.slice(0, 3).map((c) => [c.id, 'pending']))
  );

  const acceptCreator = (id: string) => setApplicationStatuses((s) => ({ ...s, [id]: 'accepted' }));
  const rejectCreator = (id: string) => setApplicationStatuses((s) => ({ ...s, [id]: 'rejected' }));

  return (
    <PageTransition>
      <div className="min-h-screen bg-background pb-mobile-nav">
        <Navbar />
        <div className="max-w-6xl mx-auto px-3 sm:px-4 py-4 sm:py-8">
          <div className="flex items-center justify-between mb-4 sm:mb-6">
            <h1 className="text-lg sm:text-2xl font-bold text-foreground">Brand Dashboard</h1>
            <Button
              size="sm"
              className="gradient-primary text-primary-foreground border-0 gap-1.5 text-xs sm:text-sm shimmer font-semibold"
              onClick={() => setModalOpen(true)}>
              <Plus className="h-3.5 w-3.5" /> Post Campaign
            </Button>
          </div>

          {/* Primary Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-4 mb-4">
            {[
              { label: "Active Campaigns", value: "3", icon: FileText, change: "+1", up: true, gradient: "from-cyan-500 to-teal-500" },
              { label: "Total Applications", value: "27", icon: Users, change: "+8", up: true, gradient: "from-blue-500 to-cyan-500" },
              { label: "Campaign ROI", value: "4.2x", icon: BarChart3, change: "+0.3x", up: true, gradient: "from-teal-500 to-emerald-500" },
              { label: "Total Spend", value: "₹6.5L", icon: DollarSign, change: "₹1.2L", up: true, gradient: "from-cyan-500 to-blue-600" },
            ].map((s, i) => (
              <motion.div
                key={s.label}
                className="glass-card rounded-xl p-3 sm:p-5 group hover:neon-border transition-all duration-300"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
                whileHover={{ y: -3 }}>
                <div className="flex items-center justify-between mb-2">
                  <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-gradient-to-br ${s.gradient} flex items-center justify-center`}>
                    <s.icon className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
                  </div>
                  <span className={`text-[10px] sm:text-xs font-medium flex items-center gap-0.5 px-1.5 py-0.5 rounded-full ${s.up ? "text-cyan-400 bg-cyan-400/10" : "text-destructive bg-destructive/10"}`}>
                    {s.up ? <ArrowUpRight className="h-2.5 w-2.5" /> : <ArrowDownRight className="h-2.5 w-2.5" />}
                    {s.change}
                  </span>
                </div>
                <div className="text-xl sm:text-2xl font-bold text-foreground">{s.value}</div>
                <div className="text-[10px] sm:text-xs text-muted-foreground">{s.label}</div>
                <div className={`h-0.5 w-full mt-2 sm:mt-3 rounded-full bg-gradient-to-r ${s.gradient} opacity-60`} />
              </motion.div>
            ))}
          </div>

          {/* Secondary metrics */}
          <div className="flex gap-2.5 overflow-x-auto pb-2 mb-4 -mx-3 px-3 sm:mx-0 sm:px-0 sm:grid sm:grid-cols-5 sm:gap-4">
            {[
              { label: "Impressions", value: "1.2M", icon: Eye },
              { label: "Engagement Rate", value: "5.8%", icon: TrendingUp },
              { label: "Avg. Creator Rating", value: "4.7", icon: Star },
              { label: "Response Time", value: "2.4h", icon: Clock },
              { label: "Conversion Rate", value: "3.2%", icon: Target },
            ].map((s, i) => (
              <motion.div
                key={s.label}
                className="glass-card rounded-xl p-3 flex-shrink-0 min-w-[120px] sm:min-w-0"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.3 + i * 0.05 }}>
                <s.icon className="h-3.5 w-3.5 text-primary mb-1.5" />
                <div className="text-base font-bold text-gradient">{s.value}</div>
                <div className="text-[10px] text-muted-foreground">{s.label}</div>
              </motion.div>
            ))}
          </div>

          {/* Weekly Performance Chart */}
          <motion.div
            className="glass-card rounded-xl p-3 sm:p-5 mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.4 }}>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-semibold text-foreground">Weekly Engagement</h3>
              <span className="text-[10px] text-muted-foreground">This week</span>
            </div>
            <div className="flex items-end gap-1.5 sm:gap-3 h-24">
              {weeklyData.map((val, i) => (
                <motion.div key={i} className="flex-1 flex flex-col items-center gap-1"
                  initial={{ scaleY: 0 }} animate={{ scaleY: 1 }}
                  transition={{ duration: 0.4, delay: 0.5 + i * 0.05 }}
                  style={{ transformOrigin: "bottom" }}>
                  <div
                    className="w-full rounded-md gradient-primary opacity-70 hover:opacity-100 transition-opacity"
                    style={{ height: `${(val / maxWeekly) * 100}%`, minHeight: 4, boxShadow: "0 0 8px hsl(187 96% 43% / 0.4)" }} />
                  <span className="text-[9px] text-muted-foreground">{weekDays[i]}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Active Campaigns */}
          <h2 className="text-sm sm:text-lg font-semibold text-foreground mb-3">Active Campaigns</h2>
          <div className="space-y-2.5 mb-6">
            {campaigns.map((c, i) => (
              <motion.div
                key={c.id}
                className="glass-card rounded-xl p-3 sm:p-5"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: i * 0.08 }}>
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div className="flex items-center gap-2.5">
                    <img src={c.brandLogo} alt={c.brandName} className="w-8 h-8 rounded-lg object-cover border border-border/50 shrink-0" />
                    <div>
                      <div className="font-medium text-foreground text-sm">{c.title}</div>
                      <div className="flex items-center gap-2 mt-0.5">
                        <CampaignStatusBadge status={c.status} />
                        {c.disclosureRequired && (
                          <span className="text-[9px] text-amber-400 bg-amber-400/10 border border-amber-400/20 rounded-full px-1.5 py-0.5 font-medium">#Ad</span>
                        )}
                      </div>
                    </div>
                  </div>
                  <span className="text-sm font-bold text-gradient whitespace-nowrap shrink-0">{c.budget}</span>
                </div>
                <div className="flex items-center justify-between text-xs text-muted-foreground mb-2">
                  <span>{c.creatorsApplied}/{c.creatorsNeeded} applied</span>
                  <span>⏰ {c.deadline}</span>
                </div>
                <div className="w-full h-1.5 rounded-full bg-secondary/60">
                  <div className="h-full rounded-full gradient-primary" style={{ width: `${Math.min((c.creatorsApplied / c.creatorsNeeded) * 100, 100)}%` }} />
                </div>
              </motion.div>
            ))}
          </div>

          {/* Recent Applications */}
          <h2 className="text-sm sm:text-lg font-semibold text-foreground mb-3">Recent Applications</h2>
          <div className="space-y-2.5">
            {creators.slice(0, 3).map((c, i) => {
              const status = applicationStatuses[c.id];
              return (
                <motion.div
                  key={c.id}
                  className="glass-card rounded-xl p-3 sm:p-5 flex items-center justify-between"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.3 + i * 0.08 }}>
                  <div className="flex items-center gap-2.5">
                    <img src={c.avatar} alt={c.name} className="w-9 h-9 sm:w-10 sm:h-10 rounded-full object-cover" />
                    <div>
                      <div className="flex items-center gap-1.5">
                        <div className="font-medium text-foreground text-xs sm:text-sm">{c.name}</div>
                        {c.isVerified && <span className="text-cyan-400 text-xs">✓</span>}
                      </div>
                      <div className="text-[10px] sm:text-xs text-muted-foreground">{c.niche} · {c.followers} · Score: {c.credibilityScore}/100</div>
                    </div>
                  </div>
                  <div className="flex gap-1.5 items-center">
                    {status === 'pending' ? (
                      <>
                        <button onClick={() => rejectCreator(c.id)} className="w-7 h-7 rounded-lg bg-red-400/10 border border-red-400/20 flex items-center justify-center hover:bg-red-400/20 transition-colors">
                          <XCircle className="h-4 w-4 text-red-400" />
                        </button>
                        <button onClick={() => acceptCreator(c.id)} className="w-7 h-7 rounded-lg bg-emerald-400/10 border border-emerald-400/20 flex items-center justify-center hover:bg-emerald-400/20 transition-colors">
                          <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                        </button>
                      </>
                    ) : status === 'accepted' ? (
                      <span className="text-[10px] text-emerald-400 font-semibold bg-emerald-400/10 border border-emerald-400/20 rounded-full px-2 py-0.5">Accepted ✓</span>
                    ) : (
                      <span className="text-[10px] text-red-400 font-semibold bg-red-400/10 border border-red-400/20 rounded-full px-2 py-0.5">Rejected</span>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Campaign Creation Modal */}
      <CreateCampaignModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onCreated={(c) => console.log("New campaign:", c)}
      />
    </PageTransition>
  );
}
