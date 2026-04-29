// src/components/blog/CommentSection.tsx
"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { toast } from "@/components/ui/toast"

interface Comment {
  id: string
  author: string
  body: string
  createdAt: string
}

export function CommentSection({ postSlug }: { postSlug: string }) {
  const [comments, setComments] = useState<Comment[]>([])
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [body, setBody] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!body.trim()) return

    setIsSubmitting(true)
    // Optimistic update
    const optimisticComment: Comment = {
      id: `temp-${Date.now()}`,
      author: name || "Anonymous",
      body,
      createdAt: new Date().toISOString(),
    }
    setComments((prev) => [...prev, optimisticComment])

    // Simulate API call (replace with real server action later)
    await new Promise((resolve) => setTimeout(resolve, 800))

    toast({ title: "Comment submitted for moderation", variant: "success" })
    setBody("")
    setIsSubmitting(false)
  }

  return (
    <div className="mt-16">
      <h3 className="text-xl font-medium mb-6">Comments</h3>

      {/* Existing comments */}
      <div className="space-y-8 mb-12">
        {comments.map((comment) => (
          <div key={comment.id} className="bg-secondary/50 rounded-2xl p-6">
            <div className="flex justify-between text-xs text-muted-foreground mb-2">
              <span>{comment.author}</span>
              <time>{new Date(comment.createdAt).toLocaleDateString()}</time>
            </div>
            <p className="text-foreground">{comment.body}</p>
          </div>
        ))}
      </div>

      {/* Comment form */}
      <form onSubmit={handleSubmit} className="space-y-6">
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
          placeholder="Write your comment..."
          value={body}
          onChange={(e) => setBody(e.target.value)}
          rows={4}
        />
        <Button type="submit" disabled={isSubmitting} className="w-full">
          {isSubmitting ? "Posting..." : "Post Comment"}
        </Button>
      </form>
    </div>
  )
}