import { ShieldCheck, AlertTriangle, Star, BadgeCheck } from "lucide-react";
import type { CreatorTier } from "@/data/mockData";

// ─── Tier Badge ───────────────────────────────────────────────
const tierConfig: Record<CreatorTier, { label: string; color: string; bg: string }> = {
  Nano:      { label: "Nano",      color: "text-slate-400",  bg: "bg-slate-400/10 border-slate-400/30" },
  Micro:     { label: "Micro",     color: "text-cyan-400",   bg: "bg-cyan-400/10 border-cyan-400/30" },
  Macro:     { label: "Macro",     color: "text-blue-400",   bg: "bg-blue-400/10 border-blue-400/30" },
  Celebrity: { label: "Celebrity", color: "text-amber-400",  bg: "bg-amber-400/10 border-amber-400/30" },
};

export function TierBadge({ tier, size = "sm" }: { tier: CreatorTier; size?: "xs" | "sm" | "md" }) {
  const cfg = tierConfig[tier];
  const sizeClass = size === "xs" ? "text-[9px] px-1.5 py-0.5" : size === "md" ? "text-sm px-3 py-1" : "text-[10px] px-2 py-0.5";
  return (
    <span className={`inline-flex items-center font-semibold rounded-full border ${cfg.color} ${cfg.bg} ${sizeClass}`}>
      {tier}
    </span>
  );
}

// ─── Credibility Score Badge ──────────────────────────────────
export function CredibilityBadge({ score, size = "sm" }: { score: number; size?: "xs" | "sm" | "md" }) {
  const color = score >= 85 ? "text-emerald-400 bg-emerald-400/10 border-emerald-400/30"
    : score >= 65 ? "text-amber-400 bg-amber-400/10 border-amber-400/30"
    : "text-red-400 bg-red-400/10 border-red-400/30";
  const icon = score >= 85 ? "🟢" : score >= 65 ? "🟡" : "🔴";
  const sizeClass = size === "xs" ? "text-[9px] px-1.5 py-0.5" : size === "md" ? "text-sm px-3 py-1" : "text-[10px] px-2 py-0.5";
  return (
    <span className={`inline-flex items-center gap-1 font-semibold rounded-full border ${color} ${sizeClass}`}>
      {icon} {score}/100
    </span>
  );
}

// ─── KYC Verified Badge ───────────────────────────────────────
export function VerifiedBadge({ size = "sm" }: { size?: "xs" | "sm" | "md" }) {
  const sizeClass = size === "xs" ? "text-[9px] px-1.5 py-0.5 gap-0.5" : size === "md" ? "text-sm px-3 py-1 gap-1.5" : "text-[10px] px-2 py-0.5 gap-1";
  return (
    <span className={`inline-flex items-center font-semibold rounded-full bg-cyan-400/10 border border-cyan-400/30 text-cyan-400 ${sizeClass}`}>
      <BadgeCheck className={size === "xs" ? "h-2.5 w-2.5" : "h-3 w-3"} />
      KYC Verified
    </span>
  );
}

// ─── ASCI Compliant Badge ─────────────────────────────────────
export function ASCIBadge({ compliant, size = "sm" }: { compliant: boolean; size?: "xs" | "sm" | "md" }) {
  const sizeClass = size === "xs" ? "text-[9px] px-1.5 py-0.5 gap-0.5" : size === "md" ? "text-sm px-3 py-1 gap-1.5" : "text-[10px] px-2 py-0.5 gap-1";
  if (compliant) {
    return (
      <span className={`inline-flex items-center font-semibold rounded-full bg-teal-400/10 border border-teal-400/30 text-teal-400 ${sizeClass}`}>
        <ShieldCheck className={size === "xs" ? "h-2.5 w-2.5" : "h-3 w-3"} />
        ASCI Compliant
      </span>
    );
  }
  return (
    <span className={`inline-flex items-center font-semibold rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-400 ${sizeClass}`}>
      <AlertTriangle className={size === "xs" ? "h-2.5 w-2.5" : "h-3 w-3"} />
      Pending Review
    </span>
  );
}

// ─── Star Rating ──────────────────────────────────────────────
export function StarRating({ rating, showCount, count }: { rating: number; showCount?: boolean; count?: number }) {
  return (
    <span className="inline-flex items-center gap-1">
      <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
      <span className="text-xs font-semibold text-foreground">{rating.toFixed(1)}</span>
      {showCount && count !== undefined && (
        <span className="text-xs text-muted-foreground">({count})</span>
      )}
    </span>
  );
}

// ─── Application Status Badge ─────────────────────────────────
type AppStatus = 'none' | 'applied' | 'accepted' | 'rejected';

export function ApplicationStatusBadge({ status }: { status: AppStatus }) {
  if (status === 'none') return null;
  const cfg = {
    applied:  { label: "Applied",  cls: "bg-blue-400/10 border-blue-400/30 text-blue-400" },
    accepted: { label: "Accepted ✅", cls: "bg-emerald-400/10 border-emerald-400/30 text-emerald-400" },
    rejected: { label: "Rejected", cls: "bg-red-400/10 border-red-400/30 text-red-400" },
  }[status];
  return (
    <span className={`inline-flex items-center text-[10px] font-semibold rounded-full border px-2 py-0.5 ${cfg.cls}`}>
      {cfg.label}
    </span>
  );
}

// ─── Contract Status Badge ────────────────────────────────────
export function ContractBadge({ status }: { status: 'pending' | 'signed' | 'not_required' }) {
  const cfg = {
    pending:      { label: "Contract Pending", cls: "bg-amber-400/10 border-amber-400/30 text-amber-400" },
    signed:       { label: "Contract Signed",  cls: "bg-emerald-400/10 border-emerald-400/30 text-emerald-400" },
    not_required: { label: "No Contract",      cls: "bg-secondary border-border text-muted-foreground" },
  }[status];
  return (
    <span className={`inline-flex items-center text-[10px] font-semibold rounded-full border px-2 py-0.5 ${cfg.cls}`}>
      {cfg.label}
    </span>
  );
}

// ─── Campaign Status Badge ────────────────────────────────────
export function CampaignStatusBadge({ status }: { status: string }) {
  const cfg: Record<string, string> = {
    active:    "bg-emerald-400/10 border-emerald-400/30 text-emerald-400",
    draft:     "bg-secondary border-border text-muted-foreground",
    completed: "bg-cyan-400/10 border-cyan-400/30 text-cyan-400",
    paused:    "bg-amber-400/10 border-amber-400/30 text-amber-400",
  };
  return (
    <span className={`inline-flex items-center text-[10px] font-semibold rounded-full border px-2 py-0.5 capitalize ${cfg[status] ?? cfg.draft}`}>
      {status}
    </span>
  );
}
