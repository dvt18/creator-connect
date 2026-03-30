import { useParams, Link } from "react-router-dom";
import { MapPin, ExternalLink, LayoutDashboard, TrendingUp, Award } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { creators } from "@/data/mockData";
import Navbar from "@/components/Navbar";
import PageTransition from "@/components/PageTransition";
import { useAuth } from "@/contexts/AuthContext";
import {
  TierBadge,
  CredibilityBadge,
  VerifiedBadge,
  ASCIBadge,
  StarRating,
} from "@/components/BadgeComponents";

export default function CreatorProfilePage() {
  const { id } = useParams();
  const creator = creators.find((c) => c.id === id) || creators[0];
  const { role } = useAuth();

  return (
    <PageTransition>
      <div className="min-h-screen bg-background pb-mobile-nav">
        <Navbar />
        <div className="max-w-3xl mx-auto px-4 py-8">

          {/* Main profile card */}
          <motion.div
            className="glass-card rounded-2xl p-6 md:p-8 mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}>
            <div className="flex flex-col sm:flex-row items-start gap-6">
              {/* Avatar with verified ring */}
              <div className="relative">
                <img
                  src={creator.avatar}
                  alt={creator.name}
                  className={`w-24 h-24 rounded-2xl object-cover border-2 ${creator.isVerified ? "border-cyan-400 shadow-[0_0_16px_hsl(187_96%_43%_/_0.4)]" : "border-border"}`}
                />
                {creator.isVerified && (
                  <div className="absolute -bottom-2 -right-2 w-6 h-6 rounded-full gradient-primary flex items-center justify-center shadow-lg">
                    <span className="text-[10px] text-primary-foreground font-bold">✓</span>
                  </div>
                )}
              </div>

              <div className="flex-1">
                {/* Name + tier */}
                <div className="flex flex-wrap items-center gap-2 mb-1">
                  <h1 className="text-2xl font-bold text-foreground">{creator.name}</h1>
                  <TierBadge tier={creator.tier} size="sm" />
                </div>
                <p className="text-muted-foreground text-sm mb-2">@{creator.username}</p>
                <p className="text-foreground/80 text-sm mb-4">{creator.bio}</p>

                {/* Trust badges row */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {creator.isVerified && <VerifiedBadge size="sm" />}
                  <ASCIBadge compliant={creator.isASCICompliant} size="sm" />
                  <CredibilityBadge score={creator.credibilityScore} size="sm" />
                  <StarRating rating={creator.rating} showCount count={creator.completedCampaigns} />
                </div>

                {/* Location + niche pills */}
                <div className="flex flex-wrap gap-3 text-sm">
                  <span className="flex items-center gap-1 text-muted-foreground">
                    <MapPin className="h-3.5 w-3.5" /> {creator.location}
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-primary/10 border border-primary/20 text-primary font-medium text-xs">
                    {creator.niche}
                  </span>
                  <span className="text-xs text-muted-foreground flex items-center gap-1">
                    <Award className="h-3.5 w-3.5" /> {creator.completedCampaigns} campaigns
                  </span>
                </div>
              </div>

              {/* CTA */}
              {role === "brand" && (
                <Button className="gradient-primary text-primary-foreground border-0 shimmer shrink-0">
                  Hire Creator
                </Button>
              )}
              {role === "creator" && (
                <Link to="/creator-dashboard" className="md:hidden">
                  <Button variant="outline" className="gap-2 shrink-0 border-border/50">
                    <LayoutDashboard className="h-4 w-4" /> Dashboard
                  </Button>
                </Link>
              )}
            </div>

            {/* Stats bar */}
            <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-border/40">
              <div className="text-center">
                <div className="text-xl font-bold text-gradient">{creator.followers}</div>
                <div className="text-xs text-muted-foreground">Followers</div>
              </div>
              <div className="text-center">
                <div className="text-xl font-bold text-gradient">{creator.engagement}</div>
                <div className="text-xs text-muted-foreground">Engagement</div>
              </div>
              <div className="text-center">
                <div className="text-xl font-bold text-gradient">{creator.platforms.length}</div>
                <div className="text-xs text-muted-foreground">Platforms</div>
              </div>
            </div>
          </motion.div>

          {/* Credibility Detail Card */}
          <motion.div
            className="glass-card rounded-xl p-6 mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.05 }}>
            <h2 className="font-semibold text-foreground mb-4 flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-primary" /> Trust & Compliance
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {/* Credibility score bar */}
              <div className="col-span-2 md:col-span-1">
                <div className="text-xs text-muted-foreground mb-1">Credibility Score</div>
                <div className="flex items-center gap-2">
                  <div className="flex-1 h-1.5 bg-secondary rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full gradient-primary"
                      style={{ width: `${creator.credibilityScore}%` }} />
                  </div>
                  <span className="text-xs font-bold text-foreground">{creator.credibilityScore}</span>
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <div className="text-xs text-muted-foreground">KYC Status</div>
                {creator.isVerified
                  ? <span className="text-xs text-cyan-400 font-semibold">✓ Verified</span>
                  : <span className="text-xs text-amber-400 font-semibold">⏳ Pending</span>}
              </div>
              <div className="flex flex-col gap-1">
                <div className="text-xs text-muted-foreground">ASCI Compliance</div>
                {creator.isASCICompliant
                  ? <span className="text-xs text-teal-400 font-semibold">✓ Compliant</span>
                  : <span className="text-xs text-amber-400 font-semibold">⚠ Under Review</span>}
              </div>
              <div className="flex flex-col gap-1">
                <div className="text-xs text-muted-foreground">Tier</div>
                <TierBadge tier={creator.tier} size="xs" />
              </div>
            </div>
          </motion.div>

          {/* Platforms */}
          <motion.div
            className="glass-card rounded-xl p-6 mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}>
            <h2 className="font-semibold text-foreground mb-3">Platforms</h2>
            <div className="flex flex-wrap gap-2">
              {creator.platforms.map((p) => (
                <span key={p} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-secondary/60 border border-border/40 text-muted-foreground text-sm hover:border-primary/30 hover:text-foreground transition-colors">
                  <ExternalLink className="h-3.5 w-3.5" /> {p}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Services & Pricing */}
          <motion.div
            className="glass-card rounded-xl p-6 mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}>
            <h2 className="font-semibold text-foreground mb-3">Services & Pricing</h2>
            <div className="space-y-3">
              {creator.services.map((s) => (
                <div key={s.name} className="flex items-center justify-between py-2 border-b border-border/30 last:border-0">
                  <span className="text-sm text-foreground/80">{s.name}</span>
                  <span className="font-bold text-gradient text-sm">{s.price}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Portfolio */}
          <motion.div
            className="glass-card rounded-xl p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.3 }}>
            <h2 className="font-semibold text-foreground mb-3">Portfolio</h2>
            <div className="grid grid-cols-3 gap-3">
              {creator.portfolio.map((img, i) => (
                <motion.img
                  key={i}
                  src={img}
                  alt="Portfolio"
                  className="rounded-lg aspect-square object-cover border border-border/30 hover:border-primary/40 transition-colors"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.2 }}
                />
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </PageTransition>
  );
}
