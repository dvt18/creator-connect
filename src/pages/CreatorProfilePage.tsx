import { useParams } from "react-router-dom";
import { MapPin, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { creators } from "@/data/mockData";
import Navbar from "@/components/Navbar";
import PageTransition from "@/components/PageTransition";
import { useAuth } from "@/contexts/AuthContext";

export default function CreatorProfilePage() {
  const { id } = useParams();
  const creator = creators.find((c) => c.id === id) || creators[0];
  const { role } = useAuth();

  return (
    <PageTransition>
      <div className="min-h-screen bg-background pb-mobile-nav">
        <Navbar />
        <div className="max-w-3xl mx-auto px-4 py-8">
          <motion.div
            className="bg-card rounded-2xl shadow-card p-6 md:p-8 mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <div className="flex flex-col sm:flex-row items-start gap-6">
              <img src={creator.avatar} alt={creator.name} className="w-24 h-24 rounded-2xl object-cover" />
              <div className="flex-1">
                <h1 className="text-2xl font-bold text-card-foreground">{creator.name}</h1>
                <p className="text-muted-foreground text-sm mb-2">@{creator.username}</p>
                <p className="text-card-foreground text-sm mb-3">{creator.bio}</p>
                <div className="flex flex-wrap gap-3 text-sm">
                  <span className="flex items-center gap-1 text-muted-foreground"><MapPin className="h-3.5 w-3.5" /> {creator.location}</span>
                  <span className="px-2 py-0.5 rounded-full bg-primary/10 text-primary font-medium">{creator.niche}</span>
                </div>
              </div>
              {role === "brand" && (
                <Button className="gradient-primary text-primary-foreground border-0 shrink-0">Hire Creator</Button>
              )}
            </div>
            <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-border">
              <div className="text-center">
                <div className="text-xl font-bold text-card-foreground">{creator.followers}</div>
                <div className="text-xs text-muted-foreground">Followers</div>
              </div>
              <div className="text-center">
                <div className="text-xl font-bold text-card-foreground">{creator.engagement}</div>
                <div className="text-xs text-muted-foreground">Engagement</div>
              </div>
              <div className="text-center">
                <div className="text-xl font-bold text-card-foreground">{creator.platforms.length}</div>
                <div className="text-xs text-muted-foreground">Platforms</div>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="bg-card rounded-xl shadow-card p-6 mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            <h2 className="font-semibold text-card-foreground mb-3">Platforms</h2>
            <div className="flex flex-wrap gap-2">
              {creator.platforms.map((p) => (
                <span key={p} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-secondary text-secondary-foreground text-sm">
                  <ExternalLink className="h-3.5 w-3.5" /> {p}
                </span>
              ))}
            </div>
          </motion.div>

          <motion.div
            className="bg-card rounded-xl shadow-card p-6 mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            <h2 className="font-semibold text-card-foreground mb-3">Services & Pricing</h2>
            <div className="space-y-3">
              {creator.services.map((s) => (
                <div key={s.name} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                  <span className="text-sm text-card-foreground">{s.name}</span>
                  <span className="font-semibold text-primary text-sm">{s.price}</span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            className="bg-card rounded-xl shadow-card p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.3 }}
          >
            <h2 className="font-semibold text-card-foreground mb-3">Portfolio</h2>
            <div className="grid grid-cols-3 gap-3">
              {creator.portfolio.map((img, i) => (
                <motion.img
                  key={i}
                  src={img}
                  alt="Portfolio"
                  className="rounded-lg aspect-square object-cover"
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
