"use client";

import { useState, type ReactElement } from "react";
import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { StarInput } from "@/components/stars";
import { housing } from "@/data/housing";
import { categoryLabels, type CategoryRatings } from "@/data/reviews";
import { addReview } from "@/lib/reviews-store";
import { cn } from "@/lib/utils";

const years = ["Incoming student", "Freshman", "Sophomore", "Junior", "Senior", "Grad student", "Alum"];
const emptyRatings: CategoryRatings = { cleanliness: 0, location: 0, value: 0, management: 0, quiet: 0 };
const housingItems = housing.map((h) => ({ value: h.slug, label: h.name }));
const yearItems = years.map((y) => ({ value: y, label: y }));

export function ReviewFormDialog({ housingSlug, trigger }: { housingSlug?: string; trigger: ReactElement }) {
  const [open, setOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [slug, setSlug] = useState(housingSlug ?? "");
  const [overall, setOverall] = useState(0);
  const [ratings, setRatings] = useState<CategoryRatings>(emptyRatings);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [name, setName] = useState("");
  const [year, setYear] = useState("");
  const [major, setMajor] = useState("");
  const [recommend, setRecommend] = useState<boolean | null>(null);
  const [errors, setErrors] = useState<string[]>([]);

  function reset() {
    setSubmitted(false);
    setSlug(housingSlug ?? "");
    setOverall(0);
    setRatings(emptyRatings);
    setTitle("");
    setBody("");
    setName("");
    setYear("");
    setMajor("");
    setRecommend(null);
    setErrors([]);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const problems: string[] = [];
    if (!slug) problems.push("Pick the place you're reviewing.");
    if (!overall) problems.push("Give an overall rating.");
    if (Object.values(ratings).some((v) => v === 0)) problems.push("Rate every category.");
    if (title.trim().length < 4) problems.push("Add a short headline.");
    if (body.trim().length < 30) problems.push("Write at least 30 characters so your review is useful.");
    if (recommend === null) problems.push("Tell us whether you'd recommend it.");
    setErrors(problems);
    if (problems.length) return;

    addReview({
      id: crypto.randomUUID(),
      housingSlug: slug,
      author: name.trim() || "Anonymous",
      year: [year || "Student", major.trim()].filter(Boolean).join(" · "),
      date: new Date().toISOString().slice(0, 10),
      overall,
      ratings,
      title: title.trim(),
      body: body.trim(),
      wouldRecommend: recommend!,
      helpful: 0,
    });
    setSubmitted(true);
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(next) => {
        setOpen(next);
        if (!next) setTimeout(reset, 200);
      }}
    >
      <DialogTrigger render={trigger} />
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-xl">
        {submitted ? (
          <div className="flex flex-col items-center gap-3 py-8 text-center">
            <CheckCircle2 className="size-12 text-emerald-600" />
            <DialogTitle className="text-xl">Thanks for your review!</DialogTitle>
            <DialogDescription>
              Your review is live and helps other Owls find their next home.
            </DialogDescription>
            <Button className="mt-2" onClick={() => setOpen(false)}>
              Done
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            <DialogHeader>
              <DialogTitle className="text-xl">Write a review</DialogTitle>
              <DialogDescription>Be honest and specific. Your review can be anonymous.</DialogDescription>
            </DialogHeader>

            {!housingSlug && (
              <div className="space-y-2">
                <Label>Where did you live?</Label>
                <Select items={housingItems} value={slug || null} onValueChange={(v) => setSlug(v ?? "")}>
                  <SelectTrigger className="h-10 w-full">
                    <SelectValue placeholder="Choose a residence hall or apartment" />
                  </SelectTrigger>
                  <SelectContent>
                    {housingItems.map((h) => (
                      <SelectItem key={h.value} value={h.value}>
                        {h.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}

            <div className="space-y-2">
              <Label>Overall rating</Label>
              <StarInput label="Overall rating" value={overall} onChange={setOverall} />
            </div>

            <div className="grid gap-3 rounded-xl bg-muted/60 p-4 sm:grid-cols-2">
              {(Object.keys(categoryLabels) as (keyof CategoryRatings)[]).map((key) => (
                <div key={key} className="space-y-1">
                  <span className="text-sm font-medium">{categoryLabels[key]}</span>
                  <StarInput
                    size="sm"
                    label={categoryLabels[key]}
                    value={ratings[key]}
                    onChange={(v) => setRatings((r) => ({ ...r, [key]: v }))}
                  />
                </div>
              ))}
            </div>

            <div className="space-y-2">
              <Label htmlFor="review-title">Headline</Label>
              <Input
                id="review-title"
                className="h-10"
                placeholder="e.g. Great location, tiny rooms"
                value={title}
                maxLength={80}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="review-body">Your review</Label>
              <Textarea
                id="review-body"
                rows={5}
                placeholder="What was it like? Think about noise, maintenance, roommates, safety, and anything you wish you'd known."
                value={body}
                onChange={(e) => setBody(e.target.value)}
              />
              <p className="text-right text-xs text-muted-foreground">{body.trim().length} / 30 min characters</p>
            </div>

            <div className="space-y-2">
              <Label>Would you recommend it?</Label>
              <div className="grid grid-cols-2 gap-2">
                {[true, false].map((val) => (
                  <button
                    key={String(val)}
                    type="button"
                    onClick={() => setRecommend(val)}
                    className={cn(
                      "rounded-lg border px-3 py-2 text-sm font-medium transition-colors",
                      recommend === val ? "border-primary bg-accent text-accent-foreground" : "hover:bg-muted",
                    )}
                  >
                    {val ? "Yes" : "No"}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-3">
              <div className="space-y-2">
                <Label htmlFor="review-name">Name (optional)</Label>
                <Input
                  id="review-name"
                  className="h-10"
                  placeholder="Anonymous"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label>Year</Label>
                <Select items={yearItems} value={year || null} onValueChange={(v) => setYear(v ?? "")}>
                  <SelectTrigger className="h-10 w-full">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    {yearItems.map((y) => (
                      <SelectItem key={y.value} value={y.value}>
                        {y.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="review-major">Major (optional)</Label>
                <Input
                  id="review-major"
                  className="h-10"
                  placeholder="e.g. Nursing"
                  value={major}
                  onChange={(e) => setMajor(e.target.value)}
                />
              </div>
            </div>

            {errors.length > 0 && (
              <ul className="space-y-1 rounded-lg border border-destructive/30 bg-destructive/5 p-3 text-sm text-destructive">
                {errors.map((err) => (
                  <li key={err}>• {err}</li>
                ))}
              </ul>
            )}

            <Button type="submit" size="lg" className="h-11 w-full text-base">
              Post review
            </Button>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
