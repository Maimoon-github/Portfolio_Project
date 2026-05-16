'use client';

import { useState } from "react";
import { Send, CheckCircle } from "lucide-react";

type FormState = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

type Status = "idle" | "loading" | "success" | "error";

export function ContactForm() {
  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState<Partial<FormState>>({});
  const [status, setStatus] = useState<Status>("idle");
  const [honeypot, setHoneypot] = useState("");

  const validate = () => {
    const errs: Partial<FormState> = {};
    if (!form.name.trim()) errs.name = "Name is required";
    if (!form.email.trim()) errs.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = "Enter a valid email";
    if (!form.subject.trim()) errs.subject = "Subject is required";
    if (!form.message.trim()) errs.message = "Message is required";
    else if (form.message.trim().length < 20) errs.message = "Message must be at least 20 characters";
    return errs;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (honeypot) return;

    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

    setStatus("loading");
    // Simulate API call – replace with actual fetch
    setTimeout(() => {
      setStatus("success");
      setForm({ name: "", email: "", subject: "", message: "" });
    }, 1400);
  };

  const handleChange = (field: keyof FormState, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const inputStyle = (hasError: boolean) =>
    `w-full px-3 py-2.5 rounded-lg text-sm bg-[#0A110C] border ${
      hasError ? "border-red-500/50" : "border-[rgba(164,251,204,0.2)]"
    } text-white placeholder:text-[#B0C4B0] focus:outline-none focus:border-[rgba(164,251,204,0.4)] transition-colors`;

  if (status === "success") {
    return (
      <div className="p-6 rounded-xl bg-[#0F2C1A] border border-[rgba(164,251,204,0.12)] text-center py-16">
        <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 bg-[rgba(164,251,204,0.1)] border-2 border-[#A4FBCC]">
          <CheckCircle size={32} className="text-[#A4FBCC]" />
        </div>
        <h3 className="text-white text-lg font-bold mb-2">Message Sent!</h3>
        <p className="text-[#B0C4B0] max-w-xs mx-auto">
          Thanks for reaching out. I'll get back to you within 24 hours.
        </p>
        <button
          onClick={() => setStatus("idle")}
          className="mt-6 text-sm px-4 py-2 rounded-lg border border-[rgba(164,251,204,0.3)] text-[#A4FBCC] hover:bg-[rgba(164,251,204,0.08)] transition"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <div className="p-6 rounded-xl bg-[#0F2C1A] border border-[rgba(164,251,204,0.12)]">
      <form onSubmit={handleSubmit} className="flex flex-col gap-5" noValidate>
        {/* Honeypot */}
        <input
          type="text"
          name="website"
          value={honeypot}
          onChange={(e) => setHoneypot(e.target.value)}
          className="hidden"
          tabIndex={-1}
          autoComplete="off"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {/* Name */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm text-[#B0C4B0]">
              Name <span className="text-[#A4FBCC]">*</span>
            </label>
            <input
              type="text"
              value={form.name}
              onChange={(e) => handleChange("name", e.target.value)}
              placeholder="Alex Chen"
              className={inputStyle(!!errors.name)}
            />
            {errors.name && <p className="text-xs text-red-400">{errors.name}</p>}
          </div>

          {/* Email */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm text-[#B0C4B0]">
              Email <span className="text-[#A4FBCC]">*</span>
            </label>
            <input
              type="email"
              value={form.email}
              onChange={(e) => handleChange("email", e.target.value)}
              placeholder="you@company.com"
              className={inputStyle(!!errors.email)}
            />
            {errors.email && <p className="text-xs text-red-400">{errors.email}</p>}
          </div>
        </div>

        {/* Subject */}
        <div className="flex flex-col gap-1.5">
          <label className="text-sm text-[#B0C4B0]">
            Subject <span className="text-[#A4FBCC]">*</span>
          </label>
          <select
            value={form.subject}
            onChange={(e) => handleChange("subject", e.target.value)}
            className={inputStyle(!!errors.subject) + " appearance-none cursor-pointer"}
          >
            <option value="" className="bg-[#0A110C]">Select a topic...</option>
            <option value="Project Inquiry" className="bg-[#0A110C]">Project Inquiry</option>
            <option value="Consulting" className="bg-[#0A110C]">Consulting</option>
            <option value="Speaking / Workshop" className="bg-[#0A110C]">Speaking / Workshop</option>
            <option value="Job Opportunity" className="bg-[#0A110C]">Job Opportunity</option>
            <option value="General Question" className="bg-[#0A110C]">General Question</option>
            <option value="Other" className="bg-[#0A110C]">Other</option>
          </select>
          {errors.subject && <p className="text-xs text-red-400">{errors.subject}</p>}
        </div>

        {/* Message */}
        <div className="flex flex-col gap-1.5">
          <label className="text-sm text-[#B0C4B0]">
            Message <span className="text-[#A4FBCC]">*</span>
          </label>
          <textarea
            value={form.message}
            onChange={(e) => handleChange("message", e.target.value)}
            rows={5}
            placeholder="Tell me about your project, goals, and timeline..."
            className={inputStyle(!!errors.message) + " resize-y min-h-[120px]"}
          />
          <div className="flex justify-between">
            {errors.message ? (
              <p className="text-xs text-red-400">{errors.message}</p>
            ) : (
              <span />
            )}
            <p className="text-xs text-[#B0C4B0]">{form.message.length} chars</p>
          </div>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={status === "loading"}
          className="flex items-center justify-center gap-2 py-3 px-6 rounded-lg text-sm font-bold bg-[#A4FBCC] text-[#0A2E1A] hover:opacity-85 transition-all disabled:opacity-50 disabled:cursor-not-allowed mt-2"
        >
          {status === "loading" ? (
            <>
              <span className="w-4 h-4 border-2 border-[#0A2E1A] border-t-transparent rounded-full animate-spin" />
              Sending...
            </>
          ) : (
            <>
              <Send size={14} /> Send Message
            </>
          )}
        </button>
      </form>
    </div>
  );
}