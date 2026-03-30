import { Link, useLocation, useNavigate } from "react-router-dom";
import { Home, Search, Compass, MessageCircle, Bell, User, LayoutDashboard, Zap, LogOut, Building2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { role, isLoggedIn, logout } = useAuth();

  const creatorNav = [
    { to: "/feed", icon: Home, label: "Feed" },
    { to: "/discover", icon: Search, label: "Discover" },
    { to: "/campaigns", icon: Compass, label: "Campaigns" },
    { to: "/messages", icon: MessageCircle, label: "Messages" },
    { to: "/notifications", icon: Bell, label: "Notifications" },
    { to: "/creator-dashboard", icon: LayoutDashboard, label: "Dashboard" },
    { to: "/profile/creator/1", icon: User, label: "Profile" },
  ];

  const brandNav = [
    { to: "/feed", icon: Home, label: "Feed" },
    { to: "/discover", icon: Search, label: "Find Creators" },
    { to: "/brand-dashboard", icon: LayoutDashboard, label: "Dashboard" },
    { to: "/messages", icon: MessageCircle, label: "Messages" },
    { to: "/notifications", icon: Bell, label: "Notifications" },
    { to: "/profile/brand/1", icon: Building2, label: "Profile" },
  ];

  const navItems = role === "brand" ? brandNav : creatorNav;

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="sticky top-0 z-50 glass border-b border-border/40">
      <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 font-bold text-lg">
          <div className="h-8 w-8 rounded-lg gradient-primary flex items-center justify-center glow-cyan">
            <Zap className="h-4 w-4 text-primary-foreground" />
          </div>
          <span className="text-foreground">CreatorHub</span>
        </Link>

        {/* Mobile: only show chat button */}
        <div className="flex md:hidden items-center gap-1">
          {isLoggedIn && (
            <Button variant="ghost" size="icon" asChild>
              <Link to="/messages">
                <MessageCircle className="h-5 w-5 text-foreground" />
              </Link>
            </Button>
          )}
        </div>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-0.5">
          {navItems.map((item) => {
            const active = location.pathname === item.to || location.pathname.startsWith(item.to + "/");
            return (
              <Link
                key={item.to}
                to={item.to}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  active
                    ? "text-primary bg-primary/10 border border-primary/20"
                    : "text-muted-foreground hover:text-foreground hover:bg-secondary/80"
                }`}>
                <item.icon className={`h-4 w-4 ${active ? "drop-shadow-[0_0_6px_hsl(187_96%_43%_/_0.8)]" : ""}`} />
                <span className="hidden lg:inline">{item.label}</span>
                {active && (
                  <span className="ml-0.5 w-1.5 h-1.5 rounded-full bg-primary hidden lg:block" />
                )}
              </Link>
            );
          })}
          {isLoggedIn && (
            <button
              onClick={handleLogout}
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-all duration-200">
              <LogOut className="h-4 w-4" />
              <span className="hidden lg:inline">Logout</span>
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}
