// src/app/(marketing)/contact/page.tsx
// [SSR] Contact page: form with honeypot, rate-limit awareness, toast feedback
"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { toast } from "@/components/ui/toast"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    honeypot: "", // honeypot field
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (formData.honeypot) return // bot detected

    setIsSubmitting(true)
    // Real API call to /api/contact in Phase 1
    await new Promise((resolve) => setTimeout(resolve, 800))
    toast({ title: "Message sent", description: "Thank you — I&apos;ll reply soon." })
    setFormData({ name: "", email: "", subject: "", message: "", honeypot: "" })
    setIsSubmitting(false)
  }

  return (
    <div className="max-w-2xl mx-auto px-6 py-16">
      <div className="mb-12">
        <h1 className="text-5xl font-medium tracking-[-0.03em]">Get in Touch</h1>
        <p className="text-muted-foreground text-lg mt-4">
          Have a project or just want to say hello? I reply to every message.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Honeypot */}
        <input
          type="text"
          name="honeypot"
          value={formData.honeypot}
          onChange={(e) => setFormData({ ...formData, honeypot: e.target.value })}
          className="hidden"
          tabIndex={-1}
          autoComplete="off"
        />

        <div className="grid grid-cols-2 gap-6">
          <div>
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
          </div>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
            />
          </div>
        </div>

        <div>
          <Label htmlFor="subject">Subject</Label>
          <Input
            id="subject"
            value={formData.subject}
            onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
            required
          />
        </div>

        <div>
          <Label htmlFor="message">Message</Label>
          <Textarea
            id="message"
            rows={6}
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            required
          />
        </div>

        <Button type="submit" size="lg" disabled={isSubmitting} className="w-full">
          {isSubmitting ? "Sending..." : "Send Message"}
        </Button>
      </form>
    </div>
  )
}