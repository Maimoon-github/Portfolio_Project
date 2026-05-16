"use client"

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/toast";

interface Comment {
  id: string;
  author: string;
  body: string;
  createdAt: string;
}

export function CommentSection() {
  const [comments, setComments] = useState<Comment[]>([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [body, setBody] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!body.trim()) return;

    setIsSubmitting(true);

    const optimisticComment: Comment = {
      id: `temp-${Date.now()}`,
      author: name || "Anonymous",
      body,
      createdAt: new Date().toISOString(),
    };

    setComments((prev) => [...prev, optimisticComment]);

    await new Promise((resolve) => setTimeout(resolve, 800));

    toast({ title: "Comment submitted for moderation", variant: "success" });

    setBody("");
    setName("");
    setEmail("");
    setIsSubmitting(false);
  };

  return (
    <div className="section">
      <h2 className="headline-lg mb-8">Comments</h2>

      <div className="space-y-8 mb-12">
        {comments.map((comment) => (
          <div key={comment.id} className="tonal-shift rounded-3xl p-8">
            <div className="flex justify-between items-baseline mb-4">
              <span className="font-medium text-on-surface">{comment.author}</span>
              <time className="label-md text-secondary">{new Date(comment.createdAt).toLocaleDateString()}</time>
            </div>
            <p className="text-on-surface-variant leading-relaxed">{comment.body}</p>
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="glass rounded-3xl p-8 space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <Input
            placeholder="Your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Input
            type="email"
            placeholder="Email (private)"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <Textarea
          placeholder="Share your thoughts..."
          value={body}
          onChange={(e) => setBody(e.target.value)}
          rows={5}
          className="input"
        />
        <Button type="submit" disabled={isSubmitting} className="btn-primary w-full py-7 text-lg">
          {isSubmitting ? "Posting..." : "Post Comment"}
        </Button>
      </form>
    </div>
  );
}