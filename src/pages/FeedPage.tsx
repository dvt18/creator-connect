import { Heart, MessageCircle, Share2, Bookmark } from "lucide-react";
import { motion } from "framer-motion";
import { feedPosts } from "@/data/mockData";
import Navbar from "@/components/Navbar";
import PageTransition from "@/components/PageTransition";

export default function FeedPage() {
  return (
    <PageTransition>
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="max-w-xl mx-auto px-4 py-6">
          <h1 className="text-2xl font-bold text-foreground mb-6">Home Feed</h1>
          <div className="space-y-4">
            {feedPosts.map((post, i) => (
              <motion.article
                key={post.id}
                className="bg-card rounded-xl shadow-card overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                whileHover={{ y: -2, transition: { duration: 0.2 } }}
              >
                <div className="flex items-center gap-3 p-4 pb-2">
                  <img src={post.avatar} alt={post.author} className="w-10 h-10 rounded-full object-cover" />
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-card-foreground text-sm">{post.author}</div>
                    <div className="text-xs text-muted-foreground">@{post.username} · {post.timestamp}</div>
                  </div>
                  {post.type === "campaign" && (
                    <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-primary/10 text-primary">Campaign</span>
                  )}
                  {post.type === "milestone" && (
                    <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-accent/20 text-accent">Milestone</span>
                  )}
                </div>
                <p className="px-4 pb-3 text-sm text-card-foreground">{post.content}</p>
                {post.image && (
                  <img src={post.image} alt="" className="w-full aspect-video object-cover" />
                )}
                <div className="flex items-center justify-between p-4">
                  <div className="flex items-center gap-5">
                    <motion.button whileTap={{ scale: 1.3 }} className="flex items-center gap-1.5 text-muted-foreground hover:text-destructive transition-colors">
                      <Heart className="h-4 w-4" />
                      <span className="text-xs">{post.likes.toLocaleString()}</span>
                    </motion.button>
                    <motion.button whileTap={{ scale: 1.2 }} className="flex items-center gap-1.5 text-muted-foreground hover:text-primary transition-colors">
                      <MessageCircle className="h-4 w-4" />
                      <span className="text-xs">{post.comments}</span>
                    </motion.button>
                    <motion.button whileTap={{ scale: 1.2 }} className="flex items-center gap-1.5 text-muted-foreground hover:text-accent transition-colors">
                      <Share2 className="h-4 w-4" />
                      <span className="text-xs">{post.shares}</span>
                    </motion.button>
                  </div>
                  <motion.button whileTap={{ scale: 1.2 }} className="text-muted-foreground hover:text-foreground transition-colors">
                    <Bookmark className="h-4 w-4" />
                  </motion.button>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
