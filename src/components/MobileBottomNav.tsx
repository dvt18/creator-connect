import { Link, useLocation } from "react-router-dom";
import { Home, Search, Compass, Bell, User, LayoutDashboard, Building2 } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

export default function MobileBottomNav() {
  const location = useLocation();
  const { role, isLoggedIn } = useAuth();

  if (!isLoggedIn) return null;

  const creatorNav = [
    { to: "/feed", icon: Home, label: "Home" },
    { to: "/discover", icon: Search, label: "Discover" },
    { to: "/campaigns", icon: Compass, label: "Campaigns" },
    { to: "/notifications", icon: Bell, label: "Alerts" },
    { to: "/profile/creator/1", icon: User, label: "Profile" },
  ];

  const brandNav = [
    { to: "/feed", icon: Home, label: "Home" },
    { to: "/discover", icon: Search, label: "Search" },
    { to: "/brand-dashboard", icon: LayoutDashboard, label: "Dashboard" },
    { to: "/notifications", icon: Bell, label: "Alerts" },
    { to: "/profile/brand/1", icon: Building2, label: "Profile" },
  ];

  const navItems = role === "brand" ? brandNav : creatorNav;

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-t border-border md:hidden">
      <div className="flex items-center justify-around h-14">
        {navItems.map((item) => {
          const active = location.pathname === item.to || location.pathname.startsWith(item.to + "/");
          return (
            <Link
              key={item.to}
              to={item.to}
              className={`flex flex-col items-center justify-center gap-0.5 flex-1 h-full transition-colors ${
                active ? "text-primary" : "text-muted-foreground"
              }`}
            >
              <item.icon className={`h-5 w-5 ${active ? "stroke-[2.5]" : ""}`} />
              <span className="text-[10px] font-medium">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
