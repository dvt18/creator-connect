import { useParams } from "react-router-dom";
import { MapPin, Briefcase, DollarSign } from "lucide-react";
import { Button } from "@/components/ui/button";
import { brands, campaigns } from "@/data/mockData";
import Navbar from "@/components/Navbar";
import { Link } from "react-router-dom";

export default function BrandProfilePage() {
  const { id } = useParams();
  const brand = brands.find((b) => b.id === id) || brands[0];
  const brandCampaigns = campaigns.filter((c) => c.brandName === brand.name);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="max-w-3xl mx-auto px-4 py-8">
        <div className="bg-card rounded-2xl shadow-card p-6 md:p-8 mb-6">
          <div className="flex flex-col sm:flex-row items-start gap-6">
            <img src={brand.logo} alt={brand.name} className="w-20 h-20 rounded-2xl object-cover" />
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-card-foreground">{brand.name}</h1>
              <p className="text-card-foreground text-sm mt-1 mb-3">{brand.description}</p>
              <div className="flex flex-wrap gap-3 text-sm">
                <span className="flex items-center gap-1 text-muted-foreground"><Briefcase className="h-3.5 w-3.5" /> {brand.industry}</span>
                <span className="flex items-center gap-1 text-muted-foreground"><MapPin className="h-3.5 w-3.5" /> {brand.location}</span>
                <span className="flex items-center gap-1 text-muted-foreground"><DollarSign className="h-3.5 w-3.5" /> {brand.budgetRange}</span>
              </div>
            </div>
            <Button className="gradient-primary text-primary-foreground border-0 shrink-0">Contact Brand</Button>
          </div>
          <div className="grid grid-cols-2 gap-4 mt-6 pt-6 border-t border-border">
            <div className="text-center">
              <div className="text-xl font-bold text-card-foreground">{brand.activeCampaigns}</div>
              <div className="text-xs text-muted-foreground">Active Campaigns</div>
            </div>
            <div className="text-center">
              <div className="text-xl font-bold text-card-foreground">{brand.pastCampaigns}</div>
              <div className="text-xs text-muted-foreground">Past Campaigns</div>
            </div>
          </div>
        </div>

        <h2 className="text-lg font-semibold text-foreground mb-4">Active Campaigns</h2>
        <div className="space-y-4">
          {brandCampaigns.map((c) => (
            <Link key={c.id} to={`/campaign/${c.id}`} className="block bg-card rounded-xl shadow-card p-5 hover:shadow-elevated transition-shadow">
              <div className="font-semibold text-card-foreground">{c.title}</div>
              <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mt-2">
                <span>💰 {c.budget}</span>
                <span>👥 {c.creatorsNeeded} needed</span>
                <span>⏰ {c.deadline}</span>
              </div>
            </Link>
          ))}
          {brandCampaigns.length === 0 && (
            <p className="text-muted-foreground text-sm">No active campaigns at the moment.</p>
          )}
        </div>
      </div>
    </div>
  );
}
