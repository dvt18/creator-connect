import { Link } from "react-router-dom";
import { Zap } from "lucide-react";

export default function LandingFooter() {
  return (
    <footer className="border-t border-border py-12">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2 font-bold text-lg">
            <div className="h-8 w-8 rounded-lg gradient-primary flex items-center justify-center">
              <Zap className="h-4 w-4 text-primary-foreground" />
            </div>
            <span className="text-foreground">CreatorHub</span>
          </div>
          <div className="flex items-center gap-6 text-sm text-muted-foreground">
            <Link to="/discover" className="hover:text-foreground transition-colors">Discover</Link>
            <Link to="/campaigns" className="hover:text-foreground transition-colors">Campaigns</Link>
            <Link to="/login" className="hover:text-foreground transition-colors">Login</Link>
          </div>
          <p className="text-sm text-muted-foreground">
            © 2026 CreatorHub. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
