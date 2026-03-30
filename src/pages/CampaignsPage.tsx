import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { campaigns } from "@/data/mockData";
import Navbar from "@/components/Navbar";
import PageTransition from "@/components/PageTransition";
import { CampaignStatusBadge, ContractBadge } from "@/components/BadgeComponents";
import { IndianRupee, Users, Clock, ShieldAlert, Lock } from "lucide-react";

export default function CampaignsPage() {
  return (
    <PageTransition>
      <div className="min-h-screen bg-background pb-mobile-nav">
        <Navbar />
        <div className="max-w-6xl mx-auto px-4 py-8">
          <h1 className="text-2xl font-bold text-foreground mb-2">Campaign Marketplace</h1>
          <p className="text-muted-foreground text-sm mb-6">Browse active brand campaigns and apply.</p>
          <div className="grid sm:grid-cols-2 gap-4">
            {campaigns.map((c, i) => (
              <motion.div
                key={c.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}>
                <Link to={`/campaign/${c.id}`}
                  className="group block glass-card rounded-xl p-6 hover:neon-border hover:shadow-elevated transition-all duration-300 h-full">
                  {/* Header */}
                  <div className="flex items-center gap-3 mb-3">
                    <img src={c.brandLogo} alt={c.brandName} className="w-10 h-10 rounded-lg object-cover border border-border/50" />
                    <div className="flex-1 min-w-0">
                      <div className="font-semibold text-foreground group-hover:text-primary transition-colors truncate">{c.title}</div>
                      <div className="text-sm text-muted-foreground">{c.brandName}</div>
                    </div>
                    <CampaignStatusBadge status={c.status} />
                  </div>

                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{c.description}</p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="inline-flex items-center gap-1 text-xs font-medium text-cyan-400/80 bg-primary/10 border border-primary/10 rounded-lg px-2.5 py-1">
                      <IndianRupee className="h-3 w-3" /> {c.budget}
                    </span>
                    <span className="inline-flex items-center gap-1 text-xs font-medium text-muted-foreground bg-secondary border border-border/30 rounded-lg px-2.5 py-1">
                      <Users className="h-3 w-3" /> {c.creatorsNeeded} needed
                    </span>
                    <span className="inline-flex items-center gap-1 text-xs font-medium text-muted-foreground bg-secondary border border-border/30 rounded-lg px-2.5 py-1">
                      <Clock className="h-3 w-3" /> {c.deadline}
                    </span>
                    {c.disclosureRequired && (
                      <span className="inline-flex items-center gap-1 text-xs font-medium text-amber-400 bg-amber-400/10 border border-amber-400/20 rounded-lg px-2.5 py-1">
                        <ShieldAlert className="h-3 w-3" /> #Ad Required
                      </span>
                    )}
                    <span className="inline-flex items-center gap-1 text-xs font-medium text-cyan-400 bg-cyan-400/10 border border-cyan-400/20 rounded-lg px-2.5 py-1">
                      <Lock className="h-3 w-3" /> Escrow
                    </span>
                  </div>

                  {/* Contract status + Progress */}
                  <div className="flex items-center justify-between mb-2">
                    <ContractBadge status={c.contractStatus} />
                    <span className="text-xs text-muted-foreground">{c.creatorsApplied}/{c.creatorsNeeded} applied</span>
                  </div>
                  <div className="w-full h-1.5 rounded-full bg-secondary/60">
                    <div
                      className="h-full rounded-full gradient-primary"
                      style={{ width: `${Math.min((c.creatorsApplied / c.creatorsNeeded) * 100, 100)}%` }}
                    />
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
