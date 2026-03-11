import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Zap, Mail } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

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
    <div className="min-h-screen flex items-center justify-center bg-background gradient-hero px-4">
      <motion.div
        className="w-full max-w-md"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Link to="/" className="flex items-center gap-2 font-bold text-lg justify-center mb-8">
          <div className="h-8 w-8 rounded-lg gradient-primary flex items-center justify-center">
            <Zap className="h-4 w-4 text-primary-foreground" />
          </div>
          <span className="text-foreground">CreatorHub</span>
        </Link>

        <div className="bg-card rounded-2xl shadow-elevated p-8">
          <h1 className="text-2xl font-bold text-card-foreground text-center mb-2">
            {mode === "login" ? "Welcome back" : "Create your account"}
          </h1>
          <p className="text-sm text-muted-foreground text-center mb-6">
            {mode === "login" ? "Log in to continue" : "Join CreatorHub today"}
          </p>

          {/* Role toggle */}
          <div className="flex rounded-lg bg-secondary p-1 mb-6">
            {(["creator", "brand"] as const).map((r) => (
              <button
                key={r}
                onClick={() => setRole(r)}
                className={`flex-1 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
                  role === r
                    ? "bg-card text-card-foreground shadow-sm"
                    : "text-muted-foreground"
                }`}
              >
                {r === "creator" ? "Creator" : "Brand"}
              </button>
            ))}
          </div>

          <form className="space-y-4" onSubmit={handleSubmit}>
            {mode === "signup" && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
              >
                <Label htmlFor="name" className="text-card-foreground">
                  {role === "creator" ? "Full Name" : "Company Name"}
                </Label>
                <Input id="name" placeholder={role === "creator" ? "John Doe" : "Acme Inc."} className="mt-1" />
              </motion.div>
            )}
            <div>
              <Label htmlFor="email" className="text-card-foreground">Email</Label>
              <Input id="email" type="email" placeholder="you@example.com" className="mt-1" />
            </div>
            <div>
              <Label htmlFor="password" className="text-card-foreground">Password</Label>
              <Input id="password" type="password" placeholder="••••••••" className="mt-1" />
            </div>
            <Button type="submit" className="w-full gradient-primary text-primary-foreground border-0">
              {mode === "login" ? "Log in" : "Sign up"}
            </Button>
          </form>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-border" /></div>
            <div className="relative flex justify-center text-xs uppercase"><span className="bg-card px-2 text-muted-foreground">or</span></div>
          </div>

          <Button variant="outline" className="w-full gap-2">
            <Mail className="h-4 w-4" /> Continue with Google
          </Button>

          <p className="text-center text-sm text-muted-foreground mt-6">
            {mode === "login" ? "Don't have an account?" : "Already have an account?"}{" "}
            <button onClick={() => setMode(mode === "login" ? "signup" : "login")} className="text-primary font-medium hover:underline">
              {mode === "login" ? "Sign up" : "Log in"}
            </button>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
