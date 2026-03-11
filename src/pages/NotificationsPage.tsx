import { Bell, CheckCircle, DollarSign, Mail, Trophy } from "lucide-react";
import { notifications } from "@/data/mockData";
import Navbar from "@/components/Navbar";

const iconMap = {
  invite: Mail,
  application: Bell,
  approval: CheckCircle,
  payment: DollarSign,
  milestone: Trophy,
};

export default function NotificationsPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="max-w-2xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-foreground mb-6">Notifications</h1>
        <div className="space-y-2">
          {notifications.map((n) => {
            const Icon = iconMap[n.type];
            return (
              <div
                key={n.id}
                className={`bg-card rounded-xl p-4 flex items-start gap-3 transition-colors ${
                  !n.read ? "shadow-card border-l-2 border-l-primary" : "shadow-sm"
                }`}
              >
                {n.avatar ? (
                  <img src={n.avatar} alt="" className="w-10 h-10 rounded-full object-cover shrink-0" />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <Icon className="h-5 w-5 text-primary" />
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-card-foreground text-sm">{n.title}</span>
                    <span className="text-xs text-muted-foreground">{n.time}</span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-0.5">{n.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
