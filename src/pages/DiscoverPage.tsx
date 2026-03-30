import { useState } from "react";
import { Link } from "react-router-dom";
import { Search, SlidersHorizontal } from "lucide-react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { creators, brands, type CreatorTier } from "@/data/mockData";
import Navbar from "@/components/Navbar";
import PageTransition from "@/components/PageTransition";
import { useAuth } from "@/contexts/AuthContext";
import { TierBadge, CredibilityBadge, VerifiedBadge, ASCIBadge, StarRating } from "@/components/BadgeComponents";

const niches = ["All", "Tech", "Fashion", "Fitness", "Food", "Travel"];
const industries = ["All", "Technology", "Health & Fitness", "Beauty & Skincare"];
const tiers: ("All" | CreatorTier)[] = ["All", "Nano", "Micro", "Macro", "Celebrity"];

export default function DiscoverPage() {
  const { role } = useAuth();
  const [search, setSearch] = useState("");
  const [niche, setNiche] = useState("All");
  const [industry, setIndustry] = useState("All");
  const [tier, setTier] = useState<"All" | CreatorTier>("All");

  const isBrand = role === "brand";

  const filteredCreators = creators.filter((c) => {
    const matchSearch = c.name.toLowerCase().includes(search.toLowerCase()) || c.niche.toLowerCase().includes(search.toLowerCase());
    const matchNiche = niche === "All" || c.niche === niche;
    const matchTier = tier === "All" || c.tier === tier;
    return matchSearch && matchNiche && matchTier;
  });

  const filteredBrands = brands.filter((b) => {
    const matchSearch = b.name.toLowerCase().includes(search.toLowerCase()) || b.industry.toLowerCase().includes(search.toLowerCase());
    const matchIndustry = industry === "All" || b.industry === industry;
    return matchSearch && matchIndustry;
  });

  return (
    <PageTransition>
      <div className="min-h-screen bg-background pb-mobile-nav">
        <Navbar />
        <div className="max-w-6xl mx-auto px-4 py-8">
          <h1 className="text-2xl font-bold text-foreground mb-6">
            {isBrand ? "Discover Creators" : "Discover Brands"}
          </h1>

          {/* Search */}
          <div className="flex flex-col sm:flex-row gap-3 mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder={isBrand ? "Search creators by name or niche..." : "Search brands by name or industry..."}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10 bg-secondary/40 border-border/50 focus:border-primary/60"
              />
            </div>
          </div>

          {/* Niche / Industry filters */}
          <div className="flex gap-2 flex-wrap mb-3">
            <span className="flex items-center gap-1.5 text-xs text-muted-foreground mr-1">
              <SlidersHorizontal className="h-3.5 w-3.5" /> Category:
            </span>
            {(isBrand ? niches : industries).map((n) => (
              <Button
                key={n}
                variant={(isBrand ? niche : industry) === n ? "default" : "outline"}
                size="sm"
                onClick={() => isBrand ? setNiche(n) : setIndustry(n)}
                className={`text-xs h-7 ${(isBrand ? niche : industry) === n
                  ? "gradient-primary text-primary-foreground border-0"
                  : "border-border/50 bg-secondary/30 text-muted-foreground hover:text-foreground hover:bg-secondary/60"}`}>
                {n}
              </Button>
            ))}
          </div>

          {/* Tier filters — brand only */}
          {isBrand && (
            <div className="flex gap-2 flex-wrap mb-6">
              <span className="flex items-center gap-1.5 text-xs text-muted-foreground mr-1">
                <SlidersHorizontal className="h-3.5 w-3.5" /> Tier:
              </span>
              {tiers.map((t) => (
                <Button
                  key={t}
                  variant={tier === t ? "default" : "outline"}
                  size="sm"
                  onClick={() => setTier(t)}
                  className={`text-xs h-7 ${tier === t
                    ? "gradient-primary text-primary-foreground border-0"
                    : "border-border/50 bg-secondary/30 text-muted-foreground hover:text-foreground hover:bg-secondary/60"}`}>
                  {t}
                </Button>
              ))}
            </div>
          )}
          {!isBrand && <div className="mb-6" />}

          {/* Results count */}
          <p className="text-xs text-muted-foreground mb-4">
            {isBrand ? filteredCreators.length : filteredBrands.length} result{(isBrand ? filteredCreators.length : filteredBrands.length) !== 1 ? "s" : ""} found
          </p>

          {/* Creator grid */}
          {isBrand ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredCreators.map((c, i) => (
                <motion.div
                  key={c.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                  whileHover={{ y: -4, transition: { duration: 0.2 } }}>
                  <Link to={`/profile/creator/${c.id}`}
                    className="group block glass-card rounded-xl p-5 hover:neon-border hover:shadow-elevated transition-all duration-300 h-full">
                    {/* Header row */}
                    <div className="flex items-center gap-3 mb-3">
                      <div className="relative">
                        <img src={c.avatar} alt={c.name} className="w-12 h-12 rounded-full object-cover" />
                        {c.isVerified && (
                          <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-cyan-400 flex items-center justify-center">
                            <span className="text-[8px] text-background font-bold">✓</span>
                          </div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-semibold text-foreground text-sm truncate">{c.name}</div>
                        <div className="text-xs text-muted-foreground">@{c.username}</div>
                      </div>
                      <CredibilityBadge score={c.credibilityScore} size="xs" />
                    </div>

                    {/* Bio */}
                    <p className="text-xs text-muted-foreground mb-3 line-clamp-2">{c.bio}</p>

                    {/* Badge row */}
                    <div className="flex flex-wrap gap-1.5 mb-3">
                      <TierBadge tier={c.tier} size="xs" />
                      <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-primary/10 border border-primary/20 text-primary font-semibold">{c.niche}</span>
                      <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-secondary border border-border/40 text-muted-foreground">{c.location}</span>
                      {c.isASCICompliant && (
                        <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-teal-400/10 border border-teal-400/30 text-teal-400 font-semibold">ASCI ✓</span>
                      )}
                    </div>

                    {/* Stats */}
                    <div className="flex items-center justify-between text-sm">
                      <div>
                        <span className="font-semibold text-foreground">{c.followers}</span>
                        <span className="text-muted-foreground text-xs ml-1">followers</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-cyan-400 font-semibold text-xs">{c.engagement} eng.</span>
                        <StarRating rating={c.rating} />
                      </div>
                    </div>

                    {/* Completed campaigns */}
                    <div className="mt-2 pt-2 border-t border-border/30">
                      <span className="text-[10px] text-muted-foreground">{c.completedCampaigns} campaigns completed</span>
                    </div>
                  </Link>
                </motion.div>
              ))}
              {filteredCreators.length === 0 && (
                <div className="col-span-full text-center py-12 text-muted-foreground">No creators found matching your criteria.</div>
              )}
            </div>
          ) : (
            /* Brand grid */
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredBrands.map((b, i) => (
                <motion.div
                  key={b.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                  whileHover={{ y: -4, transition: { duration: 0.2 } }}>
                  <Link to={`/profile/brand/${b.id}`}
                    className="group block glass-card rounded-xl p-5 hover:neon-border hover:shadow-elevated transition-all duration-300 h-full">
                    <div className="flex items-center gap-3 mb-3">
                      <img src={b.logo} alt={b.name} className="w-12 h-12 rounded-lg object-cover border border-border/50" />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1.5">
                          <div className="font-semibold text-foreground text-sm truncate">{b.name}</div>
                          {b.isVerified && <span className="text-cyan-400 text-xs">✓</span>}
                        </div>
                        <div className="text-xs text-muted-foreground">{b.industry}</div>
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground mb-3 line-clamp-2">{b.description}</p>
                    <div className="flex flex-wrap gap-1.5 mb-3">
                      <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-primary/10 border border-primary/20 text-primary font-semibold">{b.industry}</span>
                      <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-secondary border border-border/40 text-muted-foreground">{b.location}</span>
                    </div>
                    <div className="flex gap-4 text-sm">
                      <div><span className="font-semibold text-foreground">{b.activeCampaigns}</span><span className="text-muted-foreground text-xs ml-1">active</span></div>
                      <div><span className="font-semibold text-gradient text-xs">{b.budgetRange}</span></div>
                    </div>
                  </Link>
                </motion.div>
              ))}
              {filteredBrands.length === 0 && (
                <div className="col-span-full text-center py-12 text-muted-foreground">No brands found matching your criteria.</div>
              )}
            </div>
          )}
        </div>
      </div>
    </PageTransition>
  );
}
