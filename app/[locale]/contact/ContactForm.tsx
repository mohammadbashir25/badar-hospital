"use client";

import { useState, type FormEvent } from "react";
import { motion, useReducedMotion } from "framer-motion";

interface ContactFormLabels {
  eyebrow: string;
  title: string;
  description: string;
  fields: {
    name: { label: string; placeholder: string };
    email: { label: string; placeholder: string };
    phone: { label: string; placeholder: string };
    subject: { label: string; placeholder: string };
    message: { label: string; placeholder: string };
  };
  submit: string;
  sending: string;
  successTitle: string;
  successMessage: string;
  errorTitle: string;
  errorMessage: string;
  errors: {
    nameRequired: string;
    emailRequired: string;
    emailInvalid: string;
    subjectRequired: string;
    messageRequired: string;
  };
}

interface ContactFormProps {
  labels: ContactFormLabels;
}

type Status = "idle" | "sending" | "success" | "error";

interface FormState {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  company: string; // honeypot field, kept empty by real users
}

const initialState: FormState = {
  name: "",
  email: "",
  phone: "",
  subject: "",
  message: "",
  company: "",
};

function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export default function ContactForm({ labels }: ContactFormProps) {
  const reduceMotion = useReducedMotion();
  const [form, setForm] = useState<FormState>(initialState);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<Status>("idle");

  function validate(): boolean {
    const nextErrors: Record<string, string> = {};

    if (!form.name.trim()) nextErrors.name = labels.errors.nameRequired;
    if (!form.email.trim()) {
      nextErrors.email = labels.errors.emailRequired;
    } else if (!isValidEmail(form.email.trim())) {
      nextErrors.email = labels.errors.emailInvalid;
    }
    if (!form.subject.trim()) nextErrors.subject = labels.errors.subjectRequired;
    if (!form.message.trim()) nextErrors.message = labels.errors.messageRequired;

    setFieldErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!validate()) {
      return;
    }

    setStatus("sending");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!response.ok) {
        throw new Error("Request failed");
      }

      const data = await response.json();

      if (!data.success) {
        throw new Error("Send failed");
      }

      setStatus("success");
      setForm(initialState);
      setFieldErrors({});
    } catch {
      setStatus("error");
    }
  }

  const inputClasses =
    "mt-2 w-full rounded-lg border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-text-muted focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20";

  return (
    <motion.div
      initial={reduceMotion ? undefined : { opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
      className="rounded-2xl border border-border-light bg-surface p-6 text-start sm:p-8"
    >
      <span className="text-sm font-medium uppercase tracking-wide text-primary">
        {labels.eyebrow}
      </span>
      <h2 className="mt-3 text-2xl font-semibold text-foreground sm:text-3xl">
        {labels.title}
      </h2>
      <p className="mt-3 text-sm leading-relaxed text-text-secondary">
        {labels.description}
      </p>

      {status === "success" ? (
        <div
          role="status"
          className="mt-6 rounded-lg border border-primary/30 bg-surface-blue p-4 text-sm text-foreground"
        >
          <p className="font-semibold">{labels.successTitle}</p>
          <p className="mt-1 text-text-secondary">{labels.successMessage}</p>
        </div>
      ) : null}

      {status === "error" ? (
        <div
          role="alert"
          className="mt-6 rounded-lg border border-red/30 bg-red-light/10 p-4 text-sm text-foreground"
        >
          <p className="font-semibold text-red">{labels.errorTitle}</p>
          <p className="mt-1 text-text-secondary">{labels.errorMessage}</p>
        </div>
      ) : null}

      <form className="mt-6 space-y-5" onSubmit={handleSubmit} noValidate>
        {/* Honeypot field — hidden from real users */}
        <div className="hidden" aria-hidden="true">
          <label htmlFor="company">Company</label>
          <input
            id="company"
            name="company"
            type="text"
            tabIndex={-1}
            autoComplete="off"
            value={form.company}
            onChange={(e) => setForm({ ...form, company: e.target.value })}
          />
        </div>

        <div>
          <label htmlFor="name" className="text-sm font-medium text-foreground">
            {labels.fields.name.label}
          </label>
          <input
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            placeholder={labels.fields.name.placeholder}
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className={inputClasses}
            aria-invalid={Boolean(fieldErrors.name)}
            aria-describedby={fieldErrors.name ? "name-error" : undefined}
          />
          {fieldErrors.name ? (
            <p id="name-error" className="mt-1 text-xs text-red">
              {fieldErrors.name}
            </p>
          ) : null}
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="email" className="text-sm font-medium text-foreground">
              {labels.fields.email.label}
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              placeholder={labels.fields.email.placeholder}
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className={inputClasses}
              aria-invalid={Boolean(fieldErrors.email)}
              aria-describedby={fieldErrors.email ? "email-error" : undefined}
            />
            {fieldErrors.email ? (
              <p id="email-error" className="mt-1 text-xs text-red">
                {fieldErrors.email}
              </p>
            ) : null}
          </div>

          <div>
            <label htmlFor="phone" className="text-sm font-medium text-foreground">
              {labels.fields.phone.label}
            </label>
            <input
              id="phone"
              name="phone"
              type="tel"
              autoComplete="tel"
              placeholder={labels.fields.phone.placeholder}
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              className={inputClasses}
            />
          </div>
        </div>

        <div>
          <label htmlFor="subject" className="text-sm font-medium text-foreground">
            {labels.fields.subject.label}
          </label>
          <input
            id="subject"
            name="subject"
            type="text"
            placeholder={labels.fields.subject.placeholder}
            value={form.subject}
            onChange={(e) => setForm({ ...form, subject: e.target.value })}
            className={inputClasses}
            aria-invalid={Boolean(fieldErrors.subject)}
            aria-describedby={fieldErrors.subject ? "subject-error" : undefined}
          />
          {fieldErrors.subject ? (
            <p id="subject-error" className="mt-1 text-xs text-red">
              {fieldErrors.subject}
            </p>
          ) : null}
        </div>

        <div>
          <label htmlFor="message" className="text-sm font-medium text-foreground">
            {labels.fields.message.label}
          </label>
          <textarea
            id="message"
            name="message"
            rows={5}
            placeholder={labels.fields.message.placeholder}
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
            className={inputClasses}
            aria-invalid={Boolean(fieldErrors.message)}
            aria-describedby={fieldErrors.message ? "message-error" : undefined}
          />
          {fieldErrors.message ? (
            <p id="message-error" className="mt-1 text-xs text-red">
              {fieldErrors.message}
            </p>
          ) : null}
        </div>

        <button
          type="submit"
          disabled={status === "sending"}
          className="inline-flex w-full items-center justify-center rounded-full bg-primary px-8 py-3 text-sm font-semibold text-white transition hover:bg-primary-dark disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
        >
          {status === "sending" ? labels.sending : labels.submit}
        </button>
      </form>
    </motion.div>
  );
}