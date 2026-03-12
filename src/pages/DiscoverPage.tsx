import { useState } from "react";
import { Link } from "react-router-dom";
import { Search } from "lucide-react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { creators, brands } from "@/data/mockData";
import Navbar from "@/components/Navbar";
import PageTransition from "@/components/PageTransition";
import { useAuth } from "@/contexts/AuthContext";

const niches = ["All", "Tech", "Fashion", "Fitness", "Food", "Travel"];
const industries = ["All", "Technology", "Health & Fitness", "Beauty & Skincare"];

export default function DiscoverPage() {
  const { role } = useAuth();
  const [search, setSearch] = useState("");
  const [niche, setNiche] = useState("All");
  const [industry, setIndustry] = useState("All");

  // Brand users discover creators; Creator users discover brands
  const isBrand = role === "brand";

  const filteredCreators = creators.filter((c) => {
    const matchSearch = c.name.toLowerCase().includes(search.toLowerCase()) || c.niche.toLowerCase().includes(search.toLowerCase());
    const matchNiche = niche === "All" || c.niche === niche;
    return matchSearch && matchNiche;
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
            {isBrand ? "Discover Creators" : role === "creator" ? "Discover Brands" : "Discover Creators"}
          </h1>

          <div className="flex flex-col sm:flex-row gap-3 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder={isBrand ? "Search creators..." : role === "creator" ? "Search brands..." : "Search creators..."}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2 flex-wrap">
              {(isBrand || role !== "creator" ? niches : industries).map((n) => (
                <Button
                  key={n}
                  variant={(isBrand || role !== "creator" ? niche : industry) === n ? "default" : "outline"}
                  size="sm"
                  onClick={() => isBrand || role !== "creator" ? setNiche(n) : setIndustry(n)}
                  className={(isBrand || role !== "creator" ? niche : industry) === n ? "gradient-primary text-primary-foreground border-0" : ""}
                >
                  {n}
                </Button>
              ))}
            </div>
          </div>

          {/* Brand sees creators, Creator sees brands */}
          {isBrand || role !== "creator" ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredCreators.map((c, i) => (
                <motion.div
                  key={c.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                  whileHover={{ y: -4, transition: { duration: 0.2 } }}
                >
                  <Link to={`/profile/creator/${c.id}`} className="block bg-card rounded-xl shadow-card p-5 hover:shadow-elevated transition-shadow h-full">
                    <div className="flex items-center gap-3 mb-3">
                      <img src={c.avatar} alt={c.name} className="w-12 h-12 rounded-full object-cover" />
                      <div>
                        <div className="font-semibold text-card-foreground">{c.name}</div>
                        <div className="text-xs text-muted-foreground">@{c.username}</div>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{c.bio}</p>
                    <div className="flex flex-wrap gap-2 mb-3">
                      <span className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary font-medium">{c.niche}</span>
                      <span className="text-xs px-2 py-0.5 rounded-full bg-secondary text-secondary-foreground">{c.location}</span>
                    </div>
                    <div className="flex gap-4 text-sm">
                      <div><span className="font-semibold text-card-foreground">{c.followers}</span> <span className="text-muted-foreground">followers</span></div>
                      <div><span className="font-semibold text-card-foreground">{c.engagement}</span> <span className="text-muted-foreground">eng.</span></div>
                    </div>
                  </Link>
                </motion.div>
              ))}
              {filteredCreators.length === 0 && (
                <div className="col-span-full text-center py-12 text-muted-foreground">No creators found matching your criteria.</div>
              )}
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredBrands.map((b, i) => (
                <motion.div
                  key={b.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                  whileHover={{ y: -4, transition: { duration: 0.2 } }}
                >
                  <Link to={`/profile/brand/${b.id}`} className="block bg-card rounded-xl shadow-card p-5 hover:shadow-elevated transition-shadow h-full">
                    <div className="flex items-center gap-3 mb-3">
                      <img src={b.logo} alt={b.name} className="w-12 h-12 rounded-lg object-cover" />
                      <div>
                        <div className="font-semibold text-card-foreground">{b.name}</div>
                        <div className="text-xs text-muted-foreground">{b.industry}</div>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{b.description}</p>
                    <div className="flex flex-wrap gap-2 mb-3">
                      <span className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary font-medium">{b.industry}</span>
                      <span className="text-xs px-2 py-0.5 rounded-full bg-secondary text-secondary-foreground">{b.location}</span>
                    </div>
                    <div className="flex gap-4 text-sm">
                      <div><span className="font-semibold text-card-foreground">{b.activeCampaigns}</span> <span className="text-muted-foreground">active</span></div>
                      <div><span className="font-semibold text-card-foreground">{b.budgetRange}</span></div>
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
