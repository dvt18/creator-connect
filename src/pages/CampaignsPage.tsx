import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { campaigns } from "@/data/mockData";
import Navbar from "@/components/Navbar";
import PageTransition from "@/components/PageTransition";

export default function CampaignsPage() {
  return (
    <PageTransition>
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="max-w-6xl mx-auto px-4 py-8">
          <h1 className="text-2xl font-bold text-foreground mb-6">Campaign Marketplace</h1>
          <div className="grid sm:grid-cols-2 gap-4">
            {campaigns.map((c, i) => (
              <motion.div
                key={c.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
              >
                <Link to={`/campaign/${c.id}`} className="block bg-card rounded-xl shadow-card p-6 hover:shadow-elevated transition-shadow h-full">
                  <div className="flex items-center gap-3 mb-3">
                    <img src={c.brandLogo} alt={c.brandName} className="w-10 h-10 rounded-lg object-cover" />
                    <div>
                      <div className="font-semibold text-card-foreground">{c.title}</div>
                      <div className="text-sm text-muted-foreground">{c.brandName}</div>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{c.description}</p>
                  <div className="flex flex-wrap gap-3 text-sm">
                    <span className="px-2.5 py-1 rounded-lg bg-primary/10 text-primary font-medium">💰 {c.budget}</span>
                    <span className="px-2.5 py-1 rounded-lg bg-secondary text-secondary-foreground">👥 {c.creatorsNeeded} needed</span>
                    <span className="px-2.5 py-1 rounded-lg bg-secondary text-secondary-foreground">⏰ {c.deadline}</span>
                  </div>
                  <div className="mt-3">
                    <div className="flex items-center justify-between text-xs text-muted-foreground mb-1">
                      <span>{c.creatorsApplied} applied</span>
                      <span>{c.creatorsNeeded} needed</span>
                    </div>
                    <div className="w-full h-1.5 rounded-full bg-secondary">
                      <div
                        className="h-full rounded-full gradient-primary"
                        style={{ width: `${Math.min((c.creatorsApplied / c.creatorsNeeded) * 100, 100)}%` }}
                      />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
