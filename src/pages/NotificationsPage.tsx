import { useState } from "react";
import { Bell, CheckCheck, Megaphone, Users, CheckCircle2, IndianRupee, FileSignature, ShieldAlert, Trophy, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { notifications as initialNotifications, type Notification } from "@/data/mockData";
import Navbar from "@/components/Navbar";
import PageTransition from "@/components/PageTransition";

const typeConfig: Record<Notification['type'], { icon: React.ElementType; color: string; bg: string }> = {
  invite:     { icon: Megaphone,     color: "text-cyan-400",    bg: "bg-cyan-400/10" },
  application:{ icon: Users,         color: "text-blue-400",    bg: "bg-blue-400/10" },
  approval:   { icon: CheckCircle2,  color: "text-emerald-400", bg: "bg-emerald-400/10" },
  payment:    { icon: IndianRupee,   color: "text-teal-400",    bg: "bg-teal-400/10" },
  contract:   { icon: FileSignature, color: "text-amber-400",   bg: "bg-amber-400/10" },
  compliance: { icon: ShieldAlert,   color: "text-amber-400",   bg: "bg-amber-400/10" },
  milestone:  { icon: Trophy,        color: "text-purple-400",  bg: "bg-purple-400/10" },
};

export default function NotificationsPage() {
  const [items, setItems] = useState(initialNotifications);

  const unreadCount = items.filter((n) => !n.read).length;

  const markAllRead = () => setItems(items.map((n) => ({ ...n, read: true })));
  const dismiss = (id: string) => setItems(items.filter((n) => n.id !== id));
  const markRead = (id: string) => setItems(items.map((n) => n.id === id ? { ...n, read: true } : n));

  return (
    <PageTransition>
      <div className="min-h-screen bg-background pb-mobile-nav">
        <Navbar />
        <div className="max-w-2xl mx-auto px-4 py-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold text-foreground">Notifications</h1>
              {unreadCount > 0 && (
                <span className="gradient-primary text-primary-foreground text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center">
                  {unreadCount}
                </span>
              )}
            </div>
            {unreadCount > 0 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={markAllRead}
                className="text-xs text-muted-foreground hover:text-foreground gap-1.5">
                <CheckCheck className="h-3.5 w-3.5" /> Mark all read
              </Button>
            )}
          </div>

          {/* Notification list */}
          <div className="space-y-2">
            <AnimatePresence>
              {items.map((notif) => {
                const cfg = typeConfig[notif.type];
                const Icon = cfg.icon;
                return (
                  <motion.div
                    key={notif.id}
                    layout
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20, height: 0 }}
                    transition={{ duration: 0.2 }}
                    className={`relative glass-card rounded-xl p-4 flex items-start gap-4 transition-all ${
                      !notif.read ? "border-l-2 border-l-primary" : ""
                    }`}
                    onClick={() => markRead(notif.id)}>

                    {/* Icon */}
                    <div className={`w-10 h-10 rounded-xl ${cfg.bg} flex items-center justify-center shrink-0`}>
                      <Icon className={`h-4 w-4 ${cfg.color}`} />
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-foreground text-sm">{notif.title}</span>
                        {!notif.read && (
                          <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">{notif.description}</p>
                      <div className="flex items-center gap-3 mt-2">
                        <span className="text-[10px] text-muted-foreground">{notif.time}</span>
                        {notif.actionUrl && (
                          <Link
                            to={notif.actionUrl}
                            className="text-[10px] text-primary font-semibold hover:underline"
                            onClick={(e) => e.stopPropagation()}>
                            View →
                          </Link>
                        )}
                      </div>
                    </div>

                    {/* Dismiss button */}
                    <button
                      onClick={(e) => { e.stopPropagation(); dismiss(notif.id); }}
                      className="shrink-0 text-muted-foreground hover:text-foreground transition-colors p-0.5">
                      <X className="h-3.5 w-3.5" />
                    </button>
                  </motion.div>
                );
              })}
            </AnimatePresence>

            {items.length === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-16">
                <Bell className="h-12 w-12 text-muted-foreground/30 mx-auto mb-3" />
                <p className="text-muted-foreground text-sm">All caught up! No notifications.</p>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
