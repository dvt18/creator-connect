import { Plus, Users, BarChart3, FileText } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import { campaigns, creators } from "@/data/mockData";
import PageTransition from "@/components/PageTransition";

export default function BrandDashboard() {
  return (
    <PageTransition>
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold text-foreground">Brand Dashboard</h1>
            <Button className="gradient-primary text-primary-foreground border-0 gap-2">
              <Plus className="h-4 w-4" /> Post Campaign
            </Button>
          </div>

          <div className="grid sm:grid-cols-3 gap-4 mb-8">
            {[
              { label: "Active Campaigns", value: "3", icon: FileText },
              { label: "Total Applications", value: "27", icon: Users },
              { label: "Avg. Campaign ROI", value: "4.2x", icon: BarChart3 },
            ].map((s, i) => (
              <motion.div
                key={s.label}
                className="bg-card rounded-xl shadow-card p-5"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
              >
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-3">
                  <s.icon className="h-5 w-5 text-primary" />
                </div>
                <div className="text-2xl font-bold text-card-foreground">{s.value}</div>
                <div className="text-xs text-muted-foreground">{s.label}</div>
              </motion.div>
            ))}
          </div>

          <h2 className="text-lg font-semibold text-foreground mb-4">Active Campaigns</h2>
          <div className="space-y-3 mb-8">
            {campaigns.map((c, i) => (
              <motion.div
                key={c.id}
                className="bg-card rounded-xl shadow-card p-5"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                whileHover={{ x: 4, transition: { duration: 0.2 } }}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="font-medium text-card-foreground">{c.title}</div>
                  <span className="text-sm font-semibold text-primary">{c.budget}</span>
                </div>
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <span>{c.creatorsApplied}/{c.creatorsNeeded} creators applied</span>
                  <span>⏰ {c.deadline}</span>
                </div>
                <div className="mt-2 w-full h-1.5 rounded-full bg-secondary">
                  <div className="h-full rounded-full gradient-primary" style={{ width: `${(c.creatorsApplied / c.creatorsNeeded) * 100}%` }} />
                </div>
              </motion.div>
            ))}
          </div>

          <h2 className="text-lg font-semibold text-foreground mb-4">Recent Applications</h2>
          <div className="space-y-3">
            {creators.slice(0, 3).map((c, i) => (
              <motion.div
                key={c.id}
                className="bg-card rounded-xl shadow-card p-5 flex items-center justify-between"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.3 + i * 0.08 }}
                whileHover={{ y: -2, transition: { duration: 0.2 } }}
              >
                <div className="flex items-center gap-3">
                  <img src={c.avatar} alt={c.name} className="w-10 h-10 rounded-full object-cover" />
                  <div>
                    <div className="font-medium text-card-foreground text-sm">{c.name}</div>
                    <div className="text-xs text-muted-foreground">{c.niche} · {c.followers} followers</div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline">View</Button>
                  <Button size="sm" className="gradient-primary text-primary-foreground border-0">Accept</Button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
