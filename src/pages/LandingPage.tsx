import { Link, Navigate } from "react-router-dom";
import { Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";
import HeroSection from "@/components/landing/HeroSection";
import HowItWorksSection from "@/components/landing/HowItWorksSection";
import CreatorsSection from "@/components/landing/CreatorsSection";
import CampaignsSection from "@/components/landing/CampaignsSection";
import TestimonialsSection from "@/components/landing/TestimonialsSection";
import CTASection from "@/components/landing/CTASection";
import LandingFooter from "@/components/landing/LandingFooter";

export default function LandingPage() {
  const isMobile = useIsMobile();

  if (isMobile) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Nav */}
      <nav className="sticky top-0 z-50 glass border-b border-border/50">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 font-bold text-lg">
            <div className="h-8 w-8 rounded-lg gradient-primary flex items-center justify-center">
              <Zap className="h-4 w-4 text-primary-foreground" />
            </div>
            <span className="text-foreground">CreatorHub</span>
          </Link>
          <div className="flex items-center gap-3">
            <Link to="/login">
              <Button variant="ghost" size="sm">Log in</Button>
            </Link>
            <Link to="/login">
              <Button size="sm" className="gradient-primary text-primary-foreground border-0 rounded-lg">
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      <HeroSection />
      <HowItWorksSection />
      <CreatorsSection />
      <CampaignsSection />
      <TestimonialsSection />
      <CTASection />
      <LandingFooter />
    </div>
  );
}
