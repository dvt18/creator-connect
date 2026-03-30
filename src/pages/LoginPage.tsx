import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Zap, Mail, TrendingUp, Users, Star } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

const promoStats = [
  { icon: Users, label: "Active Creators", value: "10K+" },
  { icon: TrendingUp, label: "Avg Engagement", value: "6.8%" },
  { icon: Star, label: "Brand Partners", value: "500+" },
];

export default function LoginPage() {
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [role, setRole] = useState<"creator" | "brand">("creator");
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(role);
    navigate(role === "brand" ? "/brand-dashboard" : "/feed");
  };

  return (
    <div className="min-h-screen flex bg-background">
      {/* LEFT: Animated promo panel (desktop only) */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden animated-bg items-center justify-center p-12">
        {/* Background orbs */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute w-[500px] h-[500px] rounded-full top-[-10%] left-[-20%]"
            style={{ background: "radial-gradient(circle, hsl(187 96% 43% / 0.2), transparent 70%)" }} />
          <div className="absolute w-[400px] h-[400px] rounded-full bottom-[-10%] right-[-10%]"
            style={{ background: "radial-gradient(circle, hsl(172 66% 40% / 0.18), transparent 70%)" }} />
        </div>
        {/* Dot grid */}
        <div className="absolute inset-0 dot-grid opacity-30 pointer-events-none" />

        <div className="relative z-10 max-w-sm">
          {/* Logo */}
          <div className="flex items-center gap-3 mb-12">
            <div className="h-10 w-10 rounded-xl gradient-primary flex items-center justify-center glow-cyan">
              <Zap className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="font-bold text-2xl text-foreground">CreatorHub</span>
          </div>

          <h2 className="text-4xl font-extrabold text-foreground leading-tight mb-4">
            Where Brands<br />Meet{" "}
            <span className="text-gradient">Creators</span>
          </h2>
          <p className="text-muted-foreground text-base leading-relaxed mb-10">
            The #1 platform to discover talent, launch campaigns,
            and monetize your creativity.
          </p>

          {/* Stat cards */}
          <div className="space-y-3">
            {promoStats.map((s, i) => (
              <motion.div
                key={s.label}
                className="glass-card rounded-xl p-4 flex items-center gap-4"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + i * 0.1, duration: 0.5 }}>
                <div className="w-10 h-10 rounded-lg gradient-primary flex items-center justify-center flex-shrink-0">
                  <s.icon className="h-4 w-4 text-primary-foreground" />
                </div>
                <div>
                  <div className="text-xl font-bold text-gradient">{s.value}</div>
                  <div className="text-xs text-muted-foreground">{s.label}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* RIGHT: Auth form */}
      <div className="flex-1 flex items-center justify-center px-4 py-12 lg:py-0">
        <motion.div
          className="w-full max-w-md"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}>

          {/* Mobile logo */}
          <Link to="/" className="flex items-center gap-2 font-bold text-lg justify-center mb-8 lg:hidden">
            <div className="h-8 w-8 rounded-lg gradient-primary flex items-center justify-center glow-cyan">
              <Zap className="h-4 w-4 text-primary-foreground" />
            </div>
            <span className="text-foreground">CreatorHub</span>
          </Link>

          <div className="glass-card rounded-2xl p-8 neon-border">
            <h1 className="text-2xl font-bold text-foreground text-center mb-2">
              {mode === "login" ? "Welcome back" : "Create your account"}
            </h1>
            <p className="text-sm text-muted-foreground text-center mb-6">
              {mode === "login" ? "Log in to continue" : "Join CreatorHub today"}
            </p>

            {/* Role toggle */}
            <div className="flex rounded-lg bg-secondary/60 p-1 mb-6 border border-border/40">
              {(["creator", "brand"] as const).map((r) => (
                <button
                  key={r}
                  onClick={() => setRole(r)}
                  className={`flex-1 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
                    role === r
                      ? "gradient-primary text-primary-foreground shadow-sm"
                      : "text-muted-foreground hover:text-foreground"
                  }`}>
                  {r === "creator" ? "🎨 Creator" : "🏢 Brand"}
                </button>
              ))}
            </div>

            <form className="space-y-4" onSubmit={handleSubmit}>
              {mode === "signup" && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}>
                  <Label htmlFor="name" className="text-foreground/80 text-sm">
                    {role === "creator" ? "Full Name" : "Company Name"}
                  </Label>
                  <Input
                    id="name"
                    placeholder={role === "creator" ? "John Doe" : "Acme Inc."}
                    className="mt-1 bg-secondary/50 border-border/50 focus:border-primary/60 focus:ring-primary/20 text-foreground placeholder:text-muted-foreground"
                  />
                </motion.div>
              )}
              <div>
                <Label htmlFor="email" className="text-foreground/80 text-sm">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  className="mt-1 bg-secondary/50 border-border/50 focus:border-primary/60 focus:ring-primary/20 text-foreground placeholder:text-muted-foreground"
                />
              </div>
              <div>
                <Label htmlFor="password" className="text-foreground/80 text-sm">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  className="mt-1 bg-secondary/50 border-border/50 focus:border-primary/60 focus:ring-primary/20 text-foreground placeholder:text-muted-foreground"
                />
              </div>
              <Button
                type="submit"
                className="w-full gradient-primary text-primary-foreground border-0 shimmer font-semibold hover:opacity-90 transition-opacity h-11">
                {mode === "login" ? "Log in" : "Sign up"}
              </Button>
            </form>

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-border/40" /></div>
              <div className="relative flex justify-center text-xs uppercase"><span className="bg-card px-2 text-muted-foreground">or</span></div>
            </div>

            <Button variant="outline" className="w-full gap-2 border-border/50 bg-secondary/30 hover:bg-secondary/60 text-foreground">
              <Mail className="h-4 w-4" /> Continue with Google
            </Button>

            <p className="text-center text-sm text-muted-foreground mt-6">
              {mode === "login" ? "Don't have an account?" : "Already have an account?"}{" "}
              <button
                onClick={() => setMode(mode === "login" ? "signup" : "login")}
                className="text-primary font-medium hover:underline">
                {mode === "login" ? "Sign up" : "Log in"}
              </button>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
