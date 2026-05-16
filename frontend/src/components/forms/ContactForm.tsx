// 'use client';

// import { useState } from "react";
// import { Send, CheckCircle } from "lucide-react";

// type FormState = {
//   name: string;
//   email: string;
//   subject: string;
//   message: string;
// };

// type Status = "idle" | "loading" | "success" | "error";

// export function ContactForm() {
//   const [form, setForm] = useState<FormState>({
//     name: "",
//     email: "",
//     subject: "",
//     message: "",
//   });
//   const [errors, setErrors] = useState<Partial<FormState>>({});
//   const [status, setStatus] = useState<Status>("idle");
//   const [honeypot, setHoneypot] = useState("");

//   const validate = () => {
//     const errs: Partial<FormState> = {};
//     if (!form.name.trim()) errs.name = "Name is required";
//     if (!form.email.trim()) errs.email = "Email is required";
//     else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = "Enter a valid email";
//     if (!form.subject.trim()) errs.subject = "Subject is required";
//     if (!form.message.trim()) errs.message = "Message is required";
//     else if (form.message.trim().length < 20) errs.message = "Message must be at least 20 characters";
//     return errs;
//   };

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     if (honeypot) return;

//     const errs = validate();
//     if (Object.keys(errs).length > 0) {
//       setErrors(errs);
//       return;
//     }

//     setStatus("loading");
//     setTimeout(() => {
//       setStatus("success");
//       setForm({ name: "", email: "", subject: "", message: "" });
//     }, 1400);
//   };

//   const handleChange = (field: keyof FormState, value: string) => {
//     setForm((prev) => ({ ...prev, [field]: value }));
//     if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
//   };

//   if (status === "success") {
//     return (
//       <div className="glass-card p-6 text-center py-16">
//         <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 bg-accent/10 border-2 border-accent">
//           <CheckCircle size={32} className="text-accent" />
//         </div>
//         <h3 className="text-on-background text-lg font-bold mb-2">Message Sent!</h3>
//         <p className="text-outline max-w-xs mx-auto">
//           Thanks for reaching out. I'll get back to you within 24 hours.
//         </p>
//         <button
//           onClick={() => setStatus("idle")}
//           className="mt-6 text-sm px-4 py-2 rounded-lg glass-btn"
//         >
//           Send another message
//         </button>
//       </div>
//     );
//   }

//   return (
//     <div className="glass-card p-6">
//       <form onSubmit={handleSubmit} className="flex flex-col gap-5" noValidate>
//         <input
//           type="text"
//           name="website"
//           value={honeypot}
//           onChange={(e) => setHoneypot(e.target.value)}
//           className="hidden"
//           tabIndex={-1}
//           autoComplete="off"
//         />

//         <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
//           <div className="flex flex-col gap-1.5">
//             <label className="text-sm text-outline">Name <span className="text-accent">*</span></label>
//             <input
//               type="text"
//               value={form.name}
//               onChange={(e) => handleChange("name", e.target.value)}
//               placeholder="Alex Chen"
//               className={`w-full px-3 py-2.5 rounded-lg text-sm bg-background border ${errors.name ? 'border-error' : 'border-glass-border'} text-on-background placeholder:text-outline focus:outline-none focus:border-accent transition-colors`}
//             />
//             {errors.name && <p className="text-xs text-error">{errors.name}</p>}
//           </div>

//           <div className="flex flex-col gap-1.5">
//             <label className="text-sm text-outline">Email <span className="text-accent">*</span></label>
//             <input
//               type="email"
//               value={form.email}
//               onChange={(e) => handleChange("email", e.target.value)}
//               placeholder="you@company.com"
//               className={`w-full px-3 py-2.5 rounded-lg text-sm bg-background border ${errors.email ? 'border-error' : 'border-glass-border'} text-on-background placeholder:text-outline focus:outline-none focus:border-accent transition-colors`}
//             />
//             {errors.email && <p className="text-xs text-error">{errors.email}</p>}
//           </div>
//         </div>

//         <div className="flex flex-col gap-1.5">
//           <label className="text-sm text-outline">Subject <span className="text-accent">*</span></label>
//           <select
//             value={form.subject}
//             onChange={(e) => handleChange("subject", e.target.value)}
//             className={`w-full px-3 py-2.5 rounded-lg text-sm bg-background border ${errors.subject ? 'border-error' : 'border-glass-border'} text-on-background focus:outline-none focus:border-accent appearance-none cursor-pointer`}
//           >
//             <option value="">Select a topic...</option>
//             <option value="Project Inquiry">Project Inquiry</option>
//             <option value="Consulting">Consulting</option>
//             <option value="Speaking / Workshop">Speaking / Workshop</option>
//             <option value="Job Opportunity">Job Opportunity</option>
//             <option value="General Question">General Question</option>
//             <option value="Other">Other</option>
//           </select>
//           {errors.subject && <p className="text-xs text-error">{errors.subject}</p>}
//         </div>

//         <div className="flex flex-col gap-1.5">
//           <label className="text-sm text-outline">Message <span className="text-accent">*</span></label>
//           <textarea
//             value={form.message}
//             onChange={(e) => handleChange("message", e.target.value)}
//             rows={5}
//             placeholder="Tell me about your project, goals, and timeline..."
//             className={`w-full px-3 py-2.5 rounded-lg text-sm bg-background border ${errors.message ? 'border-error' : 'border-glass-border'} text-on-background placeholder:text-outline focus:outline-none focus:border-accent resize-y min-h-[120px]`}
//           />
//           <div className="flex justify-between">
//             {errors.message ? <p className="text-xs text-error">{errors.message}</p> : <span />}
//             <p className="text-xs text-outline">{form.message.length} chars</p>
//           </div>
//         </div>

