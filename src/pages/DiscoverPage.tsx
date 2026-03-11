import { useState } from "react";
import { Link } from "react-router-dom";
import { Search, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { creators } from "@/data/mockData";
import Navbar from "@/components/Navbar";

const niches = ["All", "Tech", "Fashion", "Fitness", "Food", "Travel"];

export default function DiscoverPage() {
  const [search, setSearch] = useState("");
  const [niche, setNiche] = useState("All");

  const filtered = creators.filter((c) => {
    const matchSearch = c.name.toLowerCase().includes(search.toLowerCase()) || c.niche.toLowerCase().includes(search.toLowerCase());
    const matchNiche = niche === "All" || c.niche === niche;
    return matchSearch && matchNiche;
  });

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="max-w-6xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-foreground mb-6">Discover Creators</h1>

        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search creators..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-10" />
          </div>
          <div className="flex gap-2 flex-wrap">
            {niches.map((n) => (
              <Button
                key={n}
                variant={niche === n ? "default" : "outline"}
                size="sm"
                onClick={() => setNiche(n)}
                className={niche === n ? "gradient-primary text-primary-foreground border-0" : ""}
              >
                {n}
              </Button>
            ))}
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((c) => (
            <Link key={c.id} to={`/profile/creator/${c.id}`} className="bg-card rounded-xl shadow-card p-5 hover:shadow-elevated transition-shadow">
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
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-12 text-muted-foreground">No creators found matching your criteria.</div>
        )}
      </div>
    </div>
  );
}
