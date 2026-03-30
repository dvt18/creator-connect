import { Link, useLocation } from "react-router-dom";
import { Home, Search, Bell, User, LayoutDashboard, Building2, Megaphone } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

export default function MobileBottomNav() {
  const location = useLocation();
  const { role, isLoggedIn } = useAuth();

  if (!isLoggedIn) return null;

  const creatorNav = [
    { to: "/feed", icon: Home, label: "Home" },
    { to: "/discover", icon: Search, label: "Discover" },
    { to: "/campaigns", icon: Megaphone, label: "Campaigns" },
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
    <nav className="fixed bottom-0 left-0 right-0 z-50 glass border-t border-border/40 md:hidden"
      style={{ boxShadow: "0 -4px 24px hsl(0 0% 0% / 0.4)" }}>
      <div className="flex items-center justify-around h-14">
        {navItems.map((item) => {
          const active = location.pathname === item.to || location.pathname.startsWith(item.to + "/");
          return (
            <Link
              key={item.to}
              to={item.to}
              className={`flex flex-col items-center justify-center gap-0.5 flex-1 h-full transition-all duration-200 ${
                active ? "text-primary" : "text-muted-foreground"
              }`}>
              <item.icon className={`h-5 w-5 ${active ? "drop-shadow-[0_0_8px_hsl(187_96%_43%_/_0.8)] stroke-[2.5]" : ""}`} />
              <span className={`text-[10px] font-medium ${active ? "text-primary" : ""}`}>{item.label}</span>
              {active && (
                <span className="absolute bottom-1 w-4 h-0.5 rounded-full gradient-primary" />
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
