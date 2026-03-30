import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronRight, ChevronLeft, Plus, Trash2, CheckCircle2, ShieldAlert } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface Props {
  open: boolean;
  onClose: () => void;
  onCreated?: (campaign: CreatedCampaign) => void;
}

export interface CreatedCampaign {
  title: string;
  budget: string;
  deadline: string;
  category: string;
  description: string;
  requirements: string[];
  deliverables: string[];
  disclosureRequired: boolean;
}

const steps = ["Basic Info", "Requirements", "Deliverables", "Review"];

const categories = ["Tech", "Fashion", "Fitness", "Food", "Travel", "Beauty", "Finance", "Education"];

export default function CreateCampaignModal({ open, onClose, onCreated }: Props) {
  const [step, setStep] = useState(0);
  const [done, setDone] = useState(false);

  // Form state
  const [title, setTitle] = useState("");
  const [budget, setBudget] = useState("");
  const [deadline, setDeadline] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [creatorsNeeded, setCreatorsNeeded] = useState("5");
  const [requirements, setRequirements] = useState(["", ""]);
  const [deliverables, setDeliverables] = useState(["", ""]);
  const [disclosureRequired, setDisclosureRequired] = useState(true);

  const resetForm = () => {
    setStep(0); setDone(false);
    setTitle(""); setBudget(""); setDeadline(""); setCategory(""); setDescription("");
    setCreatorsNeeded("5"); setRequirements(["", ""]); setDeliverables(["", ""]);
    setDisclosureRequired(true);
  };

  const handleClose = () => { resetForm(); onClose(); };

  const handleSubmit = () => {
    const campaign: CreatedCampaign = {
      title, budget, deadline, category, description,
      requirements: requirements.filter(Boolean),
      deliverables: deliverables.filter(Boolean),
      disclosureRequired,
    };
    onCreated?.(campaign);
    setDone(true);
  };

  const addReq = () => setRequirements([...requirements, ""]);
  const removeReq = (i: number) => setRequirements(requirements.filter((_, idx) => idx !== i));
  const updateReq = (i: number, v: string) => setRequirements(requirements.map((r, idx) => idx === i ? v : r));

  const addDel = () => setDeliverables([...deliverables, ""]);
  const removeDel = (i: number) => setDeliverables(deliverables.filter((_, idx) => idx !== i));
  const updateDel = (i: number, v: string) => setDeliverables(deliverables.map((d, idx) => idx === i ? v : d));

  const canNext = () => {
    if (step === 0) return title && budget && deadline && category && description;
    if (step === 1) return requirements.some(Boolean);
    if (step === 2) return deliverables.some(Boolean);
    return true;
  };

  if (!open) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          className="absolute inset-0 bg-black/70 backdrop-blur-sm"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          onClick={handleClose} />

        {/* Modal */}
        <motion.div
          className="relative w-full max-w-xl glass-card rounded-2xl p-6 md:p-8 neon-border z-10 max-h-[90vh] overflow-y-auto"
          initial={{ opacity: 0, scale: 0.92, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.92, y: 20 }}
          transition={{ duration: 0.25 }}>

          {/* Close */}
          <button onClick={handleClose} className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors">
            <X className="h-5 w-5" />
          </button>

          {!done ? (
            <>
              <h2 className="text-xl font-bold text-foreground mb-1">Post a Campaign</h2>
              <p className="text-sm text-muted-foreground mb-6">Fill in the details to attract the right creators.</p>

              {/* Step indicator */}
              <div className="flex items-center gap-2 mb-8">
                {steps.map((s, i) => (
                  <div key={s} className="flex items-center gap-2">
                    <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                      i < step ? "gradient-primary text-primary-foreground"
                        : i === step ? "border-2 border-primary text-primary"
                        : "border border-border/50 text-muted-foreground"
                    }`}>
                      {i < step ? "✓" : i + 1}
                    </div>
                    <span className={`text-xs hidden sm:block ${i === step ? "text-foreground font-medium" : "text-muted-foreground"}`}>{s}</span>
                    {i < steps.length - 1 && <div className={`flex-1 h-px mx-1 ${i < step ? "bg-primary" : "bg-border/30"}`} style={{ width: 20 }} />}
                  </div>
                ))}
              </div>

              {/* Step 0: Basic Info */}
              {step === 0 && (
                <div className="space-y-4">
                  <div>
                    <Label className="text-foreground/80 text-sm">Campaign Title</Label>
                    <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g. Summer Product Launch" className="mt-1 bg-secondary/40 border-border/50 focus:border-primary/60" />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <Label className="text-foreground/80 text-sm">Budget</Label>
                      <Input value={budget} onChange={(e) => setBudget(e.target.value)} placeholder="e.g. ₹1,50,000" className="mt-1 bg-secondary/40 border-border/50 focus:border-primary/60" />
                    </div>
                    <div>
                      <Label className="text-foreground/80 text-sm">Deadline</Label>
                      <Input value={deadline} onChange={(e) => setDeadline(e.target.value)} placeholder="e.g. 14 days" className="mt-1 bg-secondary/40 border-border/50 focus:border-primary/60" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <Label className="text-foreground/80 text-sm">Creators Needed</Label>
                      <Input type="number" value={creatorsNeeded} onChange={(e) => setCreatorsNeeded(e.target.value)} min="1" className="mt-1 bg-secondary/40 border-border/50 focus:border-primary/60" />
                    </div>
                    <div>
                      <Label className="text-foreground/80 text-sm">Category</Label>
                      <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="mt-1 w-full bg-secondary/40 border border-border/50 focus:border-primary/60 rounded-md px-3 py-2 text-sm text-foreground outline-none">
                        <option value="">Select...</option>
                        {categories.map((c) => <option key={c} value={c}>{c}</option>)}
                      </select>
                    </div>
                  </div>
                  <div>
                    <Label className="text-foreground/80 text-sm">Campaign Description</Label>
                    <textarea
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="Describe what you're looking for..."
                      rows={3}
                      className="mt-1 w-full bg-secondary/40 border border-border/50 focus:border-primary/60 rounded-md px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground outline-none resize-none focus:ring-1 focus:ring-primary/30"
                    />
                  </div>
                  {/* ASCI Disclosure toggle */}
                  <div className="flex items-start gap-3 p-3 rounded-xl bg-amber-400/5 border border-amber-400/20">
                    <ShieldAlert className="h-4 w-4 text-amber-400 shrink-0 mt-0.5" />
                    <div className="flex-1">
                      <div className="text-sm text-amber-400 font-medium">ASCI Disclosure Required</div>
                      <div className="text-xs text-muted-foreground mt-0.5">Creators must include #Ad or #Sponsored per ASCI guidelines.</div>
                    </div>
                    <input
                      type="checkbox"
                      checked={disclosureRequired}
                      onChange={(e) => setDisclosureRequired(e.target.checked)}
                      className="mt-1 accent-primary" />
                  </div>
                </div>
              )}

              {/* Step 1: Requirements */}
              {step === 1 && (
                <div className="space-y-3">
                  <p className="text-sm text-muted-foreground mb-2">What do you need from creators?</p>
                  {requirements.map((r, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <Input
                        value={r}
                        onChange={(e) => updateReq(i, e.target.value)}
                        placeholder={`Requirement ${i + 1}...`}
                        className="bg-secondary/40 border-border/50 focus:border-primary/60" />
                      {requirements.length > 1 && (
                        <button onClick={() => removeReq(i)} className="text-muted-foreground hover:text-destructive transition-colors shrink-0">
                          <Trash2 className="h-4 w-4" />
                        </button>
                      )}
                    </div>
                  ))}
                  <Button variant="outline" size="sm" onClick={addReq} className="gap-1.5 border-border/50 text-muted-foreground hover:text-foreground w-full">
                    <Plus className="h-3.5 w-3.5" /> Add Requirement
                  </Button>
                </div>
              )}

              {/* Step 2: Deliverables */}
              {step === 2 && (
                <div className="space-y-3">
                  <p className="text-sm text-muted-foreground mb-2">What content should creators produce?</p>
                  {deliverables.map((d, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <Input
                        value={d}
                        onChange={(e) => updateDel(i, e.target.value)}
                        placeholder={`Deliverable ${i + 1}...`}
                        className="bg-secondary/40 border-border/50 focus:border-primary/60" />
                      {deliverables.length > 1 && (
                        <button onClick={() => removeDel(i)} className="text-muted-foreground hover:text-destructive transition-colors shrink-0">
                          <Trash2 className="h-4 w-4" />
                        </button>
                      )}
                    </div>
                  ))}
                  <Button variant="outline" size="sm" onClick={addDel} className="gap-1.5 border-border/50 text-muted-foreground hover:text-foreground w-full">
                    <Plus className="h-3.5 w-3.5" /> Add Deliverable
                  </Button>
                </div>
              )}

              {/* Step 3: Review */}
              {step === 3 && (
                <div className="space-y-4">
                  <div className="p-4 rounded-xl bg-secondary/40 border border-border/40 space-y-2 text-sm">
                    <div className="flex justify-between"><span className="text-muted-foreground">Title</span><span className="text-foreground font-medium truncate max-w-[60%] text-right">{title}</span></div>
                    <div className="flex justify-between"><span className="text-muted-foreground">Budget</span><span className="text-gradient font-bold">{budget}</span></div>
                    <div className="flex justify-between"><span className="text-muted-foreground">Deadline</span><span className="text-foreground">{deadline}</span></div>
                    <div className="flex justify-between"><span className="text-muted-foreground">Category</span><span className="text-foreground">{category}</span></div>
                    <div className="flex justify-between"><span className="text-muted-foreground">Creators</span><span className="text-foreground">{creatorsNeeded}</span></div>
                    <div className="flex justify-between"><span className="text-muted-foreground">ASCI Required</span><span className={disclosureRequired ? "text-amber-400" : "text-muted-foreground"}>{disclosureRequired ? "Yes" : "No"}</span></div>
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground mb-1">Requirements ({requirements.filter(Boolean).length})</div>
                    <ul className="space-y-1">{requirements.filter(Boolean).map((r, i) => (
                      <li key={i} className="flex items-center gap-2 text-xs text-foreground/80"><CheckCircle2 className="h-3 w-3 text-primary shrink-0" />{r}</li>
                    ))}</ul>
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground mb-1">Deliverables ({deliverables.filter(Boolean).length})</div>
                    <ul className="space-y-1">{deliverables.filter(Boolean).map((d, i) => (
                      <li key={i} className="flex items-center gap-2 text-xs text-foreground/80"><CheckCircle2 className="h-3 w-3 text-cyan-400 shrink-0" />{d}</li>
                    ))}</ul>
                  </div>
                </div>
              )}

              {/* Navigation buttons */}
              <div className="flex justify-between mt-8">
                <Button variant="ghost" onClick={() => step > 0 ? setStep(step - 1) : handleClose()}
                  className="gap-1.5 text-muted-foreground hover:text-foreground">
                  <ChevronLeft className="h-4 w-4" /> {step > 0 ? "Back" : "Cancel"}
                </Button>
                {step < steps.length - 1 ? (
                  <Button
                    onClick={() => setStep(step + 1)}
                    disabled={!canNext()}
                    className="gradient-primary text-primary-foreground border-0 gap-1.5 shimmer disabled:opacity-40">
                    Next <ChevronRight className="h-4 w-4" />
                  </Button>
                ) : (
                  <Button onClick={handleSubmit} className="gradient-primary text-primary-foreground border-0 shimmer pulse-ring font-semibold">
                    🚀 Publish Campaign
                  </Button>
                )}
              </div>
            </>
          ) : (
            /* Success state */
            <motion.div
              className="text-center py-8"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}>
              <motion.div
                className="w-20 h-20 rounded-full gradient-primary flex items-center justify-center mx-auto mb-6 glow-cyan"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 0.5 }}>
                <CheckCircle2 className="h-10 w-10 text-primary-foreground" />
              </motion.div>
              <h3 className="text-2xl font-bold text-foreground mb-2">Campaign Published! 🎉</h3>
              <p className="text-muted-foreground text-sm mb-6">
                <strong className="text-foreground">{title}</strong> is now live. Creators can apply immediately.
              </p>
              <Button onClick={handleClose} className="gradient-primary text-primary-foreground border-0 shimmer font-semibold">
                Back to Dashboard
              </Button>
            </motion.div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
