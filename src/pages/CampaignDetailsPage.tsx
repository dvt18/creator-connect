import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, CheckCircle2, Lock, TrendingUp, BarChart3, Eye, MousePointerClick, IndianRupee, ShieldAlert } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { campaigns } from "@/data/mockData";
import Navbar from "@/components/Navbar";
import PageTransition from "@/components/PageTransition";
import { useAuth } from "@/contexts/AuthContext";
import { CampaignStatusBadge, ContractBadge, ApplicationStatusBadge } from "@/components/BadgeComponents";

type AppStatus = 'none' | 'applied' | 'accepted' | 'rejected';

export default function CampaignDetailsPage() {
  const { id } = useParams();
  const campaign = campaigns.find((c) => c.id === id) || campaigns[0];
  const { role } = useAuth();
  const [appStatus, setAppStatus] = useState<AppStatus>('none');

  const handleApply = () => {
    setAppStatus('applied');
    // In a real app, this would make an API call
    setTimeout(() => setAppStatus('accepted'), 2000); // Simulate response
  };

  return (
    <PageTransition>
      <div className="min-h-screen bg-background pb-mobile-nav">
        <Navbar />
        <div className="max-w-3xl mx-auto px-4 py-8">
          <Link to="/campaigns" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors">
            <ArrowLeft className="h-4 w-4" /> Back to Campaigns
          </Link>

          {/* Main Campaign Card */}
          <motion.div
            className="glass-card rounded-2xl p-6 md:p-8 mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}>
            {/* Header */}
            <div className="flex items-start gap-4 mb-5">
              <img src={campaign.brandLogo} alt={campaign.brandName} className="w-14 h-14 rounded-xl object-cover border border-border/50" />
              <div className="flex-1 min-w-0">
                <h1 className="text-2xl font-bold text-foreground">{campaign.title}</h1>
                <p className="text-muted-foreground text-sm">by {campaign.brandName}</p>
              </div>
            </div>

            {/* Status badges row */}
            <div className="flex flex-wrap gap-2 mb-5">
              <CampaignStatusBadge status={campaign.status} />
              <ContractBadge status={campaign.contractStatus} />
              {campaign.disclosureRequired && (
                <span className="inline-flex items-center gap-1 text-[10px] font-semibold rounded-full border bg-amber-400/10 border-amber-400/30 text-amber-400 px-2 py-0.5">
                  <ShieldAlert className="h-2.5 w-2.5" /> #Ad Required
                </span>
              )}
              {appStatus !== 'none' && <ApplicationStatusBadge status={appStatus} />}
            </div>

            {/* Campaign meta tags */}
            <div className="flex flex-wrap gap-3 mb-6">
              <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary/10 border border-primary/10 text-primary text-sm font-medium">
                <IndianRupee className="h-3.5 w-3.5" /> {campaign.budget}
              </span>
              <span className="px-3 py-1.5 rounded-lg bg-secondary border border-border/40 text-muted-foreground text-sm">
                👥 {campaign.creatorsNeeded} creators needed
              </span>
              <span className="px-3 py-1.5 rounded-lg bg-secondary border border-border/40 text-muted-foreground text-sm">
                ⏰ {campaign.deadline}
              </span>
              <span className="px-3 py-1.5 rounded-lg bg-secondary border border-border/40 text-muted-foreground text-sm">
                📂 {campaign.category}
              </span>
            </div>

            <p className="text-foreground/80 mb-6 leading-relaxed">{campaign.description}</p>

            {/* Escrow Status */}
            <div className="flex items-center gap-3 p-4 rounded-xl bg-secondary/40 border border-border/40 mb-6">
              <Lock className="h-5 w-5 text-cyan-400 shrink-0" />
              <div>
                <div className="text-sm font-semibold text-foreground">Escrow Protected</div>
                <div className="text-xs text-muted-foreground">{campaign.escrowAmount} held securely — released on milestone completion</div>
              </div>
              <div className="ml-auto">
                <span className="text-[10px] font-semibold text-cyan-400 bg-cyan-400/10 border border-cyan-400/20 rounded-full px-2 py-0.5">Secured</span>
              </div>
            </div>

            {/* ASCI Disclosure reminder */}
            {campaign.disclosureRequired && role === 'creator' && appStatus !== 'none' && (
              <div className="flex items-start gap-3 p-4 rounded-xl bg-amber-400/5 border border-amber-400/20 mb-6">
                <ShieldAlert className="h-5 w-5 text-amber-400 shrink-0 mt-0.5" />
                <div className="text-sm text-amber-400/90">
                  <span className="font-semibold">ASCI Disclosure Required:</span> All posts for this campaign must include <code className="bg-amber-400/10 px-1 rounded text-xs">#Ad</code> or <code className="bg-amber-400/10 px-1 rounded text-xs">#Sponsored</code> as mandated by ASCI guidelines.
                </div>
              </div>
            )}

            {/* Apply / Edit / Login button */}
            {role === "creator" ? (
              appStatus === 'none' ? (
                <Button
                  className="gradient-primary text-primary-foreground border-0 w-full sm:w-auto shimmer font-semibold"
                  size="lg"
                  onClick={handleApply}>
                  Apply to Campaign
                </Button>
              ) : appStatus === 'applied' ? (
                <Button disabled className="w-full sm:w-auto opacity-60" size="lg">
                  ⏳ Application Submitted...
                </Button>
              ) : appStatus === 'accepted' ? (
                <div className="flex flex-wrap gap-3">
                  <Button className="gradient-primary text-primary-foreground border-0 shimmer font-semibold" size="lg">
                    View Contract
                  </Button>
                  <Button variant="outline" className="border-border/50 hover:border-primary/40" size="lg">
                    Message Brand
                  </Button>
                </div>
              ) : (
                <Button disabled variant="outline" className="w-full sm:w-auto border-red-400/30 text-red-400" size="lg">
                  Application Rejected
                </Button>
              )
            ) : role === "brand" ? (
              <Button className="gradient-primary text-primary-foreground border-0 w-full sm:w-auto" size="lg">
                Edit Campaign
              </Button>
            ) : (
              <Link to="/login">
                <Button className="gradient-primary text-primary-foreground border-0 w-full sm:w-auto" size="lg">
                  Login to Apply
                </Button>
              </Link>
            )}
          </motion.div>

          {/* Requirements + Deliverables */}
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <motion.div
              className="glass-card rounded-xl p-6"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}>
              <h2 className="font-semibold text-foreground mb-3">Requirements</h2>
              <ul className="space-y-2">
                {campaign.requirements.map((r, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                    {r}
                  </li>
                ))}
              </ul>
            </motion.div>
            <motion.div
              className="glass-card rounded-xl p-6"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.3 }}>
              <h2 className="font-semibold text-foreground mb-3">Deliverables</h2>
              <ul className="space-y-2">
                {campaign.deliverables.map((d, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <CheckCircle2 className="h-4 w-4 text-cyan-400 mt-0.5 shrink-0" />
                    {d}
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>

          {/* Analytics Panel */}
          <motion.div
            className="glass-card rounded-xl p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.4 }}>
            <h2 className="font-semibold text-foreground mb-4 flex items-center gap-2">
              <BarChart3 className="h-4 w-4 text-primary" /> Campaign Analytics
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
              {[
                { icon: Eye, label: "Impressions", value: campaign.analytics.impressions },
                { icon: TrendingUp, label: "Engagement Rate", value: campaign.analytics.engagementRate },
                { icon: MousePointerClick, label: "Reach", value: campaign.analytics.reach },
                { icon: MousePointerClick, label: "Clicks", value: campaign.analytics.clicks },
                { icon: BarChart3, label: "Est. ROI", value: campaign.analytics.estimatedROI },
              ].map((stat) => (
                <div key={stat.label} className="p-3 rounded-lg bg-secondary/40 border border-border/30 text-center">
                  <stat.icon className="h-4 w-4 text-primary mx-auto mb-1" />
                  <div className="text-base font-bold text-gradient">{stat.value}</div>
                  <div className="text-[10px] text-muted-foreground mt-0.5">{stat.label}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </PageTransition>
  );
}
