import { useState } from "react";
import { Send, Paperclip } from "lucide-react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { conversations } from "@/data/mockData";
import Navbar from "@/components/Navbar";
import PageTransition from "@/components/PageTransition";

export default function MessagesPage() {
  const [selected, setSelected] = useState(conversations[0]);
  const [msg, setMsg] = useState("");
  const [localMessages, setLocalMessages] = useState(selected.messages);

  const handleSelect = (conv: typeof conversations[0]) => {
    setSelected(conv);
    setLocalMessages(conv.messages);
  };

  const handleSend = () => {
    if (!msg.trim()) return;
    setLocalMessages([...localMessages, { from: "You", text: msg, time: "Now" }]);
    setMsg("");
  };

  return (
    <PageTransition>
      <div className="min-h-screen bg-background pb-mobile-nav">
        <Navbar />
        <div className="max-w-5xl mx-auto px-4 py-6">
          <h1 className="text-2xl font-bold text-foreground mb-6">Messages</h1>
          <div className="bg-card rounded-2xl shadow-card overflow-hidden flex" style={{ height: "calc(100vh - 180px)" }}>
            <div className="w-72 border-r border-border overflow-y-auto hidden sm:block">
              {conversations.map((conv) => (
                <button
                  key={conv.id}
                  onClick={() => handleSelect(conv)}
                  className={`w-full flex items-center gap-3 p-4 text-left hover:bg-secondary/50 transition-colors ${
                    selected.id === conv.id ? "bg-secondary" : ""
                  }`}
                >
                  <img src={conv.avatar} alt={conv.sender} className="w-10 h-10 rounded-full object-cover shrink-0" />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-card-foreground text-sm truncate">{conv.sender}</span>
                      <span className="text-xs text-muted-foreground">{conv.time}</span>
                    </div>
                    <p className="text-xs text-muted-foreground truncate">{conv.lastMessage}</p>
                  </div>
                  {conv.unread > 0 && (
                    <span className="w-5 h-5 rounded-full gradient-primary text-primary-foreground text-xs flex items-center justify-center">{conv.unread}</span>
                  )}
                </button>
              ))}
            </div>

            <div className="flex-1 flex flex-col">
              <div className="p-4 border-b border-border flex items-center gap-3">
                <img src={selected.avatar} alt={selected.sender} className="w-8 h-8 rounded-full object-cover" />
                <span className="font-semibold text-card-foreground text-sm">{selected.sender}</span>
              </div>
              <div className="flex-1 overflow-y-auto p-4 space-y-3">
                {localMessages.map((m, i) => (
                  <motion.div
                    key={i}
                    className={`flex ${m.from === "You" ? "justify-end" : "justify-start"}`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2, delay: i * 0.05 }}
                  >
                    <div className={`max-w-[70%] px-4 py-2 rounded-2xl text-sm ${
                      m.from === "You"
                        ? "gradient-primary text-primary-foreground"
                        : "bg-secondary text-secondary-foreground"
                    }`}>
                      {m.text}
                      <div className={`text-xs mt-1 ${m.from === "You" ? "text-primary-foreground/70" : "text-muted-foreground"}`}>{m.time}</div>
                    </div>
                  </motion.div>
                ))}
              </div>
              <div className="p-4 border-t border-border flex gap-2">
                <Button variant="ghost" size="icon" className="shrink-0"><Paperclip className="h-4 w-4" /></Button>
                <Input
                  placeholder="Type a message..."
                  value={msg}
                  onChange={(e) => setMsg(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSend()}
                  className="flex-1"
                />
                <Button onClick={handleSend} size="icon" className="gradient-primary text-primary-foreground border-0 shrink-0">
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
