import { useParams, Link } from "react-router-dom";
import { ArrowLeft, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { campaigns } from "@/data/mockData";
import Navbar from "@/components/Navbar";
import PageTransition from "@/components/PageTransition";
import { useAuth } from "@/contexts/AuthContext";

export default function CampaignDetailsPage() {
  const { id } = useParams();
  const campaign = campaigns.find((c) => c.id === id) || campaigns[0];
  const { role } = useAuth();

  return (
    <PageTransition>
      <div className="min-h-screen bg-background pb-mobile-nav">
        <Navbar />
        <div className="max-w-3xl mx-auto px-4 py-8">
          <Link to="/campaigns" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground mb-6">
            <ArrowLeft className="h-4 w-4" /> Back to Campaigns
          </Link>

          <motion.div
            className="bg-card rounded-2xl shadow-card p-6 md:p-8 mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <div className="flex items-center gap-4 mb-4">
              <img src={campaign.brandLogo} alt={campaign.brandName} className="w-14 h-14 rounded-xl object-cover" />
              <div>
                <h1 className="text-2xl font-bold text-card-foreground">{campaign.title}</h1>
                <p className="text-muted-foreground text-sm">by {campaign.brandName}</p>
              </div>
            </div>

            <div className="flex flex-wrap gap-3 mb-6">
              <span className="px-3 py-1.5 rounded-lg bg-primary/10 text-primary font-medium text-sm">💰 {campaign.budget}</span>
              <span className="px-3 py-1.5 rounded-lg bg-secondary text-secondary-foreground text-sm">👥 {campaign.creatorsNeeded} creators needed</span>
              <span className="px-3 py-1.5 rounded-lg bg-secondary text-secondary-foreground text-sm">⏰ {campaign.deadline}</span>
              <span className="px-3 py-1.5 rounded-lg bg-secondary text-secondary-foreground text-sm">📂 {campaign.category}</span>
            </div>

            <p className="text-card-foreground mb-6">{campaign.description}</p>

            {role === "creator" ? (
              <Button className="gradient-primary text-primary-foreground border-0 w-full sm:w-auto" size="lg">
                Apply to Campaign
              </Button>
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

          <div className="grid md:grid-cols-2 gap-6">
            <motion.div
              className="bg-card rounded-xl shadow-card p-6"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
            >
              <h2 className="font-semibold text-card-foreground mb-3">Requirements</h2>
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
              className="bg-card rounded-xl shadow-card p-6"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.3 }}
            >
              <h2 className="font-semibold text-card-foreground mb-3">Deliverables</h2>
              <ul className="space-y-2">
                {campaign.deliverables.map((d, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <CheckCircle2 className="h-4 w-4 text-accent mt-0.5 shrink-0" />
                    {d}
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
