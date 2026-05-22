'use client'

import { useState } from "react";

interface FormState {
  firstName: string;
  lastName: string;
  email: string;
  company: string;
  teamSize: string;
  enquiryType: string;
  message: string;
  agreed: boolean;
}
 
export default function ContactForm() {
  const [form, setForm] = useState<FormState>({
    firstName: "", lastName: "", email: "", company: "",
    teamSize: "", enquiryType: "", message: "", agreed: false,
  });
  const [submitted, setSubmitted] = useState(false);
 
  const inputClass =
    "bg-[#131629] border border-white/[0.07] rounded-xl px-3.5 py-2.5 text-sm text-white font-sans outline-none transition-colors focus:border-violet-500/50 placeholder:text-[#8B89A8]/60 w-full";
 
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));
  };
 
  const handleSubmit = () => {
    if (!form.email || !form.message || !form.agreed) return;
    setSubmitted(true);
  };
 
  if (submitted) {
    return (
      <div className="bg-[#0d0f1e] border border-white/[0.07] rounded-2xl p-8 flex flex-col items-center justify-center text-center min-h-[400px]">
        <div className="text-5xl mb-5">🚀</div>
        <h3 className="font-bold text-white text-xl mb-2">Message sent!</h3>
        <p className="text-sm text-[#8B89A8] max-w-xs leading-relaxed mb-6">
          Thanks for reaching out. We typically reply within one business day. Keep an eye on your inbox.
        </p>
        <button
          onClick={() => setSubmitted(false)}
          className="px-6 py-2.5 bg-transparent border border-white/[0.07] hover:border-white/20 text-white rounded-xl text-sm font-medium transition-all cursor-pointer"
        >
          Send another message
        </button>
      </div>
    );
  }
 
  return (
    <div className="bg-[#0d0f1e] border border-white/[0.07] rounded-2xl p-8">
      <h3 className="font-bold text-white text-[1.1rem] mb-1.5">Send us a message</h3>
      <p className="text-[0.82rem] text-[#8B89A8] mb-7">
        Fill in the form and we&apos;ll get back to you within 24 hours.
      </p>
 
      {/* Name row */}
      <div className="grid grid-cols-2 gap-3.5 mb-3.5">
        <div className="flex flex-col gap-1.5">
          <label className="text-[0.72rem] text-[#8B89A8] tracking-wide">FIRST NAME</label>
          <input name="firstName" value={form.firstName} onChange={handleChange} placeholder="Rayan" className={inputClass} />
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-[0.72rem] text-[#8B89A8] tracking-wide">LAST NAME</label>
          <input name="lastName" value={form.lastName} onChange={handleChange} placeholder="Malik" className={inputClass} />
        </div>
      </div>
 
      {/* Email */}
      <div className="flex flex-col gap-1.5 mb-3.5">
        <label className="text-[0.72rem] text-[#8B89A8] tracking-wide">WORK EMAIL</label>
        <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="rayan@yourcompany.com" className={inputClass} />
      </div>
 
      {/* Company */}
      <div className="flex flex-col gap-1.5 mb-3.5">
        <label className="text-[0.72rem] text-[#8B89A8] tracking-wide">COMPANY NAME</label>
        <input name="company" value={form.company} onChange={handleChange} placeholder="Pixelcraft Agency" className={inputClass} />
      </div>
 
      {/* Team size + enquiry type */}
      <div className="grid grid-cols-2 gap-3.5 mb-3.5">
        <div className="flex flex-col gap-1.5">
          <label className="text-[0.72rem] text-[#8B89A8] tracking-wide">TEAM SIZE</label>
          <select name="teamSize" value={form.teamSize} onChange={handleChange} className={`${inputClass} appearance-none cursor-pointer`}>
            <option value="" disabled>Select size...</option>
            {["Just me", "2–5 people", "6–15 people", "16–50 people", "50+ people"].map((o) => (
              <option key={o} value={o} className="bg-[#131629]">{o}</option>
            ))}
          </select>
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-[0.72rem] text-[#8B89A8] tracking-wide">ENQUIRY TYPE</label>
          <select name="enquiryType" value={form.enquiryType} onChange={handleChange} className={`${inputClass} appearance-none cursor-pointer`}>
            <option value="" disabled>What can we help with?</option>
            {["General question", "Sales / pricing", "Technical support", "Partnership", "Press / media", "Feature request"].map((o) => (
              <option key={o} value={o} className="bg-[#131629]">{o}</option>
            ))}
          </select>
        </div>
      </div>
 
      {/* Message */}
      <div className="flex flex-col gap-1.5 mb-5">
        <label className="text-[0.72rem] text-[#8B89A8] tracking-wide">MESSAGE</label>
        <textarea
          name="message"
          value={form.message}
          onChange={handleChange}
          placeholder="Tell us what's on your mind — the more detail, the faster we can help."
          rows={4}
          className={`${inputClass} resize-none leading-relaxed`}
        />
      </div>
 
      {/* Privacy checkbox */}
      <div className="flex items-start gap-2.5 mb-5">
        <input
          type="checkbox"
          id="privacy"
          name="agreed"
          checked={form.agreed}
          onChange={handleChange}
          className="w-4 h-4 mt-0.5 accent-violet-500 cursor-pointer flex-shrink-0"
        />
        <label htmlFor="privacy" className="text-[0.78rem] text-[#8B89A8] leading-relaxed cursor-pointer">
          I agree to the{" "}
          <a href="#" className="text-violet-400 hover:underline">Privacy Policy</a>{" "}
          and consent to OrbitOps storing my message to respond to my enquiry.
        </label>
      </div>
 
      {/* Submit */}
      <button
        onClick={handleSubmit}
        className="w-full py-3.5 bg-violet-600 hover:bg-violet-500 text-white rounded-xl font-medium text-sm transition-all shadow-[0_0_24px_rgba(108,99,255,0.3)] hover:shadow-[0_0_36px_rgba(108,99,255,0.45)] hover:-translate-y-0.5 cursor-pointer border-none"
      >
        Send Message →
      </button>
      <p className="text-center text-[0.72rem] text-[#8B89A8] mt-3">
        🔒 Your data is protected. We never share your info with third parties.
      </p>
    </div>
  );
}