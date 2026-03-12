import { DollarSign, Target, TrendingUp, BarChart3 } from "lucide-react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import { campaigns } from "@/data/mockData";
import PageTransition from "@/components/PageTransition";

const stats = [
  { label: "Total Earnings", value: "₹1,85,000", icon: DollarSign, change: "+12%" },
  { label: "Campaigns Done", value: "8", icon: Target, change: "+2" },
  { label: "Avg Engagement", value: "6.2%", icon: TrendingUp, change: "+0.5%" },
  { label: "Active Campaigns", value: "3", icon: BarChart3, change: "" },
];

export default function CreatorDashboard() {
  return (
    <PageTransition>
      <div className="min-h-screen bg-background pb-mobile-nav">
        <Navbar />
        <div className="max-w-6xl mx-auto px-4 py-8">
          <h1 className="text-2xl font-bold text-foreground mb-6">Creator Dashboard</h1>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {stats.map((s, i) => (
              <motion.div
                key={s.label}
                className="bg-card rounded-xl shadow-card p-5"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <s.icon className="h-5 w-5 text-primary" />
                  </div>
                  {s.change && <span className="text-xs font-medium text-primary bg-primary/10 px-2 py-0.5 rounded-full">{s.change}</span>}
                </div>
                <div className="text-2xl font-bold text-card-foreground">{s.value}</div>
                <div className="text-xs text-muted-foreground">{s.label}</div>
              </motion.div>
            ))}
          </div>

          <h2 className="text-lg font-semibold text-foreground mb-4">My Campaigns</h2>
          <div className="space-y-3 mb-8">
            {campaigns.slice(0, 3).map((c, i) => (
              <motion.div
                key={c.id}
                className="bg-card rounded-xl shadow-card p-5 flex items-center justify-between"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                whileHover={{ x: 4, transition: { duration: 0.2 } }}
              >
                <div className="flex items-center gap-3">
                  <img src={c.brandLogo} alt={c.brandName} className="w-10 h-10 rounded-lg object-cover" />
                  <div>
                    <div className="font-medium text-card-foreground text-sm">{c.title}</div>
                    <div className="text-xs text-muted-foreground">{c.brandName}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-semibold text-primary text-sm">{c.budget}</div>
                  <div className="text-xs text-muted-foreground">{c.deadline} left</div>
                </div>
              </motion.div>
            ))}
          </div>

          <h2 className="text-lg font-semibold text-foreground mb-4">Service Listings</h2>
          <div className="grid sm:grid-cols-3 gap-4">
            {[
              { name: "Instagram Reel Promotion", price: "₹10,000", orders: 15 },
              { name: "Story Promotion", price: "₹3,000", orders: 28 },
              { name: "YouTube Review", price: "₹25,000", orders: 6 },
            ].map((s, i) => (
              <motion.div
                key={s.name}
                className="bg-card rounded-xl shadow-card p-5"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.3 + i * 0.08 }}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
              >
                <div className="font-medium text-card-foreground text-sm mb-1">{s.name}</div>
                <div className="text-xl font-bold text-primary">{s.price}</div>
                <div className="text-xs text-muted-foreground mt-1">{s.orders} orders completed</div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