//         <button
//           type="submit"
//           disabled={status === "loading"}
//           className="glass-btn bg-accent text-on-accent font-bold mt-2 disabled:opacity-50 disabled:cursor-not-allowed"
//         >
//           {status === "loading" ? (
//             <>
//               <span className="w-4 h-4 border-2 border-on-accent border-t-transparent rounded-full animate-spin inline-block mr-2" />
//               Sending...
//             </>
//           ) : (
//             <>
//               <Send size={14} className="inline mr-2" /> Send Message
//             </>
//           )}
//         </button>
//       </form>
//     </div>
//   );
// }





























































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
    setTimeout(() => {
      setStatus("success");
      setForm({ name: "", email: "", subject: "", message: "" });
    }, 1400);
  };

  const handleChange = (field: keyof FormState, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  if (status === "success") {
    return (
      <div className="glass-card p-6 text-center py-16">
        <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 bg-[var(--color-accent)]/10 border-2 border-[var(--color-accent)]">
          <CheckCircle size={32} className="text-[var(--color-accent)]" />
        </div>
        <h3 className="text-[var(--color-on-background)] text-lg font-bold mb-2">Message Sent!</h3>
        <p className="text-[var(--color-outline)] max-w-xs mx-auto">
          Thanks for reaching out. I'll get back to you within 24 hours.
        </p>
        <button
          onClick={() => setStatus("idle")}
          className="mt-6 text-sm px-4 py-2 rounded-lg glass-btn"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <div className="glass-card p-6">
      <form onSubmit={handleSubmit} className="flex flex-col gap-5" noValidate>
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
          <div className="flex flex-col gap-1.5">
            <label className="text-sm text-[var(--color-outline)]">Name <span className="text-[var(--color-accent)]">*</span></label>
            <input
              type="text"
              value={form.name}
              onChange={(e) => handleChange("name", e.target.value)}
              placeholder="Alex Chen"
              className={`w-full px-3 py-2.5 rounded-lg text-sm bg-[var(--color-background)] border ${errors.name ? 'border-[var(--color-error)]' : 'border-[var(--color-glass-border)]'} text-[var(--color-on-background)] placeholder:text-[var(--color-outline)] focus:outline-none focus:border-[var(--color-accent)] transition-colors`}
            />
            {errors.name && <p className="text-xs text-[var(--color-error)]">{errors.name}</p>}
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-sm text-[var(--color-outline)]">Email <span className="text-[var(--color-accent)]">*</span></label>
            <input
              type="email"
              value={form.email}
              onChange={(e) => handleChange("email", e.target.value)}
              placeholder="you@company.com"
              className={`w-full px-3 py-2.5 rounded-lg text-sm bg-[var(--color-background)] border ${errors.email ? 'border-[var(--color-error)]' : 'border-[var(--color-glass-border)]'} text-[var(--color-on-background)] placeholder:text-[var(--color-outline)] focus:outline-none focus:border-[var(--color-accent)] transition-colors`}
            />
            {errors.email && <p className="text-xs text-[var(--color-error)]">{errors.email}</p>}
          </div>
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-sm text-[var(--color-outline)]">Subject <span className="text-[var(--color-accent)]">*</span></label>
          <select
            value={form.subject}
            onChange={(e) => handleChange("subject", e.target.value)}
            className={`w-full px-3 py-2.5 rounded-lg text-sm bg-[var(--color-background)] border ${errors.subject ? 'border-[var(--color-error)]' : 'border-[var(--color-glass-border)]'} text-[var(--color-on-background)] focus:outline-none focus:border-[var(--color-accent)] appearance-none cursor-pointer`}
          >
            <option value="">Select a topic...</option>
            <option value="Project Inquiry">Project Inquiry</option>
            <option value="Consulting">Consulting</option>
            <option value="Speaking / Workshop">Speaking / Workshop</option>
            <option value="Job Opportunity">Job Opportunity</option>
            <option value="General Question">General Question</option>
            <option value="Other">Other</option>
          </select>
          {errors.subject && <p className="text-xs text-[var(--color-error)]">{errors.subject}</p>}
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-sm text-[var(--color-outline)]">Message <span className="text-[var(--color-accent)]">*</span></label>
          <textarea
            value={form.message}
            onChange={(e) => handleChange("message", e.target.value)}
            rows={5}
            placeholder="Tell me about your project, goals, and timeline..."
            className={`w-full px-3 py-2.5 rounded-lg text-sm bg-[var(--color-background)] border ${errors.message ? 'border-[var(--color-error)]' : 'border-[var(--color-glass-border)]'} text-[var(--color-on-background)] placeholder:text-[var(--color-outline)] focus:outline-none focus:border-[var(--color-accent)] resize-y min-h-[120px]`}
          />
          <div className="flex justify-between">
            {errors.message ? <p className="text-xs text-[var(--color-error)]">{errors.message}</p> : <span />}
            <p className="text-xs text-[var(--color-outline)]">{form.message.length} chars</p>
          </div>
        </div>

        <button
          type="submit"
          disabled={status === "loading"}
          className="glass-btn bg-[var(--color-accent)] text-[var(--color-on-accent)] font-bold mt-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {status === "loading" ? (
            <>
              <span className="w-4 h-4 border-2 border-[var(--color-on-accent)] border-t-transparent rounded-full animate-spin inline-block mr-2" />
              Sending...
            </>
          ) : (
            <>
              <Send size={14} className="inline mr-2" /> Send Message
            </>
          )}
        </button>
      </form>
    </div>
  );
}