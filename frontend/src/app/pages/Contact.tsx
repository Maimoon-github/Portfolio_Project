import { useState } from "react";
import { Mail, Github, Linkedin, Twitter, Send, CheckCircle, MapPin, Clock } from "lucide-react";
import { PROFILE } from "../data";

type FormState = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

type Status = "idle" | "loading" | "success" | "error";

export function Contact() {
  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState<Partial<FormState>>({});
  const [status, setStatus] = useState<Status>("idle");

  // Honeypot
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
    if (honeypot) return; // bot trap

    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

    setStatus("loading");
    // Simulate form submission
    setTimeout(() => {
      setStatus("success");
      setForm({ name: "", email: "", subject: "", message: "" });
    }, 1400);
  };

  const handleChange = (field: keyof FormState, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const inputStyle = (hasError: boolean) => ({
    background: "rgba(8, 26, 4, 0.8)",
    border: `1px solid ${hasError ? "rgba(239, 68, 68, 0.5)" : "rgba(164, 251, 204, 0.2)"}`,
    color: "#F2F2F2",
    borderRadius: "8px",
    padding: "10px 14px",
    fontSize: "0.875rem",
    outline: "none",
    width: "100%",
    transition: "border-color 0.2s",
  });

  return (
    <div className="min-h-screen pt-24 pb-20" style={{ background: "#081A04" }}>
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="mb-12">
          <span
            className="text-xs uppercase tracking-widest"
            style={{ color: "#A4FBCC", fontFamily: "'Space Mono', monospace" }}
          >
            Collaboration
          </span>
          <h1
            className="mt-2 mb-3"
            style={{ color: "#F2F2F2", fontSize: "clamp(1.8rem, 4vw, 3rem)", fontWeight: 700 }}
          >
            Get in Touch
          </h1>
          <p style={{ color: "#9199A5", maxWidth: "500px" }}>
            Whether it's a project inquiry, consulting engagement, or just saying hello — my inbox is open.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
          {/* Contact Info */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            {/* Info cards */}
            {[
              {
                icon: <Mail size={18} style={{ color: "#A4FBCC" }} />,
                label: "Email",
                value: PROFILE.email,
                href: `mailto:${PROFILE.email}`,
              },
              {
                icon: <MapPin size={18} style={{ color: "#A4FBCC" }} />,
                label: "Location",
                value: PROFILE.location,
                href: null,
              },
              {
                icon: <Clock size={18} style={{ color: "#A4FBCC" }} />,
                label: "Response Time",
                value: "Usually within 24 hours",
                href: null,
              },
            ].map((item) => (
              <div
                key={item.label}
                className="flex items-center gap-4 p-4 rounded-xl"
                style={{ background: "#1B3022", border: "1px solid rgba(164, 251, 204, 0.1)" }}
              >
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ background: "rgba(164, 251, 204, 0.08)", border: "1px solid rgba(164, 251, 204, 0.15)" }}
                >
                  {item.icon}
                </div>
                <div>
                  <p className="text-xs mb-0.5" style={{ color: "#9199A5" }}>{item.label}</p>
                  {item.href ? (
                    <a
                      href={item.href}
                      className="text-sm transition-colors duration-200"
                      style={{ color: "#F2F2F2", textDecoration: "none" }}
                      onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "#A4FBCC")}
                      onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "#F2F2F2")}
                    >
                      {item.value}
                    </a>
                  ) : (
                    <p className="text-sm" style={{ color: "#F2F2F2" }}>{item.value}</p>
                  )}
                </div>
              </div>
            ))}

            {/* Social Links */}
            <div
              className="p-5 rounded-xl"
              style={{ background: "#1B3022", border: "1px solid rgba(164, 251, 204, 0.1)" }}
            >
              <p className="text-xs mb-4 uppercase tracking-widest" style={{ color: "#9199A5", fontFamily: "'Space Mono', monospace" }}>
                Elsewhere
              </p>
              <div className="flex flex-col gap-3">
                {[
                  { icon: <Github size={16} />, label: "GitHub", href: PROFILE.github, handle: "@jordanmercer" },
                  { icon: <Linkedin size={16} />, label: "LinkedIn", href: PROFILE.linkedin, handle: "in/jordanmercer" },
                  { icon: <Twitter size={16} />, label: "Twitter / X", href: PROFILE.twitter, handle: "@jmercer_ai" },
                ].map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 group transition-colors duration-200"
                    style={{ textDecoration: "none" }}
                  >
                    <span style={{ color: "#9199A5" }} className="group-hover:text-[#A4FBCC] transition-colors">
                      {social.icon}
                    </span>
                    <div>
                      <p className="text-xs" style={{ color: "#9199A5" }}>{social.label}</p>
                      <p className="text-sm" style={{ color: "#F2F2F2" }}>{social.handle}</p>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            {/* Availability note */}
            <div
              className="p-4 rounded-xl flex items-center gap-3"
              style={{ background: "rgba(164, 251, 204, 0.05)", border: "1px solid rgba(164, 251, 204, 0.15)" }}
            >
              <span
                className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                style={{ background: "#A4FBCC", boxShadow: "0 0 8px #A4FBCC" }}
              />
              <p className="text-sm" style={{ color: "#A4FBCC" }}>
                Available for new projects starting Q2 2025
              </p>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-3">
            <div
              className="p-6 rounded-xl"
              style={{ background: "#1B3022", border: "1px solid rgba(164, 251, 204, 0.1)" }}
            >
              {status === "success" ? (
                <div className="flex flex-col items-center justify-center py-16 text-center gap-4">
                  <div
                    className="w-16 h-16 rounded-full flex items-center justify-center"
                    style={{ background: "rgba(164, 251, 204, 0.1)", border: "2px solid #A4FBCC" }}
                  >
                    <CheckCircle size={32} style={{ color: "#A4FBCC" }} />
                  </div>
                  <h3 style={{ color: "#F2F2F2", fontSize: "1.1rem", fontWeight: 700 }}>Message Sent!</h3>
                  <p style={{ color: "#9199A5", maxWidth: "300px" }}>
                    Thanks for reaching out. I'll get back to you within 24 hours.
                  </p>
                  <button
                    onClick={() => setStatus("idle")}
                    className="mt-2 text-sm px-4 py-2 rounded-lg transition-all duration-200"
                    style={{
                      border: "1px solid rgba(164, 251, 204, 0.3)",
                      color: "#A4FBCC",
                      background: "transparent",
                      cursor: "pointer",
                    }}
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-5" noValidate>
                  {/* Honeypot – hidden */}
                  <input
                    type="text"
                    name="website"
                    value={honeypot}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setHoneypot(e.target.value)}
                    className="hidden"
                    tabIndex={-1}
                    autoComplete="off"
                  />

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {/* Name */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-sm" style={{ color: "#9199A5" }}>
                        Name <span style={{ color: "#A4FBCC" }}>*</span>
                      </label>
                      <input
                        type="text"
                        value={form.name}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange("name", e.target.value)}
                        placeholder="Alex Chen"
                        style={inputStyle(!!errors.name)}
                        onFocus={(e) => {
                          if (!errors.name) (e.currentTarget as HTMLElement).style.borderColor = "rgba(164, 251, 204, 0.4)";
                        }}
                        onBlur={(e) => {
                          if (!errors.name) (e.currentTarget as HTMLElement).style.borderColor = "rgba(164, 251, 204, 0.2)";
                        }}
                      />
                      {errors.name && <p className="text-xs" style={{ color: "#EF4444" }}>{errors.name}</p>}
                    </div>

                    {/* Email */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-sm" style={{ color: "#9199A5" }}>
                        Email <span style={{ color: "#A4FBCC" }}>*</span>
                      </label>
                      <input
                        type="email"
                        value={form.email}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange("email", e.target.value)}
                        placeholder="you@company.com"
                        style={inputStyle(!!errors.email)}
                        onFocus={(e) => {
                          if (!errors.email) (e.currentTarget as HTMLElement).style.borderColor = "rgba(164, 251, 204, 0.4)";
                        }}
                        onBlur={(e) => {
                          if (!errors.email) (e.currentTarget as HTMLElement).style.borderColor = "rgba(164, 251, 204, 0.2)";
                        }}
                      />
                      {errors.email && <p className="text-xs" style={{ color: "#EF4444" }}>{errors.email}</p>}
                    </div>
                  </div>

                  {/* Subject */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-sm" style={{ color: "#9199A5" }}>
                      Subject <span style={{ color: "#A4FBCC" }}>*</span>
                    </label>
                    <select
                      value={form.subject}
                      onChange={(e) => handleChange("subject", e.target.value)}
                      style={{
                        ...inputStyle(!!errors.subject),
                        appearance: "none",
                        cursor: "pointer",
                      }}
                    >
                      <option value="" style={{ background: "#081A04" }}>Select a topic...</option>
                      <option value="Project Inquiry" style={{ background: "#081A04" }}>Project Inquiry</option>
                      <option value="Consulting" style={{ background: "#081A04" }}>Consulting</option>
                      <option value="Speaking / Workshop" style={{ background: "#081A04" }}>Speaking / Workshop</option>
                      <option value="Job Opportunity" style={{ background: "#081A04" }}>Job Opportunity</option>
                      <option value="General Question" style={{ background: "#081A04" }}>General Question</option>
                      <option value="Other" style={{ background: "#081A04" }}>Other</option>
                    </select>
                    {errors.subject && <p className="text-xs" style={{ color: "#EF4444" }}>{errors.subject}</p>}
                  </div>

                  {/* Message */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-sm" style={{ color: "#9199A5" }}>
                      Message <span style={{ color: "#A4FBCC" }}>*</span>
                    </label>
                    <textarea
                      value={form.message}
                      onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => handleChange("message", e.target.value)}
                      rows={5}
                      placeholder="Tell me about your project, goals, and timeline..."
                      style={{
                        ...inputStyle(!!errors.message),
                        resize: "vertical",
                        minHeight: "120px",
                      }}
                      onFocus={(e) => {
                        if (!errors.message) (e.currentTarget as HTMLElement).style.borderColor = "rgba(164, 251, 204, 0.4)";
                      }}
                      onBlur={(e) => {
                        if (!errors.message) (e.currentTarget as HTMLElement).style.borderColor = "rgba(164, 251, 204, 0.2)";
                      }}
                    />
                    <div className="flex justify-between">
                      {errors.message ? (
                        <p className="text-xs" style={{ color: "#EF4444" }}>{errors.message}</p>
                      ) : (
                        <span />
                      )}
                      <p className="text-xs" style={{ color: "#9199A5" }}>
                        {form.message.length} chars
                      </p>
                    </div>
                  </div>

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className="flex items-center justify-center gap-2 py-3 px-6 rounded-lg text-sm transition-all duration-200 mt-2"
                    style={{
                      background: status === "loading" ? "rgba(164, 251, 204, 0.5)" : "#A4FBCC",
                      color: "#081A04",
                      fontWeight: 700,
                      cursor: status === "loading" ? "not-allowed" : "pointer",
                      border: "none",
                    }}
                  >
                    {status === "loading" ? (
                      <>
                        <span
                          className="w-4 h-4 border-2 border-t-transparent rounded-full"
                          style={{ borderColor: "#081A04", borderTopColor: "transparent", animation: "spin 0.8s linear infinite" }}
                        />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send size={14} /> Send Message
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
